export const createOrderRequest = (cartItems, userId, addressId, paymentMethod) => {
  let request = {};
  request.userId= userId;
  request.addressId = addressId;
  request.orderDate = new Date().toISOString();
  let orderItems = [];
  let amount = 0;
  cartItems?.map((item) => {
    amount += item?.subTotal; 
    orderItems.push({
      productId: item.productId,
      productVariantId: item?.variant?.id,
      discount: 0,
      quantity: item?.quantity
    })
  });
  request.orderItemRequests = orderItems;
  request.totalAmount =  amount?.toFixed(2);
  request.discount = 0;
  // request.paymentMethod= "COD";
  request.paymentMethod= paymentMethod;
  // request.expectedDeliveryDate = "2024-10-05T21:11:46.202Z";
  request.expectedDeliveryDate = new Date().toISOString();
  request.currency = "vnd";
  return request;
}

export const getStepCount = {
  'PENDING': 1,
  'IN_PROGRESS': 2,
  'SHIPPED': 3,
  'DELIVERED': 4
}