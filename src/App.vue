<template>
  <v-app :isDark="darkTheme">
    <v-app-bar app v-if="$store.getters.isAuthenticated">
      CPC Móvil
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout()">Cerrar sesión.</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
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
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "LoginWeb" });
    },
  },
};
</script>
