$(function() {
  var config = {
    elementCount: 3,
    elementFigs: "🍇🍈🍉🍋🍌🍍🍎🍑🍒🍓🥝🥕🌽🌶️🍄🥜🍚",
    selectedFigId: null,
    audio: new Audio("audio/praise2.mp3"),
  };
  config.audio.autoplay = false;

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

  var onClickFig = function() {
    var id = $(this).attr("id");
    if (config.selectedFigId == null) {
      // None in selection, so to select this.
      config.selectedFigId = id;
      $(this).css("border-style", "solid");
    } else if (config.selectedFigId == id) {
      // Click the same element again, do nothing.
    } else {
      // Click another fig, either on the same side or the other.
      // Compare the text will always work because of no duplicated figs.
      if ($(this).text() == $("#" + config.selectedFigId).text()) {
        // It is a winning cases!
        $("#" + config.selectedFigId).css("border-style", "hidden");
        config.selectedFigId = null;

        if (config.audio.paused || config.audio.ended) {
          config.audio.currentTime = 0;
          config.audio.play();
        }
      } else {
        // A wrong match, select the newly clicked one.
        $("#" + config.selectedFigId).css("border-style", "hidden");
        config.selectedFigId = id;
        $(this).css("border-style", "solid");
      }
    }
  };

  var createContentNodes = function() {
    var three_elem = function(position) {
      var parentId = position + "_td";
      var width = $("#" + parentId).width();
      var height = $("#" + parentId).height();
      var size = Math.min(width/2, height/2) - 2;

      var nodes = [];
      for (var i = 0; i < 3; ++i) {
        var node = $("<div></div>", { id: position + "_fig_" + i});
        node.css({
          width: size + "px",
          height: size + "px",
          "font-size": size + "px",
          border: "blue",
          "border-style": "hidden",
        });
        node.click(onClickFig);

        nodes.push(node);
      }

      nodes[0].css("margin-left", (width / 4) + "px");
      nodes[1].css({float: "left", width: size + "px"});
      nodes[2].css({float: "left", width: size + "px"});

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
        var selector = "#" + position + "_fig_" + i;
        $(selector).css("border-style", "hidden");
        $(selector).text(figs[i]);
      }
    }

    setFigs("left", left);
    setFigs("right", right);
  });

  createContentNodes();
  $("#shuf").click();
});
