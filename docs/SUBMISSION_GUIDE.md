# How to Submit a Knowledge Claim

This guide explains how institutions can submit their expert opinions to the Legis Ledger.

## Who Can Submit

**Currently:** Institutions with expertise in a relevant domain
- Government agencies (FDA, EPA, DOT, DGAC, etc.)
- Research institutions (universities, labs, IPCC)
- Think tanks (across ideological spectrum)
- Professional organizations (medical associations, bar associations)
- NGOs with domain expertise

**Future:** Possibly community track for crowdsourced opinions

**Not currently:** Individual experts without institutional affiliation (prevents spam, maintains quality)

---

## What You Need to Provide

### Minimum Submission (Required Fields)
```json
{
  "@type": "KnowledgeClaim",
  
  "submittedBy": {
    "institution": "Your Organization Name",
    "authorName": "Lead Author",
    "authorORCID": "0000-0002-1234-5678",
    "role": "Position/Title"
  },
  
  "scenario": {
    "description": "Plain language: What claim are you analyzing?",
    "domain": "legal | scientific | policy",
    "parameters": { /* domain-specific facts */ }
  },
  
  "conclusion": {
    "claim": "Your specific assertion",
    "confidence": 0.85,  // Must be 0.0-1.0, never exactly 1.0
    "outcome": { /* what this means practically */ }
  },
  
  "evidenceBasis": [
    {
      "type": "regulation | study | precedent | experiment",
      "citation": "Formal reference",
      "summary": "Why this matters"
    }
    // At least 1 required, more is better
  ],
  
  "bayesianAnalysis": {
    "prior": {
      "confidence": 0.70,
      "basis": "Why did you start here?"
    },
    "evidence": [
      {
        "factor": "What evidence did you consider?",
        "posteriorAfter": 0.85,
        "reasoning": "How did this change your confidence?"
      }
      // Show your reasoning path
    ],
    "posterior": 0.85,  // Must match conclusion.confidence
    "howToChangeMyMind": [
      "What evidence would falsify this claim?"
      // At least 1 required - this is critical for epistemic humility
    ]
  },
  
  "sources": [
    {
      "citation": "Full reference",
      "url": "https://...",
      "type": "primary | secondary | tertiary"
    }
    // At least 1 required
  ]
}
```

### What We Add (Infrastructure Provides)

You **don't** need to provide:
- ❌ Metadata (git commits, version tracking)
- ❌ Funnel position (we calculate based on your submission)
- ❌ Enforcement procedures (domain-specific, we standardize)
- ❌ Validation tracking (we collect real-world outcomes)
- ❌ Disclaimers (we add legal/epistemic boilerplate)

---

## Step-by-Step Guide

### Step 1: Choose Your Domain

Pick the closest match:
- **Legal:** Rights, regulations, court interpretations
- **Scientific:** Research claims, causal relationships, predictions
- **Policy:** Intervention effectiveness, cost-benefit, outcomes

Not sure? Email us: submissions@legis-ledger.org

### Step 2: Define the Scenario

**Be specific:**
❌ Bad: "Climate change is real"
✅ Good: "Atmospheric CO₂ increase from 280ppm to 420ppm causes global mean surface temperature rise"

**Include parameters:**
- Legal: Origin, destination, issue type, specific facts
- Scientific: Hypothesis, timeframe, population, variables
- Policy: Intervention, population, location, outcome measured

### Step 3: State Your Conclusion

**Must include:**
- Claim (what are you asserting?)
- Confidence (0.0-1.0, never exactly 1.0)
- Outcome (what does this mean practically?)

**Confidence guidelines:**
- 0.50-0.60: Weak evidence, preliminary
- 0.60-0.75: Moderate evidence, emerging consensus
- 0.75-0.90: Strong evidence, well-confirmed
- 0.90-0.999: Very strong evidence, canonical

**Never use 1.0** - epistemic humility is structurally enforced.

### Step 4: Provide Evidence

List every source you relied on:
- Regulations, statutes, treaties (legal)
- Peer-reviewed papers, datasets (scientific)
- Pilot studies, cost analyses (policy)

**For each source:**
- Type (regulation/study/precedent/experiment)
- Citation (formal reference)
- Summary (why this matters)
- URL (if available)

### Step 5: Show Your Bayesian Reasoning

**This is the heart of the submission.**

**Prior:** Where did you start?
```json
"prior": {
  "confidence": 0.70,
  "basis": "Base rate: 70% of mechanical delay claims succeed in France",
  "source": "DGAC enforcement statistics 2020-2024"
}
```

**Evidence:** What changed your mind?
```json
"evidence": [
  {
    "factor": "Flight departed from EU territory",
    "posteriorAfter": 0.85,
    "reasoning": "EU 261/2004 applies, strong enforcement"
  },
  {
    "factor": "Mechanical issue documented in flight logs",
    "posteriorAfter": 0.85,
    "reasoning": "Case C-549/07 establishes mechanical issues not extraordinary"
  }
]
```

**How to change your mind:**
```json
"howToChangeMyMind": [
  "Airline produces meteorological evidence weather was primary cause → confidence drops to ~0.20",
  "ECJ issues new ruling changing mechanical issue interpretation → confidence adjusts",
  "Pattern of enforcement failures emerges → confidence gradually decreases"
]
```

**Common mistakes:**
❌ Skipping prior justification
❌ Evidence that doesn't change confidence
❌ Posterior doesn't match final confidence
❌ No falsification criteria

### Step 6: Submit

**Currently:** GitHub Pull Request
1. Fork repo: https://github.com/[org]/legis-ledger
2. Add your JSON to `data/submissions/`
3. Name format: `{domain}-{topic}-{institution}-{date}.json`
4. Create PR with description
5. Respond to community review

**Future:** API submission
```bash
POST /api/v1/submissions
Authorization: Bearer {your-api-key}
Content-Type: application/json

{your-submission-json}
```

---

## Review Process

### Automated Checks (Immediate)
✅ Schema validation (all required fields present?)
✅ Bayesian coherence (does math work out?)
✅ Source accessibility (URLs resolve?)
✅ Confidence bounds (0 < confidence < 1?)

### Community Review (1-2 weeks)
- Domain experts can comment on PR
- Challenge assumptions
- Verify calculations
- Suggest improvements

### Acceptance Decision
**We accept if:**
✅ Schema valid
✅ Bayesian reasoning coherent
✅ Sources accessible
✅ Institution verified

**We do NOT judge:**
❌ Whether conclusion is "correct"
❌ Whether confidence level is "right"
❌ Whether prior is "justified"

**Those are your expert judgments.** We just ensure:
- Math is internally consistent
- Reasoning is transparent
- Sources are provided

### Enhancement (Automated)
Once accepted, we add:
- Metadata (git commit, funnel position)
- Domain-specific fields (enforcement, validation)
- Disclaimers
- Related claims links

### Publication
- Committed to Git (immutable record)
- Published via API
- Indexed for search
- Available in UI

---

## Tips for Good Submissions

### Be Specific
❌ "EU law says passengers get compensation"
✅ "Under EU 261/2004 Article 7(1)(c), passengers on flights >3500km delayed 3+ hours are entitled to €600 unless airline proves extraordinary circumstances"

### Show Your Work
Don't just state conclusions. Show the Bayesian path:
- Prior → Evidence 1 → Updated → Evidence 2 → Updated → Final

### Cite Primary Sources
✅ Link to actual regulation/paper/data
❌ "Studies show..." without citation

### Be Honest About Uncertainty
✅ "We're 65% confident based on 3 pilot studies. Confidence could increase with larger samples."
❌ "Studies prove UBI works" (no confidence quantified, no caveats)

### Specify Falsification Criteria
✅ "If a large RCT shows null result, confidence drops to ~0.40"
❌ "Nothing could change our mind" (red flag!)

### Update When Wrong
If real-world outcomes diverge from your confidence:
- Submit updated version
- Explain what changed
- Adjust confidence
- This is **good** - shows intellectual honesty

---

## Examples by Domain

### Legal Example (Passenger Rights)
```json
{
  "scenario": {
    "description": "Flight CDG→JFK delayed 4hrs, mechanical",
    "domain": "legal",
    "parameters": {
      "originCountry": "FR",
      "destinationCountry": "US",
      "issueType": "delay",
      "delayHours": 4.0
    }
  },
  "conclusion": {
    "claim": "Passenger entitled to €600 compensation",
    "confidence": 0.85,
    "outcome": {
      "entitled": true,
      "remedy": {
        "amount": "€600",
        "description": "Under EU 261/2004 Article 7(1)(c)"
      }
    }
  }
}
```

### Scientific Example (Climate)
```json
{
  "scenario": {
    "description": "Does atmospheric CO₂ increase cause warming?",
    "domain": "scientific",
    "parameters": {
      "hypothesis": "CO₂ causes warming",
      "timeframe": "1850-2025",
      "geographicScope": "global"
    }
  },
  "conclusion": {
    "claim": "CO₂ increase causes global warming",
    "confidence": 0.999,
    "outcome": {
      "claimIsTrue": true,
      "effectSize": "1.1°C since pre-industrial"
    }
  }
}
```

### Policy Example (UBI)
```json
{
  "scenario": {
    "description": "Does UBI reduce poverty in urban US populations?",
    "domain": "policy",
    "parameters": {
      "intervention": "UBI $1000/month",
      "population": "Adults 18-65, urban US",
      "outcome_measured": "poverty_rate"
    }
  },
  "conclusion": {
    "claim": "UBI reduces poverty rate",
    "confidence": 0.65,
    "outcome": {
      "effectSize": "15-25% poverty reduction",
      "costPerPerson": "$12,000/year"
    }
  }
}
```

---

## Common Questions

**Q: What if another institution already submitted on this topic?**

A: That's fine! Submit your analysis anyway. Multiple perspectives are valuable. System will show both opinions with their confidence levels.

**Q: Can I update my submission later?**

A: Yes. Submit a new version with updated confidence based on new evidence. Git tracks the history.

**Q: What if I disagree with your funnel position calculation?**

A: Open an issue explaining why. Funnel position is somewhat subjective, we're open to discussion.

**Q: Can I submit anonymously?**

A: No. Institutional attribution is required for accountability and reputation tracking.

**Q: What if my institution has internal disagreement?**

A: Submit multiple opinions from different departments/authors. Show the range of views within your institution.

**Q: How long does review take?**

A: Automated checks: instant. Community review: 1-2 weeks typically. We aim for fast turnaround.

**Q: Do you charge for submissions?**

A: No. This is an open infrastructure project. Submissions are free.

---

## Contact

**Questions:** submissions@legis-ledger.org  
**Technical issues:** GitHub issues  
**Schema improvements:** GitHub discussions  
**Partnership inquiries:** partnerships@legis-ledger.org

---

**Ready to submit? Start here:** [Submission Template](../data/submissions/template.json)
````