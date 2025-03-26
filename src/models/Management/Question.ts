export interface Question {
    id: string;
    subjectId: string;
    content: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
    knowledgeArea: string;
  }