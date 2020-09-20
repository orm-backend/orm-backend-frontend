<template>
  <div id="features">
    <div class="md-layout">
      <div
        class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
      >
        <h2 class="md-display-1">
          Once installed and configured, you only need to write the Doctrine XML
          mapping files.
        </h2>
        <p class="md-subheading">
          Everything is very simple. The main purpose is to get the mapping
          files. You can use reverse engineering or write them by hand. Learn
          <a
            href="https://www.doctrine-project.org/projects/doctrine-orm/en/current/tutorials/getting-started.html"
            target="_blank"
            >Doctrine</a
          >
          how to do that. When the mapping is done, just run a console command
          to generate the entities and database tables. And that’s it.
        </p>
        <h2 class="md-display-1">Out of the box</h2>
      </div>
    </div>
    <u-animate-container>
      <u-animate
        name="fadeInLeft"
        delay="0"
        duration="1s"
        :iteration="1"
        :offset="150"
        animateClass="animate__fadeInLeft"
        :begin="false"
      >
        <div class="md-layout md-gutter features">
          <div
            class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-50 md-small-size-100"
          >
            <md-card>
              <md-card-header class="md-accent-dark">
                <md-card-header-text>
                  <div class="md-title">REST</div>
                </md-card-header-text>
                <md-card-media>
                  <md-icon class="md-size-2x">language</md-icon>
                </md-card-media>
              </md-card-header>
              <md-card-content>
                Powerful production-ready CRUD services. Which allows you to
                filter objects by properties of related objects by the received
                parameters in JSON or URL encoding. With sorting, ordering and
                two pagination modes.
              </md-card-content>
              <md-card-actions>
                <md-button
                  class="md-accent md-raised"
                  to="/docs/rest"
                  title="JSON / REST / CRUD services"
                  >Read more</md-button
                >
              </md-card-actions>
            </md-card>
          </div>
          <div
            class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-50 md-small-size-100"
          >
            <md-card>
              <md-card-header class="md-accent-dark">
                <md-card-header-text>
                  <div class="md-title">OAuth</div>
                </md-card-header-text>
                <md-card-media>
                  <md-icon class="md-size-2x">security</md-icon>
                </md-card-media>
              </md-card-header>
              <md-card-content>
                Integration of the OAuth 2.0 authorization framework. Bearer
                token management in the admin panel.
              </md-card-content>
              <md-card-actions>
                <md-button
                  class="md-accent md-raised"
                  to="/docs/oauth"
                  title="OAuth integration to Laravel Admin and the CRUD services"
                  >Read more</md-button
                >
              </md-card-actions>
            </md-card>
          </div>
          <div
            class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-50 md-small-size-100"
          >
            <md-card>
              <md-card-header class="md-accent-dark">
                <md-card-header-text>
                  <div class="md-title">JSON Query Language</div>
                </md-card-header-text>
                <md-card-media>
                  <md-icon class="md-size-2x">code</md-icon>
                </md-card-media>
              </md-card-header>
              <md-card-content>
                The HTTP request parameters or payload are converted to a PHP
                associative array. This array is a PHP analog of JSON object. It
                is used to build a DQL query with cleanup, validation, and
                strong typing of the input values.
              </md-card-content>
              <md-card-actions>
                <md-button
                  class="md-accent md-raised"
                  to="/docs/json"
                  title="JSON Query extended implementation"
                  >Read more</md-button
                >
              </md-card-actions>
            </md-card>
          </div>
          <div
            class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-50 md-small-size-100"
          >
            <md-card>
              <md-card-header class="md-accent-dark">
                <md-card-header-text>
                  <div class="md-title">ACL</div>
                </md-card-header-text>
                <md-card-media>
                  <md-icon class="md-size-2x">policy</md-icon>
                </md-card-media>
              </md-card-header>
              <md-card-content>
                User and group management. Group and entity permission
                management.
              </md-card-content>
              <md-card-actions>
                <md-button
                  class="md-accent md-raised"
                  to="/docs/acl"
                  title="Group implementation of Access Control List"
                  >Read more</md-button
                >
              </md-card-actions>
            </md-card>
          </div>
          <div
            class="md-layout-item md-size-70 md-xlarge-size-20 md-small-size-100 mx-auto"
          >
            <md-card>
              <md-card-header class="md-accent-dark">
                <md-card-header-text>
                  <div class="md-title">Admin panel</div>
                </md-card-header-text>
                <md-card-media>
                  <md-icon class="md-size-2x">dashboard</md-icon>
                </md-card-media>
              </md-card-header>
              <md-card-content>
                Adaptive design. User access management. Exclusive search
                capabilities. Soft deletion and restoration. When you create a
                mapping for a new entity, it automatically becomes managed and
                available in the admin panel and REST services. No coding
                required.
              </md-card-content>
              <md-card-actions>
                <md-button
                  class="md-accent md-raised"
                  to="/docs/admin"
                  title="Laravel Admin panel with Doctrine, CRUD, OAuth2 and ACL management"
                  >Read more</md-button
                >
              </md-card-actions>
            </md-card>
          </div>
        </div>
      </u-animate>
    </u-animate-container>
  </div>
</template>
