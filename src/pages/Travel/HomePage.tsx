import { useEffect, useState } from 'react';
import { Card, Row, Col, Select, Rate, Tag, Button } from 'antd';
import { getDestinations } from '@/services/Travel/Destination';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

const HomePage = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const history = useHistory();

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  let filtered = [...destinations];

  if (typeFilter) {
    filtered = filtered.filter((d) => d.type === typeFilter);
  }

  if (ratingFilter) {
    filtered = filtered.filter((d) => d.rating >= ratingFilter);
  }

  if (sortPrice === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortPrice === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // 👉 Không cần chọn ngày → chuyển thẳng sang trang PlannerPage
  const handleAddToPlan = (destination: any) => {
    history.push('/travel-itinerary/planner', {
      state: {
        selected: destination,
      },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Khám phá điểm đến</h2>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Select
          placeholder="Lọc theo loại hình"
          onChange={setTypeFilter}
          style={{ width: 180 }}
          allowClear
        >
          <Option value="Biển">Biển</Option>
          <Option value="Núi">Núi</Option>
          <Option value="Thành phố">Thành phố</Option>
        </Select>

        <Select
          placeholder="Sắp xếp theo giá"
          onChange={setSortPrice}
          style={{ width: 180 }}
          allowClear
        >
          <Option value="asc">Giá tăng dần</Option>
          <Option value="desc">Giá giảm dần</Option>
        </Select>

        <Select
          placeholder="Lọc theo đánh giá"
          onChange={(val) => setRatingFilter(Number(val))}
          style={{ width: 180 }}
          allowClear
        >
          <Option value={1}>Từ 1 sao</Option>
          <Option value={2}>Từ 2 sao</Option>
          <Option value={3}>Từ 3 sao</Option>
          <Option value={4}>Từ 4 sao</Option>
          <Option value={5}>5 sao</Option>
        </Select>
      </div>

      <Row gutter={16}>
        {filtered.map((d) => (
          <Col span={6} key={d.id}>
            <Card
              cover={<img alt={d.name} src={d.image} />}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleAddToPlan(d)}
                  style={{
                    borderRadius: '12px',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Đăng ký lịch trình
                </Button>,
              ]}
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Meta title={d.name} description={`Giá: ${d.price} VNĐ`} />
              <div style={{ marginTop: 10 }}>
                <Tag color="blue">{d.type}</Tag>
                <div style={{ marginTop: 8 }}>
                  <Rate disabled defaultValue={d.rating} />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
