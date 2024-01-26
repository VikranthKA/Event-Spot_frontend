import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import axios from '../Api_Resources/axios'
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Profile() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [locObj, setLocObj] = useState({
    address: '',
    place_id: '',
    lonlat: ['', ''],
    city: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [description, setDescription] = useState('');
  const [displayPic, setDisplayPic] = useState('');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Fetch saved details from local storage
    const savedDetails = JSON.parse(localStorage.getItem('profileDetails')) || {};
    setLocObj(savedDetails);

    if (id) {
      // Fetch user details
      axios
        .get(`/api/user/${id}`)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }

    // Fetch description and displayPic from local storage
    const savedDescription = localStorage.getItem('description') || '';
    setDescription(savedDescription);

    const savedDisplayPic = localStorage.getItem('displayPic') || '';
    setDisplayPic(savedDisplayPic);
  }, [id]);

  const fetchAddresses = async () => {
    try {
      const GEO_CODE_API_KEY = '659f7b557feb5653368044xyz79cdbd';
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${searchTerm}&api_key=${GEO_CODE_API_KEY}`
      );

      setSearchResults(response.data);
      if (response.data.length === 0) {
        setSearchResults([
          {
            place_id: '404',
            display_name: 'Try typing different or check typo',
          },
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

    setLocObj((prev) => ({
      ...prev,
      address: selectedResult.display_name,
      place_id: selectedResult.place_id,
      lonlat: [selectedResult.lon, selectedResult.lat],
      city: prev.city,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const confirmAddress = () => {
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('description', description);
    formData.append('address', locObj.address);
    formData.append('place_id', locObj.place_id);
    formData.append('lonlat', locObj.lonlat.join(','));
    formData.append('city', locObj.city);

    axios
      .post('/api/profile', formData)
      .then((response) => {
        console.log('Backend response:', response.data);

        // Update locObj with response data
        const updatedLocObj = {
          ...locObj,
          address: response.data.address,
          place_id: response.data.place_id,
          lonlat: response.data.lonlat.split(','),
          city: response.data.city,
        };

        // Update and save locObj, description, and displayPic
        localStorage.setItem('profileDetails', JSON.stringify(updatedLocObj));
        setLocObj(updatedLocObj);

        localStorage.setItem('description', response.data.description);
        setDescription(response.data.description);

        localStorage.setItem('displayPic', response.data.profilePic);
        setDisplayPic(response.data.profilePic);
      })
      .catch((error) => {
        console.error('Error sending data to the backend:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-3">
      <img
            className="rounded-circle profile-image me-3"
            src={`http://localhost:3333/Uploads/images/${displayPic}`}
            alt="Profile"
            width="200"
            height="200"
          />

      </div>

      <form encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">
            Change Profile Picture
          </label>
          <input type="file" className="form-control" name="profilePic" onChange={handleFileChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <label htmlFor="address" className="form-label">
            Address
          </label>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type to search addresses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button type="button" className="btn btn-dark" onClick={fetchAddresses}>
            Search
          </button>
        </div>

        <div className="mb-3">
          <Select
            options={searchResults.map((addr) => ({
              label: addr.display_name,
              value: addr.place_id,
            }))}
            value={selectedAddress}
            onChange={handleAddressSelect}
            isSearchable
            placeholder="Select an address"
          />
        </div>
        <label htmlFor="city" className="form-label">Type city name here</label>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={locObj.city}
            onChange={(e) => setLocObj((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>

        <div className="mb-3">
          <button type="button" className="btn btn-dark" onClick={confirmAddress}>
            Submit
          </button>
        </div>
      </form>

      <div className="mt-4">
        <h2>Entered Details:</h2>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Address:</strong> {locObj.address}
        </p>
        <p>
          <strong>City:</strong> {locObj.city}
        </p>
      </div>
      
    </div>
  );
}
