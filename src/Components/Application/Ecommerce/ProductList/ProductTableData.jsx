import { productColumns } from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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
import Loader from "../../../../Layout/Loader";
import EditModel from "./EditModel";
import ProductDetailsModel from "./ProductDetailsModel";
import ImageCell from "./imagesCell";
import ImagesCellSingleProduct from "./imagesCellSingleProduct";
import "./hover.css";

import {
  showProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  updatewhishList,
} from "../../../../Services/productServices";
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";

const ProductTableData = () => {
  const dispatch = useDispatch();
  const [keyForForceRender, setKeyForForceRender] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const productData = useSelector(
    (state) => state?.product?.product?.data?.Product
  );
  const productDataState = useSelector(
    (state) => state?.product?.product
  );

  const toggleModal = () => setModalOpen(!modalOpen);
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set initial loading to true only when the component mounts
        if (initialLoading) {
          setLoading(true);
        }
        const currentPage = 1; // Change this to get the current page from your state or props
        // Directly await the dispatch call
        const response = await dispatch(showProduct());
        const data = response?.payload?.data?.Product;
  
        // Remove the setTimeout as it's no longer needed
        setLoading(false); // Set loading to false after data is fetched
        // Set initial loading to false after the first data fetch
        setInitialLoading(false);
  
        // Handle data as needed (update productData, etc.)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };
  
    fetchData();
  }, [dispatch, editModalOpen, modalOpen, keyForForceRender, initialLoading, productData]);
  
  // Columns definition (replace with your actual columns)
  const handleDelete = async (id) => {
    showDeleteConfirmation(id);
  };
  const confirmDelete = async (id) => {
    try {
      const removedData = await dispatch(deleteProduct(id));
      if (removedData) {
        toast.error("Product has been deleted successfully");
        setKeyForForceRender((key) => key + 1); // Trigger re-render
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const showDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  const handleShowPopUp = async (id, event) => {
    try {
      // ... rest of your code
      const singleProduct = await dispatch(getSingleProduct(id));
      if (singleProduct) {
        setSelectedProduct(singleProduct?.payload?.data);
        toggleModal();
      } else {
        toast.error("Error fetching product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error (e.g., show a notification)
      toast.error("Error fetching product details");
    }
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  const handleUpdatePopUp = async (id) => {
    try {
      const singleProduct = await dispatch(getSingleProduct(id));
      if (singleProduct) {
        setSelectedProduct(singleProduct?.payload?.data);
        setEditModalOpen(true);
      } else {
        toast.error("Error fetching product details");
      }
    } catch (error) {
      toast.error("Error fetching product details");
    }
  };
  const handleLike = async (productData) => {
    try {
      const whishListProduct = await dispatch(updatewhishList(productData));
      console.log(whishListProduct);
      if (whishListProduct?.type == "whishListProduct/fulfilled") {
        toast.success("WhishList updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error fetching whishList details", error.message);
    }
  };

  const handleEditSave = async (updatedProduct) => {
    try {
      // Call your updateProduct service with updatedProduct
      const updatedData = await dispatch(updateProduct(updatedProduct));
      if (updatedData?.type == "updateProduct/fulfilled") {
        toast.success("Product has been updated successfully");
        setEditModalOpen(false);
        // Optionally, you can trigger a re-render or fetch updated data
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      // console.error("Error updating product:", error);
      toast.error("Error updating product", error);
    }
  };
  const productColumns = [
    {
      name: "Index",
      cell: (row, index) => <div>{index + 1}</div>, // Displaying index + 1 to start from 1
      sortable: false,
      center: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "image",
      cell: (row) => <ImageCell images={row.images} />,
      sortable: true,
      center: true,
      minWidth: "100px",
      maxWidth: "100px",
    },

    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "Details",
      selector: (row) => row.description,
      sortable: true,
      center: true,
      wrap: true,
      minWidth: "400px",
    },
    {
      name: "Amount",
      selector: (row) => row.price,
      sortable: true,
      center: true,
      minWidth: "100px",
      maxWidth: "150px",
    },
    {
      name: "Stock",
      selector: (row) => row.availability,
      sortable: true,
      center: true,
      minWidth: "120px",
      maxWidth: "150px",
    },
    // {
    //   name: 'Start_date',
    //   selector: (row) => row.updatedAt,
    //   sortable: true,
    //   center: true,
    //   minWidth: '120px',
    //   maxWidth: '150px',
    // },
    {
      name: "Action",
      cell: (row) => (
        
        <div>
          <BsEyeFill
            className="icon"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={(event) => handleShowPopUp(row._id, event)}
          />{" "}
          &nbsp;&nbsp;
          <BsTrash3
            className="icon"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => handleDelete(row._id)}
          />
          &nbsp;&nbsp;
          <FaEdit
            className="icon"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={(event) => handleUpdatePopUp(row._id, event)}
          />
          &nbsp;&nbsp;
          <BsHeartFill
          
            className={row?.isWhished ? "iconLike" : ""}
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => handleLike(row._id)}
          />
        </div>
      ),
      
      sortable: true,
      center: true,
      minWidth: "160px",
      maxWidth: "160px",
    },
  ];

  return (
    <Fragment>
      <Modal
        isOpen={showConfirmModal}
        toggle={() => setShowConfirmModal(false)}
      >
        <ModalHeader toggle={() => setShowConfirmModal(false)}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this product?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setShowConfirmModal(false);
              confirmDelete(productIdToDelete);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="warning" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/*  product details */}
      <ProductDetailsModel
        selectedProduct={selectedProduct}
        toggleModal={toggleModal}
        modalOpen={modalOpen}
      />
      {/* Edit Form Modal */}
      <Modal
        isOpen={editModalOpen}
        toggle={handleEditCancel}
        style={{ maxWidth: "60%", margin: "1.75rem auto", padding: "20px" }}
      >
        <ModalHeader toggle={handleEditCancel}>Edit Product</ModalHeader>
        <ModalBody>
          {selectedProduct && (
            <EditModel
              product={selectedProduct}
              onSave={handleEditSave}
              onCancel={handleEditCancel}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleEditCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {initialLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
        {productDataState===null && (
          <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#666",
            fontSize: "18px"
          }}
        >
          No records found.
        </div>
      )}
      {!initialLoading && (
        <div>
          {/* ... (rest of the component code) */}
          {/* className="table-responsive product-table" */}
          <div className="">
            {productData && productData.length ? (
              <DataTable
              noHeader
              pagination
              paginationPerPage={10} /* Number of items per page */
              paginationRowsPerPageOptions={[10, 20, 30]} /* Options for items per page */
              columns={productColumns}
              data={productData}
              highlightOnHover={true}
              striped={true}
              responsive={true}
              keyField="_id"
              />
            ) : (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 999, // Adjusted zIndex value
                }}
              >
                <Loader />
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      )}
    </Fragment>
  );
};
export default ProductTableData;
