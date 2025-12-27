export default function ActionMenuModal({ isOpen, onClose, onEdit, onDelete, x, y }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className={`fixed z-50 w-36 bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden`} style={{top: y, left: x}}>
        <button
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition"
          onClick={() => {
            onEdit();
            onClose();
          }}
        >Edit</button>
        <button
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >Delete</button>
      </div>
    </>
  );
}
