import '@pwabuilder/pwaupdate'
import tablesort from 'tablesort'
import Gumshoe from 'gumshoejs'
import { renderKatex } from './katex';
import { lightbox } from './lightbox'
// Note: the tablesort lib is not ESM friendly, and the sorts expect `Tablesort` to be available on the global
window.Tablesort = tablesort
require('tablesort/dist/sorts/tablesort.number.min.js')

function initTableSort () {
  var elements = document.querySelectorAll(".tablesort")
  elements.forEach(function (el) {
    tablesort(el);
  })
}

function initTocDepthSlider () {
  var slider = document.getElementById('toc-depth-slider')
  var toc = document.querySelector('.toc')
  
  slider.addEventListener('change', (event) => {
    handleSliderChange(Number(event.target.value))
  })

  function handleSliderChange (depth) {
    for (let i = 0; i < 6; i++) {
      toc.querySelectorAll(`.depth-${i}`).forEach(el => {
        if (i < depth) {
          el.classList.remove('maybe-hide')
        } else {
          el.classList.add('maybe-hide')
        }
      })
    }
  }
  // init to the current value
  handleSliderChange(slider.value)
}

function initTocScrollSpy () {
  var spy = new Gumshoe('.toc a', {
    nested: true,
    nestedClass: 'active-parent'
  })
}

window.addEventListener('DOMContentLoaded', () => {
  initTocDepthSlider()
  initTocScrollSpy()
  initTableSort()
  lightbox()
  // load katex when math-mode page intersect with the viewport
  let observer = new IntersectionObserver((entries, observer) => { 
      entries.forEach(entry => {
        if(entry.isIntersecting){
          renderKatex(entry.target)
          observer.unobserve(entry.target);
        }
      });
  });
  document.querySelectorAll('.math-mode').forEach(img => { observer.observe(img) });

  const toggle = document.querySelector('#menu-control')

  toggle.addEventListener('click', (e) => {
    if(e.target.checked) {
      document.body.classList.add('lightbox-body-scroll-stop')
    } else {
      document.body.classList.remove('lightbox-body-scroll-stop')
    }
  })

});
