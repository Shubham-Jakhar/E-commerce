import { useEffect, useState } from "react";
import { getItemsFromServer } from "../service/productItemService";
import DummyLoadingStructure from "../components/dummyLoadingStructure";
import CollectionPost from "../components/collectionPost";

const Collection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [subCategory, setSubCategory] = useState("All");

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            const response = await getItemsFromServer();
            let filteredItems = response;
            if (category !== "All") {
                filteredItems = filteredItems.filter(item => item.category === category);
            }
            if (subCategory !== "All") {
                filteredItems = filteredItems.filter(item => item.subCategory === subCategory);
            }
            setItems(filteredItems);
            setLoading(false);
        };
        fetchItems();
    }, [category, subCategory]);

    return (
        <div className="latest-collection-section bg-white font-['Prata'] ">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="filter-nav py-3 border-b border-gray-100">
                    <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            <div
                                className={`cursor-pointer uppercase text-xs font-['Outfit'] font-medium tracking-[0.2em] transition-colors duration-200 ${category === "All"
                                    ? "text-black border-b border-black pb-1"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                                onClick={() => setCategory("All")}
                            >
                                ALL
                            </div>
                            <div
                                className={`cursor-pointer uppercase text-xs font-['Outfit'] font-medium tracking-[0.2em] transition-colors duration-200 ${category === "Men"
                                    ? "text-black border-b border-black pb-1"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                                onClick={() => setCategory("Men")}
                            >
                                MEN
                            </div>
                            <div
                                className={`cursor-pointer uppercase text-xs font-['Outfit'] font-medium tracking-[0.2em] transition-colors duration-200 ${category === "Women"
                                    ? "text-black border-b border-black pb-1"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                                onClick={() => setCategory("Women")}
                            >
                                WOMEN
                            </div>
                            <div
                                className={`cursor-pointer uppercase text-xs font-['Outfit'] font-medium tracking-[0.2em] transition-colors duration-200 ${category === "Kids"
                                    ? "text-black border-b border-black pb-1"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                                onClick={() => setCategory("Kids")}
                            >
                                KIDS
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-2 lg:mt-0">
                            <label
                                htmlFor="subcategories"
                                className="text-xs font-['Outfit'] font-medium text-gray-600 uppercase tracking-[0.2em]"
                            >
                                Filter
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="border border-gray-300 bg-white text-xs font-['Outfit'] px-3 py-2 rounded focus:outline-none focus:border-black transition-colors duration-200 min-w-[120px]"
                            >
                                <option value="All">All Categories</option>
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Winterwear">Winterwear</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="collection-heading text-center mb-3">
                    <div className="inline-flex items-center space-x-6">
                        <div className="w-12 lg:w-16 h-px bg-black"></div>
                        <div className="text-xl lg:text-2xl xl:text-3xl font-normal text-black tracking-[0.15em] uppercase">
                            {category} COLLECTION
                        </div>
                        <div className="w-12 lg:w-16 h-px bg-black"></div>
                    </div>
                </div>
                <div className="collection-items">
                    {loading ? <DummyLoadingStructure /> : <CollectionPost items={items} />}
                </div>
            </div>
        </div>
    )
}

export default Collection;