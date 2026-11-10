export interface CartRes {
  payload: Payload
}

export interface Payload {
  status: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: any[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}
