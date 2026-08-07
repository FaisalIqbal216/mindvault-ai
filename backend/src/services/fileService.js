const pdfParse = require("pdf-parse");

const mammoth = require("mammoth");




// =================================
// PROCESS UPLOADED FILE
// =================================


const processFile = async(file)=>{


try{


if(!file){


return null;


}





const fileInfo = {


name:file.originalname,


type:file.mimetype,


size:file.size



};






let extractedText = "";









// =================================
// PDF FILE
// =================================


if(file.mimetype === "application/pdf"){



const pdfData = await pdfParse(

file.buffer

);



extractedText = pdfData.text;



}









// =================================
// DOCX FILE
// =================================


else if(

file.mimetype ===

"application/vnd.openxmlformats-officedocument.wordprocessingml.document"

){



const result = await mammoth.extractRawText({


buffer:file.buffer


});



extractedText = result.value;



}









// =================================
// TEXT FILE
// =================================


else if(

file.mimetype === "text/plain"

){



extractedText =

file.buffer.toString("utf-8");



}









// =================================
// IMAGE FILE
// =================================


else if(

file.mimetype.startsWith("image/")

){



extractedText =

`

User uploaded an image file.

File name:

${file.originalname}


Image type:

${file.mimetype}


The image should be analyzed using vision capability.

`;



}









// =================================
// UNSUPPORTED FILE
// =================================


else{


extractedText =

`

User uploaded a file.

File name:

${file.originalname}


File type:

${file.mimetype}


No text extraction available.

`;



}









return{


fileInfo,


extractedText



};







}

catch(error){



console.log(

"FILE PROCESS ERROR:",

error.message

);



return{


fileInfo:{


name:file.originalname,

type:file.mimetype,

size:file.size


},


extractedText:

"Unable to process uploaded file."

};



}





};









module.exports = processFile;