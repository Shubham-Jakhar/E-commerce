import { IoSearchOutline, IoMenu } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import logo from "/assets/logo.png";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

const NavBar = () => {
    const { token, logout, cartItems, user } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const navigate = useNavigate();
    let cartQuantity = 0;
    if (cartItems) {
        cartQuantity = cartItems.length;
    }

    const handleLogout = () => {
        logout();
        navigate("/");
        setMobileMenuOpen(false);
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    return (
        <div className="nav-bar bg-white border-b border-gray-100 shadow-sm font-['Outfit'] sticky top-0 z-50">
            <div className="w-full px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {token && user && user.userType === "seller" ?
                        <Link to={"/admin/home"} >
                            <div className="logo flex-shrink-0">
                                <img src={logo} className="h-8 lg:h-10 w-auto" alt="Logo" />
                            </div>
                        </Link> :
                        <Link to={"/"} onClick={closeMobileMenu}>
                            <div className="logo flex-shrink-0">
                                <img src={logo} className="h-8 lg:h-10 w-auto" alt="Logo" />
                            </div>
                        </Link>}
                    {token && user && user.userType === "seller" ? (
                        <div className="hidden md:flex items-center space-x-12 text-sm font-medium tracking-wide">
                            <Link to={"/admin/home"}>
                                <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                    Dashboard
                                </div>
                            </Link>
                            <Link to={"/add/product"}>
                                <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                    Add Product
                                </div>
                            </Link>
                            <Link to={"/admin/orders"}>
                                <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                    Orders
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-12 text-sm font-medium tracking-wide">
                            <Link to={"/"}>
                                <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                    Home
                                </div>
                            </Link>
                            <Link to={"/collection"}>
                                <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                    Collection
                                </div>
                            </Link>
                            <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                About
                            </div>
                            <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                Contact Us
                            </div>
                            {user && user.userType === "buyer" ? (
                                <Link to={"/user/orders"}>
                                    <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                        Orders
                                    </div>
                                </Link>
                            ) : <></>}
                        </div>
                    )}

                    <div className="flex items-center space-x-6">
                        {user && user.userType === "seller" ? <></> : (
                            <>
                                <div className="search-icon">
                                    <div
                                        className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                                        onClick={() => setSearchBar(!searchBar)}
                                    >
                                        <IoSearchOutline className="h-5 w-5" />
                                    </div>
                                </div>
                                <Link to={"/cart"} onClick={closeMobileMenu}>
                                    <div className="cart-page">
                                        <div className="relative text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                                            <IoBagHandleOutline className="h-5 w-5" />
                                            {cartQuantity > 0 && (
                                                <div className="absolute -top-2 -right-2">
                                                    <p className="text-xs font-semibold bg-[#C9C3F4] text-black rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                                                        {cartQuantity}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )}
                        {!token ? (
                            <Link to={"/signin"}>
                                <div className="login">
                                    <div className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                                        <div className="text-sm font-medium tracking-wide uppercase">
                                            Login
                                        </div>
                                        <span>
                                            <TbLogin2 className="h-4 w-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="logout" onClick={handleLogout}>
                                <div className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                                    <div className="text-sm font-medium tracking-wide uppercase">
                                        Logout
                                    </div>
                                    <span>
                                        <TbLogin2 className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                            >
                                {mobileMenuOpen ? (
                                    <RxCross1 className="h-5 w-5" />
                                ) : (
                                    <IoMenu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {searchBar && (
                <div className="relative bg-white border-t border-gray-200 shadow-sm">
                    <div className="w-full px-6 lg:px-8">
                        <div className="flex items-center py-2">
                            <div className="search-bar-input-field flex-1">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-transparent border-none outline-none font-['Outfit'] tracking-wide"
                                    autoFocus
                                />
                            </div>
                            <div className="flex items-center space-x-2 px-3">
                                <div className="p-2 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200">
                                    <IoSearchOutline className="h-4 w-4" />
                                </div>
                                <div className="w-px h-6 bg-gray-200"></div>
                                <div
                                    onClick={() => setSearchBar(false)}
                                    className="p-2 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200"
                                >
                                    <RxCross1 className="h-3 w-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {mobileMenuOpen && (token && user && user.userType === "seller" ? (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-full z-40">
                    <div className="flex flex-col items-center py-6 space-y-6 text-sm font-medium tracking-wide">
                        <Link to={"/admin/home"} onClick={closeMobileMenu}>
                            <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                Home
                            </div>
                        </Link>
                        <Link to={"/add/product"} onClick={closeMobileMenu}>
                            <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                Add Product
                            </div>
                        </Link>
                    </div>
                </div>) : (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-full z-40">
                    <div className="flex flex-col items-center py-6 space-y-6 text-sm font-medium tracking-wide">
                        <Link to={"/"} onClick={closeMobileMenu}>
                            <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                Home
                            </div>
                        </Link>
                        <Link to={"/collection"} onClick={closeMobileMenu}>
                            <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                Collection
                            </div>
                        </Link>
                        <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                            About
                        </div>
                        <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                            Contact Us
                        </div>
                        {user && user.userType === "buyer" ? (
                            <Link to={"/user/orders"} onClick={closeMobileMenu}>
                                <div className="text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer uppercase">
                                    Orders
                                </div>
                            </Link>
                        ) : <></>}
                    </div>
                </div>))
            }
        </div>
    );
};

export default NavBar;
