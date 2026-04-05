const{test,expect} = require('@playwright/test')
const readJson = require('../utils/fileHelper')
const bookingDataList = readJson('../testdata/bookings.json')
const ApiHelper = require('../utils/apiHelper')

for(const bookingData of bookingDataList){
    test(`POST : ${bookingData.testcase}`,async function({request}){
        const api  = new ApiHelper(request)
        //create booking
        const postresponse = await api.createBooking(bookingData)
        const respjson = await postresponse.json()
        console.log("response is : ", respjson)
        //assertions
        expect(postresponse.status()).toBe(200)
        expect(postresponse.statusText()).toBe('OK')
        const bookingId = respjson.bookingid;
        expect(bookingId).not.toBeNull()
        expect(respjson.booking.firstname).toBe(bookingData.firstname)
        expect(respjson.booking.lastname).toBe(bookingData.lastname)
        expect(respjson.booking.totalprice).toBe(bookingData.totalprice)
        expect(respjson.booking.depositpaid).toBe(bookingData.depositpaid)
        expect(respjson.booking.additionalneeds).toBe(bookingData.additionalneeds)
        console.log(`Booking done with booking id: ${bookingId} and for: ${bookingData.firstname} ${bookingData.lastname}`)
        //get booking
        const getResponse = await api.getBooking(bookingId)
        const getrespjson= await getResponse.json()
        console.log("getrespjson: ",getrespjson)
        expect(bookingId).not.toBeNull()
        expect(getrespjson.firstname).toBe(bookingData.firstname)
        expect(getrespjson.lastname).toBe(bookingData.lastname)
        expect(getrespjson.totalprice).toBe(bookingData.totalprice)
        expect(getrespjson.depositpaid).toBe(bookingData.depositpaid)
        expect(getrespjson.additionalneeds).toBe(bookingData.additionalneeds)
    })
}
