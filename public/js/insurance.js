export class Insurance{
    constructor(type, amount, start_date, end_date) {
        this.type = type;
        this.amount = amount;
        this.start_date = start_date;
        this.end_date = end_date;
      }
    
      async addToClient(clientId) {
        try {
          await axios.patch('http://localhost:3000/clients/add_insurance/add/' + clientId, {
            "insuranceEntry": {
              type: this.type,
              amount: this.amount,
              start_date: this.start_date,
              end_date: this.end_date,
            }
          });
          console.log('Insurance entry added to the client successfully');
        } catch (err) {
          console.error('Error adding insurance entry to the client:', err.response ? err.response.data : err.message);
        }
      }

      async patchInsurance(clientId, insuraceId){
      try {
        await axios.patch("http://localhost:3000/clients/" + clientId + "/insurance/patch/" + insuraceId, {
          type: this.type,
          amount: this.amount,
          start_date: this.start_date,
          end_date:  this.end_date,
        });
      } catch (err) {
        console.log(err);
      }
    }
    }      