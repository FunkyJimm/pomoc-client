export const findCoordinates = async (address, city) => {
  const { street, house } = address;
  const apartment = address.apartment ? `+${address.apartment}` : '';

  let coordinates = {};

  await fetch(`https://nominatim.openstreetmap.org/search?q=${street}+${house}${apartment},+${city}&format=json`)
    .then(res => res.json())
    .then(data => {
      if (data[0] !== null) {
        coordinates = { lat: data[0]?.lat, lon: data[0]?.lon };
      }
    })
    .catch(err => console.log(err));

  return coordinates;
}