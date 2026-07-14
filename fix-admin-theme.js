const fs = require('fs');
const path = require('path');

const targets = [
  "components/admin/tour-form.tsx",
  "components/admin/destination-form.tsx",
  "components/admin/attraction-form.tsx",
  "components/admin/hero-form.tsx",
  "components/admin/contact-info-form.tsx",
  "components/admin/homepage-cards/card-form.tsx",
  "components/admin/homepage-cards/card-list.tsx",
  "components/admin/category/adventure-category-client.tsx",
  "components/admin/category/adventure-category-preview.tsx",
  "components/admin/image-uploader.tsx",
  "components/admin/destination-delete-button.tsx",
  "components/admin/attraction-delete-button.tsx",
  "app/admin/hero/page.tsx",
  "app/admin/homepage-cards/page.tsx",
  "app/admin/contact-info/page.tsx",
  "app/admin/destinations/page.tsx",
  "app/admin/tours/page.tsx",
  "app/admin/tours/[id]/page.tsx",
  "app/admin/attractions/page.tsx",
  "app/admin/media/page.tsx",
  "app/admin/memories/page.tsx",
  "app/admin/dashboard/page.tsx"
];

for (const file of targets) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log("Not found:", file);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace label classes
  content = content.replace(/text-white\/70/g, 'text-admin-label');
  
  // Replace muted text (60, 50, 40)
  content = content.replace(/text-white\/60/g, 'text-admin-muted');
  content = content.replace(/text-white\/50/g, 'text-admin-muted');
  content = content.replace(/text-white\/40/g, 'text-admin-muted');
  
  // Replace text-white when used as a heading or text inside section. 
  // We must NOT replace text-white inside inputCls/textareaCls or placeholder-white/30.
  // We'll replace text-white in specific heading/paragraph combinations safely.
  content = content.replace(/text-white(?!(\/| placeholder-| bg-))/g, (match, p1, offset, string) => {
    // If it's part of inputCls it's usually `text-white placeholder-` or similar.
    // Let's explicitly check the surrounding context.
    const before = string.slice(Math.max(0, offset - 20), offset);
    const after = string.slice(offset + 10, offset + 30);
    if (before.includes('inputCls') || before.includes('textareaCls') || before.includes('selectCls') || after.includes('placeholder')) {
        return 'text-white';
    }
    // Also skip if inside `input` or `textarea` element
    if (before.match(/<(input|textarea|select).*className=/)) {
        return 'text-white';
    }
    // For headings and table cells and other texts, use admin-heading.
    // Wait, let's just make it text-admin-heading unless it's explicitly in input.
    // Actually, "text-base font-semibold text-white" is common for headings.
    return 'text-admin-heading';
  });

  // Replace section background and border
  content = content.replace(/bg-slate-900\/60/g, 'bg-admin-section-bg shadow-sm');
  content = content.replace(/bg-slate-900\/50/g, 'bg-admin-section-bg shadow-sm');
  content = content.replace(/border-white\/8/g, 'border-admin-section-border');
  content = content.replace(/border-white\/10(?! bg-slate-800)/g, 'border-admin-section-border');

  // Fix table headers / text
  content = content.replace(/text-white\/30/g, 'text-admin-muted');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Replaced classes in admin components.");
