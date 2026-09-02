import os

filepath = 'components/navbar.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacements = {
    'bg-[#FCF9F2]/95': 'bg-[var(--color-ivory)]/95',
    'border-[#C2C8C2]': 'border-[var(--color-border)]',
    'text-[#172C21]': 'text-[var(--color-forest)]',
    'text-[#424844]': 'text-[var(--color-text-muted)]',
    'hover:text-[#172C21]': 'hover:text-[var(--color-forest)]',
    'bg-[#FCF9F2]': 'bg-[var(--color-ivory)]',
    'shadow-[#172C21]': 'shadow-[var(--color-forest)]',
    'bg-[#172C21]': 'bg-[var(--color-forest-mid)]',
    'hover:bg-[#172C21]': 'hover:bg-[var(--color-forest-mid)]',
    'bg-[#D4AF37]': 'bg-[var(--color-accent-green)]',
    'hover:bg-[#2D4236]': 'hover:bg-[var(--color-forest)]',
    'text-[#1C1C18]': 'text-[var(--color-text)]',
    'border-[#E5E9E5]': 'border-[var(--color-border-light)]'
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Let's add WhatsApp button next to Enquire Now in desktop and mobile
desktop_cta = """            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-forest-mid)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-forest)] hover:shadow-lg hover:shadow-[var(--color-forest)]/20"
            >
              Plan Your Journey
            </a>"""

whatsapp_desktop = """            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-forest-mid)] bg-transparent px-6 py-2.5 text-sm font-semibold text-[var(--color-forest-mid)] transition-all hover:bg-[var(--color-forest-mid)] hover:text-white ml-3"
            >
              WhatsApp
            </a>"""

mobile_cta = """              <a
                href={enquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-[var(--color-forest-mid)] px-8 py-4 text-base font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Plan Your Journey
              </a>"""

whatsapp_mobile = """              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full border border-[var(--color-forest-mid)] bg-transparent px-8 py-4 text-base font-semibold text-[var(--color-forest-mid)] mt-4"
                onClick={() => setIsOpen(false)}
              >
                WhatsApp
              </a>"""

content = content.replace('Enquire Now', 'Plan Your Journey')
content = content.replace(desktop_cta, desktop_cta + '\n' + whatsapp_desktop)
content = content.replace(mobile_cta, mobile_cta + '\n' + whatsapp_mobile)

with open(filepath, 'w') as f:
    f.write(content)
