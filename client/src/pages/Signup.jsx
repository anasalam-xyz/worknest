import HeroIcon from '../assets/undraw_tree-swing_5010.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast'

export default function Signup() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {
        setError("");
        if (!email || !username || !password) {
            setError("Please enter all fields.");
            setTimeout(() => setError(""), 2000);
            return;
        }
        try {
            const res = await API.post("/auth/signup", { email, username, password });
            if (res.data.success) {
                login(res.data.token);
                navigate("/dashboard");
                toast.success("Sign Up successfully");
                getUserInfo();
            }
        } catch (err) {
            console.log(err)
            const errors = err.response?.data?.errors;
            if (errors?.length) {
                setError(errors[0].message);
            } else if(err.response?.data?.message) {
                setError(err.response?.data?.message);
            } else {
                setError("Something went wrong");
            }
            setTimeout(() => setError(""), 3000);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-violet-100 to-teal-200">
            <img src={HeroIcon} alt='WorkNest' className='w-60' />
            <div className="flex flex-col justify-center bg-white p-8 rounded-xl shadow-md w-80">
                <input
                    type="text"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border-b md:border border-gray-300 md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-rose-300"
                />
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={3}
                    className="w-full mb-4 px-3 py-2 border-b md:border border-gray-300 md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-rose-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border-b md:border border-gray-300 md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-rose-300"
                />
                <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500 transition-colors duration-200" onClick={handleSignup}>
                    Sign Up
                </button>
                <button className="mt-4 text-center text-gray-600" onClick={() => { navigate('/') }}>
                    <span className="underline cursor-pointer hover:text-rose-500">
                        Login
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