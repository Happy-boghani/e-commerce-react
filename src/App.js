import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./Components/Layout";
import Login from "./pages/Login/Login";
import ProductList from "./pages/ProductList/ProductList";
import Productdetail from "./pages/Productdetail/Productdetail";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* protected routes */}
          <Route element={<Layout/>}>
              <Route path="/product-list" element={<ProductList/>}/>
              <Route path="/product-detail/:id" element={<Productdetail/>}/>
              <Route path="/cart" element={<Cart/>}/>

          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
