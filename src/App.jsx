import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

function App() {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem("trips");
    return savedTrips ? JSON.parse(savedTrips) : [];
  });
  
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "home";
  });
  
  const [currentTripId, setCurrentTripId] = useState(() => {
    return Number(localStorage.getItem("currentTripId")) || null;
  });

  const currentTrip = trips.find(trip => trip.id === currentTripId);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  // Save current page and trip ID to localStorage
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("currentTripId", currentTripId);
  }, [currentPage, currentTripId]);

  function handleAddTrip(newTrip) {
    setTrips(trips => [...trips, newTrip]);
  }

  function handleDeleteTrip(tripId) {
    if (tripId === currentTripId) {
      setCurrentTripId(null);
      setCurrentPage("home");
    }
    setTrips(trips => trips.filter(trip => trip.id !== tripId));
  }

  function handleAddItem(item) {
    setTrips(trips => 
      trips.map(trip => 
        trip.id === currentTripId 
          ? { ...trip, items: [...trip.items, item] }
          : trip
      )
    );
  }

  function handleDeleteItem(id) {
    setTrips(trips => 
      trips.map(trip => 
        trip.id === currentTripId 
          ? { ...trip, items: trip.items.filter(item => item.id !== id) }
          : trip
      )
    );
  }

  function handleToggleItem(id) {
    setTrips(trips => 
      trips.map(trip => 
        trip.id === currentTripId 
          ? {
              ...trip,
              items: trip.items.map(item =>
                item.id === id ? { ...item, packed: !item.packed } : item
              )
            }
          : trip
      )
    );
  }

  function handleNavigate(page, tripId = null) {
    setCurrentPage(page);
    if (page === "home") {
      setCurrentTripId(null);
    } else if (tripId) {
      setCurrentTripId(tripId);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Navigation 
        onNavigate={handleNavigate} 
        trips={trips} 
        currentTrip={currentTrip}
      />
      {currentPage === "home" ? (
        <Home 
          onAddTrip={handleAddTrip} 
          trips={trips} 
          onNavigate={handleNavigate}
          onDeleteTrip={handleDeleteTrip}
        />
      ) : (
        currentTrip && (
          <>
            <Form onAddItem={handleAddItem} />
            <PackingList
              items={currentTrip.items}
              onDeleteItem={handleDeleteItem}
              onToggleItem={handleToggleItem}
            />
            <Stats items={currentTrip.items} />
          </>
        )
      )}
    </div>
  );
}

export default App;
