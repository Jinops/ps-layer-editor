
docPath = File($.fileName).parent.fsName;

var filePath = new File(docPath + "/test_canvas.psd");
var file = app.open(filePath);

function changeTextLayerContent(file, layerName, text) {
  for (var i = 0, max = file.layers.length; i < max; i++) {

    var layerRef = file.layers[i];
    if (layerRef.typename === "ArtLayer") {
      if (layerRef.name === layerName && layerRef.kind === LayerKind.TEXT) {
        layerRef.textItem.contents = text;
      }
    } else {
      //changeTextLayerContent(layerRef, layerName, newTextString);
    }
  }
}

changeTextLayerContent(file, 'T1', 'coll');
changeTextLayerContent(file, 'T2', 'name');
changeTextLayerContent(file, 'T3', 'Bounce');

var image = new File(docPath + "test_canvas.png");
activeDocument.saveAs(image, PNGSaveOptions, true, Extension.NONE);

//app.displayDialogs = DialogModes.NO;