export const getDestinations = async () => {
  return [
    {
      id: 1,
      name: 'Đà Nẵng',
      type: 'Biển',
      image: '/src/Public/Travel/Đanang.jpg',
      rating: 3,
      price: 2000000,
    },
    {
      id: 2,
      name: 'Sapa',
      type: 'Núi',
      image: '/src/Public/Travel/Sapa.jpg',
      rating: 4.7,
      price: 3000000,
    },
    {
      id: 3,
      name: 'Hà Nội',
      type: 'Thành phố',
      image: '/src/Public/Travel/Hanoi.jpg',
      rating: 4.5,
      price: 4000000,
    },
    {
      id: 4,
      name: 'Thành phố Hồ Chí Minh',
      type: 'Thành phố',
      image: '/src/Public/Travel/ThanhphoHoChiMinh.jpg',
      rating: 5,
      price: 5000000,
    },
  ];
};
