import { useState } from "react";
function Stats({ items }) {
  function getPackedItems(items) {
    return items.filter((item) => item.packed).length;
  }
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🎉</em>
      </p>
    );
  }
  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} items on your list, and you already packed{" "}
        {getPackedItems(items)} items (
        {(getPackedItems(items) * 100) / items.length}%)
      </em>
    </footer>
  );
}

export default Stats;
