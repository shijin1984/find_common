$(function() {
  console.log("in main.js!");
  var config = {
    elementCount: 3,
  };

  var create_content_nodes = function() {
    var three_elem = function(position) {
      var parentId = position + "_td";
      var width = $("#" + parentId).width();
      var height = $("#" + parentId).height();
      var size = Math.min(0.5*width, 0.5*height);

      var nodes = [];
      for (var i = 0; i < 3; ++i) {
        var node = $("<div></div>", { id: position + "_fig_" + i});
        node.text(i + 1);
        nodes.push(node);
      }

      for (var i = 0; i < 3; ++i) {
        $("#" + parentId).append(nodes[i]);
      }
    };

    var func_list = [
        /*0*/null, /*1*/null, /*2*/null, /*3*/three_elem, /*4*/null
    ];

    $("#left_td").empty();
    func_list[config.elementCount]("left");
    $("#right_td").empty();
    func_list[config.elementCount]("right");
  };

  create_content_nodes();
});
