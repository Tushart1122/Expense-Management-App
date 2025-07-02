import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Spinner from "../components/layout/Spinner";
import axios from "axios";
import moment from "moment";
import Analytics from "../components/layout/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // Table columns
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => <span>Rs {text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Transaction-Type",
      dataIndex: "transactionType",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
            <EditOutlined  onClick={() =>{
              setEditable(record);
              setShowModal(true);
            }}/>
            <DeleteOutlined className="mx-2" onClick={() =>{
              handleDelete(record);
            }} />
        </div>
    )},
  ];

  // Fetch transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const response = await axios.post("/transactions/get-all-transactions", {
        userId: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAllTransactions(response.data);
    } catch (error) {
      setLoading(false);
      message.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line
  }, [frequency, selectedDate, type]);

  const handleDelete= async(record) =>{
     try{
      setLoading(true);
      await axios.post("/transactions/delete-transaction", 
        {transactionId: record._id}     
    )
    setLoading(false);
      message.success("Transaction deleted successfully");
  }catch(error){
      setLoading(false);
      message.error("Failed to delete transaction");
     }
  }

  // Form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if(editable) {
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id
          }
          , transactionId: editable._id
        });
        setLoading(false);
        message.success("Transaction updated Successfully");
      }else{
        // Add new transaction
        await axios.post("/transactions/add-transaction", {
          ...values,
          userId: user._id,
        });
      
      }
      setLoading(false);
      message.success("Transaction added Successfully");
      setShowModal(false);
      setEditable(null); // Reset editable state
      getAllTransactions(); // Refresh table after adding
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div
        className="filters"
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 24,
          background: "gray"
        }}
      >
        <div>
          <h6>Select Time Frame</h6>
          <Select
            value={frequency}
            onChange={setFrequency}
            style={{ width: 150 }}
          >
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={setSelectedDate}
              style={{ marginTop: 8 }}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={setType} style={{ width: 150 }}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: "1px solid  rgba(0,0,0,0.677)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            style={{ fontSize: 24, cursor: "pointer" }}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined  className={`mx-2 ${
              viewData === 'analytics' ? 'active-icon' : 'inactive-icon'
            }`}
            onClick={() => setViewData("analytics")}
            />
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content" style={{ marginTop: 24 }}>
        {viewData === 'table' ? (
          <Table columns={columns} dataSource={alltransactions} rowKey="_id" />
        ) : (
          <Analytics alltransactions={alltransactions} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form className="form" layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="transport">Transport</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="health">Health</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="utilities">Utilities</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Transaction Type"
            name="transactionType"
            rules={[
              { required: true, message: "Transaction Type is required" },
            ]}
          >
            <Select>
              <Select.Option value="credit">Credit</Select.Option>
              <Select.Option value="debit">Debit</Select.Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;