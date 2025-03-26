export interface Question {
  id: number;
  content: string;
  subject: string;
  difficulty: "Dễ" | "Trung bình" | "Khó" | "Rất khó";
  knowledgeArea: string;
}

const STORAGE_KEY = "questions";

export const getQuestions = (): Question[] => {
  const storedQuestions = localStorage.getItem(STORAGE_KEY);
  return storedQuestions ? JSON.parse(storedQuestions) : [];
};

export const saveQuestions = (questions: Question[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
};

export const addQuestion = (newQuestion: Omit<Question, "id">): Question[] => {
  const questions = getQuestions();
  const questionWithId = { ...newQuestion, id: Date.now() };
  const updatedQuestions = [...questions, questionWithId];
  saveQuestions(updatedQuestions);
  return updatedQuestions;
};