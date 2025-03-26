import React, { useState } from "react";
import { Card, Input, Button, Table, Typography, Space, Row, Col } from "antd";
import { PlusOutlined, BookOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Exam {
  id: number;
  subject: string;
  questions: number;
  structure: { difficulty: string; count: number }[];
}

const difficulties = ["Dễ", "Trung bình", "Khó", "Rất khó"];
const difficultyColors = {
  "Dễ": "#52c41a",
  "Trung bình": "#fa8c16",
  "Khó": "#f5222d",
  "Rất khó": "#722ed1"
};

const ExamPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [newExam, setNewExam] = useState<Exam>({
    id: 0,
    subject: "",
    questions: 0,
    structure: difficulties.map((d) => ({ difficulty: d, count: 0 })),
  });

  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleStructureChange = (difficulty: string, count: number) => {
    setNewExam({
      ...newExam,
      structure: newExam.structure.map((s) => 
        s.difficulty === difficulty ? { ...s, count } : s
      ),
    });
  };

  const createExam = () => {
    if (!newExam.subject || newExam.questions <= 0) return;
    setExams([...exams, { ...newExam, id: exams.length + 1 }]);
    setNewExam({ 
      id: 0, 
      subject: "", 
      questions: 0, 
      structure: difficulties.map((d) => ({ difficulty: d, count: 0 })) 
    });
  };

  const columns = [
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
      render: (text: string) => (
        <Space>
          <BookOutlined style={{ color: "#1890ff" }} />
          <span style={{ fontWeight: 500, color: "#1a3353" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Số câu hỏi",
      dataIndex: "questions",
      key: "questions",
      render: (num: number) => (
        <span style={{ 
          color: "#fff",
          background: "#1890ff",
          padding: "4px 12px",
          borderRadius: "12px",
          fontWeight: 500
        }}>
          {num}
        </span>
      ),
    },
    {
      title: "Cấu trúc",
      dataIndex: "structure",
      key: "structure",
      render: (structure: { difficulty: string; count: number }[]) => (
        <Space direction="vertical">
          {structure.map((s) => (
            <span 
              key={s.difficulty}
              style={{
                color: difficultyColors[s.difficulty as keyof typeof difficultyColors],
                fontWeight: 500
              }}
            >
              {s.difficulty}: <strong>{s.count}</strong>
            </span>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: "32px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh"
    }}>
      <Card 
        style={{ 
          maxWidth: "1000px",
          margin: "0 auto",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          border: "none",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.95)",
          animation: "fadeIn 0.5s ease-in"
        }}
        bodyStyle={{ padding: "32px" }}
      >
        <Title 
          level={2} 
          style={{ 
            textAlign: "center",
            marginBottom: "40px",
            color: "#1a3353",
            fontWeight: 700,
            background: "linear-gradient(90deg, #1890ff, #13c2c2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Quản lý Đề thi
        </Title>

        <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
          <Col xs={24} md={12}>
            <Input
              prefix={<BookOutlined style={{ color: "#1890ff" }} />}
              placeholder="Môn học"
              name="subject"
              value={newExam.subject}
              onChange={handleExamChange}
              size="large"
              style={{ 
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
                transition: "all 0.3s",
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              type="number"
              placeholder="Số lượng câu hỏi"
              name="questions"
              value={newExam.questions || ""}
              onChange={handleExamChange}
              size="large"
              style={{ 
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
                transition: "all 0.3s"
              }}
            />
          </Col>
          {newExam.structure.map((s) => (
            <Col xs={24} sm={12} md={6} key={s.difficulty}>
              <Input
                addonBefore={
                  <span style={{ 
                    width: "60px",
                    color: difficultyColors[s.difficulty as keyof typeof difficultyColors],
                    fontWeight: 500
                  }}>
                    {s.difficulty}
                  </span>
                }
                type="number"
                value={s.count || ""}
                onChange={(e) => handleStructureChange(s.difficulty, Number(e.target.value))}
                size="large"
                style={{ 
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                  transition: "all 0.3s"
                }}
              />
            </Col>
          ))}
          <Col span={24}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={createExam}
              size="large"
              block
              style={{
                borderRadius: "8px",
                height: "48px",
                background: "linear-gradient(45deg, #1890ff, #13c2c2)",
                border: "none",
                fontWeight: 500,
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.4)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(24, 144, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(24, 144, 255, 0.4)";
              }}
            >
              Tạo đề thi
            </Button>
          </Col>
        </Row>

        <Table
          dataSource={exams}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
          rowClassName="table-row-hover"
          className="custom-table"
          style={{ 
            borderRadius: "12px",
            background: "white"
          }}
        />
      </Card>

      <style 
        dangerouslySetInnerHTML={{ 
          __html: `
            .table-row-hover {
              transition: all 0.3s;
            }
            .table-row-hover:hover {
              background-color: rgba(24, 144, 255, 0.05) !important;
              transform: translateY(-2px);
            }
            .custom-table .ant-table-thead > tr > th {
              background: linear-gradient(90deg, #1a3353, #2b5876) !important;
              color: white !important;
              font-weight: 600;
              border-bottom: none !important;
            }
            .custom-table {
              border-radius: 12px !important;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `
        }}
      />
    </div>
  );
};

export default ExamPage;