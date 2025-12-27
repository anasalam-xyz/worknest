import Modal from "./Modal";

export default function CreateProjectModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Project">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <textarea
          placeholder="Project Description"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <input
          type="text"
          placeholder="Unique ID - Other Users will use this to Join"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <input
          type="text"
          placeholder="Passkey"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <button className="w-full bg-rose-400 text-white py-2 rounded-3xl hover:bg-rose-500">
          Done
        </button>
      </div>
    </Modal>
  );
}
