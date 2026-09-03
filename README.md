## Hotel Hub Engine
Premium dynamic QR landing page solution for hotels/ restaurants/ foodhubs & takeaways.

## NexUp Technologies Project AF_hotel27
Hotel Dynamic QR & Guest Engagement Engine

> **Commercial-Grade Digital Menu, Booking Engine & Guest Support Infrastructure**  
> *Engineered for modern hospitality businesses across East Africa and beyond.*

---

## 📌 Executive Overview

The **NexUp Hotel Dynamic QR & Guest Engagement Engine** is an ultra-lightweight, high-converting digital portal system engineered specifically for hotels, restaurants, and hospitality hubs. Designed with extreme mobility, bandwidth efficiency, and cross-platform flexibility in mind, this project enables hospitality managers to serve interactive digital menus, room/table reservations, and real-time support directly on guest smartphones via dynamic QR codes.

Built with clean, vanilla front-end architectures and a Node.js dynamic routing core, the infrastructure requires **zero native app downloads for guests** and delivers sub-second load times even on low-speed mobile networks.

---

## 🔥 Key System Features

### 1. 🍽️ High-Conversion Interactive Digital Menu
* **Dark / Light Theme Engine:** Built-in ambient theme toggle for evening dining or bright daylight viewing.
* **Live Status Indicator:** Real-time animated pulsing red status dot signaling active menu hours.
* **Dynamic Bulk Discount Logic:** Automatic **10% discount** applied in real time to *Today's Special* dishes when guests select 3 or more plates.
* **Persistent Floating Cart Bar:** Live itemization tracking (**Dishes vs. Drinks**) and real-time total price calculation in local currency (UGX).
* **Direct Kitchen WhatsApp Dispatch:** Instant receipt generator routing orders directly to the venue's WhatsApp Business endpoint with special dietary instructions and table/room numbers.

### 2. 🛎️ Premium Table & Room Booking Engine
* **Luxury Gold Visual Styling:** High-end visual architecture (`#D4AF37` Gold theme) engineered to maximize perceived brand value during table and accommodation bookings.
* **Split Field Architecture:** Dedicated Date, Time, Full Name, and Guest Count controls for fast booking completion.
* **Automated Request Formatting:** Pre-fills structured reservation payloads sent directly to management.

### 3. 💬 Interactive Guest Support & FAQ Portal
* **High-Utility Accordion FAQs:** Quick-collapse sections covering *Booking & Payments*, *Check-In / Check-Out*, and *Rooms & Amenities*.
* **Custom Query Dispatch:** Open-ended manual input box allowing guests to communicate directly with front desk reception on WhatsApp.

### 4. 🌐 Unified Multi-Page Guest Hub & Footer
* **Central Navigation Stack:** Clean Black & White landing hub (`index.html`) routing guests seamlessly between dining, reservations, and inquiries.
* **Global Legal Footer:** Standardized branding and copyright protection (`NexUp Technologies (U) 2023 - 2026`) embedded across every page template.

---

##📁 Repository & Project Architecture

```text
├── api/
│   └── index.js              # Serverless function handler for Vercel/Cloud routing
├── clients/
│   ├── hbhotel_hoima.json    # Flagship showcase configuration payload
│   ├── mubende_inn.json      # Client configuration template
│   └── hoima_bites.json      # Client configuration template
├── src/
│   ├── builder.js            # Automated static page compilation & QR code generator
│   └── redirect.js           # Express/Node.js dynamic QR link shortener engine
├── templates/
│   ├── index.html            # Main Guest Hub landing page
│   ├── menu.html             # High-conversion digital menu template
│   ├── booking.html          # Gold-themed reservation engine template
│   └── inquiry.html          # Interactive FAQ & inquiry center template
├── dist/                     # Compiled, client-ready static assets (Production build output)
├── vercel.json               # Cloud serverless rewrite & static routing config
└── package.json              # Project dependencies & automated build scripts

🛠️ Tech Stack & Prerequisites
Core Runtime: Node.js (v16.0.0 or higher)
Build Tools & Libraries: qrcode, fs, path, http-server
Front-End Architecture: Semantic HTML5, CSS3 CSS Variables, Vanilla JS (Zero heavy frameworks, zero external build dependencies)
Typography: Archivo Black & Plus Jakarta Sans via Google Fonts
Cloud Platform Integration: Ready for Vercel Serverless, Netlify, Railway, or Render

## 🛡️ License & Commercial Ownership
Designed and engineered by NexUp Technologies (U).
Copyright © 2023 – 2026 NexUp Technologies All rights reserved.
Developed with focus, discipline & professionalism for the digital flexibility in alignment with local digital growth in Uganda.
