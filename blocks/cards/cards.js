import { createOptimizedPicture } from '../../scripts/aem.js';
 
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
 
 
  setTimeout(() => {
    // Add the navigation arrows only if they don't exist
    let cardsNav = document.querySelector('.cards-nav');
    if (!cardsNav) {
      const cardsContainer = document.querySelector('.cards.custom-tut.block');
      cardsNav = document.createElement('div');
      cardsNav.className = 'cards-nav';
 
      const leftArrow = document.createElement('div');
      leftArrow.className = 'arrow';
      leftArrow.id = 'left-arrow';
      leftArrow.innerHTML = '&larr;';
      cardsNav.appendChild(leftArrow);
 
      const rightArrow = document.createElement('div');
      rightArrow.className = 'arrow';
      rightArrow.id = 'right-arrow';
      rightArrow.innerHTML = '&rarr;';
      cardsNav.appendChild(rightArrow);
 
      // Insert the navigation arrows before the cards container
      cardsContainer.insertAdjacentElement('beforebegin', cardsNav);
 
      const cardsList = document.querySelector('.cards.custom-tut.block ul');
      const cards = document.querySelectorAll('.cards.custom-tut.block ul li');
      const cardWidth = 364; // Including margin
      const visibleCards = 2;
      const maxIndex = cards.length;
      let cardIndex = 0;
 
      // Update card position function
      const updateCardPosition = () => {
        if (cardIndex < maxIndex - visibleCards) {
          cardsList.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
        }
 
        // Reset previous card styles
        cards.forEach(card => {
          const h3 = card.querySelector('h3');
          const p = card.querySelector('p');
          const expandText = card.querySelector('.expand-text');
          if (h3) { h3.style.color = 'black'; }
          if (p) { p.style.color = 'black'; }
          if (expandText) { expandText.remove(); }
          card.style.backgroundColor = 'white';
          card.style.height = 'auto'; // Reset the height
        });
 
        // Style the current card based on its index
        const currentCard = cards[cardIndex];
        if (currentCard) {
          const h3 = currentCard.querySelector('h3');
          const p = currentCard.querySelector('p');
          if (h3) { h3.style.color = 'white'; }
          if (p) { p.style.color = 'white'; }
          currentCard.style.backgroundColor = '';
          currentCard.style.color = 'white';
          currentCard.style.height = 'calc(100% + 40px)'; // Increase height by 40px
 
          // Add "click here to expand" text
          const expandText = document.createElement('div');
          expandText.className = 'expand-text';
          expandText.innerText = 'Click here to expand';
          expandText.style.cursor = 'pointer'; // Change cursor to pointer
          currentCard.appendChild(expandText);
 
          // Add event listener to open modal on click
          expandText.addEventListener('click', () => {
            let currentModalIndex = cardIndex;
 
            const createModal = (index) => {
              // Remove any existing modal
              const existingModal = document.querySelector('.modal');
              if (existingModal) {
                existingModal.remove();
              }
 
              const modal = document.createElement('div');
              modal.className = 'modal';
              modal.style.position = 'fixed';
              modal.style.top = '50%';
              modal.style.left = '50%';
              modal.style.transform = 'translate(-50%, -50%)';
              modal.style.backgroundColor = 'white';
              modal.style.padding = '20px';
              modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
 
              // Create and append the image, heading, and description to the modal
              const imgSrc = cards[index].querySelector('img').src;
              const imgAlt = cards[index].querySelector('img').alt;
              const headingText = cards[index].querySelector('h3') ? cards[index].querySelector('h3').innerText : '';
              const descriptionText = cards[index].querySelector('p') ? cards[index].querySelector('p').innerText : '';
 
              const imgElement = document.createElement('img');
              imgElement.src = imgSrc;
              imgElement.alt = imgAlt;
              imgElement.style.width = '100%';
              imgElement.style.height = '300px'; // Set height to 300px
              imgElement.style.objectFit = 'cover'; // Set object-fit to cover
              imgElement.style.marginBottom = '20px';
 
              const headingElement = document.createElement('h3');
              headingElement.innerText = headingText;
              headingElement.style.marginBottom = '10px';
 
              const descriptionElement = document.createElement('p');
              descriptionElement.innerText = descriptionText;
 
              modal.appendChild(imgElement);
              modal.appendChild(headingElement);
              modal.appendChild(descriptionElement);
 
              // Add "Next" and "Prev" buttons
              const prevButton = document.createElement('button');
              prevButton.innerText = 'Prev';
              prevButton.style.position = 'absolute';
              prevButton.style.bottom = '0px';
              prevButton.style.marginTop = '20px';
              prevButton.style.right = '100px';
              prevButton.style.background = 'transparent';
              prevButton.style.border = 'none';
              prevButton.style.fontSize = '20px';
              prevButton.style.cursor = 'pointer';
              prevButton.style.color = 'black';
              prevButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (currentModalIndex > 0) {
                  currentModalIndex--;
                  createModal(currentModalIndex);
                }
              });
 
              const nextButton = document.createElement('button');
              nextButton.innerText = 'Next';
              nextButton.style.position = 'absolute';
              nextButton.style.bottom = '0px';
              nextButton.style.marginTop = '20px';
              nextButton.style.right = '20px';
              nextButton.style.background = 'transparent';
              nextButton.style.border = 'none';
              nextButton.style.fontSize = '20px';
              nextButton.style.cursor = 'pointer';
              nextButton.style.color = 'black';
              nextButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (currentModalIndex < maxIndex - 1) {
                  currentModalIndex++;
                  createModal(currentModalIndex);
                }
              });
 
              modal.appendChild(prevButton);
              modal.appendChild(nextButton);
 
              document.body.appendChild(modal);
 
              // Add event listener to close modal on outside click
              document.addEventListener('click', (event) => {
                if (!modal.contains(event.target) && event.target !== expandText) {
                  modal.remove();
                }
              }, { once: true });
            };
 
            createModal(currentModalIndex);
          });
        }
      };
 
      // Disable left arrow initially
      leftArrow.style.opacity = 0.5;
      leftArrow.style.pointerEvents = 'none';
 
      leftArrow.addEventListener('click', () => {
        if (cardIndex > 0) {
          cardIndex--;
          updateCardPosition();
          rightArrow.style.opacity = 1;
          rightArrow.style.pointerEvents = 'auto';
        }
        if (cardIndex === 0) {
          leftArrow.style.opacity = 0.5;
          leftArrow.style.pointerEvents = 'none';
        }
      });
 
      rightArrow.addEventListener('click', () => {
        if (cardIndex < maxIndex - 1) {
          cardIndex++;
          updateCardPosition();
          leftArrow.style.opacity = 1;
          leftArrow.style.pointerEvents = 'auto';
        }
        if (cardIndex === maxIndex) {
          rightArrow.style.opacity = 0.5;
          rightArrow.style.pointerEvents = 'none';
        }
      });
 
      // Event listener to select card on click
      cards.forEach((card, index) => {
        card.addEventListener('click', () => {
          cardIndex = index;
          updateCardPosition();
        });
      });
 
      // Initial call to highlight the first card
      updateCardPosition();
    }
 
    // Carousel functionality for elements with the class slider
    document.querySelectorAll('.cards.slider.block').forEach((block) => {
      const ul = block.querySelector('ul');
 
      // Create and insert the arrows if they do not exist
      let cardsNav = document.createElement('div');
      cardsNav.className = 'cards-nav';
 
      const leftArrow = document.createElement('div');
      leftArrow.className = 'arrow left-arrow';
      leftArrow.innerHTML = '&larr;';
      cardsNav.appendChild(leftArrow);
 
      const rightArrow = document.createElement('div');
      rightArrow.className = 'arrow right-arrow';
      rightArrow.innerHTML = '&rarr;';
      cardsNav.appendChild(rightArrow);
 
      // Insert the navigation arrows before the cards container
      block.insertAdjacentElement('beforebegin', cardsNav);
 
      const cards = ul.querySelectorAll('li');
 
      // Get card width dynamically
      const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
      const visibleCards = Math.floor(block.offsetWidth / cardWidth);
      let cardIndex = 0;
 
      const updatePosition = () => {
        ul.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
      };
 
      leftArrow.addEventListener('click', () => {
        if (cardIndex > 0) {
          cardIndex--;
          updatePosition();
        }
      });
 
      rightArrow.addEventListener('click', () => {
        if (cardIndex < cards.length - visibleCards) {
          cardIndex++;
          updatePosition();
        }
      });
    });
  }, 200); // Set timeout of 200ms instead of 2000ms
}
