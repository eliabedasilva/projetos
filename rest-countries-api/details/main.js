var url = "https://restcountries.com/v3.1/name/"+sessionStorage.nameOfCountry
    fetch(url)
    .then(request => request.json())
    .then(response => {
        var country = response[0]
        
    })

//Alternado entre o modo Dark e Light
var buttonDarkMode = document.querySelector('.darkmodeinput')
buttonDarkMode.addEventListener('click', ()=>{
    // Pegandos todos os elementos que alteram o estilo
    var body = document.querySelector('body')
    var header = document.querySelector('header')
    var buttonBack = document.querySelector('a.backlink')
    console.log(buttonBack.innerHTML)
    //Alternado a classe darktheme em todos eles
    body.classList.toggle('darktheme')
    header.classList.toggle('darktheme')
    buttonDarkMode.classList.toggle('darktheme')
    buttonBack.classList.toggle('darktheme')

});
