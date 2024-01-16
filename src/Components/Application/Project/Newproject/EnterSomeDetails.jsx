import React, { Fragment } from 'react';
import { Row,Label ,FormGroup,Col} from 'reactstrap';
import { Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EnterSomeDetailsClass = ({ register, errors, setValue, control }) => {

  // Handle CKEditor's change event
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    
    // Strip <p> tags using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const strippedData = doc.body.textContent || "";
  
    // Set the value in the form using setValue from React Hook Form
    setValue('description', strippedData);
  };
  
  return (
    <Fragment>
      <Row>
        {/* <form>
          <div className="col-xs-12 m-t-30">
            <label htmlFor="description">Description*</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: 'Description is required.',
                // minLength: {
                //   value: 10,
                //   message: 'Description should have at least 10 characters.',
                // },
              }}  
              render={({ field }) => (
                <div>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Test content</p>"
                    config={{
                      toolbar: [
                          'undo', 'redo',
                          '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
                          '|', 'link', 'blockQuote', 'mediaEmbed', 'code', 'codeBlock',
                          '|', 'numberedList', 'bulletedList', 'outdent', 'indent',
                          '|', 'alignment', 'fontFamily', 'fontSize', 'highlight', 'removeFormat',
                      ],
                    }}
                    onChange={handleEditorChange}
                  />
                  {errors.description && <p className="text-danger">{errors.description.message}</p>}
                </div>
              )}
            />
          </div>
         
        </form> */}
         <Col>
          <FormGroup>
            <Label>Details</Label>
            <textarea className='form-control' rows='3' {...register('description', { required: true })} />
            <span style={{ color: 'red' }}>{errors.description && 'Some Details is required'}</span>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EnterSomeDetailsClass;
