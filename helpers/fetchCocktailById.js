export default function fetchCocktailById(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
      return data.drinks[0]
    })
    .catch(err => {
      console.log(err)
    })
}