import { buffer } from "micro";
import * as admin from "firebase-admin";

// secure connection to db
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// connect to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Successfully fulfilled order", session.id);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;
    // verify event comes from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: "Error Webhook signature verification",
      });
    }

    // handle complete checkout session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Insert order to the database
      return fulfillOrder(session)
        .then(() => {
          res.status(200);
        })
        .catch((err) => {
          res.status(400).send("Webhook Error: " + err.message);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
