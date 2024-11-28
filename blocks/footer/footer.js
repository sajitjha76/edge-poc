import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
//import jQuery from "jquery";
//window.$ = window.jQuery = jQuery;
$(".text.formtext.block").css("color", "red");

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  //const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  var footerPagePath = '/footer';
  if (window.location.pathname.startsWith('/fr/')) {  
    footerPagePath = '/fr/footer';
    var footerN = document.querySelector('footer');
    footerN.classList.add("fr-footer")
  }
  else 
  {
    var footerN = document.querySelector('footer');
    footerN.classList.add("non-fr-footer")
  }
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : footerPagePath;
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);


//Mobile Footer
  if(window.innerWidth <= 900)
  {
     setTimeout(function(){
    const firstParagraph = document.querySelectorAll('footer.non-fr-footer .columns.footercustom > div > div p:nth-of-type(1)');
   firstParagraph.forEach(function(para) {
     para.addEventListener('click', function() {
       const allParagraphs = para.parentNode.querySelectorAll('p:not(:first-of-type)');
       allParagraphs.forEach(function(paragraph) { 
           if (paragraph.style.display === 'none' || paragraph.style.display === '') 
             { paragraph.style.display = 'block'; 
             } else 
           { paragraph.style.display = 'none'; 
           }
       })
     })
   })
 }, 100) 
  }

  block.append(footer);
}
