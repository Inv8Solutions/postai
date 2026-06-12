<script setup>
import { 
  Link, 
  Gift, 
  PartyPopper, 
  Users, 
  Zap, 
  Copy, 
  MessageCircle, 
  MessageSquare, 
  Facebook
} from 'lucide-vue-next'

// --- Step Data ---
const steps = [
  {
    id: 1,
    title: 'Share your link',
    description: 'Send your unique referral link to another business owner.',
    icon: Link,
    emoji: '🔗'
  },
  {
    id: 2,
    title: 'They sign up',
    description: 'They get bonus starter credits when they join.',
    icon: Gift,
    emoji: '🎁'
  },
  {
    id: 3,
    title: 'You both earn',
    description: 'When they approve their first post, you earn free credits!',
    icon: PartyPopper,
    emoji: '🎉'
  }
]

// --- Social Share Buttons ---
const shareOptions = [
  { id: 'messenger', label: 'Messenger', icon: MessageCircle, color: 'text-blue-500' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-green-500' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600' },
]

const referralLink = 'postal.ph/ref/asd'
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-[1200px] mx-auto space-y-6">
      
      <!-- ==================== PAGE HEADER ==================== -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Referral Program</h1>
        <p class="text-sm text-gray-500 mt-1">Invite fellow business owners and earn free credits.</p>
      </div>

      <!-- ==================== STEP PROCESS (3 COLUMN FLOW) ==================== -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        <!-- Step Card -->
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
        >
          <!-- Step Number -->
          <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mx-auto mb-4">
            {{ step.id }}
          </div>
          
          <!-- Icon -->
          <div class="mb-3 text-4xl">{{ step.emoji }}</div>
          
          <!-- Text -->
          <h3 class="text-sm font-bold text-gray-800 mb-1">{{ step.title }}</h3>
          <p class="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
            {{ step.description }}
          </p>

          <!-- Connector Arrow (Desktop only) -->
          <div v-if="index < steps.length - 1" class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

      </div>

      <!-- ==================== STATISTICS CARDS ==================== -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <!-- Businesses Referred -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <Users class="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0</p>
            <p class="text-xs font-medium text-gray-500">Businesses Referred</p>
          </div>
        </div>

        <!-- Credits Earned -->
        <div class="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Zap class="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0</p>
            <p class="text-xs font-medium text-gray-500">Credits Earned</p>
          </div>
        </div>

      </div>

      <!-- ==================== REFERRAL LINK SECTION ==================== -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-sm font-bold text-gray-800 mb-3">Your Referral Link</h2>
        
        <!-- Link Input -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <div class="flex-1 relative">
            <input 
              :value="referralLink"
              readonly
              type="text" 
              class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shrink-0">
            <Copy class="w-4 h-4" />
            Copy
          </button>
        </div>

        <!-- Share Buttons -->
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="option in shareOptions" 
            :key="option.id"
            class="border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <component :is="option.icon" :class="['w-4 h-4', option.color]" />
            <span class="text-xs font-medium text-gray-700">{{ option.label }}</span>
          </button>
        </div>

      </div>

    </div>
  </div>
</template>