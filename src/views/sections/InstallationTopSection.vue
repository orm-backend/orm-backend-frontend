<template>
  <div id="installation" class="section">
    <h2 class="md-display-1 text-center">Installation</h2>
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-50 md-small-size-100">
        <p class="md-subheading">
          The PHP code is hosted on github in the private repository. Email us
          to get access. Once access is granted, simply add the required
          packages and dependencies to the composer config file. JavaScript
          packages are publicly available at the NPM. Please note that front-end
          of the admin panel is based on the
          <b class="md-text-accent">commercial template</b> from
          <a href="https://keenthemes.com/" target="_blank" rel="noopener"
            >keenthemes.com</a
          >
          and you must purchase a license to use it on your site.
        </p>
        <p class="md-subheading">
          It is possible to install only the necessary packages depending on
          your needs. Each package contains instructions for installing it.
        </p>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <ul>
          <li>
            <code>ormbackend/laravel-doctrine</code> The main package. Should
            always be installed. Contains core classes, the Json Query and
            RESTful services. The default implementation of ACL is included
            also.
          </li>
          <li>
            <code>ormbackend/laravel-doctrine-acl</code> An extended ACL
            implementation allows you to manage user group permissions for a
            given entity.
          </li>
          <li>
            <code>ormbackend/laravel-doctrine-web</code> Helper classes for use
            in MVC mode. Required for Laravel Admin panel.
          </li>
          <li>
            <code>ormbackend/laravel-doctrine-admin</code> Laravel Admin panel.
          </li>
          <li>
            <code>ormbackend/laravel-doctrine-oauth</code> OAuth token
            management for Laravel Admin panel.
          </li>
          <li>
            <code>ormbackend/laravel-doctrine-example</code> Example
            integration. Good point to start from scratch.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
