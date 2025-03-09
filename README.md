# BetoAI Portfolio

This is a modern portfolio website built with [Next.js](https://nextjs.org) and integrated with [Contentful](https://www.contentful.com/) for content management. It allows you to easily customize the content of your portfolio without changing the code.

## Features

- 🚀 Built with Next.js 14 and React
- 📱 Fully responsive design
- ✨ Modern UI with animations using Framer Motion
- 📝 Content management with Contentful CMS
- 🔍 SEO optimized
- 📊 Customizable skills, projects, and blog sections
- 📧 Contact form ready to be integrated with your backend

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Contentful account (free tier works fine)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Contentful credentials:
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contentful Setup

This portfolio uses Contentful as a headless CMS to manage content. Follow the instructions in [CONTENTFUL_SETUP.md](CONTENTFUL_SETUP.md) to set up your Contentful space with the required content models.

## Customization

### Styling
This project uses Tailwind CSS for styling. You can customize the look and feel by modifying the `tailwind.config.ts` file.

### Layout
The main layout is defined in `src/app/layout.tsx`. You can modify this file to change the overall layout of your portfolio.

### Components
Individual components like the hero section, about section, projects, skills, and contact form are located in the `src/components/sections` directory. You can customize these components to fit your needs.

### Content
All content is managed through Contentful. You can update the content from the Contentful web interface without changing the code.

## Deployment

The easiest way to deploy your portfolio is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import your project to Vercel
3. Add your Contentful environment variables in the Vercel project settings
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Contentful](https://www.contentful.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
