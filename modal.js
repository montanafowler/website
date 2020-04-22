// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("modalImg");
var title = document.getElementById("title");
var captionText = document.getElementById("caption");
var yearCaption = document.getElementById("yearCaption");
var materialsCaption = document.getElementById("materialsCaption");
var sizeCaption = document.getElementById("sizeCaption");
var locationCaption = document.getElementById("locationCaption");

for(i = 0; i < photosToDisplay.length; i++) {
    var img = document.getElementById(getImageIdFromFilepath(photosToDisplay[i]));
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        //captionText.innerHTML = this.alt;
        materialsCaption.innerHTML = this.materials;
        sizeCaption.innerHTML = this.widthInches + " x " + this.heightInches + " in.";
        locationCaption.innerHTML = this.location;
        title.innerHTML = this.title;
        yearCaption.innerHTML = this.year;
        var imageId = getImageIdFromFilepath(this.id);
    }
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
modal.style.display = "none";
} 