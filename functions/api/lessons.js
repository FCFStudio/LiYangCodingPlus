// GET /api/lessons —— 课程列表
import { json, serverError } from "./_lib.js";

export async function onRequestGet({ env }) {
  try {
    // 课程列表按课时编号自动升序（由小到大），不再依赖 sort_order 手工维护
    const rows = await env.DB.prepare(
      "SELECT id, title, name, status FROM lessons ORDER BY CAST(id AS INTEGER)"
    ).all();

    return json({ items: rows.results });
  } catch (err) {
    return serverError(err);
  }
}
