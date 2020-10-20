<template>
  <div class="guide">
    <section>
      <h1>{{ pageTitle }}</h1>
      <p>
        If you've read about
        <router-link to="/guides/json" title="Json Query"
          >Json Query</router-link
        >, you might guess that creating services is very easy. Of course,
        Doctrine mapping provides a distinct advantage. Thanks to Doctrine, we
        know everything there is to know about entities. Using Doctrine mapping
        and Json Query, we can create fully automated services. Note that using
        the Doctrine mapping does not impose additional load on the servers, as
        there is no need to perform additional database queries to get
        information about entities. Moreover, we can configure the system to
        store mappings directly in RAM.
      </p>
    </section>
    <section id="searching">
      <h2>Searching</h2>
      <p>
        ORM Backend supports GET, POST and PUT request methods for searching.
        Any of them can be used of your choice. The supported media-types are
        <code>application/json</code> and
        <code>application/x-www-form-urlencoded</code>. The uri to send search
        request is <code>/api/entities/{your-entity-name}</code>. Where
        <code>{your-entity-name}</code> is a transformed full class name. See
        <router-link to="/guides/json" title="Json Query"
          >Json Query</router-link
        >
        to read about names conversion and aliases. Of course you can implement
        your own controllers and do it very easily.
      </p>
      <pre v-highlightjs><code class="php">/**
*
* @param  \Illuminate\Http\Request  $request
* @param string $classUrlName
* @return \Illuminate\Http\Response
*/
public function search(Request  $request, string $classUrlName)
{
    $class = Helper::classFromUlr($classUrlName);
    //$paginator = $this->paginator($this->repository->createQuery($class))->appends($request->all());
    $paginator = $this->cursor($this->repository->createQuery($class))->appends($request->all());

    return response()->json(new JsonCollectionSerializer($paginator, Helper::aliasFromClass($class)), 200);
}</code></pre>
      <p>Please note that features of this controller are:</p>
      <ul>
        <li>Cleaning up the user input to prevent SQL injection.</li>
        <li>
          Strong typing helps to identify most errors during the development
          phase.
        </li>
        <li>
          Filtering and sorting by related associations and collections with
          unlimited depth.
        </li>
        <li>
          Only one query is executed in the database when using cursor,
          regardless of the nesting depth.
        </li>
        <li>
          Access control. The output contains only the data that the current
          user has the right to read.
        </li>
        <li>Caching.</li>
      </ul>
      <h3>Output</h3>
      <p>
        The output contains only those associations that are explicitly
        specified in the select part of Json Query. You will receive only those
        that you demanded and nothing more.
      </p>
      <h3>NULL values</h3>
      <p>
        By default, there are no NULL values ​​or empty collections in the
        output. This behavior can be changed through configuration settings.
      </p>
      <h3>Collections</h3>
      <p>
        ORM Backend provides the ability to use collections in all parts of Json
        Query. But be careful if you intend to get a list of results that
        contains related collections. This can lead to unpredictable pagination
        results and excessive server load.
      </p>
      <h3>Nested associations</h3>
      <p>
        When selecting nested associations and collections, all parents must
        also be listed in the select part. Only root entity alias can be
        omitted.
      </p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p>An exception will be thrown:</p>
          <pre v-highlightjs><code class="php">{
    select: [
        "team.trainer.avatar",
        "team.players.avatar"
    ]
}</code></pre>
        </div>
        <div class="md-layout-item">
          <p>Correct:</p>
          <pre v-highlightjs><code class="php">{
    select: [
        "team.trainer",
        "team.trainer.avatar",
        "team.players"
        "team.players.avatar"
    ]
}</code></pre>
        </div>
      </div>
      <h3>Access control</h3>
      <p>
        The default ACL implementation provides read-only access for all users
        to all entities. And only the super administrator can edit the entity
        data. But you can install the
        <code>ormbackend/laravel-doctrine-acl</code> package and get fully
        managed access control based on user group permissions. Read more about
        <router-link
          to="/guides/acl"
          title="Read more about ACL extended implementation"
          >ACL</router-link
        >
        extended implementation.
      </p>
      <h3>Caching</h3>
      <p>
        The caching is optional. ORM Backend uses the result cache for queries
        with filtering, otherwise the Doctrine 2nd level cache is used.
      </p>
    </section>
    <section id="crud">
      <h2>CRUD</h2>
      <p>CRUD operations provided by the following URLs:</p>
      <div style="overflow-x: auto">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>URI</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Create</td>
              <td>/api/entities/{your-entity-name}/crud</td>
              <td>POST</td>
            </tr>
            <tr>
              <td>Read</td>
              <td>/api/entities/{your-entity-name}/crud/{id}</td>
              <td>GET</td>
            </tr>
            <tr>
              <td>Update</td>
              <td>/api/entities/{your-entity-name}/crud/{id}</td>
              <td>PUT</td>
            </tr>
            <tr>
              <td>Delete</td>
              <td>/api/entities/{your-entity-name}/crud/{id}</td>
              <td>DELETE</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Partial updates are also supported.</p>
      <h3>Validation</h3>
      <p>
        ORM Backend offers two levels of validation. The first is to validate
        the request. This level can be used to check the file size, match
        passwords, etc. This level is optional and may not be implemented on
        most requests.
      </p>
      <p>
        The second level is the entity validation. It is always triggered by
        Doctrine lifecycle events. Regardless of whether an entity is changed
        from the web, api or console, the same validation rules will work. Such
        centralized validation and transactions ensure data integrity. To
        perform validation checks, you need to define validation rules for your
        entities.
      </p>
      <p>Here is the actual code of the Image entity that this site uses:</p>
      <pre v-highlightjs><code class="php">&lt;?php
namespace App\Model;

use Illuminate\Support\Facades\Storage;
use OrmBackend\SoftDeleteable;
use OrmBackend\Types\ImageType;

class Image extends \App\Entities\Image implements SoftDeleteable, ImageType
{
    /**
     *
     * {@inheritDoc}
     * @see \OrmBackend\ORM\Entities\Entity::getModelValidationRules()
     */
    public function getModelValidationRules()
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'path' => ['required', 'string', 'max:255'],
            'mimeType' => ['required', 'string', 'max:50'],
            'width' => ['required', 'integer', 'min:16'],
            'height' => ['required', 'integer', 'min:16'],
            'altText' => ['nullable', 'string', 'max:4000']
        ];
    }
    
    /**
     *
     * {@inheritDoc}
     * @see \OrmBackend\ORM\Entities\Entity::getRequestValidationRules()
     */
    static public function getRequestValidationRules()
    {
        return [
            'image' => ['required', 'image', 'max:2000']
        ];
    }
}</code></pre>
    </section>
    <section id="adapters">
      <h2>Adapters</h2>
      <p>
        Sometimes we need to have a little more logic in the controller. ORM
        Backend provides an adapter interface for such cases. If you don't need
        to override some method, just return null from it. Then its default
        implementation will be used.
      </p>
      <pre v-highlightjs><code class="php">interface ApiControllerAdapter
{
    public function search(Request $request, string $classUrlName);

    public function create(Request $request, string $classUrlName);

    public function read(Request $request, string $classUrlName, $id);

    public function update(Request $request, string $classUrlName, $id);

    public function delete(Request $request, string $classUrlName, $id);
}</code></pre>
      <p>
        Once your implementation is ready, please don't forget to add it to the
        configuration.
      </p>
      <pre v-highlightjs><code class="php">// ormbackend.php
return [
    ...
    'adapters' => [
      'app-model-image' => OrmBackend\Adapters\ImageAdapter::class,
    ],
    ...
]
</code></pre>
      <p>Example of saving images</p>
      <pre
        v-highlightjs
      ><code class="php">public function create(Request $request, string $classUrlName)
{
    $className = Helper::classFromUlr($classUrlName);
    $data = $request->json()->all();
    $request->validate($className::getRequestValidationRules());
    $data['name'] = $request->file('image')->getClientOriginalName();
    $data['path'] = $request->file('image')->store(config('ormbackend.upload.img'));
    
    if (!$data['path']) {
        throw ValidationException::withMessages([
            'image' => [__('Failed to store file.')],
        ]);
    }
    
    $instance = $this->repository->createOrUpdate($className, $data);
    $this->repository->em()->flush();
    
    return response()->json(new JsonSerializer($instance), 201);
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
      pageTitle: "RESTful services with unlimited nested criterias",
      pageDescription:
        "Ready-made RESTful services. Allows you to filter objects by properties of related objects and provides the CRUD operations.",
      menu: [
        {
          link: "searching",
          title: "Searching",
        },
        {
          link: "crud",
          title: "CRUD",
        },
        {
          link: "adapters",
          title: "Adapters",
        },
      ],
    };
  },
};
</script>
