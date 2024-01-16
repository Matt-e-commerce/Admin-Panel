import React, { Fragment, useEffect, useState } from "react";
import { Col, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { ChromePicker } from "react-color";

const ProjectRateClass = ({
  register,
  unregister,
  errors,
  selectedProductType,
}) => {
  const [variations, setVariations] = useState([ { size: "", quantity: "", color: "" },]);
  // // console.log(variations);
  // console.log(selectedProductType,'selectedProductType')
  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  const handleAddVariation = () => {
    // Add a unique key for the new variation
    const newIndex = variations.length;
    setVariations((prevVariations) => [
      ...prevVariations,
      { size: "", quantity: "", color: "" },
    ]);

    // Explicitly register form fields for the new variation
    register(`variations[${newIndex}].size`, { required: true });
    register(`variations[${newIndex}].quantity`, { required: true });
    register(`variations[${newIndex}].color`, { required: true });
  };

  const handleRemoveVariation = (indexToRemove) => {
    // Unregister form fields for the removed variation
    unregister(`variations[${indexToRemove}].size`);
    unregister(`variations[${indexToRemove}].quantity`);
    unregister(`variations[${indexToRemove}].color`);

    setVariations((prevVariations) => {
      const updatedVariations = prevVariations.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedVariations;
    });
  };

  return (
    <Fragment>
    {selectedProductType === "variations" && variations.map((variation, index) => (
      <Row key={index}>
      <Col sm="4">
        <FormGroup>
          <Label htmlFor={`variations[${index}].size`}>Size</Label>
          <select
            {...register(`variations[${index}].size`, {
              required: true,
            })}
            value={variation.size || ""}
            onChange={(e) =>
              handleVariationChange(index, "size", e.target.value)
            }
            className="form-control digits"
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          {variation.size === "" && (
            <span style={{ color: "red" }}>Size is required</span>
          )}
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup>
          <Label htmlFor={`variations[${index}].quantity`}>Quantity</Label>
          <input
            type="number"
            min="0" // Sets the minimum value
            {...register(`variations[${index}].quantity`, {
              required: true,
            })}
            value={variation.quantity || ""}
            onChange={(e) =>
              handleVariationChange(index, "quantity", e.target.value)
            }
            className="form-control"
          />
          {variation.quantity === "" && (
            <span style={{ color: "red" }}>Quantity is required</span>
          )}
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup>
          <Label htmlFor={`variations[${index}].color`}>Color</Label>

          <input
            type="color"
            {...register(`variations[${index}].color`, {
              required: true,
            })}
            value={variation.color || ""}
            onChange={(e) =>
              handleVariationChange(index, "color", e.target.value)
            }
            className="form-control form-control-color"
          />
          {variation.color === "" && (
            <span style={{ color: "red" }}>Color is required</span>
          )}
        </FormGroup>
      </Col>
      {/* <button type="button" onClick={() => handleRemoveVariation(index)}>
        Remove Variation
      </button> */}
      <Col sm="4">
        <Button
          color="warning"
          size="sm"
          type="button"
          onClick={() => handleRemoveVariation(index)}
        >
          Remove Variation
        </Button>
      </Col>
    </Row>
    ))}

{selectedProductType === "variations" && (
      <Col sm="4">
        <Button
          color="primary"
          size="sm"
          type="button"
          onClick={handleAddVariation}
        >
          Add Variation
        </Button>
      </Col>
    )}
  </Fragment>

    
   
  );
};

export default ProjectRateClass;
