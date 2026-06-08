<template>
  <!-- REFERRAL SECTION -->
  <section class="referral-section relative overflow-hidden" style="padding: 80px 0 0;" id="referral">
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="grid gap-14 items-center pb-16" style="grid-template-columns: 1fr 1fr;">

        <!-- LEFT -->
        <div class="flex flex-col gap-5">
          <div class="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full w-fit">
            <span>👥</span> REFERRAL PROGRAM
          </div>
          <h2 class="font-black text-white leading-tight" style="font-size: clamp(32px, 4.5vw, 52px); letter-spacing: -1.5px;">
            Share PostAI.<br /><span class="text-yellow-400">Earn Free Credits.</span>
          </h2>
          <p class="text-base leading-relaxed" style="color: rgba(255,255,255,0.75); max-width: 460px;">
            Every traditional business owner you refer is a potential success story — and a way for both of you to earn free credits.
          </p>

          <!-- Steps -->
          <div class="flex flex-col gap-0 mt-2">
            <div v-for="(step, i) in steps" :key="step.text" class="flex flex-col">
              <div class="flex items-center gap-3.5">
                <div class="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-sm font-black shrink-0">{{ i + 1 }}</div>
                <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style="background: rgba(255,255,255,0.12);">{{ step.icon }}</div>
                <div class="flex flex-col gap-0.5">
                  <strong class="text-sm font-black text-white">{{ step.strong }}</strong>
                  <span class="text-sm" style="color: rgba(255,255,255,0.65);">{{ step.text }}</span>
                </div>
              </div>
              <div v-if="i < steps.length - 1" class="w-px h-5 bg-white/20 ml-4"></div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Dashboard card -->
        <div class="bg-white rounded-2xl p-7 flex flex-col gap-5" style="box-shadow: 0 24px 64px rgba(0,0,0,0.3);">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-lg font-black text-gray-900 mb-1">Your Referral Dashboard</div>
              <div class="text-sm text-gray-400">Track your invites and rewards in real time.</div>
            </div>
            <div class="text-5xl leading-none shrink-0">🎁</div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-3.5">
            <div class="bg-gray-100 rounded-xl p-5 flex flex-col items-center gap-2 text-center">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">👥</div>
              <div class="text-4xl font-black text-gray-900 leading-none">12</div>
              <div class="text-xs font-semibold text-gray-500">Credits Earned</div>
            </div>
            <div class="rounded-xl p-5 flex flex-col items-center gap-2 text-center" style="background: #fefce8; border: 1.5px solid #fde68a;">
              <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-lg">🏠</div>
              <div class="text-4xl font-black text-yellow-500 leading-none">4</div>
              <div class="text-xs font-semibold text-gray-500">Business Referred</div>
            </div>
          </div>

          <!-- Referral link -->
          <div class="flex flex-col gap-2">
            <div class="text-sm font-bold text-gray-900">Your Referral Link</div>
            <div class="flex gap-2.5">
              <div class="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-medium">
                postai.ph/ref/nanay123
              </div>
              <button
                class="bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-bold hover:bg-blue-700 transition whitespace-nowrap"
                @click="handleCopy"
              >{{ copyLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- METRICS -->
  <section class="py-24 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="inline-block bg-yellow-100 text-blue-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 block text-center">Our Targets</div>
      <h2 class="text-3xl font-black text-gray-900 text-center mb-12">We Measure What Matters</h2>
      <div class="grid grid-cols-4 gap-5">
        <div v-for="metric in metrics" :key="metric.label"
          class="rounded-2xl p-8 text-center border-2 border-transparent hover:border-blue-400 hover:-translate-y-1 transition-all"
          :class="metric.yellow ? 'bg-yellow-50' : 'bg-blue-50'"
        >
          <div class="text-4xl font-black mb-2" :class="metric.yellow ? 'text-yellow-500' : 'text-blue-700'">{{ metric.num }}</div>
          <div class="text-sm font-bold text-gray-900 mb-1">{{ metric.label }}</div>
          <div class="text-xs text-gray-600">{{ metric.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const copyLabel = ref('⧉ Copy');
const handleCopy = () => {
  navigator.clipboard.writeText('postai.ph/ref/nanay123').catch(() => {});
  copyLabel.value = 'Copied!';
  setTimeout(() => { copyLabel.value = '⧉ Copy'; }, 2000);
};

const steps = [
  { icon: '🔗', strong: 'Share your unique referral link', text: 'with a fellow business owner.' },
  { icon: '🏠', strong: 'They sign up and get bonus', text: 'starter credits.' },
  { icon: '🎉', strong: 'They approve their first post —', text: 'you earn free credits!' },
];

const metrics = [
  { num: '60%+',   label: 'Activation Rate',      desc: 'of sign-ups approve their first post',         yellow: false },
  { num: '<10 min',label: 'First Post Time',       desc: 'from sign-up to live Facebook post',           yellow: true  },
  { num: '70%+',   label: 'Approve-As-Is Rate',   desc: 'posts approved without regenerating',          yellow: false },
  { num: '500+',   label: 'Active Businesses',     desc: 'target in first 6 months',                     yellow: false },
];
</script>

<style scoped>
.referral-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
}
.referral-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(250, 204, 21, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 10% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
  pointer-events: none;
}
</style>
