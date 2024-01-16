import { productColumns } from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Loader from "../../../../Layout/Loader";
import {
  showCustomer,
  getSingleCustomer,
  deleteCustomer,
} from "../../../../Services/customerServices";
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import "./hover.css";
// import CustomerDetailsModel from "./CustomerDetails"
const CustomerTableData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // New state variable to track initial loading
  const [initialLoading, setInitialLoading] = useState(true);
  const [keyForForceRender, setKeyForForceRender] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const CustomerData = useSelector(
    (state) => state?.customer?.customer?.data?.Customers
  );
  const toggleModal = () => setModalOpen(!modalOpen);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set initial loading to true only when the component mounts
        if (initialLoading) {
          setLoading(true);
        }

        // Replace with your actual API call
        const response = await dispatch(showCustomer());
        const data = response?.payload?.data?.Customer;

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
  }, [dispatch, keyForForceRender, modalOpen, initialLoading]);

  const handleDelete = async (id) => {
    showDeleteConfirmation(id);
  };
  const showDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };
  const handleShowPopUp = async (id, event) => {
    try {
      // ... rest of your code
      const singleProduct = await dispatch(getSingleCustomer(id));
      if (singleProduct) {
        setSelectedProduct(singleProduct?.payload?.data);

        // Navigate to the desired route with the customer data
        navigate(`/customer-details/dashboard`, {
          state: { customerData: singleProduct?.payload?.data },
        });
      } else {
        toast.error("Error fetching customer details");
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
      toast.error("Error fetching customer details");
    }
  };

  const confirmDelete = async (id) => {
    try {
      const removedData = await dispatch(deleteCustomer(id));
      if (removedData) {
        toast.error("Customer has been deleted successfully");
        setKeyForForceRender((key) => key + 1); // Trigger re-render
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting Customer:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const CustomerColumns = [
    {
      name: "Index",
      cell: (row, index) => <div>{index + 1}</div>,
      sortable: false,
      center: true,
      minWidth: "80px", // Adjusted minWidth
      maxWidth: "80px", // Adjusted maxWidth
    },
    {
      name: "Full Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      center: true,
      minWidth: "250px", // Adjusted minWidth
      maxWidth: "500px", // Adjusted maxWidth
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
      minWidth: "250px", // Adjusted minWidth
      maxWidth: "500px", // Adjusted maxWidth
      ignoreRowClick: true,
    },
    {
      name: "Contact",
      selector: (row) => row.phoneNumber,
      sortable: true,
      center: true,
      minWidth: "250px", // Adjusted minWidth
      maxWidth: "500px", // Adjusted maxWidth
      ignoreRowClick: true,
    },
    {
      name: "Start_Date",
      selector: (row) => {
        const date = new Date(row.createdAt);
        return date.toLocaleDateString(); // Adjust format as necessary
      },
      sortable: true,
      center: true,
      minWidth: "250px", // Adjusted minWidth
      maxWidth: "500px", // Adjusted maxWidth
      ignoreRowClick: true,
    },

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
        </div>
      ),
      sortable: true,
      center: true,
      minWidth: "150px", // Adjusted minWidth
      maxWidth: "150px", // Adjusted maxWidth
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
            {CustomerData && CustomerData?.length ? (
              <DataTable
                noHeader
                pagination
                paginationServer
                columns={CustomerColumns}
                data={CustomerData}
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
export default CustomerTableData;
