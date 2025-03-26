import React, { useState, useEffect } from 'react';

export const difficulties = ["Dễ", "Trung bình", "Khó", "Rất khó"];
const difficultyColors = {
  "Dễ": "#52c41a",
  "Trung bình": "#fa8c16",
  "Khó": "#f5222d",
  "Rất khó": "#722ed1"
};

const QuestionPage = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]); // Lưu danh sách môn học
    const [newQuestion, setNewQuestion] = useState({
        content: '',
        subject: '',
        difficulty: 'Dễ',
        knowledgeArea: ''
    });

    useEffect(() => {
        const storedQuestions = localStorage.getItem('questions');
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        }

        const storedSubjects = localStorage.getItem("subjects");
        if (storedSubjects) {
            setSubjects(JSON.parse(storedSubjects));
        }

        // Lắng nghe sự thay đổi trong localStorage
        const handleStorageChange = () => {
            setSubjects(JSON.parse(localStorage.getItem("subjects") || "[]"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
    };

    const addQuestion = () => {
        if (!newQuestion.content || !newQuestion.subject || !newQuestion.knowledgeArea) return;
        const newQuestionData = { ...newQuestion, id: Date.now() };
        const updatedQuestions = [...questions, newQuestionData];
        setQuestions(updatedQuestions);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setNewQuestion({ content: '', subject: '', difficulty: 'Dễ', knowledgeArea: '' });
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
                <h1 style={{ 
                    textAlign: "center",
                    marginBottom: "40px",
                    color: "#1a3353",
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #1890ff, #13c2c2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "32px"
                }}>
                    Quản lý Câu hỏi
                </h1>

                {/* Form Section */}
                <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                        <div style={{ gridColumn: "span 2" }}>
                            <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                                Nội dung câu hỏi
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
                                name="content"
                                placeholder="Nhập nội dung câu hỏi"
                                value={newQuestion.content}
                                onChange={handleInputChange}
                            />
                        </div>
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
                                name="subject"
                                placeholder="Nhập mã môn học"
                                value={newQuestion.subject}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                                Độ khó
                            </label>
                            <select
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    border: "none",
                                    transition: "all 0.3s",
                                    fontSize: "16px"
                                }}
                                name="difficulty"
                                value={newQuestion.difficulty}
                                onChange={handleInputChange}
                            >
                                <option value="Dễ">Dễ</option>
                                <option value="Trung bình">Trung bình</option>
                                <option value="Khó">Khó</option>
                                <option value="Rất khó">Rất khó</option>
                            </select>
                        </div>
                        <div style={{ gridColumn: "span 2" }}>
                            <label style={{ display: "block", color: "#1a3353", fontWeight: 500, marginBottom: "8px" }}>
                                Lĩnh vực kiến thức
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
                                placeholder="Nhập lĩnh vực kiến thức"
                                value={newQuestion.knowledgeArea}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            style={{
                                gridColumn: "span 2",
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                background: "linear-gradient(45deg, #1890ff, #13c2c2)",
                                border: "none",
                                color: "white",
                                fontWeight: 500,
                                fontSize: "16px",
                                transition: "all 0.3s",
                                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.4)",
                                cursor: "pointer"
                            }}
                            onClick={addQuestion}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 6px 16px rgba(24, 144, 255, 0.6)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(24, 144, 255, 0.4)";
                            }}
                        >
                            Thêm câu hỏi
                        </button>
                    </div>
                </div>

                {/* Questions List Section */}
                <div style={{ borderRadius: "12px", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ 
                        fontSize: "24px",
                        fontWeight: 600,
                        padding: "16px",
                        color: "white",
                        background: "linear-gradient(90deg, #1a3353, #2b5876)",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px"
                    }}>
                        Danh sách câu hỏi
                    </h2>
                    {questions.length > 0 ? (
                        <div style={{ padding: "16px" }}>
                            {questions.map((question) => (
                                <div
                                    key={question.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "12px",
                                        background: "rgba(24, 144, 255, 0.05)",
                                        borderRadius: "8px",
                                        marginBottom: "8px",
                                        transition: "all 0.3s",
                                        cursor: "default"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <span style={{ fontWeight: 500, color: "#1a3353" }}>{question.content}</span>
                                        <span
                                            style={{
                                                color: "white",
                                                background: difficultyColors[question.difficulty as keyof typeof difficultyColors],
                                                padding: "4px 12px",
                                                borderRadius: "12px",
                                                fontWeight: 500,
                                                fontSize: "12px"
                                            }}
                                        >
                                            {question.difficulty}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <span style={{ fontWeight: 500, color: "#1890ff" }}>{question.subject}</span>
                                        <span style={{ color: "#555", fontStyle: "italic" }}>{question.knowledgeArea}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: "center", color: "#555", padding: "24px" }}>
                            Chưa có câu hỏi nào được thêm
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

export default QuestionPage;