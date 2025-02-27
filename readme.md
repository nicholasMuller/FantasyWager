https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c - main

https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b

## File Structure

FantasyWager/
├─ .gitignore
├─ backend/
│ ├─ .env
│ ├─ config/
│ │ └─ db.js
│ ├─ controllers/
│ │ └─ userController.js
│ ├─ middleware/
│ │ ├─ authMiddleware.js
│ │ └─ errorMiddleware.js
│ ├─ models/
│ │ └─ userModel.js
│ ├─ package-lock.json
│ ├─ package.json
│ ├─ routes/
│ │ └─ userRoutes.js
│ ├─ server.js
│ └─ utils/
│ └─ generateToken.js
├─ frontend/
│ ├─ .eslintrc.cjs
│ ├─ index.html
│ ├─ package-lock.json
│ ├─ package.json
│ ├─ src/
│ │ ├─ App.jsx
│ │ ├─ components/
│ │ │ ├─ FormContainer.jsx
│ │ │ ├─ Header.jsx
│ │ │ ├─ Hero.jsx
│ │ │ ├─ Loader.jsx
│ │ │ ├─ MatchupCard.css
│ │ │ ├─ MatchupCard.jsx
│ │ │ ├─ NewsCard.css
│ │ │ ├─ NewsCard.jsx
│ │ │ ├─ PrivateRoute.jsx
│ │ │ └─ ShoppingCart.jsx
│ │ ├─ index.css
│ │ ├─ main.jsx
│ │ ├─ screens/
│ │ │ ├─ HomeScreen.jsx
│ │ │ ├─ LoginScreen.jsx
│ │ │ ├─ NBA/
│ │ │ │ ├─ NBANewsPage.jsx
│ │ │ │ └─ NBAOddsPage.jsx
│ │ │ ├─ NFL/
│ │ │ │ ├─ NFLNewsPage.jsx
│ │ │ │ └─ NFLOddsPage.jsx
│ │ │ ├─ NHL/
│ │ │ │ └─ NHLOddsPage.jsx
│ │ │ ├─ ProfileScreen.jsx
│ │ │ ├─ RegisterScreen.jsx
│ │ │ └─ UserBetsScreen.jsx
│ │ ├─ slices/
│ │ │ ├─ apiSlice.js
│ │ │ ├─ authSlice.js
│ │ │ ├─ getFinishedGames.js
│ │ │ ├─ NBA/
│ │ │ │ └─ getNBAEvents.js
│ │ │ ├─ News/
│ │ │ │ ├─ getNBANews.js
│ │ │ │ └─ getNFLNews.js
│ │ │ ├─ NFL/
│ │ │ │ └─ getNFLEvents.js
│ │ │ ├─ NHL/
│ │ │ │ └─ getNHLEvents.js
│ │ │ ├─ settleBets.js
│ │ │ └─ usersApiSlice.js
│ │ └─ store.js
│ └─ vite.config.js
├─ package-lock.json
├─ package.json
└─ readme.md
