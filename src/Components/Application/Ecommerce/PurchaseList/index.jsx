import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import { Container, Row } from 'reactstrap';

import OrderHistoryTableCard from './OrderHistoryTableCard';

const OrderHistoryContain = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Ecommerce' title='Purchase History' mainTitle='Purchase   History' />
      <Container fluid={true} className='orderhistory'>
        <Row>
          <OrderHistoryTableCard />
        </Row>
      </Container>
    </Fragment>
  );
};
export default OrderHistoryContain;
