import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import { ProductListDesc, ProductListTitle } from '../../../../Constant';
import CustomerTableData from './CustomerTableData';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import HeaderCard from '../../../Common/Component/HeaderCard';

const ProductListContain = () => {
    return (
        <Fragment>
            <Breadcrumbs parent="Ecommerce" title="Customer List" mainTitle="Customers List" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <HeaderCard title={ProductListTitle} span1={ProductListDesc} /> */}
                            <CardBody>
                                <CustomerTableData />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default ProductListContain;