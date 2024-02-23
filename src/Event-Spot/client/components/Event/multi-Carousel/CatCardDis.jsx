import React, { useEffect, useState } from 'react'
import EventCard from "../EventCard"
import "../EventCardsDisplay.css"

import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from '../../Api_Resources/axios'

function CatCardDis() {
    const [ foundCatEvents,setFoundCatEvents] = useState({})
    const {categoryId} = useParams()

useEffect(()=>{
  (async ()=>{
    try{
      const response = await axios.get(`/api/category/${categoryId}`)
      console.log(response.data)
      setFoundCatEvents(response.data.events)
    }catch(err){
      console.log(err)
    }  
  })()
},[categoryId])

  return (
    <div style={{ marginBottom: "50px",marginTop:"2%" ,backgroundColor:"",borderRadius: "15px" }}>
      <Container style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>


          {foundCatEvents.length > 0 && foundCatEvents.map(ele => <EventCard
            image={ele?.eventId.posters[0]?.image}
            title={ele?.eventId?.title}
            start={ele?.eventId?.eventStartDateTime}
            // categoryName={ele?.eventId.categoryId?.name}
            id={ele?.eventId?._id}
            tickets={ele?.eventId.ticketType}


          />)}
      </Container>
    </div>
  )
}

export default CatCardDis