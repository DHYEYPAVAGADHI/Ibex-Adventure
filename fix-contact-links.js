const fs = require('fs');
const path = require('path');

const clientComponents = [
  "components/navbar.tsx",
  "sections/cta-section.tsx",
  "sections/programs-section.tsx",
  "sections/contact-section.tsx",
  "app/destinations/[slug]/destination-detail-client.tsx",
  "app/attractions/[slug]/attraction-detail-client.tsx",
  "components/footer.tsx"
];

const serverComponents = [
  "app/programs/wildlife/pench-tiger-reserve/page.tsx",
  "app/programs/wildlife/kanha-national-park/page.tsx",
  "app/programs/wildlife/bandhavgarh-tiger-reserve/page.tsx",
  "app/programs/wildlife/jim-corbett/page.tsx",
  "app/programs/adventure/manali/page.tsx",
  "app/programs/[category]/[slug]/page.tsx",
];

// Helper to save file
function updateFile(file, processor) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log("Not found:", file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const newContent = processor(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Updated:", file);
  }
}

// 1. Process Server Components
serverComponents.forEach(file => {
  updateFile(file, (content) => {
    content = content.replace(/import \{ buildProgramInquiry \} from "@\/lib\/whatsapp";/g, 'import { buildProgramInquiry, buildTelLink, getContactInfo } from "@/lib/contact";');
    content = content.replace(/export default async function[^{]+\{\n/g, match => match + "  const { phone } = await getContactInfo();\n");
    content = content.replace(/buildProgramInquiry\(([^,)]+)(,\s*[^)]+)?\)/g, "buildProgramInquiry(phone, $1$2)");
    content = content.replace(/href="tel:\+919999999999"/g, 'href={buildTelLink(phone)}');
    return content;
  });
});

// 2. Process Client Components
clientComponents.forEach(file => {
  updateFile(file, (content) => {
    // Add useContact import if not present
    if (!content.includes('useContact')) {
      content = content.replace(/import [^\n]+;/g, (match, offset, str) => {
        // Just append after first import
        if (offset === str.indexOf('import')) {
          return match + '\nimport { useContact } from "@/components/providers/contact-provider";\nimport { buildTelLink } from "@/lib/contact";';
        }
        return match;
      });
    }

    // Replace @/lib/whatsapp with @/lib/contact
    content = content.replace(/@\/lib\/whatsapp/g, '@/lib/contact');

    // Add const { phone, whatsapp, email } = useContact(); inside the main export function
    content = content.replace(/(export (?:default )?function [A-Z][a-zA-Z0-9_]*\([^)]*\)[^{]*\{\n)/g, match => {
      if (match.includes('useContact')) return match;
      return match + "  const { phone, whatsapp, email } = useContact();\n";
    });

    // Fix calls to build functions
    content = content.replace(/buildGeneralInquiry\(\)/g, "buildGeneralInquiry(phone)");
    content = content.replace(/buildProgramInquiry\(([^,)]+)(,\s*[^)]+)?\)/g, "buildProgramInquiry(phone, $1$2)");
    content = content.replace(/buildContactInquiry\(\s*\{([^}]+)\}\s*\)/g, "buildContactInquiry(phone, {$1})");
    
    // Fix wa.me/phoneNumber logic
    content = content.replace(/https:\/\/wa\.me\/\$\{phoneNumber\}/g, "https://wa.me/${whatsapp.replace(/[^\\d]/g, '')}");
    
    // Fix tel:phoneNumber logic
    content = content.replace(/href=\{`tel:\$\{phoneNumber\}`\}/g, "href={buildTelLink(phone)}");
    content = content.replace(/href="tel:\+917600880908"/g, 'href={buildTelLink(phone)}');
    content = content.replace(/href="mailto:contact@ibexadventure.in"/g, 'href={`mailto:${email}`}');
    
    return content;
  });
});

// Clean up lib/whatsapp.ts
if (fs.existsSync(path.join(__dirname, 'lib/whatsapp.ts'))) {
  fs.unlinkSync(path.join(__dirname, 'lib/whatsapp.ts'));
}

console.log("Done.");
