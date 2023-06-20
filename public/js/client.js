export class Client {
  constructor(
    first_name,
    last_name,
    age,
    phone_number,
    street,
    city,
    insurance
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.phone_number = phone_number;
    this.street = street;
    this.city = city;
    insurance = [];
  }

  async saveToDB() {
    try {
      await axios.post("http://localhost:3000/clients", {
        first_name: this.first_name,
        last_name: this.last_name,
        age: this.age,
        phone_number: this.phone_number,
        street: this.street,
        city: this.city,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async postToDB(id) {
    try {
      await axios.patch("http://localhost:3000/clients/" + id, {
        first_name: this.first_name,
        last_name: this.last_name,
        age: this.age,
        phone_number: this.phone_number,
        street: this.street,
        city: this.city,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export async function showAll() {
  try {
    let res = await axios.get("http://localhost:3000/clients");
    let data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function delClient(id) {
  try {
    await axios.delete("http://localhost:3000/clients/" + id);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
