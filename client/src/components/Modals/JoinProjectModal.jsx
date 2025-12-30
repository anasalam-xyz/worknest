import Modal from "./Modal";
import { useState } from "react";
import API from "../../api/axios";

export default function JoinProjectModal({ isOpen, onClose, refreshProjects }) {
  const [code, setCode] = useState("");
  const [passkey, setPasskey] = useState("");
  
  const handleJoinProject = async () => {
    if (!code || !passkey) {
      console.log("Missing fields");
      return;
    }
    try {
      const res = await API.post("/projects/join", {
        code,
        passkey
      });

      console.log("Project Joined:", res.data);

      setCode("");
      setPasskey("");
      refreshProjects();
      onClose();
    } catch (err) {
      //console.error(err.response?.data?.message || "Failed to create project");
      console.error(err);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Project">
      <div className="space-y-4">
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Project Code"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />
        <input
          type="password"
          onChange={(e) => setPasskey(e.target.value)}
          placeholder="Enter Passkey"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <button className="w-full bg-purple-400 text-white py-2 rounded-3xl hover:bg-purple-500" onClick={handleJoinProject}>
          Join Project
        </button>
      </div>
    </Modal>
  );
}
