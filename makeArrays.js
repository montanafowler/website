function getImageIdFromFilepath(filepath) {
	var filename = filepath.replace(/^.*[\\\/]/, '');
	filename = filename.replace('.jpg', '');
	filename = filename.replace('smaller_', '');
	console.log("imageId: " + filename);
	return filename;
}

function makeAllArray() {
	var arr = new Array();
	var totalAllImages = 98;
	for(i = 0; i < totalAllImages; i++) {
		arr[i] = "images/all/all_" + i + ".jpg";
	}
	return arr;
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
  	document.write('<div class="container">');
    document.write('<img src="' + array[i] 
    	+ '" id="' + imageId 
    	+ '" class="galleryImage"' 
    	+ ' title="temp title"'
    	+ ' materials="temp materials"'
    	+ ' year="temp year"'
    	+ ' widthInches="-1"'
    	+ ' heightInches="-1"'
    	+ ' for_sale="temp no"'
    	+ ' categories=["abstraction"]'
    	+ ' show="temp yes"'
    	+ ' location="temp location"'
    	+ ' hidden=true />');

	

    var num = imageId.replace("all_", "");
    document.write('<div class="sectionImageLabel" id="' + imageId + '_label" hidden=true>' + num + '</div>')
    document.write('</div>');

 //    $(imageId).hover(function(){
	//   document.getElementById(imageId + "_label").css("opacity", "1");
	//   }, function(){
	//   document.getElementById(imageId + "_label").css("opacity", "0");
	// });
  }
  document.write('</section>');
}

function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });

}

function getText(checkedElements) {
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/montanafowler/website/master/allJson.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
            	var obj = JSON.parse(request.responseText);
            	var allObj = obj.all;
            	var allJSONArray = allObj.elements;

            	for(i = 0; i < allJSONArray.length; i++) {
            		var imageId = allJSONArray[i].image_id;
            		var imageTitle = allJSONArray[i].title;
            		var materials = allJSONArray[i].materials;
            		var year = allJSONArray[i].year;
            		var width = allJSONArray[i].width;
            		var height = allJSONArray[i].height;
            		var for_sale = allJSONArray[i].for_sale;
            		var categories = allJSONArray[i].categories;
            		var show = allJSONArray[i].show;
            		var location = allJSONArray[i].location;

            		if(document.getElementById(imageId) != null) {
            			// set all the attributes of the image with the meta data
            			document.getElementById(imageId).year = year;
        				document.getElementById(imageId).widthInches = width;
        				document.getElementById(imageId).heightInches = height;
    					document.getElementById(imageId).title = imageTitle;
    					document.getElementById(imageId).materials = materials;
    					document.getElementById(imageId).for_sale = for_sale;
    					document.getElementById(imageId).categories = categories;
    					document.getElementById(imageId).show = show;
    					document.getElementById(imageId).location = location;
    					document.getElementById(imageId).title = imageTitle;
    					
    					// loop through categories to set hidden to true
    					for(j = 0; j < categories.length; j++) {
				          for(k = 0; k < checkedElements.length; k++) {
				            // category matches one we want to display
				            if(categories[j] == checkedElements[k]) {
				              document.getElementById(imageId).hidden = false;
				              document.getElementById(imageId + "_label").hidden = false;
				              break;
				            }
				          }
				          if(document.getElementById(imageId).hidden == false) {
				            break;
				          }
				        }
            		}		
            	}
                return request.responseText;
            }
        }
    }
}