"use client";
import { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions/index";

const isValidAmazonUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    //getting hostname of parsedUrl
    const hostname = parsedUrl.hostname;
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const Searchbar = () => {

  const [searchUrl, setSearchUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Url", searchUrl);
    //checking if the link is valid or not
    const isValidUrl = isValidAmazonUrl(searchUrl);
    if (!isValidUrl) {
      alert("Please Enter a valid Amazon Link");
    }
    try {
      setIsLoading(true);
      //scrape our data here
      const product = await scrapeAndStoreProduct(searchUrl);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setSearchUrl("");
    }
  };
  return (
    <form className="mt-12 flex flex-wrap gap-4" onSubmit={handlesubmit}>
      <input
        type="text"
        placeholder="Enter Amazon Product Link"
        value={searchUrl}
        className="searchbar-input"
        onChange={(e) => setSearchUrl(e.target.value)}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchUrl === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
