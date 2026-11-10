'use client'
import { Button } from '@base-ui/react/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart } from '../actions/add-cart.actions'
import { Plus } from "lucide-react";
import { toast } from 'react-toastify';

export default function CartButtonCom({isProductItem,pId}:{isProductItem:boolean,pId:string}) {

    const query = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:addToCart,
        onSuccess:()=>{
            toast.success('item added successfully')
            query.invalidateQueries({queryKey:['cart']})
        },
        onError:(error)=>{
            toast.error(error.message||'login first')
        }
    })
  
    function addToCartFun()
    {
        mutate(pId)
    }

    return (
        <Button className={`h-11  rounded ${!isProductItem&&'bg-green-btn'}`}  onClick={addToCartFun} >
            {isProductItem? <Plus aria-hidden="true" />  :'Add to Cart'}
        </Button>
    )
}


