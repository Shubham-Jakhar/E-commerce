const backendUrl = import.meta.env.VITE_BACKEND_URL;
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllProductsFromSerever = async () =>{
    const response = await fetch(`${backendUrl}/admin/getAllProducts`, {
        headers: { ...getAuthHeaders() },
    });
    const items = await response.json();
    return items.map(mapgetItemsToLocalItem);
}

const mapgetItemsToLocalItem = (serverItem) => {
    return {
        id: serverItem._id,
        name: serverItem.name,
        price: serverItem.price,
        image: Array.isArray(serverItem.image) ? serverItem.image[0] : serverItem.image,
        bestseller: serverItem.bestseller,
        category: serverItem.category,
        subCategory: serverItem.subCategory,
        sizes: serverItem.sizes,
        updatedAt: serverItem.date,
        description: serverItem.description,
    }
}

export const postAddProduct = async (data) =>{
    const response = await fetch(`${backendUrl}/admin/addProduct`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const postDeleteProduct = async (itemId) =>{
    const response = await fetch(`${backendUrl}/admin/deleteProduct/${itemId}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders()
        },
    });
    return await response.json();
}

export const postUpdateProduct = async (data, productId) =>{
    const response = await fetch(`${backendUrl}/admin/updateProduct/${productId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const getAdminOrdersFromServer = async () =>{
    const response = await fetch(`${backendUrl}/admin/getAllOrders`,{
        headers:{...getAuthHeaders()}
    });
    return await response.json();
}

export const postUpdateStatusOfOrder = async (status,orderId) =>{
    const response = await fetch(`${backendUrl}/admin/updateStatus/${orderId}`,{
        headers:{
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({status})
    });
    return await response.json();
}