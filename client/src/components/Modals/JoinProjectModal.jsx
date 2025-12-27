import Modal from "./Modal";

export default function JoinProjectModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Project">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Project Code"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />
        <input
          type="password"
          placeholder="Enter Passkey"
          className="w-full border border-gray-400 rounded-3xl p-2"
        />

        <button className="w-full bg-purple-400 text-white py-2 rounded-3xl hover:bg-purple-500">
          Join Project
        </button>
      </div>
    </Modal>
  );
}
