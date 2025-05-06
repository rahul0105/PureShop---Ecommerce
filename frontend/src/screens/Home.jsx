// import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
// import axios from "axios";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const { data } = await axios.get("/api/products"); //fetching from backend //we do't use http:localhopst:500 beacuse in packega.json in frontend we add proxy
  //       setProducts(data);
  //     };

  //     fetchProducts();
  //   }, []);  all the comment we don't need this using redux for state management

  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Product</h1>
          <Row>
            {data.products.map((product, i) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={i}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Home;
