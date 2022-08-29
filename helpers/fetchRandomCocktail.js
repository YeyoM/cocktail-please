export default function fetchRandomCocktail() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      return data.drinks[0]
    })
    .catch(err => {
      console.log(err)
    })
}