import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/Authslice';
import Cookies from 'js-cookie';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/Dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      navigate('/Dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-left' });
    }
  }, [error]);

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handle_register = (e) => {
    e.preventDefault();
    dispatch(register(inputValue));
  };

  return (
    <MDBContainer fluid className="p-4" style={{ height: '100vh', backgroundColor: 'hsl(0, 0%, 96%)' }}>
      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>
        </MDBCol>

        <MDBCol md="5">
          <form onSubmit={handle_register}>
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  required
                  name="name"
                  value={name}
                  onChange={handleOnChange}
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  required
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  type="password"
                />
                <MDBBtn className="w-100 mb-4" type="submit" size="md" disabled={loading}>
                  Sign up
                </MDBBtn>
                <div className="text-center">
                  <p className="" style={{ color: '#5c5c5c' }}>
                    Already have an account?{' '}
                    <Link to="/" style={{ color: '#3b71ca' }} className="">
                      Login here
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
        <ToastContainer />
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
