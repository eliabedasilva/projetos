
function getAllCountries(){
    const url = "https://restcountries.com/v3.1/all"
    fetch(url)
    .then(request => request.json())
    .then(response => {
        response.forEach(element => {
            let nameOfCountry = element['name']['common'] 
            let populationOfCountryInt = element['population']
            let populationOfCountryString = populationOfCountryInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            let regionOfCountry = element['region']
            let capitalsOfCountry = element['capital']
            let pngUrlImageOfCountry = element['flags']['png']
            let altFlag = element['flags']['alt']
            let capitalOfCountry = 'Undefined';
            if(typeof(capitalsOfCountry) != 'undefined'){
                capitalOfCountry = capitalsOfCountry[0]
            }
            let divcountries = document.querySelector('div.content')
            divcountries.innerHTML += `<div class="country">
            <img src="${pngUrlImageOfCountry}" alt="${altFlag}">
            <h2 class="nameofcountry">${nameOfCountry}</h2>
            <p class="populationofcountry">Population:<span> ${populationOfCountryString}</span></p>
            <p class="regionofcountry">Region:<span> ${regionOfCountry}</span></p>
            <p class="capitalofcountry">Capital:<span> ${capitalOfCountry}</span></p>
            </div>`
        });  
        setTheme()
    })  
    
}


//Alternado entre o modo Dark e Light
const buttonDarkMode = document.querySelector('.darkmodeinput')
buttonDarkMode.addEventListener('click', ()=>{
    let parameters = new URLSearchParams(window.location.search);
    let theme = parameters.get('theme')
    if (theme === 'darktheme' || theme == null){
        window.location = '/?theme=lighttheme'
    } else {
        window.location = '/?theme=darktheme'
    }
    
    
    
});

function setTheme(){
    // Pegandos todos os elementos que alteram o estilo
    let parameters = new URLSearchParams(window.location.search);
    let theme = parameters.get('theme');
    console.log(theme)

    const body = document.querySelector('body')
    const header = document.querySelector('header')
    const countries = document.querySelectorAll('div.country')
    const searchInput = document.querySelector('input')
    const filterByRegion = document.querySelector('.filterbyregion')
    const filterByRegionButton = document.querySelector('.filterbyregion > button')
    const ulFilterByRegion = document.querySelector('.filter > ul')
    const buttonsFilterByRegion = document.querySelectorAll('.filter > ul > li > button')

    let allELements = [buttonDarkMode, body, header, searchInput, filterByRegion, filterByRegionButton, ulFilterByRegion] 
    allELements = allELements.concat(Array.from(countries))
    allELements = allELements.concat(Array.from(buttonsFilterByRegion))
    
    //Alternado a classe darktheme em todos eles
    if (theme === 'lighttheme'){
        allELements.forEach(element => {
            element.classList.remove('darktheme')
        });
        
    }else if(theme === 'darktheme') {
        allELements.forEach(element => {
            element.classList.add('darktheme')
        });
    }
}


//Adiconando o search

const searchInput = document.querySelector('input[type="text"]');

searchInput.addEventListener('input', ()=> {
    const countries = document.querySelectorAll('.country');
    const searchTerm = searchInput.value.toLowerCase();
    countries.forEach(country => {
        let itemTitle = country.querySelector('.nameofcountry').innerHTML.toLowerCase();
        if (itemTitle.indexOf(searchTerm) !== -1) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
  })
})

//Adicionando e removendo o menu de filtro por região

const filterByRegionButton = document.querySelector('.filterbyregion > button')
filterByRegionButton.addEventListener('click', ()=>{
    const ulFilterByRegion = document.querySelector('.filter > ul')
    if (ulFilterByRegion.style.display == 'block') {
        ulFilterByRegion.style.display = 'none'
    } else {
        ulFilterByRegion.style.display = 'block'
    }
    
    
});

//Adicionando a funcionalidade de filtro por região

const regions = document.querySelectorAll('.filter > ul > li > button')
regions.forEach(region => {
    region.addEventListener('click', ()=>{
        const countries = document.querySelectorAll('.country');
        countries.forEach(country => {
            let regionOfCountry = country.querySelector('.regionofcountry > span').innerHTML.toLowerCase();
            if (regionOfCountry.indexOf(region.innerHTML.toLocaleLowerCase()) !== -1){
                country.style.display = 'block';
            } else {
                country.style.display = 'none';
            }
      })
    })
});

//Redirecionando o usuario para a pagina de detalhes

const countries = document.querySelector('.content')
countries.addEventListener('click', function(event){
    if (event.target.tagName === 'IMG' ) {
        let country = event.target.parentNode
        let parameters = new URLSearchParams(window.location.search);
        let theme = parameters.get('theme');
        window.location = `details/?country=${country.querySelector('.nameofcountry').innerHTML.toLowerCase()}&theme=${theme}`
    }
})

getAllCountries()
