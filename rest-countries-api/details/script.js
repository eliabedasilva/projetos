let parameters = new URLSearchParams(window.location.search);
let nameOfCountry = parameters.get('country')
console.log(nameOfCountry)
var url = "https://restcountries.com/v3.1/name/"+nameOfCountry
    fetch(url)
    .then(request => request.json())
    .then(response => {
        var country = response[0]
        var nativeName = country.name.nativeName
        var populationOfCountryInt = country.population
        var populationOfCountryString = populationOfCountryInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        var regionOfCountry = country.region
        var capitalsOfCountry = country.capital
        var pngUrlImageOfCountry = country.flags.png
        var altFlag = country.flags.alt
        if(typeof(capitalsOfCountry) != 'undefined'){
            var capitalOfCountry = capitalsOfCountry[0]
        }
        console.log(nativeName)
        
    })

//Alternado entre o modo Dark e Light
const buttonDarkMode = document.querySelector('.darkmodeinput')
buttonDarkMode.addEventListener('click', ()=>{
    setTheme()
    let parameters = new URLSearchParams(window.location.search);
    let nameOfCountry = parameters.get('country')
    let theme = parameters.get('theme')
    if (theme === 'darktheme' || theme == null){
        window.location = `/details/?country=${nameOfCountry}&theme=lighttheme`
    } else {
        window.location = `/details/?country=${nameOfCountry}&theme=darktheme`
    }
    
});

//Voltando para a página principal

const backButton = document.querySelector('.backlink')
backButton.addEventListener('click', ()=>{
    let parameters = new URLSearchParams(window.location.search);
    let theme = parameters.get('theme')
    window.location = `/..?theme=${theme}`
})


function setTheme(){
    let parameters = new URLSearchParams(window.location.search);
    let theme = parameters.get('theme')
    // Pegandos todos os elementos que alteram o estilo
    const body = document.querySelector('body')
    const header = document.querySelector('header')
    const buttonBack = document.querySelector('a.backlink')
    let allELements = [buttonDarkMode, body, header, buttonBack] 
    //Alternado a classe darktheme em todos eles

    //Alternado a classe darktheme em todos eles
    if (theme === 'darktheme'){
        allELements.forEach(element => {
            element.classList.add('darktheme')
        });
    }
    else if(theme === 'lighttheme') {
        allELements.forEach(element => {
            element.classList.remove('darktheme')
        });
    }
}
setTheme()