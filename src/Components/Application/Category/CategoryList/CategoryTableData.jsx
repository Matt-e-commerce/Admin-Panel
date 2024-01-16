import { productColumns } from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Loader from "../../../../Layout/Loader";
import EditModel from "./EditModel";
import "./hover.css";
import {
  createCategory,
  showCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../../../../Services/categoryServices";
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
const CategoryTableData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // New state variable to track initial loading
  const [initialLoading, setInitialLoading] = useState(true);
  const [keyForForceRender, setKeyForForceRender] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const categoryData = useSelector(
    (state) => state?.category?.category?.data?.Category
  );
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Show loading state only on the initial fetch
        if (initialLoading) {
          setLoading(true);
        }

        // Replace with your actual API call
        const response = await dispatch(showCategory());
        const data = response?.payload?.data?.Category;

        // Update state after fetching data
        setLoading(false); // Set loading to false after data is fetched
        setInitialLoading(false); // Disable initial loading state
        // Handle data updates (e.g., update productData)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors (e.g., show error message)
      }
    };

    fetchData();
  }, [dispatch, keyForForceRender, editModalOpen, initialLoading]);

  const handleDelete = async (id) => {
    showDeleteConfirmation(id);
  };
  const showDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  const handleUpdatePopUp = async (id) => {
    try {
      const singleProduct = await dispatch(getSingleCategory(id));
      if (singleProduct) {
        setSelectedProduct(singleProduct?.payload?.data);
        setEditModalOpen(true);
      } else {
        toast.error("Error fetching category details");
      }
    } catch (error) {
      toast.error("Error fetching cateogory details", error);
    }
  };
  const handleEditSave = async (updatedProduct) => {
    try {
      // Call your updateProduct service with updatedProduct
      const updatedData = await dispatch(updateCategory(updatedProduct));
      console.log(updatedData, "updatedData");
      if (updatedData?.type == "updateCategory/fulfilled") {
        toast.success("Category has been updated successfully");
        setEditModalOpen(false);
        // Optionally, you can trigger a re-render or fetch updated data
      } else {
        toast.error("Something went wrong");
        setEditModalOpen(false);
      }
    } catch (error) {
      // console.error("Error updating product:", error);
      toast.error("Error updating category", error);
    }
  };
  const confirmDelete = async (id) => {
    try {
      const removedData = await dispatch(deleteCategory(id));
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

  const categoryColumns = [
    {
      name: "Index",
      cell: (row, index) => <div>{index + 1}</div>, // Displaying index + 1 to start from 1
      sortable: false,
      center: true,
      minWidth: "100px",
      maxWidth: "100px",
    },

    {
      name: "Category Name",
      selector: (row) => row.categoryName,
      sortable: true,
      center: true,
      minWidth: "400px",
      maxWidth: "800px",
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <BsTrash3
            className="icon"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => handleDelete(row._id)}
          />
          &nbsp;&nbsp;
          <FaEdit
            className="icon"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => handleUpdatePopUp(row._id)}
          />
        </div>
      ),
      sortable: true,
      center: true,
      minWidth: "200px",
      maxWidth: "200px",
    },
  ];

  return (
    <Fragment>
      {/* Edit Form Modal */}
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
      <Modal isOpen={editModalOpen} toggle={handleEditCancel}>
        <ModalHeader toggle={handleEditCancel}>Edit Category</ModalHeader>
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

      {!initialLoading && (
        <div>
          {/* ... (rest of the component code) */}
          <div className="table-responsive ">
            {categoryData && categoryData?.length ? (
              <DataTable
                noHeader
                pagination
                paginationServer
                columns={categoryColumns}
                data={categoryData}
                highlightOnHover={true}
                striped={true}
                responsive={true}
                keyField="_id" // Ensure a unique key field is specified
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
export default CategoryTableData;
