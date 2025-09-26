import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteItemFromCart } from "../service/productItemService";
import { useSession } from "../context/sessionContext";
const CartPost = ({ cartItem }) => {
    const { refreshCart } = useSession();
    const handleDeleteBtn = async (id) => {
        const response = await deleteItemFromCart(id);
        refreshCart();
        if (!response.success) {
            alert("unable to delete due to internal server error");
        }
    }
    return (
        <div className="cart-post bg-white border-b border-gray-100 py-6 last:border-b-0">
            <div className="flex items-center space-x-6">
                <div className="image flex-shrink-0">
                    <img
                        src={cartItem.image.startsWith("http") ? cartItem.image : `/assets/${cartItem.image}`}
                        alt={cartItem.name}
                        className="w-20 h-20 lg:w-24 lg:h-24 object-cover border border-gray-200"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="post-name text-sm lg:text-base font-['Outfit'] font-medium text-black mb-2 truncate">
                        {cartItem.name}
                    </div>
                    <div className="flex items-center space-x-4 text-sm font-['Outfit'] text-gray-600">
                        <div className="post-price font-medium text-black">
                            $ {cartItem.price}
                        </div>
                        <div className="post-size uppercase tracking-wide">
                            Size: {cartItem.size}
                        </div>
                    </div>
                </div>
                <div className="actions flex-shrink-0">
                    <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200" onClick={() => handleDeleteBtn(cartItem.id)}>
                        <RiDeleteBin5Fill className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CartPost;;