import React, { useState } from 'react';
import axios from '../Api_Resources/axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(16),
  role: yup.string().required(),
  username: yup.string().required(),
  number: yup.string().required(),
});

export default function Register() {
  const [serverErrors, setServerErrors] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
      username: '',
      number: '',
    },
    validateOnChange: false,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        setServerErrors('');
        const response = await axios.post('/api/user/register', values);
        toast.success(`Hello ${response.data}! Successfully registered your Account!`);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        console.error(err);
        setServerErrors(err.response.data.error);
        toast.error(err.response.data.error[0].msg);

        console.log(serverErrors);
      }
    },
  });

  return (
    <div className="container mt-6 position-relative">
      <div className="row">
        <div className="col-md-6">
          <h2 className="fs-1">Sign Up</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className={`form-control ${formik.errors.username ? 'is-invalid' : ''}`}
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <div className="invalid-feedback">{formik.errors.username}</div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="invalid-feedback">{formik.errors.email}</div>
            </div>

            {/* Number */}
            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Number:
              </label>
              <input
                type="text"
                className={`form-control ${formik.errors.number ? 'is-invalid' : ''}`}
                id="number"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
              <div className="invalid-feedback">{formik.errors.number}</div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="invalid-feedback">{formik.errors.password}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              <select
                className={`form-select ${formik.errors.role ? 'is-invalid' : ''}`}
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="Customer">Customer</option>
                <option value="Organiser">Organiser</option>
              </select>
              <div className="invalid-feedback">{formik.errors.role}</div>
            </div>
            <div className="serverError">
              <ToastContainer />
              {/* {serverErrors && serverErrors.map((ele) => <span style={{ color: 'red' }}>{ele.msg}</span>)} */}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                Already Registered <Link to="/login">Login</Link>
              </div>
              <button type="submit" className="btn btn-dark">
                Signup
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 ">
          <img src="" alt="Registration" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
