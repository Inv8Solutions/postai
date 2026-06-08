<template>
  <!-- CTA SECTION -->
  <section class="cta-section relative overflow-hidden py-24 text-center">
    <!-- Blobs -->
    <div class="absolute rounded-full pointer-events-none" style="width:280px;height:280px;top:-80px;left:-80px;background:#1e40af;"></div>
    <div class="absolute rounded-full pointer-events-none" style="width:200px;height:200px;top:-40px;right:-40px;background:#1e40af;opacity:0.6;"></div>
    <div class="absolute rounded-full pointer-events-none" style="width:160px;height:160px;bottom:-40px;left:8%;background:#1e40af;opacity:0.5;"></div>
    <div class="absolute rounded-full pointer-events-none" style="width:240px;height:240px;bottom:-60px;right:-40px;background:#1e40af;"></div>
    <!-- Dot grid -->
    <div class="cta-dots absolute inset-0 pointer-events-none"></div>
    <!-- Sparks -->
    <div class="absolute pointer-events-none" style="width:28px;height:5px;border-radius:3px;background:#facc15;top:30%;left:14%;transform:rotate(-40deg);"></div>
    <div class="absolute pointer-events-none" style="width:18px;height:5px;border-radius:3px;background:#facc15;top:32%;left:12%;transform:rotate(-10deg);"></div>
    <div class="absolute pointer-events-none" style="width:28px;height:5px;border-radius:3px;background:#facc15;top:42%;right:14%;transform:rotate(30deg);"></div>
    <div class="absolute pointer-events-none" style="width:18px;height:5px;border-radius:3px;background:#facc15;top:45%;right:12%;transform:rotate(55deg);"></div>

    <div class="max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center gap-7">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
        🚀 READY TO GET STARTED?
      </div>

      <!-- Headline -->
      <h2 class="font-black text-white leading-tight" style="font-size: clamp(36px, 6vw, 66px); letter-spacing: -2px;">
        Your Next Post<br />Could Be Live in <span class="text-yellow-400">10 Minutes.</span>
      </h2>

      <!-- Trust pills -->
      <div class="flex items-center flex-wrap justify-center">
        <div class="flex items-center gap-2 text-base font-bold text-white px-6">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-base" style="background: rgba(255,255,255,0.12);">📅</div>
          5 Free Posts
        </div>
        <div class="w-px h-7" style="background: rgba(255,255,255,0.2);"></div>
        <div class="flex items-center gap-2 text-base font-bold text-white px-6">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-base" style="background: rgba(255,255,255,0.12);">💳</div>
          No Credit Card
        </div>
        <div class="w-px h-7" style="background: rgba(255,255,255,0.2);"></div>
        <div class="flex items-center gap-2 text-base font-bold text-white px-6">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-base" style="background: rgba(255,255,255,0.12);">⚡</div>
          Setup in Minutes
        </div>
      </div>

      <!-- Button -->
      <RouterLink to="/generate" class="w-full flex items-center justify-center bg-yellow-400 text-gray-900 font-black rounded-2xl text-xl hover:bg-yellow-500 hover:-translate-y-0.5 transition-all" style="max-width:500px; padding: 18px 64px; letter-spacing: -0.3px; box-shadow: 0 12px 36px rgba(234,179,8,0.4);">
        Start Free Now →
      </RouterLink>
      <p class="text-sm -mt-3" style="color: rgba(255,255,255,0.55);">No credit card required. Cancel anytime.</p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background: #0f172a; padding: 64px 0 0; color: rgba(255,255,255,0.7);">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid gap-16 pb-12" style="grid-template-columns: 1fr 2fr;">
        <!-- Brand -->
        <div>
          <a href="#" class="text-2xl font-black text-white mb-3 inline-block" style="letter-spacing: -0.5px;">
            Post<span class="text-blue-500">AI</span>
          </a>
          <p class="text-sm leading-relaxed" style="max-width: 260px; color: rgba(255,255,255,0.6);">
            AI-powered Facebook content for Filipino small businesses. Built in Baguio, for businesses everywhere.
          </p>
        </div>
        <!-- Links -->
        <div class="flex gap-12 flex-wrap">
          <div class="flex flex-col gap-2.5">
            <h4 class="text-xs font-bold text-white uppercase tracking-widest mb-1">Product</h4>
            <a v-for="link in productLinks" :key="link" href="#" class="text-sm hover:text-white transition" style="color: rgba(255,255,255,0.6);">{{ link }}</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <h4 class="text-xs font-bold text-white uppercase tracking-widest mb-1">Support</h4>
            <a v-for="link in supportLinks" :key="link" href="#" class="text-sm hover:text-white transition" style="color: rgba(255,255,255,0.6);">{{ link }}</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <h4 class="text-xs font-bold text-white uppercase tracking-widest mb-1">Legal</h4>
            <a v-for="link in legalLinks" :key="link" href="#" class="text-sm hover:text-white transition" style="color: rgba(255,255,255,0.6);">{{ link }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t py-5" style="border-color: rgba(255,255,255,0.08);">
      <div class="max-w-6xl mx-auto px-6 text-center text-sm" style="color: rgba(255,255,255,0.4);">
        © 2026 PostAI. All rights reserved. · Built for traditional Filipino businesses 🇵🇭
      </div>
    </div>
  </footer>
</template>

<script setup>
const productLinks = ['How It Works', 'Features', 'Pricing', 'Referral'];
const supportLinks = ['Help Center', 'Contact Us', 'Facebook Page'];
const legalLinks  = ['Privacy Policy', 'Terms of Service'];
</script>

<style scoped>
.cta-section {
  background: #1d4ed8;
}
.cta-dots {
  background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 12px 12px;
}
</style>
