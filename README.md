# Legis Ledger

**The public site is live at [https://demo.legisledger.com](https://demo.legisledger.com).**

---

## ⚖️ LEGAL DISCLAIMER

**Independent Open Source Project**

This is an independent open source project and is not affiliated with, endorsed by, or representative of any government agency or the United States Government.

The views and opinions expressed in this project are those of the contributors and do not necessarily reflect the official policy or position of any government agency.

This project was developed outside of official duty hours using personal resources.

---

## What This Is

Legis Ledger is knowledge infrastructure that enables institutions to publish expert opinions with:

- **Quantified confidence** (Bayesian probabilities, not binary true/false)
- **Transparent provenance** (who submitted, potential biases, verification paths)
- **Real-world validation** (track outcomes, update confidence)
- **Structured disagreement** (preserve pluralism while enabling convergence)

Like Madison's Constitution provides a framework for political disagreement, this infrastructure provides a framework for **epistemic disagreement**.

---

## Why This Exists

**The Problem:**

Wikipedia enables cooperation through consensus, which works for settled facts ("Paris is the capital of France") but breaks down for:
- Contested scientific claims ("Does creatine increase muscle mass?")
- Situational judgments ("Am I entitled to compensation for my delayed flight?")
- Probabilistic claims ("What's the success rate if I file this claim?")
- Policy questions with emerging evidence

**The Solution:**

Infrastructure that preserves disagreement while enabling Bayesian convergence:
- Multiple institutions can publish different confidence levels
- Evidence causes convergence over time
- Real-world outcomes validate predictions
- No central authority decrees "the right answer"

**Theoretical Foundation:**

This operationalizes Jonathan Rauch's *The Constitution of Knowledge* (2021) through structured Bayesian reasoning and transparent provenance.

---

## Current Status

**Two Working MVPs:**

1. ✅ **Passenger Rights (Legal Domain)** - EU/US flight delay compensation
2. ✅ **Creatine Supplementation (Scientific Domain)** - Lean body mass and resistance training

**Test Cases in Development:**
- Climate change (canonical scientific knowledge)
- Universal Basic Income (contested policy domain)

---

## Core Architecture

### Domain-Agnostic Design

The system uses a universal schema that works across legal, scientific, and policy domains:

```json
{
  "@type": "KnowledgeClaim",
  "scenario": {
    "description": "Plain language question",
    "domain": "scientific",
    "parameters": { }
  },
  "conclusion": {
    "claim": "The assertion being made",
    "confidence": 0.90,
    "uncertainties": ["What could make this wrong"]
  },
  "evidenceBasis": [
    {"type": "meta-analysis", "citation": "...", "grade": "A+"}
  ],
  "bayesianAnalysis": {
    "prior": {"confidence": 0.75, "basis": "..."},
    "evidence": [...],
    "posterior": 0.90
  },
  "disclaimer": {
    "provenanceAndLimitations": {
      "submittedBy": "Institution name",
      "potentialBiases": ["..."],
      "howToVerify": ["..."]
    }
  }
}
```

See: [Core Schema](schemas/core-knowledge-schema-1.2.0.json)

---

## Key Principles

### 1. Honest Uncertainty (Humility & Confidence < 1.0)
- Confidence always < 1.0 (no absolute certainty)
- "Could be wrong" section explicit
- Uncertainties listed transparently

### 2. Transparency (Provenance, Auditability, and Verification)
- Who submitted (institution type, potential biases)
- How to verify independently
- What's NOT (not submitted by official authorities)

### 3. Integrity (Schema Validation, CCB, Bayesian Rigor)
- Prior → Evidence → Posterior (transparent path)
- Show your work (all steps visible)
- Update as evidence emerges

### 4. Momentum (Bias toward Shipping, necessary to achieve the Vision)
- No central authority
- Fork rights prevent capture
- Institutional sovereignty preserved
- Evidence arbitrates disputes

---

## Documentation

### Core
- [README](README.md) - This file
- [Core Schema](schemas/core-knowledge-schema-1.2.0.json)
- [Constitution](docs/CONSTITUTION.md) - Governance by design
- [FAQ](docs/FAQ.md)

### Examples
- [Scientific: Creatine](examples/scientific/creatine-lbm-resistance-training-2025.json)
- [Legal: Passenger Rights](examples/data/abstracts/us-denied-boarding.json) (in development)

---

## Technology Stack

- **Data Format:** JSON-LD (Linked Data)
- **Schema:** JSON Schema validation
- **Version Control:** Git
- **Cryptographic Signatures:** Planned (institutional verification)
- **Federation Protocol:** ActivityPub-inspired (planned)

---

## For Institutions

### Why Participate?

**Government Agencies:**
- Reduce support burden (1 abstract answers 10,000 queries)
- Increase transparency and legitimacy
- Track real-world outcomes

**Academic Institutions:**
- Citation tracking and impact metrics
- Funding narratives
- Collaboration discovery

**Industry Groups:**
- Customer acquisition
- Market intelligence
- Credibility through track record

**NGOs:**
- Mission amplification
- Data-driven advocacy

### How to Participate

(Will be documented after public launch)

---

## Development Roadmap

### Phase 1: GTM Validation & MVP Polish (Current)
- Core schema finalized
- MVP examples complete
- Governance architecture documented
- Legal clearance in progress

### Phase 2: Growth (2026)
- Climate change example
- UBI pilot results
- Multi-institution disagreement examples
- Real-world validation tracking

---

## Contributing

**After Public Launch:**

This project will welcome contributions in:
- Knowledge abstracts in your domain
- Code improvements
- Documentation
- Vocabulary governance
- Institution recruitment

See [docs/CONTRIBUTING.md](CONTRIBUTING.md)

---

## Contact

**Project Inquiry:** [hello@legisledger.org](mailto:hello@legisledger.org)

---

## License

All code, schemas, and documentation were open source in this version. The active, maintained repository is now private.

---

## Status

**Epistemic Status:** Early-stage prototype (0.65 confidence we can handle contested domains)

**Current Confidence in Architecture:** 
- Can handle legal domain: 0.85
- Can handle scientific domain: 0.90
- Can handle climate change: 0.75 (testing needed)
- Can handle UBI: 0.65 (most uncertain)

**What would change our mind:**
- Success with climate change example → confidence up
- Failure to preserve meaningful disagreement → confidence down
- Institutions don't find this useful → rethink approach

---

## Acknowledgments

**Theoretical Foundations:**
- Jonathan Rauch - *The Constitution of Knowledge* (2021)
- F.A. Hayek - *The Use of Knowledge in Society* (1945)
- James Madison - *Federalist Papers* (1787)
- Bayesian epistemology and statistical inference
- GRADE Working Group (evidence assessment)

**Inspiration:**
- Wikipedia (cooperation through consensus)
- Schema.org (structured data for the web)
- Git (distributed version control)
- Email (federated protocols)

---

**Last Updated:** 2025-12-08 
**Version:** 1.2.0-launch  
