import { useNavigate } from "react-router-dom";

const CollectionPost=({items})=>{
    const navigate=useNavigate();
    return(
        <div className="collection-post grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {items.map((item, index) => (
                <div key={index} className="post group cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                    <div className="image relative overflow-hidden bg-gray-50 border border-gray-100">
                        <img
                            src={`/assets/${item.image}`}
                            alt={item.name}
                            className="w-full h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 px-4 py-2 text-xs font-['Outfit'] tracking-wider uppercase text-black border border-gray-200">
                                Quick View
                            </div>
                        </div>
                    </div>
                    <div className="post-details mt-4 space-y-2 text-center">
                        <div className="post-name text-sm font-['Outfit'] text-black hover:text-[#DCBCCE] transition-colors duration-200 line-clamp-2">
                            {item.name}
                        </div>
                        <div className="post-price text-sm font-['Prata'] font-normal text-gray-700">
                            <b>$</b>{item.price}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CollectionPost;