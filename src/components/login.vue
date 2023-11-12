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
      this.$Request
        .post("/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if ("token" in response.data) {
            this.$store.dispatch("login", response.data.token);
            this.$router.push({ name: "Home" });
          }
        })
        .catch((error) => {});
    },
    async login() {
      if (this.$refs.login.validate()) {
        await this.getToken();
      }
    },
  },
  computed: {
    blanksInput() {
      return [(value) => !!value || "Campo obligatorio"];
    },
  },
};
</script>
<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="login" ref="login">
          <v-row>
            <v-col class="d-flex justify-content-center">
              <v-text-field
                v-model="username"
                label="Usuario"
                required
                :rules="blanksInput"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-content-center">
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                required
                :rules="blanksInput"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-content-center">
              <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
