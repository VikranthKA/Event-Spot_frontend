import TicketCard from "./TicketCard"
import {memo} from 'react'
function ViewHisBooking({profileData}) {
  return (
<div>
    <div className="tickets">
      {profileData?.bookings?.length > 0 && profileData.bookings.map((value)=>value.tickets.map((ticket)=><TicketCard
            eventInfo={value.eventId}
            id={ticket._id} 
            quantity={ticket.quantity}
            ticketPrice={ticket.ticketPrice}
            ticketType={ticket.ticketType}
            totalAmount={ticket.totalAmount}
            createdAt={value.createdAt}
          />
        ))
      } 

    </div>
    </div>
  );
}
export default memo(ViewHisBooking)