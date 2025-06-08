import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ar from 'date-fns/locale/ar';
import billboards from '../billboard.json';

registerLocale('ar', ar);

export default function BillboardReservationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const billboard = state?.billboard || {};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [adFile, setAdFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const timeSlots = [
    '00:00 - 06:00',
    '06:00 - 12:00',
    '12:00 - 18:00',
    '18:00 - 00:00',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png'];
    const validVideoTypes = ['video/mp4'];
    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 10 * 1024 * 1024; // 10MB

    if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
      setError('يرجى رفع صورة (JPEG/PNG) أو فيديو (MP4) فقط.');
      setAdFile(null);
      setPreviewUrl(null);
      return;
    }

    if (validImageTypes.includes(file.type) && file.size > maxImageSize) {
      setError('حجم الصورة يجب أن يكون أقل من 5 ميغابايت.');
      setAdFile(null);
      setPreviewUrl(null);
      return;
    }

    if (validVideoTypes.includes(file.type) && file.size > maxVideoSize) {
      setError('حجم الفيديو يجب أن يكون أقل من 10 ميغابايت.');
      setAdFile(null);
      setPreviewUrl(null);
      return;
    }

    setError('');
    setAdFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !timeSlot || !adFile) {
      setError('يرجى ملء جميع الحقول ورفع ملف إعلان.');
      return;
    }

    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expiry ||
      !paymentDetails.cvv ||
      !paymentDetails.password
    ) {
      setError('يرجى إدخال جميع تفاصيل الدفع.');
      return;
    }

    // Mock CIB payment processing
    setSuccess('تم تقديم الحجز بنجاح! سيتم مراجعة طلبك.');
    setError('');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen font-sans" dir="rtl">
     

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-8 text-center">حجز لوحة إعلانية</h1>

        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-4"></h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">السعر:</span>
                <span className="text-blue-400">{billboard.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">المقاس:</span>
                <span>{billboard.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">الوصف:</span>
                <span>{billboard.description}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">تاريخ البدء</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                locale="ar"
                dateFormat="dd/MM/yyyy"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="اختر تاريخ البدء"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">تاريخ الانتهاء</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                locale="ar"
                dateFormat="dd/MM/yyyy"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="اختر تاريخ الانتهاء"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">الفترة الزمنية</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر الفترة</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">رفع الإعلان (صورة أو فيديو)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,video/mp4"
                onChange={handleFileChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewUrl && (
                <div className="mt-4">
                  {adFile?.type.startsWith('image') ? (
                    <img
                      src={previewUrl}
                      alt="Ad Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">تفاصيل الدفع (CIB)</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="رقم البطاقة"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="expiry"
                    value={paymentDetails.expiry}
                    onChange={handlePaymentChange}
                    placeholder="تاريخ الانتهاء (MM/YY)"
                    className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    placeholder="CVV"
                    className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  value={paymentDetails.password}
                  onChange={handlePaymentChange}
                  placeholder="كلمة المرور للتجارة الإلكترونية"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}
            {success && <p className="text-green-400 text-center">{success}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              تأكيد الحجز
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
