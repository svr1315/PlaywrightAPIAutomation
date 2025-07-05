const {test,expect}=require('@playwright/test')
const payload=require("../testdata/post_api_request.json")
const authentication =require('../testdata/post_api_auth_request.json')
test('delete api validation', async({request})=>{
    //Step1: POST Request to generate booking id
    const postAPIResponse = await request.post(`/booking`, {
        data:payload        
    })
    expect(postAPIResponse.status()).toBe(200)
    expect(postAPIResponse.ok()).toBeTruthy()
    const postAPIResponseBody = await postAPIResponse.json()
    console.log(postAPIResponseBody)
    const bid=postAPIResponseBody.bookingid
    console.log("Booking ID:", bid)
    //Step2-Generate Token
    const postAuthResponse=await request.post(`/auth`,{data:authentication})
     expect(postAuthResponse.status()).toBe(200)
    expect(postAuthResponse.ok()).toBeTruthy()
    const postAuthResponseBody = await postAuthResponse.json()
    console.log("**************TOKEN API Response*************")
    console.log(postAuthResponseBody)
    const responseToken=postAuthResponseBody.token;
    console.log("Token:", responseToken)
    //2. DELETE API
    const deleteResponse=await request.delete(`/booking/${bid}`,
        {
            headers:
            {
               "Content-Type":"application/json",
	           "Cookie":`token=${responseToken}` 
            }         
        })
        expect(deleteResponse.status()).toBe(201) 
        expect(deleteResponse.statusText()).toBe("Created")         
              
    })