import { Product } from "@/type";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card">
      <div className="product-card_img-container">
        <Image src={product.image} alt="image" height={200} width={200} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.name}</h3>
        <div className="flex justify-between">
          <p className="text-black text-lg font-semibold">
            <span>{product.Currency}</span>
            <span>{product.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
