import { MissingParamError } from "../err/errors.js"
import { ServicesCombinations } from "../services/combinations.js"

export class ControllerGetCombinationsById {

  static async handle ( request, response ) {
    
    try {
      const combinations = new ServicesCombinations()

      const fields = ['ProductId']

      for (let field of fields ) { 
        if( !request.body[field] ) 
          return response.status(400).json(new MissingParamError())
        
      }  
  
      const { ProductId } = request.body
            
      const productsCombinations = await combinations.getById(ProductId)
      return response.status(200).json(productsCombinations)
  
    } catch (error) {
      console.log(error)
      response.status(500).send( { message: error.message })
    }

  }

}


