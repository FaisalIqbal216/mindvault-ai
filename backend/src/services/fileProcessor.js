const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");





// =================================
// FILE PROCESSOR
// TEXT + PDF + DOCX + IMAGE SUPPORT
// =================================


const processFile = async(file)=>{


try{


if(!file){

return null;

}






const fileInfo = {


name:file.originalname,


mimeType:file.mimetype,


size:file.size


};







// =================================
// PDF FILE
// =================================


if(file.mimetype === "application/pdf"){



const data = await pdfParse(file.buffer);



return {


...fileInfo,


type:"document",


content:data.text || "Unable to extract PDF text."



};



}








// =================================
// DOCX FILE
// =================================


if(

file.mimetype ===

"application/vnd.openxmlformats-officedocument.wordprocessingml.document"

){



const result = await mammoth.extractRawText({

buffer:file.buffer

});





return {


...fileInfo,


type:"document",


content:result.value || "Unable to extract DOCX text."



};



}









// =================================
// DOC FILE
// =================================


if(

file.mimetype ===

"application/msword"

){



return {


...fileInfo,


type:"document",


content:"DOC file uploaded. Text extraction requires additional parser."



};



}









// =================================
// TXT FILE
// =================================


if(file.mimetype==="text/plain"){



return {


...fileInfo,


type:"document",


content:file.buffer.toString("utf-8")



};



}









// =================================
// IMAGE FILE
// =================================


if(file.mimetype.startsWith("image/")){



return {


...fileInfo,


type:"image",


content:


"User uploaded an image. Analyze the image carefully and answer according to visible content."



};



}









// =================================
// UNKNOWN FILE
// =================================


return {


...fileInfo,


type:"unknown",


content:"Uploaded file format is not supported for text extraction."



};





}

catch(error){



console.log(

"FILE PROCESSOR ERROR:",

error.message

);




return {


name:file.originalname,


type:"unknown",


content:"Unable to process uploaded file."



};



}





};








module.exports = processFile;