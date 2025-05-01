const channel = new BroadcastChannel("chatbot-loading");

export const BroadcastService = {
  sendLoadingState(isLoading: boolean) {
    channel.postMessage({ type: "LOADING_STATE", isLoading });
  },

  onLoadingState(callback: (loading: boolean) => void) {
    channel.onmessage = (event) => {
      if (event.data.type === "LOADING_STATE") {
        callback(event.data.isLoading);
      }
    };
  }
};