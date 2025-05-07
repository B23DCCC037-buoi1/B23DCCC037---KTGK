import React, { useEffect, useState } from 'react';
import { Button, Card, Select, Form, Row, Col, message, Typography, DatePicker } from 'antd';
import { getDestinations } from '@/services/Travel/Destination';
import { calculateItinerary } from '@/services/Travel/Itinerary';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;
const { Text, Title } = Typography;

const PlannerPage = () => {
  const [form] = Form.useForm();
  const [plan, setPlan] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    budget: 0,
    travelTime: 0,
    travelTimesBetween: [] as number[],
  });

  const location = useLocation();
  const history = useHistory();
  const { selected, date } = (location.state || {}) as any;

  useEffect(() => {
    const saved = localStorage.getItem('travelPlan');
    if (saved) {
      setPlan(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  useEffect(() => {
    if (selected && date) {
      const newItem = {
        name: selected.name,
        price: selected.price || 0,
        date,
      };
      setPlan((prev) => {
        const newPlan = [...prev, newItem];
        localStorage.setItem('travelPlan', JSON.stringify(newPlan));
        return newPlan;
      });
    }
  }, [selected, date]);

  useEffect(() => {
    if (plan.length > 0) {
      const result = calculateItinerary(plan);
      setSummary({
        budget: result.totalBudget,
        travelTime: result.estimatedTravelTime,
        travelTimesBetween: result.travelTimesBetween || [],
      });
    } else {
      setSummary({ budget: 0, travelTime: 0, travelTimesBetween: [] });
    }
  }, [plan]);

  const handleAddDestination = (values: any) => {
    const full = destinations.find((d) => d.name === values.name);
    const fullItem = {
      ...values,
      price: full?.price || 0,
      date: values.date.format('YYYY-MM-DD'),
    };
    const newPlan = [...plan, fullItem];
    setPlan(newPlan);
    localStorage.setItem('travelPlan', JSON.stringify(newPlan));
    form.resetFields();
    message.success('Thêm điểm đến thành công');
  };

  const handleDelete = (index: number) => {
    const updated = [...plan];
    updated.splice(index, 1);
    setPlan(updated);
    localStorage.setItem('travelPlan', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Lịch trình du lịch</Title>

      <Form form={form} layout="inline" onFinish={handleAddDestination} style={{ marginTop: 16 }}>
        <Form.Item name="date" rules={[{ required: true, message: 'Chọn ngày' }]}>
          <DatePicker placeholder="Chọn ngày" />
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true, message: 'Chọn điểm đến' }]}>
          <Select placeholder="Tên điểm đến" style={{ width: 200 }}>
            {destinations.map((d) => (
              <Option key={d.id} value={d.name}>{d.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Thêm</Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 24 }}>
        {plan.length === 0 && <p>Chưa có điểm đến nào.</p>}
        {plan.map((item, index) => (
          <Card
            key={index}
            title={`${item.date} - ${item.name}`}
            style={{ marginBottom: 16 }}
            extra={<Button danger onClick={() => handleDelete(index)}>Xóa</Button>}
          >
            <p>Chi phí: {item.price.toLocaleString()} VNĐ</p>
            {index < plan.length - 1 && summary.travelTimesBetween[index] ? (
              <p>Thời gian di chuyển đến điểm tiếp theo: ~ {summary.travelTimesBetween[index]} giờ</p>
            ) : (
              index < plan.length - 1 && <p>Không có dữ liệu thời gian di chuyển.</p>
            )}
          </Card>
        ))}
      </div>

      <Card title="Tổng kết" style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={8}>
            <strong>Tổng ngân sách:</strong> {summary.budget.toLocaleString()} VNĐ
          </Col>
          <Col span={8}>
            <strong>Tổng thời gian di chuyển:</strong> ~ {summary.travelTime} giờ
          </Col>
        </Row>
        <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            history.push({
              pathname: '/travel-itinerary/budget',
              state: { totalBudget: summary.budget }, // Giả sử summary.budget là tổng chi phí
            });
          }}
        >
          Quản lý ngân sách
        </Button>
        </div>
      </Card>
    </div>
  );
};

export default PlannerPage;
