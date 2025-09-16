import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUserDetailsFromServer } from "../service/productItemService";

const SignUp = () => {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        fullname:"",
        email:"",
        password:"",
        confirmPassword:"",
        userType:"buyer"
    });

    const handleChange=(e)=>{
        const {name,value}= e.target;
        setFormData({
            ...formData,
            [name]:value
    })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
        const response=await postUserDetailsFromServer(formData);
        if(response.success){
            alert("Account created");
            navigate("/signin");
        } else{
            if(response.errors){
            alert("Error:"+ response.errors.join(", "));
            } else if(!response.success){
                alert(response.message);
            }
        }
        } catch(error) {
            console.log("error during singup",error);
            alert("unexpected error occured, please try again later.");
        }
    }
    return (
        <div className="signup-page min-h-screen bg-white font-['Prata'] serif flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-4 mb-6">
                        <div className="w-12 h-px bg-black"></div>
                        <h1 className="text-2xl lg:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            Join Us
                        </h1>
                        <div className="w-12 h-px bg-black"></div>
                    </div>
                    <p className="text-gray-600 text-sm font-['Outfit'] leading-relaxed">
                        Create your account to discover timeless elegance
                    </p>
                </div>

                {/* Signup Form */}
                <div className="bg-white border border-gray-200 shadow-sm p-8 lg:p-10">
                    <form className="space-y-6" typeof="POST" onSubmit={handleSubmit}>

                        {/* Name Field */}
                        <div className="form-group">
                            <label
                                htmlFor="name"
                                className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="form-group">
                            <label
                                htmlFor="email"
                                className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label
                                htmlFor="password"
                                className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="confirm-password"
                                className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-3"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-['Outfit'] text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-200"
                                placeholder="Confirm password"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-xs font-['Outfit'] font-medium text-black uppercase tracking-[0.2em] mb-4">
                                I want to
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-center p-4 border border-gray-300 hover:border-black transition-colors duration-200 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="buyer-signup"
                                        name="userType"
                                        value="buyer"
                                        checked={formData.userType === "buyer"}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-black border-2 border-gray-300 focus:ring-black focus:ring-2 focus:ring-offset-0 mr-3"
                                    />
                                    <label htmlFor="buyer-signup" className="text-sm font-['Outfit'] text-black cursor-pointer text-center">
                                        <div className="font-medium">Shop</div>
                                        <div className="text-xs text-gray-600">Browse & buy products</div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-center p-4 border border-gray-300 hover:border-black transition-colors duration-200 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="seller-signup"
                                        name="userType"
                                        value="seller"
                                        checked={formData.userType==="seller"}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-black border-2 border-gray-300 focus:ring-black focus:ring-2 focus:ring-offset-0 mr-3"
                                    />
                                    <label htmlFor="seller-signup" className="text-sm font-['Outfit'] text-black cursor-pointer text-center">
                                        <div className="font-medium">Sell</div>
                                        <div className="text-xs text-gray-600">List & sell products</div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 px-6 text-sm font-['Outfit'] font-medium tracking-[0.2em] uppercase hover:bg-[#C9C3F4] hover:text-black transition-all duration-300 border border-black hover:border-[#C9C3F4]"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* Toggle to Login */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm font-['Outfit'] text-gray-600 mb-3">
                            Already have an account?
                        </p>
                        <Link to={"/signin"}>
                            <button
                                className="text-sm font-['Outfit'] font-medium text-black hover:text-[#DCBCCE] transition-colors duration-200 uppercase tracking-wide border-b border-black hover:border-[#DCBCCE]"
                            >
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;