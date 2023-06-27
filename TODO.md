# Refactoring

## Models
- Separate client and insurance to different file


## Public
### HTML
- Break up all those file into partials (mainly nov I can't think of anything else)
- Creating custom styling instead of default bootstrap -> adding CSS folder
- UX adding warning popup before deleting and comfirmation when creating or editting
### JS
- Move functions from from client.js into either client methods (mostly static) or to a different files
- Move those click functions into the event listerner

## Routes
- This code is a mess, for some reason I didn't end up using the insurance.js.  
Well I think I didn't use anything from that, might as well try to delete it and see if something breaks
- Sepparete the clients route from the insurance, use better URLs 
- **USE THE FINDCLIENT FUNCTION**

## Views
- Basically the same as HTML, mainly switch to partials

