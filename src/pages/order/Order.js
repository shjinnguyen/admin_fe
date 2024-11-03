import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import { getOrderDetails, getOrders } from "../../services/order-service";

const columns = [
  {
    key: "customer",
    title: "Customer",
    dataIndex: "customer",
  },
  {
    key: "totalAmount",
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  {
    key: "deliveryDate",
    title: "Delivery Date",
    dataIndex: "deliveryDate",
    render: (text) => moment(text).format("DD-MM-YYYY"),
  },
  {
    key: "createAt",
    title: "Created At",
    dataIndex: "createAt",
    render: (text) => moment(text).format("DD-MM-YYYY"),
  },
];

const Order = () => {
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState({});

  useEffect(() => {
    getOrders().then((res) => {
      setData(res.data);
    });
  }, []);

  const expandedRowRender = ({ id }) => {
    const columns = [
      {
        key: "productName",
        title: "Product",
        dataIndex: "productName",
      },
      {
        key: "productImg",
        title: "Thumbnail",
        dataIndex: "productImg",
        render: (text) => (
          <img
            src={text}
            alt="product"
            style={{ width: "100px", height: "100px" }}
          />
        ),
      },
      {
        key: "quantity",
        title: "Quantity",
        dataIndex: "quantity",
      },
    ];

    return <Table columns={columns} dataSource={subData[id]} />;
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            extra={
              <Link to="/order-form">
                <Button>Make Order</Button>
              </Link>
            }
          >
            <Table
              columns={columns}
              rowKey={(record) => record.id}
              expandable={{
                expandedRowRender,
                onExpand: (expand, record) => {
                  if (subData[record.id] === undefined) {
                    getOrderDetails(record.id).then((res) => {
                      setSubData({ ...subData, [record.id]: res.data });
                    });
                  }
                },
              }}
              dataSource={data}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
