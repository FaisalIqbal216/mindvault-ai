import {
useEffect,
useState
} from "react";


import {
getAdminStats
} from "../services/adminService";




function AdminOverview(){



const [stats,setStats]=useState({

totalUsers:0,

totalChats:0,

totalDocuments:0

});



const [loading,setLoading]=useState(true);





useEffect(()=>{


const loadStats=async()=>{


try{


const data =
await getAdminStats();


setStats(data);



}


catch(error){


console.log(
"ADMIN STATS ERROR",
error
);


}


finally{


setLoading(false);


}



};



loadStats();



},[]);







return(



<section

className="admin-overview"

aria-labelledby="dashboard-title"

>





<header className="admin-section-header">


<h2 id="dashboard-title">

Dashboard Overview

</h2>



<p>

System summary, user activity and knowledge base information.

</p>



</header>









<div

className="admin-cards"

role="region"

aria-label="System statistics"

>





<article className="stat-card">


<header>

<h3>

Total Users

</h3>

</header>



<strong>

{

loading

?

"--"

:

stats.totalUsers

}

</strong>



<p>

Registered accounts

</p>


</article>









<article className="stat-card">


<header>

<h3>

Total Chats

</h3>

</header>



<strong>

{

loading

?

"--"

:

stats.totalChats

}

</strong>



<p>

Total conversations created

</p>


</article>









<article className="stat-card">


<header>

<h3>

Documents

</h3>

</header>



<strong>

{

loading

?

"--"

:

stats.totalDocuments

}

</strong>



<p>

Knowledge base files

</p>


</article>






</div>









<section

className="admin-dashboard-panel"

>





<h3>

System Activity

</h3>



<p>

More analytics, recent activity and AI usage statistics will appear here.

</p>




</section>









</section>



);


}



export default AdminOverview;