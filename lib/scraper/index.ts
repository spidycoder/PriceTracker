"use server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(ProductUrl: string) {
  try {
    const { data } = await axios(ProductUrl);
    const $ = cheerio.load(data);
    const item = $("div#dp-container");
    const productName = $(item).find("h1 span#productTitle").text().trim();
    const productPrice = $(item)
      .find("span .a-price-whole")
      .first()
      .text()
      .replace(/[,.]/g, "");
    const productLink = ProductUrl;
    const outOfStock = $(item)
      .find("#availability span")
      .text()
      .trim()
      .toLowerCase();
    const images =
      $(item).find("#imgBlkFront").attr("data-a-dynamic-image") ||
      $(item).find("#landingImage").attr("data-a-dynamic-image") ||
      "{}";
    const imageUrl = Object.keys(JSON.parse(images));
    const currency = $(item).find(".a-price-symbol").text().trim().slice(0, 1);
    const discountRate = $(item)
      .find(".savingsPercentage")
      .text()
      .replace(/[-%]/g, "");

    //making data object after scraping
    const scrapedData = {
      ProductUrl,
      name: productName,
      Currency: currency || "₹",
      image: imageUrl[0],
      currentPrice: Number(productPrice),
      outOfStock: outOfStock,
      discount: Number(discountRate),
    };
    // console.log(scrapedData);
    return scrapedData;
  } catch (error: any) {
    throw new Error(`Failed to Scrape the Product ${error.message}`);
  }
}
