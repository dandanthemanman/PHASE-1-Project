fetch ('http://localhost:3000/breweries')
.then(res => res.json())
.then (data => { 
    populate(data)
    submitForm(data)
})

function populate(breweries) {
    const beerContainer = document.getElementById("beer-container")
    breweries.forEach(brewery => {
        let beerName= document.createElement('h2')
        let breweryType = document.createElement('h4')
        let address = document.createElement('p')
        let website = document.createElement('a')
        
        beerName.innerText = brewery.name 
        breweryType.innerText = `Type: ${brewery.brewery_type}`
        address.innerText = `Address: ${brewery.street} ${brewery.city}, ${brewery.state} ${brewery.postal_code}`

        if (address.innerText.includes("null")) {
            address.innerText = address.innerText.replace("null", "")} //Can rewrite as a ternary

        website.href= `${brewery.website_url}`
        website.innerText = brewery.website_url

        beerContainer.append(beerName, breweryType, address, website)
    }) 
}

function submitForm (data) {
    const form = document.getElementById("submit-beer")

    
    form.addEventListener("submit", (e) => { 
        e.preventDefault()
        form.reset()
    })
}