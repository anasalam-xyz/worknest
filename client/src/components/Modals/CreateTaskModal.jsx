import Modal from "./Modal";

export default function CreateTaskModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Task">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <textarea
          type="text"
          rows={5}
          placeholder="Description"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <select className="w-full border border-gray-400 rounded-3xl p-2">
          <option selected>Assign task to--</option>
          <option>Alice</option>
          <option>Smith</option>
          <option>William</option>
        </select>
        <select className="w-full border border-gray-400 rounded-3xl p-2">
          <option selected>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500">
          Done
        </button>
      </div>
    </Modal>
  );
}
