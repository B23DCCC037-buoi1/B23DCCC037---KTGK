// services/Travel/Itinerary.ts

export interface ItineraryItem {
  day: number;
  name: string;
  price: number;
  date: string; // dạng chuỗi từ HomePage
}

export interface ItinerarySummary {
  totalBudget: number;
  estimatedTravelTime: number;
  numberOfDays: number;
  travelTimesBetween?: number[];
}

export const calculateItinerary = (plan: ItineraryItem[]): ItinerarySummary => {
  let totalBudget = 0;
  let estimatedTravelTime = 0;
  let numberOfDays = 0;
  const travelTimesBetween: number[] = [];

  // Tính tổng ngân sách
  totalBudget = plan.reduce((sum, item) => sum + (item.price || 0), 0);

  // Tính số ngày dựa trên giá trị day lớn nhất
  numberOfDays = Math.max(...plan.map((item) => item.day), 0);

  // Giả lập thời gian di chuyển giữa các điểm
  for (let i = 0; i < plan.length - 1; i++) {
    const travelTime = Math.random() * 5;
    travelTimesBetween.push(Number(travelTime.toFixed(1)));
    estimatedTravelTime += travelTime;
  }

  return {
    totalBudget,
    estimatedTravelTime: Number(estimatedTravelTime.toFixed(1)),
    numberOfDays,
    travelTimesBetween,
  };
};
