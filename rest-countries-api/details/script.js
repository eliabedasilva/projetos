let parameters = new URLSearchParams(window.location.search);
let codeOfCountry = parameters.get('code')
const url = 'https://restcountries.com/v3.1/alpha/'+codeOfCountry
    fetch(url)
    .then(request => request.json())
    .then(response => {
        const country = response[0]
        console.log(country)
        const nameOfCountry = country.name.common
        document.querySelector('title').textContent = nameOfCountry
        let nativeName = 'undefined'
        if (country.name.nativeName != undefined){
            const keyOfNativeName = Object.keys(country.name.nativeName)[0]
            nativeName = country['name']['nativeName'][keyOfNativeName]['common']
        } 
        const populationOfCountryInt = country.population
        const populationOfCountryString = populationOfCountryInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const regionOfCountry = country.region
        const subRegionOfCountry = country.subregion
        const capitalsOfCountry = country.capital
        const pngUrlImageOfCountry = country.flags.png
        const altFlag = country.flags.alt
        let topLevelDomain = 'undefined'
        if (country.tld.length != 0){
            topLevelDomain = country.tld[0]
        }
        let languagensString = 'undefined'
        if (country.languages != undefined){
            languagensString = (() => {
                let concatenatedString = ''
                const keys = Object.keys(country.languages);
                const lastKey = keys[keys.length - 1];
                
                for (const key in country.languages) {
                    if (country.languages.hasOwnProperty(key) && lastKey != key) {
                        concatenatedString += `${country.languages[key]}, `
                    } else if (lastKey === key){
                        concatenatedString += `${country.languages[key]}`
                    }
                }
                return concatenatedString
            })()
        }

        let currenciesString = 'undefined'
        if (country.currencies != undefined){
            currenciesString = (() => {
                let concatenatedString = ''
                const keys = Object.keys(country.currencies);
                const lastKey = keys[keys.length - 1];
                
                for (const key in country.currencies) {
                    if (country.currencies.hasOwnProperty(key) && lastKey != key) {
                        concatenatedString += `${country.currencies[key].name}, `
                    } else if (lastKey === key){
                        concatenatedString += `${country.currencies[key].name}`
                    }
                }
                return concatenatedString
            })()
        }

        let capitalOfCountry = 'undefined'
        if(typeof(capitalsOfCountry) != 'undefined'){
            capitalOfCountry = capitalsOfCountry[0]
        }
        let divContent = document.querySelector('.content')
        divContent.innerHTML += `<img src="${pngUrlImageOfCountry}" alt="${altFlag}">
        <div class="detailsofcountry">
            <h2>${nameOfCountry}</h2>
            <div class="supercontainerdetails">
                <div class="containerdetails">
                    <p>Native name: <span>${nativeName}</span></p>
                    <p>Population: <span>${populationOfCountryString}</span></p>
                    <p>Region: <span>${regionOfCountry}</span></p>
                    <p>Sub Region: <span>${subRegionOfCountry}</span></p>
                    <p>Capital: <span>${capitalOfCountry}</span></p>
                </div>
                <div class="containerdetails">
                    <p>Top Level Domain: <span>${topLevelDomain}</span></p>
                    <p>Currencies: <span>${currenciesString}</span></p>
                    <p>Languagens: <span class="languagens">${languagensString}</span></p>
                </div>
            </div>
            <div class="bordercountries">
                <p>Border Countries: </p>
                <section>
                    
                </section>
            </div>
        </div>
    </div>`

    let borderCountries = country.borders 
    let borderCountriesCointainer = document.querySelector('.bordercountries > section')
    if(borderCountries != undefined){
        borderCountries.forEach(borderCountry => {
            borderCountriesCointainer.innerHTML += `<button class="bordercountry">${borderCountry}</button>`
        });
    } else {
        borderCountriesCointainer.innerHTML += `<div class="bordercountry">No country on the border</div>`
    }  
    
    const buttonsBorderCountries = document.querySelectorAll('button.bordercountry')
    buttonsBorderCountries.forEach(buttonsBorderCountry => {
        buttonsBorderCountry.addEventListener('click', ()=>{
            let parameters = new URLSearchParams(window.location.search);
            let theme = parameters.get('theme')
            if (theme === 'lighttheme' || theme == null || theme == 'null'){
                window.location = `?code=${buttonsBorderCountry.textContent}&theme=lighttheme`
            } else {
                window.location = `?code=${buttonsBorderCountry.textContent}&theme=darktheme`
            }
        })
    });
    setTheme()
})

//Alternado entre o modo Dark e Light
const buttonDarkMode = document.querySelector('.darkmodeinput')
buttonDarkMode.addEventListener('click', ()=>{
    let theme = sessionStorage.theme
    if (theme === 'lighttheme' || theme == null){
        sessionStorage.theme = 'darktheme'

    } else {
        sessionStorage.theme = 'lighttheme'
    }
    setTheme()
});

//Voltando para a página principal

const backButton = document.querySelector('.backlink')
backButton.addEventListener('click', ()=>{
    window.location = `../`
})


function setTheme(){
    let theme = sessionStorage.theme
    // Pegandos todos os elementos que alteram o estilo
    const body = document.querySelector('body')
    const header = document.querySelector('header')
    const buttonBack = document.querySelector('a.backlink')
    const buttonsBorderCountries = document.querySelectorAll('.bordercountry')
    let allELements = [buttonDarkMode, body, header, buttonBack] 
    allELements = allELements.concat(Array.from(buttonsBorderCountries))
    //Alternado a classe darktheme em todos eles

    //Alternado a classe darktheme em todos eles
    if(theme === 'darktheme') {
        allELements.forEach(element => {
            element.classList.add('darktheme')
        }); 
    }else if (theme === 'lighttheme'){
        allELements.forEach(element => {
            element.classList.remove('darktheme')
        });
    }  
}