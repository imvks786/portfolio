var warning = 5;

const fullscreenButton = document.getElementById("fullscreenButton");

fullscreenButton.addEventListener("click", () => {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  $("#content").show();
  $("#fullscreenButton").hide();
  $("#preload").hide();
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement === null) {
    $("#content").hide();
    $("#fullscreenButton").show();
    $("#preload").show();
    console.log("User exited fullscreen.");
  }
});

function showAlert(msg) {
  if (msg) {
    $("#usrmsg").html(msg);
    $("#alert").show();
  } else {
    $("#usrmsg").html("This action is not allowed right now.");
    $("#alert").show();
  }
  setTimeout(() => {
    $("#alert").hide();
  }, 5000);
}

let isListenerActive = true;
function eventHandler(event) {
  if (!isListenerActive) return;
  if (event.key === "F12") {
    showAlert();
    event.preventDefault();
  } else if (event.ctrlKey && event.shiftKey && event.key === "I") {
    showAlert();
    event.preventDefault();
  } else if (event.ctrlKey && (event.key === "I" || event.key === "i")) {
    showAlert();
    event.preventDefault();
  }
}

//RIGHT CLICK FUNCTION//
function contextMenuHandler(e) {
  if (!isListenerActive) return;
  showAlert("Context Menu Not Available");
  e.preventDefault();
}

document.body.onselectstart = function () {
  showAlert("Text Selection Not Allowed");
  return false;
};

isListenerActive = true;
window.addEventListener("keydown", eventHandler);
document.addEventListener("contextmenu", contextMenuHandler);


