import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Home from "./pages/home"
import ProductDetails from "./pages/productDetails"
import NavBar from "./components/navBar"
import Footer from "./components/footer"
import Collection from "./pages/collection"
import SignIn from "./pages/signin"
import SignUp from "./pages/signUp"
import CartPage from "./pages/cart"
import PlaceOrder from "./pages/placeOrder"
import AdminHome from "./pages/adminHome"
import AddProduct from "./components/addProduct"
import { useSession } from "./context/sessionContext"
import { useEffect } from "react"
import Orders from "./pages/orders"
import AdminOrders from "./pages/adminOrders"

function App() {
  const location = useLocation();
  const hideLayout = ["/signin", "/signup"];
  const shouldHide = hideLayout.includes(location.pathname);
  const { token, user } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      if (user && user.userType === "seller") {
        navigate("/admin/home");
      }
    } else {
      navigate("/");
    }
  }, [token]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      {!shouldHide && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/placeOrder/:total" element={<PlaceOrder />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/user/orders" element={<Orders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
      {!shouldHide && <Footer />}
    </div>
  )
}

export default App
