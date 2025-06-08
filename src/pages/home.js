import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen font-sans" dir="rtl">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 mx-6 tracking-tight">
            إعلانك على <span className="text-blue-400">اللوحات الإعلانية</span> خلال دقائق
          </h1>
          <p className="text-xl text-gray-300 mb-8 mx-8 leading-relaxed max-w-lg">
            ارفع إعلانك، حدد الموعد، ودع ذكاءنا الاصطناعي يختار أفضل المواقع لتحقيق أقصى تأثير.
          </p>
          <div className="flex flex-col sm:flex-row-reverse space-y-4 sm:space-y-0 ">
            <button 
            className="bg-blue-500 hover:bg-blue-600 sm:mx-4 sm:mx-reverse px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigate('/map')}
            >
              ابدأ الآن
            </button>
            <button className="border border-blue-400 text-blue-400 hover:bg-blue-900/50 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300"
            onClick={() => navigate('/map')}
            >
              عرض الخريطة
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
            <img
              src="./images/billboard1.jpg"
              alt="Billboard Preview"
              className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 tracking-tight">
            كيف <span className="text-blue-400">تعمل</span> الخدمة
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "رفع الإعلان",
                desc: "قم برفع فيديو أو صورة لمدة 10 ثوانٍ بسهولة",
                icon: "📤",
              },
              {
                title: "توصيات الذكاء الاصطناعي",
                desc: "يحلل الذكاء الاصطناعي المواقع لاختيار الأفضل",
                icon: "🤖",
              },
              {
                title: "الجدولة والنشر",
                desc: "اختر التواريخ والأوقات بمرونة",
                icon: "📅",
              },
            ].map((step, i) => (
              <div key={i} className="bg-gray-900/50 p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
                <div className="text-5xl mb-4 animate-bounce">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agent Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-10 mx-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
              <span className="text-blue-400">الذكاء الاصطناعي</span> يجد لك الموقع المثالي
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed max-w-lg">
              يحلل ذكاؤنا الاصطناعي حركة المرور والتركيبة السكانية ومحتوى الإعلان لتقديم توصيات دقيقة وفعالة.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigate('/ai')}
            >
              جرب التوصيات الذكية
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
              <img
                src="./images/AI.jpg"
                alt="AI Recommendations Interface"
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-tight">
            استكشف <span className="text-blue-400">اللوحات الإعلانية</span> بالقرب منك
          </h2>
          <p className="text-center text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            خريطة تفاعلية تعرض توافر اللوحات الإعلانية وأسعارها في الوقت الفعلي.
          </p>
          <div className="relative rounded-xl overflow-hidden h-96 shadow-2xl">
            <img
              src="./images/map.jpg"
              alt="Billboard Map"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
          مستعد <span className="text-blue-400">لإبهار</span> الجمهور؟
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          ارفع إعلانك الآن ليتم مشاهدته من قبل الآلاف في أفضل المواقع.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-transform transform hover:scale-105"
        onClick={() => navigate('/reservation')}
        >
          رفع الإعلان (فيديو 10 ثواني)
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 biskra billboard. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}