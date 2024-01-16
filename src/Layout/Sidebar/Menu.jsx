export const MENUITEMS = [
  {
    // menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboard",
        icon: "home",
        badge: "badge badge-light-primary",
       path: `${process.env.PUBLIC_URL}`, title: "dashboard", type: "link" ,
        // badgetxt: "5",
        active: false,
        children: [
        ],
      },

    ],
  },

  {
    // menutitle: "Applications",
    menucontent: "Ready to use Apps",
    Items: [
      {
        title: "Products",
        icon: "product",
        type: "sub",
        // badge: "badge badge-light-secondary",
        // badgetxt: "New",
        active: false,
        children: [
          // { path: `${process.env.PUBLIC_URL}/app/project/project-list`, type: "link", title: "Project-List" },
          { path: `${process.env.PUBLIC_URL}/newProduct`, type: "link", title: "Create New Product" },
          // { path: `${process.env.PUBLIC_URL}/products`, title: "Products", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/productPage/1`, title: "Product-Page", type: "link" },
          { path: `${process.env.PUBLIC_URL}/product-list`, title: "Product-List", type: "link" },
      
        ],
      },
      {
        title: "Category",
        icon: "category",
        type: "sub",
        // badge: "badge badge-light-secondary",
        // badgetxt: "New",
        active: false,
        children: [
          // { path: `${process.env.PUBLIC_URL}/app/project/project-list`, type: "link", title: "Project-List" },
          { path: `${process.env.PUBLIC_URL}/newCategory`, type: "link", title: "Create New Category" },
          // { path: `${process.env.PUBLIC_URL}/products`, title: "Products", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/productPage/1`, title: "Product-Page", type: "link" },
          { path: `${process.env.PUBLIC_URL}/category-list`, title: "Category-List", type: "link" },
          
        ],
      },
      {
        title: "Brand",
        icon: "category",
        type: "sub",
        // badge: "badge badge-light-secondary",
        // badgetxt: "New",
        active: false,
        children: [
          // { path: `${process.env.PUBLIC_URL}/app/project/project-list`, type: "link", title: "Project-List" },
          { path: `${process.env.PUBLIC_URL}/newBrand`, type: "link", title: "Create New Brand" },
         
          { path: `${process.env.PUBLIC_URL}/brand-list`, title: "Brand-List", type: "link" },
          
        ],
      },
      {
        title: "Orders",
        icon: "order",
        type: "sub",
        // badge: "badge badge-light-secondary",
        // badgetxt: "New",
        active: false,
        children: [
         
          { path: `${process.env.PUBLIC_URL}/order-list`, title: "orderHistory", type: "link" },
          
        ],
      },
      {
        title: "WhishList",
        icon: "heart",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/wishlist`, title: "Wishlist", type: "link" },
        ],
      },
     
      //   title: "Orders",
      //   icon: "order",
      //   type: "sub",
      //   // badge: "badge badge-light-secondary",
      //   // badgetxt: "New",
      //   active: false,
      //   children: [
         
      //     { path: `${process.env.PUBLIC_URL}/orderhistory`, title: "OrderHistory", type: "link" },
        
      //   ],
  
      {
        title: "Customers",
        icon: "customer",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/customer-list`, type: "link", title: "Customers-List" },
        ],
      },
      {
        title: "Profile",
        icon: "profile",
        path: `${process.env.PUBLIC_URL}/app/users/profile`,
        type: "sub",
        bookmark: true,
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/app/users/profile`, type: "link", title: "User Profile" },
          { path: `${process.env.PUBLIC_URL}/app/users/edit`, type: "link", title: "User Edit" },
          // { path: `${process.env.PUBLIC_URL}/app/users/cards`, type: "link", title: "Customers List" },
        ],
      },
     
      // {
      //   title: "Inventary",
      //   icon: "inventary",
      //   type: "sub",
      //   children: [
      //     { path: `${process.env.PUBLIC_URL}/stockhistory`, type: "link", title: "Stock List" },
      //     { path: `${process.env.PUBLIC_URL}/purchasehistory`, type: "link", title: "Purchase" },
      //     { path: `${process.env.PUBLIC_URL}/supplierhistory`, type: "link", title: "Supplier" },
      //     // { path: `${process.env.PUBLIC_URL}/app/users/cards`, type: "link", title: "Customers List" },
      //   ],
      // },
    
    ],
  },

 

]
