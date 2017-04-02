"use strict";


const DynamicProg = {
  newFile(file, change) {
    const current = file.replace("slides-", "").replace(".html", "");
    return `slides-${parseInt(current, 10) + change}.html`;
  },
  file() {
    const path = window.location.pathname.split("/");
    return path[path.length - 1];
  },
  goAhead() {
    const file = DynamicProg.file(),
      newFile = DynamicProg.newFile(file, 1);
    window.location = window.location.pathname.replace(file, newFile);
  },
  goBack() {
    const file = DynamicProg.file(),
      newFile = DynamicProg.newFile(file, -1);
    if (newFile !== "slides--1.html") {
      window.location = window.location.pathname.replace(file, newFile);
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
      switch  (event.keyCode) {
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
        default:
          //do nothing
      }
    }
  }
};

document.onkeydown = DynamicProg.captureArrow;
DynamicProg.displayConsole();
