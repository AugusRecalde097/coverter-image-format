var convert = {
  // (A) PROPERTIES
  hFile: null, // html file picker
  hFormat: null, // html format select
  hCanvas: null, // html canvas
  reader: null, // file reader
  ctx: null, // canvas context

  // (B) INIT
  init: () => {
    // (B1) GET HTML ELEMENTS
    convert.hFile = document.getElementById("cFile");
    convert.hFormat = document.getElementById("cFormat");
    convert.hCanvas = document.getElementById("cCanvas");
    convert.ctx = convert.hCanvas.getContext("2d");

    // (B2) LISTEN TO FILE PICKER
    convert.hFile.onchange = convert.read;
  },

  // (C) READ SELECTED IMAGE
  read: () => {
    convert.reader = new FileReader();
    convert.reader.onload = convert.draw;
    convert.reader.readAsDataURL(convert.hFile.files[0]);
  },

  // (D) DRAW SELECTED IMAGE ON CANVAS
  draw: () => {
    let img = new Image();
    img.onload = () => {
      convert.hCanvas.width = img.width;
      convert.hCanvas.height = img.height;
      convert.ctx.drawImage(img, 0, 0);
    };
    img.src = convert.reader.result;
  },
};

const convertir = () => {
  let a = document.createElement("a"),
    f = convert.hFormat.value;
  let name = new Date();
  name = name
    .toLocaleString()
    .replaceAll("/", "")
    .replaceAll(",", "_")
    .replaceAll(":", "")
    .replaceAll(" ", "");
  a.href = convert.hCanvas.toDataURL(`image/${f}`);
  if (f == "jpeg") {
    f = "jpg";
  }
  a.download = `${name}.${f}`;
  a.click();
  a.remove();
};

window.addEventListener("load", convert.init);
