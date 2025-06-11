export enum OrderStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Refunded = 'Refunded'
}

export enum ShippingStatus {
  Initialized = 'Initialized',
  InTransit = 'InTransit',
  OutForDelivery = 'OutForDelivery',
  Delivered = 'Delivered',
  Returned = 'Returned',
  Failed = 'Failed'
}
