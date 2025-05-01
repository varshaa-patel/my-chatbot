let heartbeatInterval: NodeJS.Timeout | null = null;
let inactivityTimeout: NodeJS.Timeout | null = null;
let broadcast: BroadcastChannel | null = null;
let lastPayload: Record<string, any> = {};

const TAB_ID = Math.random().toString(36).substring(2, 15);

const CHANNEL_NAME = 'chatbot_heartbeat_channel';
const ACTIVE_TAB_KEY = 'chatbot_active_tab';

const DEBUG = false;
const log = (...args: any[]) => {
  if (DEBUG) {
    console.log(`[Tab ${TAB_ID.substring(0, 4)}]`, ...args);
  }
};


export const startHeartbeat = (payload: Record<string, any>) => {
  const HEARTBEAT_INTERVAL = payload?.heartbeatInterval * 1000;
  lastPayload = payload; 

  log('Checking if this tab should start heartbeat');

  
  if (document.visibilityState !== 'visible') {
    log('Tab is not visible, entering listen-only mode');
    listenForActiveTabChanges();
    return;
  }

  
  const activeTab = localStorage.getItem(ACTIVE_TAB_KEY);
  if (activeTab) {
    try {
      const { tabId, timestamp } = JSON.parse(activeTab);
      const now = Date.now();
      
      if (tabId !== TAB_ID && now - timestamp < 5000) {
        log('Another tab is already active:', tabId);
        listenForActiveTabChanges();
        return;
      }
    } catch (e) {
      log('Error parsing active tab info');
    }
  }

  becomeActiveTab();

  stopHeartbeat();
  sendHeartbeat({ ...payload, status: 'active' });

  heartbeatInterval = setInterval(() => {
    if (isActiveTab()) {
      sendHeartbeat({ ...payload, status: 'active' });
    } else {
      log('No longer the active tab, stopping heartbeat');
      stopHeartbeat();
    }
  }, HEARTBEAT_INTERVAL);

  resetInactivityTimer(payload);
  log('Successfully started heartbeat');
};


function becomeActiveTab() {
  log('Becoming the active tab');
  localStorage.setItem(ACTIVE_TAB_KEY, JSON.stringify({ 
    tabId: TAB_ID,
    timestamp: Date.now()
  }));
  
  broadcastActiveTab();
  
 
  if (!heartbeatInterval) {
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        localStorage.setItem(ACTIVE_TAB_KEY, JSON.stringify({ 
          tabId: TAB_ID,
          timestamp: Date.now()
        }));
      }
    }, 2000);
  }
}


function broadcastActiveTab() {
  if (!broadcast) {
    broadcast = new BroadcastChannel(CHANNEL_NAME);
  }
  broadcast.postMessage({ 
    type: 'ACTIVE_TAB_CHANGED',
    tabId: TAB_ID
  });
}


function broadcastInactiveTab() {
  if (!broadcast) {
    broadcast = new BroadcastChannel(CHANNEL_NAME);
  }
  broadcast.postMessage({ 
    type: 'ACTIVE_TAB_RELEASED',
    tabId: TAB_ID
  });
}


function isActiveTab() {
  const activeTab = localStorage.getItem(ACTIVE_TAB_KEY);
  if (!activeTab) return false;
  
  try {
    const { tabId } = JSON.parse(activeTab);
    return tabId === TAB_ID;
  } catch (e) {
    return false;
  }
}


export const resetInactivityTimer = (payload: Record<string, any>) => {
  const INACTIVITY_LIMIT = payload?.inactivityLimit * 1000;

  if (inactivityTimeout) clearTimeout(inactivityTimeout);

  inactivityTimeout = setTimeout(() => {
    log('Inactivity timeout reached');
    sendHeartbeat({ ...payload, status: 'inactive' });
    stopHeartbeat();

    releaseActiveTab();
  }, INACTIVITY_LIMIT);
};


export const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }

  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = null;
  }
  
  log('Heartbeat stopped');
};


function releaseActiveTab() {
  log('Releasing active tab status');
  const activeTab = localStorage.getItem(ACTIVE_TAB_KEY);
  
  if (activeTab) {
    try {
      const { tabId } = JSON.parse(activeTab);
      if (tabId === TAB_ID) {
        localStorage.removeItem(ACTIVE_TAB_KEY);
        broadcastInactiveTab();
      }
    } catch (e) {
      localStorage.removeItem(ACTIVE_TAB_KEY);
      broadcastInactiveTab();
    }
  }
}


const sendHeartbeat = async (body: Record<string, any>) => {
  try {
    log('Sending heartbeat:', body.status);
    await fetch('http://localhost:8000/api/v1/heartbeat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        tabId: TAB_ID,
        isActiveTab: true,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Heartbeat failed:', error);
  }
};


function listenForActiveTabChanges() {
  if (!broadcast) {
    broadcast = new BroadcastChannel(CHANNEL_NAME);
  }

  broadcast.onmessage = (event: MessageEvent) => {
    const { type, tabId } = event.data;
    
    log('Received message:', type, 'from tab:', tabId);

    if (type === 'ACTIVE_TAB_RELEASED') {
      if (document.visibilityState === 'visible') {
        log('Active tab released, attempting to take over');
        setTimeout(() => {
          if (document.visibilityState === 'visible' && lastPayload) {
            startHeartbeat(lastPayload);
          }
        }, Math.random() * 1000);
      }
    } else if (type === 'ACTIVE_TAB_CHANGED') {
      if (tabId !== TAB_ID) {
        log('Another tab became active:', tabId);
        stopHeartbeat();
      }
    }
  };
}


function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    log('Tab became visible');
    
    const activeTab = localStorage.getItem(ACTIVE_TAB_KEY);
    
    if (!activeTab) {
      log('No active tab found, becoming active');
      if (lastPayload && Object.keys(lastPayload).length > 0) {
        startHeartbeat(lastPayload);
      }
    } else {
      try {
        const { tabId, timestamp } = JSON.parse(activeTab);
        const now = Date.now();
        
     
        if (now - timestamp > 5000) {
          log('Active tab appears stale, taking over');
          if (lastPayload && Object.keys(lastPayload).length > 0) {
            startHeartbeat(lastPayload);
          }
        }
      } catch (e) {
        if (lastPayload && Object.keys(lastPayload).length > 0) {
          startHeartbeat(lastPayload);
        }
      }
    }
  } else {
    log('Tab became hidden');
    
    if (isActiveTab()) {
      log('Active tab became hidden, releasing status');
      releaseActiveTab();
      stopHeartbeat();
    }
  }
}


export const initHeartbeatControl = (payload: Record<string, any>) => {
  lastPayload = payload;
  
  log('Initializing heartbeat control with tab ID:', TAB_ID);
  
  if (broadcast) {
    broadcast.close();
    broadcast = null;
  }
  
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  window.addEventListener('storage', (event) => {
    if (event.key === ACTIVE_TAB_KEY) {
      if (event.newValue === null) {
        log('Active tab status was cleared');
        if (document.visibilityState === 'visible') {
          log('Attempting to become active tab');
          setTimeout(() => {
            if (lastPayload && Object.keys(lastPayload).length > 0) {
              startHeartbeat(lastPayload);
            }
          }, Math.random() * 1000); 
        }
      } else {
        try {
          const activeTabData = JSON.parse(event.newValue);
          log('Active tab updated via localStorage:', activeTabData.tabId);
          
          if (heartbeatInterval && activeTabData.tabId !== TAB_ID) {
            log('Another tab took over, stopping heartbeat');
            stopHeartbeat();
          }
        } catch (e) {
        }
      }
    }
  });
  
  startHeartbeat(payload);
  
  window.addEventListener('beforeunload', () => {
    log('Tab is being unloaded');
    if (isActiveTab()) {
      releaseActiveTab();
    }
    
    stopHeartbeat();
    if (broadcast) {
      broadcast.close();
    }
  });
  
  return { tabId: TAB_ID };
};


export const userActivityDetected = () => {
  if (isActiveTab() && lastPayload) {
    resetInactivityTimer(lastPayload);
    
    if (document.visibilityState !== 'visible') {
      releaseActiveTab();
    }
  } else if (document.visibilityState === 'visible') {
   
    if (lastPayload && Object.keys(lastPayload).length > 0) {
      startHeartbeat(lastPayload);
    }
  }
};