# Solar Website Chatbot Implementation Research

## 1. Executive Summary
Implementing a chatbot on the solar platform aims to increase user engagement, provide instant ROI calculations, and improve high-quality lead generation. This document explores two primary implementation paths: a lightweight rule-based system and a sophisticated AI-powered "Solar Advisor."

## 2. Objectives
- **Instant Gratification**: Provide users with immediate answers to solar-related queries (e.g., "How much subsidy can I get?").
- **Frictionless Lead Gen**: Collect lead information through conversation rather than just static forms.
- **Brand Consistency**: Ensure the bot's personality and knowledge align with the specific solar enterprise based on the URL slug.

## 3. Implementation Approaches

### Option A: Standard Chat Integrations (e.g., Tawk.to, Intercom)
- **Pros**: Zero development time, robust mobile apps for agents, established features.
- **Cons**: Lack of deep integration with site logic (e.g., cannot run `calculateSolarSystem` internally), monthly subscription costs, generic interface.

### Option B: Custom "Solar Advisor" (Powered by Genkit & Gemini)
- **Pros**: 
    - **Deep Integration**: Directly calls `lib/utils.ts` for accurate ROI/Subsidy math.
    - **Multi-Client Aware**: Automatically adjusts its knowledge based on the `companySlug`.
    - **Lead Sync**: Seamlessly pushes data to the existing `/api/lead` endpoint.
    - **Educational**: Can explain complex concepts like the "PM Surya Ghar Yojana" in simple terms.
- **Cons**: Requires development time and management of AI API usage.

## 4. Proposed Core Features

### 4.1 Conversational ROI Calculator
The bot can ask: *"What's your average monthly bill?"* and immediately respond with: *"Based on a ₹2,000 bill, you could save approximately ₹1,800 monthly with a 2kW system. You'd also be eligible for a ₹60,000 subsidy!"*

### 4.2 Dynamic Lead Capture
Instead of a form, the bot guides the user:
- *"I'd love to help you get a formal quote. What's your name?"*
- *"Great, [Name]! Which city are you located in?"*
- *"And a phone number where our solar expert can reach you?"*

### 4.3 Solar FAQ Knowledge Base
Capability to answer industry-standard questions:
- *"How long do solar panels last?"*
- *"Can I get a loan for solar?"*
- *"What happens on a cloudy day?"*

## 5. Recommended Tech Stack
- **Framework**: Next.js (Existing)
- **Intelligence**: Google Genkit + Gemini 1.5 Flash (for speed/cost-efficiency)
- **State Management**: Simple React state for chat history or Vercel AI SDK for streaming.
- **UI**: Custom Tailwind-styled chat bubble to match the premium "Solar Enterprise" aesthetic.

## 6. Next Steps
1. **Pilot Design**: Create a UI mockup of the "Solar Advisor" bubble.
2. **Genkit Flow**: Define a Genkit flow that takes `monthlyBill` and returns a conversational summary.
3. **Prompt Engineering**: Develop a system prompt that incorporates the company's specific data from `lib/data.ts`.
