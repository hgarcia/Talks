"use strict";


const DynamicProg = {
  setPresenterMode() {
    DynamicProg.initPresenterMode();
  },
  initPresenterMode() {
    document
      .querySelectorAll("blockquote")
      .forEach((node) => {
        node.className = "notes";
      });
  },
  receiveTabChange(event) {
    if (event.key === "prezo-navigate") {
      const file = DynamicProg.file(window.location.pathname),
        newFile = DynamicProg.file(event.newValue);
      DynamicProg.navigate(DynamicProg.location(file, newFile));
    }
  },
  newFile(file, change) {
    const current = file.replace("slides-", "").replace(".html", "");
    return `slides-${parseInt(current, 10) + change}.html`;
  },
  file(locationPath) {
    const path = locationPath.split("/");
    return path[path.length - 1];
  },
  navigate(location) {
    window.location = location;
    localStorage.setItem("prezo-navigate", location);
  },
  hash() {
    return window.location.hash;
  },
  location(file, newFile) {
    return `${window.location.pathname.replace(file, newFile)}`;
  },
  goAhead() {
    const file = DynamicProg.file(window.location.pathname),
      newFile = DynamicProg.newFile(file, 1);
    DynamicProg.navigate(DynamicProg.location(file, newFile));
  },
  goBack() {
    const file = DynamicProg.file(window.location.pathname),
      newFile = DynamicProg.newFile(file, -1);
    if (newFile !== "slides--1.html") {
      DynamicProg.navigate(DynamicProg.location(file, newFile));
    }
  },
  codeRunner(id) {
    const node = document.querySelector(`${id}`),
      cli = document.querySelector(".cli"),
      result = eval(node.innerText);
    cli.innerText = result;
  },
  displayConsole() {
    const node = document.querySelector("pre"),
      footer = document.querySelector("footer");
    if (node) {
      footer.className = "";
    }
  },
  captureArrow(e) {
    const event = e || window.event;
    if (event) {
      DynamicProg.processKeyCode(event.keyCode);
    }
  },
  cloneWindow() {
    window.open(window.location);
  },
  processKeyCode(keyCode) {
    switch  (keyCode) {
      case 8:
        DynamicProg.goBack();
        break;
      case 13:
        DynamicProg.goAhead();
        break;
      case 37:
        DynamicProg.goBack();
        break;
      case 39:
        DynamicProg.goAhead();
        break;
      case 67:
        DynamicProg.cloneWindow();
        break;
       case 80:
        DynamicProg.setPresenterMode();
        break;
      default:
        // console.log(keyCode);
        //do nothing
    }
  }
};

document.onkeydown = DynamicProg.captureArrow;
window.addEventListener("storage", DynamicProg.receiveTabChange);
// DynamicProg.initPresenterMode();
DynamicProg.displayConsole();
