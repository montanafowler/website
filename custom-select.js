
function getYearFromIndex(index, useYear) {
  if(useYear) {
    if(index == 0) {
      return "2017_to_present";
    }
    var year = 2016 + parseInt(index);
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
  span = '<span><img style=" display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
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
    span = '<span><img style="display: inline-block; height: 25px; width: auto;" src="images/written_words/written_words_' + year + '.png" /></span>';
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