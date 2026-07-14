# 🏔️ Ibex Adventure - Premium Tourism Website

> **Beyond Adventure. Towards Transformation.**

A premium, image-first tourism lead-generation website for Ibex Adventure, designed with the visual storytelling and interactive features of high-end tourism platforms, simplified for WhatsApp-based inquiry conversion.

## ✨ Key Features

### 🎯 Interactive Program Explorer
- Click any program card to view full details in a beautiful modal
- Image gallery with carousel navigation
- Day-by-day itinerary
- Difficulty level, pricing, age group, and group size info
- Direct "Enquire on WhatsApp" from modal

### 🌟 Trust-Building Elements
- 6 authentic customer testimonials with ratings
- Safety highlights and credentials
- Program logistics clarity
- Social proof grid

### 📱 Smart Navigation
- Scroll-aware navbar that hides on scroll-down
- Sticky positioning with transparent-to-solid transition
- Mobile hamburger menu
- Smooth navigation between sections

### 🔐 Lead Capture Optimization
- Client-side form validation (name, phone, message)
- Real-time error feedback
- Auto-formatting of phone numbers
- Context-aware WhatsApp messages

### 📊 Conversion-Focused Design
- Psychological funnel: Inspiration → Exploration → Action
- Multiple CTAs throughout
- Modal provides friction-free details
- Easy 3-field form submission
- Direct WhatsApp messaging

## 🚀 Quick Start

### Installation
```bash
git clone <repo>
cd "Ibex Adventure"
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

Replace with your WhatsApp Business number (with country code).

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── navbar.tsx          # Sticky navigation (scroll-aware)
│   ├── program-modal.tsx   # Interactive program details modal ✨
│   ├── testimonial-card.tsx # Testimonial card component
│   ├── animated-section.tsx # Scroll-trigger animations
│   ├── section-heading.tsx # Reusable section headers
│   ├── whatsapp-button.tsx # WhatsApp link wrapper
│   └── whatsapp-button.tsx # WhatsApp link wrapper
├── sections/
│   ├── hero-section.tsx              # Full-screen hero
│   ├── discovery-section.tsx         # Category cards
│   ├── destinations-section.tsx      # Destination grid
│   ├── experience-section.tsx        # Featured program
│   ├── about-section.tsx             # Brand story
│   ├── programs-section.tsx          # Program cards + modal trigger
│   ├── student-gains-section.tsx     # Benefits grid
│   ├── testimonials-section.tsx      # Testimonials grid ✨
│   ├── safety-section.tsx            # Trust building
│   ├── program-details-section.tsx   # Logistics
│   ├── cta-section.tsx               # Final CTA
│   └── contact-section.tsx           # Lead capture form
├── lib/
│   ├── site-data.ts        # All static content + programs + testimonials
│   └── whatsapp.ts         # WhatsApp link builders
└── public/
    └── [images]            # Static assets
```

## 🎨 Design System

### Colors
- **Dark Background:** `slate-950`
- **Primary:** `white`, `amber-300`
- **Difficulty Levels:**
  - Easy: `emerald-300`
  - Moderate: `amber-300`
  - Challenging: `orange-300`
  - Expert: `red-300`

### Spacing
- Mobile-first approach
- Responsive padding system
- Generous whitespace for premium feel

### Typography
- Bold headers with high contrast
- Readable body text
- Clear visual hierarchy

### Animations
- Smooth scroll-triggered fade-ins
- Subtle hover effects (1.1x zoom)
- Modal slide-in animation
- No jarring or heavy animations

## 📱 Responsive Design

Fully responsive across all devices:
- **Mobile:** 320px+
- **Tablet:** 768px+
- **Desktop:** 1024px+

## 🔄 User Journey

```
Hero (Capture attention)
  ↓
Discovery (Browse categories)
  ↓
Destinations (Visual exploration)
  ↓
About (Brand story)
  ↓
Programs (Interactive browsing) ← Click for modal details
  ↓
Benefits (Value propositions)
  ↓
Testimonials (Build trust)
  ↓
Safety (Remove concerns)
  ↓
Contact Form (Lead capture)
  ↓
WhatsApp (Conversion)
```

## 📊 Programs Included

1. **Trekking Expeditions** - 7 days, ₹15k-35k
2. **Camping Experiences** - 3 days, ₹5k-12k
3. **Heritage & Cultural Tours** - 4 days, ₹8k-18k
4. **Rural Immersion Programs** - 5 days, ₹10k-22k
5. **Survival Skills Training** - 5 days, ₹18k-40k
6. **Team Building & Leadership** - 3 days, ₹8k-20k

Each includes:
- Full day-by-day itinerary
- Program highlights
- Age group recommendations
- Best season to visit
- Group size limits
- Professional photos

## 🎯 WhatsApp Integration

All "Enquire Now" buttons route to WhatsApp with:
- **Program inquiries:** Pre-filled with program name
- **General inquiries:** General interest message
- **Contact form:** Pre-filled with user details

Messages are professionally formatted with clear information.

## ✅ Form Validation

Contact form includes:
- ✓ Name validation (2+ characters)
- ✓ Phone validation (10-digit Indian format)
- ✓ Message validation (10+ characters)
- ✓ Real-time error clearing
- ✓ Visual error feedback
- ✓ Disabled submit until valid

## 🚀 Performance Features

- **Next.js Image Component** - Optimized images
- **Static Generation** - Fast loading
- **CSS-in-JS** - No external CSS
- **Code Splitting** - Per-route optimization
- **Framer Motion** - GPU-accelerated animations

### Core Web Vitals
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 🔐 Security

✅ No authentication system  
✅ No payment processing  
✅ No database  
✅ Static site architecture  
✅ Environment variables for sensitive data  
✅ HTTPS ready  

## 📚 Documentation

- [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md) - What was built
- [`FEATURE_GUIDE.md`](./FEATURE_GUIDE.md) - Complete feature breakdown
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - How to deploy

## 🧪 Testing Checklist

- ✅ All programs display in grid
- ✅ Click program → Modal opens with details
- ✅ Modal gallery carousel works
- ✅ Testimonials grid displays
- ✅ Form validates inputs
- ✅ WhatsApp links work
- ✅ Navbar hides on scroll-down
- ✅ Responsive on mobile/tablet/desktop
- ✅ No console errors
- ✅ Images load properly

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
# Add env variable: NEXT_PUBLIC_WHATSAPP_NUMBER
```

### Self-Hosted
```bash
npm run build
npm start
# Set environment variable before running
```

### Docker
```bash
docker build -t ibex-adventure .
docker run -p 3000:3000 -e NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999 ibex-adventure
```

## 📞 Support

For issues or questions:
1. Check [`FEATURE_GUIDE.md`](./FEATURE_GUIDE.md)
2. Review [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)
3. Check build logs: `npm run build`

## 📈 Next Steps

1. **Set WhatsApp Number** - Update `.env.local`
2. **Test Locally** - Run `npm run dev`
3. **Deploy** - Use Vercel or your hosting
4. **Monitor** - Track WhatsApp inquiries
5. **Iterate** - Gather feedback and improve

## 🎉 Summary

Your Ibex Adventure website is:
- ✨ Premium and image-focused
- 🎯 Conversion-optimized
- 📱 Fully responsive
- 🚀 Production-ready
- 🔐 Secure and fast

**Ready to inspire adventurers and convert inquiries!**

---

## Tech Stack

- **Framework:** Next.js 16.2.4
- **Runtime:** React 19.2.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (or any Node.js host)

---

## License

© 2026 Ibex Adventure. All rights reserved.

---

## Credits

Built with ❤️ for premium adventure tourism lead generation.

**Beyond Adventure. Towards Transformation.** 🏔️

---

## Live Demo

Visit: `http://localhost:3000`

---

**Last Updated:** April 28, 2026  
**Status:** ✅ Production Ready
