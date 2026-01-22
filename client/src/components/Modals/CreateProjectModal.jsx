import Modal from "./Modal";
import API from "../../api/axios";
import { useState } from "react";
import { toast } from 'react-hot-toast'

export default function CreateProjectModal({ isOpen, onClose, refreshProjects }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [passkey, setPasskey] = useState("");

  const handleCreateProject = async () => {
    if (!name || !code || !passkey) {
      console.log("Missing fields");
      return;
    }
    try {
      const res = await API.post("/projects", {
        name,
        description,
        code,
        passkey
      });
      
      toast.success("Project Created Successfully.");

      setName("");
      setDescription("");
      setCode("");
      setPasskey("");
      refreshProjects();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error(err);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Project">
      <div className="space-y-4">
        <input
          type="text"
          onChange={(e)=>setName(e.target.value)}
          placeholder="Project Name"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <textarea
          placeholder="Project Description"
          onChange={(e)=>setDescription(e.target.value)}
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <input
          type="text"
          onChange={(e)=>setCode(e.target.value)}
          placeholder="Unique ID - Other Users will use this to Join"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <input
          type="password"
          onChange={(e)=>setPasskey(e.target.value)}
          placeholder="Passkey"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500" onClick={handleCreateProject}>
          Done
        </button>
      </div>
    </Modal>
  );
}
