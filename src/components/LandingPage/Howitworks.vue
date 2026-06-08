<template>
  <section class="py-24 bg-white" id="how-it-works">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">HOW IT WORKS</div>
      <h2 class="font-black text-gray-900 mb-3 leading-tight" style="font-size: clamp(26px, 3.5vw, 44px); letter-spacing: -1px;">
        Create and Schedule Facebook Posts<br /><span class="text-blue-600">in 4 Simple Steps</span>
      </h2>
      <p class="text-lg text-gray-600 mb-14">Set up your business once and let PostAI handle the rest.</p>

      <!-- Steps row -->
      <div class="flex items-start gap-0 mb-14 overflow-x-auto">

        <!-- Step 1 -->
        <div class="flex-1 bg-gray-100 rounded-2xl p-5 flex flex-col gap-4 min-w-0" style="min-width: 180px;">
          <div class="relative w-20 h-20 mx-auto">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl" style="box-shadow: 0 4px 16px rgba(30,58,138,0.1);">🏪</div>
            <div class="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black border-2 border-white">⬇</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">1</div>
            <h3 class="text-sm font-black text-gray-900 leading-snug">Add Your Business Information</h3>
            <p class="text-xs text-gray-600 leading-relaxed">Upload your logo, choose your brand colors, and tell us about your business.</p>
            <ul class="flex flex-col gap-1 mt-1">
              <li v-for="item in step1Items" :key="item" class="flex items-center gap-1.5 text-xs text-gray-600">
                <span class="text-blue-600 font-black shrink-0">✓</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="shrink-0 self-center text-blue-300 text-sm tracking-widest pb-20 px-1">· · · →</div>

        <!-- Step 2 -->
        <div class="flex-1 bg-gray-100 rounded-2xl p-5 flex flex-col gap-4 min-w-0" style="min-width: 180px;">
          <div class="relative w-20 h-20 mx-auto">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl" style="box-shadow: 0 4px 16px rgba(30,58,138,0.1);">🖥️</div>
            <div class="absolute bottom-0 right-0 w-7 h-7 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-black border-2 border-white">◎</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">2</div>
            <h3 class="text-sm font-black text-gray-900 leading-snug">Choose What You Want to Post</h3>
            <p class="text-xs text-gray-600 leading-relaxed">Pick a content type and PostAI creates a ready-to-post Facebook post.</p>
            <ul class="flex flex-col gap-1 mt-1">
              <li v-for="item in step2Items" :key="item" class="flex items-center gap-1.5 text-xs text-gray-600">
                <span class="text-blue-600 font-black shrink-0">✓</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="shrink-0 self-center text-blue-300 text-sm tracking-widest pb-20 px-1">· · · →</div>

        <!-- Step 3 -->
        <div class="flex-1 bg-gray-100 rounded-2xl p-5 flex flex-col gap-4 min-w-0" style="min-width: 180px;">
          <div class="relative w-20 h-20 mx-auto">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl" style="box-shadow: 0 4px 16px rgba(30,58,138,0.1);">👁️</div>
            <div class="absolute bottom-0 right-0 w-7 h-7 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-black border-2 border-white">👁</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">3</div>
            <h3 class="text-sm font-black text-gray-900 leading-snug">Review and Approve</h3>
            <p class="text-xs text-gray-600 leading-relaxed">Preview your post before it goes live. Not happy? Regenerate for free.</p>
            <ul class="flex flex-col gap-1 mt-1">
              <li v-for="item in step3Items" :key="item" class="flex items-center gap-1.5 text-xs text-gray-600">
                <span class="text-blue-600 font-black shrink-0">✓</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="shrink-0 self-center text-blue-300 text-sm tracking-widest pb-20 px-1">· · · →</div>

        <!-- Step 4 -->
        <div class="flex-1 bg-gray-100 rounded-2xl p-5 flex flex-col gap-4 min-w-0" style="min-width: 180px;">
          <div class="relative w-20 h-20 mx-auto">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center" style="box-shadow: 0 4px 16px rgba(30,58,138,0.1);">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="20" fill="#1877F2"/>
                <path d="M27 20h-4.5v-3c0-1.1.9-1.5 1.5-1.5H27V11h-4c-3.9 0-5 2.9-5 5v4h-3v5h3v10h5V25h3.5L27 20z" fill="white"/>
              </svg>
            </div>
            <div class="absolute bottom-0 right-0 w-7 h-7 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-black border-2 border-white">✓</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">4</div>
            <h3 class="text-sm font-black text-gray-900 leading-snug">We Post It For You</h3>
            <p class="text-xs text-gray-600 leading-relaxed">Your content is automatically scheduled and posted to your Facebook Page.</p>
            <ul class="flex flex-col gap-1 mt-1">
              <li v-for="item in step4Items" :key="item" class="flex items-center gap-1.5 text-xs text-gray-600">
                <span class="text-blue-600 font-black shrink-0">✓</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom CTA Banner -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-7 flex items-center gap-6 flex-wrap">
        <div class="text-5xl shrink-0">🚀</div>
        <div class="flex-1 flex flex-col gap-1" style="min-width: 200px;">
          <strong class="text-lg font-black text-gray-900">Ready to create your first Facebook post?</strong>
          <span class="text-sm text-gray-600">Get your first post live in under 10 minutes.</span>
        </div>
        <div class="flex gap-3 items-center flex-wrap">
          <button class="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition">Start Free →</button>
          <button class="bg-white text-gray-900 border-2 border-gray-200 font-bold px-6 py-3 rounded-lg hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-2">
            <span class="text-xs">▶</span> Watch Demo
          </button>
        </div>
        <p class="w-full text-xs text-gray-400" style="padding-left: calc(48px + 24px);">✓ No credit card required</p>
      </div>

    </div>
  </section>
</template>

<script setup>
const step1Items = ['Business name', 'Logo upload', 'Brand colors', 'Writing style'];
const step2Items = ['Promotions', 'Announcements', 'Holiday greetings', 'Business tips', 'Product highlights'];
const step3Items = ['Unlimited regenerations', 'Edit before posting', 'Approve with one click'];
const step4Items = ['Best posting times', 'Facebook integration', 'Live notifications'];
</script>
