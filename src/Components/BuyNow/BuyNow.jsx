import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Colors, PaymentMethods, SERVER_URL, Sizes } from "../../config";
import { Input } from "../../GS-Libs";
import Button from "../../GS-Libs/Buttons/Button";
import { Textarea } from "../../GS-Libs/Input/Textarea";
import Checkbox from "../../GS-Libs/Input/Checkbox";
import ColorFilterCard from "../Filters/ColorFilterCard";
import { toTitleCase } from "../../GS-Libs/utils/toTitleCase";

const PaymentItem = ({ name, value, isSelected, setPaymentMethod }) => {
  return (
    <div
      className={`border p-2 rounded  ${
        isSelected
          ? "bg-Purple text-White border-Purple"
          : "border-Gray hover:border-Purple hover:text-Purple"
      }`}
      onClick={() => setPaymentMethod({ isValid: true, paymentMethod: value })}
    >
      <div>{name}</div>
    </div>
  );
};

export default function BuyNow() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState();
  const [phoneNumber, setPhoneNumber] = useState({
    phoneNumber: "",
    isValid: true,
  });
  const [address, setAddress] = useState({
    address: "",
    isValid: true,
  });

  const [paymentMethod, setPaymentMethod] = useState({
    paymentMethod: "",
    isValid: true,
  });

  const [product, setProduct] = useState();
  const [imgIndex, setImgIndex] = useState(0);

  const [selectedSize, setSelectSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/buy-product`, {
        authToken: localStorage.getItem("authToken"),
        productID: params.productID,
      })
      .then((response) => {
        setUser(response.data.userDetails);
        setPhoneNumber((prev) => ({
          ...prev,
          phoneNumber: response.data.userDetails.phoneNumber,
        }));
        setAddress((prev) => ({
          ...prev,
          address: response.data.userDetails.address,
        }));
        setProduct(response.data.productDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.productID]);

  const placeOrder = () => {
    setIsSubmitted(true);
    if (
      phoneNumber.phoneNumber === undefined ||
      phoneNumber.phoneNumber.length !== 10
    ) {
      setPhoneNumber((prev) => ({ ...prev, isValid: false }));
    }

    if (address.address === undefined || address.address.length === 0) {
      setAddress((prev) => ({ ...prev, isValid: false }));
    }

    if (paymentMethod.paymentMethod === "") {
      setPaymentMethod((prev) => ({ ...prev, isValid: false }));
    }

    if (
      phoneNumber.phoneNumber === undefined ||
      phoneNumber.phoneNumber.length !== 10 ||
      address.address === undefined ||
      address.address.length === 0 ||
      paymentMethod.paymentMethod === ""
    ) {
      return;
    }

    const authToken = localStorage.getItem("authToken");
    axios
      .post(
        `${SERVER_URL}/checkout-product`,
        {
          products: [{ _id: params.productID }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        swal(
          "Congrats!",
          "The item is added into your order list and delivered soon when we start delivering the products.",
          "success"
        ).then(() => {
          setIsSubmitted(false);
          navigate("/home");
        });
      })
      .catch((err) => {
        swal("Sorry!", "We don't start delivering products yet!", "info").then(
          () => {
            setIsSubmitted(false);
          }
        );
        console.log(err);
      });
  };

  if (!product || !user) {
    return (
      <div className="fullscreen-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-White">
      <div className="w-2/3 flex gap-4 h-full px-4 items-center">
        <div className="flex gap-4 w-full">
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
          <div className="w-full max-w-[500px]">
            <div className="text-xl font-semibold text-Black">
              {product.name}
            </div>
            <div className="font-medium text-Black/80 w-full">
              {product.description}
            </div>
            <div className="flex items-center gap-2 text-lg mt-4">
              <div className="font-medium text-Black/80 inline-block text-center border border-dashed border-Gray px-2 py-1 rounded hover:border-Purple hover:border-solid hover:bg-Purple hover:text-White transition-all duration-200">
                {toTitleCase(product.brand)}
              </div>
              <div className="font-medium text-Black/80 inline-block text-center border border-dashed border-Gray px-2 py-1 rounded hover:border-Purple hover:border-solid hover:bg-Purple hover:text-White transition-all duration-200">
                {toTitleCase(product.category)}
              </div>
            </div>
            <div className="text-3xl font-semibold text-Purple mt-4">
              <span className="text-Red/70 font-normal">–28%</span> $
              {product?.price}
            </div>
            <div className="text-lg text-Gray">
              MRP{" "}
              <span className="line-through font-light">
                ${(product?.price * 1.4).toFixed(0)}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-xl font-semibold">Available Sizes</div>
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
            <div className="mt-4">
              <div className="text-xl font-semibold">Available Colors</div>
              <div className="grid grid-cols-4 gap-1">
                {Colors.map((color) => {
                  return (
                    <ColorFilterCard
                      color={color.color}
                      key={color}
                      isSelected={product.colors
                        .map((color) => color.color)
                        .includes(color.color)}
                      readOnly={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex items-center gap-4 bg-Light h-full px-10 shadow">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-1">
            <div className="text-lg font-medium">
              <p className="text-Black/80 text-xs">Name</p> {user.name}
            </div>
            <div className="text-lg font-medium">
              <p className="text-Black/80 text-xs">Email</p> {user.email}
            </div>
            <div className="text-lg font-semibold">
              <p className="text-Black/80 text-xs">Phone Number</p>
              {user.phoneNumber ? (
                <>{user.phoneNumber}</>
              ) : (
                <>
                  <Input
                    type="number"
                    placeholder="Enter Phone Number"
                    value={phoneNumber.phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber({
                        isValid: true,
                        phoneNumber: e.target.value,
                      });
                    }}
                    errorMessage={
                      !phoneNumber.isValid
                        ? "Please enter a valid phone number"
                        : undefined
                    }
                  />
                </>
              )}
            </div>
            <div className="text-lg font-semibold">
              <p className="text-Black/80 text-xs">Address</p>
              {user.address ? (
                <>{user.address}</>
              ) : (
                <>
                  <Textarea
                    name="address"
                    placeholder="Enter Address"
                    value={address.address}
                    onChange={(e) => {
                      setAddress({
                        isValid: true,
                        address: e.target.value,
                      });
                    }}
                    errorMessage={
                      !address.isValid
                        ? "Please enter a valid address"
                        : undefined
                    }
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="text-Black/80 text-xs font-semibold">
              Select Size
            </div>

            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => {
                return (
                  <div onClick={() => setSelectSize(size)}>
                    <Checkbox
                      label={size.toUpperCase()}
                      key={size}
                      isSelected={selectedSize === size}
                    />
                  </div>
                );
              })}
            </div>
            {isSubmitted && selectedSize === "" && (
              <span className="validation-error-msg">Please Select Size</span>
            )}
          </div>
          <div className="w-full">
            <div className="text-Black/80 text-xs font-semibold">
              Select Color
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              {product.colors.map((color) => {
                return (
                  <div onClick={() => setSelectedColor(color)} key={color}>
                    <ColorFilterCard
                      color={color}
                      isSelected={selectedColor === color}
                    />
                  </div>
                );
              })}
            </div>
            {isSubmitted && selectedColor === "" && (
              <span className="validation-error-msg">Please Select Color</span>
            )}
          </div>
          <div className="w-full">
            <div className="text-Black/80 text-xs font-semibold">
              Select Your Payment Method
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              {PaymentMethods.map((paymentItem) => {
                return (
                  <PaymentItem
                    key={paymentItem.id}
                    name={paymentItem.name}
                    value={paymentItem.value}
                    isSelected={
                      paymentMethod.paymentMethod === paymentItem.value
                    }
                    setPaymentMethod={setPaymentMethod}
                  />
                );
              })}
            </div>
            {!paymentMethod.isValid && (
              <span className="validation-error-msg">
                Please Select Payment Method
              </span>
            )}
          </div>
          <div className="w-full mt-4">
            <Button text="Place Order" size="medium" onClick={placeOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
