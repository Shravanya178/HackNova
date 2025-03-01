import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle, XCircle, Navigation, Phone } from 'lucide-react';

const PharmacyPage = ({ medicineToFind }) => {
  const [searchQuery, setSearchQuery] = useState(medicineToFind || '');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Sample data - in a real app, this would come from an API
  const pharmacyData = [
    { 
      id: 1, 
      name: 'City Pharmacy', 
      distance: '0.5', 
      address: '123 Main St', 
      phone: '(123) 456-7890',
      medicines: [
        { name: 'Paracetamol', inStock: true, price: 5.99 },
        { name: 'Amoxicillin', inStock: false, price: 12.50 },
        { name: 'Lisinopril', inStock: true, price: 8.75 }
      ]
    },
    { 
      id: 2, 
      name: 'HealthPlus', 
      distance: '1.2', 
      address: '456 Oak Ave', 
      phone: '(123) 555-7890',
      medicines: [
        { name: 'Paracetamol', inStock: true, price: 6.50 },
        { name: 'Amoxicillin', inStock: true, price: 11.99 },
        { name: 'Metformin', inStock: true, price: 7.30 }
      ]
    },
    { 
      id: 3, 
      name: 'MediCare Pharmacy', 
      distance: '1.8', 
      address: '789 Pine Rd', 
      phone: '(123) 456-9090',
      medicines: [
        { name: 'Atorvastatin', inStock: true, price: 14.75 },
        { name: 'Lisinopril', inStock: true, price: 8.99 },
        { name: 'Metformin', inStock: false, price: 7.50 }
      ]
    },
    { 
      id: 4, 
      name: 'Wellness Drugs', 
      distance: '2.3', 
      address: '101 Elm St', 
      phone: '(123) 777-8989',
      medicines: [
        { name: 'Paracetamol', inStock: true, price: 5.50 },
        { name: 'Amoxicillin', inStock: true, price: 13.25 },
        { name: 'Atorvastatin', inStock: false, price: 15.99 }
      ]
    }
  ];

  // Simulate fetching pharmacy data with the user's location
  useEffect(() => {
    const getUserLocation = () => {
      setLoading(true);
      // In a real app, you would use the browser's geolocation API
      // and then call your backend API with the coordinates
      setTimeout(() => {
        setUserLocation({ lat: 37.7749, lng: -122.4194 }); // Example coordinates
        setPharmacies(pharmacyData);
        setLoading(false);
      }, 1000);
    };

    getUserLocation();
  }, []);

  // Filter pharmacies based on medicine availability
  const filteredPharmacies = searchQuery
    ? pharmacies.filter(pharmacy => 
        pharmacy.medicines.some(med => 
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) && med.inStock
        )
      )
    : pharmacies;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const checkMedicineAvailability = (pharmacy, medicineName) => {
    if (!medicineName) return null;
    
    const medicine = pharmacy.medicines.find(
      med => med.name.toLowerCase().includes(medicineName.toLowerCase())
    );
    
    if (!medicine) return null;
    
    return {
      available: medicine.inStock,
      price: medicine.price
    };
  };

  return (
    
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Nearby Pharmacies</h1>
          <p className="text-blue-100">Find medicine availability at pharmacies near you</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a medicine..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              Showing pharmacies with "{searchQuery}" in stock
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Finding nearby pharmacies...</p>
          </div>
        )}

        {/* Map Section */}
        {!loading && (
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Pharmacy Map</h2>
              
              {/* Map Placeholder - In a real app, integrate with Google Maps API */}
              <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2 text-blue-600" />
                  <p className="text-gray-600">Map would be displayed here</p>
                  <p className="text-sm text-gray-500">Using Google Maps API</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pharmacy List */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map(pharmacy => {
                const medicineStatus = checkMedicineAvailability(pharmacy, searchQuery);
                
                return (
                  <div 
                    key={pharmacy.id} 
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                    onClick={() => setSelectedPharmacy(pharmacy)}
                  >
                    <h3 className="font-medium text-lg text-gray-800">{pharmacy.name}</h3>
                    <p className="text-gray-600 text-sm">{pharmacy.address}</p>
                    <p className="text-blue-600 text-sm">{pharmacy.distance} miles away</p>
                    
                    {medicineStatus && (
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        {medicineStatus.available ? (
                          <p className="flex items-center text-green-600 text-sm">
                            <CheckCircle size={16} className="mr-1" /> 
                            {searchQuery} is in stock - ${medicineStatus.price.toFixed(2)}
                          </p>
                        ) : (
                          <p className="flex items-center text-red-500 text-sm">
                            <XCircle size={16} className="mr-1" /> 
                            {searchQuery} is out of stock
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-3 flex space-x-2">
                      <button className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                        <Navigation size={14} className="mr-1" /> Directions
                      </button>
                      <button className="flex items-center text-sm border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">
                        <Phone size={14} className="mr-1" /> Call
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <XCircle size={40} className="mx-auto text-red-500 mb-2" />
                <h3 className="text-lg font-medium text-gray-800">No pharmacies found</h3>
                <p className="text-gray-600">
                  {searchQuery 
                    ? `We couldn't find any pharmacies with "${searchQuery}" in stock.` 
                    : "No pharmacies available in your area."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Selected Pharmacy Details Modal */}
        {selectedPharmacy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">{selectedPharmacy.name}</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedPharmacy(null)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-600">{selectedPharmacy.address}</p>
                  <p className="text-blue-600">{selectedPharmacy.distance} miles away</p>
                  <p className="text-gray-600">{selectedPharmacy.phone}</p>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 mb-3">Available Medicines</h3>
                    <div className="border rounded-md divide-y">
                      {selectedPharmacy.medicines.map((medicine, index) => (
                        <div key={index} className="p-3 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                            <p className="text-gray-600">${medicine.price.toFixed(2)}</p>
                          </div>
                          {medicine.inStock ? (
                            <span className="flex items-center text-green-600 text-sm">
                              <CheckCircle size={16} className="mr-1" /> In Stock
                            </span>
                          ) : (
                            <span className="flex items-center text-red-500 text-sm">
                              <XCircle size={16} className="mr-1" /> Out of Stock
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button className="flex-1 flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                      <Navigation size={18} className="mr-2" /> Get Directions
                    </button>
                    <button className="flex-1 flex justify-center items-center border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition">
                      <Phone size={18} className="mr-2" /> Call Pharmacy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyPage;