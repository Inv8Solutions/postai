<template>
  <!-- FEATURES -->
  <section class="py-24 text-center" style="background: #eff6ff;" id="features">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5">
        <span>⭐</span> FEATURES
      </div>
      <h2 class="font-black text-gray-900 mb-3 leading-tight" style="font-size: clamp(26px, 3.8vw, 46px); letter-spacing: -1px;">
        Everything You Need to<br /><span class="text-blue-600">Stay Active on Facebook</span>
      </h2>
      <p class="text-lg text-gray-600 mb-12">PostAI handles the content, you focus on your customers.</p>

      <!-- Bento Grid -->
      <div class="grid text-left gap-4 mb-5" style="grid-template-columns: 1fr 1fr;">

        <!-- Large left cell: Post Consistently -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform" style="box-shadow: 0 4px 24px rgba(30,58,138,0.08);">
          <div class="flex items-start gap-3">
            <div class="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-xl shrink-0">📅</div>
            <div>
              <div class="text-base font-black text-gray-900">Post Consistently</div>
              <p class="text-sm text-gray-600 leading-relaxed">Plan and publish content automatically so your business stays visible every day.</p>
            </div>
          </div>
          <div class="text-xl text-blue-400 text-center">↓</div>

          <!-- Calendar mockup -->
          <div class="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1">
            <div class="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-200">
              <span class="text-xs font-bold text-gray-900">Content Calendar</span>
              <div class="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                Auto-publish <span class="bg-blue-600 text-white text-xs font-black px-2 py-0.5 rounded-full">ON</span>
              </div>
            </div>
            <div class="p-2.5 grid gap-1" style="grid-template-columns: repeat(7, 1fr);">
              <div v-for="day in days" :key="day" class="text-center text-gray-400 font-bold pb-1" style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.04em;">{{ day }}</div>
              <!-- Row of calendar cells -->
              <div class="rounded-lg overflow-hidden flex flex-col items-center justify-center gap-0.5 p-1" style="height: 76px; background: linear-gradient(135deg, #1d4ed8, #3b82f6);">
                <span style="font-size: 22px;">🍲</span>
                <span class="text-white" style="font-size: 9px;">9:00 AM</span>
                <span class="text-white font-bold text-center" style="font-size: 9px;">New Menu Alert!</span>
              </div>
              <div class="rounded-lg overflow-hidden flex flex-col items-center justify-center gap-0.5 p-1 bg-yellow-400" style="height: 76px;">
                <span class="bg-blue-700 text-white font-black text-center rounded px-1" style="font-size: 8px; padding: 2px 4px; line-height: 1.3;">PROMO 20% OFF</span>
                <span class="text-gray-900" style="font-size: 9px;">11:00 AM</span>
              </div>
              <div class="rounded-lg overflow-hidden flex flex-col items-center justify-center gap-0.5 p-1" style="height: 76px; background: linear-gradient(135deg, #0f4c75, #1282a2);">
                <span style="font-size: 22px;">🥗</span>
                <span class="text-white" style="font-size: 9px;">1:00 PM</span>
              </div>
              <div class="rounded-lg overflow-hidden flex flex-col items-center justify-center gap-0.5 p-1" style="height: 76px; background: #0f172a;">
                <span class="text-white font-black text-center" style="font-size: 8px; line-height: 1.3;">WE ARE OPEN!<br/>7AM–8PM</span>
                <span class="text-white" style="font-size: 9px;">12:00 PM</span>
              </div>
              <div class="rounded-lg overflow-hidden flex flex-col items-center justify-center gap-0.5 p-1" style="height: 76px; background: linear-gradient(135deg, #f59e0b, #fbbf24);">
                <span style="font-size: 22px;">🥤</span>
                <span class="text-white" style="font-size: 9px;">4:00 PM</span>
              </div>
              <div class="rounded-lg border-2 border-dashed border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 text-xl" style="height: 76px;">+</div>
              <div class="rounded-lg border-2 border-dashed border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 text-xl" style="height: 76px;">+</div>
            </div>
          </div>
        </div>

        <!-- Right column: 2 rows of 2 cells -->
        <div class="flex flex-col gap-4">
          <!-- Row 1 -->
          <div class="grid grid-cols-2 gap-4">

            <!-- AI-Powered Content -->
            <div class="bg-white rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform" style="box-shadow: 0 4px 24px rgba(30,58,138,0.08);">
              <div class="flex items-start gap-3">
                <div class="w-11 h-11 bg-yellow-100 rounded-xl flex items-center justify-center text-xl shrink-0">✍️</div>
                <div class="text-sm font-black text-gray-900">AI-Powered Content</div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">Get engaging captions and visuals tailored to your business.</p>
              <!-- Mini FB post -->
              <div class="border border-gray-200 rounded-xl overflow-hidden flex-1 relative">
                <div class="flex items-center gap-2 px-2.5 py-2">
                  <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs shrink-0">🍱</div>
                  <div>
                    <div class="text-xs font-bold text-gray-900">Lola's Carinderia</div>
                    <div class="text-gray-400" style="font-size: 10px;">Just now · 🌐</div>
                  </div>
                </div>
                <p class="text-xs text-gray-800 px-2.5 pb-2 leading-relaxed">Masarap na ulam, budget-friendly pa! 😋 Kain na sa Lola's today!</p>
                <div class="flex items-center justify-center" style="background: linear-gradient(135deg, #1d4ed8, #3b82f6); height: 56px; font-size: 28px;">🍜</div>
                <div class="absolute bottom-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-black">⦿</div>
              </div>
            </div>

            <!-- Review & Approve -->
            <div class="bg-white rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform" style="box-shadow: 0 4px 24px rgba(30,58,138,0.08);">
              <div class="flex items-start gap-3">
                <div class="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-lg shrink-0">👁️</div>
                <div class="text-sm font-black text-gray-900">Review &amp; Approve</div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">Preview your post and approve with one click before it goes live.</p>
              <div class="flex flex-col gap-2 flex-1">
                <div class="bg-gray-100 rounded-xl overflow-hidden">
                  <div class="flex items-center gap-1.5 p-2">
                    <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs shrink-0">🍱</div>
                    <div>
                      <div class="text-xs font-bold text-gray-900">Lola's Carinderia</div>
                      <div class="text-gray-400" style="font-size: 9px;">Just now · 🌐</div>
                    </div>
                  </div>
                  <div class="px-2 pb-2 text-xs font-black text-white leading-snug" style="background: linear-gradient(135deg, #0f172a, #1e3a8a); padding: 8px;">
                    NEW MENU ALERT! <span class="font-normal opacity-70">Try it today!</span>
                  </div>
                </div>
                <button class="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg">✓ Approve</button>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="grid grid-cols-2 gap-4">

            <!-- Smart Scheduling -->
            <div class="bg-white rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform" style="box-shadow: 0 4px 24px rgba(30,58,138,0.08);">
              <div class="flex items-start gap-3">
                <div class="w-11 h-11 bg-yellow-100 rounded-xl flex items-center justify-center text-xl shrink-0">🕐</div>
                <div class="text-sm font-black text-gray-900">Smart Scheduling &amp; Auto-Post</div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">We post at the best times to reach more customers.</p>
              <div class="flex flex-col items-center gap-2 mt-auto">
                <div class="relative inline-block">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <rect width="44" height="44" rx="22" fill="#1877F2"/>
                    <path d="M30 22h-5v-3.3c0-1.2 1-1.7 1.7-1.7H30V12h-4.4c-4.3 0-5.6 3.2-5.6 5.5V22H17v5.5h3V38h5.5V27.5H29L30 22z" fill="white"/>
                  </svg>
                  <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-white" style="font-size: 10px; font-weight: 900;">✓</div>
                </div>
                <div class="bg-gray-100 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 w-full text-center">
                  🕐 Best time: Today, 11:00 AM <span class="text-green-500">✓</span>
                </div>
              </div>
            </div>

            <!-- Stay Notified (dark) -->
            <div class="rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform" style="background: #1e40af; box-shadow: 0 4px 24px rgba(30,58,138,0.08);">
              <div class="flex items-start gap-3">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style="background: rgba(255,255,255,0.15);">🔔</div>
                <div class="text-sm font-black text-white">Stay Notified</div>
              </div>
              <p class="text-xs leading-relaxed" style="color: rgba(255,255,255,0.75);">Get alerts when your post goes live so you're always in the loop.</p>
              <!-- Phone notification -->
              <div class="rounded-xl p-3 mt-auto" style="background: #0f172a; border: 1.5px solid rgba(255,255,255,0.1);">
                <div class="flex justify-between text-xs mb-2.5" style="color: rgba(255,255,255,0.6);">
                  <span>9:41</span><span>Monday, May 12</span>
                </div>
                <div class="rounded-xl p-2.5 flex gap-2 items-start" style="background: rgba(255,255,255,0.1);">
                  <div class="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-sm shrink-0">📬</div>
                  <div>
                    <div class="flex justify-between text-white font-bold mb-0.5" style="font-size: 10px;">
                      <span>PostAI</span><span class="font-normal" style="color: rgba(255,255,255,0.5);">now</span>
                    </div>
                    <div class="text-white font-semibold" style="font-size: 11px;">Your post is now live! 🎉</div>
                    <div style="font-size: 10px; color: rgba(255,255,255,0.6);">Lola's Carinderia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTENT THEMES -->
  <section class="py-16 text-center" style="background: #eff6ff;">
    <div class="max-w-6xl mx-auto px-6">
      <div class="inline-block bg-yellow-100 text-blue-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Content Themes</div>
      <h2 class="text-3xl font-black text-gray-900 mb-10">Never Run Out of Things to Post</h2>
      <div class="flex flex-wrap gap-3 justify-center">
        <div v-for="chip in themes" :key="chip.label"
          class="border-2 rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all"
          :class="chip.active
            ? 'bg-blue-600 border-blue-600 text-white'
            : chip.coming
              ? 'bg-yellow-50 border-yellow-300 text-yellow-500'
              : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-600 hover:border-blue-600 hover:text-white'"
        >{{ chip.label }}</div>
      </div>
    </div>
  </section>

  <!-- WHO IT'S FOR -->
  <section class="py-24 bg-white text-center" id="who-its-for">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
        <span>👥</span> WHO IT'S FOR
      </div>
      <h2 class="font-black text-gray-900 mb-4 leading-tight" style="font-size: clamp(32px, 5vw, 58px); letter-spacing: -1.5px;">
        Built for Traditional<br />Filipino Businesses
      </h2>
      <p class="text-lg text-gray-600 mb-12 leading-relaxed">
        PostAI is designed for the everyday business owner<br />who wants to stay active on Facebook without the stress.
      </p>

      <!-- 5-card grid -->
      <div class="grid gap-4 mb-4" style="grid-template-columns: repeat(5, 1fr);">
        <div v-for="biz in businesses" :key="biz.name"
          class="bg-white border border-gray-200 rounded-2xl px-4 py-6 flex flex-col items-center gap-3 text-center cursor-default hover:border-blue-400 hover:-translate-y-1 transition-all"
          style="box-shadow: 0 2px 8px rgba(0,0,0,0.04);"
        >
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-4xl">{{ biz.emoji }}</div>
          <div class="text-sm font-black text-gray-900">{{ biz.name }}</div>
          <div class="text-xs text-gray-600 leading-snug">{{ biz.desc }}</div>
        </div>
      </div>

      <!-- Centered sari-sari card -->
      <div class="flex justify-center mb-12">
        <div class="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4 cursor-default hover:border-blue-400 hover:-translate-y-1 transition-all" style="max-width: 320px; width: 100%; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-4xl shrink-0">🏬</div>
          <div class="text-left">
            <div class="text-sm font-black text-gray-900">Sari-Sari Stores</div>
            <div class="text-xs text-gray-600">Announcements, reminders, and more.</div>
          </div>
        </div>
      </div>

      <!-- Dark quote banner -->
      <div class="rounded-2xl p-8 flex items-center gap-7 flex-wrap relative overflow-hidden text-left" style="background: #1e40af;">
        <div class="shrink-0" style="min-width: 160px;">
          <div class="font-black text-white/15 leading-none mb-2" style="font-size: 56px; font-family: Georgia, serif;">"</div>
          <div class="text-xl font-black text-white">Sound familiar?</div>
          <div class="text-xl font-black text-yellow-400">PostAI is the easier way.</div>
        </div>
        <div class="w-px h-20 shrink-0" style="background: rgba(255,255,255,0.15);"></div>
        <div class="flex gap-3 flex-1 flex-wrap">
          <div v-for="quote in quotes" :key="quote.text" class="rounded-xl p-3.5 flex flex-col gap-1.5 flex-1" style="background: rgba(255,255,255,0.1); min-width: 140px;">
            <span class="font-black text-yellow-400 leading-none" style="font-size: 24px; font-family: Georgia, serif;">"</span>
            <p class="text-sm font-bold text-white leading-snug">{{ quote.text }}</p>
            <span class="text-xs" style="color: rgba(255,255,255,0.5);">— {{ quote.attr }}</span>
          </div>
        </div>
        <div class="w-full border-t pt-4 flex items-center justify-center gap-2 text-sm flex-wrap" style="border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85);">
          <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</div>
          If any of these sound familiar, PostAI was made for you.
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const themes = [
  { label: '🍺 Promo', active: true },
  { label: '📣 Announcement' },
  { label: '🎄 Holiday Greeting' },
  { label: '💡 Tips & Advice' },
  { label: '📱 General Update' },
  { label: '✨ More coming in V2', coming: true },
];

const businesses = [
  { emoji: '🏪', name: 'Carinderias',        desc: 'Daily specials, new dishes, and promos.' },
  { emoji: '✂️', name: 'Salons & Barbers',   desc: 'New styles, services, and booking updates.' },
  { emoji: '🔧', name: 'Hardware Stores',     desc: 'New stocks, tools, and helpful tips.' },
  { emoji: '🍻', name: 'Resto-Bars',          desc: 'Events, live music, and food promos.' },
  { emoji: '👗', name: 'Clothing Boutiques',  desc: 'New arrivals, outfit ideas, and sales.' },
];

const quotes = [
  { text: "I don't know what to post.", attr: 'Small Business Owner' },
  { text: "I'm too busy.",              attr: 'Store Owner'          },
  { text: "My last post was 3 months ago.", attr: 'Entrepreneur'    },
];
</script>
