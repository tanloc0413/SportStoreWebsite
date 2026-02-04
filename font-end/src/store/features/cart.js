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
                
            // FIX: Tìm sản phẩm trùng. Ép về String để so sánh chính xác tuyệt đối
            const existingItemIndex = state.cart.findIndex(item => {
                // So sánh ID sản phẩm
                const isSameProduct = String(item.productId) === String(newItem.productId);

                // So sánh ID biến thể (nếu có variant thì so sánh id variant, nếu ko có thì coi như null)
                const currentVariantId = item.variant ? String(item.variant.id) : 'null';
                const newVariantId = newItem.variant ? String(newItem.variant.id) : 'null';
                const isSameVariant = currentVariantId === newVariantId;
            
                return isSameProduct && isSameVariant;
            });
        
            if (existingItemIndex >= 0) {
                // TRƯỜNG HỢP: Đã tồn tại -> Cộng dồn số lượng
                state.cart[existingItemIndex].quantity += newItem.quantity;

                // Tính lại subTotal
                state.cart[existingItemIndex].subTotal = 
                    state.cart[existingItemIndex].quantity * state.cart[existingItemIndex].price;
            } else {
                // TRƯỜNG HỢP: Chưa tồn tại -> Thêm mới
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
