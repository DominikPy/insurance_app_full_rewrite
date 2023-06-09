import { Client } from "./client.js";

const createBtn = document.getElementById("update");
createBtn.addEventListener("click", () => {
  click();
});
//change to proper patch, why did I use post method?
//Wrong name but correct method, postToDB doesn't "post" but patches
//also why the hell did I make a sep. fucntion for the click?

function click() {
  const clientID = createBtn.getAttribute("data-clientid");
  //load form data
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const age = document.getElementById("age").value;
  const phone_number = document.getElementById("phonenumber").value;
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  //Create new "Client" and POST
  const newClient = new Client(
    first_name,
    last_name,
    age,
    phone_number,
    street,
    city
  );
  console.log(clientID);
  console.log(newClient);
  newClient.postToDB(clientID);
}

//TODO add success msg after saving