//Import playwright module
const { test, expect } = require('@playwright/test')
const payload=require("../testdata/post_api_dynamic_json.json")
const {stringFormat}=require("../utils/common.js")

test('verify post api response for static json request', async ({ request }) => {
    const dynamicpayload=stringFormat(JSON.stringify(payload),"sri","s","lunchcoupons")
    const postAPIResponse = await request.post(`/booking`, {
        data:JSON.parse(dynamicpayload)      
    })
    expect(postAPIResponse.status()).toBe(200)
    expect(postAPIResponse.ok()).toBeTruthy()
    const postAPIResponseBody = await postAPIResponse.json()
    console.log(postAPIResponseBody)
    expect(postAPIResponseBody.booking).toHaveProperty("firstname", "sri")
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", "s")
    expect(postAPIResponseBody.booking).toHaveProperty("additionalneeds", "lunchcoupons")
    
})