import {
useEffect,
useState
} from "react";


import {
getAdminUsers
} from "../services/adminService";



function AdminUsers({

onViewChats

}){


const [users,setUsers]=useState([]);

const [loading,setLoading]=useState(true);



useEffect(()=>{


const loadUsers=async()=>{


try{


const data =
await getAdminUsers();


setUsers(data);


}

catch(error){


console.log(
"ADMIN USERS ERROR",
error
);


}


finally{


setLoading(false);


}



};


loadUsers();


},[]);






return(


<section
className="admin-users"
>



<header className="page-header">


<h2>
Users Management
</h2>


<p>
Manage registered users and monitor chat activity.
</p>


</header>





{
loading ?


<div className="users-loading-card">

Loading user records...

</div>



:

users.length===0 ?


<div className="empty-state">

No users registered yet.

</div>



:

<div className="table-wrapper">


<table>


<thead>

<tr>

<th>
Name
</th>


<th>
Email
</th>


<th>
Role
</th>


<th>
Total Chats
</th>


<th>
Created
</th>


<th>
Action
</th>


</tr>

</thead>





<tbody>


{
users.map(user=>(


<tr key={user.id}>


<td>
{user.name}
</td>



<td>
{user.email}
</td>



<td>

<span className="role-badge">

{user.role}

</span>

</td>



<td>

<strong>
{user.totalChats}
</strong>

</td>



<td>

{
new Date(
user.createdAt
)
.toLocaleDateString()

}

</td>



<td>


<button

className="table-action-btn"

onClick={()=>onViewChats(user)}

aria-label={`View chats of ${user.name}`}

>

View Chats

</button>



</td>


</tr>



))

}


</tbody>



</table>


</div>


}



</section>


);


}


export default AdminUsers;