// GET /api/problems —— 题目列表（含标签）
import { json, serverError } from "./_lib.js";

export async function onRequestGet({ env }) {
  try {
    const probs = await env.DB.prepare(
      "SELECT id, name FROM problems ORDER BY sort_order, id"
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
