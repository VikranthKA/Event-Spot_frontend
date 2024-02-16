import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import EventCard from "./EventCard"
import "./EventCardsDisplay.css"
import { MyContext } from '../../ContextApi/Context'

function EventCardsDisplay() {
  const {searchQuery} = useContext(MyContext)
  const events = useSelector((state)=>{
    return state.events
  })
  const filterEvent =searchQuery && events.filter(item=>item.title.toLowerCase().includes(searchQuery))

  return (
    <div className="containter">
      <div className="head">

      </div>
      <div className='cards-display'>

        {(Object.keys(filterEvent).length > 0 ? filterEvent : events).map(ele=><EventCard
          image={ele.posters[0].image}
          title={ele.title}
          start={ele.eventStartDateTime}
          categoryName={ele.categoryId.name}
          id={ele._id}

        
        />)}
      </div>
    </div>
  )
}

export default EventCardsDisplay