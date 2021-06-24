// import CreateLog from "./server-middleware/globalErrorMiddleware";

export default {
  head: {
    title: "Diesel Online Store: jeans, clothing, shoes, bags and watches.",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Diesel Online Store: jeans, clothing, shoes, bags and watches",
      },
      {
        hid: "og:Diesel",
        property: "og:Diesel",
        content: "Diesel",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "/icon.svg",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [],
  },

  // Global CSS
  css: [
    "~/assets/css/bootstrap.css",
    "~/assets/css/style.css",
    "~/assets/css/slick.css",
    "~/assets/css/responsive.css",
  ],

  // Plugins to run before rendering page
  plugins: [
    { src: "@/plugins/coustom.js", ssr: false },
    { src: "@/plugins/tokenAndCms.js", ssr: true },
    { src: "@/plugins/globalErrorHandler", ssr: true },
    { src: "@/plugins/axios", ssr: true },
    { src: "@/plugins/vue-cookies", ssr: true },
    { src: "@plugins/thirdPartyModulesSsr", ssr: true },
    { src: "@plugins/thirdPartyModules", ssr: false },
    { src: "@plugins/fetchCookies", ssr: false },
  ],

  //  Customize the progress bar color
  loading: {
    color: "black",
    height: "5px",
    continuous: true,
  },

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    // "@nuxtjs/vuetify",
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/device",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["fab"],
          },
        ],
      },
    ],
  ],

  // PWA module configuration
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // google tag manger
  gtm: {
    id: "GTM-MTLQ39Z",
    enabled: false,
    debug: false,
    loadScript: false,
  },

  // a server middleware that runs only server site
  // serverMiddleware: ["~/server-middleware/globalErrorMiddleware"],

  // error handler hook
  // hooks: {
  //   render: {
  //     errorMiddleware(app) {
  //       app.use(async (error, req, res, next) => {
  //         if (error) {
  //           let finalError = await error;
  //           console.log("finalError", finalError);
  //           // CreateLog.error({
  //           //   error: `>>> ${finalError}`,
  //           //   metaInformation: req.rawHeaders,
  //           //   type: "error middleware",
  //           //   from: req.url,
  //           // });
  //           res.redirect("/404");
  //         } else {
  //           res.redirect("/404");
  //         }
  //       });
  //     },
  //   },
  // },

  server: {
    port: 9000,
    // configure local area network
    // host: "0"
  },
};
