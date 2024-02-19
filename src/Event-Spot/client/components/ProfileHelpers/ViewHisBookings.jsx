import TicketCard from "./TicketCard"

export default function ViewHisBooking({profileData}) {
  return (
<div>
    {Object.keys(profileData).lenght>0 && 
    <div className="tickets">
      <h4>Tickets you have booked</h4>
      {console.log(profileData,"in the bookings")}
      {profileData.bookings.map((value)=>value.tickets.map((ticket)=><TicketCard
            eventInfo={value.eventId}
            id={ticket._id} 
            quantity={ticket.quantity}
            ticketPrice={ticket.ticketPrice}
            ticketType={ticket.ticketType}
            totalAmount={ticket.totalAmount}
          />
        ))
      } 

    </div>}
    </div>
  );
}
