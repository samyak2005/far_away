import { useState } from "react";

export default function Navigation({ onNavigate, trips, currentTrip }) {
  return (
    <nav className="nav">
      <button 
        onClick={() => onNavigate("home")}
        className={!currentTrip ? "active" : ""}
      >
        Home
      </button>
      {trips.map(trip => (
        <button 
          key={trip.id} 
          onClick={() => onNavigate("form", trip.id)}
          className={currentTrip?.id === trip.id ? "active" : ""}
        >
          {trip.name}
        </button>
      ))}
    </nav>
  );
} 