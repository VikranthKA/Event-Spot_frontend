import Create from "../Category/Create";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/all-events');
  }

  const handleDeactivate = () =>{
    navigate('/user-deactivate')
  }

  return (
    <div className="container mt-5">
      <div>
        <h1>Admin Profile</h1>
      </div>
      <Profile />
      <Create />
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={onClick}>
          Approve or disapprove events here
        </button>
        <br/>
        <br/>
        <button className="btn btn-primary" onClick={handleDeactivate}>Click here to deactivate users</button>
      </div>
      <br />
      <br />
    </div>
  );
}
