//Import playwright module
const { test, expect } = require('@playwright/test')
const payload=require("../testdata/post_api_dynamic_json.json")
const {stringFormat}=require("../utils/common.js")

test('verify get api response with dynamic json', async ({ request }) => {
    const dynamicpayload=stringFormat(JSON.stringify(payload),"sri","p","lunchcoupons")
    const postAPIResponse = await request.post(`/booking`, {
        data:JSON.parse(dynamicpayload)      
    })
    expect(postAPIResponse.status()).toBe(200)
    expect(postAPIResponse.ok()).toBeTruthy()
    const postAPIResponseBody = await postAPIResponse.json()
    console.log(postAPIResponseBody)
    const bid=postAPIResponseBody.bookingid
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "sri")
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "p")
    expect(postAPIResponseBody.booking).toHaveProperty("additionalneeds", "lunchcoupons")
    console.log("***********GET API Response************")
    console.log("bookingid:"+ bid)
    const getAPIResponse=await request.get(`/booking/${bid}`)        
    console.log(await getAPIResponse.json()) 
    expect(getAPIResponse.status()).toBe(200)  
})