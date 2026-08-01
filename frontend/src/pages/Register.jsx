import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {registerUser} from "../services/api";
import {useAuth} from "../context/AuthContext";



function Register(){


const navigate = useNavigate();

const {login}=useAuth();



const [form,setForm]=useState({

name:"",
email:"",
password:"",
confirmPassword:""

});


const [error,setError]=useState("");

const [loading,setLoading]=useState(false);





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{


e.preventDefault();


setError("");



if(form.password !== form.confirmPassword){

setError("Passwords do not match");

return;

}



setLoading(true);



try{


const response =
await registerUser({

name:form.name,

email:form.email,

password:form.password

});



login(response);



navigate("/chat");



}
catch(err){


setError(

err.response?.data?.message ||

"Registration failed"

);


}



setLoading(false);


};





return(


<div className="auth-page">


<div className="auth-card">


<div className="auth-logo">
🤖
</div>



<h1>
Create Account
</h1>


<p>
Start your personal AI journey
</p>




<form onSubmit={handleSubmit}>



<div className="auth-input">

<input

name="name"

required

value={form.name}

onChange={handleChange}

/>

<label>
Full Name
</label>

</div>





<div className="auth-input">

<input

name="email"

type="email"

required

value={form.email}

onChange={handleChange}

/>

<label>
Email Address
</label>

</div>





<div className="auth-input">

<input

name="password"

type="password"

required

value={form.password}

onChange={handleChange}

/>

<label>
Password
</label>

</div>





<div className="auth-input">

<input

name="confirmPassword"

type="password"

required

value={form.confirmPassword}

onChange={handleChange}

/>

<label>
Confirm Password
</label>

</div>





{
error &&

<div className="auth-error">

{error}

</div>

}





<button disabled={loading}>

{

loading

?

"Creating Account..."

:

"Create Account"

}


</button>




</form>





<p className="auth-switch">

Already have an account?


<span onClick={()=>navigate("/login")}>

Login

</span>


</p>



</div>


</div>


)


}


export default Register;