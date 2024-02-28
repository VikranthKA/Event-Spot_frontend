import { useState, useEffect } from 'react';
import axios from '../Api_Resources/axios';
import { fileConfig } from '../Api_Resources/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux'
import { startGetProfile } from '../../react-redux/action/profileAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut} from '@fortawesome/free-solid-svg-icons';

export default function Deactivate() {
    const [users, setUsers] = useState([])
    const [search,setSearch] = useState("")
    
    const dispatch =  useDispatch()

    const profiles = useSelector((state)=>state.profile.allProfile)

    const handleFetchProfiles = ()=>{
        dispatch(startGetProfile(search))
    }

    useEffect(() => {
        handleFetchProfiles()
    }, []);


    const handleToggleActivation = async (userId, isActive) => {
        try {
            const response = await axios.put(`/api/users/${userId}`, { isActive: !isActive }, fileConfig);
            const updatedUser = response.data;
            const updatedUsers = users.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );
            setUsers(updatedUsers);
            toast.success(`${updatedUser.username} account ${updatedUser.isActive ? 'activated' : 'deactivated'}!!`, {
                position: 'top-center',
                autoClose: 5000
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="container mt-5">
            {console.log(profiles)}
            <h1 className="mb-4" style={{ borderBottom: '3px solid black', paddingBottom: '1px'}} >Profile List</h1>
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/><button onClick={handleFetchProfiles}>search</button>
            <div className="row" style={{display:"flex"}}>
                {profiles.length > 0 ? profiles?.map( profile=> (
                    <div key={profile._id} className="col-md-4 mb-4" style={{width:"50%",height:"200px"}}>
                        <div className="card" style={{width:"100%",margin:"5% 0 1% 0"}}>
                            <div className="card-body">
                                <h4 className="card-title">Username: {profile.userId?.username}</h4>
                                {profile?.profilePic ? <img
                  className="rounded-circle mb-3"
                  src={`${process.env.REACT_APP_IMAGE_URL}${profile.profilePic}`}
                  alt="Profile"
                  width="150"
                  height="150"
                /> :  <FontAwesomeIcon icon={faUserAstronaut} style={{ marginTop:"10px",marginRight:"10px"}}/>
            }
                                <h5 className="card-title">{profile.userId?.email}</h5>
                                <p className="card-text">Role: {profile.userId?.role}</p>
                                <p className="card-text">Address: {profile.addressInfo.address}</p>
                                {profile.userId?.isActive ? (
                                    <button className="btn btn-danger" onClick={() => handleToggleActivation(profile.userId?._id, true)}>Deactivate</button>
                                ) : (
                                    <button className="btn btn-success" onClick={() => handleToggleActivation(profile.userId?._id, false)}>Activate</button>
                                )}
                            </div>
                        </div>
                    </div>
                )):<h1>No User Found</h1>}
            </div>
            <ToastContainer />
        </div>
    );
}
