import { useState, useEffect } from 'react';
import { Calendar, User, Mail, MessageSquare, Car } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/inquiries')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-12 flex-grow" style={{ minHeight: '60vh' }}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Appointments</h2>
        <span className="text-sm text-secondary font-medium">{appointments.length} total</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: 'var(--primary-color)', animation: 'spin 1s linear infinite' }}></div>
        </div>
      ) : appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(apt => (
            <div key={apt._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-2">
                  <Car className="text-primary" size={20} />
                  <h3 className="font-semibold text-lg">
                    {apt.carId ? `${apt.carId.year} ${apt.carId.make} ${apt.carId.model}` : 'Vehicle Unavailable'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary bg-gray-50 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>{new Date(apt.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-secondary">
                  <User size={16} />
                  <span className="text-sm">{apt.name}</span>
                </div>
                <div className="flex items-center gap-3 text-secondary">
                  <Mail size={16} />
                  <span className="text-sm">{apt.email}</span>
                </div>
                {apt.message && (
                  <div className="flex items-start gap-3 text-secondary mt-2">
                    <MessageSquare size={16} className="mt-1 flex-shrink-0" />
                    <p className="text-sm italic border-l-2 border-gray-200 pl-3">"{apt.message}"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-secondary bg-gray-50 rounded-2xl border border-gray-100">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg">No appointments scheduled yet.</p>
          <p className="text-sm mt-2">When you inquire about a car, it will appear here.</p>
        </div>
      )}
    </div>
  );
}
