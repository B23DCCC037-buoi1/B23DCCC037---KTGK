import React from 'react';
import { useLocation } from 'react-router-dom';
import { Progress, Table, Tag, notification } from 'antd';

// Khai báo kiểu cho state truyền qua từ PlannerPage
interface LocationState {
  totalBudget: number;
}

const BudgetPage: React.FC = () => {
  // Dùng useLocation để lấy state
  const location = useLocation<LocationState>();
  const { totalBudget } = location.state || {}; // Lấy tổng ngân sách từ state

  const data = [
    { category: 'Ăn uống', amount: 200 },
    { category: 'Di chuyển', amount: 300 },
    { category: 'Lưu trú', amount: 500 },
  ];

  // Tính tổng chi phí
  const total = data.reduce((acc, item) => acc + item.amount, 0);

  // Đặt ngân sách giới hạn
  const budgetLimit = totalBudget || 800; // Nếu không có totalBudget từ state, dùng giá trị mặc định

  // Hiển thị thông báo cảnh báo nếu vượt ngân sách
  if (total > budgetLimit) {
    notification.warning({
      message: 'Vượt ngân sách!',
      description: `Tổng chi phí hiện tại là ${total}₫, đã vượt mức ngân sách ${budgetLimit}₫!`,
    });
  }

  // Cột cho bảng phân bổ ngân sách
  const columns = [
    {
      title: 'Hạng mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Chi phí (₫)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Phần trăm',
      key: 'percent',
      render: (_text: any, record: any) => {
        const percent = ((record.amount / total) * 100).toFixed(1);
        return <Progress percent={parseFloat(percent)} />;
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Phân bổ ngân sách</h1>
      {/* Bảng hiển thị phân bổ ngân sách */}
      <Table dataSource={data} columns={columns} rowKey="category" pagination={false} />
      <div style={{ marginTop: 24 }}>
        {/* Hiển thị tổng chi phí và ngân sách */}
        <Tag color={total > budgetLimit ? 'red' : 'green'}>
          Tổng chi: {total}₫ / Ngân sách: {totalBudget}₫
        </Tag>
      </div>
    </div>
  );
};

export default BudgetPage;
