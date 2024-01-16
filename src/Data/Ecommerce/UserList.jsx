import React from 'react';
import { Btn, H6, Image } from '../../AbstractElements';
import product1 from '../../assets/images/ecommerce/product-table-1.png';
import product2 from '../../assets/images/ecommerce/product-table-2.png';
import product3 from '../../assets/images/ecommerce/product-table-3.png';
import product4 from '../../assets/images/ecommerce/product-table-4.png';
import product5 from '../../assets/images/ecommerce/product-table-5.png';
import product6 from '../../assets/images/ecommerce/product-table-6.png';
import { BsEyeFill } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
const style = {
  width: 40,
  height: 40,
};
const style2 = { width: 60, fontSize: 14, padding: 4 };
export const productData = [
  {
    image: <Image attrImage={{ src: product1, style: style, alt: '' }} />,
    email:<H6>shoainzaki@gamil.com</H6>,
    location: 'Uk',
    contactNumber: '034345',
    start_date: '2022/4/19',
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span> */}
        <BsEyeFill style={{fontSize:"25px"}}/>
        {' '}
        &nbsp;&nbsp;
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <BsTrash3 style={{fontSize:"25px"}}/>
        &nbsp;&nbsp;
        <FaEdit style={{fontSize:"25px"}} />
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product1, style: style, alt: '' }} />,
    email: <H6>nafess@gamil.com</H6>,
    location: 'Usa',
    contactNumber: '03026001245',
    start_date: '2022/4/19',
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span> */}
        <BsEyeFill style={{fontSize:"25px"}}/>
        {' '}
        &nbsp;&nbsp;
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <BsTrash3 style={{fontSize:"25px"}}/>
        &nbsp;&nbsp;
        <FaEdit style={{fontSize:"25px"}} />
      </div>
    ),
  },
  
];
export const productColumns = [
  {
    name: 'Image',
    selector: (row) => row.image,
    sortable: true,
    center: true,
    minWidth: '100px',
    maxWidth: '100px',
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: true,
    center: true,
    wrap: true,
    minWidth: '400px',
  },
  {
    name: 'Location',
    selector: (row) => row.location,
    sortable: true,
    center: true,
    minWidth: '120px',
    maxWidth: '150px',
  },
  {
    name: 'Contact',
    selector: (row) => row.contactNumber,
    sortable: true,
    center: true,
    minWidth: '120px',
    maxWidth: '150px',
  },
  {
    name: 'Start_date',
    selector: (row) => row.start_date,
    sortable: true,
    center: true,
    minWidth: '120px',
    maxWidth: '150px',
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    sortable: true,
    center: true,
    minWidth: '160px',
    maxWidth: '160px',
  },
];
