const synth = window.speechSynthesis;

window.addEventListener(
  "load",
  function load(event) {



    window.removeEventListener("load", load, false);
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      let backColor = "";
      let fontColor = "";
      let originalLineHeight = 1;

      const action = request.action;
      if (action === 'fontSize') {

        const fontSize = request.fontSize;
        const html = document.querySelector("html");
        html.style.fontSize = fontSize;

      }
      else if (action === 'fontStyle') {
        console.log(request.fontStyle);
        document.getElementsByTagName("body")[0].setAttribute("id", "fonter");
        const html = document.querySelector("#fonter");

        if (request.fontStyle === "Trebuchet MS") {
          html.style.setProperty(
            "font-family",
            "Castellar, Trebuchet MS, sans-serif"
          );
        } else if (request.fontStyle === "Arial") {
          html.style.setProperty("font-family", "Arial, sans-serif");
        } else if (request.fontStyle === "Baskerville") {
          html.style.setProperty("font-family", "Baskerville, serif");
        } else if (request.fontStyle === "Calibri") {
          html.style.setProperty("font-family", "Calibri, sans-serif");
        } else if (request.fontStyle === "Garamond") {
          html.style.setProperty("font-family", "Garamond, serif");
        } else if (request.fontStyle === "Verdana") {
          html.style.setProperty("font-family", "Verdana, sans-serif");
        }else if(request.fontStyle === "Georgia"){
          html.style.setProperty("font-family", "Georgia", "serif");
        }
        else if(request.fontStyle=== "Times New Roman"){
          html.style.setProperty("font-family", "Times New Roman", "serif");
        }
        else if(request.fontStyle === "Helvetica"){
          html.style.setProperty("font-family", "Helvetica", "sans-serif");
        }
        else if(request.fontStyle=== "Monaco"){
          html.style.setProperty("font-family", "Monaco", "Monospace");
        }
      } else if (action === "image") {
        const immgs = document.getElementsByTagName("img");
        for (let i = 0; i < immgs.length; i++) {
          immgs[i].style.setProperty("display", "none");
        }
      } else if (action === "imageAdd") {
        const immgs = document.getElementsByTagName("img");
        for (let i = 0; i < immgs.length; i++) {
          immgs[i].style.setProperty("display", "block");
        }
      } else if (action === "text-to-speech") {
        console.log("Hi");
        if (synth.speaking) {
          synth.cancel();
        }
        const text = document.getElementsByTagName("body")[0].innerText;
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = request.rate;
        synth.speak(msg);
      }
      
      else if (action === "stop-speech") {
        if (synth.speaking) {
             synth.cancel();
        }
        }



      else if (action === 'link-highlight') {
        const links = document.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
          links[i].style.setProperty("background-color", "yellow");
          links[i].style.setProperty("fontSize", "24px");
        }
      } else if (action === "link-highlight-remove") {
        const links = document.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
          links[i].style.setProperty("background-color", "transparent");
          links[i].style.setProperty("fontSize", "default");
        }
      } else if (action === "image-reader") {
        const images = document.getElementsByTagName("img");
        console.log(images);
        for (let i = 0; i < images.length; i++) {

          images[i].addEventListener("mouseover", function (e) {
            console.log("here");
            console.log(images[i].alt);
            const msg = new SpeechSynthesisUtterance(images[i].alt);
            window.speechSynthesis.speak(msg);
          });


          images[i].addEventListener('mouseleave', function (e) {
            window.speechSynthesis.cancel();
          });
        }
      } else if (action === "backgroundColor") {
        backColor === ""
          ? (backColor =
            document.getElementsByTagName("body")[0].style.backgroundColor)
          : null;
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("background-color", request.backgroundColor);
      } else if (action === "revert-background-color") {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("background-color", backColor);
      } else if (action === "fontColor") {
        console.log(request.fontColor);
        fontColor === ""
          ? (fontColor = document.getElementsByTagName("*")[0].style.fontColor)
          : null;
        const all = document.getElementsByTagName("*");
        for (let i = 0; i < all.length; i++) {
          all[i].style.setProperty("color", request.fontColor);
        }
      }




      else if (action === "para-highlighter") {
        const paras1 = document.getElementsByTagName("p");
        const paras2 = document.getElementsByTagName("div");
        const paras = [...paras1, ...paras2];
        for (let i = 0; i < paras.length; i++) {
          paras[i].style.setProperty("border", "2px solid yellow");
        }
      } else if (action === "para-highlighter-remove") {
        const paras1 = document.getElementsByTagName("p");
        const paras2 = document.getElementsByTagName("div");
        const paras = [...paras1, ...paras2];
        for (let i = 0; i < paras.length; i++) {
          paras[i].style.setProperty("border", "none");
        }
      } else if (action === "select-text") {
        const word = window.getSelection().toString();
        if (word !== "") {
          sendResponse({ data: word.replace(/ .*/, "") });
        } else {
          sendResponse({});
        }
      }
    });
  },
  false
);
