const roleMiddleware = (role)=>{


return(req,res,next)=>{


try{


if(!req.user){


return res.status(401).json({

message:"Unauthorized"

});


}




if(req.user.role !== role){


return res.status(403).json({

message:"Access denied"

});


}




next();



}



catch(error){



console.log(

"ROLE ERROR:",

error.message

);



return res.status(500).json({

message:"Role verification failed"

});


}



};


};





module.exports = roleMiddleware;