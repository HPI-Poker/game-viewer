import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppContext } from "../model/AppContext";

function SignInPage() {
    const { login } = useAppContext();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    let navigate = useNavigate();

    const handleSubmit = async () => {
        const error = await login(username, password);
        setError(error);
        if (!error) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="flex flex-col items-center p-8 rounded-lg border-2 border-gray-300 shadow-lg">
                    <h3 className="text-2xl mb-2">Enter your Team Name and Secret</h3>
                    <p className="text-lg mb-5">You will receive your credentials from the organizing team to continue.</p>
                    <input
                        className="p-2 text-lg rounded-md border-gray-300 mb-5 text-black shadow-md"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="p-2 text-lg rounded-md border-gray-300 mb-5 text-black shadow-md"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 mb-5">{error}</p>}
                    <button
                        className={`p-2 m-2 text-lg rounded-md border-none ${username && password ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-300 text-black cursor-not-allowed'} transition-colors duration-300`}
                        disabled={!password}
                        onClick={handleSubmit}
                    >
                    Submit
                </button>
            </div>
            </div>
        </div>
    );
}

export default SignInPage;