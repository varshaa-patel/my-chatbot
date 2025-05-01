export const Flights = {
  response: "Hii ! how can I help You.",
  type: "flights_available",
  data: {
    flights: [
      {
        airline: "Indigo",
        flight_number: "ABC123",
        departure: {
          airport: "Delhi",
          time: "ISO8601",
        },
        arrival: {
          airport: "Mumbai",
          time: "ISO8601",
        },
        duration: "3 Hour",
        stops: "1",
        price: {
          amount: "2000",
          currency: "INR",
        },
        fare_class: "ECONOMY",
        logo_url:
          "https://www.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png",
      },
      {
        airline: "Qatar",
        flight_number: "XYZ321",
        departure: {
          airport: "Delhi",
          time: "ISO8601",
        },
        arrival: {
          airport: "Mumbai",
          time: "ISO8601",
        },
        duration: "3.5 Hour",
        stops: "3",
        price: {
          amount: "3500",
          currency: "INR",
        },
        fare_class: "BUSINESS",
        logo_url:
          "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/sponsorships/hn-rcb-cricket-sponsorship.jpg",
      },
    ],
  },
  message: "string",
  next_action: "select_flight",
};
