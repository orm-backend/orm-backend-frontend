<template>
  <footer style="opacity: 0">
    <div class="outer-container">
      <div class="inner-container">
        <md-bottom-bar md-type="shift">
          <md-bottom-bar-item
            id="bottom-bar-item-home"
            md-label="Home"
            to="/"
            md-icon="home"
            md-sync-route="true"
            title="ORM based PHP backend with Laravel Admin and RESTful services"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-json"
            md-label="Json Query"
            md-icon="code"
            to="/guides/json-query"
            md-sync-route="true"
            title="Json Query implementation"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-crud"
            md-label="RESTful"
            md-icon="language"
            to="/guides/restful"
            md-sync-route="true"
            title="RESTful services"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-acl"
            md-label="Access Control"
            md-icon="policy"
            to="/guides/acl"
            md-sync-route="true"
            title="Access Control extended implementation"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-admin"
            md-label="Laravel Admin"
            to="/guides/laravel-admin"
            md-icon="dashboard"
            md-sync-route="true"
            title="Laravel Admin with integrated RESTful services"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-oauth"
            md-label="OAuth"
            md-icon="security"
            to="/guides/oauth"
            md-sync-route="true"
            title="Laravel Admin OAuth integration"
          ></md-bottom-bar-item>
        </md-bottom-bar>
      </div>
    </div>
  </footer>
</template>
