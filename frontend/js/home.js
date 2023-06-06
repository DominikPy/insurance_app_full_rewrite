import { showAll } from "./client.js";

let clientArr = await showAll();
//TODO remove log
console.log(clientArr);

function clientTable(arr) {
  const tabDiv = document.getElementById("table");
  tabDiv.innerHTML += `<table class="table table-hover">
      <thead id="tb">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>`;
  const tbody = document.createElement("tbody");
  const table = document.querySelector(".table");
  table.appendChild(tbody);
  for (let client in arr) {
    // TODO remove log
    console.log(arr[client]);
    const row = tbody.insertRow();
    //Create a link using first and last name
    const nameCell = row.insertCell();
    const name = document.createElement("a");
    name.textContent = arr[client].first_name + " " + arr[client].last_name;
    name.classList.add("link-primary");
    name.href = "http://localhost:3000/clients/" + arr[client]._id;
    nameCell.appendChild(name);
    //Create addres from "street" and "city"
    const addressCell = row.insertCell();
    addressCell.textContent = arr[client].street + " " + arr[client].city;

    // Create a container for the buttons
    const emptyCell = row.insertCell();
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-group");
    emptyCell.appendChild(buttonContainer);

    // Create Bootstrap buttons inside the container
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.classList.add("btn", "btn-primary");
    buttonContainer.appendChild(edit);
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("btn", "btn-danger");
    buttonContainer.appendChild(del);
  }
  tabDiv.innerHTML += ` </tbody>
    </table>`;
}

clientTable(clientArr);
