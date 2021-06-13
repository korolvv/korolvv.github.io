(self.webpackChunklogin = self.webpackChunklogin || []).push([
  [179], {
    255: t => {
      function e(t) {
        return Promise.resolve().then(() => {
          var e = new Error("Cannot find module '" + t + "'");
          throw e.code = "MODULE_NOT_FOUND", e
        })
      }
      e.keys = () => [], e.resolve = e, e.id = 255, t.exports = e
    },
    884: (t, e, n) => {
      "use strict";

      function r(t) {
        return "function" == typeof t
      }
      let i = !1;
      const s = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error;
            console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack)
          } else i && console.log("RxJS: Back to a better error behavior. Thank you. <3");
          i = t
        },
        get useDeprecatedSynchronousErrorHandling() {
          return i
        }
      };

      function o(t) {
        setTimeout(() => {
          throw t
        }, 0)
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (s.useDeprecatedSynchronousErrorHandling) throw t;
            o(t)
          },
          complete() {}
        },
        l = (() => Array.isArray || (t => t && "number" == typeof t.length))();

      function c(t) {
        return null !== t && "object" == typeof t
      }
      const u = (() => {
        function t(t) {
          return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((t,e)=>`${e+1}) ${t.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this
        }
        return t.prototype = Object.create(Error.prototype), t
      })();
      let h = (() => {
        class t {
          constructor(t) {
            this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: i,
              _unsubscribe: s,
              _subscriptions: o
            } = this;
            if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof t) n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(s)) {
              i && (this._unsubscribe = void 0);
              try {
                s.call(this)
              } catch (a) {
                e = a instanceof u ? d(a.errors) : [a]
              }
            }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n;) {
                const n = o[t];
                if (c(n)) try {
                  n.unsubscribe()
                } catch (a) {
                  e = e || [], a instanceof u ? e = e.concat(d(a.errors)) : e.push(a)
                }
              }
            }
            if (e) throw new u(e)
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  n = new t, n._subscriptions = [e]
                }
                break;
              default:
                throw new Error("unrecognized teardown " + e + " added to Subscription.")
            }
            let {
              _parentOrParents: r
            } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this]
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this)
            }
            const i = this._subscriptions;
            return null === i ? this._subscriptions = [n] : i.push(n), n
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t); - 1 !== n && e.splice(n, 1)
            }
          }
        }
        return t.EMPTY = function (t) {
          return t.closed = !0, t
        }(new t), t
      })();

      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), [])
      }
      const f = (() => "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();
      class p extends h {
        constructor(t, e, n) {
          switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break
              }
              if ("object" == typeof t) {
                t instanceof p ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, t));
                break
              }
              default:
                this.syncErrorThrowable = !0, this.destination = new m(this, t, e, n)
          }
        } [f]() {
          return this
        }
        static create(t, e, n) {
          const r = new p(t, e, n);
          return r.syncErrorThrowable = !1, r
        }
        next(t) {
          this.isStopped || this._next(t)
        }
        error(t) {
          this.isStopped || (this.isStopped = !0, this._error(t))
        }
        complete() {
          this.isStopped || (this.isStopped = !0, this._complete())
        }
        unsubscribe() {
          this.closed || (this.isStopped = !0, super.unsubscribe())
        }
        _next(t) {
          this.destination.next(t)
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe()
        }
        _complete() {
          this.destination.complete(), this.unsubscribe()
        }
        _unsubscribeAndRecycle() {
          const {
            _parentOrParents: t
          } = this;
          return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
        }
      }
      class m extends p {
        constructor(t, e, n, i) {
          let s;
          super(), this._parentSubscriber = t;
          let o = this;
          r(e) ? s = e : e && (s = e.next, n = e.error, i = e.complete, e !== a && (o = Object.create(e), r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))), this._context = o, this._next = s, this._error = n, this._complete = i
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const {
              _parentSubscriber: e
            } = this;
            s.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
          }
        }
        error(t) {
          if (!this.isStopped) {
            const {
              _parentSubscriber: e
            } = this, {
              useDeprecatedSynchronousErrorHandling: n
            } = s;
            if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t), this.unsubscribe();
            else {
              if (this.unsubscribe(), n) throw t;
              o(t)
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const {
              _parentSubscriber: t
            } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              s.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe())
            } else this.unsubscribe()
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e)
          } catch (n) {
            if (this.unsubscribe(), s.useDeprecatedSynchronousErrorHandling) throw n;
            o(n)
          }
        }
        __tryOrSetError(t, e, n) {
          if (!s.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
          try {
            e.call(this._context, n)
          } catch (r) {
            return s.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = r, t.syncErrorThrown = !0, !0) : (o(r), !0)
          }
          return !1
        }
        _unsubscribe() {
          const {
            _parentSubscriber: t
          } = this;
          this._context = null, this._parentSubscriber = null, t.unsubscribe()
        }
      }
      const g = (() => "function" == typeof Symbol && Symbol.observable || "@@observable")();

      function y(t) {
        return t
      }
      let _ = (() => {
        class t {
          constructor(t) {
            this._isScalar = !1, t && (this._subscribe = t)
          }
          lift(e) {
            const n = new t;
            return n.source = this, n.operator = e, n
          }
          subscribe(t, e, n) {
            const {
              operator: r
            } = this, i = function (t, e, n) {
              if (t) {
                if (t instanceof p) return t;
                if (t[f]) return t[f]()
              }
              return t || e || n ? new p(t, e, n) : new p(a)
            }(t, e, n);
            if (i.add(r ? r.call(i, this.source) : this.source || s.useDeprecatedSynchronousErrorHandling && !i.syncErrorThrowable ? this._subscribe(i) : this._trySubscribe(i)), s.useDeprecatedSynchronousErrorHandling && i.syncErrorThrowable && (i.syncErrorThrowable = !1, i.syncErrorThrown)) throw i.syncErrorValue;
            return i
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t)
            } catch (e) {
              s.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e),
                function (t) {
                  for (; t;) {
                    const {
                      closed: e,
                      destination: n,
                      isStopped: r
                    } = t;
                    if (e || r) return !1;
                    t = n && n instanceof p ? n : null
                  }
                  return !0
                }(t) ? t.error(e) : console.warn(e)
            }
          }
          forEach(t, e) {
            return new(e = b(e))((e, n) => {
              let r;
              r = this.subscribe(e => {
                try {
                  t(e)
                } catch (i) {
                  n(i), r && r.unsubscribe()
                }
              }, n, e)
            })
          }
          _subscribe(t) {
            const {
              source: e
            } = this;
            return e && e.subscribe(t)
          } [g]() {
            return this
          }
          pipe(...t) {
            return 0 === t.length ? this : (0 === (e = t).length ? y : 1 === e.length ? e[0] : function (t) {
              return e.reduce((t, e) => e(t), t)
            })(this);
            var e
          }
          toPromise(t) {
            return new(t = b(t))((t, e) => {
              let n;
              this.subscribe(t => n = t, t => e(t), () => t(n))
            })
          }
        }
        return t.create = e => new t(e), t
      })();

      function b(t) {
        if (t || (t = s.Promise || Promise), !t) throw new Error("no Promise impl found");
        return t
      }
      const v = (() => {
        function t() {
          return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
        }
        return t.prototype = Object.create(Error.prototype), t
      })();
      class w extends h {
        constructor(t, e) {
          super(), this.subject = t, this.subscriber = e, this.closed = !1
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (this.subject = null, !e || 0 === e.length || t.isStopped || t.closed) return;
          const n = e.indexOf(this.subscriber); - 1 !== n && e.splice(n, 1)
        }
      }
      class x extends p {
        constructor(t) {
          super(t), this.destination = t
        }
      }
      let C = (() => {
        class t extends _ {
          constructor() {
            super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
          } [f]() {
            return new x(this)
          }
          lift(t) {
            const e = new S(this, this);
            return e.operator = t, e
          }
          next(t) {
            if (this.closed) throw new v;
            if (!this.isStopped) {
              const {
                observers: e
              } = this, n = e.length, r = e.slice();
              for (let i = 0; i < n; i++) r[i].next(t)
            }
          }
          error(t) {
            if (this.closed) throw new v;
            this.hasError = !0, this.thrownError = t, this.isStopped = !0;
            const {
              observers: e
            } = this, n = e.length, r = e.slice();
            for (let i = 0; i < n; i++) r[i].error(t);
            this.observers.length = 0
          }
          complete() {
            if (this.closed) throw new v;
            this.isStopped = !0;
            const {
              observers: t
            } = this, e = t.length, n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0
          }
          unsubscribe() {
            this.isStopped = !0, this.closed = !0, this.observers = null
          }
          _trySubscribe(t) {
            if (this.closed) throw new v;
            return super._trySubscribe(t)
          }
          _subscribe(t) {
            if (this.closed) throw new v;
            return this.hasError ? (t.error(this.thrownError), h.EMPTY) : this.isStopped ? (t.complete(), h.EMPTY) : (this.observers.push(t), new w(this, t))
          }
          asObservable() {
            const t = new _;
            return t.source = this, t
          }
        }
        return t.create = (t, e) => new S(t, e), t
      })();
      class S extends C {
        constructor(t, e) {
          super(), this.destination = t, this.source = e
        }
        next(t) {
          const {
            destination: e
          } = this;
          e && e.next && e.next(t)
        }
        error(t) {
          const {
            destination: e
          } = this;
          e && e.error && this.destination.error(t)
        }
        complete() {
          const {
            destination: t
          } = this;
          t && t.complete && this.destination.complete()
        }
        _subscribe(t) {
          const {
            source: e
          } = this;
          return e ? this.source.subscribe(t) : h.EMPTY
        }
      }

      function E(t) {
        return t && "function" == typeof t.schedule
      }

      function k(t, e) {
        return function (n) {
          if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
          return n.lift(new T(t, e))
        }
      }
      class T {
        constructor(t, e) {
          this.project = t, this.thisArg = e
        }
        call(t, e) {
          return e.subscribe(new A(t, this.project, this.thisArg))
        }
      }
      class A extends p {
        constructor(t, e, n) {
          super(t), this.project = e, this.count = 0, this.thisArg = n || this
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++)
          } catch (n) {
            return void this.destination.error(n)
          }
          this.destination.next(e)
        }
      }
      const O = t => e => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete()
      };

      function R() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
      }
      const I = R(),
        P = t => t && "number" == typeof t.length && "function" != typeof t;

      function L(t) {
        return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
      }
      const D = t => {
        if (t && "function" == typeof t[g]) return n = t, t => {
          const e = n[g]();
          if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
          return e.subscribe(t)
        };
        if (P(t)) return O(t);
        if (L(t)) return (t => e => (t.then(t => {
          e.closed || (e.next(t), e.complete())
        }, t => e.error(t)).then(null, o), e))(t);
        if (t && "function" == typeof t[I]) return e = t, t => {
          const n = e[I]();
          for (;;) {
            let e;
            try {
              e = n.next()
            } catch (r) {
              return t.error(r), t
            }
            if (e.done) {
              t.complete();
              break
            }
            if (t.next(e.value), t.closed) break
          }
          return "function" == typeof n.return && t.add(() => {
            n.return && n.return()
          }), t
        }; {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
        }
        var e, n
      };

      function F(t, e) {
        return new _(n => {
          const r = new h;
          let i = 0;
          return r.add(e.schedule(function () {
            i !== t.length ? (n.next(t[i++]), n.closed || r.add(this.schedule())) : n.complete()
          })), r
        })
      }

      function M(t, e) {
        return e ? function (t, e) {
          if (null != t) {
            if (function (t) {
                return t && "function" == typeof t[g]
              }(t)) return function (t, e) {
              return new _(n => {
                const r = new h;
                return r.add(e.schedule(() => {
                  const i = t[g]();
                  r.add(i.subscribe({
                    next(t) {
                      r.add(e.schedule(() => n.next(t)))
                    },
                    error(t) {
                      r.add(e.schedule(() => n.error(t)))
                    },
                    complete() {
                      r.add(e.schedule(() => n.complete()))
                    }
                  }))
                })), r
              })
            }(t, e);
            if (L(t)) return function (t, e) {
              return new _(n => {
                const r = new h;
                return r.add(e.schedule(() => t.then(t => {
                  r.add(e.schedule(() => {
                    n.next(t), r.add(e.schedule(() => n.complete()))
                  }))
                }, t => {
                  r.add(e.schedule(() => n.error(t)))
                }))), r
              })
            }(t, e);
            if (P(t)) return F(t, e);
            if (function (t) {
                return t && "function" == typeof t[I]
              }(t) || "string" == typeof t) return function (t, e) {
              if (!t) throw new Error("Iterable cannot be null");
              return new _(n => {
                const r = new h;
                let i;
                return r.add(() => {
                  i && "function" == typeof i.return && i.return()
                }), r.add(e.schedule(() => {
                  i = t[I](), r.add(e.schedule(function () {
                    if (n.closed) return;
                    let t, e;
                    try {
                      const n = i.next();
                      t = n.value, e = n.done
                    } catch (r) {
                      return void n.error(r)
                    }
                    e ? n.complete() : (n.next(t), this.schedule())
                  }))
                })), r
              })
            }(t, e)
          }
          throw new TypeError((null !== t && typeof t || t) + " is not observable")
        }(t, e) : t instanceof _ ? t : new _(D(t))
      }
      class N extends p {
        constructor(t) {
          super(), this.parent = t
        }
        _next(t) {
          this.parent.notifyNext(t)
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe()
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe()
        }
      }
      class V extends p {
        notifyNext(t) {
          this.destination.next(t)
        }
        notifyError(t) {
          this.destination.error(t)
        }
        notifyComplete() {
          this.destination.complete()
        }
      }

      function j(t, e) {
        if (e.closed) return;
        if (t instanceof _) return t.subscribe(e);
        let n;
        try {
          n = D(t)(e)
        } catch (r) {
          e.error(r)
        }
        return n
      }

      function U(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e ? r => r.pipe(U((n, r) => M(t(n, r)).pipe(k((t, i) => e(n, t, r, i))), n)) : ("number" == typeof e && (n = e), e => e.lift(new B(t, n)))
      }
      class B {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          this.project = t, this.concurrent = e
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent))
        }
      }
      class $ extends V {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t), this.project = e, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
        }
        _next(t) {
          this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n)
          } catch (r) {
            return void this.destination.error(r)
          }
          this.active++, this._innerSub(e)
        }
        _innerSub(t) {
          const e = new N(this),
            n = this.destination;
          n.add(e);
          const r = j(t, e);
          r !== e && n.add(r)
        }
        _complete() {
          this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
        }
        notifyNext(t) {
          this.destination.next(t)
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
        }
      }

      function H(t = Number.POSITIVE_INFINITY) {
        return U(y, t)
      }

      function z(t, e) {
        return e ? F(t, e) : new _(O(t))
      }

      function q(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          r = t[t.length - 1];
        return E(r) ? (n = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (e = t.pop())) : "number" == typeof r && (e = t.pop()), null === n && 1 === t.length && t[0] instanceof _ ? t[0] : H(e)(z(t, n))
      }

      function Q() {
        return function (t) {
          return t.lift(new W(t))
        }
      }
      class W {
        constructor(t) {
          this.connectable = t
        }
        call(t, e) {
          const {
            connectable: n
          } = this;
          n._refCount++;
          const r = new G(t, n),
            i = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), i
        }
      }
      class G extends p {
        constructor(t, e) {
          super(t), this.connectable = e
        }
        _unsubscribe() {
          const {
            connectable: t
          } = this;
          if (!t) return void(this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void(this.connection = null);
          if (t._refCount = e - 1, e > 1) return void(this.connection = null);
          const {
            connection: n
          } = this, r = t._connection;
          this.connection = null, !r || n && r !== n || r.unsubscribe()
        }
      }
      class K extends _ {
        constructor(t, e) {
          super(), this.source = t, this.subjectFactory = e, this._refCount = 0, this._isComplete = !1
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t)
        }
        getSubject() {
          const t = this._subject;
          return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
        }
        connect() {
          let t = this._connection;
          return t || (this._isComplete = !1, t = this._connection = new h, t.add(this.source.subscribe(new Y(this.getSubject(), this))), t.closed && (this._connection = null, t = h.EMPTY)), t
        }
        refCount() {
          return Q()(this)
        }
      }
      const Z = (() => {
        const t = K.prototype;
        return {
          operator: {
            value: null
          },
          _refCount: {
            value: 0,
            writable: !0
          },
          _subject: {
            value: null,
            writable: !0
          },
          _connection: {
            value: null,
            writable: !0
          },
          _subscribe: {
            value: t._subscribe
          },
          _isComplete: {
            value: t._isComplete,
            writable: !0
          },
          getSubject: {
            value: t.getSubject
          },
          connect: {
            value: t.connect
          },
          refCount: {
            value: t.refCount
          }
        }
      })();
      class Y extends x {
        constructor(t, e) {
          super(t), this.connectable = e
        }
        _error(t) {
          this._unsubscribe(), super._error(t)
        }
        _complete() {
          this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
          }
        }
      }

      function J() {
        return new C
      }

      function X(t) {
        for (let e in t)
          if (t[e] === X) return e;
        throw Error("Could not find renamed property on target object.")
      }

      function tt(t, e) {
        for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
      }

      function et(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(et).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n)
      }

      function nt(t, e) {
        return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
      }
      const rt = X({
        __forward_ref__: X
      });

      function it(t) {
        return t.__forward_ref__ = it, t.toString = function () {
          return et(this())
        }, t
      }

      function st(t) {
        return ot(t) ? t() : t
      }

      function ot(t) {
        return "function" == typeof t && t.hasOwnProperty(rt) && t.__forward_ref__ === it
      }
      class at extends Error {
        constructor(t, e) {
          super(function (t, e) {
            return `${t?`NG0${t}: `:""}${e}`
          }(t, e)), this.code = t
        }
      }

      function lt(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t)
      }

      function ct(t) {
        return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : lt(t)
      }

      function ut(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new at("201", `No provider for ${ct(t)} found${n}`)
      }

      function ht(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0
        }
      }

      function dt(t) {
        return {
          providers: t.providers || [],
          imports: t.imports || []
        }
      }

      function ft(t) {
        return pt(t, gt) || pt(t, _t)
      }

      function pt(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null
      }

      function mt(t) {
        return t && (t.hasOwnProperty(yt) || t.hasOwnProperty(bt)) ? t[yt] : null
      }
      const gt = X({
          "\u0275prov": X
        }),
        yt = X({
          "\u0275inj": X
        }),
        _t = X({
          ngInjectableDef: X
        }),
        bt = X({
          ngInjectorDef: X
        });
      var vt = function (t) {
        return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional", t
      }({});
      let wt;

      function xt(t) {
        const e = wt;
        return wt = t, e
      }

      function Ct(t, e, n) {
        const r = ft(t);
        return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & vt.Optional ? null : void 0 !== e ? e : void ut(et(t), "Injector")
      }

      function St(t) {
        return {
          toString: t
        }.toString()
      }
      var Et = function (t) {
          return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
        }({}),
        kt = function (t) {
          return t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", t
        }({});
      const Tt = "undefined" != typeof globalThis && globalThis,
        At = "undefined" != typeof window && window,
        Ot = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
        Rt = "undefined" != typeof global && global,
        It = Tt || Rt || At || Ot,
        Pt = {},
        Lt = [],
        Dt = X({
          "\u0275cmp": X
        }),
        Ft = X({
          "\u0275dir": X
        }),
        Mt = X({
          "\u0275pipe": X
        }),
        Nt = X({
          "\u0275mod": X
        }),
        Vt = X({
          "\u0275loc": X
        }),
        jt = X({
          "\u0275fac": X
        }),
        Ut = X({
          __NG_ELEMENT_ID__: X
        });
      let Bt = 0;

      function $t(t) {
        return St(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Et.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || Lt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || kt.Emulated,
              id: "c",
              styles: t.styles || Lt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null
            },
            r = t.directives,
            i = t.features,
            s = t.pipes;
          return n.id += Bt++, n.inputs = Wt(t.inputs, e), n.outputs = Wt(t.outputs), i && i.forEach(t => t(n)), n.directiveDefs = r ? () => ("function" == typeof r ? r() : r).map(Ht) : null, n.pipeDefs = s ? () => ("function" == typeof s ? s() : s).map(zt) : null, n
        })
      }

      function Ht(t) {
        return Kt(t) || function (t) {
          return t[Ft] || null
        }(t)
      }

      function zt(t) {
        return function (t) {
          return t[Mt] || null
        }(t)
      }
      const qt = {};

      function Qt(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || Lt,
          declarations: t.declarations || Lt,
          imports: t.imports || Lt,
          exports: t.exports || Lt,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null
        };
        return null != t.id && St(() => {
          qt[t.id] = t.type
        }), e
      }

      function Wt(t, e) {
        if (null == t) return Pt;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let i = t[r],
              s = i;
            Array.isArray(i) && (s = i[1], i = i[0]), n[i] = r, e && (e[i] = s)
          } return n
      }
      const Gt = $t;

      function Kt(t) {
        return t[Dt] || null
      }

      function Zt(t, e) {
        const n = t[Nt] || null;
        if (!n && !0 === e) throw new Error(`Type ${et(t)} does not have '\u0275mod' property.`);
        return n
      }
      const Yt = 20,
        Jt = 10;

      function Xt(t) {
        return Array.isArray(t) && "object" == typeof t[1]
      }

      function te(t) {
        return Array.isArray(t) && !0 === t[1]
      }

      function ee(t) {
        return 0 != (8 & t.flags)
      }

      function ne(t) {
        return 2 == (2 & t.flags)
      }

      function re(t) {
        return 1 == (1 & t.flags)
      }

      function ie(t) {
        return null !== t.template
      }

      function se(t, e) {
        return t.hasOwnProperty(jt) ? t[jt] : null
      }
      class oe {
        constructor(t, e, n) {
          this.previousValue = t, this.currentValue = e, this.firstChange = n
        }
        isFirstChange() {
          return this.firstChange
        }
      }

      function ae() {
        return le
      }

      function le(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = ue), ce
      }

      function ce() {
        const t = he(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === Pt) t.previous = e;
          else
            for (let t in e) n[t] = e[t];
          t.current = null, this.ngOnChanges(e)
        }
      }

      function ue(t, e, n, r) {
        const i = he(t) || function (t, e) {
            return t.__ngSimpleChanges__ = e
          }(t, {
            previous: Pt,
            current: null
          }),
          s = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[n],
          l = o[a];
        s[a] = new oe(l && l.currentValue, e, o === Pt), t[r] = e
      }

      function he(t) {
        return t.__ngSimpleChanges__ || null
      }
      ae.ngInherit = !0;
      const de = "http://www.w3.org/2000/svg";
      let fe;

      function pe(t) {
        return !!t.listen
      }
      const me = {
        createRenderer: (t, e) => void 0 !== fe ? fe : "undefined" != typeof document ? document : void 0
      };

      function ge(t) {
        for (; Array.isArray(t);) t = t[0];
        return t
      }

      function ye(t, e) {
        return ge(e[t])
      }

      function _e(t, e) {
        return ge(e[t.index])
      }

      function be(t, e) {
        return t.data[e]
      }

      function ve(t, e) {
        const n = e[t];
        return Xt(n) ? n : n[0]
      }

      function we(t) {
        return 4 == (4 & t[2])
      }

      function xe(t) {
        return 128 == (128 & t[2])
      }

      function Ce(t, e) {
        return null == e ? null : t[e]
      }

      function Se(t) {
        t[18] = 0
      }

      function Ee(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (; null !== r && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);) r[5] += e, n = r, r = r[3]
      }
      const ke = {
        lFrame: Qe(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1
      };

      function Te() {
        return ke.bindingsEnabled
      }

      function Ae() {
        return ke.lFrame.lView
      }

      function Oe() {
        return ke.lFrame.tView
      }

      function Re() {
        let t = Ie();
        for (; null !== t && 64 === t.type;) t = t.parent;
        return t
      }

      function Ie() {
        return ke.lFrame.currentTNode
      }

      function Pe(t, e) {
        const n = ke.lFrame;
        n.currentTNode = t, n.isParent = e
      }

      function Le() {
        return ke.lFrame.isParent
      }

      function De() {
        ke.lFrame.isParent = !1
      }

      function Fe() {
        return ke.isInCheckNoChangesMode
      }

      function Me(t) {
        ke.isInCheckNoChangesMode = t
      }

      function Ne() {
        return ke.lFrame.bindingIndex++
      }

      function Ve(t, e) {
        const n = ke.lFrame;
        n.bindingIndex = n.bindingRootIndex = t, je(e)
      }

      function je(t) {
        ke.lFrame.currentDirectiveIndex = t
      }

      function Ue() {
        return ke.lFrame.currentQueryIndex
      }

      function Be(t) {
        ke.lFrame.currentQueryIndex = t
      }

      function $e(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
      }

      function He(t, e, n) {
        if (n & vt.SkipSelf) {
          let r = e,
            i = t;
          for (; r = r.parent, !(null !== r || n & vt.Host || (r = $e(i), null === r) || (i = i[15], 10 & r.type)););
          if (null === r) return !1;
          e = r, t = i
        }
        const r = ke.lFrame = qe();
        return r.currentTNode = e, r.lView = t, !0
      }

      function ze(t) {
        const e = qe(),
          n = t[1];
        ke.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1
      }

      function qe() {
        const t = ke.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Qe(t) : e
      }

      function Qe(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1
        };
        return null !== t && (t.child = e), e
      }

      function We() {
        const t = ke.lFrame;
        return ke.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
      }
      const Ge = We;

      function Ke() {
        const t = We();
        t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
      }

      function Ze() {
        return ke.lFrame.selectedIndex
      }

      function Ye(t) {
        ke.lFrame.selectedIndex = t
      }

      function Je() {
        const t = ke.lFrame;
        return be(t.tView, t.selectedIndex)
      }

      function Xe() {
        ke.lFrame.currentNamespace = de
      }

      function tn() {
        ke.lFrame.currentNamespace = null
      }

      function en(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: i,
              ngAfterViewInit: s,
              ngAfterViewChecked: o,
              ngOnDestroy: a
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r), i && ((t.contentHooks || (t.contentHooks = [])).push(n, i), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, i)), s && (t.viewHooks || (t.viewHooks = [])).push(-n, s), o && ((t.viewHooks || (t.viewHooks = [])).push(n, o), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)), null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
        }
      }

      function nn(t, e, n) {
        on(t, e, 3, n)
      }

      function rn(t, e, n, r) {
        (3 & t[2]) === n && on(t, e, n, r)
      }

      function sn(t, e) {
        let n = t[2];
        (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
      }

      function on(t, e, n, r) {
        const i = null != r ? r : -1,
          s = e.length - 1;
        let o = 0;
        for (let a = void 0 !== r ? 65535 & t[18] : 0; a < s; a++)
          if ("number" == typeof e[a + 1]) {
            if (o = e[a], null != r && o >= r) break
          } else e[a] < 0 && (t[18] += 65536), (o < i || -1 == i) && (an(t, n, e, a), t[18] = (4294901760 & t[18]) + a + 2), a++
      }

      function an(t, e, n, r) {
        const i = n[r] < 0,
          s = n[r + 1],
          o = t[i ? -n[r] : n[r]];
        if (i) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              s.call(o)
            } finally {}
          }
        } else try {
          s.call(o)
        } finally {}
      }
      const ln = -1;
      class cn {
        constructor(t, e, n) {
          this.factory = t, this.resolving = !1, this.canSeeViewProviders = e, this.injectImpl = n
        }
      }

      function un(t, e, n) {
        const r = pe(t);
        let i = 0;
        for (; i < n.length;) {
          const s = n[i];
          if ("number" == typeof s) {
            if (0 !== s) break;
            i++;
            const o = n[i++],
              a = n[i++],
              l = n[i++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
          } else {
            const o = s,
              a = n[++i];
            dn(o) ? r && t.setProperty(e, o, a) : r ? t.setAttribute(e, o, a) : e.setAttribute(o, a), i++
          }
        }
        return i
      }

      function hn(t) {
        return 3 === t || 4 === t || 6 === t
      }

      function dn(t) {
        return 64 === t.charCodeAt(0)
      }

      function fn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const i = e[r];
            "number" == typeof i ? n = i : 0 === n || pn(t, n, i, null, -1 === n || 2 === n ? e[++r] : null)
          }
        }
        return t
      }

      function pn(t, e, n, r, i) {
        let s = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; s < t.length;) {
            const n = t[s++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break
              }
              if (n > e) {
                o = s - 1;
                break
              }
            }
          }
        for (; s < t.length;) {
          const e = t[s];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void(null !== i && (t[s + 1] = i));
            if (r === t[s + 1]) return void(t[s + 2] = i)
          }
          s++, null !== r && s++, null !== i && s++
        } - 1 !== o && (t.splice(o, 0, e), s = o + 1), t.splice(s++, 0, n), null !== r && t.splice(s++, 0, r), null !== i && t.splice(s++, 0, i)
      }

      function mn(t) {
        return t !== ln
      }

      function gn(t) {
        return 32767 & t
      }

      function yn(t, e) {
        let n = t >> 16,
          r = e;
        for (; n > 0;) r = r[15], n--;
        return r
      }
      let _n = !0;

      function bn(t) {
        const e = _n;
        return _n = t, e
      }
      let vn = 0;

      function wn(t, e) {
        const n = Cn(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass && (t.injectorIndex = e.length, xn(r.data, t), xn(e, null), xn(r.blueprint, null));
        const i = Sn(t, e),
          s = t.injectorIndex;
        if (mn(i)) {
          const t = gn(i),
            n = yn(i, e),
            r = n[1].data;
          for (let i = 0; i < 8; i++) e[s + i] = n[t + i] | r[t + i]
        }
        return e[s + 8] = i, s
      }

      function xn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
      }

      function Cn(t, e) {
        return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
      }

      function Sn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
        let n = 0,
          r = null,
          i = e;
        for (; null !== i;) {
          const t = i[1],
            e = t.type;
          if (r = 2 === e ? t.declTNode : 1 === e ? i[6] : null, null === r) return ln;
          if (n++, i = i[15], -1 !== r.injectorIndex) return r.injectorIndex | n << 16
        }
        return ln
      }

      function En(t, e, n) {
        ! function (t, e, n) {
          let r;
          "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Ut) && (r = n[Ut]), null == r && (r = n[Ut] = vn++);
          const i = 255 & r;
          e.data[t + (i >> 5)] |= 1 << i
        }(t, e, n)
      }

      function kn(t, e, n) {
        if (n & vt.Optional) return t;
        ut(e, "NodeInjector")
      }

      function Tn(t, e, n, r) {
        if (n & vt.Optional && void 0 === r && (r = null), 0 == (n & (vt.Self | vt.Host))) {
          const i = t[9],
            s = xt(void 0);
          try {
            return i ? i.get(e, r, n & vt.Optional) : Ct(e, r, n & vt.Optional)
          } finally {
            xt(s)
          }
        }
        return kn(r, e, n)
      }

      function An(t, e, n, r = vt.Default, i) {
        if (null !== t) {
          const s = function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Ut) ? t[Ut] : void 0;
            return "number" == typeof e ? e >= 0 ? 255 & e : Rn : e
          }(n);
          if ("function" == typeof s) {
            if (!He(e, t, r)) return r & vt.Host ? kn(i, n, r) : Tn(e, n, r, i);
            try {
              const t = s(r);
              if (null != t || r & vt.Optional) return t;
              ut(n)
            } finally {
              Ge()
            }
          } else if ("number" == typeof s) {
            let i = null,
              o = Cn(t, e),
              a = ln,
              l = r & vt.Host ? e[16][6] : null;
            for ((-1 === o || r & vt.SkipSelf) && (a = -1 === o ? Sn(t, e) : e[o + 8], a !== ln && Fn(r, !1) ? (i = e[1], o = gn(a), e = yn(a, e)) : o = -1); - 1 !== o;) {
              const t = e[1];
              if (Dn(s, o, t.data)) {
                const t = In(o, e, n, i, r, l);
                if (t !== On) return t
              }
              a = e[o + 8], a !== ln && Fn(r, e[1].data[o + 8] === l) && Dn(s, o, e) ? (i = t, o = gn(a), e = yn(a, e)) : o = -1
            }
          }
        }
        return Tn(e, n, r, i)
      }
      const On = {};

      function Rn() {
        return new Mn(Re(), Ae())
      }

      function In(t, e, n, r, i, s) {
        const o = e[1],
          a = o.data[t + 8],
          l = Pn(a, o, n, null == r ? ne(a) && _n : r != o && 0 != (3 & a.type), i & vt.Host && s === a);
        return null !== l ? Ln(e, o, l, a) : On
      }

      function Pn(t, e, n, r, i) {
        const s = t.providerIndexes,
          o = e.data,
          a = 1048575 & s,
          l = t.directiveStart,
          c = s >> 20,
          u = i ? a + c : t.directiveEnd;
        for (let h = r ? a : a + c; h < u; h++) {
          const t = o[h];
          if (h < l && n === t || h >= l && t.type === n) return h
        }
        if (i) {
          const t = o[l];
          if (t && ie(t) && t.type === n) return l
        }
        return null
      }

      function Ln(t, e, n, r) {
        let i = t[n];
        const s = e.data;
        if (i instanceof cn) {
          const o = i;
          o.resolving && function (t, e) {
            throw new at("200", `Circular dependency in DI detected for ${t}`)
          }(ct(s[n]));
          const a = bn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? xt(o.injectImpl) : null;
          He(t, r, vt.Default);
          try {
            i = t[n] = o.factory(void 0, s, t, r), e.firstCreatePass && n >= r.directiveStart && function (t, e, n) {
              const {
                ngOnChanges: r,
                ngOnInit: i,
                ngDoCheck: s
              } = e.type.prototype;
              if (r) {
                const r = le(e);
                (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r)
              }
              i && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, i), s && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, s))
            }(n, s[n], e)
          } finally {
            null !== l && xt(l), bn(a), o.resolving = !1, Ge()
          }
        }
        return i
      }

      function Dn(t, e, n) {
        return !!(n[e + (t >> 5)] & 1 << t)
      }

      function Fn(t, e) {
        return !(t & vt.Self || t & vt.Host && e)
      }
      class Mn {
        constructor(t, e) {
          this._tNode = t, this._lView = e
        }
        get(t, e) {
          return An(this._tNode, this._lView, t, void 0, e)
        }
      }

      function Nn(t) {
        return St(() => {
          const e = t.prototype.constructor,
            n = e[jt] || Vn(e),
            r = Object.prototype;
          let i = Object.getPrototypeOf(t.prototype).constructor;
          for (; i && i !== r;) {
            const t = i[jt] || Vn(i);
            if (t && t !== n) return t;
            i = Object.getPrototypeOf(i)
          }
          return t => new t
        })
      }

      function Vn(t) {
        return ot(t) ? () => {
          const e = Vn(st(t));
          return e && e()
        } : se(t)
      }
      const jn = "__parameters__";

      function Un(t, e, n) {
        return St(() => {
          const r = function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t]
              }
            }
          }(e);

          function i(...t) {
            if (this instanceof i) return r.apply(this, t), this;
            const e = new i(...t);
            return n.annotation = e, n;

            function n(t, n, r) {
              const i = t.hasOwnProperty(jn) ? t[jn] : Object.defineProperty(t, jn, {
                value: []
              })[jn];
              for (; i.length <= r;) i.push(null);
              return (i[r] = i[r] || []).push(e), t
            }
          }
          return n && (i.prototype = Object.create(n.prototype)), i.prototype.ngMetadataName = t, i.annotationCls = i, i
        })
      }
      class Bn {
        constructor(t, e) {
          this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = ht({
            token: this,
            providedIn: e.providedIn || "root",
            factory: e.factory
          }))
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      const $n = new Bn("AnalyzeForEntryComponents"),
        Hn = Function;

      function zn(t, e) {
        void 0 === e && (e = t);
        for (let n = 0; n < t.length; n++) {
          let r = t[n];
          Array.isArray(r) ? (e === t && (e = t.slice(0, n)), zn(r, e)) : e !== t && e.push(r)
        }
        return e
      }

      function qn(t, e) {
        t.forEach(t => Array.isArray(t) ? qn(t, e) : e(t))
      }

      function Qn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n)
      }

      function Wn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
      }

      function Gn(t, e) {
        const n = [];
        for (let r = 0; r < t; r++) n.push(e);
        return n
      }

      function Kn(t, e, n) {
        let r = Yn(t, e);
        return r >= 0 ? t[1 | r] = n : (r = ~r, function (t, e, n, r) {
          let i = t.length;
          if (i == e) t.push(n, r);
          else if (1 === i) t.push(r, t[0]), t[0] = n;
          else {
            for (i--, t.push(t[i - 1], t[i]); i > e;) t[i] = t[i - 2], i--;
            t[e] = n, t[e + 1] = r
          }
        }(t, r, e, n)), r
      }

      function Zn(t, e) {
        const n = Yn(t, e);
        if (n >= 0) return t[1 | n]
      }

      function Yn(t, e) {
        return function (t, e, n) {
          let r = 0,
            i = t.length >> 1;
          for (; i !== r;) {
            const n = r + (i - r >> 1),
              s = t[n << 1];
            if (e === s) return n << 1;
            s > e ? i = n : r = n + 1
          }
          return ~(i << 1)
        }(t, e)
      }
      const Jn = {},
        Xn = /\n/gm,
        tr = "__source",
        er = X({
          provide: String,
          useValue: X
        });
      let nr;

      function rr(t) {
        const e = nr;
        return nr = t, e
      }

      function ir(t, e = vt.Default) {
        if (void 0 === nr) throw new Error("inject() must be called from an injection context");
        return null === nr ? Ct(t, void 0, e) : nr.get(t, e & vt.Optional ? null : void 0, e)
      }

      function sr(t, e = vt.Default) {
        return (wt || ir)(st(t), e)
      }
      const or = sr;

      function ar(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = st(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Error("Arguments array must have arguments.");
            let t, n = vt.Default;
            for (let e = 0; e < r.length; e++) {
              const i = r[e],
                s = i.__NG_DI_FLAG__;
              "number" == typeof s ? -1 === s ? t = i.token : n |= s : t = i
            }
            e.push(sr(t, n))
          } else e.push(sr(r))
        }
        return e
      }

      function lr(t, e) {
        return t.__NG_DI_FLAG__ = e, t.prototype.__NG_DI_FLAG__ = e, t
      }
      const cr = lr(Un("Inject", t => ({
          token: t
        })), -1),
        ur = lr(Un("Optional"), 8),
        hr = lr(Un("SkipSelf"), 4);
      class dr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
        }
      }

      function fr(t) {
        return t instanceof dr ? t.changingThisBreaksApplicationSecurity : t
      }
      const pr = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        mr = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var gr = function (t) {
        return t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML", t[t.STYLE = 2] = "STYLE", t[t.SCRIPT = 3] = "SCRIPT", t[t.URL = 4] = "URL", t[t.RESOURCE_URL = 5] = "RESOURCE_URL", t
      }({});

      function yr(t) {
        const e = function () {
          const t = Ae();
          return t && t[12]
        }();
        return e ? e.sanitize(gr.URL, t) || "" : function (t, e) {
          const n = function (t) {
            return t instanceof dr && t.getTypeName() || null
          }(t);
          if (null != n && n !== e) {
            if ("ResourceURL" === n && "URL" === e) return !0;
            throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`)
          }
          return n === e
        }(t, "URL") ? fr(t) : (n = lt(t), (n = String(n)).match(pr) || n.match(mr) ? n : "unsafe:" + n);
        var n
      }

      function _r(t, e) {
        t.__ngContext__ = e
      }

      function br(t) {
        const e = function (t) {
          return t.__ngContext__ || null
        }(t);
        return e ? Array.isArray(e) ? e : e.lView : null
      }

      function vr(t) {
        return t.ngDebugContext
      }

      function wr(t) {
        return t.ngOriginalError
      }

      function xr(t, ...e) {
        t.error(...e)
      }
      class Cr {
        constructor() {
          this._console = console
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = function (t) {
              return t.ngErrorLogger || xr
            }(t);
          r(this._console, "ERROR", t), e && r(this._console, "ORIGINAL ERROR", e), n && r(this._console, "ERROR CONTEXT", n)
        }
        _findContext(t) {
          return t ? vr(t) ? vr(t) : this._findContext(wr(t)) : null
        }
        _findOriginalError(t) {
          let e = wr(t);
          for (; e && wr(e);) e = wr(e);
          return e
        }
      }
      const Sr = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(It))();

      function Er(t) {
        return t instanceof Function ? t() : t
      }
      var kr = function (t) {
        return t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase", t
      }({});

      function Tr(t, e) {
        return (void 0)(t, e)
      }

      function Ar(t) {
        const e = t[3];
        return te(e) ? e[3] : e
      }

      function Or(t) {
        return Ir(t[13])
      }

      function Rr(t) {
        return Ir(t[4])
      }

      function Ir(t) {
        for (; null !== t && !te(t);) t = t[4];
        return t
      }

      function Pr(t, e, n, r, i) {
        if (null != r) {
          let s, o = !1;
          te(r) ? s = r : Xt(r) && (o = !0, r = r[0]);
          const a = ge(r);
          0 === t && null !== n ? null == i ? Ur(e, n, a) : jr(e, n, a, i || null, !0) : 1 === t && null !== n ? jr(e, n, a, i || null, !0) : 2 === t ? function (t, e, n) {
            const r = $r(t, e);
            r && function (t, e, n, r) {
              pe(t) ? t.removeChild(e, n, r) : e.removeChild(n)
            }(t, r, e, n)
          }(e, a, o) : 3 === t && e.destroyNode(a), null != s && function (t, e, n, r, i) {
            const s = n[7];
            s !== ge(n) && Pr(e, t, r, s, i);
            for (let o = Jt; o < n.length; o++) {
              const i = n[o];
              Zr(i[1], i, t, e, r, s)
            }
          }(e, t, s, n, i)
        }
      }

      function Lr(t, e, n) {
        return pe(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
      }

      function Dr(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          i = e[3];
        1024 & e[2] && (e[2] &= -1025, Ee(i, -1)), n.splice(r, 1)
      }

      function Fr(t, e) {
        if (t.length <= Jt) return;
        const n = Jt + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && Dr(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const o = Wn(t, Jt + e);
          Zr(r[1], i = r, i[11], 2, null, null), i[0] = null, i[6] = null;
          const a = o[19];
          null !== a && a.detachView(o[1]), r[3] = null, r[4] = null, r[2] &= -129
        }
        var i;
        return r
      }

      function Mr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          pe(n) && n.destroyNode && Zr(t, e, n, 3, null, null),
            function (t) {
              let e = t[13];
              if (!e) return Nr(t[1], t);
              for (; e;) {
                let n = null;
                if (Xt(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t)
                }
                if (!n) {
                  for (; e && !e[4] && e !== t;) Xt(e) && Nr(e[1], e), e = e[3];
                  null === e && (e = t), Xt(e) && Nr(e[1], e), n = e && e[4]
                }
                e = n
              }
            }(e)
        }
      }

      function Nr(t, e) {
        if (!(256 & e[2])) {
          e[2] &= -129, e[2] |= 256,
            function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof cn)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2) {
                        const r = t[e[n]],
                          i = e[n + 1];
                        try {
                          i.call(r)
                        } finally {}
                      } else try {
                        e.call(t)
                      } finally {}
                  }
                }
            }(t, e),
            function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let i = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const t = n[s + 1],
                      o = "function" == typeof t ? t(e) : ge(e[t]),
                      a = r[i = n[s + 2]],
                      l = n[s + 3];
                    "boolean" == typeof l ? o.removeEventListener(n[s], a, l) : l >= 0 ? r[i = l]() : r[i = -l].unsubscribe(), s += 2
                  } else {
                    const t = r[i = n[s + 1]];
                    n[s].call(t)
                  } if (null !== r) {
                for (let t = i + 1; t < r.length; t++)(0, r[t])();
                e[7] = null
              }
            }(t, e), 1 === e[1].type && pe(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && te(e[3])) {
            n !== e[3] && Dr(n, e);
            const r = e[19];
            null !== r && r.detachView(t)
          }
        }
      }

      function Vr(t, e, n) {
        return function (t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type;) r = (e = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const e = t.data[r.directiveStart].encapsulation;
            if (e === kt.None || e === kt.Emulated) return null
          }
          return _e(r, n)
        }(t, e.parent, n)
      }

      function jr(t, e, n, r, i) {
        pe(t) ? t.insertBefore(e, n, r, i) : e.insertBefore(n, r, i)
      }

      function Ur(t, e, n) {
        pe(t) ? t.appendChild(e, n) : e.appendChild(n)
      }

      function Br(t, e, n, r, i) {
        null !== r ? jr(t, e, n, r, i) : Ur(t, e, n)
      }

      function $r(t, e) {
        return pe(t) ? t.parentNode(e) : e.parentNode
      }

      function Hr(t, e, n) {
        return zr(t, e, n)
      }
      let zr = function (t, e, n) {
        return 40 & t.type ? _e(t, n) : null
      };

      function qr(t, e, n, r) {
        const i = Vr(t, r, e),
          s = e[11],
          o = Hr(r.parent || e[6], r, e);
        if (null != i)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) Br(s, i, n[a], o, !1);
          else Br(s, i, n, o, !1)
      }

      function Qr(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return _e(e, t);
          if (4 & n) return Gr(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return Qr(t, n); {
              const n = t[e.index];
              return te(n) ? Gr(-1, n) : ge(n)
            }
          }
          if (32 & n) return Tr(e, t)() || ge(t[e.index]); {
            const n = Wr(t, e);
            return null !== n ? Array.isArray(n) ? n[0] : Qr(Ar(t[16]), n) : Qr(t, e.next)
          }
        }
        return null
      }

      function Wr(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null
      }

      function Gr(t, e) {
        const n = Jt + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r) return Qr(t, r)
        }
        return e[7]
      }

      function Kr(t, e, n, r, i, s, o) {
        for (; null != n;) {
          const a = r[n.index],
            l = n.type;
          if (o && 0 === e && (a && _r(ge(a), r), n.flags |= 4), 64 != (64 & n.flags))
            if (8 & l) Kr(t, e, n.child, r, i, s, !1), Pr(e, t, i, a, s);
            else if (32 & l) {
            const o = Tr(n, r);
            let l;
            for (; l = o();) Pr(e, t, i, l, s);
            Pr(e, t, i, a, s)
          } else 16 & l ? Yr(t, e, r, n, i, s) : Pr(e, t, i, a, s);
          n = o ? n.projectionNext : n.next
        }
      }

      function Zr(t, e, n, r, i, s) {
        Kr(n, r, t.firstChild, e, i, s, !1)
      }

      function Yr(t, e, n, r, i, s) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) Pr(e, t, i, a[l], s);
        else Kr(t, e, a, o[3], i, s, !0)
      }

      function Jr(t, e, n) {
        pe(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
      }

      function Xr(t, e, n) {
        pe(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n
      }

      function ti(t, e, n) {
        let r = t.length;
        for (;;) {
          const i = t.indexOf(e, n);
          if (-1 === i) return i;
          if (0 === i || t.charCodeAt(i - 1) <= 32) {
            const n = e.length;
            if (i + n === r || t.charCodeAt(i + n) <= 32) return i
          }
          n = i + 1
        }
      }
      const ei = "ng-template";

      function ni(t, e, n) {
        let r = 0;
        for (; r < t.length;) {
          let i = t[r++];
          if (n && "class" === i) {
            if (i = t[r], -1 !== ti(i.toLowerCase(), e, 0)) return !0
          } else if (1 === i) {
            for (; r < t.length && "string" == typeof (i = t[r++]);)
              if (i.toLowerCase() === e) return !0;
            return !1
          }
        }
        return !1
      }

      function ri(t) {
        return 4 === t.type && t.value !== ei
      }

      function ii(t, e, n) {
        return e === (4 !== t.type || n ? t.value : ei)
      }

      function si(t, e, n) {
        let r = 4;
        const i = t.attrs || [],
          s = function (t) {
            for (let e = 0; e < t.length; e++)
              if (hn(t[e])) return e;
            return t.length
          }(i);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (r = 2 | 1 & r, "" !== l && !ii(t, l, n) || "" === l && 1 === e.length) {
                  if (oi(r)) return !1;
                  o = !0
                }
              } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!ni(t.attrs, c, n)) {
                    if (oi(r)) return !1;
                    o = !0
                  }
                  continue
                }
                const u = ai(8 & r ? "class" : l, i, ri(t), n);
                if (-1 === u) {
                  if (oi(r)) return !1;
                  o = !0;
                  continue
                }
                if ("" !== c) {
                  let t;
                  t = u > s ? "" : i[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if (e && -1 !== ti(e, c, 0) || 2 & r && c !== t) {
                    if (oi(r)) return !1;
                    o = !0
                  }
                }
              }
          } else {
            if (!o && !oi(r) && !oi(l)) return !1;
            if (o && oi(l)) continue;
            o = !1, r = l | 1 & r
          }
        }
        return oi(r) || o
      }

      function oi(t) {
        return 0 == (1 & t)
      }

      function ai(t, e, n, r) {
        if (null === e) return -1;
        let i = 0;
        if (r || !n) {
          let n = !1;
          for (; i < e.length;) {
            const r = e[i];
            if (r === t) return i;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++i];
                for (;
                  "string" == typeof t;) t = e[++i];
                continue
              }
              if (4 === r) break;
              if (0 === r) {
                i += 4;
                continue
              }
            }
            i += n ? 1 : 2
          }
          return -1
        }
        return function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length;) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++
            }
          return -1
        }(e, t)
      }

      function li(t, e, n = !1) {
        for (let r = 0; r < e.length; r++)
          if (si(t, e[r], n)) return !0;
        return !1
      }

      function ci(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const r = e[n];
          if (t.length === r.length) {
            for (let e = 0; e < t.length; e++)
              if (t[e] !== r[e]) continue t;
            return !0
          }
        }
        return !1
      }

      function ui(t, e) {
        return t ? ":not(" + e.trim() + ")" : e
      }

      function hi(t) {
        let e = t[0],
          n = 1,
          r = 2,
          i = "",
          s = !1;
        for (; n < t.length;) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n];
              i += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
            } else 8 & r ? i += "." + o : 4 & r && (i += " " + o);
          else "" === i || oi(o) || (e += ui(s, i), i = ""), r = o, s = s || !oi(r);
          n++
        }
        return "" !== i && (e += ui(s, i)), e
      }
      const di = {};

      function fi(t) {
        pi(Oe(), Ae(), Ze() + t, Fe())
      }

      function pi(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && nn(e, r, n)
          } else {
            const r = t.preOrderHooks;
            null !== r && rn(e, r, 0, n)
          } Ye(n)
      }

      function mi(t, e) {
        return t << 17 | e << 2
      }

      function gi(t) {
        return t >> 17 & 32767
      }

      function yi(t) {
        return 2 | t
      }

      function _i(t) {
        return (131068 & t) >> 2
      }

      function bi(t, e) {
        return -131069 & t | e << 2
      }

      function vi(t) {
        return 1 | t
      }

      function wi(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              s = n[r + 1];
            if (-1 !== s) {
              const n = t.data[s];
              Be(i), n.contentQueries(2, e[s], s)
            }
          }
      }

      function xi(t, e, n, r, i, s, o, a, l, c) {
        const u = e.blueprint.slice();
        return u[0] = i, u[2] = 140 | r, Se(u), u[3] = u[15] = t, u[8] = n, u[10] = o || t && t[10], u[11] = a || t && t[11], u[12] = l || t && t[12] || null, u[9] = c || t && t[9] || null, u[6] = s, u[16] = 2 == e.type ? t[16] : u, u
      }

      function Ci(t, e, n, r, i) {
        let s = t.data[e];
        if (null === s) s = function (t, e, n, r, i) {
          const s = Ie(),
            o = Le(),
            a = t.data[e] = function (t, e, n, r, i, s) {
              return {
                type: n,
                index: r,
                insertBeforeIndex: null,
                injectorIndex: e ? e.injectorIndex : -1,
                directiveStart: -1,
                directiveEnd: -1,
                directiveStylingLast: -1,
                propertyBindings: null,
                flags: 0,
                providerIndexes: 0,
                value: i,
                attrs: s,
                mergedAttrs: null,
                localNames: null,
                initialInputs: void 0,
                inputs: null,
                outputs: null,
                tViews: null,
                next: null,
                projectionNext: null,
                child: null,
                parent: e,
                projection: null,
                styles: null,
                stylesWithoutHost: null,
                residualStyles: void 0,
                classes: null,
                classesWithoutHost: null,
                residualClasses: void 0,
                classBindings: 0,
                styleBindings: 0
              }
            }(0, o ? s : s && s.parent, n, e, r, i);
          return null === t.firstChild && (t.firstChild = a), null !== s && (o ? null == s.child && null !== a.parent && (s.child = a) : null === s.next && (s.next = a)), a
        }(t, e, n, r, i), ke.lFrame.inI18n && (s.flags |= 64);
        else if (64 & s.type) {
          s.type = n, s.value = r, s.attrs = i;
          const t = function () {
            const t = ke.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent
          }();
          s.injectorIndex = null === t ? -1 : t.injectorIndex
        }
        return Pe(s, !0), s
      }

      function Si(t, e, n, r) {
        if (0 === n) return -1;
        const i = e.length;
        for (let s = 0; s < n; s++) e.push(r), t.blueprint.push(r), t.data.push(null);
        return i
      }

      function Ei(t, e, n) {
        ze(e);
        try {
          const r = t.viewQuery;
          null !== r && es(1, r, n);
          const i = t.template;
          null !== i && Ai(t, e, i, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && wi(t, e), t.staticViewQueries && es(2, t.viewQuery, n);
          const s = t.components;
          null !== s && function (t, e) {
            for (let n = 0; n < e.length; n++) Zi(t, e[n])
          }(e, s)
        } catch (r) {
          throw t.firstCreatePass && (t.incompleteFirstPass = !0), r
        } finally {
          e[2] &= -5, Ke()
        }
      }

      function ki(t, e, n, r) {
        const i = e[2];
        if (256 == (256 & i)) return;
        ze(e);
        const s = Fe();
        try {
          Se(e), ke.lFrame.bindingIndex = t.bindingStartIndex, null !== n && Ai(t, e, n, 2, r);
          const o = 3 == (3 & i);
          if (!s)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && nn(e, n, null)
            } else {
              const n = t.preOrderHooks;
              null !== n && rn(e, n, 0, null), sn(e, 0)
            } if (function (t) {
              for (let e = Or(t); null !== e; e = Rr(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && Ee(r, 1), n[2] |= 1024
                }
              }
            }(e), function (t) {
              for (let e = Or(t); null !== e; e = Rr(e))
                for (let t = Jt; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  xe(n) && ki(r, n, r.template, n[8])
                }
            }(e), null !== t.contentQueries && wi(t, e), !s)
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && nn(e, n)
            } else {
              const n = t.contentHooks;
              null !== n && rn(e, n, 1), sn(e, 1)
            }!
          function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n) try {
              for (let t = 0; t < n.length; t++) {
                const r = n[t];
                if (r < 0) Ye(~r);
                else {
                  const i = r,
                    s = n[++t],
                    o = n[++t];
                  Ve(s, i), o(2, e[i])
                }
              }
            } finally {
              Ye(-1)
            }
          }(t, e);
          const a = t.components;
          null !== a && function (t, e) {
            for (let n = 0; n < e.length; n++) Gi(t, e[n])
          }(e, a);
          const l = t.viewQuery;
          if (null !== l && es(2, l, r), !s)
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && nn(e, n)
            } else {
              const n = t.viewHooks;
              null !== n && rn(e, n, 2), sn(e, 2)
            }! 0 === t.firstUpdatePass && (t.firstUpdatePass = !1), s || (e[2] &= -73), 1024 & e[2] && (e[2] &= -1025, Ee(e[3], -1))
        } finally {
          Ke()
        }
      }

      function Ti(t, e, n, r) {
        const i = e[10],
          s = !Fe(),
          o = we(e);
        try {
          s && !o && i.begin && i.begin(), o && Ei(t, e, r), ki(t, e, n, r)
        } finally {
          s && !o && i.end && i.end()
        }
      }

      function Ai(t, e, n, r, i) {
        const s = Ze(),
          o = 2 & r;
        try {
          Ye(-1), o && e.length > Yt && pi(t, e, Yt, Fe()), n(r, i)
        } finally {
          Ye(s)
        }
      }

      function Oi(t, e, n) {
        if (ee(e)) {
          const r = e.directiveEnd;
          for (let i = e.directiveStart; i < r; i++) {
            const e = t.data[i];
            e.contentQueries && e.contentQueries(1, n[i], i)
          }
        }
      }

      function Ri(t, e, n) {
        Te() && (function (t, e, n, r) {
          const i = n.directiveStart,
            s = n.directiveEnd;
          t.firstCreatePass || wn(n, e), _r(r, e);
          const o = n.initialInputs;
          for (let a = i; a < s; a++) {
            const r = t.data[a],
              s = ie(r);
            s && zi(e, n, r);
            const l = Ln(e, t, a, n);
            _r(l, e), null !== o && qi(0, a - i, l, r, 0, o), s && (ve(n.index, e)[8] = l)
          }
        }(t, e, n, _e(n, e)), 128 == (128 & n.flags) && function (t, e, n) {
          const r = n.directiveStart,
            i = n.directiveEnd,
            s = n.index,
            o = ke.lFrame.currentDirectiveIndex;
          try {
            Ye(s);
            for (let n = r; n < i; n++) {
              const r = t.data[n],
                i = e[n];
              je(n), null === r.hostBindings && 0 === r.hostVars && null === r.hostAttrs || ji(r, i)
            }
          } finally {
            Ye(-1), je(o)
          }
        }(t, e, n))
      }

      function Ii(t, e, n = _e) {
        const r = e.localNames;
        if (null !== r) {
          let i = e.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const o = r[s + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[i++] = a
          }
        }
      }

      function Pi(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass ? t.tView = Li(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
      }

      function Li(t, e, n, r, i, s, o, a, l, c) {
        const u = Yt + r,
          h = u + i,
          d = function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : di);
            return n
          }(u, h),
          f = "function" == typeof c ? c() : c;
        return d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: f,
          incompleteFirstPass: !1
        }
      }

      function Di(t, e, n, r) {
        const i = rs(e);
        null === n ? i.push(r) : (i.push(n), t.firstCreatePass && is(t).push(r, i.length - 1))
      }

      function Fi(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const i = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, i) : n[r] = [e, i]
          } return n
      }

      function Mi(t, e, n, r, i, s, o, a) {
        const l = _e(e, n);
        let c, u = e.inputs;
        var h;
        !a && null != u && (c = u[r]) ? (os(t, n, c, r, i), ne(e) && function (t, e) {
          const n = ve(e, t);
          16 & n[2] || (n[2] |= 64)
        }(n, e.index)) : 3 & e.type && (r = "class" === (h = r) ? "className" : "for" === h ? "htmlFor" : "formaction" === h ? "formAction" : "innerHtml" === h ? "innerHTML" : "readonly" === h ? "readOnly" : "tabindex" === h ? "tabIndex" : h, i = null != o ? o(i, e.value || "", r) : i, pe(s) ? s.setProperty(l, r, i) : dn(r) || (l.setProperty ? l.setProperty(r, i) : l[r] = i))
      }

      function Ni(t, e, n, r) {
        let i = !1;
        if (Te()) {
          const s = function (t, e, n) {
              const r = t.directiveRegistry;
              let i = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s];
                  li(n, o.selectors, !1) && (i || (i = []), En(wn(n, e), t, o.type), ie(o) ? (Ui(t, n), i.unshift(o)) : i.push(o))
                }
              return i
            }(t, e, n),
            o = null === r ? null : {
              "": -1
            };
          if (null !== s) {
            i = !0, $i(n, t.data.length, s.length);
            for (let t = 0; t < s.length; t++) {
              const e = s[t];
              e.providersResolver && e.providersResolver(e)
            }
            let r = !1,
              a = !1,
              l = Si(t, e, s.length, null);
            for (let i = 0; i < s.length; i++) {
              const c = s[i];
              n.mergedAttrs = fn(n.mergedAttrs, c.hostAttrs), Hi(t, n, e, l, c), Bi(l, c, o), null !== c.contentQueries && (n.flags |= 8), null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars || (n.flags |= 128);
              const u = c.type.prototype;
              !r && (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), r = !0), a || !u.ngOnChanges && !u.ngDoCheck || ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), a = !0), l++
            }! function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                i = e.attrs,
                s = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  c = null === i || ri(e) ? null : Qi(n, i);
                s.push(c), o = Fi(n, l, o), a = Fi(t.outputs, l, a)
              }
              null !== o && (o.hasOwnProperty("class") && (e.flags |= 16), o.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = s, e.inputs = o, e.outputs = a
            }(t, n)
          }
          o && function (t, e, n) {
            if (e) {
              const r = t.localNames = [];
              for (let t = 0; t < e.length; t += 2) {
                const i = n[e[t + 1]];
                if (null == i) throw new at("301", `Export of name '${e[t+1]}' not found!`);
                r.push(e[t], i)
              }
            }
          }(n, r, o)
        }
        return n.mergedAttrs = fn(n.mergedAttrs, n.attrs), i
      }

      function Vi(t, e, n, r, i, s) {
        const o = s.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const s = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0;) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n
            }
            return 0
          })(n) != s && n.push(s), n.push(r, i, o)
        }
      }

      function ji(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e)
      }

      function Ui(t, e) {
        e.flags |= 2, (t.components || (t.components = [])).push(e.index)
      }

      function Bi(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          ie(e) && (n[""] = t)
        }
      }

      function $i(t, e, n) {
        t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e
      }

      function Hi(t, e, n, r, i) {
        t.data[r] = i;
        const s = i.factory || (i.factory = se(i.type)),
          o = new cn(s, ie(i), null);
        t.blueprint[r] = o, n[r] = o, Vi(t, e, 0, r, Si(t, n, i.hostVars, di), i)
      }

      function zi(t, e, n) {
        const r = _e(e, t),
          i = Pi(n),
          s = t[10],
          o = Yi(t, xi(t, i, null, n.onPush ? 64 : 16, r, e, s, s.createRenderer(r, n), null, null));
        t[e.index] = o
      }

      function qi(t, e, n, r, i, s) {
        const o = s[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length;) {
            const i = o[e++],
              s = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, i, s) : n[s] = a
          }
        }
      }

      function Qi(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length;) {
          const i = e[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              t.hasOwnProperty(i) && (null === n && (n = []), n.push(i, t[i], e[r + 1])), r += 2
            } else r += 2;
          else r += 4
        }
        return n
      }

      function Wi(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null)
      }

      function Gi(t, e) {
        const n = ve(e, t);
        if (xe(n)) {
          const t = n[1];
          80 & n[2] ? ki(t, n, t.template, n[8]) : n[5] > 0 && Ki(n)
        }
      }

      function Ki(t) {
        for (let n = Or(t); null !== n; n = Rr(n))
          for (let t = Jt; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              ki(t, e, t.template, e[8])
            } else e[5] > 0 && Ki(e)
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = ve(e[n], t);
            xe(r) && r[5] > 0 && Ki(r)
          }
      }

      function Zi(t, e) {
        const n = ve(e, t),
          r = n[1];
        ! function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
        }(r, n), Ei(r, n, n[8])
      }

      function Yi(t, e) {
        return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
      }

      function Ji(t) {
        for (; t;) {
          t[2] |= 64;
          const e = Ar(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e
        }
        return null
      }

      function Xi(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          ki(t, e, t.template, n)
        } catch (i) {
          throw ss(e, i), i
        } finally {
          r.end && r.end()
        }
      }

      function ts(t) {
        ! function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = br(n),
              i = r[1];
            Ti(i, r, i.template, n)
          }
        }(t[8])
      }

      function es(t, e, n) {
        Be(0), e(t, n)
      }
      const ns = (() => Promise.resolve(null))();

      function rs(t) {
        return t[7] || (t[7] = [])
      }

      function is(t) {
        return t.cleanup || (t.cleanup = [])
      }

      function ss(t, e) {
        const n = t[9],
          r = n ? n.get(Cr, null) : null;
        r && r.handleError(e)
      }

      function os(t, e, n, r, i) {
        for (let s = 0; s < n.length;) {
          const o = n[s++],
            a = n[s++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, i, r, a) : l[a] = i
        }
      }

      function as(t, e, n) {
        let r = n ? t.styles : null,
          i = n ? t.classes : null,
          s = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            "number" == typeof t ? s = t : 1 == s ? i = nt(i, t) : 2 == s && (r = nt(r, t + ": " + e[++o] + ";"))
          }
        n ? t.styles = r : t.stylesWithoutHost = r, n ? t.classes = i : t.classesWithoutHost = i
      }
      const ls = new Bn("INJECTOR", -1);
      class cs {
        get(t, e = Jn) {
          if (e === Jn) {
            const e = new Error(`NullInjectorError: No provider for ${et(t)}!`);
            throw e.name = "NullInjectorError", e
          }
          return e
        }
      }
      const us = new Bn("Set Injector scope."),
        hs = {},
        ds = {};
      let fs;

      function ps() {
        return void 0 === fs && (fs = new cs), fs
      }

      function ms(t, e = null, n = null, r) {
        return new gs(t, n, e || ps(), r)
      }
      class gs {
        constructor(t, e, n, r = null) {
          this.parent = n, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
          const i = [];
          e && qn(e, n => this.processProvider(n, t, e)), qn([t], t => this.processInjectorType(t, [], i)), this.records.set(ls, bs(void 0, this));
          const s = this.records.get(us);
          this.scope = null != s ? s.value : null, this.source = r || ("object" == typeof t ? null : et(t))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), this._destroyed = !0;
          try {
            this.onDestroy.forEach(t => t.ngOnDestroy())
          } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
          }
        }
        get(t, e = Jn, n = vt.Default) {
          this.assertNotDestroyed();
          const r = rr(this);
          try {
            if (!(n & vt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n = ("function" == typeof (i = t) || "object" == typeof i && i instanceof Bn) && ft(t);
                e = n && this.injectableDefInScope(n) ? bs(ys(t), hs) : null, this.records.set(t, e)
              }
              if (null != e) return this.hydrate(t, e)
            }
            return (n & vt.Self ? ps() : this.parent).get(t, e = n & vt.Optional && e === Jn ? null : e)
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if ((s.ngTempTokenPath = s.ngTempTokenPath || []).unshift(et(t)), r) throw s;
              return function (t, e, n, r) {
                const i = t.ngTempTokenPath;
                throw e[tr] && i.unshift(e[tr]), t.message = function (t, e, n, r = null) {
                  t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                  let i = et(e);
                  if (Array.isArray(e)) i = e.map(et).join(" -> ");
                  else if ("object" == typeof e) {
                    let t = [];
                    for (let n in e)
                      if (e.hasOwnProperty(n)) {
                        let r = e[n];
                        t.push(n + ":" + ("string" == typeof r ? JSON.stringify(r) : et(r)))
                      } i = `{${t.join(", ")}}`
                  }
                  return `${n}${r?"("+r+")":""}[${i}]: ${t.replace(Xn,"\n  ")}`
                }("\n" + t.message, i, n, r), t.ngTokenPath = i, t.ngTempTokenPath = null, t
              }(s, t, "R3InjectorError", this.source)
            }
            throw s
          } finally {
            rr(r)
          }
          var i
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach(t => this.get(t))
        }
        toString() {
          const t = [];
          return this.records.forEach((e, n) => t.push(et(n))), `R3Injector[${t.join(", ")}]`
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Error("Injector has already been destroyed.")
        }
        processInjectorType(t, e, n) {
          if (!(t = st(t))) return !1;
          let r = mt(t);
          const i = null == r && t.ngModule || void 0,
            s = void 0 === i ? t : i,
            o = -1 !== n.indexOf(s);
          if (void 0 !== i && (r = mt(i)), null == r) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(s);
            try {
              qn(r.imports, r => {
                this.processInjectorType(r, e, n) && (void 0 === t && (t = []), t.push(r))
              })
            } finally {}
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const {
                  ngModule: n,
                  providers: r
                } = t[e];
                qn(r, t => this.processProvider(t, n, r || Lt))
              }
          }
          this.injectorDefTypes.add(s);
          const a = se(s) || (() => new s);
          this.records.set(s, bs(a, hs));
          const l = r.providers;
          if (null != l && !o) {
            const e = t;
            qn(l, t => this.processProvider(t, e, l))
          }
          return void 0 !== i && void 0 !== t.providers
        }
        processProvider(t, e, n) {
          let r = ws(t = st(t)) ? t : st(t && t.provide);
          const i = function (t, e, n) {
            return vs(t) ? bs(void 0, t.useValue) : bs(_s(t), hs)
          }(t);
          if (ws(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e || (e = bs(void 0, hs, !0), e.factory = () => ar(e.multi), this.records.set(r, e)), r = t, e.multi.push(t)
          }
          this.records.set(r, i)
        }
        hydrate(t, e) {
          var n;
          return e.value === hs && (e.value = ds, e.value = e.factory()), "object" == typeof e.value && e.value && null !== (n = e.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(e.value), e.value
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = st(t.providedIn);
          return "string" == typeof e ? "any" === e || e === this.scope : this.injectorDefTypes.has(e)
        }
      }

      function ys(t) {
        const e = ft(t),
          n = null !== e ? e.factory : se(t);
        if (null !== n) return n;
        if (t instanceof Bn) throw new Error(`Token ${et(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function) return function (t) {
          const e = t.length;
          if (e > 0) {
            const n = Gn(e, "?");
            throw new Error(`Can't resolve all parameters for ${et(t)}: (${n.join(", ")}).`)
          }
          const n = function (t) {
            const e = t && (t[gt] || t[_t]);
            if (e) {
              const n = function (t) {
                if (t.hasOwnProperty("name")) return t.name;
                const e = ("" + t).match(/^function\s*([^\s(]+)/);
                return null === e ? "" : e[1]
              }(t);
              return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e
            }
            return null
          }(t);
          return null !== n ? () => n.factory(t) : () => new t
        }(t);
        throw new Error("unreachable")
      }

      function _s(t, e, n) {
        let r;
        if (ws(t)) {
          const e = st(t);
          return se(e) || ys(e)
        }
        if (vs(t)) r = () => st(t.useValue);
        else if ((i = t) && i.useFactory) r = () => t.useFactory(...ar(t.deps || []));
        else if (function (t) {
            return !(!t || !t.useExisting)
          }(t)) r = () => sr(st(t.useExisting));
        else {
          const e = st(t && (t.useClass || t.provide));
          if (! function (t) {
              return !!t.deps
            }(t)) return se(e) || ys(e);
          r = () => new e(...ar(t.deps))
        }
        var i;
        return r
      }

      function bs(t, e, n = !1) {
        return {
          factory: t,
          value: e,
          multi: n ? [] : void 0
        }
      }

      function vs(t) {
        return null !== t && "object" == typeof t && er in t
      }

      function ws(t) {
        return "function" == typeof t
      }
      const xs = function (t, e, n) {
        return function (t, e = null, n = null, r) {
          const i = ms(t, e, n, r);
          return i._resolveInjectorDefTypes(), i
        }({
          name: n
        }, e, t, n)
      };
      let Cs = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t) ? xs(t, e, "") : xs(t.providers, t.parent, t.name || "")
          }
        }
        return t.THROW_IF_NOT_FOUND = Jn, t.NULL = new cs, t.\u0275prov = ht({
          token: t,
          providedIn: "any",
          factory: () => sr(ls)
        }), t.__NG_ELEMENT_ID__ = -1, t
      })();

      function Ss(t, e) {
        en(br(t)[1], Re())
      }

      function Es(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const r = [t];
        for (; e;) {
          let i;
          if (ie(t)) i = e.\u0275cmp || e.\u0275dir;
          else {
            if (e.\u0275cmp) throw new Error("Directives cannot inherit Components");
            i = e.\u0275dir
          }
          if (i) {
            if (n) {
              r.push(i);
              const e = t;
              e.inputs = ks(t.inputs), e.declaredInputs = ks(t.declaredInputs), e.outputs = ks(t.outputs);
              const n = i.hostBindings;
              n && Os(t, n);
              const s = i.viewQuery,
                o = i.contentQueries;
              if (s && Ts(t, s), o && As(t, o), tt(t.inputs, i.inputs), tt(t.declaredInputs, i.declaredInputs), tt(t.outputs, i.outputs), ie(i) && i.data.animation) {
                const e = t.data;
                e.animation = (e.animation || []).concat(i.data.animation)
              }
            }
            const e = i.features;
            if (e)
              for (let r = 0; r < e.length; r++) {
                const i = e[r];
                i && i.ngInherit && i(t), i === Es && (n = !1)
              }
          }
          e = Object.getPrototypeOf(e)
        }! function (t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const i = t[r];
            i.hostVars = e += i.hostVars, i.hostAttrs = fn(i.hostAttrs, n = fn(n, i.hostAttrs))
          }
        }(r)
      }

      function ks(t) {
        return t === Pt ? {} : t === Lt ? [] : t
      }

      function Ts(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n ? (t, r) => {
          e(t, r), n(t, r)
        } : e
      }

      function As(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n ? (t, r, i) => {
          e(t, r, i), n(t, r, i)
        } : e
      }

      function Os(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n ? (t, r) => {
          e(t, r), n(t, r)
        } : e
      }
      let Rs = null;

      function Is() {
        if (!Rs) {
          const t = It.Symbol;
          if (t && t.iterator) Rs = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (Rs = n)
            }
          }
        }
        return Rs
      }

      function Ps(t) {
        return !!Ls(t) && (Array.isArray(t) || !(t instanceof Map) && Is() in t)
      }

      function Ls(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t)
      }

      function Ds(t, e, n) {
        return !Object.is(t[e], n) && (t[e] = n, !0)
      }

      function Fs(t, e, n, r) {
        const i = Ae();
        return Ds(i, Ne(), e) && (Oe(), function (t, e, n, r, i, s) {
          const o = _e(t, e);
          ! function (t, e, n, r, i, s, o) {
            if (null == s) pe(t) ? t.removeAttribute(e, i, n) : e.removeAttribute(i);
            else {
              const a = null == o ? lt(s) : o(s, r || "", i);
              pe(t) ? t.setAttribute(e, i, a, n) : n ? e.setAttributeNS(n, i, a) : e.setAttribute(i, a)
            }
          }(e[11], o, s, t.value, n, r, i)
        }(Je(), i, t, e, n, r)), Fs
      }

      function Ms(t, e, n, r, i, s, o, a) {
        const l = Ae(),
          c = Oe(),
          u = t + Yt,
          h = c.firstCreatePass ? function (t, e, n, r, i, s, o, a, l) {
            const c = e.consts,
              u = Ci(e, t, 4, o || null, Ce(c, a));
            Ni(e, n, u, Ce(c, l)), en(e, u);
            const h = u.tViews = Li(2, u, r, i, s, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c);
            return null !== e.queries && (e.queries.template(e, u), h.queries = e.queries.embeddedTView(u)), u
          }(u, c, l, e, n, r, i, s, o) : c.data[u];
        Pe(h, !1);
        const d = l[11].createComment("");
        qr(c, l, d, h), _r(d, l), Yi(l, l[u] = Wi(d, l, d, h)), re(h) && Ri(c, l, h), null != o && Ii(l, h, a)
      }

      function Ns(t, e = vt.Default) {
        const n = Ae();
        return null === n ? sr(t, e) : An(Re(), n, st(t), e)
      }

      function Vs(t, e, n) {
        const r = Ae();
        return Ds(r, Ne(), e) && Mi(Oe(), Je(), r, t, e, r[11], n, !1), Vs
      }

      function js(t, e, n, r, i) {
        const s = i ? "class" : "style";
        os(t, n, e.inputs[s], s, r)
      }

      function Us(t, e, n, r) {
        const i = Ae(),
          s = Oe(),
          o = Yt + t,
          a = i[11],
          l = i[o] = Lr(a, e, ke.lFrame.currentNamespace),
          c = s.firstCreatePass ? function (t, e, n, r, i, s, o) {
            const a = e.consts,
              l = Ci(e, t, 2, i, Ce(a, s));
            return Ni(e, n, l, Ce(a, o)), null !== l.attrs && as(l, l.attrs, !1), null !== l.mergedAttrs && as(l, l.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, l), l
          }(o, s, i, 0, e, n, r) : s.data[o];
        Pe(c, !0);
        const u = c.mergedAttrs;
        null !== u && un(a, l, u);
        const h = c.classes;
        null !== h && Xr(a, l, h);
        const d = c.styles;
        null !== d && Jr(a, l, d), 64 != (64 & c.flags) && qr(s, i, l, c), 0 === ke.lFrame.elementDepthCount && _r(l, i), ke.lFrame.elementDepthCount++, re(c) && (Ri(s, i, c), Oi(s, c, i)), null !== r && Ii(i, c)
      }

      function Bs() {
        let t = Re();
        Le() ? De() : (t = t.parent, Pe(t, !1));
        const e = t;
        ke.lFrame.elementDepthCount--;
        const n = Oe();
        n.firstCreatePass && (en(n, t), ee(t) && n.queries.elementEnd(t)), null != e.classesWithoutHost && function (t) {
          return 0 != (16 & t.flags)
        }(e) && js(n, e, Ae(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function (t) {
          return 0 != (32 & t.flags)
        }(e) && js(n, e, Ae(), e.stylesWithoutHost, !1)
      }

      function $s(t, e, n, r) {
        Us(t, e, n, r), Bs()
      }

      function Hs(t, e, n) {
        const r = Ae(),
          i = Oe(),
          s = t + Yt,
          o = i.firstCreatePass ? function (t, e, n, r, i) {
            const s = e.consts,
              o = Ce(s, r),
              a = Ci(e, t, 8, "ng-container", o);
            return null !== o && as(a, o, !0), Ni(e, n, a, Ce(s, i)), null !== e.queries && e.queries.elementStart(e, a), a
          }(s, i, r, e, n) : i.data[s];
        Pe(o, !0);
        const a = r[s] = r[11].createComment("");
        qr(i, r, a, o), _r(a, r), re(o) && (Ri(i, r, o), Oi(i, o, r)), null != n && Ii(r, o)
      }

      function zs() {
        let t = Re();
        const e = Oe();
        Le() ? De() : (t = t.parent, Pe(t, !1)), e.firstCreatePass && (en(e, t), ee(t) && e.queries.elementEnd(t))
      }

      function qs(t) {
        return !!t && "function" == typeof t.then
      }
      const Qs = function (t) {
        return !!t && "function" == typeof t.subscribe
      };

      function Ws(t, e, n, r) {
        const i = Ae(),
          s = Oe(),
          o = Re();
        return function (t, e, n, r, i, s, o, a) {
          const l = re(r),
            c = t.firstCreatePass && is(t),
            u = rs(e);
          let h = !0;
          if (3 & r.type || a) {
            const d = _e(r, e),
              f = a ? a(d) : d,
              p = u.length,
              m = a ? t => a(ge(t[r.index])) : r.index;
            if (pe(n)) {
              let o = null;
              if (!a && l && (o = function (t, e, n, r) {
                  const i = t.cleanup;
                  if (null != i)
                    for (let s = 0; s < i.length - 1; s += 2) {
                      const t = i[s];
                      if (t === n && i[s + 1] === r) {
                        const t = e[7],
                          n = i[s + 2];
                        return t.length > n ? t[n] : null
                      }
                      "string" == typeof t && (s += 2)
                    }
                  return null
                }(t, e, i, r.index)), null !== o)(o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = s, o.__ngLastListenerFn__ = s, h = !1;
              else {
                s = Ks(r, e, 0, s, !1);
                const t = n.listen(f, i, s);
                u.push(s, t), c && c.push(i, m, p, p + 1)
              }
            } else s = Ks(r, e, 0, s, !0), f.addEventListener(i, s, o), u.push(s), c && c.push(i, m, p, o)
          } else s = Ks(r, e, 0, s, !1);
          const d = r.outputs;
          let f;
          if (h && null !== d && (f = d[i])) {
            const t = f.length;
            if (t)
              for (let n = 0; n < t; n += 2) {
                const t = e[f[n]][f[n + 1]].subscribe(s),
                  o = u.length;
                u.push(s, t), c && c.push(i, r.index, o, -(o + 1))
              }
          }
        }(s, i, i[11], o, t, e, !!n, r), Ws
      }

      function Gs(t, e, n, r) {
        try {
          return !1 !== n(r)
        } catch (i) {
          return ss(t, i), !1
        }
      }

      function Ks(t, e, n, r, i) {
        return function n(s) {
          if (s === Function) return r;
          const o = 2 & t.flags ? ve(t.index, e) : e;
          0 == (32 & e[2]) && Ji(o);
          let a = Gs(e, 0, r, s),
            l = n.__ngNextListenerFn__;
          for (; l;) a = Gs(e, 0, l, s) && a, l = l.__ngNextListenerFn__;
          return i && !1 === a && (s.preventDefault(), s.returnValue = !1), a
        }
      }

      function Zs(t = 1) {
        return function (t) {
          return (ke.lFrame.contextLView = function (t, e) {
            for (; t > 0;) e = e[15], t--;
            return e
          }(t, ke.lFrame.contextLView))[8]
        }(t)
      }

      function Ys(t, e) {
        let n = null;
        const r = function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1]
          }
          return null
        }(t);
        for (let i = 0; i < e.length; i++) {
          const s = e[i];
          if ("*" !== s) {
            if (null === r ? li(t, s, !0) : ci(r, s)) return i
          } else n = i
        }
        return n
      }

      function Js(t) {
        const e = Ae()[16][6];
        if (!e.projection) {
          const n = e.projection = Gn(t ? t.length : 1, null),
            r = n.slice();
          let i = e.child;
          for (; null !== i;) {
            const e = t ? Ys(i, t) : 0;
            null !== e && (r[e] ? r[e].projectionNext = i : n[e] = i, r[e] = i), i = i.next
          }
        }
      }

      function Xs(t, e = 0, n) {
        const r = Ae(),
          i = Oe(),
          s = Ci(i, Yt + t, 16, null, n || null);
        null === s.projection && (s.projection = e), De(), 64 != (64 & s.flags) && function (t, e, n) {
          Yr(e[11], 0, e, n, Vr(t, n, e), Hr(n.parent || e[6], n, e))
        }(i, r, s)
      }

      function to(t, e, n, r, i) {
        const s = t[n + 1],
          o = null === e;
        let a = r ? gi(s) : _i(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o);) {
          const n = t[a + 1];
          eo(t[a], e) && (l = !0, t[a + 1] = r ? vi(n) : yi(n)), a = r ? gi(n) : _i(n)
        }
        l && (t[n + 1] = r ? yi(s) : vi(s))
      }

      function eo(t, e) {
        return null === t || null == e || (Array.isArray(t) ? t[1] : t) === e || !(!Array.isArray(t) || "string" != typeof e) && Yn(t, e) >= 0
      }

      function no(t, e) {
        return function (t, e, n, r) {
          const i = Ae(),
            s = Oe(),
            o = function (t) {
              const e = ke.lFrame,
                n = e.bindingIndex;
              return e.bindingIndex = e.bindingIndex + 2, n
            }();
          s.firstUpdatePass && function (t, e, n, r) {
            const i = t.data;
            if (null === i[n + 1]) {
              const s = i[Ze()],
                o = function (t, e) {
                  return e >= t.expandoStartIndex
                }(t, n);
              (function (t, e) {
                return 0 != (16 & t.flags)
              })(s) && null === e && !o && (e = !1), e = function (t, e, n, r) {
                  const i = function (t) {
                    const e = ke.lFrame.currentDirectiveIndex;
                    return -1 === e ? null : t[e]
                  }(t);
                  let s = e.residualClasses;
                  if (null === i) 0 === e.classBindings && (n = io(n = ro(null, t, e, n, r), e.attrs, r), s = null);
                  else {
                    const o = e.directiveStylingLast;
                    if (-1 === o || t[o] !== i)
                      if (n = ro(i, t, e, n, r), null === s) {
                        let n = function (t, e, n) {
                          const r = e.classBindings;
                          if (0 !== _i(r)) return t[gi(r)]
                        }(t, e);
                        void 0 !== n && Array.isArray(n) && (n = ro(null, t, e, n[1], r), n = io(n, e.attrs, r), function (t, e, n, r) {
                          t[gi(e.classBindings)] = r
                        }(t, e, 0, n))
                      } else s = function (t, e, n) {
                        let r;
                        const i = e.directiveEnd;
                        for (let s = 1 + e.directiveStylingLast; s < i; s++) r = io(r, t[s].hostAttrs, true);
                        return io(r, e.attrs, true)
                      }(t, e)
                  }
                  return void 0 !== s && (e.residualClasses = s), n
                }(i, s, e, r),
                function (t, e, n, r, i, s) {
                  let o = e.classBindings,
                    a = gi(o),
                    l = _i(o);
                  t[r] = n;
                  let c, u = !1;
                  if (Array.isArray(n)) {
                    const t = n;
                    c = t[1], (null === c || Yn(t, c) > 0) && (u = !0)
                  } else c = n;
                  if (i)
                    if (0 !== l) {
                      const e = gi(t[a + 1]);
                      t[r + 1] = mi(e, a), 0 !== e && (t[e + 1] = bi(t[e + 1], r)), t[a + 1] = 131071 & t[a + 1] | r << 17
                    } else t[r + 1] = mi(a, 0), 0 !== a && (t[a + 1] = bi(t[a + 1], r)), a = r;
                  else t[r + 1] = mi(l, 0), 0 === a ? a = r : t[l + 1] = bi(t[l + 1], r), l = r;
                  u && (t[r + 1] = yi(t[r + 1])), to(t, c, r, !0), to(t, c, r, !1),
                    function (t, e, n, r, i) {
                      const s = t.residualClasses;
                      null != s && "string" == typeof e && Yn(s, e) >= 0 && (n[r + 1] = vi(n[r + 1]))
                    }(e, c, t, r), o = mi(a, l), e.classBindings = o
                }(i, s, e, n, o)
            }
          }(s, t, o, true), e !== di && Ds(i, o, e) && function (t, e, n, r, i, s, o, a) {
            if (!(3 & e.type)) return;
            const l = t.data,
              c = l[a + 1];
            oo(1 == (1 & c) ? so(l, e, n, i, _i(c), o) : void 0) || (oo(s) || function (t) {
              return 2 == (2 & t)
            }(c) && (s = so(l, null, n, i, a, o)), function (t, e, n, r, i) {
              const s = pe(t);
              i ? s ? t.addClass(n, r) : n.classList.add(r) : s ? t.removeClass(n, r) : n.classList.remove(r)
            }(r, 0, ye(Ze(), n), i, s))
          }(s, s.data[Ze()], i, i[11], t, i[o + 1] = function (t, e) {
            return null == t || "object" == typeof t && (t = et(fr(t))), t
          }(e), true, o)
        }(t, e), no
      }

      function ro(t, e, n, r, i) {
        let s = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (-1 === a ? a = n.directiveStart : a++; a < o && (s = e[a], r = io(r, s.hostAttrs, i), s !== t);) a++;
        return null !== t && (n.directiveStylingLast = a), r
      }

      function io(t, e, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s];
            "number" == typeof o ? i = o : i === r && (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]), Kn(t, o, !!n || e[++s]))
          }
        return void 0 === t ? null : t
      }

      function so(t, e, n, r, i, s) {
        const o = null === e;
        let a;
        for (; i > 0;) {
          const e = t[i],
            s = Array.isArray(e),
            l = s ? e[1] : e,
            c = null === l;
          let u = n[i + 1];
          u === di && (u = c ? Lt : void 0);
          let h = c ? Zn(u, r) : l === r ? u : void 0;
          if (s && !oo(h) && (h = Zn(e, r)), oo(h) && (a = h, o)) return a;
          const d = t[i + 1];
          i = o ? gi(d) : _i(d)
        }
        if (null !== e) {
          let t = s ? e.residualClasses : e.residualStyles;
          null != t && (a = Zn(t, r))
        }
        return a
      }

      function oo(t) {
        return void 0 !== t
      }

      function ao(t, e = "") {
        const n = Ae(),
          r = Oe(),
          i = t + Yt,
          s = r.firstCreatePass ? Ci(r, i, 1, e, null) : r.data[i],
          o = n[i] = function (t, e) {
            return pe(t) ? t.createText(e) : t.createTextNode(e)
          }(n[11], e);
        qr(r, n, o, s), Pe(s, !1)
      }

      function lo(t) {
        return co("", t, ""), lo
      }

      function co(t, e, n) {
        const r = Ae(),
          i = function (t, e, n, r) {
            return Ds(t, Ne(), n) ? e + lt(n) + r : di
          }(r, t, e, n);
        return i !== di && function (t, e, n) {
          const r = ye(e, t);
          ! function (t, e, n) {
            pe(t) ? t.setValue(e, n) : e.textContent = n
          }(t[11], r, n)
        }(r, Ze(), i), co
      }

      function uo(t, e, n) {
        const r = Ae();
        return Ds(r, Ne(), e) && Mi(Oe(), Je(), r, t, e, r[11], n, !0), uo
      }
      const ho = void 0;
      var fo = ["en", [
          ["a", "p"],
          ["AM", "PM"], ho
        ],
        [
          ["AM", "PM"], ho, ho
        ],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ], ho, [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        ], ho, [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"]
        ], 0, [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ho, "{1} 'at' {0}", ho],
        [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5
        }
      ];
      let po = {};

      function mo(t) {
        return t in po || (po[t] = It.ng && It.ng.common && It.ng.common.locales && It.ng.common.locales[t]), po[t]
      }
      var go = function (t) {
        return t[t.LocaleId = 0] = "LocaleId", t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat", t[t.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", t[t.DaysFormat = 3] = "DaysFormat", t[t.DaysStandalone = 4] = "DaysStandalone", t[t.MonthsFormat = 5] = "MonthsFormat", t[t.MonthsStandalone = 6] = "MonthsStandalone", t[t.Eras = 7] = "Eras", t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek", t[t.WeekendRange = 9] = "WeekendRange", t[t.DateFormat = 10] = "DateFormat", t[t.TimeFormat = 11] = "TimeFormat", t[t.DateTimeFormat = 12] = "DateTimeFormat", t[t.NumberSymbols = 13] = "NumberSymbols", t[t.NumberFormats = 14] = "NumberFormats", t[t.CurrencyCode = 15] = "CurrencyCode", t[t.CurrencySymbol = 16] = "CurrencySymbol", t[t.CurrencyName = 17] = "CurrencyName", t[t.Currencies = 18] = "Currencies", t[t.Directionality = 19] = "Directionality", t[t.PluralCase = 20] = "PluralCase", t[t.ExtraData = 21] = "ExtraData", t
      }({});
      const yo = "en-US";
      let _o = yo;

      function bo(t) {
        var e, n;
        n = "Expected localeId to be defined", null == (e = t) && function (t, e, n, r) {
          throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)
        }(n, e), "string" == typeof t && (_o = t.toLowerCase().replace(/_/g, "-"))
      }

      function vo(t, e, n, r, i) {
        if (t = st(t), Array.isArray(t))
          for (let s = 0; s < t.length; s++) vo(t[s], e, n, r, i);
        else {
          const s = Oe(),
            o = Ae();
          let a = ws(t) ? t : st(t.provide),
            l = _s(t);
          const c = Re(),
            u = 1048575 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 20;
          if (ws(t) || !t.multi) {
            const r = new cn(l, i, Ns),
              f = Co(a, e, i ? u : u + d, h); - 1 === f ? (En(wn(c, o), s, a), wo(s, t, e.length), e.push(a), c.directiveStart++, c.directiveEnd++, i && (c.providerIndexes += 1048576), n.push(r), o.push(r)) : (n[f] = r, o[f] = r)
          } else {
            const f = Co(a, e, u + d, h),
              p = Co(a, e, u, u + d),
              m = f >= 0 && n[f],
              g = p >= 0 && n[p];
            if (i && !g || !i && !m) {
              En(wn(c, o), s, a);
              const u = function (t, e, n, r, i) {
                const s = new cn(t, n, Ns);
                return s.multi = [], s.index = e, s.componentProviders = 0, xo(s, i, r && !n), s
              }(i ? Eo : So, n.length, i, r, l);
              !i && g && (n[p].providerFactory = u), wo(s, t, e.length, 0), e.push(a), c.directiveStart++, c.directiveEnd++, i && (c.providerIndexes += 1048576), n.push(u), o.push(u)
            } else wo(s, t, f > -1 ? f : p, xo(n[i ? p : f], l, !i && r));
            !i && r && g && n[p].componentProviders++
          }
        }
      }

      function wo(t, e, n, r) {
        const i = ws(e);
        if (i || e.useClass) {
          const s = (e.useClass || e).prototype.ngOnDestroy;
          if (s) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!i && e.multi) {
              const t = o.indexOf(n); - 1 === t ? o.push(n, [r, s]) : o[t + 1].push(r, s)
            } else o.push(n, s)
          }
        }
      }

      function xo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1
      }

      function Co(t, e, n, r) {
        for (let i = n; i < r; i++)
          if (e[i] === t) return i;
        return -1
      }

      function So(t, e, n, r) {
        return ko(this.multi, [])
      }

      function Eo(t, e, n, r) {
        const i = this.multi;
        let s;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Ln(n, n[1], this.providerFactory.index, r);
          s = e.slice(0, t), ko(i, s);
          for (let n = t; n < e.length; n++) s.push(e[n])
        } else s = [], ko(i, s);
        return s
      }

      function ko(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e
      }

      function To(t, e = []) {
        return n => {
          n.providersResolver = (n, r) => function (t, e, n) {
            const r = Oe();
            if (r.firstCreatePass) {
              const i = ie(t);
              vo(n, r.data, r.blueprint, i, !0), vo(e, r.data, r.blueprint, i, !1)
            }
          }(n, r ? r(t) : t, e)
        }
      }
      class Ao {}
      class Oo {
        resolveComponentFactory(t) {
          throw function (t) {
            const e = Error(`No component factory found for ${et(t)}. Did you add it to @NgModule.entryComponents?`);
            return e.ngComponent = t, e
          }(t)
        }
      }
      let Ro = (() => {
        class t {}
        return t.NULL = new Oo, t
      })();

      function Io(...t) {}

      function Po(t, e) {
        return new Do(_e(t, e))
      }
      const Lo = function () {
        return Po(Re(), Ae())
      };
      let Do = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t
          }
        }
        return t.__NG_ELEMENT_ID__ = Lo, t
      })();

      function Fo(t) {
        return t instanceof Do ? t.nativeElement : t
      }
      class Mo {}
      let No = (() => {
        class t {}
        return t.\u0275prov = ht({
          token: t,
          providedIn: "root",
          factory: () => null
        }), t
      })();
      class Vo {
        constructor(t) {
          this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
        }
      }
      const jo = new Vo("12.0.3");
      class Uo {
        constructor() {}
        supports(t) {
          return Ps(t)
        }
        create(t) {
          return new $o(t)
        }
      }
      const Bo = (t, e) => e;
      class $o {
        constructor(t) {
          this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || Bo
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e)
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            i = null;
          for (; e || n;) {
            const s = !n || e && e.currentIndex < Qo(n, r, i) ? e : n,
              o = Qo(s, r, i),
              a = s.currentIndex;
            if (s === n) r--, n = n._nextRemoved;
            else if (e = e._next, null == s.previousIndex) r++;
            else {
              i || (i = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < i.length ? i[n] : i[n] = 0,
                    s = r + n;
                  e <= s && s < t && (i[n] = r + 1)
                }
                i[s.previousIndex] = e - t
              }
            }
            o !== a && t(s, o, a)
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
        }
        forEachIdentityChange(t) {
          let e;
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e)
        }
        diff(t) {
          if (null == t && (t = []), !Ps(t)) throw new Error(`Error trying to diff '${et(t)}'. Only arrays and iterables are allowed`);
          return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e, n, r, i = this._itHead,
            s = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++) n = t[e], r = this._trackByFn(e, n), null !== i && Object.is(i.trackById, r) ? (s && (i = this._verifyReinsertion(i, n, r, e)), Object.is(i.item, n) || this._addIdentityChange(i, n)) : (i = this._mismatch(i, n, r, e), s = !0), i = i._next
          } else e = 0,
            function (t, e) {
              if (Array.isArray(t))
                for (let n = 0; n < t.length; n++) e(t[n]);
              else {
                const n = t[Is()]();
                let r;
                for (; !(r = n.next()).done;) e(r.value)
              }
            }(t, t => {
              r = this._trackByFn(e, t), null !== i && Object.is(i.trackById, r) ? (s && (i = this._verifyReinsertion(i, t, r, e)), Object.is(i.item, t) || this._addIdentityChange(i, t)) : (i = this._mismatch(i, t, r, e), s = !0), i = i._next, e++
            }), this.length = e;
          return this._truncate(i), this.collection = t, this.isDirty
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
            this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
          }
        }
        _mismatch(t, e, n, r) {
          let i;
          return null === t ? i = this._itTail : (i = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, i, r)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, i, r)) : t = this._addAfter(new Ho(e, n), i, r), t
        }
        _verifyReinsertion(t, e, n, r) {
          let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
          return null !== i ? t = this._reinsertAfter(i, t._prev, r) : t.currentIndex != r && (t.currentIndex = r, this._addToMoves(t, r)), t
        }
        _truncate(t) {
          for (; null !== t;) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), t = e
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            i = t._nextRemoved;
          return null === r ? this._removalsHead = i : r._nextRemoved = i, null === i ? this._removalsTail = r : i._prevRemoved = r, this._insertAfter(t, e, n), this._addToMoves(t, n), t
        }
        _moveAfter(t, e, n) {
          return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
        }
        _addAfter(t, e, n) {
          return this._insertAfter(t, e, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return t._next = r, t._prev = e, null === r ? this._itTail = t : r._prev = t, null === e ? this._itHead = t : e._next = t, null === this._linkedRecords && (this._linkedRecords = new qo), this._linkedRecords.put(t), t.currentIndex = n, t
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t))
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return null === e ? this._itHead = n : e._next = n, null === n ? this._itTail = e : n._prev = e, t
        }
        _addToMoves(t, e) {
          return t.previousIndex === e || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
        }
        _addToRemovals(t) {
          return null === this._unlinkedRecords && (this._unlinkedRecords = new qo), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
        }
        _addIdentityChange(t, e) {
          return t.item = e, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
        }
      }
      class Ho {
        constructor(t, e) {
          this.item = t, this.trackById = e, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
        }
      }
      class zo {
        constructor() {
          this._head = null, this._tail = null
        }
        add(t) {
          null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
          return null
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return null === e ? this._head = n : e._nextDup = n, null === n ? this._tail = e : n._prevDup = e, null === this._head
        }
      }
      class qo {
        constructor() {
          this.map = new Map
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || (n = new zo, this.map.set(e, n)), n.add(t)
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t
        }
        get isEmpty() {
          return 0 === this.map.size
        }
        clear() {
          this.map.clear()
        }
      }

      function Qo(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + e + i
      }
      class Wo {
        constructor() {}
        supports(t) {
          return t instanceof Map || Ls(t)
        }
        create() {
          return new Go
        }
      }
      class Go {
        constructor() {
          this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e)
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Ls(t))) throw new Error(`Error trying to diff '${et(t)}'. Only maps and objects are allowed`)
          } else t = new Map;
          return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (this._appendAfter = null, this._forEach(t, (t, n) => {
              if (e && e.key === n) this._maybeAddToChanges(e, t), this._appendAfter = e, e = e._next;
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r)
              }
            }), e) {
            e._prev && (e._prev._next = null), this._removalsHead = e;
            for (let t = e; null !== t; t = t._nextRemoved) t === this._mapHead && (this._mapHead = null), this._records.delete(t.key), t._nextRemoved = t._next, t.previousValue = t.currentValue, t.currentValue = null, t._prev = null, t._next = null
          }
          return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return e._next = t, e._prev = n, t._prev = e, n && (n._next = e), t === this._mapHead && (this._mapHead = e), this._appendAfter = t, t
          }
          return this._appendAfter ? (this._appendAfter._next = e, e._prev = this._appendAfter) : this._mapHead = e, this._appendAfter = e, null
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              i = n._next;
            return r && (r._next = i), i && (i._prev = r), n._next = null, n._prev = null, n
          }
          const n = new Ko(t);
          return this._records.set(t, n), n.currentValue = e, this._addToAdditions(n), n
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
            this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = e, this._addToChanges(t))
        }
        _addToAdditions(t) {
          null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
        }
        _addToChanges(t) {
          null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
        }
        _forEach(t, e) {
          t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
        }
      }
      class Ko {
        constructor(t) {
          this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
        }
      }

      function Zo() {
        return new Yo([new Uo])
      }
      let Yo = (() => {
        class t {
          constructor(t) {
            this.factories = t
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t)
            }
            return new t(e)
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: n => t.create(e, n || Zo()),
              deps: [
                [t, new hr, new ur]
              ]
            }
          }
          find(t) {
            const e = this.factories.find(e => e.supports(t));
            if (null != e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}' of type '${n=t,n.name||typeof n}'`);
            var n
          }
        }
        return t.\u0275prov = ht({
          token: t,
          providedIn: "root",
          factory: Zo
        }), t
      })();

      function Jo() {
        return new Xo([new Wo])
      }
      let Xo = (() => {
        class t {
          constructor(t) {
            this.factories = t
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t)
            }
            return new t(e)
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: n => t.create(e, n || Jo()),
              deps: [
                [t, new hr, new ur]
              ]
            }
          }
          find(t) {
            const e = this.factories.find(e => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`)
          }
        }
        return t.\u0275prov = ht({
          token: t,
          providedIn: "root",
          factory: Jo
        }), t
      })();

      function ta(t, e, n, r, i = !1) {
        for (; null !== n;) {
          const s = e[n.index];
          if (null !== s && r.push(ge(s)), te(s))
            for (let t = Jt; t < s.length; t++) {
              const e = s[t],
                n = e[1].firstChild;
              null !== n && ta(e[1], e, n, r)
            }
          const o = n.type;
          if (8 & o) ta(t, e, n.child, r);
          else if (32 & o) {
            const t = Tr(n, e);
            let i;
            for (; i = t();) r.push(i)
          } else if (16 & o) {
            const t = Wr(e, n);
            if (Array.isArray(t)) r.push(...t);
            else {
              const n = Ar(e[16]);
              ta(n[1], n, t, r, !0)
            }
          }
          n = i ? n.projectionNext : n.next
        }
        return r
      }
      class ea {
        constructor(t, e) {
          this._lView = t, this._cdRefInjectingView = e, this._appRef = null, this._attachedToViewContainer = !1
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return ta(e, t, e.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        set context(t) {
          this._lView[8] = t
        }
        get destroyed() {
          return 256 == (256 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (te(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (Fr(t, n), Wn(e, n))
            }
            this._attachedToViewContainer = !1
          }
          Mr(this._lView[1], this._lView)
        }
        onDestroy(t) {
          Di(this._lView[1], this._lView, null, t)
        }
        markForCheck() {
          Ji(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -129
        }
        reattach() {
          this._lView[2] |= 128
        }
        detectChanges() {
          Xi(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {
          ! function (t, e, n) {
            Me(!0);
            try {
              Xi(t, e, n)
            } finally {
              Me(!1)
            }
          }(this._lView[1], this._lView, this.context)
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          var t;
          this._appRef = null, Zr(this._lView[1], t = this._lView, t[11], 2, null, null)
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new Error("This view is already attached to a ViewContainer!");
          this._appRef = t
        }
      }
      class na extends ea {
        constructor(t) {
          super(t), this._view = t
        }
        detectChanges() {
          ts(this._view)
        }
        checkNoChanges() {
          ! function (t) {
            Me(!0);
            try {
              ts(t)
            } finally {
              Me(!1)
            }
          }(this._view)
        }
        get context() {
          return null
        }
      }
      const ra = function (t) {
        return function (t, e, n) {
          if (ne(t) && !n) {
            const n = ve(t.index, e);
            return new ea(n, n)
          }
          return 47 & t.type ? new ea(e[16], e) : null
        }(Re(), Ae(), 16 == (16 & t))
      };
      let ia = (() => {
        class t {}
        return t.__NG_ELEMENT_ID__ = ra, t
      })();
      const sa = [new Wo],
        oa = new Yo([new Uo]),
        aa = new Xo(sa),
        la = function () {
          return da(Re(), Ae())
        };
      let ca = (() => {
        class t {}
        return t.__NG_ELEMENT_ID__ = la, t
      })();
      const ua = ca,
        ha = class extends ua {
          constructor(t, e, n) {
            super(), this._declarationLView = t, this._declarationTContainer = e, this.elementRef = n
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = xi(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const r = this._declarationLView[19];
            return null !== r && (n[19] = r.createEmbeddedView(e)), Ei(e, n, t), new ea(n)
          }
        };

      function da(t, e) {
        return 4 & t.type ? new ha(e, t, Po(t, e)) : null
      }
      class fa {}
      class pa {}
      const ma = function () {
        return wa(Re(), Ae())
      };
      let ga = (() => {
        class t {}
        return t.__NG_ELEMENT_ID__ = ma, t
      })();
      const ya = ga,
        _a = class extends ya {
          constructor(t, e, n) {
            super(), this._lContainer = t, this._hostTNode = e, this._hostLView = n
          }
          get element() {
            return Po(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new Mn(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const t = Sn(this._hostTNode, this._hostLView);
            if (mn(t)) {
              const e = yn(t, this._hostLView),
                n = gn(t);
              return new Mn(e[1].data[n + 8], e)
            }
            return new Mn(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0;) this.remove(this.length - 1)
          }
          get(t) {
            const e = ba(this._lContainer);
            return null !== e && e[t] || null
          }
          get length() {
            return this._lContainer.length - Jt
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r
          }
          createComponent(t, e, n, r, i) {
            const s = n || this.parentInjector;
            if (!i && null == t.ngModule && s) {
              const t = s.get(fa, null);
              t && (i = t)
            }
            const o = t.create(s, r, void 0, i);
            return this.insert(o.hostView, e), o
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1];
            if (te(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  r = new _a(e, e[6], e[3]);
                r.detach(r.indexOf(t))
              }
            }
            const i = this._adjustIndex(e),
              s = this._lContainer;
            ! function (t, e, n, r) {
              const i = Jt + r,
                s = n.length;
              r > 0 && (n[i - 1][4] = e), r < s - Jt ? (e[4] = n[i], Qn(n, Jt + r, e)) : (n.push(e), e[4] = null), e[3] = n;
              const o = e[17];
              null !== o && n !== o && function (t, e) {
                const n = t[9];
                e[16] !== e[3][3][16] && (t[2] = !0), null === n ? t[9] = [e] : n.push(e)
              }(o, e);
              const a = e[19];
              null !== a && a.insertView(t), e[2] |= 128
            }(r, n, s, i);
            const o = Gr(i, s),
              a = n[11],
              l = $r(a, s[7]);
            return null !== l && function (t, e, n, r, i, s) {
              r[0] = i, r[6] = e, Zr(t, r, n, 1, i, s)
            }(r, s[6], a, n, l, o), t.attachToViewContainerRef(), Qn(va(s), i, t), t
          }
          move(t, e) {
            return this.insert(t, e)
          }
          indexOf(t) {
            const e = ba(this._lContainer);
            return null !== e ? e.indexOf(t) : -1
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = Fr(this._lContainer, e);
            n && (Wn(va(this._lContainer), e), Mr(n[1], n))
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = Fr(this._lContainer, e);
            return n && null != Wn(va(this._lContainer), e) ? new ea(n) : null
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t
          }
        };

      function ba(t) {
        return t[8]
      }

      function va(t) {
        return t[8] || (t[8] = [])
      }

      function wa(t, e) {
        let n;
        const r = e[t.index];
        if (te(r)) n = r;
        else {
          let i;
          if (8 & t.type) i = ge(r);
          else {
            const n = e[11];
            i = n.createComment("");
            const r = _e(t, e);
            jr(n, $r(n, r), i, function (t, e) {
              return pe(t) ? t.nextSibling(e) : e.nextSibling
            }(n, r), !1)
          }
          e[t.index] = n = Wi(r, e, i, t), Yi(e, n)
        }
        return new _a(n, t, e)
      }
      const xa = {};
      class Ca extends Ro {
        constructor(t) {
          super(), this.ngModule = t
        }
        resolveComponentFactory(t) {
          const e = Kt(t);
          return new ka(e, this.ngModule)
        }
      }

      function Sa(t) {
        const e = [];
        for (let n in t) t.hasOwnProperty(n) && e.push({
          propName: t[n],
          templateName: n
        });
        return e
      }
      const Ea = new Bn("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Sr
      });
      class ka extends Ao {
        constructor(t, e) {
          super(), this.componentDef = t, this.ngModule = e, this.componentType = t.type, this.selector = t.selectors.map(hi).join(","), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!e
        }
        get inputs() {
          return Sa(this.componentDef.inputs)
        }
        get outputs() {
          return Sa(this.componentDef.outputs)
        }
        create(t, e, n, r) {
          const i = (r = r || this.ngModule) ? function (t, e) {
              return {
                get: (n, r, i) => {
                  const s = t.get(n, xa, i);
                  return s !== xa || r === xa ? s : e.get(n, r, i)
                }
              }
            }(t, r.injector) : t,
            s = i.get(Mo, me),
            o = i.get(No, null),
            a = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n ? function (t, e, n) {
              if (pe(t)) return t.selectRootElement(e, n === kt.ShadowDom);
              let r = "string" == typeof e ? t.querySelector(e) : e;
              return r.textContent = "", r
            }(a, n, this.componentDef.encapsulation) : Lr(s.createRenderer(null, this.componentDef), l, function (t) {
              const e = t.toLowerCase();
              return "svg" === e ? de : "math" === e ? "http://www.w3.org/1998/MathML/" : null
            }(l)),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: Sr,
              clean: ns,
              playerHandler: null,
              flags: 0
            },
            d = Li(0, null, null, 1, 0, null, null, null, null, null),
            f = xi(null, d, h, u, null, null, s, a, o, i);
          let p, m;
          ze(f);
          try {
            const t = function (t, e, n, r, i, s) {
              const o = n[1];
              n[20] = t;
              const a = Ci(o, 20, 2, "#host", null),
                l = a.mergedAttrs = e.hostAttrs;
              null !== l && (as(a, l, !0), null !== t && (un(i, t, l), null !== a.classes && Xr(i, t, a.classes), null !== a.styles && Jr(i, t, a.styles)));
              const c = r.createRenderer(t, e),
                u = xi(n, Pi(e), null, e.onPush ? 64 : 16, n[20], a, r, c, null, null);
              return o.firstCreatePass && (En(wn(a, n), o, e.type), Ui(o, a), $i(a, n.length, 1)), Yi(n, u), n[20] = u
            }(c, this.componentDef, f, s, a);
            if (c)
              if (n) un(a, c, ["ng-version", jo.full]);
              else {
                const {
                  attrs: t,
                  classes: e
                } = function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < t.length;) {
                    let s = t[r];
                    if ("string" == typeof s) 2 === i ? "" !== s && e.push(s, t[++r]) : 8 === i && n.push(s);
                    else {
                      if (!oi(i)) break;
                      i = s
                    }
                    r++
                  }
                  return {
                    attrs: e,
                    classes: n
                  }
                }(this.componentDef.selectors[0]);
                t && un(a, c, t), e && e.length > 0 && Xr(a, c, e.join(" "))
              } if (m = be(d, Yt), void 0 !== e) {
              const t = m.projection = [];
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null)
              }
            }
            p = function (t, e, n, r, i) {
              const s = n[1],
                o = function (t, e, n) {
                  const r = Re();
                  t.firstCreatePass && (n.providersResolver && n.providersResolver(n), Hi(t, r, e, Si(t, e, 1, null), n));
                  const i = Ln(e, t, r.directiveStart, r);
                  _r(i, e);
                  const s = _e(r, e);
                  return s && _r(s, e), i
                }(s, n, e);
              if (r.components.push(o), t[8] = o, i && i.forEach(t => t(o, e)), e.contentQueries) {
                const t = Re();
                e.contentQueries(1, o, t.directiveStart)
              }
              const a = Re();
              return !s.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (Ye(a.index), Vi(n[1], a, 0, a.directiveStart, a.directiveEnd, e), ji(e, o)), o
            }(t, this.componentDef, f, h, [Ss]), Ei(d, f, null)
          } finally {
            Ke()
          }
          return new Ta(this.componentType, p, Po(m, f), f, m)
        }
      }
      class Ta extends class {} {
        constructor(t, e, n, r, i) {
          super(), this.location = n, this._rootLView = r, this._tNode = i, this.instance = e, this.hostView = this.changeDetectorRef = new na(r), this.componentType = t
        }
        get injector() {
          return new Mn(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(t) {
          this.hostView.onDestroy(t)
        }
      }
      const Aa = new Map;
      class Oa extends fa {
        constructor(t, e) {
          super(), this._parent = e, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new Ca(this);
          const n = Zt(t),
            r = t[Vt] || null;
          r && bo(r), this._bootstrapComponents = Er(n.bootstrap), this._r3Injector = ms(t, e, [{
            provide: fa,
            useValue: this
          }, {
            provide: Ro,
            useValue: this.componentFactoryResolver
          }], et(t)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(t)
        }
        get(t, e = Cs.THROW_IF_NOT_FOUND, n = vt.Default) {
          return t === Cs || t === fa || t === ls ? this : this._r3Injector.get(t, e, n)
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
        }
        onDestroy(t) {
          this.destroyCbs.push(t)
        }
      }
      class Ra extends pa {
        constructor(t) {
          super(), this.moduleType = t, null !== Zt(t) && function (t) {
            const e = new Set;
            ! function t(n) {
              const r = Zt(n, !0),
                i = r.id;
              null !== i && (function (t, e, n) {
                if (e && e !== n) throw new Error(`Duplicate module registered for ${t} - ${et(e)} vs ${et(e.name)}`)
              }(i, Aa.get(i), n), Aa.set(i, n));
              const s = Er(r.imports);
              for (const o of s) e.has(o) || (e.add(o), t(o))
            }(t)
          }(t)
        }
        create(t) {
          return new Oa(this.moduleType, t)
        }
      }

      function Ia(t) {
        return e => {
          setTimeout(t, void 0, e)
        }
      }
      const Pa = class extends C {
        constructor(t = !1) {
          super(), this.__isAsync = t
        }
        emit(t) {
          super.next(t)
        }
        subscribe(t, e, n) {
          var r, i, s;
          let o = t,
            a = e || (() => null),
            l = n;
          if (t && "object" == typeof t) {
            const e = t;
            o = null === (r = e.next) || void 0 === r ? void 0 : r.bind(e), a = null === (i = e.error) || void 0 === i ? void 0 : i.bind(e), l = null === (s = e.complete) || void 0 === s ? void 0 : s.bind(e)
          }
          this.__isAsync && (a = Ia(a), o && (o = Ia(o)), l && (l = Ia(l)));
          const c = super.subscribe({
            next: o,
            error: a,
            complete: l
          });
          return t instanceof h && t.add(c), c
        }
      };

      function La() {
        return this._results[Is()]()
      }
      class Da {
        constructor(t = !1) {
          this._emitDistinctChangesOnly = t, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
          const e = Is(),
            n = Da.prototype;
          n[e] || (n[e] = La)
        }
        get changes() {
          return this._changes || (this._changes = new Pa)
        }
        get(t) {
          return this._results[t]
        }
        map(t) {
          return this._results.map(t)
        }
        filter(t) {
          return this._results.filter(t)
        }
        find(t) {
          return this._results.find(t)
        }
        reduce(t, e) {
          return this._results.reduce(t, e)
        }
        forEach(t) {
          this._results.forEach(t)
        }
        some(t) {
          return this._results.some(t)
        }
        toArray() {
          return this._results.slice()
        }
        toString() {
          return this._results.toString()
        }
        reset(t, e) {
          const n = this;
          n.dirty = !1;
          const r = zn(t);
          (this._changesDetected = ! function (t, e, n) {
            if (t.length !== e.length) return !1;
            for (let r = 0; r < t.length; r++) {
              let i = t[r],
                s = e[r];
              if (n && (i = n(i), s = n(s)), s !== i) return !1
            }
            return !0
          }(n._results, r, e)) && (n._results = r, n.length = r.length, n.last = r[this.length - 1], n.first = r[0])
        }
        notifyOnChanges() {
          !this._changes || !this._changesDetected && this._emitDistinctChangesOnly || this._changes.emit(this)
        }
        setDirty() {
          this.dirty = !0
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe()
        }
      }
      class Fa {
        constructor(t) {
          this.queryList = t, this.matches = null
        }
        clone() {
          return new Fa(this.queryList)
        }
        setDirty() {
          this.queryList.setDirty()
        }
      }
      class Ma {
        constructor(t = []) {
          this.queries = t
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone())
            }
            return new Ma(r)
          }
          return null
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t)
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t)
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++) null !== Za(t, e).matches && this.queries[e].setDirty()
        }
      }
      class Na {
        constructor(t, e, n = null) {
          this.predicate = t, this.flags = e, this.read = n
        }
      }
      class Va {
        constructor(t = []) {
          this.queries = t
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e)
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t)
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              i = this.getByIndex(n).embeddedTView(t, r);
            i && (i.indexInDeclarationView = n, null !== e ? e.push(i) : e = [i])
          }
          return null !== e ? new Va(e) : null
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e)
        }
        getByIndex(t) {
          return this.queries[t]
        }
        get length() {
          return this.queries.length
        }
        track(t) {
          this.queries.push(t)
        }
      }
      class ja {
        constructor(t, e = -1) {
          this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = e
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e)
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
        }
        template(t, e) {
          this.elementStart(t, e)
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, e), new ja(this.metadata)) : null
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== e;) n = n.parent;
            return e === (null !== n ? n.index : -1)
          }
          return this._appliesToNextNode
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let r = 0; r < n.length; r++) {
              const i = n[r];
              this.matchTNodeWithReadOption(t, e, Ua(e, i)), this.matchTNodeWithReadOption(t, e, Pn(e, t, i, !1, !1))
            } else n === ca ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1) : this.matchTNodeWithReadOption(t, e, Pn(e, t, n, !1, !1))
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === Do || r === ga || r === ca && 4 & e.type) this.addMatch(e.index, -2);
              else {
                const n = Pn(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n)
              }
            else this.addMatch(e.index, n)
          }
        }
        addMatch(t, e) {
          null === this.matches ? this.matches = [t, e] : this.matches.push(t, e)
        }
      }

      function Ua(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2)
            if (n[r] === e) return n[r + 1];
        return null
      }

      function Ba(t, e, n, r) {
        return -1 === n ? function (t, e) {
          return 11 & t.type ? Po(t, e) : 4 & t.type ? da(t, e) : null
        }(e, t) : -2 === n ? function (t, e, n) {
          return n === Do ? Po(e, t) : n === ca ? da(e, t) : n === ga ? wa(e, t) : void 0
        }(t, e, r) : Ln(t, t[1], n, e)
      }

      function $a(t, e, n, r) {
        const i = e[19].queries[r];
        if (null === i.matches) {
          const r = t.data,
            s = n.matches,
            o = [];
          for (let t = 0; t < s.length; t += 2) {
            const i = s[t];
            o.push(i < 0 ? null : Ba(e, r[i], s[t + 1], n.metadata.read))
          }
          i.matches = o
        }
        return i.matches
      }

      function Ha(t, e, n, r) {
        const i = t.queries.getByIndex(n),
          s = i.matches;
        if (null !== s) {
          const o = $a(t, e, i, n);
          for (let t = 0; t < s.length; t += 2) {
            const n = s[t];
            if (n > 0) r.push(o[t / 2]);
            else {
              const i = s[t + 1],
                o = e[-n];
              for (let t = Jt; t < o.length; t++) {
                const e = o[t];
                e[17] === e[3] && Ha(e[1], e, i, r)
              }
              if (null !== o[9]) {
                const t = o[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  Ha(n[1], n, i, r)
                }
              }
            }
          }
        }
        return r
      }

      function za(t) {
        const e = Ae(),
          n = Oe(),
          r = Ue();
        Be(r + 1);
        const i = Za(n, r);
        if (t.dirty && we(e) === (2 == (2 & i.metadata.flags))) {
          if (null === i.matches) t.reset([]);
          else {
            const s = i.crossesNgTemplate ? Ha(n, e, r, []) : $a(n, e, i, r);
            t.reset(s, Fo), t.notifyOnChanges()
          }
          return !0
        }
        return !1
      }

      function qa(t, e, n) {
        const r = Oe();
        r.firstCreatePass && (Ka(r, new Na(t, e, n), -1), 2 == (2 & e) && (r.staticViewQueries = !0)), Ga(r, Ae(), e)
      }

      function Qa(t, e, n, r) {
        const i = Oe();
        if (i.firstCreatePass) {
          const s = Re();
          Ka(i, new Na(e, n, r), s.index),
            function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e)
            }(i, t), 2 == (2 & n) && (i.staticContentQueries = !0)
        }
        Ga(i, Ae(), n)
      }

      function Wa() {
        return t = Ae(), e = Ue(), t[19].queries[e].queryList;
        var t, e
      }

      function Ga(t, e, n) {
        const r = new Da(4 == (4 & n));
        Di(t, e, r, r.destroy), null === e[19] && (e[19] = new Ma), e[19].queries.push(new Fa(r))
      }

      function Ka(t, e, n) {
        null === t.queries && (t.queries = new Va), t.queries.track(new ja(e, n))
      }

      function Za(t, e) {
        return t.queries.getByIndex(e)
      }
      const Ya = new Bn("Application Initializer");
      let Ja = (() => {
        class t {
          constructor(t) {
            this.appInits = t, this.resolve = Io, this.reject = Io, this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, e) => {
              this.resolve = t, this.reject = e
            })
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                this.done = !0, this.resolve()
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                if (qs(e)) t.push(e);
                else if (Qs(e)) {
                  const n = new Promise((t, n) => {
                    e.subscribe({
                      complete: t,
                      error: n
                    })
                  });
                  t.push(n)
                }
              }
            Promise.all(t).then(() => {
              e()
            }).catch(t => {
              this.reject(t)
            }), 0 === t.length && e(), this.initialized = !0
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Ya, 8))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const Xa = new Bn("AppId"),
        tl = {
          provide: Xa,
          useFactory: function () {
            return `${el()}${el()}${el()}`
          },
          deps: []
        };

      function el() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const nl = new Bn("Platform Initializer"),
        rl = new Bn("Platform ID"),
        il = new Bn("appBootstrapListener");
      let sl = (() => {
        class t {
          log(t) {
            console.log(t)
          }
          warn(t) {
            console.warn(t)
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const ol = new Bn("LocaleId"),
        al = new Bn("DefaultCurrencyCode");
      class ll {
        constructor(t, e) {
          this.ngModuleFactory = t, this.componentFactories = e
        }
      }
      const cl = function (t) {
          return new Ra(t)
        },
        ul = cl,
        hl = function (t) {
          return Promise.resolve(cl(t))
        },
        dl = function (t) {
          const e = cl(t),
            n = Er(Zt(t).declarations).reduce((t, e) => {
              const n = Kt(e);
              return n && t.push(new ka(n)), t
            }, []);
          return new ll(e, n)
        },
        fl = dl,
        pl = function (t) {
          return Promise.resolve(dl(t))
        };
      let ml = (() => {
        class t {
          constructor() {
            this.compileModuleSync = ul, this.compileModuleAsync = hl, this.compileModuleAndAllComponentsSync = fl, this.compileModuleAndAllComponentsAsync = pl
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const gl = (() => Promise.resolve(0))();

      function yl(t) {
        "undefined" == typeof Zone ? gl.then(() => {
          t && t.apply(null, null)
        }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
      }
      class _l {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1
        }) {
          if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Pa(!1), this.onMicrotaskEmpty = new Pa(!1), this.onStable = new Pa(!1), this.onError = new Pa(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const r = this;
          r._nesting = 0, r._outer = r._inner = Zone.current, Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)), r.shouldCoalesceEventChangeDetection = !n && e, r.shouldCoalesceRunChangeDetection = n, r.lastRequestAnimationFrameId = -1, r.nativeRequestAnimationFrame = function () {
              let t = It.requestAnimationFrame,
                e = It.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r)
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e
              }
            }().nativeRequestAnimationFrame,
            function (t) {
              const e = () => {
                ! function (t) {
                  t.isCheckStableRunning || -1 !== t.lastRequestAnimationFrameId || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(It, () => {
                    t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                      t.lastRequestAnimationFrameId = -1, wl(t), t.isCheckStableRunning = !0, vl(t), t.isCheckStableRunning = !1
                    }, void 0, () => {}, () => {})), t.fakeTopEventTask.invoke()
                  }), wl(t))
                }(t)
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: {
                  isAngularZone: !0
                },
                onInvokeTask: (n, r, i, s, o, a) => {
                  try {
                    return xl(t), n.invokeTask(i, s, o, a)
                  } finally {
                    (t.shouldCoalesceEventChangeDetection && "eventTask" === s.type || t.shouldCoalesceRunChangeDetection) && e(), Cl(t)
                  }
                },
                onInvoke: (n, r, i, s, o, a, l) => {
                  try {
                    return xl(t), n.invoke(i, s, o, a, l)
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Cl(t)
                  }
                },
                onHasTask: (e, n, r, i) => {
                  e.hasTask(r, i), n === r && ("microTask" == i.change ? (t._hasPendingMicrotasks = i.microTask, wl(t), vl(t)) : "macroTask" == i.change && (t.hasPendingMacrotasks = i.macroTask))
                },
                onHandleError: (e, n, r, i) => (e.handleError(r, i), t.runOutsideAngular(() => t.onError.emit(i)), !1)
              })
            }(r)
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone")
        }
        static assertInAngularZone() {
          if (!_l.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
        }
        static assertNotInAngularZone() {
          if (_l.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
        }
        run(t, e, n) {
          return this._inner.run(t, e, n)
        }
        runTask(t, e, n, r) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + r, t, bl, Io, Io);
          try {
            return i.runTask(s, e, n)
          } finally {
            i.cancelTask(s)
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n)
        }
        runOutsideAngular(t) {
          return this._outer.run(t)
        }
      }
      const bl = {};

      function vl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
          t._nesting++, t.onMicrotaskEmpty.emit(null)
        } finally {
          if (t._nesting--, !t.hasPendingMicrotasks) try {
            t.runOutsideAngular(() => t.onStable.emit(null))
          } finally {
            t.isStable = !0
          }
        }
      }

      function wl(t) {
        t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
      }

      function xl(t) {
        t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
      }

      function Cl(t) {
        t._nesting--, vl(t)
      }
      class Sl {
        constructor() {
          this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Pa, this.onMicrotaskEmpty = new Pa, this.onStable = new Pa, this.onError = new Pa
        }
        run(t, e, n) {
          return t.apply(e, n)
        }
        runGuarded(t, e, n) {
          return t.apply(e, n)
        }
        runOutsideAngular(t) {
          return t()
        }
        runTask(t, e, n, r) {
          return t.apply(e, n)
        }
      }
      let El = (() => {
          class t {
            constructor(t) {
              this._ngZone = t, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), t.run(() => {
                this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
              })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  this._didWork = !0, this._isZoneStable = !1
                }
              }), this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable.subscribe({
                  next: () => {
                    _l.assertNotInAngularZone(), yl(() => {
                      this._isZoneStable = !0, this._runCallbacksIfReady()
                    })
                  }
                })
              })
            }
            increasePendingRequestCount() {
              return this._pendingCount += 1, this._didWork = !0, this._pendingCount
            }
            decreasePendingRequestCount() {
              if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
              if (this.isStable()) yl(() => {
                for (; 0 !== this._callbacks.length;) {
                  let t = this._callbacks.pop();
                  clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                }
                this._didWork = !1
              });
              else {
                let t = this.getPendingTasks();
                this._callbacks = this._callbacks.filter(e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)), this._didWork = !0
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                source: t.source,
                creationLocation: t.creationLocation,
                data: t.data
              })) : []
            }
            addCallback(t, e, n) {
              let r = -1;
              e && e > 0 && (r = setTimeout(() => {
                this._callbacks = this._callbacks.filter(t => t.timeoutId !== r), t(this._didWork, this.getPendingTasks())
              }, e)), this._callbacks.push({
                doneCb: t,
                timeoutId: r,
                updateCb: n
              })
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
              this.addCallback(t, e, n), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            findProviders(t, e, n) {
              return []
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(_l))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        kl = (() => {
          class t {
            constructor() {
              this._applications = new Map, Ol.addToWindow(this)
            }
            registerApplication(t, e) {
              this._applications.set(t, e)
            }
            unregisterApplication(t) {
              this._applications.delete(t)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(t, e = !0) {
              return Ol.findTestabilityInTree(this, t, e)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })();
      class Tl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null
        }
      }
      let Al, Ol = new Tl,
        Rl = !0,
        Il = !1;

      function Pl() {
        return Il = !0, Rl
      }
      const Ll = new Bn("AllowMultipleToken");
      class Dl {
        constructor(t, e) {
          this.name = t, this.token = e
        }
      }

      function Fl(t, e, n = []) {
        const r = `Platform: ${e}`,
          i = new Bn(r);
        return (e = []) => {
          let s = Ml();
          if (!s || s.injector.get(Ll, !1))
            if (t) t(n.concat(e).concat({
              provide: i,
              useValue: !0
            }));
            else {
              const t = n.concat(e).concat({
                provide: i,
                useValue: !0
              }, {
                provide: us,
                useValue: "platform"
              });
              ! function (t) {
                if (Al && !Al.destroyed && !Al.injector.get(Ll, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                Al = t.get(Nl);
                const e = t.get(nl, null);
                e && e.forEach(t => t())
              }(Cs.create({
                providers: t,
                name: r
              }))
            } return function (t) {
            const e = Ml();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
            return e
          }(i)
        }
      }

      function Ml() {
        return Al && !Al.destroyed ? Al : null
      }
      let Nl = (() => {
        class t {
          constructor(t) {
            this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
          }
          bootstrapModuleFactory(t, e) {
            const n = function (t, e) {
                let n;
                return n = "noop" === t ? new Sl : ("zone.js" === t ? void 0 : t) || new _l({
                  enableLongStackTrace: Pl(),
                  shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                  shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                }), n
              }(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: e && e.ngZoneEventCoalescing || !1,
                ngZoneRunCoalescing: e && e.ngZoneRunCoalescing || !1
              }),
              r = [{
                provide: _l,
                useValue: n
              }];
            return n.run(() => {
              const e = Cs.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name
                }),
                i = t.create(e),
                s = i.injector.get(Cr, null);
              if (!s) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
              return n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: t => {
                      s.handleError(t)
                    }
                  });
                  i.onDestroy(() => {
                    Ul(this._modules, i), t.unsubscribe()
                  })
                }),
                function (t, e, n) {
                  try {
                    const r = n();
                    return qs(r) ? r.catch(n => {
                      throw e.runOutsideAngular(() => t.handleError(n)), n
                    }) : r
                  } catch (r) {
                    throw e.runOutsideAngular(() => t.handleError(r)), r
                  }
                }(s, n, () => {
                  const t = i.injector.get(Ja);
                  return t.runInitializers(), t.donePromise.then(() => (bo(i.injector.get(ol, yo) || yo), this._moduleDoBootstrap(i), i))
                })
            })
          }
          bootstrapModule(t, e = []) {
            const n = Vl({}, e);
            return function (t, e, n) {
              const r = new Ra(n);
              return Promise.resolve(r)
            }(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(jl);
            if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap) throw new Error(`The module ${et(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
              t.instance.ngDoBootstrap(e)
            }
            this._modules.push(t)
          }
          onDestroy(t) {
            this._destroyListeners.push(t)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach(t => t.destroy()), this._destroyListeners.forEach(t => t()), this._destroyed = !0
          }
          get destroyed() {
            return this._destroyed
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Cs))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();

      function Vl(t, e) {
        return Array.isArray(e) ? e.reduce(Vl, t) : Object.assign(Object.assign({}, t), e)
      }
      let jl = (() => {
        class t {
          constructor(t, e, n, r, i) {
            this._zone = t, this._injector = e, this._exceptionHandler = n, this._componentFactoryResolver = r, this._initStatus = i, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
              next: () => {
                this._zone.run(() => {
                  this.tick()
                })
              }
            });
            const s = new _(t => {
                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                  t.next(this._stable), t.complete()
                })
              }),
              o = new _(t => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    _l.assertNotInAngularZone(), yl(() => {
                      this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, t.next(!0))
                    })
                  })
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  _l.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                    t.next(!1)
                  }))
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe()
                }
              });
            this.isStable = q(s, o.pipe(t => {
              return Q()((e = J, function (t) {
                let n;
                n = "function" == typeof e ? e : function () {
                  return e
                };
                const r = Object.create(t, Z);
                return r.source = t, r.subjectFactory = n, r
              })(t));
              var e
            }))
          }
          bootstrap(t, e) {
            if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
            let n;
            n = t instanceof Ao ? t : this._componentFactoryResolver.resolveComponentFactory(t), this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(fa),
              i = n.create(Cs.NULL, [], e || n.selector, r),
              s = i.location.nativeElement,
              o = i.injector.get(El, null),
              a = o && i.injector.get(kl);
            return o && a && a.registerApplication(s, o), i.onDestroy(() => {
              this.detachView(i.hostView), Ul(this.components, i), a && a.unregisterApplication(s)
            }), this._loadComponent(i), i
          }
          tick() {
            if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
            } finally {
              this._runningTick = !1
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this)
          }
          detachView(t) {
            const e = t;
            Ul(this._views, e), e.detachFromAppRef()
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t), this._injector.get(il, []).concat(this._bootstrapListeners).forEach(e => e(t))
          }
          ngOnDestroy() {
            this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount() {
            return this._views.length
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(_l), sr(Cs), sr(Cr), sr(Ro), sr(Ja))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();

      function Ul(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1)
      }
      class Bl {}
      class $l {}
      const Hl = {
        factoryPathPrefix: "",
        factoryPathSuffix: ".ngfactory"
      };
      let zl = (() => {
        class t {
          constructor(t, e) {
            this._compiler = t, this._config = e || Hl
          }
          load(t) {
            return this.loadAndCompile(t)
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return void 0 === r && (r = "default"), n(255)(e).then(t => t[r]).then(t => ql(t, e, r)).then(t => this._compiler.compileModuleAsync(t))
          }
          loadFactory(t) {
            let [e, r] = t.split("#"), i = "NgFactory";
            return void 0 === r && (r = "default", i = ""), n(255)(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix).then(t => t[r + i]).then(t => ql(t, e, r))
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(ml), sr($l, 8))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();

      function ql(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t
      }
      const Ql = Fl(null, "core", [{
          provide: rl,
          useValue: "unknown"
        }, {
          provide: Nl,
          deps: [Cs]
        }, {
          provide: kl,
          deps: []
        }, {
          provide: sl,
          deps: []
        }]),
        Wl = [{
          provide: jl,
          useClass: jl,
          deps: [_l, Cs, Cr, Ro, Ja]
        }, {
          provide: Ea,
          deps: [_l],
          useFactory: function (t) {
            let e = [];
            return t.onStable.subscribe(() => {
                for (; e.length;) e.pop()()
              }),
              function (t) {
                e.push(t)
              }
          }
        }, {
          provide: Ja,
          useClass: Ja,
          deps: [
            [new ur, Ya]
          ]
        }, {
          provide: ml,
          useClass: ml,
          deps: []
        }, tl, {
          provide: Yo,
          useFactory: function () {
            return oa
          },
          deps: []
        }, {
          provide: Xo,
          useFactory: function () {
            return aa
          },
          deps: []
        }, {
          provide: ol,
          useFactory: function (t) {
            return bo(t = t || "undefined" != typeof $localize && $localize.locale || yo), t
          },
          deps: [
            [new cr(ol), new ur, new hr]
          ]
        }, {
          provide: al,
          useValue: "USD"
        }];
      let Gl = (() => {
          class t {
            constructor(t) {}
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(jl))
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            providers: Wl
          }), t
        })(),
        Kl = null;

      function Zl() {
        return Kl
      }
      const Yl = new Bn("DocumentToken");
      let Jl = (() => {
        class t {
          historyGo(t) {
            throw new Error("Not implemented")
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          factory: Xl,
          token: t,
          providedIn: "platform"
        }), t
      })();

      function Xl() {
        return sr(ec)
      }
      const tc = new Bn("Location Initialized");
      let ec = (() => {
        class t extends Jl {
          constructor(t) {
            super(), this._doc = t, this._init()
          }
          _init() {
            this.location = window.location, this._history = window.history
          }
          getBaseHrefFromDOM() {
            return Zl().getBaseHref(this._doc)
          }
          onPopState(t) {
            const e = Zl().getGlobalEventTarget(this._doc, "window");
            return e.addEventListener("popstate", t, !1), () => e.removeEventListener("popstate", t)
          }
          onHashChange(t) {
            const e = Zl().getGlobalEventTarget(this._doc, "window");
            return e.addEventListener("hashchange", t, !1), () => e.removeEventListener("hashchange", t)
          }
          get href() {
            return this.location.href
          }
          get protocol() {
            return this.location.protocol
          }
          get hostname() {
            return this.location.hostname
          }
          get port() {
            return this.location.port
          }
          get pathname() {
            return this.location.pathname
          }
          get search() {
            return this.location.search
          }
          get hash() {
            return this.location.hash
          }
          set pathname(t) {
            this.location.pathname = t
          }
          pushState(t, e, n) {
            nc() ? this._history.pushState(t, e, n) : this.location.hash = n
          }
          replaceState(t, e, n) {
            nc() ? this._history.replaceState(t, e, n) : this.location.hash = n
          }
          forward() {
            this._history.forward()
          }
          back() {
            this._history.back()
          }
          historyGo(t = 0) {
            this._history.go(t)
          }
          getState() {
            return this._history.state
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Yl))
        }, t.\u0275prov = ht({
          factory: rc,
          token: t,
          providedIn: "platform"
        }), t
      })();

      function nc() {
        return !!window.history.pushState
      }

      function rc() {
        return new ec(sr(Yl))
      }

      function ic(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return t.endsWith("/") && n++, e.startsWith("/") && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
      }

      function sc(t) {
        const e = t.match(/#|\?|$/),
          n = e && e.index || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
      }

      function oc(t) {
        return t && "?" !== t[0] ? "?" + t : t
      }
      let ac = (() => {
        class t {
          historyGo(t) {
            throw new Error("Not implemented")
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          factory: lc,
          token: t,
          providedIn: "root"
        }), t
      })();

      function lc(t) {
        const e = sr(Yl).location;
        return new uc(sr(Jl), e && e.origin || "")
      }
      const cc = new Bn("appBaseHref");
      let uc = (() => {
          class t extends ac {
            constructor(t, e) {
              if (super(), this._platformLocation = t, this._removeListenerFns = [], null == e && (e = this._platformLocation.getBaseHrefFromDOM()), null == e) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
              this._baseHref = e
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
            }
            getBaseHref() {
              return this._baseHref
            }
            prepareExternalUrl(t) {
              return ic(this._baseHref, t)
            }
            path(t = !1) {
              const e = this._platformLocation.pathname + oc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e
            }
            pushState(t, e, n, r) {
              const i = this.prepareExternalUrl(n + oc(r));
              this._platformLocation.pushState(t, e, i)
            }
            replaceState(t, e, n, r) {
              const i = this.prepareExternalUrl(n + oc(r));
              this._platformLocation.replaceState(t, e, i)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Jl), sr(cc, 8))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        hc = (() => {
          class t extends ac {
            constructor(t, e) {
              super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], null != e && (this._baseHref = e)
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
            }
            getBaseHref() {
              return this._baseHref
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e
            }
            prepareExternalUrl(t) {
              const e = ic(this._baseHref, t);
              return e.length > 0 ? "#" + e : e
            }
            pushState(t, e, n, r) {
              let i = this.prepareExternalUrl(n + oc(r));
              0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.pushState(t, e, i)
            }
            replaceState(t, e, n, r) {
              let i = this.prepareExternalUrl(n + oc(r));
              0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.replaceState(t, e, i)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Jl), sr(cc, 8))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        dc = (() => {
          class t {
            constructor(t, e) {
              this._subject = new Pa, this._urlChangeListeners = [], this._platformStrategy = t;
              const n = this._platformStrategy.getBaseHref();
              this._platformLocation = e, this._baseHref = sc(pc(n)), this._platformStrategy.onPopState(t => {
                this._subject.emit({
                  url: this.path(!0),
                  pop: !0,
                  state: t.state,
                  type: t.type
                })
              })
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t))
            }
            getState() {
              return this._platformLocation.getState()
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + oc(e))
            }
            normalize(e) {
              return t.stripTrailingSlash(function (t, e) {
                return t && e.startsWith(t) ? e.substring(t.length) : e
              }(this._baseHref, pc(e)))
            }
            prepareExternalUrl(t) {
              return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + oc(e)), n)
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + oc(e)), n)
            }
            forward() {
              this._platformStrategy.forward()
            }
            back() {
              this._platformStrategy.back()
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformStrategy).historyGo) || void 0 === n || n.call(e, t)
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(t => {
                this._notifyUrlChangeListeners(t.url, t.state)
              }))
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach(n => n(t, e))
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n
              })
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(ac), sr(Jl))
          }, t.normalizeQueryParams = oc, t.joinWithSlash = ic, t.stripTrailingSlash = sc, t.\u0275prov = ht({
            factory: fc,
            token: t,
            providedIn: "root"
          }), t
        })();

      function fc() {
        return new dc(sr(ac), sr(Jl))
      }

      function pc(t) {
        return t.replace(/\/index.html$/, "")
      }
      var mc = function (t) {
        return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One", t[t.Two = 2] = "Two", t[t.Few = 3] = "Few", t[t.Many = 4] = "Many", t[t.Other = 5] = "Other", t
      }({});
      class gc {}
      let yc = (() => {
          class t extends gc {
            constructor(t) {
              super(), this.locale = t
            }
            getPluralCategory(t, e) {
              switch (function (t) {
                return function (t) {
                  const e = function (t) {
                    return t.toLowerCase().replace(/_/g, "-")
                  }(t);
                  let n = mo(e);
                  if (n) return n;
                  const r = e.split("-")[0];
                  if (n = mo(r), n) return n;
                  if ("en" === r) return fo;
                  throw new Error(`Missing locale data for the locale "${t}".`)
                }(t)[go.PluralCase]
              }(e || this.locale)(t)) {
                case mc.Zero:
                  return "zero";
                case mc.One:
                  return "one";
                case mc.Two:
                  return "two";
                case mc.Few:
                  return "few";
                case mc.Many:
                  return "many";
                default:
                  return "other"
              }
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(ol))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        _c = (() => {
          class t {
            constructor(t, e) {
              this._viewContainer = t, this._context = new bc, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = e
            }
            set ngIf(t) {
              this._context.$implicit = this._context.ngIf = t, this._updateView()
            }
            set ngIfThen(t) {
              vc("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
            }
            set ngIfElse(t) {
              vc("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
            }
            _updateView() {
              this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
            }
            static ngTemplateContextGuard(t, e) {
              return !0
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(ga), Ns(ca))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "ngIf", ""]
            ],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse"
            }
          }), t
        })();
      class bc {
        constructor() {
          this.$implicit = null, this.ngIf = null
        }
      }

      function vc(t, e) {
        if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${et(e)}'.`)
      }
      class wc {
        constructor(t, e) {
          this._viewContainerRef = t, this._templateRef = e, this._created = !1
        }
        create() {
          this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
        }
        destroy() {
          this._created = !1, this._viewContainerRef.clear()
        }
        enforceState(t) {
          t && !this._created ? this.create() : !t && this._created && this.destroy()
        }
      }
      let xc = (() => {
          class t {
            constructor() {
              this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1
            }
            set ngSwitch(t) {
              this._ngSwitch = t, 0 === this._caseCount && this._updateDefaultCases(!0)
            }
            _addCase() {
              return this._caseCount++
            }
            _addDefault(t) {
              this._defaultViews || (this._defaultViews = []), this._defaultViews.push(t)
            }
            _matchCase(t) {
              const e = t == this._ngSwitch;
              return this._lastCasesMatched = this._lastCasesMatched || e, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), e
            }
            _updateDefaultCases(t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (let e = 0; e < this._defaultViews.length; e++) this._defaultViews[e].enforceState(t)
              }
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "ngSwitch", ""]
            ],
            inputs: {
              ngSwitch: "ngSwitch"
            }
          }), t
        })(),
        Cc = (() => {
          class t {
            constructor(t, e, n) {
              this.ngSwitch = n, n._addCase(), this._view = new wc(t, e)
            }
            ngDoCheck() {
              this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(ga), Ns(ca), Ns(xc, 9))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "ngSwitchCase", ""]
            ],
            inputs: {
              ngSwitchCase: "ngSwitchCase"
            }
          }), t
        })(),
        Sc = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            providers: [{
              provide: gc,
              useClass: yc
            }]
          }), t
        })();

      function Ec(t) {
        return "browser" === t
      }

      function kc(t) {
        return "server" === t
      }
      let Tc = (() => {
        class t {}
        return t.\u0275prov = ht({
          token: t,
          providedIn: "root",
          factory: () => new Ac(sr(Yl), window)
        }), t
      })();
      class Ac {
        constructor(t, e) {
          this.document = t, this.window = e, this.offset = () => [0, 0]
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t
        }
        getScrollPosition() {
          return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if ("function" == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
              const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let r = n.currentNode;
              for (; r;) {
                const t = r.shadowRoot;
                if (t) {
                  const n = t.getElementById(e) || t.querySelector(`[name="${e}"]`);
                  if (n) return n
                }
                r = n.nextNode()
              }
            }
            return null
          }(this.document, t);
          e && (this.scrollToElement(e), this.attemptFocus(e))
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t)
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(n - i[0], r - i[1])
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t = Oc(this.window.history) || Oc(Object.getPrototypeOf(this.window.history));
            return !(!t || !t.writable && !t.set)
          } catch (t) {
            return !1
          }
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
          } catch (t) {
            return !1
          }
        }
      }

      function Oc(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
      }
      class Rc extends class extends class {} {
        constructor() {
          super(...arguments), this.supportsDOMEvents = !0
        }
      } {
        static makeCurrent() {
          var t;
          t = new Rc, Kl || (Kl = t)
        }
        onAndCancel(t, e, n) {
          return t.addEventListener(e, n, !1), () => {
            t.removeEventListener(e, n, !1)
          }
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e)
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t)
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle")
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, e) {
          return "window" === e ? window : "document" === e ? t : "body" === e ? t.body : null
        }
        getBaseHref(t) {
          const e = (Pc = Pc || document.querySelector("base"), Pc ? Pc.getAttribute("href") : null);
          return null == e ? null : function (t) {
            Ic = Ic || document.createElement("a"), Ic.setAttribute("href", t);
            const e = Ic.pathname;
            return "/" === e.charAt(0) ? e : `/${e}`
          }(e)
        }
        resetBaseElement() {
          Pc = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(t) {
          return function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [r, i] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (r.trim() === e) return decodeURIComponent(i)
            }
            return null
          }(document.cookie, t)
        }
      }
      let Ic, Pc = null;
      const Lc = new Bn("TRANSITION_ID"),
        Dc = [{
          provide: Ya,
          useFactory: function (t, e, n) {
            return () => {
              n.get(Ja).donePromise.then(() => {
                const n = Zl();
                Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e => e.getAttribute("ng-transition") === t).forEach(t => n.remove(t))
              })
            }
          },
          deps: [Lc, Yl, Cs],
          multi: !0
        }];
      class Fc {
        static init() {
          var t;
          t = new Fc, Ol = t
        }
        addToWindow(t) {
          It.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r) throw new Error("Could not find testability for element.");
            return r
          }, It.getAllAngularTestabilities = () => t.getAllTestabilities(), It.getAllAngularRootElements = () => t.getAllRootElements(), It.frameworkStabilizers || (It.frameworkStabilizers = []), It.frameworkStabilizers.push(t => {
            const e = It.getAllAngularTestabilities();
            let n = e.length,
              r = !1;
            const i = function (e) {
              r = r || e, n--, 0 == n && t(r)
            };
            e.forEach(function (t) {
              t.whenStable(i)
            })
          })
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r ? r : n ? Zl().isShadowRoot(e) ? this.findTestabilityInTree(t, e.host, !0) : this.findTestabilityInTree(t, e.parentElement, !0) : null
        }
      }
      let Mc = (() => {
        class t {
          build() {
            return new XMLHttpRequest
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const Nc = new Bn("EventManagerPlugins");
      let Vc = (() => {
        class t {
          constructor(t, e) {
            this._zone = e, this._eventNameToPlugin = new Map, t.forEach(t => t.manager = this), this._plugins = t.slice().reverse()
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n)
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
            }
            throw new Error(`No event manager plugin found for event ${t}`)
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Nc), sr(_l))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      class jc {
        constructor(t) {
          this._doc = t
        }
        addGlobalEventListener(t, e, n) {
          const r = Zl().getGlobalEventTarget(this._doc, t);
          if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n)
        }
      }
      let Uc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set
            }
            addStyles(t) {
              const e = new Set;
              t.forEach(t => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
              }), this.onStylesAdded(e)
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        Bc = (() => {
          class t extends Uc {
            constructor(t) {
              super(), this._doc = t, this._hostNodes = new Map, this._hostNodes.set(t.head, [])
            }
            _addStylesToHost(t, e, n) {
              t.forEach(t => {
                const r = this._doc.createElement("style");
                r.textContent = t, n.push(e.appendChild(r))
              })
            }
            addHost(t) {
              const e = [];
              this._addStylesToHost(this._stylesSet, t, e), this._hostNodes.set(t, e)
            }
            removeHost(t) {
              const e = this._hostNodes.get(t);
              e && e.forEach($c), this._hostNodes.delete(t)
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e, n) => {
                this._addStylesToHost(t, n, e)
              })
            }
            ngOnDestroy() {
              this._hostNodes.forEach(t => t.forEach($c))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Yl))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })();

      function $c(t) {
        Zl().remove(t)
      }
      const Hc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
        },
        zc = /%COMP%/g;

      function qc(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let i = e[r];
          Array.isArray(i) ? qc(t, i, n) : (i = i.replace(zc, t), n.push(i))
        }
        return n
      }

      function Qc(t) {
        return e => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
        }
      }
      let Wc = (() => {
        class t {
          constructor(t, e, n) {
            this.eventManager = t, this.sharedStylesHost = e, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new Gc(t)
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case kt.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return n || (n = new Kc(this.eventManager, this.sharedStylesHost, e, this.appId), this.rendererByCompId.set(e.id, n)), n.applyToHost(t), n
              }
              case 1:
              case kt.ShadowDom:
                return new Zc(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = qc(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Vc), sr(Bc), sr(Xa))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      class Gc {
        constructor(t) {
          this.eventManager = t, this.data = Object.create(null)
        }
        destroy() {}
        createElement(t, e) {
          return e ? document.createElementNS(Hc[e] || e, t) : document.createElement(t)
        }
        createComment(t) {
          return document.createComment(t)
        }
        createText(t) {
          return document.createTextNode(t)
        }
        appendChild(t, e) {
          t.appendChild(e)
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n)
        }
        removeChild(t, e) {
          t && t.removeChild(e)
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n) throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n
        }
        parentNode(t) {
          return t.parentNode
        }
        nextSibling(t) {
          return t.nextSibling
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const i = Hc[r];
            i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n)
          } else t.setAttribute(e, n)
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = Hc[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`)
          } else t.removeAttribute(e)
        }
        addClass(t, e) {
          t.classList.add(e)
        }
        removeClass(t, e) {
          t.classList.remove(e)
        }
        setStyle(t, e, n, r) {
          r & (kr.DashCase | kr.Important) ? t.style.setProperty(e, n, r & kr.Important ? "important" : "") : t.style[e] = n
        }
        removeStyle(t, e, n) {
          n & kr.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
        }
        setProperty(t, e, n) {
          t[e] = n
        }
        setValue(t, e) {
          t.nodeValue = e
        }
        listen(t, e, n) {
          return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, e, Qc(n)) : this.eventManager.addEventListener(t, e, Qc(n))
        }
      }
      class Kc extends Gc {
        constructor(t, e, n, r) {
          super(t), this.component = n;
          const i = qc(r + "-" + n.id, n.styles, []);
          e.addStyles(i), this.contentAttr = "_ngcontent-%COMP%".replace(zc, r + "-" + n.id), this.hostAttr = "_nghost-%COMP%".replace(zc, r + "-" + n.id)
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "")
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n
        }
      }
      class Zc extends Gc {
        constructor(t, e, n, r) {
          super(t), this.sharedStylesHost = e, this.hostEl = n, this.shadowRoot = n.attachShadow({
            mode: "open"
          }), this.sharedStylesHost.addHost(this.shadowRoot);
          const i = qc(r.id, r.styles, []);
          for (let s = 0; s < i.length; s++) {
            const t = document.createElement("style");
            t.textContent = i[s], this.shadowRoot.appendChild(t)
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e)
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e)
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
        }
      }
      let Yc = (() => {
        class t extends jc {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return !0
          }
          addEventListener(t, e, n) {
            return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n)
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Yl))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const Jc = ["alt", "control", "meta", "shift"],
        Xc = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS"
        },
        tu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock"
        },
        eu = {
          alt: t => t.altKey,
          control: t => t.ctrlKey,
          meta: t => t.metaKey,
          shift: t => t.shiftKey
        };
      let nu = (() => {
        class t extends jc {
          constructor(t) {
            super(t)
          }
          supports(e) {
            return null != t.parseEventName(e)
          }
          addEventListener(e, n, r) {
            const i = t.parseEventName(n),
              s = t.eventCallback(i.fullKey, r, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => Zl().onAndCancel(e, i.domEventName, s))
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || "keydown" !== r && "keyup" !== r) return null;
            const i = t._normalizeKey(n.pop());
            let s = "";
            if (Jc.forEach(t => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), s += t + ".")
              }), s += i, 0 != n.length || 0 === i.length) return null;
            const o = {};
            return o.domEventName = r, o.fullKey = s, o
          }
          static getEventFullKey(t) {
            let e = "",
              n = function (t) {
                let e = t.key;
                if (null == e) {
                  if (e = t.keyIdentifier, null == e) return "Unidentified";
                  e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && tu.hasOwnProperty(e) && (e = tu[e]))
                }
                return Xc[e] || e
              }(t);
            return n = n.toLowerCase(), " " === n ? n = "space" : "." === n && (n = "dot"), Jc.forEach(r => {
              r != n && (0, eu[r])(t) && (e += r + ".")
            }), e += n, e
          }
          static eventCallback(e, n, r) {
            return i => {
              t.getEventFullKey(i) === e && r.runGuarded(() => n(i))
            }
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t
            }
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Yl))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const ru = Fl(Ql, "browser", [{
          provide: rl,
          useValue: "browser"
        }, {
          provide: nl,
          useValue: function () {
            Rc.makeCurrent(), Fc.init()
          },
          multi: !0
        }, {
          provide: Yl,
          useFactory: function () {
            return function (t) {
              fe = t
            }(document), document
          },
          deps: []
        }]),
        iu = [
          [], {
            provide: us,
            useValue: "root"
          }, {
            provide: Cr,
            useFactory: function () {
              return new Cr
            },
            deps: []
          }, {
            provide: Nc,
            useClass: Yc,
            multi: !0,
            deps: [Yl, _l, rl]
          }, {
            provide: Nc,
            useClass: nu,
            multi: !0,
            deps: [Yl]
          },
          [], {
            provide: Wc,
            useClass: Wc,
            deps: [Vc, Bc, Xa]
          }, {
            provide: Mo,
            useExisting: Wc
          }, {
            provide: Uc,
            useExisting: Bc
          }, {
            provide: Bc,
            useClass: Bc,
            deps: [Yl]
          }, {
            provide: El,
            useClass: El,
            deps: [_l]
          }, {
            provide: Vc,
            useClass: Vc,
            deps: [Nc, _l]
          }, {
            provide: class {},
            useClass: Mc,
            deps: []
          },
          []
        ];
      let su = (() => {
        class t {
          constructor(t) {
            if (t) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [{
                provide: Xa,
                useValue: e.appId
              }, {
                provide: Lc,
                useExisting: Xa
              }, Dc]
            }
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(t, 12))
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          providers: iu,
          imports: [Sc, Gl]
        }), t
      })();

      function ou(...t) {
        let e = t[t.length - 1];
        return E(e) ? (t.pop(), F(t, e)) : z(t)
      }
      "undefined" != typeof window && window;
      class au extends C {
        constructor(t) {
          super(), this._value = t
        }
        get value() {
          return this.getValue()
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new v;
          return this._value
        }
        next(t) {
          super.next(this._value = t)
        }
      }
      class lu extends p {
        notifyNext(t, e, n, r, i) {
          this.destination.next(e)
        }
        notifyError(t, e) {
          this.destination.error(t)
        }
        notifyComplete(t) {
          this.destination.complete()
        }
      }
      class cu extends p {
        constructor(t, e, n) {
          super(), this.parent = t, this.outerValue = e, this.outerIndex = n, this.index = 0
        }
        _next(t) {
          this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe()
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe()
        }
      }

      function uu(t, e, n, r, i = new cu(t, n, r)) {
        if (!i.closed) return e instanceof _ ? e.subscribe(i) : D(e)(i)
      }
      const hu = {};
      class du {
        constructor(t) {
          this.resultSelector = t
        }
        call(t, e) {
          return e.subscribe(new fu(t, this.resultSelector))
        }
      }
      class fu extends lu {
        constructor(t, e) {
          super(t), this.resultSelector = e, this.active = 0, this.values = [], this.observables = []
        }
        _next(t) {
          this.values.push(hu), this.observables.push(t)
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            this.active = e, this.toRespond = e;
            for (let n = 0; n < e; n++) this.add(uu(this, t[n], void 0, n))
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete()
        }
        notifyNext(t, e, n) {
          const r = this.values,
            i = this.toRespond ? r[n] === hu ? --this.toRespond : this.toRespond : 0;
          r[n] = e, 0 === i && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()))
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t)
          } catch (n) {
            return void this.destination.error(n)
          }
          this.destination.next(e)
        }
      }
      const pu = (() => {
        function t() {
          return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
        }
        return t.prototype = Object.create(Error.prototype), t
      })();

      function mu(...t) {
        return H(1)(ou(...t))
      }
      const gu = new _(t => t.complete());

      function yu(t) {
        return t ? function (t) {
          return new _(e => t.schedule(() => e.complete()))
        }(t) : gu
      }

      function _u(t) {
        return new _(e => {
          let n;
          try {
            n = t()
          } catch (r) {
            return void e.error(r)
          }
          return (n ? M(n) : yu()).subscribe(e)
        })
      }

      function bu(t, e) {
        return "function" == typeof e ? n => n.pipe(bu((n, r) => M(t(n, r)).pipe(k((t, i) => e(n, t, r, i))))) : e => e.lift(new vu(t))
      }
      class vu {
        constructor(t) {
          this.project = t
        }
        call(t, e) {
          return e.subscribe(new wu(t, this.project))
        }
      }
      class wu extends V {
        constructor(t, e) {
          super(t), this.project = e, this.index = 0
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n)
          } catch (r) {
            return void this.destination.error(r)
          }
          this._innerSub(e)
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new N(this),
            r = this.destination;
          r.add(n), this.innerSubscription = j(t, n), this.innerSubscription !== n && r.add(this.innerSubscription)
        }
        _complete() {
          const {
            innerSubscription: t
          } = this;
          t && !t.closed || super._complete(), this.unsubscribe()
        }
        _unsubscribe() {
          this.innerSubscription = void 0
        }
        notifyComplete() {
          this.innerSubscription = void 0, this.isStopped && super._complete()
        }
        notifyNext(t) {
          this.destination.next(t)
        }
      }
      const xu = (() => {
        function t() {
          return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
        }
        return t.prototype = Object.create(Error.prototype), t
      })();

      function Cu(t) {
        return e => 0 === t ? yu() : e.lift(new Su(t))
      }
      class Su {
        constructor(t) {
          if (this.total = t, this.total < 0) throw new xu
        }
        call(t, e) {
          return e.subscribe(new Eu(t, this.total))
        }
      }
      class Eu extends p {
        constructor(t, e) {
          super(t), this.total = e, this.count = 0
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
        }
      }

      function ku(...t) {
        const e = t[t.length - 1];
        return E(e) ? (t.pop(), n => mu(t, n, e)) : e => mu(t, e)
      }

      function Tu(t, e) {
        let n = !1;
        return arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Au(t, e, n))
          }
      }
      class Au {
        constructor(t, e, n = !1) {
          this.accumulator = t, this.seed = e, this.hasSeed = n
        }
        call(t, e) {
          return e.subscribe(new Ou(t, this.accumulator, this.seed, this.hasSeed))
        }
      }
      class Ou extends p {
        constructor(t, e, n, r) {
          super(t), this.accumulator = e, this._seed = n, this.hasSeed = r, this.index = 0
        }
        get seed() {
          return this._seed
        }
        set seed(t) {
          this.hasSeed = !0, this._seed = t
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          this.seed = t, this.destination.next(t)
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e)
          } catch (r) {
            this.destination.error(r)
          }
          this.seed = n, this.destination.next(n)
        }
      }

      function Ru(t, e) {
        return function (n) {
          return n.lift(new Iu(t, e))
        }
      }
      class Iu {
        constructor(t, e) {
          this.predicate = t, this.thisArg = e
        }
        call(t, e) {
          return e.subscribe(new Pu(t, this.predicate, this.thisArg))
        }
      }
      class Pu extends p {
        constructor(t, e, n) {
          super(t), this.predicate = e, this.thisArg = n, this.count = 0
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++)
          } catch (n) {
            return void this.destination.error(n)
          }
          e && this.destination.next(t)
        }
      }

      function Lu(t) {
        return function (e) {
          const n = new Du(t),
            r = e.lift(n);
          return n.caught = r
        }
      }
      class Du {
        constructor(t) {
          this.selector = t
        }
        call(t, e) {
          return e.subscribe(new Fu(t, this.selector, this.caught))
        }
      }
      class Fu extends V {
        constructor(t, e, n) {
          super(t), this.selector = e, this.caught = n
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught)
            } catch (e) {
              return void super.error(e)
            }
            this._unsubscribeAndRecycle();
            const r = new N(this);
            this.add(r);
            const i = j(n, r);
            i !== r && this.add(i)
          }
        }
      }

      function Mu(t, e) {
        return U(t, e, 1)
      }

      function Nu(t) {
        return function (e) {
          return 0 === t ? yu() : e.lift(new Vu(t))
        }
      }
      class Vu {
        constructor(t) {
          if (this.total = t, this.total < 0) throw new xu
        }
        call(t, e) {
          return e.subscribe(new ju(t, this.total))
        }
      }
      class ju extends p {
        constructor(t, e) {
          super(t), this.total = e, this.ring = new Array, this.count = 0
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : e[r % n] = t
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let i = 0; i < n; i++) {
              const i = e++ % n;
              t.next(r[i])
            }
          }
          t.complete()
        }
      }

      function Uu(t = Hu) {
        return e => e.lift(new Bu(t))
      }
      class Bu {
        constructor(t) {
          this.errorFactory = t
        }
        call(t, e) {
          return e.subscribe(new $u(t, this.errorFactory))
        }
      }
      class $u extends p {
        constructor(t, e) {
          super(t), this.errorFactory = e, this.hasValue = !1
        }
        _next(t) {
          this.hasValue = !0, this.destination.next(t)
        }
        _complete() {
          if (this.hasValue) return this.destination.complete(); {
            let e;
            try {
              e = this.errorFactory()
            } catch (t) {
              e = t
            }
            this.destination.error(e)
          }
        }
      }

      function Hu() {
        return new pu
      }

      function zu(t = null) {
        return e => e.lift(new qu(t))
      }
      class qu {
        constructor(t) {
          this.defaultValue = t
        }
        call(t, e) {
          return e.subscribe(new Qu(t, this.defaultValue))
        }
      }
      class Qu extends p {
        constructor(t, e) {
          super(t), this.defaultValue = e, this.isEmpty = !0
        }
        _next(t) {
          this.isEmpty = !1, this.destination.next(t)
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
        }
      }

      function Wu(t, e) {
        const n = arguments.length >= 2;
        return r => r.pipe(t ? Ru((e, n) => t(e, n, r)) : y, Cu(1), n ? zu(e) : Uu(() => new pu))
      }

      function Gu() {}

      function Ku(t, e, n) {
        return function (r) {
          return r.lift(new Zu(t, e, n))
        }
      }
      class Zu {
        constructor(t, e, n) {
          this.nextOrObserver = t, this.error = e, this.complete = n
        }
        call(t, e) {
          return e.subscribe(new Yu(t, this.nextOrObserver, this.error, this.complete))
        }
      }
      class Yu extends p {
        constructor(t, e, n, i) {
          super(t), this._tapNext = Gu, this._tapError = Gu, this._tapComplete = Gu, this._tapError = n || Gu, this._tapComplete = i || Gu, r(e) ? (this._context = this, this._tapNext = e) : e && (this._context = e, this._tapNext = e.next || Gu, this._tapError = e.error || Gu, this._tapComplete = e.complete || Gu)
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t)
          } catch (e) {
            return void this.destination.error(e)
          }
          this.destination.next(t)
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t)
          } catch (t) {
            return void this.destination.error(t)
          }
          this.destination.error(t)
        }
        _complete() {
          try {
            this._tapComplete.call(this._context)
          } catch (t) {
            return void this.destination.error(t)
          }
          return this.destination.complete()
        }
      }
      class Ju {
        constructor(t) {
          this.callback = t
        }
        call(t, e) {
          return e.subscribe(new Xu(t, this.callback))
        }
      }
      class Xu extends p {
        constructor(t, e) {
          super(t), this.add(new h(e))
        }
      }
      class th {
        constructor(t, e) {
          this.id = t, this.url = e
        }
      }
      class eh extends th {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), this.navigationTrigger = n, this.restoredState = r
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
      }
      class nh extends th {
        constructor(t, e, n) {
          super(t, e), this.urlAfterRedirects = n
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
      }
      class rh extends th {
        constructor(t, e, n) {
          super(t, e), this.reason = n
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
      }
      class ih extends th {
        constructor(t, e, n) {
          super(t, e), this.error = n
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
      }
      class sh extends th {
        constructor(t, e, n, r) {
          super(t, e), this.urlAfterRedirects = n, this.state = r
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class oh extends th {
        constructor(t, e, n, r) {
          super(t, e), this.urlAfterRedirects = n, this.state = r
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class ah extends th {
        constructor(t, e, n, r, i) {
          super(t, e), this.urlAfterRedirects = n, this.state = r, this.shouldActivate = i
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
      }
      class lh extends th {
        constructor(t, e, n, r) {
          super(t, e), this.urlAfterRedirects = n, this.state = r
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class ch extends th {
        constructor(t, e, n, r) {
          super(t, e), this.urlAfterRedirects = n, this.state = r
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class uh {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`
        }
      }
      class hh {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
      }
      class dh {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
      }
      class fh {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
      }
      class ph {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
      }
      class mh {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
      }
      class gh {
        constructor(t, e, n) {
          this.routerEvent = t, this.position = e, this.anchor = n
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
        }
      }
      const yh = "primary";
      class _h {
        constructor(t) {
          this.params = t || {}
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t)
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e
          }
          return null
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e]
          }
          return []
        }
        get keys() {
          return Object.keys(this.params)
        }
      }

      function bh(t) {
        return new _h(t)
      }

      function vh(t) {
        const e = Error("NavigationCancelingError: " + t);
        return e.ngNavigationCancelingError = !0, e
      }

      function wh(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length)) return null;
        const i = {};
        for (let s = 0; s < r.length; s++) {
          const e = r[s],
            n = t[s];
          if (e.startsWith(":")) i[e.substring(1)] = n;
          else if (e !== n.path) return null
        }
        return {
          consumed: t.slice(0, r.length),
          posParams: i
        }
      }

      function xh(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let s = 0; s < n.length; s++)
          if (i = n[s], !Ch(t[i], e[i])) return !1;
        return !0
      }

      function Ch(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((t, e) => r[e] === t)
        }
        return t === e
      }

      function Sh(t) {
        return Array.prototype.concat.apply([], t)
      }

      function Eh(t) {
        return t.length > 0 ? t[t.length - 1] : null
      }

      function kh(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n)
      }

      function Th(t) {
        return Qs(t) ? t : qs(t) ? M(Promise.resolve(t)) : ou(t)
      }
      const Ah = {
          exact: function t(e, n, r) {
            if (!Nh(e.segments, n.segments)) return !1;
            if (!Lh(e.segments, n.segments, r)) return !1;
            if (e.numberOfChildren !== n.numberOfChildren) return !1;
            for (const i in n.children) {
              if (!e.children[i]) return !1;
              if (!t(e.children[i], n.children[i], r)) return !1
            }
            return !0
          },
          subset: Ih
        },
        Oh = {
          exact: function (t, e) {
            return xh(t, e)
          },
          subset: function (t, e) {
            return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(n => Ch(t[n], e[n]))
          },
          ignored: () => !0
        };

      function Rh(t, e, n) {
        return Ah[n.paths](t.root, e.root, n.matrixParams) && Oh[n.queryParams](t.queryParams, e.queryParams) && !("exact" === n.fragment && t.fragment !== e.fragment)
      }

      function Ih(t, e, n) {
        return Ph(t, e, e.segments, n)
      }

      function Ph(t, e, n, r) {
        if (t.segments.length > n.length) {
          const i = t.segments.slice(0, n.length);
          return !!Nh(i, n) && !e.hasChildren() && !!Lh(i, n, r)
        }
        if (t.segments.length === n.length) {
          if (!Nh(t.segments, n)) return !1;
          if (!Lh(t.segments, n, r)) return !1;
          for (const n in e.children) {
            if (!t.children[n]) return !1;
            if (!Ih(t.children[n], e.children[n], r)) return !1
          }
          return !0
        } {
          const i = n.slice(0, t.segments.length),
            s = n.slice(t.segments.length);
          return !!Nh(t.segments, i) && !!Lh(t.segments, i, r) && !!t.children.primary && Ph(t.children.primary, e, s, r)
        }
      }

      function Lh(t, e, n) {
        return e.every((e, r) => Oh[n](t[r].parameters, e.parameters))
      }
      class Dh {
        constructor(t, e, n) {
          this.root = t, this.queryParams = e, this.fragment = n
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = bh(this.queryParams)), this._queryParamMap
        }
        toString() {
          return Uh.serialize(this)
        }
      }
      class Fh {
        constructor(t, e) {
          this.segments = t, this.children = e, this.parent = null, kh(e, (t, e) => t.parent = this)
        }
        hasChildren() {
          return this.numberOfChildren > 0
        }
        get numberOfChildren() {
          return Object.keys(this.children).length
        }
        toString() {
          return Bh(this)
        }
      }
      class Mh {
        constructor(t, e) {
          this.path = t, this.parameters = e
        }
        get parameterMap() {
          return this._parameterMap || (this._parameterMap = bh(this.parameters)), this._parameterMap
        }
        toString() {
          return Gh(this)
        }
      }

      function Nh(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path)
      }
      class Vh {}
      class jh {
        parse(t) {
          const e = new Xh(t);
          return new Dh(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment())
        }
        serialize(t) {
          var e;
          return `/${$h(t.root,!0)}${function(t){const e=Object.keys(t).map(e=>{const n=t[e];return Array.isArray(n)?n.map(t=>`${zh(e)}=${zh(t)}`).join("&"):`${zh(e)}=${zh(n)}`});return e.length?` ? $ {
            e.join("&")
          }
          `:""}(t.queryParams)}${"string"==typeof t.fragment?`#${e=t.fragment,encodeURI(e)}`:""}`
        }
      }
      const Uh = new jh;

      function Bh(t) {
        return t.segments.map(t => Gh(t)).join("/")
      }

      function $h(t, e) {
        if (!t.hasChildren()) return Bh(t);
        if (e) {
          const e = t.children.primary ? $h(t.children.primary, !1) : "",
            n = [];
          return kh(t.children, (t, e) => {
            e !== yh && n.push(`${e}:${$h(t,!1)}`)
          }), n.length > 0 ? `${e}(${n.join("//")})` : e
        } {
          const e = function (t, e) {
            let n = [];
            return kh(t.children, (t, r) => {
              r === yh && (n = n.concat(e(t, r)))
            }), kh(t.children, (t, r) => {
              r !== yh && (n = n.concat(e(t, r)))
            }), n
          }(t, (e, n) => n === yh ? [$h(t.children.primary, !1)] : [`${n}:${$h(e,!1)}`]);
          return 1 === Object.keys(t.children).length && null != t.children.primary ? `${Bh(t)}/${e[0]}` : `${Bh(t)}/(${e.join("//")})`
        }
      }

      function Hh(t) {
        return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
      }

      function zh(t) {
        return Hh(t).replace(/%3B/gi, ";")
      }

      function qh(t) {
        return Hh(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
      }

      function Qh(t) {
        return decodeURIComponent(t)
      }

      function Wh(t) {
        return Qh(t.replace(/\+/g, "%20"))
      }

      function Gh(t) {
        return `${qh(t.path)}${e=t.parameters,Object.keys(e).map(t=>`;${qh(t)}=${qh(e[t])}`).join("")}`;
        var e
      }
      const Kh = /^[^\/()?;=#]+/;

      function Zh(t) {
        const e = t.match(Kh);
        return e ? e[0] : ""
      }
      const Yh = /^[^=?&#]+/,
        Jh = /^[^?&#]+/;
      class Xh {
        constructor(t) {
          this.url = t, this.remaining = t
        }
        parseRootSegment() {
          return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new Fh([], {}) : new Fh([], this.parseChildren())
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t)
            } while (this.consumeOptional("&"));
          return t
        }
        parseFragment() {
          return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") && (this.capture("/"), e = this.parseParens(!0));
          let n = {};
          return this.peekStartsWith("(") && (n = this.parseParens(!1)), (t.length > 0 || Object.keys(e).length > 0) && (n.primary = new Fh(t, e)), n
        }
        parseSegment() {
          const t = Zh(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
          return this.capture(t), new Mh(Qh(t), this.parseMatrixParams())
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";");) this.parseParam(t);
          return t
        }
        parseParam(t) {
          const e = Zh(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = Zh(this.remaining);
            t && (n = t, this.capture(n))
          }
          t[Qh(e)] = Qh(n)
        }
        parseQueryParam(t) {
          const e = function (t) {
            const e = t.match(Yh);
            return e ? e[0] : ""
          }(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = function (t) {
              const e = t.match(Jh);
              return e ? e[0] : ""
            }(this.remaining);
            t && (n = t, this.capture(n))
          }
          const r = Wh(e),
            i = Wh(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || (e = [e], t[r] = e), e.push(i)
          } else t[r] = i
        }
        parseParens(t) {
          const e = {};
          for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
            const n = Zh(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r) throw new Error(`Cannot parse url '${this.url}'`);
            let i;
            n.indexOf(":") > -1 ? (i = n.substr(0, n.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = yh);
            const s = this.parseChildren();
            e[i] = 1 === Object.keys(s).length ? s.primary : new Fh([], s), this.consumeOptional("//")
          }
          return e
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t)
        }
        consumeOptional(t) {
          return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0)
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
        }
      }
      class td {
        constructor(t) {
          this._root = t
        }
        get root() {
          return this._root.value
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null
        }
        children(t) {
          const e = ed(t, this._root);
          return e ? e.children.map(t => t.value) : []
        }
        firstChild(t) {
          const e = ed(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null
        }
        siblings(t) {
          const e = nd(t, this._root);
          return e.length < 2 ? [] : e[e.length - 2].children.map(t => t.value).filter(e => e !== t)
        }
        pathFromRoot(t) {
          return nd(t, this._root).map(t => t.value)
        }
      }

      function ed(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = ed(t, n);
          if (e) return e
        }
        return null
      }

      function nd(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = nd(t, n);
          if (r.length) return r.unshift(e), r
        }
        return []
      }
      class rd {
        constructor(t, e) {
          this.value = t, this.children = e
        }
        toString() {
          return `TreeNode(${this.value})`
        }
      }

      function id(t) {
        const e = {};
        return t && t.children.forEach(t => e[t.value.outlet] = t), e
      }
      class sd extends td {
        constructor(t, e) {
          super(t), this.snapshot = e, hd(this, t)
        }
        toString() {
          return this.snapshot.toString()
        }
      }

      function od(t, e) {
        const n = function (t, e) {
            const n = new cd([], {}, {}, "", {}, yh, e, null, t.root, -1, {});
            return new ud("", new rd(n, []))
          }(t, e),
          r = new au([new Mh("", {})]),
          i = new au({}),
          s = new au({}),
          o = new au({}),
          a = new au(""),
          l = new ad(r, i, o, a, s, yh, e, n.root);
        return l.snapshot = n.root, new sd(new rd(l, []), n)
      }
      class ad {
        constructor(t, e, n, r, i, s, o, a) {
          this.url = t, this.params = e, this.queryParams = n, this.fragment = r, this.data = i, this.outlet = s, this.component = o, this._futureSnapshot = a
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = this.params.pipe(k(t => bh(t)))), this._paramMap
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(k(t => bh(t)))), this._queryParamMap
        }
        toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
        }
      }

      function ld(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1;) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--
            }
          }
        return function (t) {
          return t.reduce((t, e) => ({
            params: Object.assign(Object.assign({}, t.params), e.params),
            data: Object.assign(Object.assign({}, t.data), e.data),
            resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData)
          }), {
            params: {},
            data: {},
            resolve: {}
          })
        }(n.slice(r))
      }
      class cd {
        constructor(t, e, n, r, i, s, o, a, l, c, u) {
          this.url = t, this.params = e, this.queryParams = n, this.fragment = r, this.data = i, this.outlet = s, this.component = o, this.routeConfig = a, this._urlSegment = l, this._lastPathIndex = c, this._resolve = u
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = bh(this.params)), this._paramMap
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = bh(this.queryParams)), this._queryParamMap
        }
        toString() {
          return `Route(url:'${this.url.map(t=>t.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
        }
      }
      class ud extends td {
        constructor(t, e) {
          super(e), this.url = t, hd(this, e)
        }
        toString() {
          return dd(this._root)
        }
      }

      function hd(t, e) {
        e.value._routerState = t, e.children.forEach(e => hd(t, e))
      }

      function dd(t) {
        const e = t.children.length > 0 ? ` { ${t.children.map(dd).join(", ")} } ` : "";
        return `${t.value}${e}`
      }

      function fd(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          t.snapshot = n, xh(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams), e.fragment !== n.fragment && t.fragment.next(n.fragment), xh(e.params, n.params) || t.params.next(n.params),
            function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n)
                if (!xh(t[n], e[n])) return !1;
              return !0
            }(e.url, n.url) || t.url.next(n.url), xh(e.data, n.data) || t.data.next(n.data)
        } else t.snapshot = t._futureSnapshot, t.data.next(t._futureSnapshot.data)
      }

      function pd(t, e) {
        var n, r;
        return xh(t.params, e.params) && Nh(n = t.url, r = e.url) && n.every((t, e) => xh(t.parameters, r[e].parameters)) && !(!t.parent != !e.parent) && (!t.parent || pd(t.parent, e.parent))
      }

      function md(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const i = function (t, e, n) {
            return e.children.map(e => {
              for (const r of n.children)
                if (t.shouldReuseRoute(e.value, r.value.snapshot)) return md(t, e, r);
              return md(t, e)
            })
          }(t, e, n);
          return new rd(r, i)
        } {
          if (t.shouldAttach(e.value)) {
            const n = t.retrieve(e.value);
            if (null !== n) {
              const t = n.route;
              return gd(e, t), t
            }
          }
          const n = new ad(new au((r = e.value).url), new au(r.params), new au(r.queryParams), new au(r.fragment), new au(r.data), r.outlet, r.component, r),
            i = e.children.map(e => md(t, e));
          return new rd(n, i)
        }
        var r
      }

      function gd(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig) throw new Error("Cannot reattach ActivatedRouteSnapshot created from a different route");
        if (t.children.length !== e.children.length) throw new Error("Cannot reattach ActivatedRouteSnapshot with a different number of children");
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n) gd(t.children[n], e.children[n])
      }

      function yd(t) {
        return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
      }

      function _d(t) {
        return "object" == typeof t && null != t && t.outlets
      }

      function bd(t, e, n, r, i) {
        let s = {};
        return r && kh(r, (t, e) => {
          s[e] = Array.isArray(t) ? t.map(t => `${t}`) : `${t}`
        }), new Dh(n.root === t ? e : vd(n.root, t, e), s, i)
      }

      function vd(t, e, n) {
        const r = {};
        return kh(t.children, (t, i) => {
          r[i] = t === e ? n : vd(t, e, n)
        }), new Fh(t.segments, r)
      }
      class wd {
        constructor(t, e, n) {
          if (this.isAbsolute = t, this.numberOfDoubleDots = e, this.commands = n, t && n.length > 0 && yd(n[0])) throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(_d);
          if (r && r !== Eh(n)) throw new Error("{outlets:{}} has to be the last command")
        }
        toRoot() {
          return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
        }
      }
      class xd {
        constructor(t, e, n) {
          this.segmentGroup = t, this.processChildren = e, this.index = n
        }
      }

      function Cd(t, e, n) {
        if (t || (t = new Fh([], {})), 0 === t.segments.length && t.hasChildren()) return Sd(t, e, n);
        const r = function (t, e, n) {
            let r = 0,
              i = e;
            const s = {
              match: !1,
              pathIndex: 0,
              commandIndex: 0
            };
            for (; i < t.segments.length;) {
              if (r >= n.length) return s;
              const e = t.segments[i],
                o = n[r];
              if (_d(o)) break;
              const a = `${o}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === a) break;
              if (a && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Ad(a, l, e)) return s;
                r += 2
              } else {
                if (!Ad(a, {}, e)) return s;
                r++
              }
              i++
            }
            return {
              match: !0,
              pathIndex: i,
              commandIndex: r
            }
          }(t, e, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new Fh(t.segments.slice(0, r.pathIndex), {});
          return e.children.primary = new Fh(t.segments.slice(r.pathIndex), t.children), Sd(e, 0, i)
        }
        return r.match && 0 === i.length ? new Fh(t.segments, {}) : r.match && !t.hasChildren() ? Ed(t, e, n) : r.match ? Sd(t, 0, i) : Ed(t, e, n)
      }

      function Sd(t, e, n) {
        if (0 === n.length) return new Fh(t.segments, {}); {
          const r = function (t) {
              return _d(t[0]) ? t[0].outlets : {
                [yh]: t
              }
            }(n),
            i = {};
          return kh(r, (n, r) => {
            "string" == typeof n && (n = [n]), null !== n && (i[r] = Cd(t.children[r], e, n))
          }), kh(t.children, (t, e) => {
            void 0 === r[e] && (i[e] = t)
          }), new Fh(t.segments, i)
        }
      }

      function Ed(t, e, n) {
        const r = t.segments.slice(0, e);
        let i = 0;
        for (; i < n.length;) {
          const s = n[i];
          if (_d(s)) {
            const t = kd(s.outlets);
            return new Fh(r, t)
          }
          if (0 === i && yd(n[0])) {
            r.push(new Mh(t.segments[e].path, Td(n[0]))), i++;
            continue
          }
          const o = _d(s) ? s.outlets.primary : `${s}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          o && a && yd(a) ? (r.push(new Mh(o, Td(a))), i += 2) : (r.push(new Mh(o, {})), i++)
        }
        return new Fh(r, {})
      }

      function kd(t) {
        const e = {};
        return kh(t, (t, n) => {
          "string" == typeof t && (t = [t]), null !== t && (e[n] = Ed(new Fh([], {}), 0, t))
        }), e
      }

      function Td(t) {
        const e = {};
        return kh(t, (t, n) => e[n] = `${t}`), e
      }

      function Ad(t, e, n) {
        return t == n.path && xh(e, n.parameters)
      }
      class Od {
        constructor(t, e, n, r) {
          this.routeReuseStrategy = t, this.futureState = e, this.currState = n, this.forwardEvent = r
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t), fd(this.futureState.root), this.activateChildRoutes(e, n, t)
        }
        deactivateChildRoutes(t, e, n) {
          const r = id(e);
          t.children.forEach(t => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e]
          }), kh(r, (t, e) => {
            this.deactivateRouteAndItsChildren(t, n)
          })
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            i = e ? e.value : null;
          if (r === i)
            if (r.component) {
              const i = n.getContext(r.outlet);
              i && this.deactivateChildRoutes(t, e, i.children)
            } else this.deactivateChildRoutes(t, e, n);
          else i && this.deactivateRouteAndItsChildren(e, n)
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, e) : this.deactivateRouteAndOutlet(t, e)
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r
            })
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet),
            r = n && t.value.component ? n.children : e,
            i = id(t);
          for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], r);
          n && n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated(), n.attachRef = null, n.resolver = null, n.route = null)
        }
        activateChildRoutes(t, e, n) {
          const r = id(e);
          t.children.forEach(t => {
            this.activateRoutes(t, r[t.value.outlet], n), this.forwardEvent(new mh(t.value.snapshot))
          }), t.children.length && this.forwardEvent(new fh(t.value.snapshot))
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            i = e ? e.value : null;
          if (fd(r), r === i)
            if (r.component) {
              const i = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, i.children)
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null), e.children.onOutletReAttached(t.contexts), e.attachRef = t.componentRef, e.route = t.route.value, e.outlet && e.outlet.attach(t.componentRef, t.route.value), Rd(t.route)
            } else {
              const n = function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null
                  }
                  return null
                }(r.snapshot),
                i = n ? n.module.componentFactoryResolver : null;
              e.attachRef = null, e.route = r, e.resolver = i, e.outlet && e.outlet.activateWith(r, i), this.activateChildRoutes(t, null, e.children)
            }
          } else this.activateChildRoutes(t, null, n)
        }
      }

      function Rd(t) {
        fd(t.value), t.children.forEach(Rd)
      }
      class Id {
        constructor(t, e) {
          this.routes = t, this.module = e
        }
      }

      function Pd(t) {
        return "function" == typeof t
      }

      function Ld(t) {
        return t instanceof Dh
      }
      const Dd = Symbol("INITIAL_VALUE");

      function Fd() {
        return bu(t => function (...t) {
          let e, n;
          return E(t[t.length - 1]) && (n = t.pop()), "function" == typeof t[t.length - 1] && (e = t.pop()), 1 === t.length && l(t[0]) && (t = t[0]), z(t, n).lift(new du(e))
        }(t.map(t => t.pipe(Cu(1), ku(Dd)))).pipe(Tu((t, e) => {
          let n = !1;
          return e.reduce((t, r, i) => {
            if (t !== Dd) return t;
            if (r === Dd && (n = !0), !n) {
              if (!1 === r) return r;
              if (i === e.length - 1 || Ld(r)) return r
            }
            return t
          }, t)
        }, Dd), Ru(t => t !== Dd), k(t => Ld(t) ? t : !0 === t), Cu(1)))
      }
      let Md = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275cmp = $t({
          type: t,
          selectors: [
            ["ng-component"]
          ],
          decls: 1,
          vars: 0,
          template: function (t, e) {
            1 & t && $s(0, "router-outlet")
          },
          directives: function () {
            return [Lf]
          },
          encapsulation: 2
        }), t
      })();

      function Nd(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          Vd(r, jd(e, r))
        }
      }

      function Vd(t, e) {
        t.children && Nd(t.children, e)
      }

      function jd(t, e) {
        return e ? t || e.path ? t && !e.path ? `${t}/` : !t && e.path ? e.path : `${t}/${e.path}` : "" : t
      }

      function Ud(t) {
        const e = t.children && t.children.map(Ud),
          n = e ? Object.assign(Object.assign({}, t), {
            children: e
          }) : Object.assign({}, t);
        return !n.component && (e || n.loadChildren) && n.outlet && n.outlet !== yh && (n.component = Md), n
      }

      function Bd(t) {
        return t.outlet || yh
      }

      function $d(t, e) {
        const n = t.filter(t => Bd(t) === e);
        return n.push(...t.filter(t => Bd(t) !== e)), n
      }
      const Hd = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {}
      };

      function zd(t, e, n) {
        var r;
        if ("" === e.path) return "full" === e.pathMatch && (t.hasChildren() || n.length > 0) ? Object.assign({}, Hd) : {
          matched: !0,
          consumedSegments: [],
          lastChild: 0,
          parameters: {},
          positionalParamSegments: {}
        };
        const i = (e.matcher || wh)(n, t, e);
        if (!i) return Object.assign({}, Hd);
        const s = {};
        kh(i.posParams, (t, e) => {
          s[e] = t.path
        });
        const o = i.consumed.length > 0 ? Object.assign(Object.assign({}, s), i.consumed[i.consumed.length - 1].parameters) : s;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          lastChild: i.consumed.length,
          parameters: o,
          positionalParamSegments: null !== (r = i.posParams) && void 0 !== r ? r : {}
        }
      }

      function qd(t, e, n, r, i = "corrected") {
        if (n.length > 0 && function (t, e, n) {
            return n.some(n => Qd(t, e, n) && Bd(n) !== yh)
          }(t, n, r)) {
          const i = new Fh(e, function (t, e, n, r) {
            const i = {};
            i.primary = r, r._sourceSegment = t, r._segmentIndexShift = e.length;
            for (const s of n)
              if ("" === s.path && Bd(s) !== yh) {
                const n = new Fh([], {});
                n._sourceSegment = t, n._segmentIndexShift = e.length, i[Bd(s)] = n
              } return i
          }(t, e, r, new Fh(n, t.children)));
          return i._sourceSegment = t, i._segmentIndexShift = e.length, {
            segmentGroup: i,
            slicedSegments: []
          }
        }
        if (0 === n.length && function (t, e, n) {
            return n.some(n => Qd(t, e, n))
          }(t, n, r)) {
          const s = new Fh(t.segments, function (t, e, n, r, i, s) {
            const o = {};
            for (const a of r)
              if (Qd(t, n, a) && !i[Bd(a)]) {
                const n = new Fh([], {});
                n._sourceSegment = t, n._segmentIndexShift = "legacy" === s ? t.segments.length : e.length, o[Bd(a)] = n
              } return Object.assign(Object.assign({}, i), o)
          }(t, e, n, r, t.children, i));
          return s._sourceSegment = t, s._segmentIndexShift = e.length, {
            segmentGroup: s,
            slicedSegments: n
          }
        }
        const s = new Fh(t.segments, t.children);
        return s._sourceSegment = t, s._segmentIndexShift = e.length, {
          segmentGroup: s,
          slicedSegments: n
        }
      }

      function Qd(t, e, n) {
        return (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) && "" === n.path
      }

      function Wd(t, e, n, r) {
        return !!(Bd(t) === r || r !== yh && Qd(e, n, t)) && ("**" === t.path || zd(e, t, n).matched)
      }

      function Gd(t, e, n) {
        return 0 === e.length && !t.children[n]
      }
      class Kd {
        constructor(t) {
          this.segmentGroup = t || null
        }
      }
      class Zd {
        constructor(t) {
          this.urlTree = t
        }
      }

      function Yd(t) {
        return new _(e => e.error(new Kd(t)))
      }

      function Jd(t) {
        return new _(e => e.error(new Zd(t)))
      }

      function Xd(t) {
        return new _(e => e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`)))
      }
      class tf {
        constructor(t, e, n, r, i) {
          this.configLoader = e, this.urlSerializer = n, this.urlTree = r, this.config = i, this.allowRedirects = !0, this.ngModule = t.get(fa)
        }
        apply() {
          const t = qd(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new Fh(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, e, yh).pipe(k(t => this.createUrlTree(ef(t), this.urlTree.queryParams, this.urlTree.fragment))).pipe(Lu(t => {
            if (t instanceof Zd) return this.allowRedirects = !1, this.match(t.urlTree);
            if (t instanceof Kd) throw this.noMatchError(t);
            throw t
          }))
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, yh).pipe(k(e => this.createUrlTree(ef(e), t.queryParams, t.fragment))).pipe(Lu(t => {
            if (t instanceof Kd) throw this.noMatchError(t);
            throw t
          }))
        }
        noMatchError(t) {
          return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`)
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new Fh([], {
            [yh]: t
          }) : t;
          return new Dh(r, e, n)
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren() ? this.expandChildren(t, e, n).pipe(k(t => new Fh([], t))) : this.expandSegment(t, n, e, n.segments, r, !0)
        }
        expandChildren(t, e, n) {
          const r = [];
          for (const i of Object.keys(n.children)) "primary" === i ? r.unshift(i) : r.push(i);
          return M(r).pipe(Mu(r => {
            const i = n.children[r],
              s = $d(e, r);
            return this.expandSegmentGroup(t, s, i, r).pipe(k(t => ({
              segment: t,
              outlet: r
            })))
          }), Tu((t, e) => (t[e.outlet] = e.segment, t), {}), function (t, e) {
            const n = arguments.length >= 2;
            return r => r.pipe(t ? Ru((e, n) => t(e, n, r)) : y, Nu(1), n ? zu(e) : Uu(() => new pu))
          }())
        }
        expandSegment(t, e, n, r, i, s) {
          return M(n).pipe(Mu(o => this.expandSegmentAgainstRoute(t, e, n, o, r, i, s).pipe(Lu(t => {
            if (t instanceof Kd) return ou(null);
            throw t
          }))), Wu(t => !!t), Lu((t, n) => {
            if (t instanceof pu || "EmptyError" === t.name) {
              if (Gd(e, r, i)) return ou(new Fh([], {}));
              throw new Kd(e)
            }
            throw t
          }))
        }
        expandSegmentAgainstRoute(t, e, n, r, i, s, o) {
          return Wd(r, e, i, s) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(t, e, r, i, s) : o && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, i, s) : Yd(e) : Yd(e)
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, i, s) {
          return "**" === r.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, i, s)
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const i = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/") ? Jd(i) : this.lineralizeSegments(n, i).pipe(U(n => {
            const i = new Fh(n, {});
            return this.expandSegment(t, i, e, n, r, !1)
          }))
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, i, s) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c
          } = zd(e, r, i);
          if (!o) return Yd(e);
          const u = this.applyRedirectCommands(a, r.redirectTo, c);
          return r.redirectTo.startsWith("/") ? Jd(u) : this.lineralizeSegments(r, u).pipe(U(r => this.expandSegment(t, e, n, r.concat(i.slice(l)), s, !1)))
        }
        matchSegmentAgainstRoute(t, e, n, r, i) {
          if ("**" === n.path) return n.loadChildren ? (n._loadedConfig ? ou(n._loadedConfig) : this.configLoader.load(t.injector, n)).pipe(k(t => (n._loadedConfig = t, new Fh(r, {})))) : ou(new Fh(r, {}));
          const {
            matched: s,
            consumedSegments: o,
            lastChild: a
          } = zd(e, n, r);
          if (!s) return Yd(e);
          const l = r.slice(a);
          return this.getChildConfig(t, n, r).pipe(U(t => {
            const r = t.module,
              s = t.routes,
              {
                segmentGroup: a,
                slicedSegments: c
              } = qd(e, o, l, s),
              u = new Fh(a.segments, a.children);
            if (0 === c.length && u.hasChildren()) return this.expandChildren(r, s, u).pipe(k(t => new Fh(o, t)));
            if (0 === s.length && 0 === c.length) return ou(new Fh(o, {}));
            const h = Bd(n) === i;
            return this.expandSegment(r, u, s, c, h ? yh : i, !0).pipe(k(t => new Fh(o.concat(t.segments), t.children)))
          }))
        }
        getChildConfig(t, e, n) {
          return e.children ? ou(new Id(e.children, t)) : e.loadChildren ? void 0 !== e._loadedConfig ? ou(e._loadedConfig) : this.runCanLoadGuards(t.injector, e, n).pipe(U(n => n ? this.configLoader.load(t.injector, e).pipe(k(t => (e._loadedConfig = t, t))) : function (t) {
            return new _(e => e.error(vh(`Cannot load children because the guard of the route "path: '${t.path}'" returned false`)))
          }(e))) : ou(new Id([], t))
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad;
          return r && 0 !== r.length ? ou(r.map(r => {
            const i = t.get(r);
            let s;
            if (function (t) {
                return t && Pd(t.canLoad)
              }(i)) s = i.canLoad(e, n);
            else {
              if (!Pd(i)) throw new Error("Invalid CanLoad guard");
              s = i(e, n)
            }
            return Th(s)
          })).pipe(Fd(), Ku(t => {
            if (!Ld(t)) return;
            const e = vh(`Redirecting to "${this.urlSerializer.serialize(t)}"`);
            throw e.url = t, e
          }), k(t => !0 === t)) : ou(!0)
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (n = n.concat(r.segments), 0 === r.numberOfChildren) return ou(n);
            if (r.numberOfChildren > 1 || !r.children.primary) return Xd(t.redirectTo);
            r = r.children.primary
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n)
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const i = this.createSegmentGroup(t, e.root, n, r);
          return new Dh(i, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment)
        }
        createQueryParams(t, e) {
          const n = {};
          return kh(t, (t, r) => {
            if ("string" == typeof t && t.startsWith(":")) {
              const i = t.substring(1);
              n[r] = e[i]
            } else n[r] = t
          }), n
        }
        createSegmentGroup(t, e, n, r) {
          const i = this.createSegments(t, e.segments, n, r);
          let s = {};
          return kh(e.children, (e, i) => {
            s[i] = this.createSegmentGroup(t, e, n, r)
          }), new Fh(i, s)
        }
        createSegments(t, e, n, r) {
          return e.map(e => e.path.startsWith(":") ? this.findPosParam(t, e, r) : this.findOrReturn(e, n))
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
          return r
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++
          }
          return t
        }
      }

      function ef(t) {
        const e = {};
        for (const n of Object.keys(t.children)) {
          const r = ef(t.children[n]);
          (r.segments.length > 0 || r.hasChildren()) && (e[n] = r)
        }
        return function (t) {
          if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary;
            return new Fh(t.segments.concat(e.segments), e.children)
          }
          return t
        }(new Fh(t.segments, e))
      }
      class nf {
        constructor(t) {
          this.path = t, this.route = this.path[this.path.length - 1]
        }
      }
      class rf {
        constructor(t, e) {
          this.component = t, this.route = e
        }
      }

      function sf(t, e, n) {
        const r = t._root;
        return af(r, e ? e._root : null, n, [r.value])
      }

      function of (t, e, n) {
        const r = function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig
          }
          return null
        }(e);
        return (r ? r.module.injector : n).get(t)
      }

      function af(t, e, n, r, i = {
        canDeactivateChecks: [],
        canActivateChecks: []
      }) {
        const s = id(e);
        return t.children.forEach(t => {
          ! function (t, e, n, r, i = {
            canDeactivateChecks: [],
            canActivateChecks: []
          }) {
            const s = t.value,
              o = e ? e.value : null,
              a = n ? n.getContext(t.value.outlet) : null;
            if (o && s.routeConfig === o.routeConfig) {
              const l = function (t, e, n) {
                if ("function" == typeof n) return n(t, e);
                switch (n) {
                  case "pathParamsChange":
                    return !Nh(t.url, e.url);
                  case "pathParamsOrQueryParamsChange":
                    return !Nh(t.url, e.url) || !xh(t.queryParams, e.queryParams);
                  case "always":
                    return !0;
                  case "paramsOrQueryParamsChange":
                    return !pd(t, e) || !xh(t.queryParams, e.queryParams);
                  case "paramsChange":
                  default:
                    return !pd(t, e)
                }
              }(o, s, s.routeConfig.runGuardsAndResolvers);
              l ? i.canActivateChecks.push(new nf(r)) : (s.data = o.data, s._resolvedData = o._resolvedData), af(t, e, s.component ? a ? a.children : null : n, r, i), l && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new rf(a.outlet.component, o))
            } else o && lf(e, a, i), i.canActivateChecks.push(new nf(r)), af(t, null, s.component ? a ? a.children : null : n, r, i)
          }(t, s[t.value.outlet], n, r.concat([t.value]), i), delete s[t.value.outlet]
        }), kh(s, (t, e) => lf(t, n.getContext(e), i)), i
      }

      function lf(t, e, n) {
        const r = id(t),
          i = t.value;
        kh(r, (t, r) => {
          lf(t, i.component ? e ? e.children.getContext(r) : null : e, n)
        }), n.canDeactivateChecks.push(new rf(i.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, i))
      }
      class cf {}

      function uf(t) {
        return new _(e => e.error(t))
      }
      class hf {
        constructor(t, e, n, r, i, s) {
          this.rootComponentType = t, this.config = e, this.urlTree = n, this.url = r, this.paramsInheritanceStrategy = i, this.relativeLinkResolution = s
        }
        recognize() {
          const t = qd(this.urlTree.root, [], [], this.config.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution).segmentGroup,
            e = this.processSegmentGroup(this.config, t, yh);
          if (null === e) return null;
          const n = new cd([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, yh, this.rootComponentType, null, this.urlTree.root, -1, {}),
            r = new rd(n, e),
            i = new ud(this.url, r);
          return this.inheritParamsAndData(i._root), i
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = ld(e, this.paramsInheritanceStrategy);
          e.params = Object.freeze(n.params), e.data = Object.freeze(n.data), t.children.forEach(t => this.inheritParamsAndData(t))
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren() ? this.processChildren(t, e) : this.processSegment(t, e, e.segments, n)
        }
        processChildren(t, e) {
          const n = [];
          for (const i of Object.keys(e.children)) {
            const r = e.children[i],
              s = $d(t, i),
              o = this.processSegmentGroup(s, r, i);
            if (null === o) return null;
            n.push(...o)
          }
          const r = ff(n);
          return r.sort((t, e) => t.value.outlet === yh ? -1 : e.value.outlet === yh ? 1 : t.value.outlet.localeCompare(e.value.outlet)), r
        }
        processSegment(t, e, n, r) {
          for (const i of t) {
            const t = this.processSegmentAgainstRoute(i, e, n, r);
            if (null !== t) return t
          }
          return Gd(e, n, r) ? [] : null
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo || !Wd(t, e, n, r)) return null;
          let i, s = [],
            o = [];
          if ("**" === t.path) {
            const r = n.length > 0 ? Eh(n).parameters : {};
            i = new cd(n, r, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, gf(t), Bd(t), t.component, t, pf(e), mf(e) + n.length, yf(t))
          } else {
            const r = zd(e, t, n);
            if (!r.matched) return null;
            s = r.consumedSegments, o = n.slice(r.lastChild), i = new cd(s, r.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, gf(t), Bd(t), t.component, t, pf(e), mf(e) + s.length, yf(t))
          }
          const a = function (t) {
              return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : []
            }(t),
            {
              segmentGroup: l,
              slicedSegments: c
            } = qd(e, s, o, a.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution);
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return null === t ? null : [new rd(i, t)]
          }
          if (0 === a.length && 0 === c.length) return [new rd(i, [])];
          const u = Bd(t) === r,
            h = this.processSegment(a, l, c, u ? yh : r);
          return null === h ? null : [new rd(i, h)]
        }
      }

      function df(t) {
        const e = t.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo
      }

      function ff(t) {
        const e = [],
          n = new Set;
        for (const r of t) {
          if (!df(r)) {
            e.push(r);
            continue
          }
          const t = e.find(t => r.value.routeConfig === t.value.routeConfig);
          void 0 !== t ? (t.children.push(...r.children), n.add(t)) : e.push(r)
        }
        for (const r of n) {
          const t = ff(r.children);
          e.push(new rd(r.value, t))
        }
        return e.filter(t => !n.has(t))
      }

      function pf(t) {
        let e = t;
        for (; e._sourceSegment;) e = e._sourceSegment;
        return e
      }

      function mf(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment;) e = e._sourceSegment, n += e._segmentIndexShift ? e._segmentIndexShift : 0;
        return n - 1
      }

      function gf(t) {
        return t.data || {}
      }

      function yf(t) {
        return t.resolve || {}
      }

      function _f(t) {
        return bu(e => {
          const n = t(e);
          return n ? M(n).pipe(k(() => e)) : ou(e)
        })
      }
      class bf extends class {
        shouldDetach(t) {
          return !1
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1
        }
        retrieve(t) {
          return null
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig
        }
      } {}
      const vf = new Bn("ROUTES");
      class wf {
        constructor(t, e, n, r) {
          this.loader = t, this.compiler = e, this.onLoadStartListener = n, this.onLoadEndListener = r
        }
        load(t, e) {
          if (e._loader$) return e._loader$;
          this.onLoadStartListener && this.onLoadStartListener(e);
          const n = this.loadModuleFactory(e.loadChildren).pipe(k(n => {
            this.onLoadEndListener && this.onLoadEndListener(e);
            const r = n.create(t);
            return new Id(Sh(r.injector.get(vf, void 0, vt.Self | vt.Optional)).map(Ud), r)
          }), Lu(t => {
            throw e._loader$ = void 0, t
          }));
          return e._loader$ = new K(n, () => new C).pipe(Q()), e._loader$
        }
        loadModuleFactory(t) {
          return "string" == typeof t ? M(this.loader.load(t)) : Th(t()).pipe(U(t => t instanceof pa ? ou(t) : M(this.compiler.compileModuleAsync(t))))
        }
      }
      class xf {
        constructor() {
          this.outlet = null, this.route = null, this.resolver = null, this.children = new Cf, this.attachRef = null
        }
      }
      class Cf {
        constructor() {
          this.contexts = new Map
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          n.outlet = e, this.contexts.set(t, n)
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null)
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return this.contexts = new Map, t
        }
        onOutletReAttached(t) {
          this.contexts = t
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || (e = new xf, this.contexts.set(t, e)), e
        }
        getContext(t) {
          return this.contexts.get(t) || null
        }
      }
      class Sf {
        shouldProcessUrl(t) {
          return !0
        }
        extract(t) {
          return t
        }
        merge(t, e) {
          return t
        }
      }

      function Ef(t) {
        throw t
      }

      function kf(t, e, n) {
        return e.parse("/")
      }

      function Tf(t, e) {
        return ou(null)
      }
      const Af = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact"
        },
        Of = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset"
        };
      let Rf = (() => {
          class t {
            constructor(t, e, n, r, i, s, o, a) {
              this.rootComponentType = t, this.urlSerializer = e, this.rootContexts = n, this.location = r, this.config = a, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.disposed = !1, this.lastLocationChangeInfo = null, this.navigationId = 0, this.isNgZoneEnabled = !1, this.events = new C, this.errorHandler = Ef, this.malformedUriErrorHandler = kf, this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                beforePreactivation: Tf,
                afterPreactivation: Tf
              }, this.urlHandlingStrategy = new Sf, this.routeReuseStrategy = new bf, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "corrected", this.ngModule = i.get(fa), this.console = i.get(sl);
              const l = i.get(_l);
              this.isNgZoneEnabled = l instanceof _l && _l.isInAngularZone(), this.resetConfig(a), this.currentUrlTree = new Dh(new Fh([], {}), {}, null), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.configLoader = new wf(s, o, t => this.triggerEvent(new uh(t)), t => this.triggerEvent(new hh(t))), this.routerState = od(this.currentUrlTree, this.rootComponentType), this.transitions = new au({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: {
                  canActivateChecks: [],
                  canDeactivateChecks: []
                },
                guardsResult: null
              }), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(Ru(t => 0 !== t.id), k(t => Object.assign(Object.assign({}, t), {
                extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl)
              })), bu(t => {
                let n = !1,
                  r = !1;
                return ou(t).pipe(Ku(t => {
                  this.currentNavigation = {
                    id: t.id,
                    initialUrl: t.currentRawUrl,
                    extractedUrl: t.extractedUrl,
                    trigger: t.source,
                    extras: t.extras,
                    previousNavigation: this.lastSuccessfulNavigation ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {
                      previousNavigation: null
                    }) : null
                  }
                }), bu(t => {
                  const n = !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString();
                  if (("reload" === this.onSameUrlNavigation || n) && this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) return ou(t).pipe(bu(t => {
                    const n = this.transitions.getValue();
                    return e.next(new eh(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState)), n !== this.transitions.getValue() ? gu : Promise.resolve(t)
                  }), function (t, e, n, r) {
                    return bu(i => function (t, e, n, r, i) {
                      return new tf(t, e, n, r, i).apply()
                    }(t, e, n, i.extractedUrl, r).pipe(k(t => Object.assign(Object.assign({}, i), {
                      urlAfterRedirects: t
                    }))))
                  }(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), Ku(t => {
                    this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {
                      finalUrl: t.urlAfterRedirects
                    })
                  }), function (t, e, n, r, i) {
                    return U(s => function (t, e, n, r, i = "emptyOnly", s = "legacy") {
                      try {
                        const o = new hf(t, e, n, r, i, s).recognize();
                        return null === o ? uf(new cf) : ou(o)
                      } catch (o) {
                        return uf(o)
                      }
                    }(t, e, s.urlAfterRedirects, n(s.urlAfterRedirects), r, i).pipe(k(t => Object.assign(Object.assign({}, s), {
                      targetSnapshot: t
                    }))))
                  }(this.rootComponentType, this.config, t => this.serializeUrl(t), this.paramsInheritanceStrategy, this.relativeLinkResolution), Ku(t => {
                    "eager" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(t.urlAfterRedirects, !!t.extras.replaceUrl, t.id, t.extras.state), this.browserUrlTree = t.urlAfterRedirects);
                    const n = new sh(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                    e.next(n)
                  }));
                  if (n && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                    const {
                      id: n,
                      extractedUrl: r,
                      source: i,
                      restoredState: s,
                      extras: o
                    } = t, a = new eh(n, this.serializeUrl(r), i, s);
                    e.next(a);
                    const l = od(r, this.rootComponentType).snapshot;
                    return ou(Object.assign(Object.assign({}, t), {
                      targetSnapshot: l,
                      urlAfterRedirects: r,
                      extras: Object.assign(Object.assign({}, o), {
                        skipLocationChange: !1,
                        replaceUrl: !1
                      })
                    }))
                  }
                  return this.rawUrlTree = t.rawUrl, this.browserUrlTree = t.urlAfterRedirects, t.resolve(null), gu
                }), _f(t => {
                  const {
                    targetSnapshot: e,
                    id: n,
                    extractedUrl: r,
                    rawUrl: i,
                    extras: {
                      skipLocationChange: s,
                      replaceUrl: o
                    }
                  } = t;
                  return this.hooks.beforePreactivation(e, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: i,
                    skipLocationChange: !!s,
                    replaceUrl: !!o
                  })
                }), Ku(t => {
                  const e = new oh(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                  this.triggerEvent(e)
                }), k(t => Object.assign(Object.assign({}, t), {
                  guards: sf(t.targetSnapshot, t.currentSnapshot, this.rootContexts)
                })), function (t, e) {
                  return U(n => {
                    const {
                      targetSnapshot: r,
                      currentSnapshot: i,
                      guards: {
                        canActivateChecks: s,
                        canDeactivateChecks: o
                      }
                    } = n;
                    return 0 === o.length && 0 === s.length ? ou(Object.assign(Object.assign({}, n), {
                      guardsResult: !0
                    })) : function (t, e, n, r) {
                      return M(t).pipe(U(t => function (t, e, n, r, i) {
                        const s = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                        return s && 0 !== s.length ? ou(s.map(s => {
                          const o = of (s, e, i);
                          let a;
                          if (function (t) {
                              return t && Pd(t.canDeactivate)
                            }(o)) a = Th(o.canDeactivate(t, e, n, r));
                          else {
                            if (!Pd(o)) throw new Error("Invalid CanDeactivate guard");
                            a = Th(o(t, e, n, r))
                          }
                          return a.pipe(Wu())
                        })).pipe(Fd()) : ou(!0)
                      }(t.component, t.route, n, e, r)), Wu(t => !0 !== t, !0))
                    }(o, r, i, t).pipe(U(n => n && "boolean" == typeof n ? function (t, e, n, r) {
                      return M(e).pipe(Mu(e => mu(function (t, e) {
                        return null !== t && e && e(new dh(t)), ou(!0)
                      }(e.route.parent, r), function (t, e) {
                        return null !== t && e && e(new ph(t)), ou(!0)
                      }(e.route, r), function (t, e, n) {
                        const r = e[e.length - 1],
                          i = e.slice(0, e.length - 1).reverse().map(t => function (t) {
                            const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                            return e && 0 !== e.length ? {
                              node: t,
                              guards: e
                            } : null
                          }(t)).filter(t => null !== t).map(e => _u(() => ou(e.guards.map(i => {
                            const s = of (i, e.node, n);
                            let o;
                            if (function (t) {
                                return t && Pd(t.canActivateChild)
                              }(s)) o = Th(s.canActivateChild(r, t));
                            else {
                              if (!Pd(s)) throw new Error("Invalid CanActivateChild guard");
                              o = Th(s(r, t))
                            }
                            return o.pipe(Wu())
                          })).pipe(Fd())));
                        return ou(i).pipe(Fd())
                      }(t, e.path, n), function (t, e, n) {
                        const r = e.routeConfig ? e.routeConfig.canActivate : null;
                        return r && 0 !== r.length ? ou(r.map(r => _u(() => {
                          const i = of (r, e, n);
                          let s;
                          if (function (t) {
                              return t && Pd(t.canActivate)
                            }(i)) s = Th(i.canActivate(e, t));
                          else {
                            if (!Pd(i)) throw new Error("Invalid CanActivate guard");
                            s = Th(i(e, t))
                          }
                          return s.pipe(Wu())
                        }))).pipe(Fd()) : ou(!0)
                      }(t, e.route, n))), Wu(t => !0 !== t, !0))
                    }(r, s, t, e) : ou(n)), k(t => Object.assign(Object.assign({}, n), {
                      guardsResult: t
                    })))
                  })
                }(this.ngModule.injector, t => this.triggerEvent(t)), Ku(t => {
                  if (Ld(t.guardsResult)) {
                    const e = vh(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                    throw e.url = t.guardsResult, e
                  }
                  const e = new ah(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                  this.triggerEvent(e)
                }), Ru(t => {
                  if (!t.guardsResult) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new rh(t.id, this.serializeUrl(t.extractedUrl), "");
                    return e.next(n), t.resolve(!1), !1
                  }
                  return !0
                }), _f(t => {
                  if (t.guards.canActivateChecks.length) return ou(t).pipe(Ku(t => {
                    const e = new lh(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                    this.triggerEvent(e)
                  }), bu(t => {
                    let n = !1;
                    return ou(t).pipe((r = this.paramsInheritanceStrategy, i = this.ngModule.injector, U(t => {
                      const {
                        targetSnapshot: e,
                        guards: {
                          canActivateChecks: n
                        }
                      } = t;
                      if (!n.length) return ou(t);
                      let s = 0;
                      return M(n).pipe(Mu(t => function (t, e, n, r) {
                        return function (t, e, n, r) {
                          const i = Object.keys(t);
                          if (0 === i.length) return ou({});
                          const s = {};
                          return M(i).pipe(U(i => function (t, e, n, r) {
                            const i = of (t, e, r);
                            return Th(i.resolve ? i.resolve(e, n) : i(e, n))
                          }(t[i], e, n, r).pipe(Ku(t => {
                            s[i] = t
                          }))), Nu(1), U(() => Object.keys(s).length === i.length ? ou(s) : gu))
                        }(t._resolve, t, e, r).pipe(k(e => (t._resolvedData = e, t.data = Object.assign(Object.assign({}, t.data), ld(t, n).resolve), null)))
                      }(t.route, e, r, i)), Ku(() => s++), Nu(1), U(e => s === n.length ? ou(t) : gu))
                    })), Ku({
                      next: () => n = !0,
                      complete: () => {
                        if (!n) {
                          const n = new rh(t.id, this.serializeUrl(t.extractedUrl), "At least one route resolver didn't emit any value.");
                          e.next(n), t.resolve(!1)
                        }
                      }
                    }));
                    var r, i
                  }), Ku(t => {
                    const e = new ch(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                    this.triggerEvent(e)
                  }))
                }), _f(t => {
                  const {
                    targetSnapshot: e,
                    id: n,
                    extractedUrl: r,
                    rawUrl: i,
                    extras: {
                      skipLocationChange: s,
                      replaceUrl: o
                    }
                  } = t;
                  return this.hooks.afterPreactivation(e, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: i,
                    skipLocationChange: !!s,
                    replaceUrl: !!o
                  })
                }), k(t => {
                  const e = function (t, e, n) {
                    const r = md(t, e._root, n ? n._root : void 0);
                    return new sd(r, e)
                  }(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                  return Object.assign(Object.assign({}, t), {
                    targetRouterState: e
                  })
                }), Ku(t => {
                  this.currentUrlTree = t.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl), this.routerState = t.targetRouterState, "deferred" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, !!t.extras.replaceUrl, t.id, t.extras.state), this.browserUrlTree = t.urlAfterRedirects)
                }), (s = this.rootContexts, o = this.routeReuseStrategy, a = t => this.triggerEvent(t), k(t => (new Od(o, t.targetRouterState, t.currentRouterState, a).activate(s), t))), Ku({
                  next() {
                    n = !0
                  },
                  complete() {
                    n = !0
                  }
                }), (i = () => {
                  if (!n && !r) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new rh(t.id, this.serializeUrl(t.extractedUrl), `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`);
                    e.next(n), t.resolve(!1)
                  }
                  this.currentNavigation = null
                }, t => t.lift(new Ju(i))), Lu(n => {
                  if (r = !0, (i = n) && i.ngNavigationCancelingError) {
                    const r = Ld(n.url);
                    r || (this.navigated = !0, this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl));
                    const i = new rh(t.id, this.serializeUrl(t.extractedUrl), n.message);
                    e.next(i), r ? setTimeout(() => {
                      const e = this.urlHandlingStrategy.merge(n.url, this.rawUrlTree);
                      this.scheduleNavigation(e, "imperative", null, {
                        skipLocationChange: t.extras.skipLocationChange,
                        replaceUrl: "eager" === this.urlUpdateStrategy
                      }, {
                        resolve: t.resolve,
                        reject: t.reject,
                        promise: t.promise
                      })
                    }, 0) : t.resolve(!1)
                  } else {
                    this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                    const r = new ih(t.id, this.serializeUrl(t.extractedUrl), n);
                    e.next(r);
                    try {
                      t.resolve(this.errorHandler(n))
                    } catch (s) {
                      t.reject(s)
                    }
                  }
                  var i;
                  return gu
                }));
                var i, s, o, a
              }))
            }
            resetRootComponentType(t) {
              this.rootComponentType = t, this.routerState.root.component = this.rootComponentType
            }
            getTransition() {
              const t = this.transitions.value;
              return t.urlAfterRedirects = this.browserUrlTree, t
            }
            setTransition(t) {
              this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t))
            }
            initialNavigation() {
              this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {
                replaceUrl: !0
              })
            }
            setUpLocationChangeListener() {
              this.locationSubscription || (this.locationSubscription = this.location.subscribe(t => {
                const e = this.extractLocationChangeInfoFromEvent(t);
                this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) && setTimeout(() => {
                  const {
                    source: t,
                    state: n,
                    urlTree: r
                  } = e, i = {
                    replaceUrl: !0
                  };
                  if (n) {
                    const t = Object.assign({}, n);
                    delete t.navigationId, 0 !== Object.keys(t).length && (i.state = t)
                  }
                  this.scheduleNavigation(r, t, n, i)
                }, 0), this.lastLocationChangeInfo = e
              }))
            }
            extractLocationChangeInfoFromEvent(t) {
              var e;
              return {
                source: "popstate" === t.type ? "popstate" : "hashchange",
                urlTree: this.parseUrl(t.url),
                state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId) ? t.state : null,
                transitionId: this.getTransition().id
              }
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0;
              const n = e.urlTree.toString() === t.urlTree.toString();
              return !(e.transitionId === t.transitionId && n && ("hashchange" === e.source && "popstate" === t.source || "popstate" === e.source && "hashchange" === t.source))
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree)
            }
            getCurrentNavigation() {
              return this.currentNavigation
            }
            triggerEvent(t) {
              this.events.next(t)
            }
            resetConfig(t) {
              Nd(t), this.config = t.map(Ud), this.navigated = !1, this.lastSuccessfulId = -1
            }
            ngOnDestroy() {
              this.dispose()
            }
            dispose() {
              this.transitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: r,
                fragment: i,
                queryParamsHandling: s,
                preserveFragment: o
              } = e, a = n || this.routerState.root, l = o ? this.currentUrlTree.fragment : i;
              let c = null;
              switch (s) {
                case "merge":
                  c = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), r);
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = r || null
              }
              return null !== c && (c = this.removeEmptyProps(c)),
                function (t, e, n, r, i) {
                  if (0 === n.length) return bd(e.root, e.root, e, r, i);
                  const s = function (t) {
                    if ("string" == typeof t[0] && 1 === t.length && "/" === t[0]) return new wd(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, i) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return kh(r.outlets, (t, n) => {
                            e[n] = "string" == typeof t ? t.split("/") : t
                          }), [...t, {
                            outlets: e
                          }]
                        }
                        if (r.segmentPath) return [...t, r.segmentPath]
                      }
                      return "string" != typeof r ? [...t, r] : 0 === i ? (r.split("/").forEach((r, i) => {
                        0 == i && "." === r || (0 == i && "" === r ? n = !0 : ".." === r ? e++ : "" != r && t.push(r))
                      }), t) : [...t, r]
                    }, []);
                    return new wd(n, e, r)
                  }(n);
                  if (s.toRoot()) return bd(e.root, new Fh([], {}), e, r, i);
                  const o = function (t, e, n) {
                      if (t.isAbsolute) return new xd(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new xd(t, t === e.root, 0)
                      }
                      const r = yd(t.commands[0]) ? 0 : 1;
                      return function (t, e, n) {
                        let r = t,
                          i = e,
                          s = n;
                        for (; s > i;) {
                          if (s -= i, r = r.parent, !r) throw new Error("Invalid number of '../'");
                          i = r.segments.length
                        }
                        return new xd(r, !1, i - s)
                      }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r, t.numberOfDoubleDots)
                    }(s, e, t),
                    a = o.processChildren ? Sd(o.segmentGroup, o.index, s.commands) : Cd(o.segmentGroup, o.index, s.commands);
                  return bd(o.segmentGroup, a, e, r, i)
                }(a, this.currentUrlTree, t, c, null != l ? l : null)
            }
            navigateByUrl(t, e = {
              skipLocationChange: !1
            }) {
              const n = Ld(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e)
            }
            navigate(t, e = {
              skipLocationChange: !1
            }) {
              return function (t) {
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  if (null == n) throw new Error(`The requested path contains ${n} segment at index ${e}`)
                }
              }(t), this.navigateByUrl(this.createUrlTree(t, e), e)
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t)
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t)
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
              }
              return e
            }
            isActive(t, e) {
              let n;
              if (n = !0 === e ? Object.assign({}, Af) : !1 === e ? Object.assign({}, Of) : e, Ld(t)) return Rh(this.currentUrlTree, t, n);
              const r = this.parseUrl(t);
              return Rh(this.currentUrlTree, r, n)
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e
              }, {})
            }
            processNavigations() {
              this.navigations.subscribe(t => {
                this.navigated = !0, this.lastSuccessfulId = t.id, this.events.next(new nh(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, t.resolve(!0)
              }, t => {
                this.console.warn("Unhandled Navigation Error: ")
              })
            }
            scheduleNavigation(t, e, n, r, i) {
              if (this.disposed) return Promise.resolve(!1);
              const s = this.getTransition(),
                o = "imperative" !== e && "imperative" === (null == s ? void 0 : s.source),
                a = (this.lastSuccessfulId === s.id || this.currentNavigation ? s.rawUrl : s.urlAfterRedirects).toString() === t.toString();
              if (o && a) return Promise.resolve(!0);
              let l, c, u;
              i ? (l = i.resolve, c = i.reject, u = i.promise) : u = new Promise((t, e) => {
                l = t, c = e
              });
              const h = ++this.navigationId;
              return this.setTransition({
                id: h,
                source: e,
                restoredState: n,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: r,
                resolve: l,
                reject: c,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
              }), u.catch(t => Promise.reject(t))
            }
            setBrowserUrl(t, e, n, r) {
              const i = this.urlSerializer.serialize(t);
              r = r || {}, this.location.isCurrentPathEqualTo(i) || e ? this.location.replaceState(i, "", Object.assign(Object.assign({}, r), {
                navigationId: n
              })) : this.location.go(i, "", Object.assign(Object.assign({}, r), {
                navigationId: n
              }))
            }
            resetStateAndUrl(t, e, n) {
              this.routerState = t, this.currentUrlTree = e, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n), this.resetUrlToCurrentUrlTree()
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", {
                navigationId: this.lastSuccessfulId
              })
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Hn), sr(Vh), sr(Cf), sr(dc), sr(Cs), sr(Bl), sr(ml), sr(void 0))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        If = (() => {
          class t {
            constructor(t, e, n) {
              this.router = t, this.route = e, this.locationStrategy = n, this.commands = [], this.onChanges = new C, this.subscription = t.events.subscribe(t => {
                t instanceof nh && this.updateTargetUrlAndHref()
              })
            }
            set routerLink(t) {
              this.commands = null != t ? Array.isArray(t) ? t : [t] : []
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this)
            }
            ngOnDestroy() {
              this.subscription.unsubscribe()
            }
            onClick(t, e, n, r, i) {
              if (0 !== t || e || n || r || i) return !0;
              if ("string" == typeof this.target && "_self" != this.target) return !0;
              const s = {
                skipLocationChange: Pf(this.skipLocationChange),
                replaceUrl: Pf(this.replaceUrl),
                state: this.state
              };
              return this.router.navigateByUrl(this.urlTree, s), !1
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree))
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Pf(this.preserveFragment)
              })
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Rf), Ns(ad), Ns(ac))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""]
            ],
            hostVars: 2,
            hostBindings: function (t, e) {
              1 & t && Ws("click", function (t) {
                return e.onClick(t.button, t.ctrlKey, t.shiftKey, t.altKey, t.metaKey)
              }), 2 & t && (uo("href", e.href, yr), Fs("target", e.target))
            },
            inputs: {
              routerLink: "routerLink",
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              state: "state",
              relativeTo: "relativeTo"
            },
            features: [ae]
          }), t
        })();

      function Pf(t) {
        return "" === t || !!t
      }
      let Lf = (() => {
        class t {
          constructor(t, e, n, r, i) {
            this.parentContexts = t, this.location = e, this.resolver = n, this.changeDetector = i, this.activated = null, this._activatedRoute = null, this.activateEvents = new Pa, this.deactivateEvents = new Pa, this.name = r || yh, t.onChildOutletCreated(this.name, this)
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name)
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t && t.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.resolver || null))
            }
          }
          get isActivated() {
            return !!this.activated
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute
          }
          get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return this.activated = null, this._activatedRoute = null, t
          }
          attach(t, e) {
            this.activated = t, this._activatedRoute = e, this.location.insert(t.hostView)
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
            }
          }
          activateWith(t, e) {
            if (this.isActivated) throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(t._futureSnapshot.routeConfig.component),
              r = this.parentContexts.getOrCreateContext(this.name).children,
              i = new Df(t, r, this.location.injector);
            this.activated = this.location.createComponent(n, this.location.length, i), this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(Ns(Cf), Ns(ga), Ns(Ro), ("name", function (t, e) {
            const n = t.attrs;
            if (n) {
              const t = n.length;
              let r = 0;
              for (; r < t;) {
                const i = n[r];
                if (hn(i)) break;
                if (0 === i) r += 2;
                else if ("number" == typeof i)
                  for (r++; r < t && "string" == typeof n[r];) r++;
                else {
                  if (i === e) return n[r + 1];
                  r += 2
                }
              }
            }
            return null
          }(Re(), "name")), Ns(ia))
        }, t.\u0275dir = Gt({
          type: t,
          selectors: [
            ["router-outlet"]
          ],
          outputs: {
            activateEvents: "activate",
            deactivateEvents: "deactivate"
          },
          exportAs: ["outlet"]
        }), t
      })();
      class Df {
        constructor(t, e, n) {
          this.route = t, this.childContexts = e, this.parent = n
        }
        get(t, e) {
          return t === ad ? this.route : t === Cf ? this.childContexts : this.parent.get(t, e)
        }
      }
      class Ff {}
      class Mf {
        preload(t, e) {
          return ou(null)
        }
      }
      let Nf = (() => {
          class t {
            constructor(t, e, n, r, i) {
              this.router = t, this.injector = r, this.preloadingStrategy = i, this.loader = new wf(e, n, e => t.triggerEvent(new uh(e)), e => t.triggerEvent(new hh(e)))
            }
            setUpPreloading() {
              this.subscription = this.router.events.pipe(Ru(t => t instanceof nh), Mu(() => this.preload())).subscribe(() => {})
            }
            preload() {
              const t = this.injector.get(fa);
              return this.processRoutes(t, this.router.config)
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe()
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes))
                } else r.loadChildren && !r.canLoad ? n.push(this.preloadConfig(t, r)) : r.children && n.push(this.processRoutes(t, r.children));
              return M(n).pipe(H(), k(t => {}))
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () => (e._loadedConfig ? ou(e._loadedConfig) : this.loader.load(t.injector, e)).pipe(U(t => (e._loadedConfig = t, this.processRoutes(t.module, t.routes)))))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Rf), sr(Bl), sr(ml), sr(Cs), sr(Ff))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        Vf = (() => {
          class t {
            constructor(t, e, n = {}) {
              this.router = t, this.viewportScroller = e, this.options = n, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, n.scrollPositionRestoration = n.scrollPositionRestoration || "disabled", n.anchorScrolling = n.anchorScrolling || "disabled"
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
            }
            createScrollEvents() {
              return this.router.events.subscribe(t => {
                t instanceof eh ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof nh && (this.lastId = t.id, this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment))
              })
            }
            consumeScrollEvents() {
              return this.router.events.subscribe(t => {
                t instanceof gh && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
              })
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(new gh(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, e))
            }
            ngOnDestroy() {
              this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Rf), sr(Tc), sr(void 0))
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })();
      const jf = new Bn("ROUTER_CONFIGURATION"),
        Uf = new Bn("ROUTER_FORROOT_GUARD"),
        Bf = [dc, {
          provide: Vh,
          useClass: jh
        }, {
          provide: Rf,
          useFactory: function (t, e, n, r, i, s, o, a = {}, l, c) {
            const u = new Rf(null, t, e, n, r, i, s, Sh(o));
            return l && (u.urlHandlingStrategy = l), c && (u.routeReuseStrategy = c),
              function (t, e) {
                t.errorHandler && (e.errorHandler = t.errorHandler), t.malformedUriErrorHandler && (e.malformedUriErrorHandler = t.malformedUriErrorHandler), t.onSameUrlNavigation && (e.onSameUrlNavigation = t.onSameUrlNavigation), t.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = t.paramsInheritanceStrategy), t.relativeLinkResolution && (e.relativeLinkResolution = t.relativeLinkResolution), t.urlUpdateStrategy && (e.urlUpdateStrategy = t.urlUpdateStrategy)
              }(a, u), a.enableTracing && u.events.subscribe(t => {
                var e, n;
                null === (e = console.group) || void 0 === e || e.call(console, `Router Event: ${t.constructor.name}`), console.log(t.toString()), console.log(t), null === (n = console.groupEnd) || void 0 === n || n.call(console)
              }), u
          },
          deps: [Vh, Cf, dc, Cs, Bl, ml, vf, jf, [class {}, new ur],
            [class {}, new ur]
          ]
        }, Cf, {
          provide: ad,
          useFactory: function (t) {
            return t.routerState.root
          },
          deps: [Rf]
        }, {
          provide: Bl,
          useClass: zl
        }, Nf, Mf, class {
          preload(t, e) {
            return e().pipe(Lu(() => ou(null)))
          }
        }, {
          provide: jf,
          useValue: {
            enableTracing: !1
          }
        }];

      function $f() {
        return new Dl("Router", Rf)
      }
      let Hf = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [Bf, Wf(e), {
                  provide: Uf,
                  useFactory: Qf,
                  deps: [
                    [Rf, new ur, new hr]
                  ]
                }, {
                  provide: jf,
                  useValue: n || {}
                }, {
                  provide: ac,
                  useFactory: qf,
                  deps: [Jl, [new cr(cc), new ur], jf]
                }, {
                  provide: Vf,
                  useFactory: zf,
                  deps: [Rf, Tc, jf]
                }, {
                  provide: Ff,
                  useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : Mf
                }, {
                  provide: Dl,
                  multi: !0,
                  useFactory: $f
                },
                [Gf, {
                  provide: Ya,
                  multi: !0,
                  useFactory: Kf,
                  deps: [Gf]
                }, {
                  provide: Yf,
                  useFactory: Zf,
                  deps: [Gf]
                }, {
                  provide: il,
                  multi: !0,
                  useExisting: Yf
                }]
              ]
            }
          }
          static forChild(e) {
            return {
              ngModule: t,
              providers: [Wf(e)]
            }
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Uf, 8), sr(Rf, 8))
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({}), t
      })();

      function zf(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Vf(t, e, n)
      }

      function qf(t, e, n = {}) {
        return n.useHash ? new hc(t, e) : new uc(t, e)
      }

      function Qf(t) {
        return "guarded"
      }

      function Wf(t) {
        return [{
          provide: $n,
          multi: !0,
          useValue: t
        }, {
          provide: vf,
          multi: !0,
          useValue: t
        }]
      }
      let Gf = (() => {
        class t {
          constructor(t) {
            this.injector = t, this.initNavigation = !1, this.resultOfPreactivationDone = new C
          }
          appInitializer() {
            return this.injector.get(tc, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise(e => t = e),
                n = this.injector.get(Rf),
                r = this.injector.get(jf);
              return "disabled" === r.initialNavigation ? (n.setUpLocationChangeListener(), t(!0)) : "enabled" === r.initialNavigation || "enabledBlocking" === r.initialNavigation ? (n.hooks.afterPreactivation = () => this.initNavigation ? ou(null) : (this.initNavigation = !0, t(!0), this.resultOfPreactivationDone), n.initialNavigation()) : t(!0), e
            })
          }
          bootstrapListener(t) {
            const e = this.injector.get(jf),
              n = this.injector.get(Nf),
              r = this.injector.get(Vf),
              i = this.injector.get(Rf),
              s = this.injector.get(jl);
            t === s.components[0] && ("enabledNonBlocking" !== e.initialNavigation && void 0 !== e.initialNavigation || i.initialNavigation(), n.setUpPreloading(), r.init(), i.resetRootComponentType(s.componentTypes[0]), this.resultOfPreactivationDone.next(null), this.resultOfPreactivationDone.complete())
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Cs))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();

      function Kf(t) {
        return t.appInitializer.bind(t)
      }

      function Zf(t) {
        return t.bootstrapListener.bind(t)
      }
      const Yf = new Bn("Router Initializer"),
        Jf = [{
          path: "home",
          component: (() => {
            class t {}
            return t.\u0275fac = function (e) {
              return new(e || t)
            }, t.\u0275cmp = $t({
              type: t,
              selectors: [
                ["app-home"]
              ],
              decls: 75,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "svg"],
                ["routerLink", "../home-en"],
                ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 48 48", 1, "svg_img"],
                ["cx", "24", "cy", "24", "r", "20", "width", "50", "fill", "#669df6"],
                ["fill", "#317be4", "d", "M42,27v5.73C38.76,39.4,31.92,44,24,44C12.95,44,4,35.05,4,24c0-2.09,0.32-4.1,0.92-6H33\tC37.97,18,42,22.03,42,27z"],
                ["fill", "#fff", "d", "M28,18v-2h-6v-2h-2v2h-7v2h10.499c-0.869,1.986-1.955,3.852-3.256,5.557\tc-0.718-0.821-1.433-1.646-2.112-2.495l-1.35-1.688l-1.562,1.25l1.35,1.688c0.766,0.957,1.569,1.89,2.382,2.813\tc-1.332,1.495-2.833,2.847-4.489,4.03l-0.047,0.034l1.213,1.59c1.719-1.228,3.281-2.63,4.676-4.174\tc0.657,0.708,1.309,1.423,1.988,2.102l1.414-1.414c-0.72-0.72-1.414-1.475-2.109-2.229c1.675-2.136,3.039-4.511,4.067-7.064H28z"],
                ["fill", "#fff", "d", "M33.71,34.5h2.16L30.67,22h-2.34l-5.2,12.5h2.16l1.459-3.5h5.502L33.71,34.5z M27.583,29l1.917-4.6\tl1.917,4.6H27.583z"],
                [1, "grid-wrapper"],
                [1, "grid-item"],
                [1, "grid-text"],
                ["href", "tel:380731419739", 1, "tel"],
                ["href", "https://linkedin.com/in/vadym-korol-9761281b7/", 1, "linkedin"],
                [1, "grid-title"],
                [1, "site"],
                ["href", "https://korolvv.org"],
                ["href", "https://github.com/korolvv/pulse"],
                ["href", "https://github.com/korolvv/food"],
                ["href", "https://github.com/korolvv/travel"],
                ["href", "https://github.com/korolvv/uber"],
                ["href", "https://github.com/korolvv/landing_bootstrap"]
              ],
              template: function (t, e) {
                1 & t && (Us(0, "body"), Us(1, "div", 0), Us(2, "div", 1), Us(3, "a", 2), Xe(), Us(4, "svg", 3), $s(5, "circle", 4), $s(6, "path", 5), $s(7, "path", 6), $s(8, "path", 7), Bs(), Bs(), Bs(), tn(), Us(9, "div", 8), Us(10, "div", 9), Us(11, "h2"), ao(12, "\u041f\u0440\u043e\u0444\u0438\u043b\u044c"), Bs(), Us(13, "div", 10), ao(14, " \u041e \u0441\u0435\u0431\u0435: \u041a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0431\u0435\u043b\u044c\u043d\u044b\u0439, \u0441\u0442\u0440\u0435\u0441\u0441\u043e\u0443\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u044b\u0439 \u0438 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a, \u0443\u043c\u0435\u044e \u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c \u0432 \u043a\u043e\u043c\u0430\u043d\u0434\u0435. \u0413\u043e\u0442\u043e\u0432 \u0431\u044b\u0441\u0442\u0440\u043e \u0443\u0447\u0438\u0442\u044c\u0441\u044f \u0438 \u043f\u0440\u0438\u043e\u0431\u0440\u0435\u0442\u0430\u0442\u044c \u043d\u0430\u0432\u044b\u043a\u0438 \u0438 \u043e\u0441\u0432\u0430\u0438\u0432\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438. \u041c\u043e\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d \u043d\u0430 \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u043e\u0435 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435. "), Bs(), Us(15, "h2"), ao(16, "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"), Bs(), Us(17, "a", 11), ao(18, "+38 (073)-141-97-39"), Bs(), Us(19, "a", 12), ao(20, "LinkedIn"), Bs(), Us(21, "h2"), ao(22, "\u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435"), Bs(), Us(23, "div", 13), ao(24, "\u0421\u0415\u041d\u0422\u042f\u0411\u0420\u042c 2017 - \u0418\u042e\u041d\u042c 2021"), Bs(), Us(25, "div", 10), ao(26, "\u041d\u0430\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u0432\u0438\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442 \u0421\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c: \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u0438\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u043d\u043e\u0433\u043e \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0435\u043d\u0438\u044f"), Bs(), Us(27, "div", 13), ao(28, "2020 - 2021"), Bs(), Us(29, "div", 10), ao(30, "\u041a\u0443\u0440\u0441\u044b \u043d\u0430 Udemy"), Bs(), Bs(), Us(31, "div", 9), Us(32, "h2"), ao(33, "\u0421\u0430\u0439\u0442-\u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e"), Bs(), Us(34, "h2", 14), Us(35, "a", 15), ao(36, "https://korolvv.org"), Bs(), Bs(), Us(37, "h2"), ao(38, "\u0418\u0441\u0445\u043e\u0434\u043d\u0438\u043a\u0438 \u043a\u043e\u0434\u0430"), Bs(), Us(39, "ul"), Us(40, "li"), Us(41, "a", 16), ao(42, "https://github.com/korolvv/pulse"), Bs(), Bs(), Us(43, "li"), Us(44, "a", 17), ao(45, "https://github.com/korolvv/food"), Bs(), Bs(), Us(46, "li"), Us(47, "a", 18), ao(48, "https://github.com/korolvv/travel"), Bs(), Bs(), Us(49, "li"), Us(50, "a", 19), ao(51, "https://github.com/korolvv/uber"), Bs(), Bs(), Us(52, "li"), Us(53, "a", 20), ao(54, "https://github.com/korolvv/landing_bootstrap"), Bs(), Bs(), Bs(), Us(55, "h2"), ao(56, "\u042f\u0437\u044b\u043a\u0438"), Bs(), Us(57, "ul"), Us(58, "li"), ao(59, "\u0423\u043a\u0440\u0430\u0438\u043d\u0441\u043a\u0438\u0439, \u0440\u0443\u0441\u0441\u043a\u0438\u0439 - \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u043e, \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439 - pre-intermediate"), Bs(), Bs(), Us(60, "h2"), ao(61, "\u041d\u0430\u0432\u044b\u043a\u0438"), Bs(), Us(62, "ul"), Us(63, "li"), ao(64, "HTML & CSS"), Bs(), Us(65, "li"), ao(66, "JavaScript"), Bs(), Us(67, "li"), ao(68, "SASS|SCSS"), Bs(), Us(69, "li"), ao(70, "Git"), Bs(), Us(71, "li"), ao(72, "Gulp"), Bs(), Us(73, "li"), ao(74, "React"), Bs(), Bs(), Bs(), Bs(), Bs(), Bs())
              },
              directives: [If],
              styles: ['@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");*[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;box-sizing:border-box}body[_ngcontent-%COMP%]{padding-top:100px}.container[_ngcontent-%COMP%]{position:relative;max-width:1140px;margin:0 auto;background-color:#cebe65;box-shadow:0 0 20px 2px #474747;padding:30px 20px}.grid-wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,450px);grid-column-gap:100px;column-gap:100px}.grid-item[_ngcontent-%COMP%], .grid-wrapper[_ngcontent-%COMP%]{justify-content:center}h2[_ngcontent-%COMP%]{font-size:28px;font-weight:700}.grid-text[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center}.grid-text[_ngcontent-%COMP%]{font-size:18px}.linkedin[_ngcontent-%COMP%], .tel[_ngcontent-%COMP%]{display:block}.grid-title[_ngcontent-%COMP%]{margin:20px 0;text-align:center}.svg[_ngcontent-%COMP%]{padding:15px;position:absolute;top:0;left:100%;transform:translateX(-100%)}li[_ngcontent-%COMP%]{list-style-type:disclosure-closed}a[_ngcontent-%COMP%], li[_ngcontent-%COMP%]{text-align:center}a[_ngcontent-%COMP%]{display:block}.svg[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:50px;height:50px}.svg_img[_ngcontent-%COMP%]:hover{transform:scale(1.2);transition:all .5s}']
            }), t
          })()
        }, {
          path: "home-en",
          component: (() => {
            class t {}
            return t.\u0275fac = function (e) {
              return new(e || t)
            }, t.\u0275cmp = $t({
              type: t,
              selectors: [
                ["app-homeen"]
              ],
              decls: 75,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "svg"],
                ["routerLink", "../home"],
                ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 48 48", 1, "svg_img"],
                ["cx", "24", "cy", "24", "r", "20", "width", "50", "fill", "#669df6"],
                ["fill", "#317be4", "d", "M42,27v5.73C38.76,39.4,31.92,44,24,44C12.95,44,4,35.05,4,24c0-2.09,0.32-4.1,0.92-6H33\tC37.97,18,42,22.03,42,27z"],
                ["fill", "#fff", "d", "M28,18v-2h-6v-2h-2v2h-7v2h10.499c-0.869,1.986-1.955,3.852-3.256,5.557\tc-0.718-0.821-1.433-1.646-2.112-2.495l-1.35-1.688l-1.562,1.25l1.35,1.688c0.766,0.957,1.569,1.89,2.382,2.813\tc-1.332,1.495-2.833,2.847-4.489,4.03l-0.047,0.034l1.213,1.59c1.719-1.228,3.281-2.63,4.676-4.174\tc0.657,0.708,1.309,1.423,1.988,2.102l1.414-1.414c-0.72-0.72-1.414-1.475-2.109-2.229c1.675-2.136,3.039-4.511,4.067-7.064H28z"],
                ["fill", "#fff", "d", "M33.71,34.5h2.16L30.67,22h-2.34l-5.2,12.5h2.16l1.459-3.5h5.502L33.71,34.5z M27.583,29l1.917-4.6\tl1.917,4.6H27.583z"],
                [1, "grid-wrapper"],
                [1, "grid-item"],
                [1, "grid-text"],
                ["href", "tel:380731419739", 1, "tel"],
                ["href", "https://linkedin.com/in/vadym-korol-9761281b7/", 1, "linkedin"],
                [1, "grid-title"],
                [1, "site"],
                ["href", "https://korolvv.org"],
                ["href", "https://github.com/korolvv/pulse"],
                ["href", "https://github.com/korolvv/food"],
                ["href", "https://github.com/korolvv/travel"],
                ["href", "https://github.com/korolvv/uber"],
                ["href", "https://github.com/korolvv/landing_bootstrap"]
              ],
              template: function (t, e) {
                1 & t && (Us(0, "body"), Us(1, "div", 0), Us(2, "div", 1), Us(3, "a", 2), Xe(), Us(4, "svg", 3), $s(5, "circle", 4), $s(6, "path", 5), $s(7, "path", 6), $s(8, "path", 7), Bs(), Bs(), Bs(), tn(), Us(9, "div", 8), Us(10, "div", 9), Us(11, "h2"), ao(12, "PROFILE"), Bs(), Us(13, "div", 10), ao(14, " About me: I am a sociable, stress-resistant and responsible employee. I enjoy working in a team environment and am keen to learn and acquire new skills and master new technologies. I have great motivation for continuous development. You can find more information on website: en.korolvv.org "), Bs(), Us(15, "h2"), ao(16, "CONTACTS"), Bs(), Us(17, "a", 11), ao(18, "+38 (073)-141-97-39"), Bs(), Us(19, "a", 12), ao(20, "LinkedIn"), Bs(), Us(21, "h2"), ao(22, "EDUCATION"), Bs(), Us(23, "div", 13), ao(24, "SEPTEMBER 2017 - JUNE 2021"), Bs(), Us(25, "div", 10), ao(26, 'National Aviation University Branch "Engineering of software"'), Bs(), Us(27, "div", 13), ao(28, "2020 - 2021"), Bs(), Us(29, "div", 10), ao(30, "Udemy courses"), Bs(), Bs(), Us(31, "div", 9), Us(32, "h2"), ao(33, "SITE-PORTFOLIO"), Bs(), Us(34, "h2", 14), Us(35, "a", 15), ao(36, "https://en.korolvv.org"), Bs(), Bs(), Us(37, "h2"), ao(38, "SOURCE CODE"), Bs(), Us(39, "ul"), Us(40, "li"), Us(41, "a", 16), ao(42, "https://github.com/korolvv/pulse"), Bs(), Bs(), Us(43, "li"), Us(44, "a", 17), ao(45, "https://github.com/korolvv/food"), Bs(), Bs(), Us(46, "li"), Us(47, "a", 18), ao(48, "https://github.com/korolvv/travel"), Bs(), Bs(), Us(49, "li"), Us(50, "a", 19), ao(51, "https://github.com/korolvv/uber"), Bs(), Bs(), Us(52, "li"), Us(53, "a", 20), ao(54, "https://github.com/korolvv/landing_bootstrap"), Bs(), Bs(), Bs(), Us(55, "h2"), ao(56, "LANGUAGES"), Bs(), Us(57, "ul"), Us(58, "li"), ao(59, "English - pre-intermediate, Ukrainian - high level, Russian - high level"), Bs(), Bs(), Us(60, "h2"), ao(61, "SKILLS"), Bs(), Us(62, "ul"), Us(63, "li"), ao(64, "HTML & CSS"), Bs(), Us(65, "li"), ao(66, "JavaScript"), Bs(), Us(67, "li"), ao(68, "SASS|SCSS"), Bs(), Us(69, "li"), ao(70, "Git"), Bs(), Us(71, "li"), ao(72, "Gulp"), Bs(), Us(73, "li"), ao(74, "React"), Bs(), Bs(), Bs(), Bs(), Bs(), Bs())
              },
              directives: [If],
              styles: ['@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");*[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;box-sizing:border-box}body[_ngcontent-%COMP%]{padding-top:100px}.container[_ngcontent-%COMP%]{position:relative;max-width:1140px;margin:0 auto;background-color:#cebe65;box-shadow:0 0 20px 2px #474747;padding:30px 20px}.grid-wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,450px);grid-column-gap:100px;column-gap:100px}.grid-item[_ngcontent-%COMP%], .grid-wrapper[_ngcontent-%COMP%]{justify-content:center}h2[_ngcontent-%COMP%]{font-size:28px;font-weight:700}.grid-text[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center}.grid-text[_ngcontent-%COMP%]{font-size:18px}.linkedin[_ngcontent-%COMP%], .tel[_ngcontent-%COMP%]{display:block}.grid-title[_ngcontent-%COMP%]{margin:20px 0;text-align:center}.svg[_ngcontent-%COMP%]{padding:15px;position:absolute;top:0;left:100%;transform:translateX(-100%)}li[_ngcontent-%COMP%]{list-style-type:disclosure-closed}a[_ngcontent-%COMP%], li[_ngcontent-%COMP%]{text-align:center}a[_ngcontent-%COMP%]{display:block}.svg[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:50px;height:50px}.svg_img[_ngcontent-%COMP%]:hover{transform:scale(1.2);transition:all .5s}']
            }), t
          })()
        }];
      let Xf, tp = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          imports: [
            [Hf.forRoot(Jf)], Hf
          ]
        }), t
      })();

      function ep(t) {
        return null != t && "false" != `${t}`
      }

      function np(t) {
        return t instanceof Do ? t.nativeElement : t
      }
      try {
        Xf = "undefined" != typeof Intl && Intl.v8BreakIterator
      } catch (yw) {
        Xf = !1
      }
      let rp, ip = (() => {
          class t {
            constructor(t) {
              this._platformId = t, this.isBrowser = this._platformId ? Ec(this._platformId) : "object" == typeof document && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !Xf) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(rl))
          }, t.\u0275prov = ht({
            factory: function () {
              return new t(sr(rl))
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        sp = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({}), t
        })();
      const op = ["color", "button", "checkbox", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];

      function ap() {
        if (rp) return rp;
        if ("object" != typeof document || !document) return rp = new Set(op), rp;
        let t = document.createElement("input");
        return rp = new Set(op.filter(e => (t.setAttribute("type", e), t.type === e))), rp
      }
      let lp, cp;

      function up(t) {
        return function () {
          if (null == lp && "undefined" != typeof window) try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
              get: () => lp = !0
            }))
          } finally {
            lp = lp || !1
          }
          return lp
        }() ? t : !!t.capture
      }
      class hp extends h {
        constructor(t, e) {
          super()
        }
        schedule(t, e = 0) {
          return this
        }
      }
      class dp extends hp {
        constructor(t, e) {
          super(t, e), this.scheduler = t, this.work = e, this.pending = !1
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            r = this.scheduler;
          return null != n && (this.id = this.recycleAsyncId(r, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(r, this.id, e), this
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n)
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e)
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
        }
        _execute(t, e) {
          let n, r = !1;
          try {
            this.work(t)
          } catch (i) {
            r = !0, n = !!i && i || new Error(i)
          }
          if (r) return this.unsubscribe(), n
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            r = n.indexOf(this);
          this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== r && n.splice(r, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
        }
      }
      let fp = (() => {
        class t {
          constructor(e, n = t.now) {
            this.SchedulerAction = e, this.now = n
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e)
          }
        }
        return t.now = () => Date.now(), t
      })();
      class pp extends fp {
        constructor(t, e = fp.now) {
          super(t, () => pp.delegate && pp.delegate !== this ? pp.delegate.now() : e()), this.actions = [], this.active = !1, this.scheduled = void 0
        }
        schedule(t, e = 0, n) {
          return pp.delegate && pp.delegate !== this ? pp.delegate.schedule(t, e, n) : super.schedule(t, e, n)
        }
        flush(t) {
          const {
            actions: e
          } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if (n = t.execute(t.state, t.delay)) break
          } while (t = e.shift());
          if (this.active = !1, n) {
            for (; t = e.shift();) t.unsubscribe();
            throw n
          }
        }
      }
      const mp = new pp(dp);
      class gp {
        constructor(t, e) {
          this.dueTime = t, this.scheduler = e
        }
        call(t, e) {
          return e.subscribe(new yp(t, this.dueTime, this.scheduler))
        }
      }
      class yp extends p {
        constructor(t, e, n) {
          super(t), this.dueTime = e, this.scheduler = n, this.debouncedSubscription = null, this.lastValue = null, this.hasValue = !1
        }
        _next(t) {
          this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(_p, this.dueTime, this))
        }
        _complete() {
          this.debouncedNext(), this.destination.complete()
        }
        debouncedNext() {
          if (this.clearDebounce(), this.hasValue) {
            const {
              lastValue: t
            } = this;
            this.lastValue = null, this.hasValue = !1, this.destination.next(t)
          }
        }
        clearDebounce() {
          const t = this.debouncedSubscription;
          null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
        }
      }

      function _p(t) {
        t.debouncedNext()
      }
      let bp = (() => {
          class t {
            create(t) {
              return "undefined" == typeof MutationObserver ? null : new MutationObserver(t)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275prov = ht({
            factory: function () {
              return new t
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        vp = (() => {
          class t {
            constructor(t) {
              this._mutationObserverFactory = t, this._observedElements = new Map
            }
            ngOnDestroy() {
              this._observedElements.forEach((t, e) => this._cleanupObserver(e))
            }
            observe(t) {
              const e = np(t);
              return new _(t => {
                const n = this._observeElement(e).subscribe(t);
                return () => {
                  n.unsubscribe(), this._unobserveElement(e)
                }
              })
            }
            _observeElement(t) {
              if (this._observedElements.has(t)) this._observedElements.get(t).count++;
              else {
                const e = new C,
                  n = this._mutationObserverFactory.create(t => e.next(t));
                n && n.observe(t, {
                  characterData: !0,
                  childList: !0,
                  subtree: !0
                }), this._observedElements.set(t, {
                  observer: n,
                  stream: e,
                  count: 1
                })
              }
              return this._observedElements.get(t).stream
            }
            _unobserveElement(t) {
              this._observedElements.has(t) && (this._observedElements.get(t).count--, this._observedElements.get(t).count || this._cleanupObserver(t))
            }
            _cleanupObserver(t) {
              if (this._observedElements.has(t)) {
                const {
                  observer: e,
                  stream: n
                } = this._observedElements.get(t);
                e && e.disconnect(), n.complete(), this._observedElements.delete(t)
              }
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(bp))
          }, t.\u0275prov = ht({
            factory: function () {
              return new t(sr(bp))
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        wp = (() => {
          class t {
            constructor(t, e, n) {
              this._contentObserver = t, this._elementRef = e, this._ngZone = n, this.event = new Pa, this._disabled = !1, this._currentSubscription = null
            }
            get disabled() {
              return this._disabled
            }
            set disabled(t) {
              this._disabled = ep(t), this._disabled ? this._unsubscribe() : this._subscribe()
            }
            get debounce() {
              return this._debounce
            }
            set debounce(t) {
              this._debounce = function (t, e = 0) {
                return function (t) {
                  return !isNaN(parseFloat(t)) && !isNaN(Number(t))
                }(t) ? Number(t) : e
              }(t), this._subscribe()
            }
            ngAfterContentInit() {
              this._currentSubscription || this.disabled || this._subscribe()
            }
            ngOnDestroy() {
              this._unsubscribe()
            }
            _subscribe() {
              this._unsubscribe();
              const t = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (this.debounce ? t.pipe(function (t, e = mp) {
                  return n => n.lift(new gp(t, e))
                }(this.debounce)) : t).subscribe(this.event)
              })
            }
            _unsubscribe() {
              var t;
              null === (t = this._currentSubscription) || void 0 === t || t.unsubscribe()
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(vp), Ns(Do), Ns(_l))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "cdkObserveContent", ""]
            ],
            inputs: {
              disabled: ["cdkObserveContentDisabled", "disabled"],
              debounce: "debounce"
            },
            outputs: {
              event: "cdkObserveContent"
            },
            exportAs: ["cdkObserveContent"]
          }), t
        })(),
        xp = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            providers: [bp]
          }), t
        })();

      function Cp(t) {
        return 0 === t.buttons
      }

      function Sp(t) {
        const e = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0];
        return !(!e || -1 !== e.identifier || null != e.radiusX && 1 !== e.radiusX || null != e.radiusY && 1 !== e.radiusY)
      }
      "undefined" != typeof Element && Element;
      const Ep = new Bn("cdk-focus-monitor-default-options"),
        kp = up({
          passive: !0,
          capture: !0
        });
      let Tp = (() => {
        class t {
          constructor(t, e, n, r) {
            this._ngZone = t, this._platform = e, this._origin = null, this._windowFocused = !1, this._elementInfo = new Map, this._monitoredElementCount = 0, this._rootNodeFocusListenerCount = new Map, this._documentKeydownListener = () => {
              this._lastTouchTarget = null, this._setOriginForCurrentEventQueue("keyboard")
            }, this._documentMousedownListener = t => {
              if (!this._lastTouchTarget) {
                const e = Cp(t) ? "keyboard" : "mouse";
                this._setOriginForCurrentEventQueue(e)
              }
            }, this._documentTouchstartListener = t => {
              Sp(t) ? this._lastTouchTarget || this._setOriginForCurrentEventQueue("keyboard") : (null != this._touchTimeoutId && clearTimeout(this._touchTimeoutId), this._lastTouchTarget = Ap(t), this._touchTimeoutId = setTimeout(() => this._lastTouchTarget = null, 650))
            }, this._windowFocusListener = () => {
              this._windowFocused = !0, this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = !1)
            }, this._rootNodeFocusAndBlurListener = t => {
              const e = Ap(t),
                n = "focus" === t.type ? this._onFocus : this._onBlur;
              for (let r = e; r; r = r.parentElement) n.call(this, t, r)
            }, this._document = n, this._detectionMode = (null == r ? void 0 : r.detectionMode) || 0
          }
          monitor(t, e = !1) {
            const n = np(t);
            if (!this._platform.isBrowser || 1 !== n.nodeType) return ou(null);
            const r = function (t) {
                if (function () {
                    if (null == cp) {
                      const t = "undefined" != typeof document ? document.head : null;
                      cp = !(!t || !t.createShadowRoot && !t.attachShadow)
                    }
                    return cp
                  }()) {
                  const e = t.getRootNode ? t.getRootNode() : null;
                  if ("undefined" != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot) return e
                }
                return null
              }(n) || this._getDocument(),
              i = this._elementInfo.get(n);
            if (i) return e && (i.checkChildren = !0), i.subject;
            const s = {
              checkChildren: e,
              subject: new C,
              rootNode: r
            };
            return this._elementInfo.set(n, s), this._registerGlobalListeners(s), s.subject
          }
          stopMonitoring(t) {
            const e = np(t),
              n = this._elementInfo.get(e);
            n && (n.subject.complete(), this._setClasses(e), this._elementInfo.delete(e), this._removeGlobalListeners(n))
          }
          focusVia(t, e, n) {
            const r = np(t);
            r === this._getDocument().activeElement ? this._getClosestElementsInfo(r).forEach(([t, n]) => this._originChanged(t, e, n)) : (this._setOriginForCurrentEventQueue(e), "function" == typeof r.focus && r.focus(n))
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, e) => this.stopMonitoring(e))
          }
          _getDocument() {
            return this._document || document
          }
          _getWindow() {
            return this._getDocument().defaultView || window
          }
          _toggleClass(t, e, n) {
            n ? t.classList.add(e) : t.classList.remove(e)
          }
          _getFocusOrigin(t) {
            return this._origin ? this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : this._wasCausedByTouch(t) ? "touch" : "program"
          }
          _setClasses(t, e) {
            this._toggleClass(t, "cdk-focused", !!e), this._toggleClass(t, "cdk-touch-focused", "touch" === e), this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e), this._toggleClass(t, "cdk-mouse-focused", "mouse" === e), this._toggleClass(t, "cdk-program-focused", "program" === e)
          }
          _setOriginForCurrentEventQueue(t) {
            this._ngZone.runOutsideAngular(() => {
              this._origin = t, 0 === this._detectionMode && (this._originTimeoutId = setTimeout(() => this._origin = null, 1))
            })
          }
          _wasCausedByTouch(t) {
            const e = Ap(t);
            return this._lastTouchTarget instanceof Node && e instanceof Node && (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
          }
          _onFocus(t, e) {
            const n = this._elementInfo.get(e);
            n && (n.checkChildren || e === Ap(t)) && this._originChanged(e, this._getFocusOrigin(t), n)
          }
          _onBlur(t, e) {
            const n = this._elementInfo.get(e);
            !n || n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget) || (this._setClasses(e), this._emitOrigin(n.subject, null))
          }
          _emitOrigin(t, e) {
            this._ngZone.run(() => t.next(e))
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const e = t.rootNode,
              n = this._rootNodeFocusListenerCount.get(e) || 0;
            n || this._ngZone.runOutsideAngular(() => {
              e.addEventListener("focus", this._rootNodeFocusAndBlurListener, kp), e.addEventListener("blur", this._rootNodeFocusAndBlurListener, kp)
            }), this._rootNodeFocusListenerCount.set(e, n + 1), 1 == ++this._monitoredElementCount && this._ngZone.runOutsideAngular(() => {
              const t = this._getDocument(),
                e = this._getWindow();
              t.addEventListener("keydown", this._documentKeydownListener, kp), t.addEventListener("mousedown", this._documentMousedownListener, kp), t.addEventListener("touchstart", this._documentTouchstartListener, kp), e.addEventListener("focus", this._windowFocusListener)
            })
          }
          _removeGlobalListeners(t) {
            const e = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(e)) {
              const t = this._rootNodeFocusListenerCount.get(e);
              t > 1 ? this._rootNodeFocusListenerCount.set(e, t - 1) : (e.removeEventListener("focus", this._rootNodeFocusAndBlurListener, kp), e.removeEventListener("blur", this._rootNodeFocusAndBlurListener, kp), this._rootNodeFocusListenerCount.delete(e))
            }
            if (!--this._monitoredElementCount) {
              const t = this._getDocument(),
                e = this._getWindow();
              t.removeEventListener("keydown", this._documentKeydownListener, kp), t.removeEventListener("mousedown", this._documentMousedownListener, kp), t.removeEventListener("touchstart", this._documentTouchstartListener, kp), e.removeEventListener("focus", this._windowFocusListener), clearTimeout(this._windowFocusTimeoutId), clearTimeout(this._touchTimeoutId), clearTimeout(this._originTimeoutId)
            }
          }
          _originChanged(t, e, n) {
            this._setClasses(t, e), this._emitOrigin(n.subject, e), this._lastFocusOrigin = e
          }
          _getClosestElementsInfo(t) {
            const e = [];
            return this._elementInfo.forEach((n, r) => {
              (r === t || n.checkChildren && r.contains(t)) && e.push([r, n])
            }), e
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(_l), sr(ip), sr(Yl, 8), sr(Ep, 8))
        }, t.\u0275prov = ht({
          factory: function () {
            return new t(sr(_l), sr(ip), sr(Yl, 8), sr(Ep, 8))
          },
          token: t,
          providedIn: "root"
        }), t
      })();

      function Ap(t) {
        return t.composedPath ? t.composedPath()[0] : t.target
      }
      const Op = "cdk-high-contrast-black-on-white",
        Rp = "cdk-high-contrast-white-on-black",
        Ip = "cdk-high-contrast-active";
      let Pp = (() => {
        class t {
          constructor(t, e) {
            this._platform = t, this._document = e
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const t = this._document.createElement("div");
            t.style.backgroundColor = "rgb(1,2,3)", t.style.position = "absolute", this._document.body.appendChild(t);
            const e = this._document.defaultView || window,
              n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
              r = (n && n.backgroundColor || "").replace(/ /g, "");
            switch (this._document.body.removeChild(t), r) {
              case "rgb(0,0,0)":
                return 2;
              case "rgb(255,255,255)":
                return 1
            }
            return 0
          }
          _applyBodyHighContrastModeCssClasses() {
            if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
              const t = this._document.body.classList;
              t.remove(Ip), t.remove(Op), t.remove(Rp), this._hasCheckedHighContrastMode = !0;
              const e = this.getHighContrastMode();
              1 === e ? (t.add(Ip), t.add(Op)) : 2 === e && (t.add(Ip), t.add(Rp))
            }
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(ip), sr(Yl))
        }, t.\u0275prov = ht({
          factory: function () {
            return new t(sr(ip), sr(Yl))
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      const Lp = new Bn("cdk-dir-doc", {
        providedIn: "root",
        factory: function () {
          return or(Yl)
        }
      });
      let Dp = (() => {
          class t {
            constructor(t) {
              if (this.value = "ltr", this.change = new Pa, t) {
                const e = t.documentElement ? t.documentElement.dir : null,
                  n = (t.body ? t.body.dir : null) || e;
                this.value = "ltr" === n || "rtl" === n ? n : "ltr"
              }
            }
            ngOnDestroy() {
              this.change.complete()
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(Lp, 8))
          }, t.\u0275prov = ht({
            factory: function () {
              return new t(sr(Lp, 8))
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        Fp = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({}), t
        })();
      const Mp = new Vo("12.0.3");
      class Np {}
      const Vp = "*";

      function jp(t, e) {
        return {
          type: 7,
          name: t,
          definitions: e,
          options: {}
        }
      }

      function Up(t, e = null) {
        return {
          type: 4,
          styles: e,
          timings: t
        }
      }

      function Bp(t, e = null) {
        return {
          type: 2,
          steps: t,
          options: e
        }
      }

      function $p(t) {
        return {
          type: 6,
          styles: t,
          offset: null
        }
      }

      function Hp(t, e, n) {
        return {
          type: 0,
          name: t,
          styles: e,
          options: n
        }
      }

      function zp(t, e, n = null) {
        return {
          type: 1,
          expr: t,
          animation: e,
          options: n
        }
      }

      function qp(t) {
        Promise.resolve(null).then(t)
      }
      class Qp {
        constructor(t = 0, e = 0) {
          this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = t + e
        }
        _onFinish() {
          this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
        }
        onStart(t) {
          this._onStartFns.push(t)
        }
        onDone(t) {
          this._onDoneFns.push(t)
        }
        onDestroy(t) {
          this._onDestroyFns.push(t)
        }
        hasStarted() {
          return this._started
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
        }
        triggerMicrotask() {
          qp(() => this._onFinish())
        }
        _onStart() {
          this._onStartFns.forEach(t => t()), this._onStartFns = []
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish()
        }
        destroy() {
          this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
        }
        reset() {
          this._started = !1
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), e.length = 0
        }
      }
      class Wp {
        constructor(t) {
          this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = t;
          let e = 0,
            n = 0,
            r = 0;
          const i = this.players.length;
          0 == i ? qp(() => this._onFinish()) : this.players.forEach(t => {
            t.onDone(() => {
              ++e == i && this._onFinish()
            }), t.onDestroy(() => {
              ++n == i && this._onDestroy()
            }), t.onStart(() => {
              ++r == i && this._onStart()
            })
          }), this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0)
        }
        _onFinish() {
          this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
        }
        init() {
          this.players.forEach(t => t.init())
        }
        onStart(t) {
          this._onStartFns.push(t)
        }
        _onStart() {
          this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
        }
        onDone(t) {
          this._onDoneFns.push(t)
        }
        onDestroy(t) {
          this._onDestroyFns.push(t)
        }
        hasStarted() {
          return this._started
        }
        play() {
          this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play())
        }
        pause() {
          this.players.forEach(t => t.pause())
        }
        restart() {
          this.players.forEach(t => t.restart())
        }
        finish() {
          this._onFinish(), this.players.forEach(t => t.finish())
        }
        destroy() {
          this._onDestroy()
        }
        _onDestroy() {
          this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
        }
        reset() {
          this.players.forEach(t => t.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach(t => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n)
          })
        }
        getPosition() {
          const t = this.players.reduce((t, e) => null === t || e.totalTime > t.totalTime ? e : t, null);
          return null != t ? t.getPosition() : 0
        }
        beforeDestroy() {
          this.players.forEach(t => {
            t.beforeDestroy && t.beforeDestroy()
          })
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), e.length = 0
        }
      }

      function Gp() {
        return "undefined" != typeof window && void 0 !== window.document
      }

      function Kp() {
        return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
      }

      function Zp(t) {
        switch (t.length) {
          case 0:
            return new Qp;
          case 1:
            return t[0];
          default:
            return new Wp(t)
        }
      }

      function Yp(t, e, n, r, i = {}, s = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (r.forEach(t => {
            const n = t.offset,
              r = n == l,
              u = r && c || {};
            Object.keys(t).forEach(n => {
              let r = n,
                a = t[n];
              if ("offset" !== n) switch (r = e.normalizePropertyName(r, o), a) {
                case "!":
                  a = i[n];
                  break;
                case Vp:
                  a = s[n];
                  break;
                default:
                  a = e.normalizeStyleValue(n, r, a, o)
              }
              u[r] = a
            }), r || a.push(u), c = u, l = n
          }), o.length) {
          const t = "\n - ";
          throw new Error(`Unable to animate due to the following errors:${t}${o.join(t)}`)
        }
        return a
      }

      function Jp(t, e, n, r) {
        switch (e) {
          case "start":
            t.onStart(() => r(n && Xp(n, "start", t)));
            break;
          case "done":
            t.onDone(() => r(n && Xp(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => r(n && Xp(n, "destroy", t)))
        }
      }

      function Xp(t, e, n) {
        const r = n.totalTime,
          i = tm(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, null == r ? t.totalTime : r, !!n.disabled),
          s = t._data;
        return null != s && (i._data = s), i
      }

      function tm(t, e, n, r, i = "", s = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: r,
          phaseName: i,
          totalTime: s,
          disabled: !!o
        }
      }

      function em(t, e, n) {
        let r;
        return t instanceof Map ? (r = t.get(e), r || t.set(e, r = n)) : (r = t[e], r || (r = t[e] = n)), r
      }

      function nm(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)]
      }
      let rm = (t, e) => !1,
        im = (t, e) => !1,
        sm = (t, e, n) => [];
      const om = Kp();
      (om || "undefined" != typeof Element) && (rm = Gp() ? (t, e) => {
        for (; e && e !== document.documentElement;) {
          if (e === t) return !0;
          e = e.parentNode || e.host
        }
        return !1
      } : (t, e) => t.contains(e), im = (() => {
        if (om || Element.prototype.matches) return (t, e) => t.matches(e); {
          const t = Element.prototype,
            e = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
          return e ? (t, n) => e.apply(t, [n]) : im
        }
      })(), sm = (t, e, n) => {
        let r = [];
        if (n) {
          const n = t.querySelectorAll(e);
          for (let t = 0; t < n.length; t++) r.push(n[t])
        } else {
          const n = t.querySelector(e);
          n && r.push(n)
        }
        return r
      });
      let am = null,
        lm = !1;

      function cm(t) {
        am || (am = ("undefined" != typeof document ? document.body : null) || {}, lm = !!am.style && "WebkitAppearance" in am.style);
        let e = !0;
        return am.style && ! function (t) {
          return "ebkit" == t.substring(1, 6)
        }(t) && (e = t in am.style, !e && lm) && (e = "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in am.style), e
      }
      const um = im,
        hm = rm,
        dm = sm;

      function fm(t) {
        const e = {};
        return Object.keys(t).forEach(n => {
          const r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
          e[r] = t[n]
        }), e
      }
      let pm = (() => {
          class t {
            validateStyleProperty(t) {
              return cm(t)
            }
            matchesElement(t, e) {
              return um(t, e)
            }
            containsElement(t, e) {
              return hm(t, e)
            }
            query(t, e, n) {
              return dm(t, e, n)
            }
            computeStyle(t, e, n) {
              return n || ""
            }
            animate(t, e, n, r, i, s = [], o) {
              return new Qp(n, r)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275prov = ht({
            token: t,
            factory: t.\u0275fac
          }), t
        })(),
        mm = (() => {
          class t {}
          return t.NOOP = new pm, t
        })();
      const gm = "ng-enter",
        ym = "ng-leave",
        _m = "ng-trigger",
        bm = ".ng-trigger",
        vm = "ng-animating",
        wm = ".ng-animating";

      function xm(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Cm(parseFloat(e[1]), e[2])
      }

      function Cm(t, e) {
        switch (e) {
          case "s":
            return 1e3 * t;
          default:
            return t
        }
      }

      function Sm(t, e, n) {
        return t.hasOwnProperty("duration") ? t : function (t, e, n) {
          let r, i = 0,
            s = "";
          if ("string" == typeof t) {
            const n = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
            if (null === n) return e.push(`The provided timing value "${t}" is invalid.`), {
              duration: 0,
              delay: 0,
              easing: ""
            };
            r = Cm(parseFloat(n[1]), n[2]);
            const o = n[3];
            null != o && (i = Cm(parseFloat(o), n[4]));
            const a = n[5];
            a && (s = a)
          } else r = t;
          if (!n) {
            let n = !1,
              s = e.length;
            r < 0 && (e.push("Duration values below 0 are not allowed for this animation step."), n = !0), i < 0 && (e.push("Delay values below 0 are not allowed for this animation step."), n = !0), n && e.splice(s, 0, `The provided timing value "${t}" is invalid.`)
          }
          return {
            duration: r,
            delay: i,
            easing: s
          }
        }(t, e, n)
      }

      function Em(t, e = {}) {
        return Object.keys(t).forEach(n => {
          e[n] = t[n]
        }), e
      }

      function km(t, e, n = {}) {
        if (e)
          for (let r in t) n[r] = t[r];
        else Em(t, n);
        return n
      }

      function Tm(t, e, n) {
        return n ? e + ":" + n + ";" : ""
      }

      function Am(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const r = t.style.item(n);
          e += Tm(0, r, t.style.getPropertyValue(r))
        }
        for (const n in t.style) t.style.hasOwnProperty(n) && !n.startsWith("_") && (e += Tm(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t.style[n]));
        t.setAttribute("style", e)
      }

      function Om(t, e, n) {
        t.style && (Object.keys(e).forEach(r => {
          const i = Nm(r);
          n && !n.hasOwnProperty(r) && (n[r] = t.style[i]), t.style[i] = e[r]
        }), Kp() && Am(t))
      }

      function Rm(t, e) {
        t.style && (Object.keys(e).forEach(e => {
          const n = Nm(e);
          t.style[n] = ""
        }), Kp() && Am(t))
      }

      function Im(t) {
        return Array.isArray(t) ? 1 == t.length ? t[0] : Bp(t) : t
      }
      const Pm = new RegExp("{{\\s*(.+?)\\s*}}", "g");

      function Lm(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; n = Pm.exec(t);) e.push(n[1]);
          Pm.lastIndex = 0
        }
        return e
      }

      function Dm(t, e, n) {
        const r = t.toString(),
          i = r.replace(Pm, (t, r) => {
            let i = e[r];
            return e.hasOwnProperty(r) || (n.push(`Please provide a value for the animation param ${r}`), i = ""), i.toString()
          });
        return i == r ? t : i
      }

      function Fm(t) {
        const e = [];
        let n = t.next();
        for (; !n.done;) e.push(n.value), n = t.next();
        return e
      }
      const Mm = /-+([a-z0-9])/g;

      function Nm(t) {
        return t.replace(Mm, (...t) => t[1].toUpperCase())
      }

      function Vm(t, e) {
        return 0 === t || 0 === e
      }

      function jm(t, e, n) {
        const r = Object.keys(n);
        if (r.length && e.length) {
          let s = e[0],
            o = [];
          if (r.forEach(t => {
              s.hasOwnProperty(t) || o.push(t), s[t] = n[t]
            }), o.length)
            for (var i = 1; i < e.length; i++) {
              let n = e[i];
              o.forEach(function (e) {
                n[e] = Bm(t, e)
              })
            }
        }
        return e
      }

      function Um(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(`Unable to resolve animation metadata node #${e.type}`)
        }
      }

      function Bm(t, e) {
        return window.getComputedStyle(t)[e]
      }
      const $m = "*";

      function Hm(t, e) {
        const n = [];
        return "string" == typeof t ? t.split(/\s*,\s*/).forEach(t => function (t, e, n) {
          if (":" == t[0]) {
            const r = function (t, e) {
              switch (t) {
                case ":enter":
                  return "void => *";
                case ":leave":
                  return "* => void";
                case ":increment":
                  return (t, e) => parseFloat(e) > parseFloat(t);
                case ":decrement":
                  return (t, e) => parseFloat(e) < parseFloat(t);
                default:
                  return e.push(`The transition alias value "${t}" is not supported`), "* => *"
              }
            }(t, n);
            if ("function" == typeof r) return void e.push(r);
            t = r
          }
          const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
          if (null == r || r.length < 4) return n.push(`The provided transition expression "${t}" is not supported`), e;
          const i = r[1],
            s = r[2],
            o = r[3];
          e.push(Qm(i, o)), "<" != s[0] || i == $m && o == $m || e.push(Qm(o, i))
        }(t, n, e)) : n.push(t), n
      }
      const zm = new Set(["true", "1"]),
        qm = new Set(["false", "0"]);

      function Qm(t, e) {
        const n = zm.has(t) || qm.has(t),
          r = zm.has(e) || qm.has(e);
        return (i, s) => {
          let o = t == $m || t == i,
            a = e == $m || e == s;
          return !o && n && "boolean" == typeof i && (o = i ? zm.has(t) : qm.has(t)), !a && r && "boolean" == typeof s && (a = s ? zm.has(e) : qm.has(e)), o && a
        }
      }
      const Wm = new RegExp("s*:selfs*,?", "g");

      function Gm(t, e, n) {
        return new Km(t).build(e, n)
      }
      class Km {
        constructor(t) {
          this._driver = t
        }
        build(t, e) {
          const n = new Zm(e);
          return this._resetContextStyleTimingState(n), Um(this, Im(t), n)
        }
        _resetContextStyleTimingState(t) {
          t.currentQuerySelector = "", t.collectedStyles = {}, t.collectedStyles[""] = {}, t.currentTime = 0
        }
        visitTrigger(t, e) {
          let n = e.queryCount = 0,
            r = e.depCount = 0;
          const i = [],
            s = [];
          return "@" == t.name.charAt(0) && e.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), t.definitions.forEach(t => {
            if (this._resetContextStyleTimingState(e), 0 == t.type) {
              const n = t,
                r = n.name;
              r.toString().split(/\s*,\s*/).forEach(t => {
                n.name = t, i.push(this.visitState(n, e))
              }), n.name = r
            } else if (1 == t.type) {
              const i = this.visitTransition(t, e);
              n += i.queryCount, r += i.depCount, s.push(i)
            } else e.errors.push("only state() and transition() definitions can sit inside of a trigger()")
          }), {
            type: 7,
            name: t.name,
            states: i,
            transitions: s,
            queryCount: n,
            depCount: r,
            options: null
          }
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            r = t.options && t.options.params || null;
          if (n.containsDynamicStyles) {
            const i = new Set,
              s = r || {};
            if (n.styles.forEach(t => {
                if (Ym(t)) {
                  const e = t;
                  Object.keys(e).forEach(t => {
                    Lm(e[t]).forEach(t => {
                      s.hasOwnProperty(t) || i.add(t)
                    })
                  })
                }
              }), i.size) {
              const n = Fm(i.values());
              e.errors.push(`state("${t.name}", ...) must define default values for all the following style substitutions: ${n.join(", ")}`)
            }
          }
          return {
            type: 0,
            name: t.name,
            style: n,
            options: r ? {
              params: r
            } : null
          }
        }
        visitTransition(t, e) {
          e.queryCount = 0, e.depCount = 0;
          const n = Um(this, Im(t.animation), e);
          return {
            type: 1,
            matchers: Hm(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: Jm(t.options)
          }
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map(t => Um(this, t, e)),
            options: Jm(t.options)
          }
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let r = 0;
          const i = t.steps.map(t => {
            e.currentTime = n;
            const i = Um(this, t, e);
            return r = Math.max(r, e.currentTime), i
          });
          return e.currentTime = r, {
            type: 3,
            steps: i,
            options: Jm(t.options)
          }
        }
        visitAnimate(t, e) {
          const n = function (t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return Xm(Sm(t, e).duration, 0, "");
            const r = t;
            if (r.split(/\s+/).some(t => "{" == t.charAt(0) && "{" == t.charAt(1))) {
              const t = Xm(0, 0, "");
              return t.dynamic = !0, t.strValue = r, t
            }
            return n = n || Sm(r, e), Xm(n.duration, n.delay, n.easing)
          }(t.timings, e.errors);
          let r;
          e.currentAnimateTimings = n;
          let i = t.styles ? t.styles : $p({});
          if (5 == i.type) r = this.visitKeyframes(i, e);
          else {
            let i = t.styles,
              s = !1;
            if (!i) {
              s = !0;
              const t = {};
              n.easing && (t.easing = n.easing), i = $p(t)
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(i, e);
            o.isEmptyStep = s, r = o
          }
          return e.currentAnimateTimings = null, {
            type: 4,
            timings: n,
            style: r,
            options: null
          }
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles) ? t.styles.forEach(t => {
            "string" == typeof t ? t == Vp ? n.push(t) : e.errors.push(`The provided style string value ${t} is not allowed.`) : n.push(t)
          }) : n.push(t.styles);
          let r = !1,
            i = null;
          return n.forEach(t => {
            if (Ym(t)) {
              const e = t,
                n = e.easing;
              if (n && (i = n, delete e.easing), !r)
                for (let t in e)
                  if (e[t].toString().indexOf("{{") >= 0) {
                    r = !0;
                    break
                  }
            }
          }), {
            type: 6,
            styles: n,
            easing: i,
            offset: t.offset,
            containsDynamicStyles: r,
            options: null
          }
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let r = e.currentTime,
            i = e.currentTime;
          n && i > 0 && (i -= n.duration + n.delay), t.styles.forEach(t => {
            "string" != typeof t && Object.keys(t).forEach(n => {
              if (!this._driver.validateStyleProperty(n)) return void e.errors.push(`The provided animation property "${n}" is not a supported CSS property for animations`);
              const s = e.collectedStyles[e.currentQuerySelector],
                o = s[n];
              let a = !0;
              o && (i != r && i >= o.startTime && r <= o.endTime && (e.errors.push(`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${i}ms" and "${r}ms"`), a = !1), i = o.startTime), a && (s[n] = {
                startTime: i,
                endTime: r
              }), e.options && function (t, e, n) {
                const r = e.params || {},
                  i = Lm(t);
                i.length && i.forEach(t => {
                  r.hasOwnProperty(t) || n.push(`Unable to resolve the local animation param ${t} in the given list of values`)
                })
              }(t[n], e.options, e.errors)
            })
          })
        }
        visitKeyframes(t, e) {
          const n = {
            type: 5,
            styles: [],
            options: null
          };
          if (!e.currentAnimateTimings) return e.errors.push("keyframes() must be placed inside of a call to animate()"), n;
          let r = 0;
          const i = [];
          let s = !1,
            o = !1,
            a = 0;
          const l = t.steps.map(t => {
            const n = this._makeStyleAst(t, e);
            let l = null != n.offset ? n.offset : function (t) {
                if ("string" == typeof t) return null;
                let e = null;
                if (Array.isArray(t)) t.forEach(t => {
                  if (Ym(t) && t.hasOwnProperty("offset")) {
                    const n = t;
                    e = parseFloat(n.offset), delete n.offset
                  }
                });
                else if (Ym(t) && t.hasOwnProperty("offset")) {
                  const n = t;
                  e = parseFloat(n.offset), delete n.offset
                }
                return e
              }(n.styles),
              c = 0;
            return null != l && (r++, c = n.offset = l), o = o || c < 0 || c > 1, s = s || c < a, a = c, i.push(c), n
          });
          o && e.errors.push("Please ensure that all keyframe offsets are between 0 and 1"), s && e.errors.push("Please ensure that all keyframe offsets are in order");
          const c = t.steps.length;
          let u = 0;
          r > 0 && r < c ? e.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == r && (u = 1 / (c - 1));
          const h = c - 1,
            d = e.currentTime,
            f = e.currentAnimateTimings,
            p = f.duration;
          return l.forEach((t, r) => {
            const s = u > 0 ? r == h ? 1 : u * r : i[r],
              o = s * p;
            e.currentTime = d + f.delay + o, f.duration = o, this._validateStyleAst(t, e), t.offset = s, n.styles.push(t)
          }), n
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: Um(this, Im(t.animation), e),
            options: Jm(t.options)
          }
        }
        visitAnimateChild(t, e) {
          return e.depCount++, {
            type: 9,
            options: Jm(t.options)
          }
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: Jm(t.options)
          }
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            r = t.options || {};
          e.queryCount++, e.currentQuery = t;
          const [i, s] = function (t) {
            const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
            return e && (t = t.replace(Wm, "")), [t = t.replace(/@\*/g, bm).replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1)).replace(/:animating/g, wm), e]
          }(t.selector);
          e.currentQuerySelector = n.length ? n + " " + i : i, em(e.collectedStyles, e.currentQuerySelector, {});
          const o = Um(this, Im(t.animation), e);
          return e.currentQuery = null, e.currentQuerySelector = n, {
            type: 11,
            selector: i,
            limit: r.limit || 0,
            optional: !!r.optional,
            includeSelf: s,
            animation: o,
            originalSelector: t.selector,
            options: Jm(t.options)
          }
        }
        visitStagger(t, e) {
          e.currentQuery || e.errors.push("stagger() can only be used inside of query()");
          const n = "full" === t.timings ? {
            duration: 0,
            delay: 0,
            easing: "full"
          } : Sm(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: Um(this, Im(t.animation), e),
            timings: n,
            options: null
          }
        }
      }
      class Zm {
        constructor(t) {
          this.errors = t, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = {}, this.options = null
        }
      }

      function Ym(t) {
        return !Array.isArray(t) && "object" == typeof t
      }

      function Jm(t) {
        var e;
        return t ? (t = Em(t)).params && (t.params = (e = t.params) ? Em(e) : null) : t = {}, t
      }

      function Xm(t, e, n) {
        return {
          duration: t,
          delay: e,
          easing: n
        }
      }

      function tg(t, e, n, r, i, s, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: r,
          duration: i,
          delay: s,
          totalTime: i + s,
          easing: o,
          subTimeline: a
        }
      }
      class eg {
        constructor() {
          this._map = new Map
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : e = [], e
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, n = []), n.push(...e)
        }
        has(t) {
          return this._map.has(t)
        }
        clear() {
          this._map.clear()
        }
      }
      const ng = new RegExp(":enter", "g"),
        rg = new RegExp(":leave", "g");

      function ig(t, e, n, r, i, s = {}, o = {}, a, l, c = []) {
        return (new sg).buildKeyframes(t, e, n, r, i, s, o, a, l, c)
      }
      class sg {
        buildKeyframes(t, e, n, r, i, s, o, a, l, c = []) {
          l = l || new eg;
          const u = new ag(t, e, l, r, i, c, []);
          u.options = a, u.currentTimeline.setStyles([s], null, u.errors, a), Um(this, n, u);
          const h = u.timelines.filter(t => t.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const t = h[h.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, u.errors, a)
          }
          return h.length ? h.map(t => t.buildKeyframes()) : [tg(e, [], [], [], 0, 0, "", !1)]
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const r = e.createSubContext(t.options),
              i = e.currentTimeline.currentTime,
              s = this._visitSubInstructions(n, r, r.options);
            i != s && e.transformIntoNewTimeline(s)
          }
          e.previousNode = t
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(), this.visitReference(t.animation, n), e.transformIntoNewTimeline(n.currentTimeline.currentTime), e.previousNode = t
        }
        _visitSubInstructions(t, e, n) {
          let r = e.currentTimeline.currentTime;
          const i = null != n.duration ? xm(n.duration) : null,
            s = null != n.delay ? xm(n.delay) : null;
          return 0 !== i && t.forEach(t => {
            const n = e.appendInstructionToTimeline(t, i, s);
            r = Math.max(r, n.duration + n.delay)
          }), r
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0), Um(this, t.animation, e), e.previousNode = t
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let r = e;
          const i = t.options;
          if (i && (i.params || i.delay) && (r = e.createSubContext(i), r.transformIntoNewTimeline(), null != i.delay)) {
            6 == r.previousNode.type && (r.currentTimeline.snapshotCurrentStyles(), r.previousNode = og);
            const t = xm(i.delay);
            r.delayNextStep(t)
          }
          t.steps.length && (t.steps.forEach(t => Um(this, t, r)), r.currentTimeline.applyStylesToKeyframe(), r.subContextCount > n && r.transformIntoNewTimeline()), e.previousNode = t
        }
        visitGroup(t, e) {
          const n = [];
          let r = e.currentTimeline.currentTime;
          const i = t.options && t.options.delay ? xm(t.options.delay) : 0;
          t.steps.forEach(s => {
            const o = e.createSubContext(t.options);
            i && o.delayNextStep(i), Um(this, s, o), r = Math.max(r, o.currentTimeline.currentTime), n.push(o.currentTimeline)
          }), n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)), e.transformIntoNewTimeline(r), e.previousNode = t
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return Sm(e.params ? Dm(n, e.params, e.errors) : n, e.errors)
          }
          return {
            duration: t.duration,
            delay: t.delay,
            easing: t.easing
          }
        }
        visitAnimate(t, e) {
          const n = e.currentAnimateTimings = this._visitTiming(t.timings, e),
            r = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), r.snapshotCurrentStyles());
          const i = t.style;
          5 == i.type ? this.visitKeyframes(i, e) : (e.incrementTime(n.duration), this.visitStyle(i, e), r.applyStylesToKeyframe()), e.currentAnimateTimings = null, e.previousNode = t
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            r = e.currentAnimateTimings;
          !r && n.getCurrentStyleProperties().length && n.forwardFrame();
          const i = r && r.easing || t.easing;
          t.isEmptyStep ? n.applyEmptyStep(i) : n.setStyles(t.styles, i, e.errors, e.options), e.previousNode = t
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            r = e.currentTimeline.duration,
            i = n.duration,
            s = e.createSubContext().currentTimeline;
          s.easing = n.easing, t.styles.forEach(t => {
            s.forwardTime((t.offset || 0) * i), s.setStyles(t.styles, t.easing, e.errors, e.options), s.applyStylesToKeyframe()
          }), e.currentTimeline.mergeTimelineCollectedStyles(s), e.transformIntoNewTimeline(r + i), e.previousNode = t
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            r = t.options || {},
            i = r.delay ? xm(r.delay) : 0;
          i && (6 === e.previousNode.type || 0 == n && e.currentTimeline.getCurrentStyleProperties().length) && (e.currentTimeline.snapshotCurrentStyles(), e.previousNode = og);
          let s = n;
          const o = e.invokeQuery(t.selector, t.originalSelector, t.limit, t.includeSelf, !!r.optional, e.errors);
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, r) => {
            e.currentQueryIndex = r;
            const o = e.createSubContext(t.options, n);
            i && o.delayNextStep(i), n === e.element && (a = o.currentTimeline), Um(this, t.animation, o), o.currentTimeline.applyStylesToKeyframe(), s = Math.max(s, o.currentTimeline.currentTime)
          }), e.currentQueryIndex = 0, e.currentQueryTotal = 0, e.transformIntoNewTimeline(s), a && (e.currentTimeline.mergeTimelineCollectedStyles(a), e.currentTimeline.snapshotCurrentStyles()), e.previousNode = t
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            r = e.currentTimeline,
            i = t.timings,
            s = Math.abs(i.duration),
            o = s * (e.currentQueryTotal - 1);
          let a = s * e.currentQueryIndex;
          switch (i.duration < 0 ? "reverse" : i.easing) {
            case "reverse":
              a = o - a;
              break;
            case "full":
              a = n.currentStaggerTime
          }
          const l = e.currentTimeline;
          a && l.delayNextStep(a);
          const c = l.currentTime;
          Um(this, t.animation, e), e.previousNode = t, n.currentStaggerTime = r.currentTime - c + (r.startTime - n.currentTimeline.startTime)
        }
      }
      const og = {};
      class ag {
        constructor(t, e, n, r, i, s, o, a) {
          this._driver = t, this.element = e, this.subInstructions = n, this._enterClassName = r, this._leaveClassName = i, this.errors = s, this.timelines = o, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = og, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = a || new lg(this._driver, e, 0), o.push(this.currentTimeline)
        }
        get params() {
          return this.options.params
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let r = this.options;
          null != n.duration && (r.duration = xm(n.duration)), null != n.delay && (r.delay = xm(n.delay));
          const i = n.params;
          if (i) {
            let t = r.params;
            t || (t = this.options.params = {}), Object.keys(i).forEach(n => {
              e && t.hasOwnProperty(n) || (t[n] = Dm(i[n], t, this.errors))
            })
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = t.params = {};
              Object.keys(e).forEach(t => {
                n[t] = e[t]
              })
            }
          }
          return t
        }
        createSubContext(t = null, e, n) {
          const r = e || this.element,
            i = new ag(this._driver, r, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(r, n || 0));
          return i.previousNode = this.previousNode, i.currentAnimateTimings = this.currentAnimateTimings, i.options = this._copyOptions(), i.updateOptions(t), i.currentQueryIndex = this.currentQueryIndex, i.currentQueryTotal = this.currentQueryTotal, i.parentContext = this, this.subContextCount++, i
        }
        transformIntoNewTimeline(t) {
          return this.previousNode = og, this.currentTimeline = this.currentTimeline.fork(this.element, t), this.timelines.push(this.currentTimeline), this.currentTimeline
        }
        appendInstructionToTimeline(t, e, n) {
          const r = {
              duration: null != e ? e : t.duration,
              delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
              easing: ""
            },
            i = new cg(this._driver, t.element, t.keyframes, t.preStyleProps, t.postStyleProps, r, t.stretchStartingKeyframe);
          return this.timelines.push(i), r
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t)
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t)
        }
        invokeQuery(t, e, n, r, i, s) {
          let o = [];
          if (r && o.push(this.element), t.length > 0) {
            t = (t = t.replace(ng, "." + this._enterClassName)).replace(rg, "." + this._leaveClassName);
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)), o.push(...e)
          }
          return i || 0 != o.length || s.push(`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`), o
        }
      }
      class lg {
        constructor(t, e, n, r) {
          this._driver = t, this.element = e, this.startTime = n, this._elementTimelineStylesLookup = r, this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map, this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)), this._loadKeyframe()
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe)
        }
        get currentTime() {
          return this.startTime + this.duration
        }
        delayNextStep(t) {
          const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
          this.duration || e ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles()) : this.startTime += t
        }
        fork(t, e) {
          return this.applyStylesToKeyframe(), new lg(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
        }
        _loadKeyframe() {
          this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe))
        }
        forwardFrame() {
          this.duration += 1, this._loadKeyframe()
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(), this.duration = t, this._loadKeyframe()
        }
        _updateStyle(t, e) {
          this._localTimelineStyles[t] = e, this._globalTimelineStyles[t] = e, this._styleSummary[t] = {
            time: this.currentTime,
            value: e
          }
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t), Object.keys(this._globalTimelineStyles).forEach(t => {
            this._backFill[t] = this._globalTimelineStyles[t] || Vp, this._currentKeyframe[t] = Vp
          }), this._currentEmptyStepKeyframe = this._currentKeyframe
        }
        setStyles(t, e, n, r) {
          e && (this._previousKeyframe.easing = e);
          const i = r && r.params || {},
            s = function (t, e) {
              const n = {};
              let r;
              return t.forEach(t => {
                "*" === t ? (r = r || Object.keys(e), r.forEach(t => {
                  n[t] = Vp
                })) : km(t, !1, n)
              }), n
            }(t, this._globalTimelineStyles);
          Object.keys(s).forEach(t => {
            const e = Dm(s[t], i, n);
            this._pendingStyles[t] = e, this._localTimelineStyles.hasOwnProperty(t) || (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t) ? this._globalTimelineStyles[t] : Vp), this._updateStyle(t, e)
          })
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length && (this._pendingStyles = {}, e.forEach(e => {
            this._currentKeyframe[e] = t[e]
          }), Object.keys(this._localTimelineStyles).forEach(t => {
            this._currentKeyframe.hasOwnProperty(t) || (this._currentKeyframe[t] = this._localTimelineStyles[t])
          }))
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach(t => {
            const e = this._localTimelineStyles[t];
            this._pendingStyles[t] = e, this._updateStyle(t, e)
          })
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration)
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach(e => {
            const n = this._styleSummary[e],
              r = t._styleSummary[e];
            (!n || r.time > n.time) && this._updateStyle(e, r.value)
          })
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set,
            e = new Set,
            n = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((i, s) => {
            const o = km(i, !0);
            Object.keys(o).forEach(n => {
              const r = o[n];
              "!" == r ? t.add(n) : r == Vp && e.add(n)
            }), n || (o.offset = s / this.duration), r.push(o)
          });
          const i = t.size ? Fm(t.values()) : [],
            s = e.size ? Fm(e.values()) : [];
          if (n) {
            const t = r[0],
              e = Em(t);
            t.offset = 0, e.offset = 1, r = [t, e]
          }
          return tg(this.element, r, i, s, this.duration, this.startTime, this.easing, !1)
        }
      }
      class cg extends lg {
        constructor(t, e, n, r, i, s, o = !1) {
          super(t, e, s.delay), this.element = e, this.keyframes = n, this.preStyleProps = r, this.postStyleProps = i, this._stretchStartingKeyframe = o, this.timings = {
            duration: s.duration,
            delay: s.delay,
            easing: s.easing
          }
        }
        containsAnimation() {
          return this.keyframes.length > 1
        }
        buildKeyframes() {
          let t = this.keyframes,
            {
              delay: e,
              duration: n,
              easing: r
            } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const i = [],
              s = n + e,
              o = e / s,
              a = km(t[0], !1);
            a.offset = 0, i.push(a);
            const l = km(t[0], !1);
            l.offset = ug(o), i.push(l);
            const c = t.length - 1;
            for (let r = 1; r <= c; r++) {
              let o = km(t[r], !1);
              o.offset = ug((e + o.offset * n) / s), i.push(o)
            }
            n = s, e = 0, r = "", t = i
          }
          return tg(this.element, t, this.preStyleProps, this.postStyleProps, n, e, r, !0)
        }
      }

      function ug(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n
      }
      class hg {}
      class dg extends hg {
        normalizePropertyName(t, e) {
          return Nm(t)
        }
        normalizeStyleValue(t, e, n, r) {
          let i = "";
          const s = n.toString().trim();
          if (fg[e] && 0 !== n && "0" !== n)
            if ("number" == typeof n) i = "px";
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e && 0 == e[1].length && r.push(`Please provide a CSS unit value for ${t}:${n}`)
            } return s + i
        }
      }
      const fg = (() => function (t) {
        const e = {};
        return t.forEach(t => e[t] = !0), e
      }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();

      function pg(t, e, n, r, i, s, o, a, l, c, u, h, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: s,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: h,
          errors: d
        }
      }
      const mg = {};
      class gg {
        constructor(t, e, n) {
          this._triggerName = t, this.ast = e, this._stateStyles = n
        }
        match(t, e, n, r) {
          return function (t, e, n, r, i) {
            return t.some(t => t(e, n, r, i))
          }(this.ast.matchers, t, e, n, r)
        }
        buildStyles(t, e, n) {
          const r = this._stateStyles["*"],
            i = this._stateStyles[t],
            s = r ? r.buildStyles(e, n) : {};
          return i ? i.buildStyles(e, n) : s
        }
        build(t, e, n, r, i, s, o, a, l, c) {
          const u = [],
            h = this.ast.options && this.ast.options.params || mg,
            d = this.buildStyles(n, o && o.params || mg, u),
            f = a && a.params || mg,
            p = this.buildStyles(r, f, u),
            m = new Set,
            g = new Map,
            y = new Map,
            _ = "void" === r,
            b = {
              params: Object.assign(Object.assign({}, h), f)
            },
            v = c ? [] : ig(t, e, this.ast.animation, i, s, d, p, b, l, u);
          let w = 0;
          if (v.forEach(t => {
              w = Math.max(t.duration + t.delay, w)
            }), u.length) return pg(e, this._triggerName, n, r, _, d, p, [], [], g, y, w, u);
          v.forEach(t => {
            const n = t.element,
              r = em(g, n, {});
            t.preStyleProps.forEach(t => r[t] = !0);
            const i = em(y, n, {});
            t.postStyleProps.forEach(t => i[t] = !0), n !== e && m.add(n)
          });
          const x = Fm(m.values());
          return pg(e, this._triggerName, n, r, _, d, p, v, x, g, y, w)
        }
      }
      class yg {
        constructor(t, e) {
          this.styles = t, this.defaultParams = e
        }
        buildStyles(t, e) {
          const n = {},
            r = Em(this.defaultParams);
          return Object.keys(t).forEach(e => {
            const n = t[e];
            null != n && (r[e] = n)
          }), this.styles.styles.forEach(t => {
            if ("string" != typeof t) {
              const i = t;
              Object.keys(i).forEach(t => {
                let s = i[t];
                s.length > 1 && (s = Dm(s, r, e)), n[t] = s
              })
            }
          }), n
        }
      }
      class _g {
        constructor(t, e) {
          this.name = t, this.ast = e, this.transitionFactories = [], this.states = {}, e.states.forEach(t => {
            this.states[t.name] = new yg(t.style, t.options && t.options.params || {})
          }), bg(this.states, "true", "1"), bg(this.states, "false", "0"), e.transitions.forEach(e => {
            this.transitionFactories.push(new gg(t, e, this.states))
          }), this.fallbackTransition = new gg(t, {
            type: 1,
            animation: {
              type: 2,
              steps: [],
              options: null
            },
            matchers: [(t, e) => !0],
            options: null,
            queryCount: 0,
            depCount: 0
          }, this.states)
        }
        get containsQueries() {
          return this.ast.queryCount > 0
        }
        matchTransition(t, e, n, r) {
          return this.transitionFactories.find(i => i.match(t, e, n, r)) || null
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n)
        }
      }

      function bg(t, e, n) {
        t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n])
      }
      const vg = new eg;
      class wg {
        constructor(t, e, n) {
          this.bodyNode = t, this._driver = e, this._normalizer = n, this._animations = {}, this._playersById = {}, this.players = []
        }
        register(t, e) {
          const n = [],
            r = Gm(this._driver, e, n);
          if (n.length) throw new Error(`Unable to build the animation due to the following errors: ${n.join("\n")}`);
          this._animations[t] = r
        }
        _buildPlayer(t, e, n) {
          const r = t.element,
            i = Yp(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(r, i, t.duration, t.delay, t.easing, [], !0)
        }
        create(t, e, n = {}) {
          const r = [],
            i = this._animations[t];
          let s;
          const o = new Map;
          if (i ? (s = ig(this._driver, e, i, gm, ym, {}, {}, n, vg, r), s.forEach(t => {
              const e = em(o, t.element, {});
              t.postStyleProps.forEach(t => e[t] = null)
            })) : (r.push("The requested animation doesn't exist or has already been destroyed"), s = []), r.length) throw new Error(`Unable to create the animation due to the following errors: ${r.join("\n")}`);
          o.forEach((t, e) => {
            Object.keys(t).forEach(n => {
              t[n] = this._driver.computeStyle(e, n, Vp)
            })
          });
          const a = Zp(s.map(t => {
            const e = o.get(t.element);
            return this._buildPlayer(t, {}, e)
          }));
          return this._playersById[t] = a, a.onDestroy(() => this.destroy(t)), this.players.push(a), a
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1)
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e) throw new Error(`Unable to find the timeline player referenced by ${t}`);
          return e
        }
        listen(t, e, n, r) {
          const i = tm(e, "", "", "");
          return Jp(this._getPlayer(t), n, i, r), () => {}
        }
        command(t, e, n, r) {
          if ("register" == n) return void this.register(t, r[0]);
          if ("create" == n) return void this.create(t, e, r[0] || {});
          const i = this._getPlayer(t);
          switch (n) {
            case "play":
              i.play();
              break;
            case "pause":
              i.pause();
              break;
            case "reset":
              i.reset();
              break;
            case "restart":
              i.restart();
              break;
            case "finish":
              i.finish();
              break;
            case "init":
              i.init();
              break;
            case "setPosition":
              i.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(t)
          }
        }
      }
      const xg = "ng-animate-queued",
        Cg = "ng-animate-disabled",
        Sg = ".ng-animate-disabled",
        Eg = [],
        kg = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1
        },
        Tg = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0
        };
      class Ag {
        constructor(t, e = "") {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty("value");
          if (this.value = null != (r = n ? t.value : t) ? r : null, n) {
            const e = Em(t);
            delete e.value, this.options = e
          } else this.options = {};
          var r;
          this.options.params || (this.options.params = {})
        }
        get params() {
          return this.options.params
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach(n => {
              null == t[n] && (t[n] = e[n])
            })
          }
        }
      }
      const Og = "void",
        Rg = new Ag(Og);
      class Ig {
        constructor(t, e, n) {
          this.id = t, this.hostElement = e, this._engine = n, this.players = [], this._triggers = {}, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + t, Vg(e, this._hostClassName)
        }
        listen(t, e, n, r) {
          if (!this._triggers.hasOwnProperty(e)) throw new Error(`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`);
          if (null == n || 0 == n.length) throw new Error(`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`);
          if ("start" != (i = n) && "done" != i) throw new Error(`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`);
          var i;
          const s = em(this._elementListeners, t, []),
            o = {
              name: e,
              phase: n,
              callback: r
            };
          s.push(o);
          const a = em(this._engine.statesByElement, t, {});
          return a.hasOwnProperty(e) || (Vg(t, _m), Vg(t, "ng-trigger-" + e), a[e] = Rg), () => {
            this._engine.afterFlush(() => {
              const t = s.indexOf(o);
              t >= 0 && s.splice(t, 1), this._triggers[e] || delete a[e]
            })
          }
        }
        register(t, e) {
          return !this._triggers[t] && (this._triggers[t] = e, !0)
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e) throw new Error(`The provided animation trigger "${t}" has not been registered!`);
          return e
        }
        trigger(t, e, n, r = !0) {
          const i = this._getTrigger(e),
            s = new Lg(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o || (Vg(t, _m), Vg(t, "ng-trigger-" + e), this._engine.statesByElement.set(t, o = {}));
          let a = o[e];
          const l = new Ag(n, this.id);
          if (!(n && n.hasOwnProperty("value")) && a && l.absorbOptions(a.options), o[e] = l, a || (a = Rg), l.value !== Og && a.value === l.value) {
            if (! function (t, e) {
                const n = Object.keys(t),
                  r = Object.keys(e);
                if (n.length != r.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const r = n[i];
                  if (!e.hasOwnProperty(r) || t[r] !== e[r]) return !1
                }
                return !0
              }(a.params, l.params)) {
              const e = [],
                n = i.matchStyles(a.value, a.params, e),
                r = i.matchStyles(l.value, l.params, e);
              e.length ? this._engine.reportError(e) : this._engine.afterFlush(() => {
                Rm(t, n), Om(t, r)
              })
            }
            return
          }
          const c = em(this._engine.playersByElement, t, []);
          c.forEach(t => {
            t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy()
          });
          let u = i.matchTransition(a.value, l.value, t, l.params),
            h = !1;
          if (!u) {
            if (!r) return;
            u = i.fallbackTransition, h = !0
          }
          return this._engine.totalQueuedPlayers++, this._queue.push({
            element: t,
            triggerName: e,
            transition: u,
            fromState: a,
            toState: l,
            player: s,
            isFallbackTransition: h
          }), h || (Vg(t, xg), s.onStart(() => {
            jg(t, xg)
          })), s.onDone(() => {
            let e = this.players.indexOf(s);
            e >= 0 && this.players.splice(e, 1);
            const n = this._engine.playersByElement.get(t);
            if (n) {
              let t = n.indexOf(s);
              t >= 0 && n.splice(t, 1)
            }
          }), this.players.push(s), c.push(s), s
        }
        deregister(t) {
          delete this._triggers[t], this._engine.statesByElement.forEach((e, n) => {
            delete e[t]
          }), this._elementListeners.forEach((e, n) => {
            this._elementListeners.set(n, e.filter(e => e.name != t))
          })
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e && (e.forEach(t => t.destroy()), this._engine.playersByElement.delete(t))
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, bm, !0);
          n.forEach(t => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0)) : this.clearElementCache(t)
          }), this._engine.afterFlushAnimationsDone(() => n.forEach(t => this.clearElementCache(t)))
        }
        triggerLeaveAnimation(t, e, n, r) {
          const i = this._engine.statesByElement.get(t);
          if (i) {
            const s = [];
            if (Object.keys(i).forEach(e => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, Og, r);
                  n && s.push(n)
                }
              }), s.length) return this._engine.markElementAsRemoved(this.id, t, !0, e), n && Zp(s).onDone(() => this._engine.processLeaveNode(t)), !0
          }
          return !1
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            n = this._engine.statesByElement.get(t);
          if (e && n) {
            const r = new Set;
            e.forEach(e => {
              const i = e.name;
              if (r.has(i)) return;
              r.add(i);
              const s = this._triggers[i].fallbackTransition,
                o = n[i] || Rg,
                a = new Ag(Og),
                l = new Lg(this.id, i, t);
              this._engine.totalQueuedPlayers++, this._queue.push({
                element: t,
                triggerName: i,
                transition: s,
                fromState: o,
                toState: a,
                player: l,
                isFallbackTransition: !0
              })
            })
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (t.childElementCount && this._signalRemovalForInnerTriggers(t, e), this.triggerLeaveAnimation(t, e, !0)) return;
          let r = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) r = !0;
            else {
              let e = t;
              for (; e = e.parentNode;)
                if (n.statesByElement.get(e)) {
                  r = !0;
                  break
                }
            }
          }
          if (this.prepareLeaveAnimationListeners(t), r) n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const r = t.__ng_removed;
            r && r !== kg || (n.afterFlush(() => this.clearElementCache(t)), n.destroyInnerAnimations(t), n._onRemovalComplete(t, e))
          }
        }
        insertNode(t, e) {
          Vg(t, this._hostClassName)
        }
        drainQueuedTransitions(t) {
          const e = [];
          return this._queue.forEach(n => {
            const r = n.player;
            if (r.destroyed) return;
            const i = n.element,
              s = this._elementListeners.get(i);
            s && s.forEach(e => {
              if (e.name == n.triggerName) {
                const r = tm(i, n.triggerName, n.fromState.value, n.toState.value);
                r._data = t, Jp(n.player, e.phase, r, e.callback)
              }
            }), r.markedForDestroy ? this._engine.afterFlush(() => {
              r.destroy()
            }) : e.push(n)
          }), this._queue = [], e.sort((t, e) => {
            const n = t.transition.ast.depCount,
              r = e.transition.ast.depCount;
            return 0 == n || 0 == r ? n - r : this._engine.driver.containsElement(t.element, e.element) ? 1 : -1
          })
        }
        destroy(t) {
          this.players.forEach(t => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, t)
        }
        elementContainsData(t) {
          let e = !1;
          return this._elementListeners.has(t) && (e = !0), e = !!this._queue.find(e => e.element === t) || e, e
        }
      }
      class Pg {
        constructor(t, e, n) {
          this.bodyNode = t, this.driver = e, this._normalizer = n, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (t, e) => {}
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e)
        }
        get queuedPlayers() {
          const t = [];
          return this._namespaceList.forEach(e => {
            e.players.forEach(e => {
              e.queued && t.push(e)
            })
          }), t
        }
        createNamespace(t, e) {
          const n = new Ig(t, e, this);
          return this.bodyNode && this.driver.containsElement(this.bodyNode, e) ? this._balanceNamespaceList(n, e) : (this.newHostElements.set(e, n), this.collectEnterElement(e)), this._namespaceLookup[t] = n
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let r = !1;
            for (let i = n; i >= 0; i--)
              if (this.driver.containsElement(this._namespaceList[i].hostElement, e)) {
                this._namespaceList.splice(i + 1, 0, t), r = !0;
                break
              } r || this._namespaceList.splice(0, 0, t)
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n
        }
        registerTrigger(t, e, n) {
          let r = this._namespaceLookup[t];
          r && r.register(e, n) && this.totalAnimations++
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement), delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1)
          }), this.afterFlushAnimationsDone(() => n.destroy(e))
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t]
        }
        fetchNamespacesByElement(t) {
          const e = new Set,
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let r = 0; r < t.length; r++) {
              const i = n[t[r]].namespaceId;
              if (i) {
                const t = this._fetchNamespace(i);
                t && e.add(t)
              }
            }
          }
          return e
        }
        trigger(t, e, n, r) {
          if (Dg(e)) {
            const i = this._fetchNamespace(t);
            if (i) return i.trigger(e, n, r), !0
          }
          return !1
        }
        insertNode(t, e, n, r) {
          if (!Dg(e)) return;
          const i = e.__ng_removed;
          if (i && i.setForRemoval) {
            i.setForRemoval = !1, i.setForMove = !0;
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1)
          }
          if (t) {
            const r = this._fetchNamespace(t);
            r && r.insertNode(e, n)
          }
          r && this.collectEnterElement(e)
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t)
        }
        markElementAsDisabled(t, e) {
          e ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), Vg(t, Cg)) : this.disabledNodes.has(t) && (this.disabledNodes.delete(t), jg(t, Cg))
        }
        removeNode(t, e, n, r) {
          if (Dg(e)) {
            const i = t ? this._fetchNamespace(t) : null;
            if (i ? i.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r), n) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, r)
            }
          } else this._onRemovalComplete(e, r)
        }
        markElementAsRemoved(t, e, n, r) {
          this.collectedLeaveElements.push(e), e.__ng_removed = {
            namespaceId: t,
            setForRemoval: r,
            hasAnimation: n,
            removedBeforeQueried: !1
          }
        }
        listen(t, e, n, r, i) {
          return Dg(e) ? this._fetchNamespace(t).listen(e, n, r, i) : () => {}
        }
        _buildInstruction(t, e, n, r, i) {
          return t.transition.build(this.driver, t.element, t.fromState.value, t.toState.value, n, r, t.fromState.options, t.toState.options, e, i)
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, bm, !0);
          e.forEach(t => this.destroyActiveAnimationsForElement(t)), 0 != this.playersByQueriedElement.size && (e = this.driver.query(t, wm, !0), e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)))
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e && e.forEach(t => {
            t.queued ? t.markedForDestroy = !0 : t.destroy()
          })
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach(t => t.finish())
        }
        whenRenderingDone() {
          return new Promise(t => {
            if (this.players.length) return Zp(this.players).onDone(() => t());
            t()
          })
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (t.__ng_removed = kg, e.namespaceId) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t)
            }
            this._onRemovalComplete(t, e.setForRemoval)
          }
          this.driver.matchesElement(t, Sg) && this.markElementAsDisabled(t, !1), this.driver.query(t, Sg, !0).forEach(t => {
            this.markElementAsDisabled(t, !1)
          })
        }
        flush(t = -1) {
          let e = [];
          if (this.newHostElements.size && (this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length)
            for (let n = 0; n < this.collectedEnterElements.length; n++) Vg(this.collectedEnterElements[n], "ng-star-inserted");
          if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            const n = [];
            try {
              e = this._flushAnimations(n, t)
            } finally {
              for (let t = 0; t < n.length; t++) n[t]()
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++) this.processLeaveNode(this.collectedLeaveElements[n]);
          if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(t => t()), this._flushFns = [], this._whenQuietFns.length) {
            const t = this._whenQuietFns;
            this._whenQuietFns = [], e.length ? Zp(e).onDone(() => {
              t.forEach(t => t())
            }) : t.forEach(t => t())
          }
        }
        reportError(t) {
          throw new Error(`Unable to process animations due to the following failed trigger transitions\n ${t.join("\n")}`)
        }
        _flushAnimations(t, e) {
          const n = new eg,
            r = [],
            i = new Map,
            s = [],
            o = new Map,
            a = new Map,
            l = new Map,
            c = new Set;
          this.disabledNodes.forEach(t => {
            c.add(t);
            const e = this.driver.query(t, ".ng-animate-queued", !0);
            for (let n = 0; n < e.length; n++) c.add(e[n])
          });
          const u = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = Ng(h, this.collectedEnterElements),
            f = new Map;
          let p = 0;
          d.forEach((t, e) => {
            const n = gm + p++;
            f.set(e, n), t.forEach(t => Vg(t, n))
          });
          const m = [],
            g = new Set,
            y = new Set;
          for (let R = 0; R < this.collectedLeaveElements.length; R++) {
            const t = this.collectedLeaveElements[R],
              e = t.__ng_removed;
            e && e.setForRemoval && (m.push(t), g.add(t), e.hasAnimation ? this.driver.query(t, ".ng-star-inserted", !0).forEach(t => g.add(t)) : y.add(t))
          }
          const _ = new Map,
            b = Ng(h, Array.from(g));
          b.forEach((t, e) => {
            const n = ym + p++;
            _.set(e, n), t.forEach(t => Vg(t, n))
          }), t.push(() => {
            d.forEach((t, e) => {
              const n = f.get(e);
              t.forEach(t => jg(t, n))
            }), b.forEach((t, e) => {
              const n = _.get(e);
              t.forEach(t => jg(t, n))
            }), m.forEach(t => {
              this.processLeaveNode(t)
            })
          });
          const v = [],
            w = [];
          for (let R = this._namespaceList.length - 1; R >= 0; R--) this._namespaceList[R].drainQueuedTransitions(e).forEach(t => {
            const e = t.player,
              i = t.element;
            if (v.push(e), this.collectedEnterElements.length) {
              const t = i.__ng_removed;
              if (t && t.setForMove) return void e.destroy()
            }
            const c = !u || !this.driver.containsElement(u, i),
              h = _.get(i),
              d = f.get(i),
              p = this._buildInstruction(t, n, d, h, c);
            if (p.errors && p.errors.length) w.push(p);
            else {
              if (c) return e.onStart(() => Rm(i, p.fromStyles)), e.onDestroy(() => Om(i, p.toStyles)), void r.push(e);
              if (t.isFallbackTransition) return e.onStart(() => Rm(i, p.fromStyles)), e.onDestroy(() => Om(i, p.toStyles)), void r.push(e);
              p.timelines.forEach(t => t.stretchStartingKeyframe = !0), n.append(i, p.timelines), s.push({
                instruction: p,
                player: e,
                element: i
              }), p.queriedElements.forEach(t => em(o, t, []).push(e)), p.preStyleProps.forEach((t, e) => {
                const n = Object.keys(t);
                if (n.length) {
                  let t = a.get(e);
                  t || a.set(e, t = new Set), n.forEach(e => t.add(e))
                }
              }), p.postStyleProps.forEach((t, e) => {
                const n = Object.keys(t);
                let r = l.get(e);
                r || l.set(e, r = new Set), n.forEach(t => r.add(t))
              })
            }
          });
          if (w.length) {
            const t = [];
            w.forEach(e => {
              t.push(`@${e.triggerName} has failed due to:\n`), e.errors.forEach(e => t.push(`- ${e}\n`))
            }), v.forEach(t => t.destroy()), this.reportError(t)
          }
          const x = new Map,
            C = new Map;
          s.forEach(t => {
            const e = t.element;
            n.has(e) && (C.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, x))
          }), r.forEach(t => {
            const e = t.element;
            this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach(t => {
              em(x, e, []).push(t), t.destroy()
            })
          });
          const S = m.filter(t => $g(t, a, l)),
            E = new Map;
          Mg(E, this.driver, y, l, Vp).forEach(t => {
            $g(t, a, l) && S.push(t)
          });
          const k = new Map;
          d.forEach((t, e) => {
            Mg(k, this.driver, new Set(t), a, "!")
          }), S.forEach(t => {
            const e = E.get(t),
              n = k.get(t);
            E.set(t, Object.assign(Object.assign({}, e), n))
          });
          const T = [],
            A = [],
            O = {};
          s.forEach(t => {
            const {
              element: e,
              player: s,
              instruction: o
            } = t;
            if (n.has(e)) {
              if (c.has(e)) return s.onDestroy(() => Om(e, o.toStyles)), s.disabled = !0, s.overrideTotalTime(o.totalTime), void r.push(s);
              let t = O;
              if (C.size > 1) {
                let n = e;
                const r = [];
                for (; n = n.parentNode;) {
                  const e = C.get(n);
                  if (e) {
                    t = e;
                    break
                  }
                  r.push(n)
                }
                r.forEach(e => C.set(e, t))
              }
              const n = this._buildAnimation(s.namespaceId, o, x, i, k, E);
              if (s.setRealPlayer(n), t === O) T.push(s);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (s.parentPlayer = Zp(e)), r.push(s)
              }
            } else Rm(e, o.fromStyles), s.onDestroy(() => Om(e, o.toStyles)), A.push(s), c.has(e) && r.push(s)
          }), A.forEach(t => {
            const e = i.get(t.element);
            if (e && e.length) {
              const n = Zp(e);
              t.setRealPlayer(n)
            }
          }), r.forEach(t => {
            t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy()
          });
          for (let R = 0; R < m.length; R++) {
            const t = m[R],
              e = t.__ng_removed;
            if (jg(t, ym), e && e.hasAnimation) continue;
            let n = [];
            if (o.size) {
              let e = o.get(t);
              e && e.length && n.push(...e);
              let r = this.driver.query(t, wm, !0);
              for (let t = 0; t < r.length; t++) {
                let e = o.get(r[t]);
                e && e.length && n.push(...e)
              }
            }
            const r = n.filter(t => !t.destroyed);
            r.length ? Ug(this, t, r) : this.processLeaveNode(t)
          }
          return m.length = 0, T.forEach(t => {
            this.players.push(t), t.onDone(() => {
              t.destroy();
              const e = this.players.indexOf(t);
              this.players.splice(e, 1)
            }), t.play()
          }), T
        }
        elementContainsData(t, e) {
          let n = !1;
          const r = e.__ng_removed;
          return r && r.setForRemoval && (n = !0), this.playersByElement.has(e) && (n = !0), this.playersByQueriedElement.has(e) && (n = !0), this.statesByElement.has(e) && (n = !0), this._fetchNamespace(t).elementContainsData(e) || n
        }
        afterFlush(t) {
          this._flushFns.push(t)
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t)
        }
        _getPreviousPlayers(t, e, n, r, i) {
          let s = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (s = e)
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !i || i == Og;
              e.forEach(e => {
                e.queued || (t || e.triggerName == r) && s.push(e)
              })
            }
          }
          return (n || r) && (s = s.filter(t => !(n && n != t.namespaceId || r && r != t.triggerName))), s
        }
        _beforeAnimationBuild(t, e, n) {
          const r = e.element,
            i = e.isRemovalTransition ? void 0 : t,
            s = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== r,
              l = em(n, t, []);
            this._getPreviousPlayers(t, a, i, s, e.toState).forEach(t => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t)
            })
          }
          Rm(r, e.fromStyles)
        }
        _buildAnimation(t, e, n, r, i, s) {
          const o = e.triggerName,
            a = e.element,
            l = [],
            c = new Set,
            u = new Set,
            h = e.timelines.map(e => {
              const h = e.element;
              c.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried) return new Qp(e.duration, e.delay);
              const f = h !== a,
                p = function (t) {
                  const e = [];
                  return Bg(t, e), e
                }((n.get(h) || Eg).map(t => t.getRealPlayer())).filter(t => !!t.element && t.element === h),
                m = i.get(h),
                g = s.get(h),
                y = Yp(0, this._normalizer, 0, e.keyframes, m, g),
                _ = this._buildPlayer(e, y, p);
              if (e.subTimeline && r && u.add(h), f) {
                const e = new Lg(t, o, h);
                e.setRealPlayer(_), l.push(e)
              }
              return _
            });
          l.forEach(t => {
            em(this.playersByQueriedElement, t.element, []).push(t), t.onDone(() => function (t, e, n) {
              let r;
              if (t instanceof Map) {
                if (r = t.get(e), r) {
                  if (r.length) {
                    const t = r.indexOf(n);
                    r.splice(t, 1)
                  }
                  0 == r.length && t.delete(e)
                }
              } else if (r = t[e], r) {
                if (r.length) {
                  const t = r.indexOf(n);
                  r.splice(t, 1)
                }
                0 == r.length && delete t[e]
              }
              return r
            }(this.playersByQueriedElement, t.element, t))
          }), c.forEach(t => Vg(t, vm));
          const d = Zp(h);
          return d.onDestroy(() => {
            c.forEach(t => jg(t, vm)), Om(a, e.toStyles)
          }), u.forEach(t => {
            em(r, t, []).push(d)
          }), d
        }
        _buildPlayer(t, e, n) {
          return e.length > 0 ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n) : new Qp(t.duration, t.delay)
        }
      }
      class Lg {
        constructor(t, e, n) {
          this.namespaceId = t, this.triggerName = e, this.element = n, this._player = new Qp, this._containsRealPlayer = !1, this._queuedCallbacks = {}, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
        }
        setRealPlayer(t) {
          this._containsRealPlayer || (this._player = t, Object.keys(this._queuedCallbacks).forEach(e => {
            this._queuedCallbacks[e].forEach(n => Jp(t, e, void 0, n))
          }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(t.totalTime), this.queued = !1)
        }
        getRealPlayer() {
          return this._player
        }
        overrideTotalTime(t) {
          this.totalTime = t
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")), t.onDone(() => this.finish()), t.onDestroy(() => this.destroy())
        }
        _queueEvent(t, e) {
          em(this._queuedCallbacks, t, []).push(e)
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t)
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t)
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t), this._player.onDestroy(t)
        }
        init() {
          this._player.init()
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted()
        }
        play() {
          !this.queued && this._player.play()
        }
        pause() {
          !this.queued && this._player.pause()
        }
        restart() {
          !this.queued && this._player.restart()
        }
        finish() {
          this._player.finish()
        }
        destroy() {
          this.destroyed = !0, this._player.destroy()
        }
        reset() {
          !this.queued && this._player.reset()
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t)
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition()
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t)
        }
      }

      function Dg(t) {
        return t && 1 === t.nodeType
      }

      function Fg(t, e) {
        const n = t.style.display;
        return t.style.display = null != e ? e : "none", n
      }

      function Mg(t, e, n, r, i) {
        const s = [];
        n.forEach(t => s.push(Fg(t)));
        const o = [];
        r.forEach((n, r) => {
          const s = {};
          n.forEach(t => {
            const n = s[t] = e.computeStyle(r, t, i);
            n && 0 != n.length || (r.__ng_removed = Tg, o.push(r))
          }), t.set(r, s)
        });
        let a = 0;
        return n.forEach(t => Fg(t, s[a++])), o
      }

      function Ng(t, e) {
        const n = new Map;
        if (t.forEach(t => n.set(t, [])), 0 == e.length) return n;
        const r = new Set(e),
          i = new Map;

        function s(t) {
          if (!t) return 1;
          let e = i.get(t);
          if (e) return e;
          const o = t.parentNode;
          return e = n.has(o) ? o : r.has(o) ? 1 : s(o), i.set(t, e), e
        }
        return e.forEach(t => {
          const e = s(t);
          1 !== e && n.get(e).push(t)
        }), n
      }

      function Vg(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), n[e] = !0
        }
      }

      function jg(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e]
        }
      }

      function Ug(t, e, n) {
        Zp(n).onDone(() => t.processLeaveNode(e))
      }

      function Bg(t, e) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          r instanceof Wp ? Bg(r.players, e) : e.push(r)
        }
      }

      function $g(t, e, n) {
        const r = n.get(t);
        if (!r) return !1;
        let i = e.get(t);
        return i ? r.forEach(t => i.add(t)) : e.set(t, r), n.delete(t), !0
      }
      class Hg {
        constructor(t, e, n) {
          this.bodyNode = t, this._driver = e, this._triggerCache = {}, this.onRemovalComplete = (t, e) => {}, this._transitionEngine = new Pg(t, e, n), this._timelineEngine = new wg(t, e, n), this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e)
        }
        registerTrigger(t, e, n, r, i) {
          const s = t + "-" + r;
          let o = this._triggerCache[s];
          if (!o) {
            const t = [],
              e = Gm(this._driver, i, t);
            if (t.length) throw new Error(`The animation trigger "${r}" has failed to build due to the following errors:\n - ${t.join("\n - ")}`);
            o = function (t, e) {
              return new _g(t, e)
            }(r, e), this._triggerCache[s] = o
          }
          this._transitionEngine.registerTrigger(e, r, o)
        }
        register(t, e) {
          this._transitionEngine.register(t, e)
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e)
        }
        onInsert(t, e, n, r) {
          this._transitionEngine.insertNode(t, e, n, r)
        }
        onRemove(t, e, n, r) {
          this._transitionEngine.removeNode(t, e, r || !1, n)
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e)
        }
        process(t, e, n, r) {
          if ("@" == n.charAt(0)) {
            const [t, i] = nm(n);
            this._timelineEngine.command(t, e, i, r)
          } else this._transitionEngine.trigger(t, e, n, r)
        }
        listen(t, e, n, r, i) {
          if ("@" == n.charAt(0)) {
            const [t, r] = nm(n);
            return this._timelineEngine.listen(t, e, r, i)
          }
          return this._transitionEngine.listen(t, e, n, r, i)
        }
        flush(t = -1) {
          this._transitionEngine.flush(t)
        }
        get players() {
          return this._transitionEngine.players.concat(this._timelineEngine.players)
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone()
        }
      }

      function zg(t, e) {
        let n = null,
          r = null;
        return Array.isArray(e) && e.length ? (n = Qg(e[0]), e.length > 1 && (r = Qg(e[e.length - 1]))) : e && (n = Qg(e)), n || r ? new qg(t, n, r) : null
      }
      let qg = (() => {
        class t {
          constructor(e, n, r) {
            this._element = e, this._startStyles = n, this._endStyles = r, this._state = 0;
            let i = t.initialStylesByElement.get(e);
            i || t.initialStylesByElement.set(e, i = {}), this._initialStyles = i
          }
          start() {
            this._state < 1 && (this._startStyles && Om(this._element, this._startStyles, this._initialStyles), this._state = 1)
          }
          finish() {
            this.start(), this._state < 2 && (Om(this._element, this._initialStyles), this._endStyles && (Om(this._element, this._endStyles), this._endStyles = null), this._state = 1)
          }
          destroy() {
            this.finish(), this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (Rm(this._element, this._startStyles), this._endStyles = null), this._endStyles && (Rm(this._element, this._endStyles), this._endStyles = null), Om(this._element, this._initialStyles), this._state = 3)
          }
        }
        return t.initialStylesByElement = new WeakMap, t
      })();

      function Qg(t) {
        let e = null;
        const n = Object.keys(t);
        for (let r = 0; r < n.length; r++) {
          const i = n[r];
          Wg(i) && (e = e || {}, e[i] = t[i])
        }
        return e
      }

      function Wg(t) {
        return "display" === t || "position" === t
      }
      const Gg = "animation",
        Kg = "animationend";
      class Zg {
        constructor(t, e, n, r, i, s, o) {
          this._element = t, this._name = e, this._duration = n, this._delay = r, this._easing = i, this._fillMode = s, this._onDoneFn = o, this._finished = !1, this._destroyed = !1, this._startTime = 0, this._position = 0, this._eventFn = t => this._handleCallback(t)
        }
        apply() {
          ! function (t, e) {
            const n = ny(t, "").trim();
            n.length && (function (t, e) {
              let n = 0;
              for (let r = 0; r < t.length; r++) "," === t.charAt(r) && n++
            }(n), e = `${n}, ${e}`), ey(t, "", e)
          }(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`), ty(this._element, this._eventFn, !1), this._startTime = Date.now()
        }
        pause() {
          Yg(this._element, this._name, "paused")
        }
        resume() {
          Yg(this._element, this._name, "running")
        }
        setPosition(t) {
          const e = Jg(this._element, this._name);
          this._position = t * this._duration, ey(this._element, "Delay", `-${this._position}ms`, e)
        }
        getPosition() {
          return this._position
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name && Math.max(e - this._startTime, 0) >= this._delay && n >= this._duration && this.finish()
        }
        finish() {
          this._finished || (this._finished = !0, this._onDoneFn(), ty(this._element, this._eventFn, !0))
        }
        destroy() {
          this._destroyed || (this._destroyed = !0, this.finish(), function (t, e) {
            const n = ny(t, "").split(","),
              r = Xg(n, e);
            r >= 0 && (n.splice(r, 1), ey(t, "", n.join(",")))
          }(this._element, this._name))
        }
      }

      function Yg(t, e, n) {
        ey(t, "PlayState", n, Jg(t, e))
      }

      function Jg(t, e) {
        const n = ny(t, "");
        return n.indexOf(",") > 0 ? Xg(n.split(","), e) : Xg([n], e)
      }

      function Xg(t, e) {
        for (let n = 0; n < t.length; n++)
          if (t[n].indexOf(e) >= 0) return n;
        return -1
      }

      function ty(t, e, n) {
        n ? t.removeEventListener(Kg, e) : t.addEventListener(Kg, e)
      }

      function ey(t, e, n, r) {
        const i = Gg + e;
        if (null != r) {
          const e = t.style[i];
          if (e.length) {
            const t = e.split(",");
            t[r] = n, n = t.join(",")
          }
        }
        t.style[i] = n
      }

      function ny(t, e) {
        return t.style[Gg + e] || ""
      }
      class ry {
        constructor(t, e, n, r, i, s, o, a) {
          this.element = t, this.keyframes = e, this.animationName = n, this._duration = r, this._delay = i, this._finalStyles = o, this._specialStyles = a, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this.currentSnapshot = {}, this._state = 0, this.easing = s || "linear", this.totalTime = r + i, this._buildStyler()
        }
        onStart(t) {
          this._onStartFns.push(t)
        }
        onDone(t) {
          this._onDoneFns.push(t)
        }
        onDestroy(t) {
          this._onDestroyFns.push(t)
        }
        destroy() {
          this.init(), this._state >= 4 || (this._state = 4, this._styler.destroy(), this._flushStartFns(), this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
        }
        _flushDoneFns() {
          this._onDoneFns.forEach(t => t()), this._onDoneFns = []
        }
        _flushStartFns() {
          this._onStartFns.forEach(t => t()), this._onStartFns = []
        }
        finish() {
          this.init(), this._state >= 3 || (this._state = 3, this._styler.finish(), this._flushStartFns(), this._specialStyles && this._specialStyles.finish(), this._flushDoneFns())
        }
        setPosition(t) {
          this._styler.setPosition(t)
        }
        getPosition() {
          return this._styler.getPosition()
        }
        hasStarted() {
          return this._state >= 2
        }
        init() {
          this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause())
        }
        play() {
          this.init(), this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()), this._styler.resume()
        }
        pause() {
          this.init(), this._styler.pause()
        }
        restart() {
          this.reset(), this.play()
        }
        reset() {
          this._state = 0, this._styler.destroy(), this._buildStyler(), this._styler.apply()
        }
        _buildStyler() {
          this._styler = new Zg(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", () => this.finish())
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), e.length = 0
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach(n => {
              "offset" != n && (t[n] = e ? this._finalStyles[n] : Bm(this.element, n))
            })
          }
          this.currentSnapshot = t
        }
      }
      class iy extends Qp {
        constructor(t, e) {
          super(), this.element = t, this._startingStyles = {}, this.__initialized = !1, this._styles = fm(e)
        }
        init() {
          !this.__initialized && this._startingStyles && (this.__initialized = !0, Object.keys(this._styles).forEach(t => {
            this._startingStyles[t] = this.element.style[t]
          }), super.init())
        }
        play() {
          this._startingStyles && (this.init(), Object.keys(this._styles).forEach(t => this.element.style.setProperty(t, this._styles[t])), super.play())
        }
        destroy() {
          this._startingStyles && (Object.keys(this._startingStyles).forEach(t => {
            const e = this._startingStyles[t];
            e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t)
          }), this._startingStyles = null, super.destroy())
        }
      }
      class sy {
        constructor() {
          this._count = 0
        }
        validateStyleProperty(t) {
          return cm(t)
        }
        matchesElement(t, e) {
          return um(t, e)
        }
        containsElement(t, e) {
          return hm(t, e)
        }
        query(t, e, n) {
          return dm(t, e, n)
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e]
        }
        buildKeyframeElement(t, e, n) {
          n = n.map(t => fm(t));
          let r = `@keyframes ${e} {\n`,
            i = "";
          n.forEach(t => {
            i = " ";
            const e = parseFloat(t.offset);
            r += `${i}${100*e}% {\n`, i += " ", Object.keys(t).forEach(e => {
              const n = t[e];
              switch (e) {
                case "offset":
                  return;
                case "easing":
                  return void(n && (r += `${i}animation-timing-function: ${n};\n`));
                default:
                  return void(r += `${i}${e}: ${n};\n`)
              }
            }), r += `${i}}\n`
          }), r += "}\n";
          const s = document.createElement("style");
          return s.textContent = r, s
        }
        animate(t, e, n, r, i, s = [], o) {
          const a = s.filter(t => t instanceof ry),
            l = {};
          Vm(n, r) && a.forEach(t => {
            let e = t.currentSnapshot;
            Object.keys(e).forEach(t => l[t] = e[t])
          });
          const c = function (t) {
            let e = {};
            return t && (Array.isArray(t) ? t : [t]).forEach(t => {
              Object.keys(t).forEach(n => {
                "offset" != n && "easing" != n && (e[n] = t[n])
              })
            }), e
          }(e = jm(t, e, l));
          if (0 == n) return new iy(t, c);
          const u = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(t, u, e);
          (function (t) {
            var e;
            const n = null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t);
            return "undefined" != typeof ShadowRoot && n instanceof ShadowRoot ? n : document.head
          })(t).appendChild(h);
          const d = zg(t, e),
            f = new ry(t, e, u, n, r, i, c, d);
          return f.onDestroy(() => {
            var t;
            (t = h).parentNode.removeChild(t)
          }), f
        }
      }
      class oy {
        constructor(t, e, n, r) {
          this.element = t, this.keyframes = e, this.options = n, this._specialStyles = r, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, this.currentSnapshot = {}, this._duration = n.duration, this._delay = n.delay || 0, this.time = this._duration + this._delay
        }
        _onFinish() {
          this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart()
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          this.domPlayer = this._triggerWebAnimation(this.element, t, this.options), this._finalKeyframe = t.length ? t[t.length - 1] : {}, this.domPlayer.addEventListener("finish", () => this._onFinish())
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n)
        }
        onStart(t) {
          this._onStartFns.push(t)
        }
        onDone(t) {
          this._onDoneFns.push(t)
        }
        onDestroy(t) {
          this._onDestroyFns.push(t)
        }
        play() {
          this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(t => t()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
        }
        pause() {
          this.init(), this.domPlayer.pause()
        }
        finish() {
          this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
        }
        reset() {
          this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel()
        }
        restart() {
          this.reset(), this.play()
        }
        hasStarted() {
          return this._started
        }
        destroy() {
          this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(), this.domPlayer.currentTime = t * this.time
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time
        }
        get totalTime() {
          return this._delay + this._duration
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() && Object.keys(this._finalKeyframe).forEach(e => {
            "offset" != e && (t[e] = this._finished ? this._finalKeyframe[e] : Bm(this.element, e))
          }), this.currentSnapshot = t
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), e.length = 0
        }
      }
      class ay {
        constructor() {
          this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(ly().toString()), this._cssKeyframesDriver = new sy
        }
        validateStyleProperty(t) {
          return cm(t)
        }
        matchesElement(t, e) {
          return um(t, e)
        }
        containsElement(t, e) {
          return hm(t, e)
        }
        query(t, e, n) {
          return dm(t, e, n)
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e]
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t
        }
        animate(t, e, n, r, i, s = [], o) {
          if (!o && !this._isNativeImpl) return this._cssKeyframesDriver.animate(t, e, n, r, i, s);
          const a = {
            duration: n,
            delay: r,
            fill: 0 == r ? "both" : "forwards"
          };
          i && (a.easing = i);
          const l = {},
            c = s.filter(t => t instanceof oy);
          Vm(n, r) && c.forEach(t => {
            let e = t.currentSnapshot;
            Object.keys(e).forEach(t => l[t] = e[t])
          });
          const u = zg(t, e = jm(t, e = e.map(t => km(t, !1)), l));
          return new oy(t, e, a, u)
        }
      }

      function ly() {
        return Gp() && Element.prototype.animate || {}
      }
      let cy = (() => {
        class t extends Np {
          constructor(t, e) {
            super(), this._nextAnimationId = 0, this._renderer = t.createRenderer(e.body, {
              id: "0",
              encapsulation: kt.None,
              styles: [],
              data: {
                animation: []
              }
            })
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? Bp(t) : t;
            return dy(this._renderer, null, e, "register", [n]), new uy(e, this._renderer)
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Mo), sr(Yl))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      class uy extends class {} {
        constructor(t, e) {
          super(), this._id = t, this._renderer = e
        }
        create(t, e) {
          return new hy(this._id, t, e || {}, this._renderer)
        }
      }
      class hy {
        constructor(t, e, n, r) {
          this.id = t, this.element = e, this._renderer = r, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", n)
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e)
        }
        _command(t, ...e) {
          return dy(this._renderer, this.element, this.id, t, e)
        }
        onDone(t) {
          this._listen("done", t)
        }
        onStart(t) {
          this._listen("start", t)
        }
        onDestroy(t) {
          this._listen("destroy", t)
        }
        init() {
          this._command("init")
        }
        hasStarted() {
          return this._started
        }
        play() {
          this._command("play"), this._started = !0
        }
        pause() {
          this._command("pause")
        }
        restart() {
          this._command("restart")
        }
        finish() {
          this._command("finish")
        }
        destroy() {
          this._command("destroy")
        }
        reset() {
          this._command("reset"), this._started = !1
        }
        setPosition(t) {
          this._command("setPosition", t)
        }
        getPosition() {
          var t, e;
          return null !== (e = null === (t = this._renderer.engine.players[+this.id]) || void 0 === t ? void 0 : t.getPosition()) && void 0 !== e ? e : 0
        }
      }

      function dy(t, e, n, r, i) {
        return t.setProperty(e, `@@${n}:${r}`, i)
      }
      const fy = "@",
        py = "@.disabled";
      let my = (() => {
        class t {
          constructor(t, e, n) {
            this.delegate = t, this.engine = e, this._zone = n, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), e.onRemovalComplete = (t, e) => {
              e && e.parentNode(t) && e.removeChild(t.parentNode, t)
            }
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return t || (t = new gy("", n, this.engine), this._rendererCache.set(n, t)), t
            }
            const r = e.id,
              i = e.id + "-" + this._currentId;
            this._currentId++, this.engine.register(i, t);
            const s = e => {
              Array.isArray(e) ? e.forEach(s) : this.engine.registerTrigger(r, i, t, e.name, e)
            };
            return e.data.animation.forEach(s), new yy(this, i, n, this.engine)
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++
            })
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId ? this._zone.run(() => e(n)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
              this._zone.run(() => {
                this._animationCallbacksBuffer.forEach(t => {
                  const [e, n] = t;
                  e(n)
                }), this._animationCallbacksBuffer = []
              })
            }), this._animationCallbacksBuffer.push([e, n]))
          }
          end() {
            this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
              this._scheduleCountTask(), this.engine.flush(this._microtaskId)
            }), this.delegate.end && this.delegate.end()
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone()
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Mo), sr(Hg), sr(_l))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      class gy {
        constructor(t, e, n) {
          this.namespaceId = t, this.delegate = e, this.engine = n, this.destroyNode = this.delegate.destroyNode ? t => e.destroyNode(t) : null
        }
        get data() {
          return this.delegate.data
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy()
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e)
        }
        createComment(t) {
          return this.delegate.createComment(t)
        }
        createText(t) {
          return this.delegate.createText(t)
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1)
        }
        insertBefore(t, e, n, r = !0) {
          this.delegate.insertBefore(t, e, n), this.engine.onInsert(this.namespaceId, e, t, r)
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n)
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e)
        }
        parentNode(t) {
          return this.delegate.parentNode(t)
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t)
        }
        setAttribute(t, e, n, r) {
          this.delegate.setAttribute(t, e, n, r)
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n)
        }
        addClass(t, e) {
          this.delegate.addClass(t, e)
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e)
        }
        setStyle(t, e, n, r) {
          this.delegate.setStyle(t, e, n, r)
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n)
        }
        setProperty(t, e, n) {
          e.charAt(0) == fy && e == py ? this.disableAnimations(t, !!n) : this.delegate.setProperty(t, e, n)
        }
        setValue(t, e) {
          this.delegate.setValue(t, e)
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n)
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e)
        }
      }
      class yy extends gy {
        constructor(t, e, n, r) {
          super(e, n, r), this.factory = t, this.namespaceId = e
        }
        setProperty(t, e, n) {
          e.charAt(0) == fy ? "." == e.charAt(1) && e == py ? this.disableAnimations(t, n = void 0 === n || !!n) : this.engine.process(this.namespaceId, t, e.substr(1), n) : this.delegate.setProperty(t, e, n)
        }
        listen(t, e, n) {
          if (e.charAt(0) == fy) {
            const r = function (t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t
              }
            }(t);
            let i = e.substr(1),
              s = "";
            return i.charAt(0) != fy && ([i, s] = function (t) {
              const e = t.indexOf(".");
              return [t.substring(0, e), t.substr(e + 1)]
            }(i)), this.engine.listen(this.namespaceId, r, i, s, t => {
              this.factory.scheduleListenerCallback(t._data || -1, n, t)
            })
          }
          return this.delegate.listen(t, e, n)
        }
      }
      let _y = (() => {
        class t extends Hg {
          constructor(t, e, n) {
            super(t.body, e, n)
          }
          ngOnDestroy() {
            this.flush()
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Yl), sr(mm), sr(hg))
        }, t.\u0275prov = ht({
          token: t,
          factory: t.\u0275fac
        }), t
      })();
      const by = new Bn("AnimationModuleType"),
        vy = [{
          provide: Np,
          useClass: cy
        }, {
          provide: hg,
          useFactory: function () {
            return new dg
          }
        }, {
          provide: Hg,
          useClass: _y
        }, {
          provide: Mo,
          useFactory: function (t, e, n) {
            return new my(t, e, n)
          },
          deps: [Wc, Hg, _l]
        }],
        wy = [{
          provide: mm,
          useFactory: function () {
            return "function" == typeof ly() ? new ay : new sy
          }
        }, {
          provide: by,
          useValue: "BrowserAnimations"
        }, ...vy],
        xy = [{
          provide: mm,
          useClass: pm
        }, {
          provide: by,
          useValue: "NoopAnimations"
        }, ...vy];
      let Cy = (() => {
        class t {
          static withConfig(e) {
            return {
              ngModule: t,
              providers: e.disableAnimations ? xy : wy
            }
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          providers: wy,
          imports: [su]
        }), t
      })();
      const Sy = new Vo("12.0.3"),
        Ey = new Bn("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0
          }
        });
      let ky, Ty = (() => {
        class t {
          constructor(t, e, n) {
            this._hasDoneGlobalChecks = !1, this._document = n, t._applyBodyHighContrastModeCssClasses(), this._sanityChecks = e, this._hasDoneGlobalChecks || (this._checkDoctypeIsDefined(), this._checkThemeIsPresent(), this._checkCdkVersionMatch(), this._hasDoneGlobalChecks = !0)
          }
          _getWindow() {
            const t = this._document.defaultView || window;
            return "object" == typeof t && t ? t : null
          }
          _checksAreEnabled() {
            return Pl() && !this._isTestEnv()
          }
          _isTestEnv() {
            const t = this._getWindow();
            return t && (t.__karma__ || t.jasmine)
          }
          _checkDoctypeIsDefined() {
            this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.doctype) && !this._document.doctype && console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")
          }
          _checkThemeIsPresent() {
            if (!this._checksAreEnabled() || !1 === this._sanityChecks || !this._sanityChecks.theme || !this._document.body || "function" != typeof getComputedStyle) return;
            const t = this._document.createElement("div");
            t.classList.add("mat-theme-loaded-marker"), this._document.body.appendChild(t);
            const e = getComputedStyle(t);
            e && "none" !== e.display && console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"), this._document.body.removeChild(t)
          }
          _checkCdkVersionMatch() {
            this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.version) && Sy.full !== Mp.full && console.warn("The Angular Material version (" + Sy.full + ") does not match the Angular CDK version (" + Mp.full + ").\nPlease ensure the versions of these two packages exactly match.")
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Pp), sr(Ey, 8), sr(Yl))
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          imports: [
            [Fp], Fp
          ]
        }), t
      })();

      function Ay(t) {
        return class extends t {
          constructor(...t) {
            super(...t), this._disabled = !1
          }
          get disabled() {
            return this._disabled
          }
          set disabled(t) {
            this._disabled = ep(t)
          }
        }
      }

      function Oy(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), this.defaultColor = e, this.color = e
          }
          get color() {
            return this._color
          }
          set color(t) {
            const e = t || this.defaultColor;
            e !== this._color && (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`), e && this._elementRef.nativeElement.classList.add(`mat-${e}`), this._color = e)
          }
        }
      }

      function Ry(t) {
        return class extends t {
          constructor(...t) {
            super(...t), this._disableRipple = !1
          }
          get disableRipple() {
            return this._disableRipple
          }
          set disableRipple(t) {
            this._disableRipple = ep(t)
          }
        }
      }

      function Iy(t) {
        return class extends t {
          constructor(...t) {
            super(...t), this.errorState = !1, this.stateChanges = new C
          }
          updateErrorState() {
            const t = this.errorState,
              e = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(this.ngControl ? this.ngControl.control : null, this._parentFormGroup || this._parentForm);
            e !== t && (this.errorState = e, this.stateChanges.next())
          }
        }
      }
      try {
        ky = "undefined" != typeof Intl
      } catch (yw) {
        ky = !1
      }
      let Py = (() => {
        class t {
          isErrorState(t, e) {
            return !!(t && t.invalid && (t.touched || e && e.submitted))
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          factory: function () {
            return new t
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      class Ly {
        constructor(t, e, n) {
          this._renderer = t, this.element = e, this.config = n, this.state = 3
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this)
        }
      }
      const Dy = {
          enterDuration: 450,
          exitDuration: 400
        },
        Fy = up({
          passive: !0
        }),
        My = ["mousedown", "touchstart"],
        Ny = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class Vy {
        constructor(t, e, n, r) {
          this._target = t, this._ngZone = e, this._isPointerDown = !1, this._activeRipples = new Set, this._pointerUpEventsRegistered = !1, r.isBrowser && (this._containerElement = np(n))
        }
        fadeInRipple(t, e, n = {}) {
          const r = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
            i = Object.assign(Object.assign({}, Dy), n.animation);
          n.centered && (t = r.left + r.width / 2, e = r.top + r.height / 2);
          const s = n.radius || function (t, e, n) {
              const r = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                i = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
              return Math.sqrt(r * r + i * i)
            }(t, e, r),
            o = t - r.left,
            a = e - r.top,
            l = i.enterDuration,
            c = document.createElement("div");
          c.classList.add("mat-ripple-element"), c.style.left = o - s + "px", c.style.top = a - s + "px", c.style.height = 2 * s + "px", c.style.width = 2 * s + "px", null != n.color && (c.style.backgroundColor = n.color), c.style.transitionDuration = `${l}ms`, this._containerElement.appendChild(c), window.getComputedStyle(c).getPropertyValue("opacity"), c.style.transform = "scale(1)";
          const u = new Ly(this, c, n);
          return u.state = 0, this._activeRipples.add(u), n.persistent || (this._mostRecentTransientRipple = u), this._runTimeoutOutsideZone(() => {
            const t = u === this._mostRecentTransientRipple;
            u.state = 1, n.persistent || t && this._isPointerDown || u.fadeOut()
          }, l), u
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), this._activeRipples.size || (this._containerRect = null), !e) return;
          const n = t.element,
            r = Object.assign(Object.assign({}, Dy), t.config.animation);
          n.style.transitionDuration = `${r.exitDuration}ms`, n.style.opacity = "0", t.state = 2, this._runTimeoutOutsideZone(() => {
            t.state = 3, n.parentNode.removeChild(n)
          }, r.exitDuration)
        }
        fadeOutAll() {
          this._activeRipples.forEach(t => t.fadeOut())
        }
        fadeOutAllNonPersistent() {
          this._activeRipples.forEach(t => {
            t.config.persistent || t.fadeOut()
          })
        }
        setupTriggerEvents(t) {
          const e = np(t);
          e && e !== this._triggerElement && (this._removeTriggerEvents(), this._triggerElement = e, this._registerEvents(My))
        }
        handleEvent(t) {
          "mousedown" === t.type ? this._onMousedown(t) : "touchstart" === t.type ? this._onTouchStart(t) : this._onPointerUp(), this._pointerUpEventsRegistered || (this._registerEvents(Ny), this._pointerUpEventsRegistered = !0)
        }
        _onMousedown(t) {
          const e = Cp(t),
            n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled || e || n || (this._isPointerDown = !0, this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig))
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !Sp(t)) {
            this._lastTouchStartEvent = Date.now(), this._isPointerDown = !0;
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++) this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig)
          }
        }
        _onPointerUp() {
          this._isPointerDown && (this._isPointerDown = !1, this._activeRipples.forEach(t => {
            !t.config.persistent && (1 === t.state || t.config.terminateOnPointerUp && 0 === t.state) && t.fadeOut()
          }))
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e))
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach(t => {
              this._triggerElement.addEventListener(t, this, Fy)
            })
          })
        }
        _removeTriggerEvents() {
          this._triggerElement && (My.forEach(t => {
            this._triggerElement.removeEventListener(t, this, Fy)
          }), this._pointerUpEventsRegistered && Ny.forEach(t => {
            this._triggerElement.removeEventListener(t, this, Fy)
          }))
        }
      }
      const jy = new Bn("mat-ripple-global-options");
      let Uy = (() => {
          class t {
            constructor(t, e, n, r, i) {
              this._elementRef = t, this._animationMode = i, this.radius = 0, this._disabled = !1, this._isInitialized = !1, this._globalOptions = r || {}, this._rippleRenderer = new Vy(this, e, t, n)
            }
            get disabled() {
              return this._disabled
            }
            set disabled(t) {
              t && this.fadeOutAllNonPersistent(), this._disabled = t, this._setupTriggerEventsIfEnabled()
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement
            }
            set trigger(t) {
              this._trigger = t, this._setupTriggerEventsIfEnabled()
            }
            ngOnInit() {
              this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents()
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll()
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent()
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(Object.assign(Object.assign({}, this._globalOptions.animation), "NoopAnimations" === this._animationMode ? {
                  enterDuration: 0,
                  exitDuration: 0
                } : {}), this.animation),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
              }
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
            }
            launch(t, e = 0, n) {
              return "number" == typeof t ? this._rippleRenderer.fadeInRipple(t, e, Object.assign(Object.assign({}, this.rippleConfig), n)) : this._rippleRenderer.fadeInRipple(0, 0, Object.assign(Object.assign({}, this.rippleConfig), t))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(_l), Ns(ip), Ns(jy, 8), Ns(by, 8))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "mat-ripple", ""],
              ["", "matRipple", ""]
            ],
            hostAttrs: [1, "mat-ripple"],
            hostVars: 2,
            hostBindings: function (t, e) {
              2 & t && no("mat-ripple-unbounded", e.unbounded)
            },
            inputs: {
              radius: ["matRippleRadius", "radius"],
              disabled: ["matRippleDisabled", "disabled"],
              trigger: ["matRippleTrigger", "trigger"],
              color: ["matRippleColor", "color"],
              unbounded: ["matRippleUnbounded", "unbounded"],
              centered: ["matRippleCentered", "centered"],
              animation: ["matRippleAnimation", "animation"]
            },
            exportAs: ["matRipple"]
          }), t
        })(),
        By = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [Ty, sp], Ty
            ]
          }), t
        })();
      const $y = ["*", [
          ["mat-toolbar-row"]
        ]],
        Hy = ["*", "mat-toolbar-row"];
      class zy {
        constructor(t) {
          this._elementRef = t
        }
      }
      const qy = Oy(zy);
      let Qy = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["mat-toolbar-row"]
            ],
            hostAttrs: [1, "mat-toolbar-row"],
            exportAs: ["matToolbarRow"]
          }), t
        })(),
        Wy = (() => {
          class t extends qy {
            constructor(t, e, n) {
              super(t), this._platform = e, this._document = n
            }
            ngAfterViewInit() {
              this._platform.isBrowser && (this._checkToolbarMixedModes(), this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes()))
            }
            _checkToolbarMixedModes() {}
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(ip), Ns(Yl))
          }, t.\u0275cmp = $t({
            type: t,
            selectors: [
              ["mat-toolbar"]
            ],
            contentQueries: function (t, e, n) {
              if (1 & t && Qa(n, Qy, 5), 2 & t) {
                let t;
                za(t = Wa()) && (e._toolbarRows = t)
              }
            },
            hostAttrs: [1, "mat-toolbar"],
            hostVars: 4,
            hostBindings: function (t, e) {
              2 & t && no("mat-toolbar-multiple-rows", e._toolbarRows.length > 0)("mat-toolbar-single-row", 0 === e._toolbarRows.length)
            },
            inputs: {
              color: "color"
            },
            exportAs: ["matToolbar"],
            features: [Es],
            ngContentSelectors: Hy,
            decls: 2,
            vars: 0,
            template: function (t, e) {
              1 & t && (Js($y), Xs(0), Xs(1, 1))
            },
            styles: [".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}\n"],
            encapsulation: 2,
            changeDetection: 0
          }), t
        })(),
        Gy = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [Ty], Ty
            ]
          }), t
        })();
      const Ky = {
          provide: il,
          useFactory: function (t, e) {
            return () => {
              if (Ec(e)) {
                const e = Array.from(t.querySelectorAll(`[class*=${Zy}]`)),
                  n = /\bflex-layout-.+?\b/g;
                e.forEach(t => {
                  t.classList.contains(`${Zy}ssr`) && t.parentNode ? t.parentNode.removeChild(t) : t.className.replace(n, "")
                })
              }
            }
          },
          deps: [Yl, rl],
          multi: !0
        },
        Zy = "flex-layout-";
      let Yy = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          providers: [Ky]
        }), t
      })();
      class Jy {
        constructor(t = !1, e = "all", n = "", r = "", i = 0) {
          this.matches = t, this.mediaQuery = e, this.mqAlias = n, this.suffix = r, this.priority = i, this.property = ""
        }
        clone() {
          return new Jy(this.matches, this.mediaQuery, this.mqAlias, this.suffix)
        }
      }
      let Xy = (() => {
        class t {
          constructor() {
            this.stylesheet = new Map
          }
          addStyleToElement(t, e, n) {
            const r = this.stylesheet.get(t);
            r ? r.set(e, n) : this.stylesheet.set(t, new Map([
              [e, n]
            ]))
          }
          clearStyles() {
            this.stylesheet.clear()
          }
          getStyleForElement(t, e) {
            const n = this.stylesheet.get(t);
            let r = "";
            if (n) {
              const t = n.get(e);
              "number" != typeof t && "string" != typeof t || (r = t + "")
            }
            return r
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275prov = ht({
          factory: function () {
            return new t
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      const t_ = {
          addFlexToParent: !0,
          addOrientationBps: !1,
          disableDefaultBps: !1,
          disableVendorPrefixes: !1,
          serverLoaded: !1,
          useColumnBasisZero: !0,
          printWithBreakpoints: [],
          mediaTriggerAutoRestore: !0,
          ssrObserveBreakpoints: []
        },
        e_ = new Bn("Flex Layout token, config options for the library", {
          providedIn: "root",
          factory: () => t_
        }),
        n_ = new Bn("FlexLayoutServerLoaded", {
          providedIn: "root",
          factory: () => !1
        }),
        r_ = new Bn("Flex Layout token, collect all breakpoints into one provider", {
          providedIn: "root",
          factory: () => null
        });

      function i_(t, e) {
        return t = t ? t.clone() : new Jy, e && (t.mqAlias = e.alias, t.mediaQuery = e.mediaQuery, t.suffix = e.suffix, t.priority = e.priority), t
      }
      const s_ = "inline",
        o_ = ["row", "column", "row-reverse", "column-reverse"];

      function a_(t) {
        if (t) switch (t.toLowerCase()) {
          case "reverse":
          case "wrap-reverse":
          case "reverse-wrap":
            t = "wrap-reverse";
            break;
          case "no":
          case "none":
          case "nowrap":
            t = "nowrap";
            break;
          default:
            t = "wrap"
        }
        return t
      }
      let l_ = (() => {
        class t {
          constructor(t, e, n, r) {
            this.elementRef = t, this.styleBuilder = e, this.styler = n, this.marshal = r, this.DIRECTIVE_KEY = "", this.inputs = [], this.mru = {}, this.destroySubject = new C, this.styleCache = new Map
          }
          get parentElement() {
            return this.elementRef.nativeElement.parentElement
          }
          get nativeElement() {
            return this.elementRef.nativeElement
          }
          get activatedValue() {
            return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY)
          }
          set activatedValue(t) {
            this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t, this.marshal.activatedAlias)
          }
          ngOnChanges(t) {
            Object.keys(t).forEach(e => {
              if (-1 !== this.inputs.indexOf(e)) {
                const n = e.split(".").slice(1).join(".");
                this.setValue(t[e].currentValue, n)
              }
            })
          }
          ngOnDestroy() {
            this.destroySubject.next(), this.destroySubject.complete(), this.marshal.releaseElement(this.nativeElement)
          }
          init(t = []) {
            this.marshal.init(this.elementRef.nativeElement, this.DIRECTIVE_KEY, this.updateWithValue.bind(this), this.clearStyles.bind(this), t)
          }
          addStyles(t, e) {
            const n = this.styleBuilder,
              r = n.shouldCache;
            let i = this.styleCache.get(t);
            i && r || (i = n.buildStyles(t, e), r && this.styleCache.set(t, i)), this.mru = Object.assign({}, i), this.applyStyleToElement(i), n.sideEffect(t, i, e)
          }
          clearStyles() {
            Object.keys(this.mru).forEach(t => {
              this.mru[t] = ""
            }), this.applyStyleToElement(this.mru), this.mru = {}
          }
          triggerUpdate() {
            this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY)
          }
          getFlexFlowDirection(t, e = !1) {
            if (t) {
              const [n, r] = this.styler.getFlowDirection(t);
              if (!r && e) {
                const e = function (t) {
                  let [e, n, r] = function (t) {
                    t = t ? t.toLowerCase() : "";
                    let [e, n, r] = t.split(" ");
                    return o_.find(t => t === e) || (e = o_[0]), n === s_ && (n = r !== s_ ? r : "", r = s_), [e, a_(n), !!r]
                  }(t);
                  return function (t, e = null, n = !1) {
                    return {
                      display: n ? "inline-flex" : "flex",
                      "box-sizing": "border-box",
                      "flex-direction": t,
                      "flex-wrap": e || null
                    }
                  }(e, n, r)
                }(n);
                this.styler.applyStyleToElements(e, [t])
              }
              return n.trim()
            }
            return "row"
          }
          hasWrap(t) {
            return this.styler.hasWrap(t)
          }
          applyStyleToElement(t, e, n = this.nativeElement) {
            this.styler.applyStyleToElement(n, t, e)
          }
          setValue(t, e) {
            this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t, e)
          }
          updateWithValue(t) {
            this.currentValue !== t && (this.addStyles(t), this.currentValue = t)
          }
        }
        return t.\u0275fac = function (t) {
          ! function () {
            throw new Error("invalid")
          }()
        }, t.\u0275dir = Gt({
          type: t,
          features: [ae]
        }), t
      })();
      const c_ = [{
          alias: "xs",
          mediaQuery: "screen and (min-width: 0px) and (max-width: 599.98px)",
          priority: 1e3
        }, {
          alias: "sm",
          mediaQuery: "screen and (min-width: 600px) and (max-width: 959.98px)",
          priority: 900
        }, {
          alias: "md",
          mediaQuery: "screen and (min-width: 960px) and (max-width: 1279.98px)",
          priority: 800
        }, {
          alias: "lg",
          mediaQuery: "screen and (min-width: 1280px) and (max-width: 1919.98px)",
          priority: 700
        }, {
          alias: "xl",
          mediaQuery: "screen and (min-width: 1920px) and (max-width: 4999.98px)",
          priority: 600
        }, {
          alias: "lt-sm",
          overlapping: !0,
          mediaQuery: "screen and (max-width: 599.98px)",
          priority: 950
        }, {
          alias: "lt-md",
          overlapping: !0,
          mediaQuery: "screen and (max-width: 959.98px)",
          priority: 850
        }, {
          alias: "lt-lg",
          overlapping: !0,
          mediaQuery: "screen and (max-width: 1279.98px)",
          priority: 750
        }, {
          alias: "lt-xl",
          overlapping: !0,
          priority: 650,
          mediaQuery: "screen and (max-width: 1919.98px)"
        }, {
          alias: "gt-xs",
          overlapping: !0,
          mediaQuery: "screen and (min-width: 600px)",
          priority: -950
        }, {
          alias: "gt-sm",
          overlapping: !0,
          mediaQuery: "screen and (min-width: 960px)",
          priority: -850
        }, {
          alias: "gt-md",
          overlapping: !0,
          mediaQuery: "screen and (min-width: 1280px)",
          priority: -750
        }, {
          alias: "gt-lg",
          overlapping: !0,
          mediaQuery: "screen and (min-width: 1920px)",
          priority: -650
        }],
        u_ = "(orientation: portrait) and (max-width: 599.98px)",
        h_ = "(orientation: landscape) and (max-width: 959.98px)",
        d_ = "(orientation: portrait) and (min-width: 600px) and (max-width: 839.98px)",
        f_ = "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.98px)",
        p_ = "(orientation: portrait) and (min-width: 840px)",
        m_ = "(orientation: landscape) and (min-width: 1280px)",
        g_ = {
          HANDSET: `${u_}, ${h_}`,
          TABLET: `${d_} , ${f_}`,
          WEB: `${p_}, ${m_} `,
          HANDSET_PORTRAIT: `${u_}`,
          TABLET_PORTRAIT: `${d_} `,
          WEB_PORTRAIT: `${p_}`,
          HANDSET_LANDSCAPE: `${h_}`,
          TABLET_LANDSCAPE: `${f_}`,
          WEB_LANDSCAPE: `${m_}`
        },
        y_ = [{
          alias: "handset",
          priority: 2e3,
          mediaQuery: g_.HANDSET
        }, {
          alias: "handset.landscape",
          priority: 2e3,
          mediaQuery: g_.HANDSET_LANDSCAPE
        }, {
          alias: "handset.portrait",
          priority: 2e3,
          mediaQuery: g_.HANDSET_PORTRAIT
        }, {
          alias: "tablet",
          priority: 2100,
          mediaQuery: g_.TABLET
        }, {
          alias: "tablet.landscape",
          priority: 2100,
          mediaQuery: g_.TABLET_LANDSCAPE
        }, {
          alias: "tablet.portrait",
          priority: 2100,
          mediaQuery: g_.TABLET_PORTRAIT
        }, {
          alias: "web",
          priority: 2200,
          mediaQuery: g_.WEB,
          overlapping: !0
        }, {
          alias: "web.landscape",
          priority: 2200,
          mediaQuery: g_.WEB_LANDSCAPE,
          overlapping: !0
        }, {
          alias: "web.portrait",
          priority: 2200,
          mediaQuery: g_.WEB_PORTRAIT,
          overlapping: !0
        }],
        __ = /(\.|-|_)/g;

      function b_(t) {
        let e = t.length > 0 ? t.charAt(0) : "",
          n = t.length > 1 ? t.slice(1) : "";
        return e.toUpperCase() + n
      }
      const v_ = new Bn("Token (@angular/flex-layout) Breakpoints", {
        providedIn: "root",
        factory: () => {
          const t = or(r_),
            e = or(e_),
            n = [].concat.apply([], (t || []).map(t => Array.isArray(t) ? t : [t]));
          return function (t, e = []) {
            const n = {};
            return t.forEach(t => {
              n[t.alias] = t
            }), e.forEach(t => {
              n[t.alias] ? function (t, ...e) {
                if (null == t) throw TypeError("Cannot convert undefined or null to object");
                for (let n of e)
                  if (null != n)
                    for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e])
              }(n[t.alias], t) : n[t.alias] = t
            }), (r = Object.keys(n).map(t => n[t])).forEach(t => {
              t.suffix || (t.suffix = t.alias.replace(__, "|").split("|").map(b_).join(""), t.overlapping = !!t.overlapping)
            }), r;
            var r
          }((e.disableDefaultBps ? [] : c_).concat(e.addOrientationBps ? y_ : []), n)
        }
      });

      function w_(t, e) {
        return (e && e.priority || 0) - (t && t.priority || 0)
      }

      function x_(t, e) {
        return (t.priority || 0) - (e.priority || 0)
      }
      let C_ = (() => {
          class t {
            constructor(t) {
              this.findByMap = new Map, this.items = [...t].sort(x_)
            }
            findByAlias(t) {
              return t ? this.findWithPredicate(t, e => e.alias == t) : null
            }
            findByQuery(t) {
              return this.findWithPredicate(t, e => e.mediaQuery == t)
            }
            get overlappings() {
              return this.items.filter(t => 1 == t.overlapping)
            }
            get aliases() {
              return this.items.map(t => t.alias)
            }
            get suffixes() {
              return this.items.map(t => t.suffix ? t.suffix : "")
            }
            findWithPredicate(t, e) {
              let n = this.findByMap.get(t);
              return n || (n = this.items.find(e) || null, this.findByMap.set(t, n)), n || null
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(v_))
          }, t.\u0275prov = ht({
            factory: function () {
              return new t(sr(v_))
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        S_ = (() => {
          class t {
            constructor(t, e, n) {
              this._zone = t, this._platformId = e, this._document = n, this.source = new au(new Jy(!0)), this.registry = new Map, this.pendingRemoveListenerFns = [], this._observable$ = this.source.asObservable()
            }
            get activations() {
              const t = [];
              return this.registry.forEach((e, n) => {
                e.matches && t.push(n)
              }), t
            }
            isActive(t) {
              const e = this.registry.get(t);
              return e ? e.matches : this.registerQuery(t).some(t => t.matches)
            }
            observe(t, e = !1) {
              if (t && t.length) {
                const n = this._observable$.pipe(Ru(n => !e || t.indexOf(n.mediaQuery) > -1));
                return q(new _(e => {
                  const n = this.registerQuery(t);
                  if (n.length) {
                    const t = n.pop();
                    n.forEach(t => {
                      e.next(t)
                    }), this.source.next(t)
                  }
                  e.complete()
                }), n)
              }
              return this._observable$
            }
            registerQuery(t) {
              const e = Array.isArray(t) ? t : [t],
                n = [];
              return function (t, e) {
                const n = t.filter(t => !E_[t]);
                if (n.length > 0) {
                  const t = n.join(", ");
                  try {
                    const r = e.createElement("style");
                    r.setAttribute("type", "text/css"), r.styleSheet || r.appendChild(e.createTextNode(`\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${t} {.fx-query-test{ }}\n`)), e.head.appendChild(r), n.forEach(t => E_[t] = r)
                  } catch (r) {
                    console.error(r)
                  }
                }
              }(e, this._document), e.forEach(t => {
                const e = e => {
                  this._zone.run(() => this.source.next(new Jy(e.matches, t)))
                };
                let r = this.registry.get(t);
                r || (r = this.buildMQL(t), r.addListener(e), this.pendingRemoveListenerFns.push(() => r.removeListener(e)), this.registry.set(t, r)), r.matches && n.push(new Jy(!0, t))
              }), n
            }
            ngOnDestroy() {
              let t;
              for (; t = this.pendingRemoveListenerFns.pop();) t()
            }
            buildMQL(t) {
              return function (t, e) {
                return e && window.matchMedia("all").addListener ? window.matchMedia(t) : {
                  matches: "all" === t || "" === t,
                  media: t,
                  addListener: () => {},
                  removeListener: () => {},
                  onchange: null,
                  addEventListener() {},
                  removeEventListener() {},
                  dispatchEvent: () => !1
                }
              }(t, Ec(this._platformId))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(_l), sr(rl), sr(Yl))
          }, t.\u0275prov = ht({
            factory: function () {
              return new t(sr(_l), sr(rl), sr(Yl))
            },
            token: t,
            providedIn: "root"
          }), t
        })();
      const E_ = {},
        k_ = "print",
        T_ = {
          alias: k_,
          mediaQuery: k_,
          priority: 1e3
        };
      let A_ = (() => {
        class t {
          constructor(t, e, n) {
            this.breakpoints = t, this.layoutConfig = e, this._document = n, this.registeredBeforeAfterPrintHooks = !1, this.isPrintingBeforeAfterEvent = !1, this.beforePrintEventListeners = [], this.afterPrintEventListeners = [], this.isPrinting = !1, this.queue = new O_, this.deactivations = []
          }
          withPrintQuery(t) {
            return [...t, k_]
          }
          isPrintEvent(t) {
            return t.mediaQuery.startsWith(k_)
          }
          get printAlias() {
            return this.layoutConfig.printWithBreakpoints || []
          }
          get printBreakPoints() {
            return this.printAlias.map(t => this.breakpoints.findByAlias(t)).filter(t => null !== t)
          }
          getEventBreakpoints({
            mediaQuery: t
          }) {
            const e = this.breakpoints.findByQuery(t);
            return (e ? [...this.printBreakPoints, e] : this.printBreakPoints).sort(w_)
          }
          updateEvent(t) {
            let e = this.breakpoints.findByQuery(t.mediaQuery);
            return this.isPrintEvent(t) && (e = this.getEventBreakpoints(t)[0], t.mediaQuery = e ? e.mediaQuery : ""), i_(t, e)
          }
          registerBeforeAfterPrintHooks(t) {
            if (!this._document.defaultView || this.registeredBeforeAfterPrintHooks) return;
            this.registeredBeforeAfterPrintHooks = !0;
            const e = () => {
                this.isPrinting || (this.isPrintingBeforeAfterEvent = !0, this.startPrinting(t, this.getEventBreakpoints(new Jy(!0, k_))), t.updateStyles())
              },
              n = () => {
                this.isPrintingBeforeAfterEvent = !1, this.isPrinting && (this.stopPrinting(t), t.updateStyles())
              };
            this._document.defaultView.addEventListener("beforeprint", e), this._document.defaultView.addEventListener("afterprint", n), this.beforePrintEventListeners.push(e), this.afterPrintEventListeners.push(n)
          }
          interceptEvents(t) {
            return this.registerBeforeAfterPrintHooks(t), e => {
              this.isPrintEvent(e) ? e.matches && !this.isPrinting ? (this.startPrinting(t, this.getEventBreakpoints(e)), t.updateStyles()) : e.matches || !this.isPrinting || this.isPrintingBeforeAfterEvent || (this.stopPrinting(t), t.updateStyles()) : this.collectActivations(e)
            }
          }
          blockPropagation() {
            return t => !(this.isPrinting || this.isPrintEvent(t))
          }
          startPrinting(t, e) {
            this.isPrinting = !0, t.activatedBreakpoints = this.queue.addPrintBreakpoints(e)
          }
          stopPrinting(t) {
            t.activatedBreakpoints = this.deactivations, this.deactivations = [], this.queue.clear(), this.isPrinting = !1
          }
          collectActivations(t) {
            if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
              if (t.matches) this.isPrintingBeforeAfterEvent || (this.deactivations = []);
              else {
                const e = this.breakpoints.findByQuery(t.mediaQuery);
                e && (this.deactivations.push(e), this.deactivations.sort(w_))
              }
          }
          ngOnDestroy() {
            this._document.defaultView && (this.beforePrintEventListeners.forEach(t => this._document.defaultView.removeEventListener("beforeprint", t)), this.afterPrintEventListeners.forEach(t => this._document.defaultView.removeEventListener("afterprint", t)))
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(C_), sr(e_), sr(Yl))
        }, t.\u0275prov = ht({
          factory: function () {
            return new t(sr(C_), sr(e_), sr(Yl))
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      class O_ {
        constructor() {
          this.printBreakpoints = []
        }
        addPrintBreakpoints(t) {
          return t.push(T_), t.sort(w_), t.forEach(t => this.addBreakpoint(t)), this.printBreakpoints
        }
        addBreakpoint(t) {
          t && void 0 === this.printBreakpoints.find(e => e.mediaQuery === t.mediaQuery) && (this.printBreakpoints = function (t) {
            return !!t && t.mediaQuery.startsWith(k_)
          }(t) ? [t, ...this.printBreakpoints] : [...this.printBreakpoints, t])
        }
        clear() {
          this.printBreakpoints = []
        }
      }

      function R_(t) {
        for (let e in t) {
          let n = t[e] || "";
          switch (e) {
            case "display":
              t.display = "flex" === n ? ["-webkit-flex", "flex"] : "inline-flex" === n ? ["-webkit-inline-flex", "inline-flex"] : n;
              break;
            case "align-items":
            case "align-self":
            case "align-content":
            case "flex":
            case "flex-basis":
            case "flex-flow":
            case "flex-grow":
            case "flex-shrink":
            case "flex-wrap":
            case "justify-content":
              t["-webkit-" + e] = n;
              break;
            case "flex-direction":
              n = n || "row", t["-webkit-flex-direction"] = n, t["flex-direction"] = n;
              break;
            case "order":
              t.order = t["-webkit-" + e] = isNaN(+n) ? "0" : n
          }
        }
        return t
      }
      let I_ = (() => {
        class t {
          constructor(t, e, n, r) {
            this._serverStylesheet = t, this._serverModuleLoaded = e, this._platformId = n, this.layoutConfig = r
          }
          applyStyleToElement(t, e, n = null) {
            let r = {};
            "string" == typeof e && (r[e] = n, e = r), r = this.layoutConfig.disableVendorPrefixes ? e : R_(e), this._applyMultiValueStyleToElement(r, t)
          }
          applyStyleToElements(t, e = []) {
            const n = this.layoutConfig.disableVendorPrefixes ? t : R_(t);
            e.forEach(t => {
              this._applyMultiValueStyleToElement(n, t)
            })
          }
          getFlowDirection(t) {
            const e = "flex-direction";
            let n = this.lookupStyle(t, e);
            return [n || "row", this.lookupInlineStyle(t, e) || kc(this._platformId) && this._serverModuleLoaded ? n : ""]
          }
          hasWrap(t) {
            return "wrap" === this.lookupStyle(t, "flex-wrap")
          }
          lookupAttributeValue(t, e) {
            return t.getAttribute(e) || ""
          }
          lookupInlineStyle(t, e) {
            return Ec(this._platformId) ? t.style.getPropertyValue(e) : this._getServerStyle(t, e)
          }
          lookupStyle(t, e, n = !1) {
            let r = "";
            return t && ((r = this.lookupInlineStyle(t, e)) || (Ec(this._platformId) ? n || (r = getComputedStyle(t).getPropertyValue(e)) : this._serverModuleLoaded && (r = this._serverStylesheet.getStyleForElement(t, e)))), r ? r.trim() : ""
          }
          _applyMultiValueStyleToElement(t, e) {
            Object.keys(t).sort().forEach(n => {
              const r = t[n],
                i = Array.isArray(r) ? r : [r];
              i.sort();
              for (let t of i) t = t ? t + "" : "", Ec(this._platformId) || !this._serverModuleLoaded ? Ec(this._platformId) ? e.style.setProperty(n, t) : this._setServerStyle(e, n, t) : this._serverStylesheet.addStyleToElement(e, n, t)
            })
          }
          _setServerStyle(t, e, n) {
            e = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            const r = this._readStyleAttribute(t);
            r[e] = n || "", this._writeStyleAttribute(t, r)
          }
          _getServerStyle(t, e) {
            return this._readStyleAttribute(t)[e] || ""
          }
          _readStyleAttribute(t) {
            const e = {},
              n = t.getAttribute("style");
            if (n) {
              const t = n.split(/;+/g);
              for (let n = 0; n < t.length; n++) {
                const r = t[n].trim();
                if (r.length > 0) {
                  const t = r.indexOf(":");
                  if (-1 === t) throw new Error(`Invalid CSS style: ${r}`);
                  e[r.substr(0, t).trim()] = r.substr(t + 1).trim()
                }
              }
            }
            return e
          }
          _writeStyleAttribute(t, e) {
            let n = "";
            for (const r in e) e[r] && (n += r + ":" + e[r] + ";");
            t.setAttribute("style", n)
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(Xy), sr(n_), sr(rl), sr(e_))
        }, t.\u0275prov = ht({
          factory: function () {
            return new t(sr(Xy), sr(n_), sr(rl), sr(e_))
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      class P_ {
        constructor() {
          this.shouldCache = !0
        }
        sideEffect(t, e, n) {}
      }

      function L_(t, e = "1", n = "1") {
        let r = [e, n, t],
          i = t.indexOf("calc");
        if (i > 0) {
          r[2] = D_(t.substring(i).trim());
          let e = t.substr(0, i).trim().split(" ");
          2 == e.length && (r[0] = e[0], r[1] = e[1])
        } else if (0 == i) r[2] = D_(t.trim());
        else {
          let i = t.split(" ");
          r = 3 === i.length ? i : [e, n, t]
        }
        return r
      }

      function D_(t) {
        return t.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ")
      }
      let F_ = (() => {
        class t {
          constructor(t, e, n) {
            this.matchMedia = t, this.breakpoints = e, this.hook = n, this.activatedBreakpoints = [], this.elementMap = new Map, this.elementKeyMap = new WeakMap, this.watcherMap = new WeakMap, this.updateMap = new WeakMap, this.clearMap = new WeakMap, this.subject = new C, this.observeActivations()
          }
          get activatedAlias() {
            return this.activatedBreakpoints[0] ? this.activatedBreakpoints[0].alias : ""
          }
          onMediaChange(t) {
            const e = this.findByQuery(t.mediaQuery);
            e && ((t = i_(t, e)).matches && -1 === this.activatedBreakpoints.indexOf(e) ? (this.activatedBreakpoints.push(e), this.activatedBreakpoints.sort(w_), this.updateStyles()) : t.matches || -1 === this.activatedBreakpoints.indexOf(e) || (this.activatedBreakpoints.splice(this.activatedBreakpoints.indexOf(e), 1), this.activatedBreakpoints.sort(w_), this.updateStyles()))
          }
          init(t, e, n, r, i = []) {
            M_(this.updateMap, t, e, n), M_(this.clearMap, t, e, r), this.buildElementKeyMap(t, e), this.watchExtraTriggers(t, e, i)
          }
          getValue(t, e, n) {
            const r = this.elementMap.get(t);
            if (r) {
              const t = void 0 !== n ? r.get(n) : this.getActivatedValues(r, e);
              if (t) return t.get(e)
            }
          }
          hasValue(t, e) {
            const n = this.elementMap.get(t);
            if (n) {
              const t = this.getActivatedValues(n, e);
              if (t) return void 0 !== t.get(e) || !1
            }
            return !1
          }
          setValue(t, e, n, r) {
            let i = this.elementMap.get(t);
            if (i) {
              const s = (i.get(r) || new Map).set(e, n);
              i.set(r, s), this.elementMap.set(t, i)
            } else i = (new Map).set(r, (new Map).set(e, n)), this.elementMap.set(t, i);
            const s = this.getValue(t, e);
            void 0 !== s && this.updateElement(t, e, s)
          }
          trackValue(t, e) {
            return this.subject.asObservable().pipe(Ru(n => n.element === t && n.key === e))
          }
          updateStyles() {
            this.elementMap.forEach((t, e) => {
              const n = new Set(this.elementKeyMap.get(e));
              let r = this.getActivatedValues(t);
              r && r.forEach((t, r) => {
                this.updateElement(e, r, t), n.delete(r)
              }), n.forEach(n => {
                if (r = this.getActivatedValues(t, n), r) {
                  const t = r.get(n);
                  this.updateElement(e, n, t)
                } else this.clearElement(e, n)
              })
            })
          }
          clearElement(t, e) {
            const n = this.clearMap.get(t);
            if (n) {
              const r = n.get(e);
              r && (r(), this.subject.next({
                element: t,
                key: e,
                value: ""
              }))
            }
          }
          updateElement(t, e, n) {
            const r = this.updateMap.get(t);
            if (r) {
              const i = r.get(e);
              i && (i(n), this.subject.next({
                element: t,
                key: e,
                value: n
              }))
            }
          }
          releaseElement(t) {
            const e = this.watcherMap.get(t);
            e && (e.forEach(t => t.unsubscribe()), this.watcherMap.delete(t));
            const n = this.elementMap.get(t);
            n && (n.forEach((t, e) => n.delete(e)), this.elementMap.delete(t))
          }
          triggerUpdate(t, e) {
            const n = this.elementMap.get(t);
            if (n) {
              const r = this.getActivatedValues(n, e);
              r && (e ? this.updateElement(t, e, r.get(e)) : r.forEach((e, n) => this.updateElement(t, n, e)))
            }
          }
          buildElementKeyMap(t, e) {
            let n = this.elementKeyMap.get(t);
            n || (n = new Set, this.elementKeyMap.set(t, n)), n.add(e)
          }
          watchExtraTriggers(t, e, n) {
            if (n && n.length) {
              let r = this.watcherMap.get(t);
              if (r || (r = new Map, this.watcherMap.set(t, r)), !r.get(e)) {
                const i = q(...n).subscribe(() => {
                  const n = this.getValue(t, e);
                  this.updateElement(t, e, n)
                });
                r.set(e, i)
              }
            }
          }
          findByQuery(t) {
            return this.breakpoints.findByQuery(t)
          }
          getActivatedValues(t, e) {
            for (let r = 0; r < this.activatedBreakpoints.length; r++) {
              const n = t.get(this.activatedBreakpoints[r].alias);
              if (n && (void 0 === e || n.has(e) && null != n.get(e))) return n
            }
            const n = t.get("");
            return void 0 === e || n && n.has(e) ? n : void 0
          }
          observeActivations() {
            const t = this.breakpoints.items.map(t => t.mediaQuery);
            this.matchMedia.observe(this.hook.withPrintQuery(t)).pipe(Ku(this.hook.interceptEvents(this)), Ru(this.hook.blockPropagation())).subscribe(this.onMediaChange.bind(this))
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(S_), sr(C_), sr(A_))
        }, t.\u0275prov = ht({
          factory: function () {
            return new t(sr(S_), sr(C_), sr(A_))
          },
          token: t,
          providedIn: "root"
        }), t
      })();

      function M_(t, e, n, r) {
        if (void 0 !== r) {
          let i = t.get(e);
          i || (i = new Map, t.set(e, i)), i.set(n, r)
        }
      }

      function N_(t) {
        return e => e.lift(new V_(t))
      }
      class V_ {
        constructor(t) {
          this.notifier = t
        }
        call(t, e) {
          const n = new j_(t),
            r = j(this.notifier, new N(n));
          return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n
        }
      }
      class j_ extends V {
        constructor(t) {
          super(t), this.seenValue = !1
        }
        notifyNext() {
          this.seenValue = !0, this.complete()
        }
        notifyComplete() {}
      }
      const U_ = "inline",
        B_ = ["row", "column", "row-reverse", "column-reverse"];

      function $_(t) {
        t = t ? t.toLowerCase() : "";
        let [e, n, r] = t.split(" ");
        return B_.find(t => t === e) || (e = B_[0]), n === U_ && (n = r !== U_ ? r : "", r = U_), [e, z_(n), !!r]
      }

      function H_(t) {
        let [e] = $_(t);
        return e.indexOf("row") > -1
      }

      function z_(t) {
        if (t) switch (t.toLowerCase()) {
          case "reverse":
          case "wrap-reverse":
          case "reverse-wrap":
            t = "wrap-reverse";
            break;
          case "no":
          case "none":
          case "nowrap":
            t = "nowrap";
            break;
          default:
            t = "wrap"
        }
        return t
      }
      let q_ = (() => {
        class t extends P_ {
          buildStyles(t) {
            return function (t) {
              let [e, n, r] = $_(t);
              return function (t, e = null, n = !1) {
                return {
                  display: n ? "inline-flex" : "flex",
                  "box-sizing": "border-box",
                  "flex-direction": t,
                  "flex-wrap": e || null
                }
              }(e, n, r)
            }(t)
          }
        }
        return t.\u0275fac = function () {
          let e;
          return function (n) {
            return (e || (e = Nn(t)))(n || t)
          }
        }(), t.\u0275prov = ht({
          factory: function () {
            return new t
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      const Q_ = ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"];
      let W_ = (() => {
          class t extends l_ {
            constructor(t, e, n, r) {
              super(t, n, e, r), this.DIRECTIVE_KEY = "layout", this.styleCache = K_, this.init()
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(I_), Ns(q_), Ns(F_))
          }, t.\u0275dir = Gt({
            type: t,
            features: [Es]
          }), t
        })(),
        G_ = (() => {
          class t extends W_ {
            constructor() {
              super(...arguments), this.inputs = Q_
            }
          }
          return t.\u0275fac = function () {
            let e;
            return function (n) {
              return (e || (e = Nn(t)))(n || t)
            }
          }(), t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "fxLayout", ""],
              ["", "fxLayout.xs", ""],
              ["", "fxLayout.sm", ""],
              ["", "fxLayout.md", ""],
              ["", "fxLayout.lg", ""],
              ["", "fxLayout.xl", ""],
              ["", "fxLayout.lt-sm", ""],
              ["", "fxLayout.lt-md", ""],
              ["", "fxLayout.lt-lg", ""],
              ["", "fxLayout.lt-xl", ""],
              ["", "fxLayout.gt-xs", ""],
              ["", "fxLayout.gt-sm", ""],
              ["", "fxLayout.gt-md", ""],
              ["", "fxLayout.gt-lg", ""]
            ],
            inputs: {
              fxLayout: "fxLayout",
              "fxLayout.xs": "fxLayout.xs",
              "fxLayout.sm": "fxLayout.sm",
              "fxLayout.md": "fxLayout.md",
              "fxLayout.lg": "fxLayout.lg",
              "fxLayout.xl": "fxLayout.xl",
              "fxLayout.lt-sm": "fxLayout.lt-sm",
              "fxLayout.lt-md": "fxLayout.lt-md",
              "fxLayout.lt-lg": "fxLayout.lt-lg",
              "fxLayout.lt-xl": "fxLayout.lt-xl",
              "fxLayout.gt-xs": "fxLayout.gt-xs",
              "fxLayout.gt-sm": "fxLayout.gt-sm",
              "fxLayout.gt-md": "fxLayout.gt-md",
              "fxLayout.gt-lg": "fxLayout.gt-lg"
            },
            features: [Es]
          }), t
        })();
      const K_ = new Map;

      function Z_(t, ...e) {
        if (null == t) throw TypeError("Cannot convert undefined or null to object");
        for (let n of e)
          if (null != n)
            for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
        return t
      }
      new Map, new Map, new Map, new Map;
      let Y_ = (() => {
        class t extends P_ {
          constructor(t) {
            super(), this.layoutConfig = t
          }
          buildStyles(t, e) {
            let [n, r, ...i] = t.split(" "), s = i.join(" ");
            const o = e.direction.indexOf("column") > -1 ? "column" : "row",
              a = H_(o) ? "max-width" : "max-height",
              l = H_(o) ? "min-width" : "min-height",
              c = String(s).indexOf("calc") > -1,
              u = c || "auto" === s,
              h = String(s).indexOf("%") > -1 && !c,
              d = String(s).indexOf("px") > -1 || String(s).indexOf("rem") > -1 || String(s).indexOf("em") > -1 || String(s).indexOf("vw") > -1 || String(s).indexOf("vh") > -1;
            let f = c || d;
            n = "0" == n ? 0 : n, r = "0" == r ? 0 : r;
            const p = !n && !r;
            let m = {};
            const g = {
              "max-width": null,
              "max-height": null,
              "min-width": null,
              "min-height": null
            };
            switch (s || "") {
              case "":
                const t = !1 !== this.layoutConfig.useColumnBasisZero;
                s = "row" === o ? "0%" : t ? "0.000000001px" : "auto";
                break;
              case "initial":
              case "nogrow":
                n = 0, s = "auto";
                break;
              case "grow":
                s = "100%";
                break;
              case "noshrink":
                r = 0, s = "auto";
                break;
              case "auto":
                break;
              case "none":
                n = 0, r = 0, s = "auto";
                break;
              default:
                f || h || isNaN(s) || (s += "%"), "0%" === s && (f = !0), "0px" === s && (s = "0%"), m = Z_(g, c ? {
                  "flex-grow": n,
                  "flex-shrink": r,
                  "flex-basis": f ? s : "100%"
                } : {
                  flex: `${n} ${r} ${f?s:"100%"}`
                })
            }
            return m.flex || m["flex-grow"] || (m = Z_(g, c ? {
              "flex-grow": n,
              "flex-shrink": r,
              "flex-basis": s
            } : {
              flex: `${n} ${r} ${s}`
            })), "0%" !== s && "0px" !== s && "0.000000001px" !== s && "auto" !== s && (m[l] = p || f && n ? s : null, m[a] = p || !u && r ? s : null), m[l] || m[a] ? e.hasWrap && (m[c ? "flex-basis" : "flex"] = m[a] ? c ? m[a] : `${n} ${r} ${m[a]}` : c ? m[l] : `${n} ${r} ${m[l]}`) : m = Z_(g, c ? {
              "flex-grow": n,
              "flex-shrink": r,
              "flex-basis": s
            } : {
              flex: `${n} ${r} ${s}`
            }), Z_(m, {
              "box-sizing": "border-box"
            })
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(sr(e_))
        }, t.\u0275prov = ht({
          factory: function () {
            return new t(sr(e_))
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      const J_ = ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"];
      let X_ = (() => {
          class t extends l_ {
            constructor(t, e, n, r, i) {
              super(t, r, e, i), this.layoutConfig = n, this.marshal = i, this.DIRECTIVE_KEY = "flex", this.direction = void 0, this.wrap = void 0, this.flexGrow = "1", this.flexShrink = "1", this.init()
            }
            get shrink() {
              return this.flexShrink
            }
            set shrink(t) {
              this.flexShrink = t || "1", this.triggerReflow()
            }
            get grow() {
              return this.flexGrow
            }
            set grow(t) {
              this.flexGrow = t || "1", this.triggerReflow()
            }
            ngOnInit() {
              this.parentElement && (this.marshal.trackValue(this.parentElement, "layout").pipe(N_(this.destroySubject)).subscribe(this.onLayoutChange.bind(this)), this.marshal.trackValue(this.nativeElement, "layout-align").pipe(N_(this.destroySubject)).subscribe(this.triggerReflow.bind(this)))
            }
            onLayoutChange(t) {
              const e = t.value.split(" ");
              this.direction = e[0], this.wrap = void 0 !== e[1] && "wrap" === e[1], this.triggerUpdate()
            }
            updateWithValue(t) {
              void 0 === this.direction && (this.direction = this.getFlexFlowDirection(this.parentElement, !1 !== this.layoutConfig.addFlexToParent)), void 0 === this.wrap && (this.wrap = this.hasWrap(this.parentElement));
              const e = this.direction,
                n = e.startsWith("row"),
                r = this.wrap;
              n && r ? this.styleCache = rb : n && !r ? this.styleCache = eb : !n && r ? this.styleCache = ib : n || r || (this.styleCache = nb);
              const i = L_(String(t).replace(";", ""), this.flexGrow, this.flexShrink);
              this.addStyles(i.join(" "), {
                direction: e,
                hasWrap: r
              })
            }
            triggerReflow() {
              const t = this.activatedValue;
              if (void 0 !== t) {
                const e = L_(t + "", this.flexGrow, this.flexShrink);
                this.marshal.updateElement(this.nativeElement, this.DIRECTIVE_KEY, e.join(" "))
              }
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(I_), Ns(e_), Ns(Y_), Ns(F_))
          }, t.\u0275dir = Gt({
            type: t,
            inputs: {
              shrink: ["fxShrink", "shrink"],
              grow: ["fxGrow", "grow"]
            },
            features: [Es]
          }), t
        })(),
        tb = (() => {
          class t extends X_ {
            constructor() {
              super(...arguments), this.inputs = J_
            }
          }
          return t.\u0275fac = function () {
            let e;
            return function (n) {
              return (e || (e = Nn(t)))(n || t)
            }
          }(), t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "fxFlex", ""],
              ["", "fxFlex.xs", ""],
              ["", "fxFlex.sm", ""],
              ["", "fxFlex.md", ""],
              ["", "fxFlex.lg", ""],
              ["", "fxFlex.xl", ""],
              ["", "fxFlex.lt-sm", ""],
              ["", "fxFlex.lt-md", ""],
              ["", "fxFlex.lt-lg", ""],
              ["", "fxFlex.lt-xl", ""],
              ["", "fxFlex.gt-xs", ""],
              ["", "fxFlex.gt-sm", ""],
              ["", "fxFlex.gt-md", ""],
              ["", "fxFlex.gt-lg", ""]
            ],
            inputs: {
              fxFlex: "fxFlex",
              "fxFlex.xs": "fxFlex.xs",
              "fxFlex.sm": "fxFlex.sm",
              "fxFlex.md": "fxFlex.md",
              "fxFlex.lg": "fxFlex.lg",
              "fxFlex.xl": "fxFlex.xl",
              "fxFlex.lt-sm": "fxFlex.lt-sm",
              "fxFlex.lt-md": "fxFlex.lt-md",
              "fxFlex.lt-lg": "fxFlex.lt-lg",
              "fxFlex.lt-xl": "fxFlex.lt-xl",
              "fxFlex.gt-xs": "fxFlex.gt-xs",
              "fxFlex.gt-sm": "fxFlex.gt-sm",
              "fxFlex.gt-md": "fxFlex.gt-md",
              "fxFlex.gt-lg": "fxFlex.gt-lg"
            },
            features: [Es]
          }), t
        })();
      const eb = new Map,
        nb = new Map,
        rb = new Map,
        ib = new Map;
      new Map, new Map, new Map, new Map, new Map, new Map;
      const sb = {
        margin: 0,
        width: "100%",
        height: "100%",
        "min-width": "100%",
        "min-height": "100%"
      };
      let ob = (() => {
          class t extends P_ {
            buildStyles(t) {
              return sb
            }
          }
          return t.\u0275fac = function () {
            let e;
            return function (n) {
              return (e || (e = Nn(t)))(n || t)
            }
          }(), t.\u0275prov = ht({
            factory: function () {
              return new t
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        ab = (() => {
          class t extends l_ {
            constructor(t, e, n, r) {
              super(t, n, e, r), this.styleCache = lb, this.addStyles("")
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(I_), Ns(ob), Ns(F_))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "fxFill", ""],
              ["", "fxFlexFill", ""]
            ],
            features: [Es]
          }), t
        })();
      const lb = new Map;
      let cb = (() => {
        class t extends P_ {
          buildStyles(t, e) {
            const n = {},
              [r, i] = t.split(" ");
            switch (r) {
              case "center":
                n["justify-content"] = "center";
                break;
              case "space-around":
                n["justify-content"] = "space-around";
                break;
              case "space-between":
                n["justify-content"] = "space-between";
                break;
              case "space-evenly":
                n["justify-content"] = "space-evenly";
                break;
              case "end":
              case "flex-end":
                n["justify-content"] = "flex-end";
                break;
              case "start":
              case "flex-start":
              default:
                n["justify-content"] = "flex-start"
            }
            switch (i) {
              case "start":
              case "flex-start":
                n["align-items"] = n["align-content"] = "flex-start";
                break;
              case "center":
                n["align-items"] = n["align-content"] = "center";
                break;
              case "end":
              case "flex-end":
                n["align-items"] = n["align-content"] = "flex-end";
                break;
              case "space-between":
                n["align-content"] = "space-between", n["align-items"] = "stretch";
                break;
              case "space-around":
                n["align-content"] = "space-around", n["align-items"] = "stretch";
                break;
              case "baseline":
                n["align-content"] = "stretch", n["align-items"] = "baseline";
                break;
              case "stretch":
              default:
                n["align-items"] = n["align-content"] = "stretch"
            }
            return Z_(n, {
              display: e.inline ? "inline-flex" : "flex",
              "flex-direction": e.layout,
              "box-sizing": "border-box",
              "max-width": "stretch" === i ? H_(e.layout) ? null : "100%" : null,
              "max-height": "stretch" === i && H_(e.layout) ? "100%" : null
            })
          }
        }
        return t.\u0275fac = function () {
          let e;
          return function (n) {
            return (e || (e = Nn(t)))(n || t)
          }
        }(), t.\u0275prov = ht({
          factory: function () {
            return new t
          },
          token: t,
          providedIn: "root"
        }), t
      })();
      const ub = ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"];
      let hb = (() => {
          class t extends l_ {
            constructor(t, e, n, r) {
              super(t, n, e, r), this.DIRECTIVE_KEY = "layout-align", this.layout = "row", this.inline = !1, this.init(), this.marshal.trackValue(this.nativeElement, "layout").pipe(N_(this.destroySubject)).subscribe(this.onLayoutChange.bind(this))
            }
            updateWithValue(t) {
              const e = this.layout || "row",
                n = this.inline;
              "row" === e && n ? this.styleCache = yb : "row" !== e || n ? "row-reverse" === e && n ? this.styleCache = bb : "row-reverse" !== e || n ? "column" === e && n ? this.styleCache = _b : "column" !== e || n ? "column-reverse" === e && n ? this.styleCache = vb : "column-reverse" !== e || n || (this.styleCache = gb) : this.styleCache = pb : this.styleCache = mb : this.styleCache = fb, this.addStyles(t, {
                layout: e,
                inline: n
              })
            }
            onLayoutChange(t) {
              const e = t.value.split(" ");
              this.layout = e[0], this.inline = t.value.includes("inline"), B_.find(t => t === this.layout) || (this.layout = "row"), this.triggerUpdate()
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(I_), Ns(cb), Ns(F_))
          }, t.\u0275dir = Gt({
            type: t,
            features: [Es]
          }), t
        })(),
        db = (() => {
          class t extends hb {
            constructor() {
              super(...arguments), this.inputs = ub
            }
          }
          return t.\u0275fac = function () {
            let e;
            return function (n) {
              return (e || (e = Nn(t)))(n || t)
            }
          }(), t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["", "fxLayoutAlign", ""],
              ["", "fxLayoutAlign.xs", ""],
              ["", "fxLayoutAlign.sm", ""],
              ["", "fxLayoutAlign.md", ""],
              ["", "fxLayoutAlign.lg", ""],
              ["", "fxLayoutAlign.xl", ""],
              ["", "fxLayoutAlign.lt-sm", ""],
              ["", "fxLayoutAlign.lt-md", ""],
              ["", "fxLayoutAlign.lt-lg", ""],
              ["", "fxLayoutAlign.lt-xl", ""],
              ["", "fxLayoutAlign.gt-xs", ""],
              ["", "fxLayoutAlign.gt-sm", ""],
              ["", "fxLayoutAlign.gt-md", ""],
              ["", "fxLayoutAlign.gt-lg", ""]
            ],
            inputs: {
              fxLayoutAlign: "fxLayoutAlign",
              "fxLayoutAlign.xs": "fxLayoutAlign.xs",
              "fxLayoutAlign.sm": "fxLayoutAlign.sm",
              "fxLayoutAlign.md": "fxLayoutAlign.md",
              "fxLayoutAlign.lg": "fxLayoutAlign.lg",
              "fxLayoutAlign.xl": "fxLayoutAlign.xl",
              "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
              "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
              "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
              "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
              "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
              "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
              "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
              "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg"
            },
            features: [Es]
          }), t
        })();
      const fb = new Map,
        pb = new Map,
        mb = new Map,
        gb = new Map,
        yb = new Map,
        _b = new Map,
        bb = new Map,
        vb = new Map;
      let wb = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          imports: [
            [Yy, Fp]
          ]
        }), t
      })();
      const xb = ["*", [
          ["mat-card-footer"]
        ]],
        Cb = ["*", "mat-card-footer"];
      let Sb = (() => {
          class t {
            constructor(t) {
              this._animationMode = t
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(by, 8))
          }, t.\u0275cmp = $t({
            type: t,
            selectors: [
              ["mat-card"]
            ],
            hostAttrs: [1, "mat-card", "mat-focus-indicator"],
            hostVars: 2,
            hostBindings: function (t, e) {
              2 & t && no("_mat-animation-noopable", "NoopAnimations" === e._animationMode)
            },
            exportAs: ["matCard"],
            ngContentSelectors: Cb,
            decls: 2,
            vars: 0,
            template: function (t, e) {
              1 & t && (Js(xb), Xs(0), Xs(1, 1))
            },
            styles: [".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],
            encapsulation: 2,
            changeDetection: 0
          }), t
        })(),
        Eb = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [Ty], Ty
            ]
          }), t
        })();

      function kb(t, e, n, i) {
        return r(n) && (i = n, n = void 0), i ? kb(t, e, n).pipe(k(t => l(t) ? i(...t) : i(t))) : new _(r => {
          Tb(t, e, function (t) {
            r.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t)
          }, r, n)
        })
      }

      function Tb(t, e, n, r, i) {
        let s;
        if (function (t) {
            return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
          }(t)) {
          const r = t;
          t.addEventListener(e, n, i), s = () => r.removeEventListener(e, n, i)
        } else if (function (t) {
            return t && "function" == typeof t.on && "function" == typeof t.off
          }(t)) {
          const r = t;
          t.on(e, n), s = () => r.off(e, n)
        } else if (function (t) {
            return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
          }(t)) {
          const r = t;
          t.addListener(e, n), s = () => r.removeListener(e, n)
        } else {
          if (!t || !t.length) throw new TypeError("Invalid event target");
          for (let s = 0, o = t.length; s < o; s++) Tb(t[s], e, n, r, i)
        }
        r.add(s)
      }
      const Ab = ["underline"],
        Ob = ["connectionContainer"],
        Rb = ["inputContainer"],
        Ib = ["label"];

      function Pb(t, e) {
        1 & t && (Hs(0), Us(1, "div", 14), $s(2, "div", 15), $s(3, "div", 16), $s(4, "div", 17), Bs(), Us(5, "div", 18), $s(6, "div", 15), $s(7, "div", 16), $s(8, "div", 17), Bs(), zs())
      }

      function Lb(t, e) {
        1 & t && (Us(0, "div", 19), Xs(1, 1), Bs())
      }

      function Db(t, e) {
        if (1 & t && (Hs(0), Xs(1, 2), Us(2, "span"), ao(3), Bs(), zs()), 2 & t) {
          const t = Zs(2);
          fi(3), lo(t._control.placeholder)
        }
      }

      function Fb(t, e) {
        1 & t && Xs(0, 3, ["*ngSwitchCase", "true"])
      }

      function Mb(t, e) {
        1 & t && (Us(0, "span", 23), ao(1, " *"), Bs())
      }

      function Nb(t, e) {
        if (1 & t) {
          const t = Ae();
          Us(0, "label", 20, 21), Ws("cdkObserveContent", function () {
            return ke.lFrame.contextLView = t, Zs().updateOutlineGap()
          }), Ms(2, Db, 4, 1, "ng-container", 12), Ms(3, Fb, 1, 0, "ng-content", 12), Ms(4, Mb, 2, 0, "span", 22), Bs()
        }
        if (2 & t) {
          const t = Zs();
          no("mat-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-form-field-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color), Vs("cdkObserveContentDisabled", "outline" != t.appearance)("id", t._labelId)("ngSwitch", t._hasLabel()), Fs("for", t._control.id)("aria-owns", t._control.id), fi(2), Vs("ngSwitchCase", !1), fi(1), Vs("ngSwitchCase", !0), fi(1), Vs("ngIf", !t.hideRequiredMarker && t._control.required && !t._control.disabled)
        }
      }

      function Vb(t, e) {
        1 & t && (Us(0, "div", 24), Xs(1, 4), Bs())
      }

      function jb(t, e) {
        if (1 & t && (Us(0, "div", 25, 26), $s(2, "span", 27), Bs()), 2 & t) {
          const t = Zs();
          fi(2), no("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color)
        }
      }

      function Ub(t, e) {
        1 & t && (Us(0, "div"), Xs(1, 5), Bs()), 2 & t && Vs("@transitionMessages", Zs()._subscriptAnimationState)
      }

      function Bb(t, e) {
        if (1 & t && (Us(0, "div", 31), ao(1), Bs()), 2 & t) {
          const t = Zs(2);
          Vs("id", t._hintLabelId), fi(1), lo(t.hintLabel)
        }
      }

      function $b(t, e) {
        if (1 & t && (Us(0, "div", 28), Ms(1, Bb, 2, 2, "div", 29), Xs(2, 6), $s(3, "div", 30), Xs(4, 7), Bs()), 2 & t) {
          const t = Zs();
          Vs("@transitionMessages", t._subscriptAnimationState), fi(1), Vs("ngIf", t.hintLabel)
        }
      }
      const Hb = ["*", [
            ["", "matPrefix", ""]
          ],
          [
            ["mat-placeholder"]
          ],
          [
            ["mat-label"]
          ],
          [
            ["", "matSuffix", ""]
          ],
          [
            ["mat-error"]
          ],
          [
            ["mat-hint", 3, "align", "end"]
          ],
          [
            ["mat-hint", "align", "end"]
          ]
        ],
        zb = ["*", "[matPrefix]", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"],
        qb = new Bn("MatError"),
        Qb = {
          transitionMessages: jp("transitionMessages", [Hp("enter", $p({
            opacity: 1,
            transform: "translateY(0%)"
          })), zp("void => enter", [$p({
            opacity: 0,
            transform: "translateY(-5px)"
          }), Up("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])
        };
      let Wb = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275dir = Gt({
          type: t
        }), t
      })();
      const Gb = new Bn("MatHint");
      let Kb = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["mat-label"]
            ]
          }), t
        })(),
        Zb = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["mat-placeholder"]
            ]
          }), t
        })();
      const Yb = new Bn("MatPrefix"),
        Jb = new Bn("MatSuffix");
      let Xb = 0;
      class tv {
        constructor(t) {
          this._elementRef = t
        }
      }
      const ev = Oy(tv, "primary"),
        nv = new Bn("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
        rv = new Bn("MatFormField");
      let iv = (() => {
          class t extends ev {
            constructor(t, e, n, r, i, s, o, a) {
              super(t), this._elementRef = t, this._changeDetectorRef = e, this._dir = r, this._defaults = i, this._platform = s, this._ngZone = o, this._outlineGapCalculationNeededImmediately = !1, this._outlineGapCalculationNeededOnStable = !1, this._destroyed = new C, this._showAlwaysAnimate = !1, this._subscriptAnimationState = "", this._hintLabel = "", this._hintLabelId = "mat-hint-" + Xb++, this._labelId = "mat-form-field-label-" + Xb++, this.floatLabel = this._getDefaultFloatLabelState(), this._animationsEnabled = "NoopAnimations" !== a, this.appearance = i && i.appearance ? i.appearance : "legacy", this._hideRequiredMarker = !(!i || null == i.hideRequiredMarker) && i.hideRequiredMarker
            }
            get appearance() {
              return this._appearance
            }
            set appearance(t) {
              const e = this._appearance;
              this._appearance = t || this._defaults && this._defaults.appearance || "legacy", "outline" === this._appearance && e !== t && (this._outlineGapCalculationNeededOnStable = !0)
            }
            get hideRequiredMarker() {
              return this._hideRequiredMarker
            }
            set hideRequiredMarker(t) {
              this._hideRequiredMarker = ep(t)
            }
            _shouldAlwaysFloat() {
              return "always" === this.floatLabel && !this._showAlwaysAnimate
            }
            _canLabelFloat() {
              return "never" !== this.floatLabel
            }
            get hintLabel() {
              return this._hintLabel
            }
            set hintLabel(t) {
              this._hintLabel = t, this._processHints()
            }
            get floatLabel() {
              return "legacy" !== this.appearance && "never" === this._floatLabel ? "auto" : this._floatLabel
            }
            set floatLabel(t) {
              t !== this._floatLabel && (this._floatLabel = t || this._getDefaultFloatLabelState(), this._changeDetectorRef.markForCheck())
            }
            get _control() {
              return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic
            }
            set _control(t) {
              this._explicitFormFieldControl = t
            }
            getLabelId() {
              return this._hasFloatingLabel() ? this._labelId : null
            }
            getConnectedOverlayOrigin() {
              return this._connectionContainerRef || this._elementRef
            }
            ngAfterContentInit() {
              this._validateControlChild();
              const t = this._control;
              t.controlType && this._elementRef.nativeElement.classList.add(`mat-form-field-type-${t.controlType}`), t.stateChanges.pipe(ku(null)).subscribe(() => {
                this._validatePlaceholders(), this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
              }), t.ngControl && t.ngControl.valueChanges && t.ngControl.valueChanges.pipe(N_(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck()), this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable.pipe(N_(this._destroyed)).subscribe(() => {
                  this._outlineGapCalculationNeededOnStable && this.updateOutlineGap()
                })
              }), q(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
                this._outlineGapCalculationNeededOnStable = !0, this._changeDetectorRef.markForCheck()
              }), this._hintChildren.changes.pipe(ku(null)).subscribe(() => {
                this._processHints(), this._changeDetectorRef.markForCheck()
              }), this._errorChildren.changes.pipe(ku(null)).subscribe(() => {
                this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
              }), this._dir && this._dir.change.pipe(N_(this._destroyed)).subscribe(() => {
                "function" == typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => this.updateOutlineGap())
                }) : this.updateOutlineGap()
              })
            }
            ngAfterContentChecked() {
              this._validateControlChild(), this._outlineGapCalculationNeededImmediately && this.updateOutlineGap()
            }
            ngAfterViewInit() {
              this._subscriptAnimationState = "enter", this._changeDetectorRef.detectChanges()
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete()
            }
            _shouldForward(t) {
              const e = this._control ? this._control.ngControl : null;
              return e && e[t]
            }
            _hasPlaceholder() {
              return !!(this._control && this._control.placeholder || this._placeholderChild)
            }
            _hasLabel() {
              return !(!this._labelChildNonStatic && !this._labelChildStatic)
            }
            _shouldLabelFloat() {
              return this._canLabelFloat() && (this._control && this._control.shouldLabelFloat || this._shouldAlwaysFloat())
            }
            _hideControlPlaceholder() {
              return "legacy" === this.appearance && !this._hasLabel() || this._hasLabel() && !this._shouldLabelFloat()
            }
            _hasFloatingLabel() {
              return this._hasLabel() || "legacy" === this.appearance && this._hasPlaceholder()
            }
            _getDisplayedMessages() {
              return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint"
            }
            _animateAndLockLabel() {
              this._hasFloatingLabel() && this._canLabelFloat() && (this._animationsEnabled && this._label && (this._showAlwaysAnimate = !0, kb(this._label.nativeElement, "transitionend").pipe(Cu(1)).subscribe(() => {
                this._showAlwaysAnimate = !1
              })), this.floatLabel = "always", this._changeDetectorRef.markForCheck())
            }
            _validatePlaceholders() {}
            _processHints() {
              this._validateHints(), this._syncDescribedByIds()
            }
            _validateHints() {}
            _getDefaultFloatLabelState() {
              return this._defaults && this._defaults.floatLabel || "auto"
            }
            _syncDescribedByIds() {
              if (this._control) {
                let t = [];
                if (this._control.userAriaDescribedBy && "string" == typeof this._control.userAriaDescribedBy && t.push(...this._control.userAriaDescribedBy.split(" ")), "hint" === this._getDisplayedMessages()) {
                  const e = this._hintChildren ? this._hintChildren.find(t => "start" === t.align) : null,
                    n = this._hintChildren ? this._hintChildren.find(t => "end" === t.align) : null;
                  e ? t.push(e.id) : this._hintLabel && t.push(this._hintLabelId), n && t.push(n.id)
                } else this._errorChildren && t.push(...this._errorChildren.map(t => t.id));
                this._control.setDescribedByIds(t)
              }
            }
            _validateControlChild() {}
            updateOutlineGap() {
              const t = this._label ? this._label.nativeElement : null;
              if ("outline" !== this.appearance || !t || !t.children.length || !t.textContent.trim()) return;
              if (!this._platform.isBrowser) return;
              if (!this._isAttachedToDOM()) return void(this._outlineGapCalculationNeededImmediately = !0);
              let e = 0,
                n = 0;
              const r = this._connectionContainerRef.nativeElement,
                i = r.querySelectorAll(".mat-form-field-outline-start"),
                s = r.querySelectorAll(".mat-form-field-outline-gap");
              if (this._label && this._label.nativeElement.children.length) {
                const i = r.getBoundingClientRect();
                if (0 === i.width && 0 === i.height) return this._outlineGapCalculationNeededOnStable = !0, void(this._outlineGapCalculationNeededImmediately = !1);
                const s = this._getStartEnd(i),
                  o = t.children,
                  a = this._getStartEnd(o[0].getBoundingClientRect());
                let l = 0;
                for (let t = 0; t < o.length; t++) l += o[t].offsetWidth;
                e = Math.abs(a - s) - 5, n = l > 0 ? .75 * l + 10 : 0
              }
              for (let o = 0; o < i.length; o++) i[o].style.width = `${e}px`;
              for (let o = 0; o < s.length; o++) s[o].style.width = `${n}px`;
              this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1
            }
            _getStartEnd(t) {
              return this._dir && "rtl" === this._dir.value ? t.right : t.left
            }
            _isAttachedToDOM() {
              const t = this._elementRef.nativeElement;
              if (t.getRootNode) {
                const e = t.getRootNode();
                return e && e !== t
              }
              return document.documentElement.contains(t)
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(ia), Ns(Do), Ns(Dp, 8), Ns(nv, 8), Ns(ip), Ns(_l), Ns(by, 8))
          }, t.\u0275cmp = $t({
            type: t,
            selectors: [
              ["mat-form-field"]
            ],
            contentQueries: function (t, e, n) {
              if (1 & t && (Qa(n, Wb, 5), Qa(n, Wb, 7), Qa(n, Kb, 5), Qa(n, Kb, 7), Qa(n, Zb, 5), Qa(n, qb, 5), Qa(n, Gb, 5), Qa(n, Yb, 5), Qa(n, Jb, 5)), 2 & t) {
                let t;
                za(t = Wa()) && (e._controlNonStatic = t.first), za(t = Wa()) && (e._controlStatic = t.first), za(t = Wa()) && (e._labelChildNonStatic = t.first), za(t = Wa()) && (e._labelChildStatic = t.first), za(t = Wa()) && (e._placeholderChild = t.first), za(t = Wa()) && (e._errorChildren = t), za(t = Wa()) && (e._hintChildren = t), za(t = Wa()) && (e._prefixChildren = t), za(t = Wa()) && (e._suffixChildren = t)
              }
            },
            viewQuery: function (t, e) {
              if (1 & t && (qa(Ab, 5), qa(Ob, 7), qa(Rb, 5), qa(Ib, 5)), 2 & t) {
                let t;
                za(t = Wa()) && (e.underlineRef = t.first), za(t = Wa()) && (e._connectionContainerRef = t.first), za(t = Wa()) && (e._inputContainerRef = t.first), za(t = Wa()) && (e._label = t.first)
              }
            },
            hostAttrs: [1, "mat-form-field"],
            hostVars: 40,
            hostBindings: function (t, e) {
              2 & t && no("mat-form-field-appearance-standard", "standard" == e.appearance)("mat-form-field-appearance-fill", "fill" == e.appearance)("mat-form-field-appearance-outline", "outline" == e.appearance)("mat-form-field-appearance-legacy", "legacy" == e.appearance)("mat-form-field-invalid", e._control.errorState)("mat-form-field-can-float", e._canLabelFloat())("mat-form-field-should-float", e._shouldLabelFloat())("mat-form-field-has-label", e._hasFloatingLabel())("mat-form-field-hide-placeholder", e._hideControlPlaceholder())("mat-form-field-disabled", e._control.disabled)("mat-form-field-autofilled", e._control.autofilled)("mat-focused", e._control.focused)("ng-untouched", e._shouldForward("untouched"))("ng-touched", e._shouldForward("touched"))("ng-pristine", e._shouldForward("pristine"))("ng-dirty", e._shouldForward("dirty"))("ng-valid", e._shouldForward("valid"))("ng-invalid", e._shouldForward("invalid"))("ng-pending", e._shouldForward("pending"))("_mat-animation-noopable", !e._animationsEnabled)
            },
            inputs: {
              color: "color",
              floatLabel: "floatLabel",
              appearance: "appearance",
              hideRequiredMarker: "hideRequiredMarker",
              hintLabel: "hintLabel"
            },
            exportAs: ["matFormField"],
            features: [To([{
              provide: rv,
              useExisting: t
            }]), Es],
            ngContentSelectors: zb,
            decls: 15,
            vars: 8,
            consts: [
              [1, "mat-form-field-wrapper"],
              [1, "mat-form-field-flex", 3, "click"],
              ["connectionContainer", ""],
              [4, "ngIf"],
              ["class", "mat-form-field-prefix", 4, "ngIf"],
              [1, "mat-form-field-infix"],
              ["inputContainer", ""],
              [1, "mat-form-field-label-wrapper"],
              ["class", "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "mat-empty", "mat-form-field-empty", "mat-accent", "mat-warn", "ngSwitch", "cdkObserveContent", 4, "ngIf"],
              ["class", "mat-form-field-suffix", 4, "ngIf"],
              ["class", "mat-form-field-underline", 4, "ngIf"],
              [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"],
              [4, "ngSwitchCase"],
              ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"],
              [1, "mat-form-field-outline"],
              [1, "mat-form-field-outline-start"],
              [1, "mat-form-field-outline-gap"],
              [1, "mat-form-field-outline-end"],
              [1, "mat-form-field-outline", "mat-form-field-outline-thick"],
              [1, "mat-form-field-prefix"],
              [1, "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "ngSwitch", "cdkObserveContent"],
              ["label", ""],
              ["class", "mat-placeholder-required mat-form-field-required-marker", "aria-hidden", "true", 4, "ngIf"],
              ["aria-hidden", "true", 1, "mat-placeholder-required", "mat-form-field-required-marker"],
              [1, "mat-form-field-suffix"],
              [1, "mat-form-field-underline"],
              ["underline", ""],
              [1, "mat-form-field-ripple"],
              [1, "mat-form-field-hint-wrapper"],
              ["class", "mat-hint", 3, "id", 4, "ngIf"],
              [1, "mat-form-field-hint-spacer"],
              [1, "mat-hint", 3, "id"]
            ],
            template: function (t, e) {
              1 & t && (Js(Hb), Us(0, "div", 0), Us(1, "div", 1, 2), Ws("click", function (t) {
                return e._control.onContainerClick && e._control.onContainerClick(t)
              }), Ms(3, Pb, 9, 0, "ng-container", 3), Ms(4, Lb, 2, 0, "div", 4), Us(5, "div", 5, 6), Xs(7), Us(8, "span", 7), Ms(9, Nb, 5, 16, "label", 8), Bs(), Bs(), Ms(10, Vb, 2, 0, "div", 9), Bs(), Ms(11, jb, 3, 4, "div", 10), Us(12, "div", 11), Ms(13, Ub, 2, 1, "div", 12), Ms(14, $b, 5, 2, "div", 13), Bs(), Bs()), 2 & t && (fi(3), Vs("ngIf", "outline" == e.appearance), fi(1), Vs("ngIf", e._prefixChildren.length), fi(5), Vs("ngIf", e._hasFloatingLabel()), fi(1), Vs("ngIf", e._suffixChildren.length), fi(1), Vs("ngIf", "outline" != e.appearance), fi(1), Vs("ngSwitch", e._getDisplayedMessages()), fi(1), Vs("ngSwitchCase", "error"), fi(1), Vs("ngSwitchCase", "hint"))
            },
            directives: [_c, xc, Cc, wp],
            styles: [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}\n", '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}\n', '.mat-input-element{font:inherit;background:transparent;color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-input-element::-ms-value{color:inherit}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}\n', ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}\n", ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}\n", ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}\n"],
            encapsulation: 2,
            data: {
              animation: [Qb.transitionMessages]
            },
            changeDetection: 0
          }), t
        })(),
        sv = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [Sc, Ty, xp], Ty
            ]
          }), t
        })();
      const ov = up({
        passive: !0
      });
      let av = (() => {
          class t {
            constructor(t, e) {
              this._platform = t, this._ngZone = e, this._monitoredElements = new Map
            }
            monitor(t) {
              if (!this._platform.isBrowser) return gu;
              const e = np(t),
                n = this._monitoredElements.get(e);
              if (n) return n.subject;
              const r = new C,
                i = "cdk-text-field-autofilled",
                s = t => {
                  "cdk-text-field-autofill-start" !== t.animationName || e.classList.contains(i) ? "cdk-text-field-autofill-end" === t.animationName && e.classList.contains(i) && (e.classList.remove(i), this._ngZone.run(() => r.next({
                    target: t.target,
                    isAutofilled: !1
                  }))) : (e.classList.add(i), this._ngZone.run(() => r.next({
                    target: t.target,
                    isAutofilled: !0
                  })))
                };
              return this._ngZone.runOutsideAngular(() => {
                e.addEventListener("animationstart", s, ov), e.classList.add("cdk-text-field-autofill-monitored")
              }), this._monitoredElements.set(e, {
                subject: r,
                unlisten: () => {
                  e.removeEventListener("animationstart", s, ov)
                }
              }), r
            }
            stopMonitoring(t) {
              const e = np(t),
                n = this._monitoredElements.get(e);
              n && (n.unlisten(), n.subject.complete(), e.classList.remove("cdk-text-field-autofill-monitored"), e.classList.remove("cdk-text-field-autofilled"), this._monitoredElements.delete(e))
            }
            ngOnDestroy() {
              this._monitoredElements.forEach((t, e) => this.stopMonitoring(e))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(ip), sr(_l))
          }, t.\u0275prov = ht({
            factory: function () {
              return new t(sr(ip), sr(_l))
            },
            token: t,
            providedIn: "root"
          }), t
        })(),
        lv = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [sp]
            ]
          }), t
        })();

      function cv(t, e) {
        return new _(n => {
          const r = t.length;
          if (0 === r) return void n.complete();
          const i = new Array(r);
          let s = 0,
            o = 0;
          for (let a = 0; a < r; a++) {
            const l = M(t[a]);
            let c = !1;
            n.add(l.subscribe({
              next: t => {
                c || (c = !0, o++), i[a] = t
              },
              error: t => n.error(t),
              complete: () => {
                s++, s !== r && c || (o === r && n.next(e ? e.reduce((t, e, n) => (t[e] = i[n], t), {}) : i), n.complete())
              }
            }))
          }
        })
      }
      const uv = new Bn("NgValidators"),
        hv = new Bn("NgAsyncValidators");

      function dv(t) {
        return null != t
      }

      function fv(t) {
        const e = qs(t) ? M(t) : t;
        return Qs(e), e
      }

      function pv(t) {
        let e = {};
        return t.forEach(t => {
          e = null != t ? Object.assign(Object.assign({}, e), t) : e
        }), 0 === Object.keys(e).length ? null : e
      }

      function mv(t, e) {
        return e.map(e => e(t))
      }

      function gv(t) {
        return t.map(t => function (t) {
          return !t.validate
        }(t) ? t : e => t.validate(e))
      }

      function yv(t) {
        return null != t ? function (t) {
          if (!t) return null;
          const e = t.filter(dv);
          return 0 == e.length ? null : function (t) {
            return pv(mv(t, e))
          }
        }(gv(t)) : null
      }

      function _v(t) {
        return null != t ? function (t) {
          if (!t) return null;
          const e = t.filter(dv);
          return 0 == e.length ? null : function (t) {
            return function (...t) {
              if (1 === t.length) {
                const e = t[0];
                if (l(e)) return cv(e, null);
                if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                  const t = Object.keys(e);
                  return cv(t.map(t => e[t]), t)
                }
              }
              if ("function" == typeof t[t.length - 1]) {
                const e = t.pop();
                return cv(t = 1 === t.length && l(t[0]) ? t[0] : t, null).pipe(k(t => e(...t)))
              }
              return cv(t, null)
            }(mv(t, e).map(fv)).pipe(k(pv))
          }
        }(gv(t)) : null
      }

      function bv(t, e) {
        return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e]
      }

      function vv(t) {
        return t._rawValidators
      }

      function wv(t) {
        return t._rawAsyncValidators
      }
      let xv = (() => {
          class t {
            constructor() {
              this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
            }
            get value() {
              return this.control ? this.control.value : null
            }
            get valid() {
              return this.control ? this.control.valid : null
            }
            get invalid() {
              return this.control ? this.control.invalid : null
            }
            get pending() {
              return this.control ? this.control.pending : null
            }
            get disabled() {
              return this.control ? this.control.disabled : null
            }
            get enabled() {
              return this.control ? this.control.enabled : null
            }
            get errors() {
              return this.control ? this.control.errors : null
            }
            get pristine() {
              return this.control ? this.control.pristine : null
            }
            get dirty() {
              return this.control ? this.control.dirty : null
            }
            get touched() {
              return this.control ? this.control.touched : null
            }
            get status() {
              return this.control ? this.control.status : null
            }
            get untouched() {
              return this.control ? this.control.untouched : null
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null
            }
            get path() {
              return null
            }
            _setValidators(t) {
              this._rawValidators = t || [], this._composedValidatorFn = yv(this._rawValidators)
            }
            _setAsyncValidators(t) {
              this._rawAsyncValidators = t || [], this._composedAsyncValidatorFn = _v(this._rawAsyncValidators)
            }
            get validator() {
              return this._composedValidatorFn || null
            }
            get asyncValidator() {
              return this._composedAsyncValidatorFn || null
            }
            _registerOnDestroy(t) {
              this._onDestroyCallbacks.push(t)
            }
            _invokeOnDestroyCallbacks() {
              this._onDestroyCallbacks.forEach(t => t()), this._onDestroyCallbacks = []
            }
            reset(t) {
              this.control && this.control.reset(t)
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e)
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275dir = Gt({
            type: t
          }), t
        })(),
        Cv = (() => {
          class t extends xv {
            get formDirective() {
              return null
            }
            get path() {
              return null
            }
          }
          return t.\u0275fac = function () {
            let e;
            return function (n) {
              return (e || (e = Nn(t)))(n || t)
            }
          }(), t.\u0275dir = Gt({
            type: t,
            features: [Es]
          }), t
        })();
      class Sv extends xv {
        constructor() {
          super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
        }
      }

      function Ev(t, e) {
        Av(t, e), e.valueAccessor.writeValue(t.value),
          function (t, e) {
            e.valueAccessor.registerOnChange(n => {
              t._pendingValue = n, t._pendingChange = !0, t._pendingDirty = !0, "change" === t.updateOn && Rv(t, e)
            })
          }(t, e),
          function (t, e) {
            const n = (t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t)
            };
            t.registerOnChange(n), e._registerOnDestroy(() => {
              t._unregisterOnChange(n)
            })
          }(t, e),
          function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              t._pendingTouched = !0, "blur" === t.updateOn && t._pendingChange && Rv(t, e), "submit" !== t.updateOn && t.markAsTouched()
            })
          }(t, e),
          function (t, e) {
            if (e.valueAccessor.setDisabledState) {
              const n = t => {
                e.valueAccessor.setDisabledState(t)
              };
              t.registerOnDisabledChange(n), e._registerOnDestroy(() => {
                t._unregisterOnDisabledChange(n)
              })
            }
          }(t, e)
      }

      function kv(t, e, n = !0) {
        const r = () => {};
        e.valueAccessor && (e.valueAccessor.registerOnChange(r), e.valueAccessor.registerOnTouched(r)), Ov(t, e), t && (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}))
      }

      function Tv(t, e) {
        t.forEach(t => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e)
        })
      }

      function Av(t, e) {
        const n = vv(t);
        null !== e.validator ? t.setValidators(bv(n, e.validator)) : "function" == typeof n && t.setValidators([n]);
        const r = wv(t);
        null !== e.asyncValidator ? t.setAsyncValidators(bv(r, e.asyncValidator)) : "function" == typeof r && t.setAsyncValidators([r]);
        const i = () => t.updateValueAndValidity();
        Tv(e._rawValidators, i), Tv(e._rawAsyncValidators, i)
      }

      function Ov(t, e) {
        let n = !1;
        if (null !== t) {
          if (null !== e.validator) {
            const r = vv(t);
            if (Array.isArray(r) && r.length > 0) {
              const i = r.filter(t => t !== e.validator);
              i.length !== r.length && (n = !0, t.setValidators(i))
            }
          }
          if (null !== e.asyncValidator) {
            const r = wv(t);
            if (Array.isArray(r) && r.length > 0) {
              const i = r.filter(t => t !== e.asyncValidator);
              i.length !== r.length && (n = !0, t.setAsyncValidators(i))
            }
          }
        }
        const r = () => {};
        return Tv(e._rawValidators, r), Tv(e._rawAsyncValidators, r), n
      }

      function Rv(t, e) {
        t._pendingDirty && t.markAsDirty(), t.setValue(t._pendingValue, {
          emitModelToViewChange: !1
        }), e.viewToModelUpdate(t._pendingValue), t._pendingChange = !1
      }

      function Iv(t, e) {
        Av(t, e)
      }

      function Pv(t, e) {
        t._syncPendingControls(), e.forEach(t => {
          const e = t.control;
          "submit" === e.updateOn && e._pendingChange && (t.viewToModelUpdate(e._pendingValue), e._pendingChange = !1)
        })
      }

      function Lv(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1)
      }
      const Dv = "VALID",
        Fv = "INVALID",
        Mv = "PENDING",
        Nv = "DISABLED";

      function Vv(t) {
        return ($v(t) ? t.validators : t) || null
      }

      function jv(t) {
        return Array.isArray(t) ? yv(t) : t || null
      }

      function Uv(t, e) {
        return ($v(e) ? e.asyncValidators : t) || null
      }

      function Bv(t) {
        return Array.isArray(t) ? _v(t) : t || null
      }

      function $v(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t
      }
      class Hv {
        constructor(t, e) {
          this._hasOwnPendingAsyncValidator = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._rawValidators = t, this._rawAsyncValidators = e, this._composedValidatorFn = jv(this._rawValidators), this._composedAsyncValidatorFn = Bv(this._rawAsyncValidators)
        }
        get validator() {
          return this._composedValidatorFn
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t
        }
        get parent() {
          return this._parent
        }
        get valid() {
          return this.status === Dv
        }
        get invalid() {
          return this.status === Fv
        }
        get pending() {
          return this.status == Mv
        }
        get disabled() {
          return this.status === Nv
        }
        get enabled() {
          return this.status !== Nv
        }
        get dirty() {
          return !this.pristine
        }
        get untouched() {
          return !this.touched
        }
        get updateOn() {
          return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
        }
        setValidators(t) {
          this._rawValidators = t, this._composedValidatorFn = jv(t)
        }
        setAsyncValidators(t) {
          this._rawAsyncValidators = t, this._composedAsyncValidatorFn = Bv(t)
        }
        clearValidators() {
          this.validator = null
        }
        clearAsyncValidators() {
          this.asyncValidator = null
        }
        markAsTouched(t = {}) {
          this.touched = !0, this._parent && !t.onlySelf && this._parent.markAsTouched(t)
        }
        markAllAsTouched() {
          this.markAsTouched({
            onlySelf: !0
          }), this._forEachChild(t => t.markAllAsTouched())
        }
        markAsUntouched(t = {}) {
          this.touched = !1, this._pendingTouched = !1, this._forEachChild(t => {
            t.markAsUntouched({
              onlySelf: !0
            })
          }), this._parent && !t.onlySelf && this._parent._updateTouched(t)
        }
        markAsDirty(t = {}) {
          this.pristine = !1, this._parent && !t.onlySelf && this._parent.markAsDirty(t)
        }
        markAsPristine(t = {}) {
          this.pristine = !0, this._pendingDirty = !1, this._forEachChild(t => {
            t.markAsPristine({
              onlySelf: !0
            })
          }), this._parent && !t.onlySelf && this._parent._updatePristine(t)
        }
        markAsPending(t = {}) {
          this.status = Mv, !1 !== t.emitEvent && this.statusChanges.emit(this.status), this._parent && !t.onlySelf && this._parent.markAsPending(t)
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          this.status = Nv, this.errors = null, this._forEachChild(e => {
            e.disable(Object.assign(Object.assign({}, t), {
              onlySelf: !0
            }))
          }), this._updateValue(), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(Object.assign(Object.assign({}, t), {
            skipPristineCheck: e
          })), this._onDisabledChange.forEach(t => t(!0))
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          this.status = Dv, this._forEachChild(e => {
            e.enable(Object.assign(Object.assign({}, t), {
              onlySelf: !0
            }))
          }), this.updateValueAndValidity({
            onlySelf: !0,
            emitEvent: t.emitEvent
          }), this._updateAncestors(Object.assign(Object.assign({}, t), {
            skipPristineCheck: e
          })), this._onDisabledChange.forEach(t => t(!1))
        }
        _updateAncestors(t) {
          this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
        }
        setParent(t) {
          this._parent = t
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), this.status !== Dv && this.status !== Mv || this._runAsyncValidator(t.emitEvent)), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
        }
        _updateTreeValidity(t = {
          emitEvent: !0
        }) {
          this._forEachChild(e => e._updateTreeValidity(t)), this.updateValueAndValidity({
            onlySelf: !0,
            emitEvent: t.emitEvent
          })
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Nv : Dv
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = Mv, this._hasOwnPendingAsyncValidator = !0;
            const e = fv(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe(e => {
              this._hasOwnPendingAsyncValidator = !1, this.setErrors(e, {
                emitEvent: t
              })
            })
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
        }
        setErrors(t, e = {}) {
          this.errors = t, this._updateControlsErrors(!1 !== e.emitEvent)
        }
        get(t) {
          return function (t, e, n) {
            if (null == e) return null;
            if (Array.isArray(e) || (e = e.split(".")), Array.isArray(e) && 0 === e.length) return null;
            let r = t;
            return e.forEach(t => {
              r = r instanceof qv ? r.controls.hasOwnProperty(t) ? r.controls[t] : null : r instanceof Qv && r.at(t) || null
            }), r
          }(this, t)
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null
        }
        hasError(t, e) {
          return !!this.getError(t, e)
        }
        get root() {
          let t = this;
          for (; t._parent;) t = t._parent;
          return t
        }
        _updateControlsErrors(t) {
          this.status = this._calculateStatus(), t && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(t)
        }
        _initObservables() {
          this.valueChanges = new Pa, this.statusChanges = new Pa
        }
        _calculateStatus() {
          return this._allControlsDisabled() ? Nv : this.errors ? Fv : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Mv) ? Mv : this._anyControlsHaveStatus(Fv) ? Fv : Dv
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls(e => e.status === t)
        }
        _anyControlsDirty() {
          return this._anyControls(t => t.dirty)
        }
        _anyControlsTouched() {
          return this._anyControls(t => t.touched)
        }
        _updatePristine(t = {}) {
          this.pristine = !this._anyControlsDirty(), this._parent && !t.onlySelf && this._parent._updatePristine(t)
        }
        _updateTouched(t = {}) {
          this.touched = this._anyControlsTouched(), this._parent && !t.onlySelf && this._parent._updateTouched(t)
        }
        _isBoxedValue(t) {
          return "object" == typeof t && null !== t && 2 === Object.keys(t).length && "value" in t && "disabled" in t
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t
        }
        _setUpdateStrategy(t) {
          $v(t) && null != t.updateOn && (this._updateOn = t.updateOn)
        }
        _parentMarkedDirty(t) {
          return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
        }
      }
      class zv extends Hv {
        constructor(t = null, e, n) {
          super(Vv(e), Uv(n, e)), this._onChange = [], this._applyFormState(t), this._setUpdateStrategy(e), this._initObservables(), this.updateValueAndValidity({
            onlySelf: !0,
            emitEvent: !!n
          })
        }
        setValue(t, e = {}) {
          this.value = this._pendingValue = t, this._onChange.length && !1 !== e.emitModelToViewChange && this._onChange.forEach(t => t(this.value, !1 !== e.emitViewToModelChange)), this.updateValueAndValidity(e)
        }
        patchValue(t, e = {}) {
          this.setValue(t, e)
        }
        reset(t = null, e = {}) {
          this._applyFormState(t), this.markAsPristine(e), this.markAsUntouched(e), this.setValue(this.value, e), this._pendingChange = !1
        }
        _updateValue() {}
        _anyControls(t) {
          return !1
        }
        _allControlsDisabled() {
          return this.disabled
        }
        registerOnChange(t) {
          this._onChange.push(t)
        }
        _unregisterOnChange(t) {
          Lv(this._onChange, t)
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t)
        }
        _unregisterOnDisabledChange(t) {
          Lv(this._onDisabledChange, t)
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
            onlySelf: !0,
            emitModelToViewChange: !1
          }), 0))
        }
        _applyFormState(t) {
          this._isBoxedValue(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
            onlySelf: !0,
            emitEvent: !1
          }) : this.enable({
            onlySelf: !0,
            emitEvent: !1
          })) : this.value = this._pendingValue = t
        }
      }
      class qv extends Hv {
        constructor(t, e, n) {
          super(Vv(e), Uv(n, e)), this.controls = t, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
            onlySelf: !0,
            emitEvent: !!n
          })
        }
        registerControl(t, e) {
          return this.controls[t] ? this.controls[t] : (this.controls[t] = e, e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e)
        }
        addControl(t, e, n = {}) {
          this.registerControl(t, e), this.updateValueAndValidity({
            emitEvent: n.emitEvent
          }), this._onCollectionChange()
        }
        removeControl(t, e = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], this.updateValueAndValidity({
            emitEvent: e.emitEvent
          }), this._onCollectionChange()
        }
        setControl(t, e, n = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], e && this.registerControl(t, e), this.updateValueAndValidity({
            emitEvent: n.emitEvent
          }), this._onCollectionChange()
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t), Object.keys(t).forEach(n => {
            this._throwIfControlMissing(n), this.controls[n].setValue(t[n], {
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
          }), this.updateValueAndValidity(e)
        }
        patchValue(t, e = {}) {
          null != t && (Object.keys(t).forEach(n => {
            this.controls[n] && this.controls[n].patchValue(t[n], {
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
          }), this.updateValueAndValidity(e))
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], {
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
          }), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
        }
        getRawValue() {
          return this._reduceChildren({}, (t, e, n) => (t[n] = e instanceof zv ? e.value : e.getRawValue(), t))
        }
        _syncPendingControls() {
          let t = this._reduceChildren(!1, (t, e) => !!e._syncPendingControls() || t);
          return t && this.updateValueAndValidity({
            onlySelf: !0
          }), t
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length) throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
          if (!this.controls[t]) throw new Error(`Cannot find form control with name: ${t}.`)
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach(e => {
            const n = this.controls[e];
            n && t(n, e)
          })
        }
        _setUpControls() {
          this._forEachChild(t => {
            t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
          })
        }
        _updateValue() {
          this.value = this._reduceValue()
        }
        _anyControls(t) {
          for (const e of Object.keys(this.controls)) {
            const n = this.controls[e];
            if (this.contains(e) && t(n)) return !0
          }
          return !1
        }
        _reduceValue() {
          return this._reduceChildren({}, (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t))
        }
        _reduceChildren(t, e) {
          let n = t;
          return this._forEachChild((t, r) => {
            n = e(n, t, r)
          }), n
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n]) throw new Error(`Must supply a value for form control with name: '${n}'.`)
          })
        }
      }
      class Qv extends Hv {
        constructor(t, e, n) {
          super(Vv(e), Uv(n, e)), this.controls = t, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
            onlySelf: !0,
            emitEvent: !!n
          })
        }
        at(t) {
          return this.controls[t]
        }
        push(t, e = {}) {
          this.controls.push(t), this._registerControl(t), this.updateValueAndValidity({
            emitEvent: e.emitEvent
          }), this._onCollectionChange()
        }
        insert(t, e, n = {}) {
          this.controls.splice(t, 0, e), this._registerControl(e), this.updateValueAndValidity({
            emitEvent: n.emitEvent
          })
        }
        removeAt(t, e = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), this.controls.splice(t, 1), this.updateValueAndValidity({
            emitEvent: e.emitEvent
          })
        }
        setControl(t, e, n = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), this.controls.splice(t, 1), e && (this.controls.splice(t, 0, e), this._registerControl(e)), this.updateValueAndValidity({
            emitEvent: n.emitEvent
          }), this._onCollectionChange()
        }
        get length() {
          return this.controls.length
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t), t.forEach((t, n) => {
            this._throwIfControlMissing(n), this.at(n).setValue(t, {
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
          }), this.updateValueAndValidity(e)
        }
        patchValue(t, e = {}) {
          null != t && (t.forEach((t, n) => {
            this.at(n) && this.at(n).patchValue(t, {
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
          }), this.updateValueAndValidity(e))
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], {
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
          }), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
        }
        getRawValue() {
          return this.controls.map(t => t instanceof zv ? t.value : t.getRawValue())
        }
        clear(t = {}) {
          this.controls.length < 1 || (this._forEachChild(t => t._registerOnCollectionChange(() => {})), this.controls.splice(0), this.updateValueAndValidity({
            emitEvent: t.emitEvent
          }))
        }
        _syncPendingControls() {
          let t = this.controls.reduce((t, e) => !!e._syncPendingControls() || t, !1);
          return t && this.updateValueAndValidity({
            onlySelf: !0
          }), t
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length) throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
          if (!this.at(t)) throw new Error(`Cannot find form control at index ${t}`)
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n)
          })
        }
        _updateValue() {
          this.value = this.controls.filter(t => t.enabled || this.disabled).map(t => t.value)
        }
        _anyControls(t) {
          return this.controls.some(e => e.enabled && t(e))
        }
        _setUpControls() {
          this._forEachChild(t => this._registerControl(t))
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n]) throw new Error(`Must supply a value for form control at index: ${n}.`)
          })
        }
        _allControlsDisabled() {
          for (const t of this.controls)
            if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled
        }
        _registerControl(t) {
          t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
        }
      }
      const Wv = {
          provide: Cv,
          useExisting: it(() => Kv)
        },
        Gv = (() => Promise.resolve(null))();
      let Kv = (() => {
        class t extends Cv {
          constructor(t, e) {
            super(), this.submitted = !1, this._directives = [], this.ngSubmit = new Pa, this.form = new qv({}, yv(t), _v(e))
          }
          ngAfterViewInit() {
            this._setUpdateStrategy()
          }
          get formDirective() {
            return this
          }
          get control() {
            return this.form
          }
          get path() {
            return []
          }
          get controls() {
            return this.form.controls
          }
          addControl(t) {
            Gv.then(() => {
              const e = this._findContainer(t.path);
              t.control = e.registerControl(t.name, t.control), Ev(t.control, t), t.control.updateValueAndValidity({
                emitEvent: !1
              }), this._directives.push(t)
            })
          }
          getControl(t) {
            return this.form.get(t.path)
          }
          removeControl(t) {
            Gv.then(() => {
              const e = this._findContainer(t.path);
              e && e.removeControl(t.name), Lv(this._directives, t)
            })
          }
          addFormGroup(t) {
            Gv.then(() => {
              const e = this._findContainer(t.path),
                n = new qv({});
              Iv(n, t), e.registerControl(t.name, n), n.updateValueAndValidity({
                emitEvent: !1
              })
            })
          }
          removeFormGroup(t) {
            Gv.then(() => {
              const e = this._findContainer(t.path);
              e && e.removeControl(t.name)
            })
          }
          getFormGroup(t) {
            return this.form.get(t.path)
          }
          updateModel(t, e) {
            Gv.then(() => {
              this.form.get(t.path).setValue(e)
            })
          }
          setValue(t) {
            this.control.setValue(t)
          }
          onSubmit(t) {
            return this.submitted = !0, Pv(this.form, this._directives), this.ngSubmit.emit(t), !1
          }
          onReset() {
            this.resetForm()
          }
          resetForm(t) {
            this.form.reset(t), this.submitted = !1
          }
          _setUpdateStrategy() {
            this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
          }
          _findContainer(t) {
            return t.pop(), t.length ? this.form.get(t) : this.form
          }
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(Ns(uv, 10), Ns(hv, 10))
        }, t.\u0275dir = Gt({
          type: t,
          selectors: [
            ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
            ["ng-form"],
            ["", "ngForm", ""]
          ],
          hostBindings: function (t, e) {
            1 & t && Ws("submit", function (t) {
              return e.onSubmit(t)
            })("reset", function () {
              return e.onReset()
            })
          },
          inputs: {
            options: ["ngFormOptions", "options"]
          },
          outputs: {
            ngSubmit: "ngSubmit"
          },
          exportAs: ["ngForm"],
          features: [To([Wv]), Es]
        }), t
      })();
      const Zv = {
        provide: Cv,
        useExisting: it(() => Yv)
      };
      let Yv = (() => {
        class t extends Cv {
          constructor(t, e) {
            super(), this.validators = t, this.asyncValidators = e, this.submitted = !1, this._onCollectionChange = () => this._updateDomValue(), this.directives = [], this.form = null, this.ngSubmit = new Pa, this._setValidators(t), this._setAsyncValidators(e)
          }
          ngOnChanges(t) {
            this._checkFormPresent(), t.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
          }
          ngOnDestroy() {
            this.form && (Ov(this.form, this), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {}))
          }
          get formDirective() {
            return this
          }
          get control() {
            return this.form
          }
          get path() {
            return []
          }
          addControl(t) {
            const e = this.form.get(t.path);
            return Ev(e, t), e.updateValueAndValidity({
              emitEvent: !1
            }), this.directives.push(t), e
          }
          getControl(t) {
            return this.form.get(t.path)
          }
          removeControl(t) {
            kv(t.control || null, t, !1), Lv(this.directives, t)
          }
          addFormGroup(t) {
            this._setUpFormContainer(t)
          }
          removeFormGroup(t) {
            this._cleanUpFormContainer(t)
          }
          getFormGroup(t) {
            return this.form.get(t.path)
          }
          addFormArray(t) {
            this._setUpFormContainer(t)
          }
          removeFormArray(t) {
            this._cleanUpFormContainer(t)
          }
          getFormArray(t) {
            return this.form.get(t.path)
          }
          updateModel(t, e) {
            this.form.get(t.path).setValue(e)
          }
          onSubmit(t) {
            return this.submitted = !0, Pv(this.form, this.directives), this.ngSubmit.emit(t), !1
          }
          onReset() {
            this.resetForm()
          }
          resetForm(t) {
            this.form.reset(t), this.submitted = !1
          }
          _updateDomValue() {
            this.directives.forEach(t => {
              const e = t.control,
                n = this.form.get(t.path);
              e !== n && (kv(e || null, t), n instanceof zv && (Ev(n, t), t.control = n))
            }), this.form._updateTreeValidity({
              emitEvent: !1
            })
          }
          _setUpFormContainer(t) {
            const e = this.form.get(t.path);
            Iv(e, t), e.updateValueAndValidity({
              emitEvent: !1
            })
          }
          _cleanUpFormContainer(t) {
            if (this.form) {
              const e = this.form.get(t.path);
              e && function (t, e) {
                return Ov(t, e)
              }(e, t) && e.updateValueAndValidity({
                emitEvent: !1
              })
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange), this._oldForm && this._oldForm._registerOnCollectionChange(() => {})
          }
          _updateValidators() {
            Av(this.form, this), this._oldForm && Ov(this._oldForm, this)
          }
          _checkFormPresent() {}
        }
        return t.\u0275fac = function (e) {
          return new(e || t)(Ns(uv, 10), Ns(hv, 10))
        }, t.\u0275dir = Gt({
          type: t,
          selectors: [
            ["", "formGroup", ""]
          ],
          hostBindings: function (t, e) {
            1 & t && Ws("submit", function (t) {
              return e.onSubmit(t)
            })("reset", function () {
              return e.onReset()
            })
          },
          inputs: {
            form: ["formGroup", "form"]
          },
          outputs: {
            ngSubmit: "ngSubmit"
          },
          exportAs: ["ngForm"],
          features: [To([Zv]), Es, ae]
        }), t
      })();
      const Jv = new Bn("MAT_INPUT_VALUE_ACCESSOR"),
        Xv = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"];
      let tw = 0;
      class ew {
        constructor(t, e, n, r) {
          this._defaultErrorStateMatcher = t, this._parentForm = e, this._parentFormGroup = n, this.ngControl = r
        }
      }
      const nw = Iy(ew);
      let rw = (() => {
          class t extends nw {
            constructor(t, e, n, r, i, s, o, a, l, c) {
              super(s, r, i, n), this._elementRef = t, this._platform = e, this.ngControl = n, this._autofillMonitor = a, this._formField = c, this._uid = "mat-input-" + tw++, this.focused = !1, this.stateChanges = new C, this.controlType = "mat-input", this.autofilled = !1, this._disabled = !1, this._required = !1, this._type = "text", this._readonly = !1, this._neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter(t => ap().has(t));
              const u = this._elementRef.nativeElement,
                h = u.nodeName.toLowerCase();
              this._inputValueAccessor = o || u, this._previousNativeValue = this.value, this.id = this.id, e.IOS && l.runOutsideAngular(() => {
                t.nativeElement.addEventListener("keyup", t => {
                  const e = t.target;
                  e.value || 0 !== e.selectionStart || 0 !== e.selectionEnd || (e.setSelectionRange(1, 1), e.setSelectionRange(0, 0))
                })
              }), this._isServer = !this._platform.isBrowser, this._isNativeSelect = "select" === h, this._isTextarea = "textarea" === h, this._isNativeSelect && (this.controlType = u.multiple ? "mat-native-select-multiple" : "mat-native-select")
            }
            get disabled() {
              return this.ngControl && null !== this.ngControl.disabled ? this.ngControl.disabled : this._disabled
            }
            set disabled(t) {
              this._disabled = ep(t), this.focused && (this.focused = !1, this.stateChanges.next())
            }
            get id() {
              return this._id
            }
            set id(t) {
              this._id = t || this._uid
            }
            get required() {
              return this._required
            }
            set required(t) {
              this._required = ep(t)
            }
            get type() {
              return this._type
            }
            set type(t) {
              this._type = t || "text", this._validateType(), !this._isTextarea && ap().has(this._type) && (this._elementRef.nativeElement.type = this._type)
            }
            get value() {
              return this._inputValueAccessor.value
            }
            set value(t) {
              t !== this.value && (this._inputValueAccessor.value = t, this.stateChanges.next())
            }
            get readonly() {
              return this._readonly
            }
            set readonly(t) {
              this._readonly = ep(t)
            }
            ngAfterViewInit() {
              this._platform.isBrowser && this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t => {
                this.autofilled = t.isAutofilled, this.stateChanges.next()
              })
            }
            ngOnChanges() {
              this.stateChanges.next()
            }
            ngOnDestroy() {
              this.stateChanges.complete(), this._platform.isBrowser && this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement)
            }
            ngDoCheck() {
              this.ngControl && this.updateErrorState(), this._dirtyCheckNativeValue(), this._dirtyCheckPlaceholder()
            }
            focus(t) {
              this._elementRef.nativeElement.focus(t)
            }
            _focusChanged(t) {
              t === this.focused || this.readonly && t || (this.focused = t, this.stateChanges.next())
            }
            _onInput() {}
            _dirtyCheckPlaceholder() {
              var t, e;
              const n = (null === (e = null === (t = this._formField) || void 0 === t ? void 0 : t._hideControlPlaceholder) || void 0 === e ? void 0 : e.call(t)) ? null : this.placeholder;
              if (n !== this._previousPlaceholder) {
                const t = this._elementRef.nativeElement;
                this._previousPlaceholder = n, n ? t.setAttribute("placeholder", n) : t.removeAttribute("placeholder")
              }
            }
            _dirtyCheckNativeValue() {
              const t = this._elementRef.nativeElement.value;
              this._previousNativeValue !== t && (this._previousNativeValue = t, this.stateChanges.next())
            }
            _validateType() {
              Xv.indexOf(this._type)
            }
            _isNeverEmpty() {
              return this._neverEmptyInputTypes.indexOf(this._type) > -1
            }
            _isBadInput() {
              let t = this._elementRef.nativeElement.validity;
              return t && t.badInput
            }
            get empty() {
              return !(this._isNeverEmpty() || this._elementRef.nativeElement.value || this._isBadInput() || this.autofilled)
            }
            get shouldLabelFloat() {
              if (this._isNativeSelect) {
                const t = this._elementRef.nativeElement,
                  e = t.options[0];
                return this.focused || t.multiple || !this.empty || !!(t.selectedIndex > -1 && e && e.label)
              }
              return this.focused || !this.empty
            }
            setDescribedByIds(t) {
              t.length ? this._elementRef.nativeElement.setAttribute("aria-describedby", t.join(" ")) : this._elementRef.nativeElement.removeAttribute("aria-describedby")
            }
            onContainerClick() {
              this.focused || this.focus()
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(ip), Ns(Sv, 10), Ns(Kv, 8), Ns(Yv, 8), Ns(Py), Ns(Jv, 10), Ns(av), Ns(_l), Ns(rv, 8))
          }, t.\u0275dir = Gt({
            type: t,
            selectors: [
              ["input", "matInput", ""],
              ["textarea", "matInput", ""],
              ["select", "matNativeControl", ""],
              ["input", "matNativeControl", ""],
              ["textarea", "matNativeControl", ""]
            ],
            hostAttrs: [1, "mat-input-element", "mat-form-field-autofill-control"],
            hostVars: 9,
            hostBindings: function (t, e) {
              1 & t && Ws("focus", function () {
                return e._focusChanged(!0)
              })("blur", function () {
                return e._focusChanged(!1)
              })("input", function () {
                return e._onInput()
              }), 2 & t && (uo("disabled", e.disabled)("required", e.required), Fs("id", e.id)("data-placeholder", e.placeholder)("readonly", e.readonly && !e._isNativeSelect || null)("aria-invalid", e.errorState && !e.empty)("aria-required", e.required), no("mat-input-server", e._isServer))
            },
            inputs: {
              id: "id",
              disabled: "disabled",
              required: "required",
              type: "type",
              value: "value",
              readonly: "readonly",
              placeholder: "placeholder",
              errorStateMatcher: "errorStateMatcher",
              userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"]
            },
            exportAs: ["matInput"],
            features: [To([{
              provide: Wb,
              useExisting: t
            }]), Es, ae]
          }), t
        })(),
        iw = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            providers: [Py],
            imports: [
              [lv, sv, Ty], lv, sv
            ]
          }), t
        })();
      const sw = ["mat-button", ""],
        ow = ["*"],
        aw = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"];
      class lw {
        constructor(t) {
          this._elementRef = t
        }
      }
      const cw = Oy(Ay(Ry(lw)));
      let uw = (() => {
          class t extends cw {
            constructor(t, e, n) {
              super(t), this._focusMonitor = e, this._animationMode = n, this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"), this.isIconButton = this._hasHostAttributes("mat-icon-button");
              for (const r of aw) this._hasHostAttributes(r) && this._getHostElement().classList.add(r);
              t.nativeElement.classList.add("mat-button-base"), this.isRoundButton && (this.color = "accent")
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0)
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef)
            }
            focus(t, e) {
              t ? this._focusMonitor.focusVia(this._getHostElement(), t, e) : this._getHostElement().focus(e)
            }
            _getHostElement() {
              return this._elementRef.nativeElement
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled
            }
            _hasHostAttributes(...t) {
              return t.some(t => this._getHostElement().hasAttribute(t))
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(Ns(Do), Ns(Tp), Ns(by, 8))
          }, t.\u0275cmp = $t({
            type: t,
            selectors: [
              ["button", "mat-button", ""],
              ["button", "mat-raised-button", ""],
              ["button", "mat-icon-button", ""],
              ["button", "mat-fab", ""],
              ["button", "mat-mini-fab", ""],
              ["button", "mat-stroked-button", ""],
              ["button", "mat-flat-button", ""]
            ],
            viewQuery: function (t, e) {
              if (1 & t && qa(Uy, 5), 2 & t) {
                let t;
                za(t = Wa()) && (e.ripple = t.first)
              }
            },
            hostAttrs: [1, "mat-focus-indicator"],
            hostVars: 5,
            hostBindings: function (t, e) {
              2 & t && (Fs("disabled", e.disabled || null), no("_mat-animation-noopable", "NoopAnimations" === e._animationMode)("mat-button-disabled", e.disabled))
            },
            inputs: {
              disabled: "disabled",
              disableRipple: "disableRipple",
              color: "color"
            },
            exportAs: ["matButton"],
            features: [Es],
            attrs: sw,
            ngContentSelectors: ow,
            decls: 4,
            vars: 5,
            consts: [
              [1, "mat-button-wrapper"],
              ["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"],
              [1, "mat-button-focus-overlay"]
            ],
            template: function (t, e) {
              1 & t && (Js(), Us(0, "span", 0), Xs(1), Bs(), $s(2, "span", 1), $s(3, "span", 2)), 2 & t && (fi(2), no("mat-button-ripple-round", e.isRoundButton || e.isIconButton), Vs("matRippleDisabled", e._isRippleDisabled())("matRippleCentered", e.isIconButton)("matRippleTrigger", e._getHostElement()))
            },
            directives: [Uy],
            styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],
            encapsulation: 2,
            changeDetection: 0
          }), t
        })(),
        hw = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [By, Ty], Ty
            ]
          }), t
        })(),
        dw = (() => {
          class t {
            constructor() {
              this.value_log = "", this.value_pass = "", this.btn = document.querySelector("button"), this.body = document.querySelector("html"), this.input = document.querySelectorAll("input"), this.title = "login"
            }
            btn_click(t) {
              t.preventDefault(), location.assign("../home")
            }
            access_log(t) {
              return this.value_log += t.target.value, console.log(this.value_log), this.value_log
            }
            access_pass(t) {
              return this.value_pass += t.target.value, console.log(this.value_pass), this.value_log
            }
            access_btn() {
              "test" === this.value_log && "test" === this.value_pass ? this.btn_click(event) : alert("Invalid login or password")
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275cmp = $t({
            type: t,
            selectors: [
              ["app-root"]
            ],
            decls: 16,
            vars: 0,
            consts: [
              ["fxLayoutAlign", "center center", "fxFlexFill", ""],
              ["fxFlex", "25"],
              ["fxLayoutAlign", "stretch", "fxLayout", "column"],
              ["required", "", "matInput", "", "placeholder", "Login", 3, "change"],
              [1, "input-password"],
              ["required", "", "matInput", "", "placeholder", "Password", 3, "change"],
              ["mat-button", "", 3, "click"]
            ],
            template: function (t, e) {
              1 & t && ($s(0, "router-outlet"), Us(1, "mat-toolbar"), ao(2, "Login page"), Bs(), Us(3, "div", 0), Us(4, "mat-card", 1), Us(5, "form", 2), Us(6, "mat-form-field"), Us(7, "mat-label"), ao(8, "Login"), Bs(), Us(9, "input", 3), Ws("change", function (t) {
                return e.access_log(t)
              }), Bs(), Bs(), Us(10, "mat-form-field"), Us(11, "mat-label", 4), ao(12, "Password"), Bs(), Us(13, "input", 5), Ws("change", function (t) {
                return e.access_pass(t)
              }), Bs(), Bs(), Us(14, "button", 6), Ws("click", function () {
                return e.access_btn()
              }), ao(15, "Log in"), Bs(), Bs(), Bs(), Bs())
            },
            directives: [Lf, Wy, db, ab, Sb, tb, G_, iv, Kb, rw, uw],
            styles: [""]
          }), t
        })();
      new Map, new WeakMap;
      let fw = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          imports: [
            [Yy]
          ]
        }), t
      })();
      new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map, new Map;
      let pw = (() => {
        class t {}
        return t.\u0275fac = function (e) {
          return new(e || t)
        }, t.\u0275mod = Qt({
          type: t
        }), t.\u0275inj = dt({
          imports: [
            [Yy]
          ]
        }), t
      })();
      new Vo("12.0.0-beta.34");
      let mw = (() => {
          class t {
            constructor(t, e) {
              kc(e) && !t && console.warn("Warning: Flex Layout loaded on the server without FlexLayoutServerModule")
            }
            static withConfig(e, n = []) {
              return {
                ngModule: t,
                providers: e.serverLoaded ? [{
                  provide: e_,
                  useValue: Object.assign(Object.assign({}, t_), e)
                }, {
                  provide: r_,
                  useValue: n,
                  multi: !0
                }, {
                  provide: n_,
                  useValue: !0
                }] : [{
                  provide: e_,
                  useValue: Object.assign(Object.assign({}, t_), e)
                }, {
                  provide: r_,
                  useValue: n,
                  multi: !0
                }]
              }
            }
          }
          return t.\u0275fac = function (e) {
            return new(e || t)(sr(n_), sr(rl))
          }, t.\u0275mod = Qt({
            type: t
          }), t.\u0275inj = dt({
            imports: [
              [wb, fw, pw], wb, fw, pw
            ]
          }), t
        })(),
        gw = (() => {
          class t {}
          return t.\u0275fac = function (e) {
            return new(e || t)
          }, t.\u0275mod = Qt({
            type: t,
            bootstrap: [dw]
          }), t.\u0275inj = dt({
            providers: [],
            imports: [
              [su, tp, Cy, mw, sv, iw, hw, Eb, Gy]
            ]
          }), t
        })();
      (function () {
        if (Il) throw new Error("Cannot enable prod mode after platform setup.");
        Rl = !1
      })(), ru().bootstrapModule(gw).catch(t => console.error(t))
    }
  },
  t => {
    "use strict";
    t(t.s = 884)
  }
]);
