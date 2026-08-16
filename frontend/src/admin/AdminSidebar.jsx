import {
useAuth
} from "../context/AuthContext";



function AdminSidebar({

activePage,

setActivePage

}){


const {logout}=useAuth();




const menu=[


{
id:"dashboard",
label:"Dashboard",
icon:"📊"
},


{
id:"users",
label:"Users",
icon:"👥"
},


{
id:"documents",
label:"Documents",
icon:"📄"
},


{
id:"settings",
label:"Settings",
icon:"⚙️"
}


];





return(


<nav

className="admin-sidebar"

aria-label="Admin navigation"

>


<div className="admin-brand">

🤖

<span>
AI Admin
</span>

</div>





<ul>


{

menu.map(item=>(


<li key={item.id}>


<button

className={

activePage===item.id

?

"active"

:

""

}


onClick={()=>setActivePage(item.id)}

>


<span>
{item.icon}
</span>


{item.label}


</button>



</li>


))


}



</ul>





<button

className="admin-logout"

onClick={logout}

>


Logout


</button>





</nav>


);


}



export default AdminSidebar;