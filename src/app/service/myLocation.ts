class MyLocation {
  latitude: number;
  longitude: number;
  constructor(latitude: number, longitude: number) {
    (this.latitude = latitude), (this.longitude = longitude);
  }
}
export default MyLocation;
