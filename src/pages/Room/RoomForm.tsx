import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button } from "antd";
import { Room } from "../../models/Room";

const { Option } = Select;

const managers = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];

interface Props {
  visible: boolean;
  onClose: () => void;
  roomToEdit?: Room | null;
  onRefresh: () => void;
}

const RoomForm: React.FC<Props> = ({ visible, onClose, roomToEdit, onRefresh }) => {
  const [room, setRoom] = useState<Room>({
    id: "",
    name: "",
    capacity: 0,
    type: "Lý thuyết",
    manager: managers[0],
  });

  useEffect(() => {
    if (roomToEdit) {
      setRoom(roomToEdit);
    } else {
      setRoom({ id: "", name: "", capacity: 0, type: "Lý thuyết", manager: managers[0] });
    }
  }, [roomToEdit]);

  return (
    <Modal 
      title="Thông tin phòng"
      visible={visible} 
      onCancel={onClose} 
      footer={null}
    >
      <Input 
        placeholder="Tên phòng" 
        value={room.name} 
        onChange={(e) => setRoom({ ...room, name: e.target.value })} 
        style={{ marginBottom: 10 }} 
      />
      <Input 
        type="number" 
        placeholder="Số chỗ ngồi" 
        value={room.capacity} 
        onChange={(e) => setRoom({ ...room, capacity: Number(e.target.value) })} 
        style={{ marginBottom: 10 }} 
      />
      <Select 
        value={room.type} 
        onChange={(value) => setRoom({ ...room, type: value })} 
        style={{ width: "100%", marginBottom: 10 }}
      >
        <Option value="Lý thuyết">Lý thuyết</Option>
        <Option value="Thực hành">Thực hành</Option>
        <Option value="Hội trường">Hội trường</Option>
      </Select>
      <Select 
        value={room.manager} 
        onChange={(value) => setRoom({ ...room, manager: value })} 
        style={{ width: "100%" }}
      >
        {managers.map((m) => (
          <Option key={m} value={m}>{m}</Option>
        ))}
      </Select>
      <div style={{ marginTop: 20, textAlign: "right" }}>
        <Button onClick={onClose} style={{ marginRight: 10 }}>Hủy</Button>
        <Button type="primary" onClick={() => { onRefresh(); onClose(); }}>
          {roomToEdit ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>
    </Modal>
  );
};

export default RoomForm;
