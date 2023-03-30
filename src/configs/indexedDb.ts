interface InitDBOptions {
  dbName: string;
  storeName: string;
}

const initDB = ({ dbName, storeName }: InitDBOptions): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(storeName, { keyPath: 'key' });
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const getRecord = (
  db: IDBDatabase,
  storeName: string,
  key: string | number
) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = (event) => {
      console.log(event);
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      resolve((event.target as any).result?.value);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const setRecord = <T>(
  db: IDBDatabase,
  storeName: string,
  key: string | number,
  value: T
) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put({ key, value });

    request.onsuccess = () => {
      console.log('succes set');
      resolve(true);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const deleteRecord = (
  db: IDBDatabase,
  storeName: string,
  key: string | number
) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => {
      console.log('success deleting item');
      resolve(true);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const getAllRecords = (db: IDBDatabase, storeName: string) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        (event.target as any).result.map(
          // rome-ignore lint/suspicious/noExplicitAny: <explanation>
          (record: { value: any }) => record.value
        )
      );
    };

    request.onerror = (event) => {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      reject((event.target as any).error);
    };
  });
};

export { initDB, getRecord, setRecord, deleteRecord, getAllRecords };
