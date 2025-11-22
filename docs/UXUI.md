# Legis Ledger: UX/UI Design Specification

**Version:** 1.0  
**Date:** 2025-11-08  
**Purpose:** Define user experience and interface design for "Wikipedia filtered by confidence"

---

## Core Innovation: The Confidence Slider

**The Signature Interface Element**

Just as the Wayback Machine lets users scrub through **time** to see how websites evolved, Legis Ledger lets users scrub through **certainty** to see which claims survive different confidence thresholds.

```
┌─────────────────────────────────────────────────┐
│  Minimum Wage (Wikipedia Filtered View)         │
├─────────────────────────────────────────────────┤
│                                                  │
│  Confidence Threshold: ████████░░ 70%           │
│  [50%]──────●────────────────────[95%]          │
│                                                  │
│  Showing 2 of 8 claims at this threshold        │
│  • Overall employment effects (65%) [hidden]     │
│  • Wage gains for low earners (72%) [visible]   │
│                                                  │
│  ⚠️  Move slider left to see uncertain claims    │
└─────────────────────────────────────────────────┘
```

**This is our Wayback Machine date scrubber, but for epistemic certainty instead of temporal change.**

---

## Design Principles

### 1. Transparency Over Simplification

**Don't hide uncertainty - make it interactive:**
- Users CHOOSE their confidence threshold
- System shows how many claims survive at each level
- Explicitly show what's hidden and why

**Bad (hiding complexity):**
```
Minimum Wage: Employment effects are unclear
```

**Good (interactive uncertainty):**
```
Minimum Wage: 2 of 8 claims survive at 70% threshold
[Adjust threshold ←→ to see more or fewer claims]
```

### 2. User Agency Over System Authority

**Users decide what confidence level they trust:**
- No "correct" threshold imposed by system
- User can set personal default (conservative 90% or permissive 50%)
- Shareable URLs preserve chosen threshold

### 3. Progressive Disclosure

**Start simple, reveal complexity on demand:**

**Level 1 (Default view):**
```
✓ Wage gains for low earners (72%)
  Low-wage workers see 3-5% earnings increase
```

**Level 2 (Click to expand):**
```
✓ Wage gains for low earners (72%)
  Low-wage workers see 3-5% earnings increase
  
  Evidence: 15 studies, Grade A+ meta-analysis
  Could be wrong: Publication bias, sectoral variation
  [View full Bayesian analysis ↓]
```

**Level 3 (Full detail):**
```
[Complete Bayesian reasoning path]
[All sources with DOIs]
[Probability provenance]
[How to verify independently]
```

### 4. Honest Defaults

**Default confidence threshold: 70%**

**Rationale:**
- Not too strict (90% shows almost nothing)
- Not too permissive (50% shows speculation)
- Moderate confidence (reasonable person standard)
- User can adjust immediately

### 5. Visual Clarity Over Verbal Hedging

**Show don't tell:**

**Bad (verbal):**
```
"This claim is moderately confident but has some uncertainty 
and you should interpret it with caution while considering..."
```

**Good (visual):**
```
Confidence: ████████░░ 72%
Could be wrong: ████░░░░░░ 28%
```

### 6. Clarity for Null Results

**Why**: We identified that an "inverse" Bayes Factor (like BF=0.444) is confusing. The UI must solve this.

**UXUI.md Implementation**: Add a component called "The Null Hypothesis Indicator."

**Logic**: When favorsNullHypothesis: true, the UI should not just show a low confidence score. It must visually change state.

**Example**: The "Confidence Bar" could turn grey, and the "The Confidence Readout" text should change from "Confidence: 40%" to "Evidence Favors No Effect (Confidence: 40%)." This makes the "nothing here" conclusion an active, clear finding, not a passive failure.

### 7. Instant Auditability (Data Quality Badge)

**Why**: A user needs to know why they should trust a calculation. The EVIDENCE_GRADING.md gives us Grade A, B, and C provenance.

**UXUI.md Implementation**: Add a component called the "Provenance Badge."

**Logic**: In the "Tug-of-War" (Bayesian path) visual, each piece of evidence (evidence[].factor) should display its probabilityProvenance.evidenceGrade (A, B, C) as a small, color-coded badge.

**Example**: A user could instantly see that a "Strong" BF of 9.5 is backed by Grade A data (meta-analysis), while another claim might be based on Grade C data (theoretical model). This builds trust instantly.

---

## Navigation Architecture

### Multi-Modal Navigation System

Users need multiple pathways depending on context:

| Navigation Method | Use Case | Parallel To |
|------------------|----------|-------------|
| **Search + Autocomplete** | "I want to find X" | Wikipedia |
| **Direct URL** | "Share this specific view" | Wayback Machine |
| **Browse Collections** | "Show me all health claims" | Wayback collections |
| **Embedded Links** | "What's related to this?" | Wikipedia links |
| **Confidence Slider** | "Adjust certainty threshold" | **Wayback date scrubber** |
| **Sidebar Navigation** | "See related claims" | Wikipedia sidebar |

---

## Interface Specifications

### 1. Home Page (Entry Point)

**Purpose:** Help users discover available content and understand the system

```
┌─────────────────────────────────────────────────┐
│  Legis Ledger: Wikipedia Filtered by Confidence │
├─────────────────────────────────────────────────┤
│                                                  │
│  🔍 [Search disputed claims...]                 │
│                                                  │
│  Your Confidence Threshold: ████████░░ 70%      │
│  [50%]──────●────────────────────[95%]          │
│  (Adjust your personal default)                 │
│                                                  │
│  Browse by:                                      │
│  [Health] [Economics] [Environment] [All →]     │
│                                                  │
│  Recently Updated:                               │
│  • Vitamin D (12 claims, avg 75% confidence)    │
│  • Minimum Wage (8 claims, avg 62% confidence)  │
│  • Creatine (5 claims, avg 88% confidence)      │
│                                                  │
│  Most Contested (Widest Confidence Range):       │
│  • Climate Change (15 claims, 45%-95% range)    │
│  • COVID Vaccines (10 claims, 40%-90% range)    │
│                                                  │
│  ℹ️  What is this? | How it works | About       │
│                                                  │
│  12 articles analyzed | Updated weekly          │
└─────────────────────────────────────────────────┘
```

**Key features:**
- Search always visible (top)
- Confidence slider prominent (sets expectation)
- Category browsing (health, economics, environment)
- Recent updates (shows active maintenance)
- Contested topics (shows we don't hide disagreement)

### 2. Search Bar with Autocomplete

**Always visible at top of every page:**

```
┌─────────────────────────────────────────────┐
│  🔍 Search disputed claims...                │
└─────────────────────────────────────────────┘

User types: "mini"

┌─────────────────────────────────────────────┐
│  🔍 mini                                     │
│                                              │
│  Results in database (2):                   │
│  ✓ Minimum Wage (8 claims, avg 62%)         │
│  ✓ Minimal Pairs in Linguistics (3 claims)  │
│                                              │
│  Not yet analyzed:                           │
│  • Minimum Wage (Wikipedia article)          │
│    [Suggest for analysis →]                  │
└─────────────────────────────────────────────┘
```

**Autocomplete behavior:**
- Shows ONLY articles in our database first
- Then shows "not yet analyzed" with option to suggest
- Displays number of claims + average confidence
- Clear distinction between "available" and "coming soon"

### 3. Article View (Core Experience)

**Primary interface where users spend most time:**

```
┌─────────────────────────────────────────────────┐
│  📄 Minimum Wage              🔗 Wikipedia       │
├─────────────────────────────────────────────────┤
│                                                  │
│  Confidence Threshold: ████████░░ 70%           │
│  [50%]──────●────────────────────[95%]          │
│                                                  │
│  Showing 2 of 8 claims at this threshold        │
│  💡 Drag slider to see more or fewer claims      │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  ✅ CLAIM 1: Wage gains for low earners (72%)   │
│  ─────────────────────────────────────────────  │
│  Low-wage workers see 3-5% earnings increase    │
│  when minimum wage rises.                       │
│                                                  │
│  Evidence: Grade A+ (Meta-analysis)             │
│  Could be wrong: Sectoral variation, timing     │
│                                                  │
│  [View full Bayesian analysis ↓]                │
│  [View sources (12) ↓]                          │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  ✅ CLAIM 2: Small overall employment (71%)     │
│  ─────────────────────────────────────────────  │
│  Employment effects are small or zero in most   │
│  studies (elasticity ~0 to -0.1).               │
│                                                  │
│  Evidence: Grade A+ (Multiple meta-analyses)    │
│  Could be wrong: Teenage workers, small firms   │
│                                                  │
│  [View full Bayesian analysis ↓]                │
│  [View sources (18) ↓]                          │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  ⚠️  6 MORE CLAIMS BELOW 70% THRESHOLD          │
│                                                  │
│  Hidden claims (adjust slider to view):         │
│  • Teenage employment effects (60%)             │
│  • Monopsony power reduces harm (58%)           │
│  • Long-term career effects unclear (45%)       │
│  • Business closures minimal (67%)              │
│  • Inflation effects negligible (69%)           │
│  • Income inequality reduction (62%)            │
│                                                  │
│  [Show all claims regardless of confidence →]   │
│                                                  │
└─────────────────────────────────────────────────┘

┌──────────────────────────┐
│ SIDEBAR                  │
├──────────────────────────┤
│ Related Claims           │
│ • Living wage            │
│ • Universal Basic Income │
│ • Wage theft             │
│                          │
│ Same Topic, Different    │
│ Confidence:              │
│ [View at 50%]            │
│ [View at 80%]            │
│ [View at 95%]            │
│                          │
│ Quick Actions:           │
│ 📤 Share this view       │
│ 🔖 Bookmark              │
│ 📊 View data             │
│ ℹ️  How to verify        │
└──────────────────────────┘
```

**Key features:**
- **Confidence slider**: Always visible, always interactive
- **Claim count**: "Showing X of Y" creates transparency
- **Visible claims**: Full summaries with evidence grades
- **Hidden claims**: Listed with confidence levels (not completely hidden)
- **Progressive disclosure**: Summaries → Full analysis on demand
- **Sidebar**: Related claims, quick actions

### 4. Confidence Spectrum Visualization

**Advanced view showing claim distribution:**

```
┌─────────────────────────────────────────────────┐
│  Minimum Wage - Confidence Spectrum              │
├─────────────────────────────────────────────────┤
│                                                  │
│  Number of claims at each confidence level:     │
│                                                  │
│  8 │     ████                                    │
│  7 │     ████                                    │
│  6 │ ██  ████                                    │
│  5 │ ██  ████                                    │
│  4 │ ██  ████  ██                                │
│  3 │ ██  ████  ██                                │
│  2 │ ██  ████  ██  ██                            │
│  1 │ ██  ████  ██  ██  ██                        │
│  0 │ ░░  ░░░░  ░░  ░░  ░░                        │
│    └─────────────────────────────────────────   │
│    50%  60%  70%  80%  90%  95%                 │
│                                                  │
│  💡 Most claims cluster around 60-70% confidence │
│     indicating genuine uncertainty in research   │
│                                                  │
│  Your threshold: 70% ─────●                     │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Purpose:**
- Shows users WHERE claims cluster
- Visualizes "this is contested" vs "this is settled"
- Helps users choose appropriate threshold

### 5. Full Claim Detail View

**When user clicks "View full Bayesian analysis":**

```
┌─────────────────────────────────────────────────┐
│  ← Back to Minimum Wage                          │
├─────────────────────────────────────────────────┤
│                                                  │
│  CLAIM: Wage gains for low earners              │
│  Confidence: 72%                                │
│  Grade: A+ (Meta-analysis)                      │
│                                                  │
├─────────────────────────────────────────────────┤
│  📊 BAYESIAN ANALYSIS                           │
├─────────────────────────────────────────────────┤
│                                                  │
│  Prior: 60%                                     │
│  Why? Base rate of labor market interventions   │
│  Source: Historical policy analysis (Smith 2020)│
│                                                  │
│  Evidence Update 1: Martinez & Martinez (2021)  │
│  Meta-analysis shows consistent 3-5% increase   │
│  BF: 8.0 (Strong evidence)                      │
│  Posterior: 60% → 68%                           │
│                                                  │
│  Evidence Update 2: Doucouliagos (2009)         │
│  Independent meta-analysis confirms finding     │
│  BF: 6.0 (Strong evidence)                      │
│  Posterior: 68% → 72%                           │
│                                                  │
│  [View calculation details ↓]                   │
│  [Verify with calculator ↓]                     │
│                                                  │
├─────────────────────────────────────────────────┤
│  ⚠️  COULD BE WRONG BECAUSE:                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  • Publication bias (positive results published)│
│  • Sectoral variation (effects differ by industry)│
│  • Regional differences (US vs EU labor markets) │
│  • Timing assumptions (short vs long run)       │
│                                                  │
├─────────────────────────────────────────────────┤
│  ✅ HOW TO VERIFY INDEPENDENTLY:                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. Read Martinez & Martinez (2021) [DOI link]  │
│  2. Check Bureau of Labor Statistics wage data  │
│  3. Consult economist at your institution        │
│  4. Use our Bayesian calculator to check math   │
│                                                  │
├─────────────────────────────────────────────────┤
│  📚 SOURCES (12)                                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Full bibliography with DOIs]                  │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Key features:**
- Complete transparency (every step visible)
- Plain language explanations
- Independent verification pathways
- Full source list

### 6. Browse by Collection

```
┌─────────────────────────────────────────────────┐
│  Browse: Health & Medicine                       │
├─────────────────────────────────────────────────┤
│                                                  │
│  High Confidence (>80% avg):                    │
│  ✅ Creatine supplementation (88% avg, 5 claims)│
│  ✅ Vitamin D for bone health (85% avg, 3 claims)│
│                                                  │
│  Moderate Confidence (60-80%):                  │
│  ⚠️  Vitamin D for other outcomes (73%, 9 claims)│
│  ⚠️  Intermittent fasting (68%, 7 claims)        │
│  ⚠️  Omega-3 fatty acids (71%, 6 claims)         │
│                                                  │
│  Low Confidence (<60% avg):                     │
│  ❓ COVID vaccine long-term effects (52%, 8 claims)│
│                                                  │
│  Filter by your threshold: [70%]──●──[95%]      │
└─────────────────────────────────────────────────┘
```

---

## URL Structure

### Clean, Semantic URLs

**Format:**
```
legisledger.org/wiki/{article_name}?confidence={threshold}
```

**Examples:**
```
legisledger.org/wiki/Minimum_Wage?confidence=70
legisledger.org/wiki/Vitamin_D?confidence=80
legisledger.org/wiki/Climate_Change?confidence=95
```

**URL behavior:**
- Default confidence: 70% (if not specified)
- Shareable (preserves user's chosen threshold)
- Bookmarkable
- Clean (no ugly query params except confidence)

**Special URLs:**
```
legisledger.org/                         → Home page
legisledger.org/browse/health            → Category browse
legisledger.org/about                    → What is this?
legisledger.org/methodology              → How it works
legisledger.org/wiki/{article}           → Article at default 70%
legisledger.org/wiki/{article}/spectrum  → Confidence spectrum view
legisledger.org/wiki/{article}/sources   → Full source bibliography
```

---

## Interaction Design

### Confidence Slider Behavior

**Mouse/Desktop:**
- **Drag handle**: Smooth scrubbing (immediate updates)
- **Click track**: Jump to that threshold
- **Keyboard**: Arrow keys adjust by 5%

**Touch/Mobile:**
- **Drag handle**: Smooth scrubbing
- **Tap track**: Jump to that threshold
- **Pinch**: Not used (confusing with zoom)

**Live updates:**
- Claim count updates immediately ("Showing X of Y")
- Claims fade in/out based on threshold
- Smooth animations (not jarring)

### Progressive Disclosure

**Collapsed (default):**
```
✅ Wage gains for low earners (72%)
   Low-wage workers see 3-5% earnings increase
   [View details ↓]
```

**Expanded (click "View details"):**
```
✅ Wage gains for low earners (72%)
   Low-wage workers see 3-5% earnings increase
   
   Evidence: Grade A+ meta-analysis
   Could be wrong: Publication bias, sectoral variation
   
   [View full Bayesian analysis ↓] [View sources ↓]
```

**Fully expanded:**
```
[Complete Bayesian analysis]
[All sources]
[Verification pathways]
```

### Mobile Responsive Design

**Mobile priorities:**
1. **Search bar**: Sticky at top
2. **Confidence slider**: Horizontal (full width)
3. **Claim cards**: Stack vertically
4. **Sidebar**: Collapses to bottom accordion
5. **Long content**: "Read more" truncation

**Desktop priorities:**
1. **Sidebar**: Always visible (context)
2. **Wide slider**: More precision
3. **Multi-column**: Show more claims at once

---

## Visual Design System

### Colors

**Confidence scale:**
- **90-100%**: Green (#4CAF50) - High confidence
- **70-89%**: Blue (#2196F3) - Moderate confidence
- **50-69%**: Yellow (#FFC107) - Low confidence
- **Below 50%**: Gray (#9E9E9E) - Speculation

**UI elements:**
- Primary: Blue (#2196F3)
- Success: Green (#4CAF50)
- Warning: Yellow (#FFC107)
- Error: Red (#F44336)
- Background: White (#FFFFFF)
- Text: Dark gray (#212121)

### Typography

**Headers:**
- Font: Inter or system font
- Weight: 600 (semi-bold)
- Size: 24px (H1), 20px (H2), 16px (H3)

**Body:**
- Font: Inter or system font
- Weight: 400 (regular)
- Size: 16px
- Line height: 1.6

**Evidence grades:**
- Font: Monospace (for consistency)
- Example: `Grade A+` `Grade A` `Grade B`

### Icons

**Claim status:**
- ✅ Meets threshold
- ⚠️  Below threshold (but close)
- ❓ Far below threshold
- 🔒 Canonical (>95%)

**Actions:**
- 🔍 Search
- 📊 View data
- 📤 Share
- 🔖 Bookmark
- ℹ️  Info/Help

---

## Accessibility

### WCAG 2.1 AA Compliance

**Color contrast:**
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI controls: 3:1 minimum

**Keyboard navigation:**
- All interactive elements focusable
- Logical tab order
- Skip navigation links
- Slider keyboard accessible (arrow keys)

**Screen readers:**
- Semantic HTML (header, main, nav, article)
- ARIA labels where needed
- Alt text for all images
- Live regions for slider updates

**Focus indicators:**
- Visible focus outlines (not removed)
- High contrast (blue #2196F3)

---

## Performance Targets

**Page load:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s

**Slider interaction:**
- Response time: <100ms
- Smooth 60fps animation

**Search autocomplete:**
- Results: <200ms
- Debounced after user stops typing (300ms)

---

## Implementation Phases

### Phase 1: MVP (Weeks 1-4)

**Essential features:**
- ✅ Home page with search
- ✅ Article view with confidence slider
- ✅ Claim cards (collapsed state)
- ✅ Direct URLs with confidence parameter
- ✅ Basic responsive design

**Deferred:**
- Browse by collection (can search instead)
- Full detail view (can expand cards)
- Sidebar navigation (focus on core experience)

### Phase 2: Polish (Weeks 5-8)

**Enhancements:**
- ✅ Browse by collection
- ✅ Full detail view (Bayesian analysis page)
- ✅ Sidebar navigation
- ✅ Confidence spectrum visualization
- ✅ Share/bookmark functionality

### Phase 3: Advanced (Weeks 9-12)

**Power features:**
- ✅ User accounts (save preferences)
- ✅ Personalized feeds ("Show me contested claims")
- ✅ Comparison view (side-by-side thresholds)
- ✅ Historical confidence tracking ("How has this changed?")
- ✅ Notification system ("New evidence for claims you follow")

---

## Success Metrics

**User engagement:**
- Time on page: >2 minutes avg
- Slider interactions: >3 adjustments per visit
- Claim expansions: >2 per visit
- Return visits: >30% within 1 week

**Comprehension:**
- User survey: >80% understand confidence threshold
- User survey: >70% feel empowered to judge claims
- User survey: >90% find interface intuitive

**Technical:**
- Page load: <2.5s (LCP)
- Mobile usage: >40% of traffic
- Accessibility: 100% WCAG 2.1 AA

---

## Design Rationale

### Why Confidence Slider as Primary Interface?

**Three reasons:**

1. **User agency**: Users choose their own threshold (not imposed by system)
2. **Educational**: Interactive adjustment teaches what confidence means
3. **Honest**: Shows explicitly what's hidden and why

**Alternative approaches considered:**
- Binary "true/false" badges → Too Wikipedia-like, hides uncertainty
- Verbal hedging ("may be", "likely") → Vague, not quantified
- Three tiers (High/Med/Low) → Loses precision, arbitrary cutoffs

**Slider advantages:**
- Continuous (not discrete buckets)
- Interactive (learning through exploration)
- Transparent (count updates live)

### Why Default to 70%?

**Rationale:**
- **Not too strict**: 90% shows almost nothing (frustrating)
- **Not too permissive**: 50% shows speculation (confusing)
- **Moderate confidence**: "More likely than not, but not certain"
- **Adjustable**: Users immediately see they can change it

**Tested alternatives:**
- 50%: Shows everything (overwhelming)
- 80%: Too strict (many good claims hidden)
- 90%: Almost nothing (looks empty)

### Why Show Hidden Claims?

**Rationale:**
- **Transparency**: Users know what's below threshold
- **Educational**: See the full range of confidence
- **Flexibility**: Quick adjustment to lower threshold

**Alternative considered:**
- Completely hide below-threshold claims → Felt like censorship
- Only show count ("6 more claims available") → Users want to see what they're missing

**Current approach:**
- List hidden claims with confidence levels
- "Adjust slider to view" prompt
- OR "Show all anyway" button

---

## Future Enhancements

### Advanced Features (Post-Launch)

**Personalization:**
- Save preferred confidence threshold
- Follow specific topics (get notified of updates)
- Custom feeds ("Show me all contested economics claims >60%")

**Collaboration:**
- Comments/discussion on claims (with own confidence votes)
- Expert annotations
- User-submitted evidence

**Visualization:**
- Network graphs (how claims relate)
- Temporal evolution (how confidence changed over time)
- Comparison mode (claim A vs claim B side-by-side)

**API Access:**
- Developers can query by article + threshold
- Embed widgets on other sites
- RSS feeds for specific topics

---

## Wayback Machine Parallels (Summary)

| Wayback Machine | Legis Ledger |
|----------------|--------------|
| Scrub through **time** | Scrub through **certainty** |
| Date picker → snapshots | Confidence slider → filtered claims |
| "5 snapshots in May 2024" | "2 claims survive at 70%" |
| Archive historical pages | Archive contested claims |
| "What did this look like then?" | "What's settled vs uncertain?" |
| URL: `web.archive.org/web/20180101/site` | URL: `legisledger.org/wiki/Topic?confidence=70` |
| Mission: Preserve web history | Mission: Preserve epistemic uncertainty |

**The innovation: Apply the Wayback Machine's temporal scrubbing interface to epistemic confidence instead of time.**

---

## Questions for User Testing

When we have a prototype, test with users:

1. **Comprehension**: "What does 72% confidence mean?"
2. **Trust**: "How confident are you in this claim after seeing the evidence?"
3. **Action**: "What would make you trust this more or less?"
4. **Threshold**: "Would you adjust the slider? Why?"
5. **Comparison**: "How is this different from Wikipedia?"

**Success criteria:**
- >80% correctly explain confidence threshold
- >70% adjust slider at least once
- >60% say they trust it more than Wikipedia alone
- >80% find it intuitive within 2 minutes

---

## References

**Design inspiration:**
- Wayback Machine (archive.org) - Temporal scrubbing interface
- Wikipedia - Clean information design
- FiveThirtyEight - Probability communication
- Metaculus - Prediction confidence ranges
- Our World in Data - Evidence-based charts

**Accessibility:**
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

**Performance:**
- Core Web Vitals: https://web.dev/vitals/
- PageSpeed Insights: https://pagespeed.web.dev/

---

**Version:** 1.0 (2025-11-08)  
**Next Review:** After MVP user testing  
**Maintainer:** Legis Ledger UX Team

---

**Key Takeaway:** The confidence slider is our signature innovation - it's the Wayback Machine's date scrubber, but for epistemic certainty. Everything else supports this core interaction.
