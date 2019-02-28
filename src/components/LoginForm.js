import React from "react";
const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Username
                    <input
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
