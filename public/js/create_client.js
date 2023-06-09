import { Client } from "./client.js";

const createBtn = document.getElementById("create");
createBtn.addEventListener("click", () => {
  click();
});

function click() {
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
  console.log(newClient);
  newClient.saveToDB();
  //reset form
  document.getElementById("form").reset()
}

//TODO add input validation
