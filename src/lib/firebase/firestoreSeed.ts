import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { getAuth } from "firebase-admin/auth";
import { events, users } from "../data/sampleData";

const serviceAccount = JSON.parse(
  readFileSync("./src/lib/firebase/admin-creds.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

async function SeedAuthUsers() {
  for (const user of users) {
    try {
      //stored in authentication using auth
      const createdUser = await auth.createUser({
        uid: user.uid,
        email: user.email,
        password: "Pa$$w0rd",
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      console.log("User created", createdUser.uid);
      //stored in profiles collection
      await db.collection("profiles").doc(createdUser.uid).set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

async function seedEvents() {
  //if one fails all fails
  const batch = db.batch();
  events.forEach((event) => {
    const eventRef = db.collection("events").doc(event.id);
    batch.set(eventRef, {
      ...event,
      date: Timestamp.fromDate(new Date(event.date)),
    });
  });
  batch.commit();
  console.log("events seeded successfully");
}

(async () => {
  await SeedAuthUsers();
  await seedEvents();
  console.log("seeded successfully");
})();
