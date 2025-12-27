import { useNavigate } from "react-router-dom";

export default function Project({ title, color, progress }) {
    const navigate = useNavigate();
    const handleViewProject = () => {
        navigate('/tasks');
    }
    const colorMap = {
        emerald: "bg-emerald-200",
        rose: "bg-rose-200",
        teal: "bg-teal-200",
        amber: "bg-amber-200",
        fuchsia: "bg-fuchsia-200",
    };
    return (
        <div className="flex flex-col justify-center w-full md:w-80 bg-white rounded-xl shadow-md p-5 m-1">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📁</span>
                </div>
                <h2 className="text-lg font-semibold font-sans text-gray-800">
                    {title}
                </h2>
            </div>
            <div className="relative w-full h-6 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div className={`absolute left-0 top-0 h-full ${colorMap[color]} rounded-full `} style={{ width: `${progress}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
                    {progress}% Complete
                </div>
            </div>
            <button className="inline-flex self-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-3xl hover:bg-gray-100 hover:border-gray-400 transition" onClick={handleViewProject}>
                View Project
            </button>
        </div>

    );
}