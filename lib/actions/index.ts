"use server";

import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper";
import { generateEmailBody, sendEmail } from "../NodeMailer";

export async function scrapeAndStoreProduct(ProductUrl: string) {
  if (!ProductUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonProduct(ProductUrl);
    if (!scrapedProduct) return;
    await connectDB();
    //checking if the same product exist or not in the database
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({
      url: scrapedProduct.ProductUrl,
    });

      //TODO:UPDATE THE PRICE OF PRODUCT BY CALLING THIS FUNCTION EVERY 20s AND UPDATE THE DETAILS OF PRODUCT

    // if(existingProduct){
    //   // const UpdatePriceHistory:any = [
    //   //   // ...existingProduct.priceHistory,
    //   //   {price:scrapedProduct.currentPrice}
    //   // ]
    //   // product = {

    //   //   priceHistory:UpdatePriceHistory,
    //   // }
    //   product=scrapedProduct;
    // }
    // const newProduct = {
    //   url: product.ProductUrl,
    //   currency: product.Currency,
    //   image: product.image,
    //   title: product.name,
    //   originalPrice: product.currentPrice,
    //   discountRate: product.discount,
    //   isOutOfStock: product.outOfStock,
    // };

    const newProduct = await Product.findOneAndUpdate(
      { ProductUrl: scrapedProduct.ProductUrl },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to Find the Product:${error.message}`);
  }
}

export async function getProductById(ProductId: string) {
  try {
    await connectDB();
    const product = await Product.findOne({ _id: ProductId });
    if (!product) return;
    return product;
  } catch (error: any) {
    throw new Error(`Failed to find the product of id:${ProductId}`);
  }
}

export async function getAllProducts() {
  try {
    await connectDB();
    const products = await Product.find();
    return products;
  } catch (error: any) {
    throw new Error(`Failed to fetch the Produts`);
  }
}

export async function getSimilarProducts(ProductId: string) {
  try {
    await connectDB();
    const currentProduct = await Product.findById({ _id: ProductId });
    if (!currentProduct) return;
    const similarProducts = await Product.find({
      _id: { $ne: ProductId },
    }).limit(4);
    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(ProductId:string,email:string,price:number){
  try {
    const product = await Product.findById({_id:ProductId});
    if(!product)return;
    const newProduct = {
      name: product.name,
      currentPrice: product.currentPrice,
      ProductUrl: product.ProductUrl,
      newPrice: price,
    };
    const emailContent = generateEmailBody(newProduct);
    await sendEmail(emailContent,[email]);
  } catch (error:any) {
    console.error(error.message);
  }
}