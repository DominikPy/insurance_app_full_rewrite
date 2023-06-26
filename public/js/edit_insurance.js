import { Insurance } from "./insurance.js";

const updateBtn = document.getElementById("update");
updateBtn.addEventListener("click", () => {
  click();
})

function click(){
const clientID = updateBtn.getAttribute("data-clientid");
const insuranceID = updateBtn.getAttribute("data-insuranceid");
const type = document.getElementById("select_type").value
const amount = document.getElementById("amount").value
const start_date = document.getElementById("start_date").value
const end_date = document.getElementById("end_date").value
const updatedInsurace = new Insurance(
    type,
    amount,
    start_date,
    end_date
)
//TODO remove log
console.log(updatedInsurace)
console.log(insuranceID)
updatedInsurace.patchInsurance(clientID, insuranceID)
}