<template>
  <div class="guide">
    <section>
      <h1>{{ pageTitle }}</h1>
      <p>
        The idea of ​​converting JSON to DQL (Doctrine Query Language) and then
        executing a database query served as the basis for this project. This
        conversion allows you to use most of Doctrine's features, including
        filtering by related entities with ordering and sorting. Of course, it
        does not eliminate the need to create complex queries. For example,
        queries with grouping and aggregation are not supported (not implemented
        intentionally). But it gets rid of the routine work.
      </p>
    </section>
    <section id="frontend">
      <h2>Frontend</h2>
      <h3>Entity and field names conversion</h3>
      <p>
        To automatically convert JSON Query to SQL, ORM Backend uses a common
        pattern for field names:
        <code>&lt;full-namespace&gt;-&lt;class_name&gt;.&lt;fieldName&gt;</code>
        This ensures that entity names and their field names are unique. Also,
        this agreement opens up the prospect of editing the fields of different
        objects in one form and automatically saving them by one post-request.
        Please note that ORM Backend does not use table and column names.
      </p>
      <pre
        v-highlightjs
      ><code class="json">"app-model-team" // entity App\Model\Team
"app-model-team_trainer"  // entity App\Model\TeamTrainer
"app-model-team.trainer" // association App\Model\Team::trainer
"app-model-team.players" // collection App\Model\Team::players
"app-model-team.trainer.createdBy.role.name" // The depth is not limited</code></pre>
      <h3>Aliases</h3>
      <p>
        The converted names are very long and inconvenient to use in your code.
        ORM Backend offers to send requests by URL containing the full class
        name, and use aliases in the code. For example, all requests to
        <code>App\Model\Team</code> entity can be passed by URL containing the
        transformed class name as a parameter. These requests can be handled by
        a single controller that performs actions for all models.
      </p>
      <pre v-highlightjs><code class="php">// routes.php
// uri /api/entities/app-model-team
Route::get('/api/entities/{entity}', 'ApiController@search')</code></pre>
      <p>
        By default, the alias is calculated as a short class name with the first
        lowercase character. You can change this behaviour, but the alias must
        match the alias on the front-end.
      </p>
      <h3>Structure of JSON Query</h3>
      <pre v-highlightjs><code class="json">{
  select: [],
  join: [],
  filter: [],
  order: []
}</code></pre>
      <h3>Select</h3>
      <p>
        We assume that the smallest unit of the transmitted information is an
        object. Therefore the select part can only contain association and
        collection names.
      </p>
      <pre v-highlightjs><code class="json">select: [
  "team",
  "team.trainer",
  "team.players"
]</code></pre>
      <h3>Join</h3>
      <p>
        You don't really need to write anything here. All necessary joins are
        performed automatically. This part of JSON Query can be omitted.
      </p>
      <h3>Filter</h3>
      <p>
        All values ​​must be strongly typed. An exception will be thrown if the
        value cannot be cast to the type specified in the mapping.
      </p>
      <p>Conjunctions: or, and.</p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <pre v-highlightjs><code class="json">filter: [
  "or",
  [...comparison1],
  [...comparison2],
  [...comparison3]
]</code></pre>
        </div>
        <div class="md-layout-item">
          <pre v-highlightjs><code class="json">filter: [
  "and",
  [...comparison1],
  [...comparison2],
  [...comparison3]
]</code></pre>
        </div>
        <div class="md-layout-item">
          <pre v-highlightjs><code class="json">// "and" can be omitted
filter: [
  [...comparison1],
  [...comparison2],
  [...comparison3]
]</code></pre>
        </div>
      </div>
      <p>Operators: eq, neq, gt, gte, lt, lte, like, notLike.</p>
      <pre v-highlightjs><code class="json">filter: [
  ["team.trainer.id", "eq", "3286b84b-314e-424b-b23e-e586cdf2cca7"],
  ["team.inFinal", "neq", false],
  ["team.player.age", "gt", 18],
  ["team.player.age", "gte", 18],
  ["team.player.age", "lt", 18],
  ["team.player.age", "lte", 18],
  ["team.name", "like", "amigos"],
  ["team.name", "notLike", "%amigos%"]
]</code></pre>
      <p>Operators: isNull, isNotNull.</p>
      <pre v-highlightjs><code class="json">filter: [
  ["team.trainer.id", "isNull"],
  ["team.name", "isNotNull"]
]</code></pre>
      <p>Operators: in, notIn.</p>
      <pre v-highlightjs><code class="json">filter: [
  ["team.createdBy.role.code", "in", ["admin", "guest"]],
  ["team.id", "notIn", ["c32e99ec-6a2b-473d-82de-ff177b1fcae6", "77d6e9dd-c38f-40be-9c39-fc4daa46d086"]],
]</code></pre>
      <p>Operator between.</p>
      <pre v-highlightjs><code class="json">filter: [
  ["team.createdAt", "between", "2020-01-01", "2020-01-31"]
]</code></pre>
      <p>Nested criteria are fully supported. The depth is not limited.</p>
      <pre v-highlightjs><code class="json">filter: [
  [...comparison]
  [
    "or",
    [...comparison],
    [ [...comparison], [...comparison] ]
  ]
]</code></pre>
      <h3>Order</h3>
      <p>
        By default, sorting is in ascending order. To sort in descending order,
        the field must be prefixed with a minus. The number of fields is not
        limited.
      </p>
      <pre v-highlightjs><code class="json">order: [
  "team.name", "-team.trainer.name"
]</code></pre>
      <h3>Pagination</h3>
      <p>
        The pagination is not a part of JSON Query. It can be done by passing
        <code>page</code> and <code>perpage</code> parameters to the query
        string. Pagination is supported in two modes: normal and cursor. In
        normal mode, the total number of elements is counted, while in cursor
        mode, this calculation is not performed. Cursor pagination is useful
        with infinite scrolling.
      </p>
      <h3>Sending request</h3>
      <p>
        The supported request methods are GET, POST, PUT and DELETE. The
        supported media-types are <code>application/json</code>,
        <code>application/x-www-form-urlencoded</code> and
        <code>multipart/form-data</code>. JQuery deparam plugin can be useful
        for converting JSON Query to query-string parameters. Read
        <router-link to="/guides/restful" title="RESTfull CRUD Services"
          >RESTfull Services</router-link
        >
        about requests.
      </p>
    </section>
    <section id="json2php">
      <h2>Json to PHP array</h2>
      <p>
        Let's say we want to fetch all teams with the name like Amigos that Gary
        trains. The JSON representation for this query looks very simple and
        intuitive. It can be obtained as a request payload or converted from a
        URL query string. Please note that the conversion from the payload is
        performed using PHP native <code>json_decode</code> function, and from
        the query string we will retrieve a ready-made array provided by the PHP
        itself. Nothing new here, everything is very simple.
      </p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <pre v-highlightjs><code class="json">// json query example
{
    select: [
        "team",
        "team.players",
        "team.trainer"
    ],
    filter: [
        [
            "or",
            ["team.name", "like", "amigos"],
            ["team.trainer.name", "like", "gary%"],
        ],
        ["team.trainer.id", "isNotNull"]
    ],
    order: ["team.name", "-team.players.birthdate"]
};</code></pre>
        </div>
        <div class="md-layout-item">
          <pre v-highlightjs><code class="php">// php array
[
    'select' => [
        "team",
        "team.players",
        "team.trainer"
    ],
    'filter' => [
        [
            "or",
            ["team.name", "like", "amigos"],
            ["team.trainer.name", "like", "gary%"],
        ],
        ["team.trainer.id", "isNotNull"]
    ],
    'order' => ["team.name", "-team.players.birthdate"]
];</code></pre>
        </div>
      </div>
    </section>
    <section id="php2dql">
      <h2>PHP array to DQL</h2>
      <p>
        ORM Backend provides code that automatically converts a JSON Query to
        DQL. Automatic <code>LEFT OUTER JOIN</code> building based on parts of
        select, filter and order. First of all, the query parameters are cleared
        using <code>filter_var</code>. They are then cast to strong type
        according to the Doctrine mapping during Doctrine query building.
      </p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p>Usually, to build the query, we write something like following</p>
          <pre v-highlightjs><code class="php">// filter only
$qb->where(
    $qb->expr()->andX()->addMultiple([
        $qb->expr()->orX()->addMultiple([
            $qb->expr()->like('team.name', ':name1'),
            $qb->expr()->like('team_trainer.name', ':name2'),
        ]),
        $qb->expr()->notNull('team_trainer.id')
    ])
);</code></pre>
        </div>
        <div class="md-layout-item">
          <p>The result</p>
          <pre v-highlightjs><code class="mysql">// DQL
FROM Team team
LEFT JOIN team.players team_players
LEFT JOIN team.trainer team_trainer
WHERE (
    team_players.name LIKE :name1
    OR team_trainer.name LIKE :name2
) AND team_trainer.id NOT NULL</code></pre>
        </div>
      </div>
      <p>
        It would be more efficient to use the trainer's inner join in this
        example. But currently only left joins are used in this project. Let's
        say you want to filter teams by trainer name, but you do not need to
        display the trainer's data.
      </p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p>You don't have to write</p>
          <pre v-highlightjs><code class="json">{
  select: [
    "team",
    "team.trainer"
  ],
  filter: [
    ["team.trainer.name", "like", "gary"]
  ] 
}</code></pre>
        </div>
        <div class="md-layout-item">
          <p>Just enough</p>
          <pre v-highlightjs><code class="json">{
  filter: [
    ["team.trainer.name", "like", "gary"]
  ] 
}</code></pre>
        </div>
      </div>
      <p>
        ORM backend will determine that a join is needed and build the correct
        DQL. Sorting is similar. You can always select only those entities that
        you need, as well as filter and sort by fields of other related
        entities. Also, there is no need to specify the alias of the root entity
        in the select part. It is always added by ORM Backend.
      </p>
    </section>
    <section id="backend">
      <h2>Using PHP code</h2>
      <p>
        A JSON-like query can also be used in your PHP code. The supported
        operators are
        <code
          >eq neq gt gte lt lte isNull isNotNull like notLike in notIn
          between</code
        >. DQL expression and aliases are also available. Simple and intuitive
        JSON Query is tempting to use it everywhere. Below are a couple of
        examples of actual code.
      </p>
      <pre v-highlightjs><code class="php">/**
  *
  * @param  \Illuminate\Http\Request  $request
  * @return  \Illuminate\Http\Response
  */
public function index(Request $request)
{
    $parameters = [
        'select' => [
            'event.previewImage',
            'event.place'
        ],
        'filter' => [
            ['event.status', 'eq', StatusEnum::PUBLISHED]
        ],
        'order' => ['event.sort', '-event.createdAt']
    ];
    
    $paginator = $this->cursor($this->repository->createQuery(Event::class, $parameters, 'event'))->appends($request->all());

    return view('app.index', ['paginator' => $paginator]);
}</code></pre>
      <pre v-highlightjs><code class="php">/**
  *
  * @param \Illuminate\Http\Request $request
  * @param string $eventCode
  * @param string $placeCode
  * @param string $adCode
  * @return \Illuminate\View\View
  */
public function details(Request $request, string $eventCode, string $placeCode, string $adCode)
{
    $parameters = [
        'select' => [
            'ad.event',
            'ad.place',
            'ad.images'
        ],
        'filter' => [
            ['ad.event.code', 'eq', $eventCode],
            ['ad.place.code', 'eq', $placeCode],
            ['ad.code', 'eq', $adCode],
            ['ad.event.status', 'eq', StatusEnum::PUBLISHED],
            ['ad.place.status', 'eq', StatusEnum::PUBLISHED],
            ['ad.status', 'eq', StatusEnum::PUBLISHED]
        ]
    ];
    
    try {
        /**
         * 
         * @var \App\Entities\Ad $ad
         */
        $ad = $this->repository->createQuery(Ad::class, $parameters, 'ad')->getSingleResult();
    } catch (NoResultException $e) {
        abort(404);
    }
    
    return view('app.details', [
        'event' => $ad->getEvent(),
        'place' => $ad->getPlace(),
        'ad' => $ad
    ]);
}</code></pre>
    </section>
  </div>
</template>

<script>
import GuideBase from "./GuideBase";

export default {
  mixins: [GuideBase],
  data() {
    return {
      pageTitle: "JSON Query — Easy SQL building tool",
      pageDescription:
        "JSON Query is a simple and versatile tool for building database queries on the client or server side that supports most of Doctrine's features.",
      menu: [
        {
          link: "frontend",
          title: "Frontend",
        },
        {
          link: "json2php",
          title: "JSON to PHP array",
        },
        {
          link: "php2dql",
          title: "PHP array to DQL",
        },
        {
          link: "backend",
          title: "Backend",
        },
      ],
    };
  },
};
</script>
