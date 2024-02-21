import {useState} from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import moment from 'moment' 
import ExpiryTime from '../Booking/Qr-Component/ExpiryTime';

export default function TicketCard({eventInfo,quantity,ticketPrice,ticketType,totalAmount,id,createdAt}) {
  const [qrToggle,setQrToggle] = useState(false)
  const expiryTime = 2
  const detailsInfo = {
    quantity,ticketPrice,ticketType,totalAmount,id
  }
  function readableDate(inputDateString) {
    const momentObject = moment(inputDateString);
    return momentObject.format('L');
  }

  return (
    <div style={{margin:"0 0 10% 25%"}}>
        <h4 style={{display:"inline-block",marginBottom: "3%"}}>Tickets you have booked at - {readableDate(createdAt)}</h4>

      {qrToggle ? <Button onClick={()=>setQrToggle(false)}>Hide</Button> : <Button onClick={()=>setQrToggle(true)}>Show</Button>}
    {qrToggle && <Card key={id} sx={{ display: 'flex',border:"2px solid black",marginTop:"2%" ,width:"45%"}}>
      <Box sx={{ display: 'flex',justifyContent:"space-between" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5" key={eventInfo._id}>
            Event:{eventInfo.title} <br/>Starts At:{readableDate(eventInfo.eventStartDateTime)}
          </Typography>
          <Typography component="div" variant="h5">
            Class:{ticketType}
          </Typography>
          <Typography component="div" variant="h5">
            Quantity:{quantity}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <ExpiryTime detailsInfo={detailsInfo} expiryTime={expiryTime}/>

        </Box>
      </Box>

    </Card> }
    </div>
  );
}
