import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import billboards from '../billboard.json'; 

export default function BillboardMapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();
  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/1350x450?text=Billboard+Image+Failed+to+Load';
  };

  useEffect(() => {
    // if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tiles.stadiamaps.com/styles/osm-bright/style.json?api_key=4855b1d4-8b48-4bf5-9efe-4e3845683098`,
      center: [5.7333, 34.8500],
      zoom: 12,
    });

    const geocoder = new MaplibreGeocoder(
      {
        maplibregl,
        placeholder: 'ابحث عن موقع...',
        language: 'ar-SA',
        countries: 'DZ',
      },
      { maplibregl }
    );
    map.current.addControl(geocoder, 'top-left');

    billboards.forEach((billboard, idx) => {
      const el = document.createElement('div');
      el.className = 'billboard-marker';
      Object.assign(el.style, {
        backgroundColor: 'red',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        cursor: 'pointer',
        border: '2px solid white',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.2s',
      });

      el.addEventListener('click', () => {
        setSelectedBillboard(billboard);
        setCurrentSlide(idx);
      });

      new maplibregl.Marker({ element: el })
        .setLngLat([billboard.location.lng, billboard.location.lat])
        .addTo(map.current);
    });

    return () => map.current.remove();
  }, []);

  const nextSlide = () => {
    const next = (currentSlide + 1) % billboards.length;
    setCurrentSlide(next);
    setSelectedBillboard(billboards[next]);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + billboards.length) % billboards.length;
    setCurrentSlide(prev);
    setSelectedBillboard(billboards[prev]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen font-sans" dir="rtl">
    
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row-reverse gap-8">
        <div className="lg:w-2/3 relative">
          <div
            ref={mapContainer}
            className="rounded-xl border border-gray-700 shadow-2xl"
            style={{ width: '100%', height: '600px' }}
          />
          <div
            className="absolute bottom-4 right-4 max-w-md bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700"
            style={{ zIndex: 10 }}
          >
            <h3 className="font-bold text-lg mb-2">مساعدة الذكاء الاصطناعي</h3>
            <div className="flex flex-col sm:flex-row-reverse gap-2">
              <input
                type="text"
                placeholder="ما نوع الإعلان الذي تريد عرضه؟"
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                تحليل الموقع
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 bg-gray-800 rounded-xl p-6 h-fit sticky top-4 shadow-2xl">
          {selectedBillboard ? (
            <div className="text-right">
              <h2 className="text-2xl font-extrabold mb-4 text-blue-400">
                {billboards[currentSlide].name}
              </h2>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={billboards[currentSlide].image}
                  alt={billboards[currentSlide].name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold">السعر:</span>
                  <span className="font-bold text-blue-400">
                    {billboards[currentSlide].price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">المقاس:</span>
                  <span>{billboards[currentSlide].size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">الوصف:</span>
                  <span>{billboards[currentSlide].description}</span>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <button
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full font-semibold"
                  onClick={prevSlide}
                >
                  السابق
                </button>
                <button
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full font-semibold"
                  onClick={nextSlide}
                >
                  التالي
                </button>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                onClick={() => navigate('/reservation', { state: { billboard: billboards[currentSlide] } })}
              >
                حجز هذه اللوحة
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-5xl mb-4 animate-bounce">📍</div>
              <p className="text-lg">اختر لوحة إعلانية من الخريطة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
