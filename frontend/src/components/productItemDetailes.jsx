import { useState } from "react";
import { postAddToCart } from "../service/productItemService";
import ProductDescription from "./productDescription";
import RelatedProductList from "./relatedProductsList";
import { useSession } from "../context/sessionContext";

const ProductItemDetails = ({ item }) => {
    const [itemSize, setItemSize] = useState(null);
    const {setCartItems}=useSession();
    const handleSubmit = async (id) => {
        if (itemSize) {
            const response = await postAddToCart(id, itemSize);
            if (response.success) {
                setCartItems(prev => [...prev, { id, size: itemSize, price: item.price }]);
                alert("item added to cart");
            } else if (!response.success) {
                alert("please login");
            }
        } else alert("please select size");

    }

    return (
        <div className="product-details">
            <div className="product-details-container bg-white font-['Prata'] serif py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        <div className="image-container">
                            <div className="flex gap-4">
                                <div className="small-image flex flex-col gap-3 w-20">
                                    <img
                                        src={`/assets/${item.image[0]}`}
                                        alt={item.name}
                                        className="w-full aspect-square object-cover border border-gray-200 cursor-pointer hover:border-black transition-colors duration-200"
                                    />
                                    <img
                                        src={`/assets/${item.image[1] ? item.image[1] : item.image[0]}`}
                                        alt={item.name}
                                        className="w-full aspect-square object-cover border border-gray-200 cursor-pointer hover:border-black transition-colors duration-200"
                                    />
                                    <img
                                        src={`/assets/${item.image[2] ? item.image[2] : item.image[0]}`}
                                        alt={item.name}
                                        className="w-full aspect-square object-cover border border-gray-200 cursor-pointer hover:border-black transition-colors duration-200"
                                    />
                                    <img
                                        src={`/assets/${item.image[3] ? item.image[3] : item.image[0]}`}
                                        alt={item.name}
                                        className="w-full aspect-square object-cover border border-gray-200 cursor-pointer hover:border-black transition-colors duration-200"
                                    />
                                </div>

                                <div className="big-image flex-1">
                                    <img
                                        src={`/assets/${item.image[0]}`}
                                        alt={item.name}
                                        className="w-full h-96 lg:h-[600px] object-cover border border-gray-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="details-container space-y-8">

                            <div className="product-name">
                                <h1 className="text-3xl lg:text-4xl font-normal text-black leading-tight">
                                    {item.name}
                                </h1>
                            </div>

                            <div className="product-review flex items-center gap-4">
                                <div className="star-rating flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-sm">★</span>
                                    ))}
                                </div>
                                <div className="total-view text-gray-600 text-sm font-['Outfit']">
                                    (122 reviews)
                                </div>
                            </div>

                            <div className="product-price">
                                <div className="text-2xl font-normal text-black">
                                    ${item.price}
                                </div>
                            </div>

                            <div className="product-description">
                                <p className="text-gray-700 text-sm font-['Outfit'] leading-relaxed">
                                    Crafted with meticulous attention to detail, this timeless piece embodies
                                    sophistication and elegance. Made from premium materials for lasting quality
                                    and refined style.
                                </p>
                            </div>

                            <div className="product-size space-y-4">
                                <div className="text-sm font-semibold text-black uppercase tracking-wider font-['Outfit']">
                                    Size
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {item.sizes.map((size, index) => (
                                        <div key={index} className="product-size-available">
                                            <div
                                                className={`px-4 py-2 border text-sm font-['Outfit'] cursor-pointer transition-all duration-200 text-center min-w-[3rem] ${itemSize === size
                                                        ? 'border-black bg-[#C9C3F4] text-black'
                                                        : 'border-gray-300 hover:border-black hover:bg-gray-50'
                                                    }`}
                                                onClick={() => setItemSize(size)}
                                            >
                                                {size}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="product-cart-button pt-4">
                                <button className="w-full bg-black text-white py-4 px-8 text-sm font-['Outfit'] font-medium tracking-wider uppercase hover:bg-[#C9C3F4] hover:text-black transition-all duration-300 border border-black hover:border-[#C9C3F4]" onClick={() => handleSubmit(item.id)}>
                                    Add to Cart
                                </button>
                            </div>
                            <div className="product-extra-details space-y-4 pt-6 border-t border-gray-100">
                                <div className="space-y-3 text-sm font-['Outfit'] text-gray-600">
                                    <p className="flex justify-between">
                                        <span>Material:</span>
                                        <span>100% Premium Cotton</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Care Instructions:</span>
                                        <span>Machine wash cold</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span>Free delivery</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Returns:</span>
                                        <span>7-day return policy</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDescription />
            <RelatedProductList item={item} />
        </div>

    )
}

export default ProductItemDetails;