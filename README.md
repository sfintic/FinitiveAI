# FinitiveAI

FinitiveAI is a futuristic productivity and goal-tracking web app that combines beautiful UI, AI coaching, and real-time progress tracking to help you achieve your ambitions. Built with Next.js, Supabase, and modern design, it empowers users to set, track, and celebrate their goals with actionable insights and a delightful experience.

## 🚀 What does FinitiveAI do?
- **Goal Management:** Create, view, and track your personal goals with timelines, milestones, and progress bars.
- **Task Tracking:** Organize daily tasks, mark them complete, and visualize your progress.
- **AI Coach:** Get motivational messages, productivity tips, and personalized insights from your AI assistant.
- **Celebration & Motivation:** Enjoy confetti and celebration effects when you complete all your tasks!
- **Authentication:** Secure sign up and login with email/password (Supabase Auth, email confirmation required).
- **User Data Privacy:** All your data is private and only visible to you.

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend & Auth:** Supabase (Postgres, Auth, RLS)
- **Database:** Supabase Postgres (with RLS for user data privacy)
- **AI/UX:** Custom AI coach logic, animated backgrounds, confetti, and modern UI

## 🏁 How to Run Locally
1. **Clone the repo:**
   ```bash
   git clone https://github.com/sfintic/FinitiveAI.git
   cd FinitiveAI
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL and anon key.
   - Configure Supabase Auth SMTP settings for email confirmation.
4. **Run the app:**
   ```bash
   npm run dev
   ```
5. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 💡 Why FinitiveAI?
- **Stay Motivated:** AI-driven encouragement and insights keep you on track.
- **Visual Progress:** See your progress with beautiful, animated dashboards.
- **Celebrate Wins:** Confetti and celebration logic make productivity fun.
- **Privacy First:** All your data is protected by Supabase RLS and only visible to you.

## 🗺️ Roadmap / Planned Features
- [ ] Google/Apple OAuth login
- [ ] Mobile-first UI polish
- [ ] Push/email reminders
- [ ] More AI coach features (chat, streaks, smart suggestions)
- [ ] Team/collaborative goals
- [ ] Customizable themes
- [ ] Advanced analytics and reporting

## 🤝 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

## 📄 License
MIT

---

> Built with ❤️ by sfintic and the FinitiveAI community.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.