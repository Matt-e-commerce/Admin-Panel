import React from 'react';
import { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { P } from '../../AbstractElements';

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md="12" className="footer-copyright text-center">
              <P attrPara={{ className: "mb-0" }}>{'Copyright 2023 © MATT .'}</P>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
};

export default Footer;