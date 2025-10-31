import { useEffect } from "react";
import { useState } from "react";
import { getAdminOrdersFromServer, postUpdateStatusOfOrder } from "../service/adminService";
import DummyLoadingAdminHomeList from "../components/dummyAdminHomeList";

const AdminOrders = () => {
    const [refershStatus, setRefershStatus] = useState(true);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            const orders = await getAdminOrdersFromServer();
            setOrders(orders);
            setLoading(false);
        }
        fetch();
    }, [refershStatus]);

    const statusOptions = [
        { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'placed', label: 'Placed', color: 'bg-blue-100 text-blue-800' },
        { value: 'packed', label: 'Packed', color: 'bg-purple-100 text-purple-800' },
        { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800' },
        { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800' },
        { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' }
    ];

    const handleStatusChange = async (orderId, newStatus) => {
        const response = await postUpdateStatusOfOrder(newStatus, orderId);
        if (response.success) {
            setRefershStatus(!refershStatus);
        } else {
            alert(response.message);
        }
    };
    const getStatusColor = (status) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
    };
    if (loading) {
        return <DummyLoadingAdminHomeList />;
    }
    return (
        <div className="admin-order-list bg-white p-6 font-['Outfit']">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-['Prata'] text-black uppercase tracking-wide">
                        Order Management
                    </h1>
                </div>
                <div className="space-y-4">
                    {orders?.map((order, index) => (
                        <div key={order._id || index} className="order-item bg-gray-50 border border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="order-info">
                                    <h3 className="text-lg text-black">
                                        Order #{order._id}
                                    </h3>
                                </div>
                                <div className="status-control">
                                    <select
                                        value={order.items[0].status || 'pending'}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="p-2 border border-gray-300 text-sm text-black bg-white"
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="order-items space-y-2">
                                {order.items?.map((item, itemIndex) => (
                                    <div key={item._id || itemIndex} className="item bg-white border border-gray-200 p-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-600 uppercase mb-1">Item ID</p>
                                                <p className="text-sm text-black">{item._id}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 uppercase mb-1">Size</p>
                                                <p className="text-sm text-black">{item.size}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 text-xs uppercase tracking-wide ${getStatusColor(item.status || 'pending')}`}>
                                                    {statusOptions.find(opt => opt.value === (item.status || 'pending'))?.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminOrders;