import Container from "./DisplayUser";
import Create from "../Category/Create";
import Profile from "./DisplayUser";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import UserForm from "./UserForm";

const onClick = ()=>{
  alert('approval page goes here')
}

export default function Admin() {
  return (
    <div className="container mt-5"> 
      <div className="card text-center bg-light p-3"> {/* Add 'bg-light' class for a greyish background, and 'p-3' for padding */}
        <h1 className="card-title">Admin Profile</h1>
      </div>
      <Container/>      
      <br/>
      <br/>  
    </div>
  );
}
