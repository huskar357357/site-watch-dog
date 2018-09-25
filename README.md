1. install node npm 
	command: "npm i"
2. to deploy server in dev mode.
	command: "npm run dev"
3. test client side via web browser


Plz, go to the path: [project folder]/src/app/resources/stats/state.js
Plz, modify the server and user default info.


/// Description of the project ///

-- Server Side
if server is deployed, 2 server side cronjobs are started.
cronjob1's interval is 5 minutes. (do check data of 30 minutes) 
cronjob2's interval is 30 minutes. (check data of 24 hours)

And server send checked data and result to the users with JSON format.
Also, server send email simultaneously to the users.
Also, send message to the users' browser.
Also, create and update log.txt file including all the checked results.

-- Clinet Side
Every user's browser parses JSON data and display result to the screen.

-- Plus
not yet.


/// Checking Rule ///


/// Default userID & userPWD is in DB.sql
ID : huskar357@outlook.com
PWD: hero