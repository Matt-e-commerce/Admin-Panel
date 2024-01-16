import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
} from "reactstrap";
import {
  BasicFormControl,
  EmailAddress,
  ExampleMultipleSelect,
  ExampleSelect,
  ExampleTextarea,
  Password,
} from "../../../../Constant";
import { ToastContainer, toast } from "react-toastify";
import HeaderCard from "../../../Common/Component/HeaderCard";
import FooterCard from "../../../Forms/FormControl/Common/FooterCard";
import { Btn } from "../../../../AbstractElements";
import { createBrand } from "../../../../Services/brandServices";
import { useDispatch, useSelector } from "react-redux";
import { resetbrand } from "../../../../features/brandSlice";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const BasicFormControlClass = () => {
  const history = useNavigate();
  // console.log(products,'products=====>')
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const AddBrand = async (data) => {
    const response = await dispatch(createBrand(data));
    if (response?.payload?.status === "Success") {
      toast.success("Successfully Brand Created!..");
      history(`${process.env.PUBLIC_URL}/brand-list/dashboard`);
    } else {
      toast.error(`Something went wrong:`);
      dispatch(resetbrand());
    }
  };
  return (
    <Fragment>
      <Card>
        <HeaderCard title="Cateogty Form" />
        <Form className="form theme-form" onSubmit={handleSubmit(AddBrand)}>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="exampleFormControlInput1">BrandName</Label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Your Brand"
                    {...register("brandName", { required: true })}
                  />
                  <span style={{ color: "red" }}>
                    {errors.brandName && "Brand Name is required"}
                  </span>
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="exampleInputPassword2">{Password}</Label>
                                    <Input className="form-control" type="password" placeholder="Password" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlSelect9">{ExampleSelect}</Label>
                                    <Input type="select" name="select" className="form-control digits" defaultValue="1">
                                        <option>{'1'}</option>
                                        <option>{'2'}</option>
                                        <option>{'3'}</option>
                                        <option>{'4'}</option>
                                        <option>{'5'}</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlSelect3">{ExampleMultipleSelect}</Label>
                                    <Input type="select" name="select" className="form-control digits" multiple="" defaultValue="1">
                                        <option>{'1'}</option>
                                        <option>{'2'}</option>
                                        <option>{'3'}</option>
                                        <option>{'4'}</option>
                                        <option>{'5'}</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    <Label>{ExampleTextarea}</Label>
                                    <Input type="textarea" className="form-control" rows="3" />
                                </div>
                            </Col>
                        </Row> */}
            <Row>
              <Col>
                <div className="text-end">
                  <Btn attrBtn={{ color: "primary", className: "me-3" }}>
                    Create-Brand
                  </Btn>
                  <Link to={`${process.env.PUBLIC_URL}/brand-list/dashboard`}>
                    <Btn attrBtn={{ color: "warning" }}>Cancel</Btn>
                  </Link>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Form>
      </Card>
      <ToastContainer />
    </Fragment>
  );
};

export default BasicFormControlClass;
