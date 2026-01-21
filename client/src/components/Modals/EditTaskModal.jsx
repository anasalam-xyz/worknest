import Modal from "./Modal";
import { useState } from "react";
import API from "../../api/axios";

export default function EditTaskModal({ owner, members, isOpen, onClose, refreshTasks, task }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const taskId = task._id;

  const handleEditTask = async () => {
    if (!title) {
      console.log("Missing fields");
      return;
    }
    try {
      const res = await API.put(`/tasks/${taskId}`, {
        title,
        description,
        priority,
        status: taskStatus,
        assignedTo
      });

        console.log("Task edited :", res.data);

        refreshTasks();
        onClose();
      } catch (err) {
        //console.error(err.response?.data?.message || "Failed to create project");
        console.error(err);
        onClose();
      }
    }
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
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

          <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500" onClick={handleEditTask}>
            Done
          </button>
        </div>
      </Modal>
    );
  }
