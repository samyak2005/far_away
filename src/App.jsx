import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";
import "./App.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

// Component for the trip page
function TripPage({ trips, onAddItem, onDeleteItem, onToggleItem }) {
  const { tripName } = useParams();
  const currentTrip = trips.find(
    trip => trip.name.toLowerCase().replace(/\s+/g, '-') === tripName
  );

  if (!currentTrip) return <Navigate to="/" replace />;

  return (
    <>
      <Form onAddItem={onAddItem} />
      <PackingList
        items={currentTrip.items}
        onDeleteItem={onDeleteItem}
        onToggleItem={onToggleItem}
      />
      <Stats items={currentTrip.items} />
    </>
  );
}

function App() {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem("trips");
    return savedTrips ? JSON.parse(savedTrips) : [];
  });
  
  const [currentTripId, setCurrentTripId] = useState(() => {
    return Number(localStorage.getItem("currentTripId")) || null;
  });

  const navigate = useNavigate();
  const currentTrip = trips.find(trip => trip.id === currentTripId);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  // Save current trip ID to localStorage
  useEffect(() => {
    localStorage.setItem("currentTripId", currentTripId);
  }, [currentTripId]);

  function handleAddTrip(newTrip) {
    setTrips(trips => [...trips, newTrip]);
  }

  function handleDeleteTrip(tripId) {
    const tripToDelete = trips.find(t => t.id === tripId);
    if (tripId === currentTripId) {
      setCurrentTripId(null);
      navigate('/');
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
    if (page === "home") {
      setCurrentTripId(null);
      navigate('/');
    } else if (tripId) {
      setCurrentTripId(tripId);
      const trip = trips.find(t => t.id === tripId);
      if (trip) {
        navigate(`/${trip.name.toLowerCase().replace(/\s+/g, '-')}`);
      }
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
      <Routes>
        <Route path="/" element={
          <Home 
            onAddTrip={handleAddTrip} 
            trips={trips} 
            onNavigate={handleNavigate}
            onDeleteTrip={handleDeleteTrip}
          />
        } />
        <Route 
          path="/:tripName" 
          element={
            <TripPage
              trips={trips}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onToggleItem={handleToggleItem}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
