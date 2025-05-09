import React from 'react';

const PatientList = ({patients}) => {
  return (
    <div className="border rounded-lg p-4 shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Patient Records List</h2>
      {
        patients.length === 0?(
          <p className="text-gray-500">No patients registered yet.</p>
        ) :(
          <ul className="space-y-2">
            {
              patients.map((p) => (
                <li key={p.id} className="border-b pb-2">
                  <strong>{p.name}</strong> — {p.age} years, {p.gender}
                </li>
              ))              
            }
          </ul>
        )
      }
    </div>
  );
};

export default PatientList;