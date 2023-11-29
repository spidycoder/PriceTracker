import ProductCard from "@/components/ProductCard";
import Track from "@/components/Track";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};
const page = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);
  const priceTillNow = product.currentPrice;
  if (!product) redirect("/");
  const similarProducts = await getSimilarProducts(id);
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            height={400}
            width={580}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold text-secondary">
                {product.name}
              </p>
              <Link
                href={product.ProductUrl}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  height={20}
                  width={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">100</p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  height={20}
                  width={20}
                />
              </div>
              {/* to-do: add the share functionality here */}
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info mb-2">
            <p className="text-[34px] text-secondary font-bold">
              <span>{product.Currency}</span>
              <span> {product.currentPrice}</span>
            </p>
            <p className="text-md opacity-50 font-semibold ">
              <span>Discount = </span>
              <span>{product.discount}%</span>
            </p>
          </div>
          <Track productId={id} currentPrice={priceTillNow}/>
        </div>
      </div>
      <div className="flex flex-col gap-14 ">
        <Link
          href={product.ProductUrl}
          className="bg-black px-10 rounded-[16px] py-3 font-semibold text-white text-center"
        >
          <button>Buy Now</button>
        </Link>
      </div>
      {similarProducts && similarProducts.length>0 && 
        <div className="py-14 flex flex-col  gap-2 w-full">
            <p className="section-text">Similar Products</p>
            <div className="flex flex-wrap gap-10 mt-7 w-full">
                {similarProducts.map((product)=>(
                    <ProductCard key={product.name} product={product}/>
                ))}
            </div>
        </div>

      }
    </div>
  );
};

export default page;
