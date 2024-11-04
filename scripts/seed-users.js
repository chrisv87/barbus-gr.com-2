const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://chrisv:6twzssiuA1@cluster0.xzxdw.mongodb.net/barbus-gr";

async function seedUsers() {
  let client;
  
  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("barbus-gr");
    const users = db.collection("users");

    // Create admin user
    const adminExists = await users.findOne({ email: "chris.v@barbus-gr.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("12345678", 10);
      await users.insertOne({
        email: "chris.v@barbus-gr.com",
        password: hashedPassword,
        role: "admin",
        status: "active",
        profile: {
          name: "Chris V",
          agreedToTerms: true,
          termsAgreedDate: new Date()
        },
        createdAt: new Date()
      });
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }

    // Create test users
    const testUsers = [
      {
        email: "test.client1@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
        status: "active",
        profile: {
          name: "Test Client 1",
          phone: "616-555-0101",
          agreedToTerms: true,
          termsAgreedDate: new Date()
        },
        rewards: {
          level: 3,
          xp: 350
        },
        createdAt: new Date()
      },
      {
        email: "test.client2@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
        status: "active",
        profile: {
          name: "Test Client 2",
          phone: "616-555-0102",
          agreedToTerms: false
        },
        rewards: {
          level: 1,
          xp: 50
        },
        createdAt: new Date()
      }
    ];

    // Remove existing test users
    const deleteResult = await users.deleteMany({
      email: { $in: testUsers.map(user => user.email) }
    });
    console.log(`Deleted ${deleteResult.deletedCount} existing test users`);

    // Insert test users
    const insertResult = await users.insertMany(testUsers);
    console.log(`${insertResult.insertedCount} test users created`);

    // List all users
    const allUsers = await users.find().toArray();
    console.log("\nUsers in database:");
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
}

seedUsers();