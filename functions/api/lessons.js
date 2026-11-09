// GET /api/lessons —— 课程列表
import { json, serverError } from "./_lib.js";

export async function onRequestGet({ env }) {
  try {
    const rows = await env.DB.prepare(
      "SELECT id, title, name, status FROM lessons ORDER BY sort_order, id"
    ).all();

    return json({ items: rows.results });
  } catch (err) {
    return serverError(err);
  }
}
