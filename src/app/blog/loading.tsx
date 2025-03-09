import React from 'react';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse h-10 w-32 bg-gray-200 rounded-lg mb-8"></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(4).fill(0).map((_, i) => (
              <div 
                key={i}
                className="bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-blue-100 rounded-full"></div>
                    <div className="h-6 w-20 bg-blue-100 rounded-full"></div>
                  </div>
                  <div className="h-4 w-24 bg-blue-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 