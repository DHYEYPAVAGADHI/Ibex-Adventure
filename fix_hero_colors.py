import os

filepath = 'sections/hero-section-client.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacements = {
    'text-[#D4AF37]': 'text-[var(--color-accent-green)]',
    'bg-[#172C21]': 'bg-[var(--color-forest)]',
    'bg-[#172C21]/30': 'bg-[var(--color-forest)]/30',
    'from-[#172C21]/80': 'from-[var(--color-forest)]/80',
    'via-[#172C21]/10': 'via-[var(--color-forest)]/10',
    'from-[#172C21]/55': 'from-[var(--color-forest)]/55',
    'bg-[#D4AF37]': 'bg-[var(--color-accent-green)]',
    'inline-flex items-center gap-2.5 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold text-[#172C21] transition-all hover:bg-[#FED65B] hover:shadow-xl hover:shadow-[#D4AF37]/30': 'inline-flex items-center gap-2.5 rounded-full bg-[var(--color-forest-mid)] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--color-forest)] hover:shadow-xl hover:shadow-[var(--color-forest-mid)]/30 group',
    '<ArrowRight className="h-4 w-4" />': '<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(filepath, 'w') as f:
    f.write(content)
