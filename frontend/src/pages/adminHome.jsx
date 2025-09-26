import { useEffect, useState } from "react";
import { getAllProductsFromSerever } from "../service/adminService";
import AdminHomeList from "../components/adminHomeList";
import DummyLoadingAdminHomeList from "../components/dummyAdminHomeList";

const AdminHome = ()=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchProducts = async ()=>{
            const response = await getAllProductsFromSerever();
            setProducts(response);
            setLoading(false);
        };
        fetchProducts();
    },[]);
    return (
        <div className="admin-home bg-white p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-['Prata'] text-black uppercase tracking-wide">
                    Admin Dashboard
                </h1>
            </div>
            {loading ? <DummyLoadingAdminHomeList/> : <AdminHomeList products={products}/>}
        </div>
    )
}

export default AdminHome;