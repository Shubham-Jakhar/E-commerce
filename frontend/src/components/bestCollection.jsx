import { useEffect, useState } from "react";
import { getItemsFromServer } from "../service/productItemService";
import BestCollectionPost from "./bestcollectionPost";
import DummyLoadingStructure from "./dummyLoadingStructure";

const BestCollection = () => {
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchItems= async ()=>{
            const response = await getItemsFromServer();
            setItems(response);
            setLoading(!loading);
        };
        fetchItems();
    },[]);
    const bestItems=items.filter(item=>item.bestseller!==false);
    return (
        <div className="latest-collection-section bg-white font-['Prata'] serif py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="collection-heading text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center space-x-6">
                        <div className="w-16 h-px bg-black"></div>
                        <div className="text-2xl lg:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            BEST COLLECTIONS
                        </div>
                        <div className="w-16 h-px bg-black"></div>
                    </div>
                    <div className="mt-4 text-gray-600 text-sm font-['Outfit'] max-w-md mx-auto leading-relaxed">
                        Discover our carefully curated selection of timeless pieces
                    </div>
                </div>
                <div className="collection-items">
                    {loading ? <DummyLoadingStructure/>:<BestCollectionPost items={bestItems} />}                    
                </div>
            </div>
        </div>

    )
}

export default BestCollection;