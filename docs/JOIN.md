# Join Legis Ledger: Guide for Institutions

**Version:** 1.0  
**Date:** 2025-01-25

---

## Why Participate?

Legis Ledger is a **federated knowledge infrastructure** where institutions publish expert opinions while maintaining **full sovereignty**. No central authority controls your content.

---

## Value Propositions by Institution Type

### Government Agencies (DGAC, DOT, FDA, CDC)

**What you get:**
- **Reduced support burden:** 1 knowledge abstract answers 10,000+ citizen queries
- **Transparency = legitimacy:** Public Bayesian reasoning builds trust
- **Real-world outcome tracking:** See which policies work in practice
- **Mission amplification:** Your expertise reaches citizens where they are (ChatGPT, Perplexity, etc.)

**What it costs:** Publish what you already produce (regulations, guidance, enforcement data)

**ROI:** 10:1+ (staff hours saved vs. time invested)

**Example:** DGAC publishes EU passenger rights abstracts. Result: 10,000 accurate answers/month, 500 fewer support tickets, higher compliance.

---

### Academic Institutions (Universities, Research Labs)

**What you get:**
- **Citation tracking:** See who uses your research and how
- **Impact metrics:** "Accessed 50,000 times, informed 200 policy decisions"
- **Funding narratives:** Demonstrate real-world impact for grant applications
- **Collaboration discovery:** Find other researchers working on related claims
- **Public engagement:** Research reaches beyond academic journals

**What it costs:** Publish findings you already publish (papers, meta-analyses, systematic reviews)

**ROI:** Career advancement (tenure cases, grant success)

**Example:** Sports nutrition research group publishes creatine abstract. Result: 25,000 accesses, cited in 15 fitness apps, leads to NIH grant.

---

### Industry Groups (Trade Associations, Companies)

**What you get:**
- **Customer acquisition:** Users discover your services through knowledge abstracts
- **Market intelligence:** See what questions users ask, where competitors publish
- **Credibility via track record:** Calibration scores show you're trustworthy
- **Thought leadership:** Establish expertise in your domain

**What it costs:** Publish what you already know (industry data, best practices)

**ROI:** Direct revenue (customer acquisition at fraction of traditional marketing cost)

**Example:** AirHelp publishes passenger rights expertise. Result: 5,000 new customers/year at $0.10/customer acquisition cost (vs. $50 traditional).

---

### Non-Profits & Advocacy Organizations

**What you get:**
- **Mission amplification:** Your message reaches millions through AI interfaces
- **Data-driven advocacy:** "Our estimate was 72% accurate over 1,000 cases" beats anecdotes
- **Funding narratives:** Quantified impact for foundation grants
- **Coalition building:** Find aligned institutions, coordinate messaging

**What it costs:** Publish what you already produce (reports, analysis, guides)

**ROI:** Mission success (policy change, public awareness)

**Example:** Environmental NGO publishes climate abstracts. Result: 1M accesses, cited in 50 news articles, influences 3 policy debates.

---

## How to Publish: Technical Overview

### Step 1: Create Knowledge Abstracts

Use our [core schema](../schemas/core-knowledge-schema.json) to structure your expertise:

```json
{
  "@context": "https://schema.org",
  "@type": "KnowledgeClaim",
  
  "scenario": {
    "description": "Your claim in plain language",
    "domain": "legal" | "scientific" | "policy"
  },
  
  "conclusion": {
    "claim": "Specific assertion",
    "confidence": 0.85,
    "uncertainties": ["What could make this wrong"]
  },
  
  "evidenceBasis": [
    {"type": "regulation", "citation": "...", "grade": "A"}
  ],
  
  "bayesianAnalysis": {
    "prior": {"confidence": 0.70, "basis": "Why this starting point"},
    "evidence": [
      {"factor": "New evidence", "posteriorAfter": 0.85}
    ],
    "posterior": 0.85,
    "howToChangeMyMind": ["What would falsify this"]
  }
}
```

### Step 2: Add Provenance Transparency

Include required disclaimers:

```json
{
  "disclaimer": {
    "provenanceAndLimitations": {
      "submittedBy": "Your Institution Name",
      "notSubmittedByAuthority": "NOT submitted by [official authority]",
      "potentialBiases": ["List your potential conflicts/biases"],
      "howToVerify": ["Steps users can take to verify independently"],
      "updateMechanism": "When/how this gets updated"
    }
  }
}
```

### Step 3: Sign Cryptographically

Use your institutional DID (Decentralized Identifier):

```json
{
  "digitalSignature": {
    "type": "RsaSignature2018",
    "creator": "https://your-institution.org/keys/key-2025",
    "signatureValue": "..."
  }
}
```

We provide tools to generate keys and sign claims.

### Step 4: Submit via API

```bash
curl -X POST https://api.legis-ledger.org/submit \
  -H "Content-Type: application/json" \
  -d @your-claim.json
```

---

## What Does It Cost?

### Free Tier (Most Institutions)
- **Cost:** $0
- **Includes:**
  - Publish unlimited knowledge abstracts
  - Cryptographic signing
  - Basic analytics dashboard
  - Community support (GitHub issues)
  - Listed in institution directory

### Sponsorship Tiers (Optional)

**Bronze ($10k/year):**
- All Free features
- Logo on website footer
- Quarterly impact reports
- Priority GitHub issues

**Silver ($50k/year):**
- All Bronze features
- Priority technical support (email + video)
- Custom vocabulary extension assistance
- Named in major announcements
- Dedicated success manager

**Gold ($100k/year):**
- All Silver features
- Dedicated integration engineering (up to 40 hours)
- Custom analytics dashboard for your domain
- Advisory board seat (non-voting, input only)
- Co-branded case studies and publications

**Note:** Sponsorship is **optional** and provides **no governance control**. All institutions have equal standing in vocabulary votes and federation governance.

---

## Governance Guarantees

### What You Retain (Sovereignty)

✅ **Content control:** You own your knowledge abstracts. We can't edit or censor.  
✅ **Identity control:** You control your DID. We can't revoke your identity.  
✅ **Participation control:** Join, pause, exit at any time. No lock-in.  
✅ **Data portability:** Export all your data anytime (JSON-LD format).  
✅ **Fork rights:** If Legis Ledger fails/captured, fork the code and continue.  

### What We Provide (Infrastructure)

✅ **Protocol:** Federation standard, open source  
✅ **Hosting:** Redundant, multi-cloud infrastructure  
✅ **Discovery:** AI assistants and search engines find your claims  
✅ **Validation:** Track real-world outcomes, Bayesian updates  
✅ **Governance:** Transparent, decentralized, capture-resistant  

### What We Don't Do (Limits)

❌ **No censorship:** We can't remove claims (only flag quality issues objectively)  
❌ **No forced updates:** We can't make you revise claims  
❌ **No selling control:** Funders don't control governance  
❌ **No single point of failure:** Fork rights ensure survival  

---

## Getting Started: 3 Pathways

### Pathway 1: Pilot with 1 Claim (2 hours)
1. Identify your most-asked question
2. Use our claim template
3. Submit via web form (no code required)
4. See usage analytics after 30 days
5. Decide: expand or not?

**Best for:** Testing the waters, low commitment

### Pathway 2: Domain Integration (2 weeks)
1. Identify your top 10 knowledge claims
2. Convert to JSON using our tools
3. Set up cryptographic signing
4. Submit via API
5. Monitor real-world outcomes
6. Iterate based on calibration scores

**Best for:** Serious participation, measurable ROI

### Pathway 3: Full Federation (2-3 months)
1. Deploy your own Legis Ledger instance
2. Federate with main network
3. Control your own infrastructure
4. Contribute to protocol development
5. Help govern vocabulary and standards

**Best for:** Large institutions, sovereignty maximalists

---

## Technical Requirements

### Minimum Requirements
- Ability to produce JSON files (or use our web form)
- Public web presence for DID verification
- Commitment to update claims if miscalibrated

### Recommended Capabilities
- Cryptographic key management (we provide tools)
- Git/GitHub familiarity (for vocabulary proposals)
- Basic Bayesian reasoning (we provide training)

### No Requirements
- ❌ Infrastructure (we host)
- ❌ Developers (web form available)
- ❌ Legal review (our templates cover basics)

---

## FAQ

**Q: Who controls Legis Ledger?**  
A: No one. It's federated infrastructure. Institutions maintain sovereignty.

**Q: What if I publish something wrong?**  
A: Real-world outcomes will show miscalibration. Your reputation score adjusts. You can update claims anytime.

**Q: Can you censor my claims?**  
A: No. We can only adjust visibility tier based on objective quality signals (schema compliance, track record, calibration). You always control content.

**Q: What if Legis Ledger gets acquired by a big company?**  
A: Open source + fork rights mean network survives. Can't be captured. (See: [Governance Constitution](docs/governance/CONSTITUTION.md))

**Q: How do I get my claims seen?**  
A: Quality and track record drive visibility. High-calibration claims with good provenance transparency appear first in search/AI results.

**Q: Can I charge for access to my claims?**  
A: Your individual claims must be open (CC-BY license). But you can use them for customer acquisition, then charge for services.

**Q: What if my domain isn't covered yet?**  
A: Propose a domain extension via GitHub. Simple majority of institutions in that domain can approve. (See: [Vocabulary Governance](docs/governance/VOCABULARY_GOVERNANCE.md))

---

## Next Steps

1. **Explore examples:**
   - [Passenger Rights (Legal)](../examples/legal/)
   - [Creatine Supplementation (Scientific)](../examples/scientific/creatine-lbm-resistance-training.json)

2. **Read governance docs:**
   - [Governance Constitution](docs/governance/CONSTITUTION.md) - How capture is prevented
   - [Quality Tiers](docs/governance/QUALITY_TIERS.md) - How visibility works

3. **Contact us:**
   - Email: institutions@legis-ledger.org
   - GitHub: Open an issue in `/onboarding` repository
   - Office hours: Tuesdays 2-4pm ET (Zoom link on website)

4. **Start small:**
   - Pilot with 1 claim (2 hours)
   - Evaluate results after 30 days
   - Expand if ROI positive

---

## Training & Support

**Free Resources:**
- Documentation: Complete guides and examples
- GitHub: Community support via issues
- Webinars: Monthly "How to Publish Knowledge Claims" (recorded)

**Paid Training (Optional):**
- Institution workshop: $5k (1-day on-site, up to 20 staff)
- Certification program: $2k/person (Bayesian reasoning for analysts)
- Custom integration: $50k (dedicated engineering for complex systems)

---

## Success Stories (Planned)

*This section will feature case studies from early adopters showing ROI, mission impact, and lessons learned.*

---

**Join us in building knowledge infrastructure for democracy.**

No central authority. No capture. No lock-in. Just institutions sharing expertise with transparent confidence and provenance.

**Ready to start?** Email institutions@legis-ledger.org or open a GitHub issue.
