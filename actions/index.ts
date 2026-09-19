import { db } from "@/db";
import { events, members } from "@/db/schema";
import { eq, gte, desc, asc } from "drizzle-orm";

export async function getAllEvents() {
    return await db
        .select()
        .from(events)
        .orderBy(desc(events.eventDate));
}

export async function getUpcomingEvents() {
    const nowISO = new Date().toISOString();

    return await db
        .select()
        .from(events)
        .where(gte(events.eventDate, nowISO))
        .orderBy(asc(events.eventDate));
}

export async function getEventById(id: number) {
    const [event] = await db
        .select()
        .from(events)
        .where(eq(events.id, id))
        .limit(1);

    return event ?? null;
}

export async function getCurrentMembers() {
    return await db
        .select()
        .from(members)
        .where(eq(members.isCurrent, true))
        .orderBy(asc(members.name));
}

export async function getMemberById(id: number) {
    const [member] = await db
        .select()
        .from(members)
        .where(eq(members.id, id))
        .limit(1);

    return member ?? null;
}
