# File Management Guide: Claude Project vs Git Repository

**Version:** 1.0  
**Date:** 2025-01-26  
**Purpose:** Ensure continuity across context windows and proper version control

---

## Overview

This project exists in TWO places:
1. **Claude Project Folder** (this conversation space) - For AI continuity
2. **Git Repository** (legisledger.com) - For version control and public transparency

Each serves different purposes. This guide explains what goes where and why.

---

## Core Principle

**Claude Project = Current working context**  
**Git Repository = Authoritative source of truth**

The relationship:
```
Claude Project (working space)
    ↓ (copy essential docs)
Work Here (create, iterate, refine)
    ↓ (when ready)
Git Repository (commit, publish, version control)
```

---

## Essential Files for Claude Project Folder

**These files MUST be in Claude Project for continuity across conversations:**

### Tier 1: Critical (Always Keep Updated)

**1. CREATION_WORKFLOW.md**
- Why: Step-by-step process for creating abstracts
- When to update: After each methodology refinement
- Copy to Claude Project: YES, always latest version
- Size: ~5-10 KB (manageable)

**2. BAYESIAN_CALCULATION_METHOD.md**
- Why: Core methodology for probability sourcing
- When to update: When adding new probability sources or methods
- Copy to Claude Project: YES, always latest version
- Size: ~8-12 KB (manageable)

**3. DECISIONS.md**
- Why: Track strategic choices (prevents re-litigating decisions)
- When to update: Every significant decision
- Copy to Claude Project: YES, always latest version
- Size: ~5-10 KB, grows over time

**4. Core Schema (core-knowledge-schema.json)**
- Why: Validates all abstracts, defines structure
- When to update: Schema version changes
- Copy to Claude Project: YES, current version only
- Size: ~15-20 KB (manageable)

**5. Domain Extensions (legal-extension.json, scientific-extension.json)**
- Why: Domain-specific fields and requirements
- When to update: When adding new domain-specific features
- Copy to Claude Project: YES for active domains
- Size: ~5-10 KB each

### Tier 2: Reference Examples (Keep 2-3 Best)

**6. Example Abstracts**
- **Keep in Claude Project:** 2-3 exemplars per domain
  - Scientific: `creatine-lbm-resistance-training-2025.json` (Grade A example)
  - Legal: `eu-delay-mechanical-3hrs.json`
  - Policy: (TBD, when first policy abstract complete)

- Why: Templates for new abstracts
- When to update: When creating better examples
- **Do NOT keep all abstracts in Claude Project** (too large)
- Size: ~10-20 KB each

### Tier 3: Project Context (Foundational)

**7. README.md**
- Why: Project overview, mission, current status
- When to update: Major milestones, pivots
- Copy to Claude Project: YES
- Size: ~20-30 KB (large but essential)

**8. FAQ.md**
- Why: Common questions answered
- When to update: When new questions arise
- Copy to Claude Project: OPTIONAL (can reference Git)
- Size: ~15-20 KB

**9. CONSTITUTION.md / GOVERNANCE_NEXT_STEPS.md**
- Why: Long-term vision, governance architecture
- When to update: Strategic pivots
- Copy to Claude Project: OPTIONAL (reference, not daily use)
- Size: ~25-30 KB (large, only needed occasionally)

---

## What Should ONLY Live in Git Repository

**Do NOT clutter Claude Project with these:**

### Completed Work (Archive in Git)

**1. All Completed Abstracts**
- Location: `examples/[domain]/[identifier].json`
- Why Git only: Version history matters, too large for Project folder
- Reference: Keep 2-3 best examples in Claude Project
- Git handles: All historical versions, full corpus

**2. Historical Decisions**
- Location: `docs/DECISIONS.md` in Git
- Why Git only: Version history shows evolution
- Claude Project: Keep only current DECISIONS.md
- Git tracks: All past decisions, superseded choices

**3. Governance Documentation**
- Location: `docs/governance/`
- Why Git only: Not needed for daily abstract creation
- Reference when: Major strategic questions arise
- Files: CONSTITUTION.md, GOVERNANCE_NEXT_STEPS.md, FINANCIAL_MODEL.md

### Code & Infrastructure

**4. Rendering Code (JavaScript)**
- Location: `renderers/[domain]-renderer.js`
- Why Git only: Version control for code
- Not needed in Claude Project: Only for web interface

**5. Validation Scripts**
- Location: `scripts/validate.js`
- Why Git only: Code changes need version control
- Not needed in Claude Project: Validation done externally

**6. Web Assets**
- Location: `public/`, `assets/`
- Why Git only: Website files not relevant to abstract creation
- Not needed in Claude Project: Separate concern

### Supporting Documentation

**7. Evidence Grading Reference**
- Location: `docs/EVIDENCE_GRADING.md`
- Why Git only: Static reference, link is sufficient
- Claude Project: Can reference via URL if needed

**8. Bayesian Reasoning Tutorial**
- Location: `docs/BAYESIAN_REASONING.md`
- Why Git only: Tutorial content, not daily workflow
- Claude Project: BAYESIAN_CALCULATION_METHOD.md covers essentials

---

## Recommended Claude Project Structure

**Keep this minimal but sufficient:**

```
/mnt/project/
├── CREATION_WORKFLOW.md              [Tier 1: Critical]
├── BAYESIAN_CALCULATION_METHOD.md    [Tier 1: Critical]
├── DECISIONS.md                      [Tier 1: Critical]
├── core-knowledge-schema.json        [Tier 1: Critical]
├── scientific-extension.json         [Tier 1: Critical]
├── legal-extension.json              [Tier 1: Critical]
├── README.md                         [Tier 3: Context]
├── FAQ.md                            [Tier 3: Optional]
└── examples/
    ├── creatine-lbm-resistance-training-2025.json  [Tier 2: Best scientific example]
    ├── eu-delay-mechanical-3hrs.json               [Tier 2: Best legal example]
    └── vitamin-d-supplementation-2025.json         [Tier 2: In progress]
```

**Total size: ~100-150 KB (well within limits)**

---

## Git Repository Structure (Full Archive)

**The complete source of truth:**

```
legisledger.com/
├── README.md
├── FAQ.md
├── docs/
│   ├── CREATION_WORKFLOW.md
│   ├── BAYESIAN_CALCULATION_METHOD.md
│   ├── DECISIONS.md
│   ├── BAYESIAN_REASONING.md
│   ├── EVIDENCE_GRADING.md
│   ├── PROVENANCE_UPDATE_SUMMARY.md
│   ├── governance/
│   │   ├── CONSTITUTION.md
│   │   ├── GOVERNANCE_NEXT_STEPS.md
│   │   ├── FINANCIAL_MODEL.md
│   │   └── LEGAL_STRUCTURE.md
│   └── tutorials/
│       └── BAYESIAN_TUTORIAL.md
├── schemas/
│   ├── core-knowledge-schema.json
│   └── domain-extensions/
│       ├── legal-extension.json
│       ├── scientific-extension.json
│       └── policy-extension.json
├── examples/
│   ├── scientific/
│   │   ├── creatine-lbm-resistance-training-2025.json
│   │   ├── vitamin-d-supplementation-2025.json
│   │   ├── omega-3-heart-health-2025.json
│   │   └── ...
│   ├── legal/
│   │   ├── eu-delay-mechanical-3hrs.json
│   │   ├── eu-delay-weather-2hrs.json
│   │   └── ...
│   └── policy/
│       ├── minimum-wage-employment-2025.json
│       └── ...
├── renderers/
│   ├── scientific-renderer.js
│   └── legal-renderer.js
└── scripts/
    └── validate.js
```

---

## Workflow: Create → Validate → Commit

### Step 1: Work in Claude Project

**Create new abstract:**
1. Follow CREATION_WORKFLOW.md
2. Use BAYESIAN_CALCULATION_METHOD.md
3. Reference example abstracts in Claude Project
4. Save work in progress in Claude Project

**Benefits:**
- All necessary context available
- Can continue across context windows
- Methodology always accessible

### Step 2: Validate Before Committing

**Validation checklist:**
- [ ] JSON validates against schema
- [ ] All probabilities sourced (BAYESIAN_CALCULATION_METHOD.md)
- [ ] Provenance transparency complete
- [ ] Peer reviewed
- [ ] No broken links or DOIs

**Use Git for validation:**
```bash
cd legisledger.com
node scripts/validate.js examples/scientific/new-abstract.json
```

### Step 3: Commit to Git

**When abstract is complete and reviewed:**

```bash
# Copy from Claude Project outputs to Git repo
cp /path/to/new-abstract.json examples/scientific/

# Commit with descriptive message
git add examples/scientific/new-abstract.json
git commit -m "Add [Topic] knowledge abstract (v1.0, reviewed by [reviewer])"
git push origin main
```

**Commit message template:**
```
Add [Topic] knowledge abstract (v[version], reviewed by [reviewer])

- Domain: [scientific/legal/policy]
- Confidence: [0.XX]
- Evidence: [X meta-analyses, Y RCTs]
- Funnel position: [narrow-end-canonical/confirmed/etc]
```

### Step 4: Update Indices

**After committing:**
- Update `examples/README.md` with new entry
- Update domain-specific index
- Update website (if exists)

---

## File Update Frequency

### Update in Claude Project Immediately When:

**CREATION_WORKFLOW.md:**
- Discover better process step
- Find common pitfall
- Refine time estimates
- After every 5 abstracts (lessons learned)

**BAYESIAN_CALCULATION_METHOD.md:**
- Find new probability source
- Discover better empirical base rate
- Refine conservative defaults
- After peer review finds issue

**DECISIONS.md:**
- Make any significant strategic choice
- Change methodology
- Adopt new tool
- Pivot approach

**Schemas:**
- Add new required field
- Change validation rules
- Extend domain-specific fields
- Fix errors

### Sync to Git Weekly

**Commit documentation updates:**
```bash
git add docs/CREATION_WORKFLOW.md docs/BAYESIAN_CALCULATION_METHOD.md docs/DECISIONS.md
git commit -m "Update methodology documentation - [brief description of changes]"
git push origin main
```

**Why weekly:** Balance between version control and not cluttering git history

---

## Starting Fresh in New Context Window

**When starting new Claude conversation:**

### Option 1: Claude Remembers (Ideal)

If Claude Project properly configured:
- All Tier 1 files should be accessible
- Can reference: "See BAYESIAN_CALCULATION_METHOD.md for probability sourcing"
- Continue seamlessly

### Option 2: Quick Re-Orientation (If Files Not Visible)

**Copy-paste these 3 essentials:**
1. Current task from DECISIONS.md (what are we working on?)
2. Relevant section from CREATION_WORKFLOW.md (what phase?)
3. Key probability sources from BAYESIAN_CALCULATION_METHOD.md (if doing calculations)

**Then:** Pull latest from Git if needed

### Option 3: Full Reset (If Major Gap)

**Clone from Git:**
```bash
git clone https://github.com/[username]/legisledger.com
cd legisledger.com
git pull origin main
```

**Copy essentials back to Claude Project:**
- CREATION_WORKFLOW.md
- BAYESIAN_CALCULATION_METHOD.md
- DECISIONS.md
- Core schemas
- Best example abstracts

---

## Version Control Best Practices

### For Documentation Files

**Commit message format:**
```
Update [filename] - [specific change]

- Change 1
- Change 2
- Rationale: [why this change]
```

**Example:**
```
Update BAYESIAN_CALCULATION_METHOD.md - Add observational study base rates

- Add P(E|H) = 0.60-0.75 for observational studies
- Add P(E|~H) = 0.30-0.50 for confounding risk
- Source: Hill's criteria + Ioannidis research
- Rationale: Needed clearer guidance for policy abstracts
```

### For Abstracts

**Semantic versioning:** v[major].[minor].[patch]

- **Major (1.0 → 2.0):** Conclusion changes significantly (confidence ±0.15)
- **Minor (1.0 → 1.1):** Evidence added, confidence adjusts slightly
- **Patch (1.0.0 → 1.0.1):** Typo fixes, formatting, broken links

**Git tags for milestones:**
```bash
git tag -a v1.0-vitamin-d -m "First complete Vitamin D abstract"
git push origin v1.0-vitamin-d
```

---

## Backup Strategy

### Primary: Git Repository (Always Push)

**After each work session:**
```bash
git add .
git commit -m "Work in progress: [description]"
git push origin main
```

**Even incomplete work:** Commit to WIP branch
```bash
git checkout -b wip-vitamin-d
git add examples/scientific/vitamin-d-supplementation-2025.json
git commit -m "WIP: Vitamin D abstract - evidence gathering complete"
git push origin wip-vitamin-d
```

### Secondary: Claude Project (Persistent Context)

**Claude Project serves as backup:**
- Files persist across conversations
- Can recover if Git unavailable
- Enables continuation without Git access

### Tertiary: Local Copies

**Download critical files locally:**
- CREATION_WORKFLOW.md
- BAYESIAN_CALCULATION_METHOD.md
- DECISIONS.md
- Best example abstracts

**Frequency:** After major updates

---

## File Size Management

### Keep Claude Project Lean

**Current file sizes (approximate):**
- CREATION_WORKFLOW.md: ~10 KB ✅
- BAYESIAN_CALCULATION_METHOD.md: ~12 KB ✅
- DECISIONS.md: ~8 KB (will grow) ⚠️
- Schemas: ~20 KB each ✅
- Example abstracts: ~15 KB each ✅
- README.md: ~25 KB ⚠️

**Total for essential files: ~100-150 KB**

**Claude Project limits:** Several MB (we're well within)

**If DECISIONS.md grows too large:**
- Keep "Active Decisions" (last 6 months) in Claude Project
- Archive older decisions to Git only
- Reference: "See Git history for pre-2025 decisions"

---

## Troubleshooting

### "I can't see files in Claude Project"

**Solution 1:** Use `view` tool
```
view /mnt/project/CREATION_WORKFLOW.md
```

**Solution 2:** Copy from Git
```bash
cat docs/CREATION_WORKFLOW.md
# Copy output to Claude conversation
```

### "Files in Claude Project are outdated"

**Solution:** Manual sync
1. Pull latest from Git
2. Copy updated files to Claude Project
3. Note version/date in filename if needed

### "Git and Claude Project diverged"

**Solution:** Git is source of truth
1. Identify which is correct
2. Overwrite incorrect version
3. Document decision in DECISIONS.md

---

## Summary: What Goes Where

| File Type | Claude Project | Git Repo | Why |
|-----------|---------------|----------|-----|
| **Workflow docs** | ✅ Always latest | ✅ Version history | Daily use + history |
| **Methodology** | ✅ Always latest | ✅ Version history | Daily use + history |
| **Decisions log** | ✅ Recent decisions | ✅ Full history | Active reference |
| **Schemas** | ✅ Current version | ✅ All versions | Validation |
| **Example abstracts** | ✅ 2-3 best | ✅ All abstracts | Templates vs archive |
| **README/FAQ** | ✅ Current | ✅ Version history | Context |
| **Governance docs** | ❌ Reference only | ✅ Full docs | Not daily use |
| **Code/renderers** | ❌ Not needed | ✅ All code | Separate concern |
| **Completed abstracts** | ❌ Too many | ✅ Full corpus | Archive |

---

## Quick Reference Commands

**Update Claude Project from Git:**
```bash
# In Git repo
cp docs/CREATION_WORKFLOW.md /path/to/claude/project/
cp docs/BAYESIAN_CALCULATION_METHOD.md /path/to/claude/project/
cp docs/DECISIONS.md /path/to/claude/project/
```

**Commit completed abstract:**
```bash
git add examples/[domain]/[identifier].json
git commit -m "Add [topic] abstract (v1.0, reviewed by [reviewer])"
git push origin main
```

**Create new work branch:**
```bash
git checkout -b wip-[topic]
# Work, commit frequently
git push origin wip-[topic]
# When done:
git checkout main
git merge wip-[topic]
git push origin main
```

---

**Key Takeaway:**

> **Claude Project = Working context (lean, current, essential)**  
> **Git Repository = Archive + version control (complete, historical)**

Use both effectively:
- Create in Claude (workflow accessible)
- Validate externally (Git tools)
- Commit to Git (source of truth)
- Sync essentials back to Claude Project (continuity)

---

**Version:** 1.0 (2025-01-26)  
**Next Review:** After 10 abstracts (refine based on what actually works)
