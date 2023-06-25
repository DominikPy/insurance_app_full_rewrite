import {Client, getClientInsurance, delClientInsurance } from "./client.js";

const tableDiv = document.getElementById("table_div")
const clientID = tableDiv.getAttribute("data-clientId")
const insuranceArray = await getClientInsurance(clientID)

drawTable()

function drawTable() {
    const tabDiv = document.getElementById("table_div");
    tabDiv.innerHTML += `
      <table class="table table-hover">
        <thead id="tb">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Start date</th>
            <th scope="col">End Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>`;
  
    const tbody = document.querySelector("tbody");
    for (let insurance of insuranceArray) {
      const row = tbody.insertRow();
      
      const typeCell = row.insertCell();
      typeCell.classList.add("align-middle");
      const type = document.createElement("p");
      type.textContent = insurance.type;
      typeCell.appendChild(type);
  
      const amountCell = row.insertCell();
      amountCell.classList.add("align-middle");
      const amount = document.createElement("p");
      amount.textContent = insurance.amount;
      amountCell.appendChild(amount);
  
      const startDateCell = row.insertCell();
startDateCell.classList.add("align-middle");
const startDate = document.createElement("p");
startDate.textContent = new Date(insurance.start_date).toLocaleDateString();
startDateCell.appendChild(startDate);

const endDateCell = row.insertCell();
endDateCell.classList.add("align-middle");
const endDate = document.createElement("p");
endDate.textContent = new Date(insurance.end_date).toLocaleDateString();
endDateCell.appendChild(endDate);
  
       // Create a container for the buttons
    const emptyCell = row.insertCell();
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-group");
    emptyCell.appendChild(buttonContainer);


    //TODO make those buttons work
    // Edit button
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.classList.add("btn", "btn-primary");
    buttonContainer.appendChild(edit);
    // Delete button
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.id = insurance._id;
    del.classList.add("btn", "btn-danger", "delBtn");
    del.onclick = buttonContainer.appendChild(del);
    del.setAttribute('data-clientId', clientID)
    del.setAttribute('data-insuranceId', insurance._id)
    //TODO add data attribuce for client and insurance id, and create a Click event listener

    }
  }
// Get all delete buttons with the 'delBtn' class
const deleteButtons = document.querySelectorAll('.delBtn');

// Attach a click event listener to each delete button
deleteButtons.forEach(function(deleteButton) {
  deleteButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Get the data attributes from the clicked delete button
    const clientId = this.getAttribute('data-clientId');
    const insuranceId = this.getAttribute('data-insuranceId');

    //TODO remove log
    console.log('Client ID:', clientId);
    console.log('Insurance ID:', insuranceId);
    delClientInsurance(clientId, insuranceId)
 //TODO add delete comfirmation and popup of succesful deletion 
 //ideally reload just part of the page and not the whole page
  });
});
//TODO remove log
console.log(insuranceArray)


