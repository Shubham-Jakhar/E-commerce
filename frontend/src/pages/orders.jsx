import { useEffect, useState } from "react";
import { useSession } from "../context/sessionContext";
import { getUserOrdersFromServer } from "../service/productItemService";
import DummyLoadingAdminHomeList from "../components/dummyAdminHomeList";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSession();
    useEffect(() => {
        const fetch = async () => {
            const response = await getUserOrdersFromServer(user.id);
            setOrders(response.orders);
            setLoading(false);
        }
        fetch();
    }, []);
    if (loading) {
        return <DummyLoadingAdminHomeList />;
    }
    return (
        <div className="space-y-8 p-4">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border border-gray-200 rounded-xl shadow-sm bg-white p-6"
                >
                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                        <div>
                            <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
                            <p className="text-sm text-gray-600">
                                Placed on: {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-green-700 font-bold text-lg">
                                ${order.totalAmount}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {order.items.map((product, index) => {
                            const item = product.item;
                            if (!item) return null;

                            const imageUrl = Array.isArray(item.image)
                                ? item.image[0]
                                : item.image;

                            return (
                                <div
                                    key={product._id || index}
                                    className="flex items-center space-x-6 border-b last:border-0 pb-3"
                                >
                                    <img
                                        src={
                                            imageUrl?.startsWith("http")
                                                ? imageUrl
                                                : `/assets/${imageUrl}`
                                        }
                                        alt={item.name}
                                        className="w-16 h-16 rounded object-cover border"
                                    />

                                    <div className="flex-1">
                                        <div className="font-medium text-black">{item.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {item.category} → {item.subCategory}
                                        </div>
                                        <div className="text-sm mt-1">
                                            <b>Size:</b> {product.size} | <b>Qty:</b> {product.quantity}
                                        </div>
                                        <div className="text-sm mt-1 text-green-600 font-semibold">
                                            ${product.price}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Status: {product.status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders;