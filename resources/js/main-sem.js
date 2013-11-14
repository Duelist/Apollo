/*global $, document*/

/*

<div class="ui middle aligned grid block block-idle">
  <div class="one wide left aligned column">
    &larr;
  </div>
  <div class="fourteen wide column">
    <div class="placeholder"></div>
  </div>
  <div class="one wide right aligned column">
    &rarr;
  </div>
</div>

*/

//(function () {
//  "use strict";

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
    return createDiv(['ui', 'one', 'column', 'grid', 'block-row']);
  }

  function createBlock () {
    var createDiv = createDomElement('div');

    var left = createDiv(['one', 'wide', 'left', 'aligned', 'column']);
    var right = createDiv(['one', 'wide', 'right', 'aligned', 'column']);
    var middle = createDiv(['fourteen', 'wide', 'column']);
    var placeholder= createDiv(['placeholder']);
    var block = createDiv(['ui', 'middle', 'aligned', 'grid', 'block', 'block-idle']);


    left.html('&larr;');
    right.html('&rarr;');
    middle.append(placeholder);

    block.append(left);
    block.append(middle);
    block.append(right);

    return block;
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
      /*
      var new_row = makeRow(),
          new_block = createBlock();

      new_row.append(new_block);
      $(".workspace").append(new_row);
      console.log(new_row);
      */

      $(".workspace").append(createBlock());

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
//})();