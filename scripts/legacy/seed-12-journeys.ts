import 'dotenv/config';
import { prisma } from './lib/prisma';

async function main() {
  const journeys = [
    {
      title: "Valley of Flowers",
      slug: "valley-of-flowers",
      category: "Treks",
      categorySlug: "treks",
      overview: "A vibrant carpet of alpine flowers. Lush green meadows. Snow-capped peaks.\nA UNESCO World Heritage site in the heart of Uttarakhand.",
      description: "<p>The Valley of Flowers is a vibrant and breathtaking national park in Uttarakhand. Known for its meadows of endemic alpine flowers and outstanding natural beauty, this trek is a must-do for nature lovers.</p>",
      shortDescription: "A FLORAL PARADISE",
      highlights: JSON.stringify([
        { icon: "Flower", text: "Walk through miles of blooming alpine flowers" },
        { icon: "Mountain", text: "Visit Hemkund Sahib, a high-altitude Sikh shrine" },
        { icon: "Waves", text: "Stunning views of the Pushpawati river" },
        { icon: "Map", text: "Explore a UNESCO World Heritage site" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Haridwar to Govindghat", bullets: ["Drive alongside Alaknanda river", "Overnight stay in Govindghat"] },
        { day: "2", title: "Govindghat to Ghangaria", bullets: ["Trek starts", "Steep ascent", "Arrive at Ghangaria base camp"] },
        { day: "3", title: "Valley of Flowers", bullets: ["Trek into the valley", "Witness the floral bloom", "Return to Ghangaria"] },
        { day: "4", title: "Hemkund Sahib", bullets: ["Steep trek to the Gurudwara", "Dip in the glacial lake", "Return to Ghangaria"] },
        { day: "5", title: "Ghangaria to Govindghat", bullets: ["Descend back", "Rest and relax"] },
        { day: "6", title: "Departure", bullets: ["Drive back to Haridwar", "Trip ends"] }
      ]),
      inclusions: JSON.stringify(["Accommodation", "Meals", "Transport", "Guide", "Permits"]),
      exclusions: JSON.stringify(["Personal gear", "Mules", "Snacks"]),
      tags: JSON.stringify(["Uttarakhand", "Nature", "Monsoon Trek"]),
      duration: "5N / 6D",
      difficulty: "Moderate",
      ageGroupMin: 12,
      season: "Jul - Aug",
      location: "Haridwar",
      meetingPoint: "Haridwar",
      maxGroupSize: 15,
      price: "12,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1626714485860-264024227c44?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Goechala Trek",
      slug: "goechala-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Close-up views of Mt. Kanchenjunga. Enchanting rhododendron forests. High altitude lakes.\nThe ultimate Sikkim trekking experience.",
      description: "<p>The Goechala Trek in Sikkim gets you up close to Mt. Kanchenjunga, the world's third highest peak. The trek takes you through dense rhododendron forests and high altitude meadows.</p>",
      shortDescription: "FACE TO FACE WITH KANCHENJUNGA",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Stunning sunrise views over Kanchenjunga from View Point 1" },
        { icon: "Tree", text: "Walk through enchanting rhododendron forests" },
        { icon: "Tent", text: "Camp at high altitude meadows like Dzongri" },
        { icon: "Waves", text: "See the beautiful Samiti Lake" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Arrival in Yuksom", bullets: ["Drive from NJP/Bagdogra", "Briefing at basecamp"] },
        { day: "2", title: "Yuksom to Sachen", bullets: ["Trek through dense forests", "Cross suspension bridges"] },
        { day: "3", title: "Sachen to Tshoka", bullets: ["Steep climb", "First views of snow peaks"] },
        { day: "4", title: "Tshoka to Dzongri", bullets: ["Walk through rhododendron", "Acclimatization"] },
        { day: "5", title: "Dzongri Top", bullets: ["Early morning hike for sunrise", "Rest day"] },
        { day: "6", title: "Dzongri to Thansing", bullets: ["Descend and climb", "Camp at Thansing"] },
        { day: "7", title: "Thansing to Lamuney", bullets: ["Short trek", "Prepare for summit day"] },
        { day: "8", title: "Goechala Viewpoint", bullets: ["Midnight start", "Sunrise at View Point 1", "Return to Thansing"] },
        { day: "9", title: "Thansing to Tshoka", bullets: ["Long descent"] },
        { day: "10", title: "Tshoka to Yuksom", bullets: ["Return to base camp"] },
        { day: "11", title: "Departure", bullets: ["Drive back to NJP"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Permits", "Guides", "Transport from NJP"]),
      exclusions: JSON.stringify(["Personal gear", "Offloading", "Travel to NJP"]),
      tags: JSON.stringify(["Sikkim", "High Altitude", "Kanchenjunga"]),
      duration: "10N / 11D",
      difficulty: "Difficult",
      ageGroupMin: 15,
      season: "Apr - May, Sep - Nov",
      location: "Yuksom",
      meetingPoint: "NJP / Bagdogra",
      maxGroupSize: 12,
      price: "18,900",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1589417032733-14979313dbde?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Chadar Trek",
      slug: "chadar-trek",
      category: "Expeditions",
      categorySlug: "expeditions",
      overview: "Walking on a frozen river. Extreme sub-zero temperatures. Deep gorges.\nThe most thrilling winter expedition in Ladakh.",
      description: "<p>The Chadar Trek involves walking on the frozen Zanskar River in Ladakh during the harsh winter. It is an ultimate test of endurance in temperatures dropping to -30°C.</p>",
      shortDescription: "THE FROZEN RIVER EXPEDITION",
      highlights: JSON.stringify([
        { icon: "Waves", text: "Walk on the frozen Zanskar river (Chadar)" },
        { icon: "Tent", text: "Camp in caves and river banks in sub-zero temps" },
        { icon: "Mountain", text: "Witness frozen waterfalls like Nerak" },
        { icon: "Users", text: "Experience the unique winter life of Zanskari people" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Arrival in Leh", bullets: ["Acclimatization", "Rest day"] },
        { day: "2", title: "Medical Checkup", bullets: ["Mandatory health check", "Permit sorting"] },
        { day: "3", title: "Leh to Shingra Koma", bullets: ["Drive to starting point", "First walk on ice", "Camp at Tsomo Paldar"] },
        { day: "4", title: "Trek to Tibb Cave", bullets: ["Walk through narrow gorges", "Camp near caves"] },
        { day: "5", title: "Trek to Nerak", bullets: ["See the giant frozen waterfall", "Coldest night of the trek"] },
        { day: "6", title: "Nerak to Tibb Cave", bullets: ["Retrace steps", "Observe changing ice patterns"] },
        { day: "7", title: "Tibb Cave to Leh", bullets: ["Last day on ice", "Drive back to Leh"] },
        { day: "8", title: "Departure", bullets: ["Fly out of Leh"] }
      ]),
      inclusions: JSON.stringify(["Accommodation in Leh", "Tents/Sleeping bags", "Meals", "Guides & Porters", "Permits"]),
      exclusions: JSON.stringify(["Flights to Leh", "ALTOA fees", "Personal gear"]),
      tags: JSON.stringify(["Ladakh", "Winter", "Extreme", "Frozen River"]),
      duration: "7N / 8D",
      difficulty: "Difficult",
      ageGroupMin: 18,
      season: "Jan - Feb",
      location: "Leh",
      meetingPoint: "Leh",
      maxGroupSize: 10,
      price: "24,000",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1548679847-38e9ed301593?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f9?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1548679847-38e9ed301593?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Hampta Pass Trek",
      slug: "hampta-pass-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Lush green Kullu valley on one side. Barren desert of Lahaul on the other.\nA dramatic crossover trek in Himachal.",
      description: "<p>Hampta Pass offers a dramatic change in landscapes. You start in the lush green Kullu Valley and cross over into the stark, barren landscapes of Lahaul & Spiti.</p>",
      shortDescription: "A DRAMATIC CROSSOVER",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Cross the Hampta Pass at 14,000 ft" },
        { icon: "Tree", text: "Contrast between Kullu and Lahaul valleys" },
        { icon: "Waves", text: "Camp at Balu ka Ghera and Shea Goru" },
        { icon: "Map", text: "Visit the stunning Chandratal Lake" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Manali to Jobra", bullets: ["Drive from Manali", "Short trek to Chika"] },
        { day: "2", title: "Chika to Balu ka Ghera", bullets: ["Walk along the river", "Meadows full of flowers"] },
        { day: "3", title: "Balu ka Ghera to Shea Goru", bullets: ["Cross Hampta Pass", "Steep descent into Lahaul"] },
        { day: "4", title: "Shea Goru to Chatru", bullets: ["Cross the cold river", "Arrive at roadhead"] },
        { day: "5", title: "Chandratal & Return", bullets: ["Drive to Chandratal Lake", "Return to Manali"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Transport from Manali", "Guides"]),
      exclusions: JSON.stringify(["Travel to Manali", "Offloading", "Snacks"]),
      tags: JSON.stringify(["Himachal", "Crossover", "Moderate"]),
      duration: "4N / 5D",
      difficulty: "Moderate",
      ageGroupMin: 12,
      season: "Jun - Sep",
      location: "Manali",
      meetingPoint: "Manali",
      maxGroupSize: 15,
      price: "9,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1627914436573-04dc32b7bbd3?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1627914436573-04dc32b7bbd3?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Sandakphu Phalut Trek",
      slug: "sandakphu-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Views of four of the five highest peaks in the world. Sleeping Buddha range.\nA trek along the India-Nepal border.",
      description: "<p>Sandakphu is the highest peak in West Bengal. This trek offers majestic views of Everest, Kanchenjunga, Lhotse, and Makalu.</p>",
      shortDescription: "THE SLEEPING BUDDHA VIEW",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Witness 4 of the 5 highest peaks in the world" },
        { icon: "Map", text: "Trek along the India-Nepal border" },
        { icon: "Tree", text: "Walk through Singalila National Park" },
        { icon: "Tent", text: "Stay in tea houses and camps" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Arrival in Kopidana", bullets: ["Drive from NJP", "Base camp briefing"] },
        { day: "2", title: "Kopidana to Tumling", bullets: ["Trek through forests", "Enter Nepal briefly"] },
        { day: "3", title: "Tumling to Kalipokhri", bullets: ["Walk through Singalila", "See the black lake"] },
        { day: "4", title: "Kalipokhri to Sandakphu", bullets: ["Steep climb", "Sunset views of Kanchenjunga"] },
        { day: "5", title: "Sandakphu to Phalut", bullets: ["Long walk on the ridge", "Closest views of the peaks"] },
        { day: "6", title: "Phalut to Gorkhey", bullets: ["Descend through bamboo forests", "Stay in the beautiful village"] },
        { day: "7", title: "Gorkhey to Sepi", bullets: ["Short walk", "Drive back to NJP"] }
      ]),
      inclusions: JSON.stringify(["Accommodation", "Meals", "Transport from NJP", "Permits", "Guides"]),
      exclusions: JSON.stringify(["Personal expenses", "Offloading"]),
      tags: JSON.stringify(["West Bengal", "Views", "Tea House"]),
      duration: "6N / 7D",
      difficulty: "Moderate",
      ageGroupMin: 10,
      season: "Oct - Apr",
      location: "Darjeeling",
      meetingPoint: "NJP / Bagdogra",
      maxGroupSize: 15,
      price: "11,800",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1543886526-724d1a1006fc?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f9?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1543886526-724d1a1006fc?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Rupin Pass Trek",
      slug: "rupin-pass-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Surprise views at every turn. Glacial valleys. Hanging villages.\nA classic cross-over trek from Uttarakhand to Himachal.",
      description: "<p>Rupin Pass is known for its ever-changing scenery. You start in Uttarakhand and end in Himachal Pradesh, witnessing hanging villages, lush meadows, and thrilling snow bridges.</p>",
      shortDescription: "A TREK OF CONSTANT SURPRISES",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Cross the thrilling Rupin Pass at 15,250 ft" },
        { icon: "Map", text: "Start in Uttarakhand, end in Himachal" },
        { icon: "Waves", text: "Camp near the stunning Rupin waterfall" },
        { icon: "Tree", text: "Walk through pine forests and snow bridges" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Dehradun to Dhaula", bullets: ["Drive to base camp"] },
        { day: "2", title: "Dhaula to Sewa", bullets: ["Walk through apple orchards", "Village stay"] },
        { day: "3", title: "Sewa to Bawta", bullets: ["Cross state borders", "Hanging villages"] },
        { day: "4", title: "Bawta to Jakha", bullets: ["Highest village of the trek"] },
        { day: "5", title: "Jakha to Danderas Thatch", bullets: ["Enter glacial valley", "Camp near waterfall"] },
        { day: "6", title: "Danderas Thatch to Upper Waterfall", bullets: ["Climb alongside the fall", "Acclimatization"] },
        { day: "7", title: "Cross Rupin Pass", bullets: ["Steep climb through snow gulley", "Descend to Ronti Gad"] },
        { day: "8", title: "Ronti Gad to Sangla", bullets: ["Long descent", "Drive to Shimla"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Guides", "Permits", "Transport from Dehradun"]),
      exclusions: JSON.stringify(["Travel to Dehradun", "Personal gear", "Offloading"]),
      tags: JSON.stringify(["Crossover", "High Altitude", "Snow"]),
      duration: "7N / 8D",
      difficulty: "Difficult",
      ageGroupMin: 15,
      season: "May - Jun, Sep - Oct",
      location: "Dhaula",
      meetingPoint: "Dehradun",
      maxGroupSize: 12,
      price: "16,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Brahmatal Trek",
      slug: "brahmatal-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Frozen lakes. Snow-covered trails. Majestic views of Mt. Trishul & Nanda Ghunti.\nA perfect winter wonderland trek.",
      description: "<p>Brahmatal is one of the rare Himalayan treks accessible in peak winter. It offers unparalleled views of the Garhwal mountains and takes you to the frozen Brahmatal lake.</p>",
      shortDescription: "A WINTER WONDERLAND",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Close up views of Mt. Trishul & Nanda Ghunti" },
        { icon: "Waves", text: "Visit the frozen Bekaltal and Brahmatal lakes" },
        { icon: "Tree", text: "Walk through centuries-old oak forests" },
        { icon: "Tent", text: "Camp on snow-covered meadows" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Kathgodam to Lohajung", bullets: ["Drive through Kumaon", "Base camp briefing"] },
        { day: "2", title: "Lohajung to Bekaltal", bullets: ["Trek through oak forests", "Camp near frozen lake"] },
        { day: "3", title: "Bekaltal to Brahmatal", bullets: ["Walk on snow ridges", "Spectacular mountain views"] },
        { day: "4", title: "Brahmatal Top", bullets: ["Summit climb", "360-degree views", "Return to camp"] },
        { day: "5", title: "Brahmatal to Lohajung", bullets: ["Descend back to base"] },
        { day: "6", title: "Departure", bullets: ["Drive back to Kathgodam"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Guides", "Permits", "Transport from Kathgodam"]),
      exclusions: JSON.stringify(["Travel to Kathgodam", "Offloading"]),
      tags: JSON.stringify(["Winter Trek", "Snow", "Uttarakhand"]),
      duration: "5N / 6D",
      difficulty: "Moderate",
      ageGroupMin: 12,
      season: "Dec - Mar",
      location: "Lohajung",
      meetingPoint: "Kathgodam",
      maxGroupSize: 15,
      price: "9,000",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1548679847-38e9ed301593?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f9?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1548679847-38e9ed301593?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Kedarkantha Winter Trek",
      slug: "kedarkantha-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Beautiful campsites. Snow-draped pine forests. A thrilling summit climb.\nThe most popular winter trek for beginners.",
      description: "<p>Kedarkantha is the perfect trek for winter snow and summit thrill. The campsites are breathtakingly beautiful, surrounded by tall pine trees covered in fresh snow.</p>",
      shortDescription: "THE ULTIMATE WINTER SUMMIT",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Thrilling summit climb at 12,500 ft" },
        { icon: "Tree", text: "Walk through snowy pine and oak forests" },
        { icon: "Tent", text: "Stay at the stunning Juda Ka Talab campsite" },
        { icon: "Map", text: "Panoramic views of Swargarohini & Bandarpoonch" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Dehradun to Sankri", bullets: ["Drive through Mussoorie", "Reach base camp"] },
        { day: "2", title: "Sankri to Juda Ka Talab", bullets: ["Trek through pine forests", "Camp near frozen lake"] },
        { day: "3", title: "Juda Ka Talab to Base Camp", bullets: ["Short trek", "Prepare for summit"] },
        { day: "4", title: "Summit and descent", bullets: ["Early morning climb", "Watch sunrise from top", "Descend to Hargaon"] },
        { day: "5", title: "Hargaon to Sankri", bullets: ["Walk through apple orchards", "Reach base camp"] },
        { day: "6", title: "Departure", bullets: ["Drive back to Dehradun"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Guides", "Permits", "Transport from Dehradun"]),
      exclusions: JSON.stringify(["Travel to Dehradun", "Offloading"]),
      tags: JSON.stringify(["Winter Trek", "Beginner Friendly", "Snow"]),
      duration: "5N / 6D",
      difficulty: "Easy-Moderate",
      ageGroupMin: 10,
      season: "Dec - Apr",
      location: "Sankri",
      meetingPoint: "Dehradun",
      maxGroupSize: 15,
      price: "8,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Tarsar Marsar Trek",
      slug: "tarsar-marsar-trek",
      category: "Treks",
      categorySlug: "treks",
      overview: "Twin alpine lakes. Vast meadows of Kashmir. Pure serenity.\nCamp right by the shores of pristine blue lakes.",
      description: "<p>Tarsar Marsar is an incredibly beautiful trek in Kashmir. Unlike other treks, here you get to camp right next to the stunning almond-shaped alpine lakes.</p>",
      shortDescription: "THE TWIN LAKES OF KASHMIR",
      highlights: JSON.stringify([
        { icon: "Waves", text: "Camp right by the shores of Tarsar lake" },
        { icon: "Map", text: "Explore the hidden Marsar lake" },
        { icon: "Tent", text: "Walk through endless Kashmiri meadows" },
        { icon: "Mountain", text: "Experience true tranquility" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Arrival in Srinagar", bullets: ["Drive to Aru base camp"] },
        { day: "2", title: "Aru to Lidderwat", bullets: ["Trek alongside Lidder river", "Camp at Lidderwat"] },
        { day: "3", title: "Lidderwat to Shekwas", bullets: ["Climb through meadows", "Stunning valley views"] },
        { day: "4", title: "Shekwas to Tarsar", bullets: ["Reach the first lake", "Camp by the water"] },
        { day: "5", title: "Tarsar to Sundarsar", bullets: ["Cross Sonmasti pass", "Camp near Sundarsar"] },
        { day: "6", title: "Visit Marsar & descend", bullets: ["See Marsar lake", "Descend to Homwas"] },
        { day: "7", title: "Homwas to Aru", bullets: ["Return to base camp", "Drive to Srinagar"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Guides", "Transport from Srinagar"]),
      exclusions: JSON.stringify(["Travel to Srinagar", "Offloading"]),
      tags: JSON.stringify(["Kashmir", "Lakes", "Moderate"]),
      duration: "6N / 7D",
      difficulty: "Moderate",
      ageGroupMin: 12,
      season: "Jul - Sep",
      location: "Aru",
      meetingPoint: "Srinagar",
      maxGroupSize: 15,
      price: "15,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1570805128076-2e80ebbece3e?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Dzükou Valley Trek",
      slug: "dzukou-valley",
      category: "Backpacking",
      categorySlug: "backpacking",
      overview: "Rolling green hills. Endemic lilies. Pristine streams.\nThe most famous trekking destination in Northeast India.",
      description: "<p>Located at the border of Nagaland and Manipur, Dzükou Valley looks like it's straight out of a fairy tale. The valley is famous for its rolling green hills and the rare Dzükou Lily.</p>",
      shortDescription: "VALLEY OF FLOWERS OF THE NORTHEAST",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Walk through undulating green hills" },
        { icon: "Flower", text: "Spot the rare endemic Dzükou Lily" },
        { icon: "Waves", text: "Relax by pristine, crystal-clear streams" },
        { icon: "Users", text: "Experience Naga culture in Kohima" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Dimapur to Kohima", bullets: ["Arrive in Dimapur", "Drive to Kohima", "Explore local market"] },
        { day: "2", title: "Kohima to Dzükou", bullets: ["Drive to Viswema", "Steep climb", "Walk into the valley"] },
        { day: "3", title: "Explore the Valley", bullets: ["Hike to the caves", "Walk along the streams", "Photography"] },
        { day: "4", title: "Dzükou to Kohima", bullets: ["Descend via Jakhama", "Return to Kohima"] },
        { day: "5", title: "Departure", bullets: ["Visit Kisama Heritage village", "Drive back to Dimapur"] }
      ]),
      inclusions: JSON.stringify(["Homestays/Dormitories", "Meals", "Transport", "Guide", "Permits"]),
      exclusions: JSON.stringify(["Travel to Dimapur", "Personal expenses"]),
      tags: JSON.stringify(["Nagaland", "Short Trek", "Greenery"]),
      duration: "4N / 5D",
      difficulty: "Easy-Moderate",
      ageGroupMin: 10,
      season: "Jun - Sep",
      location: "Kohima",
      meetingPoint: "Dimapur",
      maxGroupSize: 12,
      price: "12,000",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1549479328-765cc4e3f360?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1549479328-765cc4e3f360?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Pin Parvati Pass",
      slug: "pin-parvati-pass",
      category: "Expeditions",
      categorySlug: "expeditions",
      overview: "Lush Parvati valley. High altitude crossing. Barren Pin valley.\nOne of the most challenging trans-Himalayan treks.",
      description: "<p>Connecting the verdant Parvati Valley in Kullu to the stark, barren Pin Valley in Spiti, this trek is long, arduous, and incredibly rewarding.</p>",
      shortDescription: "THE ULTIMATE CROSSOVER CHALLENGE",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Cross the mighty Pin Parvati Pass at 17,500 ft" },
        { icon: "Waves", text: "Soak in hot springs at Kheerganga and Mantalai" },
        { icon: "Tree", text: "Walk through dense forests and glaciers" },
        { icon: "Tent", text: "Experience massive landscape changes" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Bhuntar to Barshaini", bullets: ["Drive to roadhead", "Trek to Kheerganga"] },
        { day: "2", title: "Kheerganga to Tunda Bhuj", bullets: ["Walk through gorges", "Camp in meadows"] },
        { day: "3", title: "Tunda Bhuj to Thakur Kuan", bullets: ["Cross multiple streams", "Enter high altitude"] },
        { day: "4", title: "Thakur Kuan to Odi Thatch", bullets: ["Cross Pandu Bridge", "Vast meadows"] },
        { day: "5", title: "Odi Thatch to Mantalai", bullets: ["Reach the glacial lake", "High altitude camping"] },
        { day: "6", title: "Mantalai to Base Camp", bullets: ["Steep climb on moraine", "Camp near glacier"] },
        { day: "7", title: "Cross the Pass", bullets: ["Early morning climb", "Cross pass", "Enter Spiti", "Camp at Pin base"] },
        { day: "8", title: "Pin Base to Mudh", bullets: ["Long walk in barren valley", "Reach Mudh village"] },
        { day: "9", title: "Mudh to Manali", bullets: ["Drive via Kaza and Rohtang", "Trip ends"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Guides", "Permits", "Transport"]),
      exclusions: JSON.stringify(["Travel to Bhuntar", "Personal gear"]),
      tags: JSON.stringify(["Expedition", "Crossover", "Difficult"]),
      duration: "8N / 9D",
      difficulty: "Difficult",
      ageGroupMin: 18,
      season: "Jul - Sep",
      location: "Parvati Valley",
      meetingPoint: "Bhuntar",
      maxGroupSize: 10,
      price: "28,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1627914436573-04dc32b7bbd3?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1627914436573-04dc32b7bbd3?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    },
    {
      title: "Har Ki Dun",
      slug: "har-ki-dun",
      category: "Treks",
      categorySlug: "treks",
      overview: "Ancient villages. Supin river valley. Majestic Swargarohini peaks.\nA walk through the mythological Valley of Gods.",
      description: "<p>Har Ki Dun is a cradle-shaped hanging valley in the Garhwal Himalayas. Rich in flora, fauna, and mythology, it's one of the oldest trekking routes in India.</p>",
      shortDescription: "THE VALLEY OF GODS",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Stunning views of Swargarohini peak" },
        { icon: "Map", text: "Visit ancient Himalayan villages like Osla" },
        { icon: "Tree", text: "Walk along the beautiful Supin river" },
        { icon: "Tent", text: "Camp in the lush green valley" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Dehradun to Sankri", bullets: ["Drive to basecamp", "Briefing"] },
        { day: "2", title: "Sankri to Pauni Garaat", bullets: ["Drive to Taluka", "Trek through forests", "Camp alongside river"] },
        { day: "3", title: "Pauni Garaat to Kalkatiyadhar", bullets: ["Pass through ancient Osla village", "Steep climb to meadows"] },
        { day: "4", title: "Kalkatiyadhar to Har Ki Dun", bullets: ["Trek to the valley", "Explore the area", "Return to camp"] },
        { day: "5", title: "Kalkatiyadhar to Pauni Garaat", bullets: ["Descend back", "Rest and relax"] },
        { day: "6", title: "Pauni Garaat to Sankri", bullets: ["Trek to Taluka", "Drive to Sankri"] },
        { day: "7", title: "Departure", bullets: ["Drive back to Dehradun"] }
      ]),
      inclusions: JSON.stringify(["Tents", "Meals", "Guides", "Permits", "Transport from Dehradun"]),
      exclusions: JSON.stringify(["Travel to Dehradun", "Offloading"]),
      tags: JSON.stringify(["Uttarakhand", "Mythology", "River Valley"]),
      duration: "6N / 7D",
      difficulty: "Moderate",
      ageGroupMin: 10,
      season: "Apr - Jun, Sep - Dec",
      location: "Sankri",
      meetingPoint: "Dehradun",
      maxGroupSize: 15,
      price: "11,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
      ]),
      thumbnail: "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=800&q=80",
      publishStatus: "Published"
    }
  ];

  for (const pkg of journeys) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
    console.log(`Upserted package: ${pkg.title}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
