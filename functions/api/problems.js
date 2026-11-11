// GET /api/problems —— 题目列表（含标签）
import { json, serverError } from "./_lib.js";

export async function onRequestGet({ env }) {
  try {
    // 题目列表按题号自动升序（由小到大），不再依赖 sort_order 手工维护
    const probs = await env.DB.prepare(
      "SELECT id, name FROM problems ORDER BY CAST(id AS INTEGER)"
    ).all();

    const tags = await env.DB.prepare(
      "SELECT problem_id, tag FROM problem_tags ORDER BY problem_id, sort_order"
    ).all();

    const tagMap = {};
    for (const t of tags.results) {
      (tagMap[t.problem_id] ||= []).push(t.tag);
    }

    const items = probs.results.map((p) => ({
      id: p.id,
      name: p.name,
      tags: tagMap[p.id] || [],
    }));

    return json({ items });
  } catch (err) {
    return serverError(err);
  }
}
