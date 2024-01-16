import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import CustomerDetails from "../CustomerList/CustomerDetails";

const UsersProfileContain = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="User Profile" parent="Users" title="User Profile" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <CustomerDetails/>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default UsersProfileContain;
