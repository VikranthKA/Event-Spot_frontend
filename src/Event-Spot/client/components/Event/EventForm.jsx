import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from "../Api_Resources/axios";
import { config } from "../Api_Resources/config";
import z from 'zod'
import "./EventForm.css"

// https://www.dhiwise.com/post/zod-and-react-a-perfect-match-for-robust-validation
const EventForm = () => {
  const [serverErrors,setServerErrors] = useState()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    eventStartDateTime: "",
    title: " ",
    description: " ",
    categoryId: null,
    ticketType: [
      { ticketName: " ", ticketPrice: " ", ticketCount: '', remainingTickets: '' },
    ],
    venueName: "",
    ticketSaleStartTime: "",
    ticketSaleEndTime: "",
  })

  const [poster, setPoster] = useState({
    Clip: { name: '', file: null },
    Brochure: { name: '', file: null },
  })

  const [youTube, setYouTube] = useState({
    title: " ", url: " ",

  })
  const [actors, setActors] = useState([{
    name: " "
  }])

  const [allCategory, setAllCategory] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [locObj, setLocObj] = useState({
    address: '',
    place_id: '',
    lonlat: ['', ''],
    city: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleYouTubeChange = (e) => {
    const { name, value } = e.target;
    setYouTube((prevYouTube) => ({
      ...prevYouTube,
      [name]: value,
    }));
  };

  const handleClipNameChange = (event) => {
    setPoster((prevPoster) => ({
      ...prevPoster,
      Clip: { ...prevPoster.Clip, name: event.target.value },
    }));
  };

  const handleClipFileChange = (event) => {
    const { files } = event.target;
    setPoster((prevPoster) => ({
      ...prevPoster,
      Clip: { ...prevPoster.Clip, file: files[0] },
    }));
  };

  const handleBrochureNameChange = (event) => {
    setPoster((prevPoster) => ({
      ...prevPoster,
      Brochure: { ...prevPoster.Brochure, name: event.target.value },
    }));
  };

  const handleBrochureFileChange = (event) => {
    const { files } = event.target;
    setPoster((prevPoster) => ({
      ...prevPoster,
      Brochure: { ...prevPoster.Brochure, file: files[0] },
    }));
  }
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/api/categoryall`)
        const modifiedCategory = response.data.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        setAllCategory(modifiedCategory);
      } catch (err) {
        console.log('Error fetching the Category', err);
      }
    };

    fetchCategory();
  }, []);

  const fetchAddresses = async () => {
    try {
      const GEO_CODE_API_KEY = '659f7b557feb5653368044xyz79cdbd';

      const response = await axios.get(
        `https://geocode.maps.co/search?q=${searchTerm}&api_key=${GEO_CODE_API_KEY}`
      );

      setSearchResults(response.data);
      if (response.data.length === 0) {
        setSearchResults([
          { place_id: '404', display_name: 'Try typing different or check typo' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSelect = (selectedOption) => {
    setSelectedAddress(selectedOption);

    const selectedResult = searchResults.find(
      (result) => result.place_id === selectedOption.value
    );
    console.log(selectedResult, 'full data 42');

    setLocObj((prev) => ({
      ...prev,
      address: selectedResult.display_name,
      place_id: selectedResult.place_id,
      lonlat: [selectedResult.lon, selectedResult.lat],
      city: prev.city
    }));

  };

  const handleInputChange = (index, field, e) => {
    const updatedTicketTypes = [...form.ticketType];
    updatedTicketTypes[index][field] = e.target.value;

    setForm((prevForm) => ({
      ...prevForm,
      ticketType: updatedTicketTypes.map((ticket) => ({
        ...ticket,
        remainingTickets: ticket.ticketCount,
      })),
    }));
  };

  const handleRemoveSlot = (i) => {
    if (form.ticketType.length > 1) {
      const updatedForm = { ...form };
      updatedForm.ticketType.splice(i, 1);
      setForm(updatedForm);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setForm((prevForm) => ({
      ...prevForm,
      categoryId: selectedCategory.value,
    }))
  }

  const handleAddSlot = () => {
    setForm((prevForm) => ({
      ...prevForm,
      ticketType: [
        ...prevForm.ticketType,
        {
          ticketName: '',
          ticketPrice: '',
          ticketCount: '',
          remainingTickets: '',
        },
      ],
    }));
  };

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }


  useEffect(() => {
    const storedFormData = localStorage.getItem('eventFormData');
    const LocationObj = localStorage.getItem('locObj')
    const ActorsData = localStorage.getItem('actors')
    if (storedFormData && LocationObj && ActorsData) {
      setForm(JSON.parse(storedFormData));

    }
  }, []);

  // // Update localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('eventFormData', JSON.stringify(form));
 

  }, [form])

  // handle the form obj
  const handleNameValueChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //handle the Actors name
  const handleActorChange = (index, propertyName, value) => {
    const updatedActors = [...actors]
    updatedActors[index][propertyName] = value
    setActors(updatedActors)
  }

  const hanldeAddActors = () => {
    setActors([...actors, { name: '' }])
  }

  const handleDeleteActor = (index) => {
    const updatedActors = [...actors]
    updatedActors.splice(index, 1);
    setActors(updatedActors);
  };


  const renderFormSection = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Title :</label>
            <input type="text" value={form.title} name="title" id="title" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br />

            <label>Description :</label>
            <textarea type="text" value={form.description} name="description" id="description" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br />

            <label>Ticket SaleStart Time :</label>
            <input type="datetime-local" value={form.ticketSaleStartTime} name="ticketSaleStartTime" id="ticketSaleStartTime" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br />
            <h5>Ticket SaleStart Time  where user can start booking the event</h5>

            <label>Event Start Time :</label>
            <input type="datetime-local" value={form.eventStartDateTime} name="eventStartDateTime" id="eventStartDateTime" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br />


            {/* <label>Event End Time :</label>
            <input type="datetime-local" value={form.eventEndDateTime} name="eventEndDateTime" id="eventEndDateTime" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br /> */}


            <label>Ticket SaleEnd Time :</label>
            <input type="datetime-local" value={form.ticketSaleEndTime} name="ticketSaleEndTime" id="ticketSaleEndTime" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br />
            <h5>Ticket SaleEnd Time  where user cannot buy the Tickets for u r event</h5>

            <label>venueName :</label>
            <input type="text" value={form.venueName} name="venueName" id="venueName" onChange={(e) => handleNameValueChange(e.target.name, e.target.value)} /><br /><br />



            <button onClick={() => nextStep()}>Next</button>
          </div>

        )
      case 2:
        return (
          <div>
                        <label>Category:</label>
            <Select
              id="category"
              name="category"
              options={allCategory}
              value={allCategory.find((option) => option.value === form.categoryId)}
              onChange={handleCategoryChange}
              isSearchable
              placeholder="Select Categories"
            /><br /><br />

            <label>Ticket Info</label>
            {form.ticketType.map((ticket, index) => (
              <div key={index}>
                <label>Name:</label>
                <input
                  type="text"
                  value={ticket.ticketName}
                  onChange={(e) => handleInputChange(index, 'ticketName', e)}
                />
                <label>Price:</label>
                <input
                  type="text"
                  value={ticket.ticketPrice}
                  onChange={(e) => handleInputChange(index, 'ticketPrice', e)}
                />
                <label>Total Seat:</label>
                <input
                  type="text"
                  value={ticket.ticketCount}
                  onChange={(e) => handleInputChange(index, 'ticketCount', e)}
                />
                {index >= 1 && (
                  <button type="button" onClick={() => handleRemoveSlot(index)}>
                    Delete
                  </button>
                )}

              </div>

            ))}
            {<button onClick={handleAddSlot}>+ Add</button>}<br /><br />


            <button onClick={() => prevStep()}>Prvious</button><button onClick={() => nextStep()}>Next</button>


          </div>
        )

      case 3:
        return (
          <div>
<label>Clip Name:</label>
      <input
        type="text"
        value={poster.Clip.name}
        onChange={handleClipNameChange}
      />

      <label>Upload Clip:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleClipFileChange}
      /><br/>

      <label>Brochure Name:</label>
      <input
        type="text"
        value={poster.Brochure.name}
        onChange={handleBrochureNameChange}
      />

      <label>Upload Brochure:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleBrochureFileChange}
      /><br/>
            <label>Youtube Name :</label>
            <input
              type="text"
              name="title"
              value={youTube.title}
              onChange={handleYouTubeChange}
            />

            <label>URL:</label>
            <input
              type="text"
              name="url"
              value={youTube.url}
              onChange={handleYouTubeChange}
            /><br/>
            <div className='AddressContainer'>
              <input
                type="text"
                placeholder="Type to search addresses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={fetchAddresses}>Search</button>

              <Select
                options={searchResults.map((addr) => ({
                  label: addr.display_name,
                  value: addr.place_id
                }))}
                value={selectedAddress}
                onChange={handleAddressSelect}
                isSearchable
                placeholder="Select an address"
              />

              <label>City Name:</label>
              <input
                type="text"
                value={locObj.city}
                onChange={(e) => setLocObj((prev) => ({ ...prev, city: e.target.value }))}
              />

              <div className="actors">
                {actors.map((actor, index) => (
                  <div className="actor" key={index}>
                    <label>Enter the Actor name :</label>
                    <input type="text" value={actor.name} onChange={(e) => handleActorChange(index, "name", e.target.value)} />
                    {index >= 1 && <button onClick={() => handleDeleteActor(index)}>Delete</button>}<br />
                  </div>
                ))}
                {actors.length < 6 && <button onClick={hanldeAddActors}>+ Actors</button>}



              </div><br /><br />
              <div className="serverErrors">
                {serverErrors && <span className='i-am-error'>{serverErrors.data && JSON.stringify(serverErrors.data)}</span>}
              </div>
            </div>
            <button onClick={() => prevStep()}>Previous</button><button onClick={handleSubmit}>Submit</button>

          </div>
        )
      default:
        return null
    }
  }

  const handleSubmit = async () => {
    const eventFormData = new FormData();

    // Append individual fields
    eventFormData.append('eventStartDateTime', form.eventStartDateTime);
    // eventFormData.append('eventEndDateTime', form.eventEndDateTime);
    eventFormData.append('title', form.title);
    eventFormData.append('description', form.description);
    eventFormData.append('venueName', form.venueName);
    eventFormData.append('ticketSaleStartTime', form.ticketSaleStartTime);
    eventFormData.append('ticketSaleEndTime', form.ticketSaleEndTime);

      eventFormData.append('category', form.categoryId);

    // Append ticketType array
    form.ticketType.forEach((ticket, index) => {
      eventFormData.append(`ticketType[${index}][ticketName]`, ticket.ticketName);
      eventFormData.append(`ticketType[${index}][ticketPrice]`, ticket.ticketPrice);
      eventFormData.append(`ticketType[${index}][ticketCount]`, ticket.ticketCount);
      eventFormData.append(`ticketType[${index}][remainingTickets]`, ticket.remainingTickets);
    });

    actors.forEach((actor, index) => {
      eventFormData.append(`Actors[${index}][name]`, actor.name);
    });
    

    eventFormData.append('ClipName', poster.Clip.name);
    eventFormData.append('ClipFile', poster.Clip.file)

    eventFormData.append('BrochureName', poster.Brochure.name)
    eventFormData.append('BrochureFile', poster.Brochure.file)

    eventFormData.append('youTube[title]', youTube.title);
    eventFormData.append('youTube[url]', youTube.url);


    // Append addressInfo
    eventFormData.append(`addressInfo[address]`, locObj.address);
    eventFormData.append(`addressInfo[city]`, locObj.city);

    // Append location coordinates
    eventFormData.append(`location[lon]`, locObj.lonlat[0])
    eventFormData.append(`location[lat]`, locObj.lonlat[1])


    console.log([...eventFormData], "i am event")
    console.log(config)
    try {
      const response = await axios.post('/api/event', eventFormData, config)
      
      console.log(response.data)
    } catch (err) {
      setServerErrors(err.response)
      console.log(err)
    }

  };


  return (
    <div>
      {renderFormSection()}
    </div>
  );
}

export default EventForm
