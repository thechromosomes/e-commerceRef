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
    script: [
      {
        src: "/gumlet.js",
        async: true,
      },
    ],
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
    { src: "@/plugins/globalErrorHandler", ssr: true, defer: true },
    { src: "@/plugins/tokenAndCms.js", ssr: true, defer: true },
    { src: "@/plugins/axios", ssr: true, defer: true },
    { src: "@/plugins/vue-cookies", ssr: true, defer: true },
    { src: "@plugins/thirdPartyModulesSsr", ssr: true, defer: true },
    { src: "@plugins/thirdPartyModules", ssr: false, defer: true },
    { src: "@plugins/fetchCookies", ssr: false, defer: true },
  ],

  //  Customize the progress bar color
  loading: {
    color: "black",
    height: "5px",
    continuous: true,
  },

  // Auto import components
  components: true,

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/device",
    "@nuxtjs/gtm",

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
  manifest: {
    name: "Diesel",
    lang: "en",
    title: "Diesel",
    description: "Diesel",
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    short_name: "Diesel",
    ogImage: `icon.png`,
    icons: [
      {
        src: `/icon.png`,
        size: "144x144",
        type: "image/png",
      },
      {
        src: `/icon.png`,
        size: "128x128",
        type: "image/png",
      },
      {
        src: `/icon.png`,
        size: "152x152",
        type: "image/png",
      },
      {
        src: `/icon.png`,
        size: "180x180",
        type: "image/png",
      },
      {
        src: `/icon.png`,
        size: "192x192",
        type: "image/png",
      },
      {
        src: `/icon.png`,
        size: "256x256",
        type: "image/png",
      },
    ],
  },

  // google tag manger
  gtm: {
    id: "GTM-NLQNS6G",
    enabled: true,
    debug: true,
    loadScript: true,
    scriptDefer: true,
  },

  // error handler hook
  hooks: {
    render: {
      errorMiddleware(app) {
        app.use(async (error, req, res, next) => {
          if (error) {
            let finalError = await error;
            console.log("finalError", finalError);
          }
        });
      },
    },
  },

  server: {
    port: 9000,
    // configure local area network
    // host: "0"
  },
};
