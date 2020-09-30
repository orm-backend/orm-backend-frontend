module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });

    config.resolve.alias
      .set("TweenMax", "gsap/src/uncompressed/TweenMax.js")
      .set("TimelineMax", "gsap/src/uncompressed/TimelineMax.js")
      .set("ScrollToPlugin", "gsap/ScrollToPlugin.js")
      .set("ScrollMagic", "scrollmagic/scrollmagic/uncompressed/ScrollMagic.js")
      .set(
        "animation.gsap",
        "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js"
      )
      .set(
        "debug.addIndicators",
        "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js"
      );
  },
};
