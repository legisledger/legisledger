# Legis Ledger: Product Development Roadmap

**Version:** 1.0  
**Date:** 2025-11-08  
**Last Updated:** 2025-11-08  
**Status:** Pre-launch development (repository private pending legal clearance)  
**Audience:** Team, collaborators, product execution

**Note:** For business strategy, fundraising, and investor materials, see [ROADMAP.md](ROADMAP.md)

---

## Mission

Build knowledge infrastructure that enables institutions to publish expert opinions with quantified confidence, transparent provenance, and structured disagreement - operationalizing Rauch's "Constitution of Knowledge" through Bayesian fact-checking.

**2026 Goal:** Have working prototype demonstrating value across health, policy, and scientific domains, ready for institutional partnerships.

---

## Current Status (November 2025)

### ✅ Completed

**Core Architecture:**
- ✅ Domain-agnostic schema (v1.2.0) finalized
- ✅ Bayesian calculation methodology documented
- ✅ Evidence grading system established (A+ → D)
- ✅ Provenance transparency framework (v1.1)
- ✅ Governance constitution documented
- ✅ Creation workflow documented (6-9 hours per abstract)

**Working Examples:**
- ✅ Creatine supplementation (scientific domain, 0.90 confidence)
  - Complete JSON abstract
  - Original MVP UI renderer
  - Grade A+ evidence (meta-analyses)
  
- ✅ Vitamin D supplementation (scientific domain, multiple claims)
  - Complete JSON abstract
  - Sent to Steve Midgley for strategic review
  - Demonstrates claim granularity (1 abstract = 1 claim architecture)

- 🚧 Minimum wage (policy domain, 0.60-0.72 confidence)
  - JSON abstract 90% complete
  - Demonstrates contested knowledge (doesn't meet 70% threshold)
  - Needs: Evidence hierarchy fix (lead with A+ meta-analyses)
  - Demonstrates uncertainty honestly

**Documentation:**
- ✅ README.md (project overview)
- ✅ FAQ.md (stakeholder questions)
- ✅ CONSTITUTION.md (governance by design)
- ✅ GOVERNANCE_NEXT_STEPS.md (implementation tasks)
- ✅ BAYESIAN_CALCULATION_METHOD.md (probability sourcing)
- ✅ CREATION_WORKFLOW.md (abstract creation process)
- ✅ DECISIONS.md (strategic choices log)
- ✅ FILE_MANAGEMENT_GUIDE.md (Claude Project vs Git)
- ✅ UXUI.md (interface design specification)
- ✅ ROADMAP_PRODUCT.md (this document)
- ✅ ROADMAP.md (business/investor roadmap)

**Strategic Clarity:**
- ✅ Pivot to "Bayesian fact-checker" (from federated infrastructure)
- ✅ Bootstrap with Wikipedia disputed articles (not waiting for institutions)
- ✅ Steve Midgley engaged as strategic advisor
- ✅ Hatch Act compliance strategy defined
- ✅ Business model preliminary validation targets set

### 🚧 In Progress

**Minimum Wage Abstract:**
- Status: 90% complete, needs revision
- Issue: Currently over-emphasizes individual researchers (Neumark/Dube)
- Fix needed: Lead with A+ meta-analyses (Martinez, Doucouliagos)
- Timeline: Complete this week

**Legal/PA Clearance:**
- Status: Pending
- Timeline: Expected Q2 2025
- Blocker: Repository remains private until cleared

**Strategic Advisory:**
- Status: Awaiting Steve Midgley feedback on Vitamin D abstract
- Next: Incorporate feedback, iterate on presentation

---

## Immediate Priorities (This Week)

### Priority 1: Complete Minimum Wage Abstract

**Action items:**
1. Restructure evidence hierarchy:
   - Lead with Grade A+ meta-analyses (Martinez & Martinez 2021, Doucouliagos & Stanley 2009)
   - Secondary: Individual researchers (Neumark, Dube) as competing interpretations
   - Fix: Meta-analyses should get higher weight in Bayesian analysis

2. Add comprehensive disclaimers:
   ```json
   {
     "disclaimer": {
       "provenanceAndLimitations": {
         "methodologicalComplexity": "Third-party analysis of contested economic research. Full confidence assessment requires author participation.",
         "uncertaintyLevel": "HIGH - Multiple reasonable interpretations exist",
         "recommendations": [
           "Bayes professor review pending",
           "Author outreach planned (Neumark, Dube, Martinez)",
           "Consider preliminary pending expert validation"
         ]
       }
     }
   }
   ```

3. Finalize confidence levels:
   - Overall employment: 0.65-0.70 (moderate)
   - Teenage employment: 0.60-0.65 (moderate-low)
   - Wage gains: 0.72 (moderate-high)
   - All below 70% threshold (honest about uncertainty)

**Success criteria:**
- Evidence hierarchy correct (A+ leads)
- Conservative confidence estimates
- Comprehensive disclaimers
- Peer review ready

**Timeline:** Complete by end of week

### Priority 2: Create Filtered Wikipedia Mockup

**Purpose:** Show what user sees when claims don't meet threshold

**Mockup content:**
```
Minimum Wage - Filtered View (70% confidence threshold)

⚠️ NO CLAIMS MEET THRESHOLD

Available claims (below 70%):
• Overall employment effects small (65%) [Show anyway?]
• Teenage employment effects moderate (60%) [Show anyway?]
• Wage gains for low earners (72%) [Show anyway?]

💡 What this means:
As of 2025, minimum wage employment effects remain genuinely 
uncertain. Meta-analyses show small overall effects, but 
methodological debates continue.

This is HONEST UNCERTAINTY - not a failure of the system.

📊 View all claims (including below threshold)
🔬 Research agenda: What studies would resolve this?
```

**Success criteria:**
- Clear communication of uncertainty
- Option to view below-threshold claims
- Educational (explains what uncertainty means)
- Honest (doesn't hide that nothing meets threshold)

**Timeline:** Mockup complete this week

### Priority 3: Finalize Creatine Abstract

**Action items:**
1. Verify JSON matches schema v1.2.0
2. Ensure probability provenance complete
3. Add any missing disclaimers
4. Validate calculations with Bayesian calculator

**Success criteria:**
- Schema validation passes
- All probabilities sourced
- Conservative estimates applied
- Peer review ready

**Timeline:** Complete this week

---

## Near-Term Goals (Next 2-4 Weeks)

### Week 2: Steve Feedback & Iteration

**Waiting for:**
- Steve Midgley review of Vitamin D abstract
- Feedback on business model potential
- Suggestions for customer validation

**Actions when received:**
1. Incorporate feedback into Vitamin D abstract
2. Apply learnings to minimum wage
3. Refine value proposition messaging
4. Identify beta test customers (3-5 per category)

### Week 3-4: Additional Examples (Tier 1)

**Target: 2-3 more "easy" examples (Grade A+ evidence)**

**Candidates:**
1. **Omega-3 fatty acids** (heart health)
   - Meta-analyses available
   - Clear evidence base
   - Moderate confidence (0.65-0.75 expected)

2. **Intermittent fasting** (weight loss)
   - Recent systematic reviews
   - Growing evidence base
   - Moderate confidence (0.60-0.70 expected)

3. **Statins** (cardiovascular benefits)
   - Canonical knowledge (0.90+ expected)
   - Well-established evidence
   - Shows system with high-confidence claims

**Success criteria:**
- 5-7 total abstracts complete
- Mix of confidence levels (0.60-0.90)
- Mix of domains (health, policy)
- All peer reviewed

### Week 4: Bayes Professor Engagement Plan

**Objective:** Secure expert review of Bayesian methodology

**Action items:**
1. Prepare review materials:
   - Minimum wage abstract (most complex)
   - Bayesian calculation methodology doc
   - Specific questions for review

2. Questions for Bayes professor:
   - Are priors justified and sourced appropriately?
   - Are P(E|H) and P(E|~H) values reasonable?
   - Do Bayes Factors match evidence strength?
   - What would you do differently?

3. Schedule review session (2-3 hours)

**Success criteria:**
- Expert validation of methodology
- Identify any systematic issues
- Refine approach based on feedback
- Document lessons learned

---

## Medium-Term Milestones (Q1-Q2 2025)

### Month 2: Corpus Building (10+ Abstracts)

**Goal:** Prove system works across domains and confidence levels

**Target distribution:**

**High confidence (>0.80):**
- Creatine (0.90) ✅
- Statins cardiovascular benefit (0.90)
- Climate change CO₂ warming (0.95)

**Moderate confidence (0.60-0.80):**
- Vitamin D various outcomes (0.65-0.75) ✅
- Omega-3 (0.70)
- Intermittent fasting (0.68)
- Body cameras police accountability (0.65)

**Low confidence (<0.60):**
- Minimum wage employment (0.60-0.65) ✅
- Universal Basic Income pilots (0.55)
- COVID vaccine long-term effects (0.50)

**Success criteria:**
- 10-15 abstracts complete
- All domains represented (health, policy, scientific)
- All confidence ranges represented (0.50-0.95)
- All peer reviewed

### Month 3: UI/UX Development

**Phase 1 MVP Features:**

**Essential:**
- Home page with search
- Article view with confidence slider
- Claim cards (collapsed/expanded states)
- Direct URLs with confidence parameter
- Basic responsive design

**Technical stack:**
- Frontend: React or Vue.js
- Styling: Tailwind CSS
- Hosting: Vercel or Netlify (static initially)
- Data: JSON files (Git-backed)

**Success criteria:**
- Working prototype deployed
- Confidence slider functional
- 5+ articles rendered
- Mobile responsive

**See [UXUI.md](UXUI.md) for complete design specifications**

### Month 4: Beta Testing & Iteration

**Beta test cohorts (3-5 users each):**

1. **Journalists/fact-checkers:**
   - Can they verify claims faster?
   - Do they trust the confidence levels?
   - Would they cite this in articles?

2. **Health app developers:**
   - Would they integrate API?
   - What's missing for integration?
   - Pricing feedback

3. **Policy researchers:**
   - Does this help navigate contested claims?
   - What domains are most valuable?
   - Author participation interest?

4. **Educators:**
   - Can students understand confidence?
   - Useful for teaching critical thinking?
   - What's confusing?

**Success criteria:**
- Qualitative feedback from all cohorts
- Identify 2-3 "aha moments" per cohort
- Identify 2-3 major pain points
- At least 1 cohort wants more

### Month 5-6: Legal Clearance & Public Launch

**Pre-launch checklist:**
- ✅ Legal/PA clearance received
- ✅ 15+ abstracts complete and reviewed
- ✅ Working UI deployed
- ✅ Documentation complete
- ✅ Beta testing positive
- ✅ Press materials ready

**Launch activities:**
1. Repository goes public
2. Website live at legisledger.org
3. Blog post: "Why We Built This"
4. Outreach to beta testers
5. Submit to Show HN / Product Hunt

**Success metrics:**
- 1,000+ unique visitors first week
- 50+ GitHub stars first month
- 5+ institutional inquiries
- Media coverage (1-2 articles)

---

## Long-Term Vision (Late 2025 - 2026)

### Q3 2025: Author Participation Pilot

**Objective:** Test if researchers will submit their own abstracts

**Target authors:**
1. **Minimum wage economists:**
   - Approach Neumark, Dube, Martinez
   - "Would you submit your findings in this format?"
   - Test value proposition for researchers

2. **Health researchers:**
   - Vitamin D meta-analysis authors
   - Creatine researchers
   - Test: Does this help dissemination?

3. **Climate scientists:**
   - IPCC contributors
   - Test: Does this help public communication?

**Success criteria:**
- 2-3 authors agree to participate
- Submit at least 1 "author-submitted" abstract
- Feedback on process (too burdensome?)
- Identify barriers to participation

### Q4 2025: Institutional Partnerships

**Target institutions (3-5 pilots):**

**Government agencies:**
- FDA, NIH (health claims)
- EPA (environmental claims)
- BLS (economic data)
- Value: Reduce support burden, increase transparency

**Think tanks:**
- Brookings, AEI, Urban Institute (policy)
- Value: Wider dissemination, impact tracking

**Universities:**
- Carnegie Mellon (via Jess connection)
- Others with Bayesian statistics programs
- Value: Research impact, student training

**Success criteria:**
- 1-2 institutions pilot participation
- Submit at least 3 institutional abstracts
- Feedback on governance model
- Interest in continued participation

### 2026: Scaling & Sustainability

**Corpus growth:**
- 50+ abstracts across domains
- Quarterly updates to existing abstracts
- Real-world outcome tracking begins

**Technical maturity:**
- Federation protocol defined
- Smart contract governance prototyped
- Cryptographic signing implemented

**America's 250th Anniversary Goal:**
- Working prototype demonstrates epistemic infrastructure for democracy
- Shows how democratic institutions adapt to knowledge economy
- Enables cooperation among disagreement without authoritarianism

---

## Success Metrics

### Phase 1: Proof of Concept (Months 1-3)

**Quality metrics:**
- 10+ abstracts peer reviewed: ✅ YES / ❌ NO
- All probabilities sourced: ✅ YES / ❌ NO
- Conservative confidence: ✅ YES / ❌ NO
- Comprehensive provenance: ✅ YES / ❌ NO

**User comprehension (beta testing):**
- >80% understand confidence threshold
- >70% can explain "could be wrong"
- >60% find it more trustworthy than Wikipedia
- >80% find interface intuitive

### Phase 2: Market Validation (Months 4-6)

**Customer interest:**
- 3-5 beta testers per category
- >50% want continued access
- >30% willing to pay for API access
- 2+ reference customers

**Media/visibility:**
- 1-2 media articles
- 1,000+ GitHub stars
- 10,000+ unique visitors
- 5+ institutional inquiries

### Phase 3: Institutional Adoption (Late 2025-2026)

**Participation:**
- 2-3 author-submitted abstracts
- 1-2 institutional pilots
- 50+ total abstracts
- Quarterly update cadence established

**Impact:**
- Cited in policy debates
- Used by fact-checkers
- Integrated in health apps
- Referenced in academic papers

---

## Dependencies & Risks

### Critical Dependencies

**Legal clearance (HIGH PRIORITY):**
- Status: Pending with General Counsel
- Risk: Delays public launch
- Mitigation: Continue private development, prepare for Q2 2025 launch
- Contingency: If delayed past Q2, consider spinning out separately

**Strategic advisor feedback:**
- Status: Awaiting Steve Midgley review
- Risk: Major pivot needed based on feedback
- Mitigation: Built modular architecture, can adjust messaging
- Contingency: Have fallback customer segments

**Bayes professor hire:**
- Status: In progress via Jess connection
- Risk: Methodology not validated by expert
- Mitigation: Conservative estimates, clear disclaimers
- Contingency: Hire external consultant if internal unavailable

### Known Risks

**Technical:**
- Schema changes break existing abstracts
  - Mitigation: Semantic versioning, migration scripts
- UI doesn't communicate uncertainty well
  - Mitigation: Early user testing, iterate rapidly

**Product:**
- Institutions don't participate
  - Mitigation: Corpus-first approach (Wikipedia), prove value
- Users don't understand confidence levels
  - Mitigation: Educational materials, progressive disclosure

**Reputation:**
- Calculation errors damage credibility
  - Mitigation: Peer review, transparent corrections
- Accused of bias (cherry-picking)
  - Mitigation: Comprehensive coverage, explicit biases

**Strategic:**
- Steve feedback suggests major pivot
  - Mitigation: Architecture supports multiple models
- Legal clearance denied/delayed
  - Mitigation: Spin out as personal project post-government

---

## Decision Points

**Upcoming decisions (next 3 months):**

### Decision 1: UI Framework Choice (Month 3)

**Context:** When starting UI development, choose tech stack

**Options:**
- A: React (most popular, large ecosystem)
- B: Vue.js (simpler, faster learning curve)
- C: Svelte (modern, fast performance)

**Decision criteria:**
- Developer availability
- Performance needs
- Time to MVP

**Decide by:** Before UI development starts

### Decision 2: Author Participation Model (Month 6)

**Context:** After author outreach pilot, decide requirements

**Options:**
- A: Require cryptographic signatures (high barrier)
- B: Email verification sufficient (low barrier)
- C: Institutional approval needed (medium barrier)

**Decision criteria:**
- Author feedback on burden
- Legal liability concerns
- Trust requirements

**Decide by:** After 2-3 authors participate

### Decision 3: Open Source Timing (Month 6)

**Context:** After legal clearance, decide repository access

**Options:**
- A: Fully public immediately (maximum transparency)
- B: Public code, private data (moderate transparency)
- C: Invite-only initially (controlled rollout)

**Decision criteria:**
- Legal clearance conditions
- Quality readiness
- Community management capacity

**Decide by:** When clearance received

---

## Quarterly Review Schedule

**Q1 2025 Review (March):**
- Assess: Corpus building progress (target 10-15 abstracts)
- Decide: UI development approach
- Evaluate: Beta testing readiness

**Q2 2025 Review (June):**
- Assess: Legal clearance status
- Decide: Public launch timing
- Evaluate: Initial market response

**Q3 2025 Review (September):**
- Assess: Author participation pilot results
- Decide: Institutional partnership approach
- Evaluate: Feature roadmap priorities

**Q4 2025 Review (December):**
- Assess: First year progress vs goals
- Decide: 2026 strategic priorities
- Evaluate: Sustainability trajectory

---

## Communication Plan

**Internal (Team):**
- Weekly: Progress updates (this roadmap)
- Biweekly: Strategic discussions
- Monthly: Comprehensive review + planning

**External (Stakeholders):**
- Monthly: Newsletter to beta testers
- Quarterly: Public progress reports (after launch)
- As-needed: Strategic advisor updates

**Public (Post-launch):**
- Blog: Monthly updates on new abstracts
- GitHub: Changelog for schema updates
- Twitter: Weekly highlights

---

## Technical Debt Management

**Allowed during MVP:**
- Manual JSON creation (no admin UI)
- Static hosting (no server-side rendering)
- Minimal error handling
- Basic responsive design

**Address before Scale:**
- Abstract creation tooling
- API infrastructure
- Comprehensive testing
- Performance optimization
- Accessibility compliance (WCAG 2.1 AA)

**See [UXUI.md](UXUI.md) for accessibility requirements**

---

## Historical Context

**Key dates:**
- 2024-12: Initial concept discussions
- 2025-01-22: Governance constitution drafted
- 2025-01-25: Steve Midgley strategic advisory begins
- 2025-01-26: Pivot to Bayesian fact-checker model
- 2025-01-26: Bayesian calculation method documented
- 2025-11-08: Minimum wage abstract (contested knowledge)
- 2025-11-08: UX/UI design specification complete
- 2025-11-08: Product roadmap formalized
- 2025-Q2: Expected legal clearance + public launch
- 2026-07-04: America's 250th anniversary (goal: working prototype)

---

## Next Steps (Immediate)

**This week:**
1. ✅ Fix minimum wage evidence hierarchy (lead with A+ meta-analyses)
2. ✅ Create filtered Wikipedia mockup (shows honest uncertainty)
3. ✅ Finalize creatine abstract (schema v1.2.0 validation)

**Next week:**
4. Await Steve feedback on Vitamin D
5. Begin planning next examples (Omega-3, Intermittent fasting)
6. Prepare materials for Bayes professor review

**This month:**
7. Complete 5-7 total abstracts
8. Document lessons learned from first 5 abstracts
9. Refine creation workflow based on experience

---

## Appendix: Prioritized Wikipedia Articles

### Tier 1 (Green - Easy, Clear Evidence)

**Completed:**
1. ✅ Creatine supplementation (0.90)
2. ✅ Vitamin D supplementation (0.65-0.75)

**Next priority:**
3. Omega-3 fatty acids (heart health) - Expected 0.70
4. Intermittent fasting (weight/metabolic) - Expected 0.68
5. Statins (cardiovascular) - Expected 0.90

### Tier 2 (Yellow - Moderate, Mixed Evidence)

**Completed:**
6. ✅ Minimum wage (0.60-0.72)

**Next priority:**
7. Body cameras (police accountability) - Expected 0.65
8. Universal Basic Income (pilot results) - Expected 0.55
9. Low-carb vs low-fat (weight loss) - Expected 0.62

### Tier 3 (Red - Hard, Contested)

**Save for later (after institutional partnerships):**
10. Glyphosate (cancer risk) - Expected 0.50-0.60
11. COVID vaccines (long-term effects) - Expected 0.50-0.70
12. Climate change (CO₂ warming) - Expected 0.95 (canonical but politically contested)

---

## Appendix: Time Estimates

**Abstract creation (from scratch):**
- Simple (Grade A+ evidence, clear): 6 hours
- Moderate (mixed evidence): 8 hours
- Complex (contested, methodological issues): 12+ hours

**UI feature development:**
- Confidence slider: 8 hours
- Article view: 16 hours
- Search with autocomplete: 12 hours
- Full MVP (Phase 1): 80-120 hours

**Documentation updates:**
- Minor (typo fixes, clarifications): 30 minutes
- Major (new sections, examples): 2-4 hours
- Complete rewrite: 8+ hours

---

## Resources & Links

**Documentation:**
- [Core Schema](schemas/core-knowledge-schema.json)
- [Bayesian Method](docs/BAYESIAN_CALCULATION_METHOD.md)
- [Creation Workflow](docs/CREATION_WORKFLOW.md)
- [UX/UI Design](docs/UXUI.md)
- [Governance](docs/CONSTITUTION.md)
- [Business Roadmap](docs/ROADMAP.md)

**Examples:**
- [Creatine](examples/scientific/creatine-lbm-resistance-training-2025.json)
- [Vitamin D](examples/scientific/vitamin-d-supplementation-2025.json)
- [Minimum Wage](examples/policy/minimum-wage-employment-2025.json) (in progress)

**Tools:**
- Bayesian calculator: https://www.gigacalculator.com/calculators/bayes-theorem-calculator.php
- JSON Schema validator: https://www.jsonschemavalidator.net/
- Evidence grading: GRADE Working Group methodology

---

**Version:** 1.0 (2025-11-08)  
**Next Update:** After Steve feedback received  
**Owner:** Damon Regan  
**Strategic Advisor:** Steve Midgley (Learning Tapestry)  
**Technical Advisor:** TBD (Bayes professor via Carnegie Mellon)

---

**Key Takeaway:** We're building corpus first (Wikipedia-derived abstracts), proving value through working examples, then recruiting institutional partnerships. The confidence slider is our signature UX innovation - it's the Wayback Machine's date scrubber, but for epistemic certainty. By America's 250th anniversary (2026), we'll demonstrate infrastructure for democratic knowledge in the age of disagreement.

---

**See also:**
- [ROADMAP.md](ROADMAP.md) - Business strategy, fundraising, revenue targets
- [UXUI.md](UXUI.md) - Interface design specifications
- [DECISIONS.md](DECISIONS.md) - Strategic decision log
