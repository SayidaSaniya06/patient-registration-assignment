import React, { useEffect, useState, useCallback } from 'react';
import initDB from './db/initDB';
import PatientRegistration from './components/PatientRegistration';
import SearchPatient from './components/SearchPatient';
import PatientList from './components/PatientList';

function App() {
  const [db, setDb] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isDbInitialized, setIsDbInitialized] = useState(false); // Track DB initialization

  useEffect(() => {
    initDB()
      .then((dbInstance) => {
        setDb(dbInstance);
        loadPatients(dbInstance); // Load patients initially
        setIsDbInitialized(true); // Mark as initialized
      })
      .catch((error) => {
        console.error("Error initializing database:", error);
      });
  }, []);

  const loadPatients = useCallback(async (currentDb) => {
    if (currentDb) {
      try {
        const { rows } = await currentDb.query('SELECT * FROM patients');
        setPatients(rows); // Update patients state with the fetched data
      } catch (error) {
        console.error("Error loading patients:", error);
      }
    }
  }, []);

  const handleSearch = useCallback(async (term) => {
    if (db) {
      try {
        const { rows } = await db.query('SELECT * FROM patients WHERE LOWER(name) LIKE $1', [`%${term.toLowerCase()}%`]);
        setPatients(rows); // Update the patient list with search results
      } catch (error) {
        console.error("Error searching patients:", error);
      }
    }
  }, [db]);

  const handlePatientRegistered = useCallback(() => {
    if (db) {
      loadPatients(db); // Refresh the patient list after registering a new patient
    }
  }, [db, loadPatients]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {isDbInitialized ? (
        <>
          <PatientRegistration db={db} onPatientRegistered={handlePatientRegistered} />
          <SearchPatient onSearch={handleSearch} />
          <PatientList patients={patients} />
        </>
      ) : (
        <p>Initializing database...</p>
      )}
    </div>
  );
}

export default App;
