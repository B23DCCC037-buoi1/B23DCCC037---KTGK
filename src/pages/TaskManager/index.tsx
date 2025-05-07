import React, { useEffect, useRef, useState } from 'react';
import {
  Input, Button, Select, Modal, Form, Tag, Space,
  Statistic, Card, Row, Col, message, Layout, Typography
} from 'antd';
import {
  DeleteOutlined, EditOutlined, LogoutOutlined
} from '@ant-design/icons';
import {
  getTasks, saveTasks, getCurrentUser, setCurrentUser, logout
} from '@/services/TaskManager/index';
import { Task, Priority, Status } from '@/models/TaskManager/Task';

const { Option } = Select;
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const priorities: Priority[] = ['Thấp', 'Trung bình', 'Cao'];
const statuses: Status[] = ['Chưa làm', 'Đang làm', 'Đã xong'];

const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(getCurrentUser());
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({ status: '', assignedTo: '', keyword: '' });
  const [form] = Form.useForm();
  const justLoggedIn = useRef(false);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (user && justLoggedIn.current) {
      message.success("Đăng nhập thành công!", 2);
      justLoggedIn.current = false;
    }
  }, [user]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setUser(username);
    justLoggedIn.current = true;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    message.success("Đã đăng xuất thành công!", 2);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        setTasks(prev => prev.map(t => (t.id === editingTask.id ? { ...t, ...values } : t)));
      } else {
        if (!values.assignedTo) {
          message.error('Vui lòng điền người được giao.', 2);
          return;
        }
        setTasks(prev => [...prev, { id: generateId(), pinned: false, ...values }]);
      }
      setFormVisible(false);
      setEditingTask(null);
      form.resetFields();
      message.success('Lưu công việc thành công', 2);
    } catch {
      message.error('Vui lòng điền đầy đủ thông tin', 2);
    }
  };

  const handleDelete = (id: string) => setTasks(prev => prev.filter(task => task.id !== id));

  const filteredTasks = tasks.filter(task => (
    (!filters.status || task.status === filters.status) &&
    (!filters.assignedTo || task.assignedTo === filters.assignedTo) &&
    (!filters.keyword || task.name.toLowerCase().includes(filters.keyword.toLowerCase()))
  ));

  const completedCount = tasks.filter(task => task.status === 'Đã xong').length;

  if (!user) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #bbdefb, #0288d1)' }}>
        <Card style={{ width: 400, borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: 32, background: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={3} style={{ color: '#01579b', animation: 'fadeIn 1s' }}>
              <span role="img" aria-label="task-icon">📝</span> Đăng Nhập
            </Title>
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
          <Input.Search
            placeholder="Nhập tên người dùng"
            enterButton="Đăng nhập"
            size="large"
            onSearch={handleLogin}
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
        </Card>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header style={{ background: '#004d40', padding: '0 24px', height: 64, lineHeight: '64px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ color: '#fff', margin: 0, fontWeight: 500 }}>
              <span role="img" aria-label="task-icon">📋</span> Quản Lý Công Việc
            </Title>
          </Col>
          <Col>
            <Space size="middle">
              <Text style={{ color: '#fff', fontWeight: 500 }}>Xin chào, {user}</Text>
              <Button
                type="link"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ color: '#fff', fontWeight: 500 }}
              >
                Đăng xuất
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '24px', maxWidth: 1280, margin: '0 auto' }}>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Tìm kiếm công việc"
            value={filters.keyword}
            onChange={e => setFilters({ ...filters, keyword: e.target.value })}
          />
          <Select
            placeholder="Lọc theo trạng thái"
            allowClear
            onChange={value => setFilters({ ...filters, status: value || '' })}
            style={{ width: 160 }}
          >
            {statuses.map(s => <Option key={s}>{s}</Option>)}
          </Select>
          <Select
            placeholder="Lọc theo người được giao"
            allowClear
            onChange={value => setFilters({ ...filters, assignedTo: value || '' })}
            style={{ width: 180 }}
          >
            {[...new Set(tasks.map(t => t.assignedTo))].map(u => <Option key={u}>{u}</Option>)}
          </Select>
          <Button
            type="primary"
            onClick={() => {
              setFormVisible(true);
              form.resetFields();
            }}
          >
            Thêm công việc
          </Button>
        </Space>

        <Title level={4} style={{ marginBottom: 16, color: '#00332b' }}>Danh Sách Công Việc</Title>
        {filteredTasks.length === 0 ? (
          <Card style={{ borderRadius: 16, textAlign: 'center', padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <Text type="secondary">Không có công việc nào phù hợp với bộ lọc.</Text>
          </Card>
        ) : (
          filteredTasks.map(task => (
            <Card
              key={task.id}
              style={{
                marginBottom: 16,
                borderRadius: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                background: task.status === 'Đã xong' ? '#e6ffed' : task.status === 'Đang làm' ? '#fffde7' : '#ffffff',
                transition: 'all 0.3s'
              }}
              hoverable
            >
              <Row gutter={[16, 8]} align="middle">
                <Col span={16}>
                  <Text strong style={{ fontSize: 16, color: '#00332b' }}>{task.name}</Text>
                  <div><Text type="secondary">Người được giao: {task.assignedTo}</Text></div>
                  <Space style={{ marginTop: 8 }}>
                    <Text type="secondary">Ưu tiên:</Text>
                    <Tag
                      color={task.priority === 'Cao' ? 'red' : task.priority === 'Trung bình' ? 'orange' : 'green'}
                      style={{ borderRadius: 6, fontWeight: 500 }}
                    >
                      {task.priority}
                    </Tag>
                    <Text type="secondary">Trạng thái:</Text>
                    <Tag
                      color={task.status === 'Đã xong' ? 'green' : task.status === 'Đang làm' ? 'blue' : 'default'}
                      style={{ borderRadius: 6, fontWeight: 500 }}
                    >
                      {task.status}
                    </Tag>
                  </Space>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        setEditingTask(task);
                        setFormVisible(true);
                        form.setFieldsValue(task);
                      }}
                      style={{ borderRadius: 6, background: '#e3f2fd', border: 'none' }}
                    >
                      Sửa
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDelete(task.id)}
                      style={{ borderRadius: 6 }}
                    >
                      Xóa
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          ))
        )}

        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          <Col xs={24} sm={12}>
            <Card style={{ borderRadius: 16, textAlign: 'center', background: '#e3f2fd', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <Statistic title="Tổng số công việc" value={tasks.length} valueStyle={{ color: '#01579b' }} />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card style={{ borderRadius: 16, textAlign: 'center', background: '#e8f5e9', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <Statistic title="Số công việc đã hoàn thành" value={completedCount} valueStyle={{ color: '#2e7d32' }} />
            </Card>
          </Col>
        </Row>

        <Modal
          title={<Title level={4} style={{ margin: 0, color: '#00332b' }}>{editingTask ? 'Chỉnh Sửa Công Việc' : 'Thêm Công Việc'}</Title>}
          visible={formVisible}
          onCancel={() => {
            setFormVisible(false);
            setEditingTask(null);
            form.resetFields();
          }}
          onOk={handleSave}
          okButtonProps={{ style: { borderRadius: 8, background: '#0288d1', border: 'none' } }}
          cancelButtonProps={{ style: { borderRadius: 8 } }}
          bodyStyle={{ padding: 24 }}
          width={560}
        >
          <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item
              name="name"
              label="Tên công việc"
              rules={[{ required: true, message: 'Vui lòng nhập tên công việc' }]}
            >
              <Input size="large" placeholder="Nhập tên công việc" style={{ borderRadius: 8 }} />
            </Form.Item>
            <Form.Item
              name="assignedTo"
              label="Người được giao"
              rules={[{ required: true, message: 'Vui lòng nhập người được giao' }]}
            >
              <Input size="large" placeholder="Nhập tên người được giao" style={{ borderRadius: 8 }} />
            </Form.Item>
            <Form.Item name="priority" label="Mức độ ưu tiên" initialValue="Thấp">
              <Select size="large" style={{ borderRadius: 8 }}>
                {priorities.map(p => <Option key={p}>{p}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" initialValue="Chưa làm">
              <Select size="large" style={{ borderRadius: 8 }}>
                {statuses.map(s => <Option key={s}>{s}</Option>)}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;