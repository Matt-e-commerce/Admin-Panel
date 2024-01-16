import { productColumns } from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Loader from "../../../../Layout/Loader";
import { showOrder, deleteOrder } from "../../../../Services/orderServices";
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import "./hover.css";
const CategoryTableData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // New state variable to track initial loading
  const [initialLoading, setInitialLoading] = useState(true);
  const [keyForForceRender, setKeyForForceRender] = useState(0);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletionReason, setDeletionReason] = useState("");

  const orderData = useSelector((state) => state?.order?.order?.data?.Order);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set initial loading to true only when the component mounts
        if (initialLoading) {
          setLoading(true);
        }

        // Replace with your actual API call
        const response = await dispatch(showOrder());
        const data = response?.payload?.data?.Order;

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
  }, [dispatch, keyForForceRender, initialLoading]);

  // useEffect(() => {
  //   dispatch(showCategory());
  // }, [dispatch, keyForForceRender,editModalOpen]);
  // Columns definition (replace with your actual columns)

  const handleDelete = async (id) => {
    showDeleteConfirmation(id);
  };
  const showDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  // Modify the confirmDelete function to accept a single parameter
  const confirmDelete = async (dataDelete) => {
    try {
      const removedData = await dispatch(deleteOrder(dataDelete));
      if (removedData.type === "deleteOrder/fulfilled") {
        toast.error("Order has been deleted successfully");
        setKeyForForceRender((key) => key + 1); // Trigger re-render
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  };
  
  const orderColumns = [
    {
      name: "Index",
      cell: (row, index) => <div>{index + 1}</div>, // Displaying index + 1 to start from 1
      sortable: false,
      center: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "Order ID",
      selector: (row) => row._id,
      sortable: true,
      center: true,
      minWidth: "200px",
      maxWidth: "300px",
    },
    // {
    //   name: "Payment Method",
    //   selector: (row) => row.payment.method,
    //   sortable: true,
    //   center: true,
    //   minWidth: "200px",
    //   maxWidth: "300px",
    // },
    {
      name: "Amount",
      selector: (row) => row.payment.amount,
      sortable: true,
      center: true,
      minWidth: "200px",
      maxWidth: "300px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      minWidth: "200px",
      maxWidth: "300px",
    },
    {
      name: "Item Count",
      selector: (row) => row.itemCount,
      sortable: true,
      center: true,
      minWidth: "200px",
      maxWidth: "300px",
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
        <ModalBody>
          <p>Are you sure you want to delete this order?</p>
          <div className="mb-3">
            <label htmlFor="deletionReason" className="form-label">
              Please provide a reason for deletion:
            </label>
            <textarea
              className="form-control"
              id="deletionReason"
              rows="3"
              placeholder="Enter reason for deletion"
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
            ></textarea>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (deletionReason.trim() !== "") {
                // Check if the deletion reason is provided
                setShowConfirmModal(false);
                confirmDelete({ _id: productIdToDelete, deletionReason: deletionReason });
              } else {
                toast.error("Please provide a reason for deletion");
              }
            }}
          >
            Delete
          </Button>

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
            {orderData && orderData?.length ? (
              <DataTable
                noHeader
                pagination
                paginationPerPage={10} /* Number of items per page */
                paginationRowsPerPageOptions={[10, 20, 30]} /* Options for items per page */
                columns={orderColumns}
                data={orderData}
                highlightOnHover={true}
                striped={true}
                responsive={true}
                keyField="_id" // Ensure a unique key field is specified
              />
            ) : (
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
          </div>
          <ToastContainer />
        </div>
      )}
    </Fragment>
  );
};
export default CategoryTableData;
