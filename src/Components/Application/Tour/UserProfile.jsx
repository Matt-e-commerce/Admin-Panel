import React, { Fragment, useEffect } from "react";
import { Col, Card, CardHeader, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { H6, Image } from "../../../AbstractElements";
import {
  getSingleAdmin,
  updateProfileAdmin,
} from "../../../Services/adminServices";
const UserProfile = () => {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin?.admin?.data?.admin);

  useEffect(() => {
    if (adminData && adminData.profilePic) {
      // Handle the profile picture logic here if needed
    }
  }, [adminData]);

  useEffect(() => {
    dispatch(getSingleAdmin());
  }, [dispatch]);

  return (
    <Fragment>
      <Col sm="12">
        <Card className="hovercard text-center">
          <CardHeader className="cardheader"></CardHeader>
          <div className="user-image">
            <div className="avatar">
              <Image
                attrImage={{
                  className: "step1",
                  alt: "",
                  src:
                    adminData?.profilePic ||
                    require("../../../assets/images/user/7.jpg"),
                }}
              />
            </div>
          </div>
          <div className="info">
            <Row className="step3" data-intro="This is the your details">
              <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                <Row>
                  <Col md="6">
                    <div className="ttl-info text-start">
                      <H6>
                        <i className="fa fa-envelope me-2"></i> Email
                      </H6>
                      <span>{adminData?.email}</span>
                    </div>
                  </Col>
                  {/* <Col md="6">
                    <div className="ttl-info text-start ttl-sm-mb-0">
                      <H6>
                        <i className="fa fa-calendar me-2"></i>
                        {BOD}
                      </H6>
                      <span>{DDMMYY}</span>
                    </div>
                  </Col> */}
                </Row>
              </Col>
              <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                <div className="user-designation">
                  <div className="title">
                    <a target="_blank" href="#javascript">
                      {adminData?.firstName} {adminData?.lastName}
                    </a>
                  </div>
                  <div className="desc mt-2">{adminData?.role}</div>
                </div>
              </Col>
              <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                <Row>
                  <Col md="6">
                    <div className="ttl-info text-start ttl-xs-mt">
                      <H6>
                        <i className="fa fa-phone me-2"></i>
                        ContactUs
                      </H6>
                      <span>{adminData?.phoneNumber}</span>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="ttl-info text-start ttl-sm-mb-0">
                      <h6 className="mb-3">
                        <i className="fa fa-location-arrow me-2"></i>
                        Location
                      </h6>
                      <p className="mb-0">
                        {adminData?.address?.country}{" "}
                        {adminData?.address?.state}{" "}
                        {adminData?.address?.zipCode}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <div
              className="social-media step4"
              data-intro="This is your Social details"
            ></div>
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default UserProfile;
