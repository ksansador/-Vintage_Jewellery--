import {Route, Switch} from "react-router-dom";
import Products from "./containers/Products/Products";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewProducts from "./containers/NewProduct/NewProducts";
import Product from "./containers/Product/Product";

function App() {
  return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Products}/>
            <Route path={'/products/new'} exact component={NewProducts}/>
            <Route path="/products/:id"  component={Product}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/login'} component={Login}/>
        </Switch>
      </Layout>
  );
}

export default App;
