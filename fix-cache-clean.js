const fs = require('fs');

const files = [
  'app/api/admin/homepage-cards/route.ts',
  'app/api/admin/homepage-cards/[id]/route.ts',
  'app/api/admin/homepage-cards/reorder/route.ts',
  'app/api/admin/contact-info/route.ts',
  'app/api/admin/categories/route.ts',
  'app/api/admin/categories/[id]/route.ts',
  'app/api/admin/categories/reorder/route.ts'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Remove ALL revalidatePath("/", "layout");
  content = content.replace(/revalidatePath\("\/", "layout"\);\n\s*/g, '');

  // Add it specifically before return NextResponse.json(...) inside POST, PUT, DELETE
  // We can do this by regexing on the exact function blocks, but simpler is to just replace return NextResponse.json(...)
  // Wait, the easier way is to just inject it at the end of POST/PUT/DELETE.
  
  content = content.replace(/(export async function (?:POST|PUT|DELETE)[\s\S]*?)return NextResponse\.json\(([^)]+)\);/g, (match, p1, p2) => {
    if (p2.includes('{ error:')) return match; // don't revalidate on error returns
    return p1 + 'revalidatePath("/", "layout");\n    return NextResponse.json(' + p2 + ');';
  });

  fs.writeFileSync(file, content);
}
console.log("Done cleaning up revalidatePath");
