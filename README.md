# MealPrepGenie: A Full-Stack AI-Powered Meal Planning Service

This repository showcases a **full-stack** meal planning application called **MealPrepGenie**, which leverages **Supabase** for authentication, **OpenAI** for generating meal plans, and a credit-based system that will integrate with **Stripe** for credit purchases.

## Overview

MealPrepGenie allows users to:
- **Sign up** or **sign in** (using Supabase as an auth provider).
- Generate **AI-powered** meal plans tailored to their dietary preferences.
- Purchase or add credits (in progress) to generate more meal plans.
- **Save favorite generations** for later reference (demonstrating CRUD).
- Enjoy an elegant **React** front end with **Tailwind CSS** styling.

Initially, the project attempted to integrate a custom OAuth flow via **clientID** console API. However, **issues** arose around configuration and authorization logic. As a result, the decision was made to **revise the approach** and rely exclusively on **Supabase** for OAuth and session management. This new approach **simplified** the setup, fixed previous configuration errors, and got the **authentication** fully functional.

Also, a **new OpenAI API key** was used, which resolved prior errors with the GPT integration. With these adjustments, **MealPrepGenie** is now able to authenticate users successfully and also store user-generated meal plans or “favorite” content in Supabase tables.

## Current Features

1. **Supabase Authentication**  
   - Supabase’s built-in OAuth (e.g., Google, GitHub, etc.) manages user sessions.
   - No manual `clientID` console integration needed.  
   - Simplified environment with less overhead and fewer external dependencies.

2. **Meal Plan Generation**  
   - Uses an **OpenAI API** (GPT) to provide meal plans based on user preferences.
   - Credit-based approach to manage how many plans can be generated.

3. **Favorite Plans**  
   - Authenticated users can **save** their AI-generated meal plans, demonstrating the ability to **create** and **retrieve** data from the Supabase backend.

4. **Credit System** (in progress)  
   - Basic logic to **track** credit usage for each user.  
   - Future improvement: **Stripe integration** to purchase more credits when needed.

5. **UI and Navigation**  
   - **React + Vite** front end, using **Tailwind CSS**.  
   - **Landing page** flow for public users.  
   - **Dashboard** for authenticated interactions (generations, credit purchase, saving favorites).  
   - **Profile** and **Settings** pages for further user customization.

## Project Status

- **Capstone Requirements**: The app demonstrates a **complete** full-stack example with:
  - Frontend  
  - Supabase-based authentication & database  
  - OpenAI integration  
  - Basic CRUD  
- **Ongoing Work**:
  - Fine-tuning credit tracking logic for OpenAI calls.  
  - Building out the **Stripe** integration for credit purchases.  
  - Enhancing the UI/UX and performance optimizations.

## Tech Stack

- **React** (Vite)  
- **Tailwind CSS**  
- **Supabase** (Auth, Database, RPC Functions)  
- **OpenAI GPT** (AI-generated meal plans)  
- **Stripe** (planned integration for payments)  

## Setup & Usage

1. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/meal-prep-genie.git
   cd meal-prep-genie
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or yarn install
   ```

3. **Configure environment**:
   - Copy `.env.example` to `.env`.
   - Fill in `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, etc.
   - Provide `VITE_OPENAI_API_KEY`.
   - Provide `VITE_STRIPE_PUBLIC_KEY` if testing (optional for now).

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Visit**:
   - Open your browser to [http://localhost:8080](http://localhost:8080).

6. **Build for production**:
   ```bash
   npm run build
   ```

7. **Preview production build**:
   ```bash
   npm run preview
   ```

## Credits & Acknowledgments

- **Supabase** for seamless Auth + Database as a Service.
- **OpenAI** GPT-4 for meal plan generation.
- **Stripe** (to be integrated) for payment and credit purchase.
- **Tailwind** for rapid UI styling.
- **React** & **Vite** for the frontend environment.
- **AI Tools**  
  - Leaned heavily on **Lovable Dev** / **ChatGPT** and **Claude** for debugging and constructing a robust backend.  

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change or improve.

## License

This project is open-source. Use it freely, but **no warranties** are provided.

---

**Thanks for checking out MealPrepGenie!** This project is part of a larger goal to demonstrate a “**full-stack**” AI-based meal-planning solution. There is ongoing work to polish the **credit system** and incorporate **Stripe**. Please feel free to explore the code, provide feedback, and open issues for any suggestions or improvements. 

Happy Coding!
