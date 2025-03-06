import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    wallet: 200,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Place a bet
// @route   POST /api/users/bets
// @access  Private
const placeBet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { matchID, league, betType, team, winDiff, odds, wager } = req.body;
    if (user.wallet - wager >= 0) {
      let profit, totalPayout;

      if (odds > 0) {
        // Positive odds formula
        profit = (wager * odds) / 100;
      } else {
        // Negative odds formula
        profit = (wager * 100) / Math.abs(odds);
      }

      totalPayout = wager + profit;
      totalPayout = totalPayout.toFixed(2);

      // Create a new bet
      var newBet = {
        matchID,
        league,
        betType,
        team,
        winDiff,
        odds,
        wager,
        status: "pending",
        potentialPayout: totalPayout,
      };
    } else {
      res.status(400);
      throw new Error("Insufficient Funds");
    }

    // Add the new bet to the user's bets array
    user.bets.push(newBet);
    user.wallet = user.wallet - wager;

    // Save the updated user
    await user.save();

    res.status(201).json({ message: "Bet placed successfully", bet: newBet });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user bets
// @route   GET /api/users/bets
// @access  Private
const getUserBets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.bets);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Settle User Bets
// @route   POST /api/users/settleBets
// @access  Private
const settleBets = asyncHandler(async (req, res) => {
  // Find all users with bets on this game

  let game = req.body;
  const users = await User.find({
    "bets.matchID": game.gameId,
    "bets.status": "pending",
  });

  for (const user of users) {
    let totalPayout = 0;

    // Loop through each user's bets
    user.bets.forEach((bet) => {
      if (bet.matchID == game.gameId && bet.status == "pending") {
        const won = determineBetOutcome(bet, game);

        if (won == true) {
          bet.status = "won";
          totalPayout += bet.potentialPayout;
        } else if (won == false) {
          bet.status = "lost";
        } else if (won == null) {
          bet.status = "push";
          totalPayout += bet.wager;
        }
      }
    });

    // If the user won any bets, update their wallet
    if (totalPayout > 0) {
      user.wallet += totalPayout;
    }

    // Save the updated user document in MongoDB
    await user.save();
    // console.log(`Settled bets for user ${user._id}, paid out $${totalPayout}`);
  }
});

export const determineBetOutcome = (bet, gameResults) => {
  const { betType, team, winDiff } = bet;

  if (betType === "Moneyline") {
    if (
      (team === gameResults.HomeTeam && gameResults.homeTeamIsWinner) ||
      (team === gameResults.AwayTeam && gameResults.awayTeamIsWinner)
    ) {
      return true;
    }
    return false;
  }

  if (betType === "Spread") {
    const { HomeTeam, HomeScore, AwayScore } = gameResults;
    const pointSpread = parseFloat(winDiff);
    const actualMargin =
      team === HomeTeam ? HomeScore - AwayScore : AwayScore - HomeScore;

    if (actualMargin === pointSpread) return null; // Push scenario
    return actualMargin > pointSpread;
  }

  if (betType === "Over") {
    const totalScore = gameResults.HomeScore + gameResults.AwayScore;
    if (totalScore === parseFloat(winDiff)) return null; // Push scenario
    return totalScore > parseFloat(winDiff);
  }

  if (betType === "Under") {
    const totalScore = gameResults.HomeScore + gameResults.AwayScore;
    if (totalScore === parseFloat(winDiff)) return null; // Push scenario
    return totalScore < parseFloat(winDiff);
  }

  throw new Error(`Unknown bet type: ${betType}`); // Instead of returning null, throw an error if betType is invalid
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  placeBet,
  getUserBets,
  settleBets,
};
