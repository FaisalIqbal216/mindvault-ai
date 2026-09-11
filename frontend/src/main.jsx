import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";



// Existing chatbot styling
import "./index.css";

import "./styles/modal.css";

import "./styles/light-theme.css";
import "./styles/chat.css";




import "./styles/admin.css";



import "./styles/document.css";

// Main app styling
import "./styles/app.css";


// Login/Register styling
import "./styles/auth.css";


ReactDOM
.createRoot(document.getElementById("root"))
.render(
    
    <React.StrictMode>
        <App />
    </React.StrictMode>

);