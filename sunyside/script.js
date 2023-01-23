var button = document.querySelector('.button-hamburger')
button.addEventListener('click', ()=>{
  button.classList.toggle('activated')
  ulMobile = document.querySelector('ul.mobile')
  ulMobile.classList.toggle('activated')
}
)

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
link.addEventListener('click', event => {
    event.preventDefault();

    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const topOffset = targetElement.offsetTop;


    window.scrollTo({
    top: topOffset,
    behavior: 'smooth'
    });
});
});
