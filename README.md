# Barbómetro 🍽️🧔🏻

[Barbómetro](https://barbometro.pt) is a platform dedicated to discovering the best restaurants in Portugal, carefully selected and reviewed by a food-loving bearded enthusiast.

## 🔗 Official Website

Visit the website at [barbometro.onrender.com](https://barbometro.onrender.com).

## ✨ Features

- 📍 **Explore Restaurants:** View a comprehensive list of recommended restaurants, filterable by location, cuisine type, price, and ratings.
- 🗺️ **Integrated Map:** Browse restaurants using an interactive map, with exact locations and direct links to Google Maps.
- 📩 **Newsletter:** Subscribe to our newsletter to receive the latest news, reviews, and recommendations directly in your inbox.
- ☕ **Support Us:** Support the project via our integration with [BuyMeACoffee](https://buymeacoffee.com/barbometro).

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **React / TypeScript**
- **Tailwind CSS** with shadcn/ui
- **Render** (hosting and CI/CD)
- **Google Sheets API** (restaurant data storage and management)
- **Google Maps API** (map integration)
- **MailerLite** (newsletter)

## 🛠️ Setup and Running

### 1. Clone the repository
```bash
git clone https://github.com/jnors/barbometro.git
cd barbometro
```

### 2. Install dependencies

```bash
npm install
```

> ⚠️ If you encounter dependency conflicts, consider running:
```bash
npm install --legacy-peer-deps
```

### 3. Configure environment variables

Create a `.env.local` file at the project's root with the following variables:

```env
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Run locally

```bash
npm run dev
```

Access the website locally at [http://localhost:3000](http://localhost:3000).

## 🎯 Roadmap

Soon available at a Notion Page.

## 🤝 Contribution

Would you like to help improve Barbómetro? You're welcome to contribute!

1. Fork the project
2. Create a branch for your feature (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin new-feature`)
5. Open a Pull Request

## 📬 Contact

Send suggestions or questions to [joaonorsilva92@gmail.com](mailto:joaonorsilva92@gmail.com).

## ☕ Support the Project

If you enjoy this project and want to support its ongoing development, consider buying a coffee through [BuyMeACoffee](https://buymeacoffee.com/barbometro).

---

Made with ❤️, React, and a beard in Portugal.

