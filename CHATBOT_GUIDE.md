# AI Solar Chatbot - Installation & Maintenance Guide

## 1. Overview
The AI Solar Chatbot is a full-stack integration for the Solar Enterprise platform. It uses Next.js API routes for the backend and a Framer Motion-powered React component for the frontend.

## 2. Prerequisites
- **OpenRouter API Key**: (Already configured in `.env.local`)
- **Dependencies**: 
  ```bash
  npm install @google/generative-ai clsx tailwind-merge framer-motion lucide-react
  ```

## 3. Implementation Files
- **Frontend**: `components/SolarChat.tsx` (UI), `components/ChatProvider.tsx` (State Management)
- **Backend API**: `app/api/chat/route.ts` (AI Logic), `app/api/leads/route.ts` (Lead Collection)
- **Layout Integration**: `app/layout.tsx` (Global availability)

## 4. Configuration
Ensure your `.env.local` contains:
```env
OPENROUTER_API_KEY=sk-or-v1-...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 5. Customization

### Welcome Message
To change the initial greeting, edit the `useEffect` in `components/SolarChat.tsx`.

### Solar Logic
To adjust the solar calculation formulas, update the `systemPrompt` in `app/api/chat/route.ts`. 
Currently: `₹1000 bill ≈ 1kW`.

### Lead Storage
The `app/api/leads/route.ts` currently logs to the console. To store data in a database:
1. Initialize your DB (Supabase/Firebase/Prisma).
2. Update the `POST` handler in `leads/route.ts` to perform a database insert.

## 6. Maintenance
The chatbot is lightweight and uses `google/gemini-2.0-flash-lite-001` via OpenRouter for high speed and low cost. No specific maintenance is required other than monitoring API usage on your OpenRouter dashboard.

---
**Developed by Antigravity AI**
