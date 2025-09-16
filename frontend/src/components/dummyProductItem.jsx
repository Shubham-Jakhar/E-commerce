const DummyProductItem=()=>{
    return (
    <div className="product-details-container bg-white font-['Prata'] serif py-8 lg:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image Skeleton */}
          <div className="image-container">
            <div className="flex gap-4">
              <div className="small-image flex flex-col gap-3 w-20">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full aspect-square bg-gray-200 rounded-md" />
                ))}
              </div>
              <div className="big-image flex-1">
                <div className="w-full h-96 lg:h-[600px] bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="details-container space-y-8">
            <div className="h-8 w-1/2 bg-gray-200 rounded-md" /> {/* product name */}
            <div className="h-4 w-1/4 bg-gray-200 rounded-md" /> {/* reviews */}
            <div className="h-6 w-1/6 bg-gray-200 rounded-md" /> {/* price */}
            <div className="h-16 w-full bg-gray-200 rounded-md" /> {/* description */}
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-10 bg-gray-200 rounded-md" />
              ))}
            </div>
            <div className="h-12 w-full bg-gray-200 rounded-md" /> {/* button */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DummyProductItem;