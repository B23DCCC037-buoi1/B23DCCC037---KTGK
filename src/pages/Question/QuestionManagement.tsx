import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import SubjectManagement from "./SubjectPage"; // Import các component con
import QuestionList from "./QuestionPage"
import ExamManagement from "./ExamPage";

const QuestionManagement: React.FC = () => {
  return (
    <div>
      <h1>Quản lý Ngân hàng Câu hỏi</h1>
      <nav>
        <ul>
          <li><Link to="/question-management/subject">Quản lý Môn học</Link></li>
          <li><Link to="/question-management/question">Quản lý Câu hỏi</Link></li>
          <li><Link to="/question-management/exam">Quản lý Đề thi</Link></li>
        </ul>
      </nav>
      
      {/* Thay Outlet bằng Switch và Route */}
      <Switch>
        <Route path="/question-management/subject" component={SubjectManagement} />
        <Route path="/question-management/question" component={QuestionList} />
        <Route path="/question-management/exam" component={ExamManagement} />
      </Switch>
    </div>
  );
};

export default QuestionManagement;
