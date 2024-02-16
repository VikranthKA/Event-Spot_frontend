import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from '../Api_Resources/axios';
import { config } from '../Api_Resources/config';

const Charts = () => {
  const [userState, setUserState] = useState({
    userInfo: { activeUsers: 0, notActiveUsers: 0 }, // Initialize userInfo
    options: {
      colors: ['#66DA26', "red"],
      chart: {
        id: 'basic'
      },
      xaxis: {
        categories: [] // Initialize categories with an empty array
      }
    },
    series: [
      {
        name: 'Active Users',
        data: [] // Initialize data arrays with empty arrays
      },
      {
        name: 'Non Active Users',
        data: []
      }
    ]
  });
  const [eventState, setEventState] = useState({
    popularEvent: [],
    options: {
      colors: ['#2E93fA', '#66DA26'],
      chart: {
        id: 'Popular Events'
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: 'Tickets Sold',
        data: []
      }
    ]
  });
  const [categoryEvents, setCategoryEvents] = useState({
    categoryEvents: [], // Initial empty array
    options: {
      // Initial options for the chart
      chart: {
        id: 'category-events-chart',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: [] // Initial empty array for x-axis categories
      }
    },
    series: [
      {
        name: 'Events',
        data: [] // Initial empty array for series data
      }
    ]
  });
  const [TodayTotalRevenue,setTodayTotalRevenue] = useState(0);
  const [totalAmount,setTotalAmount] = useState(0)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard', config);
        const { popularEvent } =response.data
        const {totalAmount} =  response.data.totalAmount[0]
        const { activeUsers, notActiveUsers } = response.data.userInfo
        const {categoryEvents} = response.data.category

        console.log(response.data)

        setTodayTotalRevenue(totalAmount)
        setUserState(prevState => ({
          ...prevState,
          userInfo: response.data.userInfo,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => num * activeUsers + notActiveUsers)
            }
          },
          series: [
            {
              ...prevState?.series[0],
              data: [activeUsers]
            },
            {
              ...prevState?.series[1],
              data: [notActiveUsers]
            }
          ]
        }));
        if(Array.isArray(popularEvent)){
        setEventState(prevState => ({
          ...prevState,
          popularEvent: popularEvent,
          options: {
            ...prevState?.options,
            xaxis: {
              ...prevState.options?.xaxis,
              categories: popularEvent?.map(event => event?.title)
            }
          },
          series: [
            {
              ...prevState.series[0],
              data: popularEvent?.map(event => event?.ticketsSold)
            }
          ]
        }));
      }
        // setCategoryEvents(prevState => ({
        //   ...prevState,
        //   categoryEvents: categoryEvents,
        //   options: {
        //     ...prevState.options,
        //     xaxis: {
        //       ...prevState.options.xaxis,
        //       categories: categoryEvents.map(ele => ele.title)
        //     }
        //   },
        //   series: [
        //     {
        //       ...prevState.series[0], // Assuming you have only one series
        //       name: 'Events',
        //       data: categoryEvents.map(ele => (ele.events ? ele.events.length + 1 : 0)) // Check if ele.events is defined
        //     }
        //   ]
        // }));

        // Calculate total amount from the data and update the state
        
        const total = popularEvent.reduce((acc, event) => acc + event.ticketsSold, 0);
        setTotalAmount(total);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>in Charts</div>
      <div>bar line area radar histogram scatter heatmap</div>
      <div >Total Tickets sold: {totalAmount}  Total Revenu:{TodayTotalRevenue}/day</div>
      <div>
        <h2>Most Ticket purchased</h2>
        <Chart options={eventState.options} series={eventState.series} type="bar" width="450" />
      </div>
      <div>
      <Chart options={userState.options} series={userState.series} type="bar" width="450" />

      </div>
      <div>
        {/* <Chart options={categoryEvents.options} series={categoryEvents.series} type="bar" width="450" /> */}
      </div>

    </div>
  );
};

export default Charts
