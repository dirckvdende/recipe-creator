// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    ssr: false,
    css: ["~/assets/scss/main.scss"],
    runtimeConfig: {
        public: {
            siteName: "Recipe Creator",
        }
    },
    app: {
        head: {
            link: [{
                // Google icons
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Material+" +
                "Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1," +
                "-50..200",
            }, {
                // Google fonts: Fredoka
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Fredoka:wght" +
                "@300..700&display=swap",
            }, {
                // Favicon
                rel: "icon",
                type: "image/x-icon",
                href: "./favicon.png",
            }],
            meta: [{
                property: "og:title",
                content: "Recipe Creator",
            }, {
                property: "og:description",
                content: "Recipe design web app",
            }, {
                property: "og:type",
                content: "website",
            }, {
                property: "og:url",
                content: "https://dirck.dev/recipe-creator/",
            }, {
                property: "og:image",
                content: "https://dirck.dev/recipe-creator/recipe-creator-thumb.jpg",
            }],
        }
    }
})
