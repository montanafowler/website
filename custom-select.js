
function getYearFromIndex(index) {
  if(index == 0) {
    return "2017_to_present";
  }
  var year = 2016 + parseInt(index);
  return year.toString();
}

function getIndexFromYear(year) {
  if(year == "2017_to_present") {
    return 0;
  } 
  return (parseInt(year) - 2016);
}


var x, i, j, selElmnt, a, b, c, value, span, year;
console.log("custom-select.js");
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  value = selElmnt.options[selElmnt.selectedIndex].value;
  console.log("value", value);
  year = getYearFromIndex(value);
  console.log("year", year);
  span = '<span><img style=" display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
  console.log("span", span);
  a.innerHTML = span;//selElmnt.options[selElmnt.selectedIndex].innerHTML;
  console.log("selElmnt.options[selElmnt.selectedIndex]", selElmnt.options[selElmnt.selectedIndex]);
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  b.style = "background-color: yellow;";
  // span = '<span><img style="display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
  // b.innerHTML = span;
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.style = "background-color: white;";
    c.innerHTML = selElmnt.options[j].innerHTML;
    console.log("selElmnt.options[j]", selElmnt.options[j]);
    value = selElmnt.options[j].value;
    year = getYearFromIndex(value);
    console.log("year", year);
    span = '<span><img style="display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
    c.innerHTML = span;
    //console.log("value2", value);
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, filename;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          console.log("this.innerHTML", this.innerHTML);
          console.log("s.options[i].innerHTML", s.options[i].innerHTML);
          console.log("s.options[i].value", value);
          value = s.options[i].value;
          year = getYearFromIndex(value);
          console.log("year", year);
          filename = "written_words_" + year + ".png";
          console.log("filename", filename);
          console.log("this.innerHTML.includes(filename)", this.innerHTML.includes(filename));
          if (this.innerHTML.includes(filename)) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
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
  console.log("x", x);
  console.log("y", y);
  console.log('y["2017_to_present"]', y["2017_to_present"]);
  for (i = 0; i < y.length; i++) {
    console.log("y[i]", y[i]);
    console.log("y[i].innerHTML", y[i].innerHTML);
    console.log("elmnt.innerHTML", elmnt.innerHTML);
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    console.log("x[i].innerHTML", x[i].innerHTML);
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);