function getImageIdFromFilepath(filepath) {
	var filename = filepath.replace(/^.*[\\\/]/, '');
	filename = filename.replace('.jpg', '');
	filename = filename.replace('smaller_', '');
	console.log("imageId: " + filename);
	return filename;
}

function makeArray(type) {

	var abstractionArray = new Array() 
	var exhibitionsArray = new Array()
	var natureArray = new Array()
	var portraitureArray = new Array()
	var representationArray = new Array()

	// add the filenames to the arrays
	var abstractionLength = 16
	var exhibitionsLength = 15
	var natureLength = 28
	var portraitureLength = 27
	var representationLength = 48

	if(type == "abstraction") {
		for(i = 0; i < abstractionLength; i++) {
	  		abstractionArray[i] = "images/abstraction/abstraction_smaller_" + i + ".jpg"
	  		
		}
		return abstractionArray;
	}

	if(type == "exhibitions") {
		for(i = 0; i < exhibitionsLength; i++) {
		  exhibitionsArray[i] = "images/exhibitions/exhibitions_smaller_" + i + ".jpg"
		}
		return exhibitionsArray;
	}

	if(type == "nature") {
		for(i = 0; i < natureLength; i++) {
	  		natureArray[i] = "images/nature/nature_smaller_" + i + ".jpg"
		}
		return natureArray;
	}

	if(type == "portraiture") {
		for(i = 0; i < portraitureLength; i++) {
	  		portraitureArray[i] = "images/portraiture/portraiture_smaller_" + i + ".jpg"
		}
		return portraitureArray;
	}


	for(i = 0; i < representationLength; i++) {
	  representationArray[i] = "images/representation/representation_smaller_" + i + ".jpg"
	}
	return representationArray;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function makeSection(sectionName, array) {
  document.write('<p> ' + sectionName + '</p>');
  document.write('<section id= "' + sectionName + '">');
  for(i = 0; i < array.length; i++) {
  	var imageId = getImageIdFromFilepath(array[i]);
    document.write('<img src="' + array[i] + '" id="' + imageId + '" class="galleryImage"  />');
  }
  document.write('</section>');
}

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function readMetaData(filepath) {
	// Requiring fs module in which  
	// readFile function is defined. 
	//const fs = require('fs'); 
	var fs = require('fs');
	var textByLine = fs.readFileSync('test.txt').toString().split("\n");
	console.log(textByLine);
	// fs.readFile(filepath, (err, data) => { 
	//     if (err) throw err; 
	  
	//     console.log(data.toString()); 
	// });
}



function getText(){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://montanafowler.github.io/website/test.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
    	console.log("onreadystatechange");
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
            	console.log("return responseText");
            	console.log(request.responseText);
            	var obj = JSON.parse(request.responseText);
            	console.log(obj.abstraction);
            	var abs = obj.abstraction;
            	console.log(abs.abstraction_0);
            	var abs0 = abs.abstraction_0;
            	document.getElementById("tempText").innerText = abs0.title;
                return request.responseText;
            }
        }
    }
}