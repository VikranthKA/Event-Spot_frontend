import React, { useState, useRef } from 'react';
import axios from '../Api_Resources/axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';

const loginValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(16),
});

export default function Login() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState('');
  const snackbarRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('api/user/login', values);
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        setTimeout(() => {
          navigate('/ActualProfile/:profileId');
        }, 2000);
        snackbarRef.current.show("Login Successful!", "success");
      } catch (e) {
        setServerErrors(e.response.data.errors);
        snackbarRef.current.show("Login Failed. Check your credentials and try again.", "fail");
        console.error(e);
      }
    },
  });

  return (
    <div className="container mt-6 position-relative">
      <h2 className="fs-1">Log in</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={formik.handleSubmit}>
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

            <button
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>

            <br />
            <br />
            <span>Not a user?</span>
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>

      {serverErrors && <div className="alert alert-danger mt-3">{serverErrors}</div>}

      <Snackbar ref={snackbarRef} />
    </div>
  );
}
