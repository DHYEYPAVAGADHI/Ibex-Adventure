const fs = require('fs');
const path = require('path');

const targets = [
  "sections/cta-section.tsx",
  "sections/programs-section.tsx",
  "sections/contact-section.tsx",
  "components/footer.tsx"
];

for (const file of targets) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace useContact with getContactInfo
  content = content.replace(/import \{ useContact \} from "@\/components\/providers\/contact-provider";/g, 'import { getContactInfo } from "@/lib/data/contact";');

  // Make the function async
  content = content.replace(/export (default )?function ([A-Za-z0-9_]+)/, "export $1async function $2");

  // Replace the hook call with await getContactInfo()
  content = content.replace(/const \{ phone, whatsapp, email \} = useContact\(\);/, "const { phone, whatsapp, email } = await getContactInfo();");
  // Also handle cases where it might just be `phone` etc.
  content = content.replace(/const \{([^}]+)\} = useContact\(\);/, "const {$1} = await getContactInfo();");

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Fixed sections");
