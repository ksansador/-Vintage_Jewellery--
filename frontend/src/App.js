import {Route, Switch} from "react-router-dom";
import Products from "./containers/Products/Products";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

function App() {
  return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Products}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/products/new'} component={Login}/>
        </Switch>
      </Layout>
  );
}

export default App;
