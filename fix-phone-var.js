const fs = require('fs');
const path = require('path');

const targets = [
  "app/programs/wildlife/pench-tiger-reserve/page.tsx",
  "app/programs/wildlife/kanha-national-park/page.tsx",
  "app/programs/wildlife/bandhavgarh-tiger-reserve/page.tsx",
  "app/programs/wildlife/jim-corbett/page.tsx",
  "app/programs/adventure/manali/page.tsx",
  "app/programs/[category]/[slug]/page.tsx",
];

for (const file of targets) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Insert const { phone } = await getContactInfo(); right after `export default async function ... {`
  content = content.replace(/(export default async function [^{]+?\{[^}]+\}\s*\)\s*\{\n)/g, match => {
    if (match.includes('getContactInfo')) return match;
    return match + "  const { phone } = await getContactInfo();\n";
  });

  // If the previous regex didn't match (maybe it didn't have type params with braces):
  content = content.replace(/(export default async function [^{]+?\([^)]+\)\s*\{\n)(?!\s*const \{ phone \})/g, match => {
    return match + "  const { phone } = await getContactInfo();\n";
  });

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done.");
