interface Exam {
  id: number;
  subject: string;
  questions: number;
  structure: { difficulty: string; count: number }[];
}

const difficulties = ["Dễ", "Trung bình", "Khó", "Rất khó"];

export const createExam = (
  exams: Exam[],
  setExams: React.Dispatch<React.SetStateAction<Exam[]>>,
  newExam: Exam,
  setNewExam: React.Dispatch<React.SetStateAction<Exam>>
) => {
  if (!newExam.subject || newExam.questions <= 0) return;
  
  setExams([...exams, { ...newExam, id: exams.length + 1 }]);
  
  setNewExam({ 
    id: 0, 
    subject: "", 
    questions: 0, 
    structure: difficulties.map((d) => ({ difficulty: d, count: 0 })) 
  });
};

export const handleExamChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  newExam: Exam,
  setNewExam: React.Dispatch<React.SetStateAction<Exam>>
) => {
  setNewExam({ ...newExam, [e.target.name]: e.target.value });
};

export const handleStructureChange = (
  difficulty: string,
  count: number,
  newExam: Exam,
  setNewExam: React.Dispatch<React.SetStateAction<Exam>>
) => {
  setNewExam({
    ...newExam,
    structure: newExam.structure.map((s) =>
      s.difficulty === difficulty ? { ...s, count } : s
    ),
  });
};