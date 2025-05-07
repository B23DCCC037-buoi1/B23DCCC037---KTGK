export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    tags: string[];
    isPinned: boolean;
    isImportant: boolean;
  }
  