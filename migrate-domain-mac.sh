#!/bin/bash
# Domain Migration Script: Update .org → .com in codebase (Mac/BSD sed compatible)
# Run this from your legisledger repository root

echo "🔄 Starting domain migration: .org → .com"
echo ""

# Create new branch
echo "📝 Creating branch: migrate-to-com-domain"
git checkout -b migrate-to-com-domain

# Count references before
echo ""
echo "📊 Current .org references:"
grep -r "legisledger\.org" . --include="*.html" --include="*.js" --include="*.md" 2>/dev/null | wc -l

echo ""
echo "🔧 Updating files..."

# Update HTML files (Mac/BSD sed syntax with -i '')
echo "  - Updating HTML files..."
find . -type f -name "*.html" -not -path "*/node_modules/*" \
  -exec sed -i '' 's/demo\.legisledger\.org/demo.legisledger.com/g' {} \;
find . -type f -name "*.html" -not -path "*/node_modules/*" \
  -exec sed -i '' 's/legisledger\.org/legisledger.com/g' {} \;

# Update JS files
echo "  - Updating JS files..."
find . -type f -name "*.js" -not -path "*/node_modules/*" \
  -exec sed -i '' 's/demo\.legisledger\.org/demo.legisledger.com/g' {} \;
find . -type f -name "*.js" -not -path "*/node_modules/*" \
  -exec sed -i '' 's/legisledger\.org/legisledger.com/g' {} \;

# Update MD files (documentation)
echo "  - Updating documentation..."
find . -type f -name "*.md" -not -path "*/node_modules/*" \
  -exec sed -i '' 's/demo\.legisledger\.org/demo.legisledger.com/g' {} \;
find . -type f -name "*.md" -not -path "*/node_modules/*" \
  -exec sed -i '' 's/legisledger\.org/legisledger.com/g' {} \;

# Count references after
echo ""
echo "📊 Remaining .org references (should be 0 or very few):"
grep -r "legisledger\.org" . --include="*.html" --include="*.js" --include="*.md" 2>/dev/null | wc -l

echo ""
echo "📋 Files changed:"
git status --short

echo ""
echo "✅ Domain migration complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test locally if possible"
echo "3. Commit: git add . && git commit -m 'Migrate to .com domain for B2B positioning'"
echo "4. Push: git push origin migrate-to-com-domain"
echo "5. Create PR on GitHub and merge to main"
echo "6. Vercel auto-deploys (2-3 minutes)"
echo "7. Test: https://demo.legisledger.com"
