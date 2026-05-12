export const mockOrders = [
  {
    _id: "ord_1001",
    orderDate: "2023-10-26T10:00:00Z",
    totalAmount: 150.75,
    status: "pending",
    items: [
      {
        productId: "prod_abc",
        name: "Wireless Mouse",
        quantity: 1,
        price: 25.5,
      },
      {
        productId: "prod_def",
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 125.25,
      },
    ],
  },
  {
    _id: "ord_1002",
    orderDate: "2023-09-15T14:30:00Z",
    totalAmount: 75.0,
    status: "pending",
    items: [
      { productId: "prod_ghi", name: "USB-C Hub", quantity: 2, price: 37.5 },
    ],
  },
  {
    _id: "ord_1003",
    orderDate: "2023-08-01T09:00:00Z",
    totalAmount: 210.0,
    status: "pending",
    items: [
      {
        productId: "prod_jkl",
        name: "27-inch Monitor",
        quantity: 1,
        price: 210.0,
      },
    ],
  },
];
