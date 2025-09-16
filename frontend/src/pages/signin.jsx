import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetailsFromServer } from "../service/productItemService";
import { useSession } from "../context/sessionContext";

const SignIn = () => {
    const navigate = useNavigate();
    const {session,setSession}= useSession();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await getUserDetailsFromServer(formData);
        if (response.isLoggedin) {
            setSession(response);
            navigate("/");
        }
    }
    return (
        <div className="login-page min-h-screen bg-white font-['Prata'] serif flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-4 mb-6">
                        <div className="w-12 h-px bg-black"></div>
                        <h1 className="text-2xl lg:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            Welcome Back
                        </h1>
                        <div className="w-12 h-px bg-black"></div>
                    </div>
                    <p className="text-gray-600 text-sm font-['Outfit'] leading-relaxed">
                        Sign in to your account to continue shopping
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white border border-gray-200 shadow-sm p-8 lg:p-10">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit}>

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
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-xs font-['Outfit'] text-gray-600 hover:text-[#DCBCCE] transition-colors duration-200 uppercase tracking-wide"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 px-6 text-sm font-['Outfit'] font-medium tracking-[0.2em] uppercase hover:bg-[#C9C3F4] hover:text-black transition-all duration-300 border border-black hover:border-[#C9C3F4]"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* Toggle to Signup */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm font-['Outfit'] text-gray-600 mb-3">
                            Don't have an account?
                        </p>
                        <Link to={"/signup"}>
                            <button
                                className="text-sm font-['Outfit'] font-medium text-black hover:text-[#DCBCCE] transition-colors duration-200 uppercase tracking-wide border-b border-black hover:border-[#DCBCCE]"
                            >
                                Create Account
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs font-['Outfit'] text-gray-500 leading-relaxed">
                        By continuing, you agree to our
                        <a href="#" className="text-black hover:text-[#DCBCCE] transition-colors duration-200 mx-1">
                            Terms of Service
                        </a>
                        and
                        <a href="#" className="text-black hover:text-[#DCBCCE] transition-colors duration-200 mx-1">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;