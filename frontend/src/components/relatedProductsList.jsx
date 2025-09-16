import { useEffect, useState } from "react";
import DummyLoadingStructure from "./dummyLoadingStructure";
import RelatedProduct from "./relatedProduct";
import { getRelatedItemsFromServer } from "../service/productItemService";

const RelatedProductList = ({ item }) => {
    const category=item.category;
    const subCategory=item.subCategory;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await getRelatedItemsFromServer({category,subCategory});
            setItems(response);
            setLoading(!loading);
        };
        fetchItems();
    }, []);
    return (
        <div className="related-product-section bg-white font-['Prata'] serif py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="collection-heading text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center space-x-6">
                        <div className="w-16 h-px bg-black"></div>
                        <div className="text-2xl lg:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            RELATED PRODUCTS
                        </div>
                        <div className="w-16 h-px bg-black"></div>
                    </div>
                </div>
                <div className="related-items">
                    {loading ? <DummyLoadingStructure /> : <RelatedProduct items={items} />}
                </div>
            </div>
        </div>
    )
}

export default RelatedProductList;