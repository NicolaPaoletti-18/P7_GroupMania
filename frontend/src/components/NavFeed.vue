<!-- COMPONENT NAVFEED - Nav et Header des pages principales -->

<template>
  <header class="mb-1 mb-md-3">
    <nav class="navbar navbar-expand-lg navbar-light">
      <!-- Logo Groupomania -->
      <h1 class="navbar-brand w-50">
        <router-link to="/Feed">
          <img class="img-fluid" alt="Groupomania" src="../assets/logo-feed.svg" role="link" />
        </router-link>
      </h1>
      <!-- Fin -->
      <!-- Bouton responsive pour dévoiler le menu -->
     
    <!-- Fin -->
    <!-- Menu de navigation -->
    <!-- Fin -->
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavFeed",
};
</script>