import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  List,
  Card,
  Tag,
  Switch,
  Select,
  DatePicker,
  Modal,
  Form,
  message,
  Checkbox,
  Space,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Note } from "@/models/Note/note";
import { noteService } from "@/services/Note/Note";

const { Search } = Input;
const { Option } = Select;

const NotePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string | undefined>();
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    setNotes(noteService.getNotes());
  }, []);

  const openModal = (note?: Note) => {
    if (note) {
      setCurrentNote(note);
      form.setFieldsValue({ ...note, createdAt: note.createdAt.split("T")[0] });
    } else {
      setCurrentNote(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newNote: Note = {
        id: currentNote?.id || crypto.randomUUID(),
        title: values.title,
        content: values.content,
        tags: values.tags || [],
        createdAt: new Date(values.createdAt).toISOString(),
        isPinned: values.isPinned || false,
        isImportant: values.isImportant || false,
      };

      if (currentNote) {
        noteService.updateNote(newNote);
        message.success("Đã cập nhật ghi chú");
      } else {
        noteService.addNote(newNote);
        message.success("Đã tạo ghi chú mới");
      }

      setNotes(noteService.getNotes());
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    noteService.deleteNote(id);
    setNotes(noteService.getNotes());
    message.success("Đã xoá ghi chú");
  };

  const toggleView = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((note) => (filterTag ? note.tags.includes(filterTag) : true))
    .filter((note) =>
      filterDate
        ? new Date(note.createdAt).toDateString() ===
          new Date(filterDate).toDateString()
        : true
    )
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Search
          placeholder="Tìm kiếm tiêu đề hoặc nội dung"
          onChange={(e) => handleSearchChange(e.target.value)} // Lọc trực tiếp khi thay đổi
          value={searchTerm}
          allowClear
          enterButton
        />
        <Select
          allowClear
          placeholder="Lọc theo tag"
          onChange={(value) => setFilterTag(value)}
          style={{ width: 150 }}
        >
          {[...new Set(notes.flatMap((note) => note.tags))].map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
        <DatePicker
          placeholder="Lọc theo ngày"
          onChange={(date) =>
            setFilterDate(date ? date.toISOString() : null)
          }
        />
        <Button icon={<PlusOutlined />} onClick={() => openModal()}>
          Thêm
        </Button>
        <Switch
          checkedChildren={<AppstoreOutlined />}
          unCheckedChildren={<BarsOutlined />}
          checked={viewMode === "grid"}
          onChange={toggleView}
        />
      </div>

      {/* Đánh dấu Quan trọng lên đầu trang */}
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()} icon={<StarOutlined />}>
          Đánh dấu ghi chú quan trọng
        </Button>
      </div>

      {viewMode === "grid" ? (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              title={note.title}
              style={{ width: 250 }}
              extra={
                <Space>
                  {note.isImportant && <StarOutlined style={{ color: "red" }} />}
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => openModal(note)}
                  />
                  <Popconfirm
                    title="Xoá ghi chú?"
                    onConfirm={() => handleDelete(note.id)}
                  >
                    <Button type="text" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              }
            >
              <p>{note.content}</p>
              {note.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              <br />
              <small>{new Date(note.createdAt).toLocaleDateString("vi-VN")}</small>
              {note.isPinned && <div><PushpinOutlined /> Đã ghim</div>}
            </Card>
          ))}
        </div>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={filteredNotes}
          renderItem={(note) => (
            <List.Item
              key={note.id}
              actions={[
                <Button type="link" icon={<EditOutlined />} onClick={() => openModal(note)} />,
                <Popconfirm title="Xoá ghi chú?" onConfirm={() => handleDelete(note.id)}>
                  <Button type="link" icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    {note.title}
                    {note.isImportant && <Tag color="red">Quan trọng</Tag>}
                    {note.isPinned && <Tag color="blue">Đã ghim</Tag>}
                  </Space>
                }
                description={
                  <>
                    {note.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                    <br />
                    {new Date(note.createdAt).toLocaleDateString("vi-VN")}
                  </>
                }
              />
              <div>{note.content}</div>
            </List.Item>
          )}
        />
      )}

      {/* Modal Thêm/Sửa */}
      <Modal
        title={currentNote ? "Chỉnh sửa ghi chú" : "Thêm ghi chú"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        okText="Xong"
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select mode="tags" style={{ width: "100%" }} placeholder="Thêm tags" />
          </Form.Item>
          <Form.Item label="Ngày tạo" name="createdAt" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="isImportant" valuePropName="checked">
            <Checkbox>Đánh dấu là quan trọng</Checkbox>
          </Form.Item>
          <Form.Item name="isPinned" valuePropName="checked">
            <Checkbox>Ghim lên đầu</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NotePage;
