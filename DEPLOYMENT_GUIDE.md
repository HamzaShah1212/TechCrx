# Vercel Deployment Guide

## Quick Start - Deploy in 3 Steps

### Step 1: Prepare Your Code
Your app is ready to deploy! The build is optimized and all files are in place.

### Step 2: Connect to Vercel

**Option A: Using Vercel CLI (Fastest)**
```bash
npm i -g vercel
vercel
```
Follow the prompts and your site will be live in seconds!

**Option B: Using GitHub**
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

**Option C: Using Vercel Dashboard**
1. Visit https://vercel.com
2. Sign up or log in
3. Click "Add New" → "Project"
4. Import your repository
5. Configure and deploy

### Step 3: Configure Your Domain
After deployment, you can:
- Use the default Vercel domain (e.g., `techrx.vercel.app`)
- Add a custom domain
- Set up environment variables if needed

## Environment Variables (Optional)

If you need environment variables, create a `.env.local` file:
```
VITE_AFFILIATE_TAG=your-affiliate-tag
```

Then update `ProductSection.jsx` to use it:
```javascript
const affiliateTag = import.meta.env.VITE_AFFILIATE_TAG || 'default-tag'
```

## Post-Deployment Checklist

- [ ] Test all product links work
- [ ] Verify responsive design on mobile
- [ ] Check affiliate links open correctly
- [ ] Test cart counter functionality
- [ ] Verify footer links work
- [ ] Check page load speed
- [ ] Test on different browsers

## Monitoring & Analytics

Add Google Analytics:
1. Get your tracking ID from Google Analytics
2. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (should be v16+)
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`

### Links Not Working
- Verify affiliate links in `ProductSection.jsx`
- Check Amazon Associates account is active
- Ensure links are properly formatted

### Slow Performance
- Check Vercel Analytics dashboard
- Optimize images if added
- Review bundle size in build output

## Updating Your Site

After deployment, to make changes:

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically redeploys!

Or use Vercel CLI:
```bash
vercel --prod
```

## Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (usually 24-48 hours)

## SSL/HTTPS

Vercel automatically provides free SSL certificates for all deployments. Your site is secure by default!

## Support

- Vercel Docs: https://vercel.com/docs
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev

---

**Your app is production-ready! 🚀**
