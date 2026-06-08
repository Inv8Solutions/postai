<template>
  <section
    class="relative overflow-hidden flex items-center"
    style="min-height: calc(100vh - 64px); background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%); padding: 80px 0 0;"
  >
    <!-- Cross pattern texture -->
    <div class="hero-texture absolute inset-0 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10 w-full">
      <div class="grid md:grid-cols-2 gap-14 items-center pb-20">

        <!-- Left Column -->
        <div class="flex flex-col">

          <!-- Badge pill -->
          <div
            class="inline-flex items-center text-white/85 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 w-fit border"
            style="background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2);"
          >
            AI POWERED FACEBOOK CONTENT FOR SMALL BUSINESSES
          </div>

          <!-- Headline -->
          <h1
            class="text-5xl font-black text-white leading-tight mb-5"
            style="letter-spacing: -1.5px; font-size: clamp(34px, 4.5vw, 54px);"
          >
            Never Run Out of<br />
            Facebook Posts for<br />
            <span class="text-yellow-400">Your Business</span>
          </h1>

          <!-- Subtext -->
          <p class="text-lg mb-7 leading-relaxed max-w-md" style="color: rgba(255,255,255,0.78);">
            PostAI creates branded Facebook posts in minutes. We write your captions, design your content, and schedule it to your Facebook Page automatically.
          </p>

          <!-- Checkmarks -->
          <div class="flex flex-col gap-2.5 mb-8">
            <div v-for="feature in heroFeatures" :key="feature" class="flex items-center gap-3">
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-yellow-400"
              >
                <svg class="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="font-medium text-sm" style="color: rgba(255,255,255,0.9);">{{ feature }}</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex gap-3 flex-wrap items-start mb-6">
            <button
              @click="handleStartFree"
              class="flex flex-col items-center bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-500 transition-all"
              style="box-shadow: 0 8px 24px rgba(234,179,8,0.35); line-height: 1.2;"
            >
              <span class="text-base font-bold">Start Free →</span>
              <span class="text-xs font-medium" style="opacity: 0.7;">No credit card required</span>
            </button>
            <button
              @click="handleWatchHowItWorks"
              class="flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/25 transition-all border backdrop-blur-sm"
              style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3);"
            >
              <span class="text-xs">▶</span>
              <span>Watch How It Works</span>
            </button>
          </div>

          <!-- Trust text -->
          <p class="text-sm" style="color: rgba(255,255,255,0.5);">🔒 Secure. Easy. Built for Filipino small businesses.</p>
        </div>

        <!-- Right Column - App Mockup -->
        <div class="flex justify-center items-end">
          <div
            class="flex rounded-2xl overflow-hidden w-full"
            style="max-width: 520px; box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);"
          >
            <!-- Sidebar -->
            <div class="shrink-0 flex flex-col py-5" style="width: 150px; background: #0f172a;">
              <div
                class="flex items-center gap-1.5 px-4 pb-4 mb-2"
                style="border-bottom: 1px solid rgba(255,255,255,0.08);"
              >
                <span class="text-yellow-400 text-base">⚡</span>
                <span class="text-white text-xs font-black">PostAI</span>
              </div>
              <nav class="flex flex-col flex-1">
                <a
                  v-for="item in sidebarItems"
                  :key="item.name"
                  class="text-xs px-4 py-2.5 cursor-default transition-all"
                  :style="item.active
                    ? 'background: #1d4ed8; color: white; font-weight: 700; border-left: 3px solid #facc15;'
                    : 'color: rgba(255,255,255,0.55);'"
                >
                  {{ item.icon }} {{ item.name }}
                </a>
              </nav>
              <div
                class="mx-3 mt-3 rounded-xl p-3 text-center"
                style="background: rgba(255,255,255,0.08);"
              >
                <div class="text-xs uppercase tracking-wide mb-1" style="color: rgba(255,255,255,0.5); font-size: 10px; letter-spacing: 0.06em;">Credits Left</div>
                <div class="text-white font-black leading-none" style="font-size: 28px;">25</div>
                <button
                  class="mt-2 w-full rounded-lg text-gray-900 font-bold bg-yellow-400"
                  style="font-size: 11px; padding: 5px 0;"
                >Top Up →</button>
              </div>
            </div>

            <!-- Main Panel -->
            <div class="flex-1 bg-white flex flex-col p-4 gap-3">
              <!-- Header -->
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="text-sm font-black text-gray-900">Your Post Preview</div>
                  <div class="text-xs text-gray-400">Review and approve your post</div>
                </div>
                <button
                  class="bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600"
                  style="padding: 6px 10px; white-space: nowrap;"
                >↻ Regenerate</button>
              </div>

              <!-- FB Post preview -->
              <div class="rounded-xl overflow-hidden" style="background: #f1f5f9;">
                <!-- Post header -->
                <div class="bg-white flex items-center gap-2 px-3 py-2">
                  <div
                    class="rounded-full flex items-center justify-center text-sm shrink-0"
                    style="width: 28px; height: 28px; background: #dbeafe;"
                  >🍱</div>
                  <div>
                    <div class="text-xs font-bold text-gray-900">Lola's Carinderia</div>
                    <div class="text-xs text-gray-400">Just now · 🌐</div>
                  </div>
                </div>
                <!-- Caption -->
                <div class="bg-white px-3 pb-2 text-xs text-gray-800 leading-relaxed">
                  Masarap na ulam, budget-friendly pa! 😋<br />
                  Kain na sa Lola's Carinderia! ❤️<br />
                  Open daily 7AM – 8PM
                </div>
                <!-- Yellow image card -->
                <div class="bg-yellow-400 px-3 py-4 flex items-center justify-between">
                  <div>
                    <div class="font-black leading-tight" style="color: #1e3a8a; font-size: 14px; letter-spacing: -0.3px;">
                      SARAP NA<br />ABOT-KAYA<br />ARAW-ARAW!
                    </div>
                    <div class="font-black mt-1.5" style="color: #1d4ed8; font-size: 10px; letter-spacing: 0.02em;">
                      LOLA'S<br />CARINDERIA
                    </div>
                  </div>
                  <div style="font-size: 42px; line-height: 1;">🍲</div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex gap-2">
                <button
                  class="flex-1 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700"
                  style="padding: 9px;"
                >✏️ Edit</button>
                <button
                  class="rounded-lg text-xs font-bold text-white bg-blue-600"
                  style="padding: 9px; flex: 2;"
                >📅 Approve &amp; Schedule</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const heroFeatures = ref([
  'No design skills needed',
  'No caption writing required',
  'First post ready in under 10 minutes',
]);

const sidebarItems = ref([
  { name: 'Dashboard',    icon: '🏠', active: false },
  { name: 'Create Post',  icon: '✏️', active: true  },
  { name: 'Scheduled',    icon: '📅', active: false },
  { name: 'Brand Kit',    icon: '🎨', active: false },
  { name: 'Credits',      icon: '⚡', active: false },
  { name: 'Referrals',    icon: '👥', active: false },
  { name: 'Settings',     icon: '⚙️', active: false },
]);

const handleStartFree = () => router.push('/generate');
const handleWatchHowItWorks = () => {
  const el = document.getElementById('how-it-works');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.hero-texture {
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
