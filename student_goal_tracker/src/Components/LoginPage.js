import React, { useState } from "react";
import Home from "./Home";

const LoginPage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#ADD8E6", // Baby blue
      fontFamily: "'Arial', sans-serif",
    },
    form: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#5A9",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
    },
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <>
        {!isLoggedIn?
        <div style={styles.container}>
            <form style={styles.form}>
            <h2 style={styles.heading}>Login</h2>
            <input
                type="email"
                placeholder="Email"
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                style={styles.input}
            />
            <button style={styles.button} onClick={handleLogin}>Login</button>
            </form>
        </div>
        :
        <Home/>}
    </>
  );
};

export default LoginPage;
