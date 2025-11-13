import React, { useState } from "react";

const QuoteModal = ({ product, onClose }) => {
  const [quote, setQuote] = useState("");

  const handleSubmit = () => {
    if (!quote.trim()) {
      alert("⚠️ Please write a quote before submitting.");
      return;
    }

    alert(`✅ Quote submitted for ${product.name}:\n\n"${quote}"`);
    setQuote("");
    onClose();
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          💬 Send Quote for {product?.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Order ID: <span className="font-medium">{product?.id}</span>
        </p>

        <textarea
          placeholder="Write your quote or repair details..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full min-h-[120px] border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all"
          >
            Submit Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
