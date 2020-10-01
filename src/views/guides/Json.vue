<template>
  <div class="guide">
    <section>
      <h1>{{ pageTitle }}</h1>
      <p>
        The idea of ​​converting Json to DQL (Doctrine Query Language) and then
        executing a database query served as the basis for this project. This
        conversion allows you to use most of Doctrine's features, including
        filtering by related entities with ordering and sorting. Of course, it
        does not eliminate the need to create complex queries. For example,
        queries with grouping and aggregation are not supported (not implemented
        intentionally). But it gets rid of the routine work.
      </p>
    </section>
    <section id="json2php">
      <h2>Json to PHP array</h2>
      <p>
        Let's say we want to fetch all teams with the name like Amigos that Gary
        trains. The Json representation for this query looks very simple and
        intuitive. It can be obtained as a request payload or converted from a
        URL query string. Please note that the conversion from the payload is
        performed using PHP native <code>json_decode</code> function, and from
        the query string we will retrieve a ready-made array provided by the PHP
        itself. Nothing new here, everything is very simple.
      </p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <pre class="language-json"><code>{{ jsonCode }}</code></pre>
        </div>
        <div class="md-layout-item">
          <pre class="language-php"><code>{{ phpArray }}</code></pre>
        </div>
      </div>
    </section>
    <section id="php2dql">
      <h2 class="section">PHP array to DQL</h2>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p>Usually, to build the query, we write something like following</p>
          <pre class="language-php"><code>{{ doctrineCode }}</code></pre>
        </div>
        <div class="md-layout-item">
          <p>The result</p>
          <pre class="language-php"><code>{{ doctrineDQL }}</code></pre>
        </div>
      </div>
      <p>
        It would be more efficient to use the trainer's inner join in this
        example. But currently only left joins are used in this project. It
        provides code that automatically converts a Json query to DQL. Automatic
        <code>LEFT JOIN</code> building based on parts of select, filter and
        order. Let's say you want to filter teams by trainer name. But you do
        not need to display the trainer's data.
      </p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p>You don't have to write</p>
          <pre class="language-json"><code>{{ joinExample1 }}</code></pre>
        </div>
        <div class="md-layout-item">
          <p>Just enough</p>
          <pre class="language-json"><code>{{ joinExample2 }}</code></pre>
        </div>
      </div>
      <p>
        ORM backend itself will determine that a join is needed and build the
        correct DQL. Sorting is similar. You can always select only those
        entities that you need, as well as filter and sort by fields of other
        related entities.
      </p>
      <p>
        Json-like query can also be used in your own PHP code. The supporetd
        operators are
        <code
          >eq neq gt gte lt lte isNull isNotNull like notLike in notIn
          between</code
        >. DQL expression and aliases are also available.
      </p>
    </section>
    <section id="validation">
      <h2>Sanitization and strong typing</h2>
      <p>
        First of all, the search query parameters are cleared using filter_var.
        Then they are cast to a strong type in accordance with the mapping when
        building a Doctrine query. If the type conversion is successful, a
        database query is executed. Otherwise, an exception is thrown.
      </p>
    </section>
  </div>
</template>

<script>
const ScrollMagic = process.client ? require("ScrollMagic") : null;

if (process.client && process.env.NODE_ENV === "development") {
  require("debug.addIndicators");
}

import Prism from "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-json";
import "prismjs/components/prism-php";
import "prismjs/themes/prism.css";

export default {
  data() {
    return {
      controller: null,
      scenes: [],
      pageTitle: "Json Query to SQL",
      pageDescription:
        "Converting a JavaScript object directly to DQL and executing a query. Json can be written server side or obtained from an http request.",
      joinExample1: `
{
  select: [
    "team",
    "team.trainer"
  ],
  filter: [
    ["team.trainer", "like", "gary"]
  ] 
}`,
      joinExample2: `
{
  select: [
    "team"
  ],
  filter: [
    ["team.trainer", "like", "gary"]
  ] 
}`,
      jsonCode: `// json query example
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
        ["team.trainer", "isNotNull"]
    ],
    order: ["team.name", "-team.players.birthdate"]
};`,
      phpArray: `// php array
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
        ["team.trainer", "isNotNull"]
    ],
    'order' => ["team.name", "-team.players.birthdate"]
];`,
      doctrineCode: `// filter only
$qb->where(
    $qb->expr()->andX()->addMultiple([
        $qb->expr()->orX()->addMultiple([
            $qb->expr()->like('team.name', ':name1'),
            $qb->expr()->like('team_trainer.name', ':name2'),
        ]),
        $qb->expr()->notNull('team_trainer.id')
    ])
);
`,
      doctrineDQL: `// DQL
FROM Team team
LEFT JOIN team.players team_players
LEFT JOIN team.trainer team_trainer
WHERE (
    team_players.name LIKE :name1
    OR team_trainer.name LIKE :name2
) AND team_trainer.id NOT NULL
`,
    };
  },
  methods: {
    afterEnter: function () {
      this.scrollMagic();
    },
    scrollMagic: function () {
      if (!this.controller) {
        this.controller = new ScrollMagic.Controller({
          globalSceneOptions: { triggerHook: 0 },
        });

        const el1 = document.querySelector("#json2php");
        const scene1 = new ScrollMagic.Scene({
          triggerElement: "#json2php",
          duration: $(el1).outerHeight(true),
          triggerHook: 0,
          offset: 0,
        }).setClassToggle(".json2php-link > a", "router-link-active");
        //.addIndicators();

        this.controller.addScene(scene1);
        this.scenes.push(scene1);

        const el2 = document.querySelector("#php2dql");
        const scene2 = new ScrollMagic.Scene({
          triggerElement: "#php2dql",
          duration: $(el2).outerHeight(true),
          triggerHook: 0,
          offset: 0,
        }).setClassToggle(".php2dql-link > a", "router-link-active");
        //.addIndicators();

        this.controller.addScene(scene2);
        this.scenes.push(scene2);

        const el3 = document.querySelector("#validation");
        const scene3 = new ScrollMagic.Scene({
          triggerElement: "#validation",
          duration: $(el3).outerHeight(true),
          triggerHook: 0,
          offset: 0,
        }).setClassToggle(".validation-link > a", "router-link-active");
        //.addIndicators();

        this.controller.addScene(scene3);
        this.scenes.push(scene3);
      } else {
        this.$nextTick(() => {
          this.scenes.forEach((scene) => {
            scene.duration($(scene.triggerElement()).outerHeight(true));
            scene.refresh();
          });

          this.controller.update(true);
        });
      }
    },
  },
  created() {
    this.$store.commit("local/sidebar", {
      title: this.pageTitle,
      menu: [
        {
          link: "json2php",
          title: "Json to PHP array",
        },
        {
          link: "php2dql",
          title: "PHP array to DQL",
        },
        {
          link: "validation",
          title: "Sanitization and strong typing",
        },
      ],
    });
  },
  mounted() {
    Prism.highlightAll();
  },
  beforeDestroy() {
    if (this.controller) {
      this.controller.destroy();
    }
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      meta: [
        {
          vmid: "og:title",
          property: "og:title",
          content: this.pageTitle,
        },
        {
          vmid: "description",
          name: "description",
          content: this.pageDescription,
        },
        {
          vmid: "og:description",
          property: "og:description",
          content: this.pageDescription,
        },
      ],
    };
  },
};
</script>
