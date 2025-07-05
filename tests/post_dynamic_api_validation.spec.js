const {test,expect}=require('@playwright/test')
//const restAPIPayload=require('../testdata/post_api_request.json')
const {faker}=require('@faker-js/faker')
const {DateTime}=require('luxon')


test('verify api response validation for dynamic request', async ({request})=>{
    const firstName=faker.person.firstName()
    const lastName=faker.person.lastName()
    const totalPrice=faker.number.int(100)
    const checkInDate=DateTime.now().toFormat('yyyy-MM-dd')
    const checkOutDate=DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')

    const apiresponse=await request.post(`/booking`, 
        {
            data: {
                
    "firstname" : firstName,
    "lastname" : lastName,
    "totalprice" : totalPrice,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : checkInDate,
        "checkout" : checkOutDate
    },
    "additionalneeds" : "Breakfast"
}
})       

    const apiresponseJSON=await apiresponse.json()
    console.log(apiresponseJSON)
    expect(apiresponse.status()).toBe(200)
    expect(apiresponseJSON.booking).toHaveProperty("firstname", firstName)
    expect(apiresponseJSON.booking).toHaveProperty("lastname", lastName)
    expect(apiresponseJSON.booking).toHaveProperty("totalprice", totalPrice)
    expect(apiresponseJSON.booking.bookingdates).toHaveProperty("checkin",checkInDate)
    expect(apiresponseJSON.booking.bookingdates).toHaveProperty("checkout",checkOutDate)
})