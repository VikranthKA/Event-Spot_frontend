import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Countdown from 'react-countdown';
import "./CountDown.css"

const CountDown = ({ ticketSaleStartTime }) => {
return (
    <div className='countdown'>

      <Countdown
        date={new Date(ticketSaleStartTime)}
        color="#004777"
        alpha={0.9}
        size={50} 
        onComplete={() => toast.info("Booking are Opened")}
      />
 
      <ToastContainer/>
    </div>
  );
};

export default CountDown;



