let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
let page=document.querySelectorAll(".tab")
let result={}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit"    
  } 
  else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
 
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length-1) {
  //  display the value of inputs
    displayObjectData()
   
  }
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      alert("Click ok to submit the data.")
      document.getElementById("regForm").submit();
      return false;
    }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  if(currentTab<page.length-1){
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].querySelectorAll("input,textarea,fieldset");
  // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      if (y[i].type === "email") {
      // Use the built-in email validation and check basic structure
      let specialChar= /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
        if(!y[i].value.match(specialChar)){
        alert("Enter the Valid Email Address")
        valid=false
        }   
      }
      // mobile number validation
      if (y[i].type === "number") {
        if(y[i].value.length<10){      
          alert("Enter Valid Mobile Number")
          valid=false
        }
      }
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
       // and set the current valid status to false:
        valid = false;
      }
    }

    // atleast one checkbox needs to be selected
    let fieldset=x[currentTab].getElementsByTagName("fieldset") 
    let msg=[]
    let num=1      
    for (let index = 0; index < fieldset.length; index++) {
      let atLeastOneChecked = false; 
      let inputs=fieldset[index].getElementsByTagName("input")
      for (let a = 0; a < inputs.length; a++) {
        if(inputs[a].checked){
          atLeastOneChecked  = true;
        }       
      }     
      if(!atLeastOneChecked){
        num++
        msg.push(num)       
      }  
    
    }
    // if the checkbox in uncheked alert msg pop up
    if (msg.length>0){
      alert("Please select atleast one option in every Checkbox question")
    valid = false;}
  // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
      let currentPage=page[currentTab].querySelectorAll("input,textarea") 
        //prints the key and value to the object 
      for (let i = 0; i< currentPage.length; i++) {
         if(currentPage[i].type=="radio"){        
            if(currentPage[i].checked){
                result[currentPage[i].name]=currentPage[i].value               
            }
        }
        else if(currentPage[i].type=="checkbox"){      
            if(currentPage[i].checked){            
                result[currentPage[i].name]=currentPage[i].value 
            }
        }
        else if(currentPage[i].type=="text"){                     
                result[currentPage[i].name]=currentPage[i].value
        }
        else {                     
            result[currentPage[i].name]=currentPage[i].value
        }           
      }
  console.log(result)  
    }
  return valid; // return the valid status
  }
  else {return valid=true}
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

let objectDataDiv = document.getElementById("objectData");

function displayObjectData() {
  let tagToRemove=document.getElementsByTagName("ul")
  if(tagToRemove.length>0){
  document.getElementsByTagName("ul")[0].remove()
 }
  // Create a list to display key-value pairs
  var list = document.createElement("ul");
  
  // Iterate through object properties
  for (var key in result) {
      if (result.hasOwnProperty(key)) {
          var listItem = document.createElement("li");
          listItem.textContent = key + ": " + result[key];
          list.appendChild(listItem);
      }
  }
  // Append the list to the div
  objectDataDiv.appendChild(list); 
}

// mode Switching function
let light="white"
function mode(){
  let m=document.getElementById("mode")
  let form=document.getElementById("regForm")
  let body=document.body
 
  if(light=="white"){
    body.style="background-color:#01020d;";
    form.style="background-color:#02051a; color:rgba(228, 226, 200, 0.714)";
    m.innerText="Light Mode"
    m.style="background-color:white; color:black"
    light="dark"
  }
  else{
    body.style="background-color:rgb(124, 194, 224);;";
    form.style="background-color:rgb(92, 186, 226); color:black";
    m.innerText="Dark Mode"
    m.style="background-color:#01020d; color:white"
    light="white"
  }
  
}

    