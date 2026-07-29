const Groq = require("groq-sdk");


const groq = new Groq({

apiKey:process.env.GROQ_API_KEY

});




const getAIResponse = async(messages)=>{


try{


const response =
await groq.chat.completions.create({


model:"llama-3.1-8b-instant",



messages:[


{

role:"system",

content:`

You are a professional AI assistant.

Rules:

- Give accurate information.
- Never invent facts.
- If unsure, explain uncertainty.
- Use headings.
- Use bullet points.
- Explain technical topics step by step.
- Keep answers clear and professional.
- Use Markdown formatting.

`

},


...messages



],


temperature:0.4


});



return response.choices[0].message.content;



}

catch(error){


console.log(
"AI ERROR:",
error.message
);



return "Unable to generate response.";


}


};




module.exports=getAIResponse;