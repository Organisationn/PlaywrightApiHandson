const {test,expect} =  require('@playwright/test')

test("Delete example", async function({request}){
    //get token
    const authdata=
    {
        "username" : "admin",
        "password" : "password123"
    }
    const tokenRespnse = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data:authdata})
    const tokenResponseJson = await tokenRespnse.json()
    const token = tokenResponseJson.token;
    console.log("Token is : " + token)
    console.log("***********************************************")
    //create booking
    const bookingData = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }
    const bookingResponse = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"},data:bookingData})
    const bookingRespJson = await bookingResponse.json()
    const bookingId = bookingRespJson.bookingid
    console.log("Booking id is : " + bookingId)
    console.log("***********************************************")
    //delete booking
    const deleteResponse = await request.delete("https://restful-booker.herokuapp.com/booking/"+bookingId,{headers:{"Content-Type":"application/json","Cookie":"token="+token}})
    console.log(deleteResponse.status())
    expect(deleteResponse.status()).toBe(201)
    console.log(deleteResponse.statusText())
    expect(deleteResponse.statusText()).toBe("Created")
    console.log("***********************************************")
    const getResponse = await request.get("https://restful-booker.herokuapp.com/booking/"+bookingId,{headers:{"Accept":"application/json"}})
    console.log(getResponse.status())//404
    expect(getResponse.status()).toBe(404)
    expect(getResponse.statusText()).toBe("Not Found")
    console.log(getResponse.statusText())//Not Found
})