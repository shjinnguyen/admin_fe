import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  Table,
  Select,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import { getProducts } from "../../services/product-service";

import "./style.css";
import { makeOrder } from "../../services/order-service";

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const requestMakeOrder = {
      customer: {
        name: values?.name,
        phone: values?.phone,
        address: values?.address,
      },
      deliveryDate: values?.deliveryDate,
      orderItems: values?.orderItems,
    };

    await makeOrder(requestMakeOrder);

    message.success("Order created successfully");
  };

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(
        (res.data || []).map((product) => {
          return { value: product.id, label: product.name };
        })
      );
    });
  }, []);

  const columns = [
    {
      width: "80%",
      key: "product",
      title: "Product",
      dataIndex: "product",
      render: (text, record, index) => (
        <Form.Item name={[index, "productId"]} wrapperCol={{ span: 24 }}>
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            dropdownStyle={{
              width: "100%",
              minWidth: "300px",
            }}
            options={products}
          />
        </Form.Item>
      ),
    },
    {
      width: "20%",
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, record, index) => (
        <Form.Item name={[index, "quantity"]} wrapperCol={{ span: 24 }}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[24, 0]} id="order-form">
        <Col xs="24" xl={24}>
          <Card bordered={false} className="criclebox tablespace mb-24">
            <div style={{ width: "60%", margin: "auto", paddingTop: "100px" }}>
              <Form
                name="basic"
                style={{ width: "100%" }}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                form={form}
                initialValues={{
                  orderItems: [{}],
                }}
              >
                <Form.Item label="Phone" name="phone">
                  <Input />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="Delivery Date" name="deliveryDate">
                  <DatePicker />
                </Form.Item>
                <Form.List name="orderItems">
                  {(fields, { add, remove }) => {
                    return (
                      <div id="wrapper-table-order-item">
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()}>
                            Add Product +
                          </Button>
                        </Form.Item>
                        <Table
                          columns={columns}
                          dataSource={fields}
                          rowKey={(record) => record.id}
                          pagination={false}
                        />
                      </div>
                    );
                  }}
                </Form.List>
                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                  className="submit-order-form-item"
                >
                  <Button type="dashed" htmlType="submit" id="submit-order">
                    Create Order
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderForm;
