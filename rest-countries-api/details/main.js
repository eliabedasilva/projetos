var url = "https://restcountries.com/v3.1/name/"+sessionStorage.nameOfCountry
    fetch(url)
    .then(request => request.json())
    .then(response => {
        var country = response[0]
        var h2 = document.querySelector('h2')
        h2.innerText = country.name.common
    })