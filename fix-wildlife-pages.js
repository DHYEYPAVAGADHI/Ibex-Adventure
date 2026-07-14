const fs = require('fs');
const path = require('path');

const targets = [
  "app/programs/wildlife/pench-tiger-reserve/page.tsx",
  "app/programs/wildlife/kanha-national-park/page.tsx",
  "app/programs/wildlife/bandhavgarh-tiger-reserve/page.tsx",
  "app/programs/wildlife/jim-corbett/page.tsx",
];

for (const file of targets) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Change "export default function XPage() {" to "export default async function XPage() {"
  content = content.replace(/(export default function [A-Za-z0-9_]+\(\)\s*\{\n)/, match => {
    return match.replace('function', 'async function') + "  const { phone } = await getContactInfo();\n";
  });

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done wildlife.");
