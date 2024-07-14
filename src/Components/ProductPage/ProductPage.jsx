import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Sizes } from "../../config";
import MobileProductPage from "./MobileProductPage";
import Checkbox from "../../GS-Libs/Input/Checkbox";
import { getDeliveryDate } from "../../GS-Libs/utils/getDeliveryDate";
import ColorFilterCard from "../Filters/ColorFilterCard";
import LabelValue from "../../GS-Libs/MultiUse/LabelValue";
import { apiCaller } from "../../GS-Libs/utils/apiCaller";

export default function ProductPage({ handleOpenCart }) {
  const params = useParams();
  const productID = params.productID;

  const [sellerDetails, setSellerDetails] = useState({});
  const [product, setProduct] = useState({});
  const [isProductAlreadyInCart, setIsProductAlreadyInCart] = useState(false);

  // const [writeReview, setWriteReview] = useState(false);
  // const [askQuestion, setAskQuestion] = useState(false);
  // const [stars, setStars] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [isProductFetched, setIsProductFetched] = useState(false);

  const getProductById = async () => {
    setIsProductFetched(false);
    try {
      const data = await apiCaller("/get-product-with-id", "post", {
        productID: productID,
      });

      setProduct(data.foundProduct);
      setSellerDetails(data.sellerDetails);
      setIsProductAlreadyInCart(data.isProductAlreadyInCart);
      setIsProductFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, [productID]);

  const addToCart = async () => {
    try {
      await apiCaller("/add-to-cart", "post", {
        productID: productID,
      });

      swal("Congrats!", "Item added into your cart", "success").then(() =>
        setIsProductAlreadyInCart(true)
      );
    } catch (error) {
      console.log(error);
      swal("Oops!", error, "error");
    }
  };

  // const windowWidth = window.innerWidth;
  // if (windowWidth <= 425) {
  //   return <MobileProductPage productID={productID} />;
  // }

  if (!isProductFetched) {
    return (
      <div className="fullscreen-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-White p-12">
      <div className="grid grid-cols-12 gap-16 h-full">
        <div className="flex gap-2 col-span-4">
          {product?.productImages && (
            <div className="rounded-md">
              <img
                className="max-w-[350px] max-h-[432px] rounded-md border-dashed border border-Gray p-2 shadow-md"
                src={product?.productImages[imgIndex]}
                alt=""
              />
            </div>
          )}
          {
            <div className="flex flex-col gap-2 max-h-[432px] overflow-y-scroll">
              {product?.productImages?.map((productImage, index) => {
                return (
                  <img
                    className={`w-20 h-20 max-w-20 max-h-20 border ${
                      imgIndex === index
                        ? "border-solid border-Purple shadow-Purple/30"
                        : "border-dashed border-Gray"
                    } p-1 shadow rounded`}
                    src={productImage}
                    alt=""
                    onClick={() => setImgIndex(index)}
                  />
                );
              })}
            </div>
          }
        </div>
        <div className="col-span-5">
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex flex-col gap-4 max-w-[500px]">
                <div className="text-5xl font-light">{product?.name}</div>
                <div className="text-lg font-medium">
                  {product?.description}
                </div>
                <div className="">
                  <div className="bg-Red/70 text-White font-medium px-2 py-1 rounded inline-block">
                    Limited time deal
                  </div>
                  <div className="text-3xl font-semibold text-Purple mt-2">
                    <span className="text-Red/70 font-normal">–28%</span> $
                    {product?.price}
                  </div>
                  <div className="text-lg text-Gray">
                    MRP{" "}
                    <span className="line-through font-light">
                      ${(product?.price * 1.4).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xl font-semibold">Sizes</div>
                <div className="flex gap-2">
                  {Sizes.map((size) => {
                    return (
                      <Checkbox
                        label={size.name}
                        key={size.id}
                        isSelected={
                          product?.sizes?.includes(size.name) || false
                        }
                        readOnly={true}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xl font-semibold">Colors</div>
                <div className="grid grid-cols-5 gap-1">
                  {product?.colors.map((color) => {
                    return (
                      <ColorFilterCard
                        color={color}
                        key={color}
                        readOnly={true}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-dashed border-Gray p-2 rounded-md flex flex-col justify-between col-span-3 shadow-md">
          <div className="flex flex-col gap-4">
            <div>
              <div>
                <div className="text-2xl font-semibold text-Purple">
                  ${product?.price}
                </div>
              </div>
              <div className="text-lg">
                Free delivery{" "}
                <span className="font-semibold">{getDeliveryDate()}</span>.
              </div>
            </div>
            <div className="">
              <div className="text-xl font-medium text-Green">In Order</div>
              <div className="flex flex-col gap-1">
                <LabelValue label="Ships from" value="Closet Fashion" />
                <LabelValue label="Sold by" value={sellerDetails.name} />
                <LabelValue label="Packaging by" value="CF Packaging" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {isProductAlreadyInCart ? (
              <Link to={"/home"}>
                <button className="w-full" onClick={() => handleOpenCart()}>
                  <div className="text-lg gap-2 px-5 py-2 rounded-md bg-Purple/30 text-center">
                    Go to Cart
                  </div>
                </button>
              </Link>
            ) : (
              <button onClick={addToCart} className="w-full">
                <div className="text-lg gap-2 px-5 py-2 rounded-md bg-Purple/30 text-center">
                  Add to Cart
                </div>
              </button>
            )}
            <button className="w-full">
              <Link to={"/product/buynow/" + productID}>
                <div className="text-lg text-White gap-2 px-5 py-2 rounded-md bg-Purple text-center">
                  <span>Buy</span>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
