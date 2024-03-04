function loadQuestion(question) {
    // create a new div element
    const newDiv = document.createElement("div");
    
    newDiv.className = "questionObj";
  
    // and give it some content
    const newContent = document.createTextNode(question);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    
    document.body.appendChild(newDiv);
    return newDiv;
  }
  

  
  
  
  