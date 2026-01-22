import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import ActionMenuModal from "./Modals/ActionMenuModal";
import EditTaskModal from "./Modals/EditTaskModal";
import { useState } from "react";
import API from "../api/axios";
import { toast } from 'react-hot-toast'

export default function TaskCard({ owner, members, task, title, color, user, taskid, fetchTasks}) {
    const [showActionModal, setShowActionModal] = useState({ open: false, x: 0, y: 0 });
    const [ShowEditTaskModal, setShowEditTaskModal] = useState(false);
    const colorMap = {
        purple: "bg-purple-200",
        red: "bg-red-200",
        orange: "bg-orange-200",
        amber: "bg-amber-200",
        yellow: "bg-yellow-200",
        green: "bg-green-200",
    };
    const handleActionMenuOpen = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setShowActionModal({
            open: true,
            x: rect.left - 140,
            y: rect.top + rect.height / 2,
        });
    };
    const handleEditTask = async () => {
        setShowEditTaskModal(true);
    }
    const handleDeleteTask = async () => {
        try {
            await API.delete(`/tasks/${taskid}`);
            toast.success("Task Deleted.");
            fetchTasks();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
            console.log(error);
        }
    }

    return (
        <div className={`w-full max-w-xs p-4 rounded-xl shadow-lg ${colorMap[color]} m-4`}>
            <h3 className="flex flex-row justify-between break-words text-base text-gray-900 mb-1">
                {title}
                <EllipsisVerticalIcon className="size-4 text-gray-800 hover:text-gray-1000" onClick={handleActionMenuOpen} />
            </h3>
            <p className="text-sm text-gray-600">
                Assigned to{" "}
                <span className={`font-medium`}>
                    {user}
                </span>
            </p>
            <ActionMenuModal
                isOpen={showActionModal.open}
                x={showActionModal.x}
                y={showActionModal.y}
                onClose={() => setShowActionModal({ open: false, x: 0, y: 0 })}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
            />
            <EditTaskModal
                isOpen={ShowEditTaskModal} 
                onClose={()=> setShowEditTaskModal(false)}
                task={task} 
                members={members}
                owner={owner}
                refreshTasks={fetchTasks}
            />
        </div>
    );
}