fetch ('http://localhost:3000/breweries')
.then(res => res.json())
.then (data => { 
    populate(data)
    submitForm()
})

function populate(breweries) {
    breweries.forEach(brewery => {
        addNewBrewery(brewery)
    })
    filterBreweries(breweries)
}

function addNewBrewery(brewery) { 
    let breweryName= document.createElement('h2')
    let breweryType = document.createElement('h4')
    let address = document.createElement('p')
    let website = document.createElement('a')
    let likeButton = document.createElement('button')
    
    //Add beer name, brewery type, and address
    breweryName.innerText = brewery.name 
    breweryType.innerText = `Type: ${brewery.brewery_type}`
    address.innerText = `Address: ${brewery.street} ${brewery.city}, ${brewery.state} ${brewery.postal_code}`

    //Remove "null" from the address
    if (address.innerText.includes("null")) {
        address.innerText = address.innerText.replace("null", "")} //Can rewrite as a ternary

    //Add the URL
    website.href= `${brewery.website_url}`
    website.innerText = brewery.website_url

    //Add content to heart button
    //This doesn't persist. Do we want to push to our data?
    likeButton.innerHTML = "❤"
    likeButton.className = "likeBtn"
    likeButton.style.color = "white"
    likeButton.addEventListener("click", () => { 
        if (likeButton.style.color === "white") {
            likeButton.style.color = "red"
        } else if (likeButton.style.color === "red") { 
            likeButton.style.color = "white" 
        }
    })
    let breweryContainer = document.getElementById("brewery-container")
    breweryName.append(likeButton)
    breweryContainer.append(breweryName, breweryType, address, website)
}

function submitForm () {
    const form = document.getElementById("form")
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
        form.reset()
        fetch ('http://localhost:3000/breweries', { 
            method: 'POST', 
            headers: { 
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(newBrewery)
        })
        .then (response => response.json())
        .then(newBreweryData => { 
            addNewBrewery(newBreweryData)
        })
    })
    collapseForm(form)
}

function filterBreweries (breweries) { 
    const select = document.getElementById("beer-type-dropdown")
    select.addEventListener("change", (e) => { 
        document.getElementById("brewery-container").innerHTML = ""
        breweries.forEach(beer => { 
            if (beer.brewery_type === e.target.value) { 
                addNewBrewery(beer)
            }
        })
    })
}

function collapseForm (form) { 
    let collapseElement = document.querySelector(".collapsible")
    collapseElement.addEventListener("click", () => {
        if (form.style.display === "block") { 
            form.style.display = "none";
        } else { 
            form.style.display = "block"
        }
    })
}
