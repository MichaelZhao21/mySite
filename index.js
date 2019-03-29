var backgroundId = 0;
var backgroundTimer;

function setup() {
  $(document).keydown(function(event) {
    $(".background").css("transition", "background-image .5s");
    if (event.key == "ArrowRight") {
      updateBackground(1);
    }
    else if (event.key == "ArrowLeft") {
      updateBackground(-1);
    }
    $(".background").css("transition", "background-image 2s");
  });

  updateBackground(0);

  backgroundTimer = setInterval(function () {
    if (backgroundId == 3) {
      backgroundId = -1;
    }
    updateBackground(1);
  }, 7000);
}

function updateBackground(change) {
  backgroundId += change;
  try {
    $(".background").css("background-image", "url(assets/backgroundImages/image" + backgroundId + ".jpg)");
  }
  catch (err) {
    backgroundId -= change;
    $(".background").css("background-image", "url(assets/backgroundImages/image" + backgroundId + ".jpg)");
  }
}
