import React, { Fragment, createRef, useEffect, useState } from "react";
import { Col, Form, FormGroup, Label, Input, Row, Button } from "reactstrap";
import { UploadProjectFile } from "../../../../Constant";
import Dropzone from "react-dropzone-uploader";
import { useForm, Controller } from "react-hook-form";

const UploadProjectFileClass = ({
  register,
  errors,
  selectedProductType,
  setSelectedProductType,
  setValue,
  getValues
}) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  // const { getValues } = useForm();
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setUploadedImages(prevImages => [...prevImages, { name: meta.name, file }]);
    } else if (status === "removed") {
      setUploadedImages(prevImages => prevImages.filter(image => image.name !== meta.name));
    }
  };
  useEffect(() => {
    setValue("images", uploadedImages);
  }, [uploadedImages, setValue]);
  
  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup>
            {/* dropzoneRef.open() */}
            <Dropzone
              // getUploadParams={getUploadParams}
              // {...register('images',{ required: true })}
              multiple={true}
              onChangeStatus={(meta, status) => handleChangeStatus(meta, status)}
              inputContent='Drop files here or click to upload'
              styles={{
                dropzone: { width: '100%', height: 150 },
                dropzoneActive: { borderColor: 'green' },
              }}
            />
           
            {errors.images && (
              <span style={{ color: "red" }}>{errors.images.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UploadProjectFileClass;
