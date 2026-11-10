import Loading from "@/compoenets/ui/Loading";
import ProductDetailsCom from "@/features/productDetails/ProductDetailsCom";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function page({ params }: PageProps) {

    return (
        <div>
            <Suspense fallback={<Loading></Loading>}>
                <ProductDetailsCom params={params} ></ProductDetailsCom>
            </Suspense>
            

        </div>
    )
}
