<template>
  <section class="py-24 bg-white text-center">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Label -->
      <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
        <div class="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-black shrink-0">!</div>
        THE PROBLEM
      </div>

      <h2 class="font-black text-gray-900 mb-4 leading-tight" style="font-size: clamp(26px, 3.8vw, 46px); letter-spacing: -1px;">
        You know you should be posting.<br />
        <span class="text-blue-600">But something always gets in the way.</span>
      </h2>
      <p class="text-lg text-gray-600 mb-12 leading-relaxed">
        Running your business is already a full-time job. Creating content<br />
        shouldn't be another stressful task on your list.
      </p>

      <!-- 3 Cards -->
      <div class="grid md:grid-cols-3 gap-5 mb-10 text-left">

        <!-- Card 1: No Time -->
        <div class="bg-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl shrink-0">⏰</div>
            <div>
              <div class="text-lg font-black text-gray-900 mb-1">No Time</div>
              <div class="text-sm font-bold text-blue-600">You're busy running your business.</div>
            </div>
          </div>
          <div class="border-t border-gray-200"></div>
          <p class="text-sm text-gray-600 leading-relaxed">You're managing the store, handling orders, and serving customers. Who has time to create content?</p>
          <div class="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 mt-auto">
            <div class="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</div>
            Result: Content gets pushed aside
          </div>
        </div>

        <!-- Card 2: No Design Skills -->
        <div class="bg-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl shrink-0">🖼️</div>
            <div>
              <div class="text-lg font-black text-gray-900 mb-1">No Design Skills</div>
              <div class="text-sm font-bold text-blue-600">Creating posts feels complicated.</div>
            </div>
          </div>
          <div class="border-t border-gray-200"></div>
          <p class="text-sm text-gray-600 leading-relaxed">Canva feels overwhelming. Writing captions feels awkward. You're a business owner, not a content creator.</p>
          <div class="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 mt-auto">
            <div class="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</div>
            Result: You overthink and don't post
          </div>
        </div>

        <!-- Card 3: No Consistency (dark) -->
        <div class="rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform" style="background: #1e40af;">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style="background: rgba(255,255,255,0.15);">📉</div>
            <div>
              <div class="text-lg font-black text-white mb-1">No Consistency</div>
              <div class="text-sm font-bold text-yellow-400">You post once, then life gets busy.</div>
            </div>
          </div>
          <div class="border-t" style="border-color: rgba(255,255,255,0.15);"></div>
          <p class="text-sm leading-relaxed" style="color: rgba(255,255,255,0.8);">You get busy, you forget, and your page goes dead. An inactive page signals an inactive business.</p>
          <div class="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold mt-auto" style="background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.9);">
            <div class="w-5 h-5 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</div>
            Result: You lose visibility and trust
          </div>
        </div>
      </div>

      <!-- Cost Banner -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-7 text-left flex flex-col gap-5">
        <div class="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900">
          <span class="text-lg">⚠️</span>
          THE REAL COST OF NOT POSTING
        </div>
        <div class="flex items-center">
          <div class="flex-1 flex items-center gap-4 pr-8">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl shrink-0">📊</div>
            <div>
              <div class="text-4xl font-black text-blue-700 leading-none">3–5</div>
              <div class="text-sm text-gray-600 mt-1">
                <strong class="text-gray-900">missed posts per week</strong><br />= lost top-of-mind awareness
              </div>
            </div>
          </div>
          <div class="w-px h-16 bg-yellow-300 shrink-0"></div>
          <div class="flex-1 flex items-center gap-4 pl-8">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl shrink-0">🔥</div>
            <div>
              <div class="text-4xl font-black text-blue-700 leading-none">Every</div>
              <div class="text-sm text-gray-600 mt-1">
                <strong class="text-gray-900">week without posting</strong><br />is a week your competitor is in front of your customers
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-yellow-200 pt-4 flex items-center justify-center gap-2 text-sm text-gray-900 flex-wrap">
          <div class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</div>
          <span><strong>Stay visible. Stay relevant. Stay top of mind.</strong>&nbsp;&nbsp;<span class="text-blue-600 font-bold">That's how customers choose you.</span></span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>
