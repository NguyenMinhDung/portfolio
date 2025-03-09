import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/contentful-service';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Blog - BetoAI',
  description: 'Chia sẻ kiến thức về AI, tự động hóa và công nghệ mới nhất.',
};

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts(10);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Blog
        </h1>
        <div className="max-w-5xl mx-auto">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map(post => (
                <article 
                  key={post.id}
                  className="bg-gray-100 rounded-lg overflow-hidden
                  transition-transform duration-300 hover:shadow-lg"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={`https:${post.featuredImage.file.url}`}
                          alt={post.featuredImage.description || post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <time className="text-sm text-gray-500">
                        {formatDate(post.publishedDate)}
                      </time>
                      <h2 className="text-xl font-semibold text-gray-900 mt-2">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-gray-600">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs text-blue-700 bg-blue-100 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <span className="text-blue-600 font-medium">More →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 