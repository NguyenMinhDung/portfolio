import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/contentful-service';
import { formatDate } from '@/lib/utils';
import { renderRichText } from '@/lib/rich-text-renderer';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await fetchBlogPosts(100);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the blog post
export async function generateMetadata(props) {
  const post = await fetchBlogPostBySlug(props.params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      images: post.featuredImage ? [
        {
          url: `https:${post.featuredImage.file.url}`,
          width: 1200,
          height: 630,
          alt: post.featuredImage.description || post.title,
        }
      ] : undefined,
    },
  };
}

// Main blog post page component
export default async function BlogPostPage(props) {
  const post = await fetchBlogPostBySlug(props.params.slug);
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <div className="mb-6">
              <Link 
                href="/blog" 
                className="text-blue-600 hover:underline flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
                Quay lại Blog
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <time className="text-gray-500">
              {formatDate(post.publishedDate)}
            </time>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs text-blue-700 bg-blue-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          
          {post.featuredImage && (
            <div className="mb-10 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={`https:${post.featuredImage.file.url}`}
                alt={post.featuredImage.description || post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {renderRichText(post.content, post.content?.links)}
          </div>
        </div>
      </article>
    </div>
  );
} 