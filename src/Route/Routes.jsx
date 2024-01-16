
import Default from "../Components/Dashboard/Default";


// //widgets
import Chart from "../Components/Widgets/Chart";
import General from "../Components/Widgets/General";


import Spinners from "../Components/Application/Spinners";

// Category
import Category from "../Components/Application/Category/CategoryInput";
// Brand
import Brand from "../Components/Application/Brand/BrandInput";

// //Application
import Newproject from "../Components/Application/Project/Newproject";

// //User app
import UsersEditContain from "../Components/Application/Users/UsersEdit";
import UsersProfileContain from "../Components/Application/Users/UsersProfile";


// //E-commerce
import Products from "../Components/Application/Ecommerce/Products";
import WishList from "../Components/Application/Ecommerce/Wishlist";
import OrderHistory from "../Components/Application/Ecommerce/OrderHistory";
import StockHistory from "../Components/Application/Ecommerce/StockHistory";
import PurchaseList from "../Components/Application/Ecommerce/PurchaseList";
import SupplierList from "../Components/Application/Ecommerce/SupplierList";
import ProductListContain from "../Components/Application/Ecommerce/ProductList";
import CategoryListContain from "../Components/Application/Category/CategoryList";
import OrderListContain from "../Components/Application/Order/OrderList";
import BrandListContain from "../Components/Application/Brand/BrandList";
import CustomerListContain from "../Components/Application/Customer/CustomerList";
import CustomersProfileContain from "../Components/Application/Customer/CustomersProfile";


// //Editor
import CkEditorContain from "../Components/Application/Editor/CkEditor";



export const routes = [

{/* additional routes */},
{ path: `${process.env.PUBLIC_URL}/newCategory/dashboard`, Component: < Category/> },
{ path: `${process.env.PUBLIC_URL}/newBrand/dashboard`, Component: < Brand/> },
{ path: `${process.env.PUBLIC_URL}/category-list/dashboard`, Component: <CategoryListContain /> },
{ path: `${process.env.PUBLIC_URL}/order-list/dashboard`, Component: <OrderListContain /> },
{ path: `${process.env.PUBLIC_URL}/brand-list/dashboard`, Component: <BrandListContain /> },
{ path: `${process.env.PUBLIC_URL}/customer-list/dashboard`, Component: <CustomerListContain /> },
{ path: `${process.env.PUBLIC_URL}/customer-details/dashboard`, Component: <CustomersProfileContain /> },

{/*  routes */},

  { path: `${process.env.PUBLIC_URL}/dashboard`, Component: <Default/> },

  { path: `${process.env.PUBLIC_URL}/widgets/general/dashboard`, Component: <General /> },
  { path: `${process.env.PUBLIC_URL}/widgets/chart/dashboard`, Component: <Chart /> },

  { path: `${process.env.PUBLIC_URL}/ui-kits/spinner/dashboard`, Component: <Spinners /> },
 
  { path: `${process.env.PUBLIC_URL}/newProduct/dashboard`, Component: <Newproject /> },
 { path: `${process.env.PUBLIC_URL}/app/users/profile/dashboard`, Component: <UsersProfileContain /> },
  { path: `${process.env.PUBLIC_URL}/app/users/edit/dashboard`, Component: <UsersEditContain /> },
  { path: `${process.env.PUBLIC_URL}/products/dashboard`, Component: <Products /> },
  { path: `${process.env.PUBLIC_URL}/orderhistory/dashboard`, Component: <OrderHistory /> },
  { path: `${process.env.PUBLIC_URL}/stockhistory/dashboard`, Component: <StockHistory /> },
  { path: `${process.env.PUBLIC_URL}/purchasehistory/dashboard`, Component: < PurchaseList/> },
  { path: `${process.env.PUBLIC_URL}/supplierhistory/dashboard`, Component: < SupplierList/> },
  { path: `${process.env.PUBLIC_URL}/wishlist/dashboard`, Component: <WishList /> },
  { path: `${process.env.PUBLIC_URL}/product-list/dashboard`, Component: <ProductListContain /> },
 

  // //Editor
  { path: `${process.env.PUBLIC_URL}/editor/ckeditor/dashboard`, Component: <CkEditorContain /> },

 
];
