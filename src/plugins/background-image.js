export default {
  bind: function (el, binding, vnode) {
    if (binding.value) {
      $(el).css("transition", "opacity 0.23s ease-in").css("opacity", 0);

      $("<img />")
        .attr("src", binding.value)
        .on("load", function (e) {
          $(e.target).remove();
          $(el)
            .css("background-image", 'url("' + binding.value + '")')
            .css("opacity", 1);
        })
        .appendTo(el);
    }
  },
};
