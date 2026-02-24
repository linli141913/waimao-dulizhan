import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input with Zod
        const result = inquirySchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const data = result.data;

        // Log the inquiry (in production, this would send email + save to Google Sheets)
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📩 New Inquiry Received!");
        console.log(`   Name:     ${data.name}`);
        console.log(`   Email:    ${data.email}`);
        console.log(`   Company:  ${data.company || "—"}`);
        console.log(`   Phone:    ${data.phone || "—"}`);
        console.log(`   Product:  ${data.productId || "—"}`);
        console.log(`   Quantity: ${data.quantity || "—"}`);
        console.log(`   Message:  ${data.message}`);
        console.log(`   Time:     ${new Date().toISOString()}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        // TODO T3.3: Send email notification via nodemailer
        // TODO T3.4: Archive to Google Sheets via googleapis

        return NextResponse.json(
            { success: true, message: "Inquiry submitted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Inquiry API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
