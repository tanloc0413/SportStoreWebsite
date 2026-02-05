import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
}

const cartSlice = createSlice({
    name: 'cartState',
    initialState: initialState,
    reducers:{
        // addToCart: (state, action) =>{
        //     state.cart.push(action?.payload)
        //     return state;
        // },
        addToCart: (state, action) => {
            const newItem = action.payload;
                
            const existingItemIndex = state.cart.findIndex(item => {
                const isSameProduct = String(item.productId) === String(newItem.productId);

                const currentVariantId = item.variant ? String(item.variant.id) : 'null';
                const newVariantId = newItem.variant ? String(newItem.variant.id) : 'null';
                const isSameVariant = currentVariantId === newVariantId;
            
                return isSameProduct && isSameVariant;
            });
        
            if (existingItemIndex >= 0) {
                state.cart[existingItemIndex].quantity += newItem.quantity;

                state.cart[existingItemIndex].subTotal = 
                    state.cart[existingItemIndex].quantity * state.cart[existingItemIndex].price;
            } else {
                state.cart.push(newItem);
            }

            return state;
        },

        removeFromCart: (state, action) => {
            return {
                ...state,
                cart: state?.cart?.filter((item) => (
                    (item.id !== action?.payload?.productId) && (item?.variant?.id !== action?.payload?.variantId)
                ))
            }
        },

        updateQuantity: (state, action) => {
            return {
                ...state,
                cart: state?.cart?.map((item) => {
                    if(item?.variant?.id === action?.payload?.variant_id) {
                        return {
                            ...item,
                            quantity: action?.payload?.quantity,
                            subTotal: action?.payload?.quantity * item.price
                        }
                    }
                    return item;
                })
            };
        },

        deleteCart: (state, action) => {
            return {
                ...state,
                cart:[]
            }
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, deleteCart } = cartSlice?.actions;
export const countCartItems = (state) => state?.cartState?.cart?.length;
export const selectCartItems = (state) => state?.cartState?.cart ?? [];
export default cartSlice.reducer;
