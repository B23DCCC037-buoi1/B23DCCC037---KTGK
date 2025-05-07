// 📁 src/models/Travel/import.ts
export const travelTypes = ['Biển', 'Núi', 'Thành phố'];
export interface Destination {
	id: string;
	name: string;
	type: typeof travelTypes[number]; // Kiểu dữ liệu cho loại điểm đến, chỉ có thể là 'Biển', 'Núi', hoặc 'Thành phố'
	price: number; // Giá là kiểu number
	image: string;
	rating: number;
  }