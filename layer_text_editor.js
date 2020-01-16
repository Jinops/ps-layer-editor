
var docPath = File($.fileName).parent.fsName;

var file = new File();
var arr_temp = new Array();
var result = new Array(new Array());

var count = 0; // for image name

function run(){
	load_data();
	delimite_array(arr_temp, ',');
	changeText();
	alert("done");
}

function load_data(){
	file = load_data_psd();
	arr_temp = load_data_csv();

}


function load_data_psd(){
	var psdFile = new File(docPath + "/test_canvas.psd");
	return app.open(psdFile);
}

function load_data_csv(){

	var csvFile = new File(docPath + "/layer_text_input.csv");
	csvFile.open('r');

	var arr = new Array();
	for (var i = 0; !csvFile.eof; i++){
		arr[i] = csvFile.readln();
	}

	csvFile.close();


	return arr;
}


function delimite_array(arr, delimiter){ //WIP
	//var result = new Array(new Array());
	var flag = false;
	var length = arr.length;
	var character;
	var str;
	var arr_temp = new Array();
	for(var i = 0; i < arr.length; i++){

		flag = false;
		str = "";
		arr_temp = new Array();

		for(var j = 0; j < arr[i].length; j++){
			character = arr[i].charAt(j);
			if(character==undefined){
				break;
			}
			else if(character=='"'){ // 정수 내 콤마표시 피하기 위한 flag 처리
				flag = (flag)?false:true;
				continue;
			}
			
			if(!flag && character==delimiter){ // 구분자 체크
				arr_temp.push(str);
				str = "";
			} else{
				str += character;
			}
		}

		arr_temp.push(str);
		result[i] = arr_temp;
	}
}

function changeText(){
	for(var i= 1; i < result[0].length; i++){ // 이미지
		for(var layer = 1; layer < result.length; layer++){ // 레이어
			var layerName = result[layer][0];
			var text = result[layer][i];
			applyTextLayer(file, layerName, text);
		}
		saveImage();
		count += 1;
	}


}

function applyTextLayer(file, layerName, text) {
  for (var i = 0, max = file.layers.length; i < max; i++) {

    var layerRef = file.layers[i];
    if (layerRef.typename === "ArtLayer") {
      if (layerRef.name === layerName && layerRef.kind === LayerKind.TEXT) {
    	try{
    		layerRef.textItem.contents = text;
    	}
    	catch(e){
    		
    	}

      }
    } else {
      //changeTextLayerContent(layerRef, layerName, newTextString);
    }
  }
}

function saveImage(){
	var image = new File(docPath + "test_canvas" + count + ".png");
	activeDocument.saveAs(image, PNGSaveOptions, true, Extension.NONE);
}

run();



//app.displayDialogs = DialogModes.NO;