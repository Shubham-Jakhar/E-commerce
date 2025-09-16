import hero_img from "/assets/hero_img.png";

const HeroSection = () => {
    return (
        <div className="hero-section mx-auto px-4 w-full max-w-6xl mb-16">
            <div className="
                flex flex-col lg:flex-row
                border border-gray-200 shadow-sm
                mx-auto
                w-full
                max-w-[400px]
                lg:max-w-6xl
                lg:w-auto
                min-h-[320px] max-h-[500px] lg:min-h-[350px] lg:max-h-[400px]
                ">
                <div className="hero-text flex-1 bg-gray-50 flex flex-col justify-center px-6 lg:px-10 py-8 lg:py-12 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <div className="space-y-4 max-w-sm mx-auto">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-px bg-black"></div>
                            <div className="text-gray-600 text-xs font-normal tracking-[0.25em] uppercase">
                                OUR BESTSELLERS
                            </div>
                        </div>
                        <div className="text-2xl lg:text-3xl xl:text-4xl font-normal text-black leading-tight">
                            Latest Arrivals
                        </div>
                        <div className="flex items-center space-x-3 pt-1">
                            <div className="text-black text-xs font-normal tracking-[0.2em] uppercase cursor-pointer hover:text-[#DCBCCE] transition-colors duration-300">
                                SHOP NOW
                            </div>
                            <div className="w-6 h-px bg-black hover:bg-[#DCBCCE] transition-colors duration-300"></div>
                        </div>
                    </div>
                </div>
                <div className="hero-image flex-1">
                    <div className="relative h-full">
                        <img
                            src={hero_img}
                            alt="Latest Arrivals"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                        />
                        <div className="absolute inset-0 bg-black/3 hover:bg-transparent transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;