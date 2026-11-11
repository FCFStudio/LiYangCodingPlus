// GET /api/announcements —— 首页公告
import { json, serverError } from "./_lib.js";

export async function onRequestGet({ env }) {
  try {
    // 公告按日期排序：新的在前（日期统一为 年-月-日，可直接字符串比较）
    const rows = await env.DB.prepare(
      "SELECT content, date FROM announcements ORDER BY date DESC, id DESC"
    ).all();

    return json({ items: rows.results });
  } catch (err) {
    return serverError(err);
  }
}
