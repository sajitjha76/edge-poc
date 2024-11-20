// $(".faq-wrapper .faq h3").on("click" , function(){

//   console.log("Hello");
// })

const elements = document.querySelectorAll(".faq-wrapper .faq h3")
elements.forEach(element => {
  const spanElement = document.createElement('span');
  spanElement.classList.add('clickArrow');
  element.insertAdjacentElement('afterend', spanElement)
  element.parentElement.classList.add('clickparent')
 
});

const elementsclick = document.querySelectorAll(".clickparent")
elementsclick.forEach(element => {
  // element.nextElementSibling.style.display = 'none'
   element.addEventListener('click', function() {

    const sibling = element.nextElementSibling;
    if (sibling.classList.contains('show')) 
    { 
         // sibling.style.display = 'none'; 
      sibling.classList.remove('show');
      element.querySelector('span').classList.add('clickArrow')
      element.querySelector('span').classList.remove('clickArrowAfter')
    
    } else { 
        sibling.classList.add('show');
       // sibling.style.display = 'block'; 
      element.querySelector('span').classList.add('clickArrowAfter')
      element.querySelector('span').classList.remove('clickArrow')
  
    }
 
  });
})



