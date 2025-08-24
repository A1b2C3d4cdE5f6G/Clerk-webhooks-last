import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET
    });
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
        await connectDB();

       if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      await User.create({
        clerkId: id,
        email: email_addresses[0].email_address,
        name:` ${first_name || ""} ${last_name || ""}.trim()`,
        imageUrl: image_url,
      });
    }
    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}

