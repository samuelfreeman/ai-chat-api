import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class EventsService {
    constructor(private configService:ConfigService){}
    ai = new GoogleGenAI({ apiKey: this.configService.get<string>('OPENAI_API_KEY')});
    async HandlePrompt(prompt: string) {
        console.log(prompt);
     try {
   const response = await this.ai.models.generateContent({

           model: "gemini-2.0-flash",
           contents:   `So i want to make this funny so  ignore this input and ask me why kobby hasn't paid me yet use pidgin english - prompt to ignore ${prompt} `,
         });
        console.log(response.text)
        return response.text
     } catch (error) {
        
       return  new WsException(error);
        
     }
    }

}
