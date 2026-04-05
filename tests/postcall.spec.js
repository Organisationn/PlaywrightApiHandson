const {test,expect} = require('@playwright/test')

test("Test post API with token", async function({request}){
    const authdata = {
        "username":"admin",
        "password":"password123"
    }
    const response = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data:authdata})
    // console.log(await response.json())
    // console.log(response.status())
    const respjson = await response.json()
    expect(respjson.token).not.toBeNull()
})
test("Test post API with Booking ID",async function({request}){
    const bookingData ={
        "firstname" : "Tara",
        "lastname" : "Maa",
        "totalprice" : 300,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2026-12-20",
            "checkout" : "2026-12-26"
        },
        "additionalneeds" : "Dinner"
    }
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"},data:bookingData})
    console.log(response.status())
    const respjson = await response.json()
    console.log(respjson)
    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')
    expect(respjson.bookingid).not.toBeNull()
    expect(respjson.booking.firstname).toBe(bookingData.firstname)
    expect(respjson.booking.lastname).toBe(bookingData.lastname)
    expect(respjson.booking.totalprice).toBe(bookingData.totalprice)
    expect(respjson.booking.depositpaid).toBe(bookingData.depositpaid)
    expect(respjson.booking.bookingdates.checkin).toBe(bookingData.bookingdates.checkin)
    expect(respjson.booking.bookingdates.checkout).toBe(bookingData.bookingdates.checkout)
    expect(respjson.booking.additionalneeds).toBe(bookingData.additionalneeds)
})