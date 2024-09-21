import {
  forwardRef,
  React,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Table,
  InputNumber,
  Input,
  Form,
  Typography,
  Popconfirm,
  Space,
} from "antd";

import SelectInput from "../select-input/category";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = "text";

  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
      break;
    case "text":
      inputNode = <Input />;
      break;
    case "select":
      let { apiSearch } = restProps;
      inputNode = <SelectInput apiSearch={apiSearch} />;
      break;
    default:
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const InlineEditableTable = forwardRef(
  (
    {
      columns: propColumns,
      data: propData,
      getData,
      saveItem,
      updateItem,
      deleteItem,
    },
    ref
  ) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState("");

    useImperativeHandle(ref, () => ({
      addNewRef() {
        addNew();
      },
    }));

    useEffect(() => {
      callGetData();
    }, [propData]);

    const callGetData = async () => {
      const repsonse = await getData();
      setData(repsonse?.data);
    };

    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
      form.setFieldsValue({
        ...record,
      });
      setEditingKey(record.id);
    };

    const cancel = () => {
      setEditingKey("");
    };

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const isUpdate = key > 0;

        if (isUpdate) {
          row.id = key;
          await updateItem(row);
          setEditingKey("");
        } else {
          await saveItem(row);
          setEditingKey("");
        }

        await callGetData();
        form.resetFields();
      } catch (errInfo) {
        console.log("Validate Failed:", errInfo);
      }
    };

    const actionCell = {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              onClick={async () => {
                await deleteItem(record.id);
                await callGetData();
              }}
            >
              Delete
            </Typography.Link>
          </Space>
        );
      },
    };

    const mergedColumns = [...propColumns, actionCell].map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.inputType || "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          ...col,
        }),
      };
    });

    const addNew = () => {
      const item = {
        id: -new Date(),
        name: "",
        description: "",
      };
      const newData = [...data];
      newData.push(item);
      setData(newData);
      setEditingKey(item.id);
    };

    return (
      <div className="table-responsive">
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    );
  }
);

export default InlineEditableTable;
