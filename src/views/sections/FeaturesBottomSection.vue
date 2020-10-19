<template>
  <div class="section">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-size-100">
        <h2 class="md-display-1">Out of the box</h2>
      </div>
    </div>
    <div class="md-layout md-gutter md-alignment-top-center">
      <div
        class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-50 md-small-size-100"
      >
        <md-card>
          <md-card-header class="md-accent-dark">
            <md-card-header-text>
              <div class="md-title">RESTful</div>
            </md-card-header-text>
            <md-card-media>
              <md-icon class="md-size-2x">language</md-icon>
            </md-card-media>
          </md-card-header>
          <md-card-content>
            Ready-made CRUD services. Which allows you to filter objects by
            properties of related objects by the received parameters in JSON or
            URL encoding. With sorting, ordering and two pagination modes.
          </md-card-content>
          <md-card-actions>
            <md-button
              class="md-accent md-raised"
              to="/guides/rest"
              title="RESTful / CRUD services"
              @click="
                window.OWATracker.trackAction(
                  'Click',
                  'Features',
                  'Got to REST'
                )
              "
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
            Integration of the OAuth 2.0 authorization framework. Bearer token
            management in the admin panel.
          </md-card-content>
          <md-card-actions>
            <md-button
              class="md-accent md-raised"
              to="/guides/oauth"
              title="OAuth integration to Laravel Admin and the CRUD services"
              @click="
                window.OWATracker.trackAction(
                  'Click',
                  'Features',
                  'Got to OAuth'
                )
              "
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
              <div class="md-title">Json Query</div>
            </md-card-header-text>
            <md-card-media>
              <md-icon class="md-size-2x">code</md-icon>
            </md-card-media>
          </md-card-header>
          <md-card-content>
            The HTTP request parameters or payload are converted to a PHP
            associative array. This array is a PHP analog of JSON object. It is
            used to build a DQL query with cleanup, validation, and strong
            typing of the input values.
          </md-card-content>
          <md-card-actions>
            <md-button
              class="md-accent md-raised"
              to="/guides/json"
              title="JSON Query extended implementation"
              @click="
                window.OWATracker.trackAction(
                  'Click',
                  'Features',
                  'Got to JSON Query'
                )
              "
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
            User and group management. Group and entity permission management.
          </md-card-content>
          <md-card-actions>
            <md-button
              class="md-accent md-raised"
              to="/guides/acl"
              title="Group implementation of Access Control List"
              @click="
                window.OWATracker.trackAction('Click', 'Features', 'Got to ACL')
              "
              >Read more</md-button
            >
          </md-card-actions>
        </md-card>
      </div>
      <div
        class="md-layout-item md-size-70 md-xlarge-size-20 md-small-size-100"
      >
        <md-card>
          <md-card-header class="md-accent-dark">
            <md-card-header-text>
              <div class="md-title">Laravel Admin</div>
            </md-card-header-text>
            <md-card-media>
              <md-icon class="md-size-2x">dashboard</md-icon>
            </md-card-media>
          </md-card-header>
          <md-card-content>
            Adaptive design. User access management. Exclusive search
            capabilities. Soft deletion and restoration. When you create a
            mapping for a new entity, it automatically becomes managed and
            available in the admin panel and REST services. No coding required.
          </md-card-content>
          <md-card-actions>
            <md-button
              class="md-accent md-raised"
              to="/guides/admin"
              title="Laravel Admin panel with Doctrine, CRUD, OAuth2 and ACL management"
              @click="
                window.OWATracker.trackAction(
                  'Click',
                  'Features',
                  'Admin panel'
                )
              "
              >Read more</md-button
            >
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>
