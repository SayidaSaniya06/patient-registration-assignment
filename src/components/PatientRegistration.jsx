import React, { useState} from 'react';

const PatientRegistration = ({ db, onPatientRegistered }) => { // Receive db instance as prop
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');

  const registerPatient = async () => {
    console.log(`${name},${age},${gender}`);
    if (!db) {
      console.error("Database not initialized.");
      return;
    }
    try {
      await db.query(
        'INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3)',
        [name, parseInt(age), gender]
      );      
      setName('');
      setAge('');
      setGender('Female');
      if (onPatientRegistered) onPatientRegistered();
    } catch (error) {
      console.error("Error registering patient:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Patient Registration</h2>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Patient Name"
        className="input mb-2 w-full border p-2 rounded"
      />
      <input
        value={age}
        type="number"
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        className="input mb-2 w-full border p-2 rounded"
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="input mb-2 w-full border p-2 rounded"
      >
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <button
        onClick={registerPatient}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </div>
  );
};

export default PatientRegistration;