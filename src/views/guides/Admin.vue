<template>
  <div class="guide">
    <section>
      <h1>{{ pageTitle }}</h1>
      <blockquote>
        <p>
          No coding is required to have powerful Laravel Admin panel, you only
          need to Doctrine mappings. Once a new entity is created, it is
          automatically managed in the Laravel Admin and available in
          <router-link to="/guides/restful" title="RESTful services"
            >RESTful services</router-link
          >.
        </p>
      </blockquote>
      <p>
        Login to
        <router-link to="/laravel-admin-login" title="Login to Laravel Admin"
          >Laravel Admin</router-link
        >
        and try it yourself. This site did not carry out any additional
        programming of the administrative part. Only three entities were created
        and filled with fake data. The graphical interface is completely
        dynamic. Dynamic menu, links, grid, forms and form inputs. Doctrine
        mapping provides us with all the information we need. We know the names
        of the fields, their types, length and required filling. And that's
        enough. Based on this information, we can decide what type of input to
        display in the form and how to display it in the grid. And our
        conversion of class names allows us to create unique URLs for
        controllers. In addition, the validation rules written in the model,
        together with the transactions, ensure data integrity.
      </p>
    </section>
    <section id="grid">
      <h2>Dynamic grid</h2>
      <p>
        Orm Backend builds grid dynamically. Based on information about entity
        fields, it dynamically builds columns and displays their content
        depending on the entity field type. Depending on the user's permissions
        for the current entity, a column with actions available to this user is
        displayed on the right side of the grid. And also the grid can build and
        display links to associative records and collections. Which Orm Backend
        opens in a new browser window.
      </p>
    </section>
    <section id="menu">
      <h2>Dynamic menu</h2>
      <p>
        Our Laravel Admin implementation adds an additional convention to class
        names for link building. It basically uses the
        <router-link
          to="/guides/json-query#frontend"
          title="Json Query — Entity and field names conversion"
          >Entity and field names conversion</router-link
        >
        but extends it with the group prefix. The generic URL pattern is now:
        <code
          >/admin/&lt;group&gt;/&lt;full-namespace&gt;-&lt;class_name&gt;</code
        >. This makes it possible to organize menu items into groups. Thanks to
        these groups, we see menu items such as Users, Entities, Files and
        OAuth.
      </p>
      <p>
        It should be noted that the Users, Entities and Files items are built
        into the core Laravel Admin package. But OAuth comes in a separate
        package and the main package knows nothing about it. This communication
        is achieved by listening on the
        <code>OrmBackend\Web\Events\BeforMenu</code> event. You can use this
        event to create your own Laravel Admin sections.
      </p>
    </section>
    <section id="forms">
      <h2>Dynamic forms</h2>
      <p>Orm Backend offers the following single and composite input fields:</p>
      <ul>
        <li><code>id</code> Primary key</li>
        <li><code>text</code> Short string</li>
        <li><code>textarea</code> Long string</li>
        <li><code>number</code> Integer and float</li>
        <li><code>bitmask</code> Integer (adapter required)</li>
        <li><code>checkbox</code> Boolean</li>
        <li><code>radio</code> OrmBackend\DBAL\Types\ EnumType</li>
        <li><code>date</code> OrmBackend\DBAL\Types\ CarbonDate</li>
        <li><code>datetime</code> OrmBackend\DBAL\Types\ CarbonDateTime</li>
        <li><code>time</code> OrmBackend\DBAL\Types\ CarbonTime</li>
        <li><code>reference</code> To-One association</li>
        <li><code>collection</code> To-Many associative collection</li>
        <li><code>image</code> OrmBackend\Types\ImageType</li>
        <li><code>file</code> OrmBackend\Types\FileType</li>
      </ul>
    </section>
    <section id="searching">
      <h2>Searching by nested criteria</h2>
      <p>No hard code. All form inputs are generated dynamically.</p>
      <img
        loading="lazy"
        src="@/assets/img/search_form.jpg"
        alt="Laravel Admin exclusive search capabilities"
        width="1200"
        height="627"
      />
    </section>
    <section id="module">
      <h2>Creating your own Laravel Admin module</h2>
      <h3>View</h3>
      <p>
        First, if you only need to change the HTML, you may not need to create a
        new module. ORM Backend provides the ability to override the view. This
        can be done by configuration.
      </p>
      <pre v-highlightjs><code class="php">// admin.php
'views' => [
    'app-model-role' => [
        'edit' => 'ormbackend::admin.role.edit',
        'create' => 'ormbackend::admin.role.create'
    ],
    'orm_backend-oauth-entities-client' => [
        'create' => 'oauth::client.create'
    ],
]
</code></pre>
      <h3>Adapter</h3>
      <p>
        Next, you can use an adapter to define your logic for CRUD. To do this,
        you need to inherit the
        <code>OrmBackend\Admin\Controllers\ AdminControllerAdapter</code>
        abstract class.
      </p>
      <pre
        v-highlightjs
      ><code class="php">// OrmBackend\Admin\Controllers\AdminControllerAdapter
/**
  *
  * @param \Illuminate\Http\Request $request
  * @param  string $classUrlName
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function search(Request $request, string $classUrlName, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param  string $classUrlName
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function trash(Request $request, string $classUrlName, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param \OrmBackend\ORM\Entities\Entity $entity
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function details(Request $request, Entity $entity, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param \OrmBackend\ORM\Entities\Entity $entity
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function edit(Request $request, Entity $entity, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param  string $classUrlName
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function create(Request $request, string $classUrlName, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param  string $classUrlName
  * @param mixed $id
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function update(Request $request, string $classUrlName, $id, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param  string $classUrlName
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function store(Request $request, string $classUrlName, string $group);

/**
  *
  * @param \Illuminate\Http\Request $request
  * @param  string $classUrlName
  * @param mixed $id
  * @param string $group
  * @return \Illuminate\Contracts\Support\Responsable
  */
abstract public function delete(Request $request, string $classUrlName, $id, string $group);
</code></pre>
      <p>And add your implementation to the configuration</p>
      <pre v-highlightjs><code class="php">// admin.php
'adapters' => [
    'app-model-role' => OrmBackend\Admin\Adapters\RoleAdapter::class,
    'app-model-user' => OrmBackend\Admin\Adapters\UserAdapter::class,
    'app-model-image' => OrmBackend\Admin\Adapters\ImageAdapter::class,
],
</code></pre>
      <h3>Custom page</h3>
      <p>
        Finally, you can add to menu a link to your custom page using the
        <code>OrmBackend\Web\Events\BeforMenu</code> event. If you want your
        page to look the same as the rest of Laravel Admin pages, do not forget
        to inherit the layout.
      </p>
      <pre v-highlightjs><code class="blade">
@extends('ormbackend::admin.layout')
@section('ormbackend::content')
  <p>You custom content here</p>
@endsection
</code></pre>
    </section>
  </div>
</template>

<script>
import GuideBase from "./GuideBase";

export default {
  mixins: [GuideBase],
  data() {
    return {
      pageTitle: "Laravel Admin",
      pageDescription:
        "No coding is required to have powerful Laravel Admin panel, you only need to Doctrine mappings. Once a new entity is created, it is automatically managed in the Laravel Admin and available in RESTful services.",
      menu: [
        {
          link: "grid",
          title: "Dynamic grid",
        },
        {
          link: "menu",
          title: "Dynamic menu",
        },
        {
          link: "forms",
          title: "Dynamic forms",
        },
        {
          link: "searching",
          title: "Searching by nested criteria",
        },
        {
          link: "module",
          title: "Laravel Admin module",
        },
      ],
    };
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "og:image",
          property: "og:image",
          content:
            process.env.VUE_APP_CLOUD_URL +
            require("@/assets/img/search_form.jpg"),
        },
        {
          property: "og:image:alt",
          content: "Laravel Admin exclusive search capabilities",
          vmid: "og:image:alt",
        },
      ],
    };
  },
};
</script>
