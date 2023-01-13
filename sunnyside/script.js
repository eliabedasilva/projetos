var button = document.querySelector('.button-hamburger')
button.addEventListener('click', ()=>{
  button.classList.toggle('activated')
  ulMobile = document.querySelector('ul.mobile')
  ulMobile.classList.toggle('activated')
}
)