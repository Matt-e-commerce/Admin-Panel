import React, { Fragment } from "react";
import { Container, Row, Col, Form } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import BasicFormControlClass from "./BasicFormControl";

const BaseInput = () => {
 
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Category Inputs"
        parent="Forms"
        title="Category Inputs"
        subParent="Forms Controls"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
              <BasicFormControlClass  />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BaseInput;
