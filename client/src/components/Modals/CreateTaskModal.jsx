import Modal from "./Modal";
import { useState } from "react";
import API from "../../api/axios";
import { toast } from 'react-hot-toast'

export default function CreateTaskModal({ project, isOpen, onClose, refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("");
  const projectId = project._id;
  const members = project?project.members:[];
  const owner = project?project.owner:{};

  const handleCreateTask = async () => {
    if (!title || !description || !assignedTo) {
      toast.error("Missing fields");
      return;
    }
    try {
      const res = await API.post(`/tasks/project/${projectId}`, {
        title,
        description,
        priority,
        status: taskStatus,
        assignedTo
      });

        console.log("Task created:", res.data);

        setTitle("");
        setDescription("");
        setPriority("low");
        setTaskStatus("pending");
        setAssignedTo("");
        toast.success("Task added.");
        refreshTasks();
        onClose();
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong.");
        console.error(err);
        onClose();
      }
    }
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Create Task">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            className="w-full border border-gray-400 rounded-3xl p-2" 
            value={title} onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
            type="text"
            rows={5}
            placeholder="Description"
            className="w-full border border-gray-400 rounded-3xl p-2"
            value={description} onChange={(e)=>setDescription(e.target.value)}
          />

          <select className="w-full border border-gray-400 rounded-3xl p-2" value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}>
            <option value="" disabled>--Assign To--</option>
            {owner&&<option key={owner._id} value={owner._id}>{owner.username}</option>}
            {members&&members.map((member)=>(
              <option key={member._id} value={member._id}>{member.username}</option>))}
          </select>
          
          <select className="w-full border border-gray-400 rounded-3xl p-2" value={taskStatus} onChange={(e)=>setTaskStatus(e.target.value)}>
            <option  value="pending">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select value={priority} className="w-full border border-gray-400 rounded-3xl p-2" onChange={(e)=>setPriority(e.target.value)}>
            <option value="" disabled>--Priority--</option>
            <option value="lowest">Lowest</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>

          <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500" onClick={handleCreateTask}>
            Done
          </button>
        </div>
      </Modal>
    );
  }
