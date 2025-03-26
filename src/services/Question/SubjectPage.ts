export interface Subject {
    id: number;
    code: string;
    name: string;
    credits: number;
    knowledgeArea: string;
  }
  
  class SubjectService {
    private subjects: Subject[] = [
      { id: 1, code: "CS101", name: "Lập trình C++", credits: 3, knowledgeArea: "Công nghệ thông tin" },
      { id: 2, code: "MATH102", name: "Toán cao cấp", credits: 4, knowledgeArea: "Toán học" },
    ];
  
    getSubjects(): Subject[] {
      return this.subjects;
    }
  
    addSubject(newSubject: Subject): void {
      if (!newSubject.code || !newSubject.name || newSubject.credits <= 0) return;
      newSubject.id = this.subjects.length + 1;
      this.subjects.push(newSubject);
    }
  
    editSubject(id: number, updatedSubject: Subject): void {
      this.subjects = this.subjects.map(subject => subject.id === id ? { ...updatedSubject, id } : subject);
    }
  
    deleteSubject(id: number): void {
      this.subjects = this.subjects.filter(subject => subject.id !== id);
    }
  }
  
  export default new SubjectService();
  