const DummyLoadingAdminHomeList = ()=>{
    return(
        <div className="admin-product-list-skeleton space-y-3">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="post bg-white border border-gray-200 rounded animate-pulse">
                    <div className="flex items-center p-4 space-x-4">
                        
                        {/* Small Image Skeleton */}
                        <div className="image flex-shrink-0">
                            <div className="w-14 h-14 bg-gray-200 border border-gray-200 rounded"></div>
                        </div>

                        {/* Product Info Skeleton */}
                        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
                            <div className="lg:col-span-2 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                            <div>
                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                            </div>
                        </div>

                        {/* Action Buttons Skeleton */}
                        <div className="action-buttons flex items-center space-x-2 flex-shrink-0">
                            <div className="w-7 h-7 bg-gray-200 rounded"></div>
                            <div className="w-7 h-7 bg-gray-200 rounded"></div>
                            <div className="w-7 h-7 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DummyLoadingAdminHomeList;