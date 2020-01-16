
var docPath = File($.fileName).parent.fsName;

var file = new File();
var arr_temp = new Array();
var result = new Array(new Array());

function run(){
	load_data();
	changeTextLayerContent(file, 'T1', arr_temp[0]);
	//saveImage();
	delimite_array(arr_temp, ',');
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


function delimite_array(arr, delimiter){
	var result = new Array(new Array());
	var flag = false;
	var length = arr.length;
	var character;
	var str;
	for(var i = 1; i <= arr.length-1; i++){
		flag = false;
		str = "";

		for(var j = 0; j <= arr[i].length-1; j++){
			character = arr[j];
			if(character==undefined){ // 파일 끝
				break;
			}
			else if(character=='"'){ // 정수 내 콤마표시 피하기 위한 flag 처리
				alert("There is ''")
				flag = (flag)?false:true;
				continue;
			}
			else if(!flag){
				if(character==delimiter){ // 구분자
					alert("push str : " + str);
					result[i].push(str);
					str = "";
				} else{ // 문자열에 문자 추가
					str += character;
				}
			}
		}


	}

}


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

function saveImage(){
	var image = new File(docPath + "test_canvas.png");
	activeDocument.saveAs(image, PNGSaveOptions, true, Extension.NONE);
}

run();



//app.displayDialogs = DialogModes.NO;