import { showAll, delClient } from "./client.js";

clientTable();

async function clientTable() {
  let arr = await showAll();
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
  //Why did I use for...in? 
  //Probably should rewrite this later 
  for (let client in arr) {
    // TODO remove log
    console.log(arr[client]);
    const row = tbody.insertRow();
    //Create a link using first and last name
    const nameCell = row.insertCell();
    nameCell.classList.add("align-middle");
    const name = document.createElement("a");
    name.textContent = arr[client].first_name + " " + arr[client].last_name;
    name.classList.add("link-primary");
    name.href = "http://localhost:3000/clients/" + arr[client]._id;
    nameCell.appendChild(name);
    //Create address from "street" and "city"
    const addressCell = row.insertCell();
    addressCell.classList.add("align-middle");
    addressCell.textContent = arr[client].street + " " + arr[client].city;

    // Create a container for the buttons
    const emptyCell = row.insertCell();
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-group");
    emptyCell.appendChild(buttonContainer);

    // Edit button
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.classList.add("btn", "btn-primary");
    buttonContainer.appendChild(edit);
    // Delete button
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.id = arr[client]._id;
    del.classList.add("btn", "btn-danger", "delBtn");
    del.onclick = buttonContainer.appendChild(del);
  }
  tabDiv.innerHTML += ` </tbody>
      </table>`;
}

//Del button click
$(document).on("click", ".delBtn", function () {
  delClient(this.id);
});
