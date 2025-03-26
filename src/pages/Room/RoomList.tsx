import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { getRooms, deleteRoom } from "../../services/Room";
import { Room } from "../../models/Room";

const RoomList: React.FC<{ onEdit: (room: Room) => void }> = ({ onEdit }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRooms(getRooms());
  }, []);

  const handleDelete = (roomId: string) => {
    deleteRoom(roomId);
    setRooms(getRooms());
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Tìm kiếm theo tên phòng"
        prefix={<SearchOutlined />}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
        dataSource={filteredRooms}
        columns={[
          { title: "Mã phòng", dataIndex: "id" },
          { title: "Tên phòng", dataIndex: "name" },
          { title: "Số chỗ", dataIndex: "capacity" },
          { title: "Loại phòng", dataIndex: "type" },
          { title: "Người phụ trách", dataIndex: "manager" },
          {
            title: "Hành động",
            render: (_, record: Room) => (
              <>
                <Button icon={<EditOutlined />} onClick={() => onEdit(record)} style={{ marginRight: 8 }} />
                <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default RoomList;
