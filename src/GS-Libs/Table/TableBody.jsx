import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toTitleCase } from "../utils/toTitleCase";
import { BrandValues } from "../../config";
import PopupModal from "../MultiUse/PopupModal";
import swal from "sweetalert";
import EditProduct from "../../Components/Seller/SellerAdminPanel/Products/EditProduct";
import { apiCaller } from "../utils/apiCaller";

const TableBody = ({ tableData }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [allProducts, setAllProducts] = useState(tableData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setAllProducts(tableData);
  }, [tableData]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showUpdatedProduct = (id, updatedProduct) => {
    const updatedProducts = allProducts.map((product) =>
      product._id === id ? updatedProduct : product
    );
    setAllProducts(updatedProducts);
  };

  const editHandler = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await apiCaller(
          "/delete-product",
          "delete",
          { productId: id },
          {},
          true
        );
        const updatedProducts = await allProducts.filter(
          (product) => product._id !== id
        );
        setAllProducts(updatedProducts);
        await swal("Poof! Your product has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="overflow-y-scroll h-full">
      {allProducts?.map((product, index) => {
        return (
          <div
            key={product._id}
            className="flex justify-between items-center font-medium border border-Gray hover:border-Purple rounded-md p-1 mb-2 group cursor-default"
          >
            <div className="flex gap-4 items-center">
              <div className="w-8 text-center">{index + 1}</div>
              {/* <TableImageColumn product={product} /> */}
              <div className="w-10 h-10 relative">
                <img
                  src={product?.productImages?.[0]}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="w-64 max-w-64 text-ellipsis overflow-hidden whitespace-nowrap">
                {product.name}
              </div>
              <div className="w-40 text-ellipsis overflow-hidden whitespace-nowrap">
                {BrandValues[product.brand]}
              </div>
              <div className="w-40 text-ellipsis overflow-hidden whitespace-nowrap">
                {toTitleCase(product.materials)}
              </div>
              <div className="w-20 text-center">₹{product.price}</div>
              <div className="w-20 text-center">
                {product.quantity ? product.quantity : 100}
              </div>
              <div
                className={`w-24 flex items-center justify-center rounded-full border py-1 ${
                  product.status === "Available"
                    ? "bg-Green/30 border-Green/70"
                    : product.status === "Out of Stock"
                    ? "bg-Red/30 border-Red/70"
                    : "bg-Yellow/30 border-Yellow/70"
                }`}
              >
                <div className="text-xs">
                  {product.status ? product.status : "Available"}
                </div>
              </div>
            </div>
            <div className="invisible group-hover:visible flex gap-2 relative right-10 cursor-pointer">
              <FaRegEdit
                className="w-5 h-5 hover:text-Purple"
                onClick={() => editHandler(product)}
              />
              <MdDelete
                className="w-5 h-5 hover:text-Red/80"
                onClick={() => deleteProduct(product._id)}
              />
            </div>
          </div>
        );
      })}
      <PopupModal isOpen={isModalOpen} onClose={closeModal}>
        <EditProduct
          product={currentProduct}
          closeModal={closeModal}
          showUpdatedProduct={showUpdatedProduct}
        />
      </PopupModal>
    </div>
  );
};

export default TableBody;
