import { useState } from "react";

const ProductDescription=()=>{
    const [activeTab,setActiveTab]=useState('description');
    return (
        <div className="product-description-section bg-white font-['Prata'] serif py-8 lg:py-12">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex justify-center space-x-8">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'details', label: 'Details' },
                            { id: 'care', label: 'Care' },
                            { id: 'shipping', label: 'Shipping' },
                            { id: 'reviews', label: 'Reviews'}
                        ].map((tab) => (
                            <div
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 text-xs font-['Outfit'] font-medium tracking-wider uppercase transition-colors duration-200 ${
                                    activeTab === tab.id
                                        ? 'text-black border-b-2 border-black hover:cursor-pointer'
                                        : 'text-gray-500 hover:text-black hover:cursor-pointer'
                                }`}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="max-w-3xl mx-auto">
                    {activeTab === 'description' && (
                        <div className="description-content text-center space-y-4">
                            <p className="text-gray-700 text-sm font-['Outfit'] leading-relaxed">
                                Crafted with meticulous attention to detail, this piece embodies sophistication and elegance. Made from premium materials for lasting quality and refined style that transcends seasonal trends.
                            </p>
                            <div className="inline-flex items-center space-x-2 text-xs font-['Outfit'] text-gray-600">
                                <span>Premium Quality</span>
                                <div className="w-1 h-px bg-gray-400"></div>
                                <span>Timeless Design</span>
                            </div>
                        </div>
                    )}
                    {activeTab === 'details' && (
                        <div className="details-content">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 font-['Outfit'] text-xs">
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span className="text-gray-600">Material</span>
                                        <span className="text-black">Premium Cotton</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span className="text-gray-600">Origin</span>
                                        <span className="text-black">Italy</span>
                                    </div>
                                </div>
                                <div className="space-y-2 font-['Outfit'] text-xs">
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span className="text-gray-600">Fit</span>
                                        <span className="text-black">Regular</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span className="text-gray-600">Weight</span>
                                        <span className="text-black">180 GSM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'care' && (
                        <div className="care-content">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                    <div className="text-sm">🧺</div>
                                    <p className="text-xs font-['Outfit'] text-gray-600">Machine wash cold</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm">🌡️</div>
                                    <p className="text-xs font-['Outfit'] text-gray-600">Tumble dry low</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm">👔</div>
                                    <p className="text-xs font-['Outfit'] text-gray-600">Iron medium heat</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'shipping' && (
                        <div className="shipping-content text-center space-y-3">
                            <div className="font-['Outfit'] text-xs text-gray-700 space-y-2">
                                <p><strong className="text-black">Free shipping</strong> on orders over $75</p>
                                <p><strong className="text-black">7-day returns</strong> with free return labels</p>
                                <p><strong className="text-black">Express shipping</strong> available for $15</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="shipping-content text-center space-y-3"></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDescription;