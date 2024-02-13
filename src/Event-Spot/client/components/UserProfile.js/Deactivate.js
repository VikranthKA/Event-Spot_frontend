import { useState, useEffect } from 'react'
import axios from '../Api_Resources/axios'
import { config } from '../Api_Resources/config'

export default function Deactivate(){
    const [users, setUsers] = useState([])

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const response = await axios.get('/api/users', config)
                setUsers(response.data)
            } catch(err){
                console.log(err)
            }
        }
        fetchUsers()
    },[])

    const handleDeactivate = async (userId) =>{
        try{
            await axios.put(`/api/users/${userId}`, config)
            // Assuming your API updates the user's status to inactive when receiving this PUT request.
            // After successfully deactivating, you might want to refetch the users list to reflect the changes.
            const response = await axios.get('/api/users', config)
            setUsers(response.data)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email} - 
                        <button className='btn btn-danger' onClick={() => handleDeactivate(user._id)}>Deactivate</button>
                    </li>                    
                ))}
            </ul>
        </div>
    )
}
