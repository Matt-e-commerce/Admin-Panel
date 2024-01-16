import React, { Fragment, useEffect, useState } from "react";
import { Facebook, Linkedin, Twitter } from "react-feather";
import { Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { Btn, H4, P, H6, Image } from "../../../AbstractElements";
import { Link } from "react-router-dom";
import logoWhite from "../../../assets/images/logo/logo.png";
import logoDark from "../../../assets/images/logo/logo_dark.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  signUpAsync,
  signInAsync,
  logout,
  selectAuth,
} from "../../../features/authSlice";
const RegisterFrom = ({ logoClassMain, register, errors }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // // Accessing specific properties from the authentication state
    // const { isAuthenticated, userInfo, loading, error } = authState;
  const history = useNavigate();
  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  // function for sigup
  const signUpAdmin = async (event) => {
    event.preventDefault();
    // Validation
    const userData = { firstName, lastName, password, email };
    try {
      // Dispatch the signUpAsync thunk
      const response = await dispatch(signUpAsync(userData));
      console.log(response, "response=====>");

      if (response.type === "auth/signUp/fulfilled") {
        // If the signUpAsync succeeds, show a success toast
        toast.success("Sign-up successful!");

        // Redirect to the sign-in page
        history(`${process.env.PUBLIC_URL}/login`);
      } else {
        // Handle other status codes (optional)
        console.log(response.error.message, "error from server");
        toast.error(`Sign-up failed: ${response.error.message}`);
        reset()
      }
    } catch (error) {
      // If the signUpAsync fails, show an error toast
      toast.error(`Sign-up failed: ${error}`);
    }
  };
  useEffect(() => {
    console.log('asdfasdf')
  },[]);
  return (
    <Fragment>
      <div className="login-card">
        <div>
          <div>
            <Link
              className={`logo ${logoClassMain ? logoClassMain : ""}`}
              to={process.env.PUBLIC_URL}
            >
              <Image
                attrImage={{
                  className: "img-fluid for-light",
                  src: logoWhite,
                  alt: "looginpage",
                }}
              />
              <Image
                attrImage={{
                  className: "img-fluid for-dark",
                  src: logoDark,
                  alt: "looginpage",
                }}
              />
            </Link>
          </div>
          <div className="login-main">
            <Form className="theme-form login-form" onSubmit={signUpAdmin}>
              <H4>Create your account</H4>
              <P>Enter your personal details to create account</P>
              <FormGroup>
                <Label className="col-form-label m-0 pt-0">Your Name</Label>
                <Row className="g-2">
                  <Col xs="6">
                    <Input
                      className="form-control"
                      type="text"
                      value={firstName}
                      required
                      placeholder="Fist Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col xs="6">
                    <Input
                      className="form-control"
                      type="text"
                      value={lastName}
                      required
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label m-0 pt-0">Email Address</Label>
                <Input
                  className="form-control"
                  type="email"
                  // value={email}
                  required=""
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">Password</Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    value={password}
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="*********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="show-hide"
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    <span className={togglePassword ? "" : "show"}></span>
                  </div>
                </div>
              </FormGroup>
              <FormGroup className="m-0">
                <div className="checkbox">
                  <Input id="checkbox1" type="checkbox" />
                  <Label className="text-muted" for="checkbox1">
                    Agree with <span>Privacy Policy</span>
                  </Label>
                </div>
              </FormGroup>
              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Create Account
                </Btn>
              </FormGroup>
              {/* <div className='login-social-title'>
                <H6 attrH6={{ className: 'text-muted or mt-4' }}>Or Sign up with</H6>
              </div> */}
              {/* <div className='social my-4 '>
                <div className='btn-showcase'>
                  <a className='btn btn-light' href='https://www.linkedin.com/login' rel='noreferrer' target='_blank'>
                    <Linkedin className='txt-linkedin' /> LinkedIn
                  </a>
                  <a className='btn btn-light' href='https://twitter.com/login?lang=en' rel='noreferrer' target='_blank'>
                    <Twitter className='txt-twitter' />
                    twitter
                  </a>
                  <a className='btn btn-light' href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
                    <Facebook className='txt-fb' />
                    facebook
                  </a>
                </div>
              </div> */}
              <P attrPara={{ className: "mb-0 text-start" }}>
                Already have an account?
                <Link className="ms-2" to={`${process.env.PUBLIC_URL}/login`}>
                  Sign in
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default RegisterFrom;
