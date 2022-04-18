fetch ('http://localhost:3000/breweries')
.then(res => res.json())
.then (data => { 
    populate(data)
    submitForm()
})

function populate(breweries) {
    const beerContainer = document.getElementById("beer-container")
    breweries.forEach(brewery => {
        let beerName= document.createElement('h2')
        let breweryType = document.createElement('h4')
        let address = document.createElement('p')
        let website = document.createElement('a')
        let likeButton = document.createElement('button')
        
        //Add beer name, brewery type, and address
        beerName.innerText = brewery.name 
        breweryType.innerText = `Type: ${brewery.brewery_type}`
        address.innerText = `Address: ${brewery.street} ${brewery.city}, ${brewery.state} ${brewery.postal_code}`

        //Remove "null" from the address
        if (address.innerText.includes("null")) {
            address.innerText = address.innerText.replace("null", "")} //Can rewrite as a ternary

        //Add the URL
        website.href= `${brewery.website_url}`
        website.innerText = brewery.website_url

        //Add content to heart button
        likeButton.innerHTML = "❤"
        likeButton.style.color = "white"
        likeButton.addEventListener("click", () => { 
            if (likeButton.style.color === "white") {
                likeButton.style.color = "red"
            } else if (likeButton.style.color === "red") { 
                likeButton.style.color = "white" 
            }
        })

        beerContainer.append(beerName, likeButton, breweryType, address, website)
    }) 
}

function submitForm () {
    let form = document.getElementById("submit-beer")
    form.addEventListener("submit", (e) => { 
        e.preventDefault()
        let newBrewery = { 
            "name": e.target.name.value, 
            "brewery_type": e.target.type.value, 
            "street": e.target.street.value, 
            "city": e.target.city.value, 
            "state": e.target.state.value, 
            "postal_code": e.target.zipCode.value,
            "website_url": e.target.websiteUrl.value
        }
        fetch ('http://localhost:3000/breweries', { 
            method: 'POST', 
            headers: { 
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(newBrewery)
        })
        .then (response => response.json())
        .then(newData => { 
            populate(newData)
        })
        // form.reset()
    })
}