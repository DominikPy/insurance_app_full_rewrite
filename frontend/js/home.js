async function showAll() {
  try {
    let res = await axios.get("http://localhost:3000/clients");
    let data = await res.data
    return data
  } catch (err) {
    console.log(err);
  }
}

let clientArr = await showAll();
console.log(clientArr);
console.log(clientArr[1]);
