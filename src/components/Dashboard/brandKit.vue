<script setup>
import { 
  Save,
  Image as ImageIcon,
  Info,
  Upload,
  CheckCircle2,
  Smile,
  Briefcase,
  Mic,
  Star,
  Zap,
  Building2,
  Trash2,
  FileText
} from 'lucide-vue-next'
import { ref } from 'vue'

// --- Form State ---
const businessName = ref('asd')
const businessTagline = ref('')
const businessCategory = ref('Food & Carinderia')
const businessDescription = ref('')

const brandTone = ref('friendly')
const captionLanguage = ref('filipino')

// --- Tone Options ---
const toneOptions = [
  { id: 'friendly', label: 'Friendly', icon: Smile, desc: 'Warm & approachable', color: 'orange' },
  { id: 'promotional', label: 'Promotional', icon: Zap, desc: 'Sales & limited offers', color: 'orange' },
  { id: 'professional', label: 'Professional', icon: Briefcase, desc: 'Trustworthy & polished', color: 'purple' },
  { id: 'formal', label: 'Formal', icon: Mic, desc: 'Serious & authoritative', color: 'gray' },
]

// --- Language Options ---
const languageOptions = [
  { id: 'filipino', label: 'Filipino' },
  { id: 'taglish', label: 'Taglish' },
  { id: 'english', label: 'English' },
]

// --- Helper for Tone Icon Color ---
const getToneIconClass = (color) => {
  const map = {
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    gray: 'text-gray-500'
  }
  return map[color] || 'text-gray-500'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-8">
    <div class="max-w-[1400px] mx-auto">
      
      <!-- ==================== PAGE HEADER ==================== -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Brand Kit</h1>
          <p class="text-sm text-gray-500 mt-1">Your business identity used in every post.</p>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-5 rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow-md shrink-0">
          <Save class="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <!-- ==================== MAIN LAYOUT ==================== -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- LEFT COLUMN: Form Sections (3 cols) -->
        <div class="lg:col-span-3 space-y-6">
          
          <!-- === SECTION 1: Business Info === -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-sm font-bold text-gray-800 mb-4">Business Info</h2>
            
            <div class="space-y-4">
              <!-- Business Name -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Business Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 class="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    v-model="businessName"
                    type="text" 
                    class="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Enter business name"
                  />
                </div>
              </div>

              <!-- Business Tagline -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Business Tagline <span class="text-gray-400 font-normal">(optional)</span></label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Info class="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    v-model="businessTagline"
                    type="text" 
                    class="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="e.g. Lutong bahay, araw-araw!"
                  />
                </div>
              </div>

              <!-- Business Category -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Business Category</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 class="w-4 h-4 text-gray-400" />
                  </div>
                  <select 
                    v-model="businessCategory"
                    class="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none bg-white"
                  >
                    <option>Food & Carinderia</option>
                    <option>Retail & Shopping</option>
                    <option>Services</option>
                  </select>
                </div>
              </div>

              <!-- Logo Upload -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Logo</label>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <ImageIcon class="w-6 h-6 text-gray-400" />
                  </div>
                  <div class="flex-1">
                    <button class="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                      <Upload class="w-4 h-4" />
                      Upload Logo
                    </button>
                    <p class="text-[10px] text-gray-400 mt-1">PNG or JPG, max 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- === SECTION 2: Business Documents === -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center gap-2 mb-4">
              <h2 class="text-sm font-bold text-gray-800">Business Documents</h2>
              <Info class="w-3.5 h-3.5 text-gray-400" />
            </div>
            
            <div class="space-y-4">
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Upload Business Files <span class="text-gray-400 font-normal">(optional)</span></label>
              
              <!-- Drop Zone -->
              <div class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50/50">
                <div class="flex flex-col items-center gap-2">
                  <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileText class="w-5 h-5 text-yellow-600" />
                  </div>
                  <p class="text-sm font-medium text-gray-700">Drop files here or click to upload</p>
                  <p class="text-[10px] text-gray-400">PDF, DOC, DOCX, TXT, or Images · Max 10MB each</p>
                </div>
              </div>

              <!-- Security Notice -->
              <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2">
                <Info class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p class="text-[11px] text-gray-600 leading-relaxed">
                  <span class="font-semibold">Your files are private and secure.</span> Documents you upload are used <span class="font-semibold">only</span> to improve your generated captions — they are never shared with third parties, sold, or used for any other purpose. You can remove any file at any time.
                </p>
              </div>

              <!-- Business Description -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Business Description <Info class="w-3 h-3 inline text-gray-400 ml-1" /></label>
                <textarea 
                  v-model="businessDescription"
                  rows="4"
                  class="w-full border border-gray-200 rounded-lg text-sm text-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                  placeholder="e.g. We are a family-owned carinderia in Baguio City serving home-cooked Filipino meals. Our specialty is slow-cooked kare-kare. Open daily 7AM-8PM."
                ></textarea>
                <div class="flex justify-end mt-1">
                  <span class="text-[10px] text-gray-400">{{ businessDescription.length }} / 500</span>
                </div>
              </div>
            </div>
          </div>

          <!-- === SECTION 3: Voice & Style === -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-sm font-bold text-gray-800 mb-4">Voice & Style</h2>
            
            <!-- Brand Tone -->
            <div class="mb-6">
              <label class="block text-xs font-semibold text-gray-700 mb-3">Brand Tone</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  v-for="tone in toneOptions" 
                  :key="tone.id"
                  @click="brandTone = tone.id"
                  class="border rounded-lg p-3 cursor-pointer transition-all flex items-center gap-3"
                  :class="[
                    brandTone === tone.id 
                      ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-400' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <component :is="tone.icon" :class="['w-5 h-5', getToneIconClass(tone.color)]" />
                  <div>
                    <p class="text-sm font-semibold text-gray-800">{{ tone.label }}</p>
                    <p class="text-[10px] text-gray-500">{{ tone.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Caption Language -->
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-3">Preferred Caption Language</label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  v-for="lang in languageOptions" 
                  :key="lang.id"
                  @click="captionLanguage = lang.id"
                  class="border rounded-lg py-2.5 px-3 cursor-pointer transition-all flex items-center justify-center gap-2"
                  :class="[
                    captionLanguage === lang.id 
                      ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-400 text-blue-700' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  ]"
                >
                  <CheckCircle2 v-if="captionLanguage === lang.id" class="w-3.5 h-3.5" />
                  <span class="text-sm font-medium">{{ lang.label }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Live Preview (1 col) -->
        <div class="lg:col-span-1 space-y-4">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview</h3>
          
          <!-- Preview Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-4">
            
            <!-- Profile Header -->
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                asd
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">asd</p>
                <p class="text-[10px] text-gray-400 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>1 min ago</span>
                </p>
              </div>
            </div>

            <!-- Post Content -->
            <div class="text-sm text-gray-700 space-y-2">
              <p>Masarap at sutil! 🍛 Bumisita na sa asd ngayon. Handa kaming maglingkod sa inyo!</p>
            </div>

            <!-- Brand Card -->
            <div class="mt-3 bg-blue-600 rounded-lg p-4 text-white">
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">ASD</span>
                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px]">🍛</div>
              </div>
            </div>

            <div class="mt-4 text-[10px] text-gray-400 border-t pt-3 flex items-start gap-1">
              <Info class="w-3 h-3 shrink-0 mt-0.5" />
              <p>PostAI uses this info to create every post. Keep it updated for the best results.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>