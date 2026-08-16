import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function AdminRoute({children}){


const {user}=useAuth();



if(!user){

return <Navigate to="/login" replace />;

}




if(user.role !== "admin"){


return <Navigate to="/chat" replace />;


}





return children;


}



export default AdminRoute;