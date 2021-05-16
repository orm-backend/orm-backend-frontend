<template>
  <div class="guide">
    <section>
      <h1>{{ pageTitle }}</h1>
      <p>
        ORM Backend ACL implementation is based on user group permissions and
        uses Laravel gates and policies. User's belonging to groups and group
        permissions are stored in the database. User permissions to a given
        entity or record are calculated as the sum of the permissions of the
        groups to which this user belongs.
      </p>
    </section>
    <section id="bitmask">
      <h2>Permission bitmask</h2>
      <p>The following permissions are supported:</p>
      <pre v-highlightjs><code class="php">// ormbackend.php
'perms' => [
    'forbidden' => 1,
    'guest' => [
        'create' => 2,
        'read' => 4,
        'update' => 8,
        'delete' => 16,
    ],
    'entity' => [
        'create' => 32,
        'read' => 64,
        'update' => 128,
        'delete' => 256,
        'restore' => 512
    ],
    'record' => [
        'read' => 1024,
        'update' => 2048,
        'delete' => 4096,
        'restore' => 8192
    ]
]
</code></pre>
      <ul>
        <li>
          <code>forbidden</code>
          The first bit of the permission mask allows you to deny access
          regardless of other permissions. This is an easy way to ban a user.
          Let's say there is a Blocked Users group and you have set this
          permission for it. Adding a user to this group will deny him access to
          all data.
        </li>
        <li>
          <code>guest</code> This set of permissions is specifically designed
          for unauthorized visitors.
        </li>
        <li>
          <code>entity</code> These permissions determine whether the user can
          edit the entity's data, regardless of whether they own it. Typically,
          these rights are given to administrators.
        </li>
        <li>
          <code>record</code> These permissions determine the user's rights to
          the records for which he is the owner.
        </li>
      </ul>
    </section>
    <section id="groups">
      <h2>Groups</h2>
      <p>
        If you have ORM Backend installed and did the seeding, then the
        following groups are set:
      </p>
      <ul>
        <li>
          <code>visitor</code> Unauthorized Visitors. They only have
          <code>guest.read</code> permission.
        </li>
        <li>
          <code>registered</code> Registered Users. Their permission bitmask is
          <code
            >record.read | record.update | record.delete | record.restore</code
          >
        </li>
        <li>
          <code>admin</code> Administrators. Their permission bitmask is
          <code
            >entity.create | entity.read | entity.update | entity.delete |
            entity.restore</code
          >
        </li>
        <li>
          <code>dashboard</code> Laravel Admin Users. Membership in this group
          allows access to the control panel.
        </li>
      </ul>
      <p>
        Of course, the default permissions may not suit your needs. But you can
        use the
        <router-link
          to="/guides/laravel-admin"
          title="Laravel Admin — GUI for permission management"
          >Laravel Admin</router-link
        >
        panel as a GUI to manage permissions.
      </p>
    </section>
    <section id="groupPermissions">
      <h2>Group permissions</h2>
      <p>
        These permissions are used by default and stored in the database
        directly in the Group entity. If no entity's permissions are found for
        given entity and given group, then the group's permissions are used.
      </p>
    </section>
    <section id="entityPermissions">
      <h2>Entity permissions</h2>
      <p>
        These permissions are stored in a separate table in the database. They
        define the group's rights to a given entity. If the entity's permissions
        are found for a given entity and given group, then the group's
        permissions are ignored.
      </p>
    </section>
    <section id="implementation">
      <h2>Your implementation</h2>
      <p>
        ORM Backend provides
        <code>OrmBackend\ACL\AccessControl</code> interface. And in those
        exceptional cases where you are missing out-of-the-box implementation
        capabilities, you can define your implementation.
      </p>
      <pre v-highlightjs><code class="php">interface AccessControl
{
    /**
     * Is the current user a super administrator or not?
     *
     * @param mixed $userId
     * @return bool
     */
    public function isSuperAdmin($userId = null) : bool;
    
    /**
     * If a guest or current user is allowed to create a record for a given entity,
     * this method should return true, false otherwise.
     * 
     * @param Entity $user
     * @param string $classUrlName
     * @return bool
     */
    public function isAnyCreatingAllowed(?Entity $user, string $classUrlName) : bool;
    
    /**
     * If a guest or current user is allowed to read any record of a given entity,
     * this method should return true, false otherwise.
     * 
     * @param Entity $user
     * @param string $classUrlName
     * @return bool
     */
    public function isAnyReadingAllowed(?Entity $user, string $classUrlName) : bool;
    
    /**
     * If a guest or current user is allowed to update any record of a given entity,
     * this method should return true, false otherwise.
     * 
     * @param Entity $user
     * @param string $classUrlName
     * @return bool
     */
    public function isAnyUpdatingAllowed(?Entity $user, string $classUrlName) : bool;
    
    /**
     * If a guest or current user is allowed to delete any record of a given entity,
     * this method should return true, false otherwise.
     * 
     * @param Entity $user
     * @param string $classUrlName
     * @return bool
     */
    public function isAnyDeletingAllowed(?Entity $user, string $classUrlName) : bool;
    
    /**
     * If a guest or current user is allowed to restore any record of a given entity,
     * this method should return true, false otherwise.
     * 
     * @param Entity $user
     * @param string $classUrlName
     * @return bool
     */
    public function isAnyRestoringAllowed(?Entity $user, string $classUrlName) : bool;
    
    /**
     * Can the current user or guest read the given object or not?
     * 
     * @param Entity $user
     * @param Entity $entity
     * @return bool
     */
    public function isReadingAllowed(?Entity $user, Entity $entity) : bool;
    
    /**
     * Can the current user or guest update the given object or not?
     * 
     * @param Entity $user
     * @param Entity $entity
     * @return bool
     */
    public function isUpdatingAllowed(?Entity $user, Entity $entity) : bool;
    
    /**
     * Can the current user or guest delete the given object or not?
     * 
     * @param Entity $user
     * @param Entity $entity
     * @return bool
     */
    public function isDeletingAllowed(?Entity $user, Entity $entity) : bool;
    
    /**
     * Can the current user or guest restore the given object or not?
     * 
     * @param Entity $user
     * @param Entity $entity
     * @return bool
     */
    public function isRestoringAllowed(?Entity $user, Entity $entity) : bool;
    
    /**
     * If not all objects of the given entity are readable by the current user or guest,
     * the method should add a filter to the parameters variable and then return it.
     * 
     * @param string $class
     * @param array $parameters
     * @param string $alias
     * @return array
     */
    public function addRecordsFilter(string $class, array $parameters = [], string $alias = null) : array;
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
      pageTitle: "ACL extended implementation",
      pageDescription:
        "ACL extended implementation with entities and records permissions management.",
      menu: [
        {
          link: "bitmask",
          title: "Permission bitmask",
        },
        {
          link: "groups",
          title: "Groups",
        },
        {
          link: "groupPermissions",
          title: "Group permissions",
        },
        {
          link: "entityPermissions",
          title: "Entity permissions",
        },
        {
          link: "implementation",
          title: "Your implementation",
        },
      ],
    };
  },
};
</script>
