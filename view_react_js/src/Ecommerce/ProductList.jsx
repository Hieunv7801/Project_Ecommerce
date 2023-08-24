import React, { useContext, useState } from "react";
import ProductItem from "./ProductItem";
import Carousel from "./Carousel";
import { ProductContext } from "./Home";
import ReactPaginate from "react-paginate";

export default function ProductList(props) {
  const { product } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Số sản phẩm hiển thị trên mỗi trang

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const results = product.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    setCurrentPage(0); // Reset trang khi tìm kiếm
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = (searchTerm !== "" ? searchResults : product).slice(
    offset,
    offset + itemsPerPage
  );

  const pageCount = Math.ceil(
    (searchTerm !== "" ? searchResults.length : product.length) / itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <Carousel />
      <div>
        <div className="justify-content-center">
          <div className="col-md-7 site-section-heading text-center pt-4">
            <h2>Featured Products</h2>
            <div className="container mt-5">
              <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                  <div className="form-search">
                    <i className="fa fa-search"></i>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container row mt-5"
          style={{ justifyContent: "center" }}
        >
          {/* {(searchTerm !== "" ? searchResults : product).map((item) => (
            <div key={item.id} className="col-4">
              <ProductItem prod={item} />
            </div>
          ))} */}
          <div
            className="container row mt-5"
            style={{ justifyContent: "center" }}
          >
            {currentItems.map((item) => (
              <div key={item.id} className="col-4">
                <ProductItem prod={item} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
