module.exports = {
  // ... Otras configuraciones de ESLint
  extends: [
    "plugin:vue/recommended",
    // ... Otras extensiones
  ],
  rules: {
    // ... Otras reglas

    // Agrega la regla vue/valid-v-slot
    "vue/valid-v-slot": ["error", { allowModifiers: true }],
  },
};
