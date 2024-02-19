import TicketCard from "./TicketCard"

export default function ViewHisBooking({profileData}) {
  return (
<div>
  {console.log(profileData.bookings,"in the bookings")}
    <div className="tickets">
      {profileData.bookings.map((value)=>value.tickets.map((ticket)=><TicketCard
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
