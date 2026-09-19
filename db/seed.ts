import "dotenv/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.example" });

import { db } from "@/db";
import { admins, events, members } from "@/db/schema";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";
import { eq } from "drizzle-orm";

async function main() {
    console.log("Starting database seeding...");

    const adminUsername = "admin";
    const rawPassword = "admin123";

    const existingAdmin = await db
        .select()
        .from(admins)
        .where(eq(admins.username, adminUsername))
        .get();

    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash(rawPassword, 10);
        await db.insert(admins).values({
            username: adminUsername,
            passwordHash,
        });
        console.log(`Admin user created: (${adminUsername})`);
    } else {
        console.log(`Admin user (${adminUsername}) already exists. Skipping.`);
    }

    const memberImageData = {
        coverImageKey: process.env.MEMBER_IMAGE_KEY || null,
        coverImageUrl: process.env.MEMBER_IMAGE_URL || null,
        coverImageName: process.env.MEMBER_IMAGE_NAME || null,
        imageMimeType: process.env.MEMBER_IMAGE_MIME_TYPE || "image/jpeg",
    };

    const eventImageData = {
        coverImageKey: process.env.EVENT_IMAGE_KEY || null,
        coverImageUrl: process.env.EVENT_IMAGE_URL || null,
        coverImageName: process.env.EVENT_IMAGE_NAME || null,
        coverImageMimeType: process.env.EVENT_IMAGE_MIME_TYPE || "image/jpeg",
    };

    const mockMembers = [
        {
            name: "Alice Johnson",
            title: "Lead Developer",
            shortSummary: "Passionate full-stack developer focusing on TypeScript and Go.",
            isCurrent: true,
            ...memberImageData,
        },
        {
            name: "Bob Smith",
            title: "UI/UX Designer",
            shortSummary: "Crafting beautiful user interfaces and seamless web experiences.",
            isCurrent: true,
            ...memberImageData,
        },
        {
            name: "Charlie Brown",
            title: "Former Event Coordinator",
            shortSummary: "Organized developer meetups and community workshops in 2024.",
            isCurrent: false,
            ...memberImageData,
        },
    ];

    await db.insert(members).values(mockMembers);
    console.log(`Inserted ${mockMembers.length} members with pre-uploaded R2 images.`);

    const mockEvents = [
        {
            name: "Annual Tech Symposium 2026",
            eventDate: "2026-11-15T10:00:00Z",
            location: "Convention Center, Hall A",
            shortSummary: "Join us for a day full of engineering talks and networking.",
            details: "Detailed breakdown of the schedule, keynotes, and breakout session topics.",
            link: "https://example.com/events/tech-symposium-2026",
        },
        {
            name: "Full-Stack Web Development Workshop",
            eventDate: "2026-12-05T14:00:00Z",
            location: "Online / Zoom",
            shortSummary: "A hands-on workshop building modern Next.js and SQLite apps.",
            details: "Prerequisites include basic JavaScript knowledge and Node.js installed.",
            link: "https://example.com/events/web-dev-workshop",
        },
    ];

    for (const event of mockEvents) {
        let qrCodeBase64: string | null = null;
        if (event.link) {
            qrCodeBase64 = await QRCode.toDataURL(event.link, {
                width: 300,
                margin: 2,
            });
        }

        await db.insert(events).values({
            ...event,
            qrCode: qrCodeBase64,
            ...eventImageData,
        });
    }

    console.log(`Inserted ${mockEvents.length} events with generated QR codes & R2 images.`);
    console.log("Seeding completed successfully!");
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
