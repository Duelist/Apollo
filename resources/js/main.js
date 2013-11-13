/*global $, document*/

(function () {
  "use strict";

  var makeXsBlock = createBlock(['md', 'lg']);
  var makeMdBlock = createBlock(['md', 'lg']);
  var makeLgBlock = createBlock(['md', 'lg']);

  function createDomElement (element) {
    // TODO: sanity check goes here

    return function (_class) {
      // TODO: sanity check goes here

      var class_list = (_.isArray(_class)) ? _class.join(' ') : _class;

      return $(['<', element, '>'].join(''), { 'class': class_list });
    }
  }

  function makeRow() {
    var createDiv = createDomElement('div');
    return createDiv('row');
  }

  function createBlock (block_view) {
    // TODO: sanity check goes here

    return function (block_size) {
      // TODO: sanity check goes here

      var classes,
          createDiv = createDomElement('div');

      if (_.isArray(block_view)) {
        classes = _.map(block_view, function (x) { return ['col', x, block_size].join('-'); });
      } else {
        classes = [['col', block_view, block_size].join('-')];
      }

      classes.push('block');
      classes.push('block-idle');

      return createDiv(classes);
    }
  }

  function splitBlock (block) {
    var sizes = [],
        class_list = [];

    // TODO

    return _.map(sizes, createBlock);
  }

  function getBlockView (block) {

    // TODO


  }

  function getBlockSize (block) {

    // TODO

  }

  $(document).ready(function () {

    $(".add-row").click(function () {
      var new_row = makeRow(),
          new_block = makeMdBlock(12);

      new_row.append(new_block);
      $('.workspace').append(new_row);
    });

    $(".workspace").on("mouseenter", ".block", function () {
      $(this).removeClass("block-idle");
      $(this).addClass("block-active");
    });

    $(".workspace").on("mouseleave", ".block", function () {
      $(this).removeClass("block-active");
      $(this).addClass("block-idle");
    });

    $(".workspace").on("click", ".block", function (e) {
      $(".block").removeClass("block-selected");
      $(this).addClass("block-selected");
    });
  });
})();