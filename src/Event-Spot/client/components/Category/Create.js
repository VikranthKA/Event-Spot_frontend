import React, { useState, useEffect } from 'react';
import axios from '../Api_Resources/axios';

function Create() {
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);

  const handleCreateCategory = async () => {
    if (category) {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: token
          },
        };
  
        const response = await axios.post('/api/category', { name: category }, config);
        console.log(response.data);
        setCategory(''); // Clear the input field after creating a category
      } catch (err) {
        console.log(err.response.data); // Log the response data to see details of the error
      }
    }
  };
  
  

  const getAllCategories = async () => {
    try {
      const response = await axios.get('/api/categoryall');
      setAllCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [category]);

  const handleCategoryDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const { data } = await axios.delete(`/api/category/${id}`);
        if (data) {
          const deleteCategory = allCategory.filter((category) => category._id !== id);
          setAllCategory(deleteCategory);
        } else {
          console.log('Something Went Wrong');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCategoryEdit = (id) => {
    // Implement category edit logic if needed
  };

  return (
    <div>
      <div>Create</div>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button onClick={handleCreateCategory}>Create</button>
      <ul>
        {allCategory.map((category) => (
          <div key={category._id}>
            <li>
              {category.name}
              <button onClick={() => handleCategoryEdit(category._id)}>Edit</button>
              <button onClick={() => handleCategoryDelete(category._id)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Create;
