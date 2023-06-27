## About
- This is a simple CRUD working with mongodb, node js and a browser
- Its far from useful but the main aim was to learn using this tech stack

## Shortcomings
- There is no user verification or security 
- No input validation 
- It doesns't use HTML partials for nav etc.
- A lot of the code needs massive refactoring 
- No custom CSS just a basic boostrap
- UX issues like no warning popups, no comfirmation on sucesful edit
- Whole page refresh when making a change like deleting a client
- and a lot more I can't think of right now

## How to run 
1. Create .env in the root folder and specify your mongodb database URL like "DATABASE_URL=mongodb://127.0.0.1/app"
2. Cd into root folder of this app
3. run "npm install" to install dependencies
4. run "nodemon start server.js" 
5. Now you can visit http://localhost:3000 to use the app