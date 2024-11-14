import { useState } from "react";
import { products } from "../data";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import TypeBars from "../components/TypeBars";
import { types } from "../typeData";

const Store = () => {
  // State để lưu trữ loại sản phẩm được chọn
  const [selectedType, setSelectedType] = useState("All");

  // Hàm xử lý khi click vào một loại sản phẩm
  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  // Lọc sản phẩm dựa trên loại đã chọn
  const filteredProducts =
    selectedType === "All"
      ? products
      : products.filter((product) => product.type === selectedType);

  return (
    <>
      <Heading>
        <h1>Browse the Store!</h1>
        <p>New Arrivals for you! Check out our selection of products.</p>
      </Heading>

      {/* Thanh type để chọn loại sản phẩm */}
      <TypeContainer>
        {/* Thêm một lựa chọn 'All' để hiển thị tất cả sản phẩm */}
        <TypeBars
          type="All"
          onClick={() => handleTypeClick("All")}
          isActive={selectedType === "All"}
        />
        {types.map((type) => (
          <TypeBars
            key={type.id}
            type={type.type}
            onClick={() => handleTypeClick(type.type)}
            isActive={selectedType === type.type}
          />
        ))}
      </TypeContainer>

      {/* Danh sách sản phẩm */}
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </>
  );
};

// Styled Components
const Heading = styled.div`
  margin-top: 8rem;
  text-align: center;
`;

const ProductsContainer = styled.div`
  max-width: 1024px; /* Điều chỉnh cùng kích thước với TypeContainer */
  width: 80%;
  margin: 30px auto 0; /* Căn giữa */
  gap: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
`;

const TypeContainer = styled.div`
  max-width: 1024px;
  width: 80%;
  margin: 30px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  background-color: #fff;
  text-align: center;
`;

export default Store;
