import ChatLayout from "../components/ChatLayout";
import Sidebar from "../sidebar/Sidebar";


function Dashboard(){


return(


<div className="dashboard">


<Sidebar />


<div className="dashboard-main">


<ChatLayout />


</div>


</div>


);


}


export default Dashboard;