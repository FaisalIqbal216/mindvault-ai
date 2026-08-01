import {

createContext,

useState,

useContext,

useEffect

} from "react";





const AuthContext = createContext();









export function AuthProvider({children}){





const [user,setUser] = useState(

JSON.parse(

localStorage.getItem("user")

) || null

);









// ===============================
// THEME STATE
// ===============================


const [theme,setTheme]=useState(

localStorage.getItem("theme") || "dark"

);











// ===============================
// APPLY THEME
// ===============================


useEffect(()=>{


document.body.classList.remove(

"dark",

"light"

);



document.body.classList.add(theme);



},[theme]);











// ===============================
// LOGIN
// ===============================


const login = (data)=>{


localStorage.setItem(

"token",

data.token

);



localStorage.setItem(

"user",

JSON.stringify(data.user)

);





setUser(data.user);



};












// ===============================
// UPDATE USER PROFILE
// ===============================


const updateUser=(updatedUser)=>{


const newUser={

...user,

...updatedUser

};





localStorage.setItem(

"user",

JSON.stringify(newUser)

);





setUser(newUser);



};












// ===============================
// CHANGE THEME
// ===============================


const changeTheme=(mode)=>{


localStorage.setItem(

"theme",

mode

);



setTheme(mode);



};











// ===============================
// LOGOUT
// ===============================


const logout = ()=>{


localStorage.removeItem(

"token"

);



localStorage.removeItem(

"user"

);



setUser(null);



window.location.href="/login";



};













return(


<AuthContext.Provider


value={{


user,


login,


logout,


updateUser,


theme,


changeTheme


}}


>


{children}


</AuthContext.Provider>



);



}









export function useAuth(){


return useContext(AuthContext);



}