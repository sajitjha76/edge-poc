// $(".faq-wrapper .faq h3").on("click" , function(){

//   console.log("Hello");
// })

const elements = document.querySelectorAll(".faq-wrapper .faq h3")
elements.forEach(element => {
  element.addEventListener('click', function() {
    const parentElement = element.parentElement; 
    // Find the sibling of the parent element 
    const siblingOfParent = parentElement.nextElementSibling;
    siblingOfParent.style.display = 'block';
 
  });
});


