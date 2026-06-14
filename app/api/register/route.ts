import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
          event,
        },
      });

    // Event timing
    const eventTimes: Record<
      string,
      string
    > = {
      "Debug Event": "10:00 AM",
      Hackathon: "12:00 PM",
      "Pitch Startup Thing":
        "3:00 PM",
    };

    // Gmail transporter
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:
            process.env.EMAIL_USER,
          pass:
            process.env.EMAIL_PASS,
        },
      });

    // Send email
    await transporter.sendMail({
      from: `"CAPS Tech Tank" <${process.env.EMAIL_USER}>`,

      to: email,

      subject:
        "Event Registration Successful",

      html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 24px;
      ">
        <h1 style="
          color:#991b1b;
        ">
          Registration Successful 🎉
        </h1>

        <p>
          Hi <strong>${name}</strong>,
        </p>

        <p>
          You have successfully
          registered for:
        </p>

        <div style="
          background:#f5f5f5;
          padding:20px;
          border-radius:12px;
          margin:20px 0;
        ">
          <p>
            <strong>Event:</strong>
            ${event}
          </p>

          <p>
            <strong>Start Time:</strong>
            ${eventTimes[event]
        }
          </p>
        </div>

        <div style="
          background:#f5f5f5;
          padding:20px;
          border-radius:12px;
          margin:20px 0;
        ">
          <h3>
            WiFi Details
          </h3>

          <p>
            <strong>Network:</strong>
            Auditorium WiFi
          </p>

          <p>
            <strong>Password:</strong>
            EVENT2026
          </p>
        </div>

        <p>
          See you at the event!
        </p>
      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      student,
    });

  } catch (error) {
    console.error(error);

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