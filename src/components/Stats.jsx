import { useState } from "react";
function Stats({ items }) {
  function getPackedItems(items) {
    return items.filter((item) => item.packed).length;
  }

  function calculatePercentage(total, packed) {
    return ((packed * 100) / total).toFixed(2);
  }

  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🎉</em>
      </p>
    );
  }

  const packedItems = getPackedItems(items);
  const percentage = calculatePercentage(items.length, packedItems);

  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} items on your list, and you already packed{" "}
        {packedItems} items ({percentage}%)
      </em>
    </footer>
  );
}

export default Stats;
