const {test,expect} = require('@playwright/test')

test("PUT example",  async function({request}){
    //generate token : Post call
    const authdata ={
        "username" : "admin",
        "password" : "password123"
    }
    const response = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data:authdata})
    const respjson = await response.json()
    const authtoken = respjson.token
    console.log("Token is " + authtoken)

    //Create new booking so we can pass the booking ID to next call : Post call
    const bookingdata = {
        "firstname": "Manorama",
        "lastname": "Sahoo",
        "totalprice": 300,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-04-04",
            "checkout": "2026-04-05"
        },
        "additionalneeds": "Breakfast"
    }
    const bookingresponse = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"},data:bookingdata})
    const bookingrespjson = await bookingresponse.json()
    const bookingId = bookingrespjson.bookingid
    console.log("New booking id is: " + bookingId)

    //put call : fetch token and booking id  from previous call
    const updatedBookingData = {
        "firstname": "Tara",
        "lastname": "Maa",
        "totalprice": 400,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-04-04",
            "checkout": "2026-04-06"
        },
        "additionalneeds": "Dinner"
    }
    const putresponse = await request.put("https://restful-booker.herokuapp.com/booking/"+bookingId,{headers:{"Content-Type":"application/json","Accept":"application/json","Cookie":"token="+authtoken},data:updatedBookingData})
    const updatedResponseJson = await putresponse.json()
    console.log(updatedResponseJson)
    expect(updatedResponseJson.totalprice).toBe(updatedBookingData.totalprice)
    expect(updatedResponseJson.additionalneeds).toBe(updatedBookingData.additionalneeds)

    //patch call : update only few details, not all
    const patchBookingData = {
        "totalprice" : 500,
        "additionalneeds" : "Lunch"
    }
    const patchResponse = await request.patch("https://restful-booker.herokuapp.com/booking/"+bookingId,{headers:{"Content-Type":"application/json","Accept":"application/json","Cookie":"token="+authtoken},data:patchBookingData})
    const pathResonseJson = await patchResponse.json()
    console.log("patch response is : " , pathResonseJson)
    expect(pathResonseJson.totalprice).toBe(patchBookingData.totalprice)
    expect(pathResonseJson.additionalneeds).toBe(patchBookingData.additionalneeds)
})
