import { useState, useEffect } from 'react';

const useIndexedDB = (dbName: string, storeName: string) => {
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const openRequest = indexedDB.open(dbName);

    openRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
    };

    openRequest.onsuccess = (event: Event) => {
      const db = event.target?.result;
      setIsReady(true);
      console.log(db);
      setDb(db);
    };

    openRequest.onerror = (event) => {
      console.error('Error opening IndexedDB:', event.target.error);
    };
  }, [dbName, storeName]);

  const addData = async (data) => {
    return new Promise((resolve, reject) => {
      console.log(data, db);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const getData = async (id) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const deleteData = async (id: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  return { addData, getData, deleteData, isReady };
};

export default useIndexedDB;
