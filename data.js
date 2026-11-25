// =========================================================
// DATA.JS — Edit all your website content right here!
// You do NOT need to touch index.html or script.js to
// change dates, events, team members, or gallery items.
// =========================================================

const SITE_DATA = {
  // 1. Instagram Link (replace with your group's real Instagram URL later)
  instagramUrl: "https://instagram.com/your-group-handle",

  // 2. Countdown Target (Format: YYYY-MM-DDTHH:MM:SS)
  nextFeast: {
    title: "Winter Campus Feast 2026",
    date: "2026-12-20T17:00:00" // Dec 20, 2026 at 5:00 PM
  },

  // 3. Animated Counters (numbers count up smoothly when scrolled into view)
  stats: [
    { target: 12, suffix: "+", label: "Food & Craft Stalls" },
    { target: 40, suffix: "+", label: "Student Volunteers" },
    { target: 15, suffix: "+", label: "Live Competitions" },
    { target: 2500, suffix: "+", label: "Campus Visitors" }
  ],

  // 4. Events List ("upcoming" or "past" controls the filter buttons)
  // TIP: When you upload real photos into assets/images/ later,
  // put the path inside image: "assets/images/my-photo.jpg".
  // Leaving image: "" shows our custom built-in festival artwork!
  events: [
    {
      id: 1,
      title: "Starlight Indie & DJ Night",
      date: "Dec 20, 2026 • 7:00 PM",
      category: "upcoming",
      tag: "Main Stage",
      description: "Live student bands followed by an open-air DJ set under neon lights at the Main Quad.",
      image: "",
      artTheme: "concert"
    },
    {
      id: 2,
      title: "Campus Street Food Mela",
      date: "Dec 20, 2026 • 4:00 PM",
      category: "upcoming",
      tag: "Food & Stalls",
      description: "12 student-run stalls serving chaat, momos, cold coffee, waffles, and handmade crafts.",
      image: "",
      artTheme: "food"
    },
    {
      id: 3,
      title: "Midnight Treasure Hunt",
      date: "Dec 21, 2026 • 6:30 PM",
      category: "upcoming",
      tag: "Team Game",
      description: "Teams of 4 race across campus solving riddles, QR clues, and surprise mini-challenges.",
      image: "",
      artTheme: "neon"
    },
    {
      id: 4,
      title: "Freshers’ Welcome Carnival",
      date: "Sep 14, 2026",
      category: "past",
      tag: "Throwback",
      description: "Over 900 freshers joined for flash mobs, acoustic jams, and photo booths.",
      image: "",
      artTheme: "crowd"
    },
    {
      id: 5,
      title: "Battle of the Departments",
      date: "Aug 22, 2026",
      category: "past",
      tag: "Cultural",
      description: "Dance, drama, and street-play face-offs with the loudest cheering section of the year.",
      image: "",
      artTheme: "stage"
    },
    {
      id: 6,
      title: "Open Mic & Poetry Sunset",
      date: "Jul 30, 2026",
      category: "past",
      tag: "Arts",
      description: "An evening of stand-up comedy, spoken word, and acoustic guitars on the lawn.",
      image: "",
      artTheme: "sunset"
    }
  ],

  // 5. Team Members (Tap a card on the website to see what they manage!)
  team: [
    {
      id: 1,
      name: "Riya Verma",
      role: "Feast Convenor",
      initials: "RV",
      manages: "Overall festival planning, college permissions, stage schedule, and sponsor partnerships.",
      accent: "coral"
    },
    {
      id: 2,
      name: "Kabir Nair",
      role: "Stalls & Finance Lead",
      initials: "KN",
      manages: "Food stall bookings, budgets, coupon counters, and vendor setup on feast day.",
      accent: "gold"
    },
    {
      id: 3,
      name: "Ananya Das",
      role: "Media & Instagram Head",
      initials: "AD",
      manages: "Reels, event posters, photography crew, and live Instagram stories during the fest.",
      accent: "teal"
    },
    {
      id: 4,
      name: "Devansh Patel",
      role: "Logistics & Volunteers",
      initials: "DP",
      manages: "40+ student volunteers, sound systems, lighting rigs, and smooth crowd entry.",
      accent: "violet"
    }
  ],

  // 6. Gallery Moments (Tap to open the full-screen viewer!)
  gallery: [
    {
      id: 1,
      title: "Main Stage Glow",
      caption: "Last year’s headliner crowd waving phone flashlights during the finale.",
      image: "",
      artTheme: "concert"
    },
    {
      id: 2,
      title: "Food Alley Rush",
      caption: "Packed evening queues outside the student-run momo and waffle stalls.",
      image: "",
      artTheme: "food"
    },
    {
      id: 3,
      title: "Neon Dance Floor",
      caption: "Glowsticks and bass drops right after the cultural prize ceremony.",
      image: "",
      artTheme: "neon"
    },
    {
      id: 4,
      title: "Sunset Acoustic Jam",
      caption: "Golden hour melodies before the main stage lights turned on.",
      image: "",
      artTheme: "sunset"
    },
    {
      id: 5,
      title: "Volunteer Crew Huddle",
      caption: "The core team doing a final soundcheck 30 minutes before gates opened.",
      image: "",
      artTheme: "crowd"
    },
    {
      id: 6,
      title: "Street Play Finale",
      caption: "Standing ovation at the open-air amphitheatre.",
      image: "",
      artTheme: "stage"
    }
  ]
};
