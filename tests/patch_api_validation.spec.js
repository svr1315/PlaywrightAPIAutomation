const {test, expect}=require('@playwright/test')
const authentication =require('../testdata/post_api_auth_request.json')
const payload=require("../testdata/post_api_request.json")
const patchreqpayload=require('../testdata/patch_api_request_json.json')

test('patch api validation', async({request})=>{
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
    
    //PATCH request
    const patchResponse=await request.patch(`/booking/${bid}`,
        {
            headers:
            {
               "Content-Type":"application/json",
	           "Cookie":`token=${responseToken}` 
            },
            data:patchreqpayload            
        })
    const patchResponseBody=await patchResponse.json()
    console.log("**************PATCH API Response*************")
    console.log(patchResponseBody)
    //Step 4: GET API Response
    const getAPIResponse=await request.get(`/booking/${bid}`)
    console.log("**************GET API Response*************")
    console.log(await getAPIResponse.json()) 
    expect(getAPIResponse.status()).toBe(200)  
        

})