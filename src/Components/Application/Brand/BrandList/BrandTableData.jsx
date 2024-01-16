import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Loader from "../../../../Layout/Loader";
import EditModel from "./EditModel";
import "./hover.css";
import {
  showBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "../../../../Services/brandServices";
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
const BrandTableData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // New state variable to track initial loading
  const [initialLoading, setInitialLoading] = useState(true);
  const [keyForForceRender, setKeyForForceRender] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [BrandIdToDelete, setBrandIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const brandData = useSelector(
    (state) => state?.brand?.brand?.data?.Brand
  );
  const brandDataState = useSelector(
    (state) => state?.brand?.brand
  );
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set initial loading to true only when the component mounts
        if (initialLoading) {
          setLoading(true);
        }

        // Replace with your actual API call
        const response = await dispatch(showBrand());
        const data = response?.payload?.data?.Brand;

        // Update state after fetching data
        setLoading(false); // Set loading to false after data is fetched
        setInitialLoading(false); // Disable initial loading state
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors (e.g., show error message)
      }
    };

    fetchData();
  }, [dispatch, keyForForceRender, editModalOpen, initialLoading]);

  // useEffect(() => {
  //   dispatch(showCategory());
  // }, [dispatch, keyForForceRender,editModalOpen]);
  // Columns definition (replace with your actual columns)

  const handleDelete = async (id) => {
    showDeleteConfirmation(id);
  };
  const showDeleteConfirmation = (id) => {
    setBrandIdToDelete(id);
    setShowConfirmModal(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  const handleUpdatePopUp = async (id) => {
    try {
      const singleBrand = await dispatch(getSingleBrand(id));
      if (singleBrand) {
        setSelectedBrand(singleBrand?.payload?.data);
        setEditModalOpen(true);
      } else {
        toast.error("Error fetching brand details");
      }
    } catch (error) {
      toast.error("Error fetching brand details", error);
    }
  };
  const handleEditSave = async (updatedBrand) => {
    try {
      // Call your updateBrand service with updatedBrand
      const updatedData = await dispatch(updateBrand(updatedBrand));
      console.log(updatedData, "updatedData");
      if (updatedData?.type == "updateBrand/fulfilled") {
        toast.success("Brand has been updated successfully");
        setEditModalOpen(false);
        // Optionally, you can trigger a re-render or fetch updated data
      } else {
        toast.error("Something went wrong");
        setEditModalOpen(false);
      }
    } catch (error) {
      // console.error("Error updating Brand:", error);
      toast.error("Error updating brand", error);
    }
  };
  const confirmDelete = async (id) => {
    try {
      const removedData = await dispatch(deleteBrand(id));
      if (removedData) {
        toast.error("Brand has been deleted successfully");
        setKeyForForceRender((key) => key + 1); // Trigger re-render
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting Brand:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const brandColumns = [
    {
      name: "Index",
      cell: (row, index) => <div>{index + 1}</div>, // Displaying index + 1 to start from 1
      sortable: false,
      center: true,
      minWidth: "100px",
      maxWidth: "100px",
    },

    {
      name: "Brand Name",
      selector: (row) => row.brandName,
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
        <ModalBody>Are you sure you want to delete this Brand?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setShowConfirmModal(false);
              confirmDelete(BrandIdToDelete);
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
          {selectedBrand && (
            <EditModel
              Brand={selectedBrand}
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
        {brandDataState===null && (
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

      {!initialLoading  && (
        <div>
          {/* ... (rest of the component code) */}
          <div className="table-responsive Brand-table">
            {brandData && brandData?.length ? (
              <DataTable
                noHeader
                pagination
                paginationServer
                columns={brandColumns}
                data={brandData}
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
export default BrandTableData;
