import React from 'react';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <div className="animate-pulse h-4 w-24 bg-gray-200 rounded mb-6"></div>
            
            <div className="animate-pulse h-12 bg-gray-300 rounded-lg w-3/4 mb-4"></div>
            <div className="animate-pulse h-12 bg-gray-300 rounded-lg w-1/2 mb-6"></div>
            
            <div className="animate-pulse h-4 w-32 bg-gray-200 rounded mb-4"></div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="animate-pulse h-6 w-16 bg-blue-100 rounded-full"></div>
              <div className="animate-pulse h-6 w-20 bg-blue-100 rounded-full"></div>
              <div className="animate-pulse h-6 w-24 bg-blue-100 rounded-full"></div>
            </div>
          </header>
          
          <div className="animate-pulse h-80 bg-gray-300 rounded-lg mb-10"></div>
          
          <div className="space-y-4">
            {Array(12).fill(0).map((_, i) => (
              <div 
                key={i} 
                className={`animate-pulse h-4 bg-gray-200 rounded-lg ${
                  i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/6'
                }`}
              ></div>
            ))}
            
            <div className="h-20"></div>
            
            {Array(8).fill(0).map((_, i) => (
              <div 
                key={`second-${i}`} 
                className={`animate-pulse h-4 bg-gray-200 rounded-lg ${
                  i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/6'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
} 