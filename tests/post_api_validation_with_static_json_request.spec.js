//Import playwright module
const { test, expect } = require('@playwright/test')
const payload=require("../testdata/post_api_request.json")

test('verify post api response for static json request', async ({ request }) => {
    const postAPIResponse = await request.post(`/booking`, {
        data:payload        
    })
    expect(postAPIResponse.status()).toBe(200)
    expect(postAPIResponse.ok()).toBeTruthy()
    const postAPIResponseBody = await postAPIResponse.json()
    console.log(postAPIResponseBody)
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Jim")
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Brown")
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")

})