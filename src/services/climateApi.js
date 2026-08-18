// Simulates a network request with a delay
export const fetchClimateData = (regionName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Generate random realistic climate data
      const mockData = {
        region: regionName,
        temperature: Math.floor(Math.random() * 20) + 30, // 30 to 50
        humidity: Math.floor(Math.random() * 40) + 40,    // 40 to 80
        windSpeed: Math.floor(Math.random() * 20) + 5,    // 5 to 25
        heatIndex: Math.floor(Math.random() * 25) + 28,   // 28 to 53
        weatherCondition: ['Clear', 'Cloudy', 'Hazy', 'Sunny'][Math.floor(Math.random() * 4)],
        lastUpdated: new Date().toLocaleTimeString()
      };
      
      // 10% chance to simulate an API error for testing error handling
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch climate data. Network timeout.'));
      } else {
        resolve(mockData);
      }
    }, 1500); // 1.5 seconds delay
  });
};