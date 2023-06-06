export class Client {
  constructor(first_name, last_name, age, phone_number) {
    first_name = this.first_name;
    last_name = this.last_name;
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
