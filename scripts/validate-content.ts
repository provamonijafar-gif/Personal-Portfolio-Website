import { collectPostValidationIssues } from "../lib/mdx";

const issues = collectPostValidationIssues();

if (issues.length > 0) {
  console.error("文章校验失败，已阻断发布。");
  for (const issue of issues) {
    console.error(`\n${issue.file}:`);
    for (const message of issue.messages) {
      console.error(`  - ${message}`);
    }
  }
  process.exit(1);
}

console.log("文章校验通过。");
