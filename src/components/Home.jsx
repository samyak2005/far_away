import { useState } from "react";

export default function Home({ onAddTrip, trips, onNavigate, onDeleteTrip }) {
  const [newTripName, setNewTripName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTripName.trim()) return;
    
    onAddTrip({
      id: Date.now(),
      name: newTripName.trim(),
      items: []
    });
    
    setNewTripName("");
  }

  function handleDeleteClick(e, tripId) {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this trip?")) {
      onDeleteTrip(tripId);
    }
  }

  function handleClearAll() {
    if (window.confirm("Are you sure you want to delete all trips? This cannot be undone!")) {
      trips.forEach(trip => onDeleteTrip(trip.id));
    }
  }

  return (
    <div className="home">
      <div className="create-trip">
        <h2>Create New Trip</h2>
        <form className="trip-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter trip name..."
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
          />
          <button>Create Trip</button>
        </form>
      </div>

      <div className="trips-list">
        {trips.length > 0 && <h2>Your Trips ✈️ ✈️</h2>}
        {trips.length === 0 ? (
          <p className="no-trips">No trips planned yet. Create your first trip above! ✈️</p>
        ) : (
          <>
            <ul>
              {trips.map(trip => (
                <li 
                  key={trip.id} 
                  onClick={() => onNavigate("form", trip.id)}
                >
                  <div className="trip-info">
                    <span className="trip-name">{trip.name}</span>
                    <span className="items-count">{trip.items.length} items</span>
                  </div>
                  <button 
                    className="delete-trip"
                    onClick={(e) => handleDeleteClick(e, trip.id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            {trips.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="clear-all" onClick={handleClearAll}>
                  Clear All Trips 🗑️
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 