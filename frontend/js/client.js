export class Client {
  constructor(first_name, last_name, age, phone_number) {
    first_name = this.first_name;
    last_name = this.last_name;
    street = this.street
    city = this.city
    age = this.age;
    phone_number = this.phone_number;
  }
}

export async function showAll() {
    try {
      let res = await axios.get("http://localhost:3000/clients");
      let data = await res.data
      return data
    } catch (err) {
      console.log(err);
    }
  }

    export async function delClient(id){
    try{
      await axios.delete("http://localhost:3000/clients/" + id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
