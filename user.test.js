const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

jest.setTimeout(30000);

const uri =
  "mongodb+srv://luuphuphat:adolph29122003@cluster0.nipyiqe.mongodb.net/";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

describe("Database Tests", () => {
  let usersCollection;

  beforeAll(async () => {
    try {
      await client.connect();
      const db = client.db("AudioCloud");
      usersCollection = db.collection("User");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  });

  // CREATE
  test("Test CREATE", async () => {
    let newUsers = [];
    let total_users_to_add = 3;

    for (let i = 0; i < total_users_to_add; i++) {
      newUsers.push({
        UserId: faker.string.uuid(),
        Account: faker.internet.userName(),
        Password: faker.internet.password(),
        Email: faker.internet.email(),
        isPro: false
      });
    }
    const result = await usersCollection.insertMany(newUsers);
    expect(result.insertedCount).toBe(total_users_to_add);
  }, 30000);


  //READ
  test("Test READ", async () => {
    const email = 'example@yahoo.com';
    const findUser = await usersCollection.findOne({ Email: email });
    expect(findUser.Email).toBe(email);
  }, 30000);

  afterAll(async () => {
    await client.close();
  });
});