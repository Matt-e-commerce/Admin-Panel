import React, { Fragment } from 'react';
import { Col, FormGroup,  Label, Row } from 'reactstrap';
import { ProjectTitle } from '../../../../Constant';

const ProjectTitleClass = ({ register, errors }) => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Title</Label>
                        <input className="form-control" type="text" placeholder="Product name *" {...register('name',{ required: true })} />
                        <span style={{ color: 'red' }}>{errors.name && 'name is required'}</span>
                    </FormGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ProjectTitleClass;