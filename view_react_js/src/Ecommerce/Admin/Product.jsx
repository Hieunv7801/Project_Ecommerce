import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Product() {
  const [products, setProduct] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    imageFile: null,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!selectedProduct) return;
    if (selectedProduct.id === productData.id) return;
    setProductData(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleChangeImage = (e) => {
    setProductData({ ...productData, imageFile: e.target.files[0] });
  };
  const handleAddSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products",
        formData
      );
      console.log("Sản phẩm đã được thêm", response.data);
      fetchProducts();
      setProductData({
        name: "",
        price: 0,
        description: "",
        imageFile: null,
      });
      Swal.fire({
        title: "Success",
        text: "The product has been added successfully.",
        icon: "success",
      });
      if (window.$) {
        window.$("#exampleModal").modal("hide");
      }
    } catch (error) {
      console.log("Thêm thất bại");
      Swal.fire({
        title: "Error",
        text: "Failed to add the product.",
        icon: "error",
      });
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //delete
  const deleteProduct = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        // Nếu người dùng nhấn OK (Xác nhận xóa), thực hiện xóa
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        fetchProducts();
        Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success",
        });
      } else {
        // Nếu người dùng nhấn Cancel, không làm gì cả
        Swal.fire("Cancelled", "The product is safe :)", "info");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the product.",
        icon: "error",
      });
    }
  };
  //update
  const getProduct = (product) => {
    setSelectedProduct(product);
  };
  const handleUpdate = async () => {
    try {
      if (!selectedProduct) {
        console.log("Không có sản phẩm nào được chọn để cập nhật");
        return;
      }
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("imageFile", productData.imageFile);

      const response = await axios.put(
        `http://localhost:8080/api/products/${selectedProduct.id}`,
        formData
      );
      console.log("Cập nhật sản phẩm thành công", response.data);
      fetchProducts();
      setProductData({
        name: "",
        price: 0,
        description: "",
        imageFile: null,
      });
      setSelectedProduct(null);
      Swal.fire({
        title: "Success",
        text: "The product has been updated successfully.",
        icon: "success",
      });
      if (window.$) {
        window.$("#exampleModal").modal("hide");
      }
    } catch (error) {
      console.log("Cập nhật thất bại", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("imageFile", productData.imageFile);

    if (selectedProduct) {
      handleUpdate();
    } else {
      handleAddSubmit(formData);
    }
  };
  // Hàm để đặt lại biểu mẫu
  const resetForm = () => {
    setProductData({
      name: "",
      price: 0,
      description: "",
      imageFile: null,
    });
  };
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Product
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div class="form-group">
                  <label class="form-control-placeholder" for="name">
                    Name Product
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-placeholder">Price</label>
                  <input
                    type="number"
                    name="price"
                    class="form-control"
                    value={productData.price}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-placeholder">Description</label>
                  <input
                    type="text"
                    name="description"
                    class="form-control"
                    value={productData.description}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-placeholder">Image</label>
                  <input
                    type="file"
                    name="imageFile"
                    class="form-control"
                    onChange={handleChangeImage}
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <button
              className="btn btn-success mb-3 "
              data-toggle="modal"
              data-target="#exampleModal"
              onHide={() => resetForm()}
            >
              <i class="fas fa-plus"></i> Add Product
            </button>
            <table className="table bg-white rounded border">
              <thead className="text-center">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/products/get-image/${item.image}`}
                        alt="fal"
                        srcset=""
                        width={50}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-warning mr-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => getProduct(item)}
                      >
                        <i class="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(item.id)}
                      >
                        <i class="fas fa-trash-alt"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
