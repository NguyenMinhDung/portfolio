import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Link from 'next/link';
import Image from 'next/image';

// Custom renderer options for Contentful Rich Text
export const getRichTextRenderOptions = (links?: any) => {
  // Create asset map
  const assetMap = new Map();
  if (links?.assets?.block) {
    links.assets.block.forEach((asset: any) => {
      assetMap.set(asset.sys.id, asset);
    });
  }

  // Create entry map
  const entryMap = new Map();
  if (links?.entries?.block) {
    links.entries.block.forEach((entry: any) => {
      entryMap.set(entry.sys.id, entry);
    });
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="font-mono bg-gray-100 rounded px-1 py-0.5">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="mb-4 last:mb-0">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-4xl font-bold mb-6">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold mb-3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-xl font-bold mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <h5 className="text-lg font-bold mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <h6 className="text-base font-bold mb-2">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc ml-5 mb-4 space-y-1">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal ml-5 mb-4 space-y-1">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <li>{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-300" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node.data.target.sys.id;
        const asset = assetMap.get(assetId);
        
        if (!asset) {
          return <div className="text-red-500">Asset not found</div>;
        }
        
        const { title, description, file } = asset;
        const mimeType = file.contentType;
        const url = file.url;
        
        if (mimeType.includes('image')) {
          return (
            <div className="my-4">
              <Image
                src={`https:${url}`}
                alt={description || title || 'Image'}
                width={800}
                height={400}
                className="rounded-lg w-full h-auto object-cover"
              />
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
          );
        }
        
        if (mimeType.includes('video')) {
          return (
            <div className="my-4">
              <video 
                controls 
                className="w-full rounded-lg"
                src={`https:${url}`} 
              >
                Your browser does not support the video tag.
              </video>
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
          );
        }
        
        return (
          <div className="my-4">
            <a 
              href={`https:${url}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {title || 'Download file'}
            </a>
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        const url = node.data.uri;
        return (
          <a
            href={url}
            target={url.startsWith('http') ? '_blank' : undefined}
            rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-blue-500 hover:underline"
          >
            {children}
          </a>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
        const entryId = node.data.target.sys.id;
        const entry = entryMap.get(entryId);
        
        if (!entry) {
          return <span className="text-red-500">Entry not found</span>;
        }
        
        // Assuming the entry is a blog post with a slug field
        if (entry.fields.slug) {
          return (
            <Link href={`/blog/${entry.fields.slug}`} className="text-blue-500 hover:underline">
              {children}
            </Link>
          );
        }
        
        return <span>{children}</span>;
      },
    },
  };
};

// Helper function to render rich text content
export const renderRichText = (content: any, links?: any) => {
  if (!content) {
    return null;
  }
  
  return documentToReactComponents(content, getRichTextRenderOptions(links));
}; 