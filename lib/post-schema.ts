import { z } from "zod";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const KEBAB_CASE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const postFrontmatterSchema = z.object({
  title: z.string().trim().min(1, "不能为空"),
  date: z
    .union([z.string(), z.date()])
    .transform((value) => {
      if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
          throw new Error("不是有效日期");
        }
        return value.toISOString().slice(0, 10);
      }
      return value.trim();
    })
    .refine((value) => DATE_PATTERN.test(value), {
      message: "必须是 YYYY-MM-DD",
    }),
  description: z.string().trim().min(1, "不能为空"),
  tags: z.array(z.string().trim().min(1, "不能为空")),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type PostValidationIssue = {
  file: string;
  messages: string[];
};

export function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

export function slugIssues(slug: string): string[] {
  if (KEBAB_CASE_SLUG.test(slug)) return [];
  return ["文件名必须是 kebab-case（小写字母、数字、连字符），例如 event-loop-and-promise.mdx"];
}

export function parseFrontmatter(
  data: unknown
): { ok: true; data: PostFrontmatter } | { ok: false; messages: string[] } {
  const parsed = postFrontmatterSchema.safeParse(data);
  if (parsed.success) return { ok: true, data: parsed.data };

  return {
    ok: false,
    messages: parsed.error.issues.map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "frontmatter";
      return `${path}: ${issue.message}`;
    }),
  };
}
