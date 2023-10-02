
import axios from 'axios'

import CryptoJS from "crypto-js"

import FormData from 'form-data';


async function OpenAIImage({image}:any ) {


  const decryptText = (encryptedText: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, "itsy");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

 

  console.log(image)

      const file =image;
      const formData = new FormData();
      formData.append('image', file);
  
      const options = {
        method: 'POST',
        url: 'https://microsoft-computer-vision3.p.rapidapi.com/describe',
        params: {
          language: 'en',
          maxCandidates: '1',
          'descriptionExclude[0]': 'Celebrities'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '096d7043d4msh2675ca63ad13d15p1e2935jsnacda8f927c83',
          'X-RapidAPI-Host': 'microsoft-computer-vision3.p.rapidapi.com'
        },
        data: formData
      };
  
     
        const response = await axios(options);
        console.log(response.data.description.captions[0].text)

         const apiMessages =  { role: "user", content:` what is the food items on this paragraph: " ${response.data.description.captions[0].text}"`}


          const apiRequestBody = {
              "model": "gpt-3.5-turbo",
              "messages": [
                { 
                  "role": "system",
                   "content": `You are a professional chef with 10 years of experience. Your task is to generate a list of recipes. Each recipe should be in the following format: \n\n{\n  \"name\": \"dish name\",\n  \"ingredients\": [\"ingredient1\", \"ingredient2\", ...],\n  \"cooking_steps\": [\"1. step1\", \"2. step2\", ...]\n}\n\nRemember to provide detailed and professional descriptions for each ingredient and cooking step.`,
              
                },
                {
                  "role":"user","content":` what is the food items on this paragraph: " a close up of a banana"`
                },
                { 
                  "role": "assistant", "content": `{foods:["Banana"]}`
              
                },

                {
                  "role":"user","content":` what is the food items on this paragraph: "an apple and mango in a table"`
                },
                { 
                  "role": "assistant", "content": `{foods:["apple","mango"]}`
              
                },

                {
                  "role":"user","content":` what is the food items on this paragraph: "a close up of a dog"`
                },
                { 
                  "role": "assistant", "content": `No Food found`
                  
              
                },
                {
                  "role":"user","content":` what is the food items on this paragraph: "a close up of a dog"`
                },
                { 
                  "role": "assistant", "content": `No Food found`
                  
              
                },
                apiMessages
              ]
            }
    
            const textresponse = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
              headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
              }
            });


           try {
              console.log("right")
              return JSON.parse(textresponse.data.choices[0].message.content).foods ;
           } catch (error) {
            console.log("wrong")
              return "No Food"
           }
           
      
      
      
    



        
}

export default OpenAIImage

