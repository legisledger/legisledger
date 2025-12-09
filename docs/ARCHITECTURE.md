# Legis Ledger Architecture
```
Version: 1.0.0
Last Updated: December 8, 2025
Status: Live
```
# Table of Contents

* [Core Principles](#core-principles)
* [The Problem We're Solving](#the-problem-were-solving)
* [Architectural Overview](#architectural-overview)
* [Domain-Agnostic Design](#domain-agnostic-design)
* [Separation of Concerns](#separation-of-concerns)
* [The Scenario: Universal Protocol](#the-scenario-universal-protocol)
* [Bayesian Confidence System](#bayesian-confidence-system)
* [Validation Funnel](#validation-funnel)
* [Data Flow](#data-flow)
* [Schema Hierarchy](#schema-hierarchy)
* [Extensibility](#extensibility)
* [Technical Stack](#technical-stack)
* [Future Architecture](#future-architecture)
* [Design Decisions](#design-decisions)


## Core Principles
### 1. 🔬 **Honest Uncertainty** 
* No claim ever reaches 1.0 confidence (absolute certainty)
* Uncertainty is quantified, not hidden
* "We could be wrong" is structurally enforced

### 2. 🏛️ **Transparency** 
* Provenance
* Auditability with open data
* Bayesian analysis shows: Prior → Evidence → Posterior
* Every confidence level must be justified
* Falsification criteria must be specified

### 3. 📚 **Integrity** 
* Multiple institutions can analyze the same scenario
* Different conclusions are preserved, not averaged
* Disagreement is made precise through quantified confidence

### 4. 🎯 **Momentum** 
* Ship MVPs
* Iterate with real users
* Git tracks every change

## The Problem We're Solving

### What Wikipedia Does Well
Wikipedia enables cooperation through exhaustive debate and eventual consensus.
Works for: **Settled facts** ("Paris is the capital of France")
Where Wikipedia Breaks Down
Breaks for:

* Contested facts ("Does CO₂ cause warming?")
* Situational judgments ("Am I entitled to compensation for my delayed flight?")
* Probabilistic claims ("What's the success rate if I file this claim?")
* Evolving evidence (consensus changes as new data arrives)

### Our Solution
Enable cooperation through structured disagreement and Bayesian convergence.

* Sharp differences are preserved (stability through plurality)
* Confidence converges as evidence accumulates (dynamism through updating)
* No central authority decrees "the right answer"
* Evidence and formal validation determine confidence

# Architectural Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    LEGIS LEDGER ARCHITECTURE                 │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  INSTITUTIONS    │  Expert opinions with quantified confidence
│  (The Opinion)   │  • Government agencies (DOT, FDA, EPA)
└────────┬─────────┘  • Research institutions (IPCC, universities)
         │            • Think tanks (across ideological spectrum)
         │            • Professional organizations
         ↓
┌──────────────────┐
│   SUBMISSION     │  Structured JSON conforming to core schema
│   (Protocol)     │  • Scenario (scope definition)
└────────┬─────────┘  • Conclusion (judgment + confidence)
         │            • Evidence basis (citations)
         │            • Bayesian analysis (reasoning path)
         ↓            • Sources (provenance)
┌──────────────────┐
│  VALIDATION      │  Infrastructure checks submission
│  (Governance)    │  • Schema compliance
└────────┬─────────┘  • Bayesian coherence (math correct?)
         │            • Source accessibility
         │            • Confidence bounds (0 < c < 1)
         ↓
┌──────────────────┐
│  ENHANCEMENT     │  Infrastructure adds governance data
│  (Infrastructure)│  • Metadata (git commit, funnel position)
└────────┬─────────┘  • Domain-specific fields (enforcement, etc.)
         │            • Validation tracking (real-world outcomes)
         │            • Disclaimers (legal protection)
         ↓
┌──────────────────┐
│  GIT STORAGE     │  Immutable, distributed, transparent
│  (Provenance)    │  • Every change tracked
└────────┬─────────┘  • Full history preserved
         │            • Forkable if governance fails
         ↓
┌──────────────────┐
│  API LAYER       │  REST/GraphQL endpoints (future)
│  (Access)        │  • Query by scenario
└────────┬─────────┘  • Filter by confidence
         │            • Track updates
         ↓
┌──────────────────┐
│  UI LAYER        │  Human-readable visualization
│  (Presentation)  │  • Confidence meters
└────────┬─────────┘  • Bayesian reasoning display
         │            • Domain-specific renderers
         ↓
┌──────────────────┐
│  FEEDBACK LOOP   │  Real-world outcomes update confidence
│  (Validation)    │  • Track claims filed
└──────────────────┘  • Track success/failure
                      • Bayesian updates based on data
```

## Domain-Agnostic Design

### Core Pattern (Works Everywhere)

Every knowledge claim, regardless of domain, follows this structure:
```json
{
  "@type": "KnowledgeClaim",
  
  "scenario": {
    "description": "What is the scope of this claim?",
    "domain": "legal | scientific | policy | medical",
    "parameters": { /* domain-specific facts */ }
  },
  
  "conclusion": {
    "claim": "The specific assertion",
    "confidence": 0.0-1.0,
    "outcome": { /* what this means practically */ }
  },
  
  "evidenceBasis": [
    { "type": "...", "citation": "...", "summary": "..." }
  ],
  
  "bayesianAnalysis": {
    "prior": { "confidence": 0.XX, "basis": "..." },
    "evidence": [ /* reasoning steps */ ],
    "posterior": 0.XX,
    "howToChangeMyMind": [ /* falsification criteria */ ]
  },
  
  "sources": [ /* provenance */ ],
  
  "metadata": { /* infrastructure-provided */ },

  "validation": { /* real-world outcomes */ }
}
```

### Domain-Specific Extensions
Each domain adds specialized fields:
| Domain | Extension Fields | Purpose |
| :----- | :--------------- | :------ |
| Legal | `jurisdiction`, `enforcement`, `agencies` | Practical steps to enforce rights |
| Scientific | `replicationStatus`, `predictiveAccuracy` | Track replication and predictions |
|Policy | `implementationResults`, `costBenefit` | Real-world pilot outcomes |
| Medical | `clinicalTrials`, `adverseEvents` | Safety and efficacy data |

The core pattern stays the same. Extensions add utility without breaking compatibility.

## Separation of Concerns
### What Institutions Provide (The Opinion)
Institutions submit their expert judgment:
```json
{
  "scenario": { /* scope */ },
  "conclusion": { /* judgment + confidence */ },
  "evidenceBasis": [ /* citations */ ],
  "bayesianAnalysis": { /* reasoning */ },
  "sources": [ /* provenance */ ]
}
```
### What institutions DON'T provide:

* ❌ Git commits (infrastructure tracks)
* ❌ Funnel position (infrastructure calculates)
* ❌ Enforcement procedures (infrastructure standardizes)
* ❌ Real-world feedback (infrastructure collects)
* ❌ Disclaimers (infrastructure adds)

### What Infrastructure Provides (The Governance)
The Legis Ledger adds:
```json
{
  "metadata": {
    "gitCommit": "abc123",
    "funnelPosition": "narrow-end-canonical",
    "submittedBy": "Institution name",
    "version": "1.0.0"
  },
  
  "validation": {
    /* Domain-specific validation tracking */
    /* Legal: real-world claim outcomes */
    /* Scientific: replication studies */
  },
  
  "relatedClaims": {
    "supports": [ /* IDs */ ],
    "contradicts": [ /* IDs */ ],
    "refines": [ /* IDs */ ]
  },
  
  "disclaimer": {
    /* Domain-specific disclaimers */
    /* Infrastructure calculates: consultExpert (based on confidence) */
  }
}
```

### Why This Separation Matters

**Lowers barrier to entry:**
- Institutions just provide their opinion
- Don't need to build infrastructure
- Don't coordinate on formatting

**Enables consistency:**
- Users get standardized experience
- Enforcement guidance is uniform
- Disclaimers are consistent

**Preserves expertise:**
- Institution's judgment isn't modified
- Reasoning path is preserved exactly
- Only governance metadata added

---

## The Scenario: Universal Protocol

The `scenario` block is the **protocol bridge** between conversational AI and structured knowledge.

### In Conversation

```
User: "My flight from Paris was 4 hours late due to mechanical issues. 
       Can I get compensation?"
  ↓
```
ChatGPT extracts facts:
```json
  {
    "originCountry": "FR",
    "issueType": "delay",
    "delayHours": 4,
    "cause": "mechanical"
  }
```
```
  ↓
Legis Ledger API: POST /match
  ↓
Returns: EU delay abstract (confidence: 0.85)
  ↓
ChatGPT: "You're likely entitled to €600 (85% confidence based on 
          EU Regulation 261/2004)"
```
### Domain Examples

#### Legal Domain:
```json
"scenario": {
  "domain": "legal",
  "description": "Flight CDG→JFK, 4hr delay, mechanical",
  "parameters": {
    "originCountry": "FR",
    "destinationCountry": "US",
    "issueType": "delay",
    "delayHours": 4.0
   }
}
```

#### Scientific Domain:
```json
"scenario": {
  "domain": "scientific",
  "description": "Does atmospheric CO₂ increase cause warming?",
  "parameters": {
    "hypothesis": "CO₂ causes warming",
    "timeframe": "1850-2025",
    "geographicScope": "global"
   }
}
```

#### Policy Domain:
```json
"scenario": {
  "domain": "policy",
  "description": "Does UBI reduce poverty?",
  "parameters": {
    "intervention": "UBI $1000/month",
    "population": "Adults 18-65, urban US",
    "outcome_measured": "poverty_rate"
   }
}
```

**The scenario makes knowledge AI-ready without forcing users to learn query syntax.**

---

## Bayesian Confidence System

### Why Bayesian?

**Alternative approaches rejected:**

| Approach | Problem |
|----------|---------|
| **P-values** | Don't tell you probability hypothesis is true |
| **Binary claims** | Don't capture uncertainty |
| **Qualitative confidence** | "High confidence" = 80%? 95%? Unclear |
| **Assertion without reasoning** | "Trust us" isn't good enough |

**Bayesian approach:**
- ✅ Forces explicit priors (no hidden assumptions)
- ✅ Requires showing reasoning path (transparency)
- ✅ Enables incremental updates (as evidence arrives)
- ✅ Quantifies uncertainty (epistemic humility)
- ✅ Makes disagreement precise (different priors visible)

### Bayesian Workflow
```
PRIOR (Starting confidence)
  ↓
  Based on: base rates, theoretical prediction, expert consensus
  
EVIDENCE (Updates)
  ↓
  Step 1: Factor A → Confidence increases to X
  Step 2: Factor B → Confidence decreases to Y
  Step 3: Factor C → Confidence increases to Z
  
POSTERIOR (Final confidence)
  ↓
  Must match conclusion.confidence
  
FALSIFICATION (How to change mind)
  ↓
  What evidence would decrease confidence?
```
### Example
**Claim**: "Passenger entitled to €600 for mechanical delay"
```json
"bayesianAnalysis": {
  "prior": {
    "confidence": 0.70,
    "basis": "Base rate: 70% of mechanical delay claims succeed"
  },
  "evidence": [
    {
      "factor": "Flight departed from EU",
      "posteriorAfter": 0.85,
      "reasoning": "EU 261/2004 applies, strong enforcement"
    },
    {
      "factor": "Mechanical issue documented",
      "posteriorAfter": 0.95,
      "reasoning": "Case C-549/07: mechanical not extraordinary"
    },
    {
      "factor": "Airline claims weather involvement",
      "posteriorAfter": 0.85,
      "reasoning": "Introduces uncertainty if weather proven primary"
    }
  ],
  "posterior": 0.85,
  "howToChangeMyMind": [
    "Airline proves weather was primary cause → drops to ~0.20",
    "ECJ issues new ruling → confidence adjusts"
  ]
}
```

**This transparency enables:**
- ✅ Verification (anyone can check the math)
- ✅ Challenge (anyone can dispute reasoning)
- ✅ Learning (shows how to think Bayesian)

---

## Validation Funnel

### Operationalizing Rauch (2021)

Jonathan Rauch's *The Constitution of Knowledge* describes how liberal science validates truth:
```
WIDE END
  Anyone can propose anything
  ↓
  Peer review, replication, checking
  ↓
MIDDLE
  Emerging consensus, replicated studies
  ↓
  More testing, more replication
  ↓
NARROW END
  "Generally accepted" → "Well confirmed" → "Canonical"
```

### We operationalize this as a computable field:
| Funnel Position | Confidence Range | Characteristics |
| --------------- | ---------------- | --------------- |
| **wide-end-speculation** | 0.20-0.50 | Preliminary, single study, not replicated |
| **middle-funnel-testing** | 0.50-0.70 | Multiple studies, some replication, emerging |
| **narrow-end-confirmed** | 0.70-0.90 | Strong evidence, replicated, broad consensus|
| **narrow-end-canonical** | 0.90-0.999 | Decades of testing, overwhelming consensus |

### Infrastructure calculates funnel position based on:

* Years in force (for regulations)
* Replication count (for science)
* Consensus level (across institutions)
* Real-world validation (outcomes vs predictions)

### Example:

```json
"metadata": {
  "funnelPosition": "narrow-end-canonical",
  "funnelJustification": "EU Regulation 261/2004 has been in force for 20 years (since 2005). Mechanical issues exception firmly established by ECJ Case C-549/07 in 2008. Thousands of successful claims. Multiple enforcement bodies across 27 countries. This represents 'canonical knowledge' at the narrow end of Rauch's validation funnel."
}
```

---

## Data Flow

### Submission to Publication
```
1. INSTITUTION SUBMITS
   ↓
   JSON conforming to core schema
   
2. VALIDATION LAYER
   ↓
   • Schema compliance check
   • Bayesian coherence check
   • Source accessibility check
   • Confidence bounds check (0 < c < 1)
   
3. ENHANCEMENT LAYER
   ↓
   • Add metadata (git commit, version, submitter)
   • Calculate funnel position
   • Add domain-specific fields (enforcement, etc.)
   • Generate disclaimers
   
4. GIT COMMIT
   ↓
   • Immutable record
   • Full provenance
   • Timestamped
   
5. API PUBLICATION
   ↓
   • Available via REST/GraphQL (future)
   • Indexed for search
   • Cached for performance
   
6. UI RENDERING
   ↓
   • Domain-specific renderer selected
   • Confidence visualization
   • Bayesian reasoning displayed
   
7. FEEDBACK COLLECTION
   ↓
   • Real-world outcomes tracked
   • Confidence calibration measured
   • Bayesian updates triggered
```

### Future: Automated Bayesian Updates
```
Real-world outcomes arrive
  ↓
Infrastructure calculates:
  Predicted success rate: 85%
  Actual success rate: 82%
  ↓
Bayesian update:
  Prior: 0.85
  Evidence: 82% actual (BF = 0.96)
  Posterior: 0.83
  ↓
Commit new version:
  "Updated based on 127 real-world outcomes"
  ↓
Notify subscribers:
  "Confidence adjusted from 85% to 83%"
```

**This is living knowledge that updates as evidence arrives.**

---

# Schema Hierarchy
```
core-knowledge-schema.json (domain-agnostic)
  │
  ├── Common fields (all domains):
  │   • scenario, conclusion, evidenceBasis
  │   • bayesianAnalysis, sources, metadata
  │
  ├── domain-extensions/
  │   │
  │   ├── legal-extension.json
  │   │   └── Adds: jurisdiction, enforcement, agencies
  │   │
  │   ├── scientific-extension.json
  │   │   └── Adds: replicationStatus, predictiveAccuracy
  │   │
  │   ├── policy-extension.json
  │   │   └── Adds: implementationResults, costBenefit
  │   │
  │   └── medical-extension.json (future)
  │       └── Adds: clinicalTrials, adverseEvents, dosing
  │
  └── Validation rules:
      • All abstracts must validate against core schema
      • Domain-specific abstracts must validate against extension
      • Posterior must match conclusion.confidence
      • Confidence must be 0 < c < 1 (never exactly 1.0)
```

### Schema Design Principles

#### 1. Minimal core, rich extensions
* Core covers what all knowledge needs
* Extensions add domain utility
#### 2. Forward compatibility
* New fields can be added without breaking old abstracts
* Version numbers track schema evolution
#### 3. JSON-LD semantic markup
* Machine-readable
* Linked data ready
* Future: knowledge graph integration
#### 4. Validation before acceptance
* Schema compliance enforced
* Bayesian coherence verified
* No invalid abstracts in system

## Extensibility
### Adding a New Domain
Steps to add, e.g., Medical domain:

#### 1. Create extension schema:

```json
// schemas/domain-extensions/medical-extension.json
{
  "allOf": [{"$ref": "../core-knowledge-schema.json"}],
  "properties": {
    "scenario": {
      "parameters": {
        "intervention": {"type": "string"},
        "condition": {"type": "string"},
        "population": {"type": "string"}
      }
    },
    "validation": {
      "clinicalTrials": {
        "phase1": {"type": "integer"},
        "phase2": {"type": "integer"},
        "phase3": {"type": "integer"},
        "adverseEvents": {"type": "array"}
      }
    }
  }
}
```

#### 2. Create domain renderer:

```javascript
// In index.html
DomainRenderers.medical = {
  renderScenario(data, container) {
    // Medical-specific scenario display
  },
  renderConclusion(data, container) {
    // Efficacy/safety conclusion
  },
  renderDomainSpecific(data, container) {
    // Clinical trial results
  },
  getExpertType() {
    return 'physician or medical researcher';
  }
};
```

#### 3. Submit first abstract:

```json
{
  "@type": "MedicalKnowledge",
  "scenario": {
    "domain": "medical",
    "description": "Does aspirin reduce heart attack risk?",
    "parameters": {
      "intervention": "Aspirin 81mg daily",
      "condition": "Cardiovascular disease",
      "population": "Adults 50-70"
    }
  },
  "conclusion": {
    "confidence": 0.85,
    "outcome": {
      "effectSize": "~25% relative risk reduction",
      "numberNeededToTreat": 50
    }
  }
}
```

#### 4. Document in README:

```markdown
## Supported Domains

- ✅ Legal (passenger rights, housing, employment)
- ✅ Scientific (climate, physics, biology)
- ✅ Policy (UBI, education, healthcare)
- 🆕 Medical (treatments, interventions, diagnostics)
```

**The architecture is designed for this.**

---

## Technical Stack

### Current (MVP)

**Frontend:**
- Pure HTML/CSS/JavaScript (no build step)
- Domain-specific renderers in vanilla JavaScript
- Vercel page hosting
- Custom domain (legisledger.com)

**Data:**
- JSON abstracts in `/api/abstracts`
- Validated against JSON Schema
- Git as database (provenance built-in)

**Why this stack:**
- ✅ Simple (no deployment complexity)
- ✅ Transparent (view source works)
- ✅ Free (no hosting costs)
- ✅ Reliable (GitHub uptime)
- ✅ Forkable (anyone can clone)

### Future (Scaling)

**Backend API (2026):**
```
FastAPI (Python) or Express (Node.js)
  ├── REST endpoints
  ├── GraphQL for complex queries
  ├── WebSocket for real-time updates
  └── MCP server for AI integration
```

**Database:**
```
Primary: PostgreSQL (structured queries)
Search: Elasticsearch (full-text search)
Cache: Redis (performance)
Graph: Neo4j (knowledge graph relationships)
```

**Authentication:**
```
OAuth for institutional submissions
ORCID for author attribution
API keys for programmatic access
```

**Infrastructure:**
```
Kubernetes for orchestration
GitHub Actions for CI/CD
CloudFlare for CDN
Monitoring: Prometheus + Grafana
```

**But we start simple.** No premature optimization.

---

## Future Architecture

### Phase 2: Submission API (Q2-Q3 2025)
```
Institution → API → Validation → Enhancement → Git
```

**Features:**
- REST endpoint: `POST /api/v1/submissions`
- Automated schema validation
- Automated Bayesian coherence checking
- Institutional authentication (ORCID, email)
- Peer review workflow
- Automated enhancement pipeline

### Phase 3: Real-World Feedback (Q3-Q4 2025)
```
User reports outcome → Storage → Bayesian update → New version
```

**Features:**
- User feedback forms
- Outcome tracking (success/failure)
- Confidence calibration
- Automated Bayesian updates
- Version history with explanations

### Phase 4: Knowledge Graph (2026)
```
Abstract A ──supports──→ Abstract B
Abstract C ──contradicts──→ Abstract D
Abstract E ──refines──→ Abstract F
```

**Features:**
- Relationship mapping
- Confidence propagation
- Contradiction detection
- "If you believe X, you should believe Y" reasoning
- Visualization of evidence networks

### Phase 5: AI Integration (2026)
```
ChatGPT ──MCP Server──→ Legis Ledger ──Query Results──→ ChatGPT
```

**Features:**
- Model Context Protocol (MCP) server
- Scenario extraction from natural language
- Confidence explanation in conversational format
- Integration with Gemini, Claude, etc.
- Federated knowledge access

---

## Design Decisions

### Why Not a Blockchain?

**Considered:** Ethereum, Arweave, IPFS

**Rejected because:**
- ❌ Complexity without benefit (Git provides provenance)
- ❌ Cost (gas fees or storage costs)
- ❌ Slower (block time vs instant Git commits)
- ❌ Less familiar (Git is universal)
- ❌ Harder to fork (blockchain forks are contentious)

**Git provides:**
- ✅ Immutability (commit hashes)
- ✅ Provenance (full history)
- ✅ Distribution (clone anywhere)
- ✅ Fork-ability (if governance fails)
- ✅ Free (GitHub)

**Decision:** Start with Git. If decentralization becomes critical, can layer blockchain on top later.

### Why Not Aggregate Confidence?

**Question:** If 3 institutions analyze the same case, why not average their confidence?

**Answer:** Aggregation loses information.

**Our approach:**
```
DGAC: 85% confident (based on enforcement data)
Consumer Org: 90% confident (based on court rulings)

Display:
  "Two institutions analyzed this:
   - DGAC: 85%
   - Consumer Org: 90%
   Consensus: Both agree high confidence"
```

**This preserves:**
- ✅ Different reasoning paths
- ✅ Different priors
- ✅ Institutional attribution
- ✅ Structured disagreement

**Users can:**
- See both analyses
- Trust one more than the other
- Understand why they differ

**Aggregation would hide this.**

### Why Confidence, Not Probability?

**Confidence** (Bayesian epistemology) vs **Probability** (frequentist)

**Confidence says:**
> "Based on available evidence, I'm 85% confident this claim is true"

**Probability says:**
> "If we repeated this scenario 100 times, it would be true 85 times"

**We use confidence because:**
- ✅ Applies to one-time events (can't repeat EU regulation)
- ✅ Incorporates prior knowledge (Bayesian)
- ✅ Updates naturally (new evidence → new confidence)
- ✅ Matches how experts actually think

### Why Allow Multiple Opinions Per Scenario?

**Alternative:** One "authoritative" answer per scenario

**Our approach:** Multiple opinions preserved

**Why:**
- ✅ Institutions have different priors (preserve this)
- ✅ Evidence interpreted differently (show this)
- ✅ No central authority (Madisonian framework)
- ✅ Disagreement is data (not noise)

**Example:**
```
Scenario: "Does UBI reduce poverty?"

Progressive think tank: 70% confident YES
Conservative think tank: 65% confident NO

Both analyses visible. Users see:
- Different priors (base rate assumptions)
- Different evidence weighting (which studies trusted)
- Different definitions (what counts as "poverty reduction")
```

**This makes disagreement productive rather than hostile.**

### Why Git, Not a Database?
#### Git as primary storage:
#### Advantages:

* ✅ Immutable (commit hashes can't be changed)
* ✅ Distributed (everyone can clone)
* ✅ Fork-able (if governance fails, fork the repo)
* ✅ Auditable (full history visible)
* ✅ Free (GitHub)
* ✅ Simple (text files, no database admin)

#### Disadvantages:

* ⚠️ Slower queries (must parse JSON files)
* ⚠️ No complex joins (need to build indexes)
* ⚠️ Scales to ~10,000 abstracts, not millions

#### Solution:

* Start with Git (simple, transparent)
* Add database layer on top when scaling (Postgres + Elasticsearch)
* Git remains source of truth
* Database is computed from Git (can rebuild anytime)

#### This gives:

* ✅ Simplicity now (Git only)
* ✅ Performance later (database cached layer)
* ✅ Transparency always (Git as canonical source)


### Security & Trust
#### Threat Model

The Legis Ledger architecture is designed under the assumption of malicious participation and the challenge of systemic bias. We actively model threats related to data gaming, institutional capture, Sybil attacks, and information warfare. Detailed threat models are maintained internally and are used to drive the priorities of the Change Control Board (CCB). We welcome community feedback on potential failure modes via GitHub Issues.

#### Defenses:

#### 1. Institution verification
* ORCID for author attribution
* Institutional email verification
* Reputation tracking over time

#### 2. Bayesian coherence checking
* Math must work out (prior → evidence → posterior)
* Automated validation rejects incoherent submissions

#### 3. Git transparency
* All decisions public
* Full history auditable
* Community can challenge

#### 4. Multiple opinions
* Users see all views, not filtered selection
* Censorship is visible (missing opinions)

#### 5. Fork-ability
* If governance fails, community forks repo
* No single point of control

### What We DON'T Do
We do NOT:

* ❌ Judge correctness of opinions (that's expert's job)
* ❌ Override confidence levels (institution's judgment)
* ❌ Modify reasoning (preserve original logic)
* ❌ Aggregate opinions (preserve disagreement)
* ❌ Hide dissent (all views visible)

**Our job**: Ensure transparency, coherence, and provenance.

**Community's job**: Judge quality and accuracy.

### Comparison to Alternatives
#### vs. Wikipedia
* **Wikipedia**: Single consensus article, edit wars, no confidence
* **Legis Ledger**: Multiple opinions, quantified confidence, structured disagreement

#### vs. Fact-Checking Sites
* **Fact-checkers**: Binary true/false, single authority
* **Legis Ledger**: Quantified confidence, multiple perspectives, transparent reasoning

#### vs. Prediction Markets
* **Prediction markets**: Crowd wisdom, prices as probabilities
* **Legis Ledger**: Expert reasoning, confidence from evidence

#### vs. Systematic Reviews
* Systematic reviews: Exhaustive, slow, expensive
* Legis Ledger: Faster, broader domains, living updates

**Each has its place. We're not replacing these tools, we're filling a gap.**

### Contributing to Architecture
This architecture is not final. It will evolve based on:

* Community feedback
* Real-world usage
* Technical constraints discovered
* New use cases

### How to contribute:

1. **Question assumptions** - Open GitHub issue: "Why did you choose X over Y?"
2. **Propose improvements** - "What if we did Z instead?"
3. **Identify gaps** - "This doesn't handle scenario W"
4. **Test limits** - "What breaks at scale?"

**Good architecture emerges from criticism and iteration.**

### Theoretical Foundations

**This architecture operationalizes:**

* **Rauch (2021)**: The Constitution of Knowledge → Validation funnel
* **Hayek (1945)**: The Use of Knowledge in Society → Distributed knowledge
* **Madison (1787)**: Federalist Papers → Framework for disagreement
* **Bayesian Epistemology**: Quantified confidence, provisional knowledge
* **Popper**: Falsifiability as demarcation criterion

See [/docs/BAYESIAN_REASONING.md](/docs/BAYESIAN_REASONING.md) for detailed methodology.

### Open Questions
These are architectural questions we don't yet have answers to:

#### 1. Confidence Aggregation
**Question**: When multiple institutions analyze the same scenario, how should we present their differing confidences?<br/>
**Current approach**: Display all opinions side-by-side<br/>
**Alternatives considered:**

* Weighted average (by institutional reputation)
* Median confidence (less affected by outliers)
* Range display (min-max)
* Bayesian meta-analysis (combine evidence, not just conclusions)

**Need**: Community input on what's most useful for users

#### 2. Institutional Reputation
**Question**: How do we track institutional reputation over time?<br/>
**Current approach**: Not implemented (all institutions treated equally)<br/>
**Options:**

* Track record (past accuracy vs. confidence claims)
* Peer ratings (institutions rate each other)
* User feedback (users vote on quality)
* Objective metrics (replication rate, prediction accuracy)

**Concern**: Creates credibility oligarchy. How do new institutions bootstrap?

#### 3. Version Control Strategy
**Question**: When should confidence updates trigger new versions vs. patch updates?<br/>
**Current thinking:**

* Major version (2.0.0): Conclusion changes (entitled → not entitled)
* Minor version (1.1.0): Confidence changes significantly (>10%)
* Patch version (1.0.1): Clarifications, source updates

**But**: Is this the right granularity?

#### 4. Handling Retracted Evidence
**Question**: What happens when a source is retracted (paper withdrawn, regulation overturned)?
**Options:**

* Automatic confidence downgrade
* Flag abstract for review
* Trigger Bayesian update
* Archive abstract as historical

**Need**: Clear policy

#### 5. Cross-Domain Dependencies
**Question**: How do we handle claims that depend on other claims?
**Example:**
* "UBI reduces poverty" depends on "poverty measurement is valid"
* If poverty measurement confidence drops, UBI claim confidence should drop too

**Approaches**:

* Manual specification in `relatedClaims`
* Automated dependency detection
* Confidence propagation through graph

**Status**: Phase 6 (Knowledge Graph) will address this

#### 6. Temporal Claims
**Question**: How do we handle claims that were true but no longer are?
**Example:**
* "EU 261/2004 entitles passengers to compensation" (confidence: 0.95)
* Brexit happens
* For UK flights, this is now false

**Current approach**: Create new abstract with updated conclusion <br/>
**Better approach needed**: Temporal validity, expiration dates, jurisdiction changes

#### 7. Scenario Matching Precision

**Question:** How precisely must a user's scenario match an abstract for it to apply?<br/>
**Example:**
* Abstract: "Flight CDG→JFK, 4hr delay, mechanical"
* User: "Flight CDG→LAX, 3.5hr delay, mechanical"

**Is this the same scenario? Close enough? Different confidence?**<br/>
**Current**: Exact match required (user must find right abstract)<br/>
**Future**: Fuzzy matching, interpolation, "Your scenario is 85% similar to Abstract X"

#### 8. Multilingual Support

**Question**: How do we handle abstracts in different languages?<br/>
**Current**: English only<br>
**Options:**
* Machine translation (automated)
* Human translation (verified)
* Language-specific confidence adjustments
* International institutions submit in native language

**Concern:** Translation introduces uncertainty. How to quantify?

---

### Design Trade-offs
**Every architectural decision involves trade-offs. Here are ours:**

#### Simplicity vs. Features
**Trade-off**: MVP is deliberately simple (static site, JSON files, no backend)<br/>
**We gain:**
* ✅ Fast launch (no deployment complexity)
* ✅ Transparent (view source works)
* ✅ Forkable (anyone can clone and run)

**We lose:**

* ⚠️ No real-time updates (must rebuild)
* ⚠️ No user accounts (can't track individuals)
* ⚠️ No advanced queries (must implement later)

**Decision**: Start simple. Add complexity only when needed.

### Transparency vs. Privacy
**Trade-off:** All data is public (Git commits, institutional attribution)<br/>
**We gain:**
* ✅ Full transparency (auditability)
* ✅ Provenance (who said what when)
* ✅ Accountability (institutions own their claims)

**We lose:**
* ⚠️ No private submissions (institutions must be public)
* ⚠️ No anonymous whistleblowing (could be valuable)
* ⚠️ Commit history shows false starts (learning in public)

**Decision**: Transparency is core value. Privacy sacrificed for trust.

### Precision vs. Accessibility
**Trade-off:** Bayesian analysis is mathematically precise but complex<br/>
**We gain:**
* ✅ Rigorous reasoning (verifiable)
* ✅ Updates are principled (not arbitrary)
* ✅ Confidence is quantified (not vague)

**We lose:**
* ⚠️ Steep learning curve (users must understand Bayes)
* ⚠️ Intimidating (math scares some people)
* ⚠️ Time-consuming (institutions must show work)

**Decision**: Precision matters more than ease. But we provide tutorials.

### Domain-Agnostic vs. Domain-Optimized
**Trade-off**: Single schema for all domains vs. custom schema per domain
**We gain:**
* ✅ Consistency (users learn once, apply everywhere)
* ✅ Interoperability (abstracts comparable across domains)
* ✅ Infrastructure efficiency (one codebase)

**We lose:**
* ⚠️ Less optimized for any single domain
* ⚠️ Extensions add complexity
* ⚠️ Domain-specific nuances may not fit perfectly

**Decision:** Domain-agnostic core + extensions. Balance between consistency and utility.

### Git vs. Database
**Trade-off**: Git as primary storage vs. traditional database<br/>
**We gain:**
* ✅ Provenance (built-in)
* ✅ Distribution (cloneable)
* ✅ Simplicity (text files)
* ✅ Fork-ability (escape hatch)

**We lose:**
* ⚠️ Query performance (slower)
* ⚠️ Scalability (thousands, not millions)
* ⚠️ Complex queries (no SQL)

**Decision:** Git primary, database cached layer later. Transparency > performance initially.

---

### Failure Modes & Mitigations
**What could go wrong?**

#### Technical Failures
**Failure:** Git doesn't scale to millions of abstracts<br/>
**Mitigation:**
* Phase 1-3: Git only (thousands of abstracts)
* Phase 4+: Database layer caches Git (millions of abstracts)
* Git remains source of truth (rebuild database anytime)

**Failure**: Schema becomes unwieldy (too many extensions)<br/>
**Mitigation:**
* Version schema carefully (semantic versioning)
* Deprecate old fields gracefully
* Community reviews schema changes

**Failure:** Bayesian math is too complex for most institutions<br/>
**Mitigation:**
* Provide calculators/tools
* Accept "simplified Bayesian" (just prior + final, skip intermediate steps)
* Community can help institutions format submissions

#### Social Failures
**Failure**: No institutions adopt (only individual enthusiasts)<br/>
**Mitigation:**
* Start with individual submissions (better than nothing)
* Prove value, attract institutions organically
* Seek grant funding for institutional partnerships

**Failure**: Bad actors flood with low-quality submissions<br/>
**Mitigation:**
* Reputation tracking (track record visible)
* Community flagging (peer review post-publication)
* Rate limiting (can't submit 100/day)
* Institution verification (ORCID, email domain)

**Failure**: Becomes echo chamber (ideological homogeneity)<br/>
**Mitigation:**
* Actively recruit across political spectrum
* Make diverse perspectives visible in UI
* Track ideological diversity metrics
* Warn users if only one perspective represented

**Failure**: Governance capture (infrastructure operators biased)<br/>
**Mitigation:**
* All decisions public (Git transparency)
* Community can fork if governance fails
* Eventual foundation model (distributed governance)
* Open decision-making process

#### Epistemic Failures
**Failure**: Confidence doesn't track truth (calibration fails)<br/>
**Mitigation:**
* Track real-world outcomes continuously
* Measure calibration (are 80% confidence claims right 80% of time?)
* Bayesian updates when calibration drifts
* Publish calibration metrics publicly

**Failure**: Institutions game confidence levels<br/>
**Mitigation:**
* Bayesian coherence checking (math must work)
* Track record visible (past accuracy shown)
* Community can challenge reasoning
* Reputation suffers if consistently wrong

**Failure**: Creates false precision (0.851 vs 0.847 is meaningless)<br/>
**Mitigation:**
* Round to nearest 5% in UI
* Emphasize confidence intervals over point estimates
* Show uncertainty prominently
* Educate about what confidence means

---

### Architectural Invariants

These principles should NOT change, even as architecture evolves:

#### 1. Epistemic Humility
```
INVARIANT: No claim ever reaches 1.0 confidence
WHY: Science is provisional, absolute certainty is unjustified
ENFORCEMENT: Schema validation rejects confidence == 1.0
```

#### 2. Transparent Reasoning
```
INVARIANT: Bayesian analysis must show prior → evidence → posterior
WHY: Users must be able to verify and challenge reasoning
ENFORCEMENT: Schema requires bayesianAnalysis block with complete path
```

#### 3. Falsifiability
```
INVARIANT: Every claim must specify howToChangeMyMind
WHY: Popper's criterion - unfalsifiable claims aren't scientific
ENFORCEMENT: Schema requires at least one falsification criterion
```

#### 4. Provenance
```
INVARIANT: All changes tracked in Git with attribution
WHY: Trust requires auditability
ENFORCEMENT: Git is primary storage, every edit has commit author
```

#### 5. Structured Disagreement
```
INVARIANT: Multiple opinions on same scenario are preserved, not aggregated
WHY: Disagreement is data, not noise
ENFORCEMENT: UI displays all opinions, never averaging
```

#### 6. No Central Authority
```
INVARIANT: Infrastructure doesn't judge correctness, only coherence
WHY: Madisonian framework - no final arbiter
ENFORCEMENT: Validation checks schema/math, not substance
```

### 7. Fork-ability
```
INVARIANT: Community can fork if governance fails
WHY: Escape hatch prevents capture
ENFORCEMENT: Git + open source + clear license (Apache 2.0)
```

**If any of these are violated, the architecture has failed.**

---

## Success Metrics

**How do we know if this architecture is working?**

### Phase 1 (MVP): Proof of Concept

**Metrics:**
- ✅ 5+ abstracts live
- ✅ Schema validates correctly
- ✅ UI renders without errors
- ✅ Bayesian calculations verified by domain expert
- ✅ 1,000+ users visit site
- ✅ 50+ users report real-world outcomes

### Phase 2 (Refinement): Community Building

**Metrics:**
- ✅ 10+ abstracts across 2+ domains
- ✅ 3+ external contributors submit PRs
- ✅ 100+ GitHub stars
- ✅ First institution submits opinion (not just individual)
- ✅ Cited in 1+ academic papers or policy documents

### Phase 3 (Scientific Domain): Contested Knowledge

**Metrics:**
- ✅ Climate change abstracts live (3+ showing confidence gradients)
- ✅ Both pro/con perspectives represented
- ✅ No major backlash (architecture holds under political pressure)
- ✅ 5+ media mentions
- ✅ Used in 1+ classroom as teaching tool

### Phase 4 (Policy Domain): Multiple Perspectives

**Metrics:**
- ✅ UBI abstracts from institutions across political spectrum
- ✅ Measurable calibration (confidence matches real-world accuracy)
- ✅ First Bayesian update based on pilot program results
- ✅ Policymaker references this in hearing/speech

### Phase 5 (Scale): Infrastructure Adoption

**Metrics:**
- ✅ 1,000+ abstracts across 5+ domains
- ✅ 10+ institutions use API for submissions
- ✅ Revenue model supports operations (grants, subscriptions, or donations)
- ✅ First fork by another group (proves fork-ability)

### Long-Term: Societal Impact

**Metrics:**
- ✅ Surveys show increased trust in participating institutions
- ✅ Evidence of reduced polarization on covered topics
- ✅ Measurable improvement in policy outcomes
- ✅ Becomes expected practice for knowledge claims in certain domains

**These metrics will evolve as we learn what actually matters.**

---

## For Architects and Developers

### Key Files
```
legisledger/
├── index.html                          # UI with domain-specific renderers
├── schemas/
│   ├── core-knowledge-schema.json      # Domain-agnostic base
│   └── domain-extensions/
│       ├── legal-extension.json
│       ├── scientific-extension.json
│       └── policy-extension.json
├── data/
│   └── abstracts/                      # Live knowledge abstracts
│       ├── eu-delay-mechanical-3hrs.json
│       ├── us-denied-boarding.json
│       └── ...
├── examples/                           # Future test cases (not live)
│   ├── climate-co2-warming-ipcc.json
│   └── README.md
└── docs/
    ├── ARCHITECTURE.md                 # This file
    ├── BAYESIAN_REASONING.md           # Tutorial for contributors
    ├── SUBMISSION_GUIDE.md             # How institutions submit
    └── FAQ.md                          # Common questions
```

### Adding a Domain-Specific Renderer
```javascript
// In index.html
DomainRenderers.yourDomain = {
  renderScenario(data, container) {
    // Extract scenario.parameters and display
    container.innerHTML = `<p>Your domain-specific scenario details</p>`;
  },
  
  renderConclusion(data, container) {
    // Extract conclusion.outcome and format appropriately
    container.className = 'card';
    container.innerHTML = `<h3>Your conclusion format</h3>`;
  },
  
  renderDomainSpecific(data, container) {
    // Render domain-specific sections (enforcement, replication, etc.)
    let html = '<div class="card"><h2>Domain Section</h2></div>';
    container.innerHTML = html;
  },
  
  renderDisclaimer(data, container) {
    // Domain-specific disclaimers
    container.innerHTML = '<p>Domain-specific disclaimer text</p>';
  },
  
  getExpertType() {
    return 'appropriate expert type';
  }
};
```

### Validating an Abstract
```bash
# Install JSON Schema validator
npm install -g ajv-cli

# Validate against core schema
ajv validate -s schemas/core-knowledge-schema.json \
  -d data/abstracts/your-abstract.json

# Validate against domain extension
ajv validate -s schemas/domain-extensions/legal-extension.json \
  -d data/abstracts/your-abstract.json
```

### Testing Locally
```bash
# Start local server
python3 -m http.server 8000

# Open browser
open http://localhost:8000

# Check console for errors (F12)
# Test each abstract loads
# Verify Bayesian calculations
# Check all links work
```

---

## For Researchers

### Citing This Work

**Preprint format (until published):**

```
Regan, D. (2025). Legis Ledger: Knowledge Infrastructure for Democracy 
through Structured Bayesian Pluralism. Retrieved from 
https://legisledger.com

Architecture documentation: 
https://github.com/legisledger/legisledger/blob/main/docs/ARCHITECTURE.md
```

### Research Questions This Enables
**Epistemology:**
* Does Bayesian confidence tracking improve knowledge quality?
* Can structured disagreement reduce polarization?
* What's the optimal balance between precision and accessibility?

**Institutional Trust:**
* Do transparency and provenance increase trust?
* Does quantified uncertainty affect how people use information?
* Can institutions with different priors collaborate productively?

**Validation Science:**
* How well do confidence levels calibrate with real-world outcomes?
* What's the optimal funnel position granularity?
* Can Bayesian updates be automated reliably?

**AI & Knowledge:**
* How do LLMs use quantified confidence in reasoning?
* Can AI help match user scenarios to relevant abstracts?
* What's the interaction between human and machine confidence?

**Science of Science:**
* Can this improve replication tracking?
* Does it help identify research blind spots?
* Can it accelerate scientific consensus formation?

### Data Access
**All data is public:**
* Abstracts: `/data/abstracts/*.json`
* Schema: `/schemas/*.json`
* History: Git commit log
* Real-world outcomes: (when Phase 3 launches)

**For bulk analysis:**

Clone repo: `git clone https://github.com/legisledger/legisledger.git`
API access: (Phase 5, 2026)

---

### Conclusion
**This architecture attempts to operationalize:**
* Rauch's validation funnel → Computable epistemology
* Bayesian reasoning → Quantified confidence
* Madisonian pluralism → Structured disagreement
* Git transparency → Provenance and auditability
* AI-ready protocols → Future knowledge access

**It might fail. Many ways this could go wrong:**
* Too complex for adoption
* Can't handle real disagreement
* Gaming destroys signal
* Confidence doesn't track truth
* Better alternatives exist

**That's why it's open source and transparent.**
**If you see flaws, open an issue.**
**If you have better ideas, fork the repo.**
**If you think this is doomed, explain why.**
**We're at 0.60 confidence this will work.**
**Help us update.**

---

**Last Updated**: 2025-01-24<br/>
**Version**: 1.0.0<br/>
**Status:** MVP #1 (Passenger Rights) - Live<br/>
**Next Review**: After Phase 2 community feedback (Q2 2025)

---

### Contact

**Technical questions**: GitHub Issues<br/>
**Schema improvements**: GitHub Discussions<br/>
**Partnership inquiries**: [Create later: partnerships@legisledger.com]<br/>
**General questions**: [Create later: hello@legisledger.com]<br/>
**Website**: https://legisledger.com<br/>
**Repository**: https://github.com/legisledger/legisledger<br/>
**Documentation**: https://github.com/legisledger/legisledger/tree/main/docs<br/>

---

*`"The Constitution of Knowledge is not a structure; it's a process."`* - Jonathan Rauch

We're building infrastructure for that process.
