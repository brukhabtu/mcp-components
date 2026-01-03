/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, Rt = yt.ShadowRoot && (yt.ShadyCSS === void 0 || yt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ut = Symbol(), Yt = /* @__PURE__ */ new WeakMap();
let dr = class {
  constructor(e, o, s) {
    if (this._$cssResult$ = !0, s !== Ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = o;
  }
  get styleSheet() {
    let e = this.o;
    const o = this.t;
    if (Rt && e === void 0) {
      const s = o !== void 0 && o.length === 1;
      s && (e = Yt.get(o)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Yt.set(o, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _r = (t) => new dr(typeof t == "string" ? t : t + "", void 0, Ut), p = (t, ...e) => {
  const o = t.length === 1 ? t[0] : e.reduce((s, r, a) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[a + 1], t[0]);
  return new dr(o, t, Ut);
}, $r = (t, e) => {
  if (Rt) t.adoptedStyleSheets = e.map((o) => o instanceof CSSStyleSheet ? o : o.styleSheet);
  else for (const o of e) {
    const s = document.createElement("style"), r = yt.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = o.cssText, t.appendChild(s);
  }
}, Jt = Rt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let o = "";
  for (const s of e.cssRules) o += s.cssText;
  return _r(o);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xr, defineProperty: kr, getOwnPropertyDescriptor: zr, getOwnPropertyNames: Cr, getOwnPropertySymbols: Sr, getPrototypeOf: Or } = Object, re = globalThis, Qt = re.trustedTypes, Pr = Qt ? Qt.emptyScript : "", jt = re.reactiveElementPolyfillSupport, et = (t, e) => t, wt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Pr : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let o = t;
  switch (e) {
    case Boolean:
      o = t !== null;
      break;
    case Number:
      o = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        o = JSON.parse(t);
      } catch {
        o = null;
      }
  }
  return o;
} }, qt = (t, e) => !xr(t, e), Zt = { attribute: !0, type: String, converter: wt, reflect: !1, useDefault: !1, hasChanged: qt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), re.litPropertyMetadata ?? (re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Be = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, o = Zt) {
    if (o.state && (o.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((o = Object.create(o)).wrapped = !0), this.elementProperties.set(e, o), !o.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, o);
      r !== void 0 && kr(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, o, s) {
    const { get: r, set: a } = zr(this.prototype, e) ?? { get() {
      return this[o];
    }, set(i) {
      this[o] = i;
    } };
    return { get: r, set(i) {
      const g = r == null ? void 0 : r.call(this);
      a == null || a.call(this, i), this.requestUpdate(e, g, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(et("elementProperties"))) return;
    const e = Or(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(et("properties"))) {
      const o = this.properties, s = [...Cr(o), ...Sr(o)];
      for (const r of s) this.createProperty(r, o[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const o = litPropertyMetadata.get(e);
      if (o !== void 0) for (const [s, r] of o) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [o, s] of this.elementProperties) {
      const r = this._$Eu(o, s);
      r !== void 0 && this._$Eh.set(r, o);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const o = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) o.unshift(Jt(r));
    } else e !== void 0 && o.push(Jt(e));
    return o;
  }
  static _$Eu(e, o) {
    const s = o.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((o) => this.enableUpdating = o), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((o) => o(this));
  }
  addController(e) {
    var o;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) == null || o.call(e));
  }
  removeController(e) {
    var o;
    (o = this._$EO) == null || o.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), o = this.constructor.elementProperties;
    for (const s of o.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $r(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((o) => {
      var s;
      return (s = o.hostConnected) == null ? void 0 : s.call(o);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((o) => {
      var s;
      return (s = o.hostDisconnected) == null ? void 0 : s.call(o);
    });
  }
  attributeChangedCallback(e, o, s) {
    this._$AK(e, s);
  }
  _$ET(e, o) {
    var a;
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const i = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : wt).toAttribute(o, s.type);
      this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(e, o) {
    var a, i;
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const g = s.getPropertyOptions(r), v = typeof g.converter == "function" ? { fromAttribute: g.converter } : ((a = g.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? g.converter : wt;
      this._$Em = r;
      const f = v.fromAttribute(o, g.type);
      this[r] = f ?? ((i = this._$Ej) == null ? void 0 : i.get(r)) ?? f, this._$Em = null;
    }
  }
  requestUpdate(e, o, s, r = !1, a) {
    var i;
    if (e !== void 0) {
      const g = this.constructor;
      if (r === !1 && (a = this[e]), s ?? (s = g.getPropertyOptions(e)), !((s.hasChanged ?? qt)(a, o) || s.useDefault && s.reflect && a === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(g._$Eu(e, s)))) return;
      this.C(e, o, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, o, { useDefault: s, reflect: r, wrapped: a }, i) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, i ?? o ?? this[e]), a !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (o = void 0), this._$AL.set(e, o)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (o) {
      Promise.reject(o);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, i] of this._$Ep) this[a] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, i] of r) {
        const { wrapped: g } = i, v = this[a];
        g !== !0 || this._$AL.has(a) || v === void 0 || this.C(a, void 0, i, v);
      }
    }
    let e = !1;
    const o = this._$AL;
    try {
      e = this.shouldUpdate(o), e ? (this.willUpdate(o), (s = this._$EO) == null || s.forEach((r) => {
        var a;
        return (a = r.hostUpdate) == null ? void 0 : a.call(r);
      }), this.update(o)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(o);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var o;
    (o = this._$EO) == null || o.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((o) => this._$ET(o, this[o]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Be.elementStyles = [], Be.shadowRootOptions = { mode: "open" }, Be[et("elementProperties")] = /* @__PURE__ */ new Map(), Be[et("finalized")] = /* @__PURE__ */ new Map(), jt == null || jt({ ReactiveElement: Be }), (re.reactiveElementVersions ?? (re.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, er = (t) => t, _t = tt.trustedTypes, tr = _t ? _t.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hr = "$lit$", te = `lit$${Math.random().toFixed(9).slice(2)}$`, mr = "?" + te, Er = `<${mr}>`, xe = document, rt = () => xe.createComment(""), ot = (t) => t === null || typeof t != "object" && typeof t != "function", Vt = Array.isArray, Mr = (t) => Vt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Bt = `[ 	
\f\r]`, Ze = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rr = /-->/g, or = />/g, ye = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), sr = /'/g, ar = /"/g, ur = /^(?:script|style|textarea|title)$/i, Ar = (t) => (e, ...o) => ({ _$litType$: t, strings: e, values: o }), c = Ar(1), oe = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), ir = /* @__PURE__ */ new WeakMap(), we = xe.createTreeWalker(xe, 129);
function vr(t, e) {
  if (!Vt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tr !== void 0 ? tr.createHTML(e) : e;
}
const jr = (t, e) => {
  const o = t.length - 1, s = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = Ze;
  for (let g = 0; g < o; g++) {
    const v = t[g];
    let f, _, b = -1, R = 0;
    for (; R < v.length && (i.lastIndex = R, _ = i.exec(v), _ !== null); ) R = i.lastIndex, i === Ze ? _[1] === "!--" ? i = rr : _[1] !== void 0 ? i = or : _[2] !== void 0 ? (ur.test(_[2]) && (r = RegExp("</" + _[2], "g")), i = ye) : _[3] !== void 0 && (i = ye) : i === ye ? _[0] === ">" ? (i = r ?? Ze, b = -1) : _[1] === void 0 ? b = -2 : (b = i.lastIndex - _[2].length, f = _[1], i = _[3] === void 0 ? ye : _[3] === '"' ? ar : sr) : i === ar || i === sr ? i = ye : i === rr || i === or ? i = Ze : (i = ye, r = void 0);
    const ee = i === ye && t[g + 1].startsWith("/>") ? " " : "";
    a += i === Ze ? v + Er : b >= 0 ? (s.push(f), v.slice(0, b) + hr + v.slice(b) + te + ee) : v + te + (b === -2 ? g : ee);
  }
  return [vr(t, a + (t[o] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class st {
  constructor({ strings: e, _$litType$: o }, s) {
    let r;
    this.parts = [];
    let a = 0, i = 0;
    const g = e.length - 1, v = this.parts, [f, _] = jr(e, o);
    if (this.el = st.createElement(f, s), we.currentNode = this.el.content, o === 2 || o === 3) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (r = we.nextNode()) !== null && v.length < g; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const b of r.getAttributeNames()) if (b.endsWith(hr)) {
          const R = _[i++], ee = r.getAttribute(b).split(te), bt = /([.?@])?(.*)/.exec(R);
          v.push({ type: 1, index: a, name: bt[2], strings: ee, ctor: bt[1] === "." ? Dr : bt[1] === "?" ? Tr : bt[1] === "@" ? Ir : Pt }), r.removeAttribute(b);
        } else b.startsWith(te) && (v.push({ type: 6, index: a }), r.removeAttribute(b));
        if (ur.test(r.tagName)) {
          const b = r.textContent.split(te), R = b.length - 1;
          if (R > 0) {
            r.textContent = _t ? _t.emptyScript : "";
            for (let ee = 0; ee < R; ee++) r.append(b[ee], rt()), we.nextNode(), v.push({ type: 2, index: ++a });
            r.append(b[R], rt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === mr) v.push({ type: 2, index: a });
      else {
        let b = -1;
        for (; (b = r.data.indexOf(te, b + 1)) !== -1; ) v.push({ type: 7, index: a }), b += te.length - 1;
      }
      a++;
    }
  }
  static createElement(e, o) {
    const s = xe.createElement("template");
    return s.innerHTML = e, s;
  }
}
function De(t, e, o = t, s) {
  var i, g;
  if (e === oe) return e;
  let r = s !== void 0 ? (i = o._$Co) == null ? void 0 : i[s] : o._$Cl;
  const a = ot(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== a && ((g = r == null ? void 0 : r._$AO) == null || g.call(r, !1), a === void 0 ? r = void 0 : (r = new a(t), r._$AT(t, o, s)), s !== void 0 ? (o._$Co ?? (o._$Co = []))[s] = r : o._$Cl = r), r !== void 0 && (e = De(t, r._$AS(t, e.values), r, s)), e;
}
class Br {
  constructor(e, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: o }, parts: s } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? xe).importNode(o, !0);
    we.currentNode = r;
    let a = we.nextNode(), i = 0, g = 0, v = s[0];
    for (; v !== void 0; ) {
      if (i === v.index) {
        let f;
        v.type === 2 ? f = new ut(a, a.nextSibling, this, e) : v.type === 1 ? f = new v.ctor(a, v.name, v.strings, this, e) : v.type === 6 && (f = new Lr(a, this, e)), this._$AV.push(f), v = s[++g];
      }
      i !== (v == null ? void 0 : v.index) && (a = we.nextNode(), i++);
    }
    return we.currentNode = xe, r;
  }
  p(e) {
    let o = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, o), o += s.strings.length - 2) : s._$AI(e[o])), o++;
  }
}
class ut {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, o, s, r) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = e, this._$AB = o, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = o.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, o = this) {
    e = De(this, e, o), ot(e) ? e === l || e == null || e === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : e !== this._$AH && e !== oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Mr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== l && ot(this._$AH) ? this._$AA.nextSibling.data = e : this.T(xe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: o, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = st.createElement(vr(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === r) this._$AH.p(o);
    else {
      const i = new Br(r, this), g = i.u(this.options);
      i.p(o), this.T(g), this._$AH = i;
    }
  }
  _$AC(e) {
    let o = ir.get(e.strings);
    return o === void 0 && ir.set(e.strings, o = new st(e)), o;
  }
  k(e) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let s, r = 0;
    for (const a of e) r === o.length ? o.push(s = new ut(this.O(rt()), this.O(rt()), this, this.options)) : s = o[r], s._$AI(a), r++;
    r < o.length && (this._$AR(s && s._$AB.nextSibling, r), o.length = r);
  }
  _$AR(e = this._$AA.nextSibling, o) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, o); e !== this._$AB; ) {
      const r = er(e).nextSibling;
      er(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var o;
    this._$AM === void 0 && (this._$Cv = e, (o = this._$AP) == null || o.call(this, e));
  }
}
class Pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, o, s, r, a) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = e, this.name = o, this._$AM = r, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = l;
  }
  _$AI(e, o = this, s, r) {
    const a = this.strings;
    let i = !1;
    if (a === void 0) e = De(this, e, o, 0), i = !ot(e) || e !== this._$AH && e !== oe, i && (this._$AH = e);
    else {
      const g = e;
      let v, f;
      for (e = a[0], v = 0; v < a.length - 1; v++) f = De(this, g[s + v], o, v), f === oe && (f = this._$AH[v]), i || (i = !ot(f) || f !== this._$AH[v]), f === l ? e = l : e !== l && (e += (f ?? "") + a[v + 1]), this._$AH[v] = f;
    }
    i && !r && this.j(e);
  }
  j(e) {
    e === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Dr extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === l ? void 0 : e;
  }
}
class Tr extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== l);
  }
}
class Ir extends Pt {
  constructor(e, o, s, r, a) {
    super(e, o, s, r, a), this.type = 5;
  }
  _$AI(e, o = this) {
    if ((e = De(this, e, o, 0) ?? l) === oe) return;
    const s = this._$AH, r = e === l && s !== l || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== l && (s === l || r);
    r && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var o;
    typeof this._$AH == "function" ? this._$AH.call(((o = this.options) == null ? void 0 : o.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Lr {
  constructor(e, o, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    De(this, e);
  }
}
const Dt = tt.litHtmlPolyfillSupport;
Dt == null || Dt(st, ut), (tt.litHtmlVersions ?? (tt.litHtmlVersions = [])).push("3.3.2");
const Hr = (t, e, o) => {
  const s = (o == null ? void 0 : o.renderBefore) ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const a = (o == null ? void 0 : o.renderBefore) ?? null;
    s._$litPart$ = r = new ut(e.insertBefore(rt(), a), a, void 0, o ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis;
let d = class extends Be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var o;
    const e = super.createRenderRoot();
    return (o = this.renderOptions).renderBefore ?? (o.renderBefore = e.firstChild), e;
  }
  update(e) {
    const o = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Hr(o, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return oe;
  }
};
var pr;
d._$litElement$ = !0, d.finalized = !0, (pr = $e.litElementHydrateSupport) == null || pr.call($e, { LitElement: d });
const Tt = $e.litElementPolyfillSupport;
Tt == null || Tt({ LitElement: d });
($e.litElementVersions ?? ($e.litElementVersions = [])).push("4.2.2");
const Nr = p`
  :host {
    /* ======================
       COLOR SYSTEM
       ====================== */

    /* Primary - Main actions and emphasis */
    --mcp-color-primary: #6366f1;
    --mcp-color-primary-hover: #4f46e5;
    --mcp-color-primary-active: #4338ca;
    --mcp-color-primary-foreground: #ffffff;
    --mcp-color-primary-muted: rgba(99, 102, 241, 0.1);

    /* Secondary - Reduced emphasis */
    --mcp-color-secondary: #64748b;
    --mcp-color-secondary-hover: #475569;
    --mcp-color-secondary-active: #334155;
    --mcp-color-secondary-foreground: #ffffff;
    --mcp-color-secondary-muted: rgba(100, 116, 139, 0.1);

    /* Tertiary - Minimal emphasis (ghost-like) */
    --mcp-color-tertiary: transparent;
    --mcp-color-tertiary-hover: rgba(0, 0, 0, 0.05);
    --mcp-color-tertiary-active: rgba(0, 0, 0, 0.1);
    --mcp-color-tertiary-foreground: #0f172a;

    /* Success - Positive outcomes */
    --mcp-color-success: #22c55e;
    --mcp-color-success-hover: #16a34a;
    --mcp-color-success-active: #15803d;
    --mcp-color-success-foreground: #ffffff;
    --mcp-color-success-muted: rgba(34, 197, 94, 0.1);

    /* Warning - Caution needed */
    --mcp-color-warning: #f59e0b;
    --mcp-color-warning-hover: #d97706;
    --mcp-color-warning-active: #b45309;
    --mcp-color-warning-foreground: #ffffff;
    --mcp-color-warning-muted: rgba(245, 158, 11, 0.1);

    /* Error - Problems and destructive actions */
    --mcp-color-error: #ef4444;
    --mcp-color-error-hover: #dc2626;
    --mcp-color-error-active: #b91c1c;
    --mcp-color-error-foreground: #ffffff;
    --mcp-color-error-muted: rgba(239, 68, 68, 0.1);

    /* Info - Informational */
    --mcp-color-info: #3b82f6;
    --mcp-color-info-hover: #2563eb;
    --mcp-color-info-active: #1d4ed8;
    --mcp-color-info-foreground: #ffffff;
    --mcp-color-info-muted: rgba(59, 130, 246, 0.1);

    /* Surface colors */
    --mcp-color-background: #ffffff;
    --mcp-color-foreground: #0f172a;
    --mcp-color-ghost: #f1f5f9;
    --mcp-color-ghost-foreground: #64748b;
    --mcp-color-border: #e2e8f0;
    --mcp-color-border-hover: #cbd5e1;
    --mcp-color-backdrop: rgba(0, 0, 0, 0.5);

    /* ======================
       SPACING SCALE
       ====================== */
    --mcp-space-0: 0;
    --mcp-space-1: 0.25rem;   /* 4px */
    --mcp-space-2: 0.5rem;    /* 8px */
    --mcp-space-3: 0.75rem;   /* 12px */
    --mcp-space-4: 1rem;      /* 16px */
    --mcp-space-5: 1.25rem;   /* 20px */
    --mcp-space-6: 1.5rem;    /* 24px */
    --mcp-space-8: 2rem;      /* 32px */
    --mcp-space-10: 2.5rem;   /* 40px */
    --mcp-space-12: 3rem;     /* 48px */

    /* ======================
       TYPOGRAPHY
       ====================== */
    --mcp-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --mcp-font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

    /* Font sizes */
    --mcp-font-size-xs: 0.75rem;    /* 12px */
    --mcp-font-size-sm: 0.875rem;   /* 14px */
    --mcp-font-size-base: 1rem;     /* 16px */
    --mcp-font-size-lg: 1.125rem;   /* 18px */
    --mcp-font-size-xl: 1.25rem;    /* 20px */
    --mcp-font-size-2xl: 1.5rem;    /* 24px */
    --mcp-font-size-3xl: 1.875rem;  /* 30px */

    /* Font weights */
    --mcp-font-weight-normal: 400;
    --mcp-font-weight-medium: 500;
    --mcp-font-weight-semibold: 600;
    --mcp-font-weight-bold: 700;

    /* Line heights */
    --mcp-line-height-tight: 1.25;
    --mcp-line-height-normal: 1.5;
    --mcp-line-height-relaxed: 1.75;

    /* ======================
       BORDERS & RADIUS
       ====================== */
    --mcp-radius-none: 0;
    --mcp-radius-sm: 0.25rem;   /* 4px */
    --mcp-radius-md: 0.375rem;  /* 6px */
    --mcp-radius-lg: 0.5rem;    /* 8px */
    --mcp-radius-xl: 0.75rem;   /* 12px */
    --mcp-radius-full: 9999px;

    --mcp-border-width: 1px;

    /* ======================
       SHADOWS
       ====================== */
    --mcp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --mcp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --mcp-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --mcp-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

    /* ======================
       TRANSITIONS
       ====================== */
    --mcp-transition-fast: 150ms ease;
    --mcp-transition-normal: 200ms ease;
    --mcp-transition-slow: 300ms ease;

    /* ======================
       Z-INDEX SCALE
       ====================== */
    --mcp-z-dropdown: 1000;
    --mcp-z-sticky: 1010;
    --mcp-z-modal: 1030;
    --mcp-z-tooltip: 1050;
    --mcp-z-toast: 1060;

    /* ======================
       INTERACTIVE STATES
       ====================== */
    --mcp-opacity-disabled: 0.5;
  }
`, Rr = p`
  :host([theme="dark"]), :host-context([data-theme="dark"]) {
    /* Primary */
    --mcp-color-primary: #818cf8;
    --mcp-color-primary-hover: #a5b4fc;
    --mcp-color-primary-active: #c7d2fe;
    --mcp-color-primary-muted: rgba(129, 140, 248, 0.15);

    /* Secondary */
    --mcp-color-secondary: #94a3b8;
    --mcp-color-secondary-hover: #cbd5e1;
    --mcp-color-secondary-active: #e2e8f0;
    --mcp-color-secondary-muted: rgba(148, 163, 184, 0.15);

    /* Tertiary */
    --mcp-color-tertiary-hover: rgba(255, 255, 255, 0.05);
    --mcp-color-tertiary-active: rgba(255, 255, 255, 0.1);
    --mcp-color-tertiary-foreground: #f8fafc;

    /* Success */
    --mcp-color-success: #4ade80;
    --mcp-color-success-hover: #86efac;
    --mcp-color-success-active: #bbf7d0;
    --mcp-color-success-muted: rgba(74, 222, 128, 0.15);

    /* Warning */
    --mcp-color-warning: #fbbf24;
    --mcp-color-warning-hover: #fcd34d;
    --mcp-color-warning-active: #fde68a;
    --mcp-color-warning-muted: rgba(251, 191, 36, 0.15);

    /* Error */
    --mcp-color-error: #f87171;
    --mcp-color-error-hover: #fca5a5;
    --mcp-color-error-active: #fecaca;
    --mcp-color-error-muted: rgba(248, 113, 113, 0.15);

    /* Info */
    --mcp-color-info: #60a5fa;
    --mcp-color-info-hover: #93c5fd;
    --mcp-color-info-active: #bfdbfe;
    --mcp-color-info-muted: rgba(96, 165, 250, 0.15);

    /* Surfaces */
    --mcp-color-background: #0f172a;
    --mcp-color-foreground: #f8fafc;
    --mcp-color-ghost: #1e293b;
    --mcp-color-ghost-foreground: #94a3b8;
    --mcp-color-border: #334155;
    --mcp-color-border-hover: #475569;
    --mcp-color-backdrop: rgba(0, 0, 0, 0.7);

  }
`, Ur = p`
  :host([theme="anthropic"]), :host-context([data-theme="anthropic"]) {
    /* Official Anthropic Brand Colors
       Source: https://github.com/anthropics/skills/tree/main/skills/brand-guidelines
       Core: Dark #141413, Light #faf9f5, Mid Gray #b0aea5, Light Gray #e8e6dc
       Accent: Orange #d97757, Blue #6a9bcc, Green #788c5d
    */

    /* Primary - Anthropic Orange */
    --mcp-color-primary: #d97757;
    --mcp-color-primary-hover: #c4684a;
    --mcp-color-primary-active: #b05a3e;
    --mcp-color-primary-foreground: #faf9f5;
    --mcp-color-primary-muted: rgba(217, 119, 87, 0.15);

    /* Secondary - Anthropic Blue */
    --mcp-color-secondary: #6a9bcc;
    --mcp-color-secondary-hover: #5a8bbc;
    --mcp-color-secondary-active: #4a7bac;
    --mcp-color-secondary-foreground: #faf9f5;
    --mcp-color-secondary-muted: rgba(106, 155, 204, 0.15);

    /* Tertiary */
    --mcp-color-tertiary-hover: rgba(250, 249, 245, 0.08);
    --mcp-color-tertiary-active: rgba(250, 249, 245, 0.12);
    --mcp-color-tertiary-foreground: #faf9f5;

    /* Success - Anthropic Green */
    --mcp-color-success: #788c5d;
    --mcp-color-success-hover: #697a51;
    --mcp-color-success-active: #5a6946;
    --mcp-color-success-foreground: #faf9f5;
    --mcp-color-success-muted: rgba(120, 140, 93, 0.15);

    /* Warning - Warm variant of orange */
    --mcp-color-warning: #e8a84c;
    --mcp-color-warning-hover: #d99a40;
    --mcp-color-warning-active: #ca8c35;
    --mcp-color-warning-foreground: #141413;
    --mcp-color-warning-muted: rgba(232, 168, 76, 0.15);

    /* Error - Red that complements the palette */
    --mcp-color-error: #c45c5c;
    --mcp-color-error-hover: #b34d4d;
    --mcp-color-error-active: #a23f3f;
    --mcp-color-error-foreground: #faf9f5;
    --mcp-color-error-muted: rgba(196, 92, 92, 0.15);

    /* Info - Anthropic Blue */
    --mcp-color-info: #6a9bcc;
    --mcp-color-info-hover: #5a8bbc;
    --mcp-color-info-active: #4a7bac;
    --mcp-color-info-foreground: #faf9f5;
    --mcp-color-info-muted: rgba(106, 155, 204, 0.15);

    /* Surfaces - Official brand colors */
    --mcp-color-background: #141413;
    --mcp-color-foreground: #faf9f5;
    --mcp-color-ghost: #1f1f1e;
    --mcp-color-ghost-foreground: #b0aea5;
    --mcp-color-border: #3a3a38;
    --mcp-color-border-hover: #4a4a47;
    --mcp-color-backdrop: rgba(20, 20, 19, 0.8);

    /* Typography - Poppins for headings, Lora for body */
    --mcp-font-family: 'Lora', Georgia, serif;
    --mcp-font-family-heading: 'Poppins', Arial, sans-serif;
  }
`, qr = p`
  :host([theme="claude"]), :host-context([data-theme="claude"]) {
    /* Claude App Light Theme
       Source: https://www.assistant-ui.com/examples/claude
       Warm, approachable design with serif typography
    */

    /* Primary - Claude Orange */
    --mcp-color-primary: #ae5630;
    --mcp-color-primary-hover: #9a4a29;
    --mcp-color-primary-active: #863f22;
    --mcp-color-primary-foreground: #ffffff;
    --mcp-color-primary-muted: rgba(174, 86, 48, 0.1);

    /* Secondary */
    --mcp-color-secondary: #6b6a68;
    --mcp-color-secondary-hover: #5a5958;
    --mcp-color-secondary-active: #4a4948;
    --mcp-color-secondary-foreground: #ffffff;
    --mcp-color-secondary-muted: rgba(107, 106, 104, 0.1);

    /* Tertiary */
    --mcp-color-tertiary-hover: rgba(0, 0, 0, 0.05);
    --mcp-color-tertiary-active: rgba(0, 0, 0, 0.08);
    --mcp-color-tertiary-foreground: #1a1a18;

    /* Success */
    --mcp-color-success: #5d7a4a;
    --mcp-color-success-hover: #4f6940;
    --mcp-color-success-active: #425836;
    --mcp-color-success-foreground: #ffffff;
    --mcp-color-success-muted: rgba(93, 122, 74, 0.1);

    /* Warning */
    --mcp-color-warning: #c4923a;
    --mcp-color-warning-hover: #b08232;
    --mcp-color-warning-active: #9c732b;
    --mcp-color-warning-foreground: #1a1a18;
    --mcp-color-warning-muted: rgba(196, 146, 58, 0.1);

    /* Error */
    --mcp-color-error: #b54a4a;
    --mcp-color-error-hover: #a13f3f;
    --mcp-color-error-active: #8d3535;
    --mcp-color-error-foreground: #ffffff;
    --mcp-color-error-muted: rgba(181, 74, 74, 0.1);

    /* Info */
    --mcp-color-info: #4a7a9e;
    --mcp-color-info-hover: #3f6a8a;
    --mcp-color-info-active: #355a76;
    --mcp-color-info-foreground: #ffffff;
    --mcp-color-info-muted: rgba(74, 122, 158, 0.1);

    /* Surfaces - Warm beige tones */
    --mcp-color-background: #F5F5F0;
    --mcp-color-foreground: #1a1a18;
    --mcp-color-ghost: #DDD9CE;
    --mcp-color-ghost-foreground: #6b6a68;
    --mcp-color-border: rgba(0, 0, 0, 0.08);
    --mcp-color-border-hover: rgba(0, 0, 0, 0.12);
    --mcp-color-backdrop: rgba(0, 0, 0, 0.4);

    /* Typography - Serif for refined reading */
    --mcp-font-family: Georgia, 'Times New Roman', serif;

    /* Claude-specific shadows */
    --mcp-shadow-sm: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.025);
    --mcp-shadow-md: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.035);
    --mcp-shadow-lg: 0 0.5rem 2rem rgba(0, 0, 0, 0.05);

    /* Smoother transitions */
    --mcp-transition-normal: 300ms cubic-bezier(0.165, 0.85, 0.45, 1);
  }
`, Vr = p`
  :host([theme="claude-dark"]), :host-context([data-theme="claude-dark"]) {
    /* Claude App Dark Theme
       Source: https://www.assistant-ui.com/examples/claude
       Warm charcoal with consistent orange accent
    */

    /* Primary - Claude Orange (same in dark) */
    --mcp-color-primary: #ae5630;
    --mcp-color-primary-hover: #c4623a;
    --mcp-color-primary-active: #d97044;
    --mcp-color-primary-foreground: #ffffff;
    --mcp-color-primary-muted: rgba(174, 86, 48, 0.15);

    /* Secondary */
    --mcp-color-secondary: #9a9893;
    --mcp-color-secondary-hover: #aba9a5;
    --mcp-color-secondary-active: #bcbab7;
    --mcp-color-secondary-foreground: #1f1e1b;
    --mcp-color-secondary-muted: rgba(154, 152, 147, 0.15);

    /* Tertiary */
    --mcp-color-tertiary-hover: rgba(255, 255, 255, 0.05);
    --mcp-color-tertiary-active: rgba(255, 255, 255, 0.08);
    --mcp-color-tertiary-foreground: #eeeeee;

    /* Success */
    --mcp-color-success: #7a9e6a;
    --mcp-color-success-hover: #8aae7a;
    --mcp-color-success-active: #9abe8a;
    --mcp-color-success-foreground: #1f1e1b;
    --mcp-color-success-muted: rgba(122, 158, 106, 0.15);

    /* Warning */
    --mcp-color-warning: #d4a24a;
    --mcp-color-warning-hover: #e0b05a;
    --mcp-color-warning-active: #ecbe6a;
    --mcp-color-warning-foreground: #1f1e1b;
    --mcp-color-warning-muted: rgba(212, 162, 74, 0.15);

    /* Error */
    --mcp-color-error: #c56a6a;
    --mcp-color-error-hover: #d17a7a;
    --mcp-color-error-active: #dd8a8a;
    --mcp-color-error-foreground: #1f1e1b;
    --mcp-color-error-muted: rgba(197, 106, 106, 0.15);

    /* Info */
    --mcp-color-info: #6a9abe;
    --mcp-color-info-hover: #7aaace;
    --mcp-color-info-active: #8abade;
    --mcp-color-info-foreground: #1f1e1b;
    --mcp-color-info-muted: rgba(106, 154, 190, 0.15);

    /* Surfaces - Warm charcoal */
    --mcp-color-background: #2b2a27;
    --mcp-color-foreground: #eeeeee;
    --mcp-color-ghost: #393937;
    --mcp-color-ghost-foreground: #9a9893;
    --mcp-color-border: rgba(255, 255, 255, 0.08);
    --mcp-color-border-hover: rgba(255, 255, 255, 0.12);
    --mcp-color-backdrop: rgba(0, 0, 0, 0.6);

    /* Typography - Serif for refined reading */
    --mcp-font-family: Georgia, 'Times New Roman', serif;

    /* Claude-specific shadows (subtler in dark) */
    --mcp-shadow-sm: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);
    --mcp-shadow-md: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
    --mcp-shadow-lg: 0 0.5rem 2rem rgba(0, 0, 0, 0.25);

    /* Smoother transitions */
    --mcp-transition-normal: 300ms cubic-bezier(0.165, 0.85, 0.45, 1);
  }
`, Fr = p`
  *, *::before, *::after { box-sizing: border-box; }
  :host {
    font-family: var(--mcp-font-family);
    font-size: var(--mcp-font-size-base);
    line-height: var(--mcp-line-height-normal);
    color: var(--mcp-color-foreground);
  }
  :host([hidden]) { display: none !important; }
`, u = [Nr, Rr, Ur, qr, Vr, Fr];
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Us = "mcp-theme";
class qs {
  constructor(e) {
    this._state = {
      status: "idle",
      data: null,
      error: null
    }, this._abortController = null, this.host = e, e.addController(this);
  }
  get status() {
    return this._state.status;
  }
  get data() {
    return this._state.data;
  }
  get error() {
    return this._state.error;
  }
  get isIdle() {
    return this._state.status === "idle";
  }
  get isPending() {
    return this._state.status === "pending";
  }
  get isSuccess() {
    return this._state.status === "success";
  }
  get isError() {
    return this._state.status === "error";
  }
  async run(e) {
    var o;
    (o = this._abortController) == null || o.abort(), this._abortController = new AbortController(), this._setState({ status: "pending", data: null, error: null });
    try {
      const s = await e(this._abortController.signal);
      return this._setState({ status: "success", data: s, error: null }), s;
    } catch (s) {
      if (s instanceof Error && s.name === "AbortError")
        return null;
      const r = s instanceof Error ? s : new Error(String(s));
      return this._setState({ status: "error", data: null, error: r }), null;
    }
  }
  reset() {
    var e;
    (e = this._abortController) == null || e.abort(), this._setState({ status: "idle", data: null, error: null });
  }
  _setState(e) {
    this._state = e, this.host.requestUpdate();
  }
  hostDisconnected() {
    var e;
    (e = this._abortController) == null || e.abort();
  }
}
class Vs {
  constructor(e, o = []) {
    this.value = "", this.error = "", this.touched = !1, this.host = e, this._validators = o, e.addController(this);
  }
  hostConnected() {
  }
  hostDisconnected() {
  }
  get isValid() {
    return !this.error;
  }
  get showError() {
    return this.touched && !!this.error;
  }
  setValue(e) {
    this.value = e, this._validate(), this.host.requestUpdate();
  }
  touch() {
    this.touched = !0, this._validate(), this.host.requestUpdate();
  }
  reset() {
    this.value = "", this.error = "", this.touched = !1, this.host.requestUpdate();
  }
  _validate() {
    for (const e of this._validators) {
      const o = e(this.value);
      if (o) {
        this.error = o;
        return;
      }
    }
    this.error = "";
  }
}
const Fs = {
  required: (t = "Required") => (e) => e.trim() ? null : t,
  minLength: (t, e) => (o) => o.length >= t ? null : e ?? `Min ${t} characters`,
  maxLength: (t, e) => (o) => o.length <= t ? null : e ?? `Max ${t} characters`,
  pattern: (t, e) => (o) => t.test(o) ? null : e,
  email: (t = "Invalid email") => (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? null : t
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m = (t) => (e, o) => {
  o !== void 0 ? o.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wr = { attribute: !0, type: String, converter: wt, reflect: !1, hasChanged: qt }, Gr = (t = Wr, e, o) => {
  const { kind: s, metadata: r } = o;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(o.name, t), s === "accessor") {
    const { name: i } = o;
    return { set(g) {
      const v = e.get.call(this);
      e.set.call(this, g), this.requestUpdate(i, v, t, !0, g);
    }, init(g) {
      return g !== void 0 && this.C(i, void 0, t, g), g;
    } };
  }
  if (s === "setter") {
    const { name: i } = o;
    return function(g) {
      const v = this[i];
      e.call(this, g), this.requestUpdate(i, v, t, !0, g);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function n(t) {
  return (e, o) => typeof o == "object" ? Gr(t, e, o) : ((s, r, a) => {
    const i = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, s), i ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(t, e, o);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(t) {
  return n({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xr = (t, e, o) => (o.configurable = !0, o.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, o), o);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qe(t, e) {
  return (o, s, r) => {
    const a = (i) => {
      var g;
      return ((g = i.renderRoot) == null ? void 0 : g.querySelector(t)) ?? null;
    };
    return Xr(o, s, { get() {
      return a(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gr = { ATTRIBUTE: 1, CHILD: 2 }, fr = (t) => (...e) => ({ _$litDirective$: t, values: e });
class br {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, o, s) {
    this._$Ct = e, this._$AM = o, this._$Ci = s;
  }
  _$AS(e, o) {
    return this.update(e, o);
  }
  update(e, o) {
    return this.render(...o);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const h = fr(class extends br {
  constructor(t) {
    var e;
    if (super(t), t.type !== gr.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var s, r;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((a) => a !== "")));
      for (const a in e) e[a] && !((s = this.nt) != null && s.has(a)) && this.st.add(a);
      return this.render(e);
    }
    const o = t.element.classList;
    for (const a of this.st) a in e || (o.remove(a), this.st.delete(a));
    for (const a in e) {
      const i = !!e[a];
      i === this.st.has(a) || (r = this.nt) != null && r.has(a) || (i ? (o.add(a), this.st.add(a)) : (o.remove(a), this.st.delete(a)));
    }
    return oe;
  }
});
var Kr = Object.defineProperty, Yr = Object.getOwnPropertyDescriptor, ue = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Yr(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Kr(e, o, r), r;
};
let j = class extends d {
  constructor() {
    super(...arguments), this.src = "", this.alt = "", this.name = "", this.size = "md", this.shape = "circle", this._imgError = !1;
  }
  get _initials() {
    if (!this.name) return "";
    const t = this.name.trim().split(/\s+/);
    return t.length === 1 ? t[0].substring(0, 2) : t[0][0] + t[t.length - 1][0];
  }
  _handleImgError() {
    this._imgError = !0;
  }
  render() {
    const t = {
      avatar: !0,
      [`size-${this.size}`]: !0,
      [`shape-${this.shape}`]: !0
    }, e = this.src && !this._imgError, o = !e && this._initials, s = !e && !o;
    return c`
      <div class=${h(t)} part="avatar">
        ${e ? c`
          <img part="image" src=${this.src} alt=${this.alt || this.name} @error=${this._handleImgError} />
        ` : l}

        ${o ? c`
          <span class="initials" part="initials">${this._initials}</span>
        ` : l}

        ${s ? c`
          <span class="icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
        ` : l}

        ${this.status ? c`
          <span class=${h({ status: !0, [`status-${this.status}`]: !0 })} part="status"></span>
        ` : l}
      </div>
    `;
  }
};
j.styles = [
  u,
  p`
      :host {
        display: inline-block;
      }

      .avatar {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
        font-weight: var(--mcp-font-weight-medium);
        overflow: hidden;
        flex-shrink: 0;
      }

      .size-xs { width: 1.5rem; height: 1.5rem; font-size: 0.625rem; }
      .size-sm { width: 2rem; height: 2rem; font-size: 0.75rem; }
      .size-md { width: 2.5rem; height: 2.5rem; font-size: 0.875rem; }
      .size-lg { width: 3rem; height: 3rem; font-size: 1rem; }
      .size-xl { width: 4rem; height: 4rem; font-size: 1.25rem; }

      .shape-circle { border-radius: 50%; }
      .shape-square { border-radius: 0; }
      .shape-rounded { border-radius: var(--mcp-radius-lg); }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .initials {
        text-transform: uppercase;
        user-select: none;
      }

      .icon svg {
        width: 60%;
        height: 60%;
        stroke: currentColor;
        stroke-width: 1.5;
        fill: none;
      }

      .status {
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        border: 2px solid var(--mcp-color-background);
      }

      .size-xs .status, .size-sm .status { width: 0.5rem; height: 0.5rem; }
      .size-md .status { width: 0.625rem; height: 0.625rem; }
      .size-lg .status, .size-xl .status { width: 0.75rem; height: 0.75rem; }

      .status-online { background: var(--mcp-color-success); }
      .status-offline { background: var(--mcp-color-ghost-foreground); }
      .status-busy { background: var(--mcp-color-error); }
      .status-away { background: var(--mcp-color-warning); }
    `
];
ue([
  n({ type: String })
], j.prototype, "src", 2);
ue([
  n({ type: String })
], j.prototype, "alt", 2);
ue([
  n({ type: String })
], j.prototype, "name", 2);
ue([
  n({ type: String })
], j.prototype, "size", 2);
ue([
  n({ type: String })
], j.prototype, "shape", 2);
ue([
  n({ type: String })
], j.prototype, "status", 2);
ue([
  z()
], j.prototype, "_imgError", 2);
j = ue([
  m("mcp-avatar")
], j);
var Jr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, vt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Qr(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Jr(e, o, r), r;
};
let ke = class extends d {
  constructor() {
    super(...arguments), this.variant = "ghost", this.outline = !1, this.soft = !1, this.dot = !1;
  }
  render() {
    const t = {
      badge: !0,
      [`variant-${this.variant}`]: !0,
      outline: this.outline,
      soft: this.soft && !this.outline,
      dot: this.dot
    };
    return c`
      <span class=${h(t)} part="badge">
        <slot></slot>
      </span>
    `;
  }
};
ke.styles = [
  u,
  p`
      :host {
        display: inline-flex;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        border-radius: var(--mcp-radius-full);
        white-space: nowrap;
      }

      /* Ghost/default variant */
      .variant-ghost {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
      }

      /* Primary variant */
      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      /* Secondary variant */
      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }

      /* Tertiary variant */
      .variant-tertiary {
        background: var(--mcp-color-tertiary-hover);
        color: var(--mcp-color-tertiary-foreground);
        border: var(--mcp-border-width) solid var(--mcp-color-border);
      }

      /* Success variant */
      .variant-success {
        background: var(--mcp-color-success);
        color: var(--mcp-color-success-foreground);
      }

      /* Warning variant */
      .variant-warning {
        background: var(--mcp-color-warning);
        color: var(--mcp-color-warning-foreground);
      }

      /* Error variant */
      .variant-error {
        background: var(--mcp-color-error);
        color: var(--mcp-color-error-foreground);
      }

      /* Info variant */
      .variant-info {
        background: var(--mcp-color-info);
        color: var(--mcp-color-info-foreground);
      }

      /* Outline modifier - uses muted backgrounds */
      .outline {
        background: transparent;
        border: var(--mcp-border-width) solid currentColor;
      }

      .outline.variant-ghost {
        color: var(--mcp-color-ghost-foreground);
        border-color: var(--mcp-color-border);
      }
      .outline.variant-primary { color: var(--mcp-color-primary); }
      .outline.variant-secondary { color: var(--mcp-color-secondary); }
      .outline.variant-tertiary {
        color: var(--mcp-color-ghost-foreground);
        border-color: var(--mcp-color-border);
      }
      .outline.variant-success { color: var(--mcp-color-success); }
      .outline.variant-warning { color: var(--mcp-color-warning); }
      .outline.variant-error { color: var(--mcp-color-error); }
      .outline.variant-info { color: var(--mcp-color-info); }

      /* Soft modifier - uses muted backgrounds */
      .soft.variant-primary {
        background: var(--mcp-color-primary-muted);
        color: var(--mcp-color-primary);
      }
      .soft.variant-secondary {
        background: var(--mcp-color-secondary-muted);
        color: var(--mcp-color-secondary);
      }
      .soft.variant-success {
        background: var(--mcp-color-success-muted);
        color: var(--mcp-color-success);
      }
      .soft.variant-warning {
        background: var(--mcp-color-warning-muted);
        color: var(--mcp-color-warning);
      }
      .soft.variant-error {
        background: var(--mcp-color-error-muted);
        color: var(--mcp-color-error);
      }
      .soft.variant-info {
        background: var(--mcp-color-info-muted);
        color: var(--mcp-color-info);
      }

      /* Dot indicator */
      .dot::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: currentColor;
      }
    `
];
vt([
  n({ type: String })
], ke.prototype, "variant", 2);
vt([
  n({ type: Boolean })
], ke.prototype, "outline", 2);
vt([
  n({ type: Boolean })
], ke.prototype, "soft", 2);
vt([
  n({ type: Boolean })
], ke.prototype, "dot", 2);
ke = vt([
  m("mcp-badge")
], ke);
var Zr = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, Ve = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? eo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Zr(e, o, r), r;
};
let se = class extends d {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.disabled = !1, this.loading = !1, this.type = "button";
  }
  render() {
    const t = {
      [`variant-${this.variant}`]: !0,
      [`size-${this.size}`]: !0,
      loading: this.loading
    };
    return c`
      <button
        part="button"
        class=${h(t)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? "true" : l}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
};
se.styles = [
  u,
  p`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--mcp-space-2);
        border: var(--mcp-border-width) solid transparent;
        border-radius: var(--mcp-radius-md);
        font-family: inherit;
        font-weight: var(--mcp-font-weight-medium);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        white-space: nowrap;
        text-decoration: none;
        width: 100%;
      }

      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      button:disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Sizes */
      .size-sm {
        height: 2rem;
        padding: 0 var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
      }

      .size-md {
        height: 2.5rem;
        padding: 0 var(--mcp-space-4);
        font-size: var(--mcp-font-size-sm);
      }

      .size-lg {
        height: 3rem;
        padding: 0 var(--mcp-space-6);
        font-size: var(--mcp-font-size-base);
      }

      /* Primary variant */
      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }
      .variant-primary:hover:not(:disabled) {
        background: var(--mcp-color-primary-hover);
      }
      .variant-primary:active:not(:disabled) {
        background: var(--mcp-color-primary-active);
      }

      /* Secondary variant */
      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }
      .variant-secondary:hover:not(:disabled) {
        background: var(--mcp-color-secondary-hover);
      }
      .variant-secondary:active:not(:disabled) {
        background: var(--mcp-color-secondary-active);
      }

      /* Tertiary variant (ghost-like) */
      .variant-tertiary {
        background: var(--mcp-color-tertiary);
        color: var(--mcp-color-tertiary-foreground);
        border-color: var(--mcp-color-border);
      }
      .variant-tertiary:hover:not(:disabled) {
        background: var(--mcp-color-tertiary-hover);
        border-color: var(--mcp-color-border-hover);
      }
      .variant-tertiary:active:not(:disabled) {
        background: var(--mcp-color-tertiary-active);
      }

      /* Success variant */
      .variant-success {
        background: var(--mcp-color-success);
        color: var(--mcp-color-success-foreground);
      }
      .variant-success:hover:not(:disabled) {
        background: var(--mcp-color-success-hover);
      }
      .variant-success:active:not(:disabled) {
        background: var(--mcp-color-success-active);
      }

      /* Warning variant */
      .variant-warning {
        background: var(--mcp-color-warning);
        color: var(--mcp-color-warning-foreground);
      }
      .variant-warning:hover:not(:disabled) {
        background: var(--mcp-color-warning-hover);
      }
      .variant-warning:active:not(:disabled) {
        background: var(--mcp-color-warning-active);
      }

      /* Error variant */
      .variant-error {
        background: var(--mcp-color-error);
        color: var(--mcp-color-error-foreground);
      }
      .variant-error:hover:not(:disabled) {
        background: var(--mcp-color-error-hover);
      }
      .variant-error:active:not(:disabled) {
        background: var(--mcp-color-error-active);
      }

      /* Info variant */
      .variant-info {
        background: var(--mcp-color-info);
        color: var(--mcp-color-info-foreground);
      }
      .variant-info:hover:not(:disabled) {
        background: var(--mcp-color-info-hover);
      }
      .variant-info:active:not(:disabled) {
        background: var(--mcp-color-info-active);
      }

      /* Loading state */
      .loading {
        position: relative;
        color: transparent !important;
      }
      .loading::after {
        content: '';
        position: absolute;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      .variant-primary.loading::after,
      .variant-success.loading::after,
      .variant-error.loading::after,
      .variant-warning.loading::after,
      .variant-info.loading::after {
        border-color: var(--mcp-color-primary-foreground);
        border-right-color: transparent;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Full width */
      :host([fullwidth]) {
        display: block;
      }

      ::slotted(svg) {
        width: 1em;
        height: 1em;
      }
    `
];
Ve([
  n({ type: String })
], se.prototype, "variant", 2);
Ve([
  n({ type: String })
], se.prototype, "size", 2);
Ve([
  n({ type: Boolean })
], se.prototype, "disabled", 2);
Ve([
  n({ type: Boolean })
], se.prototype, "loading", 2);
Ve([
  n({ type: String })
], se.prototype, "type", 2);
se = Ve([
  m("mcp-button")
], se);
var to = Object.defineProperty, ro = Object.getOwnPropertyDescriptor, X = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ro(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && to(e, o, r), r;
};
let P = class extends d {
  constructor() {
    super(...arguments), this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.size = "md", this.label = "", this.error = "", this.name = "", this.value = "";
  }
  _handleChange(t) {
    const e = t.target;
    this.checked = e.checked, this.indeterminate = !1, this.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { checked: this.checked, value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      disabled: this.disabled,
      [`size-${this.size}`]: !0
    }, e = {
      checkbox: !0,
      checked: this.checked,
      indeterminate: this.indeterminate,
      error: !!this.error
    };
    return c`
      <div>
        <label class=${h(t)}>
          <input
            type="checkbox"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            name=${this.name}
            value=${this.value}
            @change=${this._handleChange}
          />
          <span class=${h(e)} part="checkbox">
            ${this.indeterminate ? c`<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>` : c`<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`}
          </span>
          <span part="label">
            ${this.label ? this.label : c`<slot></slot>`}
          </span>
        </label>
        ${this.error ? c`<span class="error-text">${this.error}</span>` : l}
      </div>
    `;
  }
};
P.styles = [
  u,
  p`
      :host {
        display: inline-flex;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-2);
        cursor: pointer;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
      }

      label.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-sm);
        background: var(--mcp-color-background);
        transition: all var(--mcp-transition-fast);
        flex-shrink: 0;
      }

      .size-sm .checkbox { width: 1rem; height: 1rem; }
      .size-md .checkbox { width: 1.25rem; height: 1.25rem; }
      .size-lg .checkbox { width: 1.5rem; height: 1.5rem; }

      .checkbox.checked, .checkbox.indeterminate {
        background: var(--mcp-color-primary);
        border-color: var(--mcp-color-primary);
      }

      .checkbox.error {
        border-color: var(--mcp-color-error);
      }

      .checkbox svg {
        width: 100%;
        height: 100%;
        stroke: var(--mcp-color-primary-foreground);
        stroke-width: 3;
        fill: none;
        opacity: 0;
        transform: scale(0.5);
        transition: all var(--mcp-transition-fast);
      }

      .checkbox.checked svg, .checkbox.indeterminate svg {
        opacity: 1;
        transform: scale(1);
      }

      input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      label:focus-within .checkbox {
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .error-text {
        display: block;
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-error);
        margin-top: var(--mcp-space-1);
        margin-left: calc(1.25rem + var(--mcp-space-2));
      }
    `
];
X([
  n({ type: Boolean })
], P.prototype, "checked", 2);
X([
  n({ type: Boolean })
], P.prototype, "indeterminate", 2);
X([
  n({ type: Boolean })
], P.prototype, "disabled", 2);
X([
  n({ type: String })
], P.prototype, "size", 2);
X([
  n({ type: String })
], P.prototype, "label", 2);
X([
  n({ type: String })
], P.prototype, "error", 2);
X([
  n({ type: String })
], P.prototype, "name", 2);
X([
  n({ type: String })
], P.prototype, "value", 2);
P = X([
  m("mcp-checkbox")
], P);
var oo = Object.defineProperty, so = Object.getOwnPropertyDescriptor, Fe = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? so(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && oo(e, o, r), r;
};
let ae = class extends d {
  constructor() {
    super(...arguments), this.language = "", this.copyable = !0, this.code = "", this.inline = !1, this._copied = !1;
  }
  async _handleCopy() {
    const t = this.code || this.textContent || "";
    try {
      await navigator.clipboard.writeText(t.trim()), this._copied = !0, setTimeout(() => {
        this._copied = !1;
      }, 2e3);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }
  render() {
    const t = !this.inline && (this.language || this.copyable);
    return c`
      <div class="wrapper">
        ${t ? c`
          <div class="header">
            <span class="language">${this.language}</span>
            ${this.copyable ? c`
              <button class="copy-btn" @click=${this._handleCopy}>
                ${this._copied ? c`
                  <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  Copied!
                ` : c`
                  <svg viewBox="0 0 24 24">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy
                `}
              </button>
            ` : l}
          </div>
        ` : l}
        
        <pre><code>${this.code || c`<slot></slot>`}</code></pre>
      </div>
    `;
  }
};
ae.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .wrapper {
        position: relative;
        background: var(--mcp-color-ghost);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-2) var(--mcp-space-4);
        background: var(--mcp-color-border);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .language {
        font-weight: var(--mcp-font-weight-medium);
        text-transform: uppercase;
      }

      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        border: none;
        border-radius: var(--mcp-radius-sm);
        background: transparent;
        color: var(--mcp-color-ghost-foreground);
        font-size: var(--mcp-font-size-xs);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .copy-btn:hover {
        background: var(--mcp-color-background);
        color: var(--mcp-color-foreground);
      }

      .copy-btn svg {
        width: 0.875rem;
        height: 0.875rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }

      pre {
        margin: 0;
        padding: var(--mcp-space-4);
        overflow-x: auto;
        font-family: var(--mcp-font-family-mono);
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        color: var(--mcp-color-foreground);
      }

      code {
        font-family: inherit;
      }

      /* Inline code variant */
      :host([inline]) {
        display: inline;
      }

      :host([inline]) .wrapper {
        display: inline;
        padding: var(--mcp-space-1) var(--mcp-space-2);
        border-radius: var(--mcp-radius-sm);
      }

      :host([inline]) pre {
        display: inline;
        padding: 0;
      }

      :host([inline]) .header {
        display: none;
      }
    `
];
Fe([
  n({ type: String })
], ae.prototype, "language", 2);
Fe([
  n({ type: Boolean })
], ae.prototype, "copyable", 2);
Fe([
  n({ type: String })
], ae.prototype, "code", 2);
Fe([
  n({ type: Boolean, reflect: !0 })
], ae.prototype, "inline", 2);
Fe([
  z()
], ae.prototype, "_copied", 2);
ae = Fe([
  m("mcp-code")
], ae);
var ao = Object.defineProperty, io = Object.getOwnPropertyDescriptor, Ft = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? io(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ao(e, o, r), r;
};
let at = class extends d {
  constructor() {
    super(...arguments), this.vertical = !1, this.dashed = !1;
  }
  render() {
    return c`
      <div class="line"></div>
      <slot class="label"></slot>
      <div class="line"></div>
    `;
  }
};
at.styles = [
  u,
  p`
      :host {
        display: flex;
        align-items: center;
        width: 100%;
      }

      :host([vertical]) {
        flex-direction: column;
        width: auto;
        height: 100%;
        min-height: 1rem;
      }

      .line {
        flex: 1;
        height: 1px;
        background: var(--mcp-color-border);
      }

      :host([vertical]) .line {
        height: auto;
        width: 1px;
        min-height: inherit;
      }

      .label {
        padding: 0 var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
        white-space: nowrap;
      }

      :host([vertical]) .label {
        padding: var(--mcp-space-2) 0;
      }

      /* Dashed variant */
      :host([dashed]) .line {
        background: transparent;
        border-top: 1px dashed var(--mcp-color-border);
        height: 0;
      }

      :host([vertical][dashed]) .line {
        border-top: none;
        border-left: 1px dashed var(--mcp-color-border);
        width: 0;
      }
    `
];
Ft([
  n({ type: Boolean, reflect: !0 })
], at.prototype, "vertical", 2);
Ft([
  n({ type: Boolean, reflect: !0 })
], at.prototype, "dashed", 2);
at = Ft([
  m("mcp-divider")
], at);
var no = Object.defineProperty, co = Object.getOwnPropertyDescriptor, Oe = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? co(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && no(e, o, r), r;
};
let U = class extends d {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.disabled = !1, this.loading = !1, this.label = "", this.type = "button";
  }
  render() {
    const t = {
      [`variant-${this.variant}`]: !0,
      [`size-${this.size}`]: !0,
      loading: this.loading
    };
    return c`
      <button
        part="button"
        class=${h(t)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.label || l}
        aria-busy=${this.loading ? "true" : l}
      >
        <slot></slot>
      </button>
    `;
  }
};
U.styles = [
  u,
  p`
      :host {
        display: inline-flex;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: var(--mcp-radius-full);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        padding: 0;
      }

      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      button:disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      button:active:not(:disabled) {
        transform: scale(0.95);
      }

      /* Sizes */
      .size-sm {
        width: 1.75rem;
        height: 1.75rem;
      }
      .size-sm ::slotted(svg) {
        width: 0.875rem;
        height: 0.875rem;
      }

      .size-md {
        width: 2.25rem;
        height: 2.25rem;
      }
      .size-md ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }

      .size-lg {
        width: 2.75rem;
        height: 2.75rem;
      }
      .size-lg ::slotted(svg) {
        width: 1.25rem;
        height: 1.25rem;
      }

      /* Primary variant */
      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }
      .variant-primary:hover:not(:disabled) {
        background: var(--mcp-color-primary-hover);
      }

      /* Secondary variant */
      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }
      .variant-secondary:hover:not(:disabled) {
        background: var(--mcp-color-secondary-hover);
      }

      /* Tertiary variant */
      .variant-tertiary {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }
      .variant-tertiary:hover:not(:disabled) {
        background: var(--mcp-color-border);
      }

      /* Ghost variant */
      .variant-ghost {
        background: transparent;
        color: var(--mcp-color-ghost-foreground);
      }
      .variant-ghost:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }

      /* Loading state */
      .loading {
        position: relative;
        color: transparent !important;
      }
      .loading::after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      .variant-primary.loading::after {
        border-color: var(--mcp-color-primary-foreground);
        border-right-color: transparent;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Square modifier */
      :host([square]) button {
        border-radius: var(--mcp-radius-md);
      }

      /* Slot styling */
      ::slotted(svg) {
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
];
Oe([
  n({ type: String })
], U.prototype, "variant", 2);
Oe([
  n({ type: String })
], U.prototype, "size", 2);
Oe([
  n({ type: Boolean })
], U.prototype, "disabled", 2);
Oe([
  n({ type: Boolean })
], U.prototype, "loading", 2);
Oe([
  n({ type: String })
], U.prototype, "label", 2);
Oe([
  n({ type: String })
], U.prototype, "type", 2);
U = Oe([
  m("mcp-icon-button")
], U);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class It extends br {
  constructor(e) {
    if (super(e), this.it = l, e.type !== gr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === l || e == null) return this._t = void 0, this.it = e;
    if (e === oe) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const o = [e];
    return o.raw = o, this._t = { _$litType$: this.constructor.resultType, strings: o, values: [] };
  }
}
It.directiveName = "unsafeHTML", It.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Lt extends It {
}
Lt.directiveName = "unsafeSVG", Lt.resultType = 2;
const lo = fr(Lt);
var po = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, gt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ho(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && po(e, o, r), r;
};
const nr = {
  check: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
  x: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
  "chevron-down": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>',
  "chevron-up": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>',
  "chevron-left": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>',
  "chevron-right": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
  search: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>',
  spinner: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>',
  info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
  error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>',
  minus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>',
  menu: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>',
  copy: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
  external: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>'
};
let ze = class extends d {
  constructor() {
    super(...arguments), this.name = "", this.svg = "", this.spin = !1, this.label = "";
  }
  render() {
    const t = this.svg || nr[this.name] || "";
    return c`
      <svg
        viewBox="0 0 24 24"
        aria-hidden=${this.label ? "false" : "true"}
        aria-label=${this.label || ""}
        role=${this.label ? "img" : "presentation"}
      >
        ${lo(t)}
      </svg>
    `;
  }
  /** Register a custom icon for use with the name property */
  static registerIcon(t, e) {
    nr[t] = e;
  }
};
ze.styles = [
  u,
  p`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1em;
        height: 1em;
        color: inherit;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
      }

      :host([spin]) svg {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
];
gt([
  n({ type: String })
], ze.prototype, "name", 2);
gt([
  n({ type: String })
], ze.prototype, "svg", 2);
gt([
  n({ type: Boolean, reflect: !0 })
], ze.prototype, "spin", 2);
gt([
  n({ type: String })
], ze.prototype, "label", 2);
ze = gt([
  m("mcp-icon")
], ze);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = (t) => t ?? l;
var mo = Object.defineProperty, uo = Object.getOwnPropertyDescriptor, k = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? uo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && mo(e, o, r), r;
};
let w = class extends d {
  constructor() {
    super(...arguments), this.type = "text", this.value = "", this.placeholder = "", this.label = "", this.helper = "", this.error = "", this.disabled = !1, this.required = !1, this.readonly = !1, this.name = "", this.autocomplete = "";
  }
  get inputElement() {
    return this._input;
  }
  focus() {
    var t;
    (t = this._input) == null || t.focus();
  }
  select() {
    var t;
    (t = this._input) == null || t.select();
  }
  _handleInput(t) {
    const e = t.target;
    this.value = e.value, this.dispatchEvent(new CustomEvent("mcp-input", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleChange(t) {
    const e = t.target;
    this.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { value: e.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      "input-wrapper": !0,
      error: !!this.error,
      disabled: this.disabled
    };
    return c`
      <div class="wrapper">
        ${this.label ? c`<label part="label">${this.label}${this.required ? " *" : ""}</label>` : l}
        
        <div class=${h(t)}>
          <slot name="prefix"></slot>
          <input
            part="input"
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            name=${_e(this.name || void 0)}
            autocomplete=${_e(this.autocomplete || void 0)}
            minlength=${_e(this.minlength)}
            maxlength=${_e(this.maxlength)}
            aria-invalid=${this.error ? "true" : "false"}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <slot name="suffix"></slot>
        </div>

        ${this.error ? c`<span part="error" class="error-text">${this.error}</span>` : this.helper ? c`<span class="helper">${this.helper}</span>` : l}
      </div>
    `;
  }
};
w.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      label {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        transition: all var(--mcp-transition-fast);
        padding: 0 var(--mcp-space-3);
      }

      .input-wrapper:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .input-wrapper.error {
        border-color: var(--mcp-color-error);
      }

      .input-wrapper.error:focus-within {
        box-shadow: 0 0 0 3px var(--mcp-color-error-muted);
      }

      .input-wrapper.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-ghost);
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        padding: var(--mcp-space-2) 0;
        outline: none;
        min-width: 0;
      }

      input::placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      input:disabled {
        cursor: not-allowed;
      }

      .helper, .error-text {
        font-size: var(--mcp-font-size-xs);
      }

      .helper {
        color: var(--mcp-color-ghost-foreground);
      }

      .error-text {
        color: var(--mcp-color-error);
      }

      ::slotted(svg) {
        width: 1rem;
        height: 1rem;
        color: var(--mcp-color-ghost-foreground);
      }
    `
];
k([
  n({ type: String })
], w.prototype, "type", 2);
k([
  n({ type: String })
], w.prototype, "value", 2);
k([
  n({ type: String })
], w.prototype, "placeholder", 2);
k([
  n({ type: String })
], w.prototype, "label", 2);
k([
  n({ type: String })
], w.prototype, "helper", 2);
k([
  n({ type: String })
], w.prototype, "error", 2);
k([
  n({ type: Boolean })
], w.prototype, "disabled", 2);
k([
  n({ type: Boolean })
], w.prototype, "required", 2);
k([
  n({ type: Boolean })
], w.prototype, "readonly", 2);
k([
  n({ type: String })
], w.prototype, "name", 2);
k([
  n({ type: String })
], w.prototype, "autocomplete", 2);
k([
  n({ type: Number })
], w.prototype, "minlength", 2);
k([
  n({ type: Number })
], w.prototype, "maxlength", 2);
k([
  qe("input")
], w.prototype, "_input", 2);
w = k([
  m("mcp-input")
], w);
var vo = Object.defineProperty, go = Object.getOwnPropertyDescriptor, Pe = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? go(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && vo(e, o, r), r;
};
let q = class extends d {
  constructor() {
    super(...arguments), this.value = 0, this.label = "", this.showValue = !1, this.size = "md", this.variant = "default", this.indeterminate = !1;
  }
  render() {
    const t = {
      track: !0,
      [`size-${this.size}`]: !0
    }, e = {
      bar: !0,
      [`variant-${this.variant}`]: !0,
      indeterminate: this.indeterminate
    }, o = Math.min(100, Math.max(0, this.value));
    return c`
      <div class="wrapper">
        ${this.label || this.showValue ? c`
          <div class="header">
            ${this.label ? c`<span class="label">${this.label}</span>` : l}
            ${this.showValue && !this.indeterminate ? c`<span class="value">${o}%</span>` : l}
          </div>
        ` : l}
        
        <div 
          class=${h(t)}
          role="progressbar"
          aria-valuenow=${this.indeterminate ? l : o}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label=${this.label || "Progress"}
        >
          <div 
            class=${h(e)}
            style=${this.indeterminate ? "" : `width: ${o}%`}
          ></div>
        </div>
      </div>
    `;
  }
};
q.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      .header {
        display: flex;
        justify-content: space-between;
        font-size: var(--mcp-font-size-sm);
      }

      .label {
        color: var(--mcp-color-foreground);
      }

      .value {
        color: var(--mcp-color-ghost-foreground);
      }

      .track {
        height: 0.5rem;
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-full);
        overflow: hidden;
      }

      .track.size-sm { height: 0.25rem; }
      .track.size-lg { height: 0.75rem; }

      .bar {
        height: 100%;
        background: var(--mcp-color-primary);
        border-radius: inherit;
        transition: width var(--mcp-transition-normal);
      }

      .bar.variant-success { background: var(--mcp-color-success); }
      .bar.variant-warning { background: var(--mcp-color-warning); }
      .bar.variant-error { background: var(--mcp-color-error); }

      .bar.indeterminate {
        width: 30% !important;
        animation: indeterminate 1.5s ease-in-out infinite;
      }

      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
    `
];
Pe([
  n({ type: Number })
], q.prototype, "value", 2);
Pe([
  n({ type: String })
], q.prototype, "label", 2);
Pe([
  n({ type: Boolean, attribute: "show-value" })
], q.prototype, "showValue", 2);
Pe([
  n({ type: String })
], q.prototype, "size", 2);
Pe([
  n({ type: String })
], q.prototype, "variant", 2);
Pe([
  n({ type: Boolean })
], q.prototype, "indeterminate", 2);
q = Pe([
  m("mcp-progress")
], q);
var fo = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, Et = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? bo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && fo(e, o, r), r;
};
let Te = class extends d {
  constructor() {
    super(...arguments), this.width = "100%", this.height = "1rem", this.circle = !1;
  }
  render() {
    const t = `width: ${this.width}; height: ${this.height};`;
    return c`
      <div
        class="skeleton ${this.circle ? "circle" : ""}"
        part="skeleton"
        style=${t}
        aria-hidden="true"
      ></div>
    `;
  }
};
Te.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .skeleton {
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-md);
        animation: pulse 2s ease-in-out infinite;
      }

      .circle {
        border-radius: 50%;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `
];
Et([
  n({ type: String })
], Te.prototype, "width", 2);
Et([
  n({ type: String })
], Te.prototype, "height", 2);
Et([
  n({ type: Boolean })
], Te.prototype, "circle", 2);
Te = Et([
  m("mcp-skeleton")
], Te);
var yo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, Wt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? wo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && yo(e, o, r), r;
};
let it = class extends d {
  constructor() {
    super(...arguments), this.size = "md", this.label = "Loading";
  }
  render() {
    return c`
      <div
        class=${h({ spinner: !0, [`size-${this.size}`]: !0 })}
        part="spinner"
        role="status"
        aria-label=${this.label}
      ></div>
    `;
  }
};
it.styles = [
  u,
  p`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .spinner {
        border-radius: 50%;
        border: 2px solid var(--mcp-color-ghost);
        border-top-color: var(--mcp-color-primary);
        animation: spin 0.8s linear infinite;
      }

      .size-sm { width: 1rem; height: 1rem; }
      .size-md { width: 1.5rem; height: 1.5rem; }
      .size-lg { width: 2rem; height: 2rem; }
      .size-xl { width: 3rem; height: 3rem; }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
];
Wt([
  n({ type: String })
], it.prototype, "size", 2);
Wt([
  n({ type: String })
], it.prototype, "label", 2);
it = Wt([
  m("mcp-spinner")
], it);
var _o = Object.defineProperty, $o = Object.getOwnPropertyDescriptor, Ee = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? $o(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && _o(e, o, r), r;
};
let V = class extends d {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.size = "md", this.label = "", this.labelPosition = "right", this.name = "";
  }
  _handleChange(t) {
    const e = t.target;
    this.checked = e.checked, this.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { checked: this.checked },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      disabled: this.disabled,
      "label-left": this.labelPosition === "left",
      [`size-${this.size}`]: !0
    }, e = {
      track: !0,
      checked: this.checked
    };
    return c`
      <label class=${h(t)}>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          @change=${this._handleChange}
        />
        <span class=${h(e)} part="track">
          <span class="thumb" part="thumb"></span>
        </span>
        <span part="label">
          ${this.label ? this.label : c`<slot></slot>`}
        </span>
      </label>
    `;
  }
};
V.styles = [
  u,
  p`
      :host {
        display: inline-flex;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-3);
        cursor: pointer;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
      }

      label.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      label.label-left {
        flex-direction: row-reverse;
      }

      .track {
        position: relative;
        border-radius: var(--mcp-radius-full);
        background: var(--mcp-color-ghost);
        transition: background var(--mcp-transition-fast);
        flex-shrink: 0;
      }

      .size-sm .track { width: 2rem; height: 1.125rem; }
      .size-md .track { width: 2.5rem; height: 1.375rem; }
      .size-lg .track { width: 3rem; height: 1.625rem; }

      .track.checked {
        background: var(--mcp-color-primary);
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 50%;
        background: white;
        box-shadow: var(--mcp-shadow-sm);
        transition: transform var(--mcp-transition-fast);
      }

      .size-sm .thumb { width: 0.875rem; height: 0.875rem; }
      .size-md .thumb { width: 1.125rem; height: 1.125rem; }
      .size-lg .thumb { width: 1.375rem; height: 1.375rem; }

      .size-sm .track.checked .thumb { transform: translateX(0.875rem); }
      .size-md .track.checked .thumb { transform: translateX(1.125rem); }
      .size-lg .track.checked .thumb { transform: translateX(1.375rem); }

      input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      label:focus-within .track {
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }
    `
];
Ee([
  n({ type: Boolean })
], V.prototype, "checked", 2);
Ee([
  n({ type: Boolean })
], V.prototype, "disabled", 2);
Ee([
  n({ type: String })
], V.prototype, "size", 2);
Ee([
  n({ type: String })
], V.prototype, "label", 2);
Ee([
  n({ type: String, attribute: "label-position" })
], V.prototype, "labelPosition", 2);
Ee([
  n({ type: String })
], V.prototype, "name", 2);
V = Ee([
  m("mcp-switch")
], V);
var xo = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, We = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ko(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && xo(e, o, r), r;
};
let ie = class extends d {
  constructor() {
    super(...arguments), this.variant = "ghost", this.size = "md", this.removable = !1, this.clickable = !1, this.disabled = !1;
  }
  _handleClick(t) {
    (this.disabled || !this.clickable) && t.stopPropagation();
  }
  _handleRemove(t) {
    t.stopPropagation(), !this.disabled && this.dispatchEvent(new CustomEvent("mcp-remove", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      tag: !0,
      [`variant-${this.variant}`]: !0,
      [`size-${this.size}`]: !0,
      clickable: this.clickable && !this.disabled,
      disabled: this.disabled
    };
    return c`
      <span
        class=${h(t)}
        part="tag"
        role=${this.clickable ? "button" : "status"}
        tabindex=${this.clickable && !this.disabled ? "0" : "-1"}
        @click=${this._handleClick}
        @keydown=${(e) => e.key === "Enter" && this._handleClick(e)}
      >
        <slot name="icon"></slot>
        <slot></slot>
        ${this.removable && !this.disabled ? c`
            <span class="remove-container" part="remove-button" @click=${this._handleRemove}>
              <slot name="remove">
                <button
                  class="remove-btn"
                  type="button"
                  aria-label="Remove"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </slot>
            </span>
          ` : l}
      </span>
    `;
  }
};
ie.styles = [
  u,
  p`
      :host {
        display: inline-flex;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        border-radius: var(--mcp-radius-md);
        white-space: nowrap;
        transition: all var(--mcp-transition-fast);
        border: 1px solid transparent;
      }

      /* Sizes */
      .size-sm {
        padding: 0 var(--mcp-space-1);
        font-size: 0.625rem;
        gap: var(--mcp-space-1);
      }

      .size-lg {
        padding: var(--mcp-space-2) var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
        gap: var(--mcp-space-2);
      }

      /* Variants */
      .variant-ghost {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
        border-color: var(--mcp-color-border);
      }

      .variant-primary {
        background: var(--mcp-color-primary-muted);
        color: var(--mcp-color-primary);
        border-color: var(--mcp-color-primary);
      }

      .variant-secondary {
        background: var(--mcp-color-secondary-muted);
        color: var(--mcp-color-secondary);
        border-color: var(--mcp-color-secondary);
      }

      .variant-tertiary {
        background: var(--mcp-color-tertiary-hover);
        color: var(--mcp-color-tertiary-foreground);
        border-color: var(--mcp-color-border);
      }

      .variant-success {
        background: var(--mcp-color-success-muted);
        color: var(--mcp-color-success);
        border-color: var(--mcp-color-success);
      }

      .variant-warning {
        background: var(--mcp-color-warning-muted);
        color: var(--mcp-color-warning);
        border-color: var(--mcp-color-warning);
      }

      .variant-error {
        background: var(--mcp-color-error-muted);
        color: var(--mcp-color-error);
        border-color: var(--mcp-color-error);
      }

      .variant-info {
        background: var(--mcp-color-info-muted);
        color: var(--mcp-color-info);
        border-color: var(--mcp-color-info);
      }

      /* Clickable */
      .clickable {
        cursor: pointer;
      }

      .clickable:hover {
        filter: brightness(0.95);
      }

      .clickable:active {
        transform: scale(0.98);
      }

      /* Disabled */
      .disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Icon slot */
      ::slotted([slot="icon"]) {
        width: 0.875rem;
        height: 0.875rem;
      }

      .size-sm ::slotted([slot="icon"]) {
        width: 0.75rem;
        height: 0.75rem;
      }

      .size-lg ::slotted([slot="icon"]) {
        width: 1rem;
        height: 1rem;
      }

      /* Remove button */
      .remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        padding: 0;
        margin-left: var(--mcp-space-1);
        margin-right: calc(-1 * var(--mcp-space-1));
        border: none;
        background: transparent;
        border-radius: var(--mcp-radius-full);
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        transition: all var(--mcp-transition-fast);
      }

      .remove-btn:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.1);
      }

      .remove-btn svg {
        width: 0.625rem;
        height: 0.625rem;
        stroke: currentColor;
        stroke-width: 2.5;
        fill: none;
      }

      .size-sm .remove-btn {
        width: 0.75rem;
        height: 0.75rem;
      }

      .size-sm .remove-btn svg {
        width: 0.5rem;
        height: 0.5rem;
      }

      .size-lg .remove-btn {
        width: 1.25rem;
        height: 1.25rem;
      }

      .size-lg .remove-btn svg {
        width: 0.75rem;
        height: 0.75rem;
      }

      /* Slotted remove button */
      ::slotted([slot="remove"]) {
        margin-left: var(--mcp-space-1);
        cursor: pointer;
      }

      /* Hide default when slot is used */
      .remove-container:has(::slotted(*)) .remove-btn {
        display: none;
      }
    `
];
We([
  n({ type: String })
], ie.prototype, "variant", 2);
We([
  n({ type: String })
], ie.prototype, "size", 2);
We([
  n({ type: Boolean })
], ie.prototype, "removable", 2);
We([
  n({ type: Boolean })
], ie.prototype, "clickable", 2);
We([
  n({ type: Boolean })
], ie.prototype, "disabled", 2);
ie = We([
  m("mcp-tag")
], ie);
var zo = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, x = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Co(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && zo(e, o, r), r;
};
let y = class extends d {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this.label = "", this.helper = "", this.error = "", this.disabled = !1, this.required = !1, this.readonly = !1, this.autosize = !1, this.showCount = !1, this.rows = 3, this.name = "";
  }
  focus() {
    var t;
    (t = this._textarea) == null || t.focus();
  }
  _handleInput(t) {
    const e = t.target;
    this.value = e.value, this.autosize && (e.style.height = "auto", e.style.height = `${e.scrollHeight}px`), this.dispatchEvent(new CustomEvent("mcp-input", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleChange(t) {
    const e = t.target;
    this.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { value: e.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      error: !!this.error,
      autosize: this.autosize
    };
    return c`
      <div class="wrapper">
        ${this.label ? c`<label part="label">${this.label}${this.required ? " *" : ""}</label>` : l}
        
        <textarea
          part="textarea"
          class=${h(t)}
          .value=${this.value}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          name=${_e(this.name || void 0)}
          minlength=${_e(this.minlength)}
          maxlength=${_e(this.maxlength)}
          aria-invalid=${this.error ? "true" : "false"}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>

        ${this.showCount && this.maxlength ? c`<span class="char-count">${this.value.length}/${this.maxlength}</span>` : l}

        ${this.error ? c`<span class="error-text">${this.error}</span>` : this.helper ? c`<span class="helper">${this.helper}</span>` : l}
      </div>
    `;
  }
};
y.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      label {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      textarea {
        width: 100%;
        min-height: 5rem;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        resize: vertical;
        transition: all var(--mcp-transition-fast);
      }

      textarea::placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      textarea:focus {
        outline: none;
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      textarea.error {
        border-color: var(--mcp-color-error);
      }

      textarea.error:focus {
        box-shadow: 0 0 0 3px var(--mcp-color-error-muted);
      }

      textarea:disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-ghost);
      }

      textarea.autosize {
        resize: none;
        overflow: hidden;
      }

      .helper, .error-text {
        font-size: var(--mcp-font-size-xs);
      }

      .helper {
        color: var(--mcp-color-ghost-foreground);
      }

      .error-text {
        color: var(--mcp-color-error);
      }

      .char-count {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        text-align: right;
      }
    `
];
x([
  n({ type: String })
], y.prototype, "value", 2);
x([
  n({ type: String })
], y.prototype, "placeholder", 2);
x([
  n({ type: String })
], y.prototype, "label", 2);
x([
  n({ type: String })
], y.prototype, "helper", 2);
x([
  n({ type: String })
], y.prototype, "error", 2);
x([
  n({ type: Boolean })
], y.prototype, "disabled", 2);
x([
  n({ type: Boolean })
], y.prototype, "required", 2);
x([
  n({ type: Boolean })
], y.prototype, "readonly", 2);
x([
  n({ type: Boolean })
], y.prototype, "autosize", 2);
x([
  n({ type: Boolean })
], y.prototype, "showCount", 2);
x([
  n({ type: Number })
], y.prototype, "rows", 2);
x([
  n({ type: Number })
], y.prototype, "minlength", 2);
x([
  n({ type: Number })
], y.prototype, "maxlength", 2);
x([
  n({ type: String })
], y.prototype, "name", 2);
x([
  qe("textarea")
], y.prototype, "_textarea", 2);
y = x([
  m("mcp-textarea")
], y);
var So = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, Ge = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Oo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && So(e, o, r), r;
};
let ne = class extends d {
  constructor() {
    super(...arguments), this.content = "", this.position = "top", this.delay = 200, this.wrap = !1, this._visible = !1;
  }
  _show() {
    this._timeout = setTimeout(() => {
      this._visible = !0;
    }, this.delay);
  }
  _hide() {
    this._timeout && clearTimeout(this._timeout), this._visible = !1;
  }
  render() {
    const t = {
      tooltip: !0,
      visible: this._visible,
      wrap: this.wrap,
      [`position-${this.position}`]: !0
    };
    return c`
      <span
        class="trigger"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focus=${this._show}
        @blur=${this._hide}
      >
        <slot></slot>
      </span>
      <div class=${h(t)} role="tooltip">
        ${this.content || c`<slot name="content"></slot>`}
      </div>
    `;
  }
};
ne.styles = [
  u,
  p`
      :host {
        display: inline-block;
        position: relative;
      }

      .tooltip {
        position: absolute;
        z-index: var(--mcp-z-tooltip);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--mcp-color-foreground);
        color: var(--mcp-color-background);
        font-size: var(--mcp-font-size-xs);
        border-radius: var(--mcp-radius-md);
        white-space: nowrap;
        max-width: 20rem;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-fast), visibility var(--mcp-transition-fast);
        pointer-events: none;
      }

      .tooltip.visible {
        opacity: 1;
        visibility: visible;
      }

      .tooltip.wrap {
        white-space: normal;
      }

      /* Positions */
      .position-top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--mcp-space-2);
      }

      .position-bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--mcp-space-2);
      }

      .position-left {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--mcp-space-2);
      }

      .position-right {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--mcp-space-2);
      }

      /* Arrows */
      .tooltip::after {
        content: '';
        position: absolute;
        border: 6px solid transparent;
      }

      .position-top::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: var(--mcp-color-foreground);
      }

      .position-bottom::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: var(--mcp-color-foreground);
      }

      .position-left::after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: var(--mcp-color-foreground);
      }

      .position-right::after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: var(--mcp-color-foreground);
      }

      .trigger {
        display: inline-block;
      }
    `
];
Ge([
  n({ type: String })
], ne.prototype, "content", 2);
Ge([
  n({ type: String })
], ne.prototype, "position", 2);
Ge([
  n({ type: Number })
], ne.prototype, "delay", 2);
Ge([
  n({ type: Boolean })
], ne.prototype, "wrap", 2);
Ge([
  z()
], ne.prototype, "_visible", 2);
ne = Ge([
  m("mcp-tooltip")
], ne);
var Po = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, Mt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Eo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Po(e, o, r), r;
};
const Mo = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
};
let Ie = class extends d {
  constructor() {
    super(...arguments), this.variant = "info", this.title = "", this.dismissible = !1;
  }
  _handleDismiss() {
    this.dispatchEvent(new CustomEvent("mcp-close", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      alert: !0,
      [`variant-${this.variant}`]: !0
    };
    return c`
      <div class=${h(t)} role="alert" part="container">
        <div class="icon" part="icon">
          <slot name="icon">
            <svg class="default-icon" viewBox="0 0 24 24">
              <path d=${Mo[this.variant]} />
            </svg>
          </slot>
        </div>

        <div class="content" part="content">
          ${this.title ? c`<div class="title">${this.title}</div>` : l}
          <div class="description">
            <slot></slot>
          </div>
          <div class="actions">
            <slot name="action"></slot>
          </div>
        </div>

        ${this.dismissible ? c`
          <mcp-icon-button
            part="dismiss"
            variant="ghost"
            size="sm"
            label="Dismiss"
            @click=${this._handleDismiss}
          >
            <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </mcp-icon-button>
        ` : l}
      </div>
    `;
  }
};
Ie.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .alert {
        display: flex;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
        border-radius: var(--mcp-radius-lg);
        border: var(--mcp-border-width) solid transparent;
      }

      .variant-info {
        background: var(--mcp-color-info-muted);
        border-color: var(--mcp-color-info);
        color: var(--mcp-color-info);
      }

      .variant-success {
        background: var(--mcp-color-success-muted);
        border-color: var(--mcp-color-success);
        color: var(--mcp-color-success);
      }

      .variant-warning {
        background: var(--mcp-color-warning-muted);
        border-color: var(--mcp-color-warning);
        color: var(--mcp-color-warning);
      }

      .variant-error {
        background: var(--mcp-color-error-muted);
        border-color: var(--mcp-color-error);
        color: var(--mcp-color-error);
      }

      .icon {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
      }

      .icon svg,
      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* Hide default icon when slot is used */
      .icon:has(::slotted(*)) .default-icon {
        display: none;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-weight: var(--mcp-font-weight-semibold);
        margin-bottom: var(--mcp-space-1);
      }

      .description {
        color: var(--mcp-color-foreground);
        font-size: var(--mcp-font-size-sm);
      }

      .actions {
        margin-top: var(--mcp-space-3);
      }

      mcp-icon-button {
        flex-shrink: 0;
        opacity: 0.7;
      }

      mcp-icon-button:hover {
        opacity: 1;
      }
    `
];
Mt([
  n({ type: String })
], Ie.prototype, "variant", 2);
Mt([
  n({ type: String })
], Ie.prototype, "title", 2);
Mt([
  n({ type: Boolean })
], Ie.prototype, "dismissible", 2);
Ie = Mt([
  m("mcp-alert")
], Ie);
var Ao = Object.defineProperty, jo = Object.getOwnPropertyDescriptor, Gt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? jo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Ao(e, o, r), r;
};
let nt = class extends d {
  constructor() {
    super(...arguments), this.max = 5, this.size = "md";
  }
  render() {
    return c`
      <slot part="container"></slot>
    `;
  }
};
nt.styles = [
  u,
  p`
      :host {
        display: inline-flex;
        flex-direction: row-reverse;
      }

      ::slotted(mcp-avatar) {
        margin-left: -0.5rem;
        box-shadow: 0 0 0 2px var(--mcp-color-background);
      }

      ::slotted(mcp-avatar:last-child) {
        margin-left: 0;
      }

      .overflow {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
        border-radius: 50%;
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        margin-left: -0.5rem;
        box-shadow: 0 0 0 2px var(--mcp-color-background);
      }

      :host([size="sm"]) .overflow { width: 2rem; height: 2rem; }
      :host([size="md"]) .overflow { width: 2.5rem; height: 2.5rem; }
      :host([size="lg"]) .overflow { width: 3rem; height: 3rem; }
    `
];
Gt([
  n({ type: Number })
], nt.prototype, "max", 2);
Gt([
  n({ type: String, reflect: !0 })
], nt.prototype, "size", 2);
nt = Gt([
  m("mcp-avatar-group")
], nt);
var Bo = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, L = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Do(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Bo(e, o, r), r;
};
let O = class extends d {
  constructor() {
    super(...arguments), this.accept = "", this.multiple = !1, this.disabled = !1, this.compact = !1, this.label = "Drop files here or click to upload", this.hint = "", this.error = "", this.maxSize = 0, this._dragging = !1;
  }
  _handleDragOver(t) {
    t.preventDefault(), this.disabled || (this._dragging = !0);
  }
  _handleDragLeave(t) {
    t.preventDefault(), this._dragging = !1;
  }
  _handleDrop(t) {
    var o;
    if (t.preventDefault(), this._dragging = !1, this.disabled) return;
    const e = (o = t.dataTransfer) == null ? void 0 : o.files;
    e && e.length > 0 && this._processFiles(e, "drop");
  }
  _handleClick() {
    var e;
    if (this.disabled) return;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("input");
    t == null || t.click();
  }
  _handleInputChange(t) {
    const e = t.target;
    e.files && e.files.length > 0 && (this._processFiles(e.files, "select"), e.value = "");
  }
  _processFiles(t, e) {
    if (this.accept) {
      const s = this.accept.split(",").map((a) => a.trim().toLowerCase());
      if (Array.from(t).filter((a) => {
        var v;
        const i = "." + ((v = a.name.split(".").pop()) == null ? void 0 : v.toLowerCase()), g = a.type.toLowerCase();
        return s.some((f) => f.startsWith(".") ? i === f : f.endsWith("/*") ? g.startsWith(f.replace("/*", "/")) : g === f);
      }).length === 0)
        return;
    }
    if (this.maxSize > 0 && Array.from(t).filter((r) => r.size <= this.maxSize).length === 0)
      return;
    const o = e === "drop" ? "mcp-drop" : "mcp-select";
    this.dispatchEvent(new CustomEvent(o, {
      detail: { files: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      dropzone: !0,
      dragging: this._dragging,
      disabled: this.disabled,
      compact: this.compact,
      error: !!this.error
    };
    return c`
      <div
        class=${h(t)}
        part="dropzone"
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDrop}
        @click=${this._handleClick}
        role="button"
        tabindex=${this.disabled ? "-1" : "0"}
        @keydown=${(e) => e.key === "Enter" && this._handleClick()}
        aria-disabled=${this.disabled}
      >
        <slot name="icon">
          <div class="icon">
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
        </slot>

        <slot>
          <div class="text">
            <span class="primary-text">
              ${this._dragging ? "Drop files here" : c`<strong>Click to upload</strong> or drag and drop`}
            </span>
            ${this.hint && !this.compact ? c`<span class="secondary-text">${this.hint}</span>` : null}
          </div>
        </slot>

        <input
          part="input"
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this._handleInputChange}
        />
      </div>

      ${this.error ? c`<div class="error-message">${this.error}</div>` : null}
    `;
  }
};
O.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-8);
        border: 2px dashed var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        background: var(--mcp-color-background);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        text-align: center;
      }

      .dropzone:hover {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary-muted);
      }

      .dropzone.dragging {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary-muted);
        border-style: solid;
      }

      .dropzone.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      .dropzone.compact {
        padding: var(--mcp-space-4);
        flex-direction: row;
      }

      .dropzone.compact .icon {
        width: 1.5rem;
        height: 1.5rem;
      }

      .icon {
        width: 2.5rem;
        height: 2.5rem;
        color: var(--mcp-color-ghost-foreground);
      }

      .dragging .icon {
        color: var(--mcp-color-primary);
      }

      .icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 1.5;
        fill: none;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      .compact .text {
        flex-direction: row;
        gap: var(--mcp-space-2);
        align-items: center;
      }

      .primary-text {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .primary-text strong {
        color: var(--mcp-color-primary);
      }

      .secondary-text {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      input[type="file"] {
        display: none;
      }

      /* Error state */
      .error {
        border-color: var(--mcp-color-error);
      }

      .error:hover {
        background: var(--mcp-color-error-muted);
      }

      .error-message {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-error);
        margin-top: var(--mcp-space-2);
      }
    `
];
L([
  n({ type: String })
], O.prototype, "accept", 2);
L([
  n({ type: Boolean })
], O.prototype, "multiple", 2);
L([
  n({ type: Boolean })
], O.prototype, "disabled", 2);
L([
  n({ type: Boolean })
], O.prototype, "compact", 2);
L([
  n({ type: String })
], O.prototype, "label", 2);
L([
  n({ type: String })
], O.prototype, "hint", 2);
L([
  n({ type: String })
], O.prototype, "error", 2);
L([
  n({ type: Number })
], O.prototype, "maxSize", 2);
L([
  z()
], O.prototype, "_dragging", 2);
O = L([
  m("mcp-drop-zone")
], O);
var To = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, Xt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Io(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && To(e, o, r), r;
};
let ct = class extends d {
  constructor() {
    super(...arguments), this.title = "", this.description = "";
  }
  render() {
    return c`
      <div class="icon">
        <slot name="icon">
          <svg viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
        </slot>
      </div>

      ${this.title ? c`<h3 class="title">${this.title}</h3>` : l}
      
      <div class="description">
        ${this.description || c`<slot></slot>`}
      </div>

      <div class="actions">
        <slot name="action"></slot>
      </div>
    `;
  }
};
ct.styles = [
  u,
  p`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--mcp-space-8);
        text-align: center;
      }

      .icon {
        color: var(--mcp-color-ghost-foreground);
        margin-bottom: var(--mcp-space-4);
      }

      .icon svg {
        width: 3rem;
        height: 3rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
      }

      .title {
        font-size: var(--mcp-font-size-lg);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        margin-bottom: var(--mcp-space-2);
      }

      .description {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
        max-width: 24rem;
      }

      .actions {
        margin-top: var(--mcp-space-6);
        display: flex;
        gap: var(--mcp-space-3);
      }
    `
];
Xt([
  n({ type: String })
], ct.prototype, "title", 2);
Xt([
  n({ type: String })
], ct.prototype, "description", 2);
ct = Xt([
  m("mcp-empty")
], ct);
var Lo = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, Kt = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Ho(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Lo(e, o, r), r;
};
let lt = class extends d {
  constructor() {
    super(...arguments), this.size = "lg", this.overlay = !1;
  }
  render() {
    return c`
      <mcp-spinner part="spinner" size=${this.size}></mcp-spinner>
      <span class="message" part="message"><slot>Loading...</slot></span>
    `;
  }
};
lt.styles = [
  u,
  p`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-8);
      }

      :host([overlay]) {
        position: absolute;
        inset: 0;
        background: rgb(255 255 255 / 0.8);
        z-index: 10;
      }

      :host-context([data-theme="dark"])[overlay] {
        background: rgb(15 23 42 / 0.8);
      }

      .message {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
      }
    `
];
Kt([
  n({ type: String })
], lt.prototype, "size", 2);
Kt([
  n({ type: Boolean, reflect: !0 })
], lt.prototype, "overlay", 2);
lt = Kt([
  m("mcp-loading")
], lt);
var No = Object.defineProperty, Ro = Object.getOwnPropertyDescriptor, yr = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Ro(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && No(e, o, r), r;
};
let $t = class extends d {
  constructor() {
    super(...arguments), this.variant = "dots";
  }
  render() {
    const t = {
      bubble: !0,
      [`variant-${this.variant}`]: !0
    };
    return c`
      <div class="container" part="container">
        <div class="avatar">
          <slot name="avatar"></slot>
        </div>

        <div class="content-wrapper">
          <div class="label">
            <slot name="label"></slot>
          </div>

          <div class=${h(t)} part="bubble">
            <div class="dots" part="dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
$t.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: var(--mcp-space-2);
        align-items: flex-end;
      }

      /* Avatar */
      .avatar {
        flex-shrink: 0;
      }

      .avatar:empty {
        display: none;
      }

      /* Content wrapper */
      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      /* Bubble */
      .bubble {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-xl);
        border-bottom-left-radius: var(--mcp-radius-sm);
      }

      /* Label */
      .label {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        padding: 0 var(--mcp-space-1);
      }

      .label:empty {
        display: none;
      }

      /* Dots variant (default) */
      .dots {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0;
      }

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        background: var(--mcp-color-ghost-foreground);
        border-radius: var(--mcp-radius-full);
      }

      .variant-dots .dot {
        animation: dotBounce 1.4s ease-in-out infinite both;
      }

      .variant-dots .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .variant-dots .dot:nth-child(2) {
        animation-delay: 0.16s;
      }

      .variant-dots .dot:nth-child(3) {
        animation-delay: 0.32s;
      }

      @keyframes dotBounce {
        0%, 80%, 100% {
          transform: scale(0.6);
          opacity: 0.4;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Pulse variant */
      .variant-pulse .dot {
        animation: dotPulse 1.4s ease-in-out infinite;
      }

      .variant-pulse .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .variant-pulse .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .variant-pulse .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes dotPulse {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 1;
        }
      }

      /* Wave variant */
      .variant-wave .dot {
        animation: dotWave 1.2s ease-in-out infinite;
      }

      .variant-wave .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .variant-wave .dot:nth-child(2) {
        animation-delay: 0.15s;
      }

      .variant-wave .dot:nth-child(3) {
        animation-delay: 0.3s;
      }

      @keyframes dotWave {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-0.375rem);
        }
      }
    `
];
yr([
  n({ type: String })
], $t.prototype, "variant", 2);
$t = yr([
  m("mcp-message-typing")
], $t);
var Uo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, ft = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? qo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Uo(e, o, r), r;
};
let Ce = class extends d {
  constructor() {
    super(...arguments), this.placement = "bottom", this.trigger = "click", this.open = !1, this._isOpen = !1, this._handleOutsideClick = (t) => {
      this._isOpen && !this.contains(t.target) && this._close();
    }, this._handleEscape = (t) => {
      this._isOpen && t.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._handleOutsideClick), document.addEventListener("keydown", this._handleEscape);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._handleOutsideClick), document.removeEventListener("keydown", this._handleEscape), this._hoverTimeout && clearTimeout(this._hoverTimeout);
  }
  _toggle() {
    this._isOpen ? this._close() : this._open();
  }
  _open() {
    this._isOpen = !0, this.dispatchEvent(new CustomEvent("mcp-open", { bubbles: !0, composed: !0 }));
  }
  _close() {
    this._isOpen = !1, this.dispatchEvent(new CustomEvent("mcp-close", { bubbles: !0, composed: !0 }));
  }
  _handleTriggerClick() {
    this.trigger === "click" && this._toggle();
  }
  _handleMouseEnter() {
    this.trigger === "hover" && (this._hoverTimeout && clearTimeout(this._hoverTimeout), this._open());
  }
  _handleMouseLeave() {
    this.trigger === "hover" && (this._hoverTimeout = setTimeout(() => this._close(), 150));
  }
  updated(t) {
    t.has("open") && (this._isOpen = this.open);
  }
  render() {
    const t = {
      popover: !0,
      open: this._isOpen,
      [this.placement]: !0
    };
    return c`
      <div
        class="trigger"
        @click=${this._handleTriggerClick}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        <slot></slot>
      </div>
      <div
        class=${h(t)}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        role="dialog"
        aria-hidden=${!this._isOpen}
      >
        <div class="popover-content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
};
Ce.styles = [
  u,
  p`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: inline-block;
      }

      .popover {
        position: absolute;
        z-index: var(--mcp-z-dropdown);
        min-width: 12rem;
        max-width: 20rem;
        padding: var(--mcp-space-4);
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-fast), visibility var(--mcp-transition-fast);
      }

      .popover.open {
        opacity: 1;
        visibility: visible;
      }

      /* Placement */
      .popover.top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--mcp-space-2);
      }

      .popover.bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--mcp-space-2);
      }

      .popover.left {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--mcp-space-2);
      }

      .popover.right {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--mcp-space-2);
      }

      /* Arrow */
      .popover::before {
        content: '';
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        transform: rotate(45deg);
      }

      .popover.top::before {
        bottom: -0.3rem;
        left: 50%;
        margin-left: -0.25rem;
        border-top: none;
        border-left: none;
      }

      .popover.bottom::before {
        top: -0.3rem;
        left: 50%;
        margin-left: -0.25rem;
        border-bottom: none;
        border-right: none;
      }

      .popover.left::before {
        right: -0.3rem;
        top: 50%;
        margin-top: -0.25rem;
        border-bottom: none;
        border-left: none;
      }

      .popover.right::before {
        left: -0.3rem;
        top: 50%;
        margin-top: -0.25rem;
        border-top: none;
        border-right: none;
      }

      .popover-content {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
      }
    `
];
ft([
  n({ type: String })
], Ce.prototype, "placement", 2);
ft([
  n({ type: String })
], Ce.prototype, "trigger", 2);
ft([
  n({ type: Boolean })
], Ce.prototype, "open", 2);
ft([
  z()
], Ce.prototype, "_isOpen", 2);
Ce = ft([
  m("mcp-popover")
], Ce);
var Vo = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, Me = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Fo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Vo(e, o, r), r;
};
let F = class extends d {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "Search...", this.disabled = !1, this.loading = !1, this.size = "md";
  }
  focus() {
    var t;
    (t = this._input) == null || t.focus();
  }
  clear() {
    this.value = "", this._dispatchClear(), this.focus();
  }
  _handleInput(t) {
    const e = t.target;
    this.value = e.value, this.dispatchEvent(new CustomEvent("mcp-input", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleChange(t) {
    const e = t.target;
    this.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { value: e.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleKeydown(t) {
    t.key === "Enter" ? this.dispatchEvent(new CustomEvent("mcp-submit", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    })) : t.key === "Escape" && this.value && this.clear();
  }
  _dispatchClear() {
    this.dispatchEvent(new CustomEvent("mcp-clear", {
      bubbles: !0,
      composed: !0
    })), this.dispatchEvent(new CustomEvent("mcp-input", {
      detail: { value: "" },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      wrapper: !0,
      disabled: this.disabled,
      [`size-${this.size}`]: !0
    };
    return c`
      <div class=${h(t)} part="wrapper">
        <span class="search-icon" part="icon">
          <slot name="icon">
            <svg class="default-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </slot>
        </span>

        <input
          part="input"
          type="search"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @keydown=${this._handleKeydown}
        />

        ${this.loading ? c`<div class="loading-spinner"></div>` : this.value ? c`
              <span class="clear-container" part="clear-button" @click=${this.clear}>
                <slot name="clear">
                  <button
                    class="clear-btn"
                    type="button"
                    ?disabled=${this.disabled}
                    aria-label="Clear search"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </slot>
              </span>
            ` : l}
      </div>
    `;
  }
};
F.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        transition: all var(--mcp-transition-fast);
        padding: 0 var(--mcp-space-3);
      }

      .wrapper:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .wrapper.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-ghost);
      }

      /* Size variants */
      .wrapper.size-sm {
        padding: 0 var(--mcp-space-2);
      }

      .wrapper.size-lg {
        padding: 0 var(--mcp-space-4);
      }

      .search-icon {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        color: var(--mcp-color-ghost-foreground);
      }

      .search-icon svg,
      .search-icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      /* Hide default icon when slot is used */
      .search-icon:has(::slotted(*)) .default-icon {
        display: none;
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        padding: var(--mcp-space-2) 0;
        outline: none;
        min-width: 0;
      }

      .size-sm input {
        padding: var(--mcp-space-1) 0;
        font-size: var(--mcp-font-size-xs);
      }

      .size-lg input {
        padding: var(--mcp-space-3) 0;
        font-size: var(--mcp-font-size-base);
      }

      input::placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      input:disabled {
        cursor: not-allowed;
      }

      .clear-btn {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        padding: 0;
        border: none;
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-full);
        cursor: pointer;
        color: var(--mcp-color-ghost-foreground);
        transition: all var(--mcp-transition-fast);
      }

      .clear-btn:hover {
        background: var(--mcp-color-border);
        color: var(--mcp-color-foreground);
      }

      .clear-btn svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .loading-spinner {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        border: 2px solid var(--mcp-color-border);
        border-top-color: var(--mcp-color-primary);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Slotted clear button */
      .clear-container ::slotted(*) {
        cursor: pointer;
      }

      /* Hide default when slot is used */
      .clear-container:has(::slotted(*)) .clear-btn {
        display: none;
      }
    `
];
Me([
  n({ type: String })
], F.prototype, "value", 2);
Me([
  n({ type: String })
], F.prototype, "placeholder", 2);
Me([
  n({ type: Boolean })
], F.prototype, "disabled", 2);
Me([
  n({ type: Boolean })
], F.prototype, "loading", 2);
Me([
  n({ type: String })
], F.prototype, "size", 2);
Me([
  qe("input")
], F.prototype, "_input", 2);
F = Me([
  m("mcp-search-input")
], F);
var Wo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, C = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Go(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Wo(e, o, r), r;
};
let $ = class extends d {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.placeholder = "Select an option", this.label = "", this.helper = "", this.error = "", this.disabled = !1, this.required = !1, this.searchable = !1, this._open = !1, this._focusedIndex = -1, this._searchQuery = "", this._handleKeydown = (t) => {
      if (!this._open) {
        (t.key === "Enter" || t.key === " " || t.key === "ArrowDown") && (t.preventDefault(), this._toggle());
        return;
      }
      const e = this._filteredOptions;
      switch (t.key) {
        case "Escape":
          this._close(), this._trigger.focus();
          break;
        case "ArrowDown":
          t.preventDefault(), this._focusedIndex = Math.min(this._focusedIndex + 1, e.length - 1);
          break;
        case "ArrowUp":
          t.preventDefault(), this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
          break;
        case "Enter":
          t.preventDefault(), this._focusedIndex >= 0 && e[this._focusedIndex] && this._selectOption(e[this._focusedIndex]);
          break;
      }
    }, this._handleClickOutside = (t) => {
      this.contains(t.target) || this._close();
    };
  }
  get _filteredOptions() {
    return this._searchQuery ? this.options.filter(
      (t) => t.label.toLowerCase().includes(this._searchQuery.toLowerCase())
    ) : this.options;
  }
  get _selectedOption() {
    return this.options.find((t) => t.value === this.value);
  }
  _toggle() {
    this.disabled || (this._open = !this._open, this._focusedIndex = -1, this._searchQuery = "");
  }
  _close() {
    this._open = !1, this._focusedIndex = -1, this._searchQuery = "";
  }
  _selectOption(t) {
    t.disabled || (this.value = t.value, this._close(), this.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { value: t.value },
      bubbles: !0,
      composed: !0
    })));
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._handleClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._handleClickOutside);
  }
  render() {
    const t = {
      trigger: !0,
      open: this._open,
      error: !!this.error,
      disabled: this.disabled
    };
    return c`
      <div class="wrapper">
        ${this.label ? c`<label>${this.label}${this.required ? " *" : ""}</label>` : l}

        <div class="select-wrapper">
          <button
            class=${h(t)}
            @click=${this._toggle}
            @keydown=${this._handleKeydown}
            ?disabled=${this.disabled}
            aria-haspopup="listbox"
            aria-expanded=${this._open}
          >
            ${this._selectedOption ? c`<span>${this._selectedOption.label}</span>` : c`<span class="placeholder">${this.placeholder}</span>`}
            <svg class="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          <div class=${h({ dropdown: !0, open: this._open })} role="listbox">
            ${this.searchable ? c`
              <input
                class="search-input"
                type="text"
                placeholder="Search..."
                .value=${this._searchQuery}
                @input=${(e) => this._searchQuery = e.target.value}
                @click=${(e) => e.stopPropagation()}
              />
            ` : l}
            ${this._filteredOptions.map((e, o) => c`
              <div
                class=${h({
      option: !0,
      selected: e.value === this.value,
      disabled: !!e.disabled,
      focused: o === this._focusedIndex
    })}
                @click=${() => this._selectOption(e)}
                role="option"
                aria-selected=${e.value === this.value}
              >
                ${e.label}
              </div>
            `)}
          </div>
        </div>

        ${this.error ? c`<span class="error-text">${this.error}</span>` : this.helper ? c`<span class="helper">${this.helper}</span>` : l}
      </div>
    `;
  }
};
$.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      label {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .select-wrapper {
        position: relative;
      }

      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        text-align: left;
      }

      .trigger:focus {
        outline: none;
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .trigger.error {
        border-color: var(--mcp-color-error);
      }

      .trigger.error:focus {
        box-shadow: 0 0 0 3px var(--mcp-color-error-muted);
      }

      .trigger.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-ghost);
      }

      .trigger.open {
        border-color: var(--mcp-color-primary);
      }

      .placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      .chevron {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        transition: transform var(--mcp-transition-fast);
      }

      .trigger.open .chevron {
        transform: rotate(180deg);
      }

      .dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        box-shadow: var(--mcp-shadow-lg);
        z-index: var(--mcp-z-dropdown);
        max-height: 15rem;
        overflow-y: auto;
        display: none;
      }

      .dropdown.open {
        display: block;
      }

      .option {
        display: flex;
        align-items: center;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
        cursor: pointer;
        transition: background var(--mcp-transition-fast);
      }

      .option:hover:not(.disabled) {
        background: var(--mcp-color-ghost);
      }

      .option.selected {
        background: var(--mcp-color-primary-muted);
        color: var(--mcp-color-primary);
      }

      .option.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      .option.focused {
        background: var(--mcp-color-ghost);
      }

      .helper, .error-text {
        font-size: var(--mcp-font-size-xs);
      }

      .helper {
        color: var(--mcp-color-ghost-foreground);
      }

      .error-text {
        color: var(--mcp-color-error);
      }

      .search-input {
        width: 100%;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: none;
        border-bottom: 1px solid var(--mcp-color-border);
        font-size: var(--mcp-font-size-sm);
        outline: none;
      }
    `
];
C([
  n({ type: Array })
], $.prototype, "options", 2);
C([
  n({ type: String })
], $.prototype, "value", 2);
C([
  n({ type: String })
], $.prototype, "placeholder", 2);
C([
  n({ type: String })
], $.prototype, "label", 2);
C([
  n({ type: String })
], $.prototype, "helper", 2);
C([
  n({ type: String })
], $.prototype, "error", 2);
C([
  n({ type: Boolean })
], $.prototype, "disabled", 2);
C([
  n({ type: Boolean })
], $.prototype, "required", 2);
C([
  n({ type: Boolean })
], $.prototype, "searchable", 2);
C([
  z()
], $.prototype, "_open", 2);
C([
  z()
], $.prototype, "_focusedIndex", 2);
C([
  z()
], $.prototype, "_searchQuery", 2);
C([
  qe(".trigger")
], $.prototype, "_trigger", 2);
$ = C([
  m("mcp-select")
], $);
var Xo = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, wr = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Ko(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Xo(e, o, r), r;
};
let xt = class extends d {
  constructor() {
    super(...arguments), this.lines = 3;
  }
  render() {
    return c`
      ${Array.from(
      { length: this.lines },
      () => c`<mcp-skeleton height="0.875rem"></mcp-skeleton>`
    )}
    `;
  }
};
xt.styles = [
  u,
  p`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      mcp-skeleton:last-child {
        width: 80%;
      }
    `
];
wr([
  n({ type: Number })
], xt.prototype, "lines", 2);
xt = wr([
  m("mcp-skeleton-text")
], xt);
var Yo = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, K = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Jo(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Yo(e, o, r), r;
};
const Qo = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
};
let W = class extends d {
  constructor() {
    super(...arguments), this.variant = "info", this.title = "", this.message = "", this.dismissible = !0, this.duration = 5e3, this._exiting = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.duration > 0 && (this._timeout = setTimeout(() => this._dismiss(), this.duration));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._timeout && clearTimeout(this._timeout);
  }
  _dismiss() {
    this._exiting = !0, setTimeout(() => {
      this.dispatchEvent(new CustomEvent("mcp-close", { bubbles: !0, composed: !0 }));
    }, 200);
  }
  render() {
    const t = {
      toast: !0,
      [`variant-${this.variant}`]: !0,
      exiting: this._exiting
    };
    return c`
      <div class=${h(t)} role="alert" part="container">
        <div class="icon" part="icon">
          <slot name="icon">
            <svg class="default-icon" viewBox="0 0 24 24"><path d=${Qo[this.variant]}/></svg>
          </slot>
        </div>
        <div class="content" part="content">
          ${this.title ? c`<div class="title">${this.title}</div>` : l}
          ${this.message ? c`<div class="message">${this.message}</div>` : l}
          <slot></slot>
          <div class="action">
            <slot name="action"></slot>
          </div>
        </div>
        ${this.dismissible ? c`
          <mcp-icon-button
            part="close"
            variant="ghost"
            size="sm"
            label="Dismiss"
            @click=${this._dismiss}
          >
            <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </mcp-icon-button>
        ` : l}
      </div>
    `;
  }
};
W.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
        background: var(--mcp-color-background);
        border: var(--mcp-border-width) solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        min-width: 20rem;
        max-width: 28rem;
        animation: slideIn var(--mcp-transition-normal);
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .toast.exiting {
        animation: slideOut var(--mcp-transition-normal) forwards;
      }

      @keyframes slideOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      .icon {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
      }

      .icon svg,
      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }

      /* Hide default icon when slot is used */
      .icon:has(::slotted(*)) .default-icon {
        display: none;
      }

      .variant-info .icon { color: var(--mcp-color-info); }
      .variant-success .icon { color: var(--mcp-color-success); }
      .variant-warning .icon { color: var(--mcp-color-warning); }
      .variant-error .icon { color: var(--mcp-color-error); }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-weight: var(--mcp-font-weight-semibold);
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        margin-bottom: var(--mcp-space-1);
      }

      .message {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
      }

      mcp-icon-button {
        flex-shrink: 0;
      }

      .action {
        margin-top: var(--mcp-space-2);
      }
    `
];
K([
  n({ type: String })
], W.prototype, "variant", 2);
K([
  n({ type: String })
], W.prototype, "title", 2);
K([
  n({ type: String })
], W.prototype, "message", 2);
K([
  n({ type: Boolean })
], W.prototype, "dismissible", 2);
K([
  n({ type: Number })
], W.prototype, "duration", 2);
K([
  z()
], W.prototype, "_exiting", 2);
W = K([
  m("mcp-toast")
], W);
let kt = class extends d {
  constructor() {
    super(...arguments), this.position = "top-right";
  }
  render() {
    return c`<slot></slot>`;
  }
};
kt.styles = [
  u,
  p`
      :host {
        position: fixed;
        z-index: var(--mcp-z-toast);
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
        pointer-events: none;
      }

      :host([position="top-right"]) { top: 0; right: 0; }
      :host([position="top-left"]) { top: 0; left: 0; }
      :host([position="bottom-right"]) { bottom: 0; right: 0; }
      :host([position="bottom-left"]) { bottom: 0; left: 0; }
      :host([position="top-center"]) { top: 0; left: 50%; transform: translateX(-50%); }
      :host([position="bottom-center"]) { bottom: 0; left: 50%; transform: translateX(-50%); }

      ::slotted(mcp-toast) {
        pointer-events: auto;
      }
    `
];
K([
  n({ type: String, reflect: !0 })
], kt.prototype, "position", 2);
kt = K([
  m("mcp-toaster")
], kt);
var Zo = Object.defineProperty, es = Object.getOwnPropertyDescriptor, Ae = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? es(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Zo(e, o, r), r;
};
let pt = class extends d {
  constructor() {
    super(...arguments), this.multiple = !1, this._openItems = /* @__PURE__ */ new Set();
  }
  toggleItem(t) {
    this._openItems.has(t) ? this._openItems.delete(t) : (this.multiple || this._openItems.clear(), this._openItems.add(t)), this._openItems = new Set(this._openItems), this.requestUpdate();
  }
  isOpen(t) {
    return this._openItems.has(t);
  }
  render() {
    return c`<slot></slot>`;
  }
};
pt.styles = [
  u,
  p`
      :host {
        display: block;
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      ::slotted(mcp-accordion-item:not(:last-child)) {
        border-bottom: 1px solid var(--mcp-color-border);
      }
    `
];
Ae([
  n({ type: Boolean })
], pt.prototype, "multiple", 2);
Ae([
  z()
], pt.prototype, "_openItems", 2);
pt = Ae([
  m("mcp-accordion")
], pt);
let Le = class extends d {
  constructor() {
    super(...arguments), this.value = "", this.disabled = !1, this.defaultOpen = !1;
  }
  get _accordion() {
    return this.closest("mcp-accordion");
  }
  get _isOpen() {
    var t;
    return ((t = this._accordion) == null ? void 0 : t.isOpen(this.value)) ?? this.defaultOpen;
  }
  connectedCallback() {
    super.connectedCallback(), this.defaultOpen && this._accordion && this._accordion.toggleItem(this.value);
  }
  _toggle() {
    var t;
    this.disabled || ((t = this._accordion) == null || t.toggleItem(this.value), this.dispatchEvent(new CustomEvent("mcp-toggle", {
      detail: { value: this.value, open: this._isOpen },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    return c`
      <button
        class="header"
        @click=${this._toggle}
        ?disabled=${this.disabled}
        aria-expanded=${this._isOpen}
      >
        <slot name="header"></slot>
        <svg class=${h({ icon: !0, open: this._isOpen })} viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div class=${h({ content: !0, open: this._isOpen })}>
        <div class="content-inner">
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
Le.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--mcp-space-4);
        border: none;
        background: var(--mcp-color-background);
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
        cursor: pointer;
        text-align: left;
        transition: background var(--mcp-transition-fast);
      }

      .header:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
      }

      .header:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .header:focus {
        outline: none;
        background: var(--mcp-color-ghost);
      }

      .icon {
        width: 1.25rem;
        height: 1.25rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        transition: transform var(--mcp-transition-fast);
        flex-shrink: 0;
      }

      .icon.open {
        transform: rotate(180deg);
      }

      .content {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--mcp-transition-normal);
      }

      .content.open {
        grid-template-rows: 1fr;
      }

      .content-inner {
        overflow: hidden;
      }

      .content-inner > div {
        padding: 0 var(--mcp-space-4) var(--mcp-space-4);
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
      }
    `
];
Ae([
  n({ type: String })
], Le.prototype, "value", 2);
Ae([
  n({ type: Boolean })
], Le.prototype, "disabled", 2);
Ae([
  n({ type: Boolean, attribute: "default-open" })
], Le.prototype, "defaultOpen", 2);
Le = Ae([
  m("mcp-accordion-item")
], Le);
var ts = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, At = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? rs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ts(e, o, r), r;
};
let zt = class extends d {
  constructor() {
    super(...arguments), this.separator = "/";
  }
  render() {
    return c`
      <nav aria-label="Breadcrumb" style="--separator: '${this.separator}'">
        <slot></slot>
      </nav>
    `;
  }
};
zt.styles = [
  u,
  p`
      :host {
        display: block;
      }

      nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-sm);
      }

      ::slotted(mcp-breadcrumb-item:not(:last-child))::after {
        content: var(--separator, '/');
        margin-left: var(--mcp-space-2);
        color: var(--mcp-color-ghost-foreground);
      }
    `
];
At([
  n({ type: String })
], zt.prototype, "separator", 2);
zt = At([
  m("mcp-breadcrumb")
], zt);
let Ct = class extends d {
  constructor() {
    super(...arguments), this.href = "";
  }
  _handleClick(t) {
    this.href && (t.preventDefault(), this.dispatchEvent(new CustomEvent("mcp-navigate", {
      detail: { href: this.href },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    return this.href ? c`
        <a href=${this.href} @click=${this._handleClick}>
          <slot></slot>
        </a>
      ` : c`<span><slot></slot></span>`;
  }
};
Ct.styles = [
  u,
  p`
      :host {
        display: inline-flex;
        align-items: center;
      }

      a, span {
        color: var(--mcp-color-ghost-foreground);
        text-decoration: none;
        transition: color var(--mcp-transition-fast);
      }

      a:hover {
        color: var(--mcp-color-primary);
        text-decoration: underline;
      }

      a:focus-visible {
        outline: none;
        border-radius: var(--mcp-radius-sm);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      :host(:last-child) span,
      :host(:last-child) a {
        color: var(--mcp-color-foreground);
        font-weight: var(--mcp-font-weight-medium);
        pointer-events: none;
      }

      .icon {
        display: flex;
        align-items: center;
        margin-right: var(--mcp-space-1);
      }

      .icon svg {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
];
At([
  n({ type: String })
], Ct.prototype, "href", 2);
Ct = At([
  m("mcp-breadcrumb-item")
], Ct);
var os = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, Xe = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ss(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && os(e, o, r), r;
};
let ce = class extends d {
  constructor() {
    super(...arguments), this.elevated = !1, this.interactive = !1, this.selected = !1, this.compact = !1, this.noHeaderBorder = !1;
  }
  _handleClick() {
    this.interactive && this.dispatchEvent(new CustomEvent("mcp-select", {
      detail: { selected: !this.selected },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      card: !0,
      elevated: this.elevated,
      interactive: this.interactive,
      selected: this.selected
    }, e = {
      header: !0,
      "no-border": this.noHeaderBorder
    }, o = {
      content: !0,
      compact: this.compact
    };
    return c`
      <div
        part="card"
        class=${h(t)}
        @click=${this._handleClick}
        role=${this.interactive ? "button" : "region"}
        tabindex=${this.interactive ? "0" : "-1"}
      >
        <div part="header" class=${h(e)}>
          <slot name="header"></slot>
        </div>
        <div part="content" class=${h(o)}>
          <slot></slot>
        </div>
        <div part="footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
};
ce.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .card {
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      .card.elevated {
        border: none;
        box-shadow: var(--mcp-shadow-md);
      }

      .card.interactive {
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .card.interactive:hover {
        border-color: var(--mcp-color-border-hover);
        box-shadow: var(--mcp-shadow-md);
      }

      .card.elevated.interactive:hover {
        box-shadow: var(--mcp-shadow-lg);
        transform: translateY(-1px);
      }

      .card.selected {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 1px var(--mcp-color-primary);
      }

      .header {
        padding: var(--mcp-space-4);
        border-bottom: 1px solid var(--mcp-color-border);
      }

      .header.no-border {
        border-bottom: none;
      }

      .content {
        padding: var(--mcp-space-4);
      }

      .content.compact {
        padding: var(--mcp-space-3);
      }

      .footer {
        padding: var(--mcp-space-4);
        border-top: 1px solid var(--mcp-color-border);
        background: var(--mcp-color-ghost);
      }

      /* Hide empty slots */
      .header:not(:has(::slotted(*))) {
        display: none;
      }

      .footer:not(:has(::slotted(*))) {
        display: none;
      }
    `
];
Xe([
  n({ type: Boolean })
], ce.prototype, "elevated", 2);
Xe([
  n({ type: Boolean })
], ce.prototype, "interactive", 2);
Xe([
  n({ type: Boolean })
], ce.prototype, "selected", 2);
Xe([
  n({ type: Boolean })
], ce.prototype, "compact", 2);
Xe([
  n({ type: Boolean, attribute: "no-header-border" })
], ce.prototype, "noHeaderBorder", 2);
ce = Xe([
  m("mcp-card")
], ce);
var as = Object.defineProperty, is = Object.getOwnPropertyDescriptor, Ke = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? is(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && as(e, o, r), r;
};
let le = class extends d {
  constructor() {
    super(...arguments), this.open = !1, this.position = "left", this.title = "", this.modal = !0, this.closeOnOverlay = !0;
  }
  _handleOverlayClick() {
    this.closeOnOverlay && this._close();
  }
  _close() {
    this.open = !1, this.dispatchEvent(new CustomEvent("mcp-close", {
      bubbles: !0,
      composed: !0
    }));
  }
  show() {
    this.open = !0, this.dispatchEvent(new CustomEvent("mcp-open", {
      bubbles: !0,
      composed: !0
    }));
  }
  hide() {
    this._close();
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  render() {
    const t = {
      container: !0,
      [`position-${this.position}`]: !0,
      open: this.open
    }, e = {
      overlay: !0,
      open: this.open && this.modal
    };
    return c`
      ${this.modal ? c`
        <div
          class=${h(e)}
          part="overlay"
          @click=${this._handleOverlayClick}
        ></div>
      ` : l}

      <aside class=${h(t)} part="container">
        <div class="header" part="header">
          <slot name="header">
            ${this.title ? c`<span class="header-title">${this.title}</span>` : l}
          </slot>
          <mcp-icon-button
            variant="ghost"
            size="sm"
            label="Close"
            @click=${this._close}
          >
            <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </mcp-icon-button>
        </div>

        <div class="body" part="body">
          <slot></slot>
        </div>

        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </aside>
    `;
  }
};
le.styles = [
  u,
  p`
      :host {
        display: contents;
      }

      /* Overlay backdrop */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-normal), visibility var(--mcp-transition-normal);
        z-index: 999;
      }

      .overlay.open {
        opacity: 1;
        visibility: visible;
      }

      /* Drawer container */
      .container {
        position: fixed;
        top: 0;
        bottom: 0;
        width: var(--mcp-drawer-width, 280px);
        max-width: calc(100vw - 3rem);
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        display: flex;
        flex-direction: column;
        transition: transform var(--mcp-transition-normal);
        z-index: 1000;
      }

      /* Left position */
      .position-left {
        left: 0;
        transform: translateX(-100%);
        border-left: none;
        border-top-right-radius: var(--mcp-radius-lg);
        border-bottom-right-radius: var(--mcp-radius-lg);
      }

      .position-left.open {
        transform: translateX(0);
      }

      /* Right position */
      .position-right {
        right: 0;
        transform: translateX(100%);
        border-right: none;
        border-top-left-radius: var(--mcp-radius-lg);
        border-bottom-left-radius: var(--mcp-radius-lg);
      }

      .position-right.open {
        transform: translateX(0);
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-bottom: 1px solid var(--mcp-color-border);
        flex-shrink: 0;
      }

      .header:empty {
        display: none;
      }

      .header-title {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
      }

      /* Body */
      .body {
        flex: 1;
        overflow-y: auto;
        padding: var(--mcp-space-3);
      }

      /* Footer */
      .footer {
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-top: 1px solid var(--mcp-color-border);
        flex-shrink: 0;
      }

      .footer:empty {
        display: none;
      }
    `
];
Ke([
  n({ type: Boolean, reflect: !0 })
], le.prototype, "open", 2);
Ke([
  n({ type: String })
], le.prototype, "position", 2);
Ke([
  n({ type: String })
], le.prototype, "title", 2);
Ke([
  n({ type: Boolean })
], le.prototype, "modal", 2);
Ke([
  n({ type: Boolean })
], le.prototype, "closeOnOverlay", 2);
le = Ke([
  m("mcp-drawer")
], le);
var ns = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, Ye = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? cs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ns(e, o, r), r;
};
let pe = class extends d {
  constructor() {
    super(...arguments), this.role = "assistant", this.timestamp = "", this.loading = !1, this.copyable = !0, this._copied = !1;
  }
  /** Get role-specific avatar variant */
  get _avatarVariant() {
    switch (this.role) {
      case "user":
        return "primary";
      case "assistant":
        return "secondary";
      case "system":
        return "info";
      case "tool":
        return "success";
    }
  }
  /** Get role-specific icon */
  get _roleIcon() {
    switch (this.role) {
      case "user":
        return c`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      case "assistant":
        return c`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
      case "system":
        return c`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
      case "tool":
        return c`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    }
  }
  async _handleCopy() {
    var e;
    const t = ((e = this.textContent) == null ? void 0 : e.trim()) || "";
    try {
      await navigator.clipboard.writeText(t), this._copied = !0, setTimeout(() => {
        this._copied = !1;
      }, 2e3);
    } catch (o) {
      console.error("Failed to copy:", o);
    }
  }
  render() {
    return c`
      <div class="wrapper">
        <div class="avatar" part="avatar">
          <slot name="avatar">
            <mcp-avatar variant=${this._avatarVariant} size="md">
              ${this._roleIcon}
            </mcp-avatar>
          </slot>
        </div>
        <div class="content" part="content">
          <div class="header">
            <span class="role-label">${this.role}</span>
            ${this.timestamp ? c`<span class="timestamp">${this.timestamp}</span>` : l}
          </div>
          <div class="body">
            ${this.loading ? c`
              <div class="loading">
                <span></span><span></span><span></span>
              </div>
            ` : c`<slot></slot>`}
          </div>
          ${this.copyable && !this.loading ? c`
            <div class="actions">
              <button class="copy-btn" @click=${this._handleCopy}>
                ${this._copied ? c`
                  <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  Copied
                ` : c`
                  <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  Copy
                `}
              </button>
            </div>
          ` : l}
        </div>
      </div>
    `;
  }
};
pe.styles = [
  u,
  p`
      :host {
        display: block;
      }

      /* Role-specific backgrounds - applied to host for full-width effect */
      :host([role="user"]) {
        background: var(--mcp-color-ghost);
      }

      :host([role="assistant"]) {
        background: var(--mcp-color-background);
      }

      :host([role="system"]) {
        background: var(--mcp-color-info-muted);
        border-left: 3px solid var(--mcp-color-info);
      }

      :host([role="tool"]) {
        background: var(--mcp-color-success-muted);
        border-left: 3px solid var(--mcp-color-success);
      }

      .wrapper {
        display: flex;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
      }

      /* Avatar styling */
      .avatar {
        flex-shrink: 0;
      }

      mcp-avatar {
        --avatar-size: 2rem;
      }

      /* Content area */
      .content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
      }

      .role-label {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        text-transform: capitalize;
      }

      .timestamp {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .body {
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        color: var(--mcp-color-foreground);
      }

      .body ::slotted(p) {
        margin: 0 0 var(--mcp-space-2);
      }

      .body ::slotted(p:last-child) {
        margin-bottom: 0;
      }

      /* Loading animation */
      .loading {
        display: flex;
        gap: var(--mcp-space-1);
      }

      .loading span {
        width: 0.5rem;
        height: 0.5rem;
        background: var(--mcp-color-ghost-foreground);
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out both;
      }

      .loading span:nth-child(1) { animation-delay: -0.32s; }
      .loading span:nth-child(2) { animation-delay: -0.16s; }

      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }

      /* Actions */
      .actions {
        display: flex;
        gap: var(--mcp-space-2);
      }

      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        border: none;
        background: transparent;
        border-radius: var(--mcp-radius-sm);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .copy-btn:hover {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }

      .copy-btn svg {
        width: 0.875rem;
        height: 0.875rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
];
Ye([
  n({ type: String, reflect: !0 })
], pe.prototype, "role", 2);
Ye([
  n({ type: String })
], pe.prototype, "timestamp", 2);
Ye([
  n({ type: Boolean })
], pe.prototype, "loading", 2);
Ye([
  n({ type: Boolean })
], pe.prototype, "copyable", 2);
Ye([
  z()
], pe.prototype, "_copied", 2);
pe = Ye([
  m("mcp-chat-message")
], pe);
var ls = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, H = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ps(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ls(e, o, r), r;
};
let He = class extends d {
  constructor() {
    super(...arguments), this.layout = "vertical", this.bordered = !1, this.striped = !1;
  }
  render() {
    const t = {
      list: !0,
      [this.layout]: !0,
      bordered: this.bordered,
      striped: this.striped
    };
    return c`
      <div class=${h(t)} role="list">
        <slot></slot>
      </div>
    `;
  }
};
He.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      .list.horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--mcp-space-4);
      }

      .list.grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--mcp-space-3);
      }

      .list.bordered {
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        padding: var(--mcp-space-4);
      }

      .list.striped ::slotted(mcp-kv-item:nth-child(odd)) {
        background: var(--mcp-color-ghost);
      }
    `
];
H([
  n({ type: String })
], He.prototype, "layout", 2);
H([
  n({ type: Boolean })
], He.prototype, "bordered", 2);
H([
  n({ type: Boolean })
], He.prototype, "striped", 2);
He = H([
  m("mcp-kv")
], He);
let de = class extends d {
  constructor() {
    super(...arguments), this.key = "", this.value = "", this.mono = !1, this.copyable = !1, this.inline = !1;
  }
  async _handleCopy() {
    try {
      await navigator.clipboard.writeText(this.value);
    } catch (t) {
      console.error("Failed to copy:", t);
    }
  }
  render() {
    const t = this.value === "" || this.value === null || this.value === void 0, e = t ? "N/A" : this.value, o = {
      value: !0,
      mono: this.mono,
      null: t
    };
    return c`
      <span class="key">${this.key}</span>
      <span class=${h(o)}>
        ${this.copyable && !t ? c`
          <span class="copy-wrapper">
            ${e}
            <button class="copy-btn" @click=${this._handleCopy} aria-label="Copy value">
              <svg viewBox="0 0 24 24">
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </span>
        ` : e}
      </span>
    `;
  }
};
de.styles = [
  u,
  p`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-2);
        border-radius: var(--mcp-radius-sm);
      }

      :host([inline]) {
        flex-direction: row;
        align-items: baseline;
        gap: var(--mcp-space-2);
      }

      .key {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
      }

      :host([inline]) .key::after {
        content: ':';
      }

      .value {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        word-break: break-word;
      }

      .value.mono {
        font-family: var(--mcp-font-family-mono);
      }

      .value.null {
        color: var(--mcp-color-ghost-foreground);
        font-style: italic;
      }

      .copy-wrapper {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
      }

      .copy-btn {
        padding: var(--mcp-space-1);
        border: none;
        background: transparent;
        color: var(--mcp-color-ghost-foreground);
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--mcp-transition-fast);
      }

      :host(:hover) .copy-btn {
        opacity: 1;
      }

      .copy-btn:hover {
        color: var(--mcp-color-foreground);
      }

      .copy-btn svg {
        width: 0.75rem;
        height: 0.75rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }
    `
];
H([
  n({ type: String })
], de.prototype, "key", 2);
H([
  n({ type: String })
], de.prototype, "value", 2);
H([
  n({ type: Boolean })
], de.prototype, "mono", 2);
H([
  n({ type: Boolean })
], de.prototype, "copyable", 2);
H([
  n({ type: Boolean, reflect: !0 })
], de.prototype, "inline", 2);
de = H([
  m("mcp-kv-item")
], de);
var ds = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, Y = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? hs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ds(e, o, r), r;
};
let St = class extends d {
  constructor() {
    super(...arguments), this.borderless = !1;
  }
  render() {
    const t = {
      list: !0,
      borderless: this.borderless
    };
    return c`
      <div class=${h(t)} role="list">
        <slot></slot>
      </div>
    `;
  }
};
St.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .list {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      .list.borderless {
        border: none;
        border-radius: 0;
      }

      ::slotted(mcp-list-item:not(:last-child)) {
        border-bottom: 1px solid var(--mcp-color-border);
      }
    `
];
Y([
  n({ type: Boolean })
], St.prototype, "borderless", 2);
St = Y([
  m("mcp-list")
], St);
let G = class extends d {
  constructor() {
    super(...arguments), this.title = "", this.description = "", this.interactive = !1, this.selected = !1, this.disabled = !1, this.value = "";
  }
  _handleClick() {
    !this.interactive || this.disabled || this.dispatchEvent(new CustomEvent("mcp-select", {
      detail: { value: this.value, selected: !this.selected },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      item: !0,
      interactive: this.interactive,
      selected: this.selected,
      disabled: this.disabled
    };
    return c`
      <div 
        class=${h(t)} 
        role=${this.interactive ? "button" : "listitem"}
        tabindex=${this.interactive && !this.disabled ? "0" : "-1"}
        @click=${this._handleClick}
      >
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        
        <div class="content">
          ${this.title ? c`<div class="title">${this.title}</div>` : l}
          ${this.description ? c`<div class="description">${this.description}</div>` : l}
          <slot></slot>
        </div>
        
        <div class="suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    `;
  }
};
G.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-background);
        transition: background var(--mcp-transition-fast);
      }

      .item.interactive {
        cursor: pointer;
      }

      .item.interactive:hover {
        background: var(--mcp-color-ghost);
      }

      .item.selected {
        background: rgb(99 102 241 / 0.1);
      }

      .item.disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .prefix {
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .description {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        margin-top: var(--mcp-space-1);
      }

      .suffix {
        flex-shrink: 0;
      }

      ::slotted(mcp-icon) {
        color: var(--mcp-color-ghost-foreground);
      }
    `
];
Y([
  n({ type: String })
], G.prototype, "title", 2);
Y([
  n({ type: String })
], G.prototype, "description", 2);
Y([
  n({ type: Boolean })
], G.prototype, "interactive", 2);
Y([
  n({ type: Boolean })
], G.prototype, "selected", 2);
Y([
  n({ type: Boolean })
], G.prototype, "disabled", 2);
Y([
  n({ type: String })
], G.prototype, "value", 2);
G = Y([
  m("mcp-list-item")
], G);
var ms = Object.defineProperty, us = Object.getOwnPropertyDescriptor, ve = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? us(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ms(e, o, r), r;
};
let Ht = class extends d {
  render() {
    return c`
      <div class="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
};
Ht.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .menu {
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        padding: var(--mcp-space-1);
        min-width: 12rem;
        overflow: hidden;
      }
    `
];
Ht = ve([
  m("mcp-menu")
], Ht);
let Ne = class extends d {
  constructor() {
    super(...arguments), this.disabled = !1, this.destructive = !1, this.shortcut = "";
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("mcp-select", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = {
      destructive: this.destructive
    };
    return c`
      <button
        class=${h(t)}
        role="menuitem"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="icon"></slot></span>
        <span class="label"><slot></slot></span>
        ${this.shortcut ? c`<span class="shortcut">${this.shortcut}</span>` : l}
      </button>
    `;
  }
};
Ne.styles = [
  u,
  p`
      :host {
        display: block;
      }

      button {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        width: 100%;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        cursor: pointer;
        border-radius: var(--mcp-radius-md);
        text-align: left;
        transition: background var(--mcp-transition-fast);
      }

      button:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
      }

      button:focus {
        outline: none;
        background: var(--mcp-color-ghost);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button.destructive {
        color: var(--mcp-color-error);
      }

      .icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }

      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .label {
        flex: 1;
      }

      .shortcut {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        margin-left: auto;
      }
    `
];
ve([
  n({ type: Boolean })
], Ne.prototype, "disabled", 2);
ve([
  n({ type: Boolean })
], Ne.prototype, "destructive", 2);
ve([
  n({ type: String })
], Ne.prototype, "shortcut", 2);
Ne = ve([
  m("mcp-menu-item")
], Ne);
let Nt = class extends d {
  render() {
    return c``;
  }
};
Nt.styles = [
  u,
  p`
      :host {
        display: block;
        height: 1px;
        background: var(--mcp-color-border);
        margin: var(--mcp-space-1) 0;
      }
    `
];
Nt = ve([
  m("mcp-menu-divider")
], Nt);
let Ot = class extends d {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return c`
      ${this.label ? c`<div class="label">${this.label}</div>` : l}
      <slot></slot>
    `;
  }
};
Ot.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .label {
        padding: var(--mcp-space-2) var(--mcp-space-3);
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `
];
ve([
  n({ type: String })
], Ot.prototype, "label", 2);
Ot = ve([
  m("mcp-menu-group")
], Ot);
var vs = Object.defineProperty, gs = Object.getOwnPropertyDescriptor, ge = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? gs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && vs(e, o, r), r;
};
let B = class extends d {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "Type a message...", this.disabled = !1, this.showCount = !1, this.submitOnEnter = !0;
  }
  focus() {
    var t;
    (t = this._textarea) == null || t.focus();
  }
  clear() {
    this.value = "", this._autoResize();
  }
  _handleInput(t) {
    const e = t.target;
    this.value = e.value, this._autoResize(), this.dispatchEvent(new CustomEvent("mcp-input", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleKeydown(t) {
    this.submitOnEnter && t.key === "Enter" && !t.shiftKey && (t.preventDefault(), this._submit());
  }
  _autoResize() {
    this._textarea && (this._textarea.style.height = "auto", this._textarea.style.height = `${this._textarea.scrollHeight}px`);
  }
  _submit() {
    !this.value.trim() || this.disabled || this.dispatchEvent(new CustomEvent("mcp-submit", {
      detail: { value: this.value.trim() },
      bubbles: !0,
      composed: !0
    }));
  }
  /** Public method to trigger submit (for external send buttons) */
  submit() {
    this._submit();
  }
  get _charCountClass() {
    if (!this.maxlength) return "";
    const t = this.value.length / this.maxlength;
    return t >= 1 ? "at-limit" : t >= 0.9 ? "near-limit" : "";
  }
  render() {
    const t = {
      "input-wrapper": !0,
      disabled: this.disabled
    };
    return c`
      <div class="container" part="container">
        <div class="above">
          <slot name="above"></slot>
        </div>

        <div class=${h(t)} part="input-wrapper">
          <div class="actions-start">
            <slot name="start"></slot>
          </div>

          <textarea
            part="textarea"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            maxlength=${this.maxlength || l}
            rows="1"
            @input=${this._handleInput}
            @keydown=${this._handleKeydown}
          ></textarea>

          ${this.showCount && this.maxlength ? c`
            <span class="char-count ${this._charCountClass}">
              ${this.value.length}/${this.maxlength}
            </span>
          ` : l}

          <div class="actions-end">
            <slot name="end"></slot>
          </div>
        </div>
      </div>
    `;
  }
};
B.styles = [
  u,
  p`
      :host {
        display: block;
        max-width: 100%;
        overflow: hidden;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      /* Above slot (attachments, reply preview) */
      .above {
        display: flex;
        flex-wrap: wrap;
        gap: var(--mcp-space-2);
      }

      .above:empty {
        display: none;
      }

      /* Input wrapper */
      .input-wrapper {
        display: flex;
        align-items: flex-end;
        gap: var(--mcp-space-2);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-xl);
        transition: all var(--mcp-transition-fast);
      }

      .input-wrapper:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .input-wrapper.disabled {
        opacity: var(--mcp-opacity-disabled);
        background: var(--mcp-color-ghost);
      }

      /* Start/end action slots */
      .actions-start,
      .actions-end {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-1);
        flex-shrink: 0;
      }

      .actions-start:empty,
      .actions-end:empty {
        display: none;
      }

      /* Textarea */
      textarea {
        flex: 1;
        min-width: 0;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        color: var(--mcp-color-foreground);
        resize: none;
        outline: none;
        padding: var(--mcp-space-1) 0;
        min-height: 1.5rem;
        max-height: 10rem;
        overflow-y: auto;
      }

      textarea::placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      textarea:disabled {
        cursor: not-allowed;
      }

      /* Character count */
      .char-count {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        align-self: flex-end;
        padding-bottom: var(--mcp-space-1);
      }

      .char-count.near-limit {
        color: var(--mcp-color-warning);
      }

      .char-count.at-limit {
        color: var(--mcp-color-error);
      }
    `
];
ge([
  n({ type: String })
], B.prototype, "value", 2);
ge([
  n({ type: String })
], B.prototype, "placeholder", 2);
ge([
  n({ type: Boolean })
], B.prototype, "disabled", 2);
ge([
  n({ type: Number })
], B.prototype, "maxlength", 2);
ge([
  n({ type: Boolean })
], B.prototype, "showCount", 2);
ge([
  n({ type: Boolean })
], B.prototype, "submitOnEnter", 2);
ge([
  qe("textarea")
], B.prototype, "_textarea", 2);
B = ge([
  m("mcp-message-input")
], B);
var fs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, Je = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? bs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && fs(e, o, r), r;
};
let he = class extends d {
  constructor() {
    super(...arguments), this.align = "start", this.variant = "ghost", this.timestamp = "", this.continuation = !1;
  }
  get _statusIcon() {
    switch (this.status) {
      case "sending":
        return c`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32"><animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/></circle></svg>`;
      case "sent":
        return c`<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>`;
      case "delivered":
        return c`<svg viewBox="0 0 24 24"><path d="M2 12l5 5L17 7M7 12l5 5L22 7"/></svg>`;
      case "read":
        return c`<svg viewBox="0 0 24 24"><path d="M2 12l5 5L17 7M7 12l5 5L22 7"/></svg>`;
      case "error":
        return c`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`;
      default:
        return l;
    }
  }
  render() {
    const t = {
      container: !0,
      [`align-${this.align}`]: !0
    }, e = {
      bubble: !0,
      [`variant-${this.variant}`]: !0,
      [`align-${this.align}-bubble`]: this.variant === "bubble"
    };
    return c`
      <div class=${h(t)} part="container">
        <div class="avatar">
          <slot name="avatar"></slot>
        </div>

        <div class="content-wrapper">
          <div class="header">
            <slot name="header"></slot>
          </div>

          <div class=${h(e)} part="bubble">
            <div part="content">
              <slot></slot>
            </div>
          </div>

          <div class="footer">
            ${this.timestamp ? c`<span class="timestamp">${this.timestamp}</span>` : l}
            ${this.status ? c`
              <span class=${h({ status: !0, [`status-${this.status}`]: !0 })}>
                <span class="status-icon">${this._statusIcon}</span>
              </span>
            ` : l}
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
};
he.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: var(--mcp-space-2);
        max-width: 100%;
      }

      /* Alignment */
      .align-start {
        flex-direction: row;
        justify-content: flex-start;
      }

      .align-end {
        flex-direction: row-reverse;
        justify-content: flex-start;
      }

      .align-end .content-wrapper {
        align-items: flex-end;
      }

      /* Avatar */
      .avatar {
        flex-shrink: 0;
        align-self: flex-end;
      }

      .avatar:empty {
        display: none;
      }

      /* Hide avatar when grouped (continuation) */
      :host([continuation]) .avatar {
        visibility: hidden;
      }

      /* Content wrapper */
      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
        max-width: 80%;
        min-width: 0;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        padding: 0 var(--mcp-space-1);
      }

      .header:empty {
        display: none;
      }

      .align-end .header {
        flex-direction: row-reverse;
      }

      /* Bubble */
      .bubble {
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border-radius: var(--mcp-radius-lg);
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
        max-width: 100%;
        overflow: hidden;
      }

      /* Variant: default */
      .variant-default {
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
      }

      /* Variant: ghost */
      .variant-ghost {
        background: var(--mcp-color-ghost);
      }

      /* Variant: bubble (more rounded, like iMessage) */
      .variant-bubble {
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-xl);
      }

      .align-end .variant-bubble {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      /* Tail styling for bubble variant */
      .variant-bubble.align-start-bubble {
        border-bottom-left-radius: var(--mcp-radius-sm);
      }

      .variant-bubble.align-end-bubble {
        border-bottom-right-radius: var(--mcp-radius-sm);
      }

      /* Remove tail for continuations */
      :host([continuation]) .variant-bubble {
        border-radius: var(--mcp-radius-xl);
      }

      /* Footer */
      .footer {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        padding: 0 var(--mcp-space-1);
      }

      .footer:empty {
        display: none;
      }

      .align-end .footer {
        flex-direction: row-reverse;
      }

      /* Status indicator */
      .status {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
      }

      .status-icon {
        width: 0.875rem;
        height: 0.875rem;
      }

      .status-icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .status-sending { color: var(--mcp-color-ghost-foreground); }
      .status-sent { color: var(--mcp-color-ghost-foreground); }
      .status-delivered { color: var(--mcp-color-info); }
      .status-read { color: var(--mcp-color-success); }
      .status-error { color: var(--mcp-color-error); }

      /* Timestamp */
      .timestamp {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }
    `
];
Je([
  n({ type: String })
], he.prototype, "align", 2);
Je([
  n({ type: String })
], he.prototype, "variant", 2);
Je([
  n({ type: String })
], he.prototype, "status", 2);
Je([
  n({ type: String })
], he.prototype, "timestamp", 2);
Je([
  n({ type: Boolean, reflect: !0 })
], he.prototype, "continuation", 2);
he = Je([
  m("mcp-message")
], he);
var ys = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, fe = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ws(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && ys(e, o, r), r;
};
let D = class extends d {
  constructor() {
    super(...arguments), this.open = !1, this.size = "md", this.title = "", this.closeOnBackdrop = !0, this.closeOnEscape = !0, this.hideCloseButton = !1, this._handleKeydown = (t) => {
      this.open && this.closeOnEscape && t.key === "Escape" && this._close();
    }, this._handleBackdropClick = (t) => {
      this.closeOnBackdrop && t.target === this._backdrop && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this._handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._handleKeydown);
  }
  _close() {
    this.dispatchEvent(new CustomEvent("mcp-close", { bubbles: !0, composed: !0 }));
  }
  render() {
    const t = { backdrop: !0, open: this.open }, e = { modal: !0, [`size-${this.size}`]: !0 };
    return c`
      <div class=${h(t)} @click=${this._handleBackdropClick}>
        <div class=${h(e)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <h2 class="title" id="modal-title">
              ${this.title || c`<slot name="title"></slot>`}
            </h2>
            ${this.hideCloseButton ? l : c`
              <mcp-icon-button
                variant="ghost"
                size="sm"
                label="Close"
                @click=${this._close}
              >
                <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </mcp-icon-button>
            `}
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
};
D.styles = [
  u,
  p`
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: var(--mcp-color-backdrop);
        z-index: var(--mcp-z-modal);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--mcp-space-4);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-normal), visibility var(--mcp-transition-normal);
      }

      .backdrop.open {
        opacity: 1;
        visibility: visible;
      }

      .modal {
        background: var(--mcp-color-background);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        max-height: calc(100vh - var(--mcp-space-8));
        display: flex;
        flex-direction: column;
        transform: scale(0.95) translateY(-10px);
        transition: transform var(--mcp-transition-normal);
        overflow: hidden;
      }

      .backdrop.open .modal {
        transform: scale(1) translateY(0);
      }

      .size-sm { width: 100%; max-width: 24rem; }
      .size-md { width: 100%; max-width: 32rem; }
      .size-lg { width: 100%; max-width: 42rem; }
      .size-xl { width: 100%; max-width: 56rem; }
      .size-full { width: calc(100vw - var(--mcp-space-8)); max-width: none; height: calc(100vh - var(--mcp-space-8)); }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-4) var(--mcp-space-6);
        border-bottom: 1px solid var(--mcp-color-border);
      }

      .title {
        font-size: var(--mcp-font-size-lg);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        margin: 0;
      }

      .body {
        flex: 1;
        overflow-y: auto;
        padding: var(--mcp-space-6);
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4) var(--mcp-space-6);
        border-top: 1px solid var(--mcp-color-border);
        background: var(--mcp-color-ghost);
      }

      .footer:empty {
        display: none;
      }
    `
];
fe([
  n({ type: Boolean, reflect: !0 })
], D.prototype, "open", 2);
fe([
  n({ type: String })
], D.prototype, "size", 2);
fe([
  n({ type: String })
], D.prototype, "title", 2);
fe([
  n({ type: Boolean, attribute: "close-on-backdrop" })
], D.prototype, "closeOnBackdrop", 2);
fe([
  n({ type: Boolean, attribute: "close-on-escape" })
], D.prototype, "closeOnEscape", 2);
fe([
  n({ type: Boolean, attribute: "hide-close-button" })
], D.prototype, "hideCloseButton", 2);
fe([
  qe(".backdrop")
], D.prototype, "_backdrop", 2);
D = fe([
  m("mcp-modal")
], D);
var _s = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, Qe = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? $s(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && _s(e, o, r), r;
};
let me = class extends d {
  constructor() {
    super(...arguments), this.total = 0, this.pageSize = 10, this.currentPage = 1, this.compact = !1, this.showFirstLast = !1;
  }
  get _totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }
  _getPageNumbers() {
    const t = this._totalPages, e = this.currentPage, o = [];
    if (t <= 7) {
      for (let a = 1; a <= t; a++) o.push(a);
      return o;
    }
    o.push(1), e > 3 && o.push("ellipsis");
    const s = Math.max(2, e - 1), r = Math.min(t - 1, e + 1);
    for (let a = s; a <= r; a++)
      o.push(a);
    return e < t - 2 && o.push("ellipsis"), o.push(t), o;
  }
  _goToPage(t) {
    t < 1 || t > this._totalPages || t === this.currentPage || this.dispatchEvent(new CustomEvent("mcp-page-change", {
      detail: { page: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = this._getPageNumbers(), e = this.currentPage === 1, o = this.currentPage === this._totalPages;
    return this._totalPages <= 1 ? l : c`
      <nav class=${h({ pagination: !0, compact: this.compact })} aria-label="Pagination">
        ${this.showFirstLast ? c`
          <button
            class="btn nav-btn"
            @click=${() => this._goToPage(1)}
            ?disabled=${e}
            aria-label="First page"
          >
            <svg viewBox="0 0 24 24"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
          </button>
        ` : l}

        <button
          class="btn nav-btn"
          @click=${() => this._goToPage(this.currentPage - 1)}
          ?disabled=${e}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        ${t.map(
      (s) => s === "ellipsis" ? c`<span class="ellipsis">...</span>` : c`
              <button
                class=${h({ btn: !0, active: s === this.currentPage })}
                @click=${() => this._goToPage(s)}
                aria-current=${s === this.currentPage ? "page" : l}
              >
                ${s}
              </button>
            `
    )}

        <button
          class="btn nav-btn"
          @click=${() => this._goToPage(this.currentPage + 1)}
          ?disabled=${o}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        ${this.showFirstLast ? c`
          <button
            class="btn nav-btn"
            @click=${() => this._goToPage(this._totalPages)}
            ?disabled=${o}
            aria-label="Last page"
          >
            <svg viewBox="0 0 24 24"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
          </button>
        ` : l}
      </nav>
    `;
  }
};
me.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .pagination {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-1);
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        padding: 0 var(--mcp-space-2);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        color: var(--mcp-color-foreground);
        font-size: var(--mcp-font-size-sm);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .btn:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
        border-color: var(--mcp-color-border-hover);
      }

      .btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .btn:disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      .btn.active {
        background: var(--mcp-color-primary);
        border-color: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      .btn.active:hover {
        background: var(--mcp-color-primary-hover);
      }

      .ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        color: var(--mcp-color-ghost-foreground);
        font-size: var(--mcp-font-size-sm);
      }

      .compact .btn {
        min-width: 1.75rem;
        height: 1.75rem;
        font-size: var(--mcp-font-size-xs);
      }

      .nav-btn svg {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
];
Qe([
  n({ type: Number })
], me.prototype, "total", 2);
Qe([
  n({ type: Number })
], me.prototype, "pageSize", 2);
Qe([
  n({ type: Number })
], me.prototype, "currentPage", 2);
Qe([
  n({ type: Boolean })
], me.prototype, "compact", 2);
Qe([
  n({ type: Boolean })
], me.prototype, "showFirstLast", 2);
me = Qe([
  m("mcp-pagination")
], me);
var xs = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, J = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? ks(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && xs(e, o, r), r;
};
let E = class extends d {
  constructor() {
    super(...arguments), this.name = "", this.status = "disconnected", this.toolsCount = 0, this.latency = 0, this.version = "", this.expandable = !1, this.compact = !1, this._expanded = !1;
  }
  get _statusLabel() {
    switch (this.status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      case "error":
        return "Error";
    }
  }
  _handleClick() {
    this.expandable && (this._expanded = !this._expanded);
  }
  render() {
    const t = {
      server: !0,
      interactive: this.expandable
    };
    return c`
      <div class=${h(t)} @click=${this._handleClick}>
        <div class="header">
          <span class=${h({ "status-dot": !0, [`status-${this.status}`]: !0 })}></span>
          <div class="info">
            <div class="name">${this.name}</div>
            <div class="meta">
              <span>${this._statusLabel}</span>
              ${this.latency && this.status === "connected" ? c`
                <span>${this.latency}ms</span>
              ` : l}
            </div>
          </div>
          ${this.toolsCount > 0 ? c`
            <span class="tools-count">
              <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              ${this.toolsCount}
            </span>
          ` : l}
          ${this.expandable ? c`
            <svg class=${h({ chevron: !0, open: this._expanded })} viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          ` : l}
        </div>
        ${this.expandable ? c`
          <div class=${h({ details: !0, open: this._expanded })}>
            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="detail-value">${this._statusLabel}</span>
            </div>
            ${this.version ? c`
              <div class="detail-row">
                <span class="detail-label">Version</span>
                <span class="detail-value">${this.version}</span>
              </div>
            ` : l}
            ${this.latency ? c`
              <div class="detail-row">
                <span class="detail-label">Latency</span>
                <span class="detail-value">${this.latency}ms</span>
              </div>
            ` : l}
            <div class="detail-row">
              <span class="detail-label">Tools</span>
              <span class="detail-value">${this.toolsCount}</span>
            </div>
          </div>
        ` : l}
      </div>
    `;
  }
};
E.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .server {
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
        transition: all var(--mcp-transition-fast);
      }

      .server.interactive {
        cursor: pointer;
      }

      .server.interactive:hover {
        border-color: var(--mcp-color-border-hover);
        box-shadow: var(--mcp-shadow-sm);
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-background);
      }

      .status-dot {
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .status-connected { background: var(--mcp-color-success); }
      .status-connecting {
        background: var(--mcp-color-warning);
        animation: pulse 1.5s infinite;
      }
      .status-disconnected { background: var(--mcp-color-ghost-foreground); }
      .status-error { background: var(--mcp-color-error); }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .name {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .meta {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        margin-top: var(--mcp-space-1);
      }

      .tools-count {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: 0 var(--mcp-space-2);
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-full);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .tools-count svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .chevron {
        width: 1.25rem;
        height: 1.25rem;
        stroke: var(--mcp-color-ghost-foreground);
        stroke-width: 2;
        fill: none;
        flex-shrink: 0;
        transition: transform var(--mcp-transition-fast);
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .details {
        display: none;
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-ghost);
        border-top: 1px solid var(--mcp-color-border);
      }

      .details.open {
        display: block;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        font-size: var(--mcp-font-size-xs);
        padding: var(--mcp-space-1) 0;
      }

      .detail-label {
        color: var(--mcp-color-ghost-foreground);
      }

      .detail-value {
        color: var(--mcp-color-foreground);
        font-family: var(--mcp-font-family-mono);
      }

      /* Compact variant */
      :host([compact]) .header {
        padding: var(--mcp-space-2) var(--mcp-space-3);
      }

      :host([compact]) .meta {
        display: none;
      }

      :host([compact]) .name {
        font-size: var(--mcp-font-size-xs);
      }
    `
];
J([
  n({ type: String })
], E.prototype, "name", 2);
J([
  n({ type: String })
], E.prototype, "status", 2);
J([
  n({ type: Number })
], E.prototype, "toolsCount", 2);
J([
  n({ type: Number })
], E.prototype, "latency", 2);
J([
  n({ type: String })
], E.prototype, "version", 2);
J([
  n({ type: Boolean })
], E.prototype, "expandable", 2);
J([
  n({ type: Boolean, reflect: !0 })
], E.prototype, "compact", 2);
J([
  z()
], E.prototype, "_expanded", 2);
E = J([
  m("mcp-server-status")
], E);
var zs = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, je = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Cs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && zs(e, o, r), r;
};
let Re = class extends d {
  constructor() {
    super(...arguments), this.currentStep = 0, this.vertical = !1, this.clickable = !1;
  }
  updated(t) {
    (t.has("currentStep") || t.has("clickable")) && this._updateSteps();
  }
  _updateSteps() {
    this.querySelectorAll("mcp-step").forEach((e, o) => {
      e.setAttribute("data-index", String(o)), e.setAttribute(
        "data-state",
        o < this.currentStep ? "completed" : o === this.currentStep ? "current" : "upcoming"
      ), this.clickable ? e.setAttribute("clickable", "") : e.removeAttribute("clickable");
    });
  }
  firstUpdated() {
    this._updateSteps();
  }
  render() {
    return c`
      <div class=${h({ stepper: !0, vertical: this.vertical, horizontal: !this.vertical })}>
        <slot @slotchange=${this._updateSteps}></slot>
      </div>
    `;
  }
};
Re.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .stepper {
        display: flex;
        gap: var(--mcp-space-2);
      }

      .stepper.vertical {
        flex-direction: column;
      }

      .stepper.horizontal ::slotted(mcp-step) {
        flex: 1;
      }
    `
];
je([
  n({ type: Number })
], Re.prototype, "currentStep", 2);
je([
  n({ type: Boolean })
], Re.prototype, "vertical", 2);
je([
  n({ type: Boolean })
], Re.prototype, "clickable", 2);
Re = je([
  m("mcp-stepper")
], Re);
let dt = class extends d {
  constructor() {
    super(...arguments), this.label = "", this.description = "";
  }
  _handleClick() {
    if (this.hasAttribute("clickable")) {
      const t = parseInt(this.getAttribute("data-index") || "0", 10);
      this.dispatchEvent(new CustomEvent("mcp-step-click", {
        detail: { step: t },
        bubbles: !0,
        composed: !0
      }));
    }
  }
  render() {
    const t = this.getAttribute("data-state") || "upcoming", e = parseInt(this.getAttribute("data-index") || "0", 10), o = t === "completed";
    return c`
      <div class="step-indicator">
        <div
          class="step-number"
          @click=${this._handleClick}
          tabindex=${this.hasAttribute("clickable") ? 0 : -1}
          @keydown=${(s) => s.key === "Enter" && this._handleClick()}
        >
          ${o ? c`<svg class="checkmark" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>` : e + 1}
        </div>
        <div class="connector"></div>
      </div>
      <div class="step-content">
        <div class="step-label">${this.label}</div>
        ${this.description ? c`<div class="step-description">${this.description}</div>` : l}
        <slot></slot>
      </div>
    `;
  }
};
dt.styles = [
  u,
  p`
      :host {
        display: flex;
        align-items: flex-start;
        gap: var(--mcp-space-3);
      }

      .step-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--mcp-space-2);
      }

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
        border: 2px solid var(--mcp-color-border);
        background: var(--mcp-color-background);
        color: var(--mcp-color-ghost-foreground);
        transition: all var(--mcp-transition-fast);
      }

      :host([data-state="current"]) .step-number {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      :host([data-state="completed"]) .step-number {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      .checkmark {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 3;
        fill: none;
      }

      .connector {
        flex: 1;
        width: 2px;
        min-height: 1.5rem;
        background: var(--mcp-color-border);
        transition: background var(--mcp-transition-fast);
      }

      :host([data-state="completed"]) .connector {
        background: var(--mcp-color-primary);
      }

      .step-content {
        flex: 1;
        padding-bottom: var(--mcp-space-4);
      }

      .step-label {
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
        transition: color var(--mcp-transition-fast);
      }

      :host([data-state="current"]) .step-label {
        color: var(--mcp-color-foreground);
      }

      :host([data-state="completed"]) .step-label {
        color: var(--mcp-color-foreground);
      }

      .step-description {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
        margin-top: var(--mcp-space-1);
      }

      :host([clickable]) {
        cursor: pointer;
      }

      :host([clickable]) .step-number:hover {
        transform: scale(1.1);
      }

      :host([clickable]:focus-visible) .step-number {
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }
    `
];
je([
  n({ type: String })
], dt.prototype, "label", 2);
je([
  n({ type: String })
], dt.prototype, "description", 2);
dt = je([
  m("mcp-step")
], dt);
var Ss = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, be = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Os(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Ss(e, o, r), r;
};
let T = class extends d {
  constructor() {
    super(...arguments), this.columns = [], this.data = [], this.striped = !1, this.hoverable = !1, this.compact = !1, this.sortKey = null, this.sortDirection = null;
  }
  _handleSort(t) {
    if (!t.sortable) return;
    let e = "asc";
    this.sortKey === t.key && (e = this.sortDirection === "asc" ? "desc" : this.sortDirection === "desc" ? null : "asc"), this.dispatchEvent(new CustomEvent("mcp-sort", {
      detail: { key: t.key, direction: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleRowClick(t, e) {
    this.hoverable && this.dispatchEvent(new CustomEvent("mcp-row-click", {
      detail: { row: t, index: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _renderSortIcon(t) {
    if (!t.sortable) return l;
    const e = this.sortKey === t.key, o = this.sortDirection === "asc" ? "↑" : this.sortDirection === "desc" ? "↓" : "↕";
    return c`<span class=${h({ "sort-icon": !0, active: e })}>${e ? o : "↕"}</span>`;
  }
  render() {
    const t = {
      striped: this.striped,
      hoverable: this.hoverable,
      compact: this.compact
    };
    return c`
      <div class="table-wrapper">
        <table class=${h(t)}>
          <thead>
            <tr>
              ${this.columns.map((e) => c`
                <th
                  class=${h({ sortable: !!e.sortable })}
                  style=${e.width ? `width: ${e.width}` : ""}
                  @click=${() => this._handleSort(e)}
                  @keydown=${(o) => o.key === "Enter" && this._handleSort(e)}
                  tabindex=${e.sortable ? 0 : -1}
                >
                  ${e.header}${this._renderSortIcon(e)}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.data.length === 0 ? c`<tr><td colspan=${this.columns.length} class="empty">No data</td></tr>` : this.data.map((e, o) => c`
                <tr @click=${() => this._handleRowClick(e, o)}>
                  ${this.columns.map((s) => c`
                    <td>${e[s.key] ?? ""}</td>
                  `)}
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `;
  }
};
T.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .table-wrapper {
        overflow-x: auto;
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--mcp-font-size-sm);
      }

      th, td {
        padding: var(--mcp-space-3) var(--mcp-space-4);
        text-align: left;
      }

      th {
        background: var(--mcp-color-ghost);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        border-bottom: 1px solid var(--mcp-color-border);
        white-space: nowrap;
      }

      th.sortable {
        cursor: pointer;
        user-select: none;
        transition: background var(--mcp-transition-fast);
      }

      th.sortable:hover {
        background: var(--mcp-color-border);
      }

      th.sortable:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .sort-icon {
        display: inline-block;
        margin-left: var(--mcp-space-1);
        opacity: 0.5;
      }

      .sort-icon.active {
        opacity: 1;
        color: var(--mcp-color-primary);
      }

      td {
        color: var(--mcp-color-foreground);
        border-bottom: 1px solid var(--mcp-color-border);
      }

      tr:last-child td {
        border-bottom: none;
      }

      /* Striped */
      .striped tbody tr:nth-child(odd) {
        background: var(--mcp-color-ghost);
      }

      /* Hoverable */
      .hoverable tbody tr {
        transition: background var(--mcp-transition-fast);
      }

      .hoverable tbody tr:hover {
        background: var(--mcp-color-primary-muted);
        cursor: pointer;
      }

      /* Compact */
      .compact th, .compact td {
        padding: var(--mcp-space-2) var(--mcp-space-3);
      }

      /* Empty state */
      .empty {
        text-align: center;
        color: var(--mcp-color-ghost-foreground);
        padding: var(--mcp-space-8);
      }
    `
];
be([
  n({ type: Array })
], T.prototype, "columns", 2);
be([
  n({ type: Array })
], T.prototype, "data", 2);
be([
  n({ type: Boolean })
], T.prototype, "striped", 2);
be([
  n({ type: Boolean })
], T.prototype, "hoverable", 2);
be([
  n({ type: Boolean })
], T.prototype, "compact", 2);
be([
  n({ type: String })
], T.prototype, "sortKey", 2);
be([
  n({ type: String })
], T.prototype, "sortDirection", 2);
T = be([
  m("mcp-table")
], T);
var Ps = Object.defineProperty, Es = Object.getOwnPropertyDescriptor, N = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Es(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Ps(e, o, r), r;
};
let Ue = class extends d {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.value = "";
  }
  _updatePanels() {
    this.querySelectorAll("mcp-tab-panel").forEach((e) => {
      e.active = e.getAttribute("value") === this.value;
    });
  }
  updated(t) {
    t.has("value") && this._updatePanels();
  }
  render() {
    const t = {
      "tabs-list": !0,
      [`variant-${this.variant}`]: !0
    };
    return c`
      <div class=${h(t)} role="tablist">
        <slot></slot>
      </div>
      <slot name="panels"></slot>
    `;
  }
};
Ue.styles = [
  u,
  p`
      :host {
        display: block;
      }

      .tabs-list {
        display: flex;
        gap: var(--mcp-space-1);
        border-bottom: 1px solid var(--mcp-color-border);
        margin-bottom: var(--mcp-space-4);
      }

      .tabs-list.variant-pills {
        border-bottom: none;
        background: var(--mcp-color-ghost);
        padding: var(--mcp-space-1);
        border-radius: var(--mcp-radius-lg);
      }

      .tabs-list.variant-underline {
        gap: var(--mcp-space-4);
      }
    `
];
N([
  n({ type: String })
], Ue.prototype, "variant", 2);
N([
  n({ type: String })
], Ue.prototype, "size", 2);
N([
  n({ type: String })
], Ue.prototype, "value", 2);
Ue = N([
  m("mcp-tabs")
], Ue);
let ht = class extends d {
  constructor() {
    super(...arguments), this.value = "", this.disabled = !1;
  }
  get _isActive() {
    const t = this.closest("mcp-tabs");
    return (t == null ? void 0 : t.value) === this.value;
  }
  _handleClick() {
    if (this.disabled) return;
    const t = this.closest("mcp-tabs");
    t && (t.value = this.value, t.dispatchEvent(new CustomEvent("mcp-change", {
      detail: { value: this.value },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    return c`
      <button
        class=${h({ active: this._isActive })}
        role="tab"
        aria-selected=${this._isActive}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
};
ht.styles = [
  u,
  p`
      :host {
        display: contents;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-2);
        padding: var(--mcp-space-2) var(--mcp-space-4);
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }

      button:hover:not(:disabled) {
        color: var(--mcp-color-foreground);
      }

      button.active {
        color: var(--mcp-color-primary);
        border-bottom-color: var(--mcp-color-primary);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Pills variant */
      :host-context(mcp-tabs[variant="pills"]) button {
        border-radius: var(--mcp-radius-md);
        border-bottom: none;
        margin-bottom: 0;
      }

      :host-context(mcp-tabs[variant="pills"]) button.active {
        background: var(--mcp-color-background);
        box-shadow: var(--mcp-shadow-sm);
      }

      /* Underline variant */
      :host-context(mcp-tabs[variant="underline"]) button {
        padding: var(--mcp-space-2) 0;
      }

      /* Sizes */
      :host-context(mcp-tabs[size="sm"]) button {
        padding: var(--mcp-space-1) var(--mcp-space-3);
        font-size: var(--mcp-font-size-xs);
      }

      :host-context(mcp-tabs[size="lg"]) button {
        padding: var(--mcp-space-3) var(--mcp-space-6);
        font-size: var(--mcp-font-size-base);
      }
    `
];
N([
  n({ type: String })
], ht.prototype, "value", 2);
N([
  n({ type: Boolean })
], ht.prototype, "disabled", 2);
ht = N([
  m("mcp-tab")
], ht);
let mt = class extends d {
  constructor() {
    super(...arguments), this.value = "", this.active = !1;
  }
  render() {
    return c`<slot></slot>`;
  }
};
mt.styles = [
  u,
  p`
      :host {
        display: none;
      }

      :host([active]) {
        display: block;
      }
    `
];
N([
  n({ type: String })
], mt.prototype, "value", 2);
N([
  n({ type: Boolean, reflect: !0 })
], mt.prototype, "active", 2);
mt = N([
  m("mcp-tab-panel")
], mt);
var Ms = Object.defineProperty, As = Object.getOwnPropertyDescriptor, Q = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? As(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Ms(e, o, r), r;
};
let M = class extends d {
  constructor() {
    super(...arguments), this.name = "", this.status = "pending", this.input = {}, this.output = null, this.error = "", this.duration = 0, this._inputOpen = !1, this._outputOpen = !0;
  }
  get _statusIcon() {
    switch (this.status) {
      case "pending":
        return c`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
      case "running":
        return c`<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>`;
      case "success":
        return c`<svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      case "error":
        return c`<svg viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }
  }
  _formatDuration() {
    return this.duration ? this.duration < 1e3 ? `${this.duration}ms` : `${(this.duration / 1e3).toFixed(2)}s` : "";
  }
  async _copyToClipboard(t, e) {
    this.dispatchEvent(new CustomEvent("mcp-copy", {
      detail: { content: t, type: e },
      bubbles: !0,
      composed: !0
    }));
    try {
      await navigator.clipboard.writeText(t);
    } catch (o) {
      console.error("Failed to copy:", o);
    }
  }
  render() {
    const t = Object.keys(this.input).length > 0, e = this.output !== null || this.error, o = JSON.stringify(this.input, null, 2), s = this.error || JSON.stringify(this.output, null, 2);
    return c`
      <div class="tool-call">
        <div class="header" part="header">
          <span class=${h({ "status-icon": !0, [`status-${this.status}`]: !0 })}>
            <slot name="icon">${this._statusIcon}</slot>
          </span>
          <span class="tool-name" part="title">${this.name}</span>
          ${this.duration ? c`<span class="duration">${this._formatDuration()}</span>` : l}
          <slot name="header-end"></slot>
        </div>

        ${t ? c`
          <div class="section" part="section">
            <div class="section-header" @click=${() => this._inputOpen = !this._inputOpen}>
              <span class="section-title">Input</span>
              <div class="section-actions">
                <mcp-icon-button
                  variant="ghost"
                  size="sm"
                  label="Copy input"
                  @click=${(r) => {
      r.stopPropagation(), this._copyToClipboard(o, "input");
    }}
                >
                  <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </mcp-icon-button>
                <svg class=${h({ chevron: !0, open: this._inputOpen })} viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            <div class=${h({ "section-content": !0, open: this._inputOpen })} part="content">
              <mcp-code language="json" .code=${o} .copyable=${!1}></mcp-code>
            </div>
          </div>
        ` : l}

        ${e ? c`
          <div class="section" part="section">
            <div class="section-header" @click=${() => this._outputOpen = !this._outputOpen}>
              <span class="section-title">${this.error ? "Error" : "Output"}</span>
              <div class="section-actions">
                <mcp-icon-button
                  variant="ghost"
                  size="sm"
                  label="Copy output"
                  @click=${(r) => {
      r.stopPropagation(), this._copyToClipboard(s, "output");
    }}
                >
                  <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </mcp-icon-button>
                <svg class=${h({ chevron: !0, open: this._outputOpen })} viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            <div class=${h({ "section-content": !0, open: this._outputOpen })} part="content">
              <mcp-code class=${this.error ? "error-output" : ""} language="json" .code=${s} .copyable=${!1}></mcp-code>
            </div>
          </div>
        ` : l}

        <!-- Custom sections slot -->
        <slot name="sections"></slot>
      </div>
    `;
  }
};
M.styles = [
  u,
  p`
      :host {
        display: block;
        max-width: 100%;
      }

      .tool-call {
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
        max-width: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-ghost);
      }

      .status-icon {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
      }

      .status-icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .status-pending { color: var(--mcp-color-ghost-foreground); }
      .status-running { color: var(--mcp-color-info); }
      .status-success { color: var(--mcp-color-success); }
      .status-error { color: var(--mcp-color-error); }

      .status-running svg {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .tool-name {
        font-family: var(--mcp-font-family-mono);
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
      }

      .duration {
        margin-left: auto;
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .section {
        border-top: 1px solid var(--mcp-color-border);
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-2) var(--mcp-space-4);
        background: var(--mcp-color-background);
        cursor: pointer;
        transition: background var(--mcp-transition-fast);
      }

      .section-header:hover {
        background: var(--mcp-color-ghost);
      }

      .section-title {
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .section-actions {
        display: flex;
        gap: var(--mcp-space-2);
      }

      .chevron {
        transition: transform var(--mcp-transition-fast);
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .section-content {
        display: none;
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-background);
      }

      .section-content.open {
        display: block;
      }

      mcp-code {
        --mcp-font-size-sm: var(--mcp-font-size-xs);
      }

      mcp-code.error-output {
        --mcp-color-foreground: var(--mcp-color-error);
      }
    `
];
Q([
  n({ type: String })
], M.prototype, "name", 2);
Q([
  n({ type: String })
], M.prototype, "status", 2);
Q([
  n({ type: Object })
], M.prototype, "input", 2);
Q([
  n({ type: Object })
], M.prototype, "output", 2);
Q([
  n({ type: String })
], M.prototype, "error", 2);
Q([
  n({ type: Number })
], M.prototype, "duration", 2);
Q([
  z()
], M.prototype, "_inputOpen", 2);
Q([
  z()
], M.prototype, "_outputOpen", 2);
M = Q([
  m("mcp-tool-call")
], M);
var js = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, Z = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Bs(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && js(e, o, r), r;
};
const Ds = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline"
}, Ts = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
let A = class extends d {
  constructor() {
    super(...arguments), this.direction = "column", this.align = "stretch", this.justify = "start", this.wrap = "nowrap", this.gap = "var(--mcp-space-4)", this.inline = !1;
  }
  render() {
    const t = {
      display: this.inline ? "inline-flex" : "flex",
      flexDirection: this.direction,
      alignItems: Ds[this.align],
      justifyContent: Ts[this.justify],
      flexWrap: this.wrap,
      gap: this.gap
    };
    return c`
      <style>:host { ${Object.entries(t).map(([e, o]) => `${e.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase())}: ${o}`).join("; ")} }</style>
      <slot></slot>
    `;
  }
};
A.styles = [
  u,
  p`
      :host {
        display: flex;
      }
    `
];
Z([
  n({ type: String })
], A.prototype, "direction", 2);
Z([
  n({ type: String })
], A.prototype, "align", 2);
Z([
  n({ type: String })
], A.prototype, "justify", 2);
Z([
  n({ type: String })
], A.prototype, "wrap", 2);
Z([
  n({ type: String })
], A.prototype, "gap", 2);
Z([
  n({ type: Boolean })
], A.prototype, "inline", 2);
A = Z([
  m("mcp-stack")
], A);
let cr = class extends A {
  constructor() {
    super(), this.direction = "row";
  }
};
cr = Z([
  m("mcp-hstack")
], cr);
let lr = class extends A {
  constructor() {
    super(), this.direction = "column";
  }
};
lr = Z([
  m("mcp-vstack")
], lr);
var Is = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, S = (t, e, o, s) => {
  for (var r = s > 1 ? void 0 : s ? Ls(e, o) : e, a = t.length - 1, i; a >= 0; a--)
    (i = t[a]) && (r = (s ? i(e, o, r) : i(r)) || r);
  return s && r && Is(e, o, r), r;
};
let I = class extends d {
  constructor() {
    super(...arguments), this.columns = "1", this.minColWidth = "200px", this.gap = "var(--mcp-space-4)", this.rowGap = "", this.colGap = "", this.align = "stretch", this.justify = "stretch";
  }
  updated() {
    let t;
    if (this.columns === "auto-fit" || this.columns === "auto-fill")
      t = `repeat(${this.columns}, minmax(${this.minColWidth}, 1fr))`;
    else {
      const e = parseInt(this.columns);
      t = isNaN(e) ? this.columns : `repeat(${e}, 1fr)`;
    }
    this.style.gridTemplateColumns = t, this.style.gap = this.gap, this.rowGap && (this.style.rowGap = this.rowGap), this.colGap && (this.style.columnGap = this.colGap), this.style.alignItems = this.align, this.style.justifyItems = this.justify;
  }
  render() {
    return c`<slot></slot>`;
  }
};
I.styles = [
  u,
  p`
      :host {
        display: grid;
      }
    `
];
S([
  n({ type: String })
], I.prototype, "columns", 2);
S([
  n({ type: String, attribute: "min-col-width" })
], I.prototype, "minColWidth", 2);
S([
  n({ type: String })
], I.prototype, "gap", 2);
S([
  n({ type: String, attribute: "row-gap" })
], I.prototype, "rowGap", 2);
S([
  n({ type: String, attribute: "col-gap" })
], I.prototype, "colGap", 2);
S([
  n({ type: String })
], I.prototype, "align", 2);
S([
  n({ type: String })
], I.prototype, "justify", 2);
I = S([
  m("mcp-grid")
], I);
let Se = class extends d {
  constructor() {
    super(...arguments), this.colSpan = 1, this.rowSpan = 1;
  }
  updated() {
    this.colSpan > 1 && (this.style.gridColumn = `span ${this.colSpan}`), this.rowSpan > 1 && (this.style.gridRow = `span ${this.rowSpan}`), this.colStart && (this.style.gridColumnStart = String(this.colStart)), this.rowStart && (this.style.gridRowStart = String(this.rowStart));
  }
  render() {
    return c`<slot></slot>`;
  }
};
Se.styles = p`
    :host {
      display: block;
    }
  `;
S([
  n({ type: Number, attribute: "col-span" })
], Se.prototype, "colSpan", 2);
S([
  n({ type: Number, attribute: "row-span" })
], Se.prototype, "rowSpan", 2);
S([
  n({ type: Number, attribute: "col-start" })
], Se.prototype, "colStart", 2);
S([
  n({ type: Number, attribute: "row-start" })
], Se.prototype, "rowStart", 2);
Se = S([
  m("mcp-grid-item")
], Se);
export {
  qs as AsyncController,
  Vs as FormFieldController,
  pt as McpAccordion,
  Le as McpAccordionItem,
  Ie as McpAlert,
  j as McpAvatar,
  nt as McpAvatarGroup,
  ke as McpBadge,
  zt as McpBreadcrumb,
  Ct as McpBreadcrumbItem,
  se as McpButton,
  ce as McpCard,
  pe as McpChatMessage,
  P as McpCheckbox,
  ae as McpCode,
  at as McpDivider,
  le as McpDrawer,
  O as McpDropZone,
  ct as McpEmpty,
  I as McpGrid,
  Se as McpGridItem,
  cr as McpHStack,
  ze as McpIcon,
  U as McpIconButton,
  w as McpInput,
  He as McpKeyValue,
  de as McpKvItem,
  St as McpList,
  G as McpListItem,
  lt as McpLoading,
  Ht as McpMenu,
  Nt as McpMenuDivider,
  Ot as McpMenuGroup,
  Ne as McpMenuItem,
  he as McpMessage,
  B as McpMessageInput,
  $t as McpMessageTyping,
  D as McpModal,
  me as McpPagination,
  Ce as McpPopover,
  q as McpProgress,
  F as McpSearchInput,
  $ as McpSelect,
  E as McpServerStatus,
  Te as McpSkeleton,
  xt as McpSkeletonText,
  it as McpSpinner,
  A as McpStack,
  dt as McpStep,
  Re as McpStepper,
  V as McpSwitch,
  ht as McpTab,
  mt as McpTabPanel,
  T as McpTable,
  Ue as McpTabs,
  ie as McpTag,
  y as McpTextarea,
  W as McpToast,
  kt as McpToaster,
  M as McpToolCall,
  ne as McpTooltip,
  lr as McpVStack,
  Ur as anthropicTokens,
  u as baseStyles,
  Vr as claudeAppDarkTokens,
  qr as claudeAppTokens,
  Rr as darkTokens,
  Fr as resetStyles,
  Us as themeContext,
  Nr as tokens,
  Fs as validators
};
//# sourceMappingURL=mcp-components.esm.js.map
