import { NextRequest, NextResponse } from "next/server";
import { supabase, Inquiry } from "@/lib/supabase";

async function sendDiscordNotification(inquiry: Inquiry) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Discord webhook URL not configured");
    return;
  }

  const embed = {
    title: "🚀 새로운 상담 신청 - 로켓콜-변호사",
    color: 0x1a56db,
    fields: [
      {
        name: "📛 이름",
        value: inquiry.name,
        inline: true,
      },
      {
        name: "📞 전화번호",
        value: inquiry.phone,
        inline: true,
      },
      {
        name: "💬 상담 문의",
        value: inquiry.message || "(없음)",
        inline: false,
      },
      {
        name: "🕐 접수 시간",
        value: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        }),
        inline: false,
      },
    ],
    footer: {
      text: "로켓콜-변호사 | 법률 상담 의뢰인 연결 서비스",
    },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 전화번호는 필수 입력 항목입니다." },
        { status: 400 }
      );
    }

    const inquiry: Inquiry = {
      name,
      phone,
      message: message || "",
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from("inquiries")
      .insert([inquiry])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "데이터 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // Send Discord notification
    await sendDiscordNotification(inquiry);

    return NextResponse.json({
      success: true,
      message: "상담 신청이 완료되었습니다.",
      data: data,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "데이터 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
