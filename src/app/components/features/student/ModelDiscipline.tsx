import { useState } from "react";
import { Plus } from "lucide-react";

export default function DisciplineModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    if (!description || points === undefined) return;

    const newRecord = {
      description,
      points,
    };

    console.log("Submit discipline record:", newRecord);
    // TODO: call API or handle logic here

    // Reset + close
    setDescription("");
    setPoints(undefined);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="flex justify-start my-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-black hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          Add Discipline Record
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative transform transition-all duration-300 ease-in-out scale-100 opacity-100">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold transition-colors duration-200 cursor-pointer"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold mb-1">
              Add Discipline Record
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Add a new discipline record for this student.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Describe the disciplinary issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points (negative value)
                </label>
                <input
                  type="number"
                  value={points ?? ""}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  max={0}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter points"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a negative value (e.g., -1, -2, -5)
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
