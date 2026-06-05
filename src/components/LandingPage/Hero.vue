<template>
  <div class="bg-white">
    <!-- Hero Section with Cross Texture Background -->
    <section class="py-4 md:py-4 px-4 relative overflow-hidden">
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"></div>
      
      <!-- Cross Pattern Texture -->
      <div>
        class="absolute inset-0 opacity-10"
        style="background-image: url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 8 L20 32 M8 20 L32 20' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\"); background-repeat: repeat; background-size: 40px 40px;">
        </div>
      
      <!-- Decorative glow elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left Column - Content -->
          <div>
            <!-- AI Badge -->
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>AI POWERED FACEBOOK CONTENT FOR SMALL BUSINESSES</span>
            </div>

            <!-- Main Heading -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Never Run Out of <span class="text-indigo-200">Facebook Posts</span> for Your Business
            </h1>

            <!-- Description -->
            <p class="text-lg text-indigo-100 mb-8">
              PostAI creates branded Facebook posts in minutes. We write your captions, design your content, and schedule it to your Facebook Page automatically.
            </p>

            <!-- Features List -->
            <div class="space-y-3 mb-8">
              <div v-for="feature in heroFeatures" :key="feature.text" class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-indigo-100">{{ feature.text }}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <button @click="handleStartFree" class="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition shadow-lg">
                Start Free →
              </button>
              <button @click="handleWatchHowItWorks" class="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch How It Works
              </button>
            </div>

            <!-- Trust Badge -->
            <p class="text-sm text-indigo-200">
              Secure. Easy. Built for Filipino small businesses.
            </p>
          </div>

          <!-- Right Column - Image Placeholder -->
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20">
              <!-- Image Placeholder -->
              <div class="aspect-video bg-white/5 flex items-center justify-center">
                <div class="text-center p-8">
                  <svg class="w-16 h-16 mx-auto text-indigo-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p class="text-indigo-200">Dashboard Preview Image</p>
                  <p class="text-xs text-indigo-300/70 mt-1">Placeholder - Add your image here</p>
                </div>
              </div>
            </div>
            <!-- Decorative element -->
            <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-400 rounded-full opacity-30 blur-xl -z-10"></div>
            <div class="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard Section (Keep your existing dashboard code below) -->
    <!-- ... -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Hero section features
const heroFeatures = ref([
  { text: 'No design skills needed' },
  { text: 'No caption writing required' },
  { text: 'First post ready in under 10 minutes' }
]);

// Sidebar menu items with icons
const sidebarMenu = ref([
  { name: 'Dashboard', icon: 'DashboardIcon', active: true },
  { name: 'Create Post', icon: 'CreateIcon', active: false },
  { name: 'Scheduled', icon: 'ScheduleIcon', active: false },
  { name: 'Brand Kit', icon: 'BrandIcon', active: false },
  { name: 'Credits', icon: 'CreditsIcon', active: false },
  { name: 'Referrals', icon: 'ReferralIcon', active: false },
  { name: 'Settings', icon: 'SettingsIcon', active: false }
]);

// Emit events for parent component
const emit = defineEmits([
  'start-free',
  'watch-how-it-works',
  'regenerate',
  'edit',
  'approve'
]);

const handleStartFree = () => emit('start-free');
const handleWatchHowItWorks = () => emit('watch-how-it-works');
const handleRegenerate = () => emit('regenerate');
const handleEdit = () => emit('edit');
const handleApprove = () => emit('approve');

// Icon components (simplified as inline SVGs)
const DashboardIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>' };
const CreateIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>' };
const ScheduleIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' };
const BrandIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>' };
const CreditsIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' };
const ReferralIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' };
const SettingsIcon = { template: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' };

// Map icon names to components
const iconMap = {
  DashboardIcon,
  CreateIcon,
  ScheduleIcon,
  BrandIcon,
  CreditsIcon,
  ReferralIcon,
  SettingsIcon
};

// Replace icon strings with actual components in sidebarMenu
sidebarMenu.value.forEach(item => {
  item.icon = iconMap[item.icon];
});
</script>