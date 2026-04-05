const{test,expect} = require('@playwright/test')
const fs =require('fs')

test("create new booking with post call", async function({request}){
    const file = fs.readFileSync('./testdata/booking.json')
    const bookingdata = JSON.parse(file)
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"},data:bookingdata})
    const respjson = await response.json()
    console.log(respjson)
    expect(response.status()).toBe(200)
    console.log(respjson.bookingid)
    expect(respjson.bookingid).not.toBeNull()
    expect(respjson.booking.firstname).toBe(bookingdata.firstname)
})