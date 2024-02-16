import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const OrganiserDashboard = ({ event }) => {
  const ticketNames = event?.ticketType?.map(ticket => ticket.ticketName);
  const ticketsSold = event?.ticketType?.map(ticket => ticket.ticketCount - ticket.remainingTickets);

  const renderTicketTypes = () => {
    return event?.ticketType?.map(ticket => (
      <tr key={ticket._id}>
        <td>{ticket.ticketName}</td>
        <td>{ticket.ticketCount}</td>
        <td>{ticket.remainingTickets}</td>
        <td>{ticket.ticketPrice}</td>
        <td>{ticket.ticketCount - ticket.remainingTickets}</td>
        <td>{(ticket.ticketCount - ticket.remainingTickets) * ticket.ticketPrice}</td>
      </tr>
    ));
  };

  const totalRevenue = event?.ticketType?.reduce((acc, ticket) => {
    return acc + (ticket.ticketCount - ticket.remainingTickets) * ticket.ticketPrice;
  }, 0)

  const data = {
    labels: ticketNames,
    datasets: [
      {
        label: 'Tickets Sold',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: ticketsSold
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  // Check if ticketsSold is an array before calling every method
  // const allSoldOut = Array.isArray(ticketsSold) && ticketsSold?.every(count => count === 0);

  return (
    <div>
      {/* <h2>{event.title}</h2>
      {console.log(options,data)}
      <Chart options={options} series={data} type="bar" height={350} /> */} 

      <div>
        <h2>{event.title}</h2>
        <table>
          <thead>
            <tr>
              <th>Ticket Name</th>
              <th>Total Tickets</th>
              <th>Remaining Tickets</th>
              <th>Ticket Price</th>
              <th>Tickets Sold</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>{renderTicketTypes()}</tbody>
        </table>
        <p>Total Revenue: {totalRevenue}</p>
        {/* {allSoldOut && <p>All tickets sold out!</p>} */}
      </div>
    </div>
  );
};

export default OrganiserDashboard;
