<template>
  <v-app :isDark="darkTheme">
    <v-app-bar app> CPC Móvil </v-app-bar>
    <br />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      darkTheme: false,
      drawer: false,
    };
  },
};
</script>
