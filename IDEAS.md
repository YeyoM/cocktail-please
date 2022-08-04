## UI ideas

1. Add a loading screen
2. Add a 404 page
3. Add notifications (success, error, warning)
4. Warning notification for the irresponsable actions of the user and underage users
5. Mobile first
6. Big button on the center of the screen to reveal the cocktail that dissapears after the cockatil shows up (move to bottom the dissapear)

## Tools and libraries

1. TailwindCSS
2. LocalStorage
3. MongoDB
4. CockatilDB

## App Flow

1. User Registration (username, password, email, age important!!!, day to recieve random cocktail, actual week's cocktail, date for next cocktail reveal)
  - If the user is underage, show a warning notification
  - If everything is ok, show the loading screen and a message to the user that he is being registered but need to confirm his email
2. Confirmation email
3. Right after the registration the user is redirected to the login page
4. The user logins, if the login is successful the user is redirected to the home page
5. In the home page 
   - if the random cocktail day is not set, we ask the user to set it
     - We show up a success message and the user is redirected to the home page
   - if the random cocktail day is set and the week's random cocktail is not revealed yet (we will know by comparing the actual date and the date for the next cocktail reveal)
     - we show the home page with a button to reveal the cocktail
     - we calculate/update the date for the next cocktail reveal and show it in the home page, this way we can compare the date with the current date and determine if the user should reveal another cocktail or not
   - if the random cocktail day is set and the week's random cocktail is revealed
     - we show the home page with the cocktail revealed
     - we know that the user can't reveal another cocktail until the date is reached