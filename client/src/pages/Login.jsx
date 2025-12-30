import HeroIcon from '../assets/undraw_tree-swing_5010.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import API from '../api/axios.js'
import { toast } from 'react-hot-toast'
import { getUserInfo } from '../api/auth.js';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Please enter all fields.");
            return;
        }
        try {
            const res = await API.post("/auth/login", { email, password });
            if (res.data.success) {
                login(res.data.token);
                navigate("/dashboard");
                toast.success("Logged in successfully");
                getUserInfo();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center md:justify-center bg-gradient-to-r from-violet-100 to-teal-200">
            <img src={HeroIcon} alt='WorkNest' className='mt-6 w-60' />
            <div className="flex flex-col justify-center bg-transparent md:bg-white p-8 rounded-xl md:shadow-md w-80">
                <input
                    type="text"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border-b md:border border-gray-300 md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-rose-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-3 py-2 border-b md:border border-gray-300 md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-rose-300"
                />
                <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500 transition-colors duration-200" onClick={handleLogin}>
                    Login
                </button>
                <button className="mt-4 text-center text-gray-600" onClick={() => { navigate('/signup') }}>
                    <span className="underline cursor-pointer hover:text-rose-500">
                        Sign up
                    </span>
                </button>
            </div>
            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </p>
            )}
        </div>
    );
}