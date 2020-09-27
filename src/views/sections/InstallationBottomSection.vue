<template>
  <div id="installation-bottom" class="section">
    <div class="md-layout md-gutter md-alignment-top-center">
      <div
        class="md-layout-item md-size-50 md-xlarge-size-33 md-small-size-100"
      >
        <md-card>
          <md-card-header class="md-primary-dark">
            <md-card-header-text>
              <div class="md-title">
                You have a Laravel project that uses the Doctrine already
              </div>
            </md-card-header-text>
            <md-card-media>
              <md-icon class="md-size-2x">done_all</md-icon>
            </md-card-media>
          </md-card-header>
          <md-card-content>
            <p>
              Check dependencies, PHP and Doctrine versions. Install and
              configure packages.
            </p>
            <p>
              Add <code>\OrmBackend\Publishable</code> interface to the entities
              that should be accessible from services and the admin panel. This
              interface is just a marker.
            </p>
            <p>
              There is a potential conflict of
              <code>\App\Model\User</code> and
              <code>\App\Model\Role</code> entities with those available in your
              project. You can choose not to install the package entities and
              resolve the conflict yourself or install new models to a separate
              folder.
            </p>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-size-50 md-xlarge-size-33 md-small-size-100"
      >
        <md-card>
          <md-card-header class="md-primary-dark">
            <md-card-header-text>
              <div class="md-title">
                You have a Laravel project with or without any other ORM
              </div>
            </md-card-header-text>
            <md-card-media>
              <md-icon class="md-size-2x">done_all</md-icon>
            </md-card-media>
          </md-card-header>
          <md-card-content>
            <p>
              Check dependencies, PHP version. Install and configure packages.
              Follow the package installation guide.
            </p>
            <p>
              Generate mapping files using reverse engineering tools and edit
              them. Run a console command to generate the ORM classes. Note that
              the default table prefix is <code>d_</code>.
            </p>
            <p>
              If you have an Eloquent model in your project, you can put the
              entities to a separate folder. Read the instructions on the
              <a href="http://www.laraveldoctrine.org/" target="_blank"
                >Laravel-Doctrine</a
              >
              site to learn how to set up authentication.
            </p>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-size-75 md-xlarge-size-33 md-xsmall-size-100"
      >
        <md-card>
          <md-card-header class="md-primary-dark">
            <md-card-header-text>
              <div class="md-title">You start a project from scratch</div>
            </md-card-header-text>
            <md-card-media>
              <md-icon class="md-size-2x">done_all</md-icon>
            </md-card-media>
          </md-card-header>
          <md-card-content>
            <p>
              Check dependencies, PHP versions. Install Laravel and run it.
              Install and configure necessary packages.
            </p>

            <p>Start working on the customer's tasks.</p>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
