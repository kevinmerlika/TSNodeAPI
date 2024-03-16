import { Request, Response } from 'express';

import { webConfigService } from "../services/webConfigService";

export class webConfigController {

    public constructor(public webConfigService: webConfigService) {
       console.log("webConfigService service created");
       
   }

   async getWebConfigs(req: Request, res: Response): Promise<void> {

    console.log("ok not");
    
       const { id } = req.params;
       console.log("ok till now");
       console.log(id);
       
       
       try {
           console.log(id);
           
           
           const found = await this.webConfigService.getWebConfigurations(id);
           if (found) {
               res.status(200).json(found);
           } else {
               res.status(404).json({ message: 'No data' });
           }
       } catch (error: any) { 
        console.log("sth went wrong");
        
           console.error('Error:', error);
           res.status(500).json({ error: error.message });
       }
   }


   
}