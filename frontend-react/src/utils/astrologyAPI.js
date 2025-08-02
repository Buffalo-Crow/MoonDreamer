export async function fetchMoonSign({ date, lat, lng }) {
  const response = await fetch("http://localhost:3001/api/moon-sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date,
      latitude: lat,
      longitude: lng,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch moon sign.");
  }
  const data = await response.json();
  return data.moonSign;
}
