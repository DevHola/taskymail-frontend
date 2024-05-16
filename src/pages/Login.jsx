import React, { useEffect, useState } from 'react';
import '../index.css';
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
import { login, fetchUser } from '../slices/Authslice';
import Cookies from 'js-cookie';

function Login() {
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
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handle_login = (e) => {
    e.preventDefault();
    dispatch(login(inputValue))
      .then((result) => {
        if (result.payload && result.payload) {
          dispatch(fetchUser()); 
        }
      });
  };
  

  return (
    <MDBContainer fluid className="p-4" style={{ height: '100vh', backgroundColor: 'hsl(0, 0%, 96%)' }}>
      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>
          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Login Detail:<br></br>
            Email: testuser@yahoo.com<br></br>
            Password: admin1234   </p>
        </MDBCol>

        <MDBCol md="5">
          <form onSubmit={handle_login}>
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  onChange={handleOnChange}
                  value={email}
                  name="email"
                  required
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  onChange={handleOnChange}
                  value={password}
                  name="password"
                  required
                  type="password"
                />
                <MDBBtn className="w-100 mb-4" type="submit" size="md" disabled={loading}>
                  Login
                </MDBBtn>
                <div className="text-center">
                  <p className="" style={{ color: '#5c5c5c' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#3b71ca' }} className="">
                      Register here
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

export default Login;
