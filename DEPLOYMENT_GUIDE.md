# 🚀 Ibex Adventure - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Create/Update `.env.local`:
```env
# Your WhatsApp Business Number (with country code)
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
```

### 2. Test Locally
```bash
npm run dev
# Visit http://localhost:3000
# Test all sections
# Click programs → Modal should open
# Fill form → Check validation
# Click Enquire → WhatsApp should open
```

### 3. Production Build
```bash
npm run build
# Should complete with zero errors
# Check for "✓ Compiled successfully"
```

---

## Deployment Option 1: Vercel (Recommended)

### **Quick Deploy (1 minute):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
# Follow prompts, select your project
# Add environment variable: NEXT_PUBLIC_WHATSAPP_NUMBER
```

### **Via GitHub:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Add env var: `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Deploy (automatic)

---

## Deployment Option 2: Traditional Node.js Hosting

### **Build & Run:**
```bash
# Build
npm run build

# Run production server
npm start
# Server listens on port 3000 (or $PORT env var)
```

### **Docker (Optional):**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t ibex-adventure .
docker run -p 3000:3000 -e NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999 ibex-adventure
```

---

## Deployment Option 3: Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add env: `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Deploy

---

## Post-Deployment

### **Verify:**
- [ ] Site loads at your domain
- [ ] Hero section displays correctly
- [ ] Images load properly
- [ ] Programs section shows cards
- [ ] Modal opens when clicking programs
- [ ] Testimonials visible
- [ ] Form validates
- [ ] WhatsApp links work
- [ ] Navbar hides on scroll
- [ ] Mobile responsive

### **Analytics (Optional):**
Add to `app/layout.tsx` if using analytics:
```tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### **Custom Domain:**
Update DNS to point to hosting provider's nameservers

---

## Performance Optimization

### **Already Enabled:**
- ✅ Image optimization (Next.js Image)
- ✅ CSS minification
- ✅ Code splitting
- ✅ Automatic static generation

### **Core Web Vitals Target:**
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅

### **Monitor with:**
- PageSpeed Insights
- GTmetrix
- WebPageTest

---

## Troubleshooting

### **Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

### **WhatsApp links not working:**
- Check `NEXT_PUBLIC_WHATSAPP_NUMBER` is set correctly
- Format: `91XXXXXXXXXX` (with country code)
- Test link manually: `https://wa.me/91XXXXXXXXXX`

### **Images not loading:**
- Unsplash URLs should work as-is
- For custom images, upload to `/public` folder
- Update paths in `lib/site-data.ts`

### **Form not validating:**
- Open browser console
- Check for JavaScript errors
- Clear browser cache: Ctrl+Shift+R

---

## Maintenance

### **Weekly:**
- Monitor WhatsApp inquiries
- Check server logs for errors
- Verify all links work

### **Monthly:**
- Review form submissions
- Check analytics
- Test mobile experience

### **Quarterly:**
- Update npm packages: `npm update`
- Rebuild and redeploy
- Gather user feedback

---

## Security Notes

✅ **Already Secured:**
- No user login (no auth vulnerabilities)
- No payment processing (no card data)
- No database (no SQL injection)
- Static content only
- HTTPS enforced on production

⚠️ **Maintain:**
- Keep Node/npm updated
- Use `.env` for sensitive data
- Don't commit `.env.local`
- Monitor npm dependencies for vulnerabilities

---

## Support URLs

| Service | URL |
|---------|-----|
| Vercel Docs | https://vercel.com/docs |
| Next.js Docs | https://nextjs.org/docs |
| Tailwind Docs | https://tailwindcss.com/docs |
| Framer Motion | https://www.framer.com/motion |

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server on :3000

# Production
npm run build           # Build for production
npm start               # Run production server
npm run build && npm start

# Cleanup
rm -rf .next            # Clear Next.js cache
npm cache clean --force # Clear npm cache

# Deployment
vercel                  # Deploy to Vercel
npm run build && npm start  # Run locally as production
```

---

## Success! 🎉

Your Ibex Adventure website is ready to:
- ✅ Inspire visitors
- ✅ Convert inquiries
- ✅ Build trust
- ✅ Scale WhatsApp conversations

**Now let's get it live!**
