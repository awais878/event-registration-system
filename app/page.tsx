"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      studentId: "",
      course: "",
      year: "",
      event: "",
    });

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [successData, setSuccessData] =
    useState<{
      name: string;
      email: string;
      event: string;
    } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setSuccessData({
          name: formData.name,
          email:
            formData.email,
          event:
            formData.event,
        });

        setFormData({
          name: "",
          email: "",
          studentId: "",
          course: "",
          year: "",
          event: "",
        });
      } else {
        setMessage(
          "⚠️ " +
          data.message
        );
      }
    } catch {
      setMessage(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F5F2EE] flex items-center justify-center p-5">

      <div className="w-full max-w-5xl bg-[#FCFBF8] rounded-[40px] border border-[#E9E3DB] shadow-[0_25px_70px_rgba(0,0,0,0.08)] overflow-hidden grid lg:grid-cols-[1.1fr_1.2fr]">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-[#FAF7F4] to-[#F4EFEB] p-10 lg:p-12 border-r border-[#E8E0D7] flex flex-col justify-between">

          <div>

            {/* emblem */}
            <div className="w-20 h-20 rounded-full bg-[#7B1E24]/10 flex items-center justify-center border border-[#7B1E24]/10 mb-8">

              <div className="w-12 h-12 rounded-full bg-[#7B1E24] text-white flex items-center justify-center text-xl font-semibold">
                C
              </div>
            </div>

            <p className="uppercase tracking-[0.18em] text-sm text-[#8E5A5E] font-medium">
              CAPS • TECH TANK
            </p>

            <p className="text-zinc-500 text-sm mt-1">
              Christ University
            </p>

            <h1 className="text-5xl font-semibold text-[#1D1D1D] leading-[1.03] tracking-tight mt-6">
              Event
              Registration
              <br />
              Made Simple.
            </h1>

            <p className="text-zinc-500 mt-5 text-base leading-relaxed max-w-md">
              Fast student
              check-in for
              live events
              with automatic
              WiFi access and
              duplicate
              prevention.
            </p>
          </div>

          <div className="space-y-4 mt-10">

            <div className="flex items-center gap-3 text-[#444]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7B1E24]" />
              Quick Registration
            </div>

            <div className="flex items-center gap-3 text-[#444]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7B1E24]" />
              Instant WiFi Access
            </div>

            <div className="flex items-center gap-3 text-[#444]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7B1E24]" />
              Duplicate Prevention
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 lg:p-10">

          {!successData ? (
            <>
              <div className="mb-7">
                <h2 className="text-3xl font-semibold text-[#1D1D1D]">
                  Register Student
                </h2>

                <p className="text-zinc-500 mt-1">
                  Fill student
                  details below.
                </p>
              </div>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-5"
              >

                <div className="grid md:grid-cols-2 gap-4">

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="rounded-[24px] border border-[#E5DFD7] bg-white px-5 py-4 outline-none transition focus:border-[#7B1E24] text-[#1D1D1D]"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="rounded-[24px] border border-[#E5DFD7] bg-white px-5 py-4 outline-none transition focus:border-[#7B1E24] text-[#1D1D1D]"
                  />

                  <input
                    type="text"
                    name="studentId"
                    placeholder="Student ID"
                    value={
                      formData.studentId
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="rounded-[24px] border border-[#E5DFD7] bg-white px-5 py-4 outline-none transition focus:border-[#7B1E24] text-[#1D1D1D]"
                  />

                  <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={
                      formData.course
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="rounded-[24px] border border-[#E5DFD7] bg-white px-5 py-4 outline-none transition focus:border-[#7B1E24] text-[#1D1D1D]"
                  />

                  <select
                    name="year"
                    value={
                      formData.year
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="rounded-[24px] border border-[#E5DFD7] bg-white px-5 py-4 outline-none transition focus:border-[#7B1E24] text-[#1D1D1D]"
                  >
                    <option value="">
                      Year of Study
                    </option>
                    <option>
                      1st Year
                    </option>
                    <option>
                      2nd Year
                    </option>
                    <option>
                      3rd Year
                    </option>
                    <option>
                      4th Year
                    </option>
                  </select>

                  <select
                    name="event"
                    value={
                      formData.event
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="rounded-[24px] border border-[#E5DFD7] bg-white px-5 py-4 outline-none transition focus:border-[#7B1E24] text-[#1D1D1D]"
                  >
                    <option value="">
                      Select Event
                    </option>

                    <option>
                      Debug Event
                    </option>

                    <option>
                      Hackathon
                    </option>

                    <option>
                      Startup Pitch
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[26px] bg-[#7B1E24] text-white py-4 font-medium hover:bg-[#64181D] transition shadow-lg shadow-[#7B1E24]/10"
                >
                  {loading
                    ? "Registering..."
                    : "Register Student"}
                </button>

                {message && (
                  <p className="text-center text-sm text-red-500">
                    {message}
                  </p>
                )}
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col justify-center">

              <div className="w-24 h-24 rounded-full bg-[#7B1E24]/10 flex items-center justify-center mb-8">

                <div className="w-14 h-14 rounded-full bg-[#7B1E24] text-white flex items-center justify-center text-2xl">
                  ✓
                </div>
              </div>

              <h2 className="text-4xl font-semibold text-[#1D1D1D] mb-3">
                Registration
                Successful
              </h2>

              <p className="text-zinc-500 mb-8">
                Successfully
                registered for
                <span className="font-medium text-[#7B1E24]">
                  {" "}
                  {
                    successData.event
                  }
                </span>
              </p>

              <div className="bg-white border border-[#E5DFD7] rounded-[28px] p-6 mb-8">

                <p className="font-semibold text-[#1D1D1D] text-xl">
                  {
                    successData.name
                  }
                </p>

                <p className="text-zinc-500 mt-2">
                  {
                    successData.email
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSuccessData(
                    null
                  )
                }
                className="w-full rounded-[26px] bg-[#7B1E24] text-white py-4 font-medium hover:bg-[#64181D] transition"
              >
                Register Next Student
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}