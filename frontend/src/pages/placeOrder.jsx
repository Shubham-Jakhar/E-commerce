import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaAmazonPay } from "react-icons/fa";
import { CgPaypal } from "react-icons/cg";
import { useParams } from "react-router-dom";
const PlaceOrder = () => {
    const {total} = useParams();
    return (
        <div className="place-order-page bg-white font-['Prata'] serif py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Page Heading */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center space-x-6">
                        <div className="w-16 h-px bg-black"></div>
                        <h1 className="text-2xl lg:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            Place Order
                        </h1>
                        <div className="w-16 h-px bg-black"></div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Delivery Information */}
                    <div className="delivery-info">
                        <div className="bg-gray-50 border border-gray-200 p-8">
                            <div className="mb-8">
                                <h2 className="text-lg font-normal text-black tracking-[0.1em] uppercase mb-3">
                                    Delivery Information
                                </h2>
                                <div className="w-12 h-px bg-black"></div>
                            </div>

                            <form className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="first-name">
                                        <label htmlFor="firstName" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                            placeholder="Enter first name"
                                            required
                                        />
                                    </div>
                                    <div className="last-name">
                                        <label htmlFor="lastName" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                            placeholder="Enter last name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Address Fields */}
                                <div className="house-no">
                                    <label htmlFor="houseNo" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                        House No. / Building
                                    </label>
                                    <input
                                        type="text"
                                        id="houseNo"
                                        name="houseNo"
                                        className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                        placeholder="Enter house number or building name"
                                        required
                                    />
                                </div>

                                <div className="area">
                                    <label htmlFor="area" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                        Area / Street
                                    </label>
                                    <input
                                        type="text"
                                        id="area"
                                        name="area"
                                        className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                        placeholder="Enter area or street name"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="district">
                                        <label htmlFor="district" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                            District
                                        </label>
                                        <input
                                            type="text"
                                            id="district"
                                            name="district"
                                            className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                            placeholder="Enter district"
                                            required
                                        />
                                    </div>
                                    <div className="state">
                                        <label htmlFor="state" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                            placeholder="Enter state"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="pincode">
                                        <label htmlFor="pincode" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            name="pincode"
                                            className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                            placeholder="Enter pincode"
                                            required
                                        />
                                    </div>
                                    <div className="mobile-no">
                                        <label htmlFor="mobileNo" className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobileNo"
                                            name="mobileNo"
                                            className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                            placeholder="Enter mobile number"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary & Payment */}
                    <div className="space-y-8">

                        {/* Cart Total */}
                        <div className="cart-total">
                            <div className="bg-gray-50 border border-gray-200 p-8">
                                <div className="mb-6">
                                    <h2 className="text-lg font-normal text-black tracking-[0.1em] uppercase mb-3">
                                        Order Summary
                                    </h2>
                                    <div className="w-12 h-px bg-black"></div>
                                </div>

                                <div className="space-y-4 font-['Outfit']">
                                    <div className="sub-total flex justify-between items-center py-3 border-b border-gray-200">
                                        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">Subtotal</span>
                                        <span className="text-sm font-medium text-black">$ {total}</span>
                                    </div>
                                    <div className="shipping-fee flex justify-between items-center py-3 border-b border-gray-200">
                                        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">Shipping Fee</span>
                                        <span className="text-sm font-medium text-black">Free</span>
                                    </div>
                                    <div className="total flex justify-between items-center py-4 mt-4 border-t-2 border-black">
                                        <span className="text-base font-semibold text-black uppercase tracking-[0.1em]">Total</span>
                                        <span className="text-lg font-semibold text-black">$ {total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="payment">
                            <div className="bg-gray-50 border border-gray-200 p-8">
                                <div className="mb-6">
                                    <h2 className="text-lg font-normal text-black tracking-[0.1em] uppercase mb-3">
                                        Payment Method
                                    </h2>
                                    <div className="w-12 h-px bg-black"></div>
                                </div>

                                <div className="method space-y-4 mb-8">
                                    <div className="gpay flex items-center p-4 border border-gray-300 hover:border-black transition-colors duration-200 cursor-pointer">
                                        <input
                                            type="radio"
                                            id="gpay"
                                            name="paymentMethod"
                                            value="gpay"
                                            className="w-4 h-4 text-black border-2 border-gray-300 focus:ring-black focus:ring-2 focus:ring-offset-0 mr-4"
                                        />
                                        <label htmlFor="gpay" className="flex items-center cursor-pointer text-sm font-['Outfit'] font-medium text-black">
                                            <span className="mr-3 text-lg"><FaAmazonPay/></span>
                                            Google Pay
                                        </label>
                                    </div>

                                    <div className="paytm flex items-center p-4 border border-gray-300 hover:border-black transition-colors duration-200 cursor-pointer">
                                        <input
                                            type="radio"
                                            id="paytm"
                                            name="paymentMethod"
                                            value="paytm"
                                            className="w-4 h-4 text-black border-2 border-gray-300 focus:ring-black focus:ring-2 focus:ring-offset-0 mr-4"
                                        />
                                        <label htmlFor="paytm" className="flex items-center cursor-pointer text-sm font-['Outfit'] font-medium text-black">
                                            <span className="mr-3 text-lg"><CgPaypal/></span>
                                            Paytm
                                        </label>
                                    </div>

                                    <div className="cod flex items-center p-4 border border-gray-300 hover:border-black transition-colors duration-200 cursor-pointer">
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="paymentMethod"
                                            value="cod"
                                            className="w-4 h-4 text-black border-2 border-gray-300 focus:ring-black focus:ring-2 focus:ring-offset-0 mr-4"
                                            defaultChecked
                                        />
                                        <label htmlFor="cod" className="flex items-center cursor-pointer text-sm font-['Outfit'] font-medium text-black">
                                            <span className="mr-3 text-lg"><FaRegMoneyBillAlt/></span>
                                            Cash on Delivery
                                        </label>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <div className="place-order">
                                    <button className="w-full bg-black text-white py-4 px-6 text-sm font-['Outfit'] font-medium tracking-[0.2em] uppercase hover:bg-[#C9C3F4] hover:text-black transition-all duration-300 border border-black hover:border-[#C9C3F4]">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PlaceOrder;