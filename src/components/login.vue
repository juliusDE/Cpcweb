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
      if (this.username === "user@test.com" && this.password === "12345") {
        this.$store.dispatch(
          "login",
          "añaldjfñlakdjsfñaldkjfñalsdkfjañldkfjñaldkfjañsdlfjñalsdkfjasñvhpaldkfjñaldsfja"
        );
        this.$router.push({ name: "Home" });
      }
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
