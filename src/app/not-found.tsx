import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - BetoAI',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Trang không tìm thấy</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
} 