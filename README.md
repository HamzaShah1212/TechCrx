# TechRx Store - Ecommerce React App

A modern, responsive single-page ecommerce application built with React and Vite. Features Amazon affiliate links for monetization.

## Features

✨ **Modern Design**
- Responsive grid layout
- Smooth animations and transitions
- Beautiful gradient backgrounds
- Mobile-friendly interface

🛍️ **Product Management**
- 8 pre-loaded tech products
- Product cards with descriptions and pricing
- Easy-to-use shopping interface

🔗 **Amazon Affiliate Integration**
- Direct links to Amazon product searches
- Affiliate disclosure in footer
- Automatic link opening in new tabs

📱 **Responsive Design**
- Works on desktop, tablet, and mobile
- Optimized for all screen sizes
- Touch-friendly buttons

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd techrx
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with cart counter
│   ├── Header.css
│   ├── ProductSection.jsx  # Main products grid
│   ├── ProductSection.css
│   ├── ProductCard.jsx     # Individual product card
│   ├── ProductCard.css
│   ├── Footer.jsx          # Footer with links and disclosure
│   └── Footer.css
├── App.jsx                 # Main app component
├── App.css
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Customization

### Adding Products

Edit `src/components/ProductSection.jsx` and add items to the `products` array:

```javascript
{
  id: 9,
  name: 'Product Name',
  price: '$99.99',
  image: '🎯',
  description: 'Product description',
  affiliateLink: 'https://amazon.com/s?k=search+term'
}
```

### Changing Colors

Update the gradient colors in CSS files:
- Primary gradient: `#667eea` to `#764ba2`
- Modify in `Header.css`, `ProductCard.css`, and `App.css`

### Updating Store Name

Change "TechRx Store" in `src/components/Header.jsx`

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your app will be live!

### Option 2: Using GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

### Option 3: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure and deploy

## Amazon Affiliate Setup

To use your own affiliate links:

1. Sign up for [Amazon Associates Program](https://affiliate-program.amazon.com/)
2. Get your affiliate tag
3. Update links in `ProductSection.jsx`:

```javascript
affiliateLink: 'https://amazon.com/s?k=search+term&tag=YOUR-AFFILIATE-TAG'
```

## Performance Optimization

- Vite provides fast HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- CSS is automatically minified
- Images are optimized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## SEO Considerations

For better SEO:
1. Add meta tags in `index.html`
2. Use semantic HTML
3. Add Open Graph tags for social sharing
4. Consider adding a sitemap

## Affiliate Disclosure

The app includes an affiliate disclosure in the footer as required by FTC guidelines. Make sure to:
- Keep the disclosure visible
- Update with your affiliate program details
- Comply with Amazon Associates Program policies

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Product filtering and search
- [ ] User authentication
- [ ] Order management
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Admin dashboard

---

**Happy selling! 🚀**
