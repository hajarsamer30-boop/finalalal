import { getSingleProduct } from "./apis/product.api";
import GetImgSrcCom from "./GetImgSrcCom";
import ProductDetailsView from "./ProductDetailsView";
import RelatedProducts from "../RelatedProduct/RelatedPeoducts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsCom({ params }: PageProps) {
  const { id } = await params;
  const response = await getSingleProduct(id);
  const product = response.data;

  return (
    <ProductDetailsView
      product={product}
      gallery={<GetImgSrcCom cover={product.imageCover} imgs={product.images} />}
      relatedProducts={<RelatedProducts catId={product.category._id} />}
    />
  );
}
