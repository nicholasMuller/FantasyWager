import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { settleBets } from "../controllers/userController.js";
import User from "../models/userModel.js";

describe("settleBets function", function () {
  this.timeout(10000); // Prevent Mocha timeout issues

  let mongoServer;

  before(async () => {
    // ✅ Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // ✅ Insert multiple users with different betting scenarios
    await User.insertMany([
      {
        name: "Ken Griffey",
        password: "theKid24",
        email: "theKid24@gmail.com",
        bets: [
          {
            matchID: "123",
            betType: "Moneyline",
            team: "Lakers",
            winDiff: "5",
            status: "pending",
            potentialPayout: 50,
          },
        ],
        wallet: 100,
      },
      {
        name: "Michael Jordan",
        password: "goat23",
        email: "mj23@gmail.com",
        bets: [
          {
            matchID: "123",
            betType: "Moneyline",
            team: "Bulls",
            winDiff: "5",
            status: "pending",
            potentialPayout: 200,
          },
          {
            matchID: "456",
            betType: "Spread",
            team: "Bulls",
            winDiff: "7.5",
            status: "pending",
            potentialPayout: 100,
          },
        ],
        wallet: 500,
      },
      {
        name: "Kobe Bryant",
        password: "mamba24",
        email: "kobe24@gmail.com",
        bets: [
          {
            matchID: "789",
            betType: "Over",
            winDiff: "210.5",
            status: "pending",
            potentialPayout: 150,
          },
        ],
        wallet: 300,
      },
      {
        name: "Shaquille O'Neal",
        password: "bigDiesel32",
        email: "shaq@gmail.com",
        bets: [
          {
            matchID: "789",
            betType: "Under",
            winDiff: "210",
            status: "pending",
            potentialPayout: 75,
            wager: 10,
          },
          {
            matchID: "456",
            betType: "Moneyline",
            team: "Lakers",
            winDiff: "5",
            status: "pending",
            potentialPayout: 100,
          },
        ],
        wallet: 400,
      },
      {
        name: "Tim Duncan",
        password: "bigFundamental",
        email: "timmy@gmail.com",
        bets: [],
        wallet: 200, // ✅ No bets placed (edge case)
      },
    ]);
  });

  afterEach(async () => {
    // ✅ Clean up the database after each test
    await User.deleteMany({});
  });

  // ✅ TEST CASE 1: Winning Moneyline Bet
  it("should correctly settle a winning Moneyline bet", async function () {
    const req = {
      body: { gameId: "123", HomeTeam: "Lakers", homeTeamIsWinner: true },
    };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const updatedUser = await User.findOne({ email: "theKid24@gmail.com" });
    expect(updatedUser.bets[0].status).to.equal("won");
    expect(updatedUser.wallet).to.equal(150); // ✅ Wallet increased correctly
  });

  // ✅ TEST CASE 2: Losing Moneyline Bet
  it("should correctly settle a losing Moneyline bet", async function () {
    const req = {
      body: { gameId: "123", HomeTeam: "Lakers", homeTeamIsWinner: true },
    };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const losingUser = await User.findOne({ email: "mj23@gmail.com" });
    expect(losingUser.bets[0].status).to.equal("lost");
  });

  // ✅ TEST CASE 3: Winning Spread Bet
  it("should correctly settle a winning Spread bet", async function () {
    const req = {
      body: {
        gameId: "456",
        HomeTeam: "Bulls",
        HomeScore: 120,
        AwayScore: 100,
      },
    };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const spreadUser = await User.findOne({ email: "mj23@gmail.com" });
    expect(spreadUser.bets[1].status).to.equal("won");
    expect(spreadUser.wallet).to.equal(600); // ✅ Wallet increased by 100
  });

  // ✅ TEST CASE 4: Losing Spread Bet
  it("should correctly settle a losing Spread bet", async function () {
    const req = {
      body: {
        gameId: "456",
        HomeTeam: "Bulls",
        HomeScore: 105,
        AwayScore: 100,
      },
    };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const spreadUser = await User.findOne({ email: "mj23@gmail.com" });
    expect(spreadUser.bets[1].status).to.equal("lost");
  });

  // ✅ TEST CASE 5: Over Bet Win
  it("should correctly settle a winning Over bet", async function () {
    const req = { body: { gameId: "789", HomeScore: 220, AwayScore: 100 } };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const overUser = await User.findOne({ email: "kobe24@gmail.com" });
    expect(overUser.bets[0].status).to.equal("won");
    expect(overUser.wallet).to.equal(450);
  });

  // ✅ TEST CASE 6: Under Bet Win
  it("should correctly settle a winning Under bet", async function () {
    const req = { body: { gameId: "789", HomeScore: 90, AwayScore: 100 } };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const underUser = await User.findOne({ email: "shaq@gmail.com" });
    expect(underUser.bets[0].status).to.equal("won");
    expect(underUser.wallet).to.equal(475);
  });

  // ✅ TEST CASE 7: User with No Bets
  it("should not update a user with no bets", async function () {
    const req = { body: { gameId: "456", HomeScore: 120, AwayScore: 110 } };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const noBetUser = await User.findOne({ email: "timmy@gmail.com" });
    expect(noBetUser.wallet).to.equal(200); // ✅ No changes to wallet
  });

  // ✅ TEST CASE 8: Bet is a Push
  it("should correctly settle a push bet", async function () {
    const req = { body: { gameId: "789", HomeScore: 110, AwayScore: 100 } };
    const res = { json: () => {}, status: () => res };

    await settleBets(req, res);

    const underUser = await User.findOne({ email: "shaq@gmail.com" });
    expect(underUser.wallet).to.equal(410);
  });
});
