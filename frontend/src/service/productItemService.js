const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const getItemsFromServer = async () => {
    const response = await fetch(`${backendUrl}/api/getItems`);
    const items = await response.json();
    return items.map(mapgetItemsToLocalItem);
}

export const getRelatedItemsFromServer = async ({ category, subCategory }) => {
    const response = await fetch(`${backendUrl}/api/relatedProducts/${category}/${subCategory}`);
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
        date: serverItem.date
    }
}

export const getProductItemFromServer = async (id) => {
    const response = await fetch(`${backendUrl}/api/product/${id}`);
    const productItem = await response.json();
    return mapgetProductItemToLocal(productItem);
}
const mapgetProductItemToLocal = (serverItem) => {
    return {
        id: serverItem._id,
        name: serverItem.name,
        price: serverItem.price,
        image: serverItem.image,
        bestseller: serverItem.bestseller,
        description: serverItem.description,
        sizes: serverItem.sizes,
        category: serverItem.category,
        subCategory: serverItem.subCategory
    }
}

export const postUserDetailsFromServer = async (data) => {
    const response = await fetch(`${backendUrl}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return await response.json();
}

export const getUserDetailsFromServer = async (data) => {
    const response = await fetch(`${backendUrl}/api/signin/${data.email}/${data.password}`, {
        method: "GET",
    });
    const result = await response.json();
    if (result.isLoggedin && result.token) {
        localStorage.setItem("token", result.token);
    }
    return result;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postAddToCart = async (id, size) => {
    const response = await fetch(`${backendUrl}/api/addToCart/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ size: size }),
    });
    return response.json();
}

export const getCartDataFromserver = async () => {
    const response = await fetch(`${backendUrl}/api/getCartItem`, {
        headers: { ...getAuthHeaders() },
    });
    const serverItem = await response.json();
    if (!serverItem.cart) return [];
    return serverItem.cart.map(mapCartItemsToLocalItem);
}

const mapCartItemsToLocalItem = (serverItem) => {
    return {
        id: serverItem.item._id,
        name: serverItem.item.name,
        price: serverItem.item.price,
        image: Array.isArray(serverItem.item.image) ? serverItem.item.image[0] : serverItem.item.image,
        size: serverItem.size,
        quantity: serverItem.quantity
    }
}

export const deleteItemFromCart = async (id) => {
    const response = await fetch(`${backendUrl}/api/cart/deleteItem/${id}`, {
        headers: { ...getAuthHeaders() },
        method: "DELETE",
    });
    return response.json();
}