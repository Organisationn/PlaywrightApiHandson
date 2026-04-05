const {test,expect} = require('@playwright/test')

test("check api health", async function({request}){
    test.setTimeout(0)
    while (true) {
        const startTime = Date.now()
        const response = await request.get("https://restful-booker.herokuapp.com/ping")
        const endTime = Date.now()
        const duration = endTime-startTime
        if(duration>2000)
        {
            throw new Error(`API response is slow ${duration}`)
        }
        else
        {
        console.log(`Total time taken to return the response : ${duration}`)
        }
        const status = response.status()
        console.log(`status code from API is : ${status}`)
        expect(status).toBe(201)
    }
} )