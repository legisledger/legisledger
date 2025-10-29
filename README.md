# Legis Ledger: Knowledge Infrastructure for Democracy

**Mission:** To bring about understanding with epistemic humility.  
**Core Values:** Learning and momentum. Working code trumps all theory.

---

## 🎯 What We're Actually Trying to Do

We're pilot testing infrastructure to enable **cooperation through structured disagreement**.

Like Madison's Constitution provides a framework for political disagreement, this infrastructure provides a framework for **epistemic disagreement**—preserving sharp differences (pluralism) while encouraging convergence as evidence accumulates (Bayesian updating).

### The Problem We're Solving

**Wikipedia enables cooperation through exhaustive debate and eventual consensus.**

This works for settled facts ("Paris is the capital of France"), but breaks down for:
- **Contested facts** ("Is climate change caused by human CO₂ emissions?")
- **Situational judgments** ("Am I entitled to compensation for my delayed flight?")
- **Probabilistic claims** ("What's the success rate if I file this claim?")
- **Health interventions** ("Does creatine supplementation increase muscle mass?")

**We enable cooperation through structured disagreement and Bayesian convergence.**

Sharp differences are preserved (stability through plurality), while confidence converges as evidence accumulates (dynamism through updating). No central authority decrees "the right answer"—evidence and formal validation determine confidence.

---

## 🧪 Test Cases: Can This Handle the Hard Problems?

If this architecture can't handle the most politically contested scientific and policy questions, it has no value. So we're designing it to handle:

### Test Case 1: Climate Change
**Claim:** "Atmospheric CO₂ increase causes global temperature rise"
- **Domain:** Scientific
- **Expected Confidence:** 0.999 (canonical, narrow end of funnel)
- **Why Hard:** Politically contested despite overwhelming scientific consensus
- **What System Must Do:** 
  - Preserve dissenting opinions with their confidence levels
  - Show Bayesian path from prior to posterior
  - Track replication studies (14,000+ supporting)
  - Enable users to see *why* confidence is so high
  - Make clear this represents 99%+ scientific consensus
  - Include provenance disclaimers (who submitted, potential biases, verification paths)

### Test Case 2: Creatine Supplementation (Current Scientific MVP)
**Claim:** "Creatine monohydrate supplementation increases lean body mass and strength in resistance training"
- **Domain:** Scientific (sports nutrition)
- **Current Confidence:** 0.90 (narrow end, canonical)
- **Why Important:** Well-studied supplement, decades of research, demonstrates full scientific evidence hierarchy
- **What System Does:**
  - Transparent provenance disclaimers (NOT submitted by FDA/NIH)
  - Evidence grading (Meta-analyses Grade A+, RCTs Grade A, mechanistic studies Grade B)
  - Explicit bias disclosure (supplement industry funding, publication bias)
  - Clear verification pathways (check PubMed, consult physician, review cited studies)
  - Bayesian reasoning from prior (0.75 mechanistic plausibility) to posterior (0.90 after decades of evidence)
  - **Status:** ✅ Complete Grade A example with full provenance transparency

### Test Case 3: Universal Basic Income
**Claim:** "UBI at $1,000/month reduces poverty in urban US populations"
- **Domain:** Policy
- **Expected Confidence:** 0.65-0.75 (middle funnel, emerging evidence)
- **Why Hard:** Ideologically divisive, limited real-world data
- **What System Must Do:**
  - Show multiple institutions' analyses (left-leaning think tanks, right-leaning ones)
  - Quantify uncertainty honestly (not enough data yet)
  - Track pilot program results as they emerge
  - Enable Bayesian updates as evidence accumulates
  - Preserve disagreement while showing where convergence happens
  - Include provenance disclaimers for each institution's submission

### Test Case 4: Passenger Rights (Current Legal MVP)
**Claim:** "Passenger entitled to €600 for 4-hour mechanical delay from Paris"
- **Domain:** Legal
- **Expected Confidence:** 0.85 (narrow end, well-established)
- **Why Easier:** Less politically contested, clear legal framework
- **What System Does:**
  - Match user's situation to legal rules
  - Quantify likelihood of successful claim
  - Track real-world outcomes
  - Update confidence as enforcement patterns emerge
  - Transparent provenance (independent analysis, NOT official DGAC guidance)
  - **Status:** ✅ Complete with provenance disclaimers (3 examples: EU mechanical, EU weather, US denied boarding)

**If we can handle climate change and UBI, passenger rights and creatine should be achievable stepping stones.**

---

## 🏗️ Architecture: Domain-Agnostic Design

### Core Principle: Separation of Concerns

| Role | Responsibility | Examples |
|------|---------------|----------|
| **Contributing Institutions** | Provide expert opinions with quantified confidence | IPCC, NIH, DOT, DGAC, CDC, Congressional Budget Office |
| **Legis Ledger Infrastructure** | Provide governance, validation tracking, access, provenance transparency | This system |
| **End Users** | Consume knowledge with transparent confidence levels and verification pathways | Citizens, policymakers, researchers |

### What Institutions Submit (The Opinion)

**Scientific Domain Example (Creatine):**
```json
{
  "@type": "ScientificKnowledge",
  "submittedBy": { 
    "institution": "Independent Sports Nutrition Research Collective",
    "institutionType": "independent-research"
  },
  
  "scenario": {
    "description": "Does creatine monohydrate supplementation increase lean body mass and strength in resistance training?",
    "domain": "scientific",
    "parameters": { 
      "intervention": "creatine monohydrate 3-5g/day",
      "population": "resistance training athletes",
      "outcome": "lean body mass and strength gains"
    }
  },
  
  "conclusion": {
    "claim": "Creatine supplementation significantly increases lean body mass and strength during resistance training",
    "confidence": 0.90,
    "outcome": { 
      "leanBodyMassIncrease": "0.9-2.2 kg over 4-12 weeks",
      "strengthIncrease": "5-15% across major lifts"
    }
  },
  
  "evidenceBasis": [
    { "type": "meta-analysis", "citation": "Branch (2003) - 100+ studies", "grade": "A+" },
    { "type": "meta-analysis", "citation": "Chilibeck et al. (2017)", "grade": "A+" },
    { "type": "rct", "citation": "Kreider et al. (2017) - Long-term safety", "grade": "A" },
    { "type": "mechanistic-study", "citation": "Phosphocreatine system", "grade": "B" }
  ],
  
  "bayesianAnalysis": {
    "prior": { "confidence": 0.75, "basis": "Strong mechanistic plausibility + early positive studies" },
    "evidence": [
      { "factor": "Branch (2003) meta-analysis: 100+ studies support", "posteriorAfter": 0.85 },
      { "factor": "Multiple independent replications (20+ years)", "posteriorAfter": 0.88 },
      { "factor": "Chilibeck (2017) confirms across populations", "posteriorAfter": 0.90 }
    ],
    "posterior": 0.90
  }
}
```

**Legal Domain Example (Passenger Rights):**
```json
{
  "@type": "LegalRightKnowledge",
  "submittedBy": { 
    "institution": "Passenger Rights Knowledge Base Project",
    "institutionType": "independent-educational"
  },
  
  "scenario": {
    "description": "Flight from Paris to NYC delayed 4 hours due to mechanical issue",
    "domain": "legal",
    "parameters": { "jurisdiction": "EU", "delayHours": 4, "cause": "mechanical" }
  },
  
  "conclusion": {
    "claim": "Passenger entitled to €600 compensation",
    "confidence": 0.85,
    "remedy": { "amount": "€600", "basis": "EU Regulation 261/2004 Article 7" }
  },
  
  "legalBasis": [
    { "type": "regulation", "citation": "EU Reg 261/2004 Art 7", "authority": "binding" },
    { "type": "case-law", "citation": "ECJ C-549/07 Wallentin-Hermann", "weight": "binding" }
  ],
  
  "bayesianAnalysis": {
    "prior": { "confidence": 0.70, "basis": "70% base rate for mechanical delay claims" },
    "evidence": [
      { "factor": "EU jurisdiction clear", "posteriorAfter": 0.85 },
      { "factor": "4 hours exceeds threshold", "posteriorAfter": 0.90 },
      { "factor": "Airline claims weather involvement", "posteriorAfter": 0.85 }
    ],
    "posterior": 0.85
  }
}
```

**That's it. Institution provides their expert judgment.**

### What Infrastructure Adds (The Governance + Provenance)

```json
{
  // All institution data preserved exactly
  
  // Infrastructure adds:
  "metadata": {
    "submittedBy": {
      "institution": "Independent Nutrition Research Collective",
      "institutionType": "independent-research",
      "authorName": "Dr. Jane Smith",
      "authorORCID": "0000-0002-1234-5678"
    },
    "gitCommit": "abc123",
    "funnelPosition": "narrow-end-canonical",
    "funnelJustification": "500+ studies over 25 years, multiple meta-analyses, 95% replication rate, overwhelming mechanistic support"
  },
  
  "validation": {
    "replicationStatus": {
      "totalStudies": 500,
      "supportingStudies": 475,
      "mixedResults": 20,
      "contradictingStudies": 5,
      "replicationRate": 0.95
    }
  },
  
  "relatedClaims": {
    "supports": ["creatine-athletic-performance"],
    "refines": ["creatine-brain-energy-hypothesis"]
  },
  
  "disclaimer": {
    "nature": "educational",
    "notCertainty": "90% confidence means 10% chance wrong. Science is provisional.",
    "provenanceAndLimitations": {
      "submittedBy": "Independent research group, NOT FDA, NIH, or medical authority",
      "notSubmittedByAuthority": true,
      "verificationStatus": "Unreviewed by external scientific panel",
      "potentialBiases": [
        "Some cited studies have supplement industry funding",
        "Publication bias favors positive results",
        "May favor supplement efficacy due to researcher interests"
      ],
      "howToVerify": [
        "Search PubMed for 'creatine lean body mass resistance training' RCTs",
        "Consult physician before starting supplementation",
        "Check Cochrane Database for systematic reviews",
        "Review cited studies directly (all linked)"
      ],
      "updateMechanism": "Updated when new RCTs published or meta-analyses released",
      "transparencyCommitment": "All Bayesian reasoning and evidence grading disclosed"
    }
  }
}
```

**Key Innovation: Provenance Transparency**

Every knowledge abstract now includes:
- **Who submitted it** (institution name, type, ORCID)
- **What it's NOT** ("Not submitted by FDA/DGAC/official authority")
- **Potential biases** (explicit list)
- **How to verify** (concrete steps users can take)
- **Update mechanism** (when/how this gets revised)

This is **epistemic honesty operationalized**: We tell you our limitations so you can judge for yourself.

---

## 📊 The Scenario: Universal API for AI Agents

The `scenario` block is the **protocol bridge** between conversational AI and structured knowledge.

### In Conversation:
```
User: "Does creatine actually help build muscle?"
  ↓
ChatGPT: Extracts intent
  ↓
Structured Query: 
{
  "domain": "scientific",
  "intervention": "creatine supplementation",
  "population": "resistance training",
  "outcome": "lean body mass"
}
  ↓
Legis Ledger API: Returns creatine abstract (confidence: 0.90)
  ↓
ChatGPT: "Yes, very likely (90% confidence). Creatine increases lean body mass 
by 0.9-2.2 kg over 4-12 weeks based on 100+ studies. See limitations:
- Individual response varies
- Requires consistent resistance training
- Water retention accounts for some early gains
- Here's how to verify: [verification pathways]"
```

**The scenario makes knowledge AI-ready without forcing users to learn query syntax.**

---

## 🎚️ Rauch's Validation Funnel (Operationalized)

Jonathan Rauch's *The Constitution of Knowledge* (2021) describes how liberal science validates truth through a social funnel:
```
WIDE END → Anyone can propose anything
   ↓
MIDDLE → Peer review, replication, checking
   ↓
NARROW END → "Generally accepted" → "Well confirmed" → "Canonical"
```

**We operationalize this:**

| Funnel Position | Confidence Range | Characteristics | Examples |
|----------------|------------------|-----------------|----------|
| **Wide End (Speculation)** | 0.20-0.50 | Preliminary, single study, not replicated | New hypothesis, pilot study |
| **Middle (Testing)** | 0.50-0.70 | Multiple studies, some replication, emerging consensus | UBI pilot results, early nutrition research |
| **Narrow (Confirmed)** | 0.70-0.90 | Strong evidence, replicated, broad consensus | Passenger rights (0.85) |
| **Narrow (Canonical)** | 0.90-0.999 | Decades of testing, overwhelming consensus | Creatine body mass (0.90), CO₂ causes warming (0.999) |

**Note:** We never allow 1.0 (absolute certainty). Epistemic humility is structurally enforced.

**Current Examples:**
- **Creatine for body mass:** 0.90 (narrow-end-canonical) - 100+ studies, 20+ years replication, well-established
- **EU mechanical delay rights:** 0.85 (narrow-end-confirmed) - 20 years of enforcement, clear precedent
- **US denied boarding rights:** 0.90 (narrow-end-canonical) - 45+ years, crystal-clear regulations

---

## 🔬 Schema: Core + Domain Extensions

### Core Schema (Works Everywhere)
- `scenario`: Scope definition (AI-ready protocol bridge)
- `conclusion`: Judgment + confidence + uncertainties
- `evidenceBasis`: Citations with quality grading
- `bayesianAnalysis`: Transparent reasoning path (prior → evidence → posterior)
- `sources`: Full provenance (DOIs, URLs, access dates)
- `metadata`: Governance tracking + submitter info
- `validation`: Real-world testing (replication, outcomes)
- `disclaimer`: Epistemic humility + **provenance transparency**

**New in v1.1:** `disclaimer.provenanceAndLimitations` section with:
- `submittedBy` / `notSubmittedByAuthority`
- `verificationStatus`
- `potentialBiases`
- `howToVerify`
- `updateMechanism`
- `transparencyCommitment`

See: [`schemas/core-knowledge-schema.json`](schemas/core-knowledge-schema.json)

### Domain Extensions

Each domain adds specialized fields:

**Legal Domain:**
- `legalBasis`: Statutes, regulations, treaties with authority level
- `conditions`: Requirements with satisfaction status
- `precedent`: Case law with binding weight
- `enforcement`: Practical steps, agencies, success rates
- `realWorldFeedback`: Claims filed, outcomes, Bayesian updates

**Scientific Domain:**
- `studyDesign`: RCT, meta-analysis, observational, etc.
- `evidenceGrading`: A+ (meta-analysis) → B (mechanistic) → C (preliminary)
- `replicationStatus`: Total studies, supporting, contradicting, replication rate
- `mechanisticBasis`: Biological/physical mechanisms
- `adverseEffects`: Safety profile, contraindications
- `industryFunding`: Disclosure of potential conflicts

**Policy Domain:** (planned)
- `implementationResults`: Pilot outcomes, real-world data
- `costBenefit`: Economic analysis
- `stakeholderPositions`: Different institutions' views with their confidence levels

See:
- [`schemas/domain-extensions/legal-extension.json`](schemas/domain-extensions/legal-extension.json)
- [`schemas/domain-extensions/scientific-extension.json`](schemas/domain-extensions/scientific-extension.json)
- [`examples/scientific/creatine-lbm-resistance-training.json`](examples/scientific/creatine-lbm-resistance-training.json) - **Grade A example**
- [`examples/legal/eu-delay-mechanical-3hrs.json`](examples/legal/eu-delay-mechanical-3hrs.json)
- [`examples/legal/us-denied-boarding.json`](examples/legal/us-denied-boarding.json)

---

## 🚀 Current Status: Two Working MVPs

### MVP #1: Passenger Rights (Legal Domain)
**Status:** ✅ Complete with provenance disclaimers

**Why passenger rights first:**
1. **Clear legal framework** (regulations are explicit)
2. **Immediate user value** ("Can I get €600 for my delay?")
3. **Measurable outcomes** (track claims filed, compensation received)
4. **Proves the architecture** before tackling harder domains

**What Works:**
✅ 3 knowledge abstracts (EU mechanical, EU weather, US denied boarding)  
✅ Full provenance transparency (v1.1 updates)  
✅ Bayesian confidence visualization  
✅ Funnel position display  
✅ Structured pluralism (same facts → different conclusions based on evidence)  
✅ Real-world outcome tracking  
✅ Defensive client-side rendering  
✅ JSON-LD semantic markup  

### MVP #2: Creatine Supplementation (Scientific Domain)
**Status:** ✅ Grade A example complete

**Why creatine for body mass:**
1. **Well-established** (decades of research, 100+ studies)
2. **Demonstrates evidence hierarchy** (Meta-analyses Grade A+, RCTs Grade A, mechanistic studies Grade B)
3. **Shows industry funding disclosure** (transparency about conflicts)
4. **Proves provenance model** in scientific domain
5. **Real user need** ("Does creatine work for building muscle?")
6. **Canonical confidence level** (0.90 = narrow-end-canonical, not just confirmed)

**What Works:**
✅ Complete knowledge abstract with full schema compliance  
✅ Evidence grading system (A+ meta-analyses → B mechanistic → C preliminary)  
✅ Comprehensive provenance disclaimers  
✅ Transparent Bayesian reasoning (0.75 → 0.90)  
✅ Industry funding disclosure  
✅ Adverse effects and contraindications  
✅ Clear verification pathways (PubMed, physician consultation)  
✅ Demonstrates canonical scientific knowledge (0.90 confidence)  

### What's Next
- [ ] Real-world feedback collection (users report outcomes - legal domain)
- [ ] Automated Bayesian updates (confidence adjusts as data arrives)
- [ ] Institution submission API (DGAC, DOT, NIH can submit opinions)
- [ ] Climate change test case (canonical scientific knowledge)
- [ ] UBI test case (contested policy domain)
- [ ] Replication tracking for scientific abstracts
- [ ] Multi-institution disagreement examples

---

## 🎯 Why This Matters

### For Democracy
Citizens need **reliable, transparent knowledge** to make informed decisions with:
- Quantified confidence that updates as evidence emerges
- Clear provenance (who says this, what are their biases?)
- Verification pathways (how to check for yourself)
- Epistemic humility (explicit uncertainty, no false certainty)

### For Science
The replication crisis shows science needs better infrastructure. This provides:
- **Bayesian confidence** (not binary "significant" vs "not significant")
- **Transparent reasoning** (see the path from prior to posterior)
- **Replication tracking** (13/18 studies support → 72% confidence)
- **Bias disclosure** (industry funding acknowledged upfront)
- **Provenance transparency** (who submitted, what they might get wrong)

### For Policy
Policymakers need honest assessments:
- ✅ "We're 65% confident UBI reduces poverty based on 3 pilot studies. Here's what would change our mind."
- ❌ "Studies show..." (which studies? how confident?)
- ❌ "Experts agree..." (which experts? how much agreement?)

### For Rauch's Constitution of Knowledge
This operationalizes liberal science:
- **No final say** (confidence < 1.0 always, even for canonical knowledge)
- **Community validation** (multiple institutions can weigh in with different confidence levels)
- **Empirical checking** (real-world outcomes tracked, confidence updates)
- **Error-seeking** (falsifiability criteria explicit: "what would change my mind?")
- **Transparent reasoning** (Bayesian path visible, evidence graded)
- **Provenance transparency** (who submitted, what biases, how to verify)

---

## 🗂️ Evidence Grading System

We grade evidence quality across domains:

### Scientific Evidence
- **Grade A+**: Meta-analyses, systematic reviews (highest quality)
- **Grade A**: Well-designed RCTs, large cohort studies
- **Grade B**: Mechanistic studies, smaller RCTs, observational studies
- **Grade C**: Preliminary studies, case reports, theoretical models
- **Grade D**: Anecdotal evidence, expert opinion without data

### Legal Evidence
- **Binding**: Statutes, regulations, binding precedent (highest authority)
- **Persuasive**: Persuasive precedent, agency guidance, legal scholarship
- **Preliminary**: Draft regulations, proposed legislation, early court rulings

See: [`docs/EVIDENCE_GRADING.md`](docs/EVIDENCE_GRADING.md) for unified reference

---

## 🤝 Contributing

We need:
- **Domain experts** to submit knowledge claims (with provenance transparency)
- **Scientists** to validate Bayesian calculations and evidence grading
- **Developers** to build submission APIs and validation infrastructure
- **Designers** to make confidence visualization intuitive
- **Critics** to find flaws in the architecture

**If this can't handle climate change, UBI, and contested health claims, it won't meet the mission. Help us test it.**

### Contribution Guidelines

When submitting knowledge abstracts:
1. **Include full provenance**: Who you are, potential biases, verification pathways
2. **Grade your evidence**: Use standardized grading (A+ → D)
3. **Show Bayesian reasoning**: Prior → evidence → posterior (transparent path)
4. **Specify falsifiability**: What would change your mind?
5. **Maintain epistemic humility**: Never claim 1.0 confidence

See examples in `/examples/scientific/` and `/examples/legal/` directories.

---

## 📚 Theoretical Foundation

- **Rauch (2021):** *The Constitution of Knowledge* - Liberal science as validator
- **Hayek (1945):** *The Use of Knowledge in Society* - Knowledge is distributed
- **Madison (1787):** *Federalist Papers* - Framework for disagreement
- **Bayesian Epistemology:** Quantified confidence, provisional knowledge, updating
- **Popper:** Falsifiability as demarcation criterion
- **GRADE Working Group:** Evidence quality assessment in medicine
- **Cochrane Collaboration:** Systematic review methodology

---

## 📄 License

Apache 2.0 license.

**Transparency Principle:** All knowledge claims, all Bayesian reasoning paths, all validation data, all provenance information public. No secret algorithms. If you can't see how confidence was calculated or who submitted it, don't trust it.

---

## 🚧 This is a Prototype

**Epistemic Status:** Early-stage prototype (wide end of our own funnel!)

**Current Confidence:** 0.65 that this architecture can handle contested knowledge domains  
**What would change our mind:** 
- ✅ **Success:** Creatine example demonstrates provenance transparency works (confidence → 0.70)
- ✅ **Success:** Passenger rights examples show legal domain works (confidence → 0.70)
- Failure to handle climate change test case → confidence drops to 0.40
- Failure to handle UBI test case → confidence drops to 0.45
- Inability to preserve meaningful disagreement → confidence drops to 0.30
- Bayesian updates don't converge with real-world data → confidence drops to 0.35
- Users find provenance disclaimers confusing rather than helpful → need redesign

**We might be wrong. That's the point. Let's find out.**

---

## 📖 Documentation

- **[BAYESIAN_REASONING.md](docs/BAYESIAN_REASONING.md)** - How Bayesian updating works, with creatine example
- **[EVIDENCE_GRADING.md](docs/EVIDENCE_GRADING.md)** - Unified evidence grading reference
- **[PROVENANCE_UPDATE_SUMMARY.md](docs/PROVENANCE_UPDATE_SUMMARY.md)** - Recent provenance transparency additions
- **[Core Schema](schemas/core-knowledge-schema.json)** - Domain-agnostic schema
- **[Legal Extension](schemas/domain-extensions/legal-extension.json)** - Legal domain specifics
- **[Scientific Extension](schemas/domain-extensions/scientific-extension.json)** - Scientific domain specifics

---

**Version:** 1.1.0 (Provenance Transparency Update)  
**Last Updated:** 2025-01-22  
**Changelog:**
- v1.1.0: Added provenance transparency to all examples (legal + scientific)
- v1.1.0: Added creatine supplementation as Grade A scientific example
- v1.1.0: Added evidence grading system documentation
- v1.0.0: Initial passenger rights MVP
