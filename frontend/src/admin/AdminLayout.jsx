import {
useState
} from "react";


import {
useAuth
} from "../context/AuthContext";


import AdminSidebar from "./AdminSidebar";

import AdminOverview from "./AdminOverview";

import AdminUsers from "./AdminUsers";

import AdminUserChats from "./AdminUserChats";

import AdminDocuments from "./AdminDocuments";

import AdminSettings from "./AdminSettings";





function AdminLayout(){



const {user}=useAuth();



const [activePage,setActivePage]=useState(
"dashboard"
);



const [selectedUser,setSelectedUser]=useState(null);






// ===============================
// OPEN USER CHAT VIEW
// ===============================

const openUserChats=(selected)=>{


setSelectedUser(selected);


setActivePage(
"userChats"
);


};







// ===============================
// BACK TO USERS
// ===============================


const backToUsers=()=>{


setSelectedUser(null);


setActivePage(
"users"
);


};









// ===============================
// PAGE ROUTER
// ===============================


const renderPage=()=>{


switch(activePage){



case "users":


return(

<AdminUsers

onViewChats={openUserChats}

/>

);







case "userChats":



if(!selectedUser){


return(

<AdminUsers

onViewChats={openUserChats}

/>

);


}



return(


<AdminUserChats


userId={selectedUser.id}


userName={selectedUser.name}


onBack={backToUsers}


/>


);








case "documents":



return(

<AdminDocuments/>

);









case "settings":



return(

<AdminSettings/>

);









case "dashboard":



default:



return(

<AdminOverview/>

);



}



};









return(



<div className="admin-layout">







<header

className="admin-topbar"

>


<div

className="admin-header-content"

>


<h1>

Admin Portal

</h1>



<p>

Welcome back, {user?.name || "Administrator"}

</p>


</div>




</header>









<div

className="admin-body"

>







<aside

className="admin-sidebar-wrapper"

>


<AdminSidebar



activePage={activePage}



setActivePage={(page)=>{


setSelectedUser(null);


setActivePage(page);


}}


/>


</aside>









<main

className="admin-main"

>


{renderPage()}



</main>







</div>






</div>



);



}



export default AdminLayout;