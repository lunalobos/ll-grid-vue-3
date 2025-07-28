import { shallowReactive as le, createElementBlock as d, openBlock as l, createElementVNode as r, computed as D, ref as p, watch as T, withDirectives as B, createCommentVNode as H, createBlock as S, resolveDynamicComponent as j, toDisplayString as b, withModifiers as R, vModelText as z, Fragment as C, renderList as F, normalizeClass as G, createVNode as k, vShow as P, normalizeStyle as M } from "vue";
function Z(s) {
  const e = s.replace(/([A-Z])/g, " $1");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ae(s, e, t) {
  let n = 0, c = s.length - 1;
  for (; n <= c; ) {
    let o = c + n >> 1, u = t(e, s[o]);
    if (u > 0)
      n = o + 1;
    else if (u < 0)
      c = o - 1;
    else
      return o;
  }
  return ~n;
}
function U(s, e) {
  return s.formattedValue().includes(e);
}
function L(s, e) {
  for (let t = 0; t < s.length; t++)
    if (e.equals(s[t]))
      return t;
  return -1;
}
function q(s, e) {
  if (s.type !== e.type) {
    const t = new I(new String(s.value).valueOf()), n = new I(new String(e.value).valueOf());
    return q(t, n);
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
  const c = n[1];
  return s.toFixed(c);
}
const de = {
  date: "en-US",
  decimal: "%.2",
  integer: "%.0",
  number: "%.0"
};
class I {
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
    return e ? e == this ? !0 : e instanceof I ? this.value === e.value && this.format === e.format && this.type === e.type : !1 : !1;
  }
  /**
   *
   * @param {Value} other
   */
  compareTo(e) {
    if (this.type !== e.type) {
      const t = new I(new String(this.value).valueOf()), n = new I(new String(e.value).valueOf());
      return q(t, n);
    } else
      return q(this, e);
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
class W {
  /**
   *
   * @param {string} name
   * @param {string} type
   * @param {Array<Value>} allValues
   */
  constructor(e, t, n = []) {
    this.name = e, this.title = Z(this.name), this.type = t, this.values = new he(n);
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
  return s.cells.map((e) => new W(e.key, e.value.type));
}
function ve(s, e, t = {}) {
  const n = [];
  for (let c = 0; c < s.length; c++) {
    const o = s[c], u = Object.keys(o), f = [];
    for (let v = 0; v < u.length; v++) {
      const w = u[v], a = o[w], g = e[w] ? e[w] : "text", $ = t[w], m = $ ? new A(w, new I(a, g, $)) : new A(w, new I(a, g));
      f.push(m);
    }
    const h = new fe(f);
    n.push(h);
  }
  return me(n);
}
function me(s) {
  const e = {};
  if (e.rows = s, e.headers = [], s.length > 0) {
    e.headers = pe(s[0]);
    for (let t = 0; t < e.headers.length; t++) {
      let n = e.headers[t], c = s.map(
        (o) => o.cells.find((u) => u.key === n.name).value
      );
      n.values.addAll(c);
    }
  }
  e.headersModel = {};
  for (let t = 0; t < e.headers.length; t++)
    e.headersModel[e.headers[t].name] = e.headers[t];
  return e;
}
function N(s, e) {
  return e === 0 ? s : N(e, s % e);
}
function we(s) {
  return s.reduce((e, t) => N(e, t));
}
function xe(s) {
  return Math.ceil(Math.pow(s + 12, 0.75));
}
function E(s) {
  const e = s.map((o) => {
    if (o.type === "button")
      return { name: o.name, width: 8 };
    const u = o.values.values.map(
      (h) => xe(h.formattedValue().length)
    );
    u.push(o.title.length);
    const f = u.reduce((h, v) => Math.max(h, v), 0);
    return { name: o.name, width: f };
  }), t = we(e.map((o) => o.width)), n = e.map((o) => ({ name: o.name, width: o.width / t }));
  return {
    total: n.reduce((o, u) => o + u.width, 0),
    widths: n.reduce((o, u) => (o[u.name] = u.width, o), {})
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
class Zt {
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
    const { types: c, formats: o, pagination: u } = n;
    this.name = e;
    const { rows: f, headers: h, headersModel: v } = ve(
      t,
      c,
      o
    );
    this.rows = f, this.headers = h, this.headersModel = v, this.filters = {}, this.sortBy = {}, u.length === 0 && (u.push(10), u.push(20), u.push(50)), this.pageSize = u[0] > 0 ? u[0] : 10, this.pagination = u, this.page = 0, this.pages = this.pageSize > 0 ? Math.ceil(this.rows.length / this.pageSize) : 1, this.change.content = /* @__PURE__ */ new Date(), this.widthInfo = E(this.headers);
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
    return Z(this.name);
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
      const c = n.cells.find((u) => u.key === e).value;
      let o = !1;
      return t.forEach((u) => o |= c.equals(u)), o;
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
        return this.sortBy.sorter = (n, c) => n.getCell(e).value.compareTo(c.getCell(e).value), this.change.content = /* @__PURE__ */ new Date(), !0;
      case "down":
        return this.sortBy.sorter = (n, c) => -n.getCell(e).value.compareTo(c.getCell(e).value), this.change.content = /* @__PURE__ */ new Date(), !0;
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
  addButton(e, t, n, c = "") {
    this.headers.unshift(new W(c, "button"));
    const o = new ce(() => e, t, n), u = new A(c, new I(""), o);
    this.rows.forEach((f) => {
      f.cells.unshift(u);
    }), this.widthInfo = E(this.headers), this.change.content = /* @__PURE__ */ new Date();
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
const _ = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, c] of e)
    t[n] = c;
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
function _e(s, e) {
  return l(), d("svg", ke, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z"
    }, null, -1)
  ]));
}
const J = /* @__PURE__ */ _(be, [["render", _e]]), $e = {}, Ce = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function Fe(s, e) {
  return l(), d("svg", Ce, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M16.881 16H7.119a1 1 0 0 1-.772-1.636l4.881-5.927a1 1 0 0 1 1.544 0l4.88 5.927a1 1 0 0 1-.77 1.636Z"
    }, null, -1)
  ]));
}
const K = /* @__PURE__ */ _($e, [["render", Fe]]), Ie = {};
function Me(s, e) {
  return null;
}
const Q = /* @__PURE__ */ _(Ie, [["render", Me]]), Be = {}, Se = {
  class: "w-5 h-5 text-white",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function De(s, e) {
  return l(), d("svg", Se, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-width": "2",
      d: "M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
    }, null, -1)
  ]));
}
const X = /* @__PURE__ */ _(Be, [["render", De]]), je = {}, Pe = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Ve(s, e) {
  return l(), d("svg", Pe, e[0] || (e[0] = [
    r("path", { d: "M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z" }, null, -1)
  ]));
}
const Y = /* @__PURE__ */ _(je, [["render", Ve]]), Te = {}, Oe = {
  class: "w-5 h-5",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function qe(s, e) {
  return l(), d("svg", Oe, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
    }, null, -1)
  ]));
}
const O = /* @__PURE__ */ _(Te, [["render", qe]]), Ae = {}, Ee = {
  class: "w-6 h-6 text-gray-800 dark:text-white",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function He(s, e) {
  return l(), d("svg", Ee, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 11.917 9.724 16.5 19 7.5"
    }, null, -1)
  ]));
}
const ee = /* @__PURE__ */ _(Ae, [["render", He]]), Re = { class: "inline-block p-1" }, ze = { class: "p-1 flex flex-row justify-center text-center" }, Ge = { class: "flex flex-row text-center p-2" }, Ze = { class: "p-1" }, Ue = { class: "block absolute bg-gray-100 shadow-lg min-w-42 z-10 rounded-lg p-2" }, Le = { class: "relative" }, We = { class: "border border-gray-300 overflow-y-auto max-h-48 rounded-lg p-1 bg-gray-50 mt-1" }, Ne = ["onClick"], Je = { class: "mt-1 flex justify-center items-center" }, Ke = { class: "mt-1 flex justify-center items-center" }, Qe = {
  __name: "GridHeaderGrayMonochrome",
  props: {
    getter: { type: Function, required: !0 },
    name: { type: String, required: !0 }
  },
  setup(s) {
    const e = s, t = D(() => e.getter().getHeader(e.name)), n = p(""), c = D(() => n.value && n.value !== "" ? t.value.values.filteredValues(
      (y) => U(y, n.value)
    ) : t.value.values.values), o = p("none"), u = D(() => {
      switch (o.value) {
        case "none":
          return Q;
        case "up":
          return K;
        case "down":
          return J;
        default:
          throw new Error("Invalid sort status");
      }
    }), f = p(!1), h = p([]), v = p(!1);
    function w(y) {
      return h.value.some((i) => i.equals(y));
    }
    function a() {
      if (t.value.type !== "button")
        switch (o.value) {
          case "none":
            o.value = "up", e.getter().sortByField(e.name, "up");
            break;
          case "up":
            o.value = "down", e.getter().sortByField(e.name, "down");
            break;
          case "down":
            o.value = "none", e.getter().sortByField(e.name, "none");
            break;
          default:
            throw new Error("Invalid sort status");
        }
    }
    function g() {
      f.value = !f.value;
    }
    function $(y) {
      const i = L(h.value, y);
      i > -1 ? h.value.splice(i, 1) : h.value.push(y);
    }
    function m() {
      e.getter().addFilter(e.name, h.value), v.value = !0, g();
    }
    function V() {
      e.getter().removeFilter(e.name), h.value = [], v.value = !1, g();
    }
    return T(
      () => e.getter().change.filters,
      () => {
        e.getter().removeFilter(e.name), h.value = [], v.value = !1;
      }
    ), (y, i) => (l(), d("div", Re, [
      r("div", ze, [
        t.value.type !== "button" && e.getter().showFilters ? (l(), d("button", {
          key: 0,
          onClick: i[0] || (i[0] = (x) => g()),
          class: "cursor-pointer bg-gray-400 p-2 hover:bg-gray-500 rounded-lg opacity-70"
        }, [
          (l(), S(j(v.value ? Y : X)))
        ])) : H("", !0),
        r("div", Ge, [
          r("label", {
            class: "cursor-pointer",
            onClick: i[1] || (i[1] = (x) => a())
          }, b(t.value.title), 1),
          r("div", Ze, [
            (l(), S(j(u.value)))
          ])
        ])
      ]),
      B(r("div", Ue, [
        r("form", {
          class: "max-w-md mx-auto",
          onSubmit: R(() => {
          }, ["prevent"])
        }, [
          r("div", Le, [
            i[5] || (i[5] = r("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" }, [
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
            B(r("input", {
              type: "search",
              id: "default-search",
              class: "block w-full p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50",
              required: "",
              "onUpdate:modelValue": i[2] || (i[2] = (x) => n.value = x)
            }, null, 512), [
              [z, n.value]
            ])
          ])
        ], 32),
        r("div", We, [
          r("ul", null, [
            (l(!0), d(C, null, F(c.value, (x) => (l(), d("li", {
              class: G(`${w(x) ? "li-element-selected" : "li-element-regular"}`),
              onClick: (oe) => $(x)
            }, b(x.formattedValue()), 11, Ne))), 256))
          ])
        ]),
        B(r("div", Je, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer p-2 text-sm",
            onClick: i[3] || (i[3] = (x) => m())
          }, [
            k(ee),
            i[6] || (i[6] = r("span", { class: "ml-1 mr-1" }, "Apply filter", -1))
          ])
        ], 512), [
          [P, h.value.length > 0]
        ]),
        r("div", Ke, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer p-2 text-sm",
            onClick: i[4] || (i[4] = (x) => V())
          }, [
            k(O),
            i[7] || (i[7] = r("span", { class: "ml-1 mr-1" }, "Clear filter", -1))
          ])
        ])
      ], 512), [
        [P, f.value]
      ])
    ]));
  }
}, Xe = /* @__PURE__ */ _(Qe, [["__scopeId", "data-v-e3620bdd"]]), Ye = {}, et = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function tt(s, e) {
  return l(), d("svg", et, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m7 16 4-4-4-4m6 8 4-4-4-4"
    }, null, -1)
  ]));
}
const te = /* @__PURE__ */ _(Ye, [["render", tt]]), rt = {}, nt = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function st(s, e) {
  return l(), d("svg", nt, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m10 16 4-4-4-4"
    }, null, -1)
  ]));
}
const re = /* @__PURE__ */ _(rt, [["render", st]]), ot = {}, lt = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function at(s, e) {
  return l(), d("svg", lt, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m14 8-4 4 4 4"
    }, null, -1)
  ]));
}
const ne = /* @__PURE__ */ _(ot, [["render", at]]), it = {}, ut = {
  class: "w-6 h-6",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  viewBox: "0 0 24 24"
};
function dt(s, e) {
  return l(), d("svg", ut, e[0] || (e[0] = [
    r("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m17 16-4-4 4-4m-6 8-4-4 4-4"
    }, null, -1)
  ]));
}
const se = /* @__PURE__ */ _(it, [["render", dt]]), ct = { class: "border border-gray-400 rounded-xl" }, gt = { class: "flex flex-row justify-center p-1 rounded-t-xl bg-gray-400" }, ht = { class: "overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]" }, ft = {
  key: 0,
  class: "relative flex flex-row text-sm items-center justify-center"
}, pt = ["onClick"], vt = {
  key: 1,
  class: "relative flex flex-row text-sm items-center justify-center"
}, mt = { class: "inline-block align-middle p-2" }, wt = { class: "flex flex-row justify-end p-4 rounded-b-xl bg-gray-200" }, xt = { class: "rounded-lg bg-gray-100" }, yt = { class: "p-1 font-medium text-gray-800" }, Ut = {
  __name: "GridGreyMonochrome",
  props: {
    getter: { type: Function, required: !0 }
  },
  setup(s) {
    const e = s, t = p(e.getter().widthInfo), n = p(e.getter().visibleRows()), c = p(e.getter().title()), o = p(e.getter().headers), u = p(`Page ${e.getter().currentPage()} of ${e.getter().pages}`), f = p(e.getter().pagination);
    function h(w) {
      return w % 2 === 0;
    }
    T(
      () => e.getter().change.content,
      () => {
        n.value = e.getter().visibleRows(), t.value = e.getter().widthInfo, c.value = e.getter().title(), o.value = e.getter().headers, u.value = `Page ${e.getter().currentPage()} of ${e.getter().pages}`, f.value = e.getter().pagination;
      }
    );
    function v(w, a) {
      return w.effect(a.toModel());
    }
    return (w, a) => (l(), d("div", ct, [
      r("div", gt, [
        B(r("h3", { class: "text-lg font-medium text-white m-1" }, b(c.value), 513), [
          [P, s.getter().showTitle]
        ])
      ]),
      r("div", {
        class: "grid",
        style: M(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
      }, [
        (l(!0), d(C, null, F(o.value, (g) => (l(), S(Xe, {
          getter: e.getter,
          name: g.name,
          class: "bg-gray-400 p-1 text-white text-lg font-medium",
          style: M(`grid-column: span ${t.value.widths[g.name]} / span ${t.value.widths[g.name]};`)
        }, null, 8, ["getter", "name", "style"]))), 256))
      ], 4),
      r("div", ht, [
        (l(!0), d(C, null, F(n.value, (g, $) => (l(), d("div", {
          class: "grid",
          style: M(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
        }, [
          (l(!0), d(C, null, F(g.cells, (m) => (l(), d("div", {
            class: "p-1",
            style: M(`background-color: ${h($) ? "oklch(87.2% 0.01 258.338)" : "oklch(96.7% 0.003 264.542)"}; grid-column: span ${t.value.widths[m.key]} / span ${t.value.widths[m.key]};`)
          }, [
            m.buttonInfo ? (l(), d("div", ft, [
              r("button", {
                class: "flex flex-row p-2 cursor-pointer rounded-lg bg-gray-400 hover:bg-gray-500 text-white",
                onClick: (V) => v(m.buttonInfo, g)
              }, [
                (l(), S(j(m.buttonInfo.icon()))),
                r("span", null, b(m.buttonInfo.text), 1)
              ], 8, pt)
            ])) : (l(), d("div", vt, [
              r("span", mt, b(m.value.formattedValue()), 1)
            ]))
          ], 4))), 256))
        ], 4))), 256))
      ]),
      r("div", wt, [
        r("button", {
          class: "flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer text-gray-50 p-1 px-2 mr-2",
          onClick: a[0] || (a[0] = () => e.getter().removeAllFilters())
        }, [
          k(O),
          a[6] || (a[6] = r("span", { class: "ml-1" }, "Remove filters", -1))
        ]),
        a[7] || (a[7] = r("label", { class: "p-1 mr-1 font-medium text-gray-800" }, " Rows per page: ", -1)),
        r("select", {
          class: "bg-gray-100 rounded-lg p-1 mr-2",
          onChange: a[1] || (a[1] = (g) => e.getter().setPageSize(g.target.value))
        }, [
          (l(!0), d(C, null, F(f.value, (g) => (l(), d("option", xt, b(g), 1))), 256))
        ], 32),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: a[2] || (a[2] = () => e.getter().firstPage())
        }, [
          k(se)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: a[3] || (a[3] = () => e.getter().previousPage())
        }, [
          k(ne)
        ]),
        r("label", yt, b(u.value), 1),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: a[4] || (a[4] = () => e.getter().nextPage())
        }, [
          k(re)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-300 cursor-pointer p-1",
          onClick: a[5] || (a[5] = () => e.getter().lastPage())
        }, [
          k(te)
        ])
      ])
    ]));
  }
}, bt = { class: "inline-block p-1" }, kt = { class: "p-1 flex flex-row justify-center text-center" }, _t = { class: "flex flex-row justify-center text-center p-2" }, $t = { class: "p-1" }, Ct = { class: "block absolute bg-gray-900 shadow-lg min-w-42 z-10 rounded-lg p-2" }, Ft = { class: "relative" }, It = { class: "border border-gray-700 overflow-y-auto max-h-48 rounded-lg p-1 bg-gray-950 mt-1" }, Mt = ["onClick"], Bt = { class: "mt-1 flex justify-center items-center" }, St = { class: "mt-1 flex justify-center items-center" }, Dt = {
  __name: "GridHeaderDark",
  props: {
    getter: { type: Function, required: !0 },
    name: { type: String, required: !0 }
  },
  setup(s) {
    const e = s, t = D(() => e.getter().getHeader(e.name)), n = p(""), c = D(() => n.value && n.value !== "" ? t.value.values.filteredValues(
      (y) => U(y, n.value)
    ) : t.value.values.values), o = p("none"), u = D(() => {
      switch (o.value) {
        case "none":
          return Q;
        case "up":
          return K;
        case "down":
          return J;
        default:
          throw new Error("Invalid sort status");
      }
    }), f = p(!1), h = p([]), v = p(!1);
    function w(y) {
      return h.value.some((i) => i.equals(y));
    }
    function a() {
      if (t.value.type !== "button")
        switch (o.value) {
          case "none":
            o.value = "up", e.getter().sortByField(e.name, "up");
            break;
          case "up":
            o.value = "down", e.getter().sortByField(e.name, "down");
            break;
          case "down":
            o.value = "none", e.getter().sortByField(e.name, "none");
            break;
          default:
            throw new Error("Invalid sort status");
        }
    }
    function g() {
      f.value = !f.value;
    }
    function $(y) {
      const i = L(h.value, y);
      i > -1 ? h.value.splice(i, 1) : h.value.push(y);
    }
    function m() {
      e.getter().addFilter(e.name, h.value), v.value = !0, g();
    }
    function V() {
      e.getter().removeFilter(e.name), h.value = [], v.value = !1, g();
    }
    return T(
      () => e.getter().change.filters,
      () => {
        e.getter().removeFilter(e.name), h.value = [], v.value = !1;
      }
    ), (y, i) => (l(), d("div", bt, [
      r("div", kt, [
        t.value.type !== "button" && e.getter().showFilters ? (l(), d("button", {
          key: 0,
          onClick: i[0] || (i[0] = (x) => g()),
          class: "cursor-pointer bg-gray-600 p-2 hover:bg-gray-500 rounded-lg opacity-70"
        }, [
          (l(), S(j(v.value ? Y : X)))
        ])) : H("", !0),
        r("div", _t, [
          r("label", {
            class: "cursor-pointer",
            onClick: i[1] || (i[1] = (x) => a())
          }, b(t.value.title), 1),
          r("div", $t, [
            (l(), S(j(u.value)))
          ])
        ])
      ]),
      B(r("div", Ct, [
        r("form", {
          class: "max-w-md mx-auto",
          onSubmit: R(() => {
          }, ["prevent"])
        }, [
          r("div", Ft, [
            i[5] || (i[5] = r("div", { class: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" }, [
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
            B(r("input", {
              type: "search",
              id: "default-search",
              class: "block w-full p-2 ps-9 text-sm text-gray-100 border border-gray-700 rounded-lg bg-gray-950",
              required: "",
              "onUpdate:modelValue": i[2] || (i[2] = (x) => n.value = x)
            }, null, 512), [
              [z, n.value]
            ])
          ])
        ], 32),
        r("div", It, [
          r("ul", null, [
            (l(!0), d(C, null, F(c.value, (x) => (l(), d("li", {
              class: G(`${w(x) ? "li-element-selected" : "li-element-regular"}`),
              onClick: (oe) => $(x)
            }, b(x.formattedValue()), 11, Mt))), 256))
          ])
        ]),
        B(r("div", Bt, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-600 hover:bg-gray-9500 cursor-pointer p-2 text-sm",
            onClick: i[3] || (i[3] = (x) => m())
          }, [
            k(ee),
            i[6] || (i[6] = r("span", { class: "ml-1 mr-1" }, "Apply filter", -1))
          ])
        ], 512), [
          [P, h.value.length > 0]
        ]),
        r("div", St, [
          r("button", {
            class: "flex flex-row rounded-lg bg-gray-600 hover:bg-gray-9500 cursor-pointer p-2 text-sm",
            onClick: i[4] || (i[4] = (x) => V())
          }, [
            k(O),
            i[7] || (i[7] = r("span", { class: "ml-1 mr-1" }, "Clear filter", -1))
          ])
        ])
      ], 512), [
        [P, f.value]
      ])
    ]));
  }
}, jt = /* @__PURE__ */ _(Dt, [["__scopeId", "data-v-dc8777fe"]]), Pt = { class: "border border-gray-600 rounded-xl" }, Vt = { class: "flex flex-row justify-center p-1 rounded-t-xl bg-gray-600" }, Tt = { class: "overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]" }, Ot = {
  key: 0,
  class: "relative flex flex-row text-sm items-center justify-center"
}, qt = ["onClick"], At = {
  key: 1,
  class: "relative flex flex-row text-sm items-center justify-center text-white"
}, Et = { class: "inline-block align-middle p-2" }, Ht = { class: "flex flex-row justify-end p-4 rounded-b-xl bg-gray-800" }, Rt = { class: "bg-gray-900" }, zt = { class: "p-1 font-medium text-gray-200" }, Lt = {
  __name: "GridDark",
  props: {
    getter: { type: Function, required: !0 }
  },
  setup(s) {
    const e = s, t = p(e.getter().widthInfo), n = p(e.getter().visibleRows()), c = p(e.getter().title()), o = p(e.getter().headers), u = p(`Page ${e.getter().currentPage()} of ${e.getter().pages}`), f = p(e.getter().pagination);
    function h(w) {
      return w % 2 === 0;
    }
    T(
      () => e.getter().change.content,
      () => {
        n.value = e.getter().visibleRows(), t.value = e.getter().widthInfo, c.value = e.getter().title(), o.value = e.getter().headers, u.value = `Page ${e.getter().currentPage()} of ${e.getter().pages}`, f.value = e.getter().pagination;
      }
    );
    function v(w, a) {
      return w.effect(a.toModel());
    }
    return (w, a) => (l(), d("div", Pt, [
      r("div", Vt, [
        B(r("h3", { class: "text-lg font-medium text-gray-200 m-1" }, b(c.value), 513), [
          [P, s.getter().showTitle]
        ])
      ]),
      r("div", {
        class: "grid",
        style: M(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
      }, [
        (l(!0), d(C, null, F(o.value, (g) => (l(), S(jt, {
          getter: e.getter,
          name: g.name,
          class: "bg-gray-600 p-1 text-white text-lg font-medium",
          style: M(`grid-column: span ${t.value.widths[g.name]} / span ${t.value.widths[g.name]};`)
        }, null, 8, ["getter", "name", "style"]))), 256))
      ], 4),
      r("div", Tt, [
        (l(!0), d(C, null, F(n.value, (g, $) => (l(), d("div", {
          class: "grid",
          style: M(`grid-template-columns: repeat(${t.value.total}, minmax(0, 1fr))`)
        }, [
          (l(!0), d(C, null, F(g.cells, (m) => (l(), d("div", {
            class: "p-1",
            style: M(`background-color: ${h($) ? "oklch(37.3% 0.034 259.733)" : "oklch(21% 0.034 264.665)"}; grid-column: span ${t.value.widths[m.key]} / span ${t.value.widths[m.key]};`)
          }, [
            m.buttonInfo ? (l(), d("div", Ot, [
              r("button", {
                class: "flex flex-row p-2 cursor-pointer rounded-lg bg-gray-600 hover:bg-gray-500 text-white",
                onClick: (V) => v(m.buttonInfo, g)
              }, [
                (l(), S(j(m.buttonInfo.icon()))),
                r("span", null, b(m.buttonInfo.text), 1)
              ], 8, qt)
            ])) : (l(), d("div", At, [
              r("span", Et, b(m.value.formattedValue()), 1)
            ]))
          ], 4))), 256))
        ], 4))), 256))
      ]),
      r("div", Ht, [
        r("button", {
          class: "flex flex-row rounded-lg bg-gray-600 hover:bg-gray-500 cursor-pointer text-gray-50 p-1 px-2 mr-2",
          onClick: a[0] || (a[0] = () => e.getter().removeAllFilters())
        }, [
          k(O),
          a[6] || (a[6] = r("span", { class: "ml-1" }, "Remove filters", -1))
        ]),
        a[7] || (a[7] = r("label", { class: "p-1 mr-1 font-medium text-gray-200" }, " Rows per page: ", -1)),
        r("select", {
          class: "bg-gray-900 rounded-lg p-1 mr-2 text-gray-50",
          onChange: a[1] || (a[1] = (g) => e.getter().setPageSize(g.target.value))
        }, [
          (l(!0), d(C, null, F(f.value, (g) => (l(), d("option", Rt, b(g), 1))), 256))
        ], 32),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: a[2] || (a[2] = () => e.getter().firstPage())
        }, [
          k(se)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: a[3] || (a[3] = () => e.getter().previousPage())
        }, [
          k(ne)
        ]),
        r("label", zt, b(u.value), 1),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: a[4] || (a[4] = () => e.getter().nextPage())
        }, [
          k(re)
        ]),
        r("button", {
          class: "rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50",
          onClick: a[5] || (a[5] = () => e.getter().lastPage())
        }, [
          k(te)
        ])
      ])
    ]));
  }
};
export {
  Lt as GridDark,
  Ut as GridGreyMonochrome,
  Zt as Table
};
