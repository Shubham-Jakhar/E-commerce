const DummyLoadingStructure = () => {
    return (
        <div className="collection-post grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="post">
                    <div className="image relative overflow-hidden bg-gray-100 border border-gray-100 animate-pulse">
                        <div className="w-full h-64 lg:h-72 bg-gray-200"></div>
                    </div>
                    <div className="post-details mt-4 space-y-3 text-center animate-pulse">
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default DummyLoadingStructure;