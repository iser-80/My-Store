import AddProduct from "./pages/addProduct";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AboutProduct from "./pages/aboutProduct";
import Cart from "./pages/cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addProduct" element={<AddProduct />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/products/:productId" element={<AboutProduct />}/>
        <Route path="/cart" element={<Cart />}  />
      </Routes>
    </Router>
  );
}

export default App;
