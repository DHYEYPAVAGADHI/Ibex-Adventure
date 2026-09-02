const fs = require('fs');
const path = require('path');

const filePath = path.join('/Users/dhyey/Desktop/Ibex Adventure', 'app/journeys/[category]/[slug]/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Hero Subtitle and Paragraph
content = content.replace(
  /<h2 className="font-sans text-xl md:text-2xl font-bold uppercase text-white tracking-wide mb-6">\s*EXPERIENCE THE LAND BEYOND THE ROAD\.\s*<\/h2>/g,
  '<h2 className="font-sans text-xl md:text-2xl font-bold uppercase text-white tracking-wide mb-6">{pkg.shortDescription || "EXPERIENCE THE LAND BEYOND THE ROAD."}</h2>'
);

content = content.replace(
  /<p className="text-white\/90 text-sm md:text-base font-semibold leading-relaxed max-w-xl mb-4">\s*High passes\. Ancient monasteries\. Stark beauty\.<br\/>\s*Warm people\. Raw adventures\.\s*<\/p>/g,
  '<p className="text-white/90 text-sm md:text-base font-semibold leading-relaxed max-w-xl mb-4 whitespace-pre-line">{pkg.overview || "High passes. Ancient monasteries. Stark beauty.\\nWarm people. Raw adventures."}</p>'
);

// 2. Age group
content = content.replace(
  /<span className="text-sm font-bold text-white uppercase leading-tight">18\+<\/span>\s*<span className="text-\[10px\] font-bold uppercase tracking-widest text-white\/70">Age Group<\/span>/g,
  '<span className="text-sm font-bold text-white uppercase leading-tight">{pkg.ageGroupMin ? `${pkg.ageGroupMin}+` : "18+"}</span>\n                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Age Group</span>'
);

// 3. Overview Title and tags
content = content.replace(
  /<h2 className="font-sans text-3xl font-black text-\[#222\] mb-6">\s*Ladakh is not a place, it's an emotion\.\s*<\/h2>/g,
  '<h2 className="font-sans text-3xl font-black text-[#222] mb-6">{pkg.shortDescription || "Ladakh is not a place, it\'s an emotion."}</h2>'
);

content = content.replace(
  /<div className="text-\[15px\] font-medium leading-relaxed text-\[#555\] space-y-4 mb-8">\s*<p>\s*From the thrill of riding through the world's highest motorable passes to the\s*serenity of ancient monasteries, from starry nights in camps to heartfelt\s*conversations with locals - Ladakh changes you\.\s*<\/p>\s*<p>\s*This is more than a trip\. It's an experience\.\s*<\/p>\s*<\/div>/g,
  `<div className="text-[15px] font-medium leading-relaxed text-[#555] space-y-4 mb-8">
                    {pkg.description ? (
                      <div dangerouslySetInnerHTML={{ __html: pkg.description }} />
                    ) : (
                      <>
                        <p>
                          From the thrill of riding through the world's highest motorable passes to the
                          serenity of ancient monasteries, from starry nights in camps to heartfelt
                          conversations with locals - Ladakh changes you.
                        </p>
                        <p>
                          This is more than a trip. It's an experience.
                        </p>
                      </>
                    )}
                  </div>`
);

content = content.replace(
  /\{\['Adventure', 'Culture', 'Mountains', 'Monasteries', 'Local Life'\]\.map\(\(tag\) => \(/g,
  `{(safeParse(pkg.tags, ['Adventure', 'Culture', 'Mountains', 'Monasteries', 'Local Life']) as string[]).map((tag) => (`
);

// 4. Highlights
content = content.replace(
  /\{\[\s*\{ icon: <Mountain className="w-5 h-5 text-\[#86A857\]" \/>, text: "Ride through Khardung La - one of the world's highest motorable passes\." \},\s*\{ icon: <Waves className="w-5 h-5 text-\[#86A857\]" \/>, text: "Visit breathtaking lakes - Pangong Tso, Tso Moriri & more\." \},\s*\{ icon: <Landmark className="w-5 h-5 text-\[#86A857\]" \/>, text: "Explore ancient monasteries and learn Buddhist culture\." \},\s*\{ icon: <Coffee className="w-5 h-5 text-\[#86A857\]" \/>, text: "Experience local life, food and warm hospitality\." \},\s*\{ icon: <Tent className="w-5 h-5 text-\[#86A857\]" \/>, text: "Camp under a sky full of stars\." \},\s*\{ icon: <Map className="w-5 h-5 text-\[#86A857\]" \/>, text: "Build resilience, leadership and lifelong memories\." \}\s*\]\.map\(\(item, i\) => \(\s*<li key=\{i\} className="flex gap-4">\s*<div className="shrink-0 mt-0\.5">\{item\.icon\}<\/div>\s*<span className="text-\[13px\] font-semibold text-\[#444\] leading-snug">\{item\.text\}<\/span>\s*<\/li>\s*\)\)/g,
  `{(highlights.length > 0 ? highlights : [
                      "Ride through Khardung La - one of the world's highest motorable passes.",
                      "Visit breathtaking lakes - Pangong Tso, Tso Moriri & more.",
                      "Explore ancient monasteries and learn Buddhist culture.",
                      "Experience local life, food and warm hospitality.",
                      "Camp under a sky full of stars.",
                      "Build resilience, leadership and lifelong memories."
                    ]).map((item: any, i: number) => {
                      const text = typeof item === 'string' ? item : item.text;
                      return (
                        <li key={i} className="flex gap-4">
                          <div className="shrink-0 mt-0.5"><Check className="w-5 h-5 text-[#86A857]" /></div>
                          <span className="text-[13px] font-semibold text-[#444] leading-snug">{text}</span>
                        </li>
                      );
                    })}`
);

// 5. Itinerary
content = content.replace(
  /\{\[\s*\{ day: "1", title: "Arrival in Leh", icon: <Plane className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Arrive in Leh", "Acclimatization", "Leh local market", "Overnight in Leh"\] \},\s*\{ day: "2", title: "Leh Sightseeing", icon: <Landmark className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Thiksey Monastery", "Shey Palace", "Shanti Stupa", "Overnight in Leh"\] \},\s*\{ day: "3", title: "Leh to Nubra Valley", icon: <Car className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Khardung La Pass", "Diskit Monastery", "Hunder Sand Dunes", "Overnight in Nubra"\] \},\s*\{ day: "4", title: "Nubra to Pangong", icon: <Mountain className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Agham - Shyok route", "Pangong Tso Lake", "Sunset by the lake", "Overnight in Camps"\] \},\s*\{ day: "5", title: "Pangong to Tso Moriri", icon: <Waves className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Chang La Pass", "Tso Moriri Lake", "Scenic drives", "Overnight in Camps"\] \},\s*\{ day: "6", title: "Tso Moriri to Leh", icon: <Map className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Scenic route via Mahe", "Explore enroute", "Overnight in Leh"\] \},\s*\{ day: "7", title: "Leh - Local Experience", icon: <Users className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Village visit", "Local interactions", "Learning & sharing", "Overnight in Leh"\] \},\s*\{ day: "8", title: "Departure", icon: <Plane className="w-4 h-4 text-\[#5D7C3F\]" \/>, bullets: \["Check-out", "Drop at airport", "Journey back with memories"\] \}\s*\]\.map\(\(node, i\) => \(\s*<div key=\{i\} className="flex flex-col items-center w-\[160px\] relative z-10 px-2">\s*<div className="w-10 h-10 rounded-full bg-white border-2 border-\[#5D7C3F\] flex items-center justify-center mb-4">\s*\{node\.icon\}\s*<\/div>\s*<div className="text-center mb-4">\s*<span className="block text-\[10px\] font-bold uppercase tracking-widest text-\[#666\] mb-1">DAY \{node\.day\}<\/span>\s*<span className="block text-xs font-bold text-\[#222\] leading-tight px-2">\{node\.title\}<\/span>\s*<\/div>\s*<ul className="text-\[11px\] text-\[#666\] font-medium leading-relaxed text-center space-y-1">\s*\{node\.bullets\.map\(\(b, idx\) => <li key=\{idx\}>• \{b\}<\/li>\)\}\s*<\/ul>\s*<\/div>\s*\)\)/g,
  `{(itinerary.length > 0 ? itinerary : [
                    { day: "1", title: "Arrival in Leh", bullets: ["Arrive in Leh", "Acclimatization", "Leh local market", "Overnight in Leh"] },
                    { day: "2", title: "Leh Sightseeing", bullets: ["Thiksey Monastery", "Shey Palace", "Shanti Stupa", "Overnight in Leh"] },
                    { day: "3", title: "Leh to Nubra Valley", bullets: ["Khardung La Pass", "Diskit Monastery", "Hunder Sand Dunes", "Overnight in Nubra"] },
                    { day: "4", title: "Nubra to Pangong", bullets: ["Agham - Shyok route", "Pangong Tso Lake", "Sunset by the lake", "Overnight in Camps"] },
                    { day: "5", title: "Pangong to Tso Moriri", bullets: ["Chang La Pass", "Tso Moriri Lake", "Scenic drives", "Overnight in Camps"] },
                    { day: "6", title: "Tso Moriri to Leh", bullets: ["Scenic route via Mahe", "Explore enroute", "Overnight in Leh"] },
                    { day: "7", title: "Leh - Local Experience", bullets: ["Village visit", "Local interactions", "Learning & sharing", "Overnight in Leh"] },
                    { day: "8", title: "Departure", bullets: ["Check-out", "Drop at airport", "Journey back with memories"] }
                  ]).map((node: any, i: number) => (
                    <div key={i} className="flex flex-col items-center w-[160px] relative z-10 px-2">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-[#5D7C3F] flex items-center justify-center mb-4">
                        <MapPin className="w-4 h-4 text-[#5D7C3F]" />
                      </div>
                      <div className="text-center mb-4">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-[#666] mb-1">DAY {node.day}</span>
                        <span className="block text-xs font-bold text-[#222] leading-tight px-2">{node.title}</span>
                      </div>
                      <ul className="text-[11px] text-[#666] font-medium leading-relaxed text-center space-y-1">
                        {(node.bullets || []).map((b: string, idx: number) => <li key={idx}>• {b}</li>)}
                      </ul>
                    </div>
                  ))`
);

// 6. Inclusions
content = content.replace(
  /\{\[\s*"Accommodation \(Hotel\/Camps\)",\s*"All meals \(Veg \+ Egg\)",\s*"Transportation \(Leh to Leh\)",\s*"Inner line permits",\s*"Sightseeing & entry fees",\s*"Experienced trip leader",\s*"Basic first aid",\s*"IBEX trip Tshirt & cap"\s*\]\.map\(\(item, i\) => \(/g,
  `{(inclusions.length > 0 ? inclusions : [
                    "Accommodation (Hotel/Camps)",
                    "All meals (Veg + Egg)",
                    "Transportation (Leh to Leh)",
                    "Inner line permits",
                    "Sightseeing & entry fees",
                    "Experienced trip leader",
                    "Basic first aid",
                    "IBEX trip Tshirt & cap"
                  ]).map((item: any, i: number) => (`
);

// 7. Exclusions
content = content.replace(
  /\{\[\s*"Travel to Leh & return",\s*"Lunch on Day 1",\s*"Personal expenses",\s*"Any adventure activities",\s*"Anything not mentioned in inclusions"\s*\]\.map\(\(item, i\) => \(/g,
  `{(exclusions.length > 0 ? exclusions : [
                    "Travel to Leh & return",
                    "Lunch on Day 1",
                    "Personal expenses",
                    "Any adventure activities",
                    "Anything not mentioned in inclusions"
                  ]).map((item: any, i: number) => (`
);

// 8. Trip Info
content = content.replace(
  /\{\[\s*\{ label: "Start Point", val: "Leh" \},\s*\{ label: "End Point", val: "Leh" \},\s*\{ label: "Trip Type", val: "Group Journey" \},\s*\{ label: "Group Size", val: "15 - 30 People" \},\s*\{ label: "Accommodation", val: "Hotel \/ Camps" \},\s*\{ label: "Difficulty Level", val: "High" \}\s*\]\.map\(\(item, i\) => \(/g,
  `{[
                    { label: "Start Point", val: pkg.meetingPoint || pkg.location || "Leh" },
                    { label: "End Point", val: pkg.location || "Leh" },
                    { label: "Trip Type", val: "Group Journey" },
                    { label: "Group Size", val: pkg.maxGroupSize ? \`Upto \${pkg.maxGroupSize} People\` : "15 - 30 People" },
                    { label: "Age Group", val: pkg.ageGroupMin ? \`\${pkg.ageGroupMin}+ Years\` : "18+" },
                    { label: "Difficulty Level", val: pkg.difficulty || "High" }
                  ].map((item, i) => (`
);


// 9. Gallery
content = content.replace(
  /\{\[1, 2, 3, 4\]\.map\(\(i\) => \(\s*<div key=\{i\} className="relative aspect-\[4\/3\] rounded-xl overflow-hidden bg-gray-200">\s*<Image src=\{\`https:\/\/images\.unsplash\.com\/photo-1526761122248-c31c93f8b2b9\?auto=format&fit=crop&w=400&q=80&sig=\$\{i\}\`\} alt="Gallery" fill className="object-cover" \/>\s*<\/div>\s*\)\)/g,
  `{(images.length > 0 ? images.slice(0,4) : [1, 2, 3, 4].map(i => \`https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=400&q=80&sig=\${i}\`)).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                  </div>
                ))}`
);


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Update complete!');
