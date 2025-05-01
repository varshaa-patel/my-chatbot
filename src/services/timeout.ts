// src/services/fetchWithTimeout.ts
export const fetchWithTimeout = (
  url: string,
  options: RequestInit = {},
  timeout = 30 // 30 seconds
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("timeout")),
      timeout * 1000
    );

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};
