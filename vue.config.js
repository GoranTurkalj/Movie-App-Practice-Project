module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },

   publicPath: "https://goranturkalj.github.io/Movie-App-Practice-Project",
  //publicPath: "/Movie-App-Practice-Project/",
 // publicPath: "https://goranturkalj.github.io/",
};
