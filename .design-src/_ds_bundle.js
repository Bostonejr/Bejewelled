/* @ds-bundle: {"format":4,"namespace":"BejewelledDesignSystem_900563","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Eyebrow","sourcePath":"components/editorial/Eyebrow.jsx"},{"name":"NumberedItem","sourcePath":"components/editorial/NumberedItem.jsx"},{"name":"ProjectRow","sourcePath":"components/editorial/ProjectRow.jsx"},{"name":"SectionHeading","sourcePath":"components/editorial/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/editorial/StatBlock.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"31564263c093","components/core/Button.jsx":"d6d922c1ec97","components/core/Card.jsx":"7bf905e894c8","components/core/Icon.jsx":"2b19a448017a","components/core/IconButton.jsx":"8a7a7d6714dd","components/core/Logo.jsx":"c88a32d7199e","components/core/Tag.jsx":"e2a522872596","components/editorial/Eyebrow.jsx":"ac904005cd7d","components/editorial/NumberedItem.jsx":"1e12e59a2ad3","components/editorial/ProjectRow.jsx":"888f937bfb4d","components/editorial/SectionHeading.jsx":"42d5066c222b","components/editorial/StatBlock.jsx":"4b6c24a88d8f","components/feedback/Dialog.jsx":"90e1e239a944","components/feedback/Tooltip.jsx":"d893bef0c49a","components/forms/Checkbox.jsx":"678818ee2b89","components/forms/Input.jsx":"d186fd6a3947","components/forms/Radio.jsx":"198bd1b217b1","components/forms/Select.jsx":"6f9f90a571fb","components/forms/Switch.jsx":"1594d06a1308","components/forms/Textarea.jsx":"469a88df4c89","components/navigation/Tabs.jsx":"41b8fbfc33d9","ui_kits/website/About.jsx":"8c34535ead76","ui_kits/website/Contact.jsx":"4f137fb32c7b","ui_kits/website/Home.jsx":"f2c604d31f83","ui_kits/website/Portfolio.jsx":"49726f467242","ui_kits/website/Services.jsx":"dad19033161a","ui_kits/website/SiteChrome.jsx":"7a1d23389fe7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BejewelledDesignSystem_900563 = window.BejewelledDesignSystem_900563 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: ['var(--paper-200)', 'var(--text-body)'],
  accent: ['var(--gold-100)', 'var(--gold-700)'],
  success: ['#E6EFE4', 'var(--status-success)'],
  warning: ['var(--gold-100)', 'var(--gold-700)'],
  error: ['#F5E5E2', 'var(--status-error)'],
  info: ['var(--blue-100)', 'var(--blue-700)'],
  inverse: ['var(--ink-800)', 'var(--text-on-inverse)'],
  deep: ['var(--blue-800)', 'var(--text-on-deep)']
};
function Badge({
  tone = 'neutral',
  children,
  style,
  ...rest
}) {
  const [bg, fg] = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: bg,
      color: fg,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: '8px 16px',
    fontSize: 'var(--text-xs)'
  },
  md: {
    padding: '12px 24px',
    fontSize: 'var(--text-sm)'
  },
  lg: {
    padding: '16px 32px',
    fontSize: 'var(--text-base)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  href,
  children,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const palette = {
    primary: {
      bg: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      fg: 'var(--text-on-inverse)',
      bd: 'transparent'
    },
    accent: {
      bg: hover ? 'var(--action-accent-hover)' : 'var(--action-accent)',
      fg: 'var(--text-on-accent)',
      bd: 'transparent'
    },
    secondary: {
      bg: hover ? 'var(--paper-200)' : 'transparent',
      fg: 'var(--text-heading)',
      bd: 'var(--line-strong)'
    },
    ghost: {
      bg: hover ? 'var(--gold-50)' : 'transparent',
      fg: 'var(--text-accent)',
      bd: 'transparent'
    }
  }[variant];
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-text)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderRadius: 'var(--radius-md)',
    border: '1px solid ' + palette.bd,
    background: palette.bg,
    color: palette.fg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    textDecoration: 'none',
    transition: 'var(--transition-control)',
    transform: press ? 'translateY(1px)' : 'none',
    ...sizes[size],
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  };
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: s
  }, handlers, rest), children);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: s
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  featured = false,
  interactive = false,
  padding = 'var(--space-6)',
  as = 'div',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const lift = interactive && hover;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid ' + (lift ? 'var(--line-accent)' : 'var(--line-hairline)'),
      borderTop: featured ? 'var(--border-accent) solid var(--line-accent)' : undefined,
      borderRadius: 'var(--radius-md)',
      padding,
      boxShadow: lift ? 'var(--shadow-sm)' : 'var(--shadow-none)',
      transition: 'border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)',
      cursor: interactive ? 'pointer' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Thin wrapper over the Lucide CDN sprite. Load once per page:
   <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script> */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = 'currentColor',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const L = typeof window !== 'undefined' && window.lucide;
    if (!L || !ref.current) return;
    const key = name.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('');
    const node = L.icons && (L.icons[key] || L.icons[name]);
    if (!node) return;
    ref.current.innerHTML = '';
    ref.current.appendChild(L.createElement(node));
    const svg = ref.current.firstChild;
    if (svg) {
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke-width', strokeWidth);
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      flex: 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  name,
  label,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const px = sizes[size];
  const palette = {
    ghost: {
      bg: hover ? 'var(--paper-200)' : 'transparent',
      fg: 'var(--text-body)',
      bd: 'transparent'
    },
    outline: {
      bg: hover ? 'var(--gold-50)' : 'transparent',
      fg: 'var(--text-heading)',
      bd: hover ? 'var(--line-accent)' : 'var(--line-rule)'
    },
    solid: {
      bg: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      fg: 'var(--text-on-inverse)',
      bd: 'transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: px,
      height: px,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: palette.bg,
      color: palette.fg,
      border: '1px solid ' + palette.bd,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === 'sm' ? 16 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const files = {
  lockup: {
    light: 'logo-lockup.png',
    dark: 'logo-lockup-light.png',
    ink: 'logo-lockup-ink.png'
  },
  mark: {
    light: 'logo-mark.png',
    dark: 'logo-mark-light.png',
    ink: 'logo-mark.png'
  },
  wordmark: {
    light: 'logo-wordmark.png',
    dark: 'logo-wordmark.png',
    ink: 'logo-wordmark.png'
  }
};
function Logo({
  variant = 'lockup',
  on = 'light',
  height = 40,
  assetPath = 'assets/',
  href,
  style,
  ...rest
}) {
  const img = /*#__PURE__*/React.createElement("img", _extends({
    src: assetPath + files[variant][on],
    alt: "Bejewelled",
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
  return href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: 'inline-block',
      border: 0
    }
  }, img) : img;
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = typeof onClick === 'function';
  return /*#__PURE__*/React.createElement("span", _extends({
    role: clickable ? 'button' : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (selected ? 'var(--line-strong)' : hover && clickable ? 'var(--line-accent)' : 'var(--line-rule)'),
      background: selected ? 'var(--ink-900)' : 'transparent',
      color: selected ? 'var(--text-on-inverse)' : 'var(--text-body)',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Eyebrow({
  tone = 'accent',
  as = 'div',
  children,
  style,
  ...rest
}) {
  const Tag = as;
  const color = {
    accent: 'var(--text-accent)',
    muted: 'var(--text-muted)',
    inverse: 'var(--gold-200)'
  }[tone];
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/editorial/NumberedItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NumberedItem({
  number,
  title,
  children,
  tone = 'light',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--space-5)',
      paddingTop: 'var(--space-5)',
      borderTop: 'var(--border-accent) solid var(--line-accent)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: inverse ? 'var(--gold-400)' : 'var(--text-accent)',
      lineHeight: 1.6
    }
  }, number), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-body)',
      marginTop: 'var(--space-3)',
      maxWidth: 'var(--layout-text-max)'
    }
  }, children)));
}
Object.assign(__ds_scope, { NumberedItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/NumberedItem.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ProjectRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Field = ({
  label,
  value
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-label)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)'
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-body-sm)',
    color: 'var(--text-body)',
    marginTop: 4
  }
}, value));
function ProjectRow({
  number,
  client,
  scope,
  location,
  status = 'Completed',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '48px 1fr 260px 150px',
      gap: 'var(--space-5)',
      alignItems: 'start',
      padding: 'var(--space-5) 0',
      borderBottom: '1px solid var(--line-hairline)',
      background: hover && onClick ? 'var(--paper-050)' : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background-color var(--duration-fast) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-accent)'
    }
  }, number), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-heading)'
    }
  }, client), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, scope)), /*#__PURE__*/React.createElement(Field, {
    label: "Location",
    value: location
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: status === 'Completed' ? 'success' : 'accent'
  }, status)));
}
Object.assign(__ds_scope, { ProjectRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ProjectRow.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  rule = true,
  level = 2,
  style,
  ...rest
}) {
  const H = 'h' + level;
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      textAlign: align,
      maxWidth: align === 'center' ? '62ch' : 'none',
      margin: align === 'center' ? '0 auto' : undefined,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: inverse ? 'inverse' : 'accent'
  }, eyebrow), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--space-3)'
    }
  }), /*#__PURE__*/React.createElement(H, {
    style: {
      font: 'var(--type-h2)',
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)'
    }
  }, title), rule && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--border-strong)',
      width: 56,
      background: inverse ? 'var(--gold-500)' : 'var(--line-strong)',
      margin: align === 'center' ? 'var(--space-5) auto 0' : 'var(--space-5) 0 0'
    }
  }), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-body)',
      maxWidth: 'var(--layout-text-max)',
      marginTop: 'var(--space-5)',
      marginLeft: align === 'center' ? 'auto' : undefined,
      marginRight: align === 'center' ? 'auto' : undefined
    }
  }, intro));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/editorial/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatBlock({
  stats = [],
  tone = 'light',
  columns,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + (columns || stats.length || 1) + ',1fr)',
      borderTop: '1px solid ' + (inverse ? 'var(--line-inverse)' : 'var(--line-hairline)'),
      ...style
    }
  }, rest), stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 'var(--space-5) var(--space-5) var(--space-5) 0',
      borderLeft: i === 0 ? 'none' : '1px solid ' + (inverse ? 'var(--line-inverse)' : 'var(--line-hairline)'),
      paddingLeft: i === 0 ? 0 : 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-3xl)',
      lineHeight: 1.05,
      color: inverse ? 'var(--gold-400)' : 'var(--text-accent)'
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)',
      marginTop: 'var(--space-3)'
    }
  }, s.label))));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = false,
  title,
  eyebrow,
  onClose,
  footer,
  width = 560,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-5)',
      background: 'var(--overlay-veil)',
      backdropFilter: 'var(--blur-veil)'
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-raised)',
      border: '1px solid var(--line-hairline)',
      borderTop: 'var(--border-accent) solid var(--line-accent)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      padding: 'var(--space-6) var(--space-6) var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)',
      marginBottom: 'var(--space-2)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h3)'
    }
  }, title)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-6) var(--space-6)',
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-3)',
      padding: 'var(--space-5) var(--space-6)',
      borderTop: '1px solid var(--line-hairline)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  content,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      font: 'var(--type-label)',
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  id,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--space-3)',
      alignItems: 'start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange,
    style: {
      width: 18,
      height: 18,
      margin: '2px 0 0',
      accentColor: 'var(--gold-600)',
      borderRadius: 'var(--radius-xs)',
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-heading)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-body-sm)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Label = ({
  children,
  required
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-label)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 'var(--space-2)'
  }
}, children, required && /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--status-error)',
    marginLeft: 4
  }
}, "*"));
const Hint = ({
  error,
  hint
}) => error || hint ? /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-body-sm)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--status-error)' : 'var(--text-muted)',
    marginTop: 'var(--space-2)'
  }
}, error || hint) : null;
function Input({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(Label, {
    required: required
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 14px',
      background: disabled ? 'var(--paper-200)' : 'var(--paper-000)',
      border: '1px solid ' + (error ? 'var(--status-error)' : focus ? 'var(--gold-500)' : 'var(--line-rule)'),
      borderRadius: 'var(--radius-md)',
      font: 'var(--type-body)',
      color: 'var(--text-heading)',
      outline: focus ? '1px solid var(--gold-500)' : 'none',
      outlineOffset: 0,
      transition: 'var(--transition-control)'
    }
  }, rest)), /*#__PURE__*/React.createElement(Hint, {
    error: error,
    hint: hint
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  name,
  options = [],
  value,
  onChange,
  legend,
  direction = 'column',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("fieldset", _extends({
    style: {
      border: 0,
      padding: 0,
      margin: 0,
      ...style
    }
  }, rest), legend && /*#__PURE__*/React.createElement("legend", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      padding: 0,
      marginBottom: 'var(--space-3)'
    }
  }, legend), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: direction,
      gap: direction === 'row' ? 'var(--space-5)' : 'var(--space-3)'
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'center',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      value: v,
      checked: value === v,
      onChange: onChange,
      style: {
        width: 18,
        height: 18,
        margin: 0,
        accentColor: 'var(--gold-600)',
        cursor: 'pointer'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-body-sm)',
        color: 'var(--text-heading)'
      }
    }, l));
  })));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Label = ({
  children,
  required
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-label)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 'var(--space-2)'
  }
}, children, required && /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--status-error)',
    marginLeft: 4
  }
}, "*"));
const Hint = ({
  error,
  hint
}) => error || hint ? /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-body-sm)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--status-error)' : 'var(--text-muted)',
    marginTop: 'var(--space-2)'
  }
}, error || hint) : null;
function Select({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  options = [],
  value,
  defaultValue,
  placeholder,
  onChange,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(Label, {
    required: required
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 38px 12px 14px',
      appearance: 'none',
      background: disabled ? 'var(--paper-200)' : 'var(--paper-000)',
      border: '1px solid ' + (error ? 'var(--status-error)' : focus ? 'var(--gold-500)' : 'var(--line-rule)'),
      borderRadius: 'var(--radius-md)',
      font: 'var(--type-body)',
      color: 'var(--text-heading)',
      outline: 'none',
      transition: 'var(--transition-control)'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 8,
      height: 8,
      borderRight: '1px solid var(--text-muted)',
      borderBottom: '1px solid var(--text-muted)',
      marginTop: -3,
      rotate: '45deg',
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement(Hint, {
    error: error,
    hint: hint
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked = false,
  disabled = false,
  onChange,
  id,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    id: id,
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: e => onChange && onChange(!checked, e),
    style: {
      width: 42,
      height: 24,
      padding: 2,
      border: '1px solid ' + (checked ? 'var(--gold-600)' : 'var(--line-rule)'),
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--gold-500)' : 'var(--paper-200)',
      cursor: 'inherit',
      transition: 'var(--transition-control)',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--paper-000)',
      boxShadow: 'var(--shadow-xs)',
      transform: checked ? 'translateX(18px)' : 'translateX(0)',
      transition: 'transform var(--duration-fast) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-heading)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Label = ({
  children,
  required
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-label)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 'var(--space-2)'
  }
}, children, required && /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--status-error)',
    marginLeft: 4
  }
}, "*"));
const Hint = ({
  error,
  hint
}) => error || hint ? /*#__PURE__*/React.createElement("div", {
  style: {
    font: 'var(--type-body-sm)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--status-error)' : 'var(--text-muted)',
    marginTop: 'var(--space-2)'
  }
}, error || hint) : null;
function Textarea({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  rows = 5,
  value,
  defaultValue,
  placeholder,
  onChange,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(Label, {
    required: required
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    rows: rows,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 14px',
      resize: 'vertical',
      background: disabled ? 'var(--paper-200)' : 'var(--paper-000)',
      border: '1px solid ' + (error ? 'var(--status-error)' : focus ? 'var(--gold-500)' : 'var(--line-rule)'),
      borderRadius: 'var(--radius-md)',
      font: 'var(--type-body)',
      color: 'var(--text-heading)',
      outline: 'none',
      transition: 'var(--transition-control)'
    }
  }, rest)), /*#__PURE__*/React.createElement(Hint, {
    error: error,
    hint: hint
  }));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  tabs = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const active = value != null ? value : tabs[0] && (tabs[0].value || tabs[0]);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderBottom: '1px solid var(--line-hairline)',
      ...style
    }
  }, rest), tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const l = typeof t === 'string' ? t : t.label;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        background: 'none',
        border: 0,
        borderBottom: '2px solid ' + (on ? 'var(--line-accent)' : 'transparent'),
        padding: '0 0 var(--space-4)',
        marginBottom: -1,
        cursor: 'pointer',
        font: 'var(--type-eyebrow)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        transition: 'var(--transition-control)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
const {
  Card,
  Badge,
  Eyebrow,
  SectionHeading,
  StatBlock,
  Tooltip,
  Button
} = window.BJ;
const CREDS = [['Certificate of Registration', 'BN433602013, issued 22nd August 2013'], ['Ministry of Works and Housing', 'Classification K3, D3'], ['Public Procurement Authority', 'Registered Contractor'], ['Architects Registration Council', 'Registered Practice']];
function About({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-10)',
      padding: 'var(--space-10) 0',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "About Us",
    title: "Who We Are",
    intro: "Bejewelled Enterprise is a Ghanaian architectural, engineering and construction firm delivering Architectural and Engineering services, project management and construction to a growing portfolio of institutional, commercial and residential clients across the country."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)'
    }
  }, "We believe architecture is more than the design of buildings \u2014 it is a tool for creating livable spaces and solving everyday environmental problems. Every commission we undertake is approached with this philosophy at its core."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      marginTop: 'var(--space-5)'
    }
  }, "This is why we structure our practice as a wholistic service. It is an approach that has allowed us to deliver completed institutional buildings, healthcare facilities, educational blocks, industrial space and residential developments with consistency and care."))), /*#__PURE__*/React.createElement(StatBlock, {
    stats: [{
      value: '30+',
      label: 'Completed projects'
    }, {
      value: '20+',
      label: 'Years of leadership experience'
    }, {
      value: '4',
      label: 'Core service disciplines'
    }, {
      value: '2013',
      label: 'Year of registration'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '420px 1fr',
      gap: 'var(--space-9)',
      padding: 'var(--space-10) 0'
    }
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: "Portrait \u2014 Rosemary Dwamena, Principal Architect",
    height: 480
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Leadership"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h2)',
      marginTop: 'var(--space-3)'
    }
  }, "Meet the Principal Architect"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--border-strong)',
      width: 56,
      background: 'var(--line-strong)',
      margin: 'var(--space-5) 0'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)'
    }
  }, "Rosemary Dwamena"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-accent)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginTop: 'var(--space-2)'
    }
  }, "Architect, ", /*#__PURE__*/React.createElement(Tooltip, {
    content: "Ghana Institute of Architects"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      borderBottom: '1px dotted var(--gold-300)',
      cursor: 'help'
    }
  }, "AGIA")), " \u2014 Principal Architect"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      marginTop: 'var(--space-5)'
    }
  }, "Rosemary Dwamena is a registered Architect and a member of the Ghana Institute of Architects (AGIA), with over 20 years of professional experience in architectural design, project management and construction supervision."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      marginTop: 'var(--space-5)'
    }
  }, "Under her leadership, Bejewelled Enterprise has grown into a trusted practice known for its client-focused, wholistic approach \u2014 guiding institutional, healthcare, educational, industrial and residential clients from initial concept through pre-contract planning, engineering coordination and construction to a completed, livable building."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      marginTop: 'var(--space-5)'
    }
  }, "Her continued oversight of every commission ensures that each project delivered by the firm reflects the same standard of design integrity, technical rigour and attentive client service.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-sunken)',
      padding: 'var(--space-10) 0'
    }
  }, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Credentials",
    title: "Certifications & Registration",
    intro: "Bejewelled Enterprise is a duly registered and certified practice, recognised by the relevant statutory and regulatory bodies governing the built environment in Ghana."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-8)'
    }
  }, CREDS.map(([t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    padding: "var(--space-5)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)',
      fontSize: 14,
      lineHeight: '22px'
    }
  }, "\u25AA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-heading)',
      fontWeight: 'var(--weight-medium)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, d)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-8)',
      paddingTop: 'var(--space-6)',
      borderTop: '1px solid var(--line-rule)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)'
    }
  }, [['Registered address', 'Plot 41A, Block J, Apire, Kumasi, Ghana'], ['Digital address', 'AK-361-7399'], ['Tel', '0244 037 166 • 0274 271 421']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.09em'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-body)',
      marginTop: 6
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('contact')
  }, "Request the company profile")))));
}
window.About = About;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Eyebrow,
  SectionHeading,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Dialog,
  Icon
} = window.BJ;
function Contact() {
  const [stage, setStage] = React.useState('Concept');
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-10) 0 var(--space-8)',
      maxWidth: '46ch'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Thank You"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h1)',
      marginTop: 'var(--space-4)'
    }
  }, "Let's build something lasting, together.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.25fr 1fr',
      gap: 'var(--space-9)',
      paddingBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-8)",
    featured: true
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Enquiry"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h3)',
      marginTop: 'var(--space-3)'
    }
  }, "Tell us about the commission"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    required: true,
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Organisation",
    placeholder: "Company or institution"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    required: true,
    placeholder: "you@company.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telephone",
    type: "tel",
    placeholder: "0244 037 166"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Service required",
    placeholder: "Select a discipline",
    options: ['Architectural Services', 'Engineering Services', 'Project Management', 'Construction']
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Location",
    placeholder: "Kumasi, Ghana"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "stage",
    legend: "Project stage",
    direction: "row",
    options: ['Concept', 'Pre-contract', 'On site'],
    value: stage,
    onChange: e => setStage(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    label: "Tell us about the project",
    rows: 4,
    placeholder: "Building type, approximate size, timeline"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "wants-profile",
    defaultChecked: true,
    label: "Send me the company profile",
    description: "A PDF copy, sent to the email above."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSent(true)
  }, "Send enquiry"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Download the profile"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Contact",
    title: "Get in touch",
    rule: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, [['map-pin', 'Registered address', 'Plot 41A, Block J, Apire, Kumasi, Ghana'], ['hash', 'Digital address', 'AK-361-7399'], ['phone', 'Telephone', '0244 037 166 • 0274 271 421']].map(([ic, k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--space-4)',
      paddingBottom: 'var(--space-5)',
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-heading)',
      marginTop: 4
    }
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: "Map plate \u2014 Apire, Kumasi (no map asset supplied)",
    height: 200
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "K3, D3"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "PPA Registered Contractor"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "ARC Registered Practice"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: sent,
    eyebrow: "Enquiry received",
    title: "Thank you \u2014 we will be in touch.",
    onClose: () => setSent(false),
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: () => setSent(false)
    }, "Close")
  }, "A member of the practice will respond within two working days. If the matter is urgent, call 0244 037 166."));
}
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Eyebrow,
  SectionHeading,
  StatBlock,
  NumberedItem,
  Icon
} = window.BJ;
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: "Hero photograph \u2014 completed institutional building, warm daylight",
    height: 720,
    scrim: "linear-gradient(to top,rgba(17,17,17,.82) 0%,rgba(17,17,17,.66) 46%,rgba(17,17,17,.30) 100%)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 'var(--space-9)',
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Architecture \xB7 Engineering \xB7 Project Management \xB7 Construction"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-display)',
      color: 'var(--paper-100)',
      marginTop: 'var(--space-5)',
      maxWidth: '14ch'
    }
  }, "Designing livable spaces."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--paper-200)',
      marginTop: 'var(--space-5)',
      maxWidth: '52ch'
    }
  }, "A Ghanaian architectural, engineering and construction practice delivering a wholistic service from first conversation to close-out."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => go('portfolio')
  }, "View the portfolio"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('contact'),
    style: {
      color: 'var(--paper-100)',
      borderColor: 'var(--paper-100)'
    }
  }, "Get in touch")))))), /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-9) 0 0'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    stats: [{
      value: '30+',
      label: 'Completed projects'
    }, {
      value: '20+',
      label: 'Years of leadership experience'
    }, {
      value: '4',
      label: 'Core service disciplines'
    }, {
      value: '2013',
      label: 'Year of registration'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-10)',
      padding: 'var(--space-10) 0',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "About Us",
    title: "Who We Are",
    intro: "We believe architecture is more than the design of buildings \u2014 it is a tool for creating livable spaces and solving everyday environmental problems."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, "Every commission we undertake is approached with this philosophy at its core: spaces that respond to how people actually live and work, environments that are comfortable, efficient and enduring, and solutions that anticipate the practical challenges our clients face long after handover."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 'var(--space-5)'
    }
  }, "This is why we structure our practice as a wholistic service. From the first design conversation through pre-contract planning, engineering coordination, site construction and post-contract close-out, our clients work with one accountable team rather than a series of disconnected consultants."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('about')
  }, "About the practice"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-deep)',
      padding: 'var(--space-10) 0'
    }
  }, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "What We Do",
    title: "Our Services",
    tone: "inverse",
    intro: "A complete, wholistic service \u2014 from concept to completion \u2014 built around four core disciplines."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8) var(--space-8)',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(NumberedItem, {
    tone: "inverse",
    number: "01",
    title: "Architectural Services"
  }, "Concept design, spatial planning and full architectural documentation, grounded in our philosophy of designing genuinely livable, human-centred spaces."), /*#__PURE__*/React.createElement(NumberedItem, {
    tone: "inverse",
    number: "02",
    title: "Engineering Services"
  }, "Coordinated structural and engineering input that translates design intent into safe, buildable and durable solutions."), /*#__PURE__*/React.createElement(NumberedItem, {
    tone: "inverse",
    number: "03",
    title: "Project Management"
  }, "Pre-contract and post-contract oversight \u2014 budgeting, scheduling, procurement and site coordination."), /*#__PURE__*/React.createElement(NumberedItem, {
    tone: "inverse",
    number: "04",
    title: "Construction"
  }, "Direct construction delivery, executed to the standards set at design stage.")))), /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-10) 0 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Selected Works",
    title: "Recent commissions"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-7)'
    }
  }, [['State Housing Company Limited', 'Construction of 16 No. Town Houses', 'Osu, Accra'], ['KATH Credit Union', 'Office complex including banking hall', 'Bantama, Kumasi'], ['Presbyterian University, Ghana', 'Renovation and extension of a three-storey lecture block', 'Kumasi City Campus']].map(([c, s, l], i) => /*#__PURE__*/React.createElement(Card, {
    key: c,
    interactive: true,
    padding: "0",
    as: "article",
    onClick: () => go('portfolio'),
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: 'Project photograph ' + (i + 1),
    height: 200
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, l), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "Completed")), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      marginTop: 'var(--space-3)'
    }
  }, c), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-2)'
    }
  }, s)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)',
      borderTop: '2px solid var(--line-strong)',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 'var(--space-6)',
      alignItems: 'center',
      padding: 'var(--space-8) 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h2)'
    }
  }, "Let's build something lasting, together."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-3)'
    }
  }, "Plot 41A, Block J, Apire, Kumasi, Ghana \xB7 0244 037 166 \u2022 0274 271 421")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('contact')
  }, "Start a conversation"))));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Portfolio.jsx
try { (() => {
const {
  Tag,
  Badge,
  Eyebrow,
  SectionHeading,
  ProjectRow,
  Card,
  Button
} = window.BJ;
const PROJECTS = [{
  n: '01',
  client: 'State Housing Company Limited',
  scope: 'Construction of 16 No. Town Houses',
  location: 'Osu, Accra',
  sector: 'Residential'
}, {
  n: '02',
  client: 'Komfo Anokye Teaching Hospital (KATH) Credit Union',
  scope: 'Office complex including banking hall (pre- and post-contract)',
  location: 'Bantama, Kumasi',
  sector: 'Commercial'
}, {
  n: '03',
  client: 'Word of Faith Outreach Center (WOFOC)',
  scope: 'Design and construction of a pre-school block',
  location: 'Daban, Kumasi',
  sector: 'Educational'
}, {
  n: '04',
  client: 'Presbyterian University, Ghana',
  scope: 'Renovation and extension works on a three-storey lecture block',
  location: 'Kumasi City Campus, Kumasi',
  sector: 'Educational'
}, {
  n: '05',
  client: 'Hadsbak Enterprise',
  scope: 'Design and construction of factory space and office spaces',
  location: 'Nwamase, Kumasi',
  sector: 'Industrial'
}, {
  n: '06',
  client: 'La Petite Chemist',
  scope: 'Pharmacy building',
  location: 'Ahodwo, Kumasi',
  sector: 'Healthcare'
}, {
  n: '07',
  client: 'Signetcare Medical Services',
  scope: 'Extension works of clinic',
  location: 'Asokwa, Kumasi',
  sector: 'Healthcare'
}];
const SECTORS = ['All', 'Residential', 'Commercial', 'Educational', 'Industrial', 'Healthcare'];
function Portfolio({
  go
}) {
  const [sector, setSector] = React.useState('All');
  const [open, setOpen] = React.useState(null);
  const rows = PROJECTS.filter(p => sector === 'All' || p.sector === sector);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-10) 0 var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Selected Works",
    title: "Project Portfolio",
    intro: "Completed institutional buildings, healthcare facilities, educational blocks, industrial space and residential developments."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap',
      paddingBottom: 'var(--space-6)'
    }
  }, SECTORS.map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s,
    selected: s === sector,
    onClick: () => {
      setSector(s);
      setOpen(null);
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--line-strong)'
    }
  }, rows.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n
  }, /*#__PURE__*/React.createElement(ProjectRow, {
    number: p.n,
    client: p.client,
    scope: p.scope,
    location: p.location,
    onClick: () => setOpen(open === p.n ? null : p.n)
  }), open === p.n && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)',
      padding: 'var(--space-6) 0 var(--space-8)',
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement(ImagePlate, {
    label: 'Project photograph — ' + p.client,
    height: 260
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, p.sector), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      marginTop: 'var(--space-3)'
    }
  }, p.client), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 'var(--space-5) 0 0',
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      gap: 'var(--space-3) var(--space-5)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.09em'
    }
  }, "Scope of works"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: 'var(--text-body)'
    }
  }, p.scope), /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.09em'
    }
  }, "Location"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: 'var(--text-body)'
    }
  }, p.location), /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.09em'
    }
  }, "Status"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "Completed"))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-5)'
    }
  }, "No project photography was supplied \u2014 plates are placeholders.")))))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)",
    style: {
      marginTop: 'var(--space-8)',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 'var(--space-6)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)'
    }
  }, "Looking for a similar commission?"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-2)'
    }
  }, "Tell us the location, building type and timeline, and we will come back with an approach.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('contact')
  }, "Get in touch"))));
}
window.Portfolio = Portfolio;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Portfolio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
const {
  Button,
  Card,
  Eyebrow,
  SectionHeading,
  NumberedItem,
  Tabs,
  Badge
} = window.BJ;
const SERVICES = [{
  n: '01',
  t: 'Architectural Services',
  b: 'Concept design, spatial planning and full architectural documentation for institutional, commercial, industrial and residential buildings, grounded in our philosophy of designing genuinely livable, human-centred spaces.',
  items: ['Concept and schematic design', 'Spatial planning and space programming', 'Full architectural documentation', 'Statutory drawings and permit support']
}, {
  n: '02',
  t: 'Engineering Services',
  b: 'Coordinated structural and engineering input that translates design intent into safe, buildable and durable solutions, integrated from the earliest stages of a project.',
  items: ['Structural design and coordination', 'Services coordination', 'Buildability review', 'Technical specification']
}, {
  n: '03',
  t: 'Project Management',
  b: 'Pre-contract and post-contract oversight — budgeting, scheduling, procurement and site coordination — that keeps projects on programme and accountable to our clients from start to finish.',
  items: ['Budgeting and cost planning', 'Programme and scheduling', 'Procurement and tendering', 'Site coordination and close-out']
}, {
  n: '04',
  t: 'Construction',
  b: 'Direct construction delivery, from town-house developments to office complexes and industrial facilities, executed to the standards set at design stage.',
  items: ['Residential developments', 'Office and commercial complexes', 'Industrial and factory space', 'Renovation and extension works']
}];
function Services({
  go
}) {
  const [active, setActive] = React.useState('01');
  const s = SERVICES.find(x => x.n === active);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-10) 0 var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "What We Do",
    title: "Our Services",
    intro: "We provide a complete, wholistic service \u2014 from concept to completion \u2014 built around four core disciplines."
  })), /*#__PURE__*/React.createElement(Tabs, {
    tabs: SERVICES.map(x => ({
      value: x.n,
      label: x.n + ' ' + x.t
    })),
    value: active,
    onChange: setActive
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 'var(--space-9)',
      padding: 'var(--space-8) 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NumberedItem, {
    number: s.n,
    title: s.t
  }, s.b), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Included"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 'var(--space-4) 0 0'
    }
  }, s.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) 0',
      borderBottom: '1px solid var(--line-hairline)',
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)'
    }
  }, "\u25AA"), i)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('contact')
  }, "Discuss a commission"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ImagePlate, {
    label: 'Photograph — ' + s.t.toLowerCase(),
    height: 320
  }), /*#__PURE__*/React.createElement(Card, {
    featured: true,
    padding: "var(--space-5)",
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "How we work"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      marginTop: 'var(--space-3)'
    }
  }, "One accountable team, from the first design conversation through to post-contract close-out \u2014 not a series of disconnected consultants."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Pre-contract"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "On site"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Close-out")))))));
}
window.Services = Services;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
const {
  Button,
  IconButton,
  Logo,
  Eyebrow
} = window.BJ;
const NAV = [['home', 'Home'], ['services', 'Services'], ['portfolio', 'Portfolio'], ['about', 'About'], ['contact', 'Contact']];
function SiteHeader({
  route,
  go
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'var(--surface-page)',
      boxShadow: 'var(--shadow-inset-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--layout-max)',
      margin: '0 auto',
      padding: '0 var(--layout-gutter-lg)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      border: 0
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    height: 46,
    assetPath: "../../assets/"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, NAV.map(([k, l]) => {
    const on = route === k;
    return /*#__PURE__*/React.createElement("a", {
      key: k,
      href: "#",
      onClick: e => {
        e.preventDefault();
        go(k);
      },
      style: {
        font: 'var(--type-eyebrow)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        border: 0,
        borderBottom: '2px solid ' + (on ? 'var(--line-accent)' : 'transparent'),
        paddingBottom: 4
      }
    }, l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-muted)',
      letterSpacing: '0.08em'
    }
  }, "0244 037 166"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    onClick: () => go('contact')
  }, "Get in touch"))));
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      padding: 'var(--space-10) 0 var(--space-6)',
      marginTop: 'var(--space-11)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--layout-max)',
      margin: '0 auto',
      padding: '0 var(--layout-gutter-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
      gap: 'var(--space-8)',
      paddingBottom: 'var(--space-8)',
      borderBottom: '1px solid var(--line-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    on: "dark",
    height: 64,
    assetPath: "../../assets/"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-inverse-muted)',
      marginTop: 'var(--space-5)',
      maxWidth: '34ch'
    }
  }, "Designing livable spaces. Solving everyday environmental problems. Delivering a wholistic service to every client.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Practice"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-4)'
    }
  }, NAV.slice(1).map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(k);
    },
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-inverse-muted)',
      border: 0
    }
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Disciplines"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-4)',
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-inverse-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Architectural Services"), /*#__PURE__*/React.createElement("span", null, "Engineering Services"), /*#__PURE__*/React.createElement("span", null, "Project Management"), /*#__PURE__*/React.createElement("span", null, "Construction"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "inverse"
  }, "Get in touch"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      font: 'var(--type-body-sm)',
      color: 'var(--text-on-inverse-muted)',
      lineHeight: 1.9
    }
  }, "Plot 41A, Block J, Apire,", /*#__PURE__*/React.createElement("br", null), "Kumasi, Ghana", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)'
    }
  }, "Digital Address: AK-361-7399"), /*#__PURE__*/React.createElement("br", null), "0244 037 166 \u2022 0274 271 421"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 'var(--space-4)',
      paddingTop: 'var(--space-5)',
      font: 'var(--type-label)',
      color: 'var(--ink-300)',
      letterSpacing: '0.08em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Bejewelled Enterprise. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "Registered 2013 \xB7 BN433602013 \xB7 Ministry of Works and Housing K3, D3"))));
}
function Shell({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--layout-max)',
      margin: '0 auto',
      padding: '0 var(--layout-gutter-lg)'
    }
  }, children);
}
function ImagePlate({
  label,
  height = 420,
  scrim,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      background: 'var(--surface-plate)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 20,
      right: 20,
      font: 'var(--type-label)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--paper-100)',
      opacity: .7
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: scrim || 'var(--overlay-scrim)'
    }
  }), children);
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Shell,
  ImagePlate,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.NumberedItem = __ds_scope.NumberedItem;

__ds_ns.ProjectRow = __ds_scope.ProjectRow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
