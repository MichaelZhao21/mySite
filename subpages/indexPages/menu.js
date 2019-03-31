$(".menu").click(function (event) {
  var addLoc = "";
  if (window.location.pathname.indexOf("subpages") != -1) {
    addLoc = "../../"
  }
  switch (event.target.id) {
    case "home":
      location.assign(addLoc + "index.html");
      break;
    case "about-me":
      location.assign(addLoc + "subpages/indexPages/about-me.html");
      break;
    case "projects":
      location.assign(addLoc + "subpages/indexPages/projects.html");
    default:

  }
})
