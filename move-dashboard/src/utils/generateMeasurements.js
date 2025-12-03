export function generateMeasurements() {
  const measurements = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const date = new Date(
      now.getTime() - ((100 - i) * (3 * 24 * 60 * 60 * 1000)) / 100
    ); // 1-minute intervals

    measurements.push({
      timestamp: date.toISOString(),
      disp_mm: Number((Math.random() * 4).toFixed(2)), // Random values between 0 and 4 mm (two decimal places)
    });
  }
  return measurements;
}
