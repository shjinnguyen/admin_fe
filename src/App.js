import { Switch, Route } from "react-router-dom";
import Unit from "./pages/unit/Unit";

import Main from "./components/layout/Main";

import Category from "./pages/category/Category";
import Sku from "./pages/sku/Sku";
import Supplier from "./pages/supplier/Supplier";
import Product from "./pages/product/Product";
import Inventory from "./pages/inventory/Inventory";
import InventoryForm from "./pages/inventory/ImportV2";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/unit" component={Unit} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/sku" component={Sku} />
          <Route exact path="/supplier" component={Supplier} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/inventory-import" component={InventoryForm} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
