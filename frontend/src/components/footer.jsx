import logo from "/assets/logo.png";
const Footer = () => {
    return (
        <div className="footer-section bg-white border-t border-gray-100 font-['Outfit']">
            <div className="footer-upper max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    <div className="footer-details space-y-6">
                        <img src={logo} className="h-8 w-auto" alt="Logo" />
                        <div className="text-gray-600 text-sm leading-relaxed max-w-md">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                    </div>
                    <div className="footer-contact-us space-y-6">
                        <div className="text-black font-semibold text-sm tracking-wider uppercase">
                            COMPANY
                        </div>
                        <div className="space-y-4">
                            <div className="text-gray-600 text-sm hover:text-black transition-colors duration-200 cursor-pointer">
                                Home
                            </div>
                            <div className="text-gray-600 text-sm hover:text-black transition-colors duration-200 cursor-pointer">
                                Delivery
                            </div>
                            <div className="text-gray-600 text-sm hover:text-black transition-colors duration-200 cursor-pointer">
                                About us
                            </div>
                            <div className="text-gray-600 text-sm hover:text-black transition-colors duration-200 cursor-pointer">
                                Privacy Policy
                            </div>
                        </div>
                    </div>
                    <div className="footer-contact-details space-y-6">
                        <div className="text-black font-semibold text-sm tracking-wider uppercase">
                            GET IN TOUCH
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 text-sm hover:text-black transition-colors duration-200">
                                +91 95182-xxxxx
                            </p>
                            <p className="text-gray-600 text-sm hover:text-black transition-colors duration-200">
                                shubxxxx@gmail.com
                            </p>
                            <p>
                                <a href="https://www.instagram.com/shubham.jakhar._/" className="text-gray-600 text-sm hover:text-[#DCBCCE] transition-colors duration-200 underline underline-offset-2">
                                    instagram
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer-lower border-t border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-500 text-xs tracking-wide">
                        Copyright 2025@ shubham jakhar.dev - All Right Reserved.
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer;