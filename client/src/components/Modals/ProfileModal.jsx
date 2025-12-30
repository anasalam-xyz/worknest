import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext';

export default function ProfileModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        onClose();
        navigate("/");
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Your Profile">
            <h2 className="text-xl font-semibold mb-4 text-center">{user?user.username:"user1"}</h2>
            <div className="mb-4 text-sm text-gray-700">
                <p><span className="font-medium">Email:</span> {user?user.email:"demo-email"}</p>
            </div>
            <button onClick={handleLogout} className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500 transition">Logout</button>
        </Modal>
    );
}