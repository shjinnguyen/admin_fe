import {
  Row,
  Col,
  Card,
  Form,
  InputNumber,
  Button,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";

import { getProducts } from "../../services/product-service";
import { importInventory } from "../../services/inventory-service";

const ImportPage = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(
        response?.data.map((product) => {
          return {
            ...product,
            value: product.id,
            label: product.name,
          };
        })
      );
    });
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    await importInventory(values);
    form.resetFields();
    message.success("Inventory imported successfully");
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs="24" xl={24}>
        <Card bordered={false} className="criclebox mb-24">
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item label="Product" name="productId">
              <Select
                autoFocus
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                placeholder="Select a product"
                options={products}
              ></Select>
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber placeholder="Quantity" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ImportPage;
