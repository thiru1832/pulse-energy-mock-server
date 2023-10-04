const cron = require('node-cron');
const fs = require('fs')
const csv = require('csv-parser')
const axios = require('axios')

function readCsv () {

    const result = [];

    fs.createReadStream("./mock_server/meter_values_dump_10k1.csv")
    .pipe(csv())
    .on("data", async(data) => {
        // result.push(data);
        let obj = JSON.stringify(data);
        obj=JSON.parse(obj);
        // console.log(obj)
        result.push(obj)

    })
    .on("end", ()=> {

        let max = result.length;
        let i =0;

        const interval = setInterval(()=>{
            if(i<max){
                try {
                    axios
                      .post( 'http://localhost:5000/createRecord', {
                        data:result[i],
                      })
                      .then((res) => {
                        console.log("record added succussfully");
                      });
                  } catch (err) {

                    console.error("error in sending data");
                  }
                    
                console.log(result[i])
                i++;
            }  
            else{
                clearInterval(interval);
            }        
        },6000)
    })

    
}

async function sendRequests(){

     await readCsv()
}

module.exports = sendRequests;