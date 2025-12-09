import { useState, useEffect } from "react";
import { postAddProduct, postUpdateProduct } from "../service/adminService";
import { useLocation, useNavigate } from "react-router-dom";

const AddProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state ? location.state.item : "";
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        sizes: [],
        bestseller: false,
        imagePreviews: [],
        imageFiles: [],
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                category: product.category || "",
                subCategory: product.subCategory || "",
                sizes: product.sizes || [],
                bestseller: product.bestseller || false,
                imagePreviews: product.images || [],
                imageFiles: [],
            });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSizeChange = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        const previewUrls = files.map(file => URL.createObjectURL(file));

        setFormData(prev => ({
            ...prev,
            imagePreviews: previewUrls,
            imageFiles: files
        }));
    };

    useEffect(() => {
        return () => {
            formData.imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [formData.imagePreviews]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadPromises = formData.imageFiles.map(async (file) => {
                const cloudData = new FormData();
                cloudData.append("file", file);
                cloudData.append("upload_preset", "unsigned_products");
                const res = await fetch("https://api.cloudinary.com/v1_1/diiisow0o/image/upload", {
                    method: "POST",
                    body: cloudData,
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error?.message || "Upload failed");
                }

                return data.secure_url;
            });

            const imageUrls = await Promise.all(uploadPromises);

            const productData = {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                subCategory: formData.subCategory,
                sizes: formData.sizes,
                bestseller: formData.bestseller,
                images: imageUrls,
            };
            let response;
            if (product) {
                response = await postUpdateProduct(productData, product.id);
            } else {
                response = await postAddProduct(productData);
            }
            alert(response.message);
            navigate("/admin/home");
        } catch (err) {
            alert("Failed to upload product. Try again later");
        }
    };

    return (
        <div className="add-edit-product bg-white p-6 font-['Outfit']">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-['Prata'] text-black uppercase tracking-wide mb-8">
                    {product ? "EDIT" : "Add"} Product
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs text-black uppercase mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 text-sm text-black"
                            placeholder="Women Round Neck Cotton Top"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-black uppercase mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 text-sm text-black resize-none"
                            placeholder="Description..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-black uppercase mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 text-sm text-black"
                            placeholder="100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-black uppercase mb-2">Product Images (max 4)</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-gray-300 text-sm text-black"
                        />
                        <div className="flex gap-4 mt-4">
                            {[0, 1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className="aspect-square w-24 border flex items-center justify-center bg-gray-50"
                                >
                                    {formData.imagePreviews[i] ? (
                                        <img
                                            src={formData.imagePreviews[i]}
                                            alt={`preview-${i}`}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">+ Add Image</span>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-black uppercase mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 text-sm text-black"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-black uppercase mb-2">Subcategory</label>
                            <select
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 text-sm text-black"
                                required
                            >
                                <option value="">Select Subcategory</option>
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Winterwear">Winterwear</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-black uppercase mb-2">Available Sizes</label>
                        <div className="flex gap-2 flex-wrap">
                            {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSizeChange(size)}
                                    className={`px-4 py-2 border text-sm ${formData.sizes.includes(size)
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-gray-300"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="bestseller"
                            name="bestseller"
                            checked={formData.bestseller}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                        />
                        <label htmlFor="bestseller" className="text-sm text-black">
                            Mark as Bestseller
                        </label>
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 text-sm uppercase tracking-wide hover:bg-gray-800"
                        >
                            {product ? "Update" : "Add"} Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
