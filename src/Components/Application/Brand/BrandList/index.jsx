import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements'
import BrandTableData from './BrandTableData';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import HeaderCard from '../../../Common/Component/HeaderCard';

const ProductListContain = () => {
    return (
        <Fragment>
            <Breadcrumbs parent="Ecommerce" title="Brand List" mainTitle="Brands List" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <HeaderCard title={ProductListTitle} span1={ProductListDesc} /> */}
                            <CardBody>
                                <BrandTableData />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default ProductListContain;