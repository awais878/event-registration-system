import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      name,
      email,
      studentId,
      course,
      year,
      event,
    } = body;

    // Duplicate check
    const existingStudent =
      await prisma.student.findFirst({
        where: {
          OR: [
            { email },
            { studentId },
          ],
        },
      });

    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student already registered",
        },
        { status: 409 }
      );
    }

    // Save student
    const student =
      await prisma.student.create({
        data: {
          name,
          email,
          studentId,
          course,
          year,
        },
      });

    // Event timings
    const eventTimings: Record<
      string,
      string
    > = {
      "Debug Event":
        "10:00 AM",
      Hackathon:
        "11:00 AM",
      "Startup Pitch":
        "2:00 PM",
    };

    const eventTime =
      eventTimings[event] ??
      "10:00 AM";

    // SEND EMAIL
    const emailResponse =
      await resend.emails.send({
        from:
          "Event Desk <onboarding@resend.dev>",

        // always send to YOUR gmail
        to: [
          "nawabawais41@gmail.com",
        ],

        // unique subject every time
        subject: `URGENT TEST CAPS EVENT ${Date.now()}`,

        // text fallback
        text: `
Hi ${name},

You have successfully registered for ${event}

Event Time:
${eventTime}

Venue:
Main Auditorium

WiFi Details:
Network: Auditorium WiFi
Password: EVENT2026

See you at the event!
        `,

        // pretty html email
        html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 24px;
          color: #1f2937;
          background: #ffffff;
        ">

          <h1 style="
            color:#8B1E2D;
            margin-bottom:8px;
          ">
            Registration Successful 🎉
          </h1>

          <p style="
            font-size:16px;
          ">
            Hi <strong>${name}</strong>,
          </p>

          <p style="
            font-size:16px;
            line-height:1.6;
          ">
            You have successfully
            registered for:
          </p>

          <div style="
            background:#f8f8f8;
            border-radius:16px;
            padding:20px;
            margin:24px 0;
          ">
            <h2>
              Event Details
            </h2>

            <p>
              <strong>
                Event:
              </strong>
              ${event}
            </p>

            <p>
              <strong>
                Venue:
              </strong>
              Main Auditorium
            </p>

            <p>
              <strong>
                Time:
              </strong>
              ${eventTime}
            </p>
          </div>

          <div style="
            background:#f8f8f8;
            border-radius:16px;
            padding:20px;
            margin:24px 0;
          ">
            <h2>
              WiFi Details
            </h2>

            <p>
              <strong>
                Network:
              </strong>
              Auditorium WiFi
            </p>

            <p>
              <strong>
                Password:
              </strong>
              EVENT2026
            </p>
          </div>

          <p>
            See you at the event!
          </p>

        </div>
        `,
      });

    console.log(
      "EMAIL RESPONSE:",
      emailResponse
    );

    return NextResponse.json({
      success: true,
      student,
    });

  } catch (error) {
    console.error(
      "REGISTRATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}