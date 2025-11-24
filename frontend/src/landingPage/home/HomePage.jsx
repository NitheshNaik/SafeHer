import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Navbar from '../Navbar';
import Button from "./Button";
import Cards from "./Cards";
import Chatbot from "../chatBot/Chatbot";

const Home = () => {
    const navigate = useNavigate();
    // 1. Add loading state to prevent content flash
    const [isLoading, setIsLoading] = useState(true); 
    const [username, setUsername] = useState("");
    
    // Note: Since the token is httpOnly, we don't need useCookies here
    // for verification, only the server needs to read the cookie.
    
    useEffect(() => {
        const verifyCookie = async () => {
            try {
                // 2. The *only* way to verify an httpOnly cookie is to ask the server.
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    { withCredentials: true } // This sends the secure httpOnly cookie to the server
                );
                
                const { status, user } = data;

                if (status) {
                    // Success: Cookie is valid
                    setUsername(user);
                    toast(`Hello ${user}`, { position: "top-right" });
                } else {
                    // Failure: Server response status: false
                    // The server handles removing the invalid cookie, we just navigate
                    navigate("/login"); 
                }

            } catch (error) {
                // Catches network errors or if the server explicitly sends a 401/403
                console.error("Verification failed:", error);
                navigate("/login");
            } finally {
                // Stop loading regardless of outcome
                setIsLoading(false);
            }
        };
        verifyCookie();
    }, [navigate]); // Only navigate is needed as a dependency

    const Logout = async () => {
        // Option 1: Call a server route to clear the session/cookie (Best Practice)
        // await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
        
        // Option 2: Simple client-side redirect (Less secure, assumes token expired)
        navigate("/login");
    };

    // --- Loading State Check ---
    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <p className="lead">Verifying Session...</p>
            </div>
        );
    }
    
    // --- Render Protected Content ---
    return (
        <>
            <Navbar username={username} onLogout={Logout} />
            <Button />
            <Cards />
            <Chatbot/>
        </>
    );
};

export default Home;