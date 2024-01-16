// import { productColumns } from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
// import { BsEyeFill } from "react-icons/bs";
// import { BsTrash3 } from "react-icons/bs";
// import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { showCategory } from "../../../../Services/categoryServices";
import { showBrand } from "../../../../Services/brandServices";
const EditModel = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  // console.log(editedProduct,'editedProduct')
  const variationsData = editedProduct?.variations
  const [variations, setVariations] = useState(variationsData);
  const [cateData, setCateData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const productType = editedProduct?.productType;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
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

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);
  const handleVariationChange = (index, field, value) => {
    setEditedProduct(prevState => {
      const updatedVariations = [...prevState.variations];
      updatedVariations[index] = {
        ...updatedVariations[index],
        [field]: value
      };
      return {
        ...prevState,
        variations: updatedVariations
      };
    });
  };
 
  
  // Log the 'editedProduct' state just before calling 'onSave'
  const handleSave = () => {
    // console.log("Saving editedProduct:", editedProduct);
    onSave(editedProduct);
  };

  // useEffect(() => {
  //   reset(editedProduct);
  // }, [editedProduct, reset]);

  return (
    <div>
      <Form className="theme-form" onSubmit={handleSubmit(handleSave)}>
        <Row>
          <Col>
            <FormGroup>
              <Label>Title</Label>
              <input
                className="form-control"
                type="text"
                placeholder="Product name *"
                {...register("name",{required:true})}
                defaultValue={editedProduct.name || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    name: e.target.value,
                  })
                }
              />
              <span style={{ color: "red" }}>
                {errors.name && "name is required"}
              </span>
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label>Brand</Label>

              <select
                {...register("brand")}
                value={editedProduct?.brand?._id || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    brand: {
                      _id: e.target.value,
                      brandName: e.target.options[e.target.selectedIndex].text,
                    },
                  })
                }
                className="form-control digits"
              >
                {/* <option value="">Select Brand</option> */}
                {brandData?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>

              {/* <span style={{ color: "red" }}>
                {errors.brand && "Brand Name is required"}
              </span> */}
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
                defaultValue={editedProduct.store}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    store: e.target.value,
                  })
                }
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
              <Label>Modal</Label>
              <input
                className="form-control"
                type="text"
                placeholder="Model Name"
                {...register("modal")}
                defaultValue={editedProduct.modal}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    modal: e.target.value,
                  })
                }
              />
              {/* <span style={{ color: "red" }}>
              {errors.model && "Model Name is required"}
            </span> */}
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label>Price</Label>
              <input
                className="form-control"
                type="text"
                name="price"
                placeholder="price"
                {...register("price")}
                defaultValue={editedProduct.price || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                  })
                }
              />
              {/* <span style={{ color: "red" }}>
              {errors.price && "Price Name is required"}
            </span> */}
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label>ProductRate</Label>
              <input
                className="form-control"
                type="number"
                name="productRate"
                placeholder="Enter project Rate"
                {...register("productRate")}
                defaultValue={editedProduct.productRate || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    productRate: e.target.value,
                  })
                }
              />
              {/* {errors.productRate && (
                <span style={{ color: "red" }}>
                  {errors.productRate.message}
                </span>
              )} */}
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Label>Type</Label>

              <select
                {...register("type")}
                value={editedProduct?.type?._id || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    type: {
                      _id: e.target.value,
                      categoryName:
                        e.target.options[e.target.selectedIndex].text,
                    },
                  })
                }
                className="form-control digits"
              >
                {/* <option value="">Select Type</option> */}
                {cateData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              {/* <span style={{ color: "red" }}>
                {errors.type && "Type is required"}
              </span> */}
            </FormGroup>
          </Col>
         
          <Col sm="4">
            <FormGroup>
              <Label>Availability</Label>
              {/* <Input
              type="select"
              // name="availability"
              placeholder="Select Availability"
              // defaultValue="In Stock"
              className="form-control digits"
              // {...register("availability")}
              // required
            > */}
              <select
                {...register("availability")}
                defaultValue={editedProduct.availability || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    availability: e.target.value,
                  })
                }
                className="form-control digits"
              >
                {/* <option value="">Select Availability</option> */}
                <option value="In Stock">In Stock</option>
                <option value="Out Stock">Out Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
              {/* </Input> */}
              {/* <span style={{ color: "red" }}>
                {errors.availability && "availability is required"}
              </span> */}
            </FormGroup>
          </Col>
        </Row>
        {productType == "variations" && variations.map((variation, index) => (
          
          <Row key={index}>
      
      <Col sm="4">
        <FormGroup>
          <Label htmlFor={`variations[${index}].size`}>Size</Label>
          <select
            {...register(`variations[${index}].size`, {
              required: true,
            })}
            defaultValue={variation?.size || ""}
            onChange={(e) =>
              handleVariationChange(index, "size", e.target.value)
            }
            className="form-control digits"
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          {variation.size === "" && (
            <span style={{ color: "red" }}>Size is required</span>
          )}
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup>
          <Label htmlFor={`variations[${index}].quantity`}>Quantity</Label>
          <input
            type="number"
            min="0" // Sets the minimum value
            {...register(`variations[${index}].quantity`, {
              required: true,
            })}
            defaultValue={variation?.quantity || ""}
            onChange={(e) =>
              handleVariationChange(index, "quantity", e.target.value)
            }
            className="form-control"
          />
          {variation.quantity === "" && (
            <span style={{ color: "red" }}>Quantity is required</span>
          )}
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup>
          <Label htmlFor={`variations[${index}].color`}>Color</Label>

          <input
            type="color"
            {...register(`variations[${index}].color`, {
              required: true,
            })}
            defaultValue={variation?.color || ""}
            onChange={(e) =>
              handleVariationChange(index, "color", e.target.value)
            }
            className="form-control form-control-color"
          />
          {variation.color === "" && (
            <span style={{ color: "red" }}>Color is required</span>
          )}
        </FormGroup>
      </Col>
     
    </Row>
    ))}
        <Row>
          <Col>
            <FormGroup>
              <Label>Details</Label>
              <textarea
                className="form-control"
                rows="3"
                {...register("description",{required:true})}
                defaultValue={editedProduct.description || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
              <span style={{ color: 'red' }}>{errors.description && 'Some Details is required'}</span>
            </FormGroup>
          </Col>
        </Row>
        <Btn attrBtn={{ color: "primary", className: "me-3" }}>update</Btn>
      </Form>
    </div>
  );
};
export default EditModel;
