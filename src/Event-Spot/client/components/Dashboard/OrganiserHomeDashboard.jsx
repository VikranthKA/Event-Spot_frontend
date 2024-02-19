import React ,{useContext} from 'react'
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents'
import { MyContext } from '../../ContextApi/Context'

const OrganiserHomeDashboard = () => {
  const {userData} = useContext(MyContext)
  return (
    <div>
      Dashboard
      {userData.role == "Organiser" &&  <ViewHisEvents />}
    </div>
  )
}

export default OrganiserHomeDashboard
