import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/home"
import ProductDetails from "./pages/productDetails"
import NavBar from "./components/navBar"
import Footer from "./components/footer"
import Collection from "./pages/collection"
import SignIn from "./pages/signin"
import SignUp from "./pages/signUp"
import CartPage from "./pages/cart"
import PlaceOrder from "./pages/placeOrder"
import { useSession } from "./context/sessionContext"
import AdminHome from "./pages/adminHome"
import AddProduct from "./components/addProduct"

function App() {
  const location=useLocation();
  const hideLayout=["/signin","/signup"];
  const shouldHide=hideLayout.includes(location.pathname);
  const {user}= useSession();

  return (
    <div>
      {!shouldHide && <NavBar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/collection" element={<Collection/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/placeOrder/:total" element={<PlaceOrder/>}/>
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/add/product" element={<AddProduct/>}/>
      </Routes>
      {!shouldHide && <Footer />}
    </div>
  )
}

export default App
