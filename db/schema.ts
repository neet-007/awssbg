import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const admins = sqliteTable("admins", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const sessions = sqliteTable("sessions", {
    id: text("id").primaryKey(),
    adminId: integer("admin_id")
        .notNull()
        .references(() => admins.id, { onDelete: "cascade" }),
    expiresAt: text("expires_at").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const events = sqliteTable("events", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    eventDate: text("event_date").notNull(),
    location: text("location").notNull(),
    shortSummary: text("short_summary"),
    details: text("details"),
    qrCode: text("qr_code"),
    link: text("link"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    coverImageKey: text("cover_image_key"),
    coverImageUrl: text("cover_image_url"),
    coverImageName: text("cover_image_name"),
    coverImageMimeType: text("cover_image_mime_type"),
});

export const members = sqliteTable("members", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    title: text("title"),
    shortSummary: text("short_summary"),
    isCurrent: integer("is_current", { mode: "boolean" }).notNull().default(true),
    coverImageKey: text("cover_image_key"),
    coverImageUrl: text("cover_image_url"),
    coverImageName: text("cover_image_name"),
    imageMimeType: text("image_mime_type"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
