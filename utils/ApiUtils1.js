class ApiUtils1
{
    constructor(apiContext,loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

    async getToken()
    {
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            })
        
            const loginJsonResponse = await loginResponse.json();
            const token = loginJsonResponse.token;
            console.log(token);
            return token;
    }
    async createOrder(orderPayload)
    {
        let response={};
        response.token=await this.getToken();
        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{
                'Authorization':response.token,
                'Content-Type':'application/json'
            },
        })
        const orderResponseJson=await orderResponse.json();
        console.log(orderResponseJson);
        const orderId=await orderResponseJson.orders[0];
        response.orderId=orderId;
        return response;

    }
}

module.exports={ApiUtils1};