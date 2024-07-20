import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Colors, PaymentMethods, Sizes } from "../../config";
import { Input } from "../../GS-Libs";
import Button from "../../GS-Libs/Buttons/Button";
import { Textarea } from "../../GS-Libs/Input/Textarea";
import Checkbox from "../../GS-Libs/Input/Checkbox";
import ColorFilterCard from "../Filters/ColorFilterCard";
import { toTitleCase } from "../../GS-Libs/utils/toTitleCase";
import QuantityInput from "../../GS-Libs/Input/QuantityInput";
import useForm from "../../hooks/useForm";
import {
  buyProductPageUserInitailValues,
  buyProductPageUserValidations,
} from "../../validations/buy-product-page-validations";
import { apiCaller } from "../../GS-Libs/utils/apiCaller";
import ProductImages from "../../GS-Libs/MultiUse/ProductImages";
import { getDiscountedPrice } from "../../GS-Libs/utils/productUtils";
import { useTheme } from "../../context/themeContext";

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
  const { theme } = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  const [paymentMethod, setPaymentMethod] = useState({
    paymentMethod: "",
    isValid: true,
  });

  const [product, setProduct] = useState();
  const [selectedSize, setSelectSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const placeOrder = async () => {
    try {
      await apiCaller(
        "/checkout-product",
        "post",
        {
          products: [
            {
              _id: params.productID,
              quantity: quantity,
              size: selectedSize,
              color: selectedColor,
              paymentMethod: paymentMethod.paymentMethod,
            },
          ],
        },
        {},
        true
      );

      await swal(
        "Congrats!",
        "The item is added into your order list and delivered soon when we start delivering the products.",
        "success"
      ).then(() => {
        setIsSubmitted(false);
        navigate("/home");
      });
    } catch (error) {
      swal("Sorry!", "We don't start delivering products yet!", "info").then(
        () => setIsSubmitted(false)
      );
      console.log(error);
    }
  };

  const {
    formData: user,
    setFormData,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(
    buyProductPageUserInitailValues,
    buyProductPageUserValidations,
    placeOrder
  );

  const buyProductDetails = async () => {
    try {
      const data = await apiCaller(
        "/buy-product",
        "post",
        {
          productID: params.productID,
        },
        {},
        true
      );

      setFormData((prev) => ({
        ...prev,
        name: data.userDetails.name,
        email: data.userDetails.email,
        phoneNumber: data.userDetails.phoneNumber,
        address: data.userDetails.address,
      }));
      setProduct(data.productDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.productID) buyProductDetails();
  }, [params.productID]);

  if (!product || !user) {
    return (
      <div className="fullscreen-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  const submitForm = (e) => {
    setIsSubmitted(true);
    if (
      paymentMethod.paymentMethod === "" ||
      selectedSize === "" ||
      selectedColor === ""
    ) {
      setPaymentMethod((prev) => ({ ...prev, isValid: false }));
      return;
    }

    handleSubmit(e);
  };

  return (
    <div
      className={`w-screen h-full flex flex-col md:flex-row justify-center ${
        theme === "light" ? "bg-White" : "bg-Black"
      }`}
    >
      <div className="w-full md:w-3/4 flex flex-col md:flex-row gap-4 h-full px-4 py-5 items-center">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <ProductImages product={product} />
          <div className="w-full max-w-[500px]">
            <div className="text-xl font-semibold">{product.name}</div>
            <div className="font-medium w-full">{product.description}</div>
            <div className="flex items-center gap-2 text-lg mt-4">
              <div className="font-medium inline-block text-center border border-dashed border-Gray px-2 py-1 rounded hover:border-Purple hover:border-solid hover:bg-Purple hover:text-White transition-all duration-200">
                {toTitleCase(product.brand)}
              </div>
              <div className="font-medium inline-block text-center border border-dashed border-Gray px-2 py-1 rounded hover:border-Purple hover:border-solid hover:bg-Purple hover:text-White transition-all duration-200">
                {toTitleCase(product.category)}
              </div>
            </div>
            <div className="text-3xl font-semibold text-Purple mt-4">
              <span className="text-Red/70 font-normal">–28%</span> $
              {getDiscountedPrice(product?.price)}
            </div>
            <div className="text-lg text-Gray">
              MRP{" "}
              <span className="line-through font-light">${product?.price}</span>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
                {Colors.map((color) => {
                  return (
                    <ColorFilterCard
                      color={color.color}
                      key={color}
                      isSelected={product.colors.includes(
                        color.color.toLowerCase()
                      )}
                      readOnly={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full md:w-1/4 flex flex-col overflow-y-scroll justify-between gap-4 p-4 shadow md:h-[87vh] ${
          theme === "light" ? "bg-Light" : "bg-Light/10"
        }`}
      >
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-1">
            <div className="text-lg font-medium">
              <p className="text-xs">Name</p> {user.name}
            </div>
            <div className="text-lg font-medium">
              <p className="text-xs">Email</p> {user.email}
            </div>
            <div className="text-lg font-semibold">
              <p className="text-xs">Phone Number</p>
              {user.phoneNumber ? (
                <>{user.phoneNumber}</>
              ) : (
                <>
                  <Input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    errorMessage={errors.phoneNumber}
                  />
                </>
              )}
            </div>
            <div className="text-lg font-semibold">
              <p className="text-xs">Address</p>
              {user.address ? (
                <>{user.address}</>
              ) : (
                <>
                  <Textarea
                    name="address"
                    placeholder="Enter Address"
                    value={user.address}
                    onChange={handleChange}
                    errorMessage={errors.address}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="text-xs font-semibold">Quantity</div>
            <div className="mt-2">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          <div className="w-full">
            <div className="text-xs font-semibold">Select Size</div>

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
            <div className="text-xs font-semibold">Select Color</div>

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
            <div className="text-xs font-semibold">
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

            {paymentMethod.paymentMethod === "upi" && (
              <div className="mt-2">
                <div className="text-xs font-semibold">UPI ID</div>
                <div className="w-full mt-2">
                  <Input
                    type="text"
                    name="upiIdValue"
                    placeholder="Enter UPI Id"
                    value={user.upiIdValue}
                    onChange={handleChange}
                    errorMessage={errors.upiIdValue}
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                  />
                </div>
              </div>
            )}
            {(paymentMethod.paymentMethod === "creditcard" ||
              paymentMethod.paymentMethod === "debitcard") && (
              <div className="mt-2">
                <div className="text-xs font-semibold">Card Details</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="col-span-2">
                    <Input
                      type="number"
                      name="cardNumber"
                      placeholder="Enter card number"
                      value={user.cardNumber}
                      onChange={handleChange}
                      errorMessage={errors.cardNumber}
                      className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                    />
                  </div>
                  <Input
                    type="text"
                    name="validDate"
                    placeholder="Enter Valid Date"
                    value={user.validDate}
                    onChange={handleChange}
                    errorMessage={errors.validDate}
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                  />
                  <Input
                    type="number"
                    name="cvc"
                    placeholder="Enter CVC"
                    value={user.cvc}
                    onChange={handleChange}
                    errorMessage={errors.cvc}
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-4">
          <Button text="Place Order" size="medium" onClick={submitForm} />
        </div>
      </div>
    </div>
  );
}
