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
   element.addEventListener('click', function() {

    const sibling = element.nextElementSibling;
    if (sibling.style.display === 'none') 
    { 
      sibling.style.display = 'block'; 
    } else { 
      sibling.style.display = 'none'; 
    }
 
  });
})



