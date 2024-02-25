export const filters = [
  {
    id: 2,
    title: "amenities",
    filters: [
      {
        name: "Wifi",
        number: 126,
        fn: (trips) => trips.amenities.includes("Wifi"),
      },
      {
        name: "parking space",
        number: 126,
      },
      {
        name: "swimming pool",
        number: 67,
      },
      {
        name: "bathroom",
        number: 246,
      },
      {
        name: "breakfast",
        number: 126,
      },
    ],
  },
  {
    id: 4,
    title: "Price range",
    filters: [
      {
        name: "$0 - $100",
        number: 102,
      },
      {
        name: "$101 - $200",
        number: 134,
      },
      {
        name: "$201 - $500",
        number: 134,
      },
      {
        name: "$751 - $1000",
        number: 134,
      },
      {
        name: "$1000 & Above",
        number: 134,
      },
    ],
  },
  {
    id: 5,
    title: "rating",
    filters: [
      {
        name: "Above 1",
        rating: 1,
      },
      {
        name: "Above 2",
        rating: 2,
      },
      {
        name: "Above 3",
        rating: 3,
      },
      {
        name: "Above 4",
        rating: 4.5,
      },
    ],
  },
];
