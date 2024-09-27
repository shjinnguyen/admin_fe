import React, { useEffect, useState } from "react";
import { Table, Tag, Button, message, Input, Select, Space } from "antd";
import { Upload } from "antd";
import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "../../services/product-service";
import { getUnits } from "../../services/unit-service";
import { getCategories } from "../../services/category-service";
import { getSuppliers } from "../../services/supplier-service";
import { BarcodeOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [file, setFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUnits();
    fetchCategories();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  const fetchProducts = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };

  const fetchSuppliers = async () => {
    const result = await getSuppliers();
    setSuppliers(result.data);
  };

  const fetchUnits = async () => {
    const result = await getUnits();
    setUnits(result.data);
  };

  const fetchCategories = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const edit = (record) => {
    setEditingKey(record.id);
    setFile(null);
    setFilePreviewUrl(null);
    setFormData({ ...record });
  };

  const save = async (key) => {
    try {
      const newFormData = new FormData();

      Object.keys(formData).forEach((key) => {
        newFormData.append(key, formData[key]);
      });

      if (file) {
        newFormData.append("file", file);
      }

      if (editingKey === "new") {
        await saveProduct(newFormData);
      } else {
        await updateProduct(newFormData);
      }
      message.success("Product updated successfully!");
      fetchProducts();
    } catch (err) {
      message.error("Failed to update product.");
    }
    setEditingKey("");
    setFilePreviewUrl(null);
    setFormData({});
  };

  const cancel = () => {
    setEditingKey("");
    setFilePreviewUrl(null);
    setFormData({});
  };

  const handleDelete = async (key) => {
    try {
      await deleteProduct(key);
      message.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      message.error("Failed to delete product.");
    }
  };

  const handleFileChange = (info) => {
    if (info.file && info.file.originFileObj) {
      setFile(info.file.originFileObj);
      setFilePreviewUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSelectChange = (value, key) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const addNewProduct = () => {
    setProducts([
      {
        id: "new",
        name: "",
        description: "",
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        category: "",
        supplier: "",
      },
      ...products,
    ]);
    setEditingKey("new");
    setFile(null);
    setFilePreviewUrl(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e, "name")}
          />
        ) : (
          text
        ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail, record) => {
        const imageUrl = `/images/${thumbnail}`; // Format the thumbnail URL

        return editingKey === record.id ? (
          <>
            {filePreviewUrl ? (
              <img
                src={filePreviewUrl}
                alt="Thumbnail"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            ) : thumbnail ? (
              <>
                <img
                  src={imageUrl}
                  alt="Thumbnail"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    document.getElementById(`file-upload-${record.id}`).click()
                  }
                />
                <input
                  type="file"
                  id={`file-upload-${record.id}`}
                  hidden
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                    setFilePreviewUrl(URL.createObjectURL(file));
                  }}
                />
              </>
            ) : (
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  setFile(file);
                  setFilePreviewUrl(URL.createObjectURL(file));
                  return false; // Prevent auto upload
                }}
                onChange={handleFileChange}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    border: "1px dashed #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <span>Upload Image</span>
                </div>
              </Upload>
            )}
          </>
        ) : (
          <img
            src={imageUrl}
            alt="Thumbnail"
            style={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e, "description")}
          />
        ) : (
          text
        ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render: (text) => (
        <>
          <BarcodeOutlined value={text} />
          {text}
        </>
      ),
    },
    {
      title: "Weight (kg)",
      dataIndex: "weight",
      key: "weight",
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            type="number"
            defaultValue={text}
            onChange={(e) => handleInputChange(e, "weight")}
          />
        ) : (
          text
        ),
    },
    {
      title: "Dimensions (L x W x H)",
      key: "dimensions",
      render: (_, record) =>
        editingKey === record.id ? (
          <>
            <Input
              style={{ width: "30%", marginRight: "5%" }}
              defaultValue={record.length}
              onChange={(e) => handleInputChange(e, "length")}
              placeholder="Length"
            />
            <Input
              style={{ width: "30%", marginRight: "5%" }}
              defaultValue={record.width}
              onChange={(e) => handleInputChange(e, "width")}
              placeholder="Width"
            />
            <Input
              style={{ width: "30%" }}
              defaultValue={record.height}
              onChange={(e) => handleInputChange(e, "height")}
              placeholder="Height"
            />
          </>
        ) : (
          `${record.length} x ${record.width} x ${record.height}`
        ),
    },
    {
      title: "Category",
      key: "categoryId",
      render: (text, record) =>
        editingKey === record.id ? (
          <Select
            defaultValue={record.categoryId}
            onChange={(value) => handleSelectChange(value, "categoryId")}
          >
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Tag color="green">{record.category}</Tag>
        ),
    },
    {
      title: "Supplier",
      key: "supplierId",
      render: (text, record) =>
        editingKey === record.id ? (
          <Select
            defaultValue={record.supplierId}
            onChange={(value) => handleSelectChange(value, "supplierId")}
          >
            {suppliers.map((supplier) => (
              <Option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Tag color="green">{record.supplier}</Tag>
        ),
    },
    {
      title: "Unit",
      key: "unitId",
      render: (text, record) =>
        editingKey === record.id ? (
          <Select
            defaultValue={record.unitId}
            onChange={(value) => handleSelectChange(value, "unitId")}
          >
            {units.map((unit) => (
              <Option key={unit.id} value={unit.id}>
                {unit.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Tag color="green">{record.unit}</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          {editingKey === record.id ? (
            <>
              <Button
                onClick={() => save(record.id)}
                style={{ marginRight: 8 }}
              >
                Save
              </Button>
              <Button onClick={cancel}>Cancel</Button>
            </>
          ) : (
            <Space>
              <Button onClick={() => edit(record)}>Edit</Button>
              <Button onClick={() => handleDelete(record.id)} type="danger">
                Delete
              </Button>
            </Space>
          )}
        </span>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={addNewProduct}
        style={{ marginBottom: 16 }}
      >
        New Product
      </Button>
      <Table
        dataSource={[...products]}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default ProductTable;
