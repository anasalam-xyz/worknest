import Modal from "./Modal";
import API from "../../api/axios";
import { useState, useEffect } from "react";

export default function EditProjectModal({ isOpen, onClose, fetchProject, project }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [passkey, setPasskey] = useState("");

    useEffect(() => {
        if (!project) return;
        setName(project.name ?? "");
        setDescription(project.description ?? "");
        setCode(project.code ?? "");
        setPasskey(project.passkey ?? "");
    }, [project]);

    const handleEditProject = async () => {
        if (!name || !code || !passkey) {
            console.log("Missing fields");
            return;
        }
        try {
            const res = await API.put(`/projects/${project._id}`, {
                name,
                description,
                code,
                passkey
            });

            console.log("Project edited:", res.data);
            fetchProject();
            onClose();
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Project">
            <div className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project Name"
                    className="w-full border border-gray-400 rounded-3xl p-2"
                />

                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-400 rounded-3xl p-2"
                />

                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Unique ID - Other Users will use this to Join"
                    className="w-full border border-gray-400 rounded-3xl p-2"
                />

                <input
                    type="password"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Passkey"
                    className="w-full border border-gray-400 rounded-3xl p-2"
                />

                <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500" onClick={handleEditProject}>
                    Done
                </button>
            </div>
        </Modal>
    );
}
