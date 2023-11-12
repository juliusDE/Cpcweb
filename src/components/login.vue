<script>
export default {
  name: "LoginWeb",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    getToken() {
      return "token";
    },
    async login() {
      let token = await this.getToken();
      // Llama a la acción de Vuex para realizar el inicio de sesión
      this.$store.dispatch("login", token);
      // Redirige a la página principal
      if (this.$store.state.token) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="username" label="Usuario" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
    </v-form>
  </v-container>
</template>
