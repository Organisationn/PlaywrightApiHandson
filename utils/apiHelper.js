class ApiHelper{
    constructor(request){
        this.request = request
    }
    async createBooking(payload){
        const response = await this.request.post(`${process.env.BASE_URL_API}/booking`,
            {
                header:{"Content-Type":"application/json"},
                data:payload
            })
        return response
    }
    async getBooking(bookingId){
        const response = await this.request.get(`${process.env.BASE_URL_API}/booking/`+bookingId)
        return response
    }
}
module.exports = ApiHelper