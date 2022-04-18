fetch ('https://api.openbrewerydb.org/breweries')
.then(res => res.json())
.then (data => console.log(data))