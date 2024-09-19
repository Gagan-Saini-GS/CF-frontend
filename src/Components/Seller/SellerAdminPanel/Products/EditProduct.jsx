import React, { useState } from "react";
import swal from "sweetalert";
import {
  Brands,
  BrandValues,
  Categories,
  CategoryValues,
  Colors,
  ColorValues,
  Genders,
  Materials,
  Sizes,
  SizeValues,
} from "../../../../config";
import { uploadProductValidation } from "../../../../validations/upload-product-validation";
import uploadImage from "../../../../GS-Libs/utils/uploadImage";
import { apiCaller } from "../../../../GS-Libs/utils/apiCaller";
import useForm from "../../../../hooks/useForm";
import FullScreenLoader from "../../../../GS-Libs/MultiUse/FullScreenLoader";
import Button from "../../../../GS-Libs/Buttons/Button";
import { Input } from "../../../../GS-Libs";
import Select from "../../../../GS-Libs/Input/Select";
import Checkbox from "../../../../GS-Libs/Input/Checkbox";
import ColorFilterCard from "../../../Filters/ColorFilterCard";
import { Textarea } from "../../../../GS-Libs/Input/Textarea";

const EditProduct = ({ product, closeModal, showUpdatedProduct }) => {
  const [isProductUploading, setIsProductUploading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const newInitailValues = {
    _id: product._id,
    name: product.name,
    price: product.price,
    brand: { name: product.brand, value: product.brand },
    category: { name: product.category, value: product.category },
    gender: product.gender,
    quantity: product.quantity,
    sizes: [...product.sizes.map((size) => SizeValues[size])],
    materials: product.materials,
    colors: [
      ...product.colors.map((color) => ColorValues[color.toLowerCase()]),
    ],
    description: product.description,
    productImages: [...product.productImages],
  };

  const editProduct = async () => {
    setIsProductUploading(true);
    try {
      const { product } = await apiCaller(
        "/edit-product",
        "post",
        {
          productDetails: productDetails,
        },
        {},
        true
      );

      showUpdatedProduct(productDetails._id, product);

      swal("Thanks", "Your Product is edited!", "success").then(() => {
        closeModal();
      });
      setProductDetails(product);
      setImageIndex(0);
      setIsProductUploading(false);
    } catch (error) {
      console.log(error);
      swal("Oops", "Something went wrong", "error").then(() => {
        setProductDetails(product);
        setImageIndex(0);
        setIsProductUploading(false);
      });
    }
  };

  const {
    formData: productDetails,
    setFormData: setProductDetails,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm(newInitailValues, uploadProductValidation, editProduct);

  if (isProductUploading) {
    return (
      <div className="pb-4 p-2 h-full relative flex items-center justify-center">
        <FullScreenLoader message="Editing Product..." />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full gap-4">
        <div className="w-auto">
          <div className="pb-4 p-2 w-96 h-96 max-w-96 max-h-96">
            <label htmlFor="edit-product-image-upload">
              <div
                className={`bg-Black/40 w-full h-64 xs:h-80 sm:h-96 max-w-96 max-h-96 rounded-xl absolute top-6 left-6 ${
                  errors.productImages && "border border-Red"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  id="edit-product-image-upload"
                  multiple={true}
                  onChange={(event) => {
                    uploadImage(event).then((res) => {
                      setProductDetails((prev) => ({
                        ...prev,
                        productImages: [...prev.productImages, ...res],
                      }));
                    });

                    if (errors.productImages) {
                      setErrors((prev) => ({
                        ...prev,
                        productImages: "",
                      }));
                    }
                  }}
                />
              </div>
            </label>

            <div className="w-full h-[15rem] xs:h-[19rem] sm:h-[23rem] max-w-96 max-h-96">
              <img
                src={productDetails?.productImages?.[imageIndex]}
                alt=""
                className="w-full h-full rounded-lg block"
              />
            </div>

            <div className="pt-1">
              {errors.productImages && (
                <span className="text-Red text-sm font-normal">
                  {errors.productImages}
                </span>
              )}
            </div>
          </div>
          {productDetails.productImages.length > 1 && (
            <div className="flex items-center gap-2 mt-2">
              <Button
                text="Prev"
                onClick={() => {
                  if (imageIndex >= 1) {
                    setImageIndex(imageIndex - 1);
                  } else {
                    setImageIndex(productDetails.productImages.length - 1);
                  }
                }}
              />
              <Button
                text="Next"
                onClick={() => {
                  if (imageIndex < productDetails.productImages.length - 1) {
                    setImageIndex(imageIndex + 1);
                  } else {
                    setImageIndex(0);
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col w-4/5 gap-4">
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-semibold">Name</div>
              <Input
                type="text"
                name="name"
                placeholder="Product name"
                value={productDetails.name}
                onChange={handleChange}
                errorMessage={errors.name}
                className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
              />
            </div>
            <div>
              <div className="text-lg font-semibold">Price</div>
              <Input
                type="number"
                name="price"
                placeholder="Product price"
                value={productDetails.price}
                onChange={handleChange}
                errorMessage={errors.price}
                className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
              />
            </div>
            <div>
              <div className="text-lg font-semibold">Brand</div>
              <Select
                name="brand"
                onChange={(argument) => {
                  handleChange({
                    target: {
                      name: "brand",
                      value: {
                        label: argument?.label?.toLowerCase(),
                        value: argument?.label?.toLowerCase(),
                      },
                      type: "select",
                    },
                  });
                }}
                value={{
                  label: BrandValues[productDetails.brand.name],
                  value: productDetails.brand.name,
                }}
                options={Brands.map((brand) => ({
                  label: brand.name,
                  value: brand.id,
                }))}
                placeholder="Select a brand"
                errorMessage={errors.brand}
              />
            </div>
            <div>
              <div className="text-lg font-semibold">Category</div>
              <Select
                name="category"
                onChange={(argument) => {
                  handleChange({
                    target: {
                      name: "category",
                      value: {
                        label: argument?.label?.toLowerCase(),
                        value: argument?.label?.toLowerCase(),
                      },
                      type: "select",
                    },
                  });
                }}
                value={{
                  label: CategoryValues[productDetails.category.name],
                  value: productDetails.category.name,
                }}
                options={Categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                placeholder="Select a Category"
                errorMessage={errors.category}
              />
            </div>
            <div>
              <div className="text-lg font-semibold">Quantity</div>
              <Input
                type="number"
                name="quantity"
                placeholder="Product quantity"
                value={productDetails.quantity}
                onChange={handleChange}
                errorMessage={errors.quantity}
                className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
              />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div>
              <div className="text-lg font-semibold">
                Genders{" "}
                {errors.gender && (
                  <span className="text-Red text-sm font-normal">
                    ({errors.gender})
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {Genders.map((option) => {
                  const isGenderSelected =
                    productDetails.gender.toLowerCase() ===
                    option.name.toLowerCase();

                  return (
                    <div
                      key={option.id}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "gender",
                            value: isGenderSelected ? "" : option.name,
                            type: "checkbox",
                          },
                        });
                      }}
                    >
                      <Checkbox
                        label={option.name}
                        isSelected={isGenderSelected}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                Sizes{" "}
                {errors.sizes && (
                  <span className="text-Red text-sm font-normal">
                    ({errors.sizes})
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {Sizes.map((option) => {
                  const isSizeSelected = productDetails.sizes
                    .map((size) => size.name?.toLowerCase())
                    .includes(option.name?.toLowerCase());

                  return (
                    <div
                      key={option.id}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "sizes",
                            value: isSizeSelected
                              ? [
                                  ...productDetails.sizes.filter(
                                    (size) => size.name !== option.name
                                  ),
                                ]
                              : [...productDetails.sizes, option].sort(
                                  (a, b) => a.id - b.id
                                ),
                            type: "checkbox",
                          },
                        });
                      }}
                    >
                      <Checkbox
                        label={option.name}
                        isSelected={isSizeSelected}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                Materials{" "}
                {errors.materials && (
                  <span className="text-Red text-sm font-normal">
                    ({errors.materials})
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 w-full">
                {Materials.map((option) => {
                  const isMaterialSelected =
                    productDetails.materials.toLowerCase() ===
                    option.name.toLowerCase();
                  return (
                    <div
                      key={option.id}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "materials",
                            value: isMaterialSelected ? "" : option.name,
                            type: "checkbox",
                          },
                        });
                      }}
                    >
                      <Checkbox
                        label={option.name}
                        isSelected={isMaterialSelected}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="text-lg font-semibold">
              Colors{" "}
              {errors.colors && (
                <span className="text-Red text-sm font-normal">
                  ({errors.colors})
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 w-full">
              {Colors.map((color) => {
                const isColorSelected = productDetails?.colors
                  .map((color) => color?.color?.toLowerCase())
                  .includes(color?.color.toLowerCase());
                return (
                  <ColorFilterCard
                    key={color.id}
                    color={color.color}
                    onClick={() => {
                      handleChange({
                        target: {
                          name: "colors",
                          value: isColorSelected
                            ? [
                                ...productDetails.colors.filter(
                                  (productColor) =>
                                    productColor.name.toLowerCase() !==
                                    color.name.toLowerCase()
                                ),
                              ]
                            : [
                                ...productDetails.colors,
                                {
                                  name: color.name,
                                  color: color.color,
                                  id: color.id,
                                },
                              ],
                          type: "checkbox",
                        },
                      });
                    }}
                    isSelected={isColorSelected}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-4">
        <div className="w-full flex flex-col">
          <div className="text-lg font-semibold">Description</div>
          <Textarea
            rows="5"
            placeholder="As always great desgin and quality..."
            name="description"
            onChange={handleChange}
            value={productDetails.description}
            errorMessage={errors.description}
            className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
          />
        </div>
      </div>
      <div className="w-full md:w-1/12 absolute right-6 bottom-6">
        <Button text="Edit Product" onClick={handleSubmit} type="button" />
      </div>
    </>
  );
};

export default EditProduct;
