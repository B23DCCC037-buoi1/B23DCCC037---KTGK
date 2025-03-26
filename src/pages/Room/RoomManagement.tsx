import React, { useState } from "react";
import { Button } from "antd";
import RoomList from "./RoomList";
import RoomForm from "../Room/RoomForm";  
import { Room } from "../../models/Room";

const RoomManagement: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);

  const handleOpenForm = (room?: Room) => {
    setRoomToEdit(room || null); 
    setVisible(true);
    console.log("Opening form:", room);
  };

  const handleCloseForm = () => {
    setVisible(false);
    setRoomToEdit(null);
    console.log("Closing form");
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => handleOpenForm()} style={{ marginBottom: 20 }}>
        Thêm phòng
      </Button>

      <RoomList onEdit={(room: Room) => handleOpenForm(room)} />

      <RoomForm 
        visible={visible}  
        onClose={handleCloseForm} 
        roomToEdit={roomToEdit} 
        onRefresh={() => window.location.reload()} 
      />
    </div>
  );
};

export default RoomManagement;
