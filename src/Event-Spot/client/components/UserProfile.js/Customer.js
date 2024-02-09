import Container from '../UserProfile.js/DisplayUser'
import Profile from './Profile'
// import Profile from '../UserProfile.js/DisplayUser'

export default function Customer(){
    return(
            <div className="container mt-5">
      <div> {/* Add 'bg-light' class for a greyish background, and 'p-3' for padding */}
        <h1 className="card-title">Customer Profile</h1>     
        </div>
        <Profile/>
        </div>
    )
}