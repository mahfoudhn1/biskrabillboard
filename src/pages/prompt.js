import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import billboards from '../billboard.json';

export default function AIPromptPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [adFile, setAdFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

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

  const analyzeAd = (file) => {
    // Mock AI analysis based on file properties
    if (!file) return '';

    const isImage = file.type.startsWith('image');
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    let analysis = `تحليل الملف: ${isImage ? 'صورة' : 'فيديو'} بحجم ${sizeMB} ميغابايت. `;

    if (isImage) {
      analysis += 'الصورة مناسبة للوحات الرقمية ذات الدقة العالية مثل "لوحة حي المجاهدين".';
    } else {
      analysis += 'الفيديو مثالي للوحات الرقمية التي تدعم الوسائط المتحركة.';
    }

    return analysis;
  };

  const getBillboardRecommendations = (query) => {
    // Mock AI recommendations based on keywords
    const lowerQuery = query.toLowerCase();
    const recommendations = [];

    if (lowerQuery.includes('مطعم') || lowerQuery.includes('طعام')) {
      recommendations.push(
        billboards.find((b) => b.name === 'لوحة حي المجاهدين - بسكرة'), // High-traffic area
        billboards.find((b) => b.name === 'لوحة حي الزعاطشة') // Popular commercial area
      );
    } else if (lowerQuery.includes('شباب') || lowerQuery.includes('طلبة')) {
      recommendations.push(
        billboards.find((b) => b.name === 'لوحة طريق جامعة محمد خيضر'), // Near university
        billboards.find((b) => b.name === 'لوحة أمام ملعب 18 فبراير') // Youth/sports audience
      );
    } else if (lowerQuery.includes('سياح') || lowerQuery.includes('مسافرين')) {
      recommendations.push(
        billboards.find((b) => b.name === 'لوحة المدخل الشمالي لبسكرة'), // City entrance
        billboards.find((b) => b.name === 'لوحة محطة القطار - بسكرة') // Near train station
      );
    } else {
      recommendations.push(billboards[0], billboards[1]); // Default: first two billboards
    }

    return recommendations.filter(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query && !adFile) {
      setError('يرجى إدخال سؤال أو رفع ملف إعلان.');
      return;
    }

    setError('');
    const recommendations = getBillboardRecommendations(query);
    const analysis = analyzeAd(adFile);
    setAiResponse({
      text: query
        ? `توصيات بناءً على سؤالك: "${query}"\n${analysis}`
        : analysis || 'يرجى إدخال سؤال للحصول على توصيات.',
      recommendations,
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen font-sans" dir="rtl">

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-8 text-center">استشارة الذكاء الاصطناعي</h1>

        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">اسأل عن إعلانك</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="مثال: ما هي أفضل لوحة لإعلان مطعم؟"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

            {error && <p className="text-red-400 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              استشر الذكاء الاصطناعي
            </button>
          </form>

          {aiResponse && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">توصيات الذكاء الاصطناعي</h2>
              <p className="text-gray-200 mb-4">{aiResponse.text}</p>
              <h3 className="text-lg font-semibold mb-2">اللوحات الموصى بها:</h3>
              <div className="space-y-4">
                {aiResponse.recommendations.map((billboard) => (
                  <div key={billboard.id} className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-400">{billboard.name}</h4>
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
                    <button
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
                      onClick={() => navigate('/reserve', { state: { billboard } })}
                    >
                      حجز هذه اللوحة
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
