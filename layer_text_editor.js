
var docPath;
var fileName;
var file = new File();
var arr_temp = new Array();
var result = new Array(new Array());


run();


function run(){
	init();
	load_data();
	changeText();
	alert("Complete\n(" + docPath + "/)");
}



function init(){
	docPath = File($.fileName).parent.fsName;
	fileName =prompt("Input file name (without .psd)", "untitled-1");
}

function load_data(){
	file = load_data_psd();
	delimite_array(load_data_csv(), ',');

}

function load_data_psd(){
	try{
		var psdFile = new File(docPath + "/" + fileName + ".psd");
		return app.open(psdFile);
	}
	catch(e){
		alert("Fail to load the psd file.\n" + e);
	}
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


function delimite_array(arr, delimiter){

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
			else if(character=='"'){ // 숫자 내 콤마표시가 구분자로 쓰이지 않도록 flag 처리
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
		saveImage(result[0][i]);
	}

}

function applyTextLayer(file, layerName, text) {
  for (var i = 0, max = file.layers.length; i < max; i++) {

    var layer = file.layers[i];
    
    if (layer.typename === "ArtLayer") {
      if (layer.name === layerName && layer.kind === LayerKind.TEXT) {
    	try{
    		layer.textItem.contents = text;
    	}
    	catch(e){
    		
    	}
      }
    }

  }

}

function saveImage(addname){
	var image = new File(docPath + "/" + fileName + "_" + addname + ".png");
	activeDocument.saveAs(image, PNGSaveOptions, true, Extension.NONE);
}
