import React, { useState } from 'react';

const SearchPatient = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="border p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Search Patient Records</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter name to search..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPatient;