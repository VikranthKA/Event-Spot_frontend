import Create from "../Category/Create";
import Profile from "./DisplayUser";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

export default function Admin() {
  return (
    <div className="container mt-5">
      <div className="card text-center bg-light p-3"> {/* Add 'bg-light' class for a greyish background, and 'p-3' for padding */}
        <h1 className="card-title">Organiser Profile</h1>
      </div>
      <Profile />
      <Create />
    </div>
  );
}
