import React, { Fragment, useEffect, useState } from "react";
import { Btn, H4 } from "../../../../AbstractElements";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  getSingleAdmin,
  updateProfileAdmin,
} from "../../../../Services/adminServices";
import { resetadmin } from "../../../../features/adminSlice";

const EditMyProfile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const adminData = useSelector((state) => state.admin?.admin?.data?.admin);
  const [editedProduct, setEditedProduct] = useState(adminData);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onEditSubmit = async (data) => {
    try {
      // Ensure you have the _id in your data object
      if (adminData?._id) {
        data._id = adminData._id;
      }
      console.log(data, "data on submissions");
      // Call your updateProduct service with updatedProduct
      const updatedData = await dispatch(updateProfileAdmin(data));
      console.log(updatedData, "updatedData");
      if (updatedData?.type == "updateProfileAdmin/fulfilled") {
        toast.success("Profile has been updated successfully");
        history(`${process.env.PUBLIC_URL}/app/users/profile/dashboard`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      // console.error("Error updating product:", error);
      toast.error("Error updating product", error.message);
    }
  };

  useEffect(() => {
    if (adminData) {
      setValue("email", adminData?.email);
      setValue("bio", adminData?.bio);
      setValue("firstName", adminData?.firstName);
      setValue("lastName", adminData?.lastName);
      setValue("state", adminData?.address?.state);
      setValue("country", adminData?.address?.country);
      setValue("zipCode", adminData?.address?.zipCode);
      setValue("city", adminData?.address?.city);
      setValue("phoneNumber", adminData?.phoneNumber);
      setValue("bio", adminData?.bio);
      // Similarly, you can set other values as well
    }
  }, [adminData, setValue]);

  useEffect(() => {
    dispatch(getSingleAdmin()).then((response) => {
      if (response && response.payload && response.payload.data) {
        setEditedProduct(response?.payload?.data?.admin);
      }
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Form className="card" onSubmit={handleSubmit(onEditSubmit)}>
        <CardHeader>
          <H4 attrH4={{ className: "card-title mb-0" }}>EditProfile</H4>
          <div className="card-options">
            <a className="card-options-collapse" href="#javascript">
              <i className="fe fe-chevron-up"></i>
            </a>
            <a className="card-options-remove" href="#javascript">
              <i className="fe fe-x"></i>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <FormGroup>
                {" "}
                <Label className="form-label">EmailAddress</Label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  defaultValue={editedProduct?.email || ""}
                />
                <span style={{ color: "red" }}>
                  {errors.email && "EmailAddress is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label className="form-label">FirstName</Label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  defaultValue={editedProduct?.firstName || ""}
                />
                <span style={{ color: "red" }}>
                  {errors.firstName && "FirstName is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label className="form-label">LastName</Label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                  defaultValue={editedProduct?.lastName || ""}
                />
                {errors.lastName && (
                  <span style={{ color: "red" }}>LastName is required</span>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label className="form-label">State</Label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="State"
                  {...register("state", { required: true })}
                  defaultValue={editedProduct?.address?.state || ""}
                />
                <span style={{ color: "red" }}>
                  {errors.state && "State is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                {" "}
                <Label className="form-label">City</Label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                  defaultValue={editedProduct?.address?.city || ""}
                />
                <span style={{ color: "red" }}>
                  {errors.city && "City is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label className="form-label">PostalCode</Label>
                <input
                  className="form-control"
                  type="number"
                  {...register("zipCode", { required: true })}
                  defaultValue={editedProduct?.address?.zipCode || ""}
                  placeholder="ZIP Code"
                />
                <span style={{ color: "red" }}>
                  {errors.zipCode && "ZipCode is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label className="form-label">Country</Label>
                <input
                  className="form-control"
                  type="text"
                  {...register("country", { required: true })}
                  defaultValue={editedProduct?.address?.country || ""}
                  placeholder="Country"
                />
              </FormGroup>
              <span style={{ color: "red" }}>
                {errors.country && "Country is required"}{" "}
              </span>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label className="form-label">Phone Number</Label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Phone Number"
                  {...register("phoneNumber", { required: true })}
                  defaultValue={editedProduct?.phoneNumber || ""}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <input
                  className="form-control"
                  type="file"
                  id="file"
                  name="profilePic" // Ensure the name matches the key used in the data object
                  //  multiple
                  //  defaultValue={editedProduct?.profilePic|| ""}
                  {...register("profilePic", {
                    required: "profilePic are required",
                    validate: (value) =>
                      value.length > 0 || "ProfilePic is needed",
                  })}
                />
                <span style={{ color: "red" }}>
                  {errors.profilePic && "ProfilePic is required"}{" "}
                </span>
              </FormGroup>
            </Col>

            <Col md="12">
              <div>
                {" "}
                <Label className="form-label">Bio</Label>
                <input
                  type="text"
                  {...register("bio")}
                  className="form-control"
                  rows="5"
                  placeholder="Enter About your description"
                  defaultValue={editedProduct?.bio || ""}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-end">
        <input type="hidden" {...register("_id")} defaultValue={adminData?._id || ""} />
          <Btn attrBtn={{ color: "primary", type: "submit" }}>
            UpdateProfile
          </Btn>
        </CardFooter>
      </Form>
      <ToastContainer />
    </Fragment>
  );
};
export default EditMyProfile;
