import React, { useState, useEffect } from 'react';
// ===== STEP 1: APNI CUSTOM API FILE KO IMPORT KARO =====
import api from './apiConfig'; 

function App() {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ partName: '', quantity: '', machineName: '', location: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts();
  }, []);

  useEffect(() => {
    const result = parts.filter(part =>
      part.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.machineName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParts(result);
  }, [searchTerm, parts]);

  const fetchParts = async () => {
    try {
      setLoading(true);
      // ===== STEP 2: axios.get ko api.get se badlo aur URL chota karo =====
      const response = await api.get('/parts');
      const sortedParts = response.data.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
      setParts(sortedParts);
      setLoading(false);
    } catch (error) {
      console.error("Parts fetch karne me error!", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPart = async (e) => {
    e.preventDefault();
    if (!form.partName || !form.quantity || !form.machineName || !form.location) {
      alert("Saari fields bharna zaroori hai bhai!");
      return;
    }
    try {
      // ===== STEP 3: axios.post ko api.post se badlo =====
      await api.post('/parts', { ...form, quantity: Number(form.quantity) });
      setForm({ partName: '', quantity: '', machineName: '', location: '' });
      fetchParts();
    } catch (error) {
      console.error("Part add karne me error!", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 0) return;
    try {
      // ===== STEP 4: axios.put ko api.put se badlo =====
      await api.put(`/parts/${id}`, { quantity: newQuantity });
      fetchParts();
    } catch (error) {
      console.error("Quantity update karne me error!", error);
    }
  };

  const totalPartsCount = parts.length;
  const lowStockCount = parts.filter(part => part.quantity < 5).length;

  return (
    <div className="bg-blue-300 flex justify-start items-center flex-col min-h-screen min-w-screen text-gray-800 font-sans overflow-x-hidden">
      <header className="rounded-3xl mt-10 bg-gray-100 w-150 flex justify-center items-center  shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <h2 className=" text-center font-bold"> 
            Spare Parts Inventory System
          </h2>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        {/* Baaki ka UI code waisa hi rahega... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-teal-100 p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">Total Unique Parts</h3>
              <p className="text-5xl font-bold text-blue-600">{totalPartsCount}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
          </div>
          <div className="bg-teal-100 p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">Low Stock (Under 5)</h3>
              <p className="text-5xl font-bold text-red-500">{lowStockCount}</p>
            </div>
             <div className="bg-red-100 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Add a New Part</h2>
          <form onSubmit={handleAddPart} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-1">
              <label htmlFor="partName" className="block text-sm font-medium text-gray-600 mb-1">Part Name</label>
              <input type="text" id="partName" name="partName" value={form.partName} onChange={handleInputChange} placeholder="e.g., Bearing 6205" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
              <input type="number" id="quantity" name="quantity" value={form.quantity} onChange={handleInputChange} placeholder="e.g., 10" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="machineName" className="block text-sm font-medium text-gray-600 mb-1">Machine/Dept</label>
              <input type="text" id="machineName" name="machineName" value={form.machineName} onChange={handleInputChange} placeholder="e.g., Conveyor Belt" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-600 mb-1">Location</label>
              <input type="text" id="location" name="location" value={form.location} onChange={handleInputChange} placeholder="e.g., Shelf A-2" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold transition-colors duration-300">
              Add Part
            </button>
          </form>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold text-gray-700">Inventory List</h2>
            <input
              type="text"
              placeholder="Search by Part or Machine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {loading ? <div className="text-center py-10 text-gray-500">Loading bhai, ruk jaa...</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <tr>
                    <th className="px-4 py-3">Part Name</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Machine/Dept</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredParts.length > 0 ? filteredParts.map(part => (
                    <tr key={part._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{part.partName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${part.quantity < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {part.quantity}
                          {part.quantity < 5 && <span className="ml-2">⚠️</span>}
                        </span>
                      </td>
                      <td className="px-4 py-3">{part.machineName}</td>
                      <td className="px-4 py-3">{part.location}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                           <button onClick={() => updateQuantity(part._id, part.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 font-bold text-lg transition-transform hover:scale-110">+</button>
                           <button onClick={() => updateQuantity(part._id, part.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 font-bold text-lg transition-transform hover:scale-110">-</button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-gray-500">
                        Arey! Koi part nahi mila. Naya add kar upar se.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;