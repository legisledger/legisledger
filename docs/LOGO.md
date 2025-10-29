# Legis Ledger Logo

**Version:** 1.0.0  
**Created:** 2025-01-26  
**Format:** SVG (Scalable Vector Graphics)  
**Design:** Doric Column with Knowledge Accumulation

---

## The Logo

![Legis Ledger Logo](../assets/legis-ledger-icon.svg)

**File Location:** [`/assets/legis-ledger-icon.svg`](../assets/legis-ledger-icon.svg)

---

## Design Philosophy

The Legis Ledger logo fuses classical architecture with modern data visualization to represent knowledge infrastructure built on democratic foundations.

### Visual Elements

1. **Doric Column**
   - Represents timeless knowledge, institutional strength, democratic foundations
   - Doric order chosen for structural integrity and simplicity (no decorative elements)
   - The oldest and most fundamental of classical orders - appropriate for foundational infrastructure

2. **Light Bulb at Capital**
   - Symbolizes enlightenment, insight, knowledge discovery
   - Positioned at the pinnacle (the "capital" of the column) = highest achievement in validation funnel
   - Represents the goal: bringing light to contested knowledge domains

3. **Knowledge Accumulation Bars**
   - Five green bars increasing left-to-right (shortest → tallest)
   - Represents Bayesian evidence accumulation over time
   - Visual metaphor for confidence building as evidence mounts
   - Color: Green (#7cb342 to #aed581) = growth, validation, "verified knowledge"

4. **Architectural Base**
   - Stepped base (stylobate) = stable foundation
   - Represents the infrastructure's commitment to stability and longevity

### Color Palette

| Element | Color | Hex Code | Meaning |
|---------|-------|----------|---------|
| Column Structure | Charcoal | `#2c3e50` | Stability, authority, timelessness |
| Necking Band | Dark Gray | `#34495e` | Transition, structure |
| Light Bulb | Off-White | `#f9f9f9` | Illumination, clarity |
| Data Bars (darkest) | Green | `#7cb342` | Highest confidence, validated knowledge |
| Data Bars (mid) | Light Green | `#8bc34a`, `#9ccc65` | Moderate confidence, testing phase |
| Data Bars (lightest) | Pale Green | `#aed581` | Emerging evidence, speculation |

---

## Usage Guidelines

### ✅ Approved Uses

- **Digital Applications:** Websites, web apps, documentation, GitHub repositories
- **Print Materials:** Reports, presentations, business cards, letterhead
- **Social Media:** Profile pictures, cover images, post graphics
- **Marketing:** Promotional materials, conference materials, slides
- **Academic:** Research papers, posters, educational materials

### Size Guidelines

**Minimum Size:**
- Digital: 32px × 32px (favicon)
- Print: 0.5 inches × 0.5 inches

**Recommended Sizes:**
- Small (icon): 64px × 64px
- Medium (header): 128px × 128px
- Large (hero): 256px × 256px or larger

### Clear Space

Maintain clear space around the logo equal to the height of the base element on all sides. This ensures the logo remains visually distinct and readable.

```
[--- clear space ---]
        LOGO
[--- clear space ---]
```

### Color Variations

**Primary (Full Color):**
- Use whenever possible
- Maintains all design elements and colors as specified

**Monochrome (Dark):**
- Convert all elements to single dark color (#2c3e50)
- Use on light backgrounds when color reproduction is limited

**Monochrome (Light):**
- Convert all elements to white or off-white (#f9f9f9)
- Use on dark backgrounds

**Grayscale:**
- Convert to grayscale when color is unavailable
- Maintain contrast between column and data bars

### Background Requirements

**Preferred Backgrounds:**
- White or very light backgrounds (#ffffff, #f5f5f5)
- Light gray backgrounds (#e0e0e0 or lighter)

**Acceptable Backgrounds:**
- Medium backgrounds with sufficient contrast
- Dark backgrounds (use light/white version)

**Avoid:**
- Busy patterns or textures behind logo
- Low-contrast backgrounds
- Gradients that interfere with readability

---

## Typography Pairing

The logo is designed to work independently from typography, allowing flexibility in wordmark design.

### Recommended Font Styles

**For "Legis Ledger" Wordmark:**

- Font family: Work Sans
- Weight: Light to Regular (300-400)
- Style: Clean, contemporary, accessible

### Wordmark Positioning

When pairing logo with text:

**Horizontal Layout - Stacked Wordmark (Recommended for Headers):**
```
       Legis
[LOGO] Ledger
```
- Logo on left, stacked text on right
- Text left-aligned, vertically centered with logo
- Vertical alignment: `align-items: center` (flexbox)
- Line height: 1.0 (minimal spacing between "Legis" and "Ledger")
- Spacing between logo and text: No explicit gap (natural spacing from flexbox)
- Font weight: 300 (Light)
- Font size: 2rem (32px) for headers
- Letter spacing: 0.5px
- Vertical offset between words: -1px (very tight stacking)
- Text container margin-top: 20px (slight downward adjustment for optical centering)

**Horizontal Layout - Single Line:**
```
[LOGO]  LEGIS LEDGER
```
- Logo on left, text on right (single line)
- Baseline of text aligns with bottom of logo base
- Spacing: 1.5× the width of a data bar
- Use for: Compact headers, navigation bars

**Vertical Layout:**
```
   [LOGO]
   Legis
   Ledger
```
- Logo centered above text
- Text stacked (two lines), centered below logo
- Spacing: 0.5× logo height between icon and text
- Line height: 1.1 for tight stacking
- Use for: Vertical navigation, mobile layouts

**Standalone:**
- Logo can stand alone without text for icons, favicons, small applications
- Text can stand alone for text-only contexts (headers, navigation)

---

## File Formats

### Primary Format: SVG
- **File:** `legis-ledger-icon.svg`
- **Use for:** Web, print, any scalable application
- **Advantages:** Infinite scalability, small file size, crisp at any resolution

### Export Guidelines

When exporting to other formats:

**PNG (Raster):**
- Export at 2× or 3× intended display size for retina displays
- Transparent background preferred
- Recommended sizes: 64px, 128px, 256px, 512px, 1024px

**PDF (Vector):**
- Embed fonts if including wordmark
- Convert text to outlines for maximum compatibility
- Use for print applications

**Favicon:**
- Export as PNG: 32×32px, 64×64px
- Consider simplified version for 16×16px (may need to remove light bulb details)

---

## ❌ Prohibited Uses

**Do Not:**
- ❌ Distort or stretch the logo (maintain aspect ratio)
- ❌ Rotate the logo (keep upright)
- ❌ Change colors arbitrarily (use approved variations only)
- ❌ Add drop shadows, glows, or effects
- ❌ Place logo on cluttered or low-contrast backgrounds
- ❌ Recreate or redraw the logo (use provided files)
- ❌ Separate elements (keep icon as unified whole)
- ❌ Use outdated versions
- ❌ Combine with other logos without clear separation

---

## Technical Specifications

### SVG Structure

**Canvas Size:** 200 × 230 pixels  
**Color Mode:** RGB  
**Vector Paths:** Fully scalable, no rasterization  
**File Size:** ~2KB (very lightweight)

### Accessibility

**Alt Text Recommendations:**
- Short: "Legis Ledger logo"
- Descriptive: "Legis Ledger logo: Doric column with knowledge accumulation bars"
- Full: "Legis Ledger logo showing a classical Doric column with five green data bars representing evidence accumulation and a light bulb at the capital symbolizing knowledge"

**Screen Reader Considerations:**
- Always provide appropriate alt text
- Ensure logo has sufficient contrast with background (WCAG AA minimum: 4.5:1)

---

## Version History

### Version 1.0.0 (2025-01-26)
- Initial logo design
- Doric column with knowledge accumulation bars
- Light bulb at capital
- Green color palette (#7cb342 - #aed581)
- SVG format, 200×230px canvas

---

## Design Rationale

### Why Doric?

Three classical column orders were considered:

1. **Ionic** - Features decorative spiral volutes. Too ornamental.
2. **Corinthian** - Most elaborate, with acanthus leaves. Too decorative.
3. **Doric** ✓ - Simplest, strongest, most structural. Pure geometric integrity.

**Selected Doric** because:
- Represents strength and load-bearing capacity (appropriate for infrastructure supporting knowledge claims)
- Historically associated with democracy (Parthenon, Greek democratic assemblies)
- Masculine simplicity aligns with mission: no false complexity, just honest structural work
- Most timeless: Doric columns have symbolized foundational stability for 2,500+ years

### Why Accumulation Left-to-Right?

- Matches Western reading direction (natural cognitive flow)
- Smallest → largest creates visual narrative of growth
- Represents Bayesian updating: confidence increases as evidence accumulates
- Differs from typical "funnel" top-to-bottom to show *result* rather than *process*

### Why Green?

- Universally positive association: growth, go-ahead, validation
- Distinct from typical "data blue" (overused in tech)
- Avoids political associations (not red/blue)
- Works across all domains (legal, scientific, policy)
- Accessible: distinguishable even for colorblind users (sufficient luminance contrast)

---

## Approval

**Approved by:** Chief Strategy and Marketing Officer, Carnegie Mellon University Institute  
**Date:** 2025-01-26  
**Status:** Official Legis Ledger logo (v1.0.0)

---

## Contact

For logo usage questions, requests for alternative formats, or permission inquiries:
- **Project:** Legis Ledger Knowledge Infrastructure
- **Repository:** [Your GitHub URL]
- **Documentation:** See [`README.md`](../README.md)

---

## License

The Legis Ledger logo is released under the same license as the project: **Apache 2.0**

You may use, modify, and distribute the logo in accordance with the Apache 2.0 license terms, provided you follow these usage guidelines and maintain appropriate attribution.

**Attribution Format:**
"Legis Ledger logo by Legis Ledger Project, used under Apache 2.0 license"

---

**Legis Ledger: Building knowledge infrastructure with epistemic humility.**
