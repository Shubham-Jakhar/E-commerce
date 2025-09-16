const backendUrl=import.meta.env.VITE_BACKEND_URL;
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
        subCategory: serverItem.subCategory
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
        credentials: "include",
    });
    return await response.json();
}

export const postSignoutUserFromServer = async () => {
    const response = await fetch(`${backendUrl}/api/signout`, {
        method: "POST",
        credentials: "include"
    });
    return await response.json();
}

export const getSessionFromServer = async () => {
    const response = await fetch(`${backendUrl}/api/session`, {
        method: "GET",
        credentials: "include",
    });
    return await response.json();
}

export const postAddToCart = async (id,size) => {
    const response = await fetch(`${backendUrl}/api/addToCart/${id}`,{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({size:size}),
  credentials: "include" 
});
    return response.json();
}

export const getCartDataFromserver = async ()=>{
    const response = await fetch(`${backendUrl}/api/getCartItem`,{
        credentials: "include"
    });
    const serverItem=await response.json();
    return serverItem.cart.map(mapCartItemsToLocalItem);
}

const mapCartItemsToLocalItem = (serverItem) => {
    return {
        id: serverItem.item._id,
        name: serverItem.item.name,
        price: serverItem.item.price,
        image: Array.isArray(serverItem.item.image) ? serverItem.item.image[0] : serverItem.item.image,
        size:serverItem.size,
        quantity: serverItem.quantity
    }
}

export const deleteItemFromCart = async (id)=>{
    const response = await fetch(`${backendUrl}/api/cart/deleteItem/${id}`,{
        credentials: "include"
    });
    
}