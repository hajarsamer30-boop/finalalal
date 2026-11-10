import React from 'react'
import CheckoutPage from '../ChechOutCom'

export default async function page({params}:{params:Promise<{id:string}>}) {

  const {id} = await params
  return (
    <div>
      <CheckoutPage id={id}></CheckoutPage>
    </div>
  )
}
