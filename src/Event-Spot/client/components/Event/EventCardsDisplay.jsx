import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import EventCard from "./EventCard"
import "./EventCardsDisplay.css"
import { MyContext } from '../../ContextApi/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/material'
import MultiCarousel from './multi-Carousel/MultiCarousel'

function EventCardsDisplay() {
  const { cardSearch, setCardSearch } = useContext(MyContext)
  const events = useSelector((state) => {
    return state.events
  })
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const filterEvent = cardSearch && events.filter(item => item.title.toLowerCase().includes(cardSearch))

  const handleSearch = () => {
    setCardSearch(userSearchQuery.toLowerCase())
  };
  return (
    <div style={{ marginBottom: "50px" ,backgroundColor:"#ffb703",borderRadius: "15px"}}>
      <Container>

        <div >
          <img style={{ width: "100%", height: "100px", borderRadius: "5px",marginTop:"20px" }} src={`https://eventpot.s3.ap-south-1.amazonaws.com/glowing-stage-light-illuminates-cheering-rock-fans-generated-by-ai.jpg`} />
        </div>

        <div style={{ bottom: 20, right: 20, textAlign: 'right', marginBottom: "20px", marginTop: "20px" }}>
          <input type='text' style={{ textAlign: 'left',border:"2px solid black",borderRadius:"5px" ,width:"15%"}} value={userSearchQuery} onChange={(e) => setUserSearchQuery(e.target.value)} placeholder=' Search...' />
          <button onClick={handleSearch} style={{ height: "30px", width: "30px", color: "blue", borderRadius: "20%" }}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className='cards-display'>

          {(Object.keys(filterEvent).length > 0 ? filterEvent : events).map(ele => <EventCard
            image={ele.posters[0]?.image}
            title={ele?.title}
            start={ele?.eventStartDateTime}
            categoryName={ele.categoryId?.name}
            id={ele?._id}



          />)}
        </div>
      </Container>
    </div>
  )
}

export default EventCardsDisplay