import { UserIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
    return (
        <nav className="h-12 bg-white shadow-sm px-20 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-blue-400 font-mono">WorkNest</h1>
            <div className="rounded-full h-8 w-8 bg-pink-100 flex items-center justify-center text-gray-700 font-semibold">
                <UserIcon className="size-6 text-blue-300" />
            </div>
        </nav>
    );
}