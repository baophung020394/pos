export interface Customer {
  customerId: string
  customerName: string
  customerTel: string
  retailCustomers: string
  purchaseDebts: string
  repairDebts: string
  orderQuantity: number
  orderReceiptDate: string
  orderReturnDate: string
  selected?: boolean
}

export interface CustomerDetail {
  idTag: string
  orderReceiptDate: string
  orderReturnDate: string
  service: string
  technicalName: string
  total: string
  status: string
  selected?: boolean
}
