"use client";

const DB_NAME = "mr_sunil_asset_cache_v1";
const STORE_NAME = "models";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      reject(new Error("IndexedDB not supported"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getModelBlob(url: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(url);

      req.onsuccess = () => {
        if (req.result instanceof Blob) {
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveModelBlob(url: string, blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, url);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Failed to cache model in IndexedDB:", err);
  }
}

// In-memory object URLs map to avoid recreating multiple blob URLs for the same asset
const objectUrlMap = new Map<string, string>();

export async function getOrFetchModelBlobUrl(
  url: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  if (objectUrlMap.has(url)) {
    onProgress?.(100);
    return objectUrlMap.get(url)!;
  }

  // Check IndexedDB
  const cachedBlob = await getModelBlob(url);
  if (cachedBlob) {
    onProgress?.(100);
    const blobUrl = URL.createObjectURL(cachedBlob);
    objectUrlMap.set(url, blobUrl);
    return blobUrl;
  }

  // Fetch with progress tracking
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.min(99, Math.round((e.loaded / e.total) * 100));
        onProgress(percent);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200 && xhr.response instanceof Blob) {
        const blob = xhr.response;
        await saveModelBlob(url, blob);
        const blobUrl = URL.createObjectURL(blob);
        objectUrlMap.set(url, blobUrl);
        onProgress?.(100);
        resolve(blobUrl);
      } else {
        // Fallback to original URL
        onProgress?.(100);
        resolve(url);
      }
    };

    xhr.onerror = () => {
      onProgress?.(100);
      resolve(url);
    };

    xhr.send();
  });
}
