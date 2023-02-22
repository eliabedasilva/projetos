
function getAllCountries(){

    var url = "https://restcountries.com/v3.1/all"
    fetch(url)
    .then(request => request.json())
    .then(response => {
        response.forEach(element => {
            var nameOfCountry = element['name']['common'] 
            var populationOfCountryInt = element['population']
            var populationOfCountryString = populationOfCountryInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            var regionOfCountry = element['region']
            var capitalsOfCountry = element['capital']
            var pngUrlImageOfCountry = element['flags']['png']
            if(typeof(capitalsOfCountry) != 'undefined'){
                var capitalOfCountry = capitalsOfCountry[0]
            }
            var divcountries = document.querySelector('div.content')
            divcountries.innerHTML += `<div class="country">
            <img src="${pngUrlImageOfCountry}" alt="flag of ${nameOfCountry}">
            <h2 class="nameofcountry">${nameOfCountry}</h2>
            <p class="populationofcountry">Population:<span> ${populationOfCountryString}</span></p>
            <p class="regionofcountry">Region:<span> ${regionOfCountry}</span></p>
            <p class="capitalofcountry">Capital:<span> ${capitalOfCountry}</span></p>
            </div>`
        });
    })  
}

getAllCountries()

//Alternado entre o modo Dark e Light
var buttonDarkMode = document.querySelector('.darkmodeinput')
buttonDarkMode.addEventListener('click', ()=>{
    // Pegandos todos os elementos que alteram o estilo
    var body = document.querySelector('body')
    var header = document.querySelector('header')
    var countries = document.querySelectorAll('div.country')
    var searchInput = document.querySelector('input')
    var filterByRegion = document.querySelector('.filterbyregion')
    var filterByRegionButton = document.querySelector('.filterbyregion > button')
    var ulFilterByRegion = document.querySelector('.filter > ul')
    var buttonsFilterByRegion = document.querySelectorAll('.filter > ul > li > button')

    //Alternado a classe darktheme em todos eles
    countries.forEach(element => {
        element.classList.toggle('darktheme')
    });
    buttonsFilterByRegion.forEach(element => {
        element.classList.toggle('darktheme')
    });
    body.classList.toggle('darktheme')
    header.classList.toggle('darktheme')
    buttonDarkMode.classList.toggle('darktheme')
    searchInput.classList.toggle('darktheme')
    filterByRegion.classList.toggle('darktheme')
    filterByRegionButton.classList.toggle('darktheme')
    ulFilterByRegion.classList.toggle('darktheme')
    

});


//Adiconando o search
var searchInput = document.querySelector('#txtsearch')
searchInput.addEventListener('submit', ()=>{
    alert('enter')
})


var searchInput = document.querySelector('input[type="text"]');

searchInput.addEventListener('input', ()=> {
    var countries = document.querySelectorAll('.country');
    var searchTerm = searchInput.value.toLowerCase();
    countries.forEach(country => {
        var itemTitle = country.querySelector('.nameofcountry').innerHTML.toLowerCase();
        if (itemTitle.indexOf(searchTerm) !== -1) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
  })
})

//Adicionando e removendo o menu de filro por região

var filterByRegionButton = document.querySelector('.filterbyregion > button')
filterByRegionButton.addEventListener('click', ()=>{
    var ulFilterByRegion = document.querySelector('.filter > ul')
    if (ulFilterByRegion.style.display == 'block') {
        ulFilterByRegion.style.display = 'none'
    } else {
        ulFilterByRegion.style.display = 'block'
    }
    
    
});

//Adicionando a funcionalidade de filtro por região

var regions = document.querySelectorAll('.filter > ul > li > button')
regions.forEach(region => {
    region.addEventListener('click', ()=>{
        var countries = document.querySelectorAll('.country');
        countries.forEach(country => {
            var regionOfCountry = country.querySelector('.regionofcountry > span').innerHTML.toLowerCase();
            if (regionOfCountry.indexOf(region.innerHTML.toLocaleLowerCase()) !== -1){
                country.style.display = 'block';
            } else {
                country.style.display = 'none';
            }
      })
    })
});

//Redirecionando o usuario para a pagina de detalhes

var countries = document.querySelector('.content')
countries.addEventListener('click', function(event){
    if (event.target.tagName === 'IMG' ) {
        var country = event.target.parentNode
        sessionStorage.nameOfCountry = country.querySelector('.nameofcountry').innerHTML.toLowerCase()
        window.location = 'details/'
    }
})