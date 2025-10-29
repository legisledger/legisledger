# Contributing to Legis Ledger

**Version:** 1.0  
**Date:** 2025-01-25

---

## Welcome!

Legis Ledger is **open-source knowledge infrastructure** for democracy. We're building federated systems where institutions share expertise with transparent confidence and provenance.

**Core Values:**
- 🎯 **Working code trumps theory** - Ship MVPs, iterate with real users
- 📚 **Learning over perfection** - Mistakes are data
- 🏛️ **Governance by design** - Structural solutions, not cultural norms
- 🔬 **Epistemic humility** - Confidence <1.0 always, "could be wrong" explicit

---

## Ways to Contribute

### 1. Code Contributions

**Areas needing help:**

**Frontend (React/TypeScript):**
- Bayesian confidence visualization
- Evidence grading displays
- Institutional disagreement UI
- Real-world outcome dashboards

**Backend (Node.js/Python):**
- Federation protocol implementation
- Bayesian update automation
- Real-world outcome tracking
- API rate limiting and security

**Smart Contracts (Solidity):**
- Vocabulary governance voting
- Institutional identity management
- Transparent funding allocation

**DevOps:**
- Multi-cloud deployment
- Cryptographic key management
- Certificate Transparency logs
- Backup and disaster recovery

### 2. Schema & Vocabulary

**Propose new domain extensions:**
- Medical domain (clinical trials, treatments)
- Economic domain (market forecasts, policy effects)
- Educational domain (pedagogy, curriculum effectiveness)

**Improve existing schemas:**
- Add fields for edge cases
- Clarify documentation
- Provide validation examples

**Process:**
1. Open GitHub issue: "Proposal: [Domain] Extension"
2. Draft schema using JSON Schema format
3. Provide 3 example knowledge abstracts
4. Community discussion (2 weeks)
5. Vote (institutions in that domain, simple majority)

### 3. Knowledge Abstracts

**Contribute validated knowledge claims:**
- Scientific (replicated studies, meta-analyses)
- Legal (regulations, case law, enforcement data)
- Policy (pilot results, outcome evaluations)

**Requirements:**
- Schema compliant (validated via JSON Schema)
- Full provenance transparency (biases disclosed)
- Bayesian reasoning shown (prior → posterior)
- Evidence graded (A+ → D)
- Falsifiability criteria ("how to change my mind")

**Process:**
1. Fork repository
2. Add abstract to `/examples/[domain]/`
3. Run validation: `npm run validate`
4. Open pull request with rationale
5. Review by domain maintainers
6. Merge if technically valid (we don't judge content)

### 4. Documentation

**Always needed:**
- Tutorials ("How to publish your first claim")
- API documentation improvements
- Schema explanations with examples
- Case studies (institutional success stories)
- Translations (internationalization)

### 5. Governance Participation

**Vocabulary voting:**
- Institutions get one vote each
- Proposals require 2/3 majority for core vocabulary
- Simple majority for domain extensions
- Voting via GitHub or smart contracts (future)

**Protocol improvements:**
- Federation protocol enhancements
- Quality tier criteria refinements
- Consensus algorithm additions

**Process:**
1. RFC (Request for Comments) on GitHub Discussions
2. Community feedback (4 weeks)
3. Vote (if needed)
4. Implementation

---

## Getting Started

### Prerequisites

**Required:**
- Node.js 18+ or Python 3.10+
- Git
- Basic understanding of JSON and JSON Schema

**Helpful:**
- TypeScript (frontend)
- Bayesian reasoning (for validation logic)
- Cryptography (for signing features)
- Smart contracts (for governance features)

### Local Setup

```bash
# Clone repository
git clone https://github.com/legis-ledger/legis-ledger.git
cd legis-ledger

# Install dependencies
npm install  # or: pip install -r requirements.txt

# Run tests
npm test

# Validate schemas
npm run validate

# Start local dev server
npm run dev
```

### Project Structure

```
legis-ledger/
├── schemas/
│   ├── core-knowledge-schema.json       # Base schema
│   └── domain-extensions/
│       ├── legal-extension.json
│       ├── scientific-extension.json
│       └── policy-extension.json
├── examples/
│   ├── legal/                          # Legal knowledge abstracts
│   ├── scientific/                     # Scientific knowledge abstracts
│   └── policy/                         # Policy knowledge abstracts
├── src/
│   ├── frontend/                       # React UI
│   ├── backend/                        # API and validation
│   ├── federation/                     # Federation protocol
│   └── contracts/                      # Smart contracts (Solidity)
├── docs/
│   ├── governance/                     # Governance documentation
│   ├── BAYESIAN_REASONING.md
│   ├── EVIDENCE_GRADING.md
│   └── JOIN.md, FUNDING.md, etc.
└── tests/
    ├── schema-validation/
    ├── bayesian-updates/
    └── governance-simulation/
```

---

## Contribution Guidelines

### Code Style

**JavaScript/TypeScript:**
- ESLint + Prettier (config in repo)
- Functional programming preferred
- TypeScript strict mode required
- Tests required for new features

**Python:**
- Black formatter
- Type hints required (mypy strict)
- Pytest for tests
- Docstrings in NumPy format

**Solidity:**
- Solidity 0.8+
- NatSpec comments required
- Gas optimization considered
- Audited by external firm before mainnet

### Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(schema): Add medical domain extension

Adds schema for clinical trial knowledge claims including:
- Study design fields (RCT, observational, etc.)
- Adverse event tracking
- FDA approval status

Closes #123

---

docs(governance): Clarify vocabulary voting process

Updates VOCABULARY_GOVERNANCE.md with step-by-step voting 
instructions and examples from recent proposals.
```

### Pull Request Process

1. **Fork and branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make changes:**
   - Write code
   - Add tests
   - Update documentation
   - Run linter and tests locally

3. **Commit:**
   ```bash
   git commit -m "feat(scope): description"
   ```

4. **Push and PR:**
   ```bash
   git push origin feat/your-feature-name
   ```
   Open PR on GitHub

5. **PR template:**
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Screenshots (if UI changes)
   - Checklist: Tests pass, docs updated, schema validated

6. **Review:**
   - Automated checks must pass (CI/CD)
   - 1 maintainer approval required for merge
   - Large changes require 2 approvals

### Testing Requirements

**All code contributions must include tests:**

**Unit tests:**
```typescript
// Example: Testing Bayesian update function
describe('bayesianUpdate', () => {
  it('should increase confidence with supporting evidence', () => {
    const prior = 0.70;
    const evidence = { bayesFactor: 3.0 };
    const posterior = bayesianUpdate(prior, evidence);
    expect(posterior).toBeGreaterThan(prior);
    expect(posterior).toBeLessThan(1.0); // Epistemic humility
  });
});
```

**Integration tests:**
- Schema validation
- API endpoints
- Smart contract interactions

**Governance simulation tests:**
- Vocabulary voting logic
- Quality tier calculations
- Consensus algorithms

### Documentation Standards

**Every new feature needs:**

1. **Code documentation:**
   ```typescript
   /**
    * Calculates Bayesian posterior given prior and evidence.
    * 
    * @param prior - Prior confidence [0, 1)
    * @param evidence - Evidence with Bayes factor
    * @returns Posterior confidence, guaranteed <1.0
    * 
    * @example
    * const posterior = bayesianUpdate(0.70, { bayesFactor: 2.0 });
    * // posterior ≈ 0.82
    */
   ```

2. **User documentation:**
   - Add to `/docs` if user-facing
   - Update README if major feature
   - Provide examples

3. **Schema documentation:**
   - JSON Schema `description` fields required
   - Example instances in `/examples`

---

## Governance Contributions

### Proposing Vocabulary Changes

**Core vocabulary** (requires 80%+ consensus):

1. **Open RFC:**
   ```markdown
   # RFC: Add "adverseEffect" to core schema
   
   ## Motivation
   Medical and supplement domains need standardized way to report 
   adverse effects across knowledge abstracts.
   
   ## Proposed Change
   Add optional `adverseEffect` array to conclusion object:
   
   {
     "conclusion": {
       "adverseEffects": [
         {
           "effect": "Mild gastrointestinal distress",
           "frequency": "5-10% of users",
           "severity": "low"
         }
       ]
     }
   }
   
   ## Impact
   - Breaking: No (optional field)
   - Adoption cost: Low (institutions can ignore if not applicable)
   - Value: High (standardizes safety reporting)
   ```

2. **Discussion period:** 4 weeks minimum

3. **Vote:** Open GitHub issue for vote, institutions comment "Approve" or "Reject" with rationale

4. **Implementation:** If passed, PR to core schema

**Domain extensions** (simple majority):
- Faster process (2 weeks discussion)
- Only institutions in that domain vote
- Lower bar for experimentation

### Proposing Consensus Algorithms

**Want to add a new way to aggregate institutional estimates?**

1. **Implement the algorithm:**
   ```typescript
   export function myConsensusMethod(
     estimates: InstitutionalEstimate[]
   ): ConsensusResult {
     // Your algorithm here
     return { 
       confidence: calculated,
       uncertainty: interval,
       method: "my-method-name"
     };
   }
   ```

2. **Add tests:** Show it works on historical data

3. **Document:** Math explanation + when to use

4. **PR:** Will be added if technically sound (users choose which to use)

**Example:** Track-record weighted averaging, Bayesian model averaging, precision weighting all available. Users pick preferred method.

---

## Contributor License Agreement

By contributing, you agree:

1. **License:** Your contributions are licensed under **Apache 2.0** (code) or **CC-BY** (documentation)

2. **Originality:** You own or have rights to contribute this code/content

3. **Patent grant:** You grant patent license for any patents in your contribution

4. **No warranty:** Contributions are "as is"

*Standard Apache 2.0 CLA - no special requirements.*

---

## Code of Conduct

### Our Principles

**Epistemic humility:**
- Acknowledge uncertainty
- Welcome correction
- "Could be wrong" is strength, not weakness

**Collaborative:**
- Assume good faith
- Critique ideas, not people
- Seek understanding before disagreeing

**Inclusive:**
- Welcome newcomers
- Value diverse perspectives
- No gatekeeping

**Focus on impact:**
- Users and institutions come first
- Working code over perfect code
- Iterate based on feedback

### Unacceptable Behavior

- Harassment, discrimination, or hostility
- Bad-faith argumentation
- Sockpuppeting or astroturfing
- Spam or promotional content
- Violating contributor agreement

### Enforcement

1. **Warning:** First violation, private message
2. **Temporary ban:** Repeated violations, 30 days
3. **Permanent ban:** Severe or persistent violations

Reports: conduct@legis-ledger.org (private, handled by maintainers)

---

## Recognition

**Contributors get:**

✅ Listed in CONTRIBUTORS.md  
✅ GitHub commit history (forever)  
✅ Participation in vocabulary governance (if desired)  
✅ Co-authorship on academic papers (if significant contribution)  
✅ Invitation to annual contributor summit (when funded)  

**No hierarchy:** All contributors equal. Maintainers coordinate, don't control.

---

## Getting Help

**Stuck?**

1. **Check docs:** `/docs` has extensive guides
2. **GitHub Discussions:** Q&A forum for general questions
3. **GitHub Issues:** Bug reports and feature requests
4. **Office hours:** Tuesdays 2-4pm ET (Zoom link on website)
5. **Discord:** (link on website) - real-time chat with community

**New contributor?** Look for issues labeled `good-first-issue` or `help-wanted`

---

## Roadmap

**Current focus (Q1 2025):**
- [ ] Climate change knowledge abstract (canonical scientific)
- [ ] Smart contract governance prototype (vocabulary voting)
- [ ] Institution submission API
- [ ] Multi-institution disagreement examples
- [ ] Complete governance documentation

**Next priorities (Q2-Q4 2025):**
- [ ] UBI knowledge abstract (contested policy)
- [ ] 20 institutional partnerships
- [ ] Federation protocol v1.0
- [ ] Real-world outcome automation
- [ ] 500 knowledge abstracts

**See:** [Project board](https://github.com/legis-ledger/legis-ledger/projects) for current priorities

---

## Philosophy

**Why we build this way:**

- **No gatekeeping:** Anyone can contribute, quality emerges through usage
- **No central authority:** Fork rights prevent capture
- **No hidden algorithms:** All calculations transparent and user-choosable
- **No absolutism:** Confidence <1.0 always, epistemic humility structurally enforced

**Inspired by:**
- Git (distributed, fork-friendly)
- Email (federated, no central control)
- Wikipedia (anyone can edit, reputation matters)
- Linux (benevolent dictatorship + fork rights)
- Bayesian epistemology (quantified uncertainty, updating with evidence)

**This is infrastructure for democracy.**

No single institution controls truth. Evidence and outcomes arbitrate. Users see provenance, biases, and verification paths.

**Join us.**

---

## Contact

**Questions about contributing?**
- GitHub Discussions: General questions
- Email: dev@legis-ledger.org
- Office hours: Tuesdays 2-4pm ET

**Found a security vulnerability?**
- Email: security@legis-ledger.org (PGP key on website)
- Please don't open public issues for security problems

**Want to propose a major change?**
- Open an RFC (Request for Comments) in GitHub Discussions
- Community feedback before implementation

---

**Thank you for contributing to knowledge infrastructure for democracy! 🙏**
