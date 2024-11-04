import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = "mongodb+srv://chrisv:q5L6y2keKJXFG8l3@cluster0.xzxdw.mongodb.net/users";

async function seed() {
  let client;
  
  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("users");
    const users = db.collection("users");

    // Clear existing users
    await users.deleteMany({});
    console.log("Cleared existing users");

    // Create test users
    const testUsers = [
      {
        email: 'test.client@barbus-gr.com',
        password: await bcrypt.hash('password123', 10),
        role: 'client',
        status: 'active',
        profile: {
          name: 'Test Client',
          phone: '616-555-0101',
        },
        level: 1,
        xp: 0,
        agreedToTerms: true,
        createdAt: new Date()
      },
      {
        email: 'test.employee@barbus-gr.com',
        password: await bcrypt.hash('password123', 10),
        role: 'employee',
        status: 'active',
        profile: {
          name: 'Test Employee',
          phone: '616-555-0102',
        },
        level: 1,
        xp: 0,
        agreedToTerms: true,
        createdAt: new Date()
      },
      {
        email: 'test.admin@barbus-gr.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        status: 'active',
        profile: {
          name: 'Test Admin',
          phone: '616-555-0103',
        },
        level: 1,
        xp: 0,
        agreedToTerms: true,
        createdAt: new Date()
      }
    ];

    const result = await users.insertMany(testUsers);
    console.log(`${result.insertedCount} test users created`);

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

seed();