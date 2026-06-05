# Quick Start Guide

## 🚀 Get Running in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser. Done! 🎉

## 📝 Customization

### Change Store Name
Edit `src/components/Header.jsx`:
```javascript
<h1>🛍️ Your Store Name</h1>
```

### Add Your Products
Edit `src/components/ProductSection.jsx` - add to the `products` array:
```javascript
{
  id: 9,
  name: 'Your Product',
  price: '$99.99',
  image: '🎯',
  description: 'Your description',
  affiliateLink: 'https://amazon.com/s?k=your+search'
}
```

### Change Colors
Update gradient in CSS files:
- `src/App.css`
- `src/components/Header.css`
- `src/components/ProductCard.css`

Change from:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

To your colors:
```css
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

## 🔗 Add Amazon Affiliate Links

1. Sign up: https://affiliate-program.amazon.com/
2. Get your affiliate tag
3. Update links in `ProductSection.jsx`:
```javascript
affiliateLink: 'https://amazon.com/s?k=search+term&tag=YOUR-TAG-HERE'
```

## 📦 Build for Production
```bash
npm run build
```

Output goes to `dist/` folder - ready for deployment!

## 🌐 Deploy to Vercel

### Using CLI:
```bash
npm i -g vercel
vercel
```

### Using GitHub:
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Deploy!

## 📱 Test Responsive Design

Press `F12` in browser and toggle device toolbar to test mobile view.

## 🎨 File Structure

```
src/
├── components/
│   ├── Header.jsx       ← Navigation & cart
│   ├── ProductSection.jsx ← Products list
│   ├── ProductCard.jsx  ← Individual product
│   └── Footer.jsx       ← Footer & links
├── App.jsx              ← Main component
└── index.css            ← Global styles
```

## ✅ What's Included

✓ 8 sample tech products
✓ Amazon affiliate links
✓ Responsive design
✓ Shopping cart counter
✓ Beautiful UI with gradients
✓ Mobile optimized
✓ Production ready
✓ Vercel deployment ready

## 🆘 Common Issues

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**Links not working?**
- Check affiliate links are correct
- Verify Amazon Associates account is active

## 📚 Learn More

- React: https://react.dev
- Vite: https://vitejs.dev
- Vercel: https://vercel.com/docs

---

**You're all set! Happy coding! 💻**
