import TicketCard from "./TicketCard"

export default function ViewHisBooking({profileData}) {
  return (
    <div className="tickets">
      {profileData.bookings.map((ele)=>ele.tickets.map((ticket)=><TicketCard
            id={ticket._id} 
            quantity={ticket.quantity}
            ticketPrice={ticket.ticketPrice}
            ticketType={ticket.ticketType}
            totalAmount={ticket.totalAmount}
          />
        ))
      } 

    </div>
  );
}
