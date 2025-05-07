import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  List,
  Card,
  Tag,
  Select,
  DatePicker,
  Modal,
  Form,
  message,
  Checkbox,
  Space,
  Popconfirm,
  Typography,
  Divider,
  Row,
  Col,
  Badge,
  Tooltip,
  Empty
} from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
  StarOutlined,
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  ReadOutlined,
  TagOutlined
} from "@ant-design/icons";
import { Note } from "@/models/Note/note";
import { noteService } from "@/services/Note/Note";
import dayjs from "dayjs";

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const NotePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterTag, setFilterTag] = useState<string | undefined>();
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [form] = Form.useForm();
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);

  const maxLength = 100; // Tăng độ dài hiển thị mặc định

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const allNotes = noteService.getNotes();
    setNotes(allNotes);
  };

  const openModal = (note?: Note) => {
    if (note) {
      setCurrentNote(note);
      form.setFieldsValue({
        ...note,
        createdAt: dayjs(note.createdAt).format("YYYY-MM-DD"),
      });
    } else {
      setCurrentNote(null);
      form.resetFields();
      // Thiết lập ngày tạo mặc định là hôm nay
      form.setFieldsValue({
        createdAt: dayjs().format("YYYY-MM-DD"),
      });
    }
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const noteData: Note = {
        id: currentNote?.id || crypto.randomUUID(),
        title: values.title,
        content: values.content,
        tags: values.tags || [],
        createdAt: new Date(values.createdAt).toISOString(),
        isImportant: values.isImportant || false,
        isPinned: values.isPinned || false,
      };

      if (currentNote) {
        noteService.updateNote(noteData);
        message.success("Đã cập nhật ghi chú thành công");
      } else {
        noteService.addNote(noteData);
        message.success("Đã tạo ghi chú mới thành công");
      }

      loadNotes();
      setIsModalVisible(false);
    } catch (err) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }
  };

  const handleDelete = (id: string) => {
    noteService.deleteNote(id);
    message.success("Đã xoá ghi chú thành công");
    loadNotes();
  };

  const toggleView = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  const handleToggleExpand = (id: string) => {
    const newExpandedNotes = new Set(expandedNotes);
    if (newExpandedNotes.has(id)) {
      newExpandedNotes.delete(id);
    } else {
      newExpandedNotes.add(id);
    }
    setExpandedNotes(newExpandedNotes);
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };
  

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((note) => (filterTag ? note.tags.includes(filterTag) : true))
    .filter((note) =>
      filterDate ? dayjs(note.createdAt).isSame(filterDate, "day") : true
    )
    .sort((a, b) => {
      // Sắp xếp theo ghim trước, sau đó theo quan trọng, sau đó theo ngày tạo mới nhất
      if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
      if (a.isImportant !== b.isImportant) return b.isImportant ? 1 : -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Xác định các tags độc đáo từ tất cả các ghi chú
  const uniqueTags = [...new Set(notes.flatMap((note) => note.tags))];

  const renderNoteContent = (note: Note) => (
    <Paragraph>
      {expandedNotes.has(note.id)
        ? note.content
        : note.content.substring(0, maxLength)}{" "}
      {note.content.length > maxLength && !expandedNotes.has(note.id) && (
        <Button type="link" onClick={() => handleToggleExpand(note.id)} style={{ padding: 0 }}>
          Xem thêm
        </Button>
      )}
      {expandedNotes.has(note.id) && (
        <Button
          type="link"
          onClick={() => handleToggleExpand(note.id)}
          style={{ padding: 0 }}
        >
          Rút gọn
        </Button>
      )}
    </Paragraph>
  );

  return (
    <div style={{ 
      padding: 24, 
      maxWidth: 1200, 
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <Row gutter={[0, 24]} align="middle" justify="space-between">
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            <ReadOutlined /> Quản lý ghi chú
          </Title>
        </Col>
        <Col>
          <Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => openModal()}
              size="large"
            >
              Thêm ghi chú
            </Button>
            <Tooltip title={viewMode === "grid" ? "Chuyển sang chế độ danh sách" : "Chuyển sang chế độ lưới"}>
              <Button 
                icon={viewMode === "grid" ? <BarsOutlined /> : <AppstoreOutlined />} 
                onClick={toggleView}
                size="large"
              />
            </Tooltip>
            <Tooltip title="Hiển thị bộ lọc">
              <Button 
                icon={<FilterOutlined />} 
                onClick={toggleFilters}
                type={isFiltersVisible ? "primary" : "default"}
                size="large"
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "16px 0" }} />

      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={isFiltersVisible ? 16 : 24}>
            <Search
              placeholder="Tìm kiếm ghi chú theo tiêu đề hoặc nội dung"
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              style={{ width: "100%" }}
            />
          </Col>
          
          {isFiltersVisible && (
            <>
              <Col xs={24} md={8}>
                <Select
                  allowClear
                  placeholder="Lọc theo tag"
                  style={{ width: "100%" }}
                  onChange={setFilterTag}
                  size="large"
                  suffixIcon={<TagOutlined />}
                >
                  {uniqueTags.map((tag) => (
                    <Option key={tag} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} md={8}>
                <DatePicker
                  placeholder="Lọc theo ngày"
                  onChange={(date) => setFilterDate(date ? date.toISOString() : null)}
                  size="large"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  suffixIcon={<CalendarOutlined />}
                />
              </Col>
            </>
          )}
        </Row>
      </div>

      {filteredNotes.length === 0 ? (
        <Empty 
          description="Không tìm thấy ghi chú nào" 
          style={{ 
            backgroundColor: "#fff", 
            padding: "48px", 
            borderRadius: "12px",
            marginTop: "32px"
          }}
        />
      ) : viewMode === "grid" ? (
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          {filteredNotes.map((note) => (
            <Col xs={24} sm={12} md={8} lg={6} key={note.id}>
              <Badge.Ribbon 
                text={note.isPinned ? "Đã ghim" : ""}
                color="blue" 
                style={{ display: note.isPinned ? "block" : "none" }}
              >
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                    borderRadius: "12px",
                    backgroundColor: note.isImportant ? "#fffbe6" : "#fff",
                    borderLeft: note.isImportant ? "4px solid #faad14" : "",
                  }}
                  actions={[
                    <Tooltip title="Chỉnh sửa">
                      <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        onClick={() => openModal(note)} 
                      />
                    </Tooltip>,
                    <Popconfirm
                      title="Bạn có chắc muốn xoá ghi chú này?"
                      onConfirm={() => handleDelete(note.id)}
                      okText="Xoá"
                      cancelText="Huỷ"
                    >
                      <Button type="text" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  ]}
                >
                  <div style={{ marginBottom: 16 }}>
                    <Space>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {note.title}
                      </Typography.Title>
                      {note.isImportant && (
                        <StarOutlined style={{ color: "#faad14", fontSize: 18 }} />
                      )}
                    </Space>
                    <div style={{ marginTop: 8, fontSize: 13, color: "#8c8c8c" }}>
                      <CalendarOutlined /> {dayjs(note.createdAt).format("DD/MM/YYYY")}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 16 }}>
                    {renderNoteContent(note)}
                  </div>
                  
                  <Space size={[0, 4]} wrap>
                    {note.tags.map((tag) => (
                      <Tag 
                        key={tag} 
                        color="processing"
                        style={{ marginBottom: 4, borderRadius: "4px" }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={filteredNotes}
          style={{ 
            backgroundColor: "#fff", 
            padding: "16px", 
            borderRadius: "12px"
          }}
          renderItem={(note) => (
            <List.Item
              key={note.id}
              style={{
                backgroundColor: note.isImportant ? "#fffbe6" : "#fff",
                borderRadius: "8px",
                marginBottom: "12px",
                padding: "16px",
                borderLeft: note.isImportant ? "4px solid #faad14" : "",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
              actions={[
                <Space>
                  <Tooltip title="Chỉnh sửa">
                    <Button
                      type="primary"
                      ghost
                      icon={<EditOutlined />}
                      onClick={() => openModal(note)}
                    >
                      Chỉnh sửa
                    </Button>
                  </Tooltip>
                  <Popconfirm
                    title="Bạn có chắc muốn xoá ghi chú này?"
                    onConfirm={() => handleDelete(note.id)}
                    okText="Xoá"
                    cancelText="Huỷ"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Xoá
                    </Button>
                  </Popconfirm>
                </Space>
              ]}
            >
              <List.Item.Meta
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Text strong style={{ fontSize: "18px" }}>
                      {note.title}
                    </Text>
                    {note.isImportant && (
                      <Tooltip title="Quan trọng">
                        <Tag color="red" style={{ margin: 0 }}>
                          <StarOutlined /> Quan trọng
                        </Tag>
                      </Tooltip>
                    )}
                    {note.isPinned && (
                      <Tooltip title="Đã ghim">
                        <Tag color="blue" style={{ margin: 0 }}>
                          <PushpinOutlined /> Đã ghim
                        </Tag>
                      </Tooltip>
                    )}
                  </div>
                }
                description={
                  <>
                    <Space wrap style={{ marginTop: 8 }}>
                      {note.tags.map((tag) => (
                        <Tag 
                          key={tag} 
                          color="processing"
                          style={{ borderRadius: "4px" }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </Space>
                    <div style={{ fontSize: 13, color: "#8c8c8c", marginTop: 6 }}>
                      <CalendarOutlined /> {dayjs(note.createdAt).format("DD/MM/YYYY")}
                    </div>
                  </>
                }
                style={{ marginBottom: "8px" }}
              />
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <div style={{ 
                  height: "80px", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis",
                }}>
                  {note.content.substring(0, maxLength)}
                  {note.content.length > maxLength && "..."}
                </div>
                {note.content.length > maxLength && (
                  <div style={{ 
                    position: "absolute", 
                    bottom: "0", 
                    right: "0", 
                    backgroundColor: note.isImportant ? "#fffbe6" : "#fff",
                    padding: "0 8px"
                  }}>
                    <Button 
                      type="link" 
                      onClick={() => openModal(note)}
                      style={{ padding: "0", height: "auto" }}
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
              </div>
            </List.Item>
          )}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            position: 'bottom',
            size: 'default',
            showTotal: (total) => `Tổng cộng ${total} ghi chú`
          }}
        />
      )}

      {/* Modal Thêm/Sửa Ghi Chú */}
      <Modal
        title={
          <div style={{ fontSize: "18px" }}>
            {currentNote ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới"}
          </div>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
        centered
      >
        <Form layout="vertical" form={form} style={{ marginTop: 16 }}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input size="large" placeholder="Nhập tiêu đề ghi chú" />
          </Form.Item>
          <Form.Item 
            label="Nội dung" 
            name="content"
          >
            <Input.TextArea 
              rows={6} 
              placeholder="Nhập nội dung ghi chú" 
              showCount 
              maxLength={1000} 
            />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select 
              mode="tags" 
              placeholder="Nhập tags (nhấn Enter để thêm)" 
              style={{ width: "100%" }} 
              tokenSeparators={[',']}
            />
          </Form.Item>
          <Form.Item 
            label="Ngày tạo" 
            name="createdAt" 
            rules={[{ required: true, message: "Vui lòng chọn ngày tạo" }]}
          >
            <Input type="date" size="large" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="isImportant" valuePropName="checked">
                <Checkbox>
                  <Space>
                    <StarOutlined style={{ color: "#faad14" }} />
                    Đánh dấu là quan trọng
                  </Space>
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isPinned" valuePropName="checked">
                <Checkbox>
                  <Space>
                    <PushpinOutlined style={{ color: "#1890ff" }} />
                    Ghim ghi chú này lên đầu
                  </Space>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default NotePage;