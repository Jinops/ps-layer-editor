
var fileRef = new File('/Users/jinwoop/Documents/automate-job/ps-layer-editor/test_canvas.psd');
var docRef = app.open(fileRef);
alert("File laod complete");

function changeTextLayerContent(doc, layerName, newTextString) {
  for (var i = 0, max = doc.layers.length; i < max; i++) {

    var layerRef = doc.layers[i];
    if (layerRef.typename === "ArtLayer") {
      if (layerRef.name === layerName && layerRef.kind === LayerKind.TEXT) {
        layerRef.textItem.contents = newTextString;
      }
    } else {
      //changeTextLayerContent(layerRef, layerName, newTextString);
    }
  }
}

changeTextLayerContent(docRef, 'T1', 'Albert');
changeTextLayerContent(docRef, 'T2', 'Eric');
changeTextLayerContent(docRef, 'T3', 'Bounce');