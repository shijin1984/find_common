$(function() {
  console.log("in main.js!");
  var config = {
    elementCount: 3,
    elementFigs: "1234567890",
  };

  var shuffleArray = function(array) {
    // Shuffle the array.
    var currentIndex = array.length;
    while (currentIndex != 0) {
      // Pick a remaining element.
      var randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  var create_content_nodes = function() {
    var three_elem = function(position) {
      var parentId = position + "_td";
      var width = $("#" + parentId).width();
      var height = $("#" + parentId).height();
      var size = Math.min(width/2, height/2);

      var nodes = [];
      for (var i = 0; i < 3; ++i) {
        var node = $("<div></div>", { id: position + "_fig_" + i});
        node.text(i + 1);
        node.css({
          width: size + "px",
          height: size + "px",
          "font-size": size + "px",
        });

        nodes.push(node);
      }

      nodes[0].css("margin-left", (width / 4) + "px");
      nodes[1].css({float: "left", width: "50%"});
      nodes[2].css({float: "left", width: "50%"});

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

  $("#shuf").click(function() {
    var array = shuffleArray(Array.from(config.elementFigs));
    var left = array.slice(0, 3);
    var right = array.slice(3, 5);
    right.push(array[0]);

    var setFigs = function(position, figs) {
      figs = shuffleArray(figs);
      for (var i = 0; i < figs.length; ++i) {
        $("#" + position + "_fig_" + i).text(figs[i]);
      }
    }

    setFigs("left", left);
    setFigs("right", right);
  });

  create_content_nodes();
});
