
import ProductItem from '../Products/ProductItem'
import { getRelatedProducts } from './apis/related-products.api'

export default async function RelatedProducts({ catId }: { catId: string }) {

    const res = await getRelatedProducts(catId)

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {res.data.map((prod) => (
                <ProductItem key={prod._id} prod={prod} />
            ))}
        </div>
    )
}
