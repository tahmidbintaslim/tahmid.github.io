# Accessibility Testing Checklist

## Automated Testing

### 1. Lighthouse Audit
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --url=http://localhost:3000

# Or use Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Accessibility" category
# 4. Click "Generate report"
```

**Target Scores:**
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
- Performance: 90+

### 2. axe DevTools
```bash
# Install axe CLI
npm install -g @axe-core/cli

# Run audit
axe http://localhost:3000

# Or use browser extension
# Chrome: https://chrome.google.com/webstore/detail/axe-devtools
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/
```

### 3. WAVE (Web Accessibility Evaluation Tool)
Visit: https://wave.webaim.org/
Enter your URL and review results

## Manual Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Shift+Tab to navigate backwards
- [ ] Enter/Space to activate buttons and links
- [ ] Escape to close modals/widgets
- [ ] Arrow keys for sliders/carousels
- [ ] All focus indicators visible
- [ ] No keyboard traps

### Screen Reader Testing

#### NVDA (Windows - Free)
```bash
# Download from: https://www.nvaccess.org/
# Test with:
- Navigate by headings (H key)
- Navigate by landmarks (D key)
- Navigate by links (K key)
- Navigate by forms (F key)
- Read all content (Insert+Down)
```

#### JAWS (Windows - Commercial)
```bash
# Similar to NVDA
# Focus on form labels and error messages
```

#### VoiceOver (macOS - Built-in)
```bash
# Enable: System Preferences > Accessibility > VoiceOver
# Shortcuts:
- Cmd+F5: Toggle VoiceOver
- VO+Right Arrow: Next item
- VO+Left Arrow: Previous item
- VO+Space: Activate item
```

#### TalkBack (Android - Built-in)
```bash
# Enable: Settings > Accessibility > TalkBack
# Test mobile experience
```

### Color Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text 18pt+)
- [ ] UI component contrast ≥ 3:1
- [ ] Test with color blindness simulators

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Inspect > Accessibility > Contrast

### Forms
- [ ] All inputs have associated labels
- [ ] Error messages are clear and helpful
- [ ] Required fields are indicated
- [ ] Autocomplete attributes present
- [ ] Form validation is accessible
- [ ] Success/error states announced

### Images
- [ ] All images have alt text
- [ ] Decorative images have empty alt=""
- [ ] Complex images have detailed descriptions
- [ ] Icons have aria-labels

### Headings
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] No skipped heading levels
- [ ] Headings describe content accurately
- [ ] Only one h1 per page

### Links
- [ ] Link text is descriptive
- [ ] No "click here" or "read more" without context
- [ ] External links indicated
- [ ] Links have :focus and :hover states

### ARIA
- [ ] ARIA labels present where needed
- [ ] ARIA roles used correctly
- [ ] Live regions for dynamic content
- [ ] Hidden content properly marked

## Mobile Accessibility

### Touch Targets
- [ ] Minimum 48x48px touch targets
- [ ] Adequate spacing between targets
- [ ] No overlapping interactive elements

### Zoom & Reflow
- [ ] Content reflows at 200% zoom
- [ ] No horizontal scrolling at 320px width
- [ ] Text remains readable when zoomed

### Orientation
- [ ] Works in portrait and landscape
- [ ] No orientation lock (unless necessary)

## Testing Checklist by Component

### Navigation
- [ ] Skip to main content link works
- [ ] Keyboard accessible
- [ ] Screen reader announces current page
- [ ] Mobile menu accessible

### Hero Section
- [ ] Video has proper labels
- [ ] CTA buttons keyboard accessible
- [ ] Widgets can be opened with keyboard

### Contact Form
- [ ] All fields labeled
- [ ] Error messages clear
- [ ] Success message announced
- [ ] Autocomplete works

### Projects Section
- [ ] Cards keyboard accessible
- [ ] Images have alt text
- [ ] Links descriptive

### Footer
- [ ] Links keyboard accessible
- [ ] Social icons have labels
- [ ] Proper heading structure

## Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Assistive Technology Testing

- [ ] Screen readers (NVDA, JAWS, VoiceOver)
- [ ] Screen magnifiers (ZoomText, Windows Magnifier)
- [ ] Voice control (Dragon NaturallySpeaking, Voice Control)
- [ ] Switch control devices

## Common Issues to Check

### Critical
- [ ] Missing alt text on images
- [ ] Form inputs without labels
- [ ] Insufficient color contrast
- [ ] Keyboard traps
- [ ] Missing skip links

### Important
- [ ] Improper heading hierarchy
- [ ] Missing ARIA labels
- [ ] Non-descriptive link text
- [ ] Missing focus indicators
- [ ] Inaccessible modals/dialogs

### Nice to Have
- [ ] Reduced motion support
- [ ] High contrast mode support
- [ ] Dark mode support
- [ ] Print styles

## Compliance Standards

### WCAG 2.1 Level AA (Target)
- Perceivable: Content is available to senses
- Operable: Interface is usable
- Understandable: Content is clear
- Robust: Works with assistive tech

### Section 508 (US)
- Federal accessibility standard
- Similar to WCAG 2.0 Level AA

### ADA (Americans with Disabilities Act)
- Legal requirement in US
- Based on WCAG 2.0/2.1

## Reporting Issues

When you find an issue, document:
1. **What**: Description of the issue
2. **Where**: Component/page location
3. **How**: Steps to reproduce
4. **Impact**: Severity (Critical/High/Medium/Low)
5. **WCAG**: Which criterion it violates
6. **Fix**: Suggested solution

## Continuous Monitoring

### Automated CI/CD
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests
on: [push, pull_request]
jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm start &
      - run: npx @axe-core/cli http://localhost:3000
```

### Regular Audits
- Run Lighthouse monthly
- Test with screen readers quarterly
- Review new features for accessibility
- Update documentation as needed

## Resources

### Tools
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Color Contrast Analyzer: https://www.tpgi.com/color-contrast-checker/

### Guidelines
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM: https://webaim.org/
- A11y Project: https://www.a11yproject.com/

### Screen Readers
- NVDA: https://www.nvaccess.org/
- JAWS: https://www.freedomscientific.com/products/software/jaws/
- VoiceOver: Built into macOS/iOS

### Learning
- Web Accessibility by Google: https://web.dev/accessibility/
- Deque University: https://dequeuniversity.com/
- WebAIM Training: https://webaim.org/training/
