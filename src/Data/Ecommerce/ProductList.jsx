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
    Details: (
      <div>
        <H6>Red Lipstick</H6>
        <span>Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens</span>
      </div>
    ),
    amount: '$10',
    stock: <div className='font-success'>In Stock</div>,
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
    image: <Image attrImage={{ src: product3, style: style, alt: '' }} />,
    Details: (
      <div>
        <H6>Black Lipstick</H6>
        <span>Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens</span>
      </div>
    ),
    amount: '$10',
    stock: <div className='font-success'>In Stock</div>,
    start_date: '2022/4/19',
    action: (
      <div>
        <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span>
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
    name: 'Details',
    selector: (row) => row.Details,
    sortable: true,
    center: true,
    wrap: true,
    minWidth: '400px',
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
    sortable: true,
    center: true,
    minWidth: '100px',
    maxWidth: '150px',
  },
  {
    name: 'Stock',
    selector: (row) => row.stock,
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
