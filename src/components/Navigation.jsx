import { NavLink } from "react-router-dom";

export default function Navigation({ trips, currentTrip }) {
  return (
    <nav className="nav">
      <NavLink 
        to="/"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Home
      </NavLink>
      {trips.map(trip => (
        <NavLink
          key={trip.id}
          to={`/${trip.name.toLowerCase().replace(/\s+/g, '-')}`}
          className={({ isActive }) => isActive ? "active" : ""}
        >
          {trip.name}
        </NavLink>
      ))}
    </nav>
  );
} 