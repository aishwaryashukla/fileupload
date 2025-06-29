import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/Api";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Handle button loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("Username:", username); // Should be a string
      console.log("Password:", password);
      if (!username || !password) {
        setError("Username and password are required.");
        return;
      }
      setLoading(true); // Show loading state on the button
      setError(""); // Clear previous errors
        try {
            /*
            const resp = await loginUser(username, password);

            localStorage.setItem("token", resp.token);
            localStorage.setItem("userName", resp.user.username);
            localStorage.setItem("userID", resp.user.id);
            console.log("Token in Login:", resp.user.id); // Debugging
            */
            localStorage.setItem("userName", username);
            navigate("/");

          } catch (err) {
            console.error("Login error:", err);
            setError("Invalid Credentials. Please contact your Admin");
          } finally {
            setLoading(false); // Reset loading state
          }
    };

    return (
        <div className="admin-login-container">
            <h3>Welcome to <br/> <span className="admin-text-orange"> PE Partners Portal</span></h3><br/>
            <div className="admin-login-box">
                <h4>Login</h4>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        id='username'
                        name='username'
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="admin-input-field" 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="admin-input-field" 
                        required 
                    />

                    {error && <p className="admin-error-message">{error}</p>} {/* ✅ Show error message */}

                    {/* Orange Box Covering the Buttons */}
                    <div className="admin-button-container">
                        <button type="submit" className={`admin-login-button${loading ? "disabled" : ""}`} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
