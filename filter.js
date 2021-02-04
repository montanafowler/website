var photosToDisplay = new Array();

function makeModal() {
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
    var priceCaption = document.getElementById("price");

    for (i = 0; i < photosToDisplay.length; i++) {
        var img = document.getElementById(getImageIdFromFilepath(photosToDisplay[i]));
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = "images/all_larger/" + getImageIdFromFilepath(this.id) + ".jpg";
            //captionText.innerHTML = this.alt;
            materialsCaption.innerHTML = this.materials;
            sizeCaption.innerHTML = this.widthInches + " x " + this.heightInches + " in.";
            locationCaption.innerHTML = this.location;
            title.innerHTML = this.title;
            yearCaption.innerHTML = this.year;
            var imageId = getImageIdFromFilepath(this.id);
            if (this.for_sale == "yes") {
                var price = this.widthInches * this.heightInches * 0.5;
                priceCaption.innerHTML = "$" + price.toString();
            } else {
              priceCaption.innerHTML = "";
            }

        }
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
}

function filterWrittenCheckboxes() {
    document.getElementById("gallery").hidden = false;
    document.getElementById("about_page").style.visibility = "hidden";

    var checkedElements = new Array();
    var checkboxIds = new Array();
    checkboxIds.push("abstraction_checkbox");
    checkboxIds.push("representation_checkbox");
    checkboxIds.push("exhibitions_checkbox");
    checkboxIds.push("portraiture_checkbox");
    checkboxIds.push("nature_checkbox");
    checkboxIds.push("selectedImagetrue");
    checkboxIds.push("selectedImagefalse");
    var srcImageName, saleTemp;
    var yearFilter = "2017_to_present";
    for (var i = 0; i < checkboxIds.length; i++) {
        srcImageName = document.getElementById(checkboxIds[i]).getAttribute("src");
        //console.log("srcImageName", srcImageName);
        // if the checkbox is checked
        if (!srcImageName.includes("unchecked")) {
            if (checkboxIds[i].includes("abstraction")) {
                checkedElements.push("abstraction");
            } else if (checkboxIds[i].includes("representation")) {
                checkedElements.push("representation");
            } else if (checkboxIds[i].includes("nature")) {
                checkedElements.push("nature");
            } else if (checkboxIds[i].includes("exhibitions")) {
                checkedElements.push("exhibitions");
            } else if (checkboxIds[i].includes("portraiture")) {
                checkedElements.push("portraiture");
            } else if (srcImageName.includes("20")) {
                yearFilter = srcImageName.replace("images/written_words/written_words_", "");
                yearFilter = yearFilter.replace(".png", "");
                checkedElements.push(yearFilter);
            } else if (srcImageName.includes("sale") || srcImageName.includes("all")) {
                saleTemp = srcImageName.replace("images/written_words/written_words_", "");
                saleTemp = saleTemp.replace(".png", "");
                checkedElements.push(saleTemp);
            }
        }
    }

    console.log("checkedElements");
    console.log(checkedElements);

    var allImages = makeAllArray(); 
    photosToDisplay = allImages;
    allImages = shuffleArray(allImages);

    // make the first page not have so many photos so it loads faster
    if(checkedElements.length == 2 
        && yearFilter == "2017_to_present" 
        && saleTemp == "all") {
      allImages = allImages.slice(0, allImages.length / 2);
    }

    photosToDisplay = allImages;

    makeSection("", allImages);

    var allText = getText(checkedElements, yearFilter, saleTemp);
    makeModal();
    console.log("allText");
}

function flipWrittenCheckmark() {
    console.log("clicked the image textbox");
    console.log("event.target.id", event.target.id);

    var currentImg = $("#" + event.target.id).attr("src");

    console.log(currentImg);

    if (currentImg.includes("unchecked")) {
        currentImg = currentImg.replace("unchecked", "checked");
        console.log(currentImg);
    } else {
        currentImg = currentImg.replace("checked", "unchecked");
        console.log(currentImg);
    }

    $("#" + event.target.id).attr("src", currentImg);
    filterWrittenCheckboxes();
}

function temp() {
    console.log("temp function");
}

function displayAboutPage() {
    console.log("displayAboutPage");
    document.getElementById("gallery").hidden = true;
    document.getElementById("about_page").style.visibility = "visible";
    console.log("test");
}

$(document).ready(function () {
    $("#abstraction_checkbox").click(flipWrittenCheckmark);
    $("#representation_checkbox").click(flipWrittenCheckmark);
    $("#nature_checkbox").click(flipWrittenCheckmark);
    $("#portraiture_checkbox").click(flipWrittenCheckmark);
    $("#exhibitions_checkbox").click(flipWrittenCheckmark);
    $("#yearDropdownMenu").onclick = function () {
        filterWrittenCheckboxes();
    };
    $("#saleDropdownMenu").onclick = function () {
        filterWrittenCheckboxes();
    };
    console.log("aboutbutton hookup");
    $("#about_button").click(displayAboutPage);

});


function getYearFromIndex(index, useYear) {
  if(useYear) {
    if(index == 0) {
      return "2017_to_present";
    }
    var year = 2016 + parseInt(index);
    console.log("getYearFromIndex index=" + index + " year=" + year);
    return year.toString();
  }
  if(index == 0) {
    return "all";
  }
  if(index == 1) {
    return "for_sale";
  }
  return "not_for_sale";
}

function getIndexFromYear(year, useYear) {
  if(useYear) {
    if(year == "2017_to_present") {
      return 0;
    } 
    return (parseInt(year) - 2016);
  }
  if (year == "all") {
    return 0;
  }
  if(year == "for_sale") {
    return 1;
  }
  return 2;
}


var x, i, j, selElmnt, a, b, c, value, span, year;
var useYear = true;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  if (x[i].id == "saleDropdownMenu") {
    useYear = false;
  } else if (x[i].id == "yearDropdownMenu") {
    useYear = true;
  }

  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  value = selElmnt.options[selElmnt.selectedIndex].value;
  year = getYearFromIndex(value, useYear);
  var selectedId = "selectedImage" + useYear;
  console.log("selectedId", selectedId);
  span = '<span><img id="' + selectedId + '" style=" display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
  a.innerHTML = span;//selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  b.style = "background-color: yellow;";

  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.style = "background-color: white; border: 1px solid; border-color: #f0f0f0;";
    c.innerHTML = selElmnt.options[j].innerHTML;
    value = selElmnt.options[j].value;
    year = getYearFromIndex(value, useYear);
    span = '<span><img id="optionId" style="display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
    c.innerHTML = span;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, filename;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        if (h.id == "saleDropdownMenu") {
          useYear = false;
        } else if (h.id == "yearDropdownMenu") {
          useYear = true;
        }
        for (i = 0; i < s.length; i++) {
          value = s.options[i].value;
          var hiddenKey = s.options[i].getAttribute("alt");
          if (hiddenKey == "sale") {
            useYear = false;
          } else if (hiddenKey == "year") {
            useYear = true;
          }
          year = getYearFromIndex(value, useYear);
          filename = "written_words_" + year + ".png";
          if (this.innerHTML.includes(filename)) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            h.innerHTML = h.innerHTML.replace('id="optionId"', 'id="selectedImage' + useYear + '"');
            console.log("h.html", h.innerHTML);
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            filterWrittenCheckboxes();
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
filterWrittenCheckboxes();



