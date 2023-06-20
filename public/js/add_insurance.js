import { Insurance } from "./insurance.js";

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const clientId = submitBtn.getAttribute("data-clientid")
    const type = document.getElementById('select_type').value
    const amount = document.getElementById('amount').value
    const start_date = document.getElementById('start_date').value
    const end_date = document.getElementById('end_date').value

    const newInsurance = new Insurance(type, amount, start_date, end_date)
    //TODO remove log
    console.log(newInsurance)

    newInsurance.addToClient(clientId)
})

