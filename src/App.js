import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { PageHeader, Form, Input, Button, Select } from 'antd';

import moment from "moment";
import 'moment/locale/th'
import axios from "axios";
import { MAIN_URL } from './server';


const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const App = () => {

  const [form] = Form.useForm();

  const postApplyLoanData = async (data) => {
    console.log(data)
    await axios.post(MAIN_URL + '/customer/applyloans', data)
      .then((response) => {
        console.log(response.status);
        // getAllReports();
        //   setDataSource(response.data);
      });
  }

  const onFinish = (values) => {
    // console.log(values);
    const data = {
      date: moment(Date.now()).format('yyyy-MM-DD'),
      loan_type: values.loan_type,
      name: values.username,
      address: values.address,
      phone: values.phone,
      detail: values.detail
    }
    postApplyLoanData(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ padding: 50 }}>

      <PageHeader
        // className="site-page-header"
        // onBack={() => null}
        title="สมัครขอสินเชื่อ"
      // subTitle="กรุณากรอกรายละเอียดให้ครบถ้วน"
      />

      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

        <Form.Item
          name="loan_type"
          label="ประเภทสินเชื่อ"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="เลือกประเภทสินเชื่อ"
            // onChange={(text) => {
            //   setValue(text {})
            // }}
            allowClear
          >
            <Option value="สินเชื่อบ้าน/ที่ดิน">สินเชื่อบ้าน/ที่ดิน</Option>
            <Option value="สินเชื่อรถยนต์">สินเชื่อรถยนต์</Option>
            <Option value="สินเชื่อรถบิ๊กไบค์">สินเชื่อรถบิ๊กไบค์</Option>
            <Option value="สินเชื่อรถไถ/รถเกี่ยวนวดข้าว">สินเชื่อรถไถ/รถเกี่ยวนวดข้าว</Option>
            <Option value="สินเชื่อรถบรรทุก">สินเชื่อรถบรรทุก</Option>
            <Option value="สินเชื่อการเกษตร">สินเชื่อการเกษตร</Option>
            <Option value="สินเชื่อแบคโฮ">สินเชื่อแบคโฮ</Option>

          </Select>
        </Form.Item>

        <Form.Item
          name="username"
          label="ชื่อ-นามสกุล"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="ชื่อ-นามสกุล (ลูกค้า)" />
        </Form.Item>

        <Form.Item
          name="address"
          label="ที่อยู่"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="ที่อยู่ปัจจุบันของลูกค้า..." />
        </Form.Item>

        <Form.Item
          name="phone"
          label="โทรศัพท์"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="เบอร์ติดต่อ..." />
        </Form.Item>

        <Form.Item
          name="detail"
          label="รายละเอียดเพิ่มเติม"
        >
          <Input.TextArea placeholder="ข้อความเพิ่มเติม (ถ้ามี)..." />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            ส่งข้อมูล
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ marginLeft: 16 }}>
            ล้าง
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
}

export default App
