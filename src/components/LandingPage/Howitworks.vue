<template>
  <section class="py-16 md:py-24 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Create and Schedule Facebook Posts in 4 Simple Steps
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Set up your business once and let PostAI handle the rest.
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <!-- Step 1 -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center">
          <!-- Icon -->
          <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <i class="fas fa-store text-2xl text-white"></i>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Add Your Business Information
          </h3>
          
          <p class="text-gray-500 text-sm mb-4">
            Upload your logo, choose your brand colors, and tell us about your business.
          </p>
          
          <!-- Checklist -->
          <ul class="space-y-2 text-left">
            <li v-for="item in step1Items" :key="item" class="flex items-center gap-2 text-sm text-gray-600">
              <i class="fas fa-check-circle text-green-500 text-xs w-4"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Step 2 -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center">
          <!-- Icon -->
          <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <i class="fas fa-pen-fancy text-2xl text-white"></i>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Choose What You Want to Post
          </h3>
          
          <p class="text-gray-500 text-sm mb-4">
            Pick a content type and PostAI creates a ready-to-post Facebook post.
          </p>
          
          <!-- Checklist -->
          <ul class="space-y-2 text-left">
            <li v-for="item in step2Items" :key="item" class="flex items-center gap-2 text-sm text-gray-600">
              <i class="fas fa-check-circle text-green-500 text-xs w-4"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Step 3 -->
        <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center">
          <!-- Icon -->
          <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <i class="fas fa-eye text-2xl text-white"></i>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Review and Approve
          </h3>
          
          <p class="text-gray-500 text-sm mb-4">
            Preview your post before it goes live. Not happy? Regenerate for free.
          </p>
          
          <!-- Checklist -->
          <ul class="space-y-2 text-left">
            <li v-for="item in step3Items" :key="item" class="flex items-center gap-2 text-sm text-gray-600">
              <i class="fas fa-check-circle text-green-500 text-xs w-4"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Step 4 -->
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center">
          <!-- Icon -->
          <div class="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <i class="fas fa-calendar-alt text-2xl text-white"></i>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            We Post It For You
          </h3>
          
          <p class="text-gray-500 text-sm mb-4">
            Your content is automatically scheduled and posted to your Facebook Page.
          </p>
          
          <!-- Checklist -->
          <ul class="space-y-2 text-left">
            <li v-for="item in step4Items" :key="item" class="flex items-center gap-2 text-sm text-gray-600">
              <i class="fas fa-check-circle text-green-500 text-xs w-4"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

    <div class="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-7xl mx-auto">
    <div class="p-6 md:p-8">
      <!-- Calendar Date -->
      <div class="text-center mb-5">
        <i class="fa-solid fa-calendar text-5xl"></i>
      </div>

      <!-- Headline -->
      <h3 class="text-gray-900 text-xl font-bold text-center mb-2">
        Ready to create your first Facebook post?
      </h3>
      
      <p class="text-gray-600 text-center text-sm mb-5">
        Get your first post live in under 10 minutes.
      </p>

      <!-- Feature Checkmark -->
      <div class="flex items-center justify-center gap-2 mb-6">
        <i class="fas fa-check-circle text-green-500 text-sm"></i>
        <span class="text-gray-600 text-sm">No credit card required</span>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button 
          @click="handleStartFree"
          class="flex-1 bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <span>Start Free</span>
          <i class="fas fa-arrow-right text-sm"></i>
        </button>
        
        <button 
          @click="handleWatchDemo"
          class="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
        >
          <i class="fas fa-play-circle text-sm"></i>
          <span>Watch Demo</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Step 1 checklist items
const step1Items = [
  'Business name',
  'Logo upload',
  'Brand colors',
  'Writing style'
];

// Step 2 checklist items
const step2Items = [
  'Promotions',
  'Announcements',
  'Holiday greetings',
  'Business tips',
  'Product highlights'
];

// Step 3 checklist items
const step3Items = [
  'Unlimited regenerations',
  'Edit before posting',
  'Approve with one click'
];

// Step 4 checklist items
const step4Items = [
  'Best posting times',
  'Facebook integration',
  'Live notifications'
];
</script>

<style scoped>
.rounded-2xl {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rounded-2xl:hover {
  transform: translateY(-2px);
}
</style>