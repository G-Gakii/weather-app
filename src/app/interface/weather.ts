export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];

  main: {
    temp: number;

    humidity: number;
  };

  wind: {
    speed: number;
  };

  name: string;
}
