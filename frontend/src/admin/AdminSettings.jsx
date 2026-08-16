import {
useState
} from "react";


import {
useAuth
} from "../context/AuthContext";


import {
changePassword
} from "../services/adminService";


import {
updateProfile
} from "../services/api";







function AdminSettings(){






const {
user,
updateUser
}=useAuth();






// ===============================
// PROFILE
// ===============================


const [name,setName]=useState(

user?.name || ""

);



const [oldName,setOldName]=useState(

user?.name || ""

);





const [message,setMessage]=useState("");









// ===============================
// PASSWORD
// ===============================


const [
currentPassword,
setCurrentPassword
]=useState("");




const [
newPassword,
setNewPassword
]=useState("");




const [
confirmPassword,
setConfirmPassword
]=useState("");




const [
passwordMessage,
setPasswordMessage
]=useState("");




const [
passwordLoading,
setPasswordLoading
]=useState(false);









// ===============================
// THEME
// ===============================


const [theme,setTheme]=useState(

localStorage.getItem("theme") || "dark"

);











// ===============================
// TEMP MESSAGE
// ===============================


const showMessage=(setter,text)=>{


setter(text);


setTimeout(()=>{


setter("");


},3000);



};









// ===============================
// SAVE PROFILE
// ===============================


const saveProfile=async()=>{


try{


const updatedUser = await updateProfile({

name

});




updateUser(updatedUser);




setOldName(name);



showMessage(

setMessage,

"Profile updated successfully"

);



}


catch(error){


showMessage(

setMessage,

"Profile update failed"

);


}



};











// ===============================
// CANCEL PROFILE
// ===============================


const cancelChanges=()=>{


setName(oldName);


setMessage("");



};











// ===============================
// CHANGE PASSWORD
// ===============================


const updatePassword=async()=>{



setPasswordMessage("");






if(
!currentPassword ||
!newPassword ||
!confirmPassword
){


showMessage(

setPasswordMessage,

"Please fill all password fields"

);


return;


}







if(newPassword !== confirmPassword){


showMessage(

setPasswordMessage,

"New passwords do not match"

);


return;


}







try{


setPasswordLoading(true);




const response =
await changePassword({

currentPassword,

newPassword

});






showMessage(

setPasswordMessage,

response.message

);





setCurrentPassword("");

setNewPassword("");

setConfirmPassword("");



}



catch(error){



showMessage(

setPasswordMessage,

error.response?.data?.message ||

"Password update failed"

);



}



finally{


setPasswordLoading(false);


}



};













// ===============================
// THEME CHANGE
// ===============================


const changeTheme=(mode)=>{


localStorage.setItem(

"theme",

mode

);




setTheme(mode);




document.body.classList.remove(

"dark",

"light"

);




document.body.classList.add(

mode

);



};













return(



<section

className="admin-settings"

aria-label="Administrator settings"

>







<header className="admin-section-header">


<h2>

Account Settings

</h2>




<p>

Manage administrator profile, security and appearance preferences.

</p>



</header>









{/* PROFILE */}

<div className="settings-card">



<h3>

Profile Information

</h3>








<div className="form-group">


<label htmlFor="admin-name">

Full Name

</label>





<input


id="admin-name"


value={name}


onChange={(e)=>


setName(e.target.value)


}


/>



</div>








<div className="settings-actions">


<button

className="secondary-btn"

onClick={cancelChanges}

>

Cancel

</button>








<button

className="primary-btn"

onClick={saveProfile}

>

Save Changes

</button>






</div>







{

message &&

<p className="success-message">

{message}

</p>

}






</div>









{/* PASSWORD */}

<div className="settings-card">



<h3>

Change Password

</h3>








<div className="form-group">


<label>

Current Password

</label>




<input


type="password"


value={currentPassword}


placeholder="Enter current password"


onChange={(e)=>


setCurrentPassword(e.target.value)


}


/>



</div>









<div className="form-group">


<label>

New Password

</label>





<input


type="password"


value={newPassword}


placeholder="Enter new password"


onChange={(e)=>


setNewPassword(e.target.value)


}


/>



</div>









<div className="form-group">


<label>

Confirm Password

</label>





<input


type="password"


value={confirmPassword}


placeholder="Confirm new password"


onChange={(e)=>


setConfirmPassword(e.target.value)


}


/>



</div>








<button

className="primary-btn"


onClick={updatePassword}


disabled={passwordLoading}

>


{

passwordLoading

?

"Updating..."

:

"Update Password"

}



</button>









{

passwordMessage &&

<p className="success-message">

{passwordMessage}

</p>

}






</div>









{/* APPEARANCE */}

<div className="settings-card">



<h3>

Appearance

</h3>








<div className="theme-buttons">






<button


className={

theme==="dark"

?

"active"

:

""

}


onClick={()=>changeTheme("dark")}

>


Dark Mode


</button>









<button


className={

theme==="light"

?

"active"

:

""

}


onClick={()=>changeTheme("light")}

>


Light Mode


</button>






</div>






</div>









</section>



);



}




export default AdminSettings;