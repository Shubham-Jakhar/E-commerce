import { useEffect, useState } from "react";
import CartPost from "../components/cartPost";
import DummyLoadingStructure from "../components/dummyLoadingStructure";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

const CartPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { refreshCart, cartItems } = useSession();

    useEffect(() => {
        refreshCart();
        setLoading(false);
    }, []);
    let Subtotal = 0;
    let discount = 0;
    let total = 0;
    if (!loading) {
        if (cartItems) {
            cartItems.map(item => {
                Subtotal = Subtotal + item.price;
            });
        }
        if (Subtotal >= 200) {
            discount = 25;
        }
        if (Subtotal > 700) {
            discount = 75;
        }
        total = Subtotal - discount;
    }

    return (
        <div className="cart-page bg-white font-['Prata'] serif py-12 lg:py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="heading text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center space-x-6">
                        <div className="w-16 h-px bg-black"></div>
                        <h1 className="text-2xl lg:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            Your Cart
                        </h1>
                        <div className="w-16 h-px bg-black"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    <div className="cart-posts lg:col-span-2">
                        <div className="space-y-6">
                            {!loading ? (
                                cartItems.length > 0 ? (
                                    cartItems.map((cartItem, index) => (
                                        <CartPost key={index} cartItem={cartItem} />
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <p className="text-gray-600 font-['Outfit'] text-lg mb-6">
                                            Your cart is empty
                                        </p>
                                        <button className="bg-black text-white px-8 py-3 text-sm font-['Outfit'] font-medium tracking-wider uppercase hover:bg-[#C9C3F4] hover:text-black transition-all duration-300 border border-black hover:border-[#C9C3F4]" onClick={() => navigate("/")} >
                                            Continue Shopping
                                        </button>
                                    </div>
                                )
                            ) : (
                                <DummyLoadingStructure />
                            )}


                        </div>
                    </div>
                    <div className="cart-total lg:col-span-1">
                        <div className="bg-gray-50 border border-gray-200 p-8">
                            <div className="mb-8">
                                <h2 className="text-lg font-normal text-black tracking-[0.1em] uppercase">
                                    Cart Totals
                                </h2>
                                <div className="w-12 h-px bg-black mt-3"></div>
                            </div>
                            <div className="space-y-6 font-['Outfit']">
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                        Subtotal
                                    </div>
                                    <div className="text-sm font-medium text-black">
                                        $ {Subtotal}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                        Discount
                                    </div>
                                    <div className="text-sm font-medium text-[#DCBCCE]">
                                        -$ {discount}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                        Shipping Fee
                                    </div>
                                    <div className="text-sm font-medium text-black">
                                        Free
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-4 mt-6 border-t-2 border-black">
                                    <div className="text-base font-semibold text-black uppercase tracking-[0.1em]">
                                        Total
                                    </div>
                                    <div className="text-lg font-semibold text-black">
                                        $ {total}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Link to={`/placeOrder/${total}`} >
                                    <button className="w-full bg-black text-white py-4 px-6 text-sm font-['Outfit'] font-medium tracking-[0.2em] uppercase hover:bg-[#C9C3F4] hover:text-black transition-all duration-300 border border-black hover:border-[#C9C3F4]">
                                        Proceed to Checkout
                                    </button>
                                </Link>
                            </div>
                            <div className="mt-6 space-y-3">
                                <Link to={"/"}>
                                    <button className="w-full text-center text-sm font-['Outfit'] text-gray-600 hover:text-black transition-colors duration-200 uppercase tracking-wide">
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CartPage;