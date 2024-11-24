// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/styles/main.css"],
  tailwindcss: {
    cssPath: "~/assets/styles/main.css",
  },
  postcss: {
    plugins: {
      cssnano: {},
      "postcss-nested": {},
      "postcss-custom-media": {},
    },
  },
});
