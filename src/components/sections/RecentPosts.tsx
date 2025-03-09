'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchBlogPosts } from '@/lib/contentful-service';
import { BlogPost } from '@/types/contentful';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

const textContent = {
  'en-US': {
    title: 'Recent Posts',
    description: 'Recent Posts',
    noPosts: 'No posts found.',
    readMore: 'Read More →',
    viewAll: 'View All Posts'
  },
  'vi-VN': {
    title: 'Bài Viết Mới Nhất',
    description: 'Bài viết về AI, tự động hóa và công nghệ mới nhất',
    noPosts: 'Không có bài viết nào được tìm thấy.',
    readMore: 'Đọc tiếp →',
    viewAll: 'Xem tất cả bài viết'
  }
}

export default function RecentPosts() {
  const { locale } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const data = await fetchBlogPosts(3, locale); // Fetch only 3 recent posts
        setPosts(data);
      } catch (error) {
        console.error('Error loading recent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentPosts();
  }, [locale]);

  // If there are no posts, don't render the section
  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{textContent[locale].title}</h2>
          <p className="text-xl text-gray-700">
            {textContent[locale].description}
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                  <div className="h-4 bg-blue-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
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
                    <h3 className="text-xl font-semibold text-gray-900 mt-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4">
                      <span className="text-blue-600 font-medium">{textContent[locale].readMore}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-block bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {textContent[locale].viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
} 