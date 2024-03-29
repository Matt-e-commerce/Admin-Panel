import { productColumns } from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { showCategory } from "../../../../Services/categoryServices";
const EditModel = ({ Brand, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(Brand);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEditedProduct(Brand);
  }, [Brand]);

  // Log the 'editedProduct' state just before calling 'onSave'
  const handleSave = () => {
    // console.log("Saving editedProduct:", editedProduct);
    onSave(editedProduct);
  };


  return (
    <div>
      <Form className="theme-form" onSubmit={handleSubmit(handleSave)}>
        <Row>
          <Col>
            <FormGroup>
              <Label>Brand-Name</Label>
              <input
                className="form-control"
                type="text"
                placeholder="Brand name *"
                {...register("brandName")}
                defaultValue={editedProduct?.brandName || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    brandName: e.target.value,
                  })
                }
              />
              <span style={{ color: "red" }}>
                {errors.brandName&& "Brand-Name is required"}
              </span>
            </FormGroup>
          </Col>
        </Row>

        <Btn attrBtn={{ color: "success", className: "me-3" }}>update</Btn>
      </Form>
    </div>
  );
};
export default EditModel;
