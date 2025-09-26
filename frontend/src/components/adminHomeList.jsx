import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { postDeleteProduct } from "../service/adminService";
import { useNavigate } from "react-router-dom";

const AdminHomeList=({products})=>{
    const navigate = useNavigate();
    const handleDeleteProduct= async (itemId)=>{
        const response = await postDeleteProduct(itemId);
        alert(response.message);
    }
    return(
        <div className="admin-product-list-post space-y-4">
    {products.map((item, index) => (
        <div key={index} className="post bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 rounded-lg shadow-sm">
            <div className="flex items-center p-6 space-x-6">
                
                {/* Small Product Image */}
                <div className="image flex-shrink-0">
                    <img
                        src={item.image.startsWith("http") ? item.image : `/assets/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 lg:w-20 lg:h-20 object-cover border border-gray-200 rounded"
                    />
                </div>

                {/* Product Details */}
                <div className="product-info flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="post-name text-base font-['Outfit'] font-medium text-black truncate pr-4">
                                {item.name}
                            </div>
                            <div className="flex items-center space-x-4 text-sm font-['Outfit'] text-gray-600">
                                <span className="post-price font-semibold text-black">
                                    <b>$</b>{item.price}
                                </span>
                                <span className="post-category uppercase tracking-wide">
                                    {item.category}
                                </span>
                                <span className="post-subcategory text-xs bg-gray-100 px-2 py-1 rounded uppercase tracking-wide">
                                    {item.subCategory}
                                </span>
                            </div>
                            <div className="post-sizes text-xs font-['Outfit'] text-gray-500">
                                Sizes: {item.sizes?.join(', ') || 'N/A'}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons flex items-center space-x-3 flex-shrink-0">
                            <button
                                onClick={() => navigate("/add/product",{state:{item}})}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                                title="Edit Product"
                            >
                                <MdEdit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProduct(item.id);
                                }}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                                title="Delete Product"
                            >
                                <RiDeleteBin5Fill className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
                <div className="flex items-center justify-between text-xs font-['Outfit'] text-gray-600">
                    <span>ID: {item.id}</span>
                    <span className={`px-2 py-1 rounded uppercase tracking-wide ${
                        item.bestseller ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                        {item.bestseller ? 'Bestseller' : 'Regular'}
                    </span>
                    <span>Updated: {new Date(item.updatedAt || Date.now()).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    ))}
</div>
    )
}

export default AdminHomeList;