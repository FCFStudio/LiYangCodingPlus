// GET /api/problem?id=1000 —— 单题详情（题面、标签、样例、题解）
import { json, badRequest, notFound, serverError, query } from "./_lib.js";

export async function onRequestGet({ request, env }) {
  try {
    const id = query(request, "id");
    if (!id) return badRequest("缺少参数 id");

    const p = await env.DB.prepare(
      "SELECT id, name, time_limit, memory_limit, description, input_format, output_format, hint, solution FROM problems WHERE id = ?"
    ).bind(id).first();

    if (!p) return notFound("题目不存在");

    const tags = await env.DB.prepare(
      "SELECT tag FROM problem_tags WHERE problem_id = ? ORDER BY sort_order"
    ).bind(id).all();

    const samples = await env.DB.prepare(
      "SELECT input, output FROM problem_samples WHERE problem_id = ? ORDER BY sort_order"
    ).bind(id).all();

    return json({
      id: p.id,
      name: p.name,
      timeLimit: p.time_limit,
      memoryLimit: p.memory_limit,
      description: p.description,
      inputFormat: p.input_format,
      outputFormat: p.output_format,
      hint: p.hint,
      solution: p.solution,
      tags: tags.results.map((t) => t.tag),
      samples: samples.results,
    });
  } catch (err) {
    return serverError(err);
  }
}
