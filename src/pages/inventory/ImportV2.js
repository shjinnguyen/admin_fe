import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  Card,
  Select,
  Table,
} from "antd";
import {
  importInventory,
  exportInventory,
} from "../../services/inventory-service";

const { Title } = Typography;
const { Option } = Select;

const InventoryForm = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("import");
  const [addedProducts, setAddedProducts] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const productSelectRef = useRef(null);
  const quantityInputRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://103.163.119.150:8080/products"
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    productSelectRef.current.focus();

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFilter = (value) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    if (selectedProduct && quantity) {
      const productToAdd = {
        ...selectedProduct,
        quantity: parseInt(quantity.replace(/\D/g, ""), 10).toLocaleString(),
        type,
      };
      setAddedProducts([...addedProducts, productToAdd]);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setQuantity("");
    productSelectRef.current.focus();
  };

  const handleProductChange = (value) => {
    const product = products.find((p) => p.id === value);
    setSelectedProduct(product);
    quantityInputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddProduct();
    }
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (addedProducts.length === 0) return;

    const details = addedProducts.map((item) => ({
      productId: item.id,
      quantity: parseInt(item.quantity.replace(/,/g, ""), 10),
    }));

    try {
      if (type === "import") {
        await importInventory({ details });
      } else {
        await exportInventory({ details });
      }
      console.log("Data submitted successfully");
      setAddedProducts([]);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <Card style={{ width: 500, margin: "auto", marginTop: "50px" }}>
      <Title level={4} style={{ textAlign: "center" }}>
        Quản lý Nhập/Xuất Kho
      </Title>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p>{currentDateTime.toLocaleString()}</p>
      </div>
      <Form layout="vertical">
        <Form.Item label="Loại giao dịch" required>
          <Radio.Group
            value={type}
            disabled={selectedProduct !== null}
            onChange={(e) => setType(e.target.value)}
          >
            <Radio value="import">Nhập kho</Radio>
            <Radio value="export">Xuất kho</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Chọn sản phẩm">
          <Select
            ref={productSelectRef}
            showSearch
            placeholder="Tìm kiếm sản phẩm"
            value={selectedProduct ? selectedProduct.id : null}
            onChange={handleProductChange}
            onSearch={handleFilter}
            filterOption={false}
            onKeyDown={handleKeyDown} // Thêm sự kiện keyDown cho Select
          >
            {filteredProducts.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Số lượng">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={quantityInputRef}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddProduct} block>
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={addedProducts}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Button
        type="primary"
        onClick={handleSubmit}
        block
        disabled={addedProducts.length === 0}
        style={{ marginTop: "10px" }}
      >
        Xác nhận
      </Button>
    </Card>
  );
};

export default InventoryForm;
