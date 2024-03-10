import { useContext, useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import EventInMap from '../components/Location/EventInMap';
import Dashboard from "../components/Dashboard/admin/Dashboard"
import { MyContext } from "../ContextApi/Context";
import "./Home.css"
import OrganiserHomeDashboard from "../components/Dashboard/organiser/OrganiserHomeDashboard"
import { useSelector } from "react-redux";
import SkeletonLoading from "../components/Location/SkeletonLoading";
import NotFound from "../components/Utils/NotFound/NotFound";

export default function Home() {
const {userData} = useContext(MyContext)
const eventData = useSelector((state)=>state.events)

  return (
    <div>
      <div className="header">
      </div>
      <div className="body">
          {console.log(userData,"asdfas")}
          {userData.role === "Admin" ? <Dashboard />
          : userData.role === "Organiser" ? <OrganiserHomeDashboard />
          : <> {(eventData.length > 0 )? <EventInMap /> : <SkeletonLoading/>}</>
      }
      
 
        
      </div>
      <div className="footer">
        {(userData.role === "Customer" || userData.role === "Organiser") && <Footer />}
      </div>
    </div>
  );
}
