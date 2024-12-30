"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// 定义商业画布数据类型
type BusinessPoint = {
  point: string;
};

type BusinessCanvas = {
  客户细分: BusinessPoint[];
  价值主张: BusinessPoint[];
  渠道通路: BusinessPoint[];
  客户关系: BusinessPoint[];
  收入来源: BusinessPoint[];
  核心资源: BusinessPoint[];
  关键业务: BusinessPoint[];
  重要合作: BusinessPoint[];
  成本结构: BusinessPoint[];
};

export default function IndexPage() {
  const { toast } = useToast();
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [canvas, setCanvas] = useState<BusinessCanvas | null>(null);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      toast({
        title: "请输入你的商业创意",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        throw new Error("生成失败");
      }

      const data = await response.json();
      setCanvas(data);
      toast({
        title: "生成成功！",
        description: "商业画布已生成",
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">AI 商业画布生成器</h1>
          <p className="text-lg text-muted-foreground mb-8">
            输入你的商业创意，让 AI 帮你分析商业模式的九大要素
          </p>

          <form onSubmit={handleSubmit} className="flex gap-4 justify-center mb-12">
            <Input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="输入你的商业创意..."
              className="max-w-lg"
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "生成中..." : "生成画布"}
            </Button>
          </form>
        </motion.div>

        {canvas && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-4"
          >
            {Object.entries(canvas).map(([key, points]) => (
              <Card key={key} className="p-4">
                <h3 className="font-semibold mb-2">{key}</h3>
                <ul className="space-y-2">
                  {points.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item.point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
      <Toaster />
    </section>
  );
}
