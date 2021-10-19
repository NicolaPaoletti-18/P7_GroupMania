<!-- COMPONENT ALERT - Les posts et commentaires crées, supprimés et les tentatives de connexion -->

<template>
  <div class="alert" :class="alertType" role="alert">{{ alertMessage }}</div>
</template>

<script>
export default {
  name: "Alert",
  props: ['alertType', 'alertMessage'],
};
</script>