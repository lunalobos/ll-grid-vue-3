import { shallowReactive as le, createElementBlock as u, openBlock as o, createElementVNode as r, computed as S, ref as p, watch as E, createCommentVNode as V, createBlock as j, resolveDynamicComponent as P, toDisplayString as b, withDirectives as M, withModifiers as H, vModelText as G, Fragment as _, renderList as C, normalizeClass as O, createVNode as k, vShow as T, normalizeStyle as I } from "vue";
function ne(s) {
  const e = s.replace(/([A-Z])/g, " $1");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ae(s, e, t) {
  let n = 0, g = s.length - 1;
  for (; n <= g; ) {
    let a = g + n >> 1, d = t(e, s[a]);
    if (d > 0)
      n = a + 1;
    else if (d < 0)
      g = a - 1;
    else
      return a;
  }
  return ~n;
}
function z(s, e) {
  return s.formattedValue().includes(e);
}
function Z(s, e) {
  for (let t = 0; t < s.length; t++)
    if (e.equals(s[t]))
      return t;
  return -1;
}
function R(s, e) {
  if (s.type !== e.type) {
    const t = new B(new String(s.value).valueOf()), n = new B(new String(e.value).valueOf());
    return R(t, n);
  } else
    switch (s.type) {
      case "dateTime":
      case "date":
        return s.value.getTime() - e.value.getTime();
      case "decimal":
      case "integer":
      case "number":
        return s.value - e.value;
      case "boolean":
      case "string":
      case "text":
        return ie(s.value, e.value);
      default:
        throw new Error(`Invalid type for comparison: ${s.type}`);
    }
}
function ie(s, e) {
  return s > e ? 1 : s === e ? 0 : -1;
}
function ue(s, e) {
  const t = /^%\.(\d{1,3})$/, n = e.match(t);
  if (n) {
    if (isNaN(s))
      return new String(s).valueOf();
  } else return new String(s).valueOf();
  const g = n[1];
  return s.toFixed(g);
}
const de = {
  date: "en-US",
  decimal: "%.2",
  integer: "%.0",
  number: "%.0"
};
class B {
  /**
   *
   * @param {string | number | boolean | Date} value
   * @param {string} type
   * @param {string} format
   */
  constructor(e, t = "text", n = de[t]) {
    this.value = e, this.type = t, this.format = n;
  }
  /**
   *
   * @returns {string}
   */
  formattedValue() {
    switch (this.type) {
      case "dateTime":
        return this.value.toLocaleString(this.format);
      case "date":
        return this.value.toLocaleDateString(this.format);
      case "decimal":
      case "integer":
      case "number":
        return ue(this.value, this.format);
      case "boolean":
      case "text":
      default:
        return new String(this.value).valueOf();
    }
  }
  /**
   *
   * @param {*} other
   * @returns {boolean}
   */
  equals(e) {
    return e ? e == this ? !0 : e instanceof B ? this.value === e.value && this.format === e.format && this.type === e.type : !1 : !1;
  }
  /**
   *
   * @param {Value} other
   */
  compareTo(e) {
    if (this.type !== e.type) {
      const t = new B(new String(this.value).valueOf()), n = new B(new String(e.value).valueOf());
      return R(t, n);
    } else
      return R(this, e);
  }
}
class ce {
  /**
   *
   * @param {() => Component} icon
   * @param {(args: Array<Value>) => Promise<void>} effect
   * @param {string} text
   */
  constructor(e, t, n) {
    this.icon = e, this.effect = t, this.text = n;
  }
}
class A {
  /**
   *
   * @param {string} key
   * @param {Value} value
   * @param {ButtonInfo} buttonInfo
   */
  constructor(e, t, n = null) {
    this.key = e, this.value = t, this.buttonInfo = n;
  }
  /**
   *
   * @returns {string} the cell type
   */
  type() {
    return this.value.type;
  }
}
function ge(s, e) {
  return ae(s, e, (t, n) => t.compareTo(n)) >= 0;
}
class he {
  /**
   *
   */
  constructor(e = []) {
    this.values = [], this.addAll(e);
  }
  /**
   *
   * @param {Array<Value>} values
   * @return {boolean} indicating if the collection changes with this operation
   */
  addAll(e) {
    let t = !1;
    for (let n = 0; n < e.length; n++)
      t |= this.add(e[n]);
    return t;
  }
  /**
   *
   * @param {Value} value
   * @return {boolean} indicating if the collection changes with this operation
   */
  add(e) {
    return e ? ge(this.values, e) ? !1 : (this.values.push(e), this.values.length > 1 && this.values.sort((t, n) => t.compareTo(n)), !0) : !1;
  }
  /**
   *
   * @param {(value:Value) => boolean} predicate
   * @returns {Array<Value>}
   */
  filteredValues(e) {
    return this.values.filter(e);
  }
}
class se {
  /**
   *
   * @param {string} name
   * @param {string} type
   * @param {Array<Value>} allValues
   */
  constructor(e, t, n = []) {
    this.name = e, this.title = ne(this.name), this.type = t, this.values = new he(n);
  }
}
class fe {
  /**
   *
   * @param {Array<Cell>} cells
   */
  constructor(e) {
    this.cells = e, this.cellsMap = {}, this.cells.filter((t) => t.buttonInfo === null).forEach((t) => {
      this.cellsMap[t.key] = t;
    });
  }
  /**
   *
   * @returns {Object}
   */
  toModel() {
    const e = {};
    return this.cells.filter((t) => t.buttonInfo === null).forEach((t) => {
      e[t.key] = t.value.value;
    }), e;
  }
  /**
   *
   * @param {string} name
   * @returns {Cell}
   */
  getCell(e) {
    return this.cellsMap[e];
  }
}
function pe(s) {
  return s.cells.map((e) => new se(e.key, e.value.type));
}
function ve(s, e, t = {}) {
  const n = [];
  for (let g = 0; g < s.length; g++) {
    const a = s[g], d = Object.keys(a), v = [];
    for (let m = 0; m < d.length; m++) {
      const c = d[m], i = a[c], f = e[c] ? e[c] : "text", $ = t[c], x = $ ? new A(c, new B(i, f, $)) : new A(c, new B(i, f));
      v.push(x);
    }
    const h = new fe(v);
    n.push(h);
  }
  return me(n);
}
function me(s) {
  const e = {};
  if (e.rows = s, e.headers = [], s.length > 0) {
    e.headers = pe(s[0]);
    for (let t = 0; t < e.headers.length; t++) {
      let n = e.headers[t], g = s.map(
        (a) => a.cells.find((d) => d.key === n.name).value
      );
      n.values.addAll(g);
    }
  }
  e.headersModel = {};
  for (let t = 0; t < e.headers.length; t++)
    e.headersModel[e.headers[t].name] = e.headers[t];
  return e;
}
function oe(s, e) {
  return e === 0 ? s : oe(e, s % e);
}
function we(s) {
  return s.reduce((e, t) => oe(e, t));
}
function xe(s) {
  return Math.ceil(Math.pow(s + 12, 0.75));
}
function re(s) {
  const e = s.map((a) => {
    if (a.type === "button")
      return { name: a.name, width: 8 };
    const d = a.values.values.map(
      (h) => xe(h.formattedValue().length)
    );
    d.push(a.title.length);
    const v = d.reduce((h, m) => Math.max(h, m), 0);
    return { name: a.name, width: v };
  }), t = we(e.map((a) => a.width)), n = e.map((a) => ({ name: a.name, width: a.width / t }));
  return {
    total: n.reduce((a, d) => a + d.width, 0),
    widths: n.reduce((a, d) => (a[d.name] = d.width, a), {})
  };
}
function ye() {
  return {
    types: {},
    pagination: [10, 20, 50],
    formats: {},
    showTitle: !1,
    showFilters: !1
  };
}
class gr {
  /**
   *
   * @param {string} name
   * @param {*} models
   * @param {*} options
   */
  constructor(e, t, n = ye()) {
    this.change = le({ content: /* @__PURE__ */ new Date(), filters: /* @__PURE__ */ new Date() }), this.setContent(
      e,
      t,
      n
    ), this.options = n, this.showTitle = n.showTitle, this.showFilters = n.showFilters;
  }
  /**
   * This method sets the table content and trigger the reactive listener to garantee the
   * re-rendering.
   * @param {string} name
   * @param {*} models
   * @param {*} options
   * @returns {boolean}
   */
  setContent(e, t, n = this.options) {
    const { types: g, formats: a, pagination: d } = n;
    this.name = e;
    const { rows: v, headers: h, headersModel: m } = ve(
      t,
      g,
      a
    );
    this.rows = v, this.headers = h, this.headersModel = m, this.filters = {}, this.sortBy = {}, d.length === 0 && (d.push(10), d.push(20), d.push(50)), this.pageSize = d[0] > 0 ? d[0] : 10, this.pagination = d, this.page = 0, this.pages = this.pageSize > 0 ? Math.ceil(this.rows.length / this.pageSize) : 1, this.change.content = /* @__PURE__ */ new Date(), this.widthInfo = re(this.headers);
  }
  /**
   * Sets the pageSize of the table and triggers the reactive listener to guarantee the
   * re-rendering.
   * @param {number} pageSize
   * @returns {boolean}
   */
  setPageSize(e) {
    return e > 0 && e !== this.pageSize ? (this.pageSize = e, this.page = 0, this.pages = Math.ceil(this.rows.length / e), this.change.content = /* @__PURE__ */ new Date(), !0) : !1;
  }
  /**
   *
   * @returns {number}
   */
  currentPage() {
    return this.page + 1;
  }
  /**
   *
   * @returns {string}
   */
  title() {
    return ne(this.name);
  }
  /**
   *
   * @returns {boolean}
   */
  nextPage() {
    return this.page < this.pages - 1 ? (this.page++, this.change.content = /* @__PURE__ */ new Date(), !0) : !1;
  }
  /**
   *
   * @returns {boolean}
   */
  previousPage() {
    return this.page > 0 ? (this.page--, this.change.content = /* @__PURE__ */ new Date(), !0) : !1;
  }
  /**
   *
   * @returns {boolean}
   */
  firstPage() {
    return this.page = 0, this.change.content = /* @__PURE__ */ new Date(), !0;
  }
  /**
   *
   * @returns {boolean}
   */
  lastPage() {
    return this.page = this.pages - 1, this.change.content = /* @__PURE__ */ new Date(), !0;
  }
  /**
   *
   * @param {string} key
   * @param {Array<Value>} values
   * @returns {boolean}
   */
  addFilter(e, t) {
    return this.headers.some((n) => n.name === e) ? (this.filters[e] = (n) => {
      const g = n.cells.find((d) => d.key === e).value;
      let a = !1;
      return t.forEach((d) => a |= g.equals(d)), a;
    }, this.change.content = /* @__PURE__ */ new Date(), !0) : !1;
  }
  /**
   *
   * @param {string} key
   * @returns {boolean}
   */
  removeFilter(e) {
    return this.headers.some((t) => t.name === e) && this.filters[e] ? (delete this.filters[e], this.change.content = /* @__PURE__ */ new Date(), !0) : !1;
  }
  /**
   *
   * @return {boolean}
   */
  removeAllFilters() {
    return this.change.filters = /* @__PURE__ */ new Date(), !0;
  }
  /**
   *
   * @param {string} field
   * @param {string} order
   * @returns {boolean}
   */
  sortByField(e, t) {
    switch (t) {
      case "up":
        return this.sortBy.sorter = (n, g) => n.getCell(e).value.compareTo(g.getCell(e).value), this.change.content = /* @__PURE__ */ new Date(), !0;
      case "down":
        return this.sortBy.sorter = (n, g) => -n.getCell(e).value.compareTo(g.getCell(e).value), this.change.content = /* @__PURE__ */ new Date(), !0;
      case "none":
        return this.change.content = /* @__PURE__ */ new Date(), delete this.sortBy.sorter;
      default:
        return !1;
    }
  }
  /**
   *
   * @returns {Array<Row>} the rows filtered
   */
  visibleRows() {
    let e = [...this.rows];
    for (const [t, n] of Object.entries(this.filters))
      e = e.filter(n);
    if (this.sortBy.sorter && e.sort(this.sortBy.sorter), this.pageSize > 0) {
      const t = this.page * this.pageSize, n = this.pageSize * (this.page + 1);
      e = e.slice(t, n);
    }
    return e;
  }
  /**
   * Adds a button to each row of these table. The effect's argument model most be
   * a model object
   * @param {Component} svgIcon
   * @param {(model: Object) => Promise<void>} effect
   * @param {string} text
   * @param {string} headerName
   * @returns {void}
   */
  addButton(e, t, n, g = "") {
    this.headers.unshift(new se(g, "button"));
    const a = new ce(() => e, t, n), d = new A(g, new B(""), a);
    this.rows.forEach((v) => {
      v.cells.unshift(d);
    }), this.widthInfo = re(this.headers), this.change.content = /* @__PURE__ */ new Date();
  }
  /**
   *
   * @param {string} name the header name
   * @returns {HeaderCell} the header or undefined if not exists
   */
  getHeader(e) {
    if (this.headersModel[e])
      return this.headersModel[e];
    {
      const t = this.headers.find((n) => n.name === e);
      return this.headersModel[e] = t, t;
    }
  }
}
const F = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, g] of e)
    t[n] = g;
  return t;
}, be = {}, ke = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function $e(s, e) {
  return o(), u("svg", ke, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z"
    }, null, -1)
  ]));
}
const U = /* @__PURE__ */ F(be, [["render", $e]]), _e = {}, Ce = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function Fe(s, e) {
  return o(), u("svg", Ce, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M16.881 16H7.119a1 1 0 0 1-.772-1.636l4.881-5.927a1 1 0 0 1 1.544 0l4.88 5.927a1 1 0 0 1-.77 1.636Z"
    }, null, -1)
  ]));
}
const L = /* @__PURE__ */ F(_e, [["render", Fe]]), Ie = {};
function je(s, e) {
  return null;
}
const N = /* @__PURE__ */ F(Ie, [["render", je]]), Se = {}, Be = {
  class: "w-5 h-5 text-white",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function Pe(s, e) {
  return o(), u("svg", Be, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-width": "2",
      d: "M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
    }, null, -1)
  ]));
}
const W = /* @__PURE__ */ F(Se, [["render", Pe]]), Me = {}, De = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Ve(s, e) {
  return o(), u("svg", De, e[0] || (e[0] = [
    r("path", { d: "M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z" }, null, -1)
  ]));
}
const J = /* @__PURE__ */ F(Me, [["render", Ve]]), Ee = {}, Te = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function qe(s, e) {
  return o(), u("svg", Te, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
    }, null, -1)
  ]));
}
const q = /* @__PURE__ */ F(Ee, [["render", qe]]), Re = {}, Ae = {
  class: "w-6 h-6 text-gray-800 dark:text-white",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function He(s, e) {
  return o(), u("svg", Ae, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 11.917 9.724 16.5 19 7.5"
    }, null, -1)
  ]));
}
const K = /* @__PURE__ */ F(Re, [["render", He]]), Ge = { class: "inline-block p-1" }, Oe = { class: "p-1 flex flex-row justify-center text-center" }, ze = { class: "flex flex-row text-center p-2" }, Ze = { class: "p-1" }, Ue = {
  key: 0,
  class: "block absolute bg-gray-100 shadow-lg min-w-42 z-10 rounded-lg p-2"
}, Le = { class: "relative" }, Ne = { class: "border border-gray-300 overflow-y-auto max-h-48 rounded-lg p-1 bg-gray-50 mt-1" }, We = ["onClick"], Je = { class: "mt-1 flex justify-center items-center" }, Ke = { class: "mt-1 flex justify-center items-center" }, Qe = {
  __name: "GridHeaderGrayMonochrome",
  props: {
    getter: { type: Function, required: !0 },
    name: { type: String, required: !0 }
  },
  setup(s) {
    const e = s, t = S(() => e.getter().getHeader(e.name)), n = p(""), g = S(() => n.value && n.value !== "" ? t.value.values.filteredValues(
      (y) => z(y, n.value)
    ) : t.value.values.values), a = p("none"), d = S(() => {
      switch (a.value) {
        case "none":
          return N;
        case "up":
          return L;
        case "down":
          return U;
        default:
          throw new Error("Invalid sort status");
      }
    }), v = p(!1), h = p([]), m = p(!1);
    function c(y) {
      return h.value.some((l) => l.equals(y));
    }
    function i() {
      if (t.value.type !== "button")
        switch (a.value) {
          case "none":
            a.value = "up", e.getter().sortByField(e.name, "up");
            break;
          case "up":
            a.value = "down", e.getter().sortByField(e.name, "down");
            break;
          case "down":
            a.value = "none", e.getter().sortByField(e.name, "none");
            break;
          default:
            throw new Error("Invalid sort status");
        }
    }
    function f() {
      v.value = !v.value;
    }
    function $(y) {
      const l = Z(h.value, y);
      l > -1 ? h.value.splice(l, 1) : h.value.push(y);
    }
    function x() {
      e.getter().addFilter(e.name, h.value), m.value = !0, f();
    }
    function D() {
      e.getter().removeFilter(e.name), h.value = [], m.value = !1, f();
    }
    return E(
      () => e.getter().change.filters,
      () => {
        e.getter().removeFilter(e.name), h.value = [], m.value = !1;
      }
    ), (y, l) => (o(), u("div", Ge, [
      r("div", Oe, [
        t.value.type !== "button" && e.getter().showFilters ? (o(), u("button", {
          key: 0,
          onClick: l[0] || (l[0] = (w) => f()),
          class: "cursor-pointer bg-gray-400 p-2 hover:bg-gray-500 rounded-lg opacity-70"
        }, [
          (o(), j(P(m.value ? J : W)))
        ])) : V("", !0),
        r("div", ze, [
          r("label", {
            class: "cursor-pointer",
            onClick: l[1] || (l[1] = (w) => i())
          }, b(t.value.title), 1),
          r("div", Ze, [
            (o(), j(P(d.value)))
          ])
        ])
      ]),
      v.value ? (o(), u("div", Ue, [
        r("form", {
          class: "max-w-md mx-auto",
          onSubmit: H(() => {
          }, ["prevent"])
        }, [
          r("div", Le, [
            l[5] || (l[5] = r("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" }, [
              r("svg", {
                class: "w-4 h-4 text-gray-500 dark:text-gray-400",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 20 20"
              }, [
                r("path", {
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                })
              ])
            ], -1)),
            M(r("input", {
              type: "search",
              id: "default-search",
              class: "block w-full p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50",
              required: "",
              "onUpdate:modelValue": l[2] || (l[2] = (w) => n.value = w)
            }, null, 512), [
              [G, n.value]
            ])
          ])
        ], 32),
        r("div", Ne, [
          r("ul", null, [
            (o(!0), u(_, null, C(g.value, (w) => (o(), u("li", {
              class: O(`${c(w) ? "li-element-selected" : "li-element-regular"}`),
              onClick: (te) => $(w)
            }, b(w.formattedValue()), 11, We))), 256))
          ])
        ]),
        M(r("div", Je, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer p-2 text-sm",
            onClick: l[3] || (l[3] = (w) => x())
          }, [
            k(K),
            l[6] || (l[6] = r("span", { class: "ml-1 mr-1" }, "Apply filter", -1))
          ])
        ], 512), [
          [T, h.value.length > 0]
        ]),
        r("div", Ke, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer p-2 text-sm",
            onClick: l[4] || (l[4] = (w) => D())
          }, [
            k(q),
            l[7] || (l[7] = r("span", { class: "ml-1 mr-1" }, "Clear filter", -1))
          ])
        ])
      ])) : V("", !0)
    ]));
  }
}, Xe = /* @__PURE__ */ F(Qe, [["__scopeId", "data-v-284c062a"]]), Ye = {}, et = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function tt(s, e) {
  return o(), u("svg", et, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m7 16 4-4-4-4m6 8 4-4-4-4"
    }, null, -1)
  ]));
}
const Q = /* @__PURE__ */ F(Ye, [["render", tt]]), rt = {}, nt = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function st(s, e) {
  return o(), u("svg", nt, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m10 16 4-4-4-4"
    }, null, -1)
  ]));
}
const X = /* @__PURE__ */ F(rt, [["render", st]]), ot = {}, lt = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function at(s, e) {
  return o(), u("svg", lt, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m14 8-4 4 4 4"
    }, null, -1)
  ]));
}
const Y = /* @__PURE__ */ F(ot, [["render", at]]), it = {}, ut = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function dt(s, e) {
  return o(), u("svg", ut, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m17 16-4-4 4-4m-6 8-4-4 4-4"
    }, null, -1)
  ]));
}
const ee = /* @__PURE__ */ F(it, [["render", dt]]), ct = { class: "border border-gray-400 rounded-xl" }, gt = { class: "flex flex-row justify-center p-1 rounded-t-xl bg-gray-400" }, ht = { class: "overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]" }, ft = {
  key: 0,
  class: "relative flex flex-row text-sm items-center justify-center"
}, pt = ["onClick"], vt = {
  key: 1,
  class: "relative flex flex-row text-sm items-center justify-center"
}, mt = { class: "inline-block align-middle p-2" }, wt = { class: "flex flex-row justify-normal p-4 rounded-b-xl bg-gray-200" }, xt = { class: "rounded-lg bg-gray-100" }, yt = { class: "p-1 font-medium text-gray-800" }, hr = {
  __name: "GridGreyMonochrome",
  props: {
    getter: { type: Function, required: !0 }
  },
  setup(s) {
    const e = s, t = p(e.getter().widthInfo), n = p(e.getter().visibleRows()), g = p(e.getter().title()), a = p(e.getter().headers), d = p(`Page ${e.getter().currentPage()} of ${e.getter().pages}`), v = p(e.getter().pagination);
    function h(c) {
      return c % 2 === 0;
    }
    E(
      () => e.getter().change.content,
      () => {
        n.value = e.getter().visibleRows(), t.value = e.getter().widthInfo, g.value = e.getter().title(), a.value = e.getter().headers, d.value = `Page ${e.getter().currentPage()} of ${e.getter().pages}`, v.value = e.getter().pagination;
      }
    );
    function m(c, i) {
      return c.effect(i.toModel());
    }
    return (c, i) => (o(), u("div", ct, [
      r("div", gt, [
        M(r("h3", { class: "text-lg font-medium text-white m-1" }, b(g.value), 513), [
          [T, s.getter().showTitle]
        ])
      ]),
      r("div", {
        class: "grid",
        style: I(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
      }, [
        (o(!0), u(_, null, C(a.value, (f) => (o(), j(Xe, {
          getter: e.getter,
          name: f.name,
          class: "bg-gray-400 p-1 text-white text-lg font-medium",
          style: I(`grid-column: span ${t.value.widths[f.name]} / span ${t.value.widths[f.name]};`)
        }, null, 8, ["getter", "name", "style"]))), 256))
      ], 4),
      r("div", ht, [
        (o(!0), u(_, null, C(n.value, (f, $) => (o(), u("div", {
          class: "grid",
          style: I(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
        }, [
          (o(!0), u(_, null, C(f.cells, (x) => (o(), u("div", {
            class: "p-1",
            style: I(`background-color: ${h($) ? "oklch(87.2% 0.01 258.338)" : "oklch(96.7% 0.003 264.542)"}; grid-column: span ${t.value.widths[x.key]} / span ${t.value.widths[x.key]};`)
          }, [
            x.buttonInfo ? (o(), u("div", ft, [
              r("button", {
                class: "flex flex-row p-2 cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-500 text-white",
                onClick: (D) => m(x.buttonInfo, f)
              }, [
                (o(), j(P(x.buttonInfo.icon()))),
                r("span", null, b(x.buttonInfo.text), 1)
              ], 8, pt)
            ])) : (o(), u("div", vt, [
              r("span", mt, b(x.value.formattedValue()), 1)
            ]))
          ], 4))), 256))
        ], 4))), 256))
      ]),
      r("div", wt, [
        r("button", {
          class: "flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer text-gray-50 p-1 px-2 mr-2",
          onClick: i[0] || (i[0] = () => e.getter().removeAllFilters())
        }, [
          k(q),
          i[6] || (i[6] = r("span", { class: "ml-1" }, "Remove filters", -1))
        ]),
        i[7] || (i[7] = r("label", { class: "p-1 mr-1 font-medium text-gray-800" }, " Rows per page: ", -1)),
        r("select", {
          class: "bg-gray-100 rounded-lg p-1 mr-2",
          onChange: i[1] || (i[1] = (f) => e.getter().setPageSize(f.target.value))
        }, [
          (o(!0), u(_, null, C(v.value, (f) => (o(), u("option", xt, b(f), 1))), 256))
        ], 32),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: i[2] || (i[2] = () => e.getter().firstPage())
        }, [
          k(ee)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: i[3] || (i[3] = () => e.getter().previousPage())
        }, [
          k(Y)
        ]),
        r("label", yt, b(d.value), 1),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: i[4] || (i[4] = () => e.getter().nextPage())
        }, [
          k(X)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: i[5] || (i[5] = () => e.getter().lastPage())
        }, [
          k(Q)
        ])
      ])
    ]));
  }
}, bt = { class: "inline-block p-1" }, kt = { class: "p-1 flex flex-row justify-center text-center" }, $t = { class: "flex flex-row justify-center text-center p-2" }, _t = { class: "p-1" }, Ct = {
  key: 0,
  class: "block absolute bg-gray-900 shadow-lg min-w-42 z-10 rounded-lg p-2"
}, Ft = { class: "relative" }, It = { class: "border border-gray-700 overflow-y-auto max-h-48 rounded-lg p-1 bg-gray-950 mt-1" }, jt = ["onClick"], St = { class: "mt-1 flex justify-center items-center" }, Bt = { class: "mt-1 flex justify-center items-center" }, Pt = {
  __name: "GridHeaderDark",
  props: {
    getter: { type: Function, required: !0 },
    name: { type: String, required: !0 }
  },
  setup(s) {
    const e = s, t = S(() => e.getter().getHeader(e.name)), n = p(""), g = S(() => n.value && n.value !== "" ? t.value.values.filteredValues(
      (y) => z(y, n.value)
    ) : t.value.values.values), a = p("none"), d = S(() => {
      switch (a.value) {
        case "none":
          return N;
        case "up":
          return L;
        case "down":
          return U;
        default:
          throw new Error("Invalid sort status");
      }
    }), v = p(!1), h = p([]), m = p(!1);
    function c(y) {
      return h.value.some((l) => l.equals(y));
    }
    function i() {
      if (t.value.type !== "button")
        switch (a.value) {
          case "none":
            a.value = "up", e.getter().sortByField(e.name, "up");
            break;
          case "up":
            a.value = "down", e.getter().sortByField(e.name, "down");
            break;
          case "down":
            a.value = "none", e.getter().sortByField(e.name, "none");
            break;
          default:
            throw new Error("Invalid sort status");
        }
    }
    function f() {
      v.value = !v.value;
    }
    function $(y) {
      const l = Z(h.value, y);
      l > -1 ? h.value.splice(l, 1) : h.value.push(y);
    }
    function x() {
      e.getter().addFilter(e.name, h.value), m.value = !0, f();
    }
    function D() {
      e.getter().removeFilter(e.name), h.value = [], m.value = !1, f();
    }
    return E(
      () => e.getter().change.filters,
      () => {
        e.getter().removeFilter(e.name), h.value = [], m.value = !1;
      }
    ), (y, l) => (o(), u("div", bt, [
      r("div", kt, [
        t.value.type !== "button" && e.getter().showFilters ? (o(), u("button", {
          key: 0,
          onClick: l[0] || (l[0] = (w) => f()),
          class: "cursor-pointer bg-gray-600 p-2 hover:bg-gray-500 rounded-lg opacity-70"
        }, [
          (o(), j(P(m.value ? J : W)))
        ])) : V("", !0),
        r("div", $t, [
          r("label", {
            class: "cursor-pointer",
            onClick: l[1] || (l[1] = (w) => i())
          }, b(t.value.title), 1),
          r("div", _t, [
            (o(), j(P(d.value)))
          ])
        ])
      ]),
      v.value ? (o(), u("div", Ct, [
        r("form", {
          class: "max-w-md mx-auto",
          onSubmit: H(() => {
          }, ["prevent"])
        }, [
          r("div", Ft, [
            l[5] || (l[5] = r("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" }, [
              r("svg", {
                class: "w-4 h-4 text-gray-9500 dark:text-gray-400",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 20 20"
              }, [
                r("path", {
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                })
              ])
            ], -1)),
            M(r("input", {
              type: "search",
              id: "default-search",
              class: "block w-full p-2 ps-9 text-sm text-gray-100 border border-gray-700 rounded-lg bg-gray-950",
              required: "",
              "onUpdate:modelValue": l[2] || (l[2] = (w) => n.value = w)
            }, null, 512), [
              [G, n.value]
            ])
          ])
        ], 32),
        r("div", It, [
          r("ul", null, [
            (o(!0), u(_, null, C(g.value, (w) => (o(), u("li", {
              class: O(`${c(w) ? "li-element-selected" : "li-element-regular"}`),
              onClick: (te) => $(w)
            }, b(w.formattedValue()), 11, jt))), 256))
          ])
        ]),
        M(r("div", St, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-600 hover:bg-gray-9500 cursor-pointer p-2 text-sm",
            onClick: l[3] || (l[3] = (w) => x())
          }, [
            k(K),
            l[6] || (l[6] = r("span", { class: "ml-1 mr-1" }, "Apply filter", -1))
          ])
        ], 512), [
          [T, h.value.length > 0]
        ]),
        r("div", Bt, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-600 hover:bg-gray-9500 cursor-pointer p-2 text-sm",
            onClick: l[4] || (l[4] = (w) => D())
          }, [
            k(q),
            l[7] || (l[7] = r("span", { class: "ml-1 mr-1" }, "Clear filter", -1))
          ])
        ])
      ])) : V("", !0)
    ]));
  }
}, Mt = /* @__PURE__ */ F(Pt, [["__scopeId", "data-v-b23f98ae"]]), Dt = { class: "border border-gray-600 rounded-xl" }, Vt = { class: "flex flex-row justify-center p-1 rounded-t-xl bg-gray-600" }, Et = { class: "overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]" }, Tt = {
  key: 0,
  class: "relative flex flex-row text-sm items-center justify-center"
}, qt = ["onClick"], Rt = {
  key: 1,
  class: "relative flex flex-row text-sm items-center justify-center text-white"
}, At = { class: "inline-block align-middle p-2" }, Ht = { class: "flex flex-row justify-normal p-4 rounded-b-xl bg-gray-800" }, Gt = { class: "bg-gray-900" }, Ot = { class: "p-1 font-medium text-gray-200" }, fr = {
  __name: "GridDark",
  props: {
    getter: { type: Function, required: !0 }
  },
  setup(s) {
    const e = s, t = p(e.getter().widthInfo), n = p(e.getter().visibleRows()), g = p(e.getter().title()), a = p(e.getter().headers), d = p(`Page ${e.getter().currentPage()} of ${e.getter().pages}`), v = p(e.getter().pagination);
    function h(c) {
      return c % 2 === 0;
    }
    E(
      () => e.getter().change.content,
      () => {
        n.value = e.getter().visibleRows(), t.value = e.getter().widthInfo, g.value = e.getter().title(), a.value = e.getter().headers, d.value = `Page ${e.getter().currentPage()} of ${e.getter().pages}`, v.value = e.getter().pagination;
      }
    );
    function m(c, i) {
      return c.effect(i.toModel());
    }
    return (c, i) => (o(), u("div", Dt, [
      r("div", Vt, [
        M(r("h3", { class: "text-lg font-medium text-gray-200 m-1" }, b(g.value), 513), [
          [T, s.getter().showTitle]
        ])
      ]),
      r("div", {
        class: "grid",
        style: I(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
      }, [
        (o(!0), u(_, null, C(a.value, (f) => (o(), j(Mt, {
          getter: e.getter,
          name: f.name,
          class: "bg-gray-600 p-1 text-white text-lg font-medium",
          style: I(`grid-column: span ${t.value.widths[f.name]} / span ${t.value.widths[f.name]};`)
        }, null, 8, ["getter", "name", "style"]))), 256))
      ], 4),
      r("div", Et, [
        (o(!0), u(_, null, C(n.value, (f, $) => (o(), u("div", {
          class: "grid",
          style: I(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
        }, [
          (o(!0), u(_, null, C(f.cells, (x) => (o(), u("div", {
            class: "p-1",
            style: I(`background-color: ${h($) ? "oklch(37.3% 0.034 259.733)" : "oklch(21% 0.034 264.665)"}; grid-column: span ${t.value.widths[x.key]} / span ${t.value.widths[x.key]};`)
          }, [
            x.buttonInfo ? (o(), u("div", Tt, [
              r("button", {
                class: "flex flex-row p-2 cursor-pointer rounded-lg bg-gray-600 hover:bg-gray-500 text-white",
                onClick: (D) => m(x.buttonInfo, f)
              }, [
                (o(), j(P(x.buttonInfo.icon()))),
                r("span", null, b(x.buttonInfo.text), 1)
              ], 8, qt)
            ])) : (o(), u("div", Rt, [
              r("span", At, b(x.value.formattedValue()), 1)
            ]))
          ], 4))), 256))
        ], 4))), 256))
      ]),
      r("div", Ht, [
        r("button", {
          class: "flex flex-row rounded-lg bg-gray-600 hover:bg-gray-500 cursor-pointer text-gray-50 p-1 px-2 mr-2",
          onClick: i[0] || (i[0] = () => e.getter().removeAllFilters())
        }, [
          k(q),
          i[6] || (i[6] = r("span", { class: "ml-1" }, "Remove filters", -1))
        ]),
        i[7] || (i[7] = r("label", { class: "p-1 mr-1 font-medium text-gray-200" }, " Rows per page: ", -1)),
        r("select", {
          class: "bg-gray-900 rounded-lg p-1 mr-2 text-gray-50",
          onChange: i[1] || (i[1] = (f) => e.getter().setPageSize(f.target.value))
        }, [
          (o(!0), u(_, null, C(v.value, (f) => (o(), u("option", Gt, b(f), 1))), 256))
        ], 32),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: i[2] || (i[2] = () => e.getter().firstPage())
        }, [
          k(ee)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: i[3] || (i[3] = () => e.getter().previousPage())
        }, [
          k(Y)
        ]),
        r("label", Ot, b(d.value), 1),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: i[4] || (i[4] = () => e.getter().nextPage())
        }, [
          k(X)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: i[5] || (i[5] = () => e.getter().lastPage())
        }, [
          k(Q)
        ])
      ])
    ]));
  }
}, zt = { class: "inline-block p-1" }, Zt = { class: "p-1 flex flex-row justify-center text-center" }, Ut = { class: "flex flex-row text-center p-2" }, Lt = { class: "p-1" }, Nt = {
  key: 0,
  class: "block absolute bg-white shadow-lg min-w-42 z-10 rounded-lg p-2"
}, Wt = { class: "relative" }, Jt = { class: "overflow-y-auto max-h-48 rounded-lg p-1 bg-white mt-1" }, Kt = ["onClick"], Qt = { class: "mt-1 flex justify-center items-center" }, Xt = { class: "mt-1 flex justify-center items-center" }, Yt = {
  __name: "GridHeaderEmerald",
  props: {
    getter: { type: Function, required: !0 },
    name: { type: String, required: !0 }
  },
  setup(s) {
    const e = s, t = S(() => e.getter().getHeader(e.name)), n = p(""), g = S(() => n.value && n.value !== "" ? t.value.values.filteredValues(
      (y) => z(y, n.value)
    ) : t.value.values.values), a = p("none"), d = S(() => {
      switch (a.value) {
        case "none":
          return N;
        case "up":
          return L;
        case "down":
          return U;
        default:
          throw new Error("Invalid sort status");
      }
    }), v = p(!1), h = p([]), m = p(!1);
    function c(y) {
      return h.value.some((l) => l.equals(y));
    }
    function i() {
      if (t.value.type !== "button")
        switch (a.value) {
          case "none":
            a.value = "up", e.getter().sortByField(e.name, "up");
            break;
          case "up":
            a.value = "down", e.getter().sortByField(e.name, "down");
            break;
          case "down":
            a.value = "none", e.getter().sortByField(e.name, "none");
            break;
          default:
            throw new Error("Invalid sort status");
        }
    }
    function f() {
      v.value = !v.value;
    }
    function $(y) {
      const l = Z(h.value, y);
      l > -1 ? h.value.splice(l, 1) : h.value.push(y);
    }
    function x() {
      e.getter().addFilter(e.name, h.value), m.value = !0, f();
    }
    function D() {
      e.getter().removeFilter(e.name), h.value = [], m.value = !1, f();
    }
    return E(
      () => e.getter().change.filters,
      () => {
        e.getter().removeFilter(e.name), h.value = [], m.value = !1;
      }
    ), (y, l) => (o(), u("div", zt, [
      r("div", Zt, [
        t.value.type !== "button" && e.getter().showFilters ? (o(), u("button", {
          key: 0,
          onClick: l[0] || (l[0] = (w) => f()),
          class: "cursor-pointer bg-emerald-400 p-2 hover:bg-emerald-500 rounded-lg opacity-70"
        }, [
          (o(), j(P(m.value ? J : W)))
        ])) : V("", !0),
        r("div", Ut, [
          r("label", {
            class: "cursor-pointer",
            onClick: l[1] || (l[1] = (w) => i())
          }, b(t.value.title), 1),
          r("div", Lt, [
            (o(), j(P(d.value)))
          ])
        ])
      ]),
      v.value ? (o(), u("div", Nt, [
        r("form", {
          class: "max-w-md mx-auto",
          onSubmit: H(() => {
          }, ["prevent"])
        }, [
          r("div", Wt, [
            l[5] || (l[5] = r("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" }, [
              r("svg", {
                class: "w-4 h-4 text-emerald-500 dark:text-emerald-400",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 20 20"
              }, [
                r("path", {
                  stroke: "currentColor",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                })
              ])
            ], -1)),
            M(r("input", {
              type: "search",
              id: "default-search",
              class: "block w-full p-2 ps-9 text-sm text-gray-900 border border-emerald-300 rounded-lg bg-white",
              required: "",
              "onUpdate:modelValue": l[2] || (l[2] = (w) => n.value = w)
            }, null, 512), [
              [G, n.value]
            ])
          ])
        ], 32),
        r("div", Jt, [
          r("ul", null, [
            (o(!0), u(_, null, C(g.value, (w) => (o(), u("li", {
              class: O(`${c(w) ? "li-element-selected" : "li-element-regular"}`),
              onClick: (te) => $(w)
            }, b(w.formattedValue()), 11, Kt))), 256))
          ])
        ]),
        M(r("div", Qt, [
          r("button", {
            class: "flex flex-row rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer p-2 text-sm",
            onClick: l[3] || (l[3] = (w) => x())
          }, [
            k(K),
            l[6] || (l[6] = r("span", { class: "ml-1 mr-1" }, "Apply filter", -1))
          ])
        ], 512), [
          [T, h.value.length > 0]
        ]),
        r("div", Xt, [
          r("button", {
            class: "flex flex-row rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer p-2 text-sm",
            onClick: l[4] || (l[4] = (w) => D())
          }, [
            k(q),
            l[7] || (l[7] = r("span", { class: "ml-1 mr-1" }, "Clear filter", -1))
          ])
        ])
      ])) : V("", !0)
    ]));
  }
}, er = /* @__PURE__ */ F(Yt, [["__scopeId", "data-v-56fcfa76"]]), tr = { class: "rounded-xl" }, rr = { class: "flex flex-row justify-center p-1 rounded-t-xl bg-emerald-400" }, nr = { class: "overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]" }, sr = {
  key: 0,
  class: "relative flex flex-row text-sm items-center justify-center"
}, or = ["onClick"], lr = {
  key: 1,
  class: "relative flex flex-row text-sm items-center justify-center"
}, ar = { class: "inline-block align-middle p-2" }, ir = { class: "flex flex-row justify-normal p-4 rounded-b-xl bg-white" }, ur = { class: "rounded-lg bg-gray-100" }, dr = { class: "p-1 font-medium text-gray-800" }, pr = {
  __name: "GridEmerald",
  props: {
    getter: { type: Function, required: !0 }
  },
  setup(s) {
    const e = s, t = p(e.getter().widthInfo), n = p(e.getter().visibleRows()), g = p(e.getter().title()), a = p(e.getter().headers), d = p(`Page ${e.getter().currentPage()} of ${e.getter().pages}`), v = p(e.getter().pagination);
    E(
      () => e.getter().change.content,
      () => {
        n.value = e.getter().visibleRows(), t.value = e.getter().widthInfo, g.value = e.getter().title(), a.value = e.getter().headers, d.value = `Page ${e.getter().currentPage()} of ${e.getter().pages}`, v.value = e.getter().pagination;
      }
    );
    function h(m, c) {
      return m.effect(c.toModel());
    }
    return (m, c) => (o(), u("div", tr, [
      r("div", rr, [
        M(r("h3", { class: "text-lg font-medium text-white m-1" }, b(g.value), 513), [
          [T, s.getter().showTitle]
        ])
      ]),
      r("div", {
        class: "grid",
        style: I(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
      }, [
        (o(!0), u(_, null, C(a.value, (i) => (o(), j(er, {
          getter: e.getter,
          name: i.name,
          class: "bg-emerald-400 p-1 text-white text-lg font-medium",
          style: I(`grid-column: span ${t.value.widths[i.name]} / span ${t.value.widths[i.name]};`)
        }, null, 8, ["getter", "name", "style"]))), 256))
      ], 4),
      r("div", nr, [
        (o(!0), u(_, null, C(n.value, (i, f) => (o(), u("div", {
          class: "grid",
          style: I(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
        }, [
          (o(!0), u(_, null, C(i.cells, ($) => (o(), u("div", {
            class: "p-1 bg-white",
            style: I(`grid-column: span ${t.value.widths[$.key]} / span ${t.value.widths[$.key]};`)
          }, [
            $.buttonInfo ? (o(), u("div", sr, [
              r("button", {
                class: "flex flex-row p-2 cursor-pointer rounded-lg bg-emerald-400 hover:bg-emerald-500 text-white",
                onClick: (x) => h($.buttonInfo, i)
              }, [
                (o(), j(P($.buttonInfo.icon()))),
                r("span", null, b($.buttonInfo.text), 1)
              ], 8, or)
            ])) : (o(), u("div", lr, [
              r("span", ar, b($.value.formattedValue()), 1)
            ]))
          ], 4))), 256))
        ], 4))), 256))
      ]),
      r("div", ir, [
        r("button", {
          class: "flex flex-row rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white p-1 px-2 mr-2",
          onClick: c[0] || (c[0] = () => e.getter().removeAllFilters())
        }, [
          k(q),
          c[6] || (c[6] = r("span", { class: "ml-1" }, "Remove filters", -1))
        ]),
        c[7] || (c[7] = r("label", { class: "p-1 mr-1 font-medium text-gray-800" }, " Rows per page: ", -1)),
        r("select", {
          class: "bg-white rounded-lg p-1 mr-2",
          onChange: c[1] || (c[1] = (i) => e.getter().setPageSize(i.target.value))
        }, [
          (o(!0), u(_, null, C(v.value, (i) => (o(), u("option", ur, b(i), 1))), 256))
        ], 32),
        r("button", {
          class: "rounded-lg hover:bg-emerald-300 cursor-pointer p-1",
          onClick: c[2] || (c[2] = () => e.getter().firstPage())
        }, [
          k(ee)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-emerald-300 cursor-pointer p-1",
          onClick: c[3] || (c[3] = () => e.getter().previousPage())
        }, [
          k(Y)
        ]),
        r("label", dr, b(d.value), 1),
        r("button", {
          class: "rounded-lg hover:bg-emerald-300 cursor-pointer p-1",
          onClick: c[4] || (c[4] = () => e.getter().nextPage())
        }, [
          k(X)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-emerald-300 cursor-pointer p-1",
          onClick: c[5] || (c[5] = () => e.getter().lastPage())
        }, [
          k(Q)
        ])
      ])
    ]));
  }
};
export {
  fr as GridDark,
  pr as GridEmerald,
  hr as GridGreyMonochrome,
  gr as Table
};
