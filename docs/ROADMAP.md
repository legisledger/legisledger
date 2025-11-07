# Legis Ledger Roadmap #

## Phase 1 (Months 1-3): Proof of Concept ##
- Build 15-20 high-quality examples
- Create public gallery
- Get initial feedback
- Secure personnel clearance

## Compelling Results: Passenger Rights, Creatine, and Vitamin D MVPs

## 📋 Next 2-3 Examples (Strategic Selection)

### Example 1: Creatine (Scientific, Easy) ✅ MOSTLY DONE

Why this one:
- We already have excellent JSON (creatine-lbm-resistance-training-2025.json)
- Just needs filtered Wikipedia HTML wrapper
- Scientific domain (complements Vitamin D)
- Clear evidence (90% confidence, 500+ studies)

Work needed: 2-3 hours
- Convert existing JSON to filtered Wikipedia format
- Add threshold filtering
- Test UX

> Delegate to Gemini: None needed - we have this already

### Example 2: Minimum Wage (Policy, Moderate) 🆕 PRIORITY
Why this one:
- Different domain (policy, not health)
- Demonstrates breadth
- Contested (liberals vs conservatives disagree)
- Shows how system handles political topics

Wikipedia article: "Minimum wage"
- Clear claims: "Does minimum wage increase unemployment?"
- Multiple studies with conflicting results
- Perfect for Bayesian treatment

Work needed: 8-10 hours
- Evidence gathering (many studies)
- Bayesian analysis (contested claims)
- Filtered Wikipedia HTML

> Delegate to Gemini: Evidence gathering phase (see below)

### Example 3: Intermittent Fasting (Health, Easy) 🆕
Why this one:
- Trendy, high interest topic
- Recent research (2020-2024)
- Clear health claims to evaluate
- Complements Vitamin D and Creatine

Wikipedia article: "Intermittent fasting"
- Claims: Weight loss, longevity, metabolic health
- Mix of strong and weak evidence
- Good evidence gradations

Work needed: 6-8 hours
- Evidence gathering
- Bayesian analysis
- Filtered Wikipedia HTML

> Delegate to Gemini: Evidence gathering phase (see below)

# 🤖 What to Delegate to Gemini

## Phase 1.1: Evidence Gathering (Gemini's Strength)
Give Gemini these tasks:

### Task 1: Wikipedia Extraction
"Extract all claims from Wikipedia article: [Minimum Wage]

For each claim, identify:
1. The specific assertion
2. Citations in Wikipedia (footnotes)
3. Conflicting views (if any)
4. Disputed tags

**Output**: Structured list of claims with sources"

### Task 2: Source Compilation
"For each claim about minimum wage and employment:

Search for:
1. Meta-analyses (PubMed, Google Scholar)
2. Large RCTs or natural experiments
3. Systematic reviews
4. Conflicting studies

Compile:
- Full citation (APA)
- DOI
- Sample size
- Key finding (1 sentence)
- Quality indicators (journal, citations)

**Output**: Evidence database with 20-30 sources"

### Task 3: Evidence Grading (Initial)
"Grade each source using:
- A+: Meta-analysis, systematic review
- A: Large RCT, natural experiment (n>10,000)
- B: Smaller studies, quasi-experimental
- C: Observational, correlational
- D: Case studies, opinion

Output: Graded evidence list"

Why Gemini for this:
- No token limits (can process entire Wikipedia articles)
- Good at extraction/summarization
- Can compile large evidence databases
- Repetitive work (source formatting)

## Phase 1.2: Bayesian Analysis (Your Work with Claude)
After Gemini gives you evidence, Claude helps with:

### Task 1: Set Priors
"Given this evidence on minimum wage:
- What's the base rate for policy interventions showing employment effects?
- What priors should we use?
- Source all probabilities"

### Task 2: Calculate Bayes Factors
"For each piece of evidence:
- What's P(E|H)?
- What's P(E|~H)?
- Source these probabilities
- Calculate BF
- Update posterior"

### Task 3: Quality Control
"Review this Bayesian analysis:
- Are probabilities justified?
- Conservative enough?
- Calculations correct?
- Reproducible?"

Why Claude for this:
- Strategic thinking about priors
- Probability sourcing rigor
- Conservative bias checking
- Quality control

## Phase 2 (Months 4-6): Market Validation ##
- Pitch to 3-5 potential customers per category
- Iterate based on feedback
- Build API if demand exists
- Refine business model

## Phase 3 (Months 7-12): Scale Decision Point ##

### Option A: VC-Backed Startup ###
- Raise $1-2M seed
- Hire team (engineers, domain experts)
- Scale to 1000+ abstracts
- Build institutional partnerships

### Option B: Bootstrap + Grants ###
- Mozilla/Knight Foundation support
- Academic partnerships
- Slower growth, maintain control
- Open source some components

### Option C: Hybrid ###
- Private core product
- Open protocol for federation
- Best of both worlds