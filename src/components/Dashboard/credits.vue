<script setup>
import { 
  Zap, 
  CreditCard, 
  Landmark, 
  Smartphone, 
  Receipt,
  Sparkles,
  CheckCircle2
} from 'lucide-vue-next'

// --- Pricing Data ---
const creditPackages = [
  {
    id: 1,
    posts: 10,
    price: 150,
    pricePerPost: 15,
    tag: null,
    description: 'Less than a cup of coffee',
    isPopular: false
  },
  {
    id: 2,
    posts: 40,
    price: 500,
    pricePerPost: 12.50,
    tag: 'Best Value',
    description: 'Better value for your business',
    isPopular: true
  }
]

// --- Payment Methods ---
const paymentMethods = [
  { id: 'gcash', label: 'GCash', icon: Smartphone },
  { id: 'credit', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Landmark },
  { id: 'maya', label: 'Maya', icon: Smartphone },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-[1200px] mx-auto space-y-6">
      
      <!-- ==================== PAGE HEADER ==================== -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Credits & Billing</h1>
        <p class="text-sm text-gray-500 mt-1">Credits are used only when you approve a post.</p>
      </div>

      <!-- ==================== BALANCE BANNER ==================== -->
      <div class="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-white shadow-lg shadow-blue-100">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Zap class="w-5 h-5 text-white" />
            </div>
            <div>
              <p class="text-blue-200 text-xs font-medium">Your Balance</p>
              <p class="text-2xl md:text-3xl font-bold">14 Credits</p>
            </div>
          </div>
          <div>
            <p class="text-blue-200 text-xs text-right md:text-left">
              Credits never expire · Only deducted on approval
            </p>
          </div>
        </div>
      </div>

      <!-- ==================== BUY MORE CREDITS ==================== -->
      <div>
        <h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Buy More Credits</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Package Card -->
          <div 
            v-for="pkg in creditPackages" 
            :key="pkg.id"
            class="bg-white rounded-xl shadow-sm border-2 p-6 relative transition-all hover:shadow-md"
            :class="[
              pkg.isPopular 
                ? 'border-blue-400 ring-1 ring-blue-400' 
                : 'border-gray-100'
            ]"
          >
            <!-- Best Value Badge -->
            <div v-if="pkg.isPopular" class="absolute -top-3 left-1/2 -translate-x-1/2">
              <div class="bg-[#FFCC02] text-gray-900 text-[10px] font-bold px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles class="w-3 h-3" />
                BEST VALUE
              </div>
            </div>

            <div class="mb-4">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wide">{{ pkg.posts }} POSTS</p>
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-3xl font-bold text-gray-900">₱{{ pkg.price }}</span>
              </div>
              <p class="text-xs font-semibold text-blue-600 mt-1">₱{{ pkg.pricePerPost }} / post</p>
            </div>

            <div class="flex items-center gap-2 text-[11px] text-gray-500 mb-4">
              <span>☕</span>
              <span>{{ pkg.description }}</span>
            </div>

            <button 
              class="w-full py-2.5 rounded-lg font-medium text-sm transition-colors"
              :class="[
                pkg.isPopular 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Buy {{ pkg.posts }} Credits
            </button>
          </div>

        </div>
      </div>

      <!-- ==================== PAYMENT METHODS ==================== -->
      <div>
        <h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Payment Methods</h2>
        <div class="flex flex-wrap gap-3">
          <div 
            v-for="method in paymentMethods" 
            :key="method.id"
            class="bg-white border border-gray-200 rounded-lg px-4 py-2.5 flex items-center gap-2 hover:border-blue-400 transition-colors cursor-pointer"
          >
            <component :is="method.icon" class="w-4 h-4 text-blue-600" />
            <span class="text-xs font-medium text-gray-700">{{ method.label }}</span>
          </div>
        </div>
      </div>

      <!-- ==================== PURCHASE HISTORY (EMPTY STATE) ==================== -->
      <div>
        <h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Purchase History</h2>
        
        <div class="w-full bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center shadow-sm min-h-[300px]">
          
          <!-- Icon -->
          <div class="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
            <Receipt class="w-6 h-6 text-gray-400" />
          </div>
          
          <!-- Text -->
          <h3 class="text-base font-bold text-gray-900 mb-1">No purchases yet</h3>
          <p class="text-sm text-gray-500">
            Your credit purchase history will appear here.
          </p>

        </div>
      </div>

    </div>
  </div>
</template>