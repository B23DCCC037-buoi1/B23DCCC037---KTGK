export interface Destination {
  id: string;
  name: string;
  location: string;
  type: 'biển' | 'núi' | 'thành phố';
  rating: number;
  imageUrl: string;
  shortDescription: string;
  detailDescription: string;
  spots: string[];
  openTime: string;
  price: string;
  services: {
    transport: string;
    food: string;
    guide: string;
    accommodation: { 
      type: string; 
      price: string;
    };
  };
}