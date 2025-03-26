import React, { useEffect, useState } from "react";
import { getUser } from "../../services/ProfileCard";
import { User } from "../../models/ProfileCard";

const ProfileCardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setError("Không thể tải thông tin người dùng.");
      }
    };
    fetchUser();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Thông tin người dùng</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Thông tin người dùng</h1>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Thông tin người dùng</h1>
      <div className="profile-card">
        <img
          src={user.avatar || "default-avatar.png"}
          alt={user.name}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      <style >{`
        .profile-card {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 16px;
        }
        .profile-info h2 {
          margin: 0;
          font-size: 20px;
        }
        .profile-info p {
          margin: 8px 0 0;
          font-size: 14px;
          color: #666;
        }
        @media (max-width: 768px) {
          .profile-card {
            flex-direction: column;
            text-align: center;
          }
          .profile-avatar {
            margin-right: 0;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileCardPage;