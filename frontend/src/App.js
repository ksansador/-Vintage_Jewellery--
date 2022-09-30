import {Route, Switch} from "react-router-dom";
import Posts from "./containers/Posts/Posts";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

function App() {
  return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Posts}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/login'} component={Login}/>
        </Switch>
      </Layout>
  );
}

export default App;
