import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import ActionMenuModal from "./Modals/ActionMenuModal";
import { useState } from "react";

export default function TaskCard({ title, color, user }) {
    const [showActionModal, setShowActionModal] = useState({open:false, x:0, y:0});
    const colorMap = {
        emerald: "bg-emerald-200",
        rose: "bg-rose-200",
        teal: "bg-teal-200",
        amber: "bg-amber-200",
        fuchsia: "bg-fuchsia-200",
    };
    const handleActionMenuOpen = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setShowActionModal({
            open: true,
            x: rect.left - 140,
            y: rect.top + rect.height / 2 ,
        });
    };

    return (
        <div className={`w-full max-w-xl p-4 rounded-xl shadow-lg ${colorMap[color]} m-4`}>
            <h3 className="flex flex-row justify-between text-base text-gray-900 mb-1">
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
                onClose={() => setShowActionModal({open: false, x:0, y:0})}
                onEdit={() => console.log("edit")}
                onDelete={() => console.log("delete")}
            />
        </div>
    );
}