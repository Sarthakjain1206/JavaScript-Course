'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//HEADLINE: Smooth Scrolling (using event delegation)
// 1. add eventListener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  // 2. determine what element originated the event
  // Matching Strategy 
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//HEADLINE: Tabbed Component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  let clicked = e.target;
  console.log(e.target);      // We can see that if we are clicking on button itself then its working fine but if we click on span part of button [01, 02, 03 on webpage] then we are getting span element as target

  // To fix this we can use closest method to find '.operations__tab' because if we click on button('.operations__tab') itself then we will get button element.
  // Also if we click on span element which is a child of button('.operations__tab') then also closest will return button element.
  clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  
  if (!clicked) return;     // This is done to handle the case when click event happens actually on container itself (ignore).
  
  // Remove active from all buttons 
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // And then make the current clicked button active
  clicked.classList.add('operations__tab--active');

  // Activate content area
  const tabNumber = clicked.dataset.tab;
  const contentArea = document.querySelector(`.operations__content--${tabNumber}`);

  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  contentArea.classList.add('operations__content--active');

});

//HEADLINE: Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(element => {
      //1)
      // if (element != link) element.style.opacity = opacity;
      if (element != link) element.style.opacity = this;

    });
    //1)
    // logo.style.opacity = opacity;
    logo.style.opacity = this;

  }

};

// We are using mouseover because it bubbles up unlike mouseenter

// 1)
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// 2) Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));


//HEADLINE: Sticky navigation -- Using scrolling event [bad way]
const section1 = document.querySelector('#section--1');
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  // console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
})

//HEADLINE://! INTERSECTION OBSERVER API

//HEADLINE: Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//HEADLINE: Reveal Sections 
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // Hiding these sections at first and when the user scrolls down we will show these sections with animation.
  section.classList.add('section--hidden');
})

//HEADLINE: Lazy Loading Images [Improve performance]
/*
! ==================================================
* There can be many ways to implement lazyloading (Check MDN) but in this project we are using Intersection Observer API to implement it.
* HTML and CSS behind it ----> 
    HTML:
        <img
          src="img/digital-lazy.jpg"
          data-src="img/digital.jpg"
          alt="Computer"
          class="features__img lazy-img"
        />
    CSS:
        .lazy-img {
          filter: blur(20px);
        }

* In html we have "data-src" attribute in img tags on which we want to apply lazy loading. Basically, we have two images one is very very small ("img/digital-lazy.jpg")
* which is being created by resizing the original image("img/digital.jpg") and currently we are showing "digital-lazy.jpg" (very lowe resolution) on webpage with 
* blur filter effect on it (CSS). This is all done so that webpage can be loaded very fast irrespective of images and when user will navigate to image then we will load
* original image right there.

* What we have to do:
*      1) Detect when the user is about to view the image (in our case, detect when user is about to scroll down the viewport which contains the targeted img)
*      2) Load the original image i.e by performing this operation =>   img.src = img.dataset.src
*      3) INFO: After completely loading the image, remove the CSS blur filter.

INFO: When the file/image gets completely loaded JS fires a "load" event.
! ==================================================

*/
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if (!entry.isIntersecting) return;

  //2) Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //3) removing blur filter [only after completely loading of image] as js fires load event after it.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach(img => imgObserver.observe(img));


//HEADLINE: Slider

const slideFunction = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function (slide) {
    // Firstly, deactivate all dots
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');

  };


  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`
      // slide = 1:::: -100% 0% 100% 200%
      // slide = 2:::: -200% -100% 0% 100%
    })
  };


  //Next SLide
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    if (currSlide == 0) currSlide = maxSlide - 1;
    else currSlide--;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // Initially
  function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
};

slideFunction();

//? Lectures =========================================
//! ==============Selecting Elements===================

// // Full html document
// console.log(document.documentElement);
// // Head
// console.log(document.head);
// // Body
// console.log(document.body);

// /* HEADLINE: HTMLCOllection Vs NodeList
// * The main difference between an HTMLCollection and a NodeList is that one is live and one is static.
// * This means that when an element is appended to the DOM, a live node will recognize the new element while a static node will not.

// HEADLINE: HTMLCollection
// *The element methods getElementsByClassName() and getElementsByTagName() return a live HTMLCollection. 
// * It only includes the matching elements (e.g. class name or tag name) and does not include text nodes.
// * It provides only two methods item and namedItem.

// HEADLINE: NodeList
// * The element method *querySelectorAll()* returns a static NodeList. They look like arrays but are not.
// * NodeLists have a defined forEach method as well as a few other methods including item, entries, keys, and values.
// * NodeLists behave differently depending on how you access them; if you access elements using childNodes, the returned list is live and will update as more elements are added to the node. 
// * If it’s accessed using querySelectorAll(), the returned list is static and will not update if more elements are added to the node.
// */

// // Returns a live collection
// const header = document.querySelector('.header');

// //INFO: Returns NodeList having all section elements.
// //INFO: Returns static collection
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// // Returns live collection
// console.log(document.getElementById('section--1'));

// //INFO: HTMLCollection having all elements.
// //INFO: Retuns a live Collection
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));


//! ==============Creating And Inserting Elements===================
/*
//* one way of creating element
// const newElement = document.createElement("h2");
// const newText = document.createTextNode("This is just text");
// newElement.appendChild(newText); // <h2> This is just text </h2>
//* inserting element using insertAdjacentElement() function
// const target = document.getElementsByClassName("footer");
// target[0].insertAdjacentElement("afterbegin", newElement);

//* insertAdjacentHtml() function is already done in BankistApp project in previous sections

//* ======================
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved funcitonaliy';
message.innerHTML =
  'We use cookie for improved funcitonaliy. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);     // inserts the element as the first child.
header.append(message);      // inserts the element as the last child.
// header.before(message);   // insert before header element (sibling)
// header.after(message);    // insert after header element (sibling)

//? Why header element is only at the last position instead of being at both positions?
// Reason: Header is now a DOM live element so it can be only at one place at a time therefore in second statement rather than inserting the element it just moved the element from being a first child to last child.

// We can clone the message element if we want to insert it at as last child as well.
// header.append(message.cloneNode(true));
*/

//! ==============Deleting Elements===================

/*
// Deleting the cookie message element after click got it button-----
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  //? Latest Way of removing child element
  message.remove();
  //? Older way is to first traverse up (DOM traversing) i.e select parent and then remove the particular child from parent.
  // message.parentElement.removeChild(message);

})
*/

//! ================= Styles =====================
/*
// Style property set inline styles 
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);
//FIXME: Nothing gets printed -- -because, style property like here works only for inline styles
console.log(message.style.height);

//INFO: To get styles which can be seen on webpage but cannot fetch because they aren't inline styles i.e they are defined in css style sheet we use getComputedStyle()
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);  // 49.4px --> parseFloat(49.4px) --> 49.4

// Manipulating height ----
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//HEADLINE: Manipulating CSS custom properties or CSS variables.
// CSS variables idea is very similar to JS variables. It is defined in document root and can be use wherever we want in CSS file. Moreover, we can change their values using JS.
document.documentElement.style.setProperty('--color-primary', "orangered");
*/

//! ================== Attributes ====================
/*
const logo = document.querySelector('.nav__logo');
console.log(logo.className);
console.log(logo.alt);
console.log(logo.src);                    //INFO: Returns absolute url
console.log(logo.getAttribute('src'));    // Not an absolute url (returns value as it is present in html document)

//INFO: We can access standard attributes only with chaining.
console.log(logo.designer); // undefined

//* getAttribute()
console.log(logo.getAttribute('designer')); // Works fine
//*

//* setAttribute()
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttributeNames());

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//HEADLINE: Data attributes [Very imp in general]
logo.setAttribute('data-version-number', "3.0");
// INFO: To access data type attributes from html we have to fetch it from dataset and that to with convention of camel casing (versionNumber)
console.log(logo.dataset.versionNumber);

// Classes
console.log(logo.classList.add('c','j'));
console.log(logo.classList.remove('c'))
console.log(logo.classList.contains('c'));    // false

// The toggle() method of the DOMTokenList interface removes a given token from the list and returns false. If token doesn't exist it's added and the function returns true.
console.log(logo.classList.toggle('c'));
console.log(logo.classList.contains('c'));    // true
console.log(logo.classList.contains('j'));

logo.classList.remove('c', 'j');

// Don't use
// logo.className = 'sarthak';
*/

//! ===================== Smooth Scrolling =================
/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());    // e.target --> btnScrollTo

  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log('height/width viewport:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth);
  
  
  // // HEADLINE: Normal Scrolling (Traditional Way)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // // HEADLINE: Smooth Scrolling (Traditional Way)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern JavaScript Way
  section1.scrollIntoView({ behavior: 'smooth' });

})
*/
//! ================== Events and Event Handlers ================
/*
const h1 = document.querySelector('h1');

const alert1 = function (e) {
  alert('Great! You are reading the heading');
  // Delete event;
  // h1.removeEventListener('mouseenter', alert1);
}

//* one way of listening to the event
h1.addEventListener('mouseenter', alert1);    // mouseenter -> hover

//* another way of listening to the event (traditional)
// h1.onmouseenter = alert1;


// But using addEventListener is much better than on___ way because of few
// reasons, mainly because in addEventListener we can call many events
// attached to single element whenever we want. Whereas in on__ method new event will overwrite the value of previous event.
// Also, deleting of events is simpler and much accurate in addEventListener mathod.


setTimeout(() => h1.removeEventListener('mouseenter', alert1), 3000); // event will be received only once.
*/

//! =========== Event Propagation (Capturing and Bubbling) ==========
/*
// generate random integer b/w min and max.
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// parent of parent of deepest child (see html)
document.querySelector('.nav').addEventListener('click', function (e) {
  console.log("3. LInk", e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
  console.log(e.currentTarget === this);        // true
});

// parent of deepest child (see html)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log("2. LInk", e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();

});

// Deepest child node (see html)
document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log("1. LInk", e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();

  // Stop propagation --- [If we stop here its parents will not listen to events ]
  // e.stopPropagation();
});

//INFO: If I click on deepest child then "1 Link" gets printed after that its first parent's "2. Link" gets printed after that "3. Link" gets printed ----> This is happening at Bubbling phase of event propagation where DOM traverses up the capture tree after target hit (SEE LECTURE)

//INFO: We can observe that at every stage in bubbling phase event target is same. i.e '.nav__link' (if clicked on features button)
//INFO: But we can also get current target as well using e.currentTarget

//? INFO: If we want to listen the events in capturing phase then we can pass the third parameter as true in addEventListener funtion. Example-

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log("1. LInk", e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();

//   // Stop propagation --- [If we stop here its parents will not listen to events ]
//   // e.stopPropagation();
// }, true);

// O/P: 
//      3. Link
//      2. Link
//      1. Link

//? INFO: Important note: Every event do not follow this methodolgy of evernt propagation (check mdn for those events) for eg:
// mouseenter do not follows event propagation
// mouseover follows event propagation [instead of the fact that both events are same i.e hover]
*/

//! ==================== EVENT DELEGATION =========================
/*
// Page Navigation [Smooth scrolling for nav bar list items]

//INFO: Brute force way---- [we are calling function for every element]
// document.querySelectorAll('.nav__link').forEach(function (node) {
//   node.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');     // #section--1
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// })

//INFO: Using event delegation [it uses the fact that event bubbles up]

// 1. add eventListener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  // 2. determine what element originated the event
  // Matching Strategy 
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
*/

//! ====================== DOM Traversing ==========================
/*
const h1 = document.querySelector('h1');

//HEADLINE: Going downwards: Child

console.log(h1.querySelectorAll('.highlight'));     // This will go as deeper as possible
console.log(h1.childNodes);       // All child nodes
console.log(h1.children);         // Live collection elements--> span span br.... Also it works for direct children only

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

//HEADLINE: Going Upwards: Parent

console.log(h1.parentNode);       // Direct parent node
console.log(h1.parentElement);    // Direct parent element

//Closest method: any ancestor which matches our query string (".header")
//Closest is opposite of querySelector --> closest finds out parent, not matter how deep, whereas querySelector finds out children

// var(--gradient-secondary) & var(--gradient-primary) are CSS variables.
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//HEADLINE: Going Sideways: SIBLINGS

// Previous and next siblings..  Also, in jS no direct method is available to find out all siblings.
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
// But we can use a trick to find out all siblings --> move to parent and find all of its children.
console.log(h1.parentElement.children);

*/

//! ================== Some More Events ==========================

// DOMContentLoaded --> This event will be fired as soon as HTML and js files are loaded
// BeforeLoad --> when user tries to leave the page before completely loading of page or some process