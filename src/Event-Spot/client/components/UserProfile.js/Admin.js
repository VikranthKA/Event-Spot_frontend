import Create from "../Category/Create";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/all-events');
  }

  return (
    <div className="container mt-5">
      <div className="card text-center bg-light p-3">
        <h1 className="card-title">Admin Profile</h1>
      </div>
      <Profile />
      <Create />
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={onClick}>
          Approve or disapprove events here
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}
