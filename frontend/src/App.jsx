import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Login from "./pages/Login";

import Register from "./pages/Register";

import ChatLayout from "./components/ChatLayout";

import AdminLayout from "./admin/AdminLayout";


import ProtectedRoute from "./routes/ProtectedRoute";

import AdminRoute from "./routes/AdminRoute";


import {
AuthProvider
} from "./context/AuthContext";





function App(){



return(



<AuthProvider>


<BrowserRouter>


<Routes>



<Route

path="/login"

element={<Login/>}

/>




<Route

path="/register"

element={<Register/>}

/>






<Route

path="/chat"

element={

<ProtectedRoute>

<ChatLayout/>

</ProtectedRoute>

}

/>







<Route

path="/admin"

element={

<AdminRoute>

<AdminLayout/>

</AdminRoute>

}

/>







<Route

path="*"

element={<Login/>}

/>




</Routes>


</BrowserRouter>


</AuthProvider>



);


}



export default App;