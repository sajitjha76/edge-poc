export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  if(window.innerWidth <= 900)
  {
      setTimeout(function(){
    var topdivall = document.querySelectorAll('.bestsuits > div .columns-img-col')
     var bottomDiv = document.querySelectorAll('.bestsuits div:nth-of-type(2) div')
     topdivall.forEach(function(topdiv , index){
      topdiv.insertAdjacentElement('afterend', bottomDiv[index]);
       console.log(topdiv , bottomDiv[index])
     })
  })
  }

}
