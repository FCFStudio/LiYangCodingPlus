// GET /api/announcements —— 首页公告
import { json, serverError } from "./_lib.js";

export async function onRequestGet({ env }) {
  try {
    const rows = await env.DB.prepare(
      "SELECT content, date FROM announcements ORDER BY sort_order, id"
    ).all();

    return json({ items: rows.results });
  } catch (err) {
    return serverError(err);
  }
}
