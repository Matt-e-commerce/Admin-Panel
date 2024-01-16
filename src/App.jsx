import React from "react";
import Routers from "./Route";
import ChartistProvider from "./_helper/Chartist/ChartistProvider";
import ChartjsProvider from "./_helper/Chartjs/ChartProvider";
import GoogleChartProvider from "./_helper/GoogleChart/GoogleChartProvider";
import TaskProvider from "./_helper/Task/TaskProvider";
import EmailProvider from "./_helper/Email/EmailProvider";
import ProductProvider from "./_helper/Ecommerce/Product/ProductProvider";
import CartProvider from "./_helper/Ecommerce/Cart/CardProvider";
import FilterProvider from "./_helper/Ecommerce/Filter/FilterProvider";
import WishListProvider from "./_helper/Ecommerce/Wishlist/WishlistProvider";
import AnimationThemeProvider from "./_helper/AnimationTheme/AnimationThemeProvider";
import CustomizerProvider from "./_helper/Customizer/CustomizerProvider";

const App = () => (
  <div className="App">
    <CustomizerProvider>
      <WishListProvider>
        <FilterProvider>
          <CartProvider>
            <ProductProvider>
              <EmailProvider>
                <TaskProvider>
                    <GoogleChartProvider>
                      <ChartjsProvider>
                        <ChartistProvider>
                          <AnimationThemeProvider>
                            <Routers />
                          </AnimationThemeProvider>
                        </ChartistProvider>
                      </ChartjsProvider>
                    </GoogleChartProvider>
                </TaskProvider>
              </EmailProvider>
            </ProductProvider>
          </CartProvider>
        </FilterProvider>
      </WishListProvider>
    </CustomizerProvider>
  </div>
);

export default App;
