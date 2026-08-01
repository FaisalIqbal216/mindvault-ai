import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../context/AuthContext";

import {loginUser} from "../services/api";



function Login(){


const navigate = useNavigate();

const {login}=useAuth();


const [form,setForm]=useState({

email:"",
password:""

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

setLoading(true);



try{


const response =
await loginUser(form);



login(response);



navigate("/chat");


}

catch(err){


setError(
err.response?.data?.message ||
"Login failed"
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
Welcome Back
</h1>


<p>
Login to your Personal AI Assistant
</p>




<form onSubmit={handleSubmit}>


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
"Logging in..."
:
"Login"
}


</button>



</form>



<p className="auth-switch">

Don't have an account?

<span
onClick={()=>navigate("/register")}
>
 Create Account
</span>


</p>


</div>


</div>


)


}


export default Login;