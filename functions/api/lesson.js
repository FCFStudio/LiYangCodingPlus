// GET /api/lesson?id=1 —— 单课详情（含讲义文件列表）
import { json, badRequest, notFound, serverError, query } from "./_lib.js";

export async function onRequestGet({ request, env }) {
  try {
    const id = query(request, "id");
    if (!id) return badRequest("缺少参数 id");

    const l = await env.DB.prepare(
      "SELECT id, title, name, status, content FROM lessons WHERE id = ?"
    ).bind(id).first();

    if (!l) return notFound("课程不存在");

    const files = await env.DB.prepare(
      "SELECT file_name, label, tip FROM lesson_files WHERE lesson_id = ? ORDER BY sort_order"
    ).bind(id).all();

    return json({
      id: l.id,
      title: l.title,
      name: l.name,
      status: l.status,
      content: l.content || "",
      // 讲义文件放在 public/lesson/files/ 下
      files: files.results.map((f) => ({
        url: "/lesson/files/" + f.file_name,
        label: f.label,
        tip: f.tip,
      })),
    });
  } catch (err) {
    return serverError(err);
  }
}
