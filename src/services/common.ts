export class LocalStorageUtil {
  
    static setItem<T>(key: string, value: T): void {
      try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
      } catch (error) {
        console.error("Failed to save to localStorage", error);
      }
    }
  
    
    static getItem<T>(key: string): T | null {
      try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
      } catch (error) {
        console.error("Failed to read from localStorage", error);
        return null;
      }
    }
  }


  
  