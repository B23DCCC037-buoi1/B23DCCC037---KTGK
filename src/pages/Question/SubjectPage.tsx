import React, { useState } from "react";

interface Subject {
  id: number;
  code: string;
  name: string;
  credits: number;
  knowledgeArea: string;
}

const SubjectPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, code: "CS101", name: "Lập trình C++", credits: 3, knowledgeArea: "Công nghệ thông tin" },
    { id: 2, code: "MATH102", name: "Toán cao cấp", credits: 4, knowledgeArea: "Toán học" },
  ]);
  
  const [newSubject, setNewSubject] = useState<Subject>({ id: 0, code: "", name: "", credits: 0, knowledgeArea: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Xử lý input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  // Thêm môn học
  const addSubject = () => {
    if (!newSubject.code || !newSubject.name || newSubject.credits <= 0) return;
    setSubjects([...subjects, { ...newSubject, id: subjects.length + 1 }]);
    setNewSubject({ id: 0, code: "", name: "", credits: 0, knowledgeArea: "" });
  };

  // Sửa môn học
  const editSubject = (id: number) => {
    const subject = subjects.find((s) => s.id === id);
    if (subject) {
      setNewSubject(subject);
      setEditingId(id);
    }
  };

  // Cập nhật môn học
  const updateSubject = () => {
    setSubjects(subjects.map((s) => (s.id === editingId ? newSubject : s)));
    setNewSubject({ id: 0, code: "", name: "", credits: 0, knowledgeArea: "" });
    setEditingId(null);
  };

  // Xóa môn học
  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div style={{ 
      padding: "32px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh"
    }}>
      <div style={{ 
        maxWidth: "1000px",
        margin: "0 auto",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        border: "none",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.95)",
        animation: "fadeIn 0.5s ease-in",
        padding: "32px"
      }}>
        <h2 style={{ 
          textAlign: "center",
          marginBottom: "40px",
          color: "#1a3353",
          fontWeight: 700,
          background: "linear-gradient(90deg, #1890ff, #13c2c2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "32px"
        }}>
          Quản lý Môn học
        </h2>

        {/* Form nhập môn học */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            <div>
              <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                Mã môn học
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                  transition: "all 0.3s",
                  fontSize: "16px"
                }}
                type="text"
                name="code"
                placeholder="Mã môn học"
                value={newSubject.code}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                Tên môn học
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                  transition: "all 0.3s",
                  fontSize: "16px"
                }}
                type="text"
                name="name"
                placeholder="Tên môn học"
                value={newSubject.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                Số tín chỉ
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                  transition: "all 0.3s",
                  fontSize: "16px"
                }}
                type="number"
                name="credits"
                placeholder="Số tín chỉ"
                value={newSubject.credits || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                Khối kiến thức
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                  transition: "all 0.3s",
                  fontSize: "16px"
                }}
                type="text"
                name="knowledgeArea"
                placeholder="Khối kiến thức"
                value={newSubject.knowledgeArea}
                onChange={handleChange}
              />
            </div>
            <button
              style={{
                gridColumn: "span 2",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: editingId 
                  ? "linear-gradient(45deg, #fa8c16, #ff4d4f)" 
                  : "linear-gradient(45deg, #1890ff, #13c2c2)",
                border: "none",
                color: "white",
                fontWeight: 500,
                fontSize: "16px",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.4)",
                cursor: "pointer"
              }}
              onClick={editingId ? updateSubject : addSubject}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(24, 144, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(24, 144, 255, 0.4)";
              }}
            >
              {editingId ? "Cập nhật" : "Thêm môn học"}
            </button>
          </div>
        </div>

        {/* Danh sách môn học */}
        <div style={{ borderRadius: "12px", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ 
                background: "linear-gradient(90deg, #1a3353, #2b5876)",
                color: "white",
                fontWeight: 600
              }}>
                <th style={{ padding: "16px", textAlign: "left" }}>Mã môn</th>
                <th style={{ padding: "16px", textAlign: "left" }}>Tên môn</th>
                <th style={{ padding: "16px", textAlign: "left" }}>Tín chỉ</th>
                <th style={{ padding: "16px", textAlign: "left" }}>Khối kiến thức</th>
                <th style={{ padding: "16px", textAlign: "left" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr 
                  key={subject.id} 
                  style={{ 
                    borderTop: "1px solid rgba(0,0,0,0.1)",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(24, 144, 255, 0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "12px", color: "#1a3353", fontWeight: 500 }}>{subject.code}</td>
                  <td style={{ padding: "12px", color: "#1a3353", fontWeight: 500 }}>{subject.name}</td>
                  <td style={{ padding: "12px", color: "#1890ff" }}>{subject.credits}</td>
                  <td style={{ padding: "12px", color: "#555" }}>{subject.knowledgeArea}</td>
                  <td style={{ padding: "12px" }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: "#1890ff",
                        border: "none",
                        color: "white",
                        fontWeight: 500,
                        transition: "all 0.3s",
                        marginRight: "8px",
                        cursor: "pointer"
                      }}
                      onClick={() => editSubject(subject.id)}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#40a9ff"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#1890ff"}
                    >
                      Sửa
                    </button>
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: "#f5222d",
                        border: "none",
                        color: "white",
                        fontWeight: 500,
                        transition: "all 0.3s",
                        cursor: "pointer"
                      }}
                      onClick={() => deleteSubject(subject.id)}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#ff4d4f"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#f5222d"}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {subjects.length === 0 && (
            <p style={{ textAlign: "center", color: "#555", padding: "24px" }}>
              Chưa có môn học nào được thêm
            </p>
          )}
        </div>
      </div>

      <style 
        dangerouslySetInnerHTML={{ 
          __html: `
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

export default SubjectPage;