export const fetchChatbotConfig = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    ); // Replace with real config endpoint
    const config = await response.json();

    return {
      ...config,
      delay: 10,
      heartbeatInterval: 20,
      inactivityLimit: 60,
      timeout: 30,
    };
  } catch (error) {
    console.warn(
      "Failed to fetch chatbot config. Using default config.",
      error
    );
    return {
      title: "",
      delay: 10,
      heartbeatInterval: 20,
      inactivityLimit: 60,
      timeout: 30,
    };
  }
};
