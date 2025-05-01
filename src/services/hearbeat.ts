let heartbeatInterval: NodeJS.Timeout | null = null;
let inactivityTimeout: NodeJS.Timeout | null = null;

export const startHeartbeat = (payload: Record<string, any>) => {
  const HEARTBEAT_INTERVAL = payload?.heartbeatInterval * 1000;
  // Clear existing heartbeat if already running
  stopHeartbeat();

  heartbeatInterval = setInterval(() => {
    sendHeartbeat({ ...payload, status: "active" });
  }, HEARTBEAT_INTERVAL);

  // Setup inactivity timer
  resetInactivityTimer(payload);
};

export const resetInactivityTimer = (payload: Record<string, any>) => {
  const INACTIVITY_LIMIT = payload?.inactivityLimit * 1000;
  if (inactivityTimeout) clearTimeout(inactivityTimeout);

  inactivityTimeout = setTimeout(() => {
    sendHeartbeat({ status: "inactive" });
    stopHeartbeat(); // Stop the active heartbeats
  }, INACTIVITY_LIMIT);
};

export const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

const sendHeartbeat = async (body: Record<string, any>) => {
  try {
    await fetch("http://localhost:8000/api/v1/heartbeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Heartbeat failed:", error);
  }
};
