import { RequestError, ServerError } from '../err/errors.js'
import * as HttpUtil from '../utils/request.js'



/*
  CLIENT VTEX ORDER IMPLEMENTATION  
*/

export  class VtexOrder {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey // process.env.APP_KEY
    this.appToken // process.env.APP_TOKEN
    this.accountName // process.env.ACCOUNT_NAME || any string 
    this.environment // process.env.ENVIRONMENT  || any string  

  }

  async fetchGetById ( orderId ) {
    try{
      const response = await this.request.get (
        `https://${this.accountName}.${this.environment}.com/api/oms/pvt/orders/${ orderId }`,
        {
          headers: 
          {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": this.appKey,
            "X-VTEX-API-AppToken": this.appToken
          }
        }
      )

      return response.data  
    } catch (error) {
      const err = this.request.isRequestError(error)
      //console.log( error )
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }
}



