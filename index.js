var fetch = require('node-fetch')
const mysql = require('mysql')
var crontab = require('node-crontab')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: '',
  password: '',
  database: '',
})

const func = (price) => {
  pool.query(
    `insert into bitcoin (price, time) values ('${price}', now())`,
    function (err) {
      if (err) {
        throw err
      }
    }
  )
}

var jobId = crontab.scheduleJob('*/1 * * * *', function () {
  fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((res) => res.json())
    .then((data) => {
      func(data.bpi.USD.rate_float)
      console.log(data.bpi.USD.rate_float)
    })
})
