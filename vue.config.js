module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      navigateFallback: 'index.html'
    },
    name: "Calculadora Iva"
  }
}