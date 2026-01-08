"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: "상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
        });
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || "오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-gray-800">로켓콜</span>
          </button>
          <div className="flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              제안서
            </a>
            <a
              href="http://pf.kakao.com/_zxfugn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.035 5.895l-.792 2.895c-.078.285.212.536.485.42l3.432-1.466c.943.193 1.932.306 2.84.306 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
              </svg>
              카카오톡 상담
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">변호사 전용 의뢰인 연결 서비스</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              법률 상담이 필요한<br />
              <span className="text-accent-400">확정 의뢰인</span>만 연결해드립니다
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              더 이상 콜드콜에 시간 낭비하지 마세요.<br />
              상담 의사가 확정된 의뢰인만 변호사님께 연결해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={scrollToForm}
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg animate-pulse-glow"
              >
                무료 상담 신청하기
              </button>
              <a
                href="#features"
                className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:bg-white/10"
              >
                서비스 자세히 보기
              </a>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400">98%</div>
                <div className="text-sm text-gray-300">약속 성사율</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400">2,000+</div>
                <div className="text-sm text-gray-300">누적 매칭 건수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400">150+</div>
                <div className="text-sm text-gray-300">파트너 변호사</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              이런 고민, 하고 계시지 않나요?
            </h2>
            <p className="text-gray-600 text-lg">
              기존 DB 영업의 문제점을 해결해드립니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📵", title: "연락 불가", desc: "전화해도 받지 않는 잠재 의뢰인" },
              { icon: "📞", title: "즉시 종료", desc: "관심 없다며 바로 끊는 통화" },
              { icon: "👥", title: "중복 의뢰인", desc: "이미 다른 곳에서 상담받은 사람" },
              { icon: "❌", title: "결번/오류", desc: "유효하지 않은 연락처 정보" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-red-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              로켓콜의 <span className="text-primary-600">2단계 검증 시스템</span>
            </h2>
            <p className="text-gray-600 text-lg">
              철저한 검증으로 확정된 의뢰인만 연결합니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl border-2 border-primary-200">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">1차 검증: 상담 의향 확인</h3>
              <p className="text-gray-600">
                법률 상담이 필요한 상황인지, 변호사 상담 의향이 있는지 먼저 확인합니다.
                단순 궁금증이나 무료 상담만 원하는 분은 필터링합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-8 rounded-2xl border-2 border-accent-200">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2차 검증: 상담 일정 확정</h3>
              <p className="text-gray-600">
                구체적인 상담 일정을 확정하고, 변호사님과의 상담 의사를 재확인합니다.
                확정된 일정의 의뢰인 정보만 전달해드립니다.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={scrollToForm}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              검증된 의뢰인 만나기
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              왜 <span className="text-primary-600">로켓콜</span>인가요?
            </h2>
            <p className="text-gray-600 text-lg">
              변호사님의 성공적인 의뢰인 확보를 위한 6가지 강점
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "✅",
                title: "확정 의뢰인만 연결",
                desc: "상담 의향이 확인된 의뢰인만 변호사님께 연결해드립니다.",
              },
              {
                icon: "⏰",
                title: "시간 절약",
                desc: "콜드콜 없이 상담에만 집중하실 수 있습니다.",
              },
              {
                icon: "📈",
                title: "수임률 40% 이상 상승",
                desc: "검증된 의뢰인 연결로 평균 수임률이 크게 향상됩니다.",
              },
              {
                icon: "👨‍💼",
                title: "5년+ 경력 전문 TM팀",
                desc: "법률 분야에 특화된 전문 상담원이 의뢰인을 검증합니다.",
              },
              {
                icon: "🔒",
                title: "독점 의뢰인 제공",
                desc: "한 명의 의뢰인은 한 분의 변호사님께만 연결됩니다.",
              },
              {
                icon: "💬",
                title: "실시간 소통",
                desc: "카카오톡으로 의뢰인 정보와 일정을 실시간으로 공유합니다.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              시작하기 <span className="text-primary-600">4단계</span>
            </h2>
            <p className="text-gray-600 text-lg">
              간단한 절차로 바로 시작하실 수 있습니다
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "상담 신청", desc: "간단한 정보 입력으로 상담 신청" },
              { step: "02", title: "맞춤 상담", desc: "서비스 안내 및 맞춤 플랜 제안" },
              { step: "03", title: "약속콜 시작", desc: "전문 TM팀의 의뢰인 검증 시작" },
              { step: "04", title: "의뢰인 연결", desc: "확정된 의뢰인 정보 실시간 전달" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                    <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              지금 바로 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              파트너 변호사님들의 <span className="text-primary-600">생생한 후기</span>
            </h2>
            <p className="text-gray-600 text-lg">
              실제 로켓콜을 이용 중인 변호사님들의 이야기
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "김*훈 변호사",
                role: "민사전문 법률사무소",
                content: "예전에는 DB 영업에 하루 종일 시간을 쓰느라 정작 의뢰인 상담에 집중하기 어려웠습니다. 로켓콜 도입 후 상담에만 집중할 수 있게 되어 수임률이 크게 올랐습니다.",
                rating: 5,
              },
              {
                name: "박*영 변호사",
                role: "형사전문 법률사무소",
                content: "다른 DB 업체들과 달리 정말 상담 의사가 확정된 의뢰인만 연결해줍니다. 노쇼가 거의 없어서 시간 낭비 없이 효율적으로 일할 수 있습니다.",
                rating: 5,
              },
              {
                name: "이*수 변호사",
                role: "가사전문 법률사무소",
                content: "AS 보장 제도가 정말 좋습니다. 만약 의뢰인이 안 오면 무료로 재배정해주니까 리스크 없이 서비스를 이용할 수 있어요. 적극 추천합니다!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              나도 성공 스토리 만들기
            </button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-accent-400">100% 보장</span> 정책
            </h2>
            <p className="text-gray-300 text-lg">
              리스크 없이 안심하고 이용하실 수 있습니다
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "확정 의뢰인만 전달",
                desc: "2단계 검증을 완료한 의뢰인만 연결합니다",
              },
              {
                icon: "🔄",
                title: "노쇼 시 무료 재배정",
                desc: "의뢰인이 상담에 불참하면 무료로 재배정해드립니다",
              },
              {
                icon: "🛡️",
                title: "리스크 제로",
                desc: "AS 보장 제도로 손해 없이 서비스를 이용하세요",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              서비스 <span className="text-primary-600">상품 안내</span>
            </h2>
            <p className="text-gray-600 text-lg">
              변호사님의 상황에 맞는 상품을 선택하세요
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl border-2 border-primary-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                추천
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">법률 상담 약속콜</h3>
              <p className="text-gray-600 mb-6">2단계 검증 완료된 확정 의뢰인 연결</p>
              <ul className="space-y-3 mb-6">
                {[
                  "상담 일정 확정된 의뢰인",
                  "실시간 약속 일정 공유",
                  "분야별 맞춤 배정",
                  "노쇼 시 무료 재배정",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-full font-bold transition-colors"
              >
                상담 신청하기
              </button>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">법률 상담 DB</h3>
              <p className="text-gray-600 mb-6">검증된 법률 상담 관심 의뢰인 데이터</p>
              <ul className="space-y-3 mb-6">
                {[
                  "1차 검증 완료 의뢰인",
                  "상세 상담 내용 제공",
                  "즉시 연락 가능",
                  "분야별 분류 제공",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-full font-bold transition-colors"
              >
                문의하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              무료 <span className="text-primary-600">상담 신청</span>
            </h2>
            <p className="text-gray-600 text-lg">
              지금 바로 신청하시면 담당자가 연락드립니다
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  상담 문의
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  placeholder="문의하실 내용을 입력해주세요 (선택사항)"
                />
              </div>
              {submitResult && (
                <div
                  className={`p-4 rounded-lg ${
                    submitResult.success
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitResult.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg disabled:hover:scale-100"
              >
                {isSubmitting ? "처리 중..." : "상담 신청하기"}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              입력하신 정보는 상담 목적으로만 사용되며, 개인정보 보호정책에 따라 안전하게 관리됩니다.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="font-bold text-xl text-white">로켓콜-변호사</span>
              </div>
              <p className="text-sm leading-relaxed">
                법률 상담이 필요한 확정 의뢰인을<br />
                변호사님께 연결해드립니다.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">서비스 소개</a>
                </li>
                <li>
                  <a href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">제안서 다운로드</a>
                </li>
                <li>
                  <a href="http://pf.kakao.com/_zxfugn/chat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">카카오톡 상담</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">문의</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="http://pf.kakao.com/_zxfugn/chat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    카카오톡: 로켓콜
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="text-sm text-center">
              <p className="mb-2">
                <span className="text-gray-500">상호:</span> 제이코리아 |
                <span className="text-gray-500"> 대표:</span> 이주영 |
                <span className="text-gray-500"> 사업자등록번호:</span> 278-30-01540
              </p>
              <p className="text-gray-500">
                © 2024 로켓콜-변호사. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Kakao Button */}
      <a
        href="http://pf.kakao.com/_zxfugn/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg hover:scale-110 transition-all z-50"
        aria-label="카카오톡 상담"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.035 5.895l-.792 2.895c-.078.285.212.536.485.42l3.432-1.466c.943.193 1.932.306 2.84.306 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
        </svg>
      </a>
    </main>
  );
}
