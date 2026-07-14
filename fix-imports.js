const fs = require('fs');
const path = require('path');

const targets = [
  "app/layout.tsx",
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

  // If both are imported on the same line:
  if (content.includes('getContactInfo } from "@/lib/contact"')) {
    content = content.replace(/import\s*\{\s*(.*?)\s*getContactInfo\s*(.*?)\s*\}\s*from\s*"@\/lib\/contact";/g, (match, p1, p2) => {
      let imports = [];
      if (p1 && p1.trim()) imports.push(p1.trim().replace(/,\s*$/, ''));
      if (p2 && p2.trim()) imports.push(p2.trim().replace(/^,\s*/, ''));
      
      let res = `import { getContactInfo } from "@/lib/data/contact";\n`;
      if (imports.length > 0) {
        res += `import { ${imports.join(', ')} } from "@/lib/contact";\n`;
      }
      return res;
    });
  } else if (content.includes('import { getContactInfo } from "@/lib/contact"')) {
    content = content.replace('import { getContactInfo } from "@/lib/contact"', 'import { getContactInfo } from "@/lib/data/contact"');
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done.");
