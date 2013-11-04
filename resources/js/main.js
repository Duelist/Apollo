/*global $, document*/

(function () {
  "use strict";

  var makeXsBlock = createBlock('md');
  var makeMdBlock = createBlock('md');
  var makeLgBlock = createBlock('md');
  var makeRow = createDiv('row');

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

  function createDiv (_class) {
    var class_list = (_.isArray(_class)) ? _class.join(' ') : _class;

    return function () {
      return $('<div>', { 'class': class_list });
    }
  }

  function createBlock (block_class) {
    return function (block_size) {
      return createDiv(['col-' + block_class + '-' + block_size, 'block', 'block-idle']);
    }
  }

  function splitBlock (block) {
    var sizes = [],
        class_list = [];

  

    return _.map(sizes, createBlock);
  }

  function getBlockClass () {

  }

  function getBlockSize () {

  }
})();