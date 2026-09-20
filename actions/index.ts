import { db } from "@/db";
import { events, members } from "@/db/schema";
import { eq, gte, desc, asc, lt, sql } from "drizzle-orm";
import { toDataURL } from "qrcode";
import { deleteFromR2 } from "@/r2";

export async function getAllEvents() {
    try {
        const [upcomingEvents, pastEvents] = await Promise.all([
            db
                .select()
                .from(events)
                .where(gte(events.eventDate, sql`datetime('now')`))
                .orderBy(asc(events.eventDate)),
            db
                .select()
                .from(events)
                .where(lt(events.eventDate, sql`datetime('now')`))
                .orderBy(desc(events.eventDate)),
        ]);

        return { success: true as const, data: { upcomingEvents, pastEvents } };
    } catch (error) {
        console.error("Database error in getAllEvents:", error);
        return { success: false as const, error: "Failed to fetch events." };
    }
}

export async function getUpcomingEvents() {
    try {
        const upcomingEvents = await db
            .select()
            .from(events)
            .where(gte(events.eventDate, sql`datetime('now')`))
            .orderBy(asc(events.eventDate));

        return { success: true as const, data: upcomingEvents };
    } catch (error) {
        console.error("Database error in getUpcomingEvents:", error);
        return { success: false as const, error: "Failed to fetch upcoming events." };
    }
}

export async function getEventById(id: number) {
    try {
        const [event] = await db
            .select()
            .from(events)
            .where(eq(events.id, id))
            .limit(1);

        return { success: true as const, data: event || null };
    } catch (error) {
        console.error("Database error in getEventById:", error);
        return { success: false as const, error: "Failed to fetch event." };
    }
}

export async function addEvent(formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const eventDate = (formData.get("eventDate") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();

    const shortSummary = (formData.get("shortSummary") as string) || null;
    const details = (formData.get("details") as string) || null;
    const link = (formData.get("link") as string) || null;

    const coverImageKey = (formData.get("coverImageKey") as string) || null;
    const coverImageUrl = (formData.get("coverImageUrl") as string) || null;
    const coverImageName = (formData.get("coverImageName") as string) || null;
    const coverImageMimeType =
        (formData.get("coverImageMimeType") as string) || null;

    if (!name || !eventDate || !location) {
        if (coverImageKey) {
            await deleteFromR2(coverImageKey).catch((err) =>
                console.error("Failed to clean up R2 file on validation error:", err)
            );
        }
        return {
            success: false as const,
            error: "Name, event date, and location are required.",
        };
    }

    try {
        let qrCodeBase64: string | null = null;
        if (link) {
            qrCodeBase64 = await toDataURL(link, { width: 300, margin: 2 });
        }

        const [newEvent] = await db
            .insert(events)
            .values({
                name,
                eventDate,
                location,
                shortSummary,
                details,
                link,
                qrCode: qrCodeBase64,
                coverImageKey,
                coverImageUrl,
                coverImageName,
                coverImageMimeType,
            })
            .returning();

        return { success: true as const, data: newEvent };
    } catch (error) {
        console.error("Database error in addEvent:", error);

        if (coverImageKey) {
            await deleteFromR2(coverImageKey).catch((r2Err) =>
                console.error("Failed to clean up R2 file:", r2Err)
            );
        }

        return { success: false as const, error: "Failed to save event to database." };
    }
}

export async function deleteEvent(id: number) {
    try {
        const [existingEvent] = await db
            .select({ coverImageKey: events.coverImageKey })
            .from(events)
            .where(eq(events.id, id))
            .limit(1);

        if (!existingEvent) {
            return { success: false as const, error: "Event not found." };
        }

        await db.delete(events).where(eq(events.id, id));

        if (existingEvent.coverImageKey) {
            await deleteFromR2(existingEvent.coverImageKey).catch((r2Err) =>
                console.error("Failed to delete R2 asset on event removal:", r2Err)
            );
        }

        return { success: true as const, message: "Event deleted successfully." };
    } catch (error) {
        console.error("Database error in deleteEvent:", error);
        return { success: false as const, error: "Failed to delete event." };
    }
}

export async function getAllMembers() {
    try {
        const memberList = await db
            .select()
            .from(members)
            .orderBy(asc(members.name));

        return { success: true as const, data: memberList };
    } catch (error) {
        console.error("Database error in getAllMembers:", error);
        return { success: false as const, error: "Failed to fetch members." };
    }
}

export async function getCurrentMembers() {
    try {
        const memberList = await db
            .select()
            .from(members)
            .where(eq(members.isCurrent, true))
            .orderBy(asc(members.name));

        return { success: true as const, data: memberList };
    } catch (error) {
        console.error("Database error in getCurrentMembers:", error);
        return { success: false as const, error: "Failed to fetch current members." };
    }
}

export async function getMemberById(id: number) {
    try {
        const [member] = await db
            .select()
            .from(members)
            .where(eq(members.id, id))
            .limit(1);

        return { success: true as const, data: member || null };
    } catch (error) {
        console.error("Database error in getMemberById:", error);
        return { success: false as const, error: "Failed to fetch member." };
    }
}

export async function addMember(formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const title = (formData.get("title") as string) || null;
    const shortSummary = (formData.get("shortSummary") as string) || null;

    const isCurrentRaw = formData.get("isCurrent");
    const isCurrent =
        isCurrentRaw !== null
            ? isCurrentRaw === "true" || isCurrentRaw === "on"
            : true;

    const coverImageKey = (formData.get("coverImageKey") as string) || null;
    const coverImageUrl = (formData.get("coverImageUrl") as string) || null;
    const coverImageName = (formData.get("coverImageName") as string) || null;
    const imageMimeType = (formData.get("imageMimeType") as string) || null;

    if (!name) {
        if (coverImageKey) {
            await deleteFromR2(coverImageKey).catch((err) =>
                console.error("Failed to clean up R2 file on validation error:", err)
            );
        }
        return { success: false as const, error: "Member name is required." };
    }

    try {
        const [newMember] = await db
            .insert(members)
            .values({
                name,
                title,
                shortSummary,
                isCurrent,
                coverImageKey,
                coverImageUrl,
                coverImageName,
                imageMimeType,
            })
            .returning();

        return { success: true as const, data: newMember };
    } catch (error) {
        console.error("Database error in addMember:", error);

        if (coverImageKey) {
            await deleteFromR2(coverImageKey).catch((r2Err) =>
                console.error("Failed to clean up R2 file:", r2Err)
            );
        }

        return { success: false as const, error: "Failed to save member to database." };
    }
}

export async function deleteMember(id: number) {
    try {
        const [existingMember] = await db
            .select({ coverImageKey: members.coverImageKey })
            .from(members)
            .where(eq(members.id, id))
            .limit(1);

        if (!existingMember) {
            return { success: false as const, error: "Member not found." };
        }

        await db.delete(members).where(eq(members.id, id));

        if (existingMember.coverImageKey) {
            await deleteFromR2(existingMember.coverImageKey).catch((r2Err) =>
                console.error("Failed to delete R2 asset on member removal:", r2Err)
            );
        }

        return { success: true as const, message: "Member deleted successfully." };
    } catch (error) {
        console.error("Database error in deleteMember:", error);
        return { success: false as const, error: "Failed to delete member." };
    }
}
