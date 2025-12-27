import Modal from "./Modal";

export default function ProjectSettingsModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Project Settings">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border rounded-lg p-2"
        />

        <textarea
          placeholder="Project Description"
          className="w-full border rounded-lg p-2"
        />

        <button className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600">
          Save Changes
        </button>
      </div>
    </Modal>
  );
}
