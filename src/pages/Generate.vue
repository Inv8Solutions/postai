<template>
  <!-- TOP BAR -->
  <header class="topbar">
    <RouterLink to="/" class="logo">Post<span>AI</span></RouterLink>
    <div class="step-progress">
      <template v-for="(s, i) in stepLabels" :key="s">
        <div class="step-dot" :class="dotClass(i + 1)">
          <span>{{ i + 1 }}</span>
          <div class="step-label">{{ s }}</div>
        </div>
        <div v-if="i < stepLabels.length - 1" class="step-line" :class="{ done: currentStep > i + 1 }"></div>
      </template>
    </div>
    <div class="topbar-credits">
      <span>⚡</span> {{ credits }} Posts Remaining
    </div>
  </header>

  <main class="flow-main">

    <!-- ════════════════════════════════
         STEP 1 — BRAND KIT
    ════════════════════════════════ -->
    <section v-show="currentStep === 1">
      <div class="s1-layout">

        <!-- LEFT: Form -->
        <div class="s1-form-col">
          <div class="s1-card">
            <div class="s1-card-header">
              <div class="s1-step-pill">STEP 1 OF 5</div>
              <h1 class="s1-title">Set Up Your Brand Kit</h1>
              <p class="s1-desc">Tell us about your business so PostAI can create content that sounds like you.</p>
            </div>

            <!-- Business Name -->
            <div class="s1-field">
              <label class="s1-label">Business Name <span class="s1-req">*</span></label>
              <div class="s1-input-wrap">
                <span class="s1-input-icon">🏪</span>
                <input v-model="bizName" type="text" class="s1-input" placeholder="Nanay's Carinderia" />
              </div>
            </div>

            <!-- Category -->
            <div class="s1-field">
              <label class="s1-label">Business Category <span class="s1-req">*</span></label>
              <div class="s1-cat-grid">
                <button
                  v-for="cat in categories"
                  :key="cat.val"
                  type="button"
                  class="s1-cat"
                  :class="{ active: selectedCategory === cat.val }"
                  @click="selectedCategory = cat.val"
                >
                  <span class="s1-cat-icon">{{ cat.icon }}</span>
                  <span class="s1-cat-name">{{ cat.label }}</span>
                </button>
              </div>
            </div>

            <!-- Logo -->
            <div class="s1-field">
              <label class="s1-label">Logo <span class="s1-hint">(optional)</span></label>
              <div class="s1-logo-row">
                <input type="file" id="logoFile" accept="image/*" hidden @change="handleLogoUpload" />
                <div class="s1-logo-preview">
                  <img v-if="logoUrl" :src="logoUrl" style="width:100%;height:100%;object-fit:contain;border-radius:10px;" />
                  <span v-else class="s1-logo-default">🏪</span>
                </div>
                <div class="s1-logo-upload-box" @click="() => document.getElementById('logoFile').click()">
                  <div class="s1-upload-icon">⬆</div>
                  <div class="s1-upload-text">Upload logo</div>
                  <div class="s1-upload-sub">PNG or JPG (max 5MB)</div>
                </div>
              </div>
            </div>

            <!-- Tone -->
            <div class="s1-field">
              <label class="s1-label">Brand Tone <span class="s1-req">*</span></label>
              <div class="s1-tone-grid">
                <button
                  v-for="tone in tones"
                  :key="tone.val"
                  type="button"
                  class="s1-tone"
                  :class="{ active: selectedTone === tone.val }"
                  @click="selectedTone = tone.val"
                >
                  <span class="s1-tone-emoji">{{ tone.icon }}</span>
                  <div>
                    <div class="s1-tone-name">{{ tone.name }}</div>
                    <div class="s1-tone-desc">{{ tone.desc }}</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="s1-bottom-bar">
            <div class="s1-secure">
              <span class="s1-secure-icon">🛡</span>
              <div>
                <div class="s1-secure-title">Secure &amp; private</div>
                <div class="s1-secure-sub">Your data is always safe with us.</div>
              </div>
            </div>
            <div class="s1-actions">
              <button class="s1-save-exit" @click="showToast('Progress saved!', 'green')">Save &amp; Exit</button>
              <button class="s1-continue" @click="goTo(2)">Continue →</button>
            </div>
          </div>
        </div>

        <!-- RIGHT: Live Preview -->
        <div class="s1-preview-col">
          <div class="s1-preview-header">
            <div class="s1-preview-title">Live Preview</div>
            <div class="s1-preview-sub">Here's how your brand might look on a post.</div>
          </div>

          <div class="s1-fb-card">
            <div class="s1-fb-header">
              <div class="s1-fb-avatar">{{ categoryEmoji }}</div>
              <div>
                <div class="s1-fb-name">{{ bizName || "Nanay's Carinderia" }}</div>
                <div class="s1-fb-time">Just now · 🌐</div>
              </div>
              <div class="s1-fb-dots">···</div>
            </div>
            <p class="s1-fb-caption">Lutong bahay, araw-araw! 🍲<br />Freshly prepared meals for the whole family.</p>
            <div class="s1-fb-image">
              <div class="s1-fb-img-overlay">
                <div class="s1-fb-img-headline">{{ previewHeadlineFromName }}<br />ARAW-ARAW!</div>
                <div class="s1-fb-img-sub">Freshly prepared meals<br />for the whole family.</div>
              </div>
              <div class="s1-fb-food-emoji">{{ categoryEmoji }}</div>
            </div>
            <div class="s1-fb-reactions">
              <div class="s1-fb-reacts-left"><span>😍❤️</span><span class="s1-react-count">128</span></div>
              <div class="s1-fb-reacts-right"><span>23 Comments</span><span>45 Shares</span></div>
            </div>
            <div class="s1-fb-actions">
              <button class="s1-fb-action">👍 Like</button>
              <button class="s1-fb-action">💬 Comment</button>
              <button class="s1-fb-action">↗ Share</button>
            </div>
          </div>

          <div class="s1-preview-note">
            <span class="s1-note-icon">ℹ</span>
            <span>We'll use this info to create content that matches your brand. You can update these anytime.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════
         STEP 2 — CONNECT FACEBOOK
    ════════════════════════════════ -->
    <section v-show="currentStep === 2">
      <div class="sx-layout sx-layout--center">
        <div class="sx-card" style="max-width:560px;width:100%">
          <div class="sx-card-header">
            <div class="sx-step-pill">STEP 2 OF 5</div>
            <h1 class="sx-title">Connect Your Facebook Page</h1>
            <p class="sx-desc">PostAI needs permission to schedule and publish posts on your behalf. This takes under a minute.</p>
          </div>

          <!-- Not connected state -->
          <template v-if="!fbConnected">
            <div class="sx-fb-hero">
              <div class="sx-fb-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect width="44" height="44" rx="12" fill="#1877F2"/>
                  <path d="M30 22h-5v-3.3c0-1.2 1-1.7 1.7-1.7H30V12h-4.4c-4.3 0-5.6 3.2-5.6 5.5V22H17v5.5h3V38h5.5V27.5H29L30 22z" fill="white"/>
                </svg>
              </div>
              <div>
                <div class="sx-fb-title">Connect with Facebook</div>
                <div class="sx-fb-sub">One-click connection — no tech skills needed</div>
              </div>
            </div>

            <div class="sx-perms-list">
              <div class="sx-perm sx-perm--allow"><span class="sx-perm-icon">✓</span><span>Read your Page name and profile photo</span></div>
              <div class="sx-perm sx-perm--allow"><span class="sx-perm-icon">✓</span><span>Schedule and publish posts</span></div>
              <div class="sx-perm sx-perm--never"><span class="sx-perm-icon">🛡</span><span>We will <strong>never</strong> post without your approval</span></div>
            </div>

            <button class="sx-btn-fb" :disabled="fbConnecting" @click="connectFacebook">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect width="22" height="22" rx="6" fill="#1877F2"/>
                <path d="M15 11h-2.5v-1.7c0-.6.5-.8.8-.8H15V6h-2.4c-2.2 0-2.8 1.6-2.8 2.8V11H8v2.8h1.8V20h2.8v-6.2H14.5L15 11z" fill="white"/>
              </svg>
              {{ fbConnecting ? 'Connecting…' : 'Continue with Facebook' }}
            </button>
            <p class="sx-fb-note">You can disconnect anytime from Facebook Settings</p>
          </template>

          <!-- Connected state -->
          <template v-else>
            <div class="sx-connected-banner">
              <div class="sx-connected-icon">✓</div>
              <div>
                <div class="sx-connected-title">Facebook Page Connected!</div>
                <div class="sx-connected-sub">You're all set to start posting</div>
              </div>
            </div>
            <div class="sx-page-card">
              <div class="sx-page-avatar">
                <img v-if="selectedPage?.pictureUrl" :src="selectedPage.pictureUrl" alt="" class="sx-page-photo" />
                <template v-else>{{ categoryEmoji }}</template>
              </div>
              <div>
                <div class="sx-page-name">{{ selectedPage?.name || bizName || "Your Business" }}</div>
                <div class="sx-page-meta">
                  {{ formatFollowers(selectedPage?.followers) }} followers<template v-if="selectedPage?.category"> · {{ selectedPage.category }}</template>
                </div>
              </div>
              <div class="sx-page-check">✓</div>
            </div>
            <p v-if="managedPages.length > 1" class="sx-switch-page">Not the right page? <a href="#" @click.prevent="openPagePicker">Switch page →</a></p>
          </template>
        </div>

        <!-- Page picker (shown when the user manages more than one Page) -->
        <div v-if="showPagePicker" class="sx-picker-overlay" @click.self="showPagePicker = false">
          <div class="sx-picker" role="dialog" aria-modal="true">
            <div class="sx-picker-header">
              <div>
                <div class="sx-picker-title">Choose a Page</div>
                <div class="sx-picker-sub">Select which Page PostAI should connect.</div>
              </div>
              <button class="sx-picker-close" aria-label="Close" @click="showPagePicker = false">✕</button>
            </div>
            <div class="sx-picker-list">
              <button
                v-for="page in managedPages"
                :key="page.id"
                class="sx-picker-item"
                :class="{ active: selectedPage?.id === page.id }"
                @click="selectPage(page)"
              >
                <div class="sx-picker-avatar">
                  <img v-if="page.pictureUrl" :src="page.pictureUrl" alt="" class="sx-page-photo" />
                  <span v-else>📘</span>
                </div>
                <div class="sx-picker-info">
                  <div class="sx-picker-name">{{ page.name }}</div>
                  <div class="sx-picker-meta">
                    {{ formatFollowers(page.followers) }} followers<template v-if="page.category"> · {{ page.category }}</template>
                  </div>
                </div>
                <span class="sx-picker-check" :class="{ on: selectedPage?.id === page.id }">✓</span>
              </button>
            </div>
          </div>
        </div>

        <div class="sx-bottom-bar">
          <button class="sx-back" @click="goTo(1)">← Back</button>
          <button class="sx-continue" :disabled="!fbConnected" @click="goTo(3)">Continue →</button>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════
         STEP 3 — CONTENT THEME
    ════════════════════════════════ -->
    <section v-show="currentStep === 3">
      <div class="sx-layout" style="align-items:start">
        <div class="sx-card" style="flex:1">
          <div class="sx-card-header">
            <div class="sx-step-pill">STEP 3 OF 5</div>
            <h1 class="sx-title">What Do You Want to Post?</h1>
            <p class="sx-desc">Choose a content theme and PostAI will generate a branded caption and image for you.</p>
          </div>

          <div class="sx-theme-grid">
            <button
              v-for="theme in themes"
              :key="theme.val"
              class="sx-theme"
              :class="{ active: selectedTheme === theme.val }"
              @click="selectTheme(theme)"
            >
              <div class="sx-theme-top">
                <div class="sx-theme-emoji">{{ theme.icon }}</div>
                <div class="sx-theme-check">✓</div>
              </div>
              <div class="sx-theme-name">{{ theme.name }}</div>
              <div class="sx-theme-desc">{{ theme.desc }}</div>
              <div class="sx-theme-tags">
                <span v-for="tag in theme.tags" :key="tag">"{{ tag }}"</span>
              </div>
            </button>
          </div>

          <!-- Language -->
          <div v-if="selectedTheme" class="sx-lang-field">
            <label class="sx-lang-label">Caption Language</label>
            <div class="sx-lang-opts">
              <button
                v-for="lang in languages"
                :key="lang.val"
                class="sx-lang"
                :class="{ active: selectedLang === lang.val }"
                @click="selectedLang = lang.val"
              >
                <span class="sx-lang-flag">{{ lang.flag }}</span>
                <div>
                  <div class="sx-lang-name">{{ lang.name }}</div>
                  <div class="sx-lang-desc">{{ lang.desc }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Context -->
          <div v-if="selectedTheme" class="sx-context-box">
            <label class="sx-context-label">
              Add details <span class="sx-optional">(optional — more detail = better post)</span>
            </label>
            <textarea v-model="contextInput" class="sx-context-input" :placeholder="contextPlaceholder"></textarea>
            <div class="sx-context-tip">{{ contextTip }}</div>
          </div>
        </div>

        <div class="sx-bottom-bar">
          <button class="sx-back" @click="goTo(2)">← Back</button>
          <button class="sx-continue" :disabled="!selectedTheme" @click="goTo(4)">Generate My Post →</button>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════
         STEP 4 — GENERATE + PREVIEW
    ════════════════════════════════ -->
    <section v-show="currentStep === 4">

      <!-- Generating animation -->
      <div v-if="isGenerating" class="sx-generating">
        <div class="sx-gen-orb">
          <div class="sx-gen-ring sx-gen-ring--1"></div>
          <div class="sx-gen-ring sx-gen-ring--2"></div>
          <div class="sx-gen-ring sx-gen-ring--3"></div>
          <div class="sx-gen-emoji">🤖</div>
        </div>
        <h2 class="sx-gen-title">Creating your post…</h2>
        <p class="sx-gen-sub">Our AI is crafting a branded post just for you</p>
        <div class="sx-gen-steps">
          <div v-for="(gs, i) in genSteps" :key="gs" class="sx-gen-step" :class="genStepClass(i)">
            <span v-if="genProgress <= i" class="sx-gs-dot"></span>
            {{ gs }}
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div v-else class="sx-preview-wrap">
        <div class="sx-layout">

          <!-- LEFT: FB Post -->
          <div class="sx-preview-left">
            <div class="sx-section-label">
              <span>Post Preview</span>
              <div class="sx-regen-badge">↻ FREE regenerations</div>
            </div>

            <div class="sx-fb-post">
              <div class="sx-fpc-header">
                <div class="sx-fpc-avatar">{{ categoryEmoji }}</div>
                <div>
                  <div class="sx-fpc-name">{{ bizName || 'Your Business' }}</div>
                  <div class="sx-fpc-time">Just now · 🌐</div>
                </div>
                <div class="sx-fpc-dots">···</div>
              </div>
              <p class="sx-fpc-caption">{{ previewCaption }}</p>
              <div
                class="sx-fpc-image"
                :style="uploadedImageUrl
                  ? `background: url(${uploadedImageUrl}) center/cover no-repeat`
                  : ''"
              >
                <template v-if="!uploadedImageUrl">
                  <div class="sx-fpc-img-text">
                    <div class="sx-fpc-headline">{{ previewHeadline }}</div>
                    <div class="sx-fpc-sub">{{ previewSub }}</div>
                  </div>
                  <div class="sx-fpc-img-emoji">{{ categoryEmoji }}</div>
                </template>
              </div>
              <div class="sx-fpc-reactions">
                <div>😍❤️ <span>128</span></div>
                <div>23 Comments · 45 Shares</div>
              </div>
              <div class="sx-fpc-actions">
                <button>👍 Like</button>
                <button>💬 Comment</button>
                <button>↗ Share</button>
              </div>
            </div>

            <div class="sx-regen-row">
              <button class="sx-regen-btn" :disabled="regenLoading" @click="regeneratePost">
                <span>↻</span> {{ regenLoading ? 'Regenerating…' : 'Regenerate for Free' }}
              </button>
              <span class="sx-regen-count">Used: <strong>{{ regenCount }}</strong></span>
            </div>
          </div>

          <!-- RIGHT: Edit & Schedule -->
          <div class="sx-preview-right">
            <div class="sx-card" style="flex:1">
              <div class="sx-section-label" style="margin-bottom:16px">Edit &amp; Schedule</div>

              <div class="sx-edit-field">
                <label class="sx-edit-label">Caption</label>
                <textarea v-model="previewCaption" class="sx-edit-textarea"></textarea>
              </div>
              <div class="sx-edit-field">
                <label class="sx-edit-label">Image Headline</label>
                <input v-model="previewHeadline" type="text" class="sx-edit-input" />
              </div>
              <div class="sx-edit-field">
                <label class="sx-edit-label">Image Subtext</label>
                <input v-model="previewSub" type="text" class="sx-edit-input" />
              </div>

              <!-- Image option -->
              <div class="sx-edit-field">
                <label class="sx-edit-label">Post Image</label>
                <div class="sx-img-opts">
                  <button
                    class="sx-img-opt"
                    :class="{ active: imageType === 'ai' }"
                    @click="imageType = 'ai'; uploadedImageUrl = ''"
                  >
                    <span class="sx-img-opt-icon">✦</span>
                    <div>
                      <div class="sx-img-opt-name">AI Generated</div>
                      <div class="sx-img-opt-desc">Branded text design</div>
                    </div>
                  </button>
                  <button
                    class="sx-img-opt"
                    :class="{ active: imageType === 'upload' }"
                    @click="imageType = 'upload'"
                  >
                    <span class="sx-img-opt-icon">📷</span>
                    <div>
                      <div class="sx-img-opt-name">Upload Photo</div>
                      <div class="sx-img-opt-desc">Use your own image</div>
                    </div>
                  </button>
                </div>
                <div v-if="imageType === 'upload'" class="sx-img-drop" @click="() => document.getElementById('postImgFile').click()">
                  <input type="file" id="postImgFile" accept="image/*" hidden @change="handlePostImageUpload" />
                  <template v-if="!uploadedImageUrl">
                    <div class="sx-img-drop-icon">📷</div>
                    <div class="sx-img-drop-text">Click to upload a photo</div>
                    <div class="sx-img-drop-hint">JPG, PNG — max 10MB</div>
                  </template>
                  <template v-else>
                    <div class="sx-img-uploaded-badge">✓ Photo uploaded</div>
                    <button class="sx-img-remove" @click.stop="uploadedImageUrl = ''; imageType = 'ai'">✕ Remove</button>
                  </template>
                </div>
              </div>

              <!-- Schedule -->
              <div class="sx-edit-field">
                <label class="sx-edit-label">Posting Schedule</label>
                <div class="sx-sched-opts">
                  <button
                    v-for="sched in schedOptions"
                    :key="sched.val"
                    class="sx-sched"
                    :class="{ active: scheduleType === sched.val }"
                    @click="scheduleType = sched.val"
                  >
                    <span class="sx-sched-icon">{{ sched.icon }}</span>
                    <div>
                      <div class="sx-sched-name">{{ sched.name }}</div>
                      <div class="sx-sched-sub">{{ sched.sub }}</div>
                    </div>
                    <span v-if="sched.rec" class="sx-sched-rec">{{ sched.rec }}</span>
                  </button>
                </div>
                <div v-if="scheduleType === 'custom'" class="sx-custom-time">
                  <input v-model="customDateTime" type="datetime-local" class="sx-edit-input" />
                </div>
              </div>

              <div class="sx-credit-note">
                <span class="sx-credit-icon">⚡</span>
                <span>1 credit will be used when you approve. You have <strong>{{ credits }}</strong> credits remaining.</span>
              </div>
            </div>

            <div class="sx-bottom-bar sx-bottom-bar--approve">
              <button class="sx-back" @click="goTo(3)">← Back</button>
              <button class="sx-approve-btn" @click="approvePost">
                ✓ Approve &amp; Schedule
                <span class="sx-approve-credit">−1 credit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════
         STEP 5 — SUCCESS
    ════════════════════════════════ -->
    <section v-show="currentStep === 5">
      <div class="sx-success-wrap">
        <div class="sx-success-icon">
          <div class="sx-success-circle">✓</div>
        </div>
        <h1 class="sx-success-title">Post Scheduled! 🎉</h1>
        <p class="sx-success-sub">Your post will go live automatically. We'll send you a notification when it's published.</p>

        <!-- Info cards -->
        <div class="sx-sched-cards">
          <div class="sx-sched-card">
            <div class="sx-sched-card-icon">📅</div>
            <div class="sx-sched-card-label">Scheduled for</div>
            <div class="sx-sched-card-val">{{ scheduledTime }}</div>
          </div>
          <div class="sx-sched-card">
            <div class="sx-sched-card-icon">📘</div>
            <div class="sx-sched-card-label">Facebook Page</div>
            <div class="sx-sched-card-val">{{ selectedPage?.name || bizName || 'Your Business' }}</div>
          </div>
          <div class="sx-sched-card">
            <div class="sx-sched-card-icon">⚡</div>
            <div class="sx-sched-card-label">Credits left</div>
            <div class="sx-sched-card-val">{{ credits }} credits</div>
          </div>
        </div>

        <!-- Referral Dashboard -->
        <div class="sx-ref-dashboard">
          <div class="sx-ref-header">
            <div>
              <div class="sx-ref-title">🎁 Earn Free Credits</div>
              <div class="sx-ref-sub">Share your link to earn bonus credits automatically</div>
            </div>
            <div class="sx-ref-rules">
              <div class="sx-ref-rule">
                <span class="sx-ref-rule-icon sx-rr--blue">👤</span>
                <div>
                  <div class="sx-ref-rule-label">Referral Signs Up</div>
                  <div class="sx-ref-rule-val">+5 credits</div>
                </div>
              </div>
              <div class="sx-ref-rule-divider"></div>
              <div class="sx-ref-rule">
                <span class="sx-ref-rule-icon sx-rr--yellow">💳</span>
                <div>
                  <div class="sx-ref-rule-label">Referral Tops Up</div>
                  <div class="sx-ref-rule-val">+5 credits</div>
                </div>
              </div>
            </div>
          </div>

          <div class="sx-ref-stats">
            <div class="sx-ref-stat">
              <div class="sx-ref-stat-num">{{ refCreditsEarned }}</div>
              <div class="sx-ref-stat-lbl">Credits Earned</div>
            </div>
            <div class="sx-ref-stat-divider"></div>
            <div class="sx-ref-stat">
              <div class="sx-ref-stat-num">{{ refBizCount }}</div>
              <div class="sx-ref-stat-lbl">Businesses Referred</div>
            </div>
            <div class="sx-ref-stat-divider"></div>
            <div class="sx-ref-stat sx-ref-stat--potential">
              <div class="sx-ref-stat-num">+10</div>
              <div class="sx-ref-stat-lbl">Max per referral</div>
            </div>
          </div>

          <div class="sx-rn-link-row">
            <div class="sx-rn-link-input">postai.ph/ref/nanay123</div>
            <button class="sx-rn-copy" @click="copyReferral">{{ copyLabel }}</button>
          </div>

          <div class="sx-rn-share-row">
            <button @click="showToast('Opening Messenger…', 'blue')">💬 Share via Messenger</button>
            <button @click="showToast('Opening WhatsApp…', 'blue')">📱 Share via WhatsApp</button>
          </div>

          <!-- Activity log -->
          <div class="sx-ref-log-section">
            <div class="sx-ref-log-title">Referral Activity</div>
            <p v-if="refHistory.length === 0" class="ref-log-empty">No referral activity yet. Share your link to start earning!</p>
            <div v-for="h in refHistory.slice(0,5)" :key="h.date" class="ref-log-item">
              <span class="ref-log-icon">{{ h.event === 'signup' ? '👤' : '💳' }}</span>
              <div class="ref-log-body">
                <div class="ref-log-note">{{ h.note }}</div>
                <div class="ref-log-date">{{ h.date }}</div>
              </div>
              <span class="ref-log-credit">+{{ h.credits }} credits</span>
            </div>
          </div>

          <!-- Demo buttons -->
          <div class="sx-ref-test-btns">
            <button class="sx-ref-test-btn" @click="simulateSignup">🧪 Simulate: Referral Signs Up (+5)</button>
            <button class="sx-ref-test-btn" @click="simulateTopup">🧪 Simulate: Referral Tops Up (+5)</button>
          </div>
        </div>

        <div class="sx-success-actions">
          <button class="sx-continue" @click="makeAnother">+ Create Another Post</button>
          <RouterLink to="/" class="sx-back-home">Back to Home</RouterLink>
        </div>
      </div>
    </section>

  </main>

  <!-- Toast -->
  <div class="toast" :class="[toastVisible ? 'show' : '', toastType ? `toast--${toastType}` : '']">
    {{ toastMsg }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { facebookLogin, fetchManagedPages, connectFacebookPage, loadFacebookSdk, fetchConnectedPages } from '../services/facebookService';
import { auth } from '../firebase';
import { useUserStore } from '../stores/userStore';

// ─── State ────────────────────────────────────────────────────────────────────
const currentStep    = ref(1);
const bizName        = ref('');
const selectedCategory = ref('');
const selectedTone   = ref('Friendly');
const logoUrl        = ref('');
const fbConnected    = ref(false);
const fbConnecting   = ref(false);
const fbUserToken    = ref('');
const managedPages   = ref([]);   // ManagedPage[] from the Graph API
const selectedPage   = ref(null); // the ManagedPage the user chose
const showPagePicker = ref(false);
const selectedTheme  = ref('');
const selectedThemeLabel = ref('');
const selectedLang   = ref('Filipino');
const contextInput   = ref('');
const credits        = ref(5);
const scheduleType   = ref('optimal');
const customDateTime = ref('');
const imageType      = ref('ai');
const uploadedImageUrl = ref('');
const regenCount     = ref(0);
const regenLoading   = ref(false);
const isGenerating   = ref(false);
const genProgress    = ref(0);
const scheduledTime  = ref('');
const previewHeadline = ref('');
const previewSub      = ref('');
const previewCaption  = ref('');
const refCreditsEarned = ref(0);
const refBizCount    = ref(0);
const refHistory     = ref([]);
const copyLabel      = ref('Copy Link');

// Toast
const toastMsg     = ref('');
const toastType    = ref('blue');
const toastVisible = ref(false);
let toastTimer;

// ─── Static data ──────────────────────────────────────────────────────────────
const stepLabels = ['Brand', 'Connect', 'Content', 'Review', 'Done'];

const categories = [
  { val: 'Food & Carinderia',  icon: '🌱', label: 'Food & Carinderia' },
  { val: 'Salon & Beauty',     icon: '✂️', label: 'Salon & Beauty' },
  { val: 'Hardware Store',     icon: '🔧', label: 'Hardware Store' },
  { val: 'Resto-Bar',          icon: '🍻', label: 'Resto-Bar' },
  { val: 'Clothing & Fashion', icon: '👗', label: 'Clothing' },
  { val: 'Sari-Sari Store',    icon: '🏠', label: 'Sari-Sari Store' },
  { val: 'Other',              icon: '···', label: 'Other' },
];

const tones = [
  { val: 'Friendly',     icon: '😊', name: 'Friendly',     desc: 'Warm & approachable' },
  { val: 'Professional', icon: '💼', name: 'Professional', desc: 'Trustworthy & polished' },
  { val: 'Promotional',  icon: '📣', name: 'Promotional',  desc: 'Fun & sales-focused' },
  { val: 'Formal',       icon: '🏛️', name: 'Formal',       desc: 'Serious & authoritative' },
];

const themes = [
  { val: 'promo',        icon: '🏷', name: 'Promo / Special Offer', desc: 'Discounts, bundles, limited-time deals',       tags: ['"10% off today!"', '"Buy 2 get 1"'] },
  { val: 'announcement', icon: '📣', name: 'Announcement',           desc: 'New hours, products, or news',                 tags: ['"Now open Sundays!"', '"New item"'] },
  { val: 'holiday',      icon: '🎊', name: 'Holiday Greeting',        desc: 'Seasonal and holiday messages',                tags: ['"Happy Pasko!"', '"Maligayang Bati"'] },
  { val: 'tips',         icon: '💡', name: 'Tips & Advice',           desc: 'Helpful info for your customers',              tags: ['"3 hair care tips"', '"Tool advice"'] },
  { val: 'general',      icon: '📝', name: 'General Update',          desc: 'Everyday posts, behind-the-scenes',            tags: ['"Good morning!"', '"Open today!"'] },
  { val: 'product',      icon: '⭐', name: 'Product Spotlight',       desc: 'Feature a specific item or service',           tags: ['"Our bestseller"', '"Signature dish"'] },
];

const languages = [
  { val: 'Filipino', flag: '🇵🇭', name: 'Filipino', desc: 'Purong Tagalog' },
  { val: 'Taglish',  flag: '🌏', name: 'Taglish',  desc: 'Mix ng Filipino & English' },
  { val: 'English',  flag: '🇬🇧', name: 'English',  desc: 'Full English' },
];

const schedOptions = [
  { val: 'optimal', icon: '⚡', name: 'Best Time',   sub: 'AI picks optimal time',  rec: 'Recommended' },
  { val: 'now',     icon: '🔴', name: 'Post Now',    sub: 'Goes live immediately',  rec: '' },
  { val: 'custom',  icon: '📅', name: 'Pick a Time', sub: 'Choose date & time',     rec: '' },
];

const genSteps = [
  'Reading your brand kit',
  'Writing your caption',
  'Designing your image',
  'Applying brand colors',
];

const categoryEmojiMap = {
  'Food & Carinderia': '🌱',
  'Salon & Beauty': '✂️',
  'Hardware Store': '🔧',
  'Resto-Bar': '🍻',
  'Clothing & Fashion': '👗',
  'Sari-Sari Store': '🏠',
  'Other': '🏪',
};

// ─── Post content bank ─────────────────────────────────────────────────────────
const postContent = {
  Filipino: {
    promo:        [{ h: '🏷 Espesyal na Alok!',      s: 'Limitadong panahon — huwag palampasin!', c: 'Huwag palampasin! 🏷 Espesyal na promosyon ngayon — kumita ng malaking tipid. Mag-mensahe o bumisita para malaman ang detalye. #Promo #Sulit' }],
    announcement: [{ h: '📣 Malaking Balita!',        s: 'May bago kaming darating para sa inyo',   c: 'May bagong balita kami! 📣 Sobrang excited na kaming ibahagi ito. Abangan ang susunod naming post! #Anunsyo' }],
    holiday:      [{ h: '🎊 Maligayang Kapistahan!', s: 'Mula sa aming pamilya sa inyo',            c: 'Maligayang Pasko at Manigong Bagong Taon mula sa aming pamilya! 🎊 Salamat sa inyong walang sawang suporta! #MaligayanPasko' }],
    tips:         [{ h: '💡 Payo ng Araw',            s: 'Kapaki-pakinabang na impormasyon',         c: '💡 Payo ng araw: Ang tamang pag-aalaga ay nagsisimula sa tamang kaalaman. Ibahagi namin ang aming mga natutunan! #Tips' }],
    general:      [{ h: 'Magandang Umaga! ☀️',       s: 'Handa kaming maglingkod sa inyo',          c: 'Magandang umaga sa lahat ng aming mga suki! ☀️ Handa na kaming maglingkod sa inyo ngayon. Kita-kits! #MagandangUmaga' }],
    product:      [{ h: '⭐ Paborito ng Mga Suki!',  s: 'Kailangan ninyong subukan ito',            c: 'Ito ang paborito ng aming mga suki! ⭐ Ang aming pinaka-popular na produkto ay laging available. Subukan ninyo! #Bestseller' }],
  },
  Taglish: {
    promo:        [{ h: '🏷 Special Offer Today!',   s: 'Limited time — grab it now!',              c: 'Huwag palampasin! 🏷 Special promo ngayon — kumita ng malaking tipid sa aming pinakamainam na deal. #Promo #Sulit' }],
    announcement: [{ h: '📣 Big News!',               s: 'Something new is coming',                  c: 'May bagong balita kami! 📣 Sobrang excited na kaming i-share ito. Stay tuned! #Announcement' }],
    holiday:      [{ h: '🎊 Happy Holidays!',         s: 'From our family to yours',                 c: 'Happy Holidays mula sa aming pamilya! 🎊 Salamat sa inyong patuloy na support sa buong taon. #HappyHolidays' }],
    tips:         [{ h: '💡 Quick Tip For You',       s: 'Useful advice from us',                    c: '💡 Tip ng araw: Proper care starts with the right knowledge. I-follow ang aming page para sa mga kapaki-pakinabang na tips! #Tips' }],
    general:      [{ h: 'Good Morning! ☀️',           s: 'Ready to serve you today',                 c: 'Magandang umaga sa lahat ng aming mga suki! ☀️ Ready na kaming maglingkod sa inyo ngayon. Kita-kits! #GoodMorning' }],
    product:      [{ h: '⭐ Bestseller Alert!',       s: 'You have to try this',                     c: 'Ito ang paborito ng aming mga suki! ⭐ Our most popular product is always available for you. Subukan ninyo! #Bestseller' }],
  },
  English: {
    promo:        [{ h: '🏷 Special Offer Today!',   s: 'Limited time deal — grab it now!',          c: "Don't miss out! 🏷 We have a special promo running today. Message us or visit the store to find out more. #Promo" }],
    announcement: [{ h: '📣 Big News!',               s: 'Something exciting is coming your way',     c: "We have exciting news to share with you! 📣 We can't wait to tell you all about it. Stay tuned! #Announcement" }],
    holiday:      [{ h: '🎊 Happy Holidays!',         s: 'From our family to yours',                  c: 'Merry Christmas and Happy New Year from all of us! 🎊 Thank you for your unwavering support throughout the year! #HappyHolidays' }],
    tips:         [{ h: '💡 Quick Tip For You',       s: 'Useful advice from our team',               c: '💡 Tip of the day: Proper care starts with the right knowledge. Follow our page for helpful tips every day! #Tips' }],
    general:      [{ h: 'Good Morning! ☀️',           s: 'Ready to serve you today',                  c: 'Good morning to all our valued customers! ☀️ We\'re ready and excited to serve you today. See you soon! #GoodMorning' }],
    product:      [{ h: '⭐ Customer Favorite!',      s: 'You have to try this',                      c: "This is our customers' all-time favorite! ⭐ Our most popular item is always available for you. Try it today! #BestSeller" }],
  },
};

// ─── Computed ─────────────────────────────────────────────────────────────────
const categoryEmoji = computed(() =>
  selectedCategory.value ? (categoryEmojiMap[selectedCategory.value] || '🏪') : '🌱'
);

const previewHeadlineFromName = computed(() => {
  const n = (bizName.value || 'LUTONG BAHAY').toUpperCase().split(' ');
  return n.slice(0, 2).join(' ');
});

const contextPlaceholder = computed(() => {
  const map = {
    promo: 'e.g. 10% off all items until Sunday',
    announcement: 'e.g. Now open on Sundays, 8am–4pm',
    holiday: 'e.g. Thanks for your support this year!',
    tips: 'e.g. Tips for choosing the right hair color',
    general: 'e.g. Opening at 9am today',
    product: 'e.g. Chicken Adobo meal, ₱85 with rice and drink',
  };
  return map[selectedTheme.value] || 'Add any details you want to include…';
});

const contextTip = computed(() => {
  const map = {
    promo: '💡 e.g. "10% off all items until Sunday"',
    announcement: '💡 e.g. "Now open on Sundays, 8am–4pm"',
    holiday: '💡 Leave blank for a general holiday greeting',
    tips: '💡 e.g. "Tips for choosing the right hair color"',
    general: '💡 e.g. "Opening at 9am today"',
    product: '💡 e.g. "Chicken Adobo meal, ₱85 with rice and drink"',
  };
  return map[selectedTheme.value] || '💡 Leave blank and PostAI will generate a general post.';
});

// ─── Methods ──────────────────────────────────────────────────────────────────
function showToast(msg, type = 'blue') {
  toastMsg.value = msg;
  toastType.value = type;
  toastVisible.value = true;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastVisible.value = false; }, 3500);
}

function dotClass(step) {
  if (step < currentStep.value) return 'done';
  if (step === currentStep.value) return 'active';
  return '';
}

function genStepClass(i) {
  if (i < genProgress.value) return 'done';
  if (i === genProgress.value) return 'active';
  return '';
}

function validateStep(step) {
  if (step === 1) {
    if (!bizName.value.trim()) { showToast('Please enter your business name', 'yellow'); return false; }
    if (!selectedCategory.value) { showToast('Please select a business category', 'yellow'); return false; }
  }
  if (step === 2) {
    if (!fbConnected.value) { showToast('Please connect your Facebook Page first', 'yellow'); return false; }
  }
  if (step === 3) {
    if (!selectedTheme.value) { showToast('Please select a content theme', 'yellow'); return false; }
  }
  return true;
}

function goTo(step) {
  if (!validateStep(currentStep.value)) return;
  currentStep.value = step;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (step === 4) startGeneration();
}

function selectTheme(theme) {
  selectedTheme.value = theme.val;
  selectedThemeLabel.value = theme.name;
}

function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { logoUrl.value = ev.target.result; showToast('Logo uploaded!', 'green'); };
  reader.readAsDataURL(file);
}

function handlePostImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) { showToast('Image must be under 10MB', 'yellow'); return; }
  const reader = new FileReader();
  reader.onload = ev => { uploadedImageUrl.value = ev.target.result; showToast('✓ Photo uploaded!', 'green'); };
  reader.readAsDataURL(file);
}

// ─── Facebook connection ────────────────────────────────────────────────────
const userStore = useUserStore();

// Preload the SDK so the login dialog opens instantly on click. Failures here
// are non-fatal (e.g. missing App ID) — they surface when the user connects.
// Also read any connection already persisted in Firestore so a returning user
// lands on Step 2 already connected and can skip straight to Continue.
onMounted(() => {
  loadFacebookSdk().catch(() => {});
  loadExistingConnection();
});

// Pre-fill the connected state from the Page(s) this user connected in a prior
// session. Reads client-safe metadata only (the Page token stays server-only).
async function loadExistingConnection() {
  const uid = userStore.getUserId || auth.currentUser?.uid;
  if (!uid) return;
  try {
    const connections = await fetchConnectedPages(uid);
    if (connections.length === 0) return;

    managedPages.value = connections.map((c) => ({
      id: c.pageId,
      name: c.pageName,
      category: '',
      followers: 0,
      pictureUrl: '',
    }));
    selectedPage.value = managedPages.value[0]; // most recently connected
    fbConnected.value = true;
  } catch (err) {
    // Non-fatal: the user can still connect fresh from the button.
    console.warn('Could not load existing Facebook connection:', err);
  }
}

function formatFollowers(n) {
  const count = Number(n) || 0;
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (count >= 1_000) return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(count);
}

async function connectFacebook() {
  fbConnecting.value = true;
  try {
    const { userAccessToken } = await facebookLogin();
    fbUserToken.value = userAccessToken;

    const pages = await fetchManagedPages(userAccessToken);
    if (pages.length === 0) {
      showToast('No Facebook Pages found. You need to manage at least one Page.', 'yellow');
      return;
    }

    managedPages.value = pages;
    if (pages.length === 1) {
      await selectPage(pages[0]);           // single Page → connect it directly
    } else {
      showPagePicker.value = true;          // multiple → let the user pick
    }
  } catch (err) {
    showToast(err?.message || 'Could not connect to Facebook.', 'red');
  } finally {
    fbConnecting.value = false;
  }
}

async function selectPage(page) {
  selectedPage.value = page;
  showPagePicker.value = false;

  // Hand the token + page off to the server-side exchange, which stores the
  // long-lived Page token (server-only). Only mark the step connected once the
  // connection is actually persisted — the Continue gate reflects real state,
  // not client-side optimism, so it survives a reload.
  try {
    await connectFacebookPage({ shortLivedToken: fbUserToken.value, pageId: page.id });
    fbConnected.value = true;
    showToast(`✓ Connected ${page.name}!`, 'green');
  } catch (err) {
    fbConnected.value = false;
    console.warn('Facebook Page connection failed server-side:', err);
    showToast(err?.message || 'Could not save the Page connection. Please try again.', 'red');
  }
}

function openPagePicker() {
  if (managedPages.value.length) {
    showPagePicker.value = true;
  } else {
    connectFacebook();
  }
}

function startGeneration() {
  isGenerating.value = true;
  genProgress.value = 0;
  regenCount.value = 0;

  let i = 0;
  const interval = setInterval(() => {
    if (i < genSteps.length) {
      genProgress.value = i;
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        isGenerating.value = false;
        populatePost(0);
      }, 400);
    }
  }, 700);
}

function populatePost(variantIdx) {
  const lang = selectedLang.value || 'Filipino';
  const theme = selectedTheme.value || 'general';
  const bank = postContent[lang]?.[theme] || postContent.Filipino.general;
  const item = bank[variantIdx % bank.length];
  const name = bizName.value || 'Your Business';
  previewHeadline.value = item.h;
  previewSub.value      = item.s;
  previewCaption.value  = item.c.replace(/\[BizName\]/g, name);
}

function regeneratePost() {
  regenLoading.value = true;
  setTimeout(() => {
    regenCount.value++;
    populatePost(regenCount.value);
    regenLoading.value = false;
    showToast('↻ New version generated — free of charge!', 'blue');
  }, 1200);
}

function approvePost() {
  credits.value--;
  const now = new Date();
  scheduledTime.value = now.toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' })
    + ', 12:00 PM PHT';
  goTo(5);
  showToast('🎉 Post approved and scheduled!', 'green');
}

function makeAnother() {
  selectedTheme.value = '';
  regenCount.value = 0;
  goTo(3);
}

function copyReferral() {
  navigator.clipboard?.writeText('https://postai.ph/ref/nanay123').catch(() => {});
  copyLabel.value = '✓ Copied!';
  showToast('✓ Referral link copied!', 'green');
  setTimeout(() => { copyLabel.value = 'Copy Link'; }, 2000);
}

function simulateSignup() {
  credits.value += 5;
  refCreditsEarned.value += 5;
  refBizCount.value++;
  refHistory.value.unshift({ event: 'signup', credits: 5, date: new Date().toLocaleString('en-PH'), note: "Aling Nena's Salon signed up via your referral link" });
  showToast('🎉 +5 free credits! New referral signed up.', 'green');
}

function simulateTopup() {
  credits.value += 5;
  refCreditsEarned.value += 5;
  refHistory.value.unshift({ event: 'topup', credits: 5, date: new Date().toLocaleString('en-PH'), note: "Aling Nena's Salon topped up — bonus credits earned!" });
  showToast('💳 +5 credits! Referral topped up.', 'green');
}
</script>

<style scoped>
/* ─── TOPBAR ─────────────────────────────────────────────────────────────── */
.topbar {
  position: sticky; top: 0; z-index: 100;
  background: #fff; border-bottom: 1px solid #e2e8f0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 68px; gap: 24px;
}
.logo { font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: -.5px; text-decoration: none; }
.logo span { color: #2563eb; }

.step-progress { display: flex; align-items: center; gap: 0; }
.step-dot {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  position: relative; z-index: 1;
}
.step-dot span {
  width: 32px; height: 32px; border-radius: 50%;
  background: #e2e8f0; color: #94a3b8;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; transition: all .3s;
}
.step-dot.active span { background: #2563eb; color: #fff; box-shadow: 0 0 0 4px #dbeafe; }
.step-dot.done span   { background: #22c55e; color: #fff; font-size: 0; }
.step-dot.done span::before { content: '✓'; font-size: 14px; }
.step-label { font-size: 11px; font-weight: 600; color: #94a3b8; white-space: nowrap; }
.step-dot.active .step-label { color: #2563eb; font-weight: 700; }
.step-dot.done .step-label   { color: #22c55e; }
.step-line { width: 48px; height: 2px; background: #e2e8f0; transition: background .3s; margin-bottom: 18px; }
.step-line.done { background: #22c55e; }

.topbar-credits {
  display: flex; align-items: center; gap: 6px;
  background: #fefce8; border: 1.5px solid #facc15;
  border-radius: 100px; padding: 6px 16px;
  font-size: 14px; font-weight: 700; color: #0f172a;
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
.flow-main { max-width: 1200px; margin: 0 auto; padding: 32px 24px 80px; }

/* ─── STEP 1 ─────────────────────────────────────────────────────────────── */
.s1-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.s1-form-col { display: flex; flex-direction: column; gap: 0; }
.s1-card {
  background: #fff; border-radius: 16px; border: 1.5px solid #e2e8f0;
  padding: 32px; display: flex; flex-direction: column; gap: 28px;
}
.s1-card-header { display: flex; flex-direction: column; gap: 8px; }
.s1-step-pill {
  display: inline-block; background: #eff6ff; color: #2563eb;
  font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 100px; width: fit-content;
}
.s1-title { font-size: 22px; font-weight: 900; color: #0f172a; }
.s1-desc  { font-size: 14px; color: #475569; line-height: 1.5; }
.s1-field { display: flex; flex-direction: column; gap: 8px; }
.s1-label { font-size: 14px; font-weight: 700; color: #0f172a; }
.s1-req   { color: #2563eb; }
.s1-hint  { font-size: 13px; font-weight: 400; color: #94a3b8; }
.s1-input-wrap {
  display: flex; align-items: center; gap: 10px;
  border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 11px 14px;
  background: #fff; transition: border-color .15s, box-shadow .15s;
}
.s1-input-wrap:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px #dbeafe; }
.s1-input-icon { font-size: 18px; flex-shrink: 0; }
.s1-input { border: none; outline: none; font-size: 15px; font-family: inherit; color: #0f172a; background: transparent; width: 100%; }

.s1-cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.s1-cat {
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px 8px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  cursor: pointer; transition: all .15s; font-family: inherit; text-align: center;
}
.s1-cat:hover { border-color: #3b82f6; background: #eff6ff; }
.s1-cat.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 2px #dbeafe; }
.s1-cat-icon { font-size: 22px; line-height: 1; }
.s1-cat-name { font-size: 11px; font-weight: 700; color: #0f172a; line-height: 1.3; }
.s1-cat.active .s1-cat-name { color: #1d4ed8; }

.s1-logo-row { display: flex; gap: 12px; }
.s1-logo-preview {
  width: 88px; height: 88px; border-radius: 12px; border: 1.5px solid #e2e8f0;
  background: #f1f5f9; display: flex; align-items: center; justify-content: center;
  overflow: hidden; flex-shrink: 0;
}
.s1-logo-default { font-size: 36px; }
.s1-logo-upload-box {
  flex: 1; border: 1.5px dashed #cbd5e1; border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; cursor: pointer; transition: all .2s; padding: 12px; background: #fff;
}
.s1-logo-upload-box:hover { border-color: #3b82f6; background: #eff6ff; }
.s1-upload-icon { font-size: 20px; color: #94a3b8; }
.s1-upload-text { font-size: 13px; font-weight: 700; color: #0f172a; }
.s1-upload-sub  { font-size: 11px; color: #94a3b8; }

.s1-tone-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.s1-tone {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;
  cursor: pointer; transition: all .15s; font-family: inherit; text-align: left;
}
.s1-tone:hover { border-color: #3b82f6; background: #eff6ff; }
.s1-tone.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 2px #dbeafe; }
.s1-tone-emoji { font-size: 20px; flex-shrink: 0; }
.s1-tone-name  { font-size: 13px; font-weight: 800; color: #0f172a; }
.s1-tone-desc  { font-size: 11px; color: #94a3b8; }

.s1-bottom-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px; background: #fff;
  border: 1.5px solid #e2e8f0; border-top: none;
  border-radius: 0 0 16px 16px; gap: 16px; flex-wrap: wrap;
}
.s1-secure { display: flex; align-items: center; gap: 10px; }
.s1-secure-icon { font-size: 18px; color: #2563eb; }
.s1-secure-title { font-size: 13px; font-weight: 700; color: #0f172a; }
.s1-secure-sub   { font-size: 11px; color: #94a3b8; }
.s1-actions { display: flex; align-items: center; gap: 16px; }
.s1-save-exit {
  background: none; border: none; font-size: 14px; font-weight: 700;
  color: #2563eb; cursor: pointer; font-family: inherit;
}
.s1-save-exit:hover { text-decoration: underline; }
.s1-continue {
  background: #facc15; color: #0f172a; border: none; border-radius: 10px;
  padding: 12px 28px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit;
  transition: all .2s;
}
.s1-continue:hover { background: #eab308; transform: translateY(-1px); }

/* Preview */
.s1-preview-col { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 84px; }
.s1-preview-title { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.s1-preview-sub   { font-size: 13px; color: #475569; }
.s1-fb-card {
  background: #fff; border-radius: 14px; border: 1px solid #e2e8f0;
  overflow: hidden; box-shadow: 0 4px 24px rgba(30,58,138,.08);
}
.s1-fb-header { display: flex; align-items: center; gap: 10px; padding: 14px 16px 10px; }
.s1-fb-avatar {
  width: 40px; height: 40px; background: #1d4ed8; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
}
.s1-fb-name { font-size: 14px; font-weight: 800; color: #0f172a; }
.s1-fb-time { font-size: 11px; color: #94a3b8; }
.s1-fb-dots { margin-left: auto; font-size: 18px; color: #94a3b8; }
.s1-fb-caption { font-size: 14px; color: #0f172a; line-height: 1.6; padding: 0 16px 12px; }
.s1-fb-image {
  position: relative; margin: 0 16px 12px;
  background: linear-gradient(135deg, #1e40af, #2563eb);
  border-radius: 12px; padding: 20px 16px;
  display: flex; align-items: center; justify-content: space-between; min-height: 120px;
}
.s1-fb-img-overlay { flex: 1; }
.s1-fb-img-headline {
  font-size: 20px; font-weight: 900; color: #facc15;
  line-height: 1.15; letter-spacing: -.3px; margin-bottom: 8px; text-transform: uppercase;
}
.s1-fb-img-sub { font-size: 12px; color: rgba(255,255,255,.85); line-height: 1.4; }
.s1-fb-food-emoji { font-size: 64px; line-height: 1; flex-shrink: 0; }
.s1-fb-reactions {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px 10px; font-size: 13px; color: #94a3b8;
  border-bottom: 1px solid #e2e8f0;
}
.s1-fb-reacts-left { display: flex; align-items: center; gap: 6px; }
.s1-react-count { font-size: 13px; color: #475569; }
.s1-fb-reacts-right { display: flex; gap: 12px; font-size: 12px; }
.s1-fb-actions { display: flex; padding: 4px 8px; }
.s1-fb-action {
  flex: 1; background: none; border: none; padding: 10px;
  font-size: 13px; font-weight: 600; color: #475569;
  cursor: default; border-radius: 8px; font-family: inherit;
}
.s1-preview-note {
  background: #eff6ff; border: 1px solid #dbeafe; border-radius: 12px; padding: 14px 16px;
  display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #475569; line-height: 1.5;
}
.s1-note-icon { color: #3b82f6; font-size: 16px; flex-shrink: 0; margin-top: 1px; }

/* ─── SHARED SX COMPONENTS ───────────────────────────────────────────────── */
.sx-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.sx-layout--center { display: flex; flex-direction: column; align-items: center; }
.sx-card {
  background: #fff; border-radius: 16px; border: 1.5px solid #e2e8f0;
  padding: 28px; display: flex; flex-direction: column; gap: 24px;
}
.sx-card-header { display: flex; flex-direction: column; gap: 8px; }
.sx-step-pill {
  display: inline-block; background: #eff6ff; color: #2563eb;
  font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 100px; width: fit-content;
}
.sx-title { font-size: 22px; font-weight: 900; color: #0f172a; }
.sx-desc  { font-size: 14px; color: #475569; line-height: 1.5; }
.sx-bottom-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0 0; gap: 12px; max-width: 100%; width: 100%;
}
.sx-bottom-bar--approve { padding-top: 16px; }
.sx-back {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 11px 20px; font-size: 14px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: all .15s;
}
.sx-back:hover { background: #f1f5f9; }
.sx-continue {
  background: #facc15; color: #0f172a; border: none; border-radius: 10px;
  padding: 12px 28px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit;
  transition: all .2s;
}
.sx-continue:hover:not(:disabled) { background: #eab308; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(234,179,8,.3); }
.sx-continue:disabled { opacity: .4; cursor: not-allowed; }
.sx-section-label {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 12px; font-weight: 800; text-transform: uppercase;
  letter-spacing: .08em; color: #94a3b8; margin-bottom: 12px;
}

/* Step 2: FB Connect */
.sx-fb-hero {
  display: flex; align-items: center; gap: 14px;
  padding: 16px; background: #eff6ff; border-radius: 12px; margin-bottom: 16px;
}
.sx-fb-icon-wrap { width: 52px; height: 52px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.sx-fb-title { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
.sx-fb-sub   { font-size: 13px; color: #475569; }
.sx-perms-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.sx-perm { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #0f172a; }
.sx-perm-icon {
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 900; flex-shrink: 0;
}
.sx-perm--allow .sx-perm-icon { background: #dcfce7; color: #22c55e; }
.sx-perm--never .sx-perm-icon { background: #dbeafe; color: #2563eb; font-size: 11px; }
.sx-perm--never { color: #1d4ed8; font-weight: 600; }
.sx-btn-fb {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; background: #1877F2; color: #fff; border: none; border-radius: 12px;
  padding: 15px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit;
  transition: all .2s; margin-bottom: 10px;
}
.sx-btn-fb:hover:not(:disabled) { background: #1565d8; transform: translateY(-1px); }
.sx-btn-fb:disabled { opacity: .6; cursor: not-allowed; transform: none; }
.sx-fb-note { font-size: 12px; color: #94a3b8; text-align: center; }
.sx-connected-banner {
  display: flex; align-items: center; gap: 12px;
  background: #dcfce7; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px;
}
.sx-connected-icon {
  width: 32px; height: 32px; background: #22c55e; color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 900; flex-shrink: 0;
}
.sx-connected-title { font-size: 15px; font-weight: 800; color: #0f172a; }
.sx-connected-sub   { font-size: 13px; color: #475569; }
.sx-page-card {
  display: flex; align-items: center; gap: 12px;
  border: 2px solid #2563eb; border-radius: 12px; padding: 14px 16px; background: #eff6ff; margin-bottom: 10px;
}
.sx-page-avatar {
  width: 44px; height: 44px; background: #1d4ed8; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;
}
.sx-page-name { font-size: 15px; font-weight: 800; color: #0f172a; }
.sx-page-meta { font-size: 12px; color: #94a3b8; }
.sx-page-check {
  margin-left: auto; width: 26px; height: 26px; background: #2563eb;
  color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 900;
}
.sx-switch-page { font-size: 12px; color: #94a3b8; text-align: center; }
.sx-switch-page a { color: #2563eb; font-weight: 600; cursor: pointer; }
.sx-page-photo { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

/* Step 2: Page picker modal */
.sx-picker-overlay {
  position: fixed; inset: 0; z-index: 900;
  background: rgba(15, 23, 42, .5);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.sx-picker {
  background: #fff; border-radius: 16px; width: 100%; max-width: 440px;
  max-height: 80vh; display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 64px rgba(15, 23, 42, .3);
}
.sx-picker-header {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  padding: 20px 20px 16px; border-bottom: 1px solid #e2e8f0;
}
.sx-picker-title { font-size: 17px; font-weight: 800; color: #0f172a; }
.sx-picker-sub   { font-size: 13px; color: #64748b; margin-top: 2px; }
.sx-picker-close {
  background: none; border: none; font-size: 16px; color: #94a3b8;
  cursor: pointer; line-height: 1; padding: 4px; flex-shrink: 0;
}
.sx-picker-close:hover { color: #0f172a; }
.sx-picker-list { display: flex; flex-direction: column; gap: 8px; padding: 16px 20px 20px; overflow-y: auto; }
.sx-picker-item {
  display: flex; align-items: center; gap: 12px;
  border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px;
  background: #fff; cursor: pointer; font-family: inherit; text-align: left; transition: all .15s;
}
.sx-picker-item:hover  { border-color: #3b82f6; background: #eff6ff; }
.sx-picker-item.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 2px #dbeafe; }
.sx-picker-avatar {
  width: 44px; height: 44px; background: #1d4ed8; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
}
.sx-picker-info { flex: 1; min-width: 0; }
.sx-picker-name { font-size: 14px; font-weight: 800; color: #0f172a; }
.sx-picker-meta { font-size: 12px; color: #94a3b8; }
.sx-picker-check {
  margin-left: auto; width: 24px; height: 24px; border-radius: 50%;
  background: #e2e8f0; color: #fff; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;
}
.sx-picker-check.on { background: #2563eb; }

/* Step 3: Theme */
.sx-theme-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.sx-theme {
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px 14px;
  display: flex; flex-direction: column; gap: 6px; cursor: pointer; transition: all .2s; font-family: inherit; text-align: left;
}
.sx-theme:hover { border-color: #3b82f6; transform: translateY(-2px); box-shadow: 0 4px 24px rgba(30,58,138,.10); }
.sx-theme.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 3px #dbeafe; }
.sx-theme-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 4px; }
.sx-theme-emoji { font-size: 28px; line-height: 1; }
.sx-theme-check {
  width: 20px; height: 20px; border-radius: 50%; background: #e2e8f0; color: #fff;
  font-size: 11px; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sx-theme.active .sx-theme-check { background: #2563eb; }
.sx-theme-name { font-size: 13px; font-weight: 800; color: #0f172a; }
.sx-theme-desc { font-size: 11px; color: #475569; line-height: 1.4; }
.sx-theme-tags { display: flex; flex-direction: column; gap: 3px; margin-top: 4px; }
.sx-theme-tags span { font-size: 10px; color: #94a3b8; background: #f1f5f9; border-radius: 4px; padding: 2px 6px; display: inline-block; font-style: italic; }
.sx-lang-field { margin-top: 24px; }
.sx-lang-label { display: block; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
.sx-lang-opts { display: flex; gap: 10px; flex-wrap: wrap; }
.sx-lang {
  flex: 1; min-width: 120px; display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px;
  cursor: pointer; text-align: left; transition: all .2s;
}
.sx-lang:hover  { border-color: #3b82f6; background: #eff6ff; }
.sx-lang.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 3px #dbeafe; }
.sx-lang-flag { font-size: 20px; flex-shrink: 0; }
.sx-lang-name { font-size: 14px; font-weight: 700; color: #0f172a; }
.sx-lang-desc { font-size: 11px; color: #94a3b8; margin-top: 1px; }
.sx-context-box { background: #f1f5f9; border-radius: 12px; padding: 16px; margin-top: 4px; display: flex; flex-direction: column; gap: 8px; }
.sx-context-label { font-size: 14px; font-weight: 700; color: #0f172a; }
.sx-optional { font-size: 12px; font-weight: 400; color: #94a3b8; }
.sx-context-input {
  width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 11px 14px;
  font-size: 14px; font-family: inherit; color: #0f172a; resize: vertical; min-height: 80px; background: #fff;
}
.sx-context-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px #dbeafe; }
.sx-context-tip { font-size: 12px; color: #94a3b8; }

/* Step 4: Generating */
.sx-generating {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 80px 24px; gap: 24px; min-height: 60vh;
}
.sx-gen-orb {
  position: relative; width: 96px; height: 96px;
  display: flex; align-items: center; justify-content: center;
}
.sx-gen-ring {
  position: absolute; border-radius: 50%; border: 3px solid transparent;
  animation: spin 1.6s linear infinite;
}
.sx-gen-ring--1 { width: 96px; height: 96px; border-top-color: #2563eb; }
.sx-gen-ring--2 { width: 72px; height: 72px; border-right-color: #facc15; animation-duration: 1.1s; animation-direction: reverse; }
.sx-gen-ring--3 { width: 48px; height: 48px; border-bottom-color: #3b82f6; animation-duration: 2s; }
@keyframes spin { to { transform: rotate(360deg); } }
.sx-gen-emoji { font-size: 28px; z-index: 1; }
.sx-gen-title { font-size: 22px; font-weight: 900; color: #0f172a; }
.sx-gen-sub   { font-size: 14px; color: #94a3b8; margin-top: -12px; }
.sx-gen-steps { display: flex; flex-direction: column; gap: 8px; }
.sx-gen-step {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; color: #94a3b8; transition: all .3s; font-weight: 500;
}
.sx-gen-step.active { color: #2563eb; font-weight: 700; }
.sx-gen-step.done   { color: #22c55e; font-weight: 600; }
.sx-gs-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0;
}
.sx-gen-step.active .sx-gs-dot { background: #2563eb; box-shadow: 0 0 0 3px #dbeafe; }
.sx-gen-step.done   .sx-gs-dot { display: none; }
.sx-gen-step.done::before { content: '✓ '; color: #22c55e; font-size: 13px; }

/* Step 4: Preview */
.sx-preview-wrap { width: 100%; }
.sx-preview-left  { display: flex; flex-direction: column; gap: 12px; position: sticky; top: 84px; }
.sx-preview-right { display: flex; flex-direction: column; gap: 0; }
.sx-fb-post { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(30,58,138,.08); }
.sx-fpc-header { display: flex; align-items: center; gap: 10px; padding: 14px 16px 8px; }
.sx-fpc-avatar {
  width: 38px; height: 38px; background: #1d4ed8; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
}
.sx-fpc-name { font-size: 13px; font-weight: 800; color: #0f172a; }
.sx-fpc-time { font-size: 11px; color: #94a3b8; }
.sx-fpc-dots { margin-left: auto; color: #94a3b8; font-size: 16px; }
.sx-fpc-caption { font-size: 13px; color: #0f172a; line-height: 1.6; padding: 0 16px 10px; }
.sx-fpc-image {
  margin: 0 16px 12px; border-radius: 10px; padding: 18px 14px;
  background: linear-gradient(135deg, #1e40af, #2563eb);
  display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 90px;
}
.sx-fpc-headline { font-size: 16px; font-weight: 900; color: #facc15; margin-bottom: 6px; line-height: 1.2; }
.sx-fpc-sub      { font-size: 12px; color: rgba(255,255,255,.8); }
.sx-fpc-img-emoji { font-size: 48px; flex-shrink: 0; }
.sx-fpc-reactions {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px 10px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #e2e8f0;
}
.sx-fpc-actions { display: flex; padding: 2px 8px; }
.sx-fpc-actions button {
  flex: 1; background: none; border: none; padding: 10px;
  font-size: 13px; font-weight: 600; color: #475569; cursor: default; border-radius: 8px; font-family: inherit;
}
.sx-regen-badge { background: #dcfce7; color: #22c55e; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
.sx-regen-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.sx-regen-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px;
  font-size: 14px; font-weight: 700; cursor: pointer; color: #0f172a; font-family: inherit; transition: all .2s;
}
.sx-regen-btn:hover:not(:disabled) { background: #eff6ff; border-color: #3b82f6; color: #2563eb; }
.sx-regen-btn:disabled { opacity: .5; cursor: not-allowed; }
.sx-regen-count { font-size: 13px; color: #94a3b8; white-space: nowrap; }

.sx-edit-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
.sx-edit-label { font-size: 13px; font-weight: 700; color: #0f172a; }
.sx-edit-textarea {
  width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 11px 12px;
  font-size: 13px; font-family: inherit; color: #0f172a; resize: vertical; min-height: 80px; line-height: 1.5;
}
.sx-edit-textarea:focus { outline: none; border-color: #3b82f6; }
.sx-edit-input {
  width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;
  font-size: 14px; font-family: inherit; color: #0f172a; transition: border-color .15s;
}
.sx-edit-input:focus { outline: none; border-color: #3b82f6; }
.sx-img-opts { display: flex; gap: 8px; margin-bottom: 10px; }
.sx-img-opt {
  flex: 1; display: flex; align-items: center; gap: 10px;
  padding: 11px 13px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: #fff; cursor: pointer; text-align: left; transition: all .2s;
}
.sx-img-opt:hover  { border-color: #3b82f6; background: #eff6ff; }
.sx-img-opt.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 3px #dbeafe; }
.sx-img-opt-icon { font-size: 18px; flex-shrink: 0; }
.sx-img-opt-name { font-size: 13px; font-weight: 700; color: #0f172a; }
.sx-img-opt-desc { font-size: 11px; color: #94a3b8; }
.sx-img-drop {
  border: 2px dashed #e2e8f0; border-radius: 10px; padding: 24px 16px; text-align: center;
  cursor: pointer; transition: all .2s; background: #f1f5f9; min-height: 100px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
}
.sx-img-drop:hover { border-color: #3b82f6; background: #eff6ff; }
.sx-img-drop-icon { font-size: 24px; }
.sx-img-drop-text { font-size: 13px; font-weight: 600; color: #0f172a; }
.sx-img-drop-hint { font-size: 11px; color: #94a3b8; }
.sx-img-uploaded-badge { background: rgba(0,0,0,.55); color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px; margin-bottom: 8px; }
.sx-img-remove { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 100px; padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer; color: #0f172a; }
.sx-img-remove:hover { border-color: #ef4444; color: #ef4444; }
.sx-sched-opts { display: flex; flex-direction: column; gap: 8px; }
.sx-sched {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;
  cursor: pointer; transition: all .15s; font-family: inherit; text-align: left; position: relative;
}
.sx-sched:hover  { border-color: #3b82f6; background: #eff6ff; }
.sx-sched.active { border-color: #2563eb; background: #eff6ff; }
.sx-sched-icon { font-size: 18px; flex-shrink: 0; }
.sx-sched-name { font-size: 13px; font-weight: 700; color: #0f172a; }
.sx-sched-sub  { font-size: 11px; color: #94a3b8; }
.sx-sched-rec {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: #2563eb; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px;
}
.sx-custom-time { margin-top: 8px; }
.sx-credit-note {
  display: flex; align-items: center; gap: 8px;
  background: #fefce8; border: 1px solid #fde68a; border-radius: 10px;
  padding: 12px 14px; font-size: 13px; color: #0f172a; line-height: 1.5; margin-top: 4px;
}
.sx-credit-icon { font-size: 16px; flex-shrink: 0; }
.sx-approve-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 12px;
  background: #2563eb; color: #fff; border: none; border-radius: 12px; padding: 15px 28px;
  font-size: 16px; font-weight: 800; cursor: pointer; font-family: inherit; transition: all .2s;
}
.sx-approve-btn:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,.35); }
.sx-approve-credit { background: rgba(255,255,255,.2); border-radius: 100px; padding: 3px 10px; font-size: 12px; font-weight: 700; }

/* Step 5: Success */
.sx-success-wrap {
  display: flex; flex-direction: column; align-items: center;
  gap: 28px; padding: 48px 24px; max-width: 620px; margin: 0 auto; text-align: center;
}
.sx-success-circle {
  width: 76px; height: 76px; background: #22c55e; color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 34px; font-weight: 900;
  box-shadow: 0 0 0 12px #dcfce7;
  animation: popIn .5s cubic-bezier(.175,.885,.32,1.6) forwards;
}
@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.sx-success-title { font-size: 32px; font-weight: 900; color: #0f172a; }
.sx-success-sub   { font-size: 16px; color: #475569; max-width: 420px; margin-top: -12px; }
.sx-sched-cards   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; }
.sx-sched-card {
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px;
  text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.sx-sched-card-icon  { font-size: 24px; }
.sx-sched-card-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #94a3b8; }
.sx-sched-card-val   { font-size: 15px; font-weight: 800; color: #0f172a; }

/* Referral dashboard */
.sx-ref-dashboard {
  width: 100%; background: linear-gradient(135deg, #1e3a8a, #1e40af);
  border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px;
}
.sx-ref-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.sx-ref-title { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.sx-ref-sub   { font-size: 12px; color: rgba(255,255,255,.6); }
.sx-ref-rules { display: flex; align-items: center; gap: 12px; }
.sx-ref-rule  { display: flex; align-items: center; gap: 8px; }
.sx-ref-rule-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;
}
.sx-rr--blue   { background: #2563eb; color: #fff; }
.sx-rr--yellow { background: #facc15; color: #0f172a; }
.sx-ref-rule-label { font-size: 11px; color: rgba(255,255,255,.6); }
.sx-ref-rule-val   { font-size: 14px; font-weight: 800; color: #facc15; }
.sx-ref-rule-divider { width: 1px; height: 32px; background: rgba(255,255,255,.15); }
.sx-ref-stats {
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.08); border-radius: 12px; padding: 16px 20px; gap: 0;
}
.sx-ref-stat { flex: 1; text-align: center; }
.sx-ref-stat-num { font-size: 32px; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 4px; }
.sx-ref-stat-lbl { font-size: 11px; color: rgba(255,255,255,.55); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
.sx-ref-stat-divider { width: 1px; height: 48px; background: rgba(255,255,255,.15); flex-shrink: 0; }
.sx-ref-stat--potential .sx-ref-stat-num { color: #facc15; }
.sx-rn-link-row { display: flex; gap: 10px; }
.sx-rn-link-input {
  flex: 1; background: rgba(255,255,255,.12); border-radius: 8px;
  padding: 10px 14px; font-size: 13px; color: rgba(255,255,255,.9); display: flex; align-items: center;
}
.sx-rn-copy {
  background: #facc15; color: #0f172a; border: none; border-radius: 8px;
  padding: 10px 18px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; white-space: nowrap;
}
.sx-rn-copy:hover { background: #eab308; }
.sx-rn-share-row { display: flex; gap: 10px; }
.sx-rn-share-row button {
  flex: 1; background: rgba(255,255,255,.12); border: 1.5px solid rgba(255,255,255,.2);
  border-radius: 8px; padding: 10px; font-size: 13px; font-weight: 600;
  color: #fff; cursor: pointer; font-family: inherit; transition: all .15s;
}
.sx-rn-share-row button:hover { background: rgba(255,255,255,.22); }
.sx-ref-log-section { background: rgba(255,255,255,.06); border-radius: 10px; padding: 14px; }
.sx-ref-log-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: rgba(255,255,255,.5); margin-bottom: 10px; }
.ref-log-empty { font-size: 13px; color: rgba(255,255,255,.4); text-align: center; padding: 8px 0; }
.ref-log-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.08);
}
.ref-log-item:last-child { border-bottom: none; }
.ref-log-icon   { font-size: 18px; flex-shrink: 0; }
.ref-log-body   { flex: 1; }
.ref-log-note   { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.9); }
.ref-log-date   { font-size: 11px; color: rgba(255,255,255,.45); margin-top: 2px; }
.ref-log-credit { font-size: 13px; font-weight: 800; color: #facc15; background: rgba(250,204,21,.15); border-radius: 100px; padding: 3px 10px; white-space: nowrap; }
.sx-ref-test-btns { display: flex; gap: 8px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,.1); padding-top: 12px; }
.sx-ref-test-btn {
  flex: 1; background: rgba(255,255,255,.1); border: 1px dashed rgba(255,255,255,.2);
  border-radius: 8px; padding: 9px 12px; font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,.7); cursor: pointer; font-family: inherit; transition: all .15s; text-align: center;
}
.sx-ref-test-btn:hover { background: rgba(255,255,255,.18); color: #fff; }
.sx-success-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.sx-back-home {
  display: inline-flex; align-items: center; padding: 12px 22px;
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-size: 14px; font-weight: 700; color: #475569; text-decoration: none; transition: all .15s;
}
.sx-back-home:hover { background: #f1f5f9; }

/* ─── TOAST ───────────────────────────────────────────────────────────────── */
.toast {
  position: fixed; bottom: 32px; right: 32px;
  background: #0f172a; color: #fff; padding: 14px 22px; border-radius: 12px;
  font-size: 14px; font-weight: 600; box-shadow: 0 12px 48px rgba(30,58,138,.18);
  z-index: 1000; transform: translateY(80px); opacity: 0;
  transition: all .3s cubic-bezier(.175,.885,.32,1.275); pointer-events: none;
}
.toast.show { transform: translateY(0); opacity: 1; }
.toast--green  { border-left: 4px solid #22c55e; }
.toast--blue   { border-left: 4px solid #3b82f6; }
.toast--yellow { border-left: 4px solid #facc15; }
.toast--red    { border-left: 4px solid #ef4444; }

/* ─── RESPONSIVE ─────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .s1-layout { grid-template-columns: 1fr; }
  .s1-preview-col { position: static; }
  .s1-cat-grid { grid-template-columns: repeat(3, 1fr); }
  .sx-layout { grid-template-columns: 1fr; }
  .sx-theme-grid { grid-template-columns: 1fr 1fr; }
  .sx-sched-cards { grid-template-columns: 1fr; }
  .sx-preview-left { position: static; }
  .topbar { padding: 0 16px; }
  .flow-main { padding: 24px 16px 60px; }
  .step-line { width: 20px; }
}
@media (max-width: 480px) {
  .s1-cat-grid { grid-template-columns: repeat(2, 1fr); }
  .sx-theme-grid { grid-template-columns: 1fr; }
  .s1-tone-grid { grid-template-columns: 1fr; }
  .sx-sched-cards { grid-template-columns: 1fr; }
}
</style>
