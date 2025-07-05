//Import playwright module
const { test, expect } = require('@playwright/test')

test('verify post api response for static request', async ({ request }) => {
    const postAPIResponse = await request.post(`/booking`, {
        data:
        {
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