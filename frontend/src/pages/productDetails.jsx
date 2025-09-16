import { useParams } from "react-router-dom";
import ProductItemDetails from "../components/productItemDetailes";
import { useEffect, useState } from "react";
import { getProductItemFromServer } from "../service/productItemService";
import DummyProductItem from "../components/dummyProductItem";

const ProductDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const item = await getProductItemFromServer(id);
            setItem(item);
            setLoading(false);
        };
        fetchItems();
    }, [id]);

    return (
        <div className="product-details-page">
            {loading ? <DummyProductItem /> : <ProductItemDetails item={item} />}
        </div>
    )
}

export default ProductDetails;