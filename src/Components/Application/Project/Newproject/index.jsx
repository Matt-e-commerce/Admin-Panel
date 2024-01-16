import React, { Fragment, useContext,useEffect ,useState} from "react";
import { Breadcrumbs, Btn } from "../../../../AbstractElements";
import { Add, Cancel } from "../../../../Constant";
import ProjectTitleClass from "./ProjectTitle";
import ClientNameClass from "./ClientName";
import ProjectRateClass from "./ProjectRate";
import IssueClass from "./IssueClass";
import EnterSomeDetailsClass from "./EnterSomeDetails";
import UploadProjectFileClass from "./UploadProjectFile";
import { useNavigate, Link } from "react-router-dom";
import { useForm ,Controller} from "react-hook-form";
import { Container, Row, Col, Card, CardBody, Form } from "reactstrap";
import CustomizerContext from "../../../../_helper/Customizer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createProduct } from "../../../../Services/productServices";
import { resetProduct } from "../../../../features/productSlice";
const Newproject = () => {
  const history = useNavigate();
  // console.log(products,'products=====>')
  const dispatch = useDispatch();
  const [selectedProductType, setSelectedProductType] = useState('simple');
  const {
    register,
    handleSubmit,
    control,
    trigger ,
    setValue,
    unregister,
    getValues ,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // Set default value for variations field
    setValue('variations', []);
  }, [setValue]);
  const AddProduct = async (data) => {
    const response = await dispatch(createProduct(data));
    console.log(response, "response");
    if (response?.payload?.status === "Success") {
      toast.success("Successfully Product Created!..");
      history(`${process.env.PUBLIC_URL}/product-list/dashboard`);
    } else {
      toast.error(`Something went wrong:`);
      dispatch(resetProduct())
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Project"
        title="Product Create"
        mainTitle="Product Create"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form
                  className="theme-form"
                  onSubmit={handleSubmit(AddProduct)}
                >
                  <ProjectTitleClass register={register} errors={errors} />
                  <ClientNameClass register={register} errors={errors}  setValue={setValue}/>
                  <IssueClass register={register} errors={errors} selectedProductType={selectedProductType} setSelectedProductType={setSelectedProductType} control={control} setValue={setValue} getValues={getValues} />
                  <ProjectRateClass
                    register={register}
                    errors={errors}
                    trigger={trigger}
                    unregister={unregister}
                    selectedProductType={selectedProductType}
                  />
                  <UploadProjectFileClass register={register} errors={errors} selectedProductType={selectedProductType} setSelectedProductType={setSelectedProductType} control={control} setValue={setValue} getValues={getValues} />
                  <EnterSomeDetailsClass register={register} errors={errors} control={control} setValue={setValue} getValues={getValues}/>
                  <Row>
                    <Col>
                      <div className="text-end">
                        <Btn attrBtn={{ color: "primary", className: "me-3" }}>
                          {Add}
                        </Btn>
                        <Link
                          to={`${process.env.PUBLIC_URL}/product-list/dashboard`}
                        >
                          <Btn attrBtn={{ color: "warning" }}>{Cancel}</Btn>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Newproject;
