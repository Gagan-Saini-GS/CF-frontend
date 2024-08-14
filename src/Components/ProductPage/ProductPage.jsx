import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Sizes } from "../../config";
import Checkbox from "../../GS-Libs/Input/Checkbox";
import { getDeliveryDate } from "../../GS-Libs/utils/getDeliveryDate";
import ColorFilterCard from "../Filters/ColorFilterCard";
import LabelValue from "../../GS-Libs/MultiUse/LabelValue";
import { apiCaller } from "../../GS-Libs/utils/apiCaller";
import Button from "../../GS-Libs/Buttons/Button";
import {
  getDeliveryChagres,
  getDiscountedPrice,
  limitText,
} from "../../GS-Libs/utils/productUtils";
import ProductImages from "../../GS-Libs/MultiUse/ProductImages";
import FullScreenLoader from "../../GS-Libs/MultiUse/FullScreenLoader";
import { useTheme } from "../../context/themeContext";

export default function ProductPage({ handleOpenCart }) {
  const { theme } = useTheme();
  const params = useParams();
  const productID = params.productID;

  const authToken = localStorage.getItem("CF_authToken");
  const [showTextLimit, setShowTextLimit] = useState(16);
  const [sellerDetails, setSellerDetails] = useState({});
  const [product, setProduct] = useState({});
  const [isProductAlreadyInCart, setIsProductAlreadyInCart] = useState(false);
  const [isProductFetched, setIsProductFetched] = useState(false);

  const getProductById = async () => {
    setIsProductFetched(false);
    try {
      const data = await apiCaller(
        "/get-product-with-id",
        "post",
        {
          productID: productID,
        },
        {},
        false
      );

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

  if (!isProductFetched) {
    return (
      <div className="relative w-full h-full">
        <FullScreenLoader />
      </div>
    );
  }

  return (
    <div
      className={`p-4 lg:p-8 w-full lg:h-full ${
        theme === "light" ? "bg-White text-Black/80" : "bg-Black text-White/80"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-16 h-full">
        <ProductImages product={product} />
        <div className="lg:col-span-5">
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex flex-col gap-2 lg:gap-4 w-full max-w-[500px]">
                <div className="text-2xl sm:text-3xl lg:text-5xl font-medium">
                  {product?.name}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold lg:font-medium">
                  <p className="hidden xs:block">{product?.description}</p>
                  <p className="xs:hidden">
                    {limitText(product?.description, showTextLimit)}
                    <span
                      className="text-Purple/80"
                      onClick={
                        showTextLimit <= 16
                          ? () => setShowTextLimit(1000)
                          : () => setShowTextLimit(16)
                      }
                    >
                      {showTextLimit <= 16 ? "...show more" : "...hide"}
                    </span>
                  </p>
                </div>
                <div className="">
                  <div className="bg-Red/70 text-White font-medium px-2 py-1 rounded inline-block">
                    Limited time deal
                  </div>
                  <div className="text-3xl font-semibold text-Purple mt-2">
                    <span className="text-Red/70 font-normal">–28%</span> $
                    {getDiscountedPrice(product?.price)}
                  </div>
                  <div className="text-lg text-Gray">
                    MRP{" "}
                    <span className="line-through font-light">
                      ${product?.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-1 lg:mt-2">
                <div className="text-xl font-semibold">Sizes</div>
                <div className="flex gap-2">
                  {Sizes.map((size) => {
                    return (
                      <Checkbox
                        label={size.name}
                        key={size.id}
                        isSelected={
                          product?.sizes?.includes(size.name.toLowerCase()) ||
                          false
                        }
                        readOnly={true}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-1 lg:mt-2">
                <div className="text-xl font-semibold">Colors</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
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
        <div className="h-full lg:h-3/5 border border-dashed border-Gray p-2 rounded-md flex flex-col justify-between md:col-span-2 lg:col-span-3 shadow-md pb-4">
          <div className="flex flex-col gap-4">
            <div>
              <div>
                <div className="text-2xl font-semibold text-Purple">
                  ${getDiscountedPrice(product?.price)}
                </div>
              </div>
              <div className="text-sm lg:text-lg">
                {product?.price > 1000
                  ? "Free delivery "
                  : `$${getDeliveryChagres(product?.price)} delivery chagres `}
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
          <div className="grid grid-cols-2 gap-2 w-full mt-4 lg:mt-0">
            {
              <>
                {authToken === undefined ||
                authToken === null ||
                authToken === "" ? (
                  <div className="col-span-2">
                    <Link to={"/login"}>
                      <Button text="Login to Buy" />
                    </Link>
                  </div>
                ) : (
                  <>
                    {isProductAlreadyInCart ? (
                      <Link to={"/home"}>
                        <Button
                          onClick={() => handleOpenCart()}
                          text="Go to Cart"
                          primaryColor={false}
                        />
                      </Link>
                    ) : (
                      <Button
                        onClick={() => addToCart()}
                        text="Add to Cart"
                        primaryColor={false}
                      />
                    )}
                    <Link to={"/product/buynow/" + productID}>
                      <Button text="Buy" />
                    </Link>
                  </>
                )}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
