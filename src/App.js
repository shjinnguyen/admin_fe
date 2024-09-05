import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Unit from "./pages/unit/Unit";

import Main from "./components/layout/Main";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Category from "./pages/category/Category";
import Sku from "./pages/sku/Sku";
import Supplier from "./pages/supplier/Supplier";
import Product from "./pages/product/Product";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/unit" component={Unit} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/sku" component={Sku} />
          <Route exact path="/supplier" component={Supplier} />
          <Route exact path="/product" component={Product} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
