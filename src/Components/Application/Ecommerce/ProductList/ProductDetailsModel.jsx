import React, { Fragment, useEffect, useState } from "react";
import ImagesCellSingleProduct from "./imagesCellSingleProduct";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const ProductDetailsModel = ({ selectedProduct, toggleModal, modalOpen }) => {
  return (
    <>
      {/* Reactstrap Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Product Details</ModalHeader>

        <ModalBody>
          {/* Render the product details and images inside the modal */}
          <div>
            {/* Display product name and description */}
            <Card>
              <CardBody>
                <CardTitle tag="h2">{selectedProduct?.name}</CardTitle>
                <CardText>{selectedProduct?.description}</CardText>

                {/* Display images or "No Image Available" message */}
                {selectedProduct?.images ? (
                  <ImagesCellSingleProduct
                    images={selectedProduct?.images}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                ) : (
                  <p>No Image Available</p>
                )}
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductDetailsModel;
