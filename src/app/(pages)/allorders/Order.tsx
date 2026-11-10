'use server'

export async function orders(userId: string) {
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

    if (!data.ok) throw new Error('Failed to fetch')
    return data.json()
}

