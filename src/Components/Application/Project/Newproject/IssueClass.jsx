import React, { Fragment, createRef, useEffect, useState } from "react";
import { Col, Form, FormGroup, Label, Input, Row, Button } from "reactstrap";

import { useForm, Controller } from "react-hook-form";

const IssueClass = ({
  register,
  errors,
  selectedProductType,
  setSelectedProductType,
  setValue,
  getValues
}) => {
 
  
  return (
    <Fragment>
      {selectedProductType === "simple" &&  (
        <Row>
          <Col sm="4">
            <FormGroup>
              <Label>Color</Label>
              <input
                className="form-control "
                type="color"
                placeholder="Color"
                {...register("color")}
              />
              {/* <span style={{ color: "red" }}>
              {errors.modal && "Color Name is required"}
            </span> */}
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label>Quantity</Label>
              <input
                className="form-control"
                type="number"
                min="0" 
                placeholder="Quantity"
                {...register("quantity")}
              />
              {/* <span style={{ color: "red" }}>
              {errors.modal && "Quantity Name is required"}
            </span> */}
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label>Size</Label>
              <select {...register("size")} className="form-control digits">
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </FormGroup>
          </Col>
        </Row>
      )}
       <Row>
        <Col sm="4">
          <FormGroup>
            <Label>Availability</Label>
            <select
              {...register("availability")}
              defaultValue="In Stock"
              placeholder="Select availability"
              className="form-control digits"
            >
              <option value="In Stock">Select Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Out Stock">Out Stock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
            {/* <span style={{ color: 'red' }}>{errors.brand && 'Brand is required'}</span> */}
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>ProductType</Label>
            <select
              {...register("productType")}
              defaultValue="simple"
              onChange={(e) => setSelectedProductType(e.target.value)}
              placeholder="Select Product Type"
              className="form-control digits"
            >
              <option value="simple">Select Type</option>
              <option value="simple">Simple Product</option>
              <option value="variations">Variation Product</option>
            </select>
            {/* <span style={{ color: 'red' }}>{errors.brand && 'Brand is required'}</span> */}
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default IssueClass;
