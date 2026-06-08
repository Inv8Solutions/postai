<template>
  <section class="py-24 text-center" style="background: #eff6ff;" id="pricing">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
        <span>💳</span> CREDITS &amp; PRICING
      </div>
      <h2 class="font-black text-gray-900 mb-4 leading-tight" style="font-size: clamp(32px, 5vw, 56px); letter-spacing: -1.5px;">
        Pay for What You <span class="underline decoration-yellow-400 decoration-4 underline-offset-2">Post.</span><br />
        <span class="text-blue-600">Not What You Try.</span>
      </h2>
      <p class="text-lg text-gray-600 mb-12 leading-relaxed">
        Credits are only deducted when you approve a post —<br />never when you generate or revise.
      </p>

      <!-- Two panels -->
      <div class="grid gap-5 text-left" style="grid-template-columns: 1fr 1.3fr;">

        <!-- LEFT: Free panel -->
        <div class="bg-white rounded-2xl p-7 flex flex-col gap-4">
          <div class="inline-flex items-center bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit">TRY IT FREE</div>
          <h3 class="text-2xl font-black text-gray-900 leading-tight">Start with 5 free posts</h3>
          <p class="text-sm text-gray-400 -mt-2">No payment. No commitment.</p>

          <div class="flex items-center gap-5 flex-1">
            <!-- Calendar illustration -->
            <div class="shrink-0">
              <div class="relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center" style="background: linear-gradient(135deg, #1d4ed8, #3b82f6); box-shadow: 0 8px 24px rgba(37,99,235,0.35);">
                <div class="flex gap-7 absolute -top-1.5">
                  <div class="w-2 h-3.5 bg-gray-900 rounded"></div>
                  <div class="w-2 h-3.5 bg-gray-900 rounded"></div>
                </div>
                <div class="text-5xl font-black text-white leading-none" style="text-shadow: 0 2px 8px rgba(0,0,0,0.2);">5</div>
                <div class="text-white/80 text-xs font-black tracking-widest" style="font-size: 9px;">FREE POSTS</div>
                <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-sm">👍</div>
              </div>
            </div>
            <!-- Feature list -->
            <ul class="flex flex-col gap-2.5 flex-1">
              <li class="flex items-center gap-2.5 text-sm font-medium text-gray-900">
                <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">✏️</div> 5 free posts
              </li>
              <li class="flex items-center gap-2.5 text-sm font-medium text-gray-900">
                <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">↻</div> Unlimited revisions
              </li>
              <li class="flex items-center gap-2.5 text-sm font-medium text-gray-900">
                <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">📅</div> Facebook scheduling included
              </li>
              <li class="flex items-center gap-2.5 text-sm font-medium text-gray-900">
                <div class="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">⭐</div> Perfect for trying PostAI
              </li>
            </ul>
          </div>

          <a href="#" class="flex items-center justify-center bg-blue-600 text-white font-black rounded-xl py-4 text-base hover:bg-blue-700 transition hover:-translate-y-0.5 mt-auto">
            Start Free →
          </a>
          <p class="text-xs text-gray-400 text-center">No credit card required</p>
        </div>

        <!-- RIGHT: Buy Credits panel -->
        <div class="rounded-2xl p-7 flex flex-col gap-4" style="background: #fefce8; border: 1.5px solid #fde68a;">
          <div class="inline-flex items-center bg-yellow-400 text-gray-900 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit">BUY CREDITS</div>
          <h3 class="text-2xl font-black text-gray-900 leading-tight">Top up credits whenever you need more</h3>
          <div class="flex gap-4 flex-wrap text-xs font-semibold text-gray-600 -mt-1">
            <span>🔒 One-time payment</span>
            <span>🛡 Secure &amp; safe</span>
            <span>📅 Credits never expire</span>
          </div>

          <!-- Two credit cards -->
          <div class="grid grid-cols-2 gap-3.5">
            <!-- 12 posts -->
            <div class="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-1.5 hover:-translate-y-0.5 transition-transform">
              <div class="text-xs font-black text-gray-400 uppercase tracking-widest">12 POSTS</div>
              <div class="text-4xl font-black text-gray-900 leading-none my-1">₱199</div>
              <p class="text-xs text-gray-400">That's only</p>
              <div class="inline-block bg-yellow-400 text-gray-900 text-sm font-black px-3 py-1 rounded-lg w-fit">₱16.58 / post</div>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xl">☕</span>
                <span class="text-xs text-gray-600">Less than a cup of coffee</span>
              </div>
            </div>
            <!-- 40 posts (featured) -->
            <div class="bg-white rounded-xl p-5 flex flex-col gap-1.5 relative hover:-translate-y-0.5 transition-transform" style="border: 2px solid #2563eb;">
              <div class="absolute -top-3 right-3 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">⭐ BEST VALUE</div>
              <div class="text-xs font-black text-blue-600 uppercase tracking-widest">40 POSTS</div>
              <div class="text-4xl font-black text-gray-900 leading-none my-1">₱499</div>
              <p class="text-xs text-gray-400">That's only</p>
              <div class="inline-block bg-yellow-400 text-gray-900 text-sm font-black px-3 py-1 rounded-lg w-fit">₱12.48 / post</div>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xl">🔧</span>
                <span class="text-xs text-gray-600">Better value for your business</span>
              </div>
            </div>
          </div>

          <a href="#" class="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-black rounded-xl py-4 text-base hover:bg-yellow-500 transition hover:-translate-y-0.5">
            💳 Buy Credits →
          </a>
          <p class="text-xs text-gray-600 text-center">Pay with GCash, Card, and more</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>
