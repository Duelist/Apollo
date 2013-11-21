/*global $, document*/

(function () {
  "use strict";

  var MIN_SIZE = 4;

  function createDomElement (element) {
    if (! _.isString(element)) {
      return undefined;
    }

    return function (_class) {
      // TODO: sanity check goes here

      var class_list = (_.isArray(_class)) ? _class.join(' ') : _class;

      return $(['<', element, '>'].join(''), { 'class': class_list });
    }
  }

  function createBlock (size) {
    if (! _.isString(size)) {
      return undefined;
    }

    var create_div = createDomElement('div'),
        left = create_div(['one', 'wide', 'left', 'aligned', 'column']),
        right = create_div(['one', 'wide', 'right', 'aligned', 'column']),
        middle = create_div(['fourteen', 'wide', 'column']),
        placeholder= create_div(['placeholder']),
        block = create_div(['ui', 'middle', 'aligned', 'grid', 'block', 'block-idle']),
        column = create_div([size, 'wide', 'column']);

    middle.append(placeholder);

    block.append(left);
    block.append(middle);
    block.append(right); 

    column.append(block);

    return column;
  }

  function splitBlock (block) {
    var size = 0,
        new_size = [],
        new_blocks = [];

    // TODO
    size = convertSize(getBlockSize(block));
    new_size = _.map([Math.ceil(size / 2), Math.floor(size / 2)], convertSize);
    return _.map(new_size, createBlock);
  }

  function getBlockSize (block) {
    // TODO
    var class_list = block.attr('class').split(' ');
    return _.first(_.filter(class_list, function (x) { return ! _.isUndefined(convertSize(x)); }));
  }

  function convertSize (value) {
    var index,
        stoi = {
          'one': 1,
          'two': 2,
          'three': 3,
          'four': 4,
          'five': 5,
          'six': 6,
          'seven': 7,
          'eight': 8,
          'nine': 9,
          'ten': 10,
          'eleven': 11,
          'twelve': 12,
          'thirteen': 13,
          'fourteen': 14,
          'fifteen': 15,
          'sixteen': 16
        },
        itos = _.invert(stoi);

    if (_.isString(value)) {
      return stoi[value];
    } else if (_.isNumber(value)) {
      return itos[value];
    } else {
      return undefined;
    }
  }

  $(document).ready(function () {
    $(".add-row").click(function () {
      var new_row = createDomElement('div')(['row', 'block-row']),
          new_block = createBlock('sixteen');

      new_row.append(new_block);
      $(".workspace").append(new_row);
    });

    $(".split").click(function () {
      if ($('.block-selected').length > 0){
        if (convertSize(getBlockSize($('.block-selected').parent())) > MIN_SIZE) {
          var current_row = undefined,
              new_blocks = undefined,
              removed_node = $('.block-selected').parent();

          new_blocks = splitBlock(removed_node);

          $('.block-selected').parent().after(new_blocks);
          $('.block-selected').parent().remove();
        }
      }
    });

    $(".workspace").on("mouseenter", ".block", function () {
      $(this).removeClass("block-idle");
      $(this).addClass("block-active");
    });

    $(".workspace").on("mouseleave", ".block", function () {
      $(this).removeClass("block-active");
      $(this).addClass("block-idle");
    });

    $(".workspace").on("click", ".block", function () {
      $(".block").removeClass("block-selected");
      $(this).addClass("block-selected");
    });
  });
})();