import { useState, useEffect } from 'react';
import {
  initDB,
  getRecord,
  setRecord,
  deleteRecord,
  getAllRecords,
} from '~/configs/indexedDb';

const useIndexedDB = (dbName: string, storeName: string) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const database = await initDB({ dbName, storeName });
        setDb(database);
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    })();
  }, [dbName, storeName]);

  const get = async (key: string | number) => {
    if (!db) throw new Error('IndexedDB not initialized');
    return await getRecord(db, storeName, key);
  };

  const set = async <T>(key: string | number, value: T) => {
    if (!db) throw new Error('IndexedDB not initialized');
    await setRecord(db, storeName, key, value);
    return true;
  };

  const deleteItem = async (key: string | number) => {
    if (!db) throw new Error('IndexedDB not initialized');
    await deleteRecord(db, storeName, key);
    return true;
  };

  const getAll = async () => {
    if (!db) throw new Error('IndexedDB not initialized');
    return await getAllRecords(db, storeName);
  };

  return { get, set, deleteItem, getAll, db };
};

export default useIndexedDB;
