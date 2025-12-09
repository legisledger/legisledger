# Legis Ledger: Frequently Asked Questions (FAQ)

**Version:** 1.0  
**Date:** 2025-01-25

---

## General Questions

### What is Legis Ledger?

Federated knowledge infrastructure where institutions publish expert opinions with quantified confidence, transparent provenance, and Bayesian updating. Think "Wikipedia for contested facts" but preserving disagreement with confidence levels.

### Who controls Legis Ledger?

**No one.** It's decentralized infrastructure:
- Institutions control their own content
- Code is open source (Apache 2.0)
- Data is open (CC-BY)
- Fork rights prevent capture
- No central authority can censor or force changes

See: [Governance Constitution](governance/CONSTITUTION.md)

### How is this different from Wikipedia?

| Wikipedia | Legis Ledger |
|-----------|--------------|
| Requires consensus | Preserves disagreement |
| Binary (fact or not) | Probabilistic (confidence 0-0.999) |
| No provenance transparency | Explicit biases and verification paths |
| Static (slow updates) | Dynamic (Bayesian updates with evidence) |
| Works for settled facts | Works for contested claims |

**Use Wikipedia for:** "What is the capital of France?"  
**Use Legis Ledger for:** "Does creatine increase muscle mass?" (multiple studies, quantified confidence)

### What kinds of knowledge does this cover?

**Current domains:**
- **Legal:** Rights, regulations, enforcement patterns (e.g., passenger compensation)
- **Scientific:** Health interventions, supplements, research findings (e.g., creatine efficacy)
- **Policy:** Program outcomes, pilot results, economic forecasts (planned: UBI)

**Future domains:**
- Medical (clinical trials, treatments)
- Economic (market predictions, policy effects)
- Environmental (climate interventions, conservation)
- Educational (pedagogy, curriculum effectiveness)

---

## For Institutions

### Why should my institution participate?

**Value depends on your type:**

**Government agencies:** Reduce support burden (1 abstract answers 10,000 queries), increase transparency/legitimacy

**Academia:** Citation tracking, funding narratives, collaboration discovery

**Industry:** Customer acquisition, market intelligence, credibility

**NGOs:** Mission amplification, data-driven advocacy

See: [JOIN.md](JOIN.md) for detailed value propositions

### What does it cost to participate?

**Free for most institutions:**
- Publish unlimited knowledge abstracts
- Basic analytics dashboard
- Community support
- Listed in directory

**Optional sponsorships** ($10k-100k/year) provide premium support but **no governance control**.

### Can you censor our content?

**No.** We provide infrastructure, not content control:
- You cryptographically sign your claims
- We display them with provenance transparency
- We can only adjust **visibility tier** based on **objective quality signals** (track record, calibration)
- You always control content

If we tried to censor, you could:
1. Fork the code (open source)
2. Host your own instance
3. Federate with others
4. Continue publishing

**Exit option prevents capture.**

### What if we publish something wrong?

Real-world outcomes will show if you're miscalibrated:
- Your confidence: 85%
- Actual outcomes: 65%
- Your calibration score: Poor → Lower visibility tier

**But:** You can update your claim anytime. Bayesian updating is encouraged.

**Transparency matters more than perfection.** Acknowledge mistakes, update estimates, show reasoning.

### Do we need developers to participate?

**No.**
- Web form available (no coding required)
- We provide templates
- Support team helps with first submission

**But:** API is available if you want to automate publishing.

---

## For Users (Citizens)

### How do I know what to trust?

**Multiple trust signals:**

1. **Provenance transparency:**
   - Who submitted this? (institution name, type)
   - What are their potential biases?
   - Are they independent or industry-funded?

2. **Track record:**
   - Calibration score (predicted vs. actual)
   - Number of outcomes tracked
   - Years active

3. **Evidence quality:**
   - Grade A+ (meta-analyses) → D (anecdotal)
   - All sources cited with DOIs
   - Bayesian reasoning transparent

4. **Multiple perspectives:**
   - See all institutional estimates
   - Compare reasoning
   - Choose your preferred consensus method

**You decide what to trust based on transparency, not authority.**

### What does "72% confidence" mean?

**72% confidence means:**
- 72% probability this claim is correct
- 28% probability it's wrong
- Epistemic humility built-in

**It does NOT mean:**
- "We're sure but lawyers make us say this"
- "72% of experts agree"
- "72% of studies show this"

**Confidence comes from Bayesian reasoning:**
- Prior (starting belief)
- Evidence (what we learned)
- Posterior (updated belief)

All steps transparent and traceable.

### Can I see the raw data?

**Yes.** Everything is transparent:
- All knowledge abstracts: JSON files on GitHub
- All Bayesian reasoning: Step-by-step in each abstract
- All evidence: Cited with links, DOIs, access dates
- All consensus algorithms: Open source code
- All governance decisions: Public git history

**No hidden algorithms. No black boxes.**

### What if institutions disagree?

**We preserve disagreement:**

Example: DGAC says 87% confidence, DOT says 82%

We show:
- Both estimates with reasoning
- Track record of each institution
- Real-world outcomes (who's been more accurate?)
- Over time, evidence causes convergence

**Evidence arbitrates, not committees.**

### How do I verify this information?

**Each knowledge abstract includes "How to Verify":**

Example (creatine):
- Search PubMed for relevant RCTs
- Check Cochrane Database systematic reviews
- Consult physician before starting supplement
- Review cited studies directly (all linked)

**We tell you how to check for yourself. Don't just trust us.**

---

## Technical Questions

### What's the data format?

**JSON-LD** (Linked Data):
- Machine-readable (APIs, AI assistants)
- Human-readable (well-formatted JSON)
- Semantic web compatible (knowledge graphs)
- Schema validated (JSON Schema)

See: [Core Schema](../schemas/core-knowledge-schema.json)

### How does federation work?

**Like email:**
- Anyone can host a Legis Ledger instance
- Instances share knowledge via federation protocol
- Users choose which instance(s) to query
- No single point of control

**Benefits:**
- Resilient (no single point of failure)
- Sovereign (institutions can self-host)
- Interoperable (common protocol)

### How are claims signed cryptographically?

**Public key cryptography:**
1. Institution generates key pair (public + private)
2. Private key signs knowledge abstract
3. Public key hosted at institution's domain
4. Anyone can verify signature

**Like HTTPS certificates** but for knowledge claims.

### What prevents fake institutional claims?

**Multiple layers:**

1. **Cryptographic signatures:** Math proves authenticity
2. **Decentralized identifiers (DIDs):** Institutions control identity
3. **Certificate Transparency logs:** All submissions public
4. **Track record:** Fake institutions exposed by poor calibration

### Can AI assistants use this?

**Yes, that's the point:**
- Structured data (JSON-LD)
- Scenario-based queries (natural language → structured)
- Confidence quantified (not binary true/false)
- Provenance transparent (citation with caveats)

**Example integration:**
```
User: "Does creatine work for building muscle?"
ChatGPT: [queries Legis Ledger API]
ChatGPT: "Very likely (90% confidence) based on 500+ studies. 
Note: Individual response varies, requires resistance training. 
Source: Independent research group (not FDA). Verify: [links]"
```

---

## Governance Questions

### Who decides what vocabulary is official?

**Three-tier system:**

1. **Core vocabulary** (80%+ institutional consensus):
   - Minimal terms everyone uses
   - Managed via GitHub with transparent voting

2. **Domain extensions** (simple majority per domain):
   - Faster to add, domain-specific terms
   - Community vote among institutions in that domain

3. **Custom terms** (no approval needed):
   - Institutions add freely
   - Adoption determines whether they become popular

**Market decides through usage, not authority.**

### How do you aggregate different institutional estimates?

**We show multiple methods transparently:**

1. Simple average
2. Precision-weighted (by confidence interval)
3. Track-record weighted (by calibration)
4. Bayesian model averaging

**Users choose preferred method.** Default = method most users choose (emergent standard).

**All code open source on GitHub.**

### What stops you from becoming corrupt?

**Structural impossibility:**

1. **Open source + fork rights:** If we're captured → fork → survive
2. **Decentralized identity:** Institutions control their content
3. **Financial diversity:** No single funder >20% (enforced by charter)
4. **Transparent finances:** All transactions >$10k public within 30 days
5. **Governance by smart contract** (future): Code enforces, not administrators

**Analogy:** Like email (can't be captured), not Facebook (proprietary, Zuckerberg controls)

### Can wealthy funders buy control?

**No.**

**Charter enforces:**
- No single funder >20% of budget
- Board seats tied to participation, not funding
- Funding disclosed transparently
- No veto rights for funders

**If we violate charter:**
- Community can fork (code is open source)
- Institutions can leave (they control their DIDs)
- Users can switch instances

**Exit option prevents capture.**

### What if the founder leaves or dies?

**System designed to survive:**
- All governance in smart contracts (future) or documented processes (now)
- No single points of failure
- Fork rights ensure continuity
- Institutions maintain sovereignty regardless

**Test:** "Does this work if founder hit by bus tomorrow?" → Yes.

---

### What if commercial revenue doesn't materialize?

**Fallback:**
- Continue as grant-funded
- Reduce feature velocity
- Community contributions (open source)
- Fork and decentralize (minimal coordination needed)

**Can't be "shut down" due to open source + federation.**

---

## Comparison Questions

### How is this different from prediction markets?

| Prediction Markets | Legis Ledger |
|-------------------|--------------|
| Financial incentives | Institutional expertise |
| Limited domains | All domains |
| Speculation-driven | Evidence-driven |
| Winner-takes-all | Reputation-based |

**Complementary:** Prediction markets for future events, Legis Ledger for knowledge claims.

### How is this different from blockchain "truth" projects?

| Blockchain Projects | Legis Ledger |
|--------------------|--------------|
| Token-based governance | Institutional governance |
| Speculation incentives | Expertise incentives |
| Often vaporware | Working MVPs |
| Requires crypto | No crypto needed (though may use smart contracts) |

**We're not blockchain-maximalist.** Use crypto where it helps (governance voting, identity), not everywhere.

### How is this different from Google Knowledge Graph?

| Google Knowledge Graph | Legis Ledger |
|------------------------|--------------|
| Proprietary | Open source |
| No uncertainty | Quantified confidence |
| No provenance | Explicit biases |
| Google controls | Federated, no single control |

**Complementary:** Google for settled facts, Legis Ledger for contested claims.

---

## Privacy & Security Questions

### What personal data do you collect?

**Minimal:**
- For users: None (API queries are stateless)
- For institutions: Contact info, public key, published abstracts

**No:**
- User tracking
- Personal identifiable information (PII)
- Usage profiles
- Ad targeting

**Data access fees** (analytics) are aggregate only, never individual-level.

### Is this secure?

**Security measures:**
- Cryptographic signatures (can't forge institutional claims)
- HTTPS everywhere (encrypted transport)
- Regular security audits (annual)
- Responsible disclosure program (security@legis-ledger.org)
- Multi-cloud redundancy (no single point of failure)

**But:** No system is perfectly secure. We practice transparency about incidents and fixes.

### What happens to my data if you shut down?

**All data portable:**
- JSON-LD format (standard)
- Federated to multiple instances
- Exportable anytime
- Open license (CC-BY or CC0)

**In event of dissolution:**
- 90 days notice
- All code and data to public domain
- Institutional data returned
- Federation protocol docs freely available

---

## Philosophical Questions

### Isn't "no absolute truth" dangerous?

**We're not claiming no objective truth exists.**

We're claiming:
1. **Epistemic humility:** Our knowledge is always uncertain
2. **Quantified uncertainty:** Better than fake confidence
3. **Updating with evidence:** Truth emerges over time
4. **Pluralism preserves stability:** Acknowledge disagreement structurally

**Analogy:** Science doesn't claim absolute certainty, yet produces reliable knowledge through error-correction.

### Won't this create "my truth vs your truth" relativism?

**No. Evidence arbitrates.**

- Institution A: 87% confidence
- Institution B: 82% confidence
- Real-world outcomes: 84%

**Evidence causes convergence over time.** But we preserve the disagreement initially because:
- Forces transparency (why do they differ?)
- Shows uncertainty honestly
- Enables learning when outcomes arrive

**This is Bayesian updating, not relativism.**

### What about misinformation?

**Tiered visibility based on track record:**
- Good institutions: High visibility
- Bad institutions: Low visibility
- New institutions: Flagged as unproven

**But:** We don't censor. Sunlight is the disinfectant.
- Show misinformation with poor calibration score
- Users see "this institution is 30% accurate" → decide for themselves

**Trust through transparency, not through gatekeeping.**

### Isn't Bayesian reasoning too complex for regular users?

**We hide complexity in UX:**
- Show confidence % (simple)
- "Could be wrong" section (concrete reasons)
- Progressive disclosure (click for details)
- Visual confidence bars, not equations

**Example:**
- Simple: "90% confidence means very likely but not certain"
- Detailed: [Show full Bayesian reasoning path for those who want it]

**Working code from creatine example shows clear explanations work.**

---

## Getting Involved

### How can I help?

**Ways to contribute:**
1. **Code:** Frontend, backend, smart contracts (see [CONTRIBUTING.md](CONTRIBUTING.md))
2. **Knowledge:** Submit validated abstracts in your domain
3. **Governance:** Participate in vocabulary voting
4. **Outreach:** Recruit institutions, spread word
5. **Funding:** Donations or sponsorships (see [FUNDING.md](FUNDING.md))

### I'm not technical. Can I still help?

**Yes!**
- Write documentation
- Create tutorials
- Recruit institutions in your network
- Provide feedback on UX
- Translate content
- Share on social media

**All contributions valued.**

### How do I stay updated?

- **GitHub:** Watch repository for updates
- **Newsletter:** Sign up on website (quarterly)
- **Twitter:** @legis_ledger (announcements)
- **Discord:** Real-time community chat
- **Office hours:** Tuesdays 2-4pm ET

---

## More Questions?

**Didn't find your answer?**

1. Check full documentation: `/docs` directory
2. GitHub Discussions: Ask the community
3. Email: hello@legis-ledger.org
4. Office hours: Tuesdays 2-4pm ET (Zoom link on website)

**Found an issue with this FAQ?** Open a PR to improve it!

---

**Last updated:** 2025-01-25  
**Version:** 1.0  
**Maintainers:** Legis Ledger core team
