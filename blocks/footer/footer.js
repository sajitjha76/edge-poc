import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

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
    var footer = document.querySelector('footer');
    footer.classList.add("fr-footer)
  }
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : footerPagePath;
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
