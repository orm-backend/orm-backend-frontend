<template>
  <footer style="opacity: 0">
    <div class="outer-container">
      <div class="inner-container">
        <md-bottom-bar md-type="shift">
          <md-bottom-bar-item
            id="bottom-bar-item-home"
            md-label="Home"
            to="/#features"
            md-icon="home"
            md-sync-route="true"
            title="ORM Backend home page"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-admin"
            md-label="Admin"
            to="/guides/admin"
            md-icon="dashboard"
            md-sync-route="true"
            title="Laravel Admin with CRUD, OAuth and Doctrine integrated"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-json"
            md-label="Json"
            md-icon="code"
            to="/guides/json"
            md-sync-route="true"
            title="Json Query implementation"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-crud"
            md-label="REST"
            md-icon="language"
            to="/guides/rest"
            md-sync-route="true"
            title="REST services"
          ></md-bottom-bar-item>
          <md-bottom-bar-item
            id="bottom-bar-item-acl"
            md-label="ACL"
            md-icon="policy"
            to="/guides/acl"
            md-sync-route="true"
            title="Access Control List extended implementation"
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
