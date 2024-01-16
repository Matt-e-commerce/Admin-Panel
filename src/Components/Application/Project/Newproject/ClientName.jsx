import React, { Fragment ,useEffect, useState} from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { ClientName } from "../../../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { showBrand } from "../../../../Services/brandServices";
import { showCategory } from "../../../../Services/categoryServices";
const ClientNameClass = ({ register, errors }) => {
  const [brandData, setBrandData] = useState([]);
  const [cateData, setCateData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming showCategory returns a Promise or is asynchronous
        const categoryData = await dispatch(showCategory());
        setCateData(categoryData?.payload?.data?.Category);
        // console.log(categoryData?.payload?.data?.Category, 'categoryData');
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming showbrand returns a Promise or is asynchronous
        const brandData = await dispatch(showBrand());
        setBrandData(brandData?.payload?.data?.Brand);
        
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup>
            <Label>Modal</Label>
            <input
              className="form-control"
              type="text"
              placeholder="Modal Name"
              {...register("modal",{required:true})}
            />
            <span style={{ color: "red" }}>
              {errors.modal && "Model Name is required"}
            </span>
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>Brand</Label>
            {/* <input
              className="form-control"
              type="text"
              placeholder="Brand Name"
              {...register("brand")}
            /> */}
            {/* <span style={{ color: "red" }}>
              {errors.client_name && "Brand Name is required"}
            </span> */}
            <select {...register('brand',{ required: true })} className="form-control digits">
              <option value="">Select Brand</option>
              {brandData?.map((brand) => (
                <option key={brand.id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
            <span style={{ color: 'red' }}>{errors.brand && 'Brand is required'}</span>
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>Store</Label>
            <input
              className="form-control"
              type="text"
              placeholder="Store"
              {...register("store")}
            />
            {/* <span style={{ color: "red" }}>
              {errors.client_name && "Store Name is required"}
            </span> */}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="4">
          <FormGroup>
            <Label>Price</Label>
            <input
              className="form-control"
              type="number"
              name="price"
              min="0" 
              placeholder="price"
              {...register("price",{required:true})}
            />
            <span style={{ color: "red" }}>
              {errors.price && "Price Name is required"}
            </span>
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>Catetgory</Label>
            <select {...register('type',{ required: true })} className="form-control digits">
              <option value="">Select Type</option>
              {cateData?.map((category) => (
                <option key={category.id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            
            <span style={{ color: 'red' }}>{errors.type && 'Type is required'}</span>
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
          <Label>Discount</Label>
            <input
              className="form-control"
              type="number"
              name="discount"
              min="0"   // Sets the minimum value
              max="100" // Sets the maximum value
              placeholder="Enter Discount"
              {...register("discount")}
            />
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ClientNameClass;
