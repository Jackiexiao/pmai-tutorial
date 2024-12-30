import { NextResponse } from "next/server";
import OpenAI from "openai";

// 创建 OpenAI 客户端实例
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

export async function POST(request: Request) {
  try {
    // 从请求体中获取用户输入的 idea
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json(
        { error: "请输入你的商业创意" },
        { status: 400 }
      );
    }

    // 构建 prompt
    const prompt = `基于用户输入的产品"${idea}"生成商业模式画布的九大要点，内容精炼，词汇精准直接。请按以下格式生成JSON响应：

{
  "客户细分": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "价值主张": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "渠道通路": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "客户关系": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "收入来源": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "核心资源": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "关键业务": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "重要合作": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "成本结构": [
    { "point": "point1" },
    { "point": "point2" }
  ]
}`;

    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "你是一个经验丰富的商业顾问，擅长分析商业模式。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: process.env.OPENAI_MODEL_NAME || "deepseek-chat",
      response_format: { type: "json_object" },
    });

    // 解析 AI 返回的内容
    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("未能生成有效的响应");
    }

    // 返回生成的商业画布数据
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "生成商业画布时出现错误" },
      { status: 500 }
    );
  }
}
