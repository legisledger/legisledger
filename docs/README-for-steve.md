# Vitamin D Filtered Wikipedia - MVP Demo

**For:** Steve Midgley  
**Date:** 2025-11-06  
**Purpose:** Demonstrate filtered Wikipedia product vision

---

## What This Is

This is a working prototype of your "filtered Wikipedia" product vision - showing Vitamin D health claims with user-controlled confidence thresholds.

**Files:**
- `vitamin-d-filtered-wikipedia-mvp.html` - Interactive demo (open in browser)
- `vitamin-d-filtered-mvp.json` - Underlying JSON structure
- This README

---

## Your Product Vision (From Email)

> "I think that's probably what people want: not a summary of 'what's right and what's less reliable' but simply, 'remove all the stuff below my threshold setting (eg 70%) and show me what the page looks like with what's left.'"

**Implemented:** ✅

**User experience:**
1. User sets confidence threshold (50%, 60%, 70%, 80%, 90%)
2. System filters claims to show only those meeting threshold
3. Removed claims shown separately with explanation
4. User can expand to see full Bayesian analysis

---

## The Two Views

### View 1: Filtered Wikipedia (Default)

**What users see first:**

```
Vitamin D - Filtered Wikipedia

Confidence Threshold: ≥70% (Recommended)

✅ 3 claims retained (meet threshold)
❌ 3 claims removed (below threshold)

───────────────────────────────────

Health Effects

✓ Vitamin D prevents rickets in children [90%]
✓ Reduces fracture risk in elderly (75+) [85%]  
✓ Reduces mortality in elderly (75+) [70%]

───────────────────────────────────

Claims Removed (Below 70% Threshold)

✗ Low vitamin D → dementia risk [65%]
  Why removed: Observational only, reverse causation possible

✗ Supplementation prevents dementia [50%]
  Why removed: RCT inconclusive, needs larger trials

✗ Prevents cancer [30%]
  Why removed: VITAL trial showed null result
```

**Value proposition:**
- **Clear actionable output:** "Here's what you can rely on"
- **User control:** Adjust threshold based on risk tolerance
- **Transparency:** See why claims were removed

### View 2: Full Transparency (Optional)

**For users who want deep dive:**

Each claim has expandable Bayesian analysis:
- Prior confidence (with source)
- Evidence updates (with Bayes Factors)
- Posterior confidence
- Source citations with DOIs
- Provenance disclaimers

**Value proposition:**
- **Reproducibility:** Anyone can verify calculations
- **Education:** Learn Bayesian reasoning
- **Trust:** "We show our work"

---

## Key Features Implemented

### 1. User-Controlled Thresholds

```
Threshold Options:
- ≥50% (Permissive): 6 claims shown
- ≥60% (Moderate-Permissive): 5 claims shown
- ≥70% (Recommended): 3 claims shown ← Default
- ≥80% (Conservative): 2 claims shown
- ≥90% (Very Conservative): 1 claim shown
```

**Business insight:** Different user personas want different thresholds:
- Health apps: 70% (balanced)
- Journalists: 80% (conservative, avoid retractions)
- Researchers: 50% (see emerging evidence)
- Physicians: 70-80% (evidence-based practice)

### 2. Removal Explanations

Instead of just hiding low-confidence claims, we show:
- What was removed
- Why it was removed (specific reason)
- What evidence exists (just not strong enough)
- What would change our mind

**Example:**
> **Removed:** Vitamin D prevents dementia [50%]  
> **Why:** RCT showed promising trend but underpowered (only 45 dementia cases). Needs larger trial (n>10,000) to confirm.

**This is educational, not just filtering.**

### 3. Provenance Transparency

Every filtered page includes:
- Who created this (Legis Ledger, not FDA)
- What it's NOT (not official medical authority)
- Potential biases (publication bias, industry funding)
- How to verify yourself (PubMed searches, guidelines)

**This builds trust through honesty, not authority.**

---

## Vitamin D Example - Why Good MVP

### Timely (August 2025 Headlines)

- Epoch Times: "Vitamin D Deficiency Linked to Dementia"
- Users panicked, couldn't find article again
- Confusion about deficiency vs. supplementation

**Our system solves this:**
- Distinguishes LOW vitamin D (65% confidence) from SUPPLEMENTATION (50% confidence)
- Shows what's confirmed (rickets, fractures) vs. uncertain (dementia, cancer)
- Gives practical guidance based on evidence level

### Clear Evidence Gradations

**Above threshold (≥70%):**
- Rickets prevention: 90% (canonical, 50+ years data)
- Fracture reduction (elderly): 85% (multiple RCTs)
- Mortality reduction (elderly): 70% (meta-analysis confirmed)

**Below threshold (<70%):**
- Deficiency → dementia: 65% (observational only)
- Supplementation → dementia: 50% (RCT inconclusive)
- Cancer prevention: 30% (VITAL null result)

**This demonstrates:**
- System handles both high and low confidence
- Filtering produces useful output (3 confirmed benefits)
- Removed claims show what's uncertain (not just "bad")

### Business Value Demonstration

**For health apps (MyFitnessPal, 23andMe):**
- User asks: "Should I take vitamin D?"
- App queries API with user's threshold preference (70%)
- Returns: "Yes, evidence supports 3 benefits. 3 uncertain claims removed."
- Reduces support burden, increases trust

**For journalists:**
- Reporter sees Epoch Times headline
- Checks filtered Wikipedia before writing story
- Headline becomes: "Vitamin D Benefits Confirmed for Bone Health, Dementia Claims Uncertain"
- Responsible journalism, fact-checking infrastructure

**For supplement companies:**
- Customers asking about scary headlines
- Company links to independent analysis
- Shows: "Bone health confirmed, dementia uncertain, cancer unlikely"
- Credible third-party validation

---

## Technical Implementation

### Data Structure (JSON)

```json
{
  "filteredSummary": {
    "thresholdApplied": 0.70,
    "claimsRetained": 3,
    "claimsRemoved": 3
  },
  "retainedClaims": [
    {
      "claim": "...",
      "confidence": 0.90,
      "evidenceGrade": "A+",
      "bayesianAnalysis": {...}
    }
  ],
  "removedClaims": [
    {
      "claim": "...",
      "confidence": 0.50,
      "removalReason": "..."
    }
  ]
}
```

**API endpoint design:**
```
GET /filter/vitamin-d?threshold=0.70
→ Returns filtered page with claims ≥70%

GET /filter/vitamin-d?threshold=0.50
→ Returns more permissive filter

GET /abstract/vitamin-d
→ Returns full JSON with all claims
```

### User Flow

```
1. User visits: legis-ledger.org/wikipedia/vitamin-d
2. Default threshold: 70%
3. Page renders with 3 claims visible, 3 removed
4. User can:
   - Adjust threshold (see more/fewer claims)
   - Expand Bayesian analysis
   - Download full JSON
   - Share filtered version
```

---

## Comparison: Before vs. After

### Before (What We Were Building)

**Score every claim, show all:**
```
Vitamin D Wikipedia

Overall reliability: 63%

Claims:
✓ Prevents rickets [90%] 🟢
✓ Reduces fractures [85%] 🟢
✓ Reduces mortality [70%] 🟢
? Deficiency → dementia [65%] 🟡
? Supplementation → dementia [50%] 🟠
✗ Prevents cancer [30%] 🔴
```

**Problem:** Information overload. What should I act on?

### After (Your Vision)

**Filter to confidence threshold, clean output:**
```
Vitamin D - Filtered Wikipedia (≥70%)

Retained:
✓ Prevents rickets [90%]
✓ Reduces fractures (elderly) [85%]
✓ Reduces mortality (elderly) [70%]

Removed:
✗ Deficiency → dementia [65%] (observational only)
✗ Supplementation → dementia [50%] (needs larger RCT)
✗ Prevents cancer [30%] (VITAL null result)

[Adjust threshold to see more/fewer claims]
```

**Solution:** Clear actionable output. "Here's what science supports at your chosen confidence level."

---

## Why This Works

### 1. User Agency

**Not:** "We decide what's reliable"  
**Instead:** "You choose your threshold"

**Different use cases:**
- Doctor prescribing: 80% threshold (conservative)
- Health blogger: 70% threshold (balanced)
- Researcher reviewing literature: 50% threshold (see emerging evidence)

### 2. Educational

**Removed claims aren't hidden, they're explained:**
- Why below threshold
- What evidence exists
- What would change confidence

**Users learn:**
- Evidence grading (A+ meta-analysis vs. C observational)
- Bayesian reasoning (how confidence updates)
- Scientific uncertainty (not everything is known)

### 3. Honest About Uncertainty

**We don't say:** "Science proves X"  
**We say:** "X has 70% confidence based on current evidence"

**Even canonical knowledge (rickets prevention, 90%):**
- Not 100% (epistemic humility)
- Could be wrong (10% chance)
- But close enough to act on

---

## Next Steps

### Short-term (This Week)

1. **Your feedback:**
   - Does this match your vision?
   - What would you change?
   - Which threshold should be default?

2. **Refinement:**
   - Iterate based on your input
   - Clean up UX
   - Add more interactivity

3. **More examples:**
   - Build 2-3 more filtered pages
   - Show range of topics (creatine, minimum wage)
   - Demonstrate breadth

### Medium-term (Next Month)

1. **User testing:**
   - Show to 10 potential customers
   - Get feedback on UX
   - Validate value proposition

2. **API development:**
   - Build REST API for filtering
   - Document endpoints
   - Create developer docs

3. **Revenue validation:**
   - Talk to health apps (integration interest?)
   - Talk to news orgs (licensing?)
   - Talk to supplement companies (white-label?)

### Long-term (Q1 2026)

1. **Corpus building:**
   - 10-15 Wikipedia-derived abstracts
   - Coverage: health, policy, scientific
   - Demonstrate range

2. **Institutional partnerships:**
   - Approach evidence-based orgs
   - Show working system
   - Explore co-branding

3. **Hiring:**
   - Bayesian statistician (CMU or Duke)
   - Validate methodology
   - Build academic credibility

---

## Questions for You

1. **Product vision:**
   - Does this match what you envisioned?
   - What would make it more compelling?

2. **Default threshold:**
   - Should 70% be default, or 80%?
   - Different defaults for different audiences?

3. **Removed claims section:**
   - Should it be collapsed by default?
   - Or prominent (educational value)?

4. **Business model:**
   - Which customer segment seems most promising?
   - Freemium (10 articles/month) or B2B only?

5. **Your role:**
   - 1-2 hours/month advising on strategy
   - Introductions to potential customers?
   - Feedback on product iterations?

---

## Files in This Demo

1. **vitamin-d-filtered-wikipedia-mvp.html**
   - Open in browser
   - Interactive demo
   - Shows both filtered and full transparency views

2. **vitamin-d-filtered-mvp.json**
   - Underlying data structure
   - All claims with Bayesian analysis
   - API-ready format

3. **README.md** (this file)
   - Product vision
   - Implementation details
   - Next steps

---

**Ready for your feedback!**

When you have 15 minutes:
1. Open `vitamin-d-filtered-wikipedia-mvp.html` in browser
2. Play with threshold selector
3. Expand "View Bayesian Analysis" sections
4. Let me know: Does this match your vision?

**Thank you for the strategic guidance that led to this pivot.** The filtered Wikipedia concept is clearer and more compelling than the scored Wikipedia we were building before.

—Damon