// 📁 src/pages/Travel/AdminPage.tsx
import { Table, Button } from 'antd';

const data = [
  { key: '1', name: 'Đà Nẵng', type: 'Biển', created: 'Tháng 3' },
  { key: '2', name: 'Sapa', type: 'Núi', created: 'Tháng 4' },
];

const AdminPage = () => {
  const columns = [
    { title: 'Tên điểm đến', dataIndex: 'name', key: 'name' },
    { title: 'Loại hình', dataIndex: 'type', key: 'type' },
    { title: 'Tháng tạo lịch', dataIndex: 'created', key: 'created' },
    {
      title: 'Hành động',
      render: () => <Button type="link">Xoá</Button>,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Trang quản trị điểm đến</h2>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default AdminPage;
