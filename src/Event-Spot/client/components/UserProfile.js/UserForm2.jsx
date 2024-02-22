import { useState, useEffect } from "react";
import axios from "../Api_Resources/axios";
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { config } from "../Api_Resources/config";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UserForm2 = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [locObj, setLocObj] = useState({
    address: '',
    place_id: '',
    lonlat: ['', ''],
    city: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [description, setDescription] = useState('');
  const [filePondFiles, setFilePondFiles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${searchTerm}&api_key=${process.env.REACT_APP_GEO_API}`
      );

      setSearchResults(response.data);
      if (response.data.length === 0) {
        setSearchResults([
          {
            place_id: '404',
            display_name: 'Try typing different or check typo',
          },
        ])
      }
    } catch (error) {
      console.error('Error fetching addresses:', error)
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

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const formSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePic', filePondFiles[0]);
      formData.append('description', description);
      formData.append('address', locObj.address);
      formData.append('place_id', locObj.place_id);
      formData.append('lonlat[lon]', locObj.lonlat[0]);
      formData.append('lonlat[lat]', locObj.lonlat[1])
      formData.append('city', locObj.city);
      dispatch({ type: "SHOW_TASK", payload: formData });

      const response = await axios.post('/api/profile', formData, config);

      console.log('Backend response:', response.data);
      navigate('/user-profile');

      // Show SweetAlert after successful submission
      Swal.fire("SweetAlert2 is working!");
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">Change Profile Picture</label>
          <FilePond
            files={filePondFiles}
            allowMultiple={false}
            onupdatefiles={(fileItems) => {
              setFilePondFiles(fileItems.map((fileItem) => fileItem.file));
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <label htmlFor="address" className="form-label">Address</label>
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
          <button type="button" className="btn btn-dark" onClick={fetchAddresses}>Search</button>
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
          <button type="button" className="btn btn-dark" onClick={formSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm2;