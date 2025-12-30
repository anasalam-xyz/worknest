import { UserIcon } from '@heroicons/react/24/solid';
import ProfileModal from './Modals/ProfileModal';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const { isAuthenticated } = useAuth();
    const [showProfileModal, setShowProfileModal] = useState(false);
    return (
        <nav className="h-12 bg-white shadow-sm px-[10%] py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-blue-400 font-mono">
                WorkNest
            </h1>

            {isAuthenticated && (
                <button
                    onClick={() => setShowProfileModal(true)}
                    className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition"
                >
                    <UserIcon className="h-5 w-5 text-blue-400 cursor-pointer" />
                </button>
            )}

            <ProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
            />
        </nav>
    );
}
