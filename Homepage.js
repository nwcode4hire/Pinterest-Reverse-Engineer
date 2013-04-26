var a;
(function (b, c) {
    function e(f) {
        return !b(f).parents().andSelf().filter(function () {
            return b.curCSS(this, "visibility") === "hidden" || b.expr.filters.hidden(this)
        }).length
    }
    b.ui = b.ui || {};
    if (!b.ui.version) {
        b.extend(b.ui, {
            version: "1.8.11",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        b.fn.extend({
            _focus: b.fn.focus,
            focus: function (f, g) {
                return typeof f === "number" ? this.each(function () {
                    var d = this;
                    setTimeout(function () {
                        b(d).focus();
                        g && g.call(d)
                    }, f)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var f;
                f = b.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(b.curCSS(this,
                        "position", 1)) && /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !f.length ? b(document) : f
            },
            zIndex: function (f) {
                if (f !== c) return this.css("zIndex", f);
                if (this.length) {
                    f = b(this[0]);
                    for (var g; f.length && f[0] !== document;) {
                        g = f.css("position");
                        if (g === "absolute" || g === "relative" || g === "fixed") {
                            g = parseInt(f.css("zIndex"), 10);
                            if (!isNaN(g) && g !== 0) return g
                        }
                        f = f.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((b.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (f) {
                    f.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        b.each(["Width", "Height"], function (f, g) {
            function d(l, r, u, o) {
                b.each(h, function () {
                    r -= parseFloat(b.curCSS(l, "padding" + this, true)) || 0;
                    if (u) r -= parseFloat(b.curCSS(l,
                            "border" + this + "Width", true)) || 0;
                    if (o) r -= parseFloat(b.curCSS(l, "margin" + this, true)) || 0
                });
                return r
            }
            var h = g === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                j = g.toLowerCase(),
                k = {
                    innerWidth: b.fn.innerWidth,
                    innerHeight: b.fn.innerHeight,
                    outerWidth: b.fn.outerWidth,
                    outerHeight: b.fn.outerHeight
                };
            b.fn["inner" + g] = function (l) {
                if (l === c) return k["inner" + g].call(this);
                return this.each(function () {
                    b(this).css(j, d(this, l) + "px")
                })
            };
            b.fn["outer" + g] = function (l, r) {
                if (typeof l !== "number") return k["outer" + g].call(this, l);
                return this.each(function () {
                    b(this).css(j,
                        d(this, l, true, r) + "px")
                })
            }
        });
        b.extend(b.expr[":"], {
            data: function (f, g, d) {
                return !!b.data(f, d[3])
            },
            focusable: function (f) {
                var g = f.nodeName.toLowerCase(),
                    d = b.attr(f, "tabindex");
                if ("area" === g) {
                    g = f.parentNode;
                    d = g.name;
                    if (!f.href || !d || g.nodeName.toLowerCase() !== "map") return false;
                    f = b("img[usemap=#" + d + "]")[0];
                    return !!f && e(f)
                }
                return (/input|select|textarea|button|object/.test(g) ? !f.disabled : "a" == g ? f.href || !isNaN(d) : !isNaN(d)) && e(f)
            },
            tabbable: function (f) {
                var g = b.attr(f, "tabindex");
                return (isNaN(g) || g >= 0) && b(f).is(":focusable")
            }
        });
        b(function () {
            var f = document.body,
                g = f.appendChild(g = document.createElement("div"));
            b.extend(g.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            b.support.minHeight = g.offsetHeight === 100;
            b.support.selectstart = "onselectstart" in g;
            f.removeChild(g).style.display = "none"
        });
        b.extend(b.ui, {
            plugin: {
                add: function (f, g, d) {
                    f = b.ui[f].prototype;
                    for (var h in d) {
                        f.plugins[h] = f.plugins[h] || [];
                        f.plugins[h].push([g, d[h]])
                    }
                },
                call: function (f, g, d) {
                    if ((g = f.plugins[g]) && f.element[0].parentNode) for (var h = 0; h < g.length; h++) f.options[g[h][0]] &&
                                g[h][1].apply(f.element, d)
                }
            },
            contains: function (f, g) {
                return document.compareDocumentPosition ? f.compareDocumentPosition(g) & 16 : f !== g && f.contains(g)
            },
            hasScroll: function (f, g) {
                if (b(f).css("overflow") === "hidden") return false;
                g = g && g === "left" ? "scrollLeft" : "scrollTop";
                var d = false;
                if (f[g] > 0) return true;
                f[g] = 1;
                d = f[g] > 0;
                f[g] = 0;
                return d
            },
            isOverAxis: function (f, g, d) {
                return f > g && f < g + d
            },
            isOver: function (f, g, d, h, j, k) {
                return b.ui.isOverAxis(f, d, j) && b.ui.isOverAxis(g, h, k)
            }
        })
    }
})(jQuery);
(function (b, c) {
    if (b.cleanData) {
        var e = b.cleanData;
        b.cleanData = function (g) {
            for (var d = 0, h;
            (h = g[d]) != null; d++) b(h).triggerHandler("remove");
            e(g)
        }
    } else {
        var f = b.fn.remove;
        b.fn.remove = function (g, d) {
            return this.each(function () {
                if (!d) if (!g || b.filter(g, [this]).length) b("*", this).add([this]).each(function () {
                            b(this).triggerHandler("remove")
                        });
                return f.call(b(this), g, d)
            })
        }
    }
    b.widget = function (g, d, h) {
        var j = g.split(".")[0],
            k;
        g = g.split(".")[1];
        k = j + "-" + g;
        if (!h) {
            h = d;
            d = b.Widget
        }
        b.expr[":"][k] = function (l) {
            return !!b.data(l,
                g)
        };
        b[j] = b[j] || {};
        b[j][g] = function (l, r) {
            arguments.length && this._createWidget(l, r)
        };
        d = new d;
        d.options = b.extend(true, {}, d.options);
        b[j][g].prototype = b.extend(true, d, {
            namespace: j,
            widgetName: g,
            widgetEventPrefix: b[j][g].prototype.widgetEventPrefix || g,
            widgetBaseClass: k
        }, h);
        b.widget.bridge(g, b[j][g])
    };
    b.widget.bridge = function (g, d) {
        b.fn[g] = function (h) {
            var j = typeof h === "string",
                k = Array.prototype.slice.call(arguments, 1),
                l = this;
            h = !j && k.length ? b.extend.apply(null, [true, h].concat(k)) : h;
            if (j && h.charAt(0) === "_") return l;
            j ? this.each(function () {
                var r = b.data(this, g),
                    u = r && b.isFunction(r[h]) ? r[h].apply(r, k) : r;
                if (u !== r && u !== c) {
                    l = u;
                    return false
                }
            }) : this.each(function () {
                var r = b.data(this, g);
                r ? r.option(h || {})._init() : b.data(this, g, new d(h, this))
            });
            return l
        }
    };
    b.Widget = function (g, d) {
        arguments.length && this._createWidget(g, d)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (g, d) {
            b.data(d, this.widgetName, this);
            this.element = b(d);
            this.options = b.extend(true, {}, this.options,
                this._getCreateOptions(), g);
            var h = this;
            this.element.bind("remove." + this.widgetName, function () {
                h.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (g, d) {
            var h = g;
            if (arguments.length === 0) return b.extend({}, this.options);
            if (typeof g === "string") {
                if (d === c) return this.options[g];
                h = {};
                h[g] = d
            }
            this._setOptions(h);
            return this
        },
        _setOptions: function (g) {
            var d = this;
            b.each(g, function (h, j) {
                d._setOption(h, j)
            });
            return this
        },
        _setOption: function (g, d) {
            this.options[g] = d;
            if (g === "disabled") this.widget()[d ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", d);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (g, d, h) {
            var j = this.options[g];
            d = b.Event(d);
            d.type = (g === this.widgetEventPrefix ? g : this.widgetEventPrefix + g).toLowerCase();
            h = h || {};
            if (d.originalEvent) {
                g = b.event.props.length;
                for (var k; g;) {
                    k = b.event.props[--g];
                    d[k] = d.originalEvent[k]
                }
            }
            this.element.trigger(d, h);
            return !(b.isFunction(j) && j.call(this.element[0], d, h) === false || d.isDefaultPrevented())
        }
    }
})(jQuery);
(function (b) {
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function (e) {
                return c._mouseDown(e)
            }).bind("click." + this.widgetName, function (e) {
                if (true === b.data(e.target, c.widgetName + ".preventClickEvent")) {
                    b.removeData(e.target, c.widgetName + ".preventClickEvent");
                    e.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (c) {
            c.originalEvent =
                c.originalEvent || {};
            if (!c.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(c);
                this._mouseDownEvent = c;
                var e = this,
                    f = c.which == 1,
                    g = typeof this.options.cancel == "string" ? b(c.target).parents().add(c.target).filter(this.options.cancel).length : false;
                if (!f || g || !this._mouseCapture(c)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function () {
                        e.mouseDelayMet = true
                    }, this.options.delay);
                if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
                    this._mouseStarted =
                        this._mouseStart(c) !== false;
                    if (!this._mouseStarted) {
                        c.preventDefault();
                        return true
                    }
                }
                true === b.data(c.target, this.widgetName + ".preventClickEvent") && b.removeData(c.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function (d) {
                    return e._mouseMove(d)
                };
                this._mouseUpDelegate = function (d) {
                    return e._mouseUp(d)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.preventDefault();
                return c.originalEvent.mouseHandled =
                    true
            }
        },
        _mouseMove: function (c) {
            if (b.browser.msie && !(document.documentMode >= 9) && !c.button) return this._mouseUp(c);
            if (this._mouseStarted) {
                this._mouseDrag(c);
                return c.preventDefault()
            }
            if (this._mouseDistanceMet(c) && this._mouseDelayMet(c))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c);
            return !this._mouseStarted
        },
        _mouseUp: function (c) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                c.target == this._mouseDownEvent.target && b.data(c.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(c)
            }
            return false
        },
        _mouseDistanceMet: function (c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
(function (b) {
    b.ui = b.ui || {};
    var c = /left|center|right/,
        e = /top|center|bottom/,
        f = b.fn.position,
        g = b.fn.offset;
    b.fn.position = function (d) {
        if (!d || !d.of) return f.apply(this, arguments);
        d = b.extend({}, d);
        var h = b(d.of),
            j = h[0],
            k = (d.collision || "flip").split(" "),
            l = d.offset ? d.offset.split(" ") : [0, 0],
            r, u, o;
        if (j.nodeType === 9) {
            r = h.width();
            u = h.height();
            o = {
                top: 0,
                left: 0
            }
        } else if (j.setTimeout) {
            r = h.width();
            u = h.height();
            o = {
                top: h.scrollTop(),
                left: h.scrollLeft()
            }
        } else if (j.preventDefault) {
            d.at = "left top";
            r = u = 0;
            o = {
                top: d.of.pageY,
                left: d.of.pageX
            }
        } else {
            r = h.outerWidth();
            u = h.outerHeight();
            o = h.offset()
        }
        b.each(["my", "at"], function () {
            var m = (d[this] || "").split(" ");
            if (m.length === 1) m = c.test(m[0]) ? m.concat(["center"]) : e.test(m[0]) ? ["center"].concat(m) : ["center", "center"];
            m[0] = c.test(m[0]) ? m[0] : "center";
            m[1] = e.test(m[1]) ? m[1] : "center";
            d[this] = m
        });
        if (k.length === 1) k[1] = k[0];
        l[0] = parseInt(l[0], 10) || 0;
        if (l.length === 1) l[1] = l[0];
        l[1] = parseInt(l[1], 10) || 0;
        if (d.at[0] === "right") o.left += r;
        else if (d.at[0] === "center") o.left += r / 2;
        if (d.at[1] === "bottom") o.top +=
                u;
        else if (d.at[1] === "center") o.top += u / 2;
        o.left += l[0];
        o.top += l[1];
        return this.each(function () {
            var m = b(this),
                s = m.outerWidth(),
                v = m.outerHeight(),
                x = parseInt(b.curCSS(this, "marginLeft", true)) || 0,
                A = parseInt(b.curCSS(this, "marginTop", true)) || 0,
                D = s + x + (parseInt(b.curCSS(this, "marginRight", true)) || 0),
                I = v + A + (parseInt(b.curCSS(this, "marginBottom", true)) || 0),
                p = b.extend({}, o),
                n;
            if (d.my[0] === "right") p.left -= s;
            else if (d.my[0] === "center") p.left -= s / 2;
            if (d.my[1] === "bottom") p.top -= v;
            else if (d.my[1] === "center") p.top -=
                    v / 2;
            p.left = Math.round(p.left);
            p.top = Math.round(p.top);
            n = {
                left: p.left - x,
                top: p.top - A
            };
            b.each(["left", "top"], function (z, B) {
                b.ui.position[k[z]] && b.ui.position[k[z]][B](p, {
                    targetWidth: r,
                    targetHeight: u,
                    elemWidth: s,
                    elemHeight: v,
                    collisionPosition: n,
                    collisionWidth: D,
                    collisionHeight: I,
                    offset: l,
                    my: d.my,
                    at: d.at
                })
            });
            b.fn.bgiframe && m.bgiframe();
            m.offset(b.extend(p, {
                using: d.using
            }))
        })
    };
    b.ui.position = {
        fit: {
            left: function (d, h) {
                var j = b(window);
                j = h.collisionPosition.left + h.collisionWidth - j.width() - j.scrollLeft();
                d.left =
                    j > 0 ? d.left - j : Math.max(d.left - h.collisionPosition.left, d.left)
            },
            top: function (d, h) {
                var j = b(window);
                j = h.collisionPosition.top + h.collisionHeight - j.height() - j.scrollTop();
                d.top = j > 0 ? d.top - j : Math.max(d.top - h.collisionPosition.top, d.top)
            }
        },
        flip: {
            left: function (d, h) {
                if (h.at[0] !== "center") {
                    var j = b(window);
                    j = h.collisionPosition.left + h.collisionWidth - j.width() - j.scrollLeft();
                    var k = h.my[0] === "left" ? -h.elemWidth : h.my[0] === "right" ? h.elemWidth : 0,
                        l = h.at[0] === "left" ? h.targetWidth : -h.targetWidth,
                        r = -2 * h.offset[0];
                    d.left +=
                        h.collisionPosition.left < 0 ? k + l + r : j > 0 ? k + l + r : 0
                }
            },
            top: function (d, h) {
                if (h.at[1] !== "center") {
                    var j = b(window);
                    j = h.collisionPosition.top + h.collisionHeight - j.height() - j.scrollTop();
                    var k = h.my[1] === "top" ? -h.elemHeight : h.my[1] === "bottom" ? h.elemHeight : 0,
                        l = h.at[1] === "top" ? h.targetHeight : -h.targetHeight,
                        r = -2 * h.offset[1];
                    d.top += h.collisionPosition.top < 0 ? k + l + r : j > 0 ? k + l + r : 0
                }
            }
        }
    };
    if (!b.offset.setOffset) {
        b.offset.setOffset = function (d, h) {
            if (/static/.test(b.curCSS(d, "position"))) d.style.position = "relative";
            var j = b(d),
                k = j.offset(),
                l = parseInt(b.curCSS(d, "top", true), 10) || 0,
                r = parseInt(b.curCSS(d, "left", true), 10) || 0;
            k = {
                top: h.top - k.top + l,
                left: h.left - k.left + r
            };
            "using" in h ? h.using.call(d, k) : j.css(k)
        };
        b.fn.offset = function (d) {
            var h = this[0];
            if (!h || !h.ownerDocument) return null;
            if (d) return this.each(function () {
                    b.offset.setOffset(this, d)
                });
            return g.call(this)
        }
    }
})(jQuery);
(function (b) {
    b.widget("ui.draggable", b.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper ==
                "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function (c) {
            var e =
                this.options;
            if (this.helper || e.disabled || b(c.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(c);
            if (!this.handle) return false;
            return true
        },
        _mouseStart: function (c) {
            var e = this.options;
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            b.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt);
            e.containment && this._setContainment();
            if (this._trigger("start", c) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(c, true);
            return true
        },
        _mouseDrag: function (c, e) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!e) {
                e = this._uiHash();
                if (this._trigger("drag", c, e) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = e.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis ||
                this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            b.ui.ddmanager && b.ui.ddmanager.drag(this, c);
            return false
        },
        _mouseStop: function (c) {
            var e = false;
            if (b.ui.ddmanager && !this.options.dropBehaviour) e = b.ui.ddmanager.drop(this, c);
            if (this.dropped) {
                e = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !e || this.options.revert == "valid" && e || this.options.revert === true || b.isFunction(this.options.revert) &&
                this.options.revert.call(this.element, e)) {
                var f = this;
                b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    f._trigger("stop", c) !== false && f._clear()
                })
            } else this._trigger("stop", c) !== false && this._clear();
            return false
        },
        cancel: function () {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function (c) {
            var e = !this.options.handle || !b(this.options.handle, this.element).length ? true : false;
            b(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this ==
                    c.target) e = true
            });
            return e
        },
        _createHelper: function (c) {
            var e = this.options;
            c = b.isFunction(e.helper) ? b(e.helper.apply(this.element[0], [c])) : e.helper == "clone" ? this.element.clone() : this.element;
            c.parents("body").length || c.appendTo(e.appendTo == "parent" ? this.element[0].parentNode : e.appendTo);
            c[0] != this.element[0] && !/(fixed|absolute)/.test(c.css("position")) && c.css("position", "absolute");
            return c
        },
        _adjustOffsetFromHelper: function (c) {
            if (typeof c == "string") c = c.split(" ");
            if (b.isArray(c)) c = {
                    left: +c[0],
                    top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0],
                this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) c = {
                    top: 0,
                    left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var c = this.element.position();
                return {
                    top: c.top -
                        (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                    top: 0,
                    left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [(c.containment == "document" ? 0 : b(window).scrollLeft()) - this.offset.relative.left - this.offset.parent.left, (c.containment == "document" ? 0 : b(window).scrollTop()) - this.offset.relative.top - this.offset.parent.top, (c.containment == "document" ? 0 : b(window).scrollLeft()) + b(c.containment == "document" ?
                        document : window).width() - this.helperProportions.width - this.margins.left, (c.containment == "document" ? 0 : b(window).scrollTop()) + (b(c.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment) && c.containment.constructor != Array) {
                var e = b(c.containment)[0];
                if (e) {
                    c = b(c.containment).offset();
                    var f = b(e).css("overflow") != "hidden";
                    this.containment = [c.left + (parseInt(b(e).css("borderLeftWidth"),
                            10) || 0) + (parseInt(b(e).css("paddingLeft"), 10) || 0), c.top + (parseInt(b(e).css("borderTopWidth"), 10) || 0) + (parseInt(b(e).css("paddingTop"), 10) || 0), c.left + (f ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(b(e).css("borderLeftWidth"), 10) || 0) - (parseInt(b(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, c.top + (f ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(b(e).css("borderTopWidth"), 10) || 0) - (parseInt(b(e).css("paddingBottom"),
                            10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom]
                }
            } else if (c.containment.constructor == Array) this.containment = c.containment
        },
        _convertPositionTo: function (c, e) {
            if (!e) e = this.position;
            c = c == "absolute" ? 1 : -1;
            var f = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = /(html|body)/i.test(f[0].tagName);
            return {
                top: e.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari &&
                    b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * c),
                left: e.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * c)
            }
        },
        _generatePosition: function (c) {
            var e = this.options,
                f = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0],
                    this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = /(html|body)/i.test(f[0].tagName),
                d = c.pageX,
                h = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) d = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) h = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) d = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) h =
                            this.containment[3] + this.offset.click.top
                }
                if (e.grid) {
                    h = this.originalPageY + Math.round((h - this.originalPageY) / e.grid[1]) * e.grid[1];
                    h = this.containment ? !(h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h : !(h - this.offset.click.top < this.containment[1]) ? h - e.grid[1] : h + e.grid[1] : h;
                    d = this.originalPageX + Math.round((d - this.originalPageX) / e.grid[0]) * e.grid[0];
                    d = this.containment ? !(d - this.offset.click.left < this.containment[0] || d - this.offset.click.left > this.containment[2]) ?
                        d : !(d - this.offset.click.left < this.containment[0]) ? d - e.grid[0] : d + e.grid[0] : d
                }
            }
            return {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()),
                left: d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() :
                    g ? 0 : f.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (c, e, f) {
            f = f || this._uiHash();
            b.ui.plugin.call(this, c, [e, f]);
            if (c == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return b.Widget.prototype._trigger.call(this, c, e, f)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    b.extend(b.ui.draggable, {
        version: "1.8.11"
    });
    b.ui.plugin.add("draggable", "connectToSortable", {
        start: function (c, e) {
            var f = b(this).data("draggable"),
                g = f.options,
                d = b.extend({}, e, {
                    item: f.element
                });
            f.sortables = [];
            b(g.connectToSortable).each(function () {
                var h = b.data(this, "sortable");
                if (h && !h.options.disabled) {
                    f.sortables.push({
                        instance: h,
                        shouldRevert: h.options.revert
                    });
                    h.refreshPositions();
                    h._trigger("activate", c, d)
                }
            })
        },
        stop: function (c, e) {
            var f = b(this).data("draggable"),
                g = b.extend({},
                    e, {
                    item: f.element
                });
            b.each(f.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    f.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(c);
                    this.instance.options.helper = this.instance.options._helper;
                    f.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", c, g)
                }
            })
        },
        drag: function (c, e) {
            var f =
                b(this).data("draggable"),
                g = this;
            b.each(f.sortables, function () {
                this.instance.positionAbs = f.positionAbs;
                this.instance.helperProportions = f.helperProportions;
                this.instance.offset.click = f.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = b(g).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return e.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = f.offset.click.top;
                        this.instance.offset.click.left = f.offset.click.left;
                        this.instance.offset.parent.left -= f.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= f.offset.parent.top - this.instance.offset.parent.top;
                        f._trigger("toSortable", c);
                        f.dropped = this.instance.element;
                        f.currentItem = f.element;
                        this.instance.fromOutside = f
                    }
                    this.instance.currentItem &&
                        this.instance._mouseDrag(c)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(c, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    f._trigger("fromSortable", c);
                    f.dropped = false
                }
            })
        }
    });
    b.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var c = b("body"),
                e = b(this).data("draggable").options;
            if (c.css("cursor")) e._cursor = c.css("cursor");
            c.css("cursor", e.cursor)
        },
        stop: function () {
            var c = b(this).data("draggable").options;
            c._cursor && b("body").css("cursor", c._cursor)
        }
    });
    b.ui.plugin.add("draggable", "iframeFix", {
        start: function () {
            var c = b(this).data("draggable").options;
            b(c.iframeFix === true ? "iframe" : c.iframeFix).each(function () {
                b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(b(this).offset()).appendTo("body")
            })
        },
        stop: function () {
            b("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    b.ui.plugin.add("draggable", "opacity", {
        start: function (c, e) {
            c = b(e.helper);
            e = b(this).data("draggable").options;
            if (c.css("opacity")) e._opacity = c.css("opacity");
            c.css("opacity", e.opacity)
        },
        stop: function (c, e) {
            c = b(this).data("draggable").options;
            c._opacity && b(e.helper).css("opacity",
                c._opacity)
        }
    });
    b.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var c = b(this).data("draggable");
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") c.overflowOffset = c.scrollParent.offset()
        },
        drag: function (c) {
            var e = b(this).data("draggable"),
                f = e.options,
                g = false;
            if (e.scrollParent[0] != document && e.scrollParent[0].tagName != "HTML") {
                if (!f.axis || f.axis != "x") if (e.overflowOffset.top + e.scrollParent[0].offsetHeight - c.pageY < f.scrollSensitivity) e.scrollParent[0].scrollTop = g = e.scrollParent[0].scrollTop +
                            f.scrollSpeed;
                    else if (c.pageY - e.overflowOffset.top < f.scrollSensitivity) e.scrollParent[0].scrollTop = g = e.scrollParent[0].scrollTop - f.scrollSpeed;
                if (!f.axis || f.axis != "y") if (e.overflowOffset.left + e.scrollParent[0].offsetWidth - c.pageX < f.scrollSensitivity) e.scrollParent[0].scrollLeft = g = e.scrollParent[0].scrollLeft + f.scrollSpeed;
                    else if (c.pageX - e.overflowOffset.left < f.scrollSensitivity) e.scrollParent[0].scrollLeft = g = e.scrollParent[0].scrollLeft - f.scrollSpeed
            } else {
                if (!f.axis || f.axis != "x") if (c.pageY - b(document).scrollTop() <
                        f.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() - f.scrollSpeed);
                    else if (b(window).height() - (c.pageY - b(document).scrollTop()) < f.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() + f.scrollSpeed);
                if (!f.axis || f.axis != "y") if (c.pageX - b(document).scrollLeft() < f.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() - f.scrollSpeed);
                    else if (b(window).width() - (c.pageX - b(document).scrollLeft()) < f.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() +
                        f.scrollSpeed)
            }
            g !== false && b.ui.ddmanager && !f.dropBehaviour && b.ui.ddmanager.prepareOffsets(e, c)
        }
    });
    b.ui.plugin.add("draggable", "snap", {
        start: function () {
            var c = b(this).data("draggable"),
                e = c.options;
            c.snapElements = [];
            b(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function () {
                var f = b(this),
                    g = f.offset();
                this != c.element[0] && c.snapElements.push({
                    item: this,
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    top: g.top,
                    left: g.left
                })
            })
        },
        drag: function (c, e) {
            for (var f = b(this).data("draggable"),
                    g = f.options, d = g.snapTolerance, h = e.offset.left, j = h + f.helperProportions.width, k = e.offset.top, l = k + f.helperProportions.height, r = f.snapElements.length - 1; r >= 0; r--) {
                var u = f.snapElements[r].left,
                    o = u + f.snapElements[r].width,
                    m = f.snapElements[r].top,
                    s = m + f.snapElements[r].height;
                if (u - d < h && h < o + d && m - d < k && k < s + d || u - d < h && h < o + d && m - d < l && l < s + d || u - d < j && j < o + d && m - d < k && k < s + d || u - d < j && j < o + d && m - d < l && l < s + d) {
                    if (g.snapMode != "inner") {
                        var v = Math.abs(m - l) <= d,
                            x = Math.abs(s - k) <= d,
                            A = Math.abs(u - j) <= d,
                            D = Math.abs(o - h) <= d;
                        if (v) e.position.top =
                                f._convertPositionTo("relative", {
                                top: m - f.helperProportions.height,
                                left: 0
                            }).top - f.margins.top;
                        if (x) e.position.top = f._convertPositionTo("relative", {
                                top: s,
                                left: 0
                            }).top - f.margins.top;
                        if (A) e.position.left = f._convertPositionTo("relative", {
                                top: 0,
                                left: u - f.helperProportions.width
                            }).left - f.margins.left;
                        if (D) e.position.left = f._convertPositionTo("relative", {
                                top: 0,
                                left: o
                            }).left - f.margins.left
                    }
                    var I = v || x || A || D;
                    if (g.snapMode != "outer") {
                        v = Math.abs(m - k) <= d;
                        x = Math.abs(s - l) <= d;
                        A = Math.abs(u - h) <= d;
                        D = Math.abs(o - j) <= d;
                        if (v) e.position.top =
                                f._convertPositionTo("relative", {
                                top: m,
                                left: 0
                            }).top - f.margins.top;
                        if (x) e.position.top = f._convertPositionTo("relative", {
                                top: s - f.helperProportions.height,
                                left: 0
                            }).top - f.margins.top;
                        if (A) e.position.left = f._convertPositionTo("relative", {
                                top: 0,
                                left: u
                            }).left - f.margins.left;
                        if (D) e.position.left = f._convertPositionTo("relative", {
                                top: 0,
                                left: o - f.helperProportions.width
                            }).left - f.margins.left
                    }
                    if (!f.snapElements[r].snapping && (v || x || A || D || I)) f.options.snap.snap && f.options.snap.snap.call(f.element, c, b.extend(f._uiHash(), {
                            snapItem: f.snapElements[r].item
                        }));
                    f.snapElements[r].snapping = v || x || A || D || I
                } else {
                    f.snapElements[r].snapping && f.options.snap.release && f.options.snap.release.call(f.element, c, b.extend(f._uiHash(), {
                        snapItem: f.snapElements[r].item
                    }));
                    f.snapElements[r].snapping = false
                }
            }
        }
    });
    b.ui.plugin.add("draggable", "stack", {
        start: function () {
            var c = b(this).data("draggable").options;
            c = b.makeArray(b(c.stack)).sort(function (f, g) {
                return (parseInt(b(f).css("zIndex"), 10) || 0) - (parseInt(b(g).css("zIndex"), 10) || 0)
            });
            if (c.length) {
                var e =
                    parseInt(c[0].style.zIndex) || 0;
                b(c).each(function (f) {
                    this.style.zIndex = e + f
                });
                this[0].style.zIndex = e + c.length
            }
        }
    });
    b.ui.plugin.add("draggable", "zIndex", {
        start: function (c, e) {
            c = b(e.helper);
            e = b(this).data("draggable").options;
            if (c.css("zIndex")) e._zIndex = c.css("zIndex");
            c.css("zIndex", e.zIndex)
        },
        stop: function (c, e) {
            c = b(this).data("draggable").options;
            c._zIndex && b(e.helper).css("zIndex", c._zIndex)
        }
    })
})(jQuery);
(function (b) {
    b.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var c = this.options,
                e = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = b.isFunction(e) ? e : function (f) {
                return f.is(e)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            b.ui.ddmanager.droppables[c.scope] = b.ui.ddmanager.droppables[c.scope] || [];
            b.ui.ddmanager.droppables[c.scope].push(this);
            c.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function () {
            for (var c = b.ui.ddmanager.droppables[this.options.scope], e = 0; e < c.length; e++) c[e] == this && c.splice(e, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function (c, e) {
            if (c == "accept") this.accept = b.isFunction(e) ? e : function (f) {
                    return f.is(e)
            };
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (c) {
            var e = b.ui.ddmanager.current;
            this.options.activeClass &&
                this.element.addClass(this.options.activeClass);
            e && this._trigger("activate", c, this.ui(e))
        },
        _deactivate: function (c) {
            var e = b.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            e && this._trigger("deactivate", c, this.ui(e))
        },
        _over: function (c) {
            var e = b.ui.ddmanager.current;
            if (!(!e || (e.currentItem || e.element)[0] == this.element[0])) if (this.accept.call(this.element[0], e.currentItem || e.element)) {
                    this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                    this._trigger("over", c, this.ui(e))
                }
        },
        _out: function (c) {
            var e = b.ui.ddmanager.current;
            if (!(!e || (e.currentItem || e.element)[0] == this.element[0])) if (this.accept.call(this.element[0], e.currentItem || e.element)) {
                    this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                    this._trigger("out", c, this.ui(e))
                }
        },
        _drop: function (c, e) {
            var f = e || b.ui.ddmanager.current;
            if (!f || (f.currentItem || f.element)[0] == this.element[0]) return false;
            var g = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var d =
                    b.data(this, "droppable");
                if (d.options.greedy && !d.options.disabled && d.options.scope == f.options.scope && d.accept.call(d.element[0], f.currentItem || f.element) && b.ui.intersect(f, b.extend(d, {
                    offset: d.element.offset()
                }), d.options.tolerance)) {
                    g = true;
                    return false
                }
            });
            if (g) return false;
            if (this.accept.call(this.element[0], f.currentItem || f.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop",
                    c, this.ui(f));
                return this.element
            }
            return false
        },
        ui: function (c) {
            return {
                draggable: c.currentItem || c.element,
                helper: c.helper,
                position: c.position,
                offset: c.positionAbs
            }
        }
    });
    b.extend(b.ui.droppable, {
        version: "1.8.11"
    });
    b.ui.intersect = function (c, e, f) {
        if (!e.offset) return false;
        var g = (c.positionAbs || c.position.absolute).left,
            d = g + c.helperProportions.width,
            h = (c.positionAbs || c.position.absolute).top,
            j = h + c.helperProportions.height,
            k = e.offset.left,
            l = k + e.proportions.width,
            r = e.offset.top,
            u = r + e.proportions.height;
        switch (f) {
        case "fit":
            return k <=
                g && d <= l && r <= h && j <= u;
        case "intersect":
            return k < g + c.helperProportions.width / 2 && d - c.helperProportions.width / 2 < l && r < h + c.helperProportions.height / 2 && j - c.helperProportions.height / 2 < u;
        case "pointer":
            return b.ui.isOver((c.positionAbs || c.position.absolute).top + (c.clickOffset || c.offset.click).top, (c.positionAbs || c.position.absolute).left + (c.clickOffset || c.offset.click).left, r, k, e.proportions.height, e.proportions.width);
        case "touch":
            return (h >= r && h <= u || j >= r && j <= u || h < r && j > u) && (g >= k && g <= l || d >= k && d <= l || g < k && d > l);
        default:
            return false
        }
    };
    b.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (c, e) {
            var f = b.ui.ddmanager.droppables[c.options.scope] || [],
                g = e ? e.type : null,
                d = (c.currentItem || c.element).find(":data(droppable)").andSelf(),
                h = 0;
            a: for (; h < f.length; h++) if (!(f[h].options.disabled || c && !f[h].accept.call(f[h].element[0], c.currentItem || c.element))) {
                    for (var j = 0; j < d.length; j++) if (d[j] == f[h].element[0]) {
                            f[h].proportions.height = 0;
                            continue a
                        }
                    f[h].visible = f[h].element.css("display") != "none";
                    if (f[h].visible) {
                        g ==
                            "mousedown" && f[h]._activate.call(f[h], e);
                        f[h].offset = f[h].element.offset();
                        f[h].proportions = {
                            width: f[h].element[0].offsetWidth,
                            height: f[h].element[0].offsetHeight
                        }
                    }
                }
        },
        drop: function (c, e) {
            var f = false;
            b.each(b.ui.ddmanager.droppables[c.options.scope] || [], function () {
                if (this.options) {
                    if (!this.options.disabled && this.visible && b.ui.intersect(c, this, this.options.tolerance)) f = f || this._drop.call(this, e);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], c.currentItem || c.element)) {
                        this.isout =
                            1;
                        this.isover = 0;
                        this._deactivate.call(this, e)
                    }
                }
            });
            return f
        },
        drag: function (c, e) {
            c.options.refreshPositions && b.ui.ddmanager.prepareOffsets(c, e);
            b.each(b.ui.ddmanager.droppables[c.options.scope] || [], function () {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var f = b.ui.intersect(c, this, this.options.tolerance);
                    if (f = !f && this.isover == 1 ? "isout" : f && this.isover == 0 ? "isover" : null) {
                        var g;
                        if (this.options.greedy) {
                            var d = this.element.parents(":data(droppable):eq(0)");
                            if (d.length) {
                                g = b.data(d[0], "droppable");
                                g.greedyChild = f == "isover" ? 1 : 0
                            }
                        }
                        if (g && f == "isover") {
                            g.isover = 0;
                            g.isout = 1;
                            g._out.call(g, e)
                        }
                        this[f] = 1;
                        this[f == "isout" ? "isover" : "isout"] = 0;
                        this[f == "isover" ? "_over" : "_out"].call(this, e);
                        if (g && f == "isout") {
                            g.isout = 0;
                            g.isover = 1;
                            g._over.call(g, e)
                        }
                    }
                }
            })
        }
    }
})(jQuery);
(function (b) {
    b.widget("ui.resizable", b.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function () {
            var f = this,
                g = this.options;
            this.element.addClass("ui-resizable");
            b.extend(this, {
                _aspectRatio: !! g.aspectRatio,
                aspectRatio: g.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: g.helper || g.ghost || g.animate ? g.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && b.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(b('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle =
                    this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = g.handles || (!b(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var d = this.handles.split(",");
                this.handles = {};
                for (var h = 0; h < d.length; h++) {
                    var j = b.trim(d[h]),
                        k = b('<div class="ui-resizable-handle ' + ("ui-resizable-" + j) + '"></div>');
                    /sw|se|ne|nw/.test(j) && k.css({
                        zIndex: ++g.zIndex
                    });
                    "se" == j && k.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[j] = ".ui-resizable-" + j;
                    this.element.append(k)
                }
            }
            this._renderAxis = function (l) {
                l = l || this.element;
                for (var r in this.handles) {
                    if (this.handles[r].constructor ==
                        String) this.handles[r] = b(this.handles[r], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var u = b(this.handles[r], this.element),
                            o = 0;
                        o = /sw|ne|nw|se|n|s/.test(r) ? u.outerHeight() : u.outerWidth();
                        u = ["padding", /ne|nw|n/.test(r) ? "Top" : /se|sw|s/.test(r) ? "Bottom" : /^e$/.test(r) ? "Right" : "Left"].join("");
                        l.css(u, o);
                        this._proportionallyResize()
                    }
                    b(this.handles[r])
                }
            };
            this._renderAxis(this.element);
            this._handles = b(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!f.resizing) {
                    if (this.className) var l = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    f.axis = l && l[1] ? l[1] : "se"
                }
            });
            if (g.autoHide) {
                this._handles.hide();
                b(this.element).addClass("ui-resizable-autohide").hover(function () {
                    b(this).removeClass("ui-resizable-autohide");
                    f._handles.show()
                }, function () {
                    if (!f.resizing) {
                        b(this).addClass("ui-resizable-autohide");
                        f._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var f = function (d) {
                b(d).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                f(this.element);
                var g = this.element;
                g.after(this.originalElement.css({
                    position: g.css("position"),
                    width: g.outerWidth(),
                    height: g.outerHeight(),
                    top: g.css("top"),
                    left: g.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            f(this.originalElement);
            return this
        },
        _mouseCapture: function (f) {
            var g = false;
            for (var d in this.handles) if (b(this.handles[d])[0] == f.target) g = true;
            return !this.options.disabled && g
        },
        _mouseStart: function (f) {
            var g = this.options,
                d = this.element.position(),
                h = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: b(document).scrollTop(),
                left: b(document).scrollLeft()
            };
            if (h.is(".ui-draggable") || /absolute/.test(h.css("position"))) h.css({
                    position: "absolute",
                    top: d.top,
                    left: d.left
                });
            b.browser.opera && /relative/.test(h.css("position")) && h.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            d = c(this.helper.css("left"));
            var j = c(this.helper.css("top"));
            if (g.containment) {
                d += b(g.containment).scrollLeft() || 0;
                j += b(g.containment).scrollTop() || 0
            }
            this.offset =
                this.helper.offset();
            this.position = {
                left: d,
                top: j
            };
            this.size = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            };
            this.originalSize = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            };
            this.originalPosition = {
                left: d,
                top: j
            };
            this.sizeDiff = {
                width: h.outerWidth() - h.width(),
                height: h.outerHeight() - h.height()
            };
            this.originalMousePosition = {
                left: f.pageX,
                top: f.pageY
            };
            this.aspectRatio = typeof g.aspectRatio == "number" ? g.aspectRatio :
                this.originalSize.width / this.originalSize.height || 1;
            g = b(".ui-resizable-" + this.axis).css("cursor");
            b("body").css("cursor", g == "auto" ? this.axis + "-resize" : g);
            h.addClass("ui-resizable-resizing");
            this._propagate("start", f);
            return true
        },
        _mouseDrag: function (f) {
            var g = this.helper,
                d = this.originalMousePosition,
                h = this._change[this.axis];
            if (!h) return false;
            d = h.apply(this, [f, f.pageX - d.left || 0, f.pageY - d.top || 0]);
            if (this._aspectRatio || f.shiftKey) d = this._updateRatio(d, f);
            d = this._respectSize(d, f);
            this._propagate("resize",
                f);
            g.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(d);
            this._trigger("resize", f, this.ui());
            return false
        },
        _mouseStop: function (f) {
            this.resizing = false;
            var g = this.options,
                d = this;
            if (this._helper) {
                var h = this._proportionallyResizeElements,
                    j = h.length && /textarea/i.test(h[0].nodeName);
                h = j && b.ui.hasScroll(h[0], "left") ? 0 : d.sizeDiff.height;
                j = j ? 0 : d.sizeDiff.width;
                j = {
                    width: d.helper.width() - j,
                    height: d.helper.height() - h
                };
                h = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null;
                var k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
                g.animate || this.element.css(b.extend(j, {
                    top: k,
                    left: h
                }));
                d.helper.height(d.size.height);
                d.helper.width(d.size.width);
                this._helper && !g.animate && this._proportionallyResize()
            }
            b("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", f);
            this._helper && this.helper.remove();
            return false
        },
        _updateCache: function (f) {
            this.offset = this.helper.offset();
            if (e(f.left)) this.position.left = f.left;
            if (e(f.top)) this.position.top = f.top;
            if (e(f.height)) this.size.height = f.height;
            if (e(f.width)) this.size.width = f.width
        },
        _updateRatio: function (f) {
            var g = this.position,
                d = this.size,
                h = this.axis;
            if (f.height) f.width = d.height * this.aspectRatio;
            else if (f.width) f.height = d.width / this.aspectRatio;
            if (h == "sw") {
                f.left = g.left + (d.width - f.width);
                f.top =
                    null
            }
            if (h == "nw") {
                f.top = g.top + (d.height - f.height);
                f.left = g.left + (d.width - f.width)
            }
            return f
        },
        _respectSize: function (f) {
            var g = this.options,
                d = this.axis,
                h = e(f.width) && g.maxWidth && g.maxWidth < f.width,
                j = e(f.height) && g.maxHeight && g.maxHeight < f.height,
                k = e(f.width) && g.minWidth && g.minWidth > f.width,
                l = e(f.height) && g.minHeight && g.minHeight > f.height;
            if (k) f.width = g.minWidth;
            if (l) f.height = g.minHeight;
            if (h) f.width = g.maxWidth;
            if (j) f.height = g.maxHeight;
            var r = this.originalPosition.left + this.originalSize.width,
                u = this.position.top +
                    this.size.height,
                o = /sw|nw|w/.test(d);
            d = /nw|ne|n/.test(d);
            if (k && o) f.left = r - g.minWidth;
            if (h && o) f.left = r - g.maxWidth;
            if (l && d) f.top = u - g.minHeight;
            if (j && d) f.top = u - g.maxHeight;
            if ((g = !f.width && !f.height) && !f.left && f.top) f.top = null;
            else if (g && !f.top && f.left) f.left = null;
            return f
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) for (var f = this.helper || this.element, g = 0; g < this._proportionallyResizeElements.length; g++) {
                    var d = this._proportionallyResizeElements[g];
                    if (!this.borderDif) {
                        var h = [d.css("borderTopWidth"), d.css("borderRightWidth"), d.css("borderBottomWidth"), d.css("borderLeftWidth")],
                            j = [d.css("paddingTop"), d.css("paddingRight"), d.css("paddingBottom"), d.css("paddingLeft")];
                        this.borderDif = b.map(h, function (k, l) {
                            k = parseInt(k, 10) || 0;
                            l = parseInt(j[l], 10) || 0;
                            return k + l
                        })
                    }
                    b.browser.msie && (b(f).is(":hidden") || b(f).parents(":hidden").length) || d.css({
                        height: f.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: f.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
            }
        },
        _renderProxy: function () {
            var f =
                this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || b('<div style="overflow:hidden;"></div>');
                var g = b.browser.msie && b.browser.version < 7,
                    d = g ? 1 : 0;
                g = g ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + g,
                    height: this.element.outerHeight() + g,
                    position: "absolute",
                    left: this.elementOffset.left - d + "px",
                    top: this.elementOffset.top - d + "px",
                    zIndex: ++f.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (f,
                g) {
                return {
                    width: this.originalSize.width + g
                }
            },
            w: function (f, g) {
                return {
                    left: this.originalPosition.left + g,
                    width: this.originalSize.width - g
                }
            },
            n: function (f, g, d) {
                return {
                    top: this.originalPosition.top + d,
                    height: this.originalSize.height - d
                }
            },
            s: function (f, g, d) {
                return {
                    height: this.originalSize.height + d
                }
            },
            se: function (f, g, d) {
                return b.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [f, g, d]))
            },
            sw: function (f, g, d) {
                return b.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [f, g,
                        d
                ]))
            },
            ne: function (f, g, d) {
                return b.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [f, g, d]))
            },
            nw: function (f, g, d) {
                return b.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [f, g, d]))
            }
        },
        _propagate: function (f, g) {
            b.ui.plugin.call(this, f, [g, this.ui()]);
            f != "resize" && this._trigger(f, g, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    b.extend(b.ui.resizable, {
        version: "1.8.11"
    });
    b.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var f = b(this).data("resizable").options,
                g = function (d) {
                    b(d).each(function () {
                        var h = b(this);
                        h.data("resizable-alsoresize", {
                            width: parseInt(h.width(), 10),
                            height: parseInt(h.height(), 10),
                            left: parseInt(h.css("left"), 10),
                            top: parseInt(h.css("top"), 10),
                            position: h.css("position")
                        })
                    })
                };
            if (typeof f.alsoResize == "object" && !f.alsoResize.parentNode) if (f.alsoResize.length) {
                    f.alsoResize =
                        f.alsoResize[0];
                    g(f.alsoResize)
                } else b.each(f.alsoResize, function (d) {
                        g(d)
                    });
                else g(f.alsoResize)
        },
        resize: function (f, g) {
            var d = b(this).data("resizable");
            f = d.options;
            var h = d.originalSize,
                j = d.originalPosition,
                k = {
                    height: d.size.height - h.height || 0,
                    width: d.size.width - h.width || 0,
                    top: d.position.top - j.top || 0,
                    left: d.position.left - j.left || 0
                }, l = function (r, u) {
                    b(r).each(function () {
                        var o = b(this),
                            m = b(this).data("resizable-alsoresize"),
                            s = {}, v = u && u.length ? u : o.parents(g.originalElement[0]).length ? ["width", "height"] : ["width",
                                    "height", "top", "left"
                            ];
                        b.each(v, function (x, A) {
                            if ((x = (m[A] || 0) + (k[A] || 0)) && x >= 0) s[A] = x || null
                        });
                        if (b.browser.opera && /relative/.test(o.css("position"))) {
                            d._revertToRelativePosition = true;
                            o.css({
                                position: "absolute",
                                top: "auto",
                                left: "auto"
                            })
                        }
                        o.css(s)
                    })
                };
            typeof f.alsoResize == "object" && !f.alsoResize.nodeType ? b.each(f.alsoResize, function (r, u) {
                l(r, u)
            }) : l(f.alsoResize)
        },
        stop: function () {
            var f = b(this).data("resizable"),
                g = f.options,
                d = function (h) {
                    b(h).each(function () {
                        var j = b(this);
                        j.css({
                            position: j.data("resizable-alsoresize").position
                        })
                    })
                };
            if (f._revertToRelativePosition) {
                f._revertToRelativePosition = false;
                typeof g.alsoResize == "object" && !g.alsoResize.nodeType ? b.each(g.alsoResize, function (h) {
                    d(h)
                }) : d(g.alsoResize)
            }
            b(this).removeData("resizable-alsoresize")
        }
    });
    b.ui.plugin.add("resizable", "animate", {
        stop: function (f) {
            var g = b(this).data("resizable"),
                d = g.options,
                h = g._proportionallyResizeElements,
                j = h.length && /textarea/i.test(h[0].nodeName),
                k = j && b.ui.hasScroll(h[0], "left") ? 0 : g.sizeDiff.height;
            j = {
                width: g.size.width - (j ? 0 : g.sizeDiff.width),
                height: g.size.height - k
            };
            k = parseInt(g.element.css("left"), 10) + (g.position.left - g.originalPosition.left) || null;
            var l = parseInt(g.element.css("top"), 10) + (g.position.top - g.originalPosition.top) || null;
            g.element.animate(b.extend(j, l && k ? {
                top: l,
                left: k
            } : {}), {
                duration: d.animateDuration,
                easing: d.animateEasing,
                step: function () {
                    var r = {
                        width: parseInt(g.element.css("width"), 10),
                        height: parseInt(g.element.css("height"), 10),
                        top: parseInt(g.element.css("top"), 10),
                        left: parseInt(g.element.css("left"), 10)
                    };
                    h && h.length && b(h[0]).css({
                        width: r.width,
                        height: r.height
                    });
                    g._updateCache(r);
                    g._propagate("resize", f)
                }
            })
        }
    });
    b.ui.plugin.add("resizable", "containment", {
        start: function () {
            var f = b(this).data("resizable"),
                g = f.element,
                d = f.options.containment;
            if (g = d instanceof b ? d.get(0) : /parent/.test(d) ? g.parent().get(0) : d) {
                f.containerElement = b(g);
                if (/document/.test(d) || d == document) {
                    f.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    f.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    f.parentData = {
                        element: b(document),
                        left: 0,
                        top: 0,
                        width: b(document).width(),
                        height: b(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var h =
                        b(g),
                        j = [];
                    b(["Top", "Right", "Left", "Bottom"]).each(function (r, u) {
                        j[r] = c(h.css("padding" + u))
                    });
                    f.containerOffset = h.offset();
                    f.containerPosition = h.position();
                    f.containerSize = {
                        height: h.innerHeight() - j[3],
                        width: h.innerWidth() - j[1]
                    };
                    d = f.containerOffset;
                    var k = f.containerSize.height,
                        l = f.containerSize.width;
                    l = b.ui.hasScroll(g, "left") ? g.scrollWidth : l;
                    k = b.ui.hasScroll(g) ? g.scrollHeight : k;
                    f.parentData = {
                        element: g,
                        left: d.left,
                        top: d.top,
                        width: l,
                        height: k
                    }
                }
            }
        },
        resize: function (f) {
            var g = b(this).data("resizable"),
                d = g.options,
                h = g.containerOffset,
                j = g.position;
            f = g._aspectRatio || f.shiftKey;
            var k = {
                top: 0,
                left: 0
            }, l = g.containerElement;
            if (l[0] != document && /static/.test(l.css("position"))) k = h;
            if (j.left < (g._helper ? h.left : 0)) {
                g.size.width += g._helper ? g.position.left - h.left : g.position.left - k.left;
                if (f) g.size.height = g.size.width / d.aspectRatio;
                g.position.left = d.helper ? h.left : 0
            }
            if (j.top < (g._helper ? h.top : 0)) {
                g.size.height += g._helper ? g.position.top - h.top : g.position.top;
                if (f) g.size.width = g.size.height * d.aspectRatio;
                g.position.top = g._helper ?
                    h.top : 0
            }
            g.offset.left = g.parentData.left + g.position.left;
            g.offset.top = g.parentData.top + g.position.top;
            d = Math.abs((g._helper ? g.offset.left - k.left : g.offset.left - k.left) + g.sizeDiff.width);
            h = Math.abs((g._helper ? g.offset.top - k.top : g.offset.top - h.top) + g.sizeDiff.height);
            j = g.containerElement.get(0) == g.element.parent().get(0);
            k = /relative|absolute/.test(g.containerElement.css("position"));
            if (j && k) d -= g.parentData.left;
            if (d + g.size.width >= g.parentData.width) {
                g.size.width = g.parentData.width - d;
                if (f) g.size.height =
                        g.size.width / g.aspectRatio
            }
            if (h + g.size.height >= g.parentData.height) {
                g.size.height = g.parentData.height - h;
                if (f) g.size.width = g.size.height * g.aspectRatio
            }
        },
        stop: function () {
            var f = b(this).data("resizable"),
                g = f.options,
                d = f.containerOffset,
                h = f.containerPosition,
                j = f.containerElement,
                k = b(f.helper),
                l = k.offset(),
                r = k.outerWidth() - f.sizeDiff.width;
            k = k.outerHeight() - f.sizeDiff.height;
            f._helper && !g.animate && /relative/.test(j.css("position")) && b(this).css({
                left: l.left - h.left - d.left,
                width: r,
                height: k
            });
            f._helper && !g.animate &&
                /static/.test(j.css("position")) && b(this).css({
                left: l.left - h.left - d.left,
                width: r,
                height: k
            })
        }
    });
    b.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var f = b(this).data("resizable"),
                g = f.options,
                d = f.size;
            f.ghost = f.originalElement.clone();
            f.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: d.height,
                width: d.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof g.ghost == "string" ? g.ghost : "");
            f.ghost.appendTo(f.helper)
        },
        resize: function () {
            var f = b(this).data("resizable");
            f.ghost && f.ghost.css({
                position: "relative",
                height: f.size.height,
                width: f.size.width
            })
        },
        stop: function () {
            var f = b(this).data("resizable");
            f.ghost && f.helper && f.helper.get(0).removeChild(f.ghost.get(0))
        }
    });
    b.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var f = b(this).data("resizable"),
                g = f.options,
                d = f.size,
                h = f.originalSize,
                j = f.originalPosition,
                k = f.axis;
            g.grid = typeof g.grid == "number" ? [g.grid, g.grid] : g.grid;
            var l = Math.round((d.width - h.width) / (g.grid[0] || 1)) * (g.grid[0] || 1);
            g = Math.round((d.height - h.height) /
                (g.grid[1] || 1)) * (g.grid[1] || 1);
            if (/^(se|s|e)$/.test(k)) {
                f.size.width = h.width + l;
                f.size.height = h.height + g
            } else if (/^(ne)$/.test(k)) {
                f.size.width = h.width + l;
                f.size.height = h.height + g;
                f.position.top = j.top - g
            } else {
                if (/^(sw)$/.test(k)) {
                    f.size.width = h.width + l;
                    f.size.height = h.height + g
                } else {
                    f.size.width = h.width + l;
                    f.size.height = h.height + g;
                    f.position.top = j.top - g
                }
                f.position.left = j.left - l
            }
        }
    });
    var c = function (f) {
        return parseInt(f, 10) || 0
    }, e = function (f) {
            return !isNaN(parseInt(f, 10))
        }
})(jQuery);
(function (b) {
    b.widget("ui.selectable", b.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function () {
            var c = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var e;
            this.refresh = function () {
                e = b(c.options.filter, c.element[0]);
                e.each(function () {
                    var f = b(this),
                        g = f.offset();
                    b.data(this, "selectable-item", {
                        element: this,
                        $element: f,
                        left: g.left,
                        top: g.top,
                        right: g.left + f.outerWidth(),
                        bottom: g.top + f.outerHeight(),
                        startselected: false,
                        selected: f.hasClass("ui-selected"),
                        selecting: f.hasClass("ui-selecting"),
                        unselecting: f.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = e.addClass("ui-selectee");
            this._mouseInit();
            this.helper = b("<div class='ui-selectable-helper'></div>")
        },
        destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart: function (c) {
            var e = this;
            this.opos = [c.pageX,
                    c.pageY
            ];
            if (!this.options.disabled) {
                var f = this.options;
                this.selectees = b(f.filter, this.element[0]);
                this._trigger("start", c);
                b(f.appendTo).append(this.helper);
                this.helper.css({
                    left: c.clientX,
                    top: c.clientY,
                    width: 0,
                    height: 0
                });
                f.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function () {
                    var g = b.data(this, "selectable-item");
                    g.startselected = true;
                    if (!c.metaKey) {
                        g.$element.removeClass("ui-selected");
                        g.selected = false;
                        g.$element.addClass("ui-unselecting");
                        g.unselecting = true;
                        e._trigger("unselecting",
                            c, {
                            unselecting: g.element
                        })
                    }
                });
                b(c.target).parents().andSelf().each(function () {
                    var g = b.data(this, "selectable-item");
                    if (g) {
                        var d = !c.metaKey || !g.$element.hasClass("ui-selected");
                        g.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting");
                        g.unselecting = !d;
                        g.selecting = d;
                        (g.selected = d) ? e._trigger("selecting", c, {
                            selecting: g.element
                        }) : e._trigger("unselecting", c, {
                            unselecting: g.element
                        });
                        return false
                    }
                })
            }
        },
        _mouseDrag: function (c) {
            var e = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var f =
                    this.options,
                    g = this.opos[0],
                    d = this.opos[1],
                    h = c.pageX,
                    j = c.pageY;
                if (g > h) {
                    var k = h;
                    h = g;
                    g = k
                }
                if (d > j) {
                    k = j;
                    j = d;
                    d = k
                }
                this.helper.css({
                    left: g,
                    top: d,
                    width: h - g,
                    height: j - d
                });
                this.selectees.each(function () {
                    var l = b.data(this, "selectable-item");
                    if (!(!l || l.element == e.element[0])) {
                        var r = false;
                        if (f.tolerance == "touch") r = !(l.left > h || l.right < g || l.top > j || l.bottom < d);
                        else if (f.tolerance == "fit") r = l.left > g && l.right < h && l.top > d && l.bottom < j;
                        if (r) {
                            if (l.selected) {
                                l.$element.removeClass("ui-selected");
                                l.selected = false
                            }
                            if (l.unselecting) {
                                l.$element.removeClass("ui-unselecting");
                                l.unselecting = false
                            }
                            if (!l.selecting) {
                                l.$element.addClass("ui-selecting");
                                l.selecting = true;
                                e._trigger("selecting", c, {
                                    selecting: l.element
                                })
                            }
                        } else {
                            if (l.selecting) if (c.metaKey && l.startselected) {
                                    l.$element.removeClass("ui-selecting");
                                    l.selecting = false;
                                    l.$element.addClass("ui-selected");
                                    l.selected = true
                                } else {
                                    l.$element.removeClass("ui-selecting");
                                    l.selecting = false;
                                    if (l.startselected) {
                                        l.$element.addClass("ui-unselecting");
                                        l.unselecting = true
                                    }
                                    e._trigger("unselecting", c, {
                                        unselecting: l.element
                                    })
                                }
                            if (l.selected) if (!c.metaKey && !l.startselected) {
                                    l.$element.removeClass("ui-selected");
                                    l.selected = false;
                                    l.$element.addClass("ui-unselecting");
                                    l.unselecting = true;
                                    e._trigger("unselecting", c, {
                                        unselecting: l.element
                                    })
                                }
                        }
                    }
                });
                return false
            }
        },
        _mouseStop: function (c) {
            var e = this;
            this.dragged = false;
            b(".ui-unselecting", this.element[0]).each(function () {
                var f = b.data(this, "selectable-item");
                f.$element.removeClass("ui-unselecting");
                f.unselecting = false;
                f.startselected = false;
                e._trigger("unselected", c, {
                    unselected: f.element
                })
            });
            b(".ui-selecting", this.element[0]).each(function () {
                var f =
                    b.data(this, "selectable-item");
                f.$element.removeClass("ui-selecting").addClass("ui-selected");
                f.selecting = false;
                f.selected = true;
                f.startselected = true;
                e._trigger("selected", c, {
                    selected: f.element
                })
            });
            this._trigger("stop", c);
            this.helper.remove();
            return false
        }
    });
    b.extend(b.ui.selectable, {
        version: "1.8.11"
    })
})(jQuery);
(function (b) {
    b.widget("ui.sortable", b.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function () {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var c = this.items.length - 1; c >= 0; c--) this.items[c].item.removeData("sortable-item");
            return this
        },
        _setOption: function (c, e) {
            if (c === "disabled") {
                this.options[c] =
                    e;
                this.widget()[e ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else b.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (c, e) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(c);
            var f = null,
                g = this;
            b(c.target).parents().each(function () {
                if (b.data(this, "sortable-item") == g) {
                    f = b(this);
                    return false
                }
            });
            if (b.data(c.target, "sortable-item") == g) f = b(c.target);
            if (!f) return false;
            if (this.options.handle && !e) {
                var d = false;
                b(this.options.handle, f).find("*").andSelf().each(function () {
                    if (this == c.target) d = true
                });
                if (!d) return false
            }
            this.currentItem = f;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (c, e, f) {
            e = this.options;
            var g = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            b.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            e.containment && this._setContainment();
            if (e.cursor) {
                if (b("body").css("cursor")) this._storedCursor = b("body").css("cursor");
                b("body").css("cursor", e.cursor)
            }
            if (e.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", e.opacity)
            }
            if (e.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", e.zIndex)
            }
            if (this.scrollParent[0] !=
                document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", c, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!f) for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", c, g._uiHash(this));
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(c);
            return true
        },
        _mouseDrag: function (c) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var e = this.options,
                    f = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - c.pageY < e.scrollSensitivity) this.scrollParent[0].scrollTop = f = this.scrollParent[0].scrollTop + e.scrollSpeed;
                    else if (c.pageY - this.overflowOffset.top <
                        e.scrollSensitivity) this.scrollParent[0].scrollTop = f = this.scrollParent[0].scrollTop - e.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - c.pageX < e.scrollSensitivity) this.scrollParent[0].scrollLeft = f = this.scrollParent[0].scrollLeft + e.scrollSpeed;
                    else if (c.pageX - this.overflowOffset.left < e.scrollSensitivity) this.scrollParent[0].scrollLeft = f = this.scrollParent[0].scrollLeft - e.scrollSpeed
                } else {
                    if (c.pageY - b(document).scrollTop() < e.scrollSensitivity) f = b(document).scrollTop(b(document).scrollTop() -
                            e.scrollSpeed);
                    else if (b(window).height() - (c.pageY - b(document).scrollTop()) < e.scrollSensitivity) f = b(document).scrollTop(b(document).scrollTop() + e.scrollSpeed);
                    if (c.pageX - b(document).scrollLeft() < e.scrollSensitivity) f = b(document).scrollLeft(b(document).scrollLeft() - e.scrollSpeed);
                    else if (b(window).width() - (c.pageX - b(document).scrollLeft()) < e.scrollSensitivity) f = b(document).scrollLeft(b(document).scrollLeft() + e.scrollSpeed)
                }
                f !== false && b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this,
                    c)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (e = this.items.length - 1; e >= 0; e--) {
                f = this.items[e];
                var g = f.item[0],
                    d = this._intersectsWithPointer(f);
                if (d) if (g != this.currentItem[0] && this.placeholder[d == 1 ? "next" : "prev"]()[0] != g && !b.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !b.ui.contains(this.element[0],
                        g) : true)) {
                        this.direction = d == 1 ? "down" : "up";
                        if (this.options.tolerance == "pointer" || this._intersectsWithSides(f)) this._rearrange(c, f);
                        else break;
                        this._trigger("change", c, this._uiHash());
                        break
                    }
            }
            this._contactContainers(c);
            b.ui.ddmanager && b.ui.ddmanager.drag(this, c);
            this._trigger("sort", c, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (c, e) {
            if (c) {
                b.ui.ddmanager && !this.options.dropBehaviour && b.ui.ddmanager.drop(this, c);
                if (this.options.revert) {
                    var f = this;
                    e = f.placeholder.offset();
                    f.reverting = true;
                    b(this.helper).animate({
                        left: e.left - this.offset.parent.left - f.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: e.top - this.offset.parent.top - f.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        f._clear(c)
                    })
                } else this._clear(c, e);
                return false
            }
        },
        cancel: function () {
            var c = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :
                    this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    this.containers[e]._trigger("deactivate", null, c._uiHash(this));
                    if (this.containers[e].containerCache.over) {
                        this.containers[e]._trigger("out", null, c._uiHash(this));
                        this.containers[e].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                b.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? b(this.domPosition.prev).after(this.currentItem) : b(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (c) {
            var e = this._getItemsAsjQuery(c && c.connected),
                f = [];
            c = c || {};
            b(e).each(function () {
                var g = (b(c.item || this).attr(c.attribute || "id") || "").match(c.expression || /(.+)[-=_](.+)/);
                if (g) f.push((c.key || g[1] + "[]") + "=" + (c.key && c.expression ? g[1] : g[2]))
            });
            !f.length && c.key && f.push(c.key + "=");
            return f.join("&")
        },
        toArray: function (c) {
            var e = this._getItemsAsjQuery(c && c.connected),
                f = [];
            c = c || {};
            e.each(function () {
                f.push(b(c.item || this).attr(c.attribute || "id") || "")
            });
            return f
        },
        _intersectsWith: function (c) {
            var e = this.positionAbs.left,
                f = e + this.helperProportions.width,
                g = this.positionAbs.top,
                d = g + this.helperProportions.height,
                h = c.left,
                j = h + c.width,
                k = c.top,
                l = k + c.height,
                r = this.offset.click.top,
                u = this.offset.click.left;
            r = g + r > k && g + r < l && e + u > h && e + u < j;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers ||
                this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > c[this.floating ? "width" : "height"] ? r : h < e + this.helperProportions.width / 2 && f - this.helperProportions.width / 2 < j && k < g + this.helperProportions.height / 2 && d - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function (c) {
            var e = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top, c.height);
            c = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left, c.width);
            e = e && c;
            c = this._getDragVerticalDirection();
            var f = this._getDragHorizontalDirection();
            if (!e) return false;
            return this.floating ? f && f == "right" || c == "down" ? 2 : 1 : c && (c == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (c) {
            var e = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top + c.height / 2, c.height);
            c = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left + c.width / 2, c.width);
            var f = this._getDragVerticalDirection(),
                g = this._getDragHorizontalDirection();
            return this.floating && g ? g == "right" && c || g == "left" && !c : f && (f == "down" && e || f == "up" && !e)
        },
        _getDragVerticalDirection: function () {
            var c = this.positionAbs.top - this.lastPositionAbs.top;
            return c != 0 && (c > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var c = this.positionAbs.left - this.lastPositionAbs.left;
            return c != 0 && (c > 0 ? "right" : "left")
        },
        refresh: function (c) {
            this._refreshItems(c);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var c = this.options;
            return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
        },
        _getItemsAsjQuery: function (c) {
            var e = [],
                f = [],
                g = this._connectWith();
            if (g && c) for (c = g.length - 1; c >= 0; c--) for (var d = b(g[c]), h = d.length - 1; h >= 0; h--) {
                        var j = b.data(d[h], "sortable");
                        if (j && j != this && !j.options.disabled) f.push([b.isFunction(j.options.items) ? j.options.items.call(j.element) : b(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
            }
            f.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
                    this
            ]);
            for (c = f.length - 1; c >= 0; c--) f[c][0].each(function () {
                    e.push(this)
                });
            return b(e)
        },
        _removeCurrentsFromItems: function () {
            for (var c = this.currentItem.find(":data(sortable-item)"), e = 0; e < this.items.length; e++) for (var f = 0; f < c.length; f++) c[f] == this.items[e].item[0] && this.items.splice(e, 1)
        },
        _refreshItems: function (c) {
            this.items = [];
            this.containers = [this];
            var e = this.items,
                f = [
                    [b.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {
                            item: this.currentItem
                        }) : b(this.options.items, this.element),
                            this
                    ]
                ],
                g = this._connectWith();
            if (g) for (var d = g.length - 1; d >= 0; d--) for (var h = b(g[d]), j = h.length - 1; j >= 0; j--) {
                        var k = b.data(h[j], "sortable");
                        if (k && k != this && !k.options.disabled) {
                            f.push([b.isFunction(k.options.items) ? k.options.items.call(k.element[0], c, {
                                    item: this.currentItem
                                }) : b(k.options.items, k.element), k]);
                            this.containers.push(k)
                        }
            }
            for (d = f.length - 1; d >= 0; d--) {
                c = f[d][1];
                g = f[d][0];
                j = 0;
                for (h = g.length; j < h; j++) {
                    k = b(g[j]);
                    k.data("sortable-item", c);
                    e.push({
                        item: k,
                        instance: c,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (c) {
            if (this.offsetParent &&
                this.helper) this.offset.parent = this._getParentOffset();
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e],
                    g = this.options.toleranceElement ? b(this.options.toleranceElement, f.item) : f.item;
                if (!c) {
                    f.width = g.outerWidth();
                    f.height = g.outerHeight()
                }
                g = g.offset();
                f.left = g.left;
                f.top = g.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (e = this.containers.length - 1; e >= 0; e--) {
                    g = this.containers[e].element.offset();
                    this.containers[e].containerCache.left =
                        g.left;
                    this.containers[e].containerCache.top = g.top;
                    this.containers[e].containerCache.width = this.containers[e].element.outerWidth();
                    this.containers[e].containerCache.height = this.containers[e].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function (c) {
            var e = c || this,
                f = e.options;
            if (!f.placeholder || f.placeholder.constructor == String) {
                var g = f.placeholder;
                f.placeholder = {
                    element: function () {
                        var d = b(document.createElement(e.currentItem[0].nodeName)).addClass(g || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!g) d.style.visibility = "hidden";
                        return d
                    },
                    update: function (d, h) {
                        if (!(g && !f.forcePlaceholderSize)) {
                            h.height() || h.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10));
                            h.width() || h.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            e.placeholder = b(f.placeholder.element.call(e.element, e.currentItem));
            e.currentItem.after(e.placeholder);
            f.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function (c) {
            for (var e = null, f = null, g = this.containers.length - 1; g >= 0; g--) if (!b.ui.contains(this.currentItem[0], this.containers[g].element[0])) if (this._intersectsWith(this.containers[g].containerCache)) {
                        if (!(e && b.ui.contains(this.containers[g].element[0], e.element[0]))) {
                            e = this.containers[g];
                            f = g
                        }
                    } else if (this.containers[g].containerCache.over) {
                this.containers[g]._trigger("out", c, this._uiHash(this));
                this.containers[g].containerCache.over = 0
            }
            if (e) if (this.containers.length ===
                    1) {
                    this.containers[f]._trigger("over", c, this._uiHash(this));
                    this.containers[f].containerCache.over = 1
                } else if (this.currentContainer != this.containers[f]) {
                e = 1E4;
                g = null;
                for (var d = this.positionAbs[this.containers[f].floating ? "left" : "top"], h = this.items.length - 1; h >= 0; h--) if (b.ui.contains(this.containers[f].element[0], this.items[h].item[0])) {
                        var j = this.items[h][this.containers[f].floating ? "left" : "top"];
                        if (Math.abs(j - d) < e) {
                            e = Math.abs(j - d);
                            g = this.items[h]
                        }
                    }
                if (g || this.options.dropOnEmpty) {
                    this.currentContainer =
                        this.containers[f];
                    g ? this._rearrange(c, g, null, true) : this._rearrange(c, null, this.containers[f].element, true);
                    this._trigger("change", c, this._uiHash());
                    this.containers[f]._trigger("change", c, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[f]._trigger("over", c, this._uiHash(this));
                    this.containers[f].containerCache.over = 1
                }
            }
        },
        _createHelper: function (c) {
            var e = this.options;
            c = b.isFunction(e.helper) ? b(e.helper.apply(this.element[0], [c, this.currentItem])) :
                e.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            c.parents("body").length || b(e.appendTo != "parent" ? e.appendTo : this.currentItem[0].parentNode)[0].appendChild(c[0]);
            if (c[0] == this.currentItem[0]) this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
            };
            if (c[0].style.width == "" || e.forceHelperSize) c.width(this.currentItem.width());
            if (c[0].style.height ==
                "" || e.forceHelperSize) c.height(this.currentItem.height());
            return c
        },
        _adjustOffsetFromHelper: function (c) {
            if (typeof c == "string") c = c.split(" ");
            if (b.isArray(c)) c = {
                    left: +c[0],
                    top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent =
                this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) c = {
                    top: 0,
                    left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"),
                    10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var c = this.currentItem.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                    top: 0,
                    left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, b(c.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b(c.containment == "document" ? document : window).height() ||
                        document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment)) {
                var e = b(c.containment)[0];
                c = b(c.containment).offset();
                var f = b(e).css("overflow") != "hidden";
                this.containment = [c.left + (parseInt(b(e).css("borderLeftWidth"), 10) || 0) + (parseInt(b(e).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(b(e).css("borderTopWidth"), 10) || 0) + (parseInt(b(e).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (f ? Math.max(e.scrollWidth,
                        e.offsetWidth) : e.offsetWidth) - (parseInt(b(e).css("borderLeftWidth"), 10) || 0) - (parseInt(b(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (f ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(b(e).css("borderTopWidth"), 10) || 0) - (parseInt(b(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (c, e) {
            if (!e) e = this.position;
            c = c == "absolute" ? 1 : -1;
            var f = this.cssPosition == "absolute" && !(this.scrollParent[0] !=
                document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = /(html|body)/i.test(f[0].tagName);
            return {
                top: e.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * c),
                left: e.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() :
                    g ? 0 : f.scrollLeft()) * c)
            }
        },
        _generatePosition: function (c) {
            var e = this.options,
                f = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = /(html|body)/i.test(f[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var d = c.pageX,
                h = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX -
                        this.offset.click.left < this.containment[0]) d = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) h = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) d = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) h = this.containment[3] + this.offset.click.top
                }
                if (e.grid) {
                    h = this.originalPageY + Math.round((h - this.originalPageY) / e.grid[1]) * e.grid[1];
                    h = this.containment ? !(h - this.offset.click.top <
                        this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h : !(h - this.offset.click.top < this.containment[1]) ? h - e.grid[1] : h + e.grid[1] : h;
                    d = this.originalPageX + Math.round((d - this.originalPageX) / e.grid[0]) * e.grid[0];
                    d = this.containment ? !(d - this.offset.click.left < this.containment[0] || d - this.offset.click.left > this.containment[2]) ? d : !(d - this.offset.click.left < this.containment[0]) ? d - e.grid[0] : d + e.grid[0] : d
                }
            }
            return {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari &&
                    this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()),
                left: d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft())
            }
        },
        _rearrange: function (c, e, f, g) {
            f ? f[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? e.item[0] : e.item[0].nextSibling);
            this.counter =
                this.counter ? ++this.counter : 1;
            var d = this,
                h = this.counter;
            window.setTimeout(function () {
                h == d.counter && d.refreshPositions(!g)
            }, 0)
        },
        _clear: function (c, e) {
            this.reverting = false;
            var f = [];
            !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var g in this._storedCSS) if (this._storedCSS[g] == "auto" || this._storedCSS[g] == "static") this._storedCSS[g] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !e && f.push(function (d) {
                this._trigger("receive", d, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) f.push(function (d) {
                    this._trigger("update", d, this._uiHash())
                });
            if (!b.ui.contains(this.element[0], this.currentItem[0])) {
                e || f.push(function (d) {
                    this._trigger("remove", d, this._uiHash())
                });
                for (g = this.containers.length - 1; g >= 0; g--) if (b.ui.contains(this.containers[g].element[0],
                        this.currentItem[0]) && !e) {
                        f.push(function (d) {
                            return function (h) {
                                d._trigger("receive", h, this._uiHash(this))
                            }
                        }.call(this, this.containers[g]));
                        f.push(function (d) {
                            return function (h) {
                                d._trigger("update", h, this._uiHash(this))
                            }
                        }.call(this, this.containers[g]))
                    }
            }
            for (g = this.containers.length - 1; g >= 0; g--) {
                e || f.push(function (d) {
                    return function (h) {
                        d._trigger("deactivate", h, this._uiHash(this))
                    }
                }.call(this, this.containers[g]));
                if (this.containers[g].containerCache.over) {
                    f.push(function (d) {
                        return function (h) {
                            d._trigger("out",
                                h, this._uiHash(this))
                        }
                    }.call(this, this.containers[g]));
                    this.containers[g].containerCache.over = 0
                }
            }
            this._storedCursor && b("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", c, this._uiHash());
                    for (g = 0; g < f.length; g++) f[g].call(this, c);
                    this._trigger("stop", c, this._uiHash())
                }
                return false
            }
            e ||
                this._trigger("beforeStop", c, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!e) {
                for (g = 0; g < f.length; g++) f[g].call(this, c);
                this._trigger("stop", c, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            b.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (c) {
            var e = c || this;
            return {
                helper: e.helper,
                placeholder: e.placeholder || b([]),
                position: e.position,
                originalPosition: e.originalPosition,
                offset: e.positionAbs,
                item: e.currentItem,
                sender: c ? c.element : null
            }
        }
    });
    b.extend(b.ui.sortable, {
        version: "1.8.11"
    })
})(jQuery);
(function (b) {
    b.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function () {
            var c = this,
                e = c.options;
            c.running = 0;
            c.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            c.headers = c.element.find(e.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                e.disabled || b(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                e.disabled || b(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                e.disabled || b(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                e.disabled || b(this).removeClass("ui-state-focus")
            });
            c.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (e.navigation) {
                var f = c.element.find("a").filter(e.navigationFilter).eq(0);
                if (f.length) {
                    var g = f.closest(".ui-accordion-header");
                    c.active = g.length ? g : f.closest(".ui-accordion-content").prev()
                }
            }
            c.active = c._findActive(c.active || e.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            c.active.next().addClass("ui-accordion-content-active");
            c._createIcons();
            c.resize();
            c.element.attr("role", "tablist");
            c.headers.attr("role", "tab").bind("keydown.accordion", function (d) {
                return c._keydown(d)
            }).next().attr("role", "tabpanel");
            c.headers.not(c.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            c.active.length ? c.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : c.headers.eq(0).attr("tabIndex", 0);
            b.browser.safari || c.headers.find("a").attr("tabIndex", -1);
            e.event && c.headers.bind(e.event.split(" ").join(".accordion ") + ".accordion", function (d) {
                c._clickHandler.call(c, d, this);
                d.preventDefault()
            })
        },
        _createIcons: function () {
            var c =
                this.options;
            if (c.icons) {
                b("<span></span>").addClass("ui-icon " + c.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function () {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function () {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var e = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (c.autoHeight || c.fillHeight) e.css("height", "");
            return b.Widget.prototype.destroy.call(this)
        },
        _setOption: function (c, e) {
            b.Widget.prototype._setOption.apply(this, arguments);
            c == "active" && this.activate(e);
            if (c == "icons") {
                this._destroyIcons();
                e && this._createIcons()
            }
            if (c == "disabled") this.headers.add(this.headers.next())[e ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function (c) {
            if (!(this.options.disabled || c.altKey || c.ctrlKey)) {
                var e = b.ui.keyCode,
                    f = this.headers.length,
                    g = this.headers.index(c.target),
                    d = false;
                switch (c.keyCode) {
                case e.RIGHT:
                case e.DOWN:
                    d = this.headers[(g + 1) % f];
                    break;
                case e.LEFT:
                case e.UP:
                    d = this.headers[(g - 1 + f) % f];
                    break;
                case e.SPACE:
                case e.ENTER:
                    this._clickHandler({
                        target: c.target
                    }, c.target);
                    c.preventDefault()
                }
                if (d) {
                    b(c.target).attr("tabIndex", -1);
                    b(d).attr("tabIndex", 0);
                    d.focus();
                    return false
                }
                return true
            }
        },
        resize: function () {
            var c = this.options,
                e;
            if (c.fillSpace) {
                if (b.browser.msie) {
                    var f = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                e = this.element.parent().height();
                b.browser.msie && this.element.parent().css("overflow", f);
                this.headers.each(function () {
                    e -= b(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    b(this).height(Math.max(0, e - b(this).innerHeight() +
                        b(this).height()))
                }).css("overflow", "auto")
            } else if (c.autoHeight) {
                e = 0;
                this.headers.next().each(function () {
                    e = Math.max(e, b(this).height("").height())
                }).height(e)
            }
            return this
        },
        activate: function (c) {
            this.options.active = c;
            c = this._findActive(c)[0];
            this._clickHandler({
                target: c
            }, c);
            return this
        },
        _findActive: function (c) {
            return c ? typeof c === "number" ? this.headers.filter(":eq(" + c + ")") : this.headers.not(this.headers.not(c)) : c === false ? b([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function (c, e) {
            var f = this.options;
            if (!f.disabled) if (c.target) {
                    c = b(c.currentTarget || e);
                    e = c[0] === this.active[0];
                    f.active = f.collapsible && e ? false : this.headers.index(c);
                    if (!(this.running || !f.collapsible && e)) {
                        var g = this.active;
                        k = c.next();
                        h = this.active.next();
                        j = {
                            options: f,
                            newHeader: e && f.collapsible ? b([]) : c,
                            oldHeader: this.active,
                            newContent: e && f.collapsible ? b([]) : k,
                            oldContent: h
                        };
                        var d = this.headers.index(this.active[0]) > this.headers.index(c[0]);
                        this.active = e ? b([]) : c;
                        this._toggle(k, h, j, e, d);
                        g.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(f.icons.headerSelected).addClass(f.icons.header);
                        if (!e) {
                            c.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(f.icons.header).addClass(f.icons.headerSelected);
                            c.next().addClass("ui-accordion-content-active")
                        }
                    }
                } else if (f.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(f.icons.headerSelected).addClass(f.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var h = this.active.next(),
                    j = {
                        options: f,
                        newHeader: b([]),
                        oldHeader: f.active,
                        newContent: b([]),
                        oldContent: h
                    }, k = this.active = b([]);
                this._toggle(k, h, j)
            }
        },
        _toggle: function (c, e, f, g, d) {
            var h = this,
                j = h.options;
            h.toShow = c;
            h.toHide = e;
            h.data = f;
            var k = function () {
                if (h) return h._completed.apply(h, arguments)
            };
            h._trigger("changestart", null, h.data);
            h.running = e.size() === 0 ? c.size() : e.size();
            if (j.animated) {
                f = {};
                f = j.collapsible && g ? {
                    toShow: b([]),
                    toHide: e,
                    complete: k,
                    down: d,
                    autoHeight: j.autoHeight || j.fillSpace
                } : {
                    toShow: c,
                    toHide: e,
                    complete: k,
                    down: d,
                    autoHeight: j.autoHeight || j.fillSpace
                };
                if (!j.proxied) j.proxied = j.animated;
                if (!j.proxiedDuration) j.proxiedDuration = j.duration;
                j.animated = b.isFunction(j.proxied) ? j.proxied(f) : j.proxied;
                j.duration = b.isFunction(j.proxiedDuration) ? j.proxiedDuration(f) : j.proxiedDuration;
                g = b.ui.accordion.animations;
                var l = j.duration,
                    r = j.animated;
                if (r && !g[r] && !b.easing[r]) r = "slide";
                g[r] || (g[r] = function (u) {
                    this.slide(u, {
                        easing: r,
                        duration: l || 700
                    })
                });
                g[r](f)
            } else {
                if (j.collapsible && g) c.toggle();
                else {
                    e.hide();
                    c.show()
                }
                k(true)
            }
            e.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur();
            c.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function (c) {
            this.running = c ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                });
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length) this.toHide.parent()[0].className = this.toHide.parent()[0].className;
                this._trigger("change", null, this.data)
            }
        }
    });
    b.extend(b.ui.accordion, {
        version: "1.8.11",
        animations: {
            slide: function (c, e) {
                c = b.extend({
                    easing: "swing",
                    duration: 300
                }, c, e);
                if (c.toHide.size()) if (c.toShow.size()) {
                        var f = c.toShow.css("overflow"),
                            g = 0,
                            d = {}, h = {}, j;
                        e = c.toShow;
                        j = e[0].style.width;
                        e.width(parseInt(e.parent().width(), 10) - parseInt(e.css("paddingLeft"), 10) - parseInt(e.css("paddingRight"), 10) - (parseInt(e.css("borderLeftWidth"), 10) || 0) - (parseInt(e.css("borderRightWidth"), 10) || 0));
                        b.each(["height", "paddingTop", "paddingBottom"], function (k, l) {
                            h[l] = "hide";
                            k = ("" + b.css(c.toShow[0], l)).match(/^([\d+-.]+)(.*)$/);
                            d[l] = {
                                value: k[1],
                                unit: k[2] || "px"
                            }
                        });
                        c.toShow.css({
                            height: 0,
                            overflow: "hidden"
                        }).show();
                        c.toHide.filter(":hidden").each(c.complete).end().filter(":visible").animate(h, {
                            step: function (k, l) {
                                if (l.prop == "height") g = l.end - l.start === 0 ? 0 : (l.now - l.start) / (l.end - l.start);
                                c.toShow[0].style[l.prop] = g * d[l.prop].value + d[l.prop].unit
                            },
                            duration: c.duration,
                            easing: c.easing,
                            complete: function () {
                                c.autoHeight || c.toShow.css("height", "");
                                c.toShow.css({
                                    width: j,
                                    overflow: f
                                });
                                c.complete()
                            }
                        })
                    } else c.toHide.animate({
                            height: "hide",
                            paddingTop: "hide",
                            paddingBottom: "hide"
                        }, c);
                    else c.toShow.animate({
                            height: "show",
                            paddingTop: "show",
                            paddingBottom: "show"
                        }, c)
            },
            bounceslide: function (c) {
                this.slide(c, {
                    easing: c.down ? "easeOutBounce" : "swing",
                    duration: c.down ? 1E3 : 200
                })
            }
        }
    })
})(jQuery);
(function (b) {
    var c = 0;
    b.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function () {
            var e = this,
                f = this.element[0].ownerDocument,
                g;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (d) {
                if (!(e.options.disabled || e.element.attr("readonly"))) {
                    g =
                        false;
                    var h = b.ui.keyCode;
                    switch (d.keyCode) {
                    case h.PAGE_UP:
                        e._move("previousPage", d);
                        break;
                    case h.PAGE_DOWN:
                        e._move("nextPage", d);
                        break;
                    case h.UP:
                        e._move("previous", d);
                        d.preventDefault();
                        break;
                    case h.DOWN:
                        e._move("next", d);
                        d.preventDefault();
                        break;
                    case h.ENTER:
                    case h.NUMPAD_ENTER:
                        if (e.menu.active) {
                            g = true;
                            d.preventDefault()
                        }
                    case h.TAB:
                        if (!e.menu.active) return;
                        e.menu.select(d);
                        break;
                    case h.ESCAPE:
                        e.element.val(e.term);
                        e.close(d);
                        break;
                    default:
                        clearTimeout(e.searching);
                        e.searching = setTimeout(function () {
                            if (e.term !=
                                e.element.val()) {
                                e.selectedItem = null;
                                e.search(null, d)
                            }
                        }, e.options.delay);
                        break
                    }
                }
            }).bind("keypress.autocomplete", function (d) {
                if (g) {
                    g = false;
                    d.preventDefault()
                }
            }).bind("focus.autocomplete", function () {
                if (!e.options.disabled) {
                    e.selectedItem = null;
                    e.previous = e.element.val()
                }
            }).bind("blur.autocomplete", function (d) {
                if (!e.options.disabled) {
                    clearTimeout(e.searching);
                    e.closing = setTimeout(function () {
                        e.close(d);
                        e._change(d)
                    }, 150)
                }
            });
            this._initSource();
            this.response = function () {
                return e._response.apply(e, arguments)
            };
            this.menu = b("<ul></ul>").addClass("ui-autocomplete").appendTo(b(this.options.appendTo || "body", f)[0]).mousedown(function (d) {
                var h = e.menu.element[0];
                b(d.target).closest(".ui-menu-item").length || setTimeout(function () {
                    b(document).one("mousedown", function (j) {
                        j.target !== e.element[0] && j.target !== h && !b.ui.contains(h, j.target) && e.close()
                    })
                }, 1);
                setTimeout(function () {
                    clearTimeout(e.closing)
                }, 13)
            }).menu({
                focus: function (d, h) {
                    h = h.item.data("item.autocomplete");
                    false !== e._trigger("focus", d, {
                        item: h
                    }) && /^key/.test(d.originalEvent.type) &&
                        e.element.val(h.value)
                },
                selected: function (d, h) {
                    var j = h.item.data("item.autocomplete"),
                        k = e.previous;
                    if (e.element[0] !== f.activeElement) {
                        e.element.focus();
                        e.previous = k;
                        setTimeout(function () {
                            e.previous = k;
                            e.selectedItem = j
                        }, 1)
                    }
                    false !== e._trigger("select", d, {
                        item: j
                    }) && e.element.val(j.value);
                    e.term = e.element.val();
                    e.close(d);
                    e.selectedItem = j
                },
                blur: function () {
                    e.menu.element.is(":visible") && e.element.val() !== e.term && e.element.val(e.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            b.fn.bgiframe && this.menu.element.bgiframe()
        },
        destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function (e, f) {
            b.Widget.prototype._setOption.apply(this, arguments);
            e === "source" && this._initSource();
            if (e === "appendTo") this.menu.element.appendTo(b(f || "body", this.element[0].ownerDocument)[0]);
            e === "disabled" &&
                f && this.xhr && this.xhr.abort()
        },
        _initSource: function () {
            var e = this,
                f, g;
            if (b.isArray(this.options.source)) {
                f = this.options.source;
                this.source = function (d, h) {
                    h(b.ui.autocomplete.filter(f, d.term))
                }
            } else if (typeof this.options.source === "string") {
                g = this.options.source;
                this.source = function (d, h) {
                    e.xhr && e.xhr.abort();
                    e.xhr = b.ajax({
                        url: g,
                        data: d,
                        dataType: "json",
                        autocompleteRequest: ++c,
                        success: function (j) {
                            this.autocompleteRequest === c && h(j)
                        },
                        error: function () {
                            this.autocompleteRequest === c && h([])
                        }
                    })
                }
            } else this.source =
                    this.options.source
        },
        search: function (e, f) {
            e = e != null ? e : this.element.val();
            this.term = this.element.val();
            if (e.length < this.options.minLength) return this.close(f);
            clearTimeout(this.closing);
            if (this._trigger("search", f) !== false) return this._search(e)
        },
        _search: function (e) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: e
            }, this.response)
        },
        _response: function (e) {
            if (!this.options.disabled && e && e.length) {
                e = this._normalize(e);
                this._suggest(e);
                this._trigger("open")
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function (e) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", e)
            }
        },
        _change: function (e) {
            this.previous !== this.element.val() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function (e) {
            if (e.length && e[0].label && e[0].value) return e;
            return b.map(e, function (f) {
                if (typeof f === "string") return {
                        label: f,
                        value: f
                };
                return b.extend({
                    label: f.label || f.value,
                    value: f.value || f.label
                }, f)
            })
        },
        _suggest: function (e) {
            var f = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(f, e);
            this.menu.deactivate();
            this.menu.refresh();
            f.show();
            this._resizeMenu();
            f.position(b.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next(new b.Event("mouseover"))
        },
        _resizeMenu: function () {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function (e, f) {
            var g = this;
            b.each(f, function (d, h) {
                g._renderItem(e, h)
            })
        },
        _renderItem: function (e, f) {
            return b("<li></li>").data("item.autocomplete", f).append(b("<a></a>").text(f.label)).appendTo(e)
        },
        _move: function (e, f) {
            if (this.menu.element.is(":visible")) if (this.menu.first() && /^previous/.test(e) || this.menu.last() && /^next/.test(e)) {
                    this.element.val(this.term);
                    this.menu.deactivate()
                } else this.menu[e](f);
                else this.search(null, f)
        },
        widget: function () {
            return this.menu.element
        }
    });
    b.extend(b.ui.autocomplete, {
        escapeRegex: function (e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,
                "\\$&")
        },
        filter: function (e, f) {
            var g = new RegExp(b.ui.autocomplete.escapeRegex(f), "i");
            return b.grep(e, function (d) {
                return g.test(d.label || d.value || d)
            })
        }
    })
})(jQuery);
(function (b) {
    b.widget("ui.menu", {
        _create: function () {
            var c = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function (e) {
                if (b(e.target).closest(".ui-menu-item a").length) {
                    e.preventDefault();
                    c.select(e)
                }
            });
            this.refresh()
        },
        refresh: function () {
            var c = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (e) {
                c.activate(e, b(this).parent())
            }).mouseleave(function () {
                c.deactivate()
            })
        },
        activate: function (c, e) {
            this.deactivate();
            if (this.hasScroll()) {
                var f = e.offset().top - this.element.offset().top,
                    g = this.element.attr("scrollTop"),
                    d = this.element.height();
                if (f < 0) this.element.attr("scrollTop", g + f);
                else f >= d && this.element.attr("scrollTop", g + f - d + e.height())
            }
            this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", c, {
                item: e
            })
        },
        deactivate: function () {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        },
        next: function (c) {
            this.move("next", ".ui-menu-item:first", c)
        },
        previous: function (c) {
            this.move("prev", ".ui-menu-item:last", c)
        },
        first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function (c, e, f) {
            if (this.active) {
                c = this.active[c + "All"](".ui-menu-item").eq(0);
                c.length ? this.activate(f, c) : this.activate(f, this.element.children(e))
            } else this.activate(f, this.element.children(e))
        },
        nextPage: function (c) {
            if (this.hasScroll()) if (!this.active || this.last()) this.activate(c, this.element.children(".ui-menu-item:first"));
                else {
                    var e = this.active.offset().top,
                        f = this.element.height(),
                        g = this.element.children(".ui-menu-item").filter(function () {
                            var d = b(this).offset().top - e - f + b(this).height();
                            return d < 10 && d > -10
                        });
                    g.length || (g = this.element.children(".ui-menu-item:last"));
                    this.activate(c,
                        g)
                } else this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        },
        previousPage: function (c) {
            if (this.hasScroll()) if (!this.active || this.first()) this.activate(c, this.element.children(".ui-menu-item:last"));
                else {
                    var e = this.active.offset().top,
                        f = this.element.height();
                    result = this.element.children(".ui-menu-item").filter(function () {
                        var g = b(this).offset().top - e + f - b(this).height();
                        return g < 10 && g > -10
                    });
                    result.length || (result = this.element.children(".ui-menu-item:first"));
                    this.activate(c, result)
                } else this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        },
        hasScroll: function () {
            return this.element.height() < this.element.attr("scrollHeight")
        },
        select: function (c) {
            this._trigger("selected", c, {
                item: this.active
            })
        }
    })
})(jQuery);
(function (b) {
    var c, e = function (g) {
            b(":ui-button", g.target.form).each(function () {
                var d = b(this).data("button");
                setTimeout(function () {
                    d.refresh()
                }, 1)
            })
        }, f = function (g) {
            var d = g.name,
                h = g.form,
                j = b([]);
            if (d) j = h ? b(h).find("[name='" + d + "']") : b("[name='" + d + "']", g.ownerDocument).filter(function () {
                    return !this.form
                });
            return j
        };
    b.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button",
                e);
            if (typeof this.options.disabled !== "boolean") this.options.disabled = this.element.attr("disabled");
            this._determineButtonType();
            this.hasTitle = !! this.buttonElement.attr("title");
            var g = this,
                d = this.options,
                h = this.type === "checkbox" || this.type === "radio",
                j = "ui-state-hover" + (!h ? " ui-state-active" : "");
            if (d.label === null) d.label = this.buttonElement.html();
            if (this.element.is(":disabled")) d.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function () {
                if (!d.disabled) {
                    b(this).addClass("ui-state-hover");
                    this === c && b(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function () {
                d.disabled || b(this).removeClass(j)
            }).bind("focus.button", function () {
                b(this).addClass("ui-state-focus")
            }).bind("blur.button", function () {
                b(this).removeClass("ui-state-focus")
            });
            h && this.element.bind("change.button", function () {
                g.refresh()
            });
            if (this.type === "checkbox") this.buttonElement.bind("click.button", function () {
                    if (d.disabled) return false;
                    b(this).toggleClass("ui-state-active");
                    g.buttonElement.attr("aria-pressed", g.element[0].checked)
                });
            else if (this.type === "radio") this.buttonElement.bind("click.button", function () {
                    if (d.disabled) return false;
                    b(this).addClass("ui-state-active");
                    g.buttonElement.attr("aria-pressed", true);
                    var k = g.element[0];
                    f(k).not(k).map(function () {
                        return b(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", false)
                });
            else {
                this.buttonElement.bind("mousedown.button", function () {
                    if (d.disabled) return false;
                    b(this).addClass("ui-state-active");
                    c = this;
                    b(document).one("mouseup", function () {
                        c = null
                    })
                }).bind("mouseup.button", function () {
                    if (d.disabled) return false;
                    b(this).removeClass("ui-state-active")
                }).bind("keydown.button", function (k) {
                    if (d.disabled) return false;
                    if (k.keyCode == b.ui.keyCode.SPACE || k.keyCode == b.ui.keyCode.ENTER) b(this).addClass("ui-state-active")
                }).bind("keyup.button", function () {
                    b(this).removeClass("ui-state-active")
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function (k) {
                    k.keyCode === b.ui.keyCode.SPACE && b(this).click()
                })
            }
            this._setOption("disabled",
                d.disabled)
        },
        _determineButtonType: function () {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var g = this.element.parents().filter(":last"),
                    d = "label[for=" + this.element.attr("id") + "]";
                this.buttonElement = g.find(d);
                if (!this.buttonElement.length) {
                    g = g.length ? g.siblings() : this.element.siblings();
                    this.buttonElement = g.filter(d);
                    if (!this.buttonElement.length) this.buttonElement = g.find(d)
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (g = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", g)
            } else this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function (g, d) {
            b.Widget.prototype._setOption.apply(this, arguments);
            if (g === "disabled") d ? this.element.attr("disabled", true) : this.element.removeAttr("disabled");
            this._resetButton()
        },
        refresh: function () {
            var g = this.element.is(":disabled");
            g !== this.options.disabled && this._setOption("disabled", g);
            if (this.type === "radio") f(this.element[0]).each(function () {
                    b(this).is(":checked") ? b(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
                        true) : b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
                });
            else if (this.type === "checkbox") this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true) : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
        },
        _resetButton: function () {
            if (this.type === "input") this.options.label && this.element.val(this.options.label);
            else {
                var g = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
                    d = b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(g.empty()).text(),
                    h = this.options.icons,
                    j = h.primary && h.secondary,
                    k = [];
                if (h.primary || h.secondary) {
                    if (this.options.text) k.push("ui-button-text-icon" + (j ? "s" : h.primary ? "-primary" : "-secondary"));
                    h.primary && g.prepend("<span class='ui-button-icon-primary ui-icon " + h.primary + "'></span>");
                    h.secondary && g.append("<span class='ui-button-icon-secondary ui-icon " + h.secondary + "'></span>");
                    if (!this.options.text) {
                        k.push(j ? "ui-button-icons-only" :
                            "ui-button-icon-only");
                        this.hasTitle || g.attr("title", d)
                    }
                } else k.push("ui-button-text-only");
                g.addClass(k.join(" "))
            }
        }
    });
    b.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (g, d) {
            g === "disabled" && this.buttons.button("option", g, d);
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function () {
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        },
        destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            b.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);
(function (b, c) {
    var e = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    }, f = {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        };
    b.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function (g) {
                    var d = b(this).css(g).offset().top;
                    d < 0 &&
                        b(this).css("top", g.top - d)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var g = this,
                d = g.options,
                h = d.title || "&#160;",
                j = b.ui.dialog.getTitleId(g.element),
                k = (g.uiDialog = b("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + d.dialogClass).css({
                    zIndex: d.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function (u) {
                    if (d.closeOnEscape && u.keyCode && u.keyCode === b.ui.keyCode.ESCAPE) {
                        g.close(u);
                        u.preventDefault()
                    }
                }).attr({
                    role: "dialog",
                    "aria-labelledby": j
                }).mousedown(function (u) {
                    g.moveToTop(false, u)
                });
            g.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k);
            var l = (g.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),
                r = b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role",
                    "button").hover(function () {
                    r.addClass("ui-state-hover")
                }, function () {
                    r.removeClass("ui-state-hover")
                }).focus(function () {
                    r.addClass("ui-state-focus")
                }).blur(function () {
                    r.removeClass("ui-state-focus")
                }).click(function (u) {
                    g.close(u);
                    return false
                }).appendTo(l);
            (g.uiDialogTitlebarCloseText = b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(r);
            b("<span></span>").addClass("ui-dialog-title").attr("id", j).html(h).prependTo(l);
            if (b.isFunction(d.beforeclose) && !b.isFunction(d.beforeClose)) d.beforeClose =
                    d.beforeclose;
            l.find("*").add(l).disableSelection();
            d.draggable && b.fn.draggable && g._makeDraggable();
            d.resizable && b.fn.resizable && g._makeResizable();
            g._createButtons(d.buttons);
            g._isOpen = false;
            b.fn.bgiframe && k.bgiframe()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        destroy: function () {
            var g = this;
            g.overlay && g.overlay.destroy();
            g.uiDialog.hide();
            g.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            g.uiDialog.remove();
            g.originalTitle &&
                g.element.attr("title", g.originalTitle);
            return g
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (g) {
            var d = this,
                h, j;
            if (false !== d._trigger("beforeClose", g)) {
                d.overlay && d.overlay.destroy();
                d.uiDialog.unbind("keypress.ui-dialog");
                d._isOpen = false;
                if (d.options.hide) d.uiDialog.hide(d.options.hide, function () {
                        d._trigger("close", g)
                    });
                else {
                    d.uiDialog.hide();
                    d._trigger("close", g)
                }
                b.ui.dialog.overlay.resize();
                if (d.options.modal) {
                    h = 0;
                    b(".ui-dialog").each(function () {
                        if (this !== d.uiDialog[0]) {
                            j = b(this).css("z-index");
                            isNaN(j) || (h = Math.max(h, j))
                        }
                    });
                    b.ui.dialog.maxZ = h
                }
                return d
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (g, d) {
            var h = this,
                j = h.options;
            if (j.modal && !g || !j.stack && !j.modal) return h._trigger("focus", d);
            if (j.zIndex > b.ui.dialog.maxZ) b.ui.dialog.maxZ = j.zIndex;
            if (h.overlay) {
                b.ui.dialog.maxZ += 1;
                h.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
            }
            g = {
                scrollTop: h.element.attr("scrollTop"),
                scrollLeft: h.element.attr("scrollLeft")
            };
            b.ui.dialog.maxZ += 1;
            h.uiDialog.css("z-index", b.ui.dialog.maxZ);
            h.element.attr(g);
            h._trigger("focus", d);
            return h
        },
        open: function () {
            if (!this._isOpen) {
                var g = this,
                    d = g.options,
                    h = g.uiDialog;
                g.overlay = d.modal ? new b.ui.dialog.overlay(g) : null;
                g._size();
                g._position(d.position);
                h.show(d.show);
                g.moveToTop(true);
                d.modal && h.bind("keypress.ui-dialog", function (j) {
                    if (j.keyCode === b.ui.keyCode.TAB) {
                        var k = b(":tabbable", this),
                            l = k.filter(":first");
                        k = k.filter(":last");
                        if (j.target === k[0] && !j.shiftKey) {
                            l.focus(1);
                            return false
                        } else if (j.target === l[0] && j.shiftKey) {
                            k.focus(1);
                            return false
                        }
                    }
                });
                b(g.element.find(":tabbable").get().concat(h.find(".ui-dialog-buttonpane :tabbable").get().concat(h.get()))).eq(0).focus();
                g._isOpen = true;
                g._trigger("open");
                return g
            }
        },
        _createButtons: function (g) {
            var d = this,
                h = false,
                j = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                k = b("<div></div>").addClass("ui-dialog-buttonset").appendTo(j);
            d.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof g === "object" && g !== null && b.each(g, function () {
                return !(h = true)
            });
            if (h) {
                b.each(g, function (l,
                    r) {
                    r = b.isFunction(r) ? {
                        click: r,
                        text: l
                    } : r;
                    l = b('<button type="button"></button>').attr(r, true).unbind("click").click(function () {
                        r.click.apply(d.element[0], arguments)
                    }).appendTo(k);
                    b.fn.button && l.button()
                });
                j.appendTo(d.uiDialog)
            }
        },
        _makeDraggable: function () {
            function g(l) {
                return {
                    position: l.position,
                    offset: l.offset
                }
            }
            var d = this,
                h = d.options,
                j = b(document),
                k;
            d.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (l, r) {
                    k =
                        h.height === "auto" ? "auto" : b(this).height();
                    b(this).height(b(this).height()).addClass("ui-dialog-dragging");
                    d._trigger("dragStart", l, g(r))
                },
                drag: function (l, r) {
                    d._trigger("drag", l, g(r))
                },
                stop: function (l, r) {
                    h.position = [r.position.left - j.scrollLeft(), r.position.top - j.scrollTop()];
                    b(this).removeClass("ui-dialog-dragging").height(k);
                    d._trigger("dragStop", l, g(r));
                    b.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (g) {
            function d(l) {
                return {
                    originalPosition: l.originalPosition,
                    originalSize: l.originalSize,
                    position: l.position,
                    size: l.size
                }
            }
            g = g === c ? this.options.resizable : g;
            var h = this,
                j = h.options,
                k = h.uiDialog.css("position");
            g = typeof g === "string" ? g : "n,e,s,w,se,sw,ne,nw";
            h.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: h.element,
                maxWidth: j.maxWidth,
                maxHeight: j.maxHeight,
                minWidth: j.minWidth,
                minHeight: h._minHeight(),
                handles: g,
                start: function (l, r) {
                    b(this).addClass("ui-dialog-resizing");
                    h._trigger("resizeStart", l, d(r))
                },
                resize: function (l, r) {
                    h._trigger("resize", l, d(r))
                },
                stop: function (l,
                    r) {
                    b(this).removeClass("ui-dialog-resizing");
                    j.height = b(this).height();
                    j.width = b(this).width();
                    h._trigger("resizeStop", l, d(r));
                    b.ui.dialog.overlay.resize()
                }
            }).css("position", k).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var g = this.options;
            return g.height === "auto" ? g.minHeight : Math.min(g.minHeight, g.height)
        },
        _position: function (g) {
            var d = [],
                h = [0, 0],
                j;
            if (g) {
                if (typeof g === "string" || typeof g === "object" && "0" in g) {
                    d = g.split ? g.split(" ") : [g[0], g[1]];
                    if (d.length ===
                        1) d[1] = d[0];
                    b.each(["left", "top"], function (k, l) {
                        if (+d[k] === d[k]) {
                            h[k] = d[k];
                            d[k] = l
                        }
                    });
                    g = {
                        my: d.join(" "),
                        at: d.join(" "),
                        offset: h.join(" ")
                    }
                }
                g = b.extend({}, b.ui.dialog.prototype.options.position, g)
            } else g = b.ui.dialog.prototype.options.position;
            (j = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(b.extend({
                of: window
            }, g));
            j || this.uiDialog.hide()
        },
        _setOptions: function (g) {
            var d = this,
                h = {}, j = false;
            b.each(g, function (k, l) {
                d._setOption(k, l);
                if (k in e) j = true;
                if (k in
                    f) h[k] = l
            });
            j && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", h)
        },
        _setOption: function (g, d) {
            var h = this,
                j = h.uiDialog;
            switch (g) {
            case "beforeclose":
                g = "beforeClose";
                break;
            case "buttons":
                h._createButtons(d);
                break;
            case "closeText":
                h.uiDialogTitlebarCloseText.text("" + d);
                break;
            case "dialogClass":
                j.removeClass(h.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + d);
                break;
            case "disabled":
                d ? j.addClass("ui-dialog-disabled") : j.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                var k = j.is(":data(draggable)");
                k && !d && j.draggable("destroy");
                !k && d && h._makeDraggable();
                break;
            case "position":
                h._position(d);
                break;
            case "resizable":
                (k = j.is(":data(resizable)")) && !d && j.resizable("destroy");
                k && typeof d === "string" && j.resizable("option", "handles", d);
                !k && d !== false && h._makeResizable(d);
                break;
            case "title":
                b(".ui-dialog-title", h.uiDialogTitlebar).html("" + (d || "&#160;"));
                break
            }
            b.Widget.prototype._setOption.apply(h, arguments)
        },
        _size: function () {
            var g = this.options,
                d, h, j =
                    this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (g.minWidth > g.width) g.width = g.minWidth;
            d = this.uiDialog.css({
                height: "auto",
                width: g.width
            }).height();
            h = Math.max(0, g.minHeight - d);
            if (g.height === "auto") if (b.support.minHeight) this.element.css({
                        minHeight: h,
                        height: "auto"
                    });
                else {
                    this.uiDialog.show();
                    g = this.element.css("height", "auto").height();
                    j || this.uiDialog.hide();
                    this.element.height(Math.max(g, h))
                } else this.element.height(Math.max(g.height - d, 0));
            this.uiDialog.is(":data(resizable)") &&
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    b.extend(b.ui.dialog, {
        version: "1.8.11",
        uuid: 0,
        maxZ: 0,
        getTitleId: function (g) {
            g = g.attr("id");
            if (!g) {
                this.uuid += 1;
                g = this.uuid
            }
            return "ui-dialog-title-" + g
        },
        overlay: function (g) {
            this.$el = b.ui.dialog.overlay.create(g)
        }
    });
    b.extend(b.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (g) {
            return g + ".dialog-overlay"
        }).join(" "),
        create: function (g) {
            if (this.instances.length ===
                0) {
                setTimeout(function () {
                    b.ui.dialog.overlay.instances.length && b(document).bind(b.ui.dialog.overlay.events, function (h) {
                        if (b(h.target).zIndex() < b.ui.dialog.overlay.maxZ) return false
                    })
                }, 1);
                b(document).bind("keydown.dialog-overlay", function (h) {
                    if (g.options.closeOnEscape && h.keyCode && h.keyCode === b.ui.keyCode.ESCAPE) {
                        g.close(h);
                        h.preventDefault()
                    }
                });
                b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
            }
            var d = (this.oldInstances.pop() || b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            b.fn.bgiframe && d.bgiframe();
            this.instances.push(d);
            return d
        },
        destroy: function (g) {
            var d = b.inArray(g, this.instances);
            d != -1 && this.oldInstances.push(this.instances.splice(d, 1)[0]);
            this.instances.length === 0 && b([document, window]).unbind(".dialog-overlay");
            g.remove();
            var h = 0;
            b.each(this.instances, function () {
                h = Math.max(h, this.css("z-index"))
            });
            this.maxZ = h
        },
        height: function () {
            var g, d;
            if (b.browser.msie && b.browser.version < 7) {
                g = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                d = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return g < d ? b(window).height() + "px" : g + "px"
            } else return b(document).height() + "px"
        },
        width: function () {
            var g, d;
            if (b.browser.msie && b.browser.version < 7) {
                g = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return g < d ? b(window).width() + "px" : g + "px"
            } else return b(document).width() + "px"
        },
        resize: function () {
            var g = b([]);
            b.each(b.ui.dialog.overlay.instances, function () {
                g = g.add(this)
            });
            g.css({
                width: 0,
                height: 0
            }).css({
                width: b.ui.dialog.overlay.width(),
                height: b.ui.dialog.overlay.height()
            })
        }
    });
    b.extend(b.ui.dialog.overlay.prototype, {
        destroy: function () {
            b.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function (b) {
    b.widget("ui.slider", b.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var c = this,
                e = this.options;
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            e.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
            this.range = b([]);
            if (e.range) {
                if (e.range === true) {
                    this.range = b("<div></div>");
                    if (!e.values) e.values = [this._valueMin(), this._valueMin()];
                    if (e.values.length && e.values.length !== 2) e.values = [e.values[0], e.values[0]]
                } else this.range = b("<div></div>");
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (e.range === "min" || e.range === "max") this.range.addClass("ui-slider-range-" + e.range);
                this.range.addClass("ui-widget-header")
            }
            b(".ui-slider-handle", this.element).length === 0 && b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            if (e.values && e.values.length) for (; b(".ui-slider-handle", this.element).length < e.values.length;) b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            this.handles = b(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (f) {
                f.preventDefault()
            }).hover(function () {
                e.disabled || b(this).addClass("ui-state-hover")
            }, function () {
                b(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (e.disabled) b(this).blur();
                else {
                    b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    b(this).addClass("ui-state-focus")
                }
            }).blur(function () {
                b(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (f) {
                b(this).data("index.ui-slider-handle", f)
            });
            this.handles.keydown(function (f) {
                var g = true,
                    d = b(this).data("index.ui-slider-handle"),
                    h, j, k;
                if (!c.options.disabled) {
                    switch (f.keyCode) {
                    case b.ui.keyCode.HOME:
                    case b.ui.keyCode.END:
                    case b.ui.keyCode.PAGE_UP:
                    case b.ui.keyCode.PAGE_DOWN:
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        g =
                            false;
                        if (!c._keySliding) {
                            c._keySliding = true;
                            b(this).addClass("ui-state-active");
                            h = c._start(f, d);
                            if (h === false) return
                        }
                        break
                    }
                    k = c.options.step;
                    h = c.options.values && c.options.values.length ? (j = c.values(d)) : (j = c.value());
                    switch (f.keyCode) {
                    case b.ui.keyCode.HOME:
                        j = c._valueMin();
                        break;
                    case b.ui.keyCode.END:
                        j = c._valueMax();
                        break;
                    case b.ui.keyCode.PAGE_UP:
                        j = c._trimAlignValue(h + (c._valueMax() - c._valueMin()) / 5);
                        break;
                    case b.ui.keyCode.PAGE_DOWN:
                        j = c._trimAlignValue(h - (c._valueMax() - c._valueMin()) / 5);
                        break;
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                        if (h ===
                            c._valueMax()) return;
                        j = c._trimAlignValue(h + k);
                        break;
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        if (h === c._valueMin()) return;
                        j = c._trimAlignValue(h - k);
                        break
                    }
                    c._slide(f, d, j);
                    return g
                }
            }).keyup(function (f) {
                var g = b(this).data("index.ui-slider-handle");
                if (c._keySliding) {
                    c._keySliding = false;
                    c._stop(f, g);
                    c._change(f, g);
                    b(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (c) {
            var e = this.options,
                f, g, d, h, j;
            if (e.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            f = this._normValueFromMouse({
                x: c.pageX,
                y: c.pageY
            });
            g = this._valueMax() - this._valueMin() + 1;
            h = this;
            this.handles.each(function (k) {
                var l = Math.abs(f - h.values(k));
                if (g > l) {
                    g = l;
                    d = b(this);
                    j = k
                }
            });
            if (e.range === true && this.values(1) === e.min) {
                j += 1;
                d = b(this.handles[j])
            }
            if (this._start(c,
                j) === false) return false;
            this._mouseSliding = true;
            h._handleIndex = j;
            d.addClass("ui-state-active").focus();
            e = d.offset();
            this._clickOffset = !b(c.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: c.pageX - e.left - d.width() / 2,
                top: c.pageY - e.top - d.height() / 2 - (parseInt(d.css("borderTopWidth"), 10) || 0) - (parseInt(d.css("borderBottomWidth"), 10) || 0) + (parseInt(d.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(c, j, f);
            return this._animateOff = true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (c) {
            var e = this._normValueFromMouse({
                x: c.pageX,
                y: c.pageY
            });
            this._slide(c, this._handleIndex, e);
            return false
        },
        _mouseStop: function (c) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(c, this._handleIndex);
            this._change(c, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (c) {
            var e;
            if (this.orientation === "horizontal") {
                e = this.elementSize.width;
                c = c.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                e = this.elementSize.height;
                c = c.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            e = c / e;
            if (e > 1) e = 1;
            if (e < 0) e = 0;
            if (this.orientation === "vertical") e = 1 - e;
            c = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + e * c)
        },
        _start: function (c, e) {
            var f = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                f.value =
                    this.values(e);
                f.values = this.values()
            }
            return this._trigger("start", c, f)
        },
        _slide: function (c, e, f) {
            var g;
            if (this.options.values && this.options.values.length) {
                g = this.values(e ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (e === 0 && f > g || e === 1 && f < g)) f = g;
                if (f !== this.values(e)) {
                    g = this.values();
                    g[e] = f;
                    c = this._trigger("slide", c, {
                        handle: this.handles[e],
                        value: f,
                        values: g
                    });
                    this.values(e ? 0 : 1);
                    c !== false && this.values(e, f, true)
                }
            } else if (f !== this.value()) {
                c = this._trigger("slide", c, {
                    handle: this.handles[e],
                    value: f
                });
                c !== false && this.value(f)
            }
        },
        _stop: function (c, e) {
            var f = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                f.value = this.values(e);
                f.values = this.values()
            }
            this._trigger("stop", c, f)
        },
        _change: function (c, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var f = {
                    handle: this.handles[e],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    f.value = this.values(e);
                    f.values = this.values()
                }
                this._trigger("change", c, f)
            }
        },
        value: function (c) {
            if (arguments.length) {
                this.options.value =
                    this._trimAlignValue(c);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (c, e) {
            var f, g, d;
            if (arguments.length > 1) {
                this.options.values[c] = this._trimAlignValue(e);
                this._refreshValue();
                this._change(null, c)
            }
            if (arguments.length) if (b.isArray(arguments[0])) {
                    f = this.options.values;
                    g = arguments[0];
                    for (d = 0; d < f.length; d += 1) {
                        f[d] = this._trimAlignValue(g[d]);
                        this._change(null, d)
                    }
                    this._refreshValue()
                } else return this.options.values && this.options.values.length ? this._values(c) : this.value();
                else return this._values()
        },
        _setOption: function (c, e) {
            var f, g = 0;
            if (b.isArray(this.options.values)) g = this.options.values.length;
            b.Widget.prototype._setOption.apply(this, arguments);
            switch (c) {
            case "disabled":
                if (e) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.attr("disabled", "disabled");
                    this.element.addClass("ui-disabled")
                } else {
                    this.handles.removeAttr("disabled");
                    this.element.removeClass("ui-disabled")
                }
                break;
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (f = 0; f < g; f += 1) this._change(null, f);
                this._animateOff = false;
                break
            }
        },
        _value: function () {
            return this._trimAlignValue(this.options.value)
        },
        _values: function (c) {
            var e, f;
            if (arguments.length) {
                e = this.options.values[c];
                return this._trimAlignValue(e)
            } else {
                e = this.options.values.slice();
                for (f = 0; f < e.length; f += 1) e[f] = this._trimAlignValue(e[f]);
                return e
            }
        },
        _trimAlignValue: function (c) {
            if (c <= this._valueMin()) return this._valueMin();
            if (c >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1,
                f = (c - this._valueMin()) % e;
            alignValue = c - f;
            if (Math.abs(f) * 2 >= e) alignValue += f > 0 ? e : -e;
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var c = this.options.range,
                e = this.options,
                f = this,
                g = !this._animateOff ? e.animate : false,
                d, h = {}, j, k, l, r;
            if (this.options.values && this.options.values.length) this.handles.each(function (u) {
                    d = (f.values(u) - f._valueMin()) / (f._valueMax() - f._valueMin()) * 100;
                    h[f.orientation === "horizontal" ? "left" : "bottom"] = d + "%";
                    b(this).stop(1, 1)[g ? "animate" : "css"](h, e.animate);
                    if (f.options.range === true) if (f.orientation === "horizontal") {
                            if (u === 0) f.range.stop(1, 1)[g ? "animate" : "css"]({
                                    left: d + "%"
                                }, e.animate);
                            if (u === 1) f.range[g ? "animate" : "css"]({
                                    width: d - j + "%"
                                }, {
                                    queue: false,
                                    duration: e.animate
                                })
                        } else {
                            if (u === 0) f.range.stop(1, 1)[g ? "animate" : "css"]({
                                    bottom: d + "%"
                                }, e.animate);
                            if (u === 1) f.range[g ? "animate" : "css"]({
                                    height: d - j + "%"
                                }, {
                                    queue: false,
                                    duration: e.animate
                                })
                        }
                    j = d
                });
            else {
                k = this.value();
                l = this._valueMin();
                r = this._valueMax();
                d = r !== l ? (k - l) / (r - l) * 100 : 0;
                h[f.orientation === "horizontal" ? "left" : "bottom"] = d + "%";
                this.handle.stop(1, 1)[g ? "animate" : "css"](h, e.animate);
                if (c === "min" && this.orientation === "horizontal") this.range.stop(1,
                        1)[g ? "animate" : "css"]({
                        width: d + "%"
                    }, e.animate);
                if (c === "max" && this.orientation === "horizontal") this.range[g ? "animate" : "css"]({
                        width: 100 - d + "%"
                    }, {
                        queue: false,
                        duration: e.animate
                    });
                if (c === "min" && this.orientation === "vertical") this.range.stop(1, 1)[g ? "animate" : "css"]({
                        height: d + "%"
                    }, e.animate);
                if (c === "max" && this.orientation === "vertical") this.range[g ? "animate" : "css"]({
                        height: 100 - d + "%"
                    }, {
                        queue: false,
                        duration: e.animate
                    })
            }
        }
    });
    b.extend(b.ui.slider, {
        version: "1.8.11"
    })
})(jQuery);
(function (b, c) {
    function e() {
        return ++g
    }
    function f() {
        return ++d
    }
    var g = 0,
        d = 0;
    b.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function () {
            this._tabify(true)
        },
        _setOption: function (h, j) {
            if (h == "selected") this.options.collapsible &&
                    j == this.options.selected || this.select(j);
            else {
                this.options[h] = j;
                this._tabify()
            }
        },
        _tabId: function (h) {
            return h.title && h.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
        },
        _sanitizeSelector: function (h) {
            return h.replace(/:/g, "\\:")
        },
        _cookie: function () {
            var h = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + f());
            return b.cookie.apply(null, [h].concat(b.makeArray(arguments)))
        },
        _ui: function (h, j) {
            return {
                tab: h,
                panel: j,
                index: this.anchors.index(h)
            }
        },
        _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var h =
                    b(this);
                h.html(h.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function (h) {
            function j(D, I) {
                D.css("display", "");
                !b.support.opacity && I.opacity && D[0].style.removeAttribute("filter")
            }
            var k = this,
                l = this.options,
                r = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = b(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return b("a", this)[0]
            });
            this.panels = b([]);
            this.anchors.each(function (D, I) {
                var p = b(I).attr("href"),
                    n = p.split("#")[0],
                    z;
                if (n && (n === location.toString().split("#")[0] ||
                    (z = b("base")[0]) && n === z.href)) {
                    p = I.hash;
                    I.href = p
                }
                if (r.test(p)) k.panels = k.panels.add(k.element.find(k._sanitizeSelector(p)));
                else if (p && p !== "#") {
                    b.data(I, "href.tabs", p);
                    b.data(I, "load.tabs", p.replace(/#.*$/, ""));
                    p = k._tabId(I);
                    I.href = "#" + p;
                    I = k.element.find("#" + p);
                    if (!I.length) {
                        I = b(l.panelTemplate).attr("id", p).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(k.panels[D - 1] || k.list);
                        I.data("destroy.tabs", true)
                    }
                    k.panels = k.panels.add(I)
                } else l.disabled.push(D)
            });
            if (h) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (l.selected === c) {
                    location.hash && this.anchors.each(function (D, I) {
                        if (I.hash == location.hash) {
                            l.selected = D;
                            return false
                        }
                    });
                    if (typeof l.selected !== "number" && l.cookie) l.selected = parseInt(k._cookie(), 10);
                    if (typeof l.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) l.selected =
                            this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    l.selected = l.selected || (this.lis.length ? 0 : -1)
                } else if (l.selected === null) l.selected = -1;
                l.selected = l.selected >= 0 && this.anchors[l.selected] || l.selected < 0 ? l.selected : 0;
                l.disabled = b.unique(l.disabled.concat(b.map(this.lis.filter(".ui-state-disabled"), function (D) {
                    return k.lis.index(D)
                }))).sort();
                b.inArray(l.selected, l.disabled) != -1 && l.disabled.splice(b.inArray(l.selected, l.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (l.selected >= 0 && this.anchors.length) {
                    k.element.find(k._sanitizeSelector(k.anchors[l.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(l.selected).addClass("ui-tabs-selected ui-state-active");
                    k.element.queue("tabs", function () {
                        k._trigger("show", null, k._ui(k.anchors[l.selected], k.element.find(k._sanitizeSelector(k.anchors[l.selected].hash))[0]))
                    });
                    this.load(l.selected)
                }
                b(window).bind("unload", function () {
                    k.lis.add(k.anchors).unbind(".tabs");
                    k.lis = k.anchors = k.panels = null
                })
            } else l.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[l.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            l.cookie && this._cookie(l.selected, l.cookie);
            h = 0;
            for (var u; u = this.lis[h]; h++) b(u)[b.inArray(h, l.disabled) != -1 && !b(u).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            l.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (l.event !== "mouseover") {
                var o = function (D, I) {
                    I.is(":not(.ui-state-disabled)") && I.addClass("ui-state-" + D)
                }, m = function (D, I) {
                        I.removeClass("ui-state-" +
                            D)
                    };
                this.lis.bind("mouseover.tabs", function () {
                    o("hover", b(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    m("hover", b(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    o("focus", b(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    m("focus", b(this).closest("li"))
                })
            }
            var s, v;
            if (l.fx) if (b.isArray(l.fx)) {
                    s = l.fx[0];
                    v = l.fx[1]
                } else s = v = l.fx;
            var x = v ? function (D, I) {
                    b(D).closest("li").addClass("ui-tabs-selected ui-state-active");
                    I.hide().removeClass("ui-tabs-hide").animate(v, v.duration || "normal", function () {
                        j(I, v);
                        k._trigger("show", null, k._ui(D, I[0]))
                    })
                } : function (D, I) {
                    b(D).closest("li").addClass("ui-tabs-selected ui-state-active");
                    I.removeClass("ui-tabs-hide");
                    k._trigger("show", null, k._ui(D, I[0]))
                }, A = s ? function (D, I) {
                    I.animate(s, s.duration || "normal", function () {
                        k.lis.removeClass("ui-tabs-selected ui-state-active");
                        I.addClass("ui-tabs-hide");
                        j(I, s);
                        k.element.dequeue("tabs")
                    })
                } : function (D, I) {
                    k.lis.removeClass("ui-tabs-selected ui-state-active");
                    I.addClass("ui-tabs-hide");
                    k.element.dequeue("tabs")
                };
            this.anchors.bind(l.event + ".tabs", function () {
                var D = this,
                    I = b(D).closest("li"),
                    p = k.panels.filter(":not(.ui-tabs-hide)"),
                    n = k.element.find(k._sanitizeSelector(D.hash));
                if (I.hasClass("ui-tabs-selected") && !l.collapsible || I.hasClass("ui-state-disabled") || I.hasClass("ui-state-processing") || k.panels.filter(":animated").length || k._trigger("select", null, k._ui(this, n[0])) === false) {
                    this.blur();
                    return false
                }
                l.selected = k.anchors.index(this);
                k.abort();
                if (l.collapsible) if (I.hasClass("ui-tabs-selected")) {
                        l.selected = -1;
                        l.cookie && k._cookie(l.selected, l.cookie);
                        k.element.queue("tabs", function () {
                            A(D, p)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else if (!p.length) {
                    l.cookie && k._cookie(l.selected, l.cookie);
                    k.element.queue("tabs", function () {
                        x(D, n)
                    });
                    k.load(k.anchors.index(this));
                    this.blur();
                    return false
                }
                l.cookie && k._cookie(l.selected, l.cookie);
                if (n.length) {
                    p.length && k.element.queue("tabs", function () {
                        A(D, p)
                    });
                    k.element.queue("tabs", function () {
                        x(D, n)
                    });
                    k.load(k.anchors.index(this))
                } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                b.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        },
        _getIndex: function (h) {
            if (typeof h == "string") h = this.anchors.index(this.anchors.filter("[href$=" + h + "]"));
            return h
        },
        destroy: function () {
            var h = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var j =
                    b.data(this, "href.tabs");
                if (j) this.href = j;
                var k = b(this).unbind(".tabs");
                b.each(["href", "load", "cache"], function (l, r) {
                    k.removeData(r + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                b.data(this, "destroy.tabs") ? b(this).remove() : b(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            h.cookie && this._cookie(null, h.cookie);
            return this
        },
        add: function (h,
            j, k) {
            if (k === c) k = this.anchors.length;
            var l = this,
                r = this.options;
            j = b(r.tabTemplate.replace(/#\{href\}/g, h).replace(/#\{label\}/g, j));
            h = !h.indexOf("#") ? h.replace("#", "") : this._tabId(b("a", j)[0]);
            j.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var u = l.element.find("#" + h);
            u.length || (u = b(r.panelTemplate).attr("id", h).data("destroy.tabs", true));
            u.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (k >= this.lis.length) {
                j.appendTo(this.list);
                u.appendTo(this.list[0].parentNode)
            } else {
                j.insertBefore(this.lis[k]);
                u.insertBefore(this.panels[k])
            }
            r.disabled = b.map(r.disabled, function (o) {
                return o >= k ? ++o : o
            });
            this._tabify();
            if (this.anchors.length == 1) {
                r.selected = 0;
                j.addClass("ui-tabs-selected ui-state-active");
                u.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    l._trigger("show", null, l._ui(l.anchors[0], l.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[k], this.panels[k]));
            return this
        },
        remove: function (h) {
            h = this._getIndex(h);
            var j = this.options,
                k = this.lis.eq(h).remove(),
                l = this.panels.eq(h).remove();
            if (k.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(h + (h + 1 < this.anchors.length ? 1 : -1));
            j.disabled = b.map(b.grep(j.disabled, function (r) {
                return r != h
            }), function (r) {
                return r >= h ? --r : r
            });
            this._tabify();
            this._trigger("remove", null, this._ui(k.find("a")[0], l[0]));
            return this
        },
        enable: function (h) {
            h = this._getIndex(h);
            var j = this.options;
            if (b.inArray(h, j.disabled) != -1) {
                this.lis.eq(h).removeClass("ui-state-disabled");
                j.disabled = b.grep(j.disabled, function (k) {
                    return k != h
                });
                this._trigger("enable", null,
                    this._ui(this.anchors[h], this.panels[h]));
                return this
            }
        },
        disable: function (h) {
            h = this._getIndex(h);
            var j = this.options;
            if (h != j.selected) {
                this.lis.eq(h).addClass("ui-state-disabled");
                j.disabled.push(h);
                j.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[h], this.panels[h]))
            }
            return this
        },
        select: function (h) {
            h = this._getIndex(h);
            if (h == -1) if (this.options.collapsible && this.options.selected != -1) h = this.options.selected;
                else return this;
            this.anchors.eq(h).trigger(this.options.event + ".tabs");
            return this
        },
        load: function (h) {
            h = this._getIndex(h);
            var j = this,
                k = this.options,
                l = this.anchors.eq(h)[0],
                r = b.data(l, "load.tabs");
            this.abort();
            if (!r || this.element.queue("tabs").length !== 0 && b.data(l, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(h).addClass("ui-state-processing");
                if (k.spinner) {
                    var u = b("span", l);
                    u.data("label.tabs", u.html()).html(k.spinner)
                }
                this.xhr = b.ajax(b.extend({}, k.ajaxOptions, {
                    url: r,
                    success: function (o, m) {
                        j.element.find(j._sanitizeSelector(l.hash)).html(o);
                        j._cleanup();
                        k.cache && b.data(l,
                            "cache.tabs", true);
                        j._trigger("load", null, j._ui(j.anchors[h], j.panels[h]));
                        try {
                            k.ajaxOptions.success(o, m)
                        } catch (s) {}
                    },
                    error: function (o, m) {
                        j._cleanup();
                        j._trigger("load", null, j._ui(j.anchors[h], j.panels[h]));
                        try {
                            k.ajaxOptions.error(o, m, h, l)
                        } catch (s) {}
                    }
                }));
                j.element.dequeue("tabs");
                return this
            }
        },
        abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function (h, j) {
            this.anchors.eq(h).removeData("cache.tabs").data("load.tabs", j);
            return this
        },
        length: function () {
            return this.anchors.length
        }
    });
    b.extend(b.ui.tabs, {
        version: "1.8.11"
    });
    b.extend(b.ui.tabs.prototype, {
        rotation: null,
        rotate: function (h, j) {
            var k = this,
                l = this.options,
                r = k._rotate || (k._rotate = function (u) {
                    clearTimeout(k.rotation);
                    k.rotation = setTimeout(function () {
                        var o = l.selected;
                        k.select(++o < k.anchors.length ? o : 0)
                    }, h);
                    u && u.stopPropagation()
                });
            j = k._unrotate || (k._unrotate = !j ? function (u) {
                u.clientX &&
                    k.rotate(null)
            } : function () {
                t = l.selected;
                r()
            });
            if (h) {
                this.element.bind("tabsshow", r);
                this.anchors.bind(l.event + ".tabs", j);
                r()
            } else {
                clearTimeout(k.rotation);
                this.element.unbind("tabsshow", r);
                this.anchors.unbind(l.event + ".tabs", j);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function (b, c) {
    function e() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass =
            "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su",
                    "Mo", "Tu", "We", "Th", "Fr", "Sa"
            ],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        b.extend(this._defaults, this.regional[""]);
        this.dpDiv = b('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
    }
    function f(d, h) {
        b.extend(d, h);
        for (var j in h) if (h[j] ==
                null || h[j] == c) d[j] = h[j];
        return d
    }
    b.extend(b.ui, {
        datepicker: {
            version: "1.8.11"
        }
    });
    var g = (new Date).getTime();
    b.extend(e.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (d) {
            f(this._defaults, d || {});
            return this
        },
        _attachDatepicker: function (d, h) {
            var j = null;
            for (var k in this._defaults) {
                var l = d.getAttribute("date:" + k);
                if (l) {
                    j = j || {};
                    try {
                        j[k] = eval(l)
                    } catch (r) {
                        j[k] = l
                    }
                }
            }
            k = d.nodeName.toLowerCase();
            l = k == "div" || k == "span";
            if (!d.id) {
                this.uuid += 1;
                d.id = "dp" + this.uuid
            }
            var u = this._newInst(b(d), l);
            u.settings = b.extend({}, h || {}, j || {});
            if (k == "input") this._connectDatepicker(d, u);
            else l && this._inlineDatepicker(d, u)
        },
        _newInst: function (d, h) {
            return {
                id: d[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: d,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: h,
                dpDiv: !h ? this.dpDiv : b('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
            }
        },
        _connectDatepicker: function (d, h) {
            var j = b(d);
            h.append = b([]);
            h.trigger = b([]);
            if (!j.hasClass(this.markerClassName)) {
                this._attachments(j, h);
                j.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (k, l, r) {
                    h.settings[l] = r
                }).bind("getData.datepicker", function (k, l) {
                    return this._get(h, l)
                });
                this._autoSize(h);
                b.data(d, "datepicker", h)
            }
        },
        _attachments: function (d, h) {
            var j = this._get(h, "appendText"),
                k = this._get(h, "isRTL");
            h.append &&
                h.append.remove();
            if (j) {
                h.append = b('<span class="' + this._appendClass + '">' + j + "</span>");
                d[k ? "before" : "after"](h.append)
            }
            d.unbind("focus", this._showDatepicker);
            h.trigger && h.trigger.remove();
            j = this._get(h, "showOn");
            if (j == "focus" || j == "both") d.focus(this._showDatepicker);
            if (j == "button" || j == "both") {
                j = this._get(h, "buttonText");
                var l = this._get(h, "buttonImage");
                h.trigger = b(this._get(h, "buttonImageOnly") ? b("<img/>").addClass(this._triggerClass).attr({
                    src: l,
                    alt: j,
                    title: j
                }) : b('<button type="button"></button>').addClass(this._triggerClass).html(l ==
                    "" ? j : b("<img/>").attr({
                    src: l,
                    alt: j,
                    title: j
                })));
                d[k ? "before" : "after"](h.trigger);
                h.trigger.click(function () {
                    b.datepicker._datepickerShowing && b.datepicker._lastInput == d[0] ? b.datepicker._hideDatepicker() : b.datepicker._showDatepicker(d[0]);
                    return false
                })
            }
        },
        _autoSize: function (d) {
            if (this._get(d, "autoSize") && !d.inline) {
                var h = new Date(2009, 11, 20),
                    j = this._get(d, "dateFormat");
                if (j.match(/[DM]/)) {
                    var k = function (l) {
                        for (var r = 0, u = 0, o = 0; o < l.length; o++) if (l[o].length > r) {
                                r = l[o].length;
                                u = o
                            }
                        return u
                    };
                    h.setMonth(k(this._get(d,
                        j.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    h.setDate(k(this._get(d, j.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - h.getDay())
                }
                d.input.attr("size", this._formatDate(d, h).length)
            }
        },
        _inlineDatepicker: function (d, h) {
            var j = b(d);
            if (!j.hasClass(this.markerClassName)) {
                j.addClass(this.markerClassName).append(h.dpDiv).bind("setData.datepicker", function (k, l, r) {
                    h.settings[l] = r
                }).bind("getData.datepicker", function (k, l) {
                    return this._get(h, l)
                });
                b.data(d, "datepicker", h);
                this._setDate(h, this._getDefaultDate(h),
                    true);
                this._updateDatepicker(h);
                this._updateAlternate(h);
                h.dpDiv.show()
            }
        },
        _dialogDatepicker: function (d, h, j, k, l) {
            d = this._dialogInst;
            if (!d) {
                this.uuid += 1;
                this._dialogInput = b('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                b("body").append(this._dialogInput);
                d = this._dialogInst = this._newInst(this._dialogInput, false);
                d.settings = {};
                b.data(this._dialogInput[0], "datepicker", d)
            }
            f(d.settings, k || {});
            h = h && h.constructor == Date ? this._formatDate(d, h) : h;
            this._dialogInput.val(h);
            this._pos = l ? l.length ? l : [l.pageX, l.pageY] : null;
            if (!this._pos) this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            d.settings.onSelect = j;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            b.blockUI && b.blockUI(this.dpDiv);
            b.data(this._dialogInput[0], "datepicker", d);
            return this
        },
        _destroyDatepicker: function (d) {
            var h = b(d),
                j = b.data(d, "datepicker");
            if (h.hasClass(this.markerClassName)) {
                var k = d.nodeName.toLowerCase();
                b.removeData(d, "datepicker");
                if (k == "input") {
                    j.append.remove();
                    j.trigger.remove();
                    h.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup",
                        this._doKeyUp)
                } else if (k == "div" || k == "span") h.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (d) {
            var h = b(d),
                j = b.data(d, "datepicker");
            if (h.hasClass(this.markerClassName)) {
                var k = d.nodeName.toLowerCase();
                if (k == "input") {
                    d.disabled = false;
                    j.trigger.filter("button").each(function () {
                        this.disabled = false
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })
                } else if (k == "div" || k == "span") h.children("." + this._inlineClass).children().removeClass("ui-state-disabled");
                this._disabledInputs = b.map(this._disabledInputs, function (l) {
                    return l == d ? null : l
                })
            }
        },
        _disableDatepicker: function (d) {
            var h = b(d),
                j = b.data(d, "datepicker");
            if (h.hasClass(this.markerClassName)) {
                var k = d.nodeName.toLowerCase();
                if (k == "input") {
                    d.disabled = true;
                    j.trigger.filter("button").each(function () {
                        this.disabled = true
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })
                } else if (k == "div" || k == "span") h.children("." + this._inlineClass).children().addClass("ui-state-disabled");
                this._disabledInputs = b.map(this._disabledInputs, function (l) {
                    return l == d ? null :
                        l
                });
                this._disabledInputs[this._disabledInputs.length] = d
            }
        },
        _isDisabledDatepicker: function (d) {
            if (!d) return false;
            for (var h = 0; h < this._disabledInputs.length; h++) if (this._disabledInputs[h] == d) return true;
            return false
        },
        _getInst: function (d) {
            try {
                return b.data(d, "datepicker")
            } catch (h) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (d, h, j) {
            var k = this._getInst(d);
            if (arguments.length == 2 && typeof h == "string") return h == "defaults" ? b.extend({}, b.datepicker._defaults) : k ? h == "all" ? b.extend({},
                    k.settings) : this._get(k, h) : null;
            var l = h || {};
            if (typeof h == "string") {
                l = {};
                l[h] = j
            }
            if (k) {
                this._curInst == k && this._hideDatepicker();
                var r = this._getDateDatepicker(d, true),
                    u = this._getMinMaxDate(k, "min"),
                    o = this._getMinMaxDate(k, "max");
                f(k.settings, l);
                if (u !== null && l.dateFormat !== c && l.minDate === c) k.settings.minDate = this._formatDate(k, u);
                if (o !== null && l.dateFormat !== c && l.maxDate === c) k.settings.maxDate = this._formatDate(k, o);
                this._attachments(b(d), k);
                this._autoSize(k);
                this._setDateDatepicker(d, r);
                this._updateDatepicker(k)
            }
        },
        _changeDatepicker: function (d, h, j) {
            this._optionDatepicker(d, h, j)
        },
        _refreshDatepicker: function (d) {
            (d = this._getInst(d)) && this._updateDatepicker(d)
        },
        _setDateDatepicker: function (d, h) {
            if (d = this._getInst(d)) {
                this._setDate(d, h);
                this._updateDatepicker(d);
                this._updateAlternate(d)
            }
        },
        _getDateDatepicker: function (d, h) {
            (d = this._getInst(d)) && !d.inline && this._setDateFromField(d, h);
            return d ? this._getDate(d) : null
        },
        _doKeyDown: function (d) {
            var h = b.datepicker._getInst(d.target),
                j = true,
                k = h.dpDiv.is(".ui-datepicker-rtl");
            h._keyEvent = true;
            if (b.datepicker._datepickerShowing) switch (d.keyCode) {
                case 9:
                    b.datepicker._hideDatepicker();
                    j = false;
                    break;
                case 13:
                    j = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", h.dpDiv);
                    j[0] ? b.datepicker._selectDay(d.target, h.selectedMonth, h.selectedYear, j[0]) : b.datepicker._hideDatepicker();
                    return false;
                case 27:
                    b.datepicker._hideDatepicker();
                    break;
                case 33:
                    b.datepicker._adjustDate(d.target, d.ctrlKey ? -b.datepicker._get(h, "stepBigMonths") : -b.datepicker._get(h, "stepMonths"),
                        "M");
                    break;
                case 34:
                    b.datepicker._adjustDate(d.target, d.ctrlKey ? +b.datepicker._get(h, "stepBigMonths") : +b.datepicker._get(h, "stepMonths"), "M");
                    break;
                case 35:
                    if (d.ctrlKey || d.metaKey) b.datepicker._clearDate(d.target);
                    j = d.ctrlKey || d.metaKey;
                    break;
                case 36:
                    if (d.ctrlKey || d.metaKey) b.datepicker._gotoToday(d.target);
                    j = d.ctrlKey || d.metaKey;
                    break;
                case 37:
                    if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, k ? +1 : -1, "D");
                    j = d.ctrlKey || d.metaKey;
                    if (d.originalEvent.altKey) b.datepicker._adjustDate(d.target, d.ctrlKey ? -b.datepicker._get(h, "stepBigMonths") : -b.datepicker._get(h, "stepMonths"), "M");
                    break;
                case 38:
                    if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, -7, "D");
                    j = d.ctrlKey || d.metaKey;
                    break;
                case 39:
                    if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, k ? -1 : +1, "D");
                    j = d.ctrlKey || d.metaKey;
                    if (d.originalEvent.altKey) b.datepicker._adjustDate(d.target, d.ctrlKey ? +b.datepicker._get(h, "stepBigMonths") : +b.datepicker._get(h, "stepMonths"), "M");
                    break;
                case 40:
                    if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, +7, "D");
                    j = d.ctrlKey || d.metaKey;
                    break;
                default:
                    j = false
            } else if (d.keyCode == 36 && d.ctrlKey) b.datepicker._showDatepicker(this);
            else j = false; if (j) {
                d.preventDefault();
                d.stopPropagation()
            }
        },
        _doKeyPress: function (d) {
            var h = b.datepicker._getInst(d.target);
            if (b.datepicker._get(h, "constrainInput")) {
                h = b.datepicker._possibleChars(b.datepicker._get(h, "dateFormat"));
                var j = String.fromCharCode(d.charCode == c ? d.keyCode : d.charCode);
                return d.ctrlKey || d.metaKey || j < " " || !h || h.indexOf(j) > -1
            }
        },
        _doKeyUp: function (d) {
            d = b.datepicker._getInst(d.target);
            if (d.input.val() != d.lastVal) try {
                    if (b.datepicker.parseDate(b.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, b.datepicker._getFormatConfig(d))) {
                        b.datepicker._setDateFromField(d);
                        b.datepicker._updateAlternate(d);
                        b.datepicker._updateDatepicker(d)
                    }
            } catch (h) {
                b.datepicker.log(h)
            }
            return true
        },
        _showDatepicker: function (d) {
            d = d.target || d;
            if (d.nodeName.toLowerCase() != "input") d = b("input", d.parentNode)[0];
            if (!(b.datepicker._isDisabledDatepicker(d) || b.datepicker._lastInput == d)) {
                var h = b.datepicker._getInst(d);
                b.datepicker._curInst && b.datepicker._curInst != h && b.datepicker._curInst.dpDiv.stop(true, true);
                var j = b.datepicker._get(h, "beforeShow");
                f(h.settings, j ? j.apply(d, [d, h]) : {});
                h.lastVal = null;
                b.datepicker._lastInput = d;
                b.datepicker._setDateFromField(h);
                if (b.datepicker._inDialog) d.value = "";
                if (!b.datepicker._pos) {
                    b.datepicker._pos = b.datepicker._findPos(d);
                    b.datepicker._pos[1] += d.offsetHeight
                }
                var k = false;
                b(d).parents().each(function () {
                    k |= b(this).css("position") == "fixed";
                    return !k
                });
                if (k && b.browser.opera) {
                    b.datepicker._pos[0] -=
                        document.documentElement.scrollLeft;
                    b.datepicker._pos[1] -= document.documentElement.scrollTop
                }
                j = {
                    left: b.datepicker._pos[0],
                    top: b.datepicker._pos[1]
                };
                b.datepicker._pos = null;
                h.dpDiv.empty();
                h.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                });
                b.datepicker._updateDatepicker(h);
                j = b.datepicker._checkOffset(h, j, k);
                h.dpDiv.css({
                    position: b.datepicker._inDialog && b.blockUI ? "static" : k ? "fixed" : "absolute",
                    display: "none",
                    left: j.left + "px",
                    top: j.top + "px"
                });
                if (!h.inline) {
                    j = b.datepicker._get(h, "showAnim");
                    var l = b.datepicker._get(h, "duration"),
                        r = function () {
                            b.datepicker._datepickerShowing = true;
                            var u = h.dpDiv.find("iframe.ui-datepicker-cover");
                            if (u.length) {
                                var o = b.datepicker._getBorders(h.dpDiv);
                                u.css({
                                    left: -o[0],
                                    top: -o[1],
                                    width: h.dpDiv.outerWidth(),
                                    height: h.dpDiv.outerHeight()
                                })
                            }
                        };
                    h.dpDiv.zIndex(b(d).zIndex() + 1);
                    b.effects && b.effects[j] ? h.dpDiv.show(j, b.datepicker._get(h, "showOptions"), l, r) : h.dpDiv[j || "show"](j ? l : null, r);
                    if (!j || !l) r();
                    h.input.is(":visible") && !h.input.is(":disabled") && h.input.focus();
                    b.datepicker._curInst =
                        h
                }
            }
        },
        _updateDatepicker: function (d) {
            var h = this,
                j = b.datepicker._getBorders(d.dpDiv);
            d.dpDiv.empty().append(this._generateHTML(d));
            var k = d.dpDiv.find("iframe.ui-datepicker-cover");
            k.length && k.css({
                left: -j[0],
                top: -j[1],
                width: d.dpDiv.outerWidth(),
                height: d.dpDiv.outerHeight()
            });
            d.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                b(this).removeClass("ui-state-hover");
                this.className.indexOf("ui-datepicker-prev") != -1 && b(this).removeClass("ui-datepicker-prev-hover");
                this.className.indexOf("ui-datepicker-next") != -1 && b(this).removeClass("ui-datepicker-next-hover")
            }).bind("mouseover", function () {
                if (!h._isDisabledDatepicker(d.inline ? d.dpDiv.parent()[0] : d.input[0])) {
                    b(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    b(this).addClass("ui-state-hover");
                    this.className.indexOf("ui-datepicker-prev") != -1 && b(this).addClass("ui-datepicker-prev-hover");
                    this.className.indexOf("ui-datepicker-next") != -1 && b(this).addClass("ui-datepicker-next-hover")
                }
            }).end().find("." +
                this._dayOverClass + " a").trigger("mouseover").end();
            j = this._getNumberOfMonths(d);
            k = j[1];
            k > 1 ? d.dpDiv.addClass("ui-datepicker-multi-" + k).css("width", 17 * k + "em") : d.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            d.dpDiv[(j[0] != 1 || j[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            d.dpDiv[(this._get(d, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            d == b.datepicker._curInst && b.datepicker._datepickerShowing && d.input && d.input.is(":visible") && !d.input.is(":disabled") &&
                d.input[0] != document.activeElement && d.input.focus();
            if (d.yearshtml) {
                var l = d.yearshtml;
                setTimeout(function () {
                    l === d.yearshtml && d.dpDiv.find("select.ui-datepicker-year:first").replaceWith(d.yearshtml);
                    l = d.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (d) {
            var h = function (j) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[j] || j
            };
            return [parseFloat(h(d.css("border-left-width"))), parseFloat(h(d.css("border-top-width")))]
        },
        _checkOffset: function (d, h, j) {
            var k = d.dpDiv.outerWidth(),
                l = d.dpDiv.outerHeight(),
                r = d.input ? d.input.outerWidth() :
                    0,
                u = d.input ? d.input.outerHeight() : 0,
                o = document.documentElement.clientWidth + b(document).scrollLeft(),
                m = document.documentElement.clientHeight + b(document).scrollTop();
            h.left -= this._get(d, "isRTL") ? k - r : 0;
            h.left -= j && h.left == d.input.offset().left ? b(document).scrollLeft() : 0;
            h.top -= j && h.top == d.input.offset().top + u ? b(document).scrollTop() : 0;
            h.left -= Math.min(h.left, h.left + k > o && o > k ? Math.abs(h.left + k - o) : 0);
            h.top -= Math.min(h.top, h.top + l > m && m > l ? Math.abs(l + u) : 0);
            return h
        },
        _findPos: function (d) {
            for (var h = this._get(this._getInst(d),
                "isRTL"); d && (d.type == "hidden" || d.nodeType != 1 || b.expr.filters.hidden(d));) d = d[h ? "previousSibling" : "nextSibling"];
            d = b(d).offset();
            return [d.left, d.top]
        },
        _hideDatepicker: function (d) {
            var h = this._curInst;
            if (!(!h || d && h != b.data(d, "datepicker"))) if (this._datepickerShowing) {
                    d = this._get(h, "showAnim");
                    var j = this._get(h, "duration"),
                        k = function () {
                            b.datepicker._tidyDialog(h);
                            this._curInst = null
                        };
                    b.effects && b.effects[d] ? h.dpDiv.hide(d, b.datepicker._get(h, "showOptions"), j, k) : h.dpDiv[d == "slideDown" ? "slideUp" : d == "fadeIn" ?
                        "fadeOut" : "hide"](d ? j : null, k);
                    d || k();
                    if (d = this._get(h, "onClose")) d.apply(h.input ? h.input[0] : null, [h.input ? h.input.val() : "", h]);
                    this._datepickerShowing = false;
                    this._lastInput = null;
                    if (this._inDialog) {
                        this._dialogInput.css({
                            position: "absolute",
                            left: "0",
                            top: "-100px"
                        });
                        if (b.blockUI) {
                            b.unblockUI();
                            b("body").append(this.dpDiv)
                        }
                    }
                    this._inDialog = false
                }
        },
        _tidyDialog: function (d) {
            d.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (d) {
            if (b.datepicker._curInst) {
                d =
                    b(d.target);
                d[0].id != b.datepicker._mainDivId && d.parents("#" + b.datepicker._mainDivId).length == 0 && !d.hasClass(b.datepicker.markerClassName) && !d.hasClass(b.datepicker._triggerClass) && b.datepicker._datepickerShowing && !(b.datepicker._inDialog && b.blockUI) && b.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (d, h, j) {
            d = b(d);
            var k = this._getInst(d[0]);
            if (!this._isDisabledDatepicker(d[0])) {
                this._adjustInstDate(k, h + (j == "M" ? this._get(k, "showCurrentAtPos") : 0), j);
                this._updateDatepicker(k)
            }
        },
        _gotoToday: function (d) {
            d =
                b(d);
            var h = this._getInst(d[0]);
            if (this._get(h, "gotoCurrent") && h.currentDay) {
                h.selectedDay = h.currentDay;
                h.drawMonth = h.selectedMonth = h.currentMonth;
                h.drawYear = h.selectedYear = h.currentYear
            } else {
                var j = new Date;
                h.selectedDay = j.getDate();
                h.drawMonth = h.selectedMonth = j.getMonth();
                h.drawYear = h.selectedYear = j.getFullYear()
            }
            this._notifyChange(h);
            this._adjustDate(d)
        },
        _selectMonthYear: function (d, h, j) {
            d = b(d);
            var k = this._getInst(d[0]);
            k._selectingMonthYear = false;
            k["selected" + (j == "M" ? "Month" : "Year")] = k["draw" + (j ==
                "M" ? "Month" : "Year")] = parseInt(h.options[h.selectedIndex].value, 10);
            this._notifyChange(k);
            this._adjustDate(d)
        },
        _clickMonthYear: function (d) {
            var h = this._getInst(b(d)[0]);
            h.input && h._selectingMonthYear && setTimeout(function () {
                h.input.focus()
            }, 0);
            h._selectingMonthYear = !h._selectingMonthYear
        },
        _selectDay: function (d, h, j, k) {
            var l = b(d);
            if (!(b(k).hasClass(this._unselectableClass) || this._isDisabledDatepicker(l[0]))) {
                l = this._getInst(l[0]);
                l.selectedDay = l.currentDay = b("a", k).html();
                l.selectedMonth = l.currentMonth =
                    h;
                l.selectedYear = l.currentYear = j;
                this._selectDate(d, this._formatDate(l, l.currentDay, l.currentMonth, l.currentYear))
            }
        },
        _clearDate: function (d) {
            d = b(d);
            this._getInst(d[0]);
            this._selectDate(d, "")
        },
        _selectDate: function (d, h) {
            d = this._getInst(b(d)[0]);
            h = h != null ? h : this._formatDate(d);
            d.input && d.input.val(h);
            this._updateAlternate(d);
            var j = this._get(d, "onSelect");
            if (j) j.apply(d.input ? d.input[0] : null, [h, d]);
            else d.input && d.input.trigger("change"); if (d.inline) this._updateDatepicker(d);
            else {
                this._hideDatepicker();
                this._lastInput = d.input[0];
                typeof d.input[0] != "object" && d.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function (d) {
            var h = this._get(d, "altField");
            if (h) {
                var j = this._get(d, "altFormat") || this._get(d, "dateFormat"),
                    k = this._getDate(d),
                    l = this.formatDate(j, k, this._getFormatConfig(d));
                b(h).each(function () {
                    b(this).val(l)
                })
            }
        },
        noWeekends: function (d) {
            d = d.getDay();
            return [d > 0 && d < 6, ""]
        },
        iso8601Week: function (d) {
            d = new Date(d.getTime());
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var h = d.getTime();
            d.setMonth(0);
            d.setDate(1);
            return Math.floor(Math.round((h - d) / 864E5) / 7) + 1
        },
        parseDate: function (d, h, j) {
            if (d == null || h == null) throw "Invalid arguments";
            h = typeof h == "object" ? h.toString() : h + "";
            if (h == "") return null;
            var k = (j ? j.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            k = typeof k != "string" ? k : (new Date).getFullYear() % 100 + parseInt(k, 10);
            for (var l = (j ? j.dayNamesShort : null) || this._defaults.dayNamesShort, r = (j ? j.dayNames : null) || this._defaults.dayNames, u = (j ? j.monthNamesShort : null) || this._defaults.monthNamesShort, o = (j ?
                    j.monthNames : null) || this._defaults.monthNames, m = j = -1, s = -1, v = -1, x = false, A = function (E) {
                    (E = z + 1 < d.length && d.charAt(z + 1) == E) && z++;
                    return E
                }, D = function (E) {
                    var F = A(E);
                    E = new RegExp("^\\d{1," + (E == "@" ? 14 : E == "!" ? 20 : E == "y" && F ? 4 : E == "o" ? 3 : 2) + "}");
                    E = h.substring(n).match(E);
                    if (!E) throw "Missing number at position " + n;
                    n += E[0].length;
                    return parseInt(E[0], 10)
                }, I = function (E, F, M) {
                    E = A(E) ? M : F;
                    for (F = 0; F < E.length; F++) if (h.substr(n, E[F].length).toLowerCase() == E[F].toLowerCase()) {
                            n += E[F].length;
                            return F + 1
                        }
                    throw "Unknown name at position " +
                        n;
                }, p = function () {
                    if (h.charAt(n) != d.charAt(z)) throw "Unexpected literal at position " + n;
                    n++
                }, n = 0, z = 0; z < d.length; z++) if (x) if (d.charAt(z) == "'" && !A("'")) x = false;
                    else p();
                    else switch (d.charAt(z)) {
                        case "d":
                            s = D("d");
                            break;
                        case "D":
                            I("D", l, r);
                            break;
                        case "o":
                            v = D("o");
                            break;
                        case "m":
                            m = D("m");
                            break;
                        case "M":
                            m = I("M", u, o);
                            break;
                        case "y":
                            j = D("y");
                            break;
                        case "@":
                            var B = new Date(D("@"));
                            j = B.getFullYear();
                            m = B.getMonth() + 1;
                            s = B.getDate();
                            break;
                        case "!":
                            B = new Date((D("!") - this._ticksTo1970) / 1E4);
                            j = B.getFullYear();
                            m = B.getMonth() +
                                1;
                            s = B.getDate();
                            break;
                        case "'":
                            if (A("'")) p();
                            else x = true;
                            break;
                        default:
                            p()
                    }
            if (j == -1) j = (new Date).getFullYear();
            else if (j < 100) j += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (j <= k ? 0 : -100);
            if (v > -1) {
                m = 1;
                s = v;
                do {
                    k = this._getDaysInMonth(j, m - 1);
                    if (s <= k) break;
                    m++;
                    s -= k
                } while (1)
            }
            B = this._daylightSavingAdjust(new Date(j, m - 1, s));
            if (B.getFullYear() != j || B.getMonth() + 1 != m || B.getDate() != s) throw "Invalid date";
            return B
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7,
        formatDate: function (d, h, j) {
            if (!h) return "";
            var k = (j ? j.dayNamesShort : null) || this._defaults.dayNamesShort,
                l = (j ? j.dayNames : null) || this._defaults.dayNames,
                r = (j ? j.monthNamesShort : null) || this._defaults.monthNamesShort;
            j = (j ? j.monthNames : null) || this._defaults.monthNames;
            var u = function (A) {
                (A = x + 1 < d.length &&
                    d.charAt(x + 1) == A) && x++;
                return A
            }, o = function (A, D, I) {
                    D = "" + D;
                    if (u(A)) for (; D.length < I;) D = "0" + D;
                    return D
                }, m = function (A, D, I, p) {
                    return u(A) ? p[D] : I[D]
                }, s = "",
                v = false;
            if (h) for (var x = 0; x < d.length; x++) if (v) if (d.charAt(x) == "'" && !u("'")) v = false;
                        else s += d.charAt(x);
                        else switch (d.charAt(x)) {
                            case "d":
                                s += o("d", h.getDate(), 2);
                                break;
                            case "D":
                                s += m("D", h.getDay(), k, l);
                                break;
                            case "o":
                                s += o("o", (h.getTime() - (new Date(h.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
                                break;
                            case "m":
                                s += o("m", h.getMonth() + 1, 2);
                                break;
                            case "M":
                                s += m("M",
                                    h.getMonth(), r, j);
                                break;
                            case "y":
                                s += u("y") ? h.getFullYear() : (h.getYear() % 100 < 10 ? "0" : "") + h.getYear() % 100;
                                break;
                            case "@":
                                s += h.getTime();
                                break;
                            case "!":
                                s += h.getTime() * 1E4 + this._ticksTo1970;
                                break;
                            case "'":
                                if (u("'")) s += "'";
                                else v = true;
                                break;
                            default:
                                s += d.charAt(x)
                        }
            return s
        },
        _possibleChars: function (d) {
            for (var h = "", j = false, k = function (r) {
                    (r = l + 1 < d.length && d.charAt(l + 1) == r) && l++;
                    return r
                }, l = 0; l < d.length; l++) if (j) if (d.charAt(l) == "'" && !k("'")) j = false;
                    else h += d.charAt(l);
                    else switch (d.charAt(l)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            h +=
                                "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (k("'")) h += "'";
                            else j = true;
                            break;
                        default:
                            h += d.charAt(l)
                    }
            return h
        },
        _get: function (d, h) {
            return d.settings[h] !== c ? d.settings[h] : this._defaults[h]
        },
        _setDateFromField: function (d, h) {
            if (d.input.val() != d.lastVal) {
                var j = this._get(d, "dateFormat"),
                    k = d.lastVal = d.input ? d.input.val() : null,
                    l, r;
                l = r = this._getDefaultDate(d);
                var u = this._getFormatConfig(d);
                try {
                    l = this.parseDate(j, k, u) || r
                } catch (o) {
                    this.log(o);
                    k = h ? "" : k
                }
                d.selectedDay = l.getDate();
                d.drawMonth = d.selectedMonth =
                    l.getMonth();
                d.drawYear = d.selectedYear = l.getFullYear();
                d.currentDay = k ? l.getDate() : 0;
                d.currentMonth = k ? l.getMonth() : 0;
                d.currentYear = k ? l.getFullYear() : 0;
                this._adjustInstDate(d)
            }
        },
        _getDefaultDate: function (d) {
            return this._restrictMinMax(d, this._determineDate(d, this._get(d, "defaultDate"), new Date))
        },
        _determineDate: function (d, h, j) {
            var k = function (r) {
                var u = new Date;
                u.setDate(u.getDate() + r);
                return u
            }, l = function (r) {
                    try {
                        return b.datepicker.parseDate(b.datepicker._get(d, "dateFormat"), r, b.datepicker._getFormatConfig(d))
                    } catch (u) {}
                    var o =
                        (r.toLowerCase().match(/^c/) ? b.datepicker._getDate(d) : null) || new Date,
                        m = o.getFullYear(),
                        s = o.getMonth();
                    o = o.getDate();
                    for (var v = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, x = v.exec(r); x;) {
                        switch (x[2] || "d") {
                        case "d":
                        case "D":
                            o += parseInt(x[1], 10);
                            break;
                        case "w":
                        case "W":
                            o += parseInt(x[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            s += parseInt(x[1], 10);
                            o = Math.min(o, b.datepicker._getDaysInMonth(m, s));
                            break;
                        case "y":
                        case "Y":
                            m += parseInt(x[1], 10);
                            o = Math.min(o, b.datepicker._getDaysInMonth(m, s));
                            break
                        }
                        x = v.exec(r)
                    }
                    return new Date(m,
                        s, o)
                };
            if (h = (h = h == null || h === "" ? j : typeof h == "string" ? l(h) : typeof h == "number" ? isNaN(h) ? j : k(h) : new Date(h.getTime())) && h.toString() == "Invalid Date" ? j : h) {
                h.setHours(0);
                h.setMinutes(0);
                h.setSeconds(0);
                h.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(h)
        },
        _daylightSavingAdjust: function (d) {
            if (!d) return null;
            d.setHours(d.getHours() > 12 ? d.getHours() + 2 : 0);
            return d
        },
        _setDate: function (d, h, j) {
            var k = !h,
                l = d.selectedMonth,
                r = d.selectedYear;
            h = this._restrictMinMax(d, this._determineDate(d, h, new Date));
            d.selectedDay =
                d.currentDay = h.getDate();
            d.drawMonth = d.selectedMonth = d.currentMonth = h.getMonth();
            d.drawYear = d.selectedYear = d.currentYear = h.getFullYear();
            if ((l != d.selectedMonth || r != d.selectedYear) && !j) this._notifyChange(d);
            this._adjustInstDate(d);
            if (d.input) d.input.val(k ? "" : this._formatDate(d))
        },
        _getDate: function (d) {
            return !d.currentYear || d.input && d.input.val() == "" ? null : this._daylightSavingAdjust(new Date(d.currentYear, d.currentMonth, d.currentDay))
        },
        _generateHTML: function (d) {
            var h = new Date;
            h = this._daylightSavingAdjust(new Date(h.getFullYear(),
                h.getMonth(), h.getDate()));
            var j = this._get(d, "isRTL"),
                k = this._get(d, "showButtonPanel"),
                l = this._get(d, "hideIfNoPrevNext"),
                r = this._get(d, "navigationAsDateFormat"),
                u = this._getNumberOfMonths(d),
                o = this._get(d, "showCurrentAtPos"),
                m = this._get(d, "stepMonths"),
                s = u[0] != 1 || u[1] != 1,
                v = this._daylightSavingAdjust(!d.currentDay ? new Date(9999, 9, 9) : new Date(d.currentYear, d.currentMonth, d.currentDay)),
                x = this._getMinMaxDate(d, "min"),
                A = this._getMinMaxDate(d, "max");
            o = d.drawMonth - o;
            var D = d.drawYear;
            if (o < 0) {
                o += 12;
                D--
            }
            if (A) {
                var I =
                    this._daylightSavingAdjust(new Date(A.getFullYear(), A.getMonth() - u[0] * u[1] + 1, A.getDate()));
                for (I = x && I < x ? x : I; this._daylightSavingAdjust(new Date(D, o, 1)) > I;) {
                    o--;
                    if (o < 0) {
                        o = 11;
                        D--
                    }
                }
            }
            d.drawMonth = o;
            d.drawYear = D;
            I = this._get(d, "prevText");
            I = !r ? I : this.formatDate(I, this._daylightSavingAdjust(new Date(D, o - m, 1)), this._getFormatConfig(d));
            I = this._canAdjustMonth(d, -1, D, o) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._adjustDate('#" + d.id + "', -" + m + ", 'M');\" title=\"" + I + '"><span class="ui-icon ui-icon-circle-triangle-' +
                (j ? "e" : "w") + '">' + I + "</span></a>" : l ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + I + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "e" : "w") + '">' + I + "</span></a>";
            var p = this._get(d, "nextText");
            p = !r ? p : this.formatDate(p, this._daylightSavingAdjust(new Date(D, o + m, 1)), this._getFormatConfig(d));
            l = this._canAdjustMonth(d, +1, D, o) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._adjustDate('#" + d.id + "', +" + m + ", 'M');\" title=\"" + p + '"><span class="ui-icon ui-icon-circle-triangle-' +
                (j ? "w" : "e") + '">' + p + "</span></a>" : l ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + p + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "w" : "e") + '">' + p + "</span></a>";
            m = this._get(d, "currentText");
            p = this._get(d, "gotoCurrent") && d.currentDay ? v : h;
            m = !r ? m : this.formatDate(m, p, this._getFormatConfig(d));
            r = !d.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + g + '.datepicker._hideDatepicker();">' + this._get(d,
                "closeText") + "</button>" : "";
            k = k ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (j ? r : "") + (this._isInRange(d, p) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._gotoToday('#" + d.id + "');\">" + m + "</button>" : "") + (j ? "" : r) + "</div>" : "";
            r = parseInt(this._get(d, "firstDay"), 10);
            r = isNaN(r) ? 0 : r;
            m = this._get(d, "showWeek");
            p = this._get(d, "dayNames");
            this._get(d, "dayNamesShort");
            var n = this._get(d, "dayNamesMin"),
                z =
                    this._get(d, "monthNames"),
                B = this._get(d, "monthNamesShort"),
                E = this._get(d, "beforeShowDay"),
                F = this._get(d, "showOtherMonths"),
                M = this._get(d, "selectOtherMonths");
            this._get(d, "calculateWeek");
            for (var O = this._getDefaultDate(d), L = "", S = 0; S < u[0]; S++) {
                for (var X = "", q = 0; q < u[1]; q++) {
                    var w = this._daylightSavingAdjust(new Date(D, o, d.selectedDay)),
                        y = " ui-corner-all",
                        C = "";
                    if (s) {
                        C += '<div class="ui-datepicker-group';
                        if (u[1] > 1) switch (q) {
                            case 0:
                                C += " ui-datepicker-group-first";
                                y = " ui-corner-" + (j ? "right" : "left");
                                break;
                            case u[1] -
                                1:
                                C += " ui-datepicker-group-last";
                                y = " ui-corner-" + (j ? "left" : "right");
                                break;
                            default:
                                C += " ui-datepicker-group-middle";
                                y = "";
                                break
                        }
                        C += '">'
                    }
                    C += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + y + '">' + (/all|left/.test(y) && S == 0 ? j ? l : I : "") + (/all|right/.test(y) && S == 0 ? j ? I : l : "") + this._generateMonthYearHeader(d, o, D, x, A, S > 0 || q > 0, z, B) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var G = m ? '<th class="ui-datepicker-week-col">' + this._get(d, "weekHeader") + "</th>" : "";
                    for (y = 0; y < 7; y++) {
                        var H =
                            (y + r) % 7;
                        G += "<th" + ((y + r + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + p[H] + '">' + n[H] + "</span></th>"
                    }
                    C += G + "</tr></thead><tbody>";
                    G = this._getDaysInMonth(D, o);
                    if (D == d.selectedYear && o == d.selectedMonth) d.selectedDay = Math.min(d.selectedDay, G);
                    y = (this._getFirstDayOfMonth(D, o) - r + 7) % 7;
                    G = s ? 6 : Math.ceil((y + G) / 7);
                    H = this._daylightSavingAdjust(new Date(D, o, 1 - y));
                    for (var J = 0; J < G; J++) {
                        C += "<tr>";
                        var K = !m ? "" : '<td class="ui-datepicker-week-col">' + this._get(d, "calculateWeek")(H) + "</td>";
                        for (y = 0; y < 7; y++) {
                            var N =
                                E ? E.apply(d.input ? d.input[0] : null, [H]) : [true, ""],
                                Q = H.getMonth() != o,
                                R = Q && !M || !N[0] || x && H < x || A && H > A;
                            K += '<td class="' + ((y + r + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Q ? " ui-datepicker-other-month" : "") + (H.getTime() == w.getTime() && o == d.selectedMonth && d._keyEvent || O.getTime() == H.getTime() && O.getTime() == w.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Q && !F ? "" : " " + N[1] + (H.getTime() == v.getTime() ? " " + this._currentClass : "") + (H.getTime() == h.getTime() ? " ui-datepicker-today" :
                                "")) + '"' + ((!Q || F) && N[2] ? ' title="' + N[2] + '"' : "") + (R ? "" : ' onclick="DP_jQuery_' + g + ".datepicker._selectDay('#" + d.id + "'," + H.getMonth() + "," + H.getFullYear() + ', this);return false;"') + ">" + (Q && !F ? "&#xa0;" : R ? '<span class="ui-state-default">' + H.getDate() + "</span>" : '<a class="ui-state-default' + (H.getTime() == h.getTime() ? " ui-state-highlight" : "") + (H.getTime() == v.getTime() ? " ui-state-active" : "") + (Q ? " ui-priority-secondary" : "") + '" href="#">' + H.getDate() + "</a>") + "</td>";
                            H.setDate(H.getDate() + 1);
                            H = this._daylightSavingAdjust(H)
                        }
                        C +=
                            K + "</tr>"
                    }
                    o++;
                    if (o > 11) {
                        o = 0;
                        D++
                    }
                    C += "</tbody></table>" + (s ? "</div>" + (u[0] > 0 && q == u[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    X += C
                }
                L += X
            }
            L += k + (b.browser.msie && parseInt(b.browser.version, 10) < 7 && !d.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            d._keyEvent = false;
            return L
        },
        _generateMonthYearHeader: function (d, h, j, k, l, r, u, o) {
            var m = this._get(d, "changeMonth"),
                s = this._get(d, "changeYear"),
                v = this._get(d, "showMonthAfterYear"),
                x = '<div class="ui-datepicker-title">',
                A = "";
            if (r || !m) A += '<span class="ui-datepicker-month">' + u[h] + "</span>";
            else {
                u = k && k.getFullYear() == j;
                var D = l && l.getFullYear() == j;
                A += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + d.id + "', this, 'M');\" onclick=\"DP_jQuery_" + g + ".datepicker._clickMonthYear('#" + d.id + "');\">";
                for (var I = 0; I < 12; I++) if ((!u || I >= k.getMonth()) && (!D || I <= l.getMonth())) A += '<option value="' + I + '"' + (I == h ? ' selected="selected"' : "") + ">" + o[I] + "</option>";
                A += "</select>"
            }
            v || (x += A + (r || !(m &&
                s) ? "&#xa0;" : ""));
            d.yearshtml = "";
            if (r || !s) x += '<span class="ui-datepicker-year">' + j + "</span>";
            else {
                o = this._get(d, "yearRange").split(":");
                var p = (new Date).getFullYear();
                u = function (n) {
                    n = n.match(/c[+-].*/) ? j + parseInt(n.substring(1), 10) : n.match(/[+-].*/) ? p + parseInt(n, 10) : parseInt(n, 10);
                    return isNaN(n) ? p : n
                };
                h = u(o[0]);
                o = Math.max(h, u(o[1] || ""));
                h = k ? Math.max(h, k.getFullYear()) : h;
                o = l ? Math.min(o, l.getFullYear()) : o;
                for (d.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + g + ".datepicker._selectMonthYear('#" +
                    d.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + g + ".datepicker._clickMonthYear('#" + d.id + "');\">"; h <= o; h++) d.yearshtml += '<option value="' + h + '"' + (h == j ? ' selected="selected"' : "") + ">" + h + "</option>";
                d.yearshtml += "</select>";
                if (b.browser.mozilla) x += '<select class="ui-datepicker-year"><option value="' + j + '" selected="selected">' + j + "</option></select>";
                else {
                    x += d.yearshtml;
                    d.yearshtml = null
                }
            }
            x += this._get(d, "yearSuffix");
            if (v) x += (r || !(m && s) ? "&#xa0;" : "") + A;
            x += "</div>";
            return x
        },
        _adjustInstDate: function (d, h, j) {
            var k =
                d.drawYear + (j == "Y" ? h : 0),
                l = d.drawMonth + (j == "M" ? h : 0);
            h = Math.min(d.selectedDay, this._getDaysInMonth(k, l)) + (j == "D" ? h : 0);
            k = this._restrictMinMax(d, this._daylightSavingAdjust(new Date(k, l, h)));
            d.selectedDay = k.getDate();
            d.drawMonth = d.selectedMonth = k.getMonth();
            d.drawYear = d.selectedYear = k.getFullYear();
            if (j == "M" || j == "Y") this._notifyChange(d)
        },
        _restrictMinMax: function (d, h) {
            var j = this._getMinMaxDate(d, "min");
            d = this._getMinMaxDate(d, "max");
            h = j && h < j ? j : h;
            return d && h > d ? d : h
        },
        _notifyChange: function (d) {
            var h = this._get(d,
                "onChangeMonthYear");
            if (h) h.apply(d.input ? d.input[0] : null, [d.selectedYear, d.selectedMonth + 1, d])
        },
        _getNumberOfMonths: function (d) {
            d = this._get(d, "numberOfMonths");
            return d == null ? [1, 1] : typeof d == "number" ? [1, d] : d
        },
        _getMinMaxDate: function (d, h) {
            return this._determineDate(d, this._get(d, h + "Date"), null)
        },
        _getDaysInMonth: function (d, h) {
            return 32 - this._daylightSavingAdjust(new Date(d, h, 32)).getDate()
        },
        _getFirstDayOfMonth: function (d, h) {
            return (new Date(d, h, 1)).getDay()
        },
        _canAdjustMonth: function (d, h, j, k) {
            var l = this._getNumberOfMonths(d);
            j = this._daylightSavingAdjust(new Date(j, k + (h < 0 ? h : l[0] * l[1]), 1));
            h < 0 && j.setDate(this._getDaysInMonth(j.getFullYear(), j.getMonth()));
            return this._isInRange(d, j)
        },
        _isInRange: function (d, h) {
            var j = this._getMinMaxDate(d, "min");
            d = this._getMinMaxDate(d, "max");
            return (!j || h.getTime() >= j.getTime()) && (!d || h.getTime() <= d.getTime())
        },
        _getFormatConfig: function (d) {
            var h = this._get(d, "shortYearCutoff");
            h = typeof h != "string" ? h : (new Date).getFullYear() % 100 + parseInt(h, 10);
            return {
                shortYearCutoff: h,
                dayNamesShort: this._get(d,
                    "dayNamesShort"),
                dayNames: this._get(d, "dayNames"),
                monthNamesShort: this._get(d, "monthNamesShort"),
                monthNames: this._get(d, "monthNames")
            }
        },
        _formatDate: function (d, h, j, k) {
            if (!h) {
                d.currentDay = d.selectedDay;
                d.currentMonth = d.selectedMonth;
                d.currentYear = d.selectedYear
            }
            h = h ? typeof h == "object" ? h : this._daylightSavingAdjust(new Date(k, j, h)) : this._daylightSavingAdjust(new Date(d.currentYear, d.currentMonth, d.currentDay));
            return this.formatDate(this._get(d, "dateFormat"), h, this._getFormatConfig(d))
        }
    });
    b.fn.datepicker = function (d) {
        if (!this.length) return this;
        if (!b.datepicker.initialized) {
            b(document).mousedown(b.datepicker._checkExternalClick).find("body").append(b.datepicker.dpDiv);
            b.datepicker.initialized = true
        }
        var h = Array.prototype.slice.call(arguments, 1);
        if (typeof d == "string" && (d == "isDisabled" || d == "getDate" || d == "widget")) return b.datepicker["_" + d + "Datepicker"].apply(b.datepicker, [this[0]].concat(h));
        if (d == "option" && arguments.length == 2 && typeof arguments[1] == "string") return b.datepicker["_" + d + "Datepicker"].apply(b.datepicker, [this[0]].concat(h));
        return this.each(function () {
            typeof d == "string" ? b.datepicker["_" + d + "Datepicker"].apply(b.datepicker, [this].concat(h)) : b.datepicker._attachDatepicker(this, d)
        })
    };
    b.datepicker = new e;
    b.datepicker.initialized = false;
    b.datepicker.uuid = (new Date).getTime();
    b.datepicker.version = "1.8.11";
    window["DP_jQuery_" + g] = b
})(jQuery);
(function (b, c) {
    b.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            b.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function (e) {
            if (e === c) return this._value();
            this._setOption("value", e);
            return this
        },
        _setOption: function (e, f) {
            if (e === "value") {
                this.options.value = f;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function () {
            var e = this.options.value;
            if (typeof e !== "number") e = 0;
            return Math.min(this.options.max, Math.max(this.min, e))
        },
        _percentage: function () {
            return 100 *
                this._value() / this.options.max
        },
        _refreshValue: function () {
            var e = this.value(),
                f = this._percentage();
            if (this.oldValue !== e) {
                this.oldValue = e;
                this._trigger("change")
            }
            this.valueDiv.toggleClass("ui-corner-right", e === this.options.max).width(f.toFixed(0) + "%");
            this.element.attr("aria-valuenow", e)
        }
    });
    b.extend(b.ui.progressbar, {
        version: "1.8.11"
    })
})(jQuery);
jQuery.effects || function (b, c) {
    function e(o) {
        var m;
        if (o && o.constructor == Array && o.length == 3) return o;
        if (m = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(o)) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
        if (m = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(o)) return [parseFloat(m[1]) * 2.55, parseFloat(m[2]) * 2.55, parseFloat(m[3]) * 2.55];
        if (m = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(o)) return [parseInt(m[1],
                16), parseInt(m[2], 16), parseInt(m[3], 16)];
        if (m = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(o)) return [parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16), parseInt(m[3] + m[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(o)) return l.transparent;
        return l[b.trim(o).toLowerCase()]
    }
    function f(o, m) {
        var s;
        do {
            s = b.curCSS(o, m);
            if (s != "" && s != "transparent" || b.nodeName(o, "body")) break;
            m = "backgroundColor"
        } while (o = o.parentNode);
        return e(s)
    }
    function g() {
        var o = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            m = {}, s, v;
        if (o && o.length && o[0] && o[o[0]]) for (var x = o.length; x--;) {
                s = o[x];
                if (typeof o[s] == "string") {
                    v = s.replace(/\-(\w)/g, function (A, D) {
                        return D.toUpperCase()
                    });
                    m[v] = o[s]
                }
        } else for (s in o) if (typeof o[s] === "string") m[s] = o[s]; return m
    }
    function d(o) {
        var m, s;
        for (m in o) {
            s = o[m];
            if (s == null || b.isFunction(s) || m in u || /scrollbar/.test(m) || !/color/i.test(m) && isNaN(parseFloat(s))) delete o[m]
        }
        return o
    }
    function h(o, m) {
        var s = {
            _: 0
        }, v;
        for (v in m) if (o[v] != m[v]) s[v] = m[v];
        return s
    }
    function j(o, m, s, v) {
        if (typeof o == "object") {
            v =
                m;
            s = null;
            m = o;
            o = m.effect
        }
        if (b.isFunction(m)) {
            v = m;
            s = null;
            m = {}
        }
        if (typeof m == "number" || b.fx.speeds[m]) {
            v = s;
            s = m;
            m = {}
        }
        if (b.isFunction(s)) {
            v = s;
            s = null
        }
        m = m || {};
        s = s || m.duration;
        s = b.fx.off ? 0 : typeof s == "number" ? s : s in b.fx.speeds ? b.fx.speeds[s] : b.fx.speeds._default;
        v = v || m.complete;
        return [o, m, s, v]
    }
    function k(o) {
        if (!o || typeof o === "number" || b.fx.speeds[o]) return true;
        if (typeof o === "string" && !b.effects[o]) return true;
        return false
    }
    b.effects = {};
    b.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor",
            "borderTopColor", "borderColor", "color", "outlineColor"
    ], function (o, m) {
        b.fx.step[m] = function (s) {
            if (!s.colorInit) {
                s.start = f(s.elem, m);
                s.end = e(s.end);
                s.colorInit = true
            }
            s.elem.style[m] = "rgb(" + Math.max(Math.min(parseInt(s.pos * (s.end[0] - s.start[0]) + s.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(s.pos * (s.end[1] - s.start[1]) + s.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(s.pos * (s.end[2] - s.start[2]) + s.start[2], 10), 255), 0) + ")"
        }
    });
    var l = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0,
                0, 0
        ],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211,
                211, 211
        ],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }, r = ["add", "remove", "toggle"],
        u = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    b.effects.animateClass = function (o, m, s,
        v) {
        if (b.isFunction(s)) {
            v = s;
            s = null
        }
        return this.queue("fx", function () {
            var x = b(this),
                A = x.attr("style") || " ",
                D = d(g.call(this)),
                I, p = x.attr("className");
            b.each(r, function (n, z) {
                o[z] && x[z + "Class"](o[z])
            });
            I = d(g.call(this));
            x.attr("className", p);
            x.animate(h(D, I), m, s, function () {
                b.each(r, function (n, z) {
                    o[z] && x[z + "Class"](o[z])
                });
                if (typeof x.attr("style") == "object") {
                    x.attr("style").cssText = "";
                    x.attr("style").cssText = A
                } else x.attr("style", A);
                v && v.apply(this, arguments)
            });
            D = b.queue(this);
            I = D.splice(D.length - 1, 1)[0];
            D.splice(1, 0, I);
            b.dequeue(this)
        })
    };
    b.fn.extend({
        _addClass: b.fn.addClass,
        addClass: function (o, m, s, v) {
            return m ? b.effects.animateClass.apply(this, [{
                    add: o
                },
                m, s, v
            ]) : this._addClass(o)
        },
        _removeClass: b.fn.removeClass,
        removeClass: function (o, m, s, v) {
            return m ? b.effects.animateClass.apply(this, [{
                    remove: o
                },
                m, s, v
            ]) : this._removeClass(o)
        },
        _toggleClass: b.fn.toggleClass,
        toggleClass: function (o, m, s, v, x) {
            return typeof m == "boolean" || m === c ? s ? b.effects.animateClass.apply(this, [m ? {
                    add: o
                } : {
                    remove: o
                },
                s, v, x
            ]) : this._toggleClass(o,
                m) : b.effects.animateClass.apply(this, [{
                    toggle: o
                },
                m, s, v
            ])
        },
        switchClass: function (o, m, s, v, x) {
            return b.effects.animateClass.apply(this, [{
                    add: m,
                    remove: o
                },
                s, v, x
            ])
        }
    });
    b.extend(b.effects, {
        version: "1.8.11",
        save: function (o, m) {
            for (var s = 0; s < m.length; s++) m[s] !== null && o.data("ec.storage." + m[s], o[0].style[m[s]])
        },
        restore: function (o, m) {
            for (var s = 0; s < m.length; s++) m[s] !== null && o.css(m[s], o.data("ec.storage." + m[s]))
        },
        setMode: function (o, m) {
            if (m == "toggle") m = o.is(":hidden") ? "show" : "hide";
            return m
        },
        getBaseline: function (o,
            m) {
            var s;
            switch (o[0]) {
            case "top":
                s = 0;
                break;
            case "middle":
                s = 0.5;
                break;
            case "bottom":
                s = 1;
                break;
            default:
                s = o[0] / m.height
            }
            switch (o[1]) {
            case "left":
                o = 0;
                break;
            case "center":
                o = 0.5;
                break;
            case "right":
                o = 1;
                break;
            default:
                o = o[1] / m.width
            }
            return {
                x: o,
                y: s
            }
        },
        createWrapper: function (o) {
            if (o.parent().is(".ui-effects-wrapper")) return o.parent();
            var m = {
                width: o.outerWidth(true),
                height: o.outerHeight(true),
                "float": o.css("float")
            }, s = b("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                });
            o.wrap(s);
            s = o.parent();
            if (o.css("position") == "static") {
                s.css({
                    position: "relative"
                });
                o.css({
                    position: "relative"
                })
            } else {
                b.extend(m, {
                    position: o.css("position"),
                    zIndex: o.css("z-index")
                });
                b.each(["top", "left", "bottom", "right"], function (v, x) {
                    m[x] = o.css(x);
                    if (isNaN(parseInt(m[x], 10))) m[x] = "auto"
                });
                o.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return s.css(m).show()
        },
        removeWrapper: function (o) {
            if (o.parent().is(".ui-effects-wrapper")) return o.parent().replaceWith(o);
            return o
        },
        setTransition: function (o, m, s, v) {
            v = v || {};
            b.each(m, function (x, A) {
                unit = o.cssUnit(A);
                if (unit[0] > 0) v[A] = unit[0] * s + unit[1]
            });
            return v
        }
    });
    b.fn.extend({
        effect: function (o) {
            var m = j.apply(this, arguments),
                s = {
                    options: m[1],
                    duration: m[2],
                    callback: m[3]
                };
            m = s.options.mode;
            var v = b.effects[o];
            if (b.fx.off || !v) return m ? this[m](s.duration, s.callback) : this.each(function () {
                    s.callback && s.callback.call(this)
                });
            return v.call(this, s)
        },
        _show: b.fn.show,
        show: function (o) {
            if (k(o)) return this._show.apply(this, arguments);
            else {
                var m = j.apply(this, arguments);
                m[1].mode = "show";
                return this.effect.apply(this, m)
            }
        },
        _hide: b.fn.hide,
        hide: function (o) {
            if (k(o)) return this._hide.apply(this, arguments);
            else {
                var m = j.apply(this, arguments);
                m[1].mode = "hide";
                return this.effect.apply(this, m)
            }
        },
        __toggle: b.fn.toggle,
        toggle: function (o) {
            if (k(o) || typeof o === "boolean" || b.isFunction(o)) return this.__toggle.apply(this, arguments);
            else {
                var m = j.apply(this, arguments);
                m[1].mode = "toggle";
                return this.effect.apply(this, m)
            }
        },
        cssUnit: function (o) {
            var m = this.css(o),
                s = [];
            b.each(["em", "px", "%", "pt"], function (v, x) {
                if (m.indexOf(x) > 0) s = [parseFloat(m), x]
            });
            return s
        }
    });
    b.easing.jswing = b.easing.swing;
    b.extend(b.easing, {
        def: "easeOutQuad",
        swing: function (o, m, s, v, x) {
            return b.easing[b.easing.def](o, m, s, v, x)
        },
        easeInQuad: function (o, m, s, v, x) {
            return v * (m /= x) * m + s
        },
        easeOutQuad: function (o, m, s, v, x) {
            return -v * (m /= x) * (m - 2) + s
        },
        easeInOutQuad: function (o, m, s, v, x) {
            if ((m /= x / 2) < 1) return v / 2 * m * m + s;
            return -v / 2 * (--m * (m - 2) - 1) + s
        },
        easeInCubic: function (o, m, s, v, x) {
            return v * (m /= x) * m * m + s
        },
        easeOutCubic: function (o,
            m, s, v, x) {
            return v * ((m = m / x - 1) * m * m + 1) + s
        },
        easeInOutCubic: function (o, m, s, v, x) {
            if ((m /= x / 2) < 1) return v / 2 * m * m * m + s;
            return v / 2 * ((m -= 2) * m * m + 2) + s
        },
        easeInQuart: function (o, m, s, v, x) {
            return v * (m /= x) * m * m * m + s
        },
        easeOutQuart: function (o, m, s, v, x) {
            return -v * ((m = m / x - 1) * m * m * m - 1) + s
        },
        easeInOutQuart: function (o, m, s, v, x) {
            if ((m /= x / 2) < 1) return v / 2 * m * m * m * m + s;
            return -v / 2 * ((m -= 2) * m * m * m - 2) + s
        },
        easeInQuint: function (o, m, s, v, x) {
            return v * (m /= x) * m * m * m * m + s
        },
        easeOutQuint: function (o, m, s, v, x) {
            return v * ((m = m / x - 1) * m * m * m * m + 1) + s
        },
        easeInOutQuint: function (o,
            m, s, v, x) {
            if ((m /= x / 2) < 1) return v / 2 * m * m * m * m * m + s;
            return v / 2 * ((m -= 2) * m * m * m * m + 2) + s
        },
        easeInSine: function (o, m, s, v, x) {
            return -v * Math.cos(m / x * (Math.PI / 2)) + v + s
        },
        easeOutSine: function (o, m, s, v, x) {
            return v * Math.sin(m / x * (Math.PI / 2)) + s
        },
        easeInOutSine: function (o, m, s, v, x) {
            return -v / 2 * (Math.cos(Math.PI * m / x) - 1) + s
        },
        easeInExpo: function (o, m, s, v, x) {
            return m == 0 ? s : v * Math.pow(2, 10 * (m / x - 1)) + s
        },
        easeOutExpo: function (o, m, s, v, x) {
            return m == x ? s + v : v * (-Math.pow(2, -10 * m / x) + 1) + s
        },
        easeInOutExpo: function (o, m, s, v, x) {
            if (m == 0) return s;
            if (m ==
                x) return s + v;
            if ((m /= x / 2) < 1) return v / 2 * Math.pow(2, 10 * (m - 1)) + s;
            return v / 2 * (-Math.pow(2, -10 * --m) + 2) + s
        },
        easeInCirc: function (o, m, s, v, x) {
            return -v * (Math.sqrt(1 - (m /= x) * m) - 1) + s
        },
        easeOutCirc: function (o, m, s, v, x) {
            return v * Math.sqrt(1 - (m = m / x - 1) * m) + s
        },
        easeInOutCirc: function (o, m, s, v, x) {
            if ((m /= x / 2) < 1) return -v / 2 * (Math.sqrt(1 - m * m) - 1) + s;
            return v / 2 * (Math.sqrt(1 - (m -= 2) * m) + 1) + s
        },
        easeInElastic: function (o, m, s, v, x) {
            var A = 0,
                D = v;
            if (m == 0) return s;
            if ((m /= x) == 1) return s + v;
            A || (A = x * 0.3);
            if (D < Math.abs(v)) {
                D = v;
                o = A / 4
            } else o = A / (2 * Math.PI) *
                    Math.asin(v / D);
            return -(D * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * x - o) * 2 * Math.PI / A)) + s
        },
        easeOutElastic: function (o, m, s, v, x) {
            var A = 0,
                D = v;
            if (m == 0) return s;
            if ((m /= x) == 1) return s + v;
            A || (A = x * 0.3);
            if (D < Math.abs(v)) {
                D = v;
                o = A / 4
            } else o = A / (2 * Math.PI) * Math.asin(v / D);
            return D * Math.pow(2, -10 * m) * Math.sin((m * x - o) * 2 * Math.PI / A) + v + s
        },
        easeInOutElastic: function (o, m, s, v, x) {
            var A = 0,
                D = v;
            if (m == 0) return s;
            if ((m /= x / 2) == 2) return s + v;
            A || (A = x * 0.3 * 1.5);
            if (D < Math.abs(v)) {
                D = v;
                o = A / 4
            } else o = A / (2 * Math.PI) * Math.asin(v / D); if (m < 1) return -0.5 * D *
                    Math.pow(2, 10 * (m -= 1)) * Math.sin((m * x - o) * 2 * Math.PI / A) + s;
            return D * Math.pow(2, -10 * (m -= 1)) * Math.sin((m * x - o) * 2 * Math.PI / A) * 0.5 + v + s
        },
        easeInBack: function (o, m, s, v, x, A) {
            if (A == c) A = 1.70158;
            return v * (m /= x) * m * ((A + 1) * m - A) + s
        },
        easeOutBack: function (o, m, s, v, x, A) {
            if (A == c) A = 1.70158;
            return v * ((m = m / x - 1) * m * ((A + 1) * m + A) + 1) + s
        },
        easeInOutBack: function (o, m, s, v, x, A) {
            if (A == c) A = 1.70158;
            if ((m /= x / 2) < 1) return v / 2 * m * m * (((A *= 1.525) + 1) * m - A) + s;
            return v / 2 * ((m -= 2) * m * (((A *= 1.525) + 1) * m + A) + 2) + s
        },
        easeInBounce: function (o, m, s, v, x) {
            return v - b.easing.easeOutBounce(o,
                x - m, 0, v, x) + s
        },
        easeOutBounce: function (o, m, s, v, x) {
            return (m /= x) < 1 / 2.75 ? v * 7.5625 * m * m + s : m < 2 / 2.75 ? v * (7.5625 * (m -= 1.5 / 2.75) * m + 0.75) + s : m < 2.5 / 2.75 ? v * (7.5625 * (m -= 2.25 / 2.75) * m + 0.9375) + s : v * (7.5625 * (m -= 2.625 / 2.75) * m + 0.984375) + s
        },
        easeInOutBounce: function (o, m, s, v, x) {
            if (m < x / 2) return b.easing.easeInBounce(o, m * 2, 0, v, x) * 0.5 + s;
            return b.easing.easeOutBounce(o, m * 2 - x, 0, v, x) * 0.5 + v * 0.5 + s
        }
    })
}(jQuery);
(function (b) {
    b.effects.blind = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right"],
                g = b.effects.setMode(e, c.options.mode || "hide"),
                d = c.options.direction || "vertical";
            b.effects.save(e, f);
            e.show();
            var h = b.effects.createWrapper(e).css({
                overflow: "hidden"
            }),
                j = d == "vertical" ? "height" : "width";
            d = d == "vertical" ? h.height() : h.width();
            g == "show" && h.css(j, 0);
            var k = {};
            k[j] = g == "show" ? d : 0;
            h.animate(k, c.duration, c.options.easing, function () {
                g == "hide" && e.hide();
                b.effects.restore(e,
                    f);
                b.effects.removeWrapper(e);
                c.callback && c.callback.apply(e[0], arguments);
                e.dequeue()
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.bounce = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right"],
                g = b.effects.setMode(e, c.options.mode || "effect"),
                d = c.options.direction || "up",
                h = c.options.distance || 20,
                j = c.options.times || 5,
                k = c.duration || 250;
            /show|hide/.test(g) && f.push("opacity");
            b.effects.save(e, f);
            e.show();
            b.effects.createWrapper(e);
            var l = d == "up" || d == "down" ? "top" : "left";
            d = d == "up" || d == "left" ? "pos" : "neg";
            h = c.options.distance || (l == "top" ? e.outerHeight({
                margin: true
            }) / 3 : e.outerWidth({
                margin: true
            }) /
                3);
            if (g == "show") e.css("opacity", 0).css(l, d == "pos" ? -h : h);
            if (g == "hide") h /= j * 2;
            g != "hide" && j--;
            if (g == "show") {
                var r = {
                    opacity: 1
                };
                r[l] = (d == "pos" ? "+=" : "-=") + h;
                e.animate(r, k / 2, c.options.easing);
                h /= 2;
                j--
            }
            for (r = 0; r < j; r++) {
                var u = {}, o = {};
                u[l] = (d == "pos" ? "-=" : "+=") + h;
                o[l] = (d == "pos" ? "+=" : "-=") + h;
                e.animate(u, k / 2, c.options.easing).animate(o, k / 2, c.options.easing);
                h = g == "hide" ? h * 2 : h / 2
            }
            if (g == "hide") {
                r = {
                    opacity: 0
                };
                r[l] = (d == "pos" ? "-=" : "+=") + h;
                e.animate(r, k / 2, c.options.easing, function () {
                    e.hide();
                    b.effects.restore(e, f);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments)
                })
            } else {
                u = {};
                o = {};
                u[l] = (d == "pos" ? "-=" : "+=") + h;
                o[l] = (d == "pos" ? "+=" : "-=") + h;
                e.animate(u, k / 2, c.options.easing).animate(o, k / 2, c.options.easing, function () {
                    b.effects.restore(e, f);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments)
                })
            }
            e.queue("fx", function () {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
(function (b) {
    b.effects.clip = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right", "height", "width"],
                g = b.effects.setMode(e, c.options.mode || "hide"),
                d = c.options.direction || "vertical";
            b.effects.save(e, f);
            e.show();
            var h = b.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            h = e[0].tagName == "IMG" ? h : e;
            var j = {
                size: d == "vertical" ? "height" : "width",
                position: d == "vertical" ? "top" : "left"
            };
            d = d == "vertical" ? h.height() : h.width();
            if (g == "show") {
                h.css(j.size, 0);
                h.css(j.position,
                    d / 2)
            }
            var k = {};
            k[j.size] = g == "show" ? d : 0;
            k[j.position] = g == "show" ? 0 : d / 2;
            h.animate(k, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    g == "hide" && e.hide();
                    b.effects.restore(e, f);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(e[0], arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.drop = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right", "opacity"],
                g = b.effects.setMode(e, c.options.mode || "hide"),
                d = c.options.direction || "left";
            b.effects.save(e, f);
            e.show();
            b.effects.createWrapper(e);
            var h = d == "up" || d == "down" ? "top" : "left";
            d = d == "up" || d == "left" ? "pos" : "neg";
            var j = c.options.distance || (h == "top" ? e.outerHeight({
                margin: true
            }) / 2 : e.outerWidth({
                margin: true
            }) / 2);
            if (g == "show") e.css("opacity", 0).css(h, d == "pos" ? -j : j);
            var k = {
                opacity: g == "show" ? 1 : 0
            };
            k[h] = (g == "show" ? d == "pos" ? "+=" : "-=" : d == "pos" ? "-=" : "+=") + j;
            e.animate(k, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    g == "hide" && e.hide();
                    b.effects.restore(e, f);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.explode = function (c) {
        return this.queue(function () {
            var e = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3,
                f = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            c.options.mode = c.options.mode == "toggle" ? b(this).is(":visible") ? "hide" : "show" : c.options.mode;
            var g = b(this).show().css("visibility", "hidden"),
                d = g.offset();
            d.top -= parseInt(g.css("marginTop"), 10) || 0;
            d.left -= parseInt(g.css("marginLeft"), 10) || 0;
            for (var h = g.outerWidth(true), j = g.outerHeight(true), k = 0; k < e; k++) for (var l =
                    0; l < f; l++) g.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -l * (h / f),
                        top: -k * (j / e)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: h / f,
                        height: j / e,
                        left: d.left + l * (h / f) + (c.options.mode == "show" ? (l - Math.floor(f / 2)) * (h / f) : 0),
                        top: d.top + k * (j / e) + (c.options.mode == "show" ? (k - Math.floor(e / 2)) * (j / e) : 0),
                        opacity: c.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: d.left + l * (h / f) + (c.options.mode == "show" ? 0 : (l - Math.floor(f / 2)) * (h / f)),
                        top: d.top + k * (j / e) + (c.options.mode == "show" ? 0 : (k - Math.floor(e / 2)) * (j / e)),
                        opacity: c.options.mode == "show" ? 1 : 0
                    }, c.duration || 500);
            setTimeout(function () {
                c.options.mode == "show" ? g.css({
                    visibility: "visible"
                }) : g.css({
                    visibility: "visible"
                }).hide();
                c.callback && c.callback.apply(g[0]);
                g.dequeue();
                b("div.ui-effects-explode").remove()
            }, c.duration || 500)
        })
    }
})(jQuery);
(function (b) {
    b.effects.fade = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = b.effects.setMode(e, c.options.mode || "hide");
            e.animate({
                opacity: f
            }, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.fold = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right"],
                g = b.effects.setMode(e, c.options.mode || "hide"),
                d = c.options.size || 15,
                h = !! c.options.horizFirst,
                j = c.duration ? c.duration / 2 : b.fx.speeds._default / 2;
            b.effects.save(e, f);
            e.show();
            var k = b.effects.createWrapper(e).css({
                overflow: "hidden"
            }),
                l = g == "show" != h,
                r = l ? ["width", "height"] : ["height", "width"];
            l = l ? [k.width(), k.height()] : [k.height(), k.width()];
            var u = /([0-9]+)%/.exec(d);
            if (u) d = parseInt(u[1],
                    10) / 100 * l[g == "hide" ? 0 : 1];
            if (g == "show") k.css(h ? {
                    height: 0,
                    width: d
                } : {
                    height: d,
                    width: 0
                });
            h = {};
            u = {};
            h[r[0]] = g == "show" ? l[0] : d;
            u[r[1]] = g == "show" ? l[1] : 0;
            k.animate(h, j, c.options.easing).animate(u, j, c.options.easing, function () {
                g == "hide" && e.hide();
                b.effects.restore(e, f);
                b.effects.removeWrapper(e);
                c.callback && c.callback.apply(e[0], arguments);
                e.dequeue()
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.highlight = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["backgroundImage", "backgroundColor", "opacity"],
                g = b.effects.setMode(e, c.options.mode || "show"),
                d = {
                    backgroundColor: e.css("backgroundColor")
                };
            if (g == "hide") d.opacity = 0;
            b.effects.save(e, f);
            e.show().css({
                backgroundImage: "none",
                backgroundColor: c.options.color || "#ffff99"
            }).animate(d, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    g == "hide" && e.hide();
                    b.effects.restore(e, f);
                    g == "show" && !b.support.opacity &&
                        this.style.removeAttribute("filter");
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.pulsate = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = b.effects.setMode(e, c.options.mode || "show");
            times = (c.options.times || 5) * 2 - 1;
            duration = c.duration ? c.duration / 2 : b.fx.speeds._default / 2;
            isVisible = e.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                e.css("opacity", 0).show();
                animateTo = 1
            }
            if (f == "hide" && isVisible || f == "show" && !isVisible) times--;
            for (f = 0; f < times; f++) {
                e.animate({
                    opacity: animateTo
                }, duration, c.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            e.animate({
                opacity: animateTo
            }, duration,
                c.options.easing, function () {
                animateTo == 0 && e.hide();
                c.callback && c.callback.apply(this, arguments)
            });
            e.queue("fx", function () {
                e.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
(function (b) {
    b.effects.puff = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = b.effects.setMode(e, c.options.mode || "hide"),
                g = parseInt(c.options.percent, 10) || 150,
                d = g / 100,
                h = {
                    height: e.height(),
                    width: e.width()
                };
            b.extend(c.options, {
                fade: true,
                mode: f,
                percent: f == "hide" ? g : 100,
                from: f == "hide" ? h : {
                    height: h.height * d,
                    width: h.width * d
                }
            });
            e.effect("scale", c.options, c.duration, c.callback);
            e.dequeue()
        })
    };
    b.effects.scale = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = b.extend(true, {}, c.options),
                g = b.effects.setMode(e,
                    c.options.mode || "effect"),
                d = parseInt(c.options.percent, 10) || (parseInt(c.options.percent, 10) == 0 ? 0 : g == "hide" ? 0 : 100),
                h = c.options.direction || "both",
                j = c.options.origin;
            if (g != "effect") {
                f.origin = j || ["middle", "center"];
                f.restore = true
            }
            j = {
                height: e.height(),
                width: e.width()
            };
            e.from = c.options.from || (g == "show" ? {
                height: 0,
                width: 0
            } : j);
            d = {
                y: h != "horizontal" ? d / 100 : 1,
                x: h != "vertical" ? d / 100 : 1
            };
            e.to = {
                height: j.height * d.y,
                width: j.width * d.x
            };
            if (c.options.fade) {
                if (g == "show") {
                    e.from.opacity = 0;
                    e.to.opacity = 1
                }
                if (g == "hide") {
                    e.from.opacity =
                        1;
                    e.to.opacity = 0
                }
            }
            f.from = e.from;
            f.to = e.to;
            f.mode = g;
            e.effect("size", f, c.duration, c.callback);
            e.dequeue()
        })
    };
    b.effects.size = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                g = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                d = ["width", "height", "overflow"],
                h = ["fontSize"],
                j = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                k = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                l = b.effects.setMode(e, c.options.mode || "effect"),
                r = c.options.restore || false,
                u = c.options.scale || "both",
                o = c.options.origin,
                m = {
                    height: e.height(),
                    width: e.width()
                };
            e.from = c.options.from || m;
            e.to = c.options.to || m;
            if (o) {
                o = b.effects.getBaseline(o, m);
                e.from.top = (m.height - e.from.height) * o.y;
                e.from.left = (m.width - e.from.width) * o.x;
                e.to.top = (m.height - e.to.height) * o.y;
                e.to.left = (m.width - e.to.width) * o.x
            }
            var s = {
                from: {
                    y: e.from.height / m.height,
                    x: e.from.width / m.width
                },
                to: {
                    y: e.to.height / m.height,
                    x: e.to.width / m.width
                }
            };
            if (u == "box" || u == "both") {
                if (s.from.y != s.to.y) {
                    f = f.concat(j);
                    e.from = b.effects.setTransition(e, j, s.from.y, e.from);
                    e.to = b.effects.setTransition(e, j, s.to.y, e.to)
                }
                if (s.from.x != s.to.x) {
                    f = f.concat(k);
                    e.from = b.effects.setTransition(e, k, s.from.x, e.from);
                    e.to = b.effects.setTransition(e, k, s.to.x, e.to)
                }
            }
            if (u == "content" || u == "both") if (s.from.y != s.to.y) {
                    f = f.concat(h);
                    e.from = b.effects.setTransition(e, h, s.from.y, e.from);
                    e.to = b.effects.setTransition(e, h, s.to.y, e.to)
                }
            b.effects.save(e, r ? f : g);
            e.show();
            b.effects.createWrapper(e);
            e.css("overflow", "hidden").css(e.from);
            if (u == "content" || u == "both") {
                j = j.concat(["marginTop", "marginBottom"]).concat(h);
                k = k.concat(["marginLeft", "marginRight"]);
                d = f.concat(j).concat(k);
                e.find("*[width]").each(function () {
                    child = b(this);
                    r && b.effects.save(child, d);
                    var v = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: v.height * s.from.y,
                        width: v.width * s.from.x
                    };
                    child.to = {
                        height: v.height * s.to.y,
                        width: v.width * s.to.x
                    };
                    if (s.from.y != s.to.y) {
                        child.from = b.effects.setTransition(child, j, s.from.y, child.from);
                        child.to = b.effects.setTransition(child, j, s.to.y, child.to)
                    }
                    if (s.from.x != s.to.x) {
                        child.from = b.effects.setTransition(child, k, s.from.x, child.from);
                        child.to = b.effects.setTransition(child, k, s.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, c.duration, c.options.easing, function () {
                        r && b.effects.restore(child, d)
                    })
                })
            }
            e.animate(e.to, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    e.to.opacity === 0 && e.css("opacity", e.from.opacity);
                    l == "hide" && e.hide();
                    b.effects.restore(e,
                        r ? f : g);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.shake = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right"];
            b.effects.setMode(e, c.options.mode || "effect");
            var g = c.options.direction || "left",
                d = c.options.distance || 20,
                h = c.options.times || 3,
                j = c.duration || c.options.duration || 140;
            b.effects.save(e, f);
            e.show();
            b.effects.createWrapper(e);
            var k = g == "up" || g == "down" ? "top" : "left",
                l = g == "up" || g == "left" ? "pos" : "neg";
            g = {};
            var r = {}, u = {};
            g[k] = (l == "pos" ? "-=" : "+=") + d;
            r[k] = (l == "pos" ? "+=" : "-=") + d * 2;
            u[k] =
                (l == "pos" ? "-=" : "+=") + d * 2;
            e.animate(g, j, c.options.easing);
            for (d = 1; d < h; d++) e.animate(r, j, c.options.easing).animate(u, j, c.options.easing);
            e.animate(r, j, c.options.easing).animate(g, j / 2, c.options.easing, function () {
                b.effects.restore(e, f);
                b.effects.removeWrapper(e);
                c.callback && c.callback.apply(this, arguments)
            });
            e.queue("fx", function () {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
(function (b) {
    b.effects.slide = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = ["position", "top", "bottom", "left", "right"],
                g = b.effects.setMode(e, c.options.mode || "show"),
                d = c.options.direction || "left";
            b.effects.save(e, f);
            e.show();
            b.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            var h = d == "up" || d == "down" ? "top" : "left";
            d = d == "up" || d == "left" ? "pos" : "neg";
            var j = c.options.distance || (h == "top" ? e.outerHeight({
                margin: true
            }) : e.outerWidth({
                margin: true
            }));
            if (g == "show") e.css(h, d == "pos" ? isNaN(j) ? "-" + j : -j : j);
            var k = {};
            k[h] = (g == "show" ? d == "pos" ? "+=" : "-=" : d == "pos" ? "-=" : "+=") + j;
            e.animate(k, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    g == "hide" && e.hide();
                    b.effects.restore(e, f);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.effects.transfer = function (c) {
        return this.queue(function () {
            var e = b(this),
                f = b(c.options.to),
                g = f.offset();
            f = {
                top: g.top,
                left: g.left,
                height: f.innerHeight(),
                width: f.innerWidth()
            };
            g = e.offset();
            var d = b('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({
                top: g.top,
                left: g.left,
                height: e.innerHeight(),
                width: e.innerWidth(),
                position: "absolute"
            }).animate(f, c.duration, c.options.easing, function () {
                d.remove();
                c.callback && c.callback.apply(e[0], arguments);
                e.dequeue()
            })
        })
    }
})(jQuery);
(function (b) {
    function c() {
        if (b.fn.ajaxSubmit.debug) {
            var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            if (window.console && window.console.log) window.console.log(e);
            else window.opera && window.opera.postError && window.opera.postError(e)
        }
    }
    b.fn.ajaxSubmit = function (e) {
        function f(m) {
            function s(J) {
                return J.contentWindow ? J.contentWindow.document : J.contentDocument ? J.contentDocument : J.document
            }
            function v() {
                function J() {
                    try {
                        var V = s(E).readyState;
                        c("state = " + V);
                        V.toLowerCase() == "uninitialized" && setTimeout(J,
                            50)
                    } catch (W) {
                        c("Server abort: ", W, " (", W.name, ")");
                        x(S);
                        O && clearTimeout(O);
                        O = undefined
                    }
                }
                var K = h.attr("target"),
                    N = h.attr("action");
                A.setAttribute("target", z);
                g || A.setAttribute("method", "POST");
                N != p.url && A.setAttribute("action", p.url);
                if (!p.skipEncodingOverride && (!g || /post/i.test(g))) h.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    });
                if (p.timeout) O = setTimeout(function () {
                        M = true;
                        x(L)
                    }, p.timeout);
                var Q = [];
                try {
                    if (p.extraData) for (var R in p.extraData) Q.push(b('<input type="hidden" name="' +
                                R + '" />').attr("value", p.extraData[R]).appendTo(A)[0]);
                    if (!p.iframeTarget) {
                        B.appendTo("body");
                        E.attachEvent ? E.attachEvent("onload", x) : E.addEventListener("load", x, false)
                    }
                    setTimeout(J, 15);
                    A.submit()
                } finally {
                    A.setAttribute("action", N);
                    K ? A.setAttribute("target", K) : h.removeAttr("target");
                    b(Q).remove()
                }
            }
            function x(J) {
                if (!(F.aborted || y)) {
                    try {
                        q = s(E)
                    } catch (K) {
                        c("cannot access response document: ", K);
                        J = S
                    }
                    if (J === L && F) F.abort("timeout");
                    else if (J == S && F) F.abort("server abort");
                    else {
                        if (!q || q.location.href == p.iframeSrc) if (!M) return;
                        E.detachEvent ? E.detachEvent("onload", x) : E.removeEventListener("load", x, false);
                        J = "success";
                        var N;
                        try {
                            if (M) throw "timeout";
                            var Q = p.dataType == "xml" || q.XMLDocument || b.isXMLDoc(q);
                            c("isXml=" + Q);
                            if (!Q && window.opera && (q.body == null || q.body.innerHTML == "")) if (--w) {
                                    c("requeing onLoad callback, DOM not available");
                                    setTimeout(x, 250);
                                    return
                                }
                            var R = q.body ? q.body : q.documentElement;
                            F.responseText = R ? R.innerHTML : null;
                            F.responseXML = q.XMLDocument ? q.XMLDocument : q;
                            if (Q) p.dataType = "xml";
                            F.getResponseHeader = function (aa) {
                                return {
                                    "content-type": p.dataType
                                }[aa]
                            };
                            if (R) {
                                F.status = Number(R.getAttribute("status")) || F.status;
                                F.statusText = R.getAttribute("statusText") || F.statusText
                            }
                            var V = (p.dataType || "").toLowerCase(),
                                W = /(json|script|text)/.test(V);
                            if (W || p.textarea) {
                                var T = q.getElementsByTagName("textarea")[0];
                                if (T) {
                                    F.responseText = T.value;
                                    F.status = Number(T.getAttribute("status")) || F.status;
                                    F.statusText = T.getAttribute("statusText") || F.statusText
                                } else if (W) {
                                    var U = q.getElementsByTagName("pre")[0],
                                        Z = q.getElementsByTagName("body")[0];
                                    if (U) F.responseText = U.textContent ?
                                            U.textContent : U.innerText;
                                    else if (Z) F.responseText = Z.textContent ? Z.textContent : Z.innerText
                                }
                            } else if (V == "xml" && !F.responseXML && F.responseText != null) F.responseXML = C(F.responseText);
                            try {
                                X = H(F, V, p)
                            } catch (ga) {
                                J = "parsererror";
                                F.error = N = ga || J
                            }
                        } catch (ba) {
                            c("error caught: ", ba);
                            J = "error";
                            F.error = N = ba || J
                        }
                        if (F.aborted) {
                            c("upload aborted");
                            J = null
                        }
                        if (F.status) J = F.status >= 200 && F.status < 300 || F.status === 304 ? "success" : "error";
                        if (J === "success") {
                            p.success && p.success.call(p.context, X, "success", F);
                            n && b.event.trigger("ajaxSuccess", [F, p])
                        } else if (J) {
                            if (N == undefined) N = F.statusText;
                            p.error && p.error.call(p.context, F, J, N);
                            n && b.event.trigger("ajaxError", [F, p, N])
                        }
                        n && b.event.trigger("ajaxComplete", [F, p]);
                        n && !--b.active && b.event.trigger("ajaxStop");
                        p.complete && p.complete.call(p.context, F, J);
                        y = true;
                        p.timeout && clearTimeout(O);
                        setTimeout(function () {
                            p.iframeTarget || B.remove();
                            F.responseXML = null
                        }, 100)
                    }
                }
            }
            var A = h[0],
                D, I, p, n, z, B, E, F, M, O;
            D = !! b.fn.prop;
            if (m) if (D) for (I = 0; I < m.length; I++) {
                        D = b(A[m[I].name]);
                        D.prop("disabled", false)
                } else for (I = 0; I <
                        m.length; I++) {
                        D = b(A[m[I].name]);
                        D.removeAttr("disabled")
                }
            if (b(":input[name=submit],:input[id=submit]", A).length) alert('Error: Form elements must not have name or id of "submit".');
            else {
                p = b.extend(true, {}, b.ajaxSettings, e);
                p.context = p.context || p;
                z = "jqFormIO" + (new Date).getTime();
                if (p.iframeTarget) {
                    B = b(p.iframeTarget);
                    D = B.attr("name");
                    if (D == null) B.attr("name", z);
                    else z = D
                } else {
                    B = b('<iframe name="' + z + '" src="' + p.iframeSrc + '" />');
                    B.css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    })
                }
                E = B[0];
                F = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {},
                    getResponseHeader: function () {},
                    setRequestHeader: function () {},
                    abort: function (J) {
                        var K = J === "timeout" ? "timeout" : "aborted";
                        c("aborting upload... " + K);
                        this.aborted = 1;
                        B.attr("src", p.iframeSrc);
                        F.error = K;
                        p.error && p.error.call(p.context, F, K, J);
                        n && b.event.trigger("ajaxError", [F, p, K]);
                        p.complete && p.complete.call(p.context, F, K)
                    }
                };
                (n = p.global) && !b.active++ && b.event.trigger("ajaxStart");
                n && b.event.trigger("ajaxSend", [F, p]);
                if (p.beforeSend && p.beforeSend.call(p.context, F, p) === false) p.global && b.active--;
                else if (!F.aborted) {
                    if (m = A.clk) if ((D = m.name) && !m.disabled) {
                            p.extraData = p.extraData || {};
                            p.extraData[D] = m.value;
                            if (m.type == "image") {
                                p.extraData[D + ".x"] = A.clk_x;
                                p.extraData[D + ".y"] = A.clk_y
                            }
                        }
                    var L = 1,
                        S = 2;
                    p.forceSync ? v() : setTimeout(v, 10);
                    var X, q, w = 50,
                        y, C = b.parseXML || function (J, K) {
                            if (window.ActiveXObject) {
                                K = new ActiveXObject("Microsoft.XMLDOM");
                                K.async = "false";
                                K.loadXML(J)
                            } else K = (new DOMParser).parseFromString(J, "text/xml");
                            return K && K.documentElement && K.documentElement.nodeName != "parsererror" ? K : null
                        }, G = b.parseJSON || function (J) {
                            return window.eval("(" + J + ")")
                        }, H = function (J, K, N) {
                            var Q = J.getResponseHeader("content-type") || "",
                                R = K === "xml" || !K && Q.indexOf("xml") >= 0;
                            J = R ? J.responseXML : J.responseText;
                            R && J.documentElement.nodeName === "parsererror" && b.error && b.error("parsererror");
                            if (N && N.dataFilter) J = N.dataFilter(J, K);
                            if (typeof J === "string") if (K === "json" || !K && Q.indexOf("json") >= 0) J = G(J);
                                else if (K === "script" || !K && Q.indexOf("javascript") >=
                                0) b.globalEval(J);
                            return J
                        }
                }
            }
        }
        if (!this.length) {
            c("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var g, d, h = this;
        if (typeof e == "function") e = {
                success: e
        };
        g = this.attr("method");
        d = this.attr("action");
        if (d = (d = typeof d === "string" ? b.trim(d) : "") || window.location.href || "") d = (d.match(/^([^#]+)/) || [])[1];
        e = b.extend(true, {
            url: d,
            success: b.ajaxSettings.success,
            type: g || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, e);
        d = {};
        this.trigger("form-pre-serialize", [this, e, d]);
        if (d.veto) {
            c("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (e.beforeSerialize && e.beforeSerialize(this, e) === false) {
            c("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var j, k, l = this.formToArray(e.semantic);
        if (e.data) {
            e.extraData = e.data;
            for (j in e.data) if (b.isArray(e.data[j])) for (var r in e.data[j]) l.push({
                            name: j,
                            value: e.data[j][r]
                        });
                else {
                    k = e.data[j];
                    k = b.isFunction(k) ? k() : k;
                    l.push({
                        name: j,
                        value: k
                    })
                }
        }
        if (e.beforeSubmit && e.beforeSubmit(l, this,
            e) === false) {
            c("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [l, this, e, d]);
        if (d.veto) {
            c("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        j = b.param(l);
        if (e.type.toUpperCase() == "GET") {
            e.url += (e.url.indexOf("?") >= 0 ? "&" : "?") + j;
            e.data = null
        } else e.data = j;
        var u = [];
        e.resetForm && u.push(function () {
            h.resetForm()
        });
        e.clearForm && u.push(function () {
            h.clearForm()
        });
        if (!e.dataType && e.target) {
            var o = e.success || function () {};
            u.push(function (m) {
                var s =
                    e.replaceTarget ? "replaceWith" : "html";
                b(e.target)[s](m).each(o, arguments)
            })
        } else e.success && u.push(e.success);
        e.success = function (m, s, v) {
            for (var x = e.context || e, A = 0, D = u.length; A < D; A++) u[A].apply(x, [m, s, v || h, h])
        };
        j = b("input:file", this).length > 0;
        r = h.attr("enctype") == "multipart/form-data" || h.attr("encoding") == "multipart/form-data";
        if (e.iframe !== false && (j || e.iframe || r)) e.closeKeepAlive ? b.get(e.closeKeepAlive, function () {
                f(l)
            }) : f(l);
        else {
            if (b.browser.msie && g == "get" && typeof e.type === "undefined") {
                j = h[0].getAttribute("method");
                if (typeof j === "string") e.type = j
            }
            b.ajax(e)
        }
        this.trigger("form-submit-notify", [this, e]);
        return this
    };
    b.fn.ajaxForm = function (e) {
        if (this.length === 0) {
            var f = {
                s: this.selector,
                c: this.context
            };
            if (!b.isReady && f.s) {
                c("DOM not ready, queuing ajaxForm");
                b(function () {
                    b(f.s, f.c).ajaxForm(e)
                });
                return this
            }
            c("terminating; zero elements found by selector" + (b.isReady ? "" : " (DOM not ready)"));
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", function (g) {
            if (!g.isDefaultPrevented()) {
                g.preventDefault();
                b(this).ajaxSubmit(e)
            }
        }).bind("click.form-plugin", function (g) {
            var d = g.target,
                h = b(d);
            if (!h.is(":submit,input:image")) {
                d = h.closest(":submit");
                if (d.length == 0) return;
                d = d[0]
            }
            var j = this;
            j.clk = d;
            if (d.type == "image") if (g.offsetX != undefined) {
                    j.clk_x = g.offsetX;
                    j.clk_y = g.offsetY
                } else if (typeof b.fn.offset == "function") {
                h = h.offset();
                j.clk_x = g.pageX - h.left;
                j.clk_y = g.pageY - h.top
            } else {
                j.clk_x = g.pageX - d.offsetLeft;
                j.clk_y = g.pageY - d.offsetTop
            }
            setTimeout(function () {
                j.clk = j.clk_x = j.clk_y = null
            }, 100)
        })
    };
    b.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    b.fn.formToArray = function (e) {
        var f = [];
        if (this.length === 0) return f;
        var g = this[0],
            d = e ? g.getElementsByTagName("*") : g.elements;
        if (!d) return f;
        var h, j, k, l, r, u;
        h = 0;
        for (r = d.length; h < r; h++) {
            j = d[h];
            if (k = j.name) if (e && g.clk && j.type == "image") {
                    if (!j.disabled && g.clk == j) {
                        f.push({
                            name: k,
                            value: b(j).val()
                        });
                        f.push({
                            name: k + ".x",
                            value: g.clk_x
                        }, {
                            name: k + ".y",
                            value: g.clk_y
                        })
                    }
                } else if ((l = b.fieldValue(j, true)) && l.constructor == Array) {
                j = 0;
                for (u = l.length; j <
                    u; j++) f.push({
                        name: k,
                        value: l[j]
                    })
            } else l !== null && typeof l != "undefined" && f.push({
                    name: k,
                    value: l
                })
        }
        if (!e && g.clk) {
            e = b(g.clk);
            d = e[0];
            if ((k = d.name) && !d.disabled && d.type == "image") {
                f.push({
                    name: k,
                    value: e.val()
                });
                f.push({
                    name: k + ".x",
                    value: g.clk_x
                }, {
                    name: k + ".y",
                    value: g.clk_y
                })
            }
        }
        return f
    };
    b.fn.formSerialize = function (e) {
        return b.param(this.formToArray(e))
    };
    b.fn.fieldSerialize = function (e) {
        var f = [];
        this.each(function () {
            var g = this.name;
            if (g) {
                var d = b.fieldValue(this, e);
                if (d && d.constructor == Array) for (var h = 0, j = d.length; h <
                        j; h++) f.push({
                            name: g,
                            value: d[h]
                        });
                else d !== null && typeof d != "undefined" && f.push({
                        name: this.name,
                        value: d
                    })
            }
        });
        return b.param(f)
    };
    b.fn.fieldValue = function (e) {
        for (var f = [], g = 0, d = this.length; g < d; g++) {
            var h = b.fieldValue(this[g], e);
            h === null || typeof h == "undefined" || h.constructor == Array && !h.length || (h.constructor == Array ? b.merge(f, h) : f.push(h))
        }
        return f
    };
    b.fieldValue = function (e, f) {
        var g = e.name,
            d = e.type,
            h = e.tagName.toLowerCase();
        if (f === undefined) f = true;
        if (f && (!g || e.disabled || d == "reset" || d == "button" || (d == "checkbox" ||
            d == "radio") && !e.checked || (d == "submit" || d == "image") && e.form && e.form.clk != e || h == "select" && e.selectedIndex == -1)) return null;
        if (h == "select") {
            h = e.selectedIndex;
            if (h < 0) return null;
            f = [];
            e = e.options;
            g = (d = d == "select-one") ? h + 1 : e.length;
            for (h = d ? h : 0; h < g; h++) {
                var j = e[h];
                if (j.selected) {
                    var k = j.value;
                    k || (k = j.attributes && j.attributes.value && !j.attributes.value.specified ? j.text : j.value);
                    if (d) return k;
                    f.push(k)
                }
            }
            return f
        }
        return b(e).val()
    };
    b.fn.clearForm = function () {
        return this.each(function () {
            b("input,select,textarea",
                this).clearFields()
        })
    };
    b.fn.clearFields = b.fn.clearInputs = function () {
        var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var f = this.type,
                g = this.tagName.toLowerCase();
            if (e.test(f) || g == "textarea") this.value = "";
            else if (f == "checkbox" || f == "radio") this.checked = false;
            else if (g == "select") this.selectedIndex = -1
        })
    };
    b.fn.resetForm = function () {
        return this.each(function () {
            if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) this.reset()
        })
    };
    b.fn.enable = function (e) {
        if (e === undefined) e = true;
        return this.each(function () {
            this.disabled = !e
        })
    };
    b.fn.selected = function (e) {
        if (e === undefined) e = true;
        return this.each(function () {
            var f = this.type;
            if (f == "checkbox" || f == "radio") this.checked = e;
            else if (this.tagName.toLowerCase() == "option") {
                f = b(this).parent("select");
                e && f[0] && f[0].type == "select-one" && f.find("option").selected(false);
                this.selected = e
            }
        })
    };
    b.fn.ajaxSubmit.debug = false
})(window.jQuery || window.Zepto);
eval(function (b, c, e, f, g, d) {
    g = function (h) {
        return (h < c ? "" : g(parseInt(h / c))) + ((h %= c) > 35 ? String.fromCharCode(h + 29) : h.toString(36))
    };
    if (!"".replace(/^/, String)) {
        for (; e--;) d[g(e)] = f[e] || g(e);
        f = [function (h) {
                return d[h]
            }
        ];
        g = function () {
            return "\\w+"
        };
        e = 1
    }
    for (; e--;) if (f[e]) b = b.replace(new RegExp("\\b" + g(e) + "\\b", "g"), f[e]);
    return b
}("(9($){$.1s.A=9(o){z 4.14(9(){2H r(4,o)})};8 q={W:F,23:1,1G:1,u:7,15:3,16:7,1H:'2I',24:'2J',1i:0,B:7,1j:7,1I:7,25:7,26:7,27:7,28:7,29:7,2a:7,2b:7,1J:'<N></N>',1K:'<N></N>',2c:'2d',2e:'2d',1L:7,1M:7};$.A=9(e,o){4.5=$.17({},q,o||{});4.Q=F;4.D=7;4.H=7;4.t=7;4.R=7;4.S=7;4.O=!4.5.W?'1N':'2f';4.E=!4.5.W?'2g':'2h';8 a='',1d=e.J.1d(' ');1k(8 i=0;i<1d.K;i++){6(1d[i].2i('A-2j')!=-1){$(e).1t(1d[i]);8 a=1d[i];1l}}6(e.2k=='2K'||e.2k=='2L'){4.t=$(e);4.D=4.t.18();6(4.D.1m('A-H')){6(!4.D.18().1m('A-D'))4.D=4.D.B('<N></N>');4.D=4.D.18()}X 6(!4.D.1m('A-D'))4.D=4.t.B('<N></N>').18()}X{4.D=$(e);4.t=$(e).2M('>2l,>2m,N>2l,N>2m')}6(a!=''&&4.D.18()[0].J.2i('A-2j')==-1)4.D.B('<N 2N=\" '+a+'\"></N>');4.H=4.t.18();6(!4.H.K||!4.H.1m('A-H'))4.H=4.t.B('<N></N>').18();4.S=$('.A-11',4.D);6(4.S.u()==0&&4.5.1K!=7)4.S=4.H.1u(4.5.1K).11();4.S.V(4.J('A-11'));4.R=$('.A-19',4.D);6(4.R.u()==0&&4.5.1J!=7)4.R=4.H.1u(4.5.1J).11();4.R.V(4.J('A-19'));4.H.V(4.J('A-H'));4.t.V(4.J('A-t'));4.D.V(4.J('A-D'));8 b=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 c=4.t.2O('1v');8 d=4;6(c.u()>0){8 f=0,i=4.5.1G;c.14(9(){d.1P(4,i++);f+=d.T(4,b)});4.t.y(4.O,f+'U');6(!o||o.u===L)4.5.u=c.u()}4.D.y('1w','1x');4.R.y('1w','1x');4.S.y('1w','1x');4.2n=9(){d.19()};4.2o=9(){d.11()};4.1Q=9(){d.2p()};6(4.5.1j!=7)4.5.1j(4,'2q');6($.2r.2s){4.1e(F,F);$(2t).1y('2P',9(){d.1z()})}X 4.1z()};8 r=$.A;r.1s=r.2Q={A:'0.2.3'};r.1s.17=r.17=$.17;r.1s.17({1z:9(){4.C=7;4.G=7;4.Y=7;4.12=7;4.1a=F;4.1f=7;4.P=7;4.Z=F;6(4.Q)z;4.t.y(4.E,4.1A(4.5.1G)+'U');8 p=4.1A(4.5.23);4.Y=4.12=7;4.1p(p,F);$(2t).1R('2u',4.1Q).1y('2u',4.1Q)},2v:9(){4.t.2w();4.t.y(4.E,'2R');4.t.y(4.O,'2S');6(4.5.1j!=7)4.5.1j(4,'2v');4.1z()},2p:9(){6(4.P!=7&&4.Z)4.t.y(4.E,r.I(4.t.y(4.E))+4.P);4.P=7;4.Z=F;6(4.5.1I!=7)4.5.1I(4);6(4.5.16!=7){8 a=4;8 b=1n.1O(4.1o()/4.5.16),O=0,E=0;$('1v',4.t).14(9(i){O+=a.T(4,b);6(i+1<a.C)E=O});4.t.y(4.O,O+'U');4.t.y(4.E,-E+'U')}4.15(4.C,F)},2T:9(){4.Q=1g;4.1e()},2U:9(){4.Q=F;4.1e()},u:9(s){6(s!=L){4.5.u=s;6(!4.Q)4.1e()}z 4.5.u},2V:9(i,a){6(a==L||!a)a=i;6(4.5.u!==7&&a>4.5.u)a=4.5.u;1k(8 j=i;j<=a;j++){8 e=4.M(j);6(!e.K||e.1m('A-1b-1B'))z F}z 1g},M:9(i){z $('.A-1b-'+i,4.t)},2x:9(i,s){8 e=4.M(i),1S=0,2x=0;6(e.K==0){8 c,e=4.1C(i),j=r.I(i);1q(c=4.M(--j)){6(j<=0||c.K){j<=0?4.t.2y(e):c.1T(e);1l}}}X 1S=4.T(e);e.1t(4.J('A-1b-1B'));1U s=='2W'?e.2X(s):e.2w().2Y(s);8 a=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 b=4.T(e,a)-1S;6(i>0&&i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))-b+'U');4.t.y(4.O,r.I(4.t.y(4.O))+b+'U');z e},1V:9(i){8 e=4.M(i);6(!e.K||(i>=4.C&&i<=4.G))z;8 d=4.T(e);6(i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))+d+'U');e.1V();4.t.y(4.O,r.I(4.t.y(4.O))-d+'U')},19:9(){4.1D();6(4.P!=7&&!4.Z)4.1W(F);X 4.15(((4.5.B=='1X'||4.5.B=='G')&&4.5.u!=7&&4.G==4.5.u)?1:4.C+4.5.15)},11:9(){4.1D();6(4.P!=7&&4.Z)4.1W(1g);X 4.15(((4.5.B=='1X'||4.5.B=='C')&&4.5.u!=7&&4.C==1)?4.5.u:4.C-4.5.15)},1W:9(b){6(4.Q||4.1a||!4.P)z;8 a=r.I(4.t.y(4.E));!b?a-=4.P:a+=4.P;4.Z=!b;4.Y=4.C;4.12=4.G;4.1p(a)},15:9(i,a){6(4.Q||4.1a)z;4.1p(4.1A(i),a)},1A:9(i){6(4.Q||4.1a)z;i=r.I(i);6(4.5.B!='1c')i=i<1?1:(4.5.u&&i>4.5.u?4.5.u:i);8 a=4.C>i;8 b=r.I(4.t.y(4.E));8 f=4.5.B!='1c'&&4.C<=1?1:4.C;8 c=a?4.M(f):4.M(4.G);8 j=a?f:f-1;8 e=7,l=0,p=F,d=0;1q(a?--j>=i:++j<i){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c[a?'1u':'1T'](e)}c=e;d=4.T(e);6(p)l+=d;6(4.C!=7&&(4.5.B=='1c'||(j>=1&&(4.5.u==7||j<=4.5.u))))b=a?b+d:b-d}8 g=4.1o();8 h=[];8 k=0,j=i,v=0;8 c=4.M(i-1);1q(++k){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c.K==0?4.t.2y(e):c[a?'1u':'1T'](e)}c=e;8 d=4.T(e);6(d==0){2Z('30: 31 1N/2f 32 1k 33. 34 35 36 37 38 39. 3a...');z 0}6(4.5.B!='1c'&&4.5.u!==7&&j>4.5.u)h.3b(e);X 6(p)l+=d;v+=d;6(v>=g)1l;j++}1k(8 x=0;x<h.K;x++)h[x].1V();6(l>0){4.t.y(4.O,4.T(4.t)+l+'U');6(a){b-=l;4.t.y(4.E,r.I(4.t.y(4.E))-l+'U')}}8 n=i+k-1;6(4.5.B!='1c'&&4.5.u&&n>4.5.u)n=4.5.u;6(j>n){k=0,j=n,v=0;1q(++k){8 e=4.M(j--);6(!e.K)1l;v+=4.T(e);6(v>=g)1l}}8 o=n-k+1;6(4.5.B!='1c'&&o<1)o=1;6(4.Z&&a){b+=4.P;4.Z=F}4.P=7;6(4.5.B!='1c'&&n==4.5.u&&(n-k+1)>=1){8 m=r.10(4.M(n),!4.5.W?'1r':'1Y');6((v-m)>g)4.P=v-g-m}1q(i--\>o)b+=4.T(4.M(i));4.Y=4.C;4.12=4.G;4.C=o;4.G=n;z b},1p:9(p,a){6(4.Q||4.1a)z;4.1a=1g;8 b=4;8 c=9(){b.1a=F;6(p==0)b.t.y(b.E,0);6(b.5.B=='1X'||b.5.B=='G'||b.5.u==7||b.G<b.5.u)b.2z();b.1e();b.1Z('2A')};4.1Z('3c');6(!4.5.1H||a==F){4.t.y(4.E,p+'U');c()}X{8 o=!4.5.W?{'2g':p}:{'2h':p};4.t.1p(o,4.5.1H,4.5.24,c)}},2z:9(s){6(s!=L)4.5.1i=s;6(4.5.1i==0)z 4.1D();6(4.1f!=7)z;8 a=4;4.1f=3d(9(){a.19()},4.5.1i*3e)},1D:9(){6(4.1f==7)z;3f(4.1f);4.1f=7},1e:9(n,p){6(n==L||n==7){8 n=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='C')||4.5.u==7||4.G<4.5.u);6(!4.Q&&(!4.5.B||4.5.B=='C')&&4.5.u!=7&&4.G>=4.5.u)n=4.P!=7&&!4.Z}6(p==L||p==7){8 p=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='G')||4.C>1);6(!4.Q&&(!4.5.B||4.5.B=='G')&&4.5.u!=7&&4.C==1)p=4.P!=7&&4.Z}8 a=4;4.R[n?'1y':'1R'](4.5.2c,4.2n)[n?'1t':'V'](4.J('A-19-1E')).20('1E',n?F:1g);4.S[p?'1y':'1R'](4.5.2e,4.2o)[p?'1t':'V'](4.J('A-11-1E')).20('1E',p?F:1g);6(4.R.K>0&&(4.R[0].1h==L||4.R[0].1h!=n)&&4.5.1L!=7){4.R.14(9(){a.5.1L(a,4,n)});4.R[0].1h=n}6(4.S.K>0&&(4.S[0].1h==L||4.S[0].1h!=p)&&4.5.1M!=7){4.S.14(9(){a.5.1M(a,4,p)});4.S[0].1h=p}},1Z:9(a){8 b=4.Y==7?'2q':(4.Y<4.C?'19':'11');4.13('25',a,b);6(4.Y!==4.C){4.13('26',a,b,4.C);4.13('27',a,b,4.Y)}6(4.12!==4.G){4.13('28',a,b,4.G);4.13('29',a,b,4.12)}4.13('2a',a,b,4.C,4.G,4.Y,4.12);4.13('2b',a,b,4.Y,4.12,4.C,4.G)},13:9(a,b,c,d,e,f,g){6(4.5[a]==L||(1U 4.5[a]!='2B'&&b!='2A'))z;8 h=1U 4.5[a]=='2B'?4.5[a][b]:4.5[a];6(!$.3g(h))z;8 j=4;6(d===L)h(j,c,b);X 6(e===L)4.M(d).14(9(){h(j,4,d,c,b)});X{1k(8 i=d;i<=e;i++)6(i!==7&&!(i>=f&&i<=g))4.M(i).14(9(){h(j,4,i,c,b)})}},1C:9(i){z 4.1P('<1v></1v>',i)},1P:9(e,i){8 a=$(e).V(4.J('A-1b')).V(4.J('A-1b-'+i));a.20('3h',i);z a},J:9(c){z c+' '+c+(!4.5.W?'-3i':'-W')},T:9(e,d){8 a=e.2C!=L?e[0]:e;8 b=!4.5.W?a.1F+r.10(a,'2D')+r.10(a,'1r'):a.2E+r.10(a,'2F')+r.10(a,'1Y');6(d==L||b==d)z b;8 w=!4.5.W?d-r.10(a,'2D')-r.10(a,'1r'):d-r.10(a,'2F')-r.10(a,'1Y');$(a).y(4.O,w+'U');z 4.T(a)},1o:9(){z!4.5.W?4.H[0].1F-r.I(4.H.y('3j'))-r.I(4.H.y('3k')):4.H[0].2E-r.I(4.H.y('3l'))-r.I(4.H.y('3m'))},3n:9(i,s){6(s==L)s=4.5.u;z 1n.3o((((i-1)/s)-1n.3p((i-1)/s))*s)+1}});r.17({3q:9(d){z $.17(q,d||{})},10:9(e,p){6(!e)z 0;8 a=e.2C!=L?e[0]:e;6(p=='1r'&&$.2r.2s){8 b={'1w':'1x','3r':'3s','1N':'1i'},21,22;$.2G(a,b,9(){21=a.1F});b['1r']=0;$.2G(a,b,9(){22=a.1F});z 22-21}z r.I($.y(a,p))},I:9(v){v=3t(v);z 3u(v)?0:v}})})(3v);",
    62, 218, "||||this|options|if|null|var|function||||||||||||||||||||list|size||||css|return|jcarousel|wrap|first|container|lt|false|last|clip|intval|className|length|undefined|get|div|wh|tail|locked|buttonNext|buttonPrev|dimension|px|addClass|vertical|else|prevFirst|inTail|margin|prev|prevLast|callback|each|scroll|visible|extend|parent|next|animating|item|circular|split|buttons|timer|true|jcarouselstate|auto|initCallback|for|break|hasClass|Math|clipping|animate|while|marginRight|fn|removeClass|before|li|display|block|bind|setup|pos|placeholder|create|stopAuto|disabled|offsetWidth|offset|animation|reloadCallback|buttonNextHTML|buttonPrevHTML|buttonNextCallback|buttonPrevCallback|width|ceil|format|funcResize|unbind|old|after|typeof|remove|scrollTail|both|marginBottom|notify|attr|oWidth|oWidth2|start|easing|itemLoadCallback|itemFirstInCallback|itemFirstOutCallback|itemLastInCallback|itemLastOutCallback|itemVisibleInCallback|itemVisibleOutCallback|buttonNextEvent|click|buttonPrevEvent|height|left|top|indexOf|skin|nodeName|ul|ol|funcNext|funcPrev|reload|init|browser|safari|window|resize|reset|empty|add|prepend|startAuto|onAfterAnimation|object|jquery|marginLeft|offsetHeight|marginTop|swap|new|normal|swing|UL|OL|find|class|children|load|prototype|0px|10px|lock|unlock|has|string|html|append|alert|jCarousel|No|set|items|This|will|cause|an|infinite|loop|Aborting|push|onBeforeAnimation|setTimeout|1000|clearTimeout|isFunction|jcarouselindex|horizontal|borderLeftWidth|borderRightWidth|borderTopWidth|borderBottomWidth|index|round|floor|defaults|float|none|parseInt|isNaN|jQuery".split("|"),
    0, {}));
(function (b) {
    b.alerts = {
        verticalOffset: -75,
        horizontalOffset: 0,
        repositionOnResize: true,
        overlayOpacity: 0.01,
        overlayColor: "#FFF",
        draggable: true,
        okButton: "&nbsp;Delete&nbsp;",
        cancelButton: "&nbsp;Cancel&nbsp;",
        dialogClass: null,
        alert: function (c, e, f) {
            if (e == null) e = "Alert";
            b.alerts._show(e, c, null, "alert", function (g) {
                f && f(g)
            })
        },
        confirm: function (c, e, f) {
            if (e == null) e = "Confirm";
            b.alerts._show(e, c, null, "confirm", function (g) {
                f && f(g)
            })
        },
        prompt: function (c, e, f, g) {
            if (f == null) f = "Prompt";
            b.alerts._show(f, c, e, "prompt", function (d) {
                g &&
                    g(d)
            })
        },
        _show: function (c, e, f, g, d) {
            b.alerts._hide();
            b.alerts._overlay("show");
            b("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');
            b.alerts.dialogClass && b("#popup_container").addClass(b.alerts.dialogClass);
            var h = b.browser.msie && parseInt(b.browser.version) <= 6 ? "absolute" : "fixed";
            b("#popup_container").css({
                position: h,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });
            b("#popup_title").text(c);
            b("#popup_content").addClass(g);
            b("#popup_message").text(e);
            b("#popup_message").html(b("#popup_message").text().replace(/\n/g, "<br />"));
            b("#popup_container").css({
                minWidth: b("#popup_container").outerWidth(),
                maxWidth: b("#popup_container").outerWidth()
            });
            b.alerts._reposition();
            b.alerts._maintainPosition(true);
            switch (g) {
            case "alert":
                b("#popup_message").after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /></div>');
                b("#popup_ok").click(function () {
                    b.alerts._hide();
                    d(true)
                });
                b("#popup_ok").focus().keypress(function (k) {
                    if (k.keyCode ==
                        13 || k.keyCode == 27) b("#popup_ok").trigger("click")
                });
                break;
            case "confirm":
                b("#popup_message").after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>');
                b("#popup_ok").click(function () {
                    b.alerts._hide();
                    d && d(true)
                });
                b("#popup_cancel").click(function () {
                    b.alerts._hide();
                    d && d(false)
                });
                b("#popup_ok").focus();
                b("#popup_ok, #popup_cancel").keypress(function (k) {
                    k.keyCode == 13 && b("#popup_ok").trigger("click");
                    k.keyCode == 27 && b("#popup_cancel").trigger("click")
                });
                break;
            case "prompt":
                b("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>');
                b("#popup_prompt").width(b("#popup_message").width());
                b("#popup_ok").click(function () {
                    var k = b("#popup_prompt").val();
                    b.alerts._hide();
                    d && d(k)
                });
                b("#popup_cancel").click(function () {
                    b.alerts._hide();
                    d && d(null)
                });
                b("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (k) {
                    k.keyCode == 13 && b("#popup_ok").trigger("click");
                    k.keyCode == 27 && b("#popup_cancel").trigger("click")
                });
                f && b("#popup_prompt").val(f);
                b("#popup_prompt").focus().select();
                break
            }
            if (b.alerts.draggable) try {
                    b("#popup_container").draggable({
                        handle: b("#popup_title")
                    });
                    b("#popup_title").css({
                        cursor: "move"
                    })
            } catch (j) {}
        },
        _hide: function () {
            b("#popup_container").remove();
            b.alerts._overlay("hide");
            b.alerts._maintainPosition(false)
        },
        _overlay: function (c) {
            switch (c) {
            case "show":
                b.alerts._overlay("hide");
                b("BODY").append('<div id="popup_overlay"></div>');
                b("#popup_overlay").css({
                    position: "absolute",
                    zIndex: 99998,
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: b(document).height(),
                    background: b.alerts.overlayColor,
                    opacity: b.alerts.overlayOpacity
                });
                break;
            case "hide":
                b("#popup_overlay").remove();
                break
            }
        },
        _reposition: function () {
            var c = b(window).height() / 2 - b("#popup_container").outerHeight() / 2 + b.alerts.verticalOffset,
                e = b(window).width() / 2 - b("#popup_container").outerWidth() / 2 + b.alerts.horizontalOffset;
            if (c < 0) c = 0;
            if (e < 0) e = 0;
            if (b.browser.msie && parseInt(b.browser.version) <= 6) c += b(window).scrollTop();
            b("#popup_container").css({
                top: c + "px",
                left: e + "px"
            });
            b("#popup_overlay").height(b(document).height())
        },
        _maintainPosition: function (c) {
            if (b.alerts.repositionOnResize) switch (c) {
                case true:
                    b(window).bind("resize", b.alerts._reposition);
                    break;
                case false:
                    b(window).unbind("resize", b.alerts._reposition);
                    break
            }
        }
    };
    jAlert = function (c, e, f) {
        b.alerts.alert(c, e, f)
    };
    jConfirm = function (c, e, f) {
        b.alerts.confirm(c, e, f)
    };
    jPrompt = function (c,
        e, f, g) {
        b.alerts.prompt(c, e, f, g)
    }
})(jQuery);
(function (b) {
    b.fn.tipsy = function (c) {
        c = b.extend({}, b.fn.tipsy.defaults, c);
        return this.each(function () {
            var e = b.fn.tipsy.elementOptions(this, c);
            b(this).hover(function () {
                b.data(this, "cancel.tipsy", true);
                var f = b.data(this, "active.tipsy");
                if (!f) {
                    f = b('<div class="tipsy"><div class="tipsy-inner"/></div>');
                    f.css({
                        position: "absolute",
                        zIndex: 1E5
                    });
                    b.data(this, "active.tipsy", f)
                }
                if (b(this).attr("title") || typeof b(this).attr("original-title") != "string") b(this).attr("original-title", b(this).attr("title") || "").removeAttr("title");
                var g;
                if (typeof e.title == "string") g = b(this).attr(e.title == "title" ? "original-title" : e.title);
                else if (typeof e.title == "function") g = e.title.call(this);
                f.find(".tipsy-inner")[e.html ? "html" : "text"](g || e.fallback);
                g = b.extend({}, b(this).offset(), {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                });
                f.get(0).className = "tipsy";
                f.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).appendTo(document.body);
                var d = f[0].offsetWidth,
                    h = f[0].offsetHeight;
                switch ((typeof e.gravity == "function" ? e.gravity.call(this) :
                    e.gravity).charAt(0)) {
                case "n":
                    f.css({
                        top: g.top + g.height,
                        left: g.left + g.width / 2 - d / 2
                    }).addClass("tipsy-north");
                    break;
                case "s":
                    f.css({
                        top: g.top - h,
                        left: g.left + g.width / 2 - d / 2
                    }).addClass("tipsy-south");
                    break;
                case "e":
                    f.css({
                        top: g.top + g.height / 2 - h / 2,
                        left: g.left - d
                    }).addClass("tipsy-east");
                    break;
                case "w":
                    f.css({
                        top: g.top + g.height / 2 - h / 2,
                        left: g.left + g.width
                    }).addClass("tipsy-west");
                    break
                }
                e.fade ? f.css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: 0.8
                }) : f.css({
                    visibility: "visible"
                })
            }, function () {
                b.data(this,
                    "cancel.tipsy", false);
                var f = this;
                setTimeout(function () {
                    if (!b.data(this, "cancel.tipsy")) {
                        var g = b.data(f, "active.tipsy");
                        e.fade ? g.stop().fadeOut(function () {
                            b(this).remove()
                        }) : g.remove()
                    }
                }, 100)
            })
        })
    };
    b.fn.tipsy.elementOptions = function (c, e) {
        return b.metadata ? b.extend({}, e, b(c).metadata()) : e
    };
    b.fn.tipsy.defaults = {
        fade: false,
        fallback: "",
        gravity: "n",
        html: false,
        title: "title"
    };
    b.fn.tipsy.autoNS = function () {
        return b(this).offset().top > b(document).scrollTop() + b(window).height() / 2 ? "s" : "n"
    };
    b.fn.tipsy.autoWE = function () {
        return b(this).offset().left >
            b(document).scrollLeft() + b(window).width() / 2 ? "e" : "w"
    }
})(jQuery);
new(function (b) {
    var c = b.separator || "&",
        e = b.spaces === false ? false : true,
        f = (b.prefix === false ? false : true) ? b.hash === true ? "#" : "?" : "",
        g = b.numbers === false ? false : true;
    jQuery.query = new(function () {
        var d = function (l, r) {
            return l != undefined && l !== null && (r ? l.constructor == r : true)
        }, h = function (l) {
                for (var r = /\[([^[]*)\]/g, u = /^([^[]+)(\[.*\])?$/.exec(l), o = u[1], m = []; l = r.exec(u[2]);) m.push(l[1]);
                return [o, m]
            }, j = function (l, r, u) {
                var o = r.shift();
                if (typeof l != "object") l = null;
                if (o === "") {
                    l || (l = []);
                    if (d(l, Array)) l.push(r.length ==
                            0 ? u : j(null, r.slice(0), u));
                    else if (d(l, Object)) {
                        for (o = 0; l[o++] != null;);
                        l[--o] = r.length == 0 ? u : j(l[o], r.slice(0), u)
                    } else {
                        l = [];
                        l.push(r.length == 0 ? u : j(null, r.slice(0), u))
                    }
                } else if (o && o.match(/^\s*[0-9]+\s*$/)) {
                    var m = parseInt(o, 10);
                    l || (l = []);
                    l[m] = r.length == 0 ? u : j(l[m], r.slice(0), u)
                } else if (o) {
                    m = o.replace(/^\s*|\s*$/g, "");
                    l || (l = {});
                    if (d(l, Array)) {
                        var s = {};
                        for (o = 0; o < l.length; ++o) s[o] = l[o];
                        l = s
                    }
                    l[m] = r.length == 0 ? u : j(l[m], r.slice(0), u)
                } else return u;
                return l
            }, k = function (l) {
                var r = this;
                r.keys = {};
                l.queryObject ? jQuery.each(l.get(), function (u, o) {
                    r.SET(u, o)
                }) : jQuery.each(arguments, function () {
                    var u = "" + this;
                    u = u.replace(/^[?#]/, "");
                    u = u.replace(/[;&]$/, "");
                    if (e) u = u.replace(/[+]/g, " ");
                    jQuery.each(u.split(/[&;]/), function () {
                        var o = decodeURIComponent(this.split("=")[0] || ""),
                            m = decodeURIComponent(this.split("=")[1] || "");
                        if (o) {
                            if (g) if (/^[+-]?[0-9]+\.[0-9]*$/.test(m)) m = parseFloat(m);
                                else if (/^[+-]?[0-9]+$/.test(m)) m = parseInt(m, 10);
                            m = !m && m !== 0 ? true : m;
                            if (m !== false && m !== true && typeof m != "number") m = m;
                            r.SET(o, m)
                        }
                    })
                });
                return r
            };
        k.prototype = {
            queryObject: true,
            has: function (l, r) {
                l = this.get(l);
                return d(l, r)
            },
            GET: function (l) {
                if (!d(l)) return this.keys;
                var r = h(l);
                l = r[1];
                for (r = this.keys[r[0]]; r != null && l.length != 0;) r = r[l.shift()];
                return typeof r == "number" ? r : r || ""
            },
            get: function (l) {
                l = this.GET(l);
                if (d(l, Object)) return jQuery.extend(true, {}, l);
                else if (d(l, Array)) return l.slice(0);
                return l
            },
            SET: function (l, r) {
                r = !d(r) ? null : r;
                l = h(l);
                var u = l[0];
                this.keys[u] = j(this.keys[u], l[1].slice(0), r);
                return this
            },
            set: function (l, r) {
                return this.copy().SET(l, r)
            },
            REMOVE: function (l) {
                return this.SET(l,
                    null).COMPACT()
            },
            remove: function (l) {
                return this.copy().REMOVE(l)
            },
            EMPTY: function () {
                var l = this;
                jQuery.each(l.keys, function (r) {
                    delete l.keys[r]
                });
                return l
            },
            load: function (l) {
                var r = l.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
                    u = l.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new k(l.length == u.length ? "" : u, l.length == r.length ? "" : r)
            },
            empty: function () {
                return this.copy().EMPTY()
            },
            copy: function () {
                return new k(this)
            },
            COMPACT: function () {
                function l(r) {
                    var u = typeof r == "object" ? d(r, Array) ? [] : {} : r;
                    if (typeof r == "object") {
                        function o(m,
                            s, v) {
                            if (d(m, Array)) m.push(v);
                            else m[s] = v
                        }
                        jQuery.each(r, function (m, s) {
                            if (!d(s)) return true;
                            o(u, m, l(s))
                        })
                    }
                    return u
                }
                this.keys = l(this.keys);
                return this
            },
            compact: function () {
                return this.copy().COMPACT()
            },
            toString: function () {
                var l = [],
                    r = [],
                    u = function (s) {
                        s += "";
                        if (e) s = s.replace(/ /g, "+");
                        return encodeURIComponent(s)
                    }, o = function (s, v, x) {
                        if (!(!d(x) || x === false)) {
                            v = [u(v)];
                            if (x !== true) {
                                v.push("=");
                                v.push(u(x))
                            }
                            s.push(v.join(""))
                        }
                    }, m = function (s, v) {
                        var x = function (A) {
                            return !v || v == "" ? "" + A : [v, "[", A, "]"].join("")
                        };
                        jQuery.each(s, function (A, D) {
                            typeof D == "object" ? m(D, x(A)) : o(r, x(A), D)
                        })
                    };
                m(this.keys);
                r.length > 0 && l.push(f);
                l.push(r.join(c));
                return l.join("")
            }
        };
        return new k(location.search, location.hash)
    })
})(jQuery.query || {});
(function (b) {
    function c() {
        var h = e(this);
        isNaN(h.datetime) || b(this).text(f(h.datetime));
        return this
    }
    function e(h) {
        h = b(h);
        if (!h.data("timeago")) {
            h.data("timeago", {
                datetime: d.datetime(h)
            });
            var j = b.trim(h.text());
            j.length > 0 && h.attr("title", j)
        }
        return h.data("timeago")
    }
    function f(h) {
        return d.inWords(g(h))
    }
    function g(h) {
        return (new Date).getTime() - h.getTime()
    }
    b.timeago = function (h) {
        return h instanceof Date ? f(h) : typeof h == "string" ? f(b.timeago.parse(h)) : f(b.timeago.datetime(h))
    };
    var d = b.timeago;
    b.extend(b.timeago, {
        settings: {
            refreshMillis: 6E4,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (h) {
            function j(v, x) {
                return (b.isFunction(v) ? v(x) : v).replace(/%d/i, k.numbers && k.numbers[x] || x)
            }
            var k = this.settings.strings,
                l = k.prefixAgo,
                r = k.suffixAgo;
            if (this.settings.allowFuture) {
                if (h < 0) {
                    l = k.prefixFromNow;
                    r = k.suffixFromNow
                }
                h = Math.abs(h)
            }
            h = h / 1E3;
            var u = h / 60,
                o = u / 60,
                m = o / 24,
                s = m / 365;
            h = h < 45 && j(k.seconds, Math.round(h)) || h < 90 && j(k.minute, 1) || u < 45 && j(k.minutes, Math.round(u)) || u < 90 && j(k.hour, 1) || o < 24 && j(k.hours, Math.round(o)) || o < 48 && j(k.day, 1) || m < 30 && j(k.days, Math.floor(m)) || m < 60 && j(k.month, 1) || m < 365 && j(k.months, Math.floor(m / 30)) || s < 2 && j(k.year, 1) || j(k.years, Math.floor(s));
            return b.trim([l, h, r].join(" "))
        },
        parse: function (h) {
            h =
                b.trim(h);
            h = h.replace(/-/, "/").replace(/-/, "/");
            h = h.replace(/T/, " ").replace(/Z/, " UTC");
            h = h.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            h = h.replace(/(\.\d+)/, "");
            return new Date(h)
        },
        datetime: function (h) {
            h = b(h).get(0).tagName.toLowerCase() == "time" ? b(h).attr("datetime") : b(h).attr("title");
            return d.parse(h)
        }
    });
    b.fn.timeago = function () {
        var h = this;
        h.each(c);
        var j = d.settings;
        j.refreshMillis > 0 && setInterval(function () {
            h.each(c)
        }, j.refreshMillis);
        return h
    };
    document.createElement("abbr");
    document.createElement("time")
})(jQuery);
(function (b) {
    b.pageless = function (c) {
        b.isFunction(c) ? c.call() : b.pageless.init(c)
    };
    b.pageless.settings = {
        currentPage: 1,
        pagination: ".pagination",
        url: location.href,
        params: {},
        distance: 100,
        loaderImage: "",
        marker: null,
        scrape: function (c) {
            return c
        }
    };
    b.pageless.loaderHtml = function () {
        return b.pageless.settings.loaderHtml || '<div id="pageless-loader" style="display:none;text-align:center;width:100%;"></div>'
    };
    b.pageless.init = function (c) {
        if (!b.pageless.settings.inited) {
            b.pageless.settings.inited = true;
            c && b.extend(b.pageless.settings,
                c);
            b.pageless.settings.pagination && b(b.pageless.settings.pagination).remove();
            b.pageless.startListener()
        }
    };
    b.pageless.isLoading = false;
    b.fn.pageless = function (c) {
        b.pageless.init(c);
        b.pageless.el = b(this);
        if (c.loader && b(this).find(c.loader).length) b.pageless.loader = b(this).find(c.loader);
        else {
            b.pageless.loader = b(b.pageless.loaderHtml());
            b(this).append(b.pageless.loader);
            c.loaderHtml || b("#pageless-loader .msg").html(c.loaderMsg)
        }
    };
    b.pageless.loading = function (c) {
        if (c === true) {
            b.pageless.isLoading = true;
            b.pageless.loader &&
                b.pageless.loader.fadeIn("normal")
        } else {
            b.pageless.isLoading = false;
            b.pageless.loader && b.pageless.loader.fadeOut("normal")
        }
    };
    b.pageless.stopListener = function () {
        b(window).unbind(".pageless");
        b("#" + b.pageless.settings.loader).hide()
    };
    b.pageless.startListener = function () {
        b(window).bind("scroll.pageless", b.pageless.scroll);
        b("#" + b.pageless.settings.loader).show()
    };
    b.pageless.scroll = function () {
        if (b.pageless.settings.totalPages <= b.pageless.settings.currentPage) {
            b.pageless.stopListener();
            b.pageless.settings.afterStopListener &&
                b.pageless.settings.afterStopListener.call()
        } else {
            var c = b(document).height() - b(window).scrollTop() - b(window).height();
            if (!b.pageless.isLoading && c < b.pageless.settings.distance) {
                b.pageless.loading(true);
                b.pageless.settings.currentPage++;
                b.extend(b.pageless.settings.params, {
                    page: b.pageless.settings.currentPage
                });
                b.pageless.settings.marker && b.extend(b.pageless.settings.params, {
                    marker: b.pageless.settings.marker
                });
                c = b.pageless.settings.url;
                c = c.split("#")[0];
                b.ajax({
                    url: c,
                    type: "GET",
                    dataType: "html",
                    data: b.pageless.settings.params,
                    success: function (e) {
                        e = b.pageless.settings.scrape(e);
                        b.pageless.loader ? b.pageless.loader.before(e) : b.pageless.el.append(e);
                        b.pageless.loading(false);
                        b.pageless.settings.complete && b.pageless.settings.complete.call()
                    }
                })
            }
        }
    }
})(jQuery);
(function (b) {
    b.path = {};
    var c = {
        rotate: function (e, f) {
            var g = f * 3.141592654 / 180;
            f = Math.cos(g);
            g = Math.sin(g);
            return [f * e[0] - g * e[1], g * e[0] + f * e[1]]
        },
        scale: function (e, f) {
            return [f * e[0], f * e[1]]
        },
        add: function (e, f) {
            return [e[0] + f[0], e[1] + f[1]]
        },
        minus: function (e, f) {
            return [e[0] - f[0], e[1] - f[1]]
        }
    };
    b.path.bezier = function (e) {
        e.start = b.extend({
            angle: 0,
            length: 0.3333
        }, e.start);
        e.end = b.extend({
            angle: 0,
            length: 0.3333
        }, e.end);
        this.p1 = [e.start.x, e.start.y];
        this.p4 = [e.end.x, e.end.y];
        var f = c.minus(this.p4, this.p1),
            g = c.scale(f,
                e.start.length);
        g = c.rotate(g, e.start.angle);
        this.p2 = c.add(this.p1, g);
        f = c.scale(f, -1);
        f = c.scale(f, e.end.length);
        f = c.rotate(f, e.end.angle);
        this.p3 = c.add(this.p4, f);
        this.f1 = function (d) {
            return d * d * d
        };
        this.f2 = function (d) {
            return 3 * d * d * (1 - d)
        };
        this.f3 = function (d) {
            return 3 * d * (1 - d) * (1 - d)
        };
        this.f4 = function (d) {
            return (1 - d) * (1 - d) * (1 - d)
        };
        this.css = function (d) {
            var h = this.f1(d),
                j = this.f2(d),
                k = this.f3(d);
            d = this.f4(d);
            return {
                top: this.p1[1] * h + this.p2[1] * j + this.p3[1] * k + this.p4[1] * d + "px",
                left: this.p1[0] * h + this.p2[0] * j + this.p3[0] * k + this.p4[0] * d + "px"
            }
        }
    };
    b.path.arc = function (e) {
        for (var f in e) this[f] = e[f];
        for (this.dir = this.dir || 1; this.start > this.end && this.dir > 0;) this.start -= 360;
        for (; this.start < this.end && this.dir < 0;) this.start += 360;
        this.css = function (g) {
            g = this.start * g + this.end * (1 - g);
            g = g * 3.1415927 / 180;
            var d = Math.sin(g) * this.radius + this.center[0];
            return {
                top: Math.cos(g) * this.radius + this.center[1] + "px",
                left: d + "px"
            }
        }
    };
    b.fx.step.path = function (e) {
        var f = e.end.css(1 - e.pos);
        for (var g in f) e.elem.style[g] = f[g]
    }
})(jQuery);
(function () {
    var b = jQuery.event.special,
        c = "D" + +new Date;
    b.scrollstop = {
        latency: 300,
        setup: function () {
            var e, f = function (g) {
                    var d = this,
                        h = arguments;
                    e && clearTimeout(e);
                    e = setTimeout(function () {
                        e = null;
                        g.type = "scrollstop";
                        jQuery.event.handle.apply(d, h)
                    }, b.scrollstop.latency)
                };
            jQuery(this).bind("scroll", f).data(c, f)
        },
        teardown: function () {
            jQuery(this).unbind("scroll", jQuery(this).data(c))
        }
    }
})();
(function () {
    function b(q, w, y) {
        if (q === w) return q !== 0 || 1 / q == 1 / w;
        if (q == null || w == null) return q === w;
        if (q._chain) q = q._wrapped;
        if (w._chain) w = w._wrapped;
        if (q.isEqual && n.isFunction(q.isEqual)) return q.isEqual(w);
        if (w.isEqual && n.isFunction(w.isEqual)) return w.isEqual(q);
        var C = k.call(q);
        if (C != k.call(w)) return false;
        switch (C) {
        case "[object String]":
            return q == String(w);
        case "[object Number]":
            return q != +q ? w != +w : q == 0 ? 1 / q == 1 / w : q == +w;
        case "[object Date]":
        case "[object Boolean]":
            return +q == +w;
        case "[object RegExp]":
            return q.source ==
                w.source && q.global == w.global && q.multiline == w.multiline && q.ignoreCase == w.ignoreCase
        }
        if (typeof q != "object" || typeof w != "object") return false;
        for (var G = y.length; G--;) if (y[G] == q) return true;
        y.push(q);
        G = 0;
        var H = true;
        if (C == "[object Array]") {
            G = q.length;
            if (H = G == w.length) for (; G--;) if (!(H = G in q == G in w && b(q[G], w[G], y))) break
        } else {
            if ("constructor" in q != "constructor" in w || q.constructor != w.constructor) return false;
            for (var J in q) if (n.has(q, J)) {
                    G++;
                    if (!(H = n.has(w, J) && b(q[J], w[J], y))) break
                }
            if (H) {
                for (J in w) if (n.has(w,
                        J) && !G--) break;
                H = !G
            }
        }
        y.pop();
        return H
    }
    var c = this,
        e = c._,
        f = {}, g = Array.prototype,
        d = Object.prototype,
        h = g.slice,
        j = g.unshift,
        k = d.toString,
        l = d.hasOwnProperty,
        r = g.forEach,
        u = g.map,
        o = g.reduce,
        m = g.reduceRight,
        s = g.filter,
        v = g.every,
        x = g.some,
        A = g.indexOf,
        D = g.lastIndexOf;
    d = Array.isArray;
    var I = Object.keys,
        p = Function.prototype.bind,
        n = function (q) {
            return new L(q)
        };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) exports = module.exports = n;
        exports._ = n
    } else c._ = n;
    n.VERSION = "1.3.1";
    var z = n.each =
        n.forEach = function (q, w, y) {
        if (q != null) if (r && q.forEach === r) q.forEach(w, y);
            else if (q.length === +q.length) for (var C = 0, G = q.length; C < G; C++) {
                if (C in q && w.call(y, q[C], C, q) === f) return
        } else for (C in q) if (n.has(q, C)) if (w.call(y, q[C], C, q) === f) return
    };
    n.map = n.collect = function (q, w, y) {
        var C = [];
        if (q == null) return C;
        if (u && q.map === u) return q.map(w, y);
        z(q, function (G, H, J) {
            C[C.length] = w.call(y, G, H, J)
        });
        if (q.length === +q.length) C.length = q.length;
        return C
    };
    n.reduce = n.foldl = n.inject = function (q, w, y, C) {
        var G = arguments.length >
            2;
        if (q == null) q = [];
        if (o && q.reduce === o) {
            if (C) w = n.bind(w, C);
            return G ? q.reduce(w, y) : q.reduce(w)
        }
        z(q, function (H, J, K) {
            if (G) y = w.call(C, y, H, J, K);
            else {
                y = H;
                G = true
            }
        });
        if (!G) throw new TypeError("Reduce of empty array with no initial value");
        return y
    };
    n.reduceRight = n.foldr = function (q, w, y, C) {
        var G = arguments.length > 2;
        if (q == null) q = [];
        if (m && q.reduceRight === m) {
            if (C) w = n.bind(w, C);
            return G ? q.reduceRight(w, y) : q.reduceRight(w)
        }
        var H = n.toArray(q).reverse();
        if (C && !G) w = n.bind(w, C);
        return G ? n.reduce(H, w, y, C) : n.reduce(H, w)
    };
    n.find = n.detect = function (q, w, y) {
        var C;
        B(q, function (G, H, J) {
            if (w.call(y, G, H, J)) {
                C = G;
                return true
            }
        });
        return C
    };
    n.filter = n.select = function (q, w, y) {
        var C = [];
        if (q == null) return C;
        if (s && q.filter === s) return q.filter(w, y);
        z(q, function (G, H, J) {
            if (w.call(y, G, H, J)) C[C.length] = G
        });
        return C
    };
    n.reject = function (q, w, y) {
        var C = [];
        if (q == null) return C;
        z(q, function (G, H, J) {
            w.call(y, G, H, J) || (C[C.length] = G)
        });
        return C
    };
    n.every = n.all = function (q, w, y) {
        var C = true;
        if (q == null) return C;
        if (v && q.every === v) return q.every(w, y);
        z(q, function (G,
            H, J) {
            if (!(C = C && w.call(y, G, H, J))) return f
        });
        return C
    };
    var B = n.some = n.any = function (q, w, y) {
        w || (w = n.identity);
        var C = false;
        if (q == null) return C;
        if (x && q.some === x) return q.some(w, y);
        z(q, function (G, H, J) {
            if (C || (C = w.call(y, G, H, J))) return f
        });
        return !!C
    };
    n.include = n.contains = function (q, w) {
        var y = false;
        if (q == null) return y;
        if (A && q.indexOf === A) return q.indexOf(w) != -1;
        return y = B(q, function (C) {
            return C === w
        })
    };
    n.invoke = function (q, w) {
        var y = h.call(arguments, 2);
        return n.map(q, function (C) {
            return (n.isFunction(w) ? w || C : C[w]).apply(C,
                y)
        })
    };
    n.pluck = function (q, w) {
        return n.map(q, function (y) {
            return y[w]
        })
    };
    n.max = function (q, w, y) {
        if (!w && n.isArray(q)) return Math.max.apply(Math, q);
        if (!w && n.isEmpty(q)) return -Infinity;
        var C = {
            computed: -Infinity
        };
        z(q, function (G, H, J) {
            H = w ? w.call(y, G, H, J) : G;
            H >= C.computed && (C = {
                value: G,
                computed: H
            })
        });
        return C.value
    };
    n.min = function (q, w, y) {
        if (!w && n.isArray(q)) return Math.min.apply(Math, q);
        if (!w && n.isEmpty(q)) return Infinity;
        var C = {
            computed: Infinity
        };
        z(q, function (G, H, J) {
            H = w ? w.call(y, G, H, J) : G;
            H < C.computed && (C = {
                value: G,
                computed: H
            })
        });
        return C.value
    };
    n.shuffle = function (q) {
        var w = [],
            y;
        z(q, function (C, G) {
            if (G == 0) w[0] = C;
            else {
                y = Math.floor(Math.random() * (G + 1));
                w[G] = w[y];
                w[y] = C
            }
        });
        return w
    };
    n.sortBy = function (q, w, y) {
        return n.pluck(n.map(q, function (C, G, H) {
            return {
                value: C,
                criteria: w.call(y, C, G, H)
            }
        }).sort(function (C, G) {
            C = C.criteria;
            G = G.criteria;
            return C < G ? -1 : C > G ? 1 : 0
        }), "value")
    };
    n.groupBy = function (q, w) {
        var y = {}, C = n.isFunction(w) ? w : function (G) {
                return G[w]
            };
        z(q, function (G, H) {
            H = C(G, H);
            (y[H] || (y[H] = [])).push(G)
        });
        return y
    };
    n.sortedIndex = function (q, w, y) {
        y || (y = n.identity);
        for (var C = 0, G = q.length; C < G;) {
            var H = C + G >> 1;
            y(q[H]) < y(w) ? (C = H + 1) : (G = H)
        }
        return C
    };
    n.toArray = function (q) {
        if (!q) return [];
        if (q.toArray) return q.toArray();
        if (n.isArray(q)) return h.call(q);
        if (n.isArguments(q)) return h.call(q);
        return n.values(q)
    };
    n.size = function (q) {
        return n.toArray(q).length
    };
    n.first = n.head = function (q, w, y) {
        return w != null && !y ? h.call(q, 0, w) : q[0]
    };
    n.initial = function (q, w, y) {
        return h.call(q, 0, q.length - (w == null || y ? 1 : w))
    };
    n.last = function (q, w, y) {
        return w != null && !y ?
            h.call(q, Math.max(q.length - w, 0)) : q[q.length - 1]
    };
    n.rest = n.tail = function (q, w, y) {
        return h.call(q, w == null || y ? 1 : w)
    };
    n.compact = function (q) {
        return n.filter(q, function (w) {
            return !!w
        })
    };
    n.flatten = function (q, w) {
        return n.reduce(q, function (y, C) {
            if (n.isArray(C)) return y.concat(w ? C : n.flatten(C));
            y[y.length] = C;
            return y
        }, [])
    };
    n.without = function (q) {
        return n.difference(q, h.call(arguments, 1))
    };
    n.uniq = n.unique = function (q, w, y) {
        y = y ? n.map(q, y) : q;
        var C = [];
        n.reduce(y, function (G, H, J) {
            if (0 == J || (w === true ? n.last(G) != H : !n.include(G,
                H))) {
                G[G.length] = H;
                C[C.length] = q[J]
            }
            return G
        }, []);
        return C
    };
    n.union = function () {
        return n.uniq(n.flatten(arguments, true))
    };
    n.intersection = n.intersect = function (q) {
        var w = h.call(arguments, 1);
        return n.filter(n.uniq(q), function (y) {
            return n.every(w, function (C) {
                return n.indexOf(C, y) >= 0
            })
        })
    };
    n.difference = function (q) {
        var w = n.flatten(h.call(arguments, 1));
        return n.filter(q, function (y) {
            return !n.include(w, y)
        })
    };
    n.zip = function () {
        for (var q = h.call(arguments), w = n.max(n.pluck(q, "length")), y = new Array(w), C = 0; C < w; C++) y[C] =
                n.pluck(q, "" + C);
        return y
    };
    n.indexOf = function (q, w, y) {
        if (q == null) return -1;
        var C;
        if (y) {
            y = n.sortedIndex(q, w);
            return q[y] === w ? y : -1
        }
        if (A && q.indexOf === A) return q.indexOf(w);
        y = 0;
        for (C = q.length; y < C; y++) if (y in q && q[y] === w) return y;
        return -1
    };
    n.lastIndexOf = function (q, w) {
        if (q == null) return -1;
        if (D && q.lastIndexOf === D) return q.lastIndexOf(w);
        for (var y = q.length; y--;) if (y in q && q[y] === w) return y;
        return -1
    };
    n.range = function (q, w, y) {
        if (arguments.length <= 1) {
            w = q || 0;
            q = 0
        }
        y = arguments[2] || 1;
        for (var C = Math.max(Math.ceil((w - q) /
            y), 0), G = 0, H = new Array(C); G < C;) {
            H[G++] = q;
            q += y
        }
        return H
    };
    var E = function () {};
    n.bind = function (q, w) {
        var y, C;
        if (q.bind === p && p) return p.apply(q, h.call(arguments, 1));
        if (!n.isFunction(q)) throw new TypeError;
        C = h.call(arguments, 2);
        return y = function () {
            if (!(this instanceof y)) return q.apply(w, C.concat(h.call(arguments)));
            E.prototype = q.prototype;
            var G = new E,
                H = q.apply(G, C.concat(h.call(arguments)));
            if (Object(H) === H) return H;
            return G
        }
    };
    n.bindAll = function (q) {
        var w = h.call(arguments, 1);
        if (w.length == 0) w = n.functions(q);
        z(w, function (y) {
            q[y] = n.bind(q[y], q)
        });
        return q
    };
    n.memoize = function (q, w) {
        var y = {};
        w || (w = n.identity);
        return function () {
            var C = w.apply(this, arguments);
            return n.has(y, C) ? y[C] : (y[C] = q.apply(this, arguments))
        }
    };
    n.delay = function (q, w) {
        var y = h.call(arguments, 2);
        return setTimeout(function () {
            return q.apply(q, y)
        }, w)
    };
    n.defer = function (q) {
        return n.delay.apply(n, [q, 1].concat(h.call(arguments, 1)))
    };
    n.throttle = function (q, w) {
        var y, C, G, H, J, K = n.debounce(function () {
                J = H = false
            }, w);
        return function () {
            y = this;
            C = arguments;
            var N = function () {
                G = null;
                J && q.apply(y, C);
                K()
            };
            G || (G = setTimeout(N, w));
            if (H) J = true;
            else q.apply(y, C);
            K();
            H = true
        }
    };
    n.debounce = function (q, w) {
        var y;
        return function () {
            var C = this,
                G = arguments;
            clearTimeout(y);
            y = setTimeout(function () {
                y = null;
                q.apply(C, G)
            }, w)
        }
    };
    n.once = function (q) {
        var w = false,
            y;
        return function () {
            if (w) return y;
            w = true;
            return y = q.apply(this, arguments)
        }
    };
    n.wrap = function (q, w) {
        return function () {
            var y = [q].concat(h.call(arguments, 0));
            return w.apply(this, y)
        }
    };
    n.compose = function () {
        var q = arguments;
        return function () {
            for (var w =
                arguments, y = q.length - 1; y >= 0; y--) w = [q[y].apply(this, w)];
            return w[0]
        }
    };
    n.after = function (q, w) {
        if (q <= 0) return w();
        return function () {
            if (--q < 1) return w.apply(this, arguments)
        }
    };
    n.keys = I || function (q) {
        if (q !== Object(q)) throw new TypeError("Invalid object");
        var w = [];
        for (var y in q) if (n.has(q, y)) w[w.length] = y;
        return w
    };
    n.values = function (q) {
        return n.map(q, n.identity)
    };
    n.functions = n.methods = function (q) {
        var w = [];
        for (var y in q) n.isFunction(q[y]) && w.push(y);
        return w.sort()
    };
    n.extend = function (q) {
        z(h.call(arguments,
            1), function (w) {
            for (var y in w) q[y] = w[y]
        });
        return q
    };
    n.defaults = function (q) {
        z(h.call(arguments, 1), function (w) {
            for (var y in w) if (q[y] == null) q[y] = w[y]
        });
        return q
    };
    n.clone = function (q) {
        if (!n.isObject(q)) return q;
        return n.isArray(q) ? q.slice() : n.extend({}, q)
    };
    n.tap = function (q, w) {
        w(q);
        return q
    };
    n.isEqual = function (q, w) {
        return b(q, w, [])
    };
    n.isEmpty = function (q) {
        if (n.isArray(q) || n.isString(q)) return q.length === 0;
        for (var w in q) if (n.has(q, w)) return false;
        return true
    };
    n.isElement = function (q) {
        return !!(q && q.nodeType ==
            1)
    };
    n.isArray = d || function (q) {
        return k.call(q) == "[object Array]"
    };
    n.isObject = function (q) {
        return q === Object(q)
    };
    n.isArguments = function (q) {
        return k.call(q) == "[object Arguments]"
    };
    if (!n.isArguments(arguments)) n.isArguments = function (q) {
            return !!(q && n.has(q, "callee"))
    };
    n.isFunction = function (q) {
        return k.call(q) == "[object Function]"
    };
    n.isString = function (q) {
        return k.call(q) == "[object String]"
    };
    n.isNumber = function (q) {
        return k.call(q) == "[object Number]"
    };
    n.isNaN = function (q) {
        return q !== q
    };
    n.isBoolean = function (q) {
        return q ===
            true || q === false || k.call(q) == "[object Boolean]"
    };
    n.isDate = function (q) {
        return k.call(q) == "[object Date]"
    };
    n.isRegExp = function (q) {
        return k.call(q) == "[object RegExp]"
    };
    n.isNull = function (q) {
        return q === null
    };
    n.isUndefined = function (q) {
        return q === void 0
    };
    n.has = function (q, w) {
        return l.call(q, w)
    };
    n.noConflict = function () {
        c._ = e;
        return this
    };
    n.identity = function (q) {
        return q
    };
    n.times = function (q, w, y) {
        for (var C = 0; C < q; C++) w.call(y, C)
    };
    n.escape = function (q) {
        return ("" + q).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g,
            "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    n.mixin = function (q) {
        z(n.functions(q), function (w) {
            X(w, n[w] = q[w])
        })
    };
    var F = 0;
    n.uniqueId = function (q) {
        var w = F++;
        return q ? q + w : w
    };
    n.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var M = /.^/,
        O = function (q) {
            return q.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
        };
    n.template = function (q, w) {
        var y = n.templateSettings;
        q = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" +
            q.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(y.escape || M, function (G, H) {
            return "',_.escape(" + O(H) + "),'"
        }).replace(y.interpolate || M, function (G, H) {
            return "'," + O(H) + ",'"
        }).replace(y.evaluate || M, function (G, H) {
            return "');" + O(H).replace(/[\r\n\t]/g, " ") + ";__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
        var C = new Function("obj", "_", q);
        if (w) return C(w, n);
        return function (G) {
            return C.call(this, G, n)
        }
    };
    n.chain = function (q) {
        return n(q).chain()
    };
    var L = function (q) {
        this._wrapped =
            q
    };
    n.prototype = L.prototype;
    var S = function (q, w) {
        return w ? n(q).chain() : q
    }, X = function (q, w) {
            L.prototype[q] = function () {
                var y = h.call(arguments);
                j.call(y, this._wrapped);
                return S(w.apply(n, y), this._chain)
            }
        };
    n.mixin(n);
    z(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (q) {
        var w = g[q];
        L.prototype[q] = function () {
            var y = this._wrapped;
            w.apply(y, arguments);
            var C = y.length;
            if ((q == "shift" || q == "splice") && C === 0) delete y[0];
            return S(y, this._chain)
        }
    });
    z(["concat", "join", "slice"], function (q) {
        var w = g[q];
        L.prototype[q] = function () {
            return S(w.apply(this._wrapped, arguments), this._chain)
        }
    });
    L.prototype.chain = function () {
        this._chain = true;
        return this
    };
    L.prototype.value = function () {
        return this._wrapped
    }
}).call(this);
(function () {
    var b = this,
        c = b.Backbone,
        e = Array.prototype.slice,
        f = Array.prototype.splice,
        g;
    g = typeof exports !== "undefined" ? exports : (b.Backbone = {});
    g.VERSION = "0.9.1";
    var d = b._;
    if (!d && typeof require !== "undefined") d = require("underscore");
    var h = b.jQuery || b.Zepto || b.ender;
    g.setDomLibrary = function (p) {
        h = p
    };
    g.noConflict = function () {
        b.Backbone = c;
        return this
    };
    g.emulateHTTP = false;
    g.emulateJSON = false;
    g.Events = {
        on: function (p, n, z) {
            var B;
            p = p.split(/\s+/);
            for (var E = this._callbacks || (this._callbacks = {}); B = p.shift();) {
                B =
                    E[B] || (E[B] = {});
                var F = B.tail || (B.tail = B.next = {});
                F.callback = n;
                F.context = z;
                B.tail = F.next = {}
            }
            return this
        },
        off: function (p, n, z) {
            var B, E, F;
            if (p) {
                if (E = this._callbacks) for (p = p.split(/\s+/); B = p.shift();) {
                        F = E[B];
                        delete E[B];
                        if (n && F) for (;
                            (F = F.next) && F.next;) F.callback === n && (!z || F.context === z) || this.on(B, F.callback, F.context)
                }
            } else delete this._callbacks;
            return this
        },
        trigger: function (p) {
            var n, z, B, E;
            if (!(z = this._callbacks)) return this;
            B = z.all;
            for ((p = p.split(/\s+/)).push(null); n = p.shift();) {
                B && p.push({
                    next: B.next,
                    tail: B.tail,
                    event: n
                });
                if (n = z[n]) p.push({
                        next: n.next,
                        tail: n.tail
                    })
            }
            for (E = e.call(arguments, 1); n = p.pop();) {
                z = n.tail;
                for (B = n.event ? [n.event].concat(E) : E;
                (n = n.next) !== z;) n.callback.apply(n.context || this, B)
            }
            return this
        }
    };
    g.Events.bind = g.Events.on;
    g.Events.unbind = g.Events.off;
    g.Model = function (p, n) {
        var z;
        p || (p = {});
        if (n && n.parse) p = this.parse(p);
        if (z = D(this, "defaults")) p = d.extend({}, z, p);
        if (n && n.collection) this.collection = n.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = d.uniqueId("c");
        if (!this.set(p, {
            silent: true
        })) throw new Error("Can't create an invalid model");
        delete this._changed;
        this._previousAttributes = d.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    d.extend(g.Model.prototype, g.Events, {
        idAttribute: "id",
        initialize: function () {},
        toJSON: function () {
            return d.clone(this.attributes)
        },
        get: function (p) {
            return this.attributes[p]
        },
        escape: function (p) {
            var n;
            if (n = this._escapedAttributes[p]) return n;
            n = this.attributes[p];
            return this._escapedAttributes[p] = d.escape(n == null ? "" : "" + n)
        },
        has: function (p) {
            return this.attributes[p] !=
                null
        },
        set: function (p, n, z) {
            var B, E;
            if (d.isObject(p) || p == null) {
                B = p;
                z = n
            } else {
                B = {};
                B[p] = n
            }
            z || (z = {});
            if (!B) return this;
            if (B instanceof g.Model) B = B.attributes;
            if (z.unset) for (E in B) B[E] = void 0;
            if (!this._validate(B, z)) return false;
            if (this.idAttribute in B) this.id = B[this.idAttribute];
            n = this.attributes;
            var F = this._escapedAttributes,
                M = this._previousAttributes || {}, O = this._setting;
            this._changed || (this._changed = {});
            this._setting = true;
            for (E in B) {
                p = B[E];
                d.isEqual(n[E], p) || delete F[E];
                z.unset ? delete n[E] : (n[E] =
                    p);
                if (this._changing && !d.isEqual(this._changed[E], p)) {
                    this.trigger("change:" + E, this, p, z);
                    this._moreChanges = true
                }
                delete this._changed[E];
                if (!d.isEqual(M[E], p) || d.has(n, E) != d.has(M, E)) this._changed[E] = p
            }
            if (!O) {
                !z.silent && this.hasChanged() && this.change(z);
                this._setting = false
            }
            return this
        },
        unset: function (p, n) {
            (n || (n = {})).unset = true;
            return this.set(p, null, n)
        },
        clear: function (p) {
            (p || (p = {})).unset = true;
            return this.set(d.clone(this.attributes), p)
        },
        fetch: function (p) {
            p = p ? d.clone(p) : {};
            var n = this,
                z = p.success;
            p.success = function (B, E, F) {
                if (!n.set(n.parse(B, F), p)) return false;
                z && z(n, B)
            };
            p.error = g.wrapError(p.error, n, p);
            return (this.sync || g.sync).call(this, "read", this, p)
        },
        save: function (p, n, z) {
            var B, E;
            if (d.isObject(p) || p == null) {
                B = p;
                z = n
            } else {
                B = {};
                B[p] = n
            }
            z = z ? d.clone(z) : {};
            if (z.wait) E = d.clone(this.attributes);
            p = d.extend({}, z, {
                silent: true
            });
            if (B && !this.set(B, z.wait ? p : z)) return false;
            var F = this,
                M = z.success;
            z.success = function (O, L, S) {
                L = F.parse(O, S);
                if (z.wait) L = d.extend(B || {}, L);
                if (!F.set(L, z)) return false;
                M ? M(F, O) :
                    F.trigger("sync", F, O, z)
            };
            z.error = g.wrapError(z.error, F, z);
            n = this.isNew() ? "create" : "update";
            n = (this.sync || g.sync).call(this, n, this, z);
            z.wait && this.set(E, p);
            return n
        },
        destroy: function (p) {
            p = p ? d.clone(p) : {};
            var n = this,
                z = p.success,
                B = function () {
                    n.trigger("destroy", n, n.collection, p)
                };
            if (this.isNew()) return B();
            p.success = function (F) {
                p.wait && B();
                z ? z(n, F) : n.trigger("sync", n, F, p)
            };
            p.error = g.wrapError(p.error, n, p);
            var E = (this.sync || g.sync).call(this, "delete", this, p);
            p.wait || B();
            return E
        },
        url: function () {
            var p =
                D(this.collection, "url") || D(this, "urlRoot") || I();
            if (this.isNew()) return p;
            return p + (p.charAt(p.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function (p) {
            return p
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return this.id == null
        },
        change: function (p) {
            if (this._changing || !this.hasChanged()) return this;
            this._moreChanges = this._changing = true;
            for (var n in this._changed) this.trigger("change:" + n, this, this._changed[n], p);
            for (; this._moreChanges;) {
                this._moreChanges =
                    false;
                this.trigger("change", this, p)
            }
            this._previousAttributes = d.clone(this.attributes);
            delete this._changed;
            this._changing = false;
            return this
        },
        hasChanged: function (p) {
            if (!arguments.length) return !d.isEmpty(this._changed);
            return this._changed && d.has(this._changed, p)
        },
        changedAttributes: function (p) {
            if (!p) return this.hasChanged() ? d.clone(this._changed) : false;
            var n, z = false,
                B = this._previousAttributes;
            for (var E in p) if (!d.isEqual(B[E], n = p[E]))(z || (z = {}))[E] = n;
            return z
        },
        previous: function (p) {
            if (!arguments.length || !this._previousAttributes) return null;
            return this._previousAttributes[p]
        },
        previousAttributes: function () {
            return d.clone(this._previousAttributes)
        },
        isValid: function () {
            return !this.validate(this.attributes)
        },
        _validate: function (p, n) {
            if (n.silent || !this.validate) return true;
            p = d.extend({}, this.attributes, p);
            p = this.validate(p, n);
            if (!p) return true;
            n && n.error ? n.error(this, p, n) : this.trigger("error", this, p, n);
            return false
        }
    });
    g.Collection = function (p, n) {
        n || (n = {});
        if (n.comparator) this.comparator = n.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        p && this.reset(p, {
            silent: true,
            parse: n.parse
        })
    };
    d.extend(g.Collection.prototype, g.Events, {
        model: g.Model,
        initialize: function () {},
        toJSON: function () {
            return this.map(function (p) {
                return p.toJSON()
            })
        },
        add: function (p, n) {
            var z, B, E, F, M, O = {}, L = {};
            n || (n = {});
            p = d.isArray(p) ? p.slice() : [p];
            z = 0;
            for (B = p.length; z < B; z++) {
                if (!(E = p[z] = this._prepareModel(p[z], n))) throw new Error("Can't add an invalid model to a collection");
                if (O[F = E.cid] || this._byCid[F] || (M = E.id) != null && (L[M] || this._byId[M])) throw new Error("Can't add the same model to a collection twice");
                O[F] = L[M] = E
            }
            for (z = 0; z < B; z++) {
                (E = p[z]).on("all", this._onModelEvent, this);
                this._byCid[E.cid] = E;
                if (E.id != null) this._byId[E.id] = E
            }
            this.length += B;
            f.apply(this.models, [n.at != null ? n.at : this.models.length, 0].concat(p));
            this.comparator && this.sort({
                silent: true
            });
            if (n.silent) return this;
            z = 0;
            for (B = this.models.length; z < B; z++) if (O[(E = this.models[z]).cid]) {
                    n.index = z;
                    E.trigger("add", E, this, n)
                }
            return this
        },
        remove: function (p, n) {
            var z, B, E, F;
            n || (n = {});
            p = d.isArray(p) ? p.slice() : [p];
            z = 0;
            for (B = p.length; z < B; z++) if (F = this.getByCid(p[z]) ||
                    this.get(p[z])) {
                    delete this._byId[F.id];
                    delete this._byCid[F.cid];
                    E = this.indexOf(F);
                    this.models.splice(E, 1);
                    this.length--;
                    if (!n.silent) {
                        n.index = E;
                        F.trigger("remove", F, this, n)
                    }
                    this._removeReference(F)
                }
            return this
        },
        get: function (p) {
            if (p == null) return null;
            return this._byId[p.id != null ? p.id : p]
        },
        getByCid: function (p) {
            return p && this._byCid[p.cid || p]
        },
        at: function (p) {
            return this.models[p]
        },
        sort: function (p) {
            p || (p = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var n = d.bind(this.comparator,
                this);
            if (this.comparator.length == 1) this.models = this.sortBy(n);
            else this.models.sort(n);
            p.silent || this.trigger("reset", this, p);
            return this
        },
        pluck: function (p) {
            return d.map(this.models, function (n) {
                return n.get(p)
            })
        },
        reset: function (p, n) {
            p || (p = []);
            n || (n = {});
            for (var z = 0, B = this.models.length; z < B; z++) this._removeReference(this.models[z]);
            this._reset();
            this.add(p, {
                silent: true,
                parse: n.parse
            });
            n.silent || this.trigger("reset", this, n);
            return this
        },
        fetch: function (p) {
            p = p ? d.clone(p) : {};
            if (p.parse === undefined) p.parse =
                    true;
            var n = this,
                z = p.success;
            p.success = function (B, E, F) {
                n[p.add ? "add" : "reset"](n.parse(B, F), p);
                z && z(n, B)
            };
            p.error = g.wrapError(p.error, n, p);
            return (this.sync || g.sync).call(this, "read", this, p)
        },
        create: function (p, n) {
            var z = this;
            n = n ? d.clone(n) : {};
            p = this._prepareModel(p, n);
            if (!p) return false;
            n.wait || z.add(p, n);
            var B = n.success;
            n.success = function (E, F) {
                n.wait && z.add(E, n);
                B ? B(E, F) : E.trigger("sync", p, F, n)
            };
            p.save(null, n);
            return p
        },
        parse: function (p) {
            return p
        },
        chain: function () {
            return d(this.models).chain()
        },
        _reset: function () {
            this.length =
                0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function (p, n) {
            if (p instanceof g.Model) {
                if (!p.collection) p.collection = this
            } else {
                p = p;
                n.collection = this;
                p = new this.model(p, n);
                p._validate(p.attributes, n) || (p = false)
            }
            return p
        },
        _removeReference: function (p) {
            this == p.collection && delete p.collection;
            p.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (p, n, z, B) {
            if (!((p == "add" || p == "remove") && z != this)) {
                p == "destroy" && this.remove(n, B);
                if (n && p === "change:" + n.idAttribute) {
                    delete this._byId[n.previous(n.idAttribute)];
                    this._byId[n.id] = n
                }
                this.trigger.apply(this, arguments)
            }
        }
    });
    d.each(["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"], function (p) {
        g.Collection.prototype[p] = function () {
            return d[p].apply(d, [this.models].concat(d.toArray(arguments)))
        }
    });
    g.Router = function (p) {
        p ||
            (p = {});
        if (p.routes) this.routes = p.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var j = /:\w+/g,
        k = /\*\w+/g,
        l = /[-[\]{}()+?.,\\^$|#\s]/g;
    d.extend(g.Router.prototype, g.Events, {
        initialize: function () {},
        route: function (p, n, z) {
            g.history || (g.history = new g.History);
            d.isRegExp(p) || (p = this._routeToRegExp(p));
            z || (z = this[n]);
            g.history.route(p, d.bind(function (B) {
                B = this._extractParameters(p, B);
                z && z.apply(this, B);
                this.trigger.apply(this, ["route:" + n].concat(B));
                g.history.trigger("route", this, n, B)
            },
                this));
            return this
        },
        navigate: function (p, n) {
            g.history.navigate(p, n)
        },
        _bindRoutes: function () {
            if (this.routes) {
                var p = [];
                for (var n in this.routes) p.unshift([n, this.routes[n]]);
                n = 0;
                for (var z = p.length; n < z; n++) this.route(p[n][0], p[n][1], this[p[n][1]])
            }
        },
        _routeToRegExp: function (p) {
            p = p.replace(l, "\\$&").replace(j, "([^/]+)").replace(k, "(.*?)");
            return new RegExp("^" + p + "$")
        },
        _extractParameters: function (p, n) {
            return p.exec(n).slice(1)
        }
    });
    g.History = function () {
        this.handlers = [];
        d.bindAll(this, "checkUrl")
    };
    var r = /^[#\/]/,
        u = /msie [\w.]+/,
        o = false;
    d.extend(g.History.prototype, g.Events, {
        interval: 50,
        getFragment: function (p, n) {
            if (p == null) if (this._hasPushState || n) {
                    p = window.location.pathname;
                    if (n = window.location.search) p += n
                } else p = window.location.hash;
            p = decodeURIComponent(p);
            p.indexOf(this.options.root) || (p = p.substr(this.options.root.length));
            return p.replace(r, "")
        },
        start: function (p) {
            if (o) throw new Error("Backbone.history has already been started");
            this.options = d.extend({}, {
                root: "/"
            }, this.options, p);
            this._wantsHashChange =
                this.options.hashChange !== false;
            this._wantsPushState = !! this.options.pushState;
            this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
            p = this.getFragment();
            var n = document.documentMode;
            if (n = u.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7)) {
                this.iframe = h('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(p)
            }
            if (this._hasPushState) h(window).bind("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in
                window && !n) h(window).bind("hashchange", this.checkUrl);
            else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            this.fragment = p;
            o = true;
            p = window.location;
            n = p.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !n) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && n && p.hash) {
                this.fragment = p.hash.replace(r,
                    "");
                window.history.replaceState({}, document.title, p.protocol + "//" + p.host + this.options.root + this.fragment)
            }
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function () {
            h(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            o = false
        },
        route: function (p, n) {
            this.handlers.unshift({
                route: p,
                callback: n
            })
        },
        checkUrl: function () {
            var p = this.getFragment();
            if (p == this.fragment && this.iframe) p = this.getFragment(this.iframe.location.hash);
            if (p == this.fragment ||
                p == decodeURIComponent(this.fragment)) return false;
            this.iframe && this.navigate(p);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function (p) {
            var n = this.fragment = this.getFragment(p);
            return d.any(this.handlers, function (z) {
                if (z.route.test(n)) {
                    z.callback(n);
                    return true
                }
            })
        },
        navigate: function (p, n) {
            if (!o) return false;
            if (!n || n === true) n = {
                    trigger: n
            };
            var z = (p || "").replace(r, "");
            if (!(this.fragment == z || this.fragment == decodeURIComponent(z))) {
                if (this._hasPushState) {
                    if (z.indexOf(this.options.root) != 0) z =
                            this.options.root + z;
                    this.fragment = z;
                    window.history[n.replace ? "replaceState" : "pushState"]({}, document.title, z)
                } else if (this._wantsHashChange) {
                    this.fragment = z;
                    this._updateHash(window.location, z, n.replace);
                    if (this.iframe && z != this.getFragment(this.iframe.location.hash)) {
                        n.replace || this.iframe.document.open().close();
                        this._updateHash(this.iframe.location, z, n.replace)
                    }
                } else window.location.assign(this.options.root + p);
                n.trigger && this.loadUrl(p)
            }
        },
        _updateHash: function (p, n, z) {
            if (z) p.replace(p.toString().replace(/(javascript:|#).*$/,
                    "") + "#" + n);
            else p.hash = n
        }
    });
    g.View = function (p) {
        this.cid = d.uniqueId("view");
        this._configure(p || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var m = /^(\S+)\s*(.*)$/,
        s = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    d.extend(g.View.prototype, g.Events, {
        tagName: "div",
        $: function (p) {
            return this.$el.find(p)
        },
        initialize: function () {},
        render: function () {
            return this
        },
        remove: function () {
            this.$el.remove();
            return this
        },
        make: function (p, n, z) {
            p = document.createElement(p);
            n && h(p).attr(n);
            z && h(p).html(z);
            return p
        },
        setElement: function (p, n) {
            this.$el = h(p);
            this.el = this.$el[0];
            n !== false && this.delegateEvents();
            return this
        },
        delegateEvents: function (p) {
            if (p || (p = D(this, "events"))) {
                this.undelegateEvents();
                for (var n in p) {
                    var z = p[n];
                    d.isFunction(z) || (z = this[p[n]]);
                    if (!z) throw new Error('Event "' + p[n] + '" does not exist');
                    var B = n.match(m),
                        E = B[1];
                    B = B[2];
                    z = d.bind(z, this);
                    E += ".delegateEvents" + this.cid;
                    B === "" ? this.$el.bind(E, z) : this.$el.delegate(B, E, z)
                }
            }
        },
        undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" +
                this.cid)
        },
        _configure: function (p) {
            if (this.options) p = d.extend({}, this.options, p);
            for (var n = 0, z = s.length; n < z; n++) {
                var B = s[n];
                if (p[B]) this[B] = p[B]
            }
            this.options = p
        },
        _ensureElement: function () {
            if (this.el) this.setElement(this.el, false);
            else {
                var p = D(this, "attributes") || {};
                if (this.id) p.id = this.id;
                if (this.className) p["class"] = this.className;
                this.setElement(this.make(this.tagName, p), false)
            }
        }
    });
    g.Model.extend = g.Collection.extend = g.Router.extend = g.View.extend = function (p, n) {
        p = A(this, p, n);
        p.extend = this.extend;
        return p
    };
    var v = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    g.sync = function (p, n, z) {
        var B = v[p],
            E = {
                type: B,
                dataType: "json"
            };
        if (!z.url) E.url = D(n, "url") || I();
        if (!z.data && n && (p == "create" || p == "update")) {
            E.contentType = "application/json";
            E.data = JSON.stringify(n.toJSON())
        }
        if (g.emulateJSON) {
            E.contentType = "application/x-www-form-urlencoded";
            E.data = E.data ? {
                model: E.data
            } : {}
        }
        if (g.emulateHTTP) if (B === "PUT" || B === "DELETE") {
                if (g.emulateJSON) E.data._method = B;
                E.type = "POST";
                E.beforeSend = function (F) {
                    F.setRequestHeader("X-HTTP-Method-Override",
                        B)
                }
            }
        if (E.type !== "GET" && !g.emulateJSON) E.processData = false;
        return h.ajax(d.extend(E, z))
    };
    g.wrapError = function (p, n, z) {
        return function (B, E) {
            E = B === n ? E : B;
            p ? p(n, E, z) : n.trigger("error", n, E, z)
        }
    };
    var x = function () {}, A = function (p, n, z) {
            var B;
            B = n && n.hasOwnProperty("constructor") ? n.constructor : function () {
                p.apply(this, arguments)
            };
            d.extend(B, p);
            x.prototype = p.prototype;
            B.prototype = new x;
            n && d.extend(B.prototype, n);
            z && d.extend(B, z);
            B.prototype.constructor = B;
            B.__super__ = p.prototype;
            return B
        }, D = function (p, n) {
            if (!(p &&
                p[n])) return null;
            return d.isFunction(p[n]) ? p[n]() : p[n]
        }, I = function () {
            throw new Error('A "url" property or function must be specified');
        }
}).call(this);
window.Modernizr = function (b, c, e) {
    function f(n) {
        u.cssText = n
    }
    function g(n, z) {
        return typeof n === z
    }
    function d(n, z) {
        for (var B in n) if (u[n[B]] !== e) return z == "pfx" ? n[B] : true;
        return false
    }
    function h(n, z, B) {
        for (var E in n) {
            var F = z[n[E]];
            if (F !== e) return B === false ? n[E] : g(F, "function") ? F.bind(B || z) : F
        }
        return false
    }
    function j(n, z, B) {
        var E = n.charAt(0).toUpperCase() + n.substr(1),
            F = (n + " " + o.join(E + " ") + E).split(" ");
        return g(z, "string") || g(z, "undefined") ? d(F, z) : (F = (n + " " + m.join(E + " ") + E).split(" "), h(F, z, B))
    }
    var k = {}, l = c.documentElement,
        r = c.createElement("modernizr"),
        u = r.style;
    b = " -webkit- -moz- -o- -ms- ".split(" ");
    var o = "Webkit Moz O ms".split(" "),
        m = "Webkit Moz O ms".toLowerCase().split(" ");
    r = {};
    var s = [],
        v = s.slice,
        x, A = function (n, z, B, E) {
            var F, M, O, L = c.createElement("div"),
                S = c.body,
                X = S ? S : c.createElement("body");
            if (parseInt(B, 10)) for (; B--;) {
                    O = c.createElement("div");
                    O.id = E ? E[B] : "modernizr" + (B + 1);
                    L.appendChild(O)
            }
            return F = ["&#173;<style>", n, "</style>"].join(""), L.id = "modernizr", (S ? L : X).innerHTML += F, X.appendChild(L),
            S || (X.style.background = "", l.appendChild(X)), M = z(L, n), S ? L.parentNode.removeChild(L) : X.parentNode.removeChild(X), !! M
        }, D = {}.hasOwnProperty,
        I;
    !g(D, "undefined") && !g(D.call, "undefined") ? (I = function (n, z) {
        return D.call(n, z)
    }) : (I = function (n, z) {
        return z in n && g(n.constructor.prototype[z], "undefined")
    });
    Function.prototype.bind || (Function.prototype.bind = function (n) {
        var z = this;
        if (typeof z != "function") throw new TypeError;
        var B = v.call(arguments, 1),
            E = function () {
                if (this instanceof E) {
                    var F = function () {};
                    F.prototype =
                        z.prototype;
                    F = new F;
                    var M = z.apply(F, B.concat(v.call(arguments)));
                    return Object(M) === M ? M : F
                }
                return z.apply(n, B.concat(v.call(arguments)))
            };
        return E
    });
    (function (n, z) {
        n = n.join("");
        var B = z.length;
        A(n, function (E) {
            E = E.childNodes;
            for (var F = {}; B--;) F[E[B].id] = E[B];
            k.csstransforms3d = (F.csstransforms3d && F.csstransforms3d.offsetLeft) === 9 && F.csstransforms3d.offsetHeight === 3
        }, B, z)
    })([, ["@media (", b.join("transform-3d),("), "modernizr){#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")], [, "csstransforms3d"]);
    r.csstransforms3d = function () {
        var n = !! j("perspective");
        return n && "webkitPerspective" in l.style && (n = k.csstransforms3d), n
    };
    for (var p in r) I(r, p) && (x = p.toLowerCase(), k[x] = r[p](), s.push((k[x] ? "" : "no-") + x));
    return f(""), r = null, k._version = "2.5.3", k._prefixes = b, k._domPrefixes = m, k._cssomPrefixes = o, k.testProp = function (n) {
        return d([n])
    }, k.testAllProps = j, k.testStyles = A, l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (" js " + s.join(" ")), k
}(this, this.document);
var new_pins = {
    html: "",
    number: 0,
    old_title: ""
}, followers_json = null,
    cache = {}, lastXhr, media_url = "http://assets.pinterest.com/",
    useLazyLoad = !window.navigator.userAgent.match(/ipad.*OS 4_/gi),
    pinterestReferrer = window.location.href;
window.onerror = function () {};

function getCookie(b) {
    var c = null;
    if (document.cookie && document.cookie != "") for (var e = document.cookie.split(";"), f = 0; f < e.length; f++) {
            var g = jQuery.trim(e[f]);
            if (g.substring(0, b.length + 1) == b + "=") c = decodeURIComponent(g.substring(b.length + 1))
    }
    return c
}
$("html").ajaxSend(function (b, c) {
    c.setRequestHeader("X-Pinterest-Referrer", pinterestReferrer);
    c.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    c.setRequestHeader("X-CLASSIC-APP", 1)
});

function setCookie(b, c, e) {
    if (e) {
        var f = new Date;
        f.setTime(f.getTime() + e * 24 * 60 * 60 * 1E3);
        e = "; expires=" + f.toGMTString()
    } else e = "";
    document.cookie = b + "=" + c + e + "; path=/"
}
function deleteCookie(b) {
    setCookie(b, "", -1)
}
$.extend({
    getUrlVars: function () {
        for (var b = [], c, e = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), f = 0; f < e.length; f++) {
            c = e[f].split("=");
            b.push(c[0]);
            b[c[0]] = c[1]
        }
        return b
    },
    getUrlVar: function (b) {
        return $.getUrlVars()[b]
    }
});
(function (b) {
    b.fn.extend({
        defaultValue: function (c, e) {
            b(this).focus(function () {
                b(this).val() == c && b(this).val("");
                e && b(this).removeClass(e)
            }).blur(function () {
                if (b(this).val() == "") {
                    b(this).val(c);
                    e && b(this).addClass(e)
                }
            })
        }
    })
})(jQuery);
if (!Array.indexOf) Array.prototype.indexOf = function (b) {
        for (var c = 0; c < this.length; c++) if (this[c] == b) return c;
        return -1
};

function is_video(b) {
    return /^http:\/\/img\.youtube\.com/.test(b) || /^http:\/\/b\.vimeocdn\.com/.test(b)
}
function getHTML(b) {
    var c = $(b).wrap("<div />").parent().html();
    $(b).unwrap();
    return c
}
var ScrollToTop = ScrollToTop || {
    setup: function () {
        var b = $(window).height() / 2;
        $(window).scroll(function () {
            (window.innerWidth ? window.pageYOffset : document.documentElement.scrollTop) >= b ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
        });
        $("#ScrollToTop").click(function () {
            trackGAEvent("scroll_to_top", "clicked");
            $("html, body").animate({
                scrollTop: "0px"
            }, 400);
            return false
        })
    }
}, Pinpressions = Pinpressions || {
        setup: function () {
            $(window).on("scrollstop", function () {
                Pinpressions.getPinsAboveFold()
            })
        },
        getPinsAboveFold: function () {
            $("#ColumnContainer .pin").not(".feed, .pinBoard").each(function (b, c) {
                b = $(window).height();
                var e = $(window).scrollTop();
                b = b + e;
                if ($(c).offset().top < b)(c = $(c).attr("data-id")) && Pinpressions.pinsAboveFold.indexOf(c) === -1 && Pinpressions.pinsAboveFold.push(c)
            })
        },
        pinsAboveFold: []
    }, Modal = Modal || {
        setup: function () {
            $(document).keydown(function (b) {
                if (b.keyCode == 27) {
                    var c = $(".ModalContainer:visible").attr("id");
                    if (c) Modal.close(c);
                    else $("#zoomScroll").length && window.history.back();
                    b.preventDefault()
                }
            })
        },
        show: function (b) {
            var c = $("#" + b),
                e = $(".modal:first", c),
                f = c.parent(),
                g = this;
            c.find(".close").on("click", function () {
                g.trigger("cancel")
            });
            if (f[0] !== $("body")[0]) {
                $("body").append(c);
                c.data("parent", f)
            }
            $("body").addClass("noscroll");
            c.show();
            f = e.outerHeight();
            e.css("margin-bottom", "-" + f / 2 + "px");
            setTimeout(function () {
                c.addClass("visible");
                c.css("-webkit-transform", "none")
            }, 1);
            this.trigger("show", b);
            return false
        },
        close: function (b) {
            var c = $("#" + b);
            c.data("parent") && c.data("parent").append(c);
            $("#zoomScroll").length === 0 && $("body").removeClass("noscroll");
            c.removeClass("visible");
            setTimeout(function () {
                c.hide();
                c.css("-webkit-transform", "translateZ(0)")
            }, 251);
            this.trigger("close", b);
            return false
        }
    };
_.extend(Modal, Backbone.Events);
var Arrays = {
    conjunct: function (b) {
        if (b.length == 1) return b[0];
        else {
            b = b.slice(0);
            last = b.pop();
            b.push("and " + last);
            return b.join(", ")
        }
    }
};
$(document).ready(function () {
    ScrollToTop.setup();
    Modal.setup();
    Pinpressions.setup();
    $(".tipsyHover").tipsy({
        gravity: "n",
        delayIn: 0.1,
        delayOut: 0.1,
        opacity: 0.7,
        live: true,
        html: true
    });
    $("#query").focus(function () {
        cache && $(this).catcomplete("search", $(this).val())
    });
    $(document).on("click", function (e) {
        e = $(e.target);
        e.attr("data-elementType") && setCookie("element", e.attr("data-elementType"));
        e.attr("data-componentType") && setCookie("component", e.attr("data-componentType"))
    });
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (e, f) {
            var g = this,
                d = "";
            $.each(f, function (j, k) {
                if (k.category != d) {
                    e.append("<li class='ui-autocomplete-category'>" + k.category + "</li>");
                    d = k.category
                }
                g._renderItem(e, k)
            });
            f = {
                link: "/search/?q=" + this.term
            };
            var h = $('<a class="ui-corner-all" tabindex="-1" style="font-weight:bold; min-height:0 !important;"></a>').attr("href", "/search/?q=" + this.term).text("Search for " + this.term);
            $("<li></li>").data("item.autocomplete", f).append(h).appendTo(e)
        }
    });
    var b = {
        filterTypes: [P.SEARCH_FILTER_TYPES.TAG_MUTUAL_FOLLOW,
                P.SEARCH_FILTER_TYPES.TAG_FOLLOWEE, P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_PINNER, P.SEARCH_FILTER_TYPES.TAG_TWITTER_PINNER, P.SEARCH_FILTER_TYPES.TAG_BOARD
        ]
    }, c = $("#query").catcomplete({
            source: function (e, f) {
                if (P.IS_AUTHENTICATED) {
                    if (!Tagging.friends || Tagging.friends.length == 0) f([{
                                image: P.SEARCH_LOADING,
                                label: ""
                            }
                        ]);
                    Tagging.getFriends(e, function (g) {
                        for (var d = 0; d < g.length; d++) g[d].value = g[d].label;
                        f(g)
                    }, null, b)
                }
            },
            minLength: 1,
            delay: 160,
            appendTo: "#SearchAutocompleteHolder",
            select: function (e, f) {
                document.location.href =
                    f.item.link
            }
        });
    if (typeof c.data("catcomplete") != "undefined") c.data("catcomplete")._renderItem = function (e, f) {
            var g = "<a href='" + f.link + "'><img src='" + f.image + "' class='AutocompletePhoto' alt='Photo of " + f.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + f.label + "</span></a>";
            return $("<li></li>").data("item.autocomplete", f).append(g).appendTo(e)
    };
    $("#Search #query_button").click(function () {
        $("#Search form").submit();
        return false
    });
    $("body").on("click", "a[rel=nofollow]", function (e) {
        var f =
            $(this),
            g = f.attr("href");
        if (g === "#") return e.isDefaultPrevented();
        if (!g.match(/^(http|https):\/\//) || g.match(/(http:\/\/|https:\/\/|\.)pinterest\.com\//gi) || f.hasClass("safelink")) return true;
        e = f.parents(".pin").attr("data-private") || f.attr("data-private") ? "&strip=1" : "";
        var d = f.parents(".pin").attr("data-id") || f.parents(".pin").attr("pin-id") || f.attr("data-id");
        d = d ? "&pin=" + d : "";
        var h = f.parents(".comment").attr("comment-id");
        h = h ? "&comment_id=" + h : "";
        f = (f = f.attr("data-ref") || f.parents("[data-ref]").attr("data-ref")) ?
            "&ref=" + f : "";
        var j = (new jsSHA(getCookie("csrftoken"), "ASCII")).getHash("HEX");
        g = "//" + window.location.host + "/offsite/?url=" + encodeURIComponent(g) + "&shatoken=" + j + d + h + f + e;
        window.open(g);
        return false
    });
    $(window).load(function () {
        Pinpressions.getPinsAboveFold()
    })
});
Twitter = new(function () {
    var b = this;
    this.startTwitterConnect = function () {
        b._twitterWindow = window.open("/connect/twitter/?token=" + getCookie("csrftoken"), "Pinterest", "location=0,status=0,width=800,height=400");
        b._twitterInterval = window.setInterval(b.completeTwitterConnect, 1E3)
    };
    this.completeTwitterConnect = function () {
        if (b._twitterWindow.closed) {
            window.clearInterval(b._twitterInterval);
            window.location.reload()
        }
    }
});
Facebook = new(function () {
    var b = this;
    this.startFacebookConnect = function (c, e, f, g) {
        f = f == undefined ? true : f;
        var d = "/connect/facebook/?token=" + getCookie("csrftoken");
        if (c) d += "&scope=" + c;
        if (e) d += "&enable_timeline=1";
        if (g) d += "&ref_page=" + g;
        b._facebookWindow = window.open(d, "Pinterest", "location=0,status=0,width=800,height=400");
        if (f) b._facebookInterval = window.setInterval(this.completeFacebookConnect, 1E3)
    };
    this.completeFacebookConnect = function () {
        if (b._facebookWindow.closed) {
            window.clearInterval(b._facebookInterval);
            window.location.reload()
        }
    }
});
Google = new(function () {
    var b = this;
    this.startGoogleConnect = function () {
        b._googleWindow = window.open("/connect/google/?token=" + getCookie("csrftoken"), "Google", "location=0,status=0,width=800,height=400");
        b._googleInterval = window.setInterval(b.completeGoogleConnect, 1E3)
    };
    this.completeGoogleConnect = function () {
        if (b._googleWindow.closed) {
            window.clearInterval(b._googleInterval);
            window.location.reload()
        }
    }
});
Yahoo = new(function () {
    var b = this;
    this.startYahooConnect = function () {
        b._yahooWindow = window.open("/connect/yahoo/?token=" + getCookie("csrftoken"), "Yahoo", "location=0,status=0,width=800,height=400");
        b._yahooInterval = window.setInterval(b.completeYahooConnect, 1E3)
    };
    this.completeYahooConnect = function () {
        if (b._yahooWindow.closed) {
            window.clearInterval(b._yahooInterval);
            window.location.reload()
        }
    }
});
(function (b) {
    function c(f) {
        return typeof f == "object" ? f : {
            top: f,
            left: f
        }
    }
    var e = b.scrollTo = function (f, g, d) {
        b(window).scrollTo(f, g, d)
    };
    e.defaults = {
        axis: "xy",
        duration: parseFloat(b.fn.jquery) >= 1.3 ? 0 : 1
    };
    e.window = function () {
        return b(window)._scrollable()
    };
    b.fn._scrollable = function () {
        return this.map(function () {
            var f = this;
            if (!(!f.nodeName || b.inArray(f.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1)) return f;
            f = (f.contentWindow || f).document || f.ownerDocument || f;
            return b.browser.safari || f.compatMode ==
                "BackCompat" ? f.body : f.documentElement
        })
    };
    b.fn.scrollTo = function (f, g, d) {
        if (typeof g == "object") {
            d = g;
            g = 0
        }
        if (typeof d == "function") d = {
                onAfter: d
        };
        if (f == "max") f = 9E9;
        d = b.extend({}, e.defaults, d);
        g = g || d.speed || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) g /= 2;
        d.offset = c(d.offset);
        d.over = c(d.over);
        return this._scrollable().each(function () {
            function h(m) {
                k.animate(u, g, d.easing, m && function () {
                    m.call(this, f, d)
                })
            }
            var j = this,
                k = b(j),
                l = f,
                r, u = {}, o = k.is("html,body");
            switch (typeof l) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(l)) {
                    l =
                        c(l);
                    break
                }
                l = b(l, this);
            case "object":
                if (l.is || l.style) r = (l = b(l)).offset()
            }
            b.each(d.axis.split(""), function (m, s) {
                var v = s == "x" ? "Left" : "Top",
                    x = v.toLowerCase(),
                    A = "scroll" + v,
                    D = j[A],
                    I = e.max(j, s);
                if (r) {
                    u[A] = r[x] + (o ? 0 : D - k.offset()[x]);
                    if (d.margin) {
                        u[A] -= parseInt(l.css("margin" + v)) || 0;
                        u[A] -= parseInt(l.css("border" + v + "Width")) || 0
                    }
                    u[A] += d.offset[x] || 0;
                    if (d.over[x]) u[A] += l[s == "x" ? "width" : "height"]() * d.over[x]
                } else {
                    s = l[x];
                    u[A] = s.slice && s.slice(-1) == "%" ? parseFloat(s) / 100 * I : s
                } if (/^\d+$/.test(u[A])) u[A] = u[A] <= 0 ?
                        0 : Math.min(u[A], I);
                if (!m && d.queue) {
                    D != u[A] && h(d.onAfterFirst);
                    delete u[A]
                }
            });
            h(d.onAfter)
        }).end()
    };
    e.max = function (f, g) {
        var d = g == "x" ? "Width" : "Height";
        g = "scroll" + d;
        if (!b(f).is("html,body")) return f[g] - b(f)[d.toLowerCase()]();
        d = "client" + d;
        var h = f.ownerDocument.documentElement;
        f = f.ownerDocument.body;
        return Math.max(h[g], f[g]) - Math.min(h[d], f[d])
    }
})(jQuery);
(function () {
    jQuery.each({
        getSelection: function () {
            var b = this.jquery ? this[0] : this;
            return ("selectionStart" in b && function () {
                var c = b.selectionEnd - b.selectionStart;
                return {
                    start: b.selectionStart,
                    end: b.selectionEnd,
                    length: c,
                    text: b.value.substr(b.selectionStart, c)
                }
            } || document.selection && function () {
                b.focus();
                var c = document.selection.createRange();
                if (c == null) return {
                        start: 0,
                        end: b.value.length,
                        length: 0
                };
                var e = b.createTextRange(),
                    f = e.duplicate();
                e.moveToBookmark(c.getBookmark());
                f.setEndPoint("EndToStart", e);
                var g =
                    f.text.length,
                    d = g;
                for (e = 0; e < g; e++) f.text.charCodeAt(e) == 13 && d--;
                g = f = c.text.length;
                for (e = 0; e < f; e++) c.text.charCodeAt(e) == 13 && g--;
                return {
                    start: d,
                    end: d + g,
                    length: g,
                    text: c.text
                }
            } || function () {
                return {
                    start: 0,
                    end: b.value.length,
                    length: 0
                }
            })()
        },
        setSelection: function (b, c) {
            var e = this.jquery ? this[0] : this,
                f = b || 0,
                g = c || 0;
            return ("selectionStart" in e && function () {
                e.focus();
                e.selectionStart = f;
                e.selectionEnd = g;
                return this
            } || document.selection && function () {
                e.focus();
                var d = e.createTextRange(),
                    h = f;
                for (i = 0; i < h; i++) if (e.value[i].search(/[\r\n]/) != -1) f -= 0.5;
                h = g;
                for (i = 0; i < h; i++) if (e.value[i].search(/[\r\n]/) != -1) g -= 0.5;
                d.moveEnd("textedit", -1);
                d.moveStart("character", f);
                d.moveEnd("character", g - f);
                d.select();
                return this
            } || function () {
                return this
            })()
        },
        replaceSelection: function (b) {
            var c = this.jquery ? this[0] : this,
                e = b || "";
            return ("selectionStart" in c && function () {
                c.value = c.value.substr(0, c.selectionStart) + e + c.value.substr(c.selectionEnd, c.value.length);
                return this
            } || document.selection && function () {
                c.focus();
                document.selection.createRange().text = e;
                return this
            } || function () {
                c.value += e;
                return this
            })()
        }
    }, function (b) {
        jQuery.fn[b] = this
    })
})();
var tagmate = tagmate || {
    USER_TAG_EXPR: "@\\w+(?: \\w*)?",
    HASH_TAG_EXPR: "#\\w+",
    USD_TAG_EXPR: "\\$(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    GBP_TAG_EXPR: "\\\u00a3(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    filter_options: function (b, c) {
        for (var e = [], f = 0; f < b.length; f++) {
            var g = b[f].label.toLowerCase(),
                d = c.toLowerCase();
            d.length <= g.length && g.indexOf(d) == 0 && e.push(b[f])
        }
        return e
    },
    sort_options: function (b) {
        return b.sort(function (c, e) {
            c = c.label.toLowerCase();
            e = e.label.toLowerCase();
            if (c >
                e) return 1;
            else if (c < e) return -1;
            return 0
        })
    },
    delayTimeout: null
};
(function (b) {
    function c(d, h, j) {
        d = d.substring(j || 0).search(h);
        return d >= 0 ? d + (j || 0) : d
    }
    function e(d) {
        return d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }
    function f(d, h, j) {
        var k = {};
        for (tok in h) if (j && j[tok]) {
                var l = {}, r = {};
                for (key in j[tok]) {
                    var u = j[tok][key],
                        o = u.value,
                        m = u.label,
                        s = m;
                    if (u.rawLabel) s = u.rawLabel;
                    u = e(tok + s);
                    var v = ["(?:^(", ")$|^(", ")\\W|\\W(", ")\\W|\\W(", ")$)"].join(u);
                    s = 0;
                    for (v = new RegExp(v, "gm");
                    (s = c(d.val(), v, s)) > -1;) {
                        var x = r[s] ? r[s] : null;
                        if (!x || l[x].length < m.length) r[s] = o;
                        l[o] = m;
                        s += m.length +
                            1
                    }
                }
                for (s in r) k[tok + r[s]] = tok
            } else {
                l = null;
                for (v = new RegExp("(" + h[tok] + ")", "gm"); l = v.exec(d.val());) k[l[1]] = tok
            }
        d = [];
        for (u in k) d.push(u);
        return d
    }
    var g = {
        "@": tagmate.USER_TAG_EXPR,
        "#": tagmate.HASH_TAG_EXPR,
        $: tagmate.USD_TAG_EXPR,
        "\u00a3": tagmate.GBP_TAG_EXPR
    };
    b.fn.extend({
        getTags: function (d, h) {
            var j = b(this);
            d = d || j.data("_tagmate_tagchars");
            h = h || j.data("_tagmate_sources");
            return f(j, d, h)
        },
        tagmate: function (d) {
            function h(o, m, s) {
                for (m = new RegExp("[" + m + "]"); s >= 0 && !m.test(o[s]); s--);
                return s
            }
            function j(o,
                m) {
                var s = o.val(),
                    v = o.getSelection(),
                    x = -1;
                o = null;
                for (tok in u.tagchars) {
                    var A = h(s, tok, v.start);
                    if (A > x) {
                        x = A;
                        o = tok
                    }
                }
                x = Math.max(x, m);
                m = s.substring(x + 1, v.start);
                if ((new RegExp("^" + u.tagchars[o])).exec(o + m)) return o + m;
                return null
            }
            function k(o, m, s) {
                var v = o.val(),
                    x = o.getSelection();
                x = h(v, m[0], x.start);
                var A = v.substr(0, x);
                v = v.substr(x + m.length);
                o.val(A + m[0] + s + v);
                v = x + s.length + 1;
                o.setSelection(v, v);
                u.replace_tag && u.replace_tag(m, s)
            }
            function l(o, m) {
                m = tagmate.sort_options(m);
                for (var s = 0; s < m.length; s++) {
                    var v =
                        m[s].label,
                        x = m[s].image;
                    s == 0 && o.html("");
                    var A = "<span>" + v + "</span>";
                    if (x) A = "<img src='" + x + "' alt='" + v + "'/>" + A;
                    v = u.menu_option_class;
                    if (s == 0) v += " " + u.menu_option_active_class;
                    o.append("<div class='" + v + "'>" + A + "</div>")
                }
            }
            function r(o, m) {
                var s = m == "down" ? ":first-child" : ":last-child",
                    v = m == "down" ? "next" : "prev";
                m = o.children("." + u.menu_option_active_class);
                if (m.length == 0) m = o.children(s);
                else {
                    m.removeClass(u.menu_option_active_class);
                    m = m[v]().length > 0 ? m[v]() : m
                }
                m.addClass(u.menu_option_active_class);
                v = o.children();
                var x = Math.floor(b(o).height() / b(v[0]).height()) - 1;
                if (b(o).height() % b(v[0]).height() > 0) x -= 1;
                for (s = 0; s < v.length && b(v[s]).html() != b(m).html(); s++);
                s > x && s - x >= 0 && s - x < v.length && o.scrollTo(v[s - x])
            }
            var u = {
                tagchars: g,
                delay: 0,
                loadingItem: null,
                doLoadingFn: null,
                sources: null,
                capture_tag: null,
                replace_tag: null,
                menu: null,
                menu_class: "tagmate-menu",
                menu_option_class: "tagmate-menu-option",
                menu_option_active_class: "tagmate-menu-option-active"
            };
            return this.each(function () {
                function o() {
                    var p = j(v, v.data("terminationPos"));
                    if (p) {
                        var n = p[0],
                            z = p.substr(1),
                            B = v.getSelection(),
                            E = h(v.val(), n, B.start);
                        B.start - E <= p.length && function (F) {
                            d.loadingItem && d.doLoadingFn && d.doLoadingFn() && m([d.loadingItem]);
                            if (typeof u.sources[n] === "object") F(tagmate.filter_options(u.sources[n], z));
                            else typeof u.sources[n] === "function" ? u.sources[n]({
                                    term: z
                                }, F) : F()
                        }(function (F) {
                            if (F && F.length > 0) {
                                m(F);
                                for (var M = v.data("_tagmate_sources"), O = 0; O < F.length; O++) {
                                    for (var L = false, S = 0; !L && S < M[n].length; S++) L = M[n][S].value == F[O].value;
                                    L || M[n].push(F[O])
                                }
                            } else D.hide();
                            p && u.capture_tag && u.capture_tag(p)
                        })
                    }
                }
                function m(p) {
                    l(D, p);
                    D.css("top", v.outerHeight() - 1 + "px");
                    D.show()
                }
                function s() {
                    clearTimeout(tagmate.delayTimeout);
                    tagmate.delayTimeout = setTimeout(function () {
                        o()
                    }, d.delay)
                }
                d && b.extend(u, d);
                var v = b(this),
                    x = v.data("terminationPos") || -1;
                v.data("terminationPos", x);
                v.data("_tagmate_tagchars", u.tagchars);
                x = {};
                for (var A in u.sources) x[A] = [];
                v.data("_tagmate_sources", x);
                var D = u.menu;
                if (!D) {
                    D = b("<div class='" + u.menu_class + "'></div>");
                    v.after(D)
                }
                v.offset();
                D.css("position",
                    "absolute");
                D.hide();
                var I = false;
                b(v).unbind(".tagmate").bind("focus.tagmate", function () {
                    o()
                }).bind("blur.tagmate", function () {
                    setTimeout(function () {
                        D.hide()
                    }, 300)
                }).bind("click.tagmate", function () {
                    v.data("terminationPos", -1);
                    o()
                }).bind("keydown.tagmate", function (p) {
                    if (D.is(":visible")) if (p.keyCode == 40) {
                            r(D, "down");
                            I = true;
                            return false
                        } else if (p.keyCode == 38) {
                        r(D, "up");
                        I = true;
                        return false
                    } else if (p.keyCode == 13) {
                        p = D.children("." + u.menu_option_active_class).text();
                        var n = j(v, 0);
                        if (n && p) {
                            k(v, n, p);
                            v.data("terminationPos",
                                v.getSelection().end);
                            D.hide();
                            I = true;
                            return false
                        }
                    } else if (p.keyCode == 27) {
                        D.hide();
                        I = true;
                        return false
                    }
                }).bind("keyup.tagmate", function () {
                    if (I) {
                        I = false;
                        return true
                    }
                    var p = v.data("terminationPos");
                    p > 0 && v.getSelection().end < p && v.data("terminationPos", -1);
                    s()
                });
                A = v.parent()[0];
                b("." + u.menu_class + " ." + u.menu_option_class, A).die("click.tagmate").live("click.tagmate", function () {
                    var p = b(this).text(),
                        n = j(v, 0);
                    k(v, n, p);
                    v.data("terminationPos", v.getSelection().end);
                    D.hide();
                    I = true;
                    return false
                })
            })
        }
    })
})(jQuery);
(function (b) {
    function c(g) {
        var d;
        if (g && g.constructor == Array && g.length == 3) return g;
        if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)) return [parseInt(d[1]), parseInt(d[2]), parseInt(d[3])];
        if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)) return [parseFloat(d[1]) * 2.55, parseFloat(d[2]) * 2.55, parseFloat(d[3]) * 2.55];
        if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) return [parseInt(d[1], 16), parseInt(d[2],
                16), parseInt(d[3], 16)];
        if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) return [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)];
        return f[b.trim(g).toLowerCase()]
    }
    function e(g, d) {
        var h;
        do {
            h = b.curCSS(g, d);
            if (h != "" && h != "transparent" || b.nodeName(g, "body")) break;
            d = "backgroundColor"
        } while (g = g.parentNode);
        return c(h)
    }
    b.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (g, d) {
        b.fx.step[d] = function (h) {
            if (h.state ==
                0) {
                h.start = e(h.elem, d);
                h.end = c(h.end)
            }
            h.elem.style[d] = "rgb(" + [Math.max(Math.min(parseInt(h.pos * (h.end[0] - h.start[0]) + h.start[0]), 255), 0), Math.max(Math.min(parseInt(h.pos * (h.end[1] - h.start[1]) + h.start[1]), 255), 0), Math.max(Math.min(parseInt(h.pos * (h.end[2] - h.start[2]) + h.start[2]), 255), 0)].join(",") + ")"
        }
    });
    var f = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0,
                100, 0
        ],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128,
                128, 0
        ],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
jQuery.cookie = function (b, c, e) {
    if (arguments.length > 1 && String(c) !== "[object Object]") {
        e = jQuery.extend({}, e);
        if (c === null || c === undefined) e.expires = -1;
        if (typeof e.expires === "number") {
            var f = e.expires,
                g = e.expires = new Date;
            g.setDate(g.getDate() + f)
        }
        c = String(c);
        return document.cookie = [encodeURIComponent(b), "=", e.raw ? c : encodeURIComponent(c), e.expires ? "; expires=" + e.expires.toUTCString() : "", e.path ? "; path=" + e.path : "", e.domain ? "; domain=" + e.domain : "", e.secure ? "; secure" : ""].join("")
    }
    e = c || {};
    g = e.raw ? function (d) {
        return d
    } :
        decodeURIComponent;
    return (f = (new RegExp("(?:^|; )" + encodeURIComponent(b) + "=([^;]*)")).exec(document.cookie)) ? g(f[1]) : null
};
if (!window.JSON) window.JSON = {};
(function () {
    function b(r) {
        return r < 10 ? "0" + r : r
    }
    function c(r) {
        d.lastIndex = 0;
        return d.test(r) ? '"' + r.replace(d, function (u) {
            var o = k[u];
            return typeof o === "string" ? o : "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + r + '"'
    }
    function e(r, u) {
        var o, m, s = h,
            v, x = u[r];
        if (x && typeof x === "object" && typeof x.toJSON === "function") x = x.toJSON(r);
        if (typeof l === "function") x = l.call(u, r, x);
        switch (typeof x) {
        case "string":
            return c(x);
        case "number":
            return isFinite(x) ? String(x) : "null";
        case "boolean":
        case "null":
            return String(x);
        case "object":
            if (!x) return "null";
            h += j;
            v = [];
            if (Object.prototype.toString.apply(x) === "[object Array]") {
                m = x.length;
                for (r = 0; r < m; r += 1) v[r] = e(r, x) || "null";
                u = v.length === 0 ? "[]" : h ? "[\n" + h + v.join(",\n" + h) + "\n" + s + "]" : "[" + v.join(",") + "]";
                h = s;
                return u
            }
            if (l && typeof l === "object") {
                m = l.length;
                for (r = 0; r < m; r += 1) {
                    o = l[r];
                    if (typeof o === "string") if (u = e(o, x)) v.push(c(o) + (h ? ": " : ":") + u)
                }
            } else for (o in x) if (Object.hasOwnProperty.call(x, o)) if (u = e(o, x)) v.push(c(o) + (h ? ": " : ":") + u); u = v.length === 0 ? "{}" : h ? "{\n" + h + v.join(",\n" + h) +
                "\n" + s + "}" : "{" + v.join(",") + "}";
            h = s;
            return u
        }
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        }
    }
    var f = window.JSON,
        g = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        h, j, k = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, l;
    if (typeof f.stringify !== "function") f.stringify = function (r, u, o) {
            var m;
            j = h = "";
            if (typeof o === "number") for (m = 0; m < o; m += 1) j += " ";
            else if (typeof o === "string") j = o;
            if ((l = u) && typeof u !== "function" && (typeof u !== "object" || typeof u.length !== "number")) throw new Error("JSON.stringify");
            return e("", {
                "": r
            })
    };
    if (typeof f.parse !== "function") f.parse = function (r, u) {
            function o(m, s) {
                var v, x, A = m[s];
                if (A && typeof A === "object") for (v in A) if (Object.hasOwnProperty.call(A, v)) {
                            x = o(A, v);
                            if (x !== undefined) A[v] = x;
                            else delete A[v]
                        }
                return u.call(m, s, A)
            }
            r = String(r);
            g.lastIndex = 0;
            if (g.test(r)) r = r.replace(g, function (m) {
                    return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4)
                });
            if (/^[\],:{}\s]*$/.test(r.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                r = eval("(" + r + ")");
                return typeof u === "function" ? o({
                    "": r
                }, "") : r
            }
            throw new SyntaxError("JSON.parse");
    }
})();
(function () {
    var b = function (o) {
        var m = [],
            s = o.length * 8,
            v;
        for (v = 0; v < s; v += 8) m[v >> 5] |= (o.charCodeAt(v / 8) & 255) << 24 - v % 32;
        return m
    }, c = function (o) {
            var m = [],
                s = o.length,
                v, x;
            for (v = 0; v < s; v += 2) {
                x = parseInt(o.substr(v, 2), 16);
                if (isNaN(x)) return "INVALID HEX STRING";
                else m[v >> 3] |= x << 24 - 4 * (v % 8)
            }
            return m
        }, e = function (o) {
            var m = "",
                s = o.length * 4,
                v, x;
            for (v = 0; v < s; v += 1) {
                x = o[v >> 2] >> (3 - v % 4) * 8;
                m += "0123456789abcdef".charAt(x >> 4 & 15) + "0123456789abcdef".charAt(x & 15)
            }
            return m
        }, f = function (o) {
            var m = "",
                s = o.length * 4,
                v, x, A;
            for (v = 0; v < s; v +=
                3) {
                A = (o[v >> 2] >> 8 * (3 - v % 4) & 255) << 16 | (o[v + 1 >> 2] >> 8 * (3 - (v + 1) % 4) & 255) << 8 | o[v + 2 >> 2] >> 8 * (3 - (v + 2) % 4) & 255;
                for (x = 0; x < 4; x += 1) m += v * 8 + x * 6 <= o.length * 32 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(A >> 6 * (3 - x) & 63) : ""
            }
            return m
        }, g = function (o, m) {
            return o << m | o >>> 32 - m
        }, d = function (o, m, s) {
            return o ^ m ^ s
        }, h = function (o, m, s) {
            return o & m ^ ~o & s
        }, j = function (o, m, s) {
            return o & m ^ o & s ^ m & s
        }, k = function (o, m) {
            var s = (o & 65535) + (m & 65535);
            return ((o >>> 16) + (m >>> 16) + (s >>> 16) & 65535) << 16 | s & 65535
        }, l = function (o, m, s, v, x) {
            var A =
                (o & 65535) + (m & 65535) + (s & 65535) + (v & 65535) + (x & 65535);
            return ((o >>> 16) + (m >>> 16) + (s >>> 16) + (v >>> 16) + (x >>> 16) + (A >>> 16) & 65535) << 16 | A & 65535
        }, r = function (o, m) {
            var s = [],
                v, x, A, D, I, p, n, z, B = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
                E = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393,
                        1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782,
                        3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782
                ];
            o[m >> 5] |= 128 << 24 - m % 32;
            o[(m + 65 >> 9 << 4) + 15] = m;
            z = o.length;
            for (p = 0; p < z; p += 16) {
                m = B[0];
                v = B[1];
                x = B[2];
                A = B[3];
                D = B[4];
                for (n = 0; n < 80; n += 1) {
                    s[n] = n < 16 ? o[n + p] : g(s[n - 3] ^ s[n - 8] ^ s[n - 14] ^ s[n - 16], 1);
                    I = n < 20 ? l(g(m, 5), h(v, x, A), D, E[n], s[n]) : n < 40 ? l(g(m, 5), d(v, x, A), D, E[n], s[n]) : n < 60 ? l(g(m, 5), j(v, x, A), D, E[n], s[n]) : l(g(m, 5), d(v, x, A), D, E[n], s[n]);
                    D = A;
                    A = x;
                    x = g(v, 30);
                    v = m;
                    m = I
                }
                B[0] = k(m, B[0]);
                B[1] = k(v, B[1]);
                B[2] = k(x, B[2]);
                B[3] = k(A, B[3]);
                B[4] = k(D, B[4])
            }
            return B
        }, u = function (o, m) {
            this.strToHash = this.strBinLen = this.sha1 = null;
            if ("HEX" === m) {
                if (0 !== o.length % 2) return "TEXT MUST BE IN BYTE INCREMENTS";
                this.strBinLen = o.length * 4;
                this.strToHash = c(o)
            } else if ("ASCII" === m || "undefined" === typeof m) {
                this.strBinLen = o.length * 8;
                this.strToHash = b(o)
            } else return "UNKNOWN TEXT INPUT TYPE"
        };
    u.prototype = {
        getHash: function (o) {
            var m = null,
                s = this.strToHash.slice();
            switch (o) {
            case "HEX":
                m = e;
                break;
            case "B64":
                m = f;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if (null ===
                this.sha1) this.sha1 = r(s, this.strBinLen);
            return m(this.sha1)
        },
        getHMAC: function (o, m, s) {
            var v;
            v = [];
            var x = [];
            switch (s) {
            case "HEX":
                s = e;
                break;
            case "B64":
                s = f;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if ("HEX" === m) {
                if (0 !== o.length % 2) return "KEY MUST BE IN BYTE INCREMENTS";
                m = c(o);
                o = o.length * 4
            } else if ("ASCII" === m) {
                m = b(o);
                o = o.length * 8
            } else return "UNKNOWN KEY INPUT TYPE"; if (64 < o / 8) {
                m = r(m, o);
                m[15] &= 4294967040
            } else if (64 > o / 8) m[15] &= 4294967040;
            for (o = 0; o <= 15; o += 1) {
                v[o] = m[o] ^ 909522486;
                x[o] = m[o] ^ 1549556828
            }
            v = r(v.concat(this.strToHash),
                512 + this.strBinLen);
            v = r(x.concat(v), 672);
            return s(v)
        }
    };
    window.jsSHA = u
})();
var Router = function () {
    var b;
    if (!window.history.pushState) return null;
    b = new Backbone.Router({
        routes: {
            "pin/:pinID/": "zoom",
            "pin/:pinID/repin/": "repin",
            ".*": "other"
        }
    });
    Backbone.history.start({
        pushState: true,
        silent: true
    });
    return b
}();
var Position = {
    Direction: {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    },
    Box: {
        TOP_LEFT: 0,
        TOP_MIDDLE: 1,
        TOP_RIGHT: 2,
        RIGHT_TOP: 3,
        RIGHT_MIDDLE: 4,
        RIGHT_BOTTOM: 5,
        BOTTOM_RIGHT: 6,
        BOTTOM_MIDDLE: 7,
        BOTTOM_LEFT: 8,
        LEFT_BOTTOM: 9,
        LEFT_MIDDLE: 10,
        LEFT_TOP: 11
    }
};
var Popup = function () {
    this.isOpen = false;
    this.arrow = this.parent = this.el = null;
    this.arrowColor_ = this.ARROW_COLOR_
};
a = Popup.prototype;
a.ARROW_COLOR_ = "#F7F7F7";
a.ARROW_LENGTH_ = 15;
a.ARROW_HALF_LENGTH_ = function () {
    if ($.browser.msie && $.browser.version === "7.0") return 10;
    if ($.browser.msie && $.browser.version === "8.0") return 2;
    return 8
}();
a.ARROW_WIDTH_ = 15;
a.ARROW_EDGE_OFFSET_ = 80;
a.setContents = function (b, c) {
    this.close_(true);
    this.parent = b;
    this.el = $("<div/>").addClass("popup");
    this.arrow = $("<div/>");
    this.el.html(c);
    this.el.append(this.arrow)
};
a.open = function (b, c, e) {
    if (this.el) {
        this.parent.append(this.el);
        this.arrow.removeAttr("style").css("position", "absolute");
        this.el.removeAttr("style").css("position", "absolute").css("z-index", 3);
        this.anchor = b;
        this.anchorPosition = c;
        this.popupPosition = e;
        this.place_();
        this.isOpen = true
    }
};
a.close = function () {
    this.close_(false)
};
a.setArrowColor = function (b) {
    this.arrowColor_ = b
};
a.close_ = function (b) {
    if (this.isOpen) {
        this.isOpen = false;
        this.el.remove();
        if (b) this.arrow = this.parent = this.el = null
    }
};
a.refresh = function () {
    this.isOpen && this.place_()
};
a.place_ = function () {
    var b = this.el.outerWidth(),
        c = this.el.outerHeight(),
        e = c / 2,
        f = b / 2,
        g = this.getAttachmentPoint_(this.parent, this.anchor, this.anchorPosition),
        d, h = null,
        j = null,
        k, l;
    switch (this.popupPosition) {
    case Position.Box.TOP_LEFT:
        d = Position.Direction.UP;
        h = 0;
        k = g.yPos + this.ARROW_WIDTH_;
        l = g.xPos - this.ARROW_HALF_LENGTH_;
        break;
    case Position.Box.TOP_MIDDLE:
        d = Position.Direction.UP;
        h = f - this.ARROW_HALF_LENGTH_;
        k = g.yPos + this.ARROW_WIDTH_;
        l = g.xPos - f;
        break;
    case Position.Box.TOP_RIGHT:
        d = Position.Direction.UP;
        h =
            b - this.ARROW_LENGTH_;
        k = g.yPos + this.ARROW_WIDTH_;
        l = g.xPos - b + this.ARROW_HALF_LENGTH_;
        break;
    case Position.Box.RIGHT_TOP:
        d = Position.Direction.RIGHT;
        j = this.ARROW_EDGE_OFFSET_;
        k = g.yPos - this.ARROW_HALF_LENGTH_ - this.ARROW_EDGE_OFFSET_;
        l = g.xPos - b - this.ARROW_WIDTH_;
        break;
    case Position.Box.RIGHT_MIDDLE:
        d = Position.Direction.RIGHT;
        j = e - this.ARROW_HALF_LENGTH_;
        k = g.yPos - e;
        l = g.xPos - b - this.ARROW_WIDTH_;
        break;
    case Position.Box.RIGHT_BOTTOM:
        d = Position.Direction.RIGHT;
        j = c - this.ARROW_LENGTH_ - this.ARROW_EDGE_OFFSET_;
        k =
            g.yPos - c + this.ARROW_HALF_LENGTH_ + this.ARROW_EDGE_OFFSET_;
        l = g.xPos - b - this.ARROW_WIDTH_;
        break;
    case Position.Box.BOTTOM_LEFT:
        d = Position.Direction.DOWN;
        h = 0;
        k = g.yPos - c - this.ARROW_WIDTH_;
        l = g.xPos - this.ARROW_HALF_LENGTH_;
        break;
    case Position.Box.BOTTOM_RIGHT:
        d = Position.Direction.DOWN;
        h = b - this.ARROW_LENGTH_;
        k = g.yPos - c - this.ARROW_WIDTH_;
        l = g.xPos - b - this.ARROW_HALF_LENGTH_;
        break;
    case Position.Box.BOTTOM_MIDDLE:
        d = Position.Direction.DOWN;
        h = f - this.ARROW_HALF_LENGTH_;
        k = g.yPos - c - this.ARROW_WIDTH_ + 1;
        l = g.xPos - f;
        break;
    case Position.Box.LEFT_TOP:
        d = Position.Direction.LEFT;
        j = 0;
        k = g.yPos - this.ARROW_HALF_LENGTH_;
        l = g.xPos + this.ARROW_WIDTH_;
        break;
    case Position.Box.LEFT_MIDDLE:
        d = Position.Direction.LEFT;
        j = e - this.ARROW_HALF_LENGTH_;
        k = g.yPos - e;
        l = g.xPos + this.ARROW_WIDTH_;
        break;
    case Position.Box.LEFT_BOTTOM:
        d = Position.Direction.LEFT;
        j = c - this.ARROW_LENGTH_;
        k = g.yPos - c + this.ARROW_HALF_LENGTH_;
        l = g.xPos + this.ARROW_WIDTH_;
        break
    }
    this.initDirectedArrow_(d);
    h !== null && this.arrow.css("left", h + "px");
    j !== null && this.arrow.css("top", j + "px");
    this.el.css("top", k + "px");
    this.el.css("left", l + "px")
};
a.initDirectedArrow_ = function (b) {
    this.arrow.removeAttr("style").removeClass("popup_arrow_up").removeClass("popup_arrow_right").removeClass("popup_arrow_down").removeClass("popup_arrow_left");
    this.arrow.addClass("popup_arrow").css("position", "absolute").css("border-right-color", this.arrowColor_).css("border-bottom-color", this.arrowColor_);
    switch (b) {
    case Position.Direction.UP:
        this.arrow.addClass("popup_arrow_up").css("top", -1 * this.ARROW_HALF_LENGTH_ + "px");
        break;
    case Position.Direction.RIGHT:
        this.arrow.addClass("popup_arrow_right").css("right", -1 * this.ARROW_HALF_LENGTH_ + "px");
        break;
    case Position.Direction.DOWN:
        this.arrow.addClass("popup_arrow_down").css("bottom", -1 * this.ARROW_HALF_LENGTH_ + 1 + "px");
        break;
    case Position.Direction.LEFT:
        this.arrow.addClass("popup_arrow_left").css("left", -1 * this.ARROW_HALF_LENGTH_ + "px");
        break
    }
};
a.getAttachmentPoint_ = function (b, c, e) {
    b = b.offset();
    var f = c.offset();
    b = {
        top: f.top - b.top,
        left: f.left - b.left
    };
    var g;
    switch (e) {
    case Position.Box.TOP_LEFT:
    case Position.Box.LEFT_TOP:
    case Position.Box.LEFT_MIDDLE:
    case Position.Box.LEFT_BOTTOM:
    case Position.Box.BOTTOM_LEFT:
        g = b.left;
        break;
    case Position.Box.TOP_RIGHT:
    case Position.Box.RIGHT_TOP:
    case Position.Box.RIGHT_MIDDLE:
    case Position.Box.RIGHT_BOTTOM:
    case Position.Box.BOTTOM_RIGHT:
        g = b.left + c.outerWidth();
        break;
    case Position.Box.TOP_MIDDLE:
    case Position.Box.BOTTOM_MIDDLE:
        g =
            b.left + c.outerWidth() / 2
    }
    var d;
    switch (e) {
    case Position.Box.TOP_LEFT:
    case Position.Box.TOP_RIGHT:
    case Position.Box.TOP_MIDDLE:
    case Position.Box.LEFT_TOP:
    case Position.Box.RIGHT_TOP:
        d = b.top;
        break;
    case Position.Box.RIGHT_BOTTOM:
    case Position.Box.BOTTOM_LEFT:
    case Position.Box.BOTTOM_MIDDLE:
    case Position.Box.BOTTOM_RIGHT:
    case Position.Box.LEFT_BOTTOM:
        d = b.top + c.outerHeight();
        break;
    case Position.Box.RIGHT_MIDDLE:
    case Position.Box.LEFT_MIDDLE:
        d = b.top + c.outerHeight() / 2
    }
    return {
        xPos: g,
        yPos: d
    }
};
var MemoManager = function () {
    var b;
    for (b in this.PLACEMENTS) this.on(this.getEvent(this.PLACEMENTS[b], this.EVENTS.LOG), this.logFunction_)
};
_.extend(MemoManager.prototype, Backbone.Events);
a = MemoManager.prototype;
a.PLACEMENTS = {
    HOME_FEED: "0",
    OTHER_FEEDS: "1",
    REPIN_DIALOG: "2",
    OWN_PROFILE: "3",
    HOME_SCREEN: "5"
};
a.EVENTS = {
    CLOSE_MEMO: "closeMemo",
    DISMISS_MEMO: "dismissMemo",
    LOG: "log",
    MEMO_CLOSED: "memoClosed",
    MEMO_LOADED: "memoLoaded",
    MEMO_RECEIVED: "memoReceived",
    MEMO_REGISTERED: "memoRegistered"
};
a.LOG_EVENTS = {
    DISMISS: "dismiss",
    MEMO_ACCEPT: 4,
    MEMO_SKIP: 5,
    MEMO_CANCEL: 6
};
a.PIN_ID_PARAMETER = "pin_id";
a.MEMO_URL_ = "/get_memo/";
a.LOG_URL_ = "/get_memo/log/";
a.MEMO_PLACEMENT_PARAMETER_ = "memo_placement";
a.MEMO_NAME_PARAMETER_ = "memo_name";
a.EVENT_DELIMITER_ = ":";
a.EVENT_PARAMETER_ = "event";
a.EXTRA_CONTEXT_PARAMETER_ = "extra";
a.preLoadedMemoMap_ = {};
a.requestMemo = function (b, c) {
    var e = {}, f = this;
    if (this.preLoadedMemoMap_[b] && this.preLoadedMemoMap_[b].length > 0) {
        c = this.preLoadedMemoMap_[b].shift();
        this.trigger(this.getEvent(b, this.EVENTS.MEMO_RECEIVED), {
            data: c
        })
    } else {
        e[this.MEMO_PLACEMENT_PARAMETER_] = b;
        e[this.EXTRA_CONTEXT_PARAMETER_] = JSON.stringify(c);
        $.get(this.MEMO_URL_, e, function (g) {
            g && $.trim(g) !== "" && f.trigger(f.getEvent(b, f.EVENTS.MEMO_RECEIVED), {
                data: g
            })
        })
    }
};
a.registerMemo = function (b, c, e) {
    this.setStandardListeners_(b, c);
    this.trigger(this.getEvent(b, this.EVENTS.MEMO_REGISTERED), e)
};
a.getEvent = function (b, c) {
    return b + this.EVENT_DELIMITER_ + c
};
a.preloadMemos = function (b) {
    var c, e, f;
    this.preLoadedMemoMap_ = {};
    if (b) for (c = 0; c < b.length; c++) {
            e = b[c];
            f = $("<div/>").html(e.html).text();
            if (this.preLoadedMemoMap_[e.memo_placement]) this.preLoadedMemoMap_[e.memo_placement].push(f);
            else this.preLoadedMemoMap_[e.memo_placement] = [f]
    }
};
a.setStandardListeners_ = function (b, c) {
    var e = this,
        f = this.getEvent(b, this.EVENTS.MEMO_LOADED),
        g = function () {
            var d = $("#" + c),
                h = e.getEvent(b, e.EVENTS.CLOSE_MEMO),
                j = function () {
                    d.remove();
                    e.off(h, j);
                    e.off(f, g);
                    e.trigger(e.getEvent(b, e.EVENTS.MEMO_CLOSED))
                }, k = function () {
                    j();
                    e.trigger(e.getEvent(b, e.EVENTS.LOG), {
                        EVENT_PARAMETER_: e.LOG_EVENTS.DISMISS,
                        MEMO_PLACEMENT_PARAMETER_: b,
                        MEMO_NAME_PARAMETER_: c
                    })
                };
            $(".memo_close", d).click(k);
            e.on(h, j);
            var l = e.getEvent(b, e.EVENTS.DISMISS_MEMO);
            e.on(l, k)
        };
    e.on(f, g)
};
a.logFunction_ = function (b) {
    var c = {};
    c[this.MEMO_PLACEMENT_PARAMETER_] = b.MEMO_PLACEMENT_PARAMETER_;
    c[this.MEMO_NAME_PARAMETER_] = b.MEMO_NAME_PARAMETER_;
    c[this.EVENT_PARAMETER_] = b.EVENT_PARAMETER_;
    $.get(this.LOG_URL_, c, function () {})
};
var memoManager = new MemoManager;
var MemoPlacement = function (b, c, e, f, g, d) {
    this.memoManager = b;
    this.placement = c;
    this.isPopup = e;
    this.popup = null;
    if (this.isPopup) this.popup = new Popup;
    this.popupParentSelector = f;
    this.showFn = g;
    this.disposeFn = d
};
MemoPlacement.createAnchorPlacement = function (b, c, e, f) {
    return new MemoPlacement(b, c, false, null, e, f)
};
MemoPlacement.createPopupPlacement = function (b, c, e) {
    return new MemoPlacement(b, c, true, e, null, null)
};
MemoPlacement.prototype.requestMemo = function (b) {
    var c = this.memoManager,
        e = c.getEvent(this.placement, c.EVENTS.MEMO_RECEIVED),
        f = c.getEvent(this.placement, c.EVENTS.MEMO_CLOSED),
        g = this,
        d = function (l) {
            g.html = l.data;
            g.isPopup ? g.popup.setContents($(g.popupParentSelector), g.html) : g.showFn(g.html)
        }, h = c.getEvent(g.placement, c.EVENTS.MEMO_REGISTERED),
        j = function (l) {
            var r = {};
            if (g.isPopup) {
                r = l.getAnchor($(g.popupParentSelector));
                var u = l.anchorPosition,
                    o = l.popupPosition;
                l.arrowColor && g.popup.setArrowColor(l.arrowColor);
                g.popup.open(r, u, o);
                r = {
                    containerSelector: g.popupParentSelector
                }
            }
            c.trigger(c.getEvent(g.placement, c.EVENTS.MEMO_LOADED), r);
            g.isPopup && g.popup.refresh()
        }, k = function () {
            g.isPopup ? g.popup.close() : g.disposeFn();
            c.off(e, d);
            c.off(h, j);
            c.off(f, k)
        };
    c.on(e, d);
    c.on(h, j);
    c.on(f, k);
    if (b === undefined) b = {};
    c.requestMemo(this.placement, b)
};
MemoPlacement.prototype.refresh = function () {
    this.isPopup && this.popup.refresh()
};
var BoardLayout = function () {
    return {
        setup: function (b) {
            if (!this.setupComplete) {
                this.setupFlow();
                $(function () {
                    if (window.userIsAuthenticated) {
                        Like.gridListeners();
                        Follow.listeners();
                        Comment.gridComment();
                        Search.reportSearch();
                        RepinDialog2.setup()
                    }
                    UserBlockReport.listeners();
                    Zoom.setup()
                });
                this.center = !! b;
                this.setupComplete = true
            }
        },
        setupFlow: function (b) {
            if (!this.flowSetupComplete) {
                BoardLayout.allPins();
                b || $(window).resize(_.throttle(function () {
                    BoardLayout.allPins()
                }, 200));
                this.flowSetupComplete = true
            }
        },
        pinsContainer: ".BoardLayout",
        pinArray: [],
        orderedPins: [],
        mappedPins: {},
        nextPin: function (b) {
            b = this.orderedPins.indexOf(b) + 1;
            if (b >= this.orderedPins.length) return 0;
            return this.orderedPins[b]
        },
        previousPin: function (b) {
            b = this.orderedPins.indexOf(b) - 1;
            if (b >= this.orderedPins.length) return 0;
            return this.orderedPins[b]
        },
        columnCount: 4,
        columns: 0,
        columnWidthInner: 192,
        columnMargin: 15,
        columnPadding: 30,
        columnContainerWidth: 0,
        allPins: function () {
            var b = $(this.pinsContainer + " .pin"),
                c = this.getContentArea();
            this.columnWidthOuter = this.columnWidthInner +
                this.columnMargin + this.columnPadding;
            this.columns = Math.max(this.columnCount, parseInt(c / this.columnWidthOuter, 10));
            if (b.length < this.columns) this.columns = Math.max(this.columnCount, b.length);
            c = this.columnWidthOuter * this.columns - this.columnMargin;
            var e = document.getElementById("wrapper"),
                f = $("#HiddenBoards #hiddenWrapper")[0];
            if (e) e.style.width = c + "px";
            if (f) f.style.width = c + "px";
            $(".LiquidContainer").css("width", c + "px");
            for (c = 0; c < this.columns; c++) this.pinArray[c] = 0;
            document.getElementById("SortableButtons") ?
                this.showPins() : this.flowPins(b, true);
            if ($("#ColumnContainer .pin").length === 0 && window.location.pathname === "/") {
                $("#ColumnContainer").addClass("empty");
                setTimeout(function () {
                    window.location.reload()
                }, 5E3)
            }
        },
        newPins: function () {
            var b = window.jQuery ? ":last" : ":last-of-type",
                c = $(this.pinsContainer + b + " .pin");
            c = c.length > 0 ? c : $(this.pinsContainer + b + " .pin");
            this.flowPins(c)
        },
        flowPins: function (b, c) {
            if (c) {
                this.mappedPins = {};
                this.orderedPins = []
            }
            if (this.pinArray.length > this.columns) this.pinArray = this.pinArray.slice(0,
                    this.columns);
            for (c = 0; c < b.length; c++) this.positionPin(b[c]);
            this.updateContainerHeight();
            this.showPins();
            window.useLazyLoad && LazyLoad.invalidate()
        },
        positionPin: function (b) {
            var c = $(b).attr("data-id");
            if (c && this.mappedPins[c]) $(b).remove();
            else {
                var e = $(b).attr("data-force-col") ? $(b).attr("data-force-col") : _.indexOf(this.pinArray, Math.min.apply(Math, this.pinArray));
                this.addPinToColumn(b, e);
                this.mappedPins[c] = this.orderedPins.length;
                this.orderedPins.push(c)
            }
        },
        addPinToColumn: function (b, c) {
            var e = this.pinArray[c];
            b.style.top = e + "px";
            b.style.left = c * this.columnWidthOuter + "px";
            b.setAttribute("data-col", c);
            this.pinArray[c] = e + b.offsetHeight + this.columnMargin
        },
        flowFirstColumn: function () {
            this.pinArray[0] = 0;
            $('.pin[data-col="0"]').each(function (b, c) {
                BoardLayout.addPinToColumn(c, 0)
            })
        },
        showPins: function () {
            $.browser.msie && parseInt($.browser.version, 10) == 7 || $(this.pinsContainer).css("opacity", 1);
            var b = $(this.pinsContainer);
            setTimeout(function () {
                b.css({
                    visibility: "visible"
                })
            }, 200)
        },
        imageLoaded: function () {
            $(this).removeClass("lazy")
        },
        getContentArea: function () {
            return this.contentArea || document.documentElement.clientWidth
        },
        updateContainerHeight: function () {
            $("#ColumnContainer").height(Math.max.apply(Math, this.pinArray))
        }
    }
}();
var LazyLoad = new(function () {
    var b = this,
        c = 0,
        e = 0,
        f = 100,
        g = $(window);
    b.images = {};
    b.invalidate = function () {
        $("img.lazy").each(function (u, o) {
            u = $(o);
            b.images[u.attr("data-id")] = u;
            h(u) && j(u)
        })
    };
    b.check = function () {
        var u, o = false;
        return function () {
            if (!o) {
                o = true;
                clearTimeout(u);
                u = setTimeout(function () {
                    o = false;
                    d()
                }, 200)
            }
        }
    }();
    var d = function () {
        var u = 0,
            o = 0;
        for (var m in b.images) {
            var s = b.images[m];
            u++;
            if (h(s)) {
                j(s);
                o++
            }
        }
    };
    b.stop = function () {
        g.unbind("scroll", k);
        g.unbind("resize", l)
    };
    var h = function (u) {
        return u.offset().top <=
            f
    }, j = function (u) {
            if (u.hasClass("lazy")) {
                var o = u.attr("data-src"),
                    m = u.attr("data-id");
                u.load(function () {
                    if (u[0]) u[0].style.opacity = "1";
                    delete b.images[m]
                });
                u.attr("src", o);
                u.removeClass("lazy");
                if (u[0]) u[0].style.opacity = "0"
            }
        }, k = function () {
            c = $(window).scrollTop();
            r();
            b.check()
        }, l = function () {
            e = $(window).height();
            r();
            b.check()
        }, r = function () {
            f = c + e + 600
        };
    if (window.useLazyLoad) {
        g.ready(function () {
            k();
            l()
        });
        g.scroll(k);
        g.resize(l)
    }
});
var FancySelect = function () {
    return {
        setup: function (b, c, e, f) {
            function g() {
                k.hide();
                $("body").off("click.FancySelect")
            }
            function d() {
                if (!k.is(":visible")) {
                    k.show();
                    window.setTimeout(function () {
                        $("body").on("click.FancySelect", function () {
                            g()
                        })
                    }, 1)
                }
            }
            function h(m) {
                m = m.find(".primaryText").text() || m.text();
                r.text(m)
            }
            var j = $('<div class="FancySelect"><div class="current"><span class="CurrentSelection"></span><span class="DownArrow"></span></div><div class="FancySelectList"><div class="wrapper"><ul></ul></div></div></div>'),
                k = $(".FancySelectList", j),
                l = $("ul", k),
                r = $(".CurrentSelection", j),
                u = "",
                o;
            b = $(b);
            o = b.prop("selectedIndex");
            c = c || function () {
                var m = $(this).val();
                if (f) {
                    var s = $(this).text().split(f),
                        v = s[0];
                    s = s[1];
                    return '<li data="' + m + '"><span class="primaryText">' + v + "</span>" + (s ? ' <span class="subtext">' + s + "</span>" : "") + "</li>"
                } else {
                    v = $(this).text();
                    return '<li data="' + m + '"><span>' + v + "</span></li>"
                }
            };
            $("option", b).each(function (m) {
                u += c.call(this, m, m === o)
            });
            l.html(u);
            h(l.find("li").eq(o));
            b.before(j);
            b.hide();
            j.click(function () {
                d()
            });
            l.on("click", "li", function () {
                var m = $(this).prevAll().length;
                b.prop("selectedIndex", m);
                h($(this));
                g();
                e && e($(this).attr("data"));
                return false
            })
        }
    }
}();
var BoardPicker = function () {
    var b = {
        setup: function (c, e, f) {
            c = $(c);
            var g = this,
                d = $(".BoardListOverlay", c.parent()),
                h = $(".BoardList", c),
                j = $(".CurrentBoard", c),
                k = $("ul", h);
            g.currentBoardStatus = $(".current .CurrentBoardStatus");
            g.privateBoardCls = "PrivateBoard";
            var l = function () {
                if (c.hasClass("NoBoards")) d.hide();
                else {
                    h.hide();
                    d.hide();
                    g.trigger(g.EVENTS.BOARD_LIST_CLOSED)
                }
            };
            c.click(function () {
                if (!c.hasClass("NoBoards")) if (!c.hasClass("disabled")) {
                        h.show();
                        d.show()
                    }
            });
            d.click(function () {
                l()
            });
            $(k).on("click",
                "li", function () {
                if (!$(this).hasClass("noSelect")) {
                    j.text($(this).text());
                    $(".PrivateBoard", this).length ? g.currentBoardStatus.addClass(g.privateBoardCls) : g.currentBoardStatus.removeClass(g.privateBoardCls);
                    l();
                    var v = $(".PinForm .twitter"),
                        x = $(".PinForm .facebook");
                    if ($(this).find(".PrivateBoard").length == 0) {
                        v.show();
                        x.show()
                    } else {
                        v.hide();
                        x.hide()
                    }
                    e && e($(this).attr("data"))
                }
                return false
            });
            var r = $(".CreateBoard", h),
                u = $("input[name='title']", r),
                o = $(".Button", r),
                m = $(".CreateBoardStatus", r),
                s = u.val();
            u.defaultValue(s, "DefaultBoardName");
            o.click(function () {
                if (o.attr("disabled") == "disabled") return false;
                if (u.val() == s) {
                    m.html("Enter a board name").css("color", "red").show();
                    return false
                }
                m.html("").hide();
                o.addClass("disabled").attr("disabled", "disabled");
                var v = $("input[name='secret']", r).is(":checked");
                $.post("/board/create/", {
                    name: u.val(),
                    pass_category: true,
                    secret: v
                }, function (x) {
                    if (x && x.status == "success") {
                        g.removeNoBoardUi(c);
                        k.append("<li data='" + x.id + "'><span>" + $("<div/>").text(x.name).html() +
                            "</span></li>");
                        l();
                        j.text(x.name);
                        v === false ? g.currentBoardStatus.removeClass(g.privateBoardCls) : g.currentBoardStatus.addClass(g.privateBoardCls);
                        u.val("").blur();
                        o.removeClass("disabled").removeAttr("disabled");
                        f && f(x.id);
                        g.trigger(g.EVENTS.BOARD_CREATED)
                    } else {
                        x.status === "failure" && x.message && alert(x.message);
                        m.html(x.message).css("color", "red").show();
                        o.removeClass("disabled").removeAttr("disabled")
                    }
                }, "json");
                return false
            })
        },
        reorderListItems: function (c) {
            var e = $(".BoardList", c);
            e = $("ul", e);
            var f =
                e.children(),
                g = $(".CurrentBoard", c),
                d = null;
            c = null;
            if (g) {
                f.detach().sort(function (h, j) {
                    h = $.trim($(h).text()).toLocaleLowerCase();
                    j = $.trim($(j).text()).toLocaleLowerCase();
                    return h.localeCompare(j)
                });
                c = f.filter(function (h) {
                    if ($.trim($(this).text()) === $.trim(g.text())) {
                        d = h;
                        return true
                    }
                    return false
                });
                if (d) {
                    f.splice(d, 1);
                    f = c.add(f)
                }
                e.append(f)
            }
        },
        openBoardPicker: function (c) {
            var e = $(".BoardListOverlay", c.parent()),
                f = $(".BoardList", c),
                g = $(".CreateBoard", f);
            g = $("input", g);
            if (!c.hasClass("NoBoards")) {
                f.show();
                e.show();
                g.focus();
                g.blur()
            }
        },
        getBoardInput: function (c) {
            c = $(".BoardList", c);
            c = $(".CreateBoard", c);
            return $("input", c)
        },
        suggestBoard: function (c, e) {
            var f = $(".BoardListOverlay", c.parent()),
                g = $(".BoardList", c),
                d = $(".CreateBoard", g);
            d = $("input", d);
            d.val($.trim(e));
            if (!c.hasClass("NoBoards")) {
                g.show();
                f.show()
            }
            d.focus()
        },
        removeNoBoardUi: function (c) {
            c.removeClass("NoBoards");
            $(".current", c).show()
        },
        EVENTS: {
            BOARD_CREATED: "boardCreated",
            BOARD_LIST_CLOSED: "boardListClosed",
            OPEN_BOARD_PICKER: "openBoardPicker",
            SUGGEST_BOARD: "suggestBoard"
        }
    };
    _.extend(b, Backbone.Events);
    b.on(b.EVENTS.SUGGEST_BOARD, function (c) {
        var e = $(".BoardPicker", $(c.containerSelector));
        b.suggestBoard(e, c.boardTitle)
    });
    b.on(b.EVENTS.OPEN_BOARD_PICKER, function (c) {
        c = $(".BoardPicker", $(c.containerSelector));
        b.openBoardPicker(c)
    });
    return b
}();
var CropImage = function () {
    this.initialize.apply(this, arguments)
};
(function () {
    var b = Backbone.View.extend({
        el: "#CropImage",
        events: {
            "click .cancel": "onClose",
            "click .save": "onSave",
            "mousedown .drag": "onStartDrag"
        },
        dragging: false,
        mousePosition: {},
        initialize: function () {
            _.bindAll(this, "onDragging", "onStopDragging", "onImageLoaded");
            _.defaults(this.options, {
                title: "Crop Image",
                buttonTitle: "Save",
                size: {
                    width: 222,
                    height: 150
                }
            });
            this.$holder = this.$el.find(".holder");
            this.$bg = this.$el.find(".holder .bg");
            this.$overlay = this.$el.find(".holder .overlayContent");
            this.$frame = this.$el.find(".holder .frame");
            this.$mask = this.$el.find(".holder .mask");
            this.$footer = this.$el.find(".footer");
            this.$button = this.$el.find(".footer .Button.save");
            this.$spinner = this.$el.find(".holder .spinner")
        },
        render: function () {
            this.$el.find(".header span").text(this.options.title);
            this.$button.text(this.options.buttonTitle).removeClass("disabled");
            this.$holder.show().css("height", this.options.size.height + 120 + 40);
            this.$footer.find(".buttons").css("visibility", "visible");
            this.$footer.find(".complete").hide();
            this.$bg.html("").show();
            this.$spinner.hide();
            this.options.className && this.$el.addClass(this.options.className);
            this.options.overlay && this.$overlay.html("").append(this.options.overlay);
            var c = this.bounds = {
                left: this.$holder.width() / 2 - this.options.size.width / 2,
                width: this.options.size.width,
                top: 60,
                height: this.options.size.height
            };
            c.ratio = c.height / c.width;
            this.$frame.css(c);
            this.$mask.find("span").each(function (e, f) {
                e === 0 && $(f).css({
                    top: 0,
                    left: 0,
                    right: 0,
                    height: c.top
                });
                e === 1 && $(f).css({
                    top: c.top,
                    left: c.left + c.width,
                    right: 0,
                    height: c.height
                });
                e === 2 && $(f).css({
                    top: c.top + c.height,
                    left: 0,
                    right: 0,
                    bottom: 0
                });
                e === 3 && $(f).css({
                    top: c.top,
                    left: 0,
                    width: c.left,
                    height: c.height
                })
            });
            this.options.image && this.setImage(this.options.image)
        },
        onClose: function () {
            this.trigger("close");
            return false
        },
        onSave: function () {
            this.trigger("save");
            return false
        },
        onImageLoaded: function (c) {
            if (this.$img.height() === 0) return setTimeout(this.onImageLoaded, 200, c);
            this.$img.removeAttr("width").removeAttr("height");
            c = this.imageBounds = {
                originalWidth: this.$img.width(),
                originalHeight: this.$img.height()
            };
            c.ratio = c.originalHeight / c.originalWidth;
            this.$img.css({
                visibility: "visible",
                opacity: 1
            });
            this.fitImage();
            this.centerImage();
            this.hideSpinner()
        },
        onStartDrag: function (c) {
            this.mousePosition = {
                x: c.pageX,
                y: c.pageY
            };
            this.startPosition = {
                x: parseInt(this.$bg.css("left"), 10),
                y: parseInt(this.$bg.css("top"), 10)
            };
            this.trigger("startDrag");
            this.dragging = true;
            $("body").on({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            });
            c.preventDefault()
        },
        onDragging: function (c) {
            var e = {
                top: this.startPosition.y + (c.pageY - this.mousePosition.y),
                left: this.startPosition.x + (c.pageX - this.mousePosition.x)
            };
            if (this.enforceBounds(e)) {
                this.$bg.css(e);
                c.preventDefault()
            }
        },
        onStopDragging: function () {
            this.trigger("stopDrag");
            this.dragging = false;
            $("body").off({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            })
        },
        enforceBounds: function (c) {
            c.top = Math.min(c.top, this.bounds.top);
            c.left = Math.min(c.left, this.bounds.left);
            if (c.left + this.imageBounds.width < this.bounds.left + this.bounds.width) c.left = this.bounds.left + this.bounds.width - this.imageBounds.width +
                    1;
            if (c.top + this.imageBounds.height < this.bounds.top + this.bounds.height) c.top = this.bounds.top + this.bounds.height - this.imageBounds.height + 1;
            return c
        },
        showComplete: function () {
            this.$footer.find(".buttons").css("visibility", "hidden");
            this.$footer.find(".complete").fadeIn(300);
            this.hideSpinner()
        },
        setImage: function (c) {
            this.showSpinner();
            var e = this.$img = $("<img>");
            e.load(this.onImageLoaded).css({
                opacity: "0.01",
                visibility: "hidden"
            });
            e.attr("src", c);
            this.$bg.html(e)
        },
        fitImage: function () {
            var c = 1;
            c = this.imageBounds.ratio >=
                this.bounds.ratio ? this.bounds.width / this.imageBounds.originalWidth : this.bounds.height / this.imageBounds.originalHeight;
            this.scaleImage(c, 10)
        },
        centerImage: function () {
            var c = this.$holder.height() - 40,
                e = this.$holder.width();
            this.$bg.css({
                top: c / 2 - this.$bg.height() / 2 + 1,
                left: e / 2 - this.$bg.width() / 2 + 1
            })
        },
        scaleImage: function (c, e) {
            var f = this.imageBounds.width = this.imageBounds.originalWidth * c + e || 0;
            c = this.imageBounds.height = this.imageBounds.originalHeight * c + e || 0;
            this.$img.attr("width", f);
            this.$img.attr("height",
                c)
        },
        getOffset: function () {
            return {
                x: Math.abs(parseInt(this.$bg.css("left"), 10) - this.bounds.left),
                y: Math.abs(parseInt(this.$bg.css("top"), 10) - this.bounds.top)
            }
        },
        getScale: function () {
            return this.$img.width() / this.imageBounds.originalWidth
        },
        saving: function () {
            this.showSpinner();
            this.$button.addClass("disabled")
        },
        showSpinner: function () {
            this.$spinner.show()
        },
        hideSpinner: function () {
            this.$spinner.hide()
        }
    });
    CropImage.prototype = {
        initialize: function () {
            _.bindAll(this, "save", "close")
        },
        show: function (c) {
            var e = this;
            c = this.view = new b(c);
            this.options = this.view.options;
            c.on("save", this.save);
            c.on("close", this.close);
            c.on("stopDrag", function () {
                e.trigger("dragComplete")
            });
            Modal.show("CropImage");
            c.render()
        },
        setImage: function (c) {
            this.view.setImage(c)
        },
        setParams: function (c) {
            this.options.params = c
        },
        save: function () {
            var c = this,
                e = this.view.getOffset(),
                f = this.view.getScale();
            e = _.extend({
                x: e.x,
                y: e.y,
                width: this.options.size.width,
                height: this.options.size.height,
                scale: f
            }, this.options.params || {});
            this.view.saving();
            this.trigger("saving",
                e);
            $.ajax({
                url: this.options.url,
                data: e,
                dataType: "json",
                type: "POST",
                success: function (g) {
                    c.view.hideSpinner();
                    c.trigger("save", g);
                    c.options.delay !== 0 && c.view.showComplete();
                    setTimeout(c.close, c.options.delay || 1200)
                }
            })
        },
        close: function () {
            Modal.close("CropImage");
            this.view.undelegateEvents();
            this.trigger("close");
            delete this.view;
            delete this.options
        }
    };
    _.extend(CropImage.prototype, Backbone.Events)
})();
var BoardCoverSelector = function () {
    this.initialize.apply(this, arguments)
};
(function () {
    var b = null;
    BoardCoverSelector.prototype = {
        pins: null,
        index: null,
        boardURL: null,
        initialize: function () {
            if (b) {
                b.cancel();
                b = null
            }
            _.bindAll(this, "onKeyup", "onPinsLoaded", "onSave", "onSaving", "removeListeners", "next", "previous");
            b = this;
            this.options = {};
            this.imageCrop = new CropImage;
            this.imageCrop.on("close", this.removeListeners);
            this.imageCrop.on("save", this.onSave);
            this.imageCrop.on("saving", this.onSaving);
            this.imageCrop.on("dragComplete", function () {
                trackGAEvent("board_cover", "dragged")
            });
            this.$img =
                $("<img>")
        },
        loadPins: function () {
            $.ajax({
                url: this.options.boardURL + "pins/",
                dataType: "json",
                success: this.onPinsLoaded
            });
            this.boardURL = this.options.boardURL
        },
        show: function (c) {
            this.options = c;
            this.imageCrop.show({
                className: "BoardCover",
                overlay: this.overlayContent(),
                params: {
                    pin: c.pin
                },
                image: this.options.image,
                size: {
                    width: 222,
                    height: 150
                },
                title: c.title || "Select a cover photo and drag to position it.",
                buttonTitle: c.buttonTitle || "Set Cover",
                url: this.options.boardURL + "cover/",
                delay: c.delay
            });
            if (!this.pins ||
                this.boardURL != this.options.boardURL) this.loadPins();
            else this.options.image || this.setIndex(0);
            trackGAEvent("board_cover", "show");
            $("body").keyup(this.onKeyup)
        },
        onPinsLoaded: function (c) {
            var e = null;
            if (this.options.image) {
                var f = this.options.image;
                _.each(c.pins, function (g, d) {
                    if (e == null && f.match(new RegExp(g.image_key, "gi"))) e = d
                })
            }
            this.index = e || 0;
            this.pins = c.pins;
            if (this.pins.length !== 0) {
                this.pins.length === 1 ? this.hideArrows() : this.preload([e - 1, e + 1]);
                e === null && this.setIndex(0)
            }
        },
        onKeyup: function (c) {
            if (this.index !==
                null) {
                c.keyCode === 37 && this.previous();
                c.keyCode === 39 && this.next();
                c.keyCode === 27 && this.imageCrop.close();
                c.keyCode === 13 && this.imageCrop.save()
            }
        },
        overlayContent: function () {
            var c = this.$holder = $("<div class='BoardOverlay'></div>"),
                e = $('<button class="prev Button WhiteButton Button13" type="button"><em></em></button>').click(this.previous),
                f = $('<button class="next Button WhiteButton Button13" type="button"><em></em></button>').click(this.next);
            c.append("<h3 class='serif'>" + this.options.boardName + "</h3>");
            c.append(e, f);
            return c
        },
        next: function () {
            this.index === this.pins.length - 1 ? this.setIndex(0) : this.setIndex(this.index + 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        previous: function () {
            this.index === 0 ? this.setIndex(this.pins.length - 1) : this.setIndex(this.index - 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        setIndex: function (c) {
            var e = this.pins[c];
            if (e) {
                this.imageCrop.setImage(e.url);
                this.imageCrop.setParams({
                    pin: e.id
                });
                this.index = c;
                this.preload([this.index - 2, this.index - 1, this.index +
                        1, this.index + 2
                ])
            }
        },
        preload: function (c) {
            var e = this;
            _.each(c, function (f) {
                if (f = e.pins[f])(new Image).src = f.url
            })
        },
        hideArrows: function () {
            this.$holder.find(".arrow").hide()
        },
        removeListeners: function () {
            $("body").unbind("keyup", this.onKeyup)
        },
        onSaving: function () {
            this.hideArrows()
        },
        onSave: function (c) {
            this.options.success && this.options.success(c);
            trackGAEvent("board_cover", "saved")
        }
    };
    _.extend(BoardCoverSelector.prototype, Backbone.Events)
})();
var AddDialog = function () {
    return {
        setup: function (b) {
            var c = "#" + b,
                e = $(c),
                f = $(".Buttons .RedButton", e),
                g = $(".mainerror", e),
                d = $(".DescriptionTextarea", e);
            BoardPicker.setup(c + " .BoardPicker", function (h) {
                $(c + " #id_board").val(h)
            }, function (h) {
                $(c + " #id_board").val(h)
            });
            AddDialog.shareCheckboxes(b);
            Tagging.initTextarea(c + " .DescriptionTextarea");
            Tagging.priceTag(c + " .DescriptionTextarea", c + " .ImagePicker");
            CharacterCount.setup(c + " .DescriptionTextarea", c + " .CharacterCount", c + " .Button");
            f.click(function () {
                if (f.hasClass("disabled")) return false;
                trackGAEvent("pin", "clicked", "add_dialogue");
                if (d.val() === "" || d.val() === "Describe your pin...") {
                    g.html("Please describe your pin").slideDown(300);
                    return false
                } else g.slideUp(300, function () {
                        g.html("")
                    });
                f.addClass("disabled").html("Pinning...");
                $("#id_details", e).val(d.val());
                Tagging.loadTags(c + " .DescriptionTextarea", c + " #peeps_holder", c + " #id_tags", c + " #currency_holder");
                $("form", e).ajaxSubmit({
                    url: "/pin/create/",
                    type: "POST",
                    dataType: "json",
                    iframe: true,
                    success: function (h) {
                        if (h.status == "success") {
                            trackGAEvent("pin",
                                "success", "add_dialogue");
                            window.location = h.url
                        } else if (h.captcha) {
                            RecaptchaDialog.challenge();
                            AddDialog.reset(b)
                        } else g.html(h.message).slideDown(300)
                    }
                });
                return false
            })
        },
        reset: function (b) {
            b === "CreateBoard" && CreateBoardDialog.reset();
            b === "ScrapePin" && ScrapePinDialog.reset();
            b === "UploadPin" && UploadPinDialog.reset();
            AddDialog._resets[b] && AddDialog._resets[b]()
        },
        close: function (b, c) {
            $("#" + b).addClass("super");
            Modal.show(c)
        },
        childClose: function (b, c) {
            var e = this,
                f = $("#" + c);
            $(".ModalContainer", f);
            e.reset(c);
            $("#" + b).removeClass("super");
            Modal.close(b);
            Modal.close(c);
            P.CONTEXT = P.CONTEXT || {};
            setCookie("component", P.CONTEXT.component)
        },
        pinBottom: function (b) {
            var c = $("#" + b);
            $(".PinBottom", c).slideDown(300, function () {
                var e = $(".modal:first", c);
                e.css("margin-bottom", "-" + e.outerHeight() / 2 + "px")
            })
        },
        shareCheckboxes: function (b) {
            function c(g) {
                var d = $("#" + b),
                    h = $(".publish_to_" + g, d),
                    j = $("#id_publish_to_" + g, d);
                h.change(function () {
                    if (h.is(":checked")) {
                        j.attr("checked", "checked");
                        h.parent().addClass("active")
                    } else {
                        j.removeAttr("checked");
                        h.parent().removeClass("active")
                    }
                });
                var k = h.is(":checked");
                return function () {
                    if (k) {
                        h.parent().addClass("active");
                        h.attr("checked", "checked")
                    } else {
                        h.parent().removeClass("active");
                        h.removeAttr("checked")
                    }
                }
            }
            var e = c("facebook"),
                f = c("twitter");
            AddDialog._resets = AddDialog._resets || {};
            AddDialog._resets[b] = function () {
                e();
                f()
            }
        }
    }
}();
var Home = function () {
    return {
        setup: function () {
            var b = null,
                c = $(window),
                e = false;
            $(document).ready(function () {
                if ($("#CategoriesBarPage #TopNagCallout").length) {
                    $("#SearchAutocompleteHolder ul").css("top", "71px");
                    $("#UnauthCallout .Nag").css("top", "110px")
                }
            });
            $(window).scroll(function () {
                var f = c.scrollTop() >= 44;
                if ($("#CategoriesBarPage #TopNagCallout").length) f = c.scrollTop() >= 80;
                b || (b = $("#CategoriesBar, .Nag"));
                if (!e && f) {
                    b.addClass("fixed");
                    e = true
                } else if (e && !f) {
                    b.removeClass("fixed");
                    e = false
                }
            });
            $("#home_request_invite_button").click(function () {
                var f =
                    $(this);
                if ($("#home_request_invite").val() == "Your Email Address" || $("#home_request_invite").val() == "") $(".signup span").html("Please enter an email").css("color", "red");
                else {
                    f.addClass("pressed").attr("disabled", "disabled");
                    $.post("/", {
                        email: $("#home_request_invite").val()
                    }, function (g) {
                        if (g.status == "success") {
                            $(".signup span").html("Thanks. You're on the list!").css("color", "green");
                            $("#home_request_invite").val("")
                        } else {
                            $(".signup span").html(g.message).css("color", "red");
                            this_button.removeAttr("disabled").removeClass("pressed")
                        }
                    },
                        "json")
                }
                return false
            });
            $(".remove_activity_rec").live("click", function () {
                $this_element = $(this);
                $.get("/remove_follow_recommend/?rec_id=" + $(this).attr("data-remove_id"), function (f) {
                    if (f && f.status == "success") {
                        window.activity_feed.update_ui_followed_succeeded($this_element);
                        f = $(this).parent().siblings(".hidden")[0];
                        $(f).removeClass("hidden")
                    } else alert(f.message)
                })
            });
            $(".remove_activity_invite").live("click", function () {
                var f = $(this);
                $.get("/remove_invite/?rec_id=" + $(this).attr("data-remove_id"), function (g) {
                    if (g.status ==
                        "success") {
                        window.activity_feed.update_ui_invited_user(f);
                        g = $(this).parent().siblings(".hidden")[0];
                        $(g).removeClass("hidden")
                    } else alert(g.message)
                })
            });
            $("#follow_all_link").live("click", function () {
                $.get("/follow_all_recommends/", function (f) {
                    f && f.status == "success" ? window.activity_feed.update_ui_followed_all_recommened() : alert(f.message)
                })
            });
            $("#invite_all_link").live("click", function () {
                $.get("/invite_all/", function (f) {
                    f && f.status == "success" ? window.activity_feed.update_ui_invited_all_users() : alert(f.message)
                })
            })
        },
        activityFeedSupport: function () {
            this.init = function () {
                this.invite_all_link = $("#invite_all_link");
                this.follow_all_link = $("#follow_all_link")
            };
            this.update_ui_invited_user = function (b) {
                this.fade_row(b);
                if (this.invite_all_link && this.invite_all_link.length) if (this.invite_all_link.attr("data-total_count")) {
                        b = this.invite_all_link.attr("data-total_count");
                        if (b == "1") this.hide_invites();
                        else {
                            this.invite_all_link.attr("data-total_count", b - 1);
                            this.invite_all_link.html("Invite all (" + (b - 1) + ")")
                        }
                    }
            };
            this.update_ui_followed_succeeded = function (b) {
                this.fade_row(b);
                if (this.follow_all_link && this.follow_all_link.length) if (this.follow_all_link.attr("data-total_count")) {
                        b = this.follow_all_link.attr("data-total_count");
                        if (b == "1") this.hide_recommends();
                        else {
                            this.follow_all_link.attr("data-total_count", b - 1);
                            this.follow_all_link.html("Follow all (" + (b - 1) + ")")
                        }
                    }
            };
            this.update_ui_invited_all_users = function () {
                this.hide_invites()
            };
            this.update_ui_followed_all_recommened = function () {
                this.hide_recommends()
            };
            this.fade_row = function (b) {
                b.parents(".story:first").fadeOut()
            };
            this.hide_invites = function () {
                this.invite_all_link.parents("#invite_friends:first").fadeOut()
            };
            this.hide_recommends = function () {
                this.follow_all_link.parents("#recommended_friends:first").fadeOut()
            }
        }
    }
}();
var GetNewPins = function () {
    return {
        timeout: null,
        timeoutLength: 8192,
        timeoutLengthMax: 524288,
        marker: 0,
        indicator: "#NewIndicator",
        newPins: {
            html: "",
            number: 0,
            old_title: $("title").html()
        },
        setTimeout: function () {
            var b = this;
            b.timeout = setTimeout("GetNewPins.checkForPins()", b.timeoutLength)
        },
        resetTimeout: function () {
            window.clearTimeout(this.timeout);
            this.setTimeout()
        },
        trigerOnScroll: function () {
            var b = this;
            b.setTimeout();
            $(window).bind("scroll", function () {
                b.timeoutLength = 8192;
                b.resetTimeout()
            })
        },
        checkForPins: function () {
            var b =
                this;
            $.get("/new/", {
                marker: b.marker,
                number: b.newPins.number
            }, function (c) {
                if (c.number > 0) {
                    var e = b.indicator;
                    b.marker = c.marker;
                    b.newPins.html += c.html;
                    b.newPins.number += c.number;
                    $("title").html("(" + b.newPins.number + ") " + b.newPins.old_title);
                    $(e).html(c.total_number_str);
                    $(e).hasClass("Offscreen") && $(e).removeClass("Offscreen");
                    if (b.timeoutLength < b.timeoutLengthMax) b.timeoutLength *= 2;
                    b.setTimeout()
                }
            })
        },
        showNewPins: function () {
            var b = this,
                c = b.indicator,
                e = $(".feed");
            e[0] ? e.last().after(b.newPins.html) : $("#ColumnContainer").prepend(b.newPins.html);
            BoardLayout.allPins();
            $(c).addClass("Offscreen");
            $(c).html("");
            $("title").html(b.newPins.old_title);
            b.newPins = {
                html: "",
                number: 0,
                old_title: $("title").html()
            };
            b.resetTimeout();
            $("html, body").animate({
                scrollTop: "0px"
            }, 400);
            return false
        }
    }
}();
var BoardSort = BoardSort || {
    StartButton: "#slk_sort_boards",
    SaveButton: "#RearrangeButton",
    FollowButtons: ".followBoard .Button",
    Container: "#ColumnContainer .sortable",
    Objects: "#ColumnContainer .pinBoard",
    Helper: "#SortableButtons",
    showControls: function () {
        $(this.Helper).slideDown();
        $(this.FollowButtons).hide();
        $(this.Objects).addClass("inMotion")
    },
    hideControls: function () {
        $(this.Helper).slideUp();
        $(this.FollowButtons).show();
        $(this.Objects).removeClass("inMotion")
    },
    start: function () {
        this.showControls();
        $(this.Container).sortable();
        return false
    },
    save: function () {
        trackGAEvent("rearrange_board_save", "clicked");
        this.hideControls();
        $(this.Container).sortable("destroy");
        $(this.Objects).removeClass("inMotion");
        var b = [];
        $(this.Objects).each(function () {
            b.push(this.id.replace("board", ""))
        });
        $.post($(this.SaveButton).attr("href"), {
            order_array: b.toString()
        }, function (c) {
            if (c.status == "success") {
                trackGAEvent("rearrange_board_save", "success");
                console.log("Sorting saved.");
                $("#SortStatus").html("Saved!").css("color", "green").stop().css("opacity",
                    "1").animate({
                    opacity: "0"
                }, 5E3)
            } else {
                console.log("Sorting failed.");
                $("#SortStatus").html("Saved Failed &mdash; <a href='#' onclick='boardSort.save(); return false' style='font-weight: 300;'>Try Again</a>?").css("color", "#221919").css("opacity", "1")
            }
        });
        return false
    },
    cancel: function () {
        this.hideControls();
        window.location.reload();
        return false
    }
};
var Follow = function () {
    return {
        listeners: function () {
            var b = this;
            $(".followbutton").live("click", function () {
                trackGAEvent("follow_board", "clicked");
                b.followBoard($(this));
                return false
            });
            $(".unfollowbutton").live("click", function () {
                trackGAEvent("unfollow_board", "clicked");
                b.unfollowBoard($(this));
                return false
            });
            $(".followuserbutton").live("click", function () {
                trackGAEvent("follow_user", "clicked");
                b.followUser($(this));
                return false
            });
            $(".unfollowuserbutton").live("click", function () {
                trackGAEvent("unfollow_user",
                    "clicked");
                b.unfollowUser($(this));
                return false
            });
            $(".ignorerecommendationbutton").live("click", function () {
                b.ignoreUser($(this));
                return false
            })
        },
        followBoard: function (b) {
            var c = this;
            this.setFollowBoardButton(b, {
                follow: false,
                disabled: true
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                error: function () {
                    c.setFollowBoardButton(b, {
                        follow: true,
                        disabled: false
                    })
                },
                success: function (e) {
                    if (e.status === "failure") {
                        if (e.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        ShowError(e.message, function () {
                            c.setFollowBoardButton(b, {
                                follow: true,
                                disabled: false
                            })
                        });
                        return false
                    }
                    trackGAEvent("follow_board", "success");
                    c.setFollowBoardButton(b, {
                        follow: false,
                        disabled: false
                    });
                    $(window).trigger("board:followed", [b])
                }
            })
        },
        unfollowBoard: function (b) {
            var c = this;
            this.setFollowBoardButton(b, {
                follow: true,
                disabled: true
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    unfollow: 1
                },
                error: function () {
                    c.setFollowBoardButton(b, {
                        follow: false,
                        disabled: false
                    })
                },
                success: function () {
                    trackGAEvent("unfollow_board", "success");
                    c.setFollowBoardButton(b, {
                        follow: true,
                        disabled: false
                    });
                    $(window).trigger("board:unfollowed", [b])
                }
            })
        },
        followUser: function (b) {
            var c = $("#profile").length != 0 ? "Unfollow All" : "Unfollow",
                e = this;
            if (b.data("text-unfollow")) c = b.data("text-unfollow");
            var f = b.text();
            b.text(c).removeClass("followuserbutton").addClass("disabled unfollowuserbutton").attr("disabled", "disabled");
            var g = $(".followbutton");
            g.each(function () {
                e.setFollowBoardButton($(this), {
                    follow: false,
                    disabled: false
                })
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                error: function () {},
                success: function (d) {
                    if (d.status === "failure") {
                        if (d.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        ShowError(d.message, function () {
                            b.text(f).removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").removeAttr("disabled");
                            g.each(function () {
                                e.setFollowBoardButton($(this), {
                                    follow: true,
                                    disabled: false
                                })
                            })
                        });
                        return false
                    }
                    trackGAEvent("follow_user", "success");
                    b.removeAttr("disabled").addClass("clickable");
                    $(window).trigger("user:followed", [b])
                }
            })
        },
        unfollowUser: function (b) {
            var c =
                $("#profile").length != 0 ? "Follow All" : "Follow",
                e = this;
            if (b.data("text-follow")) c = b.data("text-follow");
            b.text(c).removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").attr("disabled", "disabled");
            $(".unfollowbutton").each(function () {
                e.setFollowBoardButton($(this), {
                    follow: true,
                    disabled: false
                })
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    unfollow: 1
                },
                error: function () {},
                success: function () {
                    trackGAEvent("unfollow_user", "success");
                    b.removeAttr("disabled");
                    $(window).trigger("user:unfollowed", [b])
                }
            })
        },
        ignoreUser: function (b) {
            var c = _.map(b.closest(".section").find(".FollowStory"), function (e) {
                return $(e).attr("data-user-id")
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    displayed_user_ids: c
                },
                error: function () {},
                success: function (e) {
                    var f = b.closest(".story"),
                        g = b.closest(".section"),
                        d = Follow.countStories(g);
                    trackGAEvent("ignore_user", "success", "source", b.data("source"));
                    e = $(e.html).css("padding-top", f.css("padding-top"));
                    e.insertAfter(f).hide();
                    Follow.replaceRecommendation(f,
                        d, e, g)
                }
            })
        },
        replaceRecommendation: function (b, c, e, f) {
            b.fadeOut(350, function () {
                b.remove();
                Follow.handleChangingStories(c, Follow.countStories(f));
                e.fadeIn(350)
            })
        },
        countStories: function (b) {
            return b.find(".FollowStory").length
        },
        handleChangingStories: function (b, c) {
            if (c == 0) {
                var e = $("#UserRecommendations");
                e.fadeOut(350, function () {
                    e.remove()
                })
            }
            b != c && BoardLayout.allPins()
        },
        followUserHomeActivity: function (b) {
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    is_home: true
                },
                error: function () {},
                success: function () {
                    trackGAEvent("follow_user_home_activity",
                        "success");
                    window.activity_feed.update_ui_followed_succeeded(b)
                }
            })
        },
        pullRecommendation: function (b, c) {
            b = _.map($(b).closest(".section").find(".FollowStory"), function (e) {
                return $(e).attr("data-user-id")
            });
            $.ajax({
                url: "/recommendations/",
                type: "GET",
                dataType: "json",
                data: {
                    displayed_user_ids: b
                },
                success: function (e) {
                    c($(e.html))
                }
            })
        },
        setFollowBoardButton: function (b, c) {
            var e = c.disabled;
            if (c.follow) {
                c = b.data("text-follow") || "Follow";
                b.removeClass("disabled clickable unfollowbutton").addClass("followbutton")
            } else {
                c =
                    b.data("text-unfollow") || "Unfollow";
                b.removeClass("followbutton").addClass("disabled clickable unfollowbutton")
            }
            e ? b.attr("disabled", "disabled") : b.removeAttr("disabled");
            b.text(c)
        }
    }
}();
var Comment = function () {
    return {
        gridComment: function () {
            var b = this;
            $(".write textarea");
            $("#ColumnContainer").on("focus", ".write .GridComment", function () {
                var c = $(this).parents(".pin").first(),
                    e = c.attr("data-id");
                BoardLayout.allPins();
                var f = b.getCommenters(c.find(".comments .comment"));
                c = b.getPinner(c.find("div.attribution:first"));
                f[c.link] = c;
                Tagging.initTextarea($(this), f, {
                    pinId: e
                })
            });
            $("#ColumnContainer").on("click", ".actions .comment", function () {
                trackGAEvent("comment_button", "clicked");
                var c = $(this),
                    e = c.parents(".pin").find(".write");
                if (c.hasClass("disabled")) {
                    e.slideUp("fast", function () {
                        e.find("textarea").blur();
                        BoardLayout.allPins()
                    });
                    c.removeClass("disabled clickable")
                } else {
                    e.slideDown("fast", function () {
                        e.find("textarea").focus()
                    });
                    c.addClass("disabled clickable")
                }
                return false
            });
            $("#ColumnContainer").on("click", ".write .Button", function () {
                trackGAEvent("comment_submit", "clicked", "grid");
                var c = $(this),
                    e = c.parent(),
                    f = c.parents("form"),
                    g = c.parents(".pin"),
                    d = $(".CommentsCount", g),
                    h = $("textarea",
                        g),
                    j = h.val(),
                    k = $("div.comments", g),
                    l = $(".all", g);
                if (j != "") {
                    Tagging.loadTags($(".GridComment", e), $(".pin_comment_replies", e));
                    if (!c.hasClass("disabled")) {
                        c.addClass("disabled");
                        $.ajax({
                            url: f.attr("action"),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: j,
                                replies: $(".pin_comment_replies", e).val(),
                                home: "1",
                                path: window.location.pathname
                            },
                            error: function (r) {
                                ShowError(r.message)
                            },
                            success: function (r) {
                                trackGAEvent("comment_submit", "success", "grid");
                                if (r.status == "fail" && r.captcha) {
                                    RecaptchaDialog.challenge();
                                    return false
                                } else if (r.status ===
                                    "fail" || r.status === "failure") {
                                    ShowError(r.message);
                                    return false
                                }
                                var u = $(r.html).hide();
                                d.html(r.count_str);
                                if (l.length != 0) {
                                    l.before(u);
                                    l.html(r.all_str)
                                } else if (k.length === 0) {
                                    g.find(".attribution").after("<div class='comments colormuted'></div>");
                                    g.find(".comments").html(u);
                                    d.removeClass("hidden")
                                } else g.find("div.comments .comment:last").after(u);
                                h.remove();
                                f.prepend(h.clone().text(""));
                                u.slideDown("fast", function () {
                                    BoardLayout.allPins()
                                })
                            },
                            complete: function () {
                                c.removeClass("disabled")
                            }
                        })
                    }
                }
            })
        },
        closeupComment: function (b) {
            var c =
                $("#CloseupComment"),
                e = $("#PostComment");
            b = b || {};
            var f = b.pinId;
            c.focus(function () {
                $("#PinAddCommentControls").slideDown(250)
            });
            c.bind("keyup", function () {
                $("#CloseupComment").val() != "" ? e.removeClass("disabled") : e.addClass("disabled")
            });
            b = this.getCommenters(".PinComments .comment");
            var g = this.getPinner("#PinPinner");
            b[g.link] = g;
            Tagging.initTextarea("#CloseupComment", b, {
                pinId: f
            });
            e.click(function () {
                trackGAEvent("comment_submit", "clicked", "closeup");
                Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                var d = $(this),
                    h = $("#pin_comment_replies").val(),
                    j = c.val();
                if (j != "") {
                    $.trim(j);
                    if (!d.hasClass("disabled")) {
                        d.addClass("disabled");
                        $.ajax({
                            url: $("#post_comment_url").val(),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: j,
                                replies: h,
                                path: window.location.pathname
                            },
                            error: function (k) {
                                ShowError(k.message)
                            },
                            success: function (k) {
                                if (k.status == "fail" && k.captcha) {
                                    RecaptchaDialog.challenge(function () {
                                        d.removeClass("disabled")
                                    });
                                    return false
                                } else if (k.status === "fail" || k.status === "failure") {
                                    ShowError(k.message);
                                    return false
                                } else {
                                    trackGAEvent("comment_submit",
                                        "success", "closeup");
                                    Tagging.initTextarea("#CloseupComment", null, {
                                        pinId: f
                                    });
                                    c.val("");
                                    $("#pin_comment_replies").val("");
                                    k = $(k.html).css({
                                        "background-color": "#fbffcc"
                                    });
                                    $(".PinComments").append(k)
                                }
                                k.removeClass("hidden").animate({
                                    backgroundColor: "#f2f0f0",
                                    display: "block"
                                }, 1200)
                            }
                        })
                    }
                }
                return false
            })
        },
        zoomComment: function (b) {
            var c = $("#zoom"),
                e = $("#CloseupComment", c),
                f = $("#PostComment", c);
            b = b || {};
            var g = b.pinId;
            e.focus(function () {
                $("#PinAddCommentControls", c).slideDown(250)
            });
            e.bind("keyup", function () {
                e.val() !=
                    "" ? f.removeClass("disabled") : f.addClass("disabled")
            });
            b = this.getCommenters("#zoom .PinComments .comment");
            var d = this.getPinner("#PinPinner");
            b[d.link] = d;
            Tagging.initTextarea("#CloseupComment", b, {
                pinId: g
            });
            f.click(function () {
                trackGAEvent("comment_submit", "clicked", "zoom");
                Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                var h = $(this),
                    j = $("#pin_comment_replies", c).val(),
                    k = e.val();
                if (k != "") {
                    $.trim(k);
                    if (!h.hasClass("disabled")) {
                        h.addClass("disabled");
                        $.ajax({
                            url: $("#post_comment_url", c).val(),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: k,
                                replies: j,
                                path: window.location.pathname
                            },
                            error: function (l) {
                                ShowError(l.message)
                            },
                            success: function (l) {
                                if (l.status == "fail" && l.captcha) {
                                    RecaptchaDialog.challenge(function () {
                                        h.removeClass("disabled")
                                    });
                                    return false
                                } else if (l.status === "fail" || l.status === "failure") {
                                    ShowError(l.message);
                                    return false
                                } else {
                                    trackGAEvent("comment_submit", "success", "zoom");
                                    Tagging.initTextarea("#CloseupComment", null, {
                                        pinId: g
                                    });
                                    e.val("");
                                    $("#pin_comment_replies", c).val("");
                                    l = $(l.html).css({
                                        "background-color": "#fbffcc"
                                    });
                                    $(".PinComments", c).append(l)
                                }
                                l.removeClass("hidden").animate({
                                    backgroundColor: "#ffffff",
                                    display: "block"
                                }, 220)
                            }
                        })
                    }
                }
                return false
            })
        },
        getCommenters: function (b) {
            var c = {};
            $(b).each(function (e, f) {
                f = $(f);
                e = f.find("p a:first").attr("href");
                !e || c[e] || (c[e] = {
                    label: f.find("p a:first").text(),
                    value: e.replace(/\//g, ""),
                    image: f.find("img:first").attr("src"),
                    link: e
                })
            });
            return c
        },
        getPinner: function (b) {
            b = $(b);
            var c = b.find("a").attr("href");
            c = c.match(/\/[^\/]*\//)[0];
            return {
                label: b.find("p:first a:first").text(),
                value: c.replace(/\//g,
                    ""),
                image: b.find("a img:first").attr("src"),
                link: c
            }
        }
    }
}();
var Search = function () {
    return {
        reportSearch: function () {
            $("#ColumnContainer").on("click", ".search_debug .comment", function () {
                var b = $(this),
                    c = b.parents(".pin"),
                    e = c.find("form"),
                    f = c.attr("data-id"),
                    g = c.find(".report"),
                    d = g.find(".submit"),
                    h = g.find(".delete"),
                    j = g.find(".msg");
                if (b.hasClass("disabled")) {
                    g.slideUp("fast", function () {
                        g.find("textarea").blur()
                    });
                    b.removeClass("disabled clickable")
                } else {
                    $.ajax({
                        url: e.attr("action"),
                        type: "GET",
                        dataType: "json",
                        data: {
                            vertical: e.find(".vertical").val(),
                            q: e.find(".query").val(),
                            id: f,
                            url: escape(window.location.pathname + window.location.search)
                        },
                        success: function (k) {
                            if (k.comment) {
                                $("textarea", c).val(k.comment);
                                j.text("Submitted at " + k.datetime);
                                d.text("Update");
                                h.css("visibility", "visible");
                                j.css("visibility", "visible")
                            }
                        }
                    });
                    d.css("visibility", "hidden");
                    h.css("visibility", "hidden");
                    j.css("visibility", "hidden");
                    g.slideDown("fast", function () {
                        d.css("visibility", "visible");
                        g.find("textarea").focus()
                    });
                    b.addClass("disabled clickable")
                }
                return false
            });
            $("#ColumnContainer").on("click",
                ".report .submit", function () {
                var b = $(this),
                    c = b.parent(),
                    e = b.parents("form"),
                    f = b.parents(".pin"),
                    g = f.attr("data-id");
                f = $("textarea", f).val();
                var d = e.find(".msg"),
                    h = e.find(".submit"),
                    j = e.find(".delete");
                if (f != "") if (!b.hasClass("disabled")) {
                        b.addClass("disabled");
                        $.ajax({
                            url: e.attr("action"),
                            type: "POST",
                            dataType: "json",
                            data: {
                                comment: f,
                                vertical: $(".vertical", c).val(),
                                q: $(".query", c).val(),
                                id: g,
                                url: escape(window.location.pathname + window.location.search)
                            },
                            success: function (k) {
                                d.text("Submitted at " + k.datetime);
                                h.text("Update");
                                j.css("visibility", "visible");
                                d.css("visibility", "visible")
                            },
                            complete: function () {
                                b.removeClass("disabled")
                            }
                        })
                    }
            });
            $("#ColumnContainer").on("click", ".report .delete", function () {
                var b = $(this),
                    c = b.parent(),
                    e = b.parents("form"),
                    f = b.parents(".pin"),
                    g = f.attr("data-id"),
                    d = e.find(".msg"),
                    h = e.find(".submit"),
                    j = e.find(".delete");
                if (!b.hasClass("disabled")) {
                    b.addClass("disabled");
                    $.ajax({
                        url: e.attr("action"),
                        type: "POST",
                        dataType: "json",
                        data: {
                            vertical: $(".vertical", c).val(),
                            q: $(".query", c).val(),
                            id: g,
                            url: escape(window.location.pathname + window.location.search),
                            "delete": "true"
                        },
                        success: function () {
                            d.text("");
                            h.text("Submit");
                            j.css("visibility", "hidden");
                            d.css("visibility", "hidden")
                        },
                        complete: function () {
                            $("textarea", f).val("");
                            b.removeClass("disabled")
                        }
                    })
                }
            })
        }
    }
}();
var Logout = function () {
    return {
        logout: function () {
            trackGAEvent("logout", "attempt");
            setCookie("element", "LOGOUT_BUTTON");
            $.ajax({
                url: "/logout/",
                type: "POST",
                dataType: "json",
                data: {},
                error: function (b) {
                    alert(b.message)
                },
                success: function () {
                    trackGAEvent("logout", "success");
                    window.location = "/"
                }
            })
        }
    }
}();
var zoomCount = 0,
    Zoom = function () {
        return {
            HTMLloading: "<div id='loading'><img src='" + media_url + "images/rotating_pin.png' alt='Loading Animation' /></div>",
            HTMLshow: "<div id='zoomScroll' class='visible loading'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
            HTMLzoom: "<div id='zoomScroll'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
            setup: function () {
                if (window.location.hash == "#_=_") window.location.hash = "";
                var b = this,
                    c = !navigator.userAgent.match(/ipad|ipod|iphone|android/i) && !! window.Router;
                isWebkit = $.browser.webkit;
                isFireFox = $.browser.mozilla;
                isChrome = navigator.userAgent.match(/chrome/i);
                isFireFox && $("body").addClass("extraScroll");
                isChrome && $("body").addClass("hidefixed");
                if (c) {
                    Router.on("route:zoom", function (e) {
                        if (!b.open) {
                            isWebkit ? b.zoom(e) : b.show(e);
                            b.open = true
                        }
                    });
                    Router.on("route:other", function () {
                        b.close()
                    });
                    if (isWebkit) {
                        zoomTimer = 220;
                        c = '<style type="text/css">#zoomScroll,#zoomScroll.visible #zoom,#zoomScroll.visible .PinImage img,#zoom .PriceContainer,#zoom .PriceContainer *,#zoom .convo .ImgLink,#zoom .convo .ImgLink img,#zoom .comments .comment,#zoom #loading img{-moz-transition: all ' +
                            zoomTimer / 1E3 + "s ease-out;-webkit-transition: all " + zoomTimer / 1E3 + "s ease-out;}</style>";
                        $("head").append(c);
                        $("#ColumnContainer").on("mousedown", ".PinImage", function () {
                            $(this).parents(".pin").addClass("spring")
                        });
                        $("#ColumnContainer").on("mouseout", ".spring", function () {
                            $(this).removeClass("spring")
                        })
                    }
                    $("#ColumnContainer").on("click", ".PinImage", function (e) {
                        if (e.cntrlKey || e.metaKey) return true;
                        var f = $(this).parents(".pin").attr("data-id");
                        zoomCount++;
                        trackGAEvent("zoom_pin", "clicked", zoomCount);
                        P._OLD_COOKIES =
                            P._OLD_COOKIES || {};
                        P._OLD_COOKIES.element = getCookie("element");
                        P._OLD_COOKIES.component = getCookie("component");
                        setCookie("component", $(e.target).attr("data-componentType"));
                        Router.navigate("/pin/" + f + "/", {
                            trigger: true
                        });
                        return false
                    })
                }
            },
            zoom: function (b) {
                var c = this;
                htmlZoom = c.HTMLzoom.replace("%PIN_ID%", b);
                $("body").addClass("noscroll").append(htmlZoom);
                var e = $("#zoomScroll"),
                    f = $("#zoom");
                setTimeout(function () {
                    e.addClass("visible");
                    var h = $(window).width() / 2;
                    f.css("left", h + "px");
                    d.closeUpDimensions[1] !=
                        0 && d.elem.css({
                        width: d.closeUpDimensions[0] + "px",
                        height: d.closeUpDimensions[1] + "px"
                    });
                    if (g.isVideo) {
                        $(".PinImage", f).css("background-color", "black");
                        d.elem.css({
                            opacity: "0"
                        })
                    }
                    setTimeout(function () {
                        zoomFinished = true;
                        e.addClass("loading");
                        g.isVideo ? g.elem.find(".video").show() : d.elem.attr("src", d.src)
                    }, zoomTimer)
                }, 1);
                var g = {};
                g.id = b;
                g.elem = $('div[data-id="' + g.id + '"]');
                g.elem.addClass("zoomed");
                g.elem.find(".video").hide();
                g.HTMLimage = getHTML(g.elem.find(".PinImage"));
                g.offset = g.elem.offset();
                g.isVideo =
                    g.elem.find(".video").length;
                g.elem.removeClass("spring");
                var d = {};
                d.src = g.elem.attr("data-closeup-url");
                d.preload = new Image;
                d.preload.src = d.src;
                f.html(g.HTMLimage).css({
                    top: g.offset.top - $(window).scrollTop() + "px",
                    left: g.offset.left + "px"
                }).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
                d.elem = $(".PinImageImg", f);
                d.origin = $(".zoomed .PinImageImg");
                d.thumbDimensions = g.isVideo ? ["192", "144"] : [d.origin.width(), d.origin.height()];
                d.closeUpDimensions = [g.elem.attr("data-width"), g.elem.attr("data-height")];
                d.elem.css({
                    width: d.thumbDimensions[0] + "px",
                    height: d.thumbDimensions[1] + "px"
                });
                c.ajax(g.id);
                c.closeListeners(g.id)
            },
            show: function (b) {
                var c = this,
                    e = c.HTMLshow.replace("%PIN_ID%", b);
                $("body").addClass("noscroll").append(e);
                $("#zoomScroll");
                e = $("#zoom");
                var f = {};
                f.id = b;
                f.elem = $('div[data-id="' + f.id + '"]');
                f.elem.addClass("zoomed");
                f.HTMLimage = getHTML(f.elem.find(".PinImage"));
                f.isVideo = f.elem.find(".video").length;
                e.html(f.HTMLimage).append(c.HTMLloading).find(".PinImage").attr("href",
                    "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
                b = $(window).width() / 2;
                e.css("left", (isFireFox ? b - 7 : b) + "px");
                b = {};
                b.elem = $(".PinImageImg", e);
                b.src = f.elem.attr("data-closeup-url");
                b.closeUpDimensions = f.isVideo ? ["600", "450"] : [f.elem.attr("data-width"), f.elem.attr("data-height")];
                f.isVideo && e.find(".video").remove();
                b.elem.attr("src", b.src).css({
                    width: b.closeUpDimensions[0] + "px",
                    height: b.closeUpDimensions[1] + "px"
                });
                c.ajax(f.id);
                c.closeListeners(f.id)
            },
            ajax: function (b) {
                var c = this,
                    e = $("#zoom");
                this.cancelAjax();
                this.xhr = $.ajax({
                    url: "/pin/" + b + "/",
                    dataType: "json",
                    error: function (f, g) {
                        if (g !== "abort") {
                            g = "Could not fetch pin :-/";
                            if (navigator.onLine) {
                                if (f.status === 404) g = "This pin has been deleted."
                            } else g = "No Internet Connection :-/";
                            e.append("<div id='error'><p class='colormuted'></p></div>").removeClass("loaded");
                            $("#error p").html(g)
                        }
                    },
                    success: function (f) {
                        if (isWebkit) typeof zoomFinished != "undefined" ? c.renderSuccess(f) : e.one("webkitTransitionEnd", function () {
                                c.renderSuccess(f)
                            });
                        else c.renderSuccess(f)
                    },
                    complete: function () {
                        c.xhr = null
                    },
                    timeout: 2E4
                })
            },
            renderSuccess: function (b) {
                var c = $("#zoomScroll"),
                    e = $("#zoom");
                e.prepend(b.header);
                $("#PinImageHolder").append(b.buttons);
                e.append(b.footer);
                c.addClass("loaded");
                c.removeClass("loading");
                $("<div>&nbsp;</div>").css({
                    height: 0,
                    "margin-top": "-10px"
                }).insertAfter(e)
            },
            closeListeners: function () {
                var b = this;
                $("#zoomScroll").click(function (c) {
                    if ($(c.target).is("#zoomScroll, #SocialShare ul, #SocialShare li")) {
                        window.history.back();
                        b.close();
                        b.cancelAjax()
                    }
                })
            },
            close: function () {
                if (this.open) {
                    trackGAEvent("zoom_pin",
                        "closed", zoomCount);
                    $("#zoomScroll").remove();
                    $("body").removeClass("noscroll");
                    $(".zoomed").removeClass("zoomed");
                    delete zoomFinished;
                    this.open = false;
                    P._OLD_COOKIES.component && setCookie("component", P._OLD_COOKIES.component);
                    P._OLD_COOKIES.element && setCookie("element", P._OLD_COOKIES.element);
                    return false
                }
            },
            cancelAjax: function () {
                if (this.xhr && this.xhr.abort) {
                    this.xhr.abort();
                    this.xhr = null
                }
            }
        }
    }();
var Like = function () {
    function b(c) {
        var e = $(c).height();
        window.setTimeout(function () {
            e !== $(c).height() && BoardLayout.allPins()
        }, 1)
    }
    return {
        ajaxLike: function (c, e, f, g) {
            $.ajax({
                url: "/pin/" + c + "/like/",
                type: "POST",
                dataType: "json",
                data: g,
                error: function (d) {
                    e(d)
                },
                success: function (d) {
                    f(d)
                },
                timeout: 2E4
            })
        },
        ajaxUnlike: function (c, e, f, g) {
            $.ajax({
                url: "/pin/" + c + "/like/",
                type: "POST",
                dataType: "json",
                data: g,
                error: function (d) {
                    e(d)
                },
                success: function (d) {
                    f(d)
                },
                timeout: 2E4
            })
        },
        gridListeners: function () {
            var c = this;
            $("#ColumnContainer").on("click",
                ".likebutton", function () {
                trackGAEvent("like", "clicked", "grid");
                c.gridLike($(this));
                return false
            });
            $("#ColumnContainer").on("click", ".unlikebutton", function () {
                trackGAEvent("unlike", "clicked", "grid");
                c.gridUnlike($(this));
                return false
            })
        },
        gridLike: function (c, e) {
            c.removeClass("likebutton").addClass("disabled unlikebutton").html(c.data("text-unlike"));
            var f = c.parents(".pin"),
                g = f.children(".stats"),
                d = g.find(".LikesCount");
            this.ajaxLike(f.attr("data-id"), function () {}, function (h) {
                if (h.status == "success") {
                    b(g);
                    d.removeClass("hidden").html(h.count_str);
                    trackGAEvent("like", "success");
                    c.addClass("clickable")
                } else if (h.captcha) {
                    RecaptchaDialog.challenge();
                    return false
                } else ShowError(h.message, function () {
                        c.removeClass("disabled unlikebutton").addClass("likebutton").html("<em></em> " + c.data("text-like"));
                        e && e()
                    })
            })
        },
        gridUnlike: function (c, e) {
            c.removeClass("disabled clickable unlikebutton").addClass("likebutton").html("<em></em> " + c.data("text-like"));
            var f = c.parents(".pin"),
                g = f.children(".stats"),
                d = g.find(".LikesCount");
            this.ajaxUnlike(f.attr("data-id"), function () {}, function (h) {
                b(g);
                d.html(h.count_str);
                h.count || d.addClass("hidden");
                h.status == "success" ? trackGAEvent("unlike", "success") : ShowError(h.message, function () {
                    c.removeClass("likebutton").addClass("disabled unlikebutton").html(c.data("text-unlike"));
                    e && e()
                })
            }, {
                unlike: 1
            })
        },
        zoomListeners: function () {
            var c = this;
            $("#PinImageHolder").on("click", ".ZoomLikeButton", function () {
                trackGAEvent("like", "clicked", "zoom");
                c.zoomLike($(this));
                return false
            });
            $("#PinImageHolder").on("click",
                ".ZoomUnlikeButton", function () {
                c.zoomUnlike($(this));
                return false
            })
        },
        zoomLike: function (c) {
            c.removeClass("ZoomLikeButton").addClass("ZoomUnlikeButton disabled clickable").html(c.data("text-unlike"));
            this.gridLike($(".zoomed .likebutton"), function () {
                c.addClass("ZoomLikeButton").removeClass("ZoomUnlikeButton disabled clickable").html("<em></em>" + c.data("text-like"))
            })
        },
        zoomUnlike: function (c) {
            c.removeClass("ZoomUnlikeButton disabled clickable ").addClass("ZoomLikeButton").html("<em></em>" + c.data("text-like"));
            this.gridUnlike($(".zoomed .unlikebutton"), function () {
                c.addClass("ZoomUnlikeButton disabled clickable ").removeClass("ZoomLikeButton").html(c.data("text-unlike"))
            })
        },
        closeupListeners: function () {
            var c = this;
            $("#PinActionButtons").on("click", ".like_pin", function () {
                trackGAEvent("like", "clicked", "closeup");
                c.closeupLike($(this));
                return false
            });
            $("#PinActionButtons").on("click", ".unlike_pin", function () {
                trackGAEvent("unlike", "clicked", "closeup");
                c.closeupUnlike($(this));
                return false
            })
        },
        closeupLike: function (c) {
            var e =
                this,
                f = $("#PinLikes");
            c.removeClass("like_pin").addClass("disabled clickable unlike_pin").html(c.data("text-unlike"));
            f.removeClass("hidden");
            var g = c.attr("data-id");
            e.ajaxLike(g, function () {
                e.closeupUnlike()
            }, function (d) {
                if (d.status == "fail" && d.captcha) {
                    RecaptchaDialog.challenge();
                    return false
                } else if (d.status === "failure") {
                    ShowError(d.message, function () {
                        c.addClass("like_pin").removeClass("disabled clickable unlike_pin").html("<em></em>" + c.data("text-like"))
                    });
                    return false
                } else trackGAEvent("like",
                        "success");
                f.append(d.html)
            })
        },
        closeupUnlike: function (c) {
            var e = this,
                f = $("#PinLikes");
            c.removeClass("disabled clickable unlike_pin").addClass("like_pin").html("<em></em>" + c.data("text-like"));
            $("a", f).length === 1 && f.addClass("hidden");
            f = c.attr("data-id");
            e.ajaxUnlike(f, function () {
                e.closeupLike()
            }, function (g) {
                g.status === "failure" ? ShowError(g.message, function () {
                    c.addClass("disabled clickable unlike_pin").removeClass("like_pin").html(c.data("text-unlike"))
                }) : trackGAEvent("unlike", "success");
                $("#PinLikes a[href='/" +
                    g.username + "/']").fadeOut("fast").remove()
            }, {
                unlike: 1
            })
        }
    }
}();
var Closeup = function () {
    return {
        setup: function () {
            $("#PinReport").live("click", function () {
                trackGAEvent("pinreport", "clicked", "closeup");
                Modal.show("ReportModal");
                return false
            });
            $("#ReportModal .Button").click(function () {
                trackGAEvent("report_modal", "clicked", "closeup");
                $.post("flag/", {
                    reason: $("#ReportModal input[name=reason]:checked").val(),
                    explanation: $("#ReportModal textarea").val()
                }, function (c) {
                    $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                    if (c.status == "success") {
                        trackGAEvent("report_modal",
                            "success", "closeup");
                        $("#ReportModal .modal").addClass("PostSuccess");
                        $("#ReportModal .modal form").hide();
                        $("#ReportModal .PostSuccess").append('<p class="ReportSuccess">Thanks for reporting this pin! Our team will review the pin and delete it if it violates the <a href="http://about.pinterest.com/terms/">Pinterest Terms of Use</a>.</p>');
                        setTimeout(function () {
                            Modal.close("ReportModal");
                            Closeup.resetReportModal();
                            $("#ReportModal .SubmitButton").addClass("disabled").html("Send Email")
                        }, 5E3);
                        $("#PinReport").remove()
                    } else alert(c.message)
                },
                    "json");
                return false
            });
            var b;
            $("body").on("click", "a.ReportComment", function () {
                trackGAEvent("commentreport", "clicked", "closeup");
                b = $(this);
                Modal.show("ReportCommentModal");
                return false
            });
            $("#ReportCommentModal .Button").click(function () {
                trackGAEvent("report_comment_modal", "clicked", "closeup");
                $.post(b.attr("href"), {
                    comment_id: b.attr("data"),
                    reason: $("#ReportCommentModal input[name=reason]:checked").siblings("label").text(),
                    explanation: $("#ReportCommentModal textarea").val()
                }, function (c) {
                    $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                    if (c.status == "success") {
                        trackGAEvent("report_modal", "success", "closeup");
                        $("#ReportCommentModal .modal").addClass("PostSuccess");
                        $("#ReportCommentModal .modal form").hide();
                        $("#ReportCommentModal .PostSuccess").append('<p class="ReportSuccess">Our team will review the comment and delete it if it violates our <br/><a href="http://about.pinterest.com/use">Acceptable Use Policy</a>.</p>');
                        setTimeout(function () {
                            Modal.close("ReportCommentModal");
                            Closeup.resetReportCommentModal();
                            $("#ReportCommentModal .SubmitButton").addClass("disabled").html("Send Email")
                        },
                            1500);
                        b.replaceWith('<p class="floatRight" style="margin-right:0px"><strong>Thanks for reporting!</strong></p>')
                    } else alert(c.message)
                }, "json");
                return false
            });
            $("#EmailModal form").submit(function () {
                trackGAEvent("email_modal", "submit", "closeup");
                var c = $("#MessageRecipientName").val(),
                    e = $("#MessageRecipientEmail").val(),
                    f = $("#MessageBody").val();
                if (!c) {
                    $("#MessageRecipientName").closest("form").find(".error").html("Please enter recipient name.");
                    return false
                }
                if (!e) {
                    $("#MessageRecipientEmail").closest("form").find(".error").html("Please enter recipient email.");
                    return false
                }
                $("#EmailModal .SubmitButton").addClass("disabled").text("Sending...");
                $.ajax({
                    type: "POST",
                    url: $(this).attr("action"),
                    data: {
                        name: c,
                        email: e,
                        message: f
                    },
                    complete: function (g) {
                        g = $.parseJSON(g.responseText);
                        if (g.status == "success") {
                            trackGAEvent("email_modal", "success", "closeup");
                            $("#EmailModal .SubmitButton").text("Sent!");
                            setTimeout(function () {
                                Modal.close("EmailModal");
                                Closeup.resetEmailModal();
                                $("#EmailModal .SubmitButton").addClass("disabled").html("Send Email")
                            }, 500)
                        } else {
                            $("#EmailModal .SubmitButton").removeClass("disabled").html("Send Email");
                            g.message == "Invalid email address" && $("#MessageRecipientEmail").parent().after($("#EmailModal .error"));
                            $("#EmailModal .error").html(g.message)
                        }
                    }
                });
                return false
            });
            $("#SocialShare #PinEmbed").click(function () {
                trackGAEvent("pin_embed", "clicked", "closeup");
                var c = $("#PinImageHolder img");
                if ($("#PinImageHolder iframe").length) c = $("#PinImageHolder iframe");
                var e = c.width();
                c = c.height();
                max_closeup_image_width = e;
                max_closeup_image_height = c;
                $("#EmbedImageWidth").val(e);
                $("#EmbedImageHeight").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 +
                    e + "' height ='" + c + embed_code_html_2);
                Modal.show("EmbedModal")
            });
            $("#EmbedImageWidth").keyup(function () {
                $(this).val() > max_closeup_image_width && $("#EmbedImageWidth").val(max_closeup_image_width);
                var c = parseInt($("#EmbedImageWidth").val() * max_closeup_image_height / max_closeup_image_width, 10);
                $("#EmbedImageHeight").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                return false
            });
            $("#EmbedImageHeight").keyup(function () {
                $(this).val() >
                    max_closeup_image_height && $("#EmbedImageHeight").val(max_closeup_image_height);
                var c = parseInt(Math.ceil($("#EmbedImageHeight").val() * max_closeup_image_width / max_closeup_image_height), 10);
                $("#EmbedImageWidth").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                return false
            });
            $(".DeleteComment").live("click", function () {
                trackGAEvent("delete_comment", "clicked", "closeup");
                var c = $(this);
                if (c.attr("ban")) if (!confirm("Are you sure you want to ban " +
                        c.attr("username") + "?")) return false;
                c.trigger("mouseleave");
                var e = c.parents(".comment");
                e.slideUp("slow");
                $.ajax({
                    url: c.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        comment: c.attr("data")
                    },
                    error: function (f) {
                        e.show();
                        f.message.length > 0 && alert(f.message)
                    },
                    success: function () {
                        trackGAEvent("delete_comment", "success", "closeup");
                        e.remove()
                    }
                });
                return false
            })
        },
        resetReportModal: function () {
            $("#ReportModal .PostSuccess").removeClass("PostSuccess");
            $("#ReportModal .ReportSuccess").remove();
            $('#ReportModal .option input[type="radio"]').attr("checked",
                false);
            $("#ReportModal select option:first-child").attr("selected", "selected");
            $("#ReportModal .Button").addClass("disabled");
            $("#ReportPin").val("").blur();
            $("#ReportModal form").show()
        },
        resetReportCommentModal: function () {
            $("#ReportCommentModal .PostSuccess").removeClass("PostSuccess");
            $("#ReportCommentModal .ReportSuccess").remove();
            $('#ReportCommentModal .option input[type="radio"]').attr("checked", false);
            $("#ReportCommentModal select option:first-child").attr("selected", "selected");
            $("#ReportCommentModal .Button").addClass("disabled");
            $("#ReportCommentModal form").show()
        },
        resetEmailModal: function () {
            $("#MessageRecipientEmail").val("").blur();
            $("#MessageRecipientName").val("").blur();
            $("#MessageBody").val("").blur();
            $("#EmailModal .error").html("")
        }
    }
}();
var InviteForm = function () {
    return {
        setup: function () {
            var b = $("#SendInvites"),
                c = $("#EmailAddresses"),
                e = $(".email", c),
                f = c.data("text-invite-sent");
            b.click(function () {
                trackGAEvent("invite_form", "clicked");
                e.each(function () {
                    var g = $(this),
                        d = $("textarea[name=message]"),
                        h = g.parent("li").children(".helper");
                    !g.val() == "" && InviteForm.submit(g.val(), d.val(), "somebody", function () {
                        trackGAEvent("invite_form", "success");
                        g.removeClass("error");
                        h.html(f).css("color", "green").slideDown();
                        g.val("").keyup();
                        d.val("").keyup()
                    }, function (j) {
                        g.addClass("error");
                        h.html(j.message).css("color", "red").slideDown()
                    })
                })
            })
        },
        submit: function (b, c, e, f, g) {
            $.post("/invite/new/", {
                name: e,
                message: c,
                email: b
            }, function (d) {
                d.status == "success" ? f(d) : g(d)
            }, "json")
        }
    }
}();
var InviteModal = function () {
    return {
        show: function (b, c) {
            var e = this;
            $("#InviteModalName").empty().text(b);
            $("#InviteModalEmail").empty().text(c);
            Modal.show("InviteModal");
            $("#InviteModalMessage").val("").keyup().focus();
            $("#InviteModal .SubmitButton").unbind("click").click(function () {
                var f = $(this),
                    g = $("#InviteModalMessage").val(),
                    d = $(".inputstatus");
                f.addClass("disabled");
                InviteForm.submit(c, g, b, function () {
                    d.text("").empty().css("margin-bottom", "0px");
                    d.removeClass("error").html("<span style='color: green; font-size: 18px; font-weight: 300;'>Success!</span>").css("margin-bottom",
                        "14px");
                    setTimeout(function () {
                        Modal.close("InviteModal");
                        d.text("").empty().css("margin-bottom", "0px");
                        f.removeClass("disabled")
                    }, 1300);
                    e.trigger("invite:sent")
                }, function () {
                    d.text("Sorry, an error has occurred. Please try again.").css("margin-bottom", "14px");
                    f.removeClass("disabled");
                    e.trigger("invite:failed")
                })
            })
        }
    }
}();
_.extend(InviteModal, Backbone.Events);
var FancyForm = function () {
    return {
        inputs: ".Form input, .Form textarea",
        button: ".SubmitButton",
        setup: function () {
            var b = this;
            this.inputs = $(this.inputs);
            b.inputs.each(function () {
                var c = $(this);
                b.checkVal(c)
            });
            b.inputs.live("keyup blur", function () {
                var c = $(this);
                b.checkVal(c);
                var e = c.parents("ul"),
                    f = c.parents(".Form").find(b.button);
                c.parents("li").hasClass("NoCheck") || b.checkDisabled(e, f)
            });
            $(b.button).live("click", function () {
                var c = $(this).attr("data-form");
                if ($(this).hasClass("disabled")) return false;
                else $("#" +
                        c + " form").submit()
            })
        },
        checkVal: function (b) {
            b.val().length > 0 ? b.parent("li").addClass("val") : b.parent("li").removeClass("val")
        },
        checkDisabled: function (b, c) {
            b.children("li:not(.optional)").length <= b.children("li.val").length ? c.removeClass("disabled") : c.addClass("disabled")
        }
    }
}();
var MAX_PIN_CHARACTER_COUNT = 500,
    CharacterCount = CharacterCount || function () {
        return {
            setup: function (b, c, e, f, g) {
                b = $(b);
                c = $(c);
                e = $(e);
                b.focus(function () {
                    CharacterCount.showCount(b, c, e, f, g)
                }).bind("keyup.cc input.cc paste.cc", function () {
                    CharacterCount.showCount(b, c, e, f, g)
                })
            },
            truncateData: function (b, c) {
                b = $(b);
                c = c || MAX_PIN_CHARACTER_COUNT;
                b.val().length > c && b.val(b.val().substr(0, c - 3) + "...")
            },
            showCount: function (b, c, e, f, g) {
                f = f || MAX_PIN_CHARACTER_COUNT;
                b = f - b.val().length;
                c.text(g ? b + " " + g : b).show();
                if (e) b < 0 ||
                        b >= f ? e.addClass("disabled") : e.removeClass("disabled");
                b < 0 ? c.addClass("error") : c.removeClass("error")
            }
        }
    }();
var Tagging = function () {
    return {
        lastTypeRequest: null,
        lastFailedTerm: null,
        friends: null,
        friendsLinks: {},
        updateLastTerm: function (b, c) {
            if (!c || c.length === 0) {
                if (!this.lastFailedTerm || this.lastFailedTerm.length > b.length) this.lastFailedTerm = b
            } else this.lastFailedTerm = ""
        },
        skipTypeahead: function (b) {
            return this.lastFailedTerm && b.indexOf(this.lastFailedTerm) == 0
        },
        getFriends: function (b, c, e, f) {
            var g = b.term;
            f = f || {};
            var d = this;
            if (!f.filterTypes) f.filterTypes = [P.SEARCH_FILTER_TYPES.TAG_MUTUAL_FOLLOW, P.SEARCH_FILTER_TYPES.TAG_FOLLOWEE,
                        P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_PINNER, P.SEARCH_FILTER_TYPES.TAG_TWITTER_PINNER
                ];
            (function () {
                var h = {
                    "tags[]": f.filterTypes,
                    q: g,
                    pin_id: f.pinId
                }, j = function () {
                        var k = [];
                        if (e) {
                            if (g) {
                                var l = [];
                                for (var r in e) l.push(e[r]);
                                e = tagmate.filter_options(l, g)
                            }
                            for (var u in e) {
                                l = e[u];
                                r = l.value;
                                Tagging.friendsLinks[l.link] || !r || k.push(l)
                            }
                        }
                        k = k.concat(Tagging.friends);
                        if (Tagging.ignore) k = _.filter(k, function (o) {
                                return !Tagging.ignore[o.link]
                            });
                        c(k)
                    };
                d.lastTypeRequest && d.lastTypeRequest.abort();
                if (d.skipTypeahead(g)) return j();
                d.lastTypeRequest = $.get("/typeahead/", h, function (k) {
                    d.updateLastTerm(g, k);
                    Tagging.friends = [];
                    $.each(k, function (l, r) {
                        Tagging.friends.push({
                            label: r.name,
                            rawLabel: r.raw_name,
                            value: r.username,
                            image: r.image,
                            link: r.link,
                            filterType: r.tag,
                            category: "People",
                            id: r.id
                        });
                        Tagging.friendsLinks["/" + r.username + "/"] = 1
                    });
                    j()
                }).error(function () {
                    return c([])
                })
            })()
        },
        initInput: function (b, c, e, f) {
            b = $(b);
            var g = $("<div class='CollabAutocompleteHolder'></div>");
            f = f || {};
            if (!f.filterTypes) f.filterTypes = [P.SEARCH_FILTER_TYPES.TAG_MUTUAL_FOLLOW,
                        P.SEARCH_FILTER_TYPES.TAG_FOLLOWEE, P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_PINNER, P.SEARCH_FILTER_TYPES.TAG_TWITTER_PINNER, P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_NON_PINNER
                ];
            b.after(g);
            b.autocomplete({
                source: function (h, j) {
                    if (!Tagging.friends || Tagging.friends.length == 0) j([{
                                image: P.SEARCH_LOADING,
                                label: ""
                            }
                        ]);
                    return Tagging.getFriends(h, j, null, f)
                },
                minLength: 1,
                delay: 160,
                appendTo: g,
                change: function (h, j) {
                    c && c(j.item)
                },
                select: function (h, j) {
                    c && c(j.item, true);
                    return false
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    offset: "0 -1"
                }
            }).keydown(function (h) {
                h.which ==
                    13 && e && e()
            });
            var d = "<a href='<%= item_link %>'><img src='<%= item_image %>' class='AutocompletePhoto' alt='Photo of <%= item_label %>' width='38px' height='38px'/><div class='AutocompleteData'><span class='AutocompleteName'><%= item_label %></span></div></a>";
            d = (g = $("#AutoCompleteTemplate")) && g.html() ? g.html() : d;
            d = _.template(d);
            b.data("autocomplete")._renderItem = function (h, j) {
                var k = {
                    item_link: j.link,
                    item_image: j.image,
                    item_label: j.label,
                    item_filter_type: j.filterType
                };
                return $("<li></li>").data("item.autocomplete",
                    j).append(d(k)).appendTo(h)
            }
        },
        initTextarea: function (b, c, e) {
            b = $(b);
            var f = {};
            e = e || {};
            f["@"] = tagmate.USER_TAG_EXPR;
            f["#"] = tagmate.HASH_TAG_EXPR;
            f.$ = tagmate.USD_TAG_EXPR;
            f["\u00a3"] = tagmate.GBP_TAG_EXPR;
            if (!e.filterTypes) e.filterTypes = [P.SEARCH_FILTER_TYPES.TAG_MUTUAL_FOLLOW, P.SEARCH_FILTER_TYPES.TAG_FOLLOWEE, P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_PINNER, P.SEARCH_FILTER_TYPES.TAG_TWITTER_PINNER];
            var g = function (h, j) {
                Tagging.getFriends(h, j, c, e)
            }, d = function () {
                    return !Tagging.friends || Tagging.friends.length ==
                        0
                };
            if (!b.data("tagmate_inited")) {
                b.data("tagmate_inited", true);
                b.tagmate({
                    tagchars: f,
                    sources: {
                        "@": g
                    },
                    delay: 160,
                    doLoadingFn: d,
                    loadingItem: {
                        image: P.SEARCH_LOADING,
                        label: ""
                    }
                })
            }
        },
        loadTags: function (b, c, e, f) {
            b = $(b).getTags();
            for (var g = [], d = [], h = null, j = 0; j < b.length; j++) {
                b[j][0] == "@" && g.push(b[j].substr(1));
                b[j][0] == "#" && d.push(b[j].substr(1));
                if (b[j][0] == "$" || b[j][0] == "\u00a3") h = b[j]
            }
            $(c).val(g.join(","));
            $(e).val(d.join(","));
            $(f).val(h)
        },
        priceTag: function (b, c) {
            function e() {
                var f = $(".price", c);
                if (f.length <=
                    0) {
                    f = $("<div class='price'></div>");
                    c.prepend(f)
                }
                var g = b.getTags({
                    $: tagmate.USD_TAG_EXPR,
                    "\u00a3": tagmate.GBP_TAG_EXPR
                });
                if (g && g.length > 0) {
                    f.text(g[g.length - 1]);
                    f.addClass("visible")
                } else {
                    f.removeClass("visible");
                    f.text("")
                }
            }
            b = $(b);
            c = $(c);
            b.unbind(".priceTag").bind("keyup.priceTag", e).bind("focus.priceTag", e).bind("change.priceTag", e);
            e()
        }
    }
}();
var ScrapePinDialog = ScrapePinDialog || {
    id: "ScrapePin",
    setup: function () {
        var b = this;
        AddDialog.setup(b.id);
        b.initScraperInput()
    },
    initScraperInput: function () {
        function b(k) {
            return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(k)
        }
        function c(k) {
            var l = true;
            if (k.indexOf("http") != 0) k = "http://" + k;
            if (k == "") l = false;
            if (k == "http://") l = false;
            if (k.length < 2) l = false;
            if (k.indexOf(".") == -1) l = false;
            b(k) || (l = false);
            return l
        }
        function e() {
            var k = $("#" + ScrapePinDialog.id),
                l = $("#ScrapePinInput").val();
            if (j !== l) {
                j = l;
                if (c(l)) {
                    if (l.indexOf("http") != 0) l = "http://" + l;
                    $(".load", k).show();
                    $(".ImagePicker .Images ul", k).empty();
                    l = escape(l);
                    setTimeout(f, 5E3);
                    images_count = 0;
                    imagesArray = [];
                    msg = "";
                    $.getJSON("/pin/create/find_images/", {
                        url: l
                    }, function (r) {
                        if (r.status === "success") {
                            images_count = r.images.length;
                            for (var u = 0; u < r.images.length; u++) {
                                urlImage = new Image;
                                urlImage.src = r.images[u];
                                msg += "<br/>Loading " + urlImage.src;
                                urlImage.onload = function () {
                                    images_count -= 1;
                                    images_count == 0 && g()
                                };
                                imagesArray.push(urlImage)
                            }
                            r.title.length >
                                80 ? $("#id_title").val(r.title.substring(0, 79)) : $("#id_title").val(r.title);
                            $(".load", k).hide();
                            $("#id_link").val($("#scrape_url").val());
                            $("#PinSourceURL").html("Source: " + l).removeClass("hidden");
                            AddDialog.pinBottom("ScrapePin");
                            $(".Arrows", k).addClass("holla").show();
                            $("#ScrapeButton").removeClass("disabled")
                        } else {
                            $(".load", k).hide();
                            $("#ScrapeButton").removeClass("disabled");
                            alert("Cannot create a pin: " + r.message)
                        }
                    })
                } else alert("Not a valid URL!")
            }
        }
        function f() {
            if (images_count > 0) {
                images_count = -1;
                g()
            }
        }
        function g() {
            strHtml = "";
            imgFound = false;
            for (var k = foundCtr = 0; k < imagesArray.length; k++) {
                img = imagesArray[k];
                if (img.width >= 150 && img.height >= 50) {
                    imgFound = true;
                    foundCtr++;
                    strHtml += "<li>" + (is_video(img.src) ? "<img src='" + media_url + "images/VideoIndicator.png' alt='Video Icon' class='video' />" : "") + "<img src='" + img.src + "' width='156px' alt='' /></li>"
                }
            }
            if (strHtml != "") {
                $("#ScrapePin .ImagePicker .Images ul").html(strHtml);
                d(foundCtr)
            } else alert("No Large Images Found.")
        }
        function d() {
            var k = function (r,
                u) {
                im = $(u).find("img")[0];
                if ($(im).hasClass("video")) im = $(u).find("img")[1];
                src = $(im).attr("src");
                $("#id_img_url").val(src);
                $("#id_link").val($("#ScrapePinInput").val())
            }, l = $("#ScrapePin .ImagePicker .Images").jcarousel({
                    buttonNextHTML: null,
                    buttonPrevHTML: null,
                    initCallback: function (r) {
                        $("#ScrapePin .imagePickerNext").click(function () {
                            r.next();
                            return false
                        });
                        $("#ScrapePin .imagePickerPrevious").click(function () {
                            r.prev();
                            return false
                        })
                    },
                    animation: "fast",
                    itemVisibleInCallback: {
                        onAfterAnimation: k
                    },
                    scroll: 1
                });
            k(l, $("#ScrapePin .ImagePicker").find("li")[0], 1, "next")
        }
        function h() {
            var k = $("#ScrapeButton");
            if (c($("#ScrapePinInput").val())) {
                k.addClass("disabled");
                e()
            } else {
                alert("Please enter a valid website URL");
                k.removeClass("disabled")
            }
        }
        var j = "";
        $("#ScrapePinInput").bind("keydown", function (k) {
            k.keyCode === 13 && h()
        });
        $("#ScrapeButton").click(function () {
            h();
            return false
        })
    },
    reset: function () {
        var b = $("#" + this.id);
        $("#ScrapePinInput", b).val("");
        $(".PinBottom", b).hide();
        $(".modal", b).css("margin-bottom", "0");
        $(".Buttons .Button",
            b).removeClass("disabled").html("Pin It");
        ScrapePinDialog.initScraperInput()
    }
};
var Nag = Nag || {
    setup: function (b) {
        var c = $(".Nag").outerHeight();
        $("#" + b + " .NagSpacer").css("height", c + "px");
        if ($(".CloseupLeft").length > 0) {
            b = parseInt($(".CloseupLeft").css("top"), 10) + c;
            $(".CloseupLeft").css("top", b + "px")
        }
    },
    hide: function (b) {
        b = $("#" + b);
        var c = $(".Nag", b).outerHeight();
        $(".Sheet", b).css("top", "-" + c + "px").css("bottom", c + "px");
        setTimeout("$('.UndoSheet').css('top','0px').css('bottom','0px')", 1100)
    }
};
var CategorizeBoard = function () {
    return {
        setup: function (b) {
            Nag.setup(b);
            $("#" + b + " select").bind("change", function () {
                $("#" + b + " option:selected").attr("value") != "" && setTimeout("CategorizeBoard.hideSheets()", 100)
            })
        },
        hideSheets: function () {
            Nag.hide("CategoryCallout");
            CategorizeBoard.addCategory()
        },
        addCategory: function () {
            var b = $("#CategorySelect option:selected"),
                c = b.text();
            b = b.attr("value");
            $("#CategoryCallout .UndoSheet").show().find("p span").text(c);
            $.post(boardEndpoint, {
                category: b
            }, function (e) {
                data = $.parseJSON(e);
                if (!data.status == "success") {
                    $("#CategoryCallout .error").html(data.message).show();
                    CategorizeBoard.undoCategory()
                }
            });
            return false
        },
        undoCategory: function () {
            $("#CategoryCallout .Nag").outerHeight();
            $(".UndoSheet").css("top", "-100px").css("bottom", "100px");
            $("#CategorySelect option:first").attr("selected", "selected");
            $.post(boardEndpoint, {
                undo: "1"
            }, function () {});
            setTimeout("CategorizeBoard.newHeights()", 750)
        },
        newHeights: function () {
            $("#CategoryCallout .Sheet1").css("top", "auto").css("bottom", "auto !important");
            $("#CategoryCallout .Sheet2").css("top", "0px").css("bottom", "-3px");
            $("#CategoryCallout .Sheet3").css("top", "0px").css("bottom", "-5px")
        }
    }
}();
var UploadPinDialog = UploadPinDialog || {
    id: "UploadPin",
    setup: function () {
        var b = this,
            c = $("#" + b.id);
        AddDialog.setup(b.id);
        $("input[type=file]", c).change(function () {
            trackGAEvent("upload_file", "submitted");
            AddDialog.pinBottom(b.id);
            $(".ImagePicker ul", c).html("<li><img src='http://passets.pinterest.com/images/load2.gif' class='load' alt='Loading Indicator' /></li>");
            $(".ImagePicker .load", c).show();
            $("form", c).ajaxSubmit({
                type: "POST",
                dataType: "json",
                iframe: true,
                url: "/pin/preview/",
                success: function (e) {
                    if (e.status ===
                        "success") {
                        trackGAEvent("upload_file", "success");
                        $(".load", c).hide();
                        $(".ImagePicker ul", c).html("<li><img src='" + e.image_url + "' /></li>")
                    } else alert(e.message)
                }
            });
            return false
        })
    },
    reset: function () {
        var b = $("#" + this.id);
        $("input[type=file]", b).val("");
        $(".PinBottom", b).hide();
        $(".modal", b).css("margin-bottom", "0");
        $(".Buttons .Button", b).removeClass("disabled").html("Pin It")
    }
};
var RecaptchaPublicKey = "6LdYxc8SAAAAAHyLKDUP3jgHt11fSDW_WBwSPPdF",
    RecaptchaDialog = function () {
        return {
            challenge: function (b) {
                var c = $("#CaptchaDialog");
                Modal.show("CaptchaDialog");
                $.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js", function () {
                    Recaptcha.create(RecaptchaPublicKey, $("#Captcha", c)[0], {
                        theme: "clean",
                        callback: Recaptcha.focus_response_field
                    });
                    $(".Button", c).click(function () {
                        $("#CaptchaDialog span.error").text("").hide();
                        RecaptchaDialog.submit(Recaptcha.get_challenge(), Recaptcha.get_response(),
                            b)
                    })
                })
            },
            submit: function (b, c, e) {
                $.post("/verify_captcha/", {
                    challenge: b,
                    response: c
                }, function (f) {
                    if (f.status == "success") {
                        Modal.close("CaptchaDialog");
                        Recaptcha.destroy();
                        e && e()
                    } else {
                        $("#CaptchaDialog span.error").text("Try again").slideDown();
                        Recaptcha.reload()
                    }
                }, "json")
            }
        }
    }(),
    RecaptchaPrompt = function () {
        return {
            challenge: function () {
                var b = $(".CaptchaPrompt");
                Recaptcha.create(RecaptchaPublicKey, $("#Captcha div", b)[0], {
                    theme: "clean",
                    callback: Recaptcha.focus_response_field
                });
                $("#Button", b).click(function () {
                    $("#CaptchaError").text("").hide();
                    RecaptchaPrompt.submit(Recaptcha.get_challenge(), Recaptcha.get_response())
                })
            },
            submit: function (b, c) {
                $.post("/verify_captcha/" + window.location.search, {
                    challenge: b,
                    response: c
                }, function (e) {
                    if (e.status == "success") window.location = e.url;
                    else {
                        $("#CaptchaError").text("Try again").show();
                        Recaptcha.reload()
                    }
                }, "json")
            }
        }
    }();
var CreateBoardDialog = function () {
    return {
        show: function () {
            CreateBoardDialog.reset();
            AddDialog.close("Add", "CreateBoard")
        },
        load: function (b, c) {
            if (b === undefined) b = false;
            var e = $("#create-board-dialog-container");
            if (e.is(":empty")) e.load("/add_dialogs/board/", function () {
                    $("#CreateBoard input[type=checkbox]").attr("checked", b);
                    $("#CreateBoard input[type=checkbox]").switcher();
                    $("#source_indicator").val(c);
                    CreateBoardDialog.setup();
                    CreateBoardDialog.show()
                });
            else {
                e = $("#CreateBoard input[type=checkbox]");
                Boolean(e.attr("checked")) !==
                    b && e.attr("checked", b).change();
                $("#source_indicator").val(c);
                CreateBoardDialog.show()
            }
        },
        setup: function () {
            function b() {
                if (!k) {
                    k = true;
                    Tagging.initInput("#CreateBoard input.collaborator_name", function (u, o) {
                        j = u;
                        o && d.click()
                    }, function () {}, {
                        filterTypes: [P.SEARCH_FILTER_TYPES.TAG_MUTUAL_FOLLOW, P.SEARCH_FILTER_TYPES.TAG_FOLLOWEE, P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_PINNER, P.SEARCH_FILTER_TYPES.TAG_TWITTER_PINNER]
                    })
                }
            }
            function c() {
                var u = [];
                $("#CurrentCollaborators .collaborator.site", f).each(function () {
                    u.push($(this).attr("username"))
                });
                return u
            }
            function e() {
                var u = [];
                $("#CurrentCollaborators .collaborator.email", f).each(function () {
                    u.push($(this).attr("username"))
                });
                return u
            }
            var f = $("#CreateBoard"),
                g = $("input.collaborator_name", f),
                d = $(".submit_collaborator", f),
                h = $(".messages", f);
            g.on("keydown", function (u) {
                u.which === 13 && d.click()
            });
            var j = null,
                k = false;
            b();
            var l = function () {
                var u = $(".collab_photo_alt", h).text();
                return '<li username="' + j.value + '" class="collaborator site invite"><a class="collaborator_image" href="/' + j.value + '" target="_BLANK"><img src="' +
                    j.image + '" alt="' + u + '"></a><div class="name_container new"><a class="collaborator_name" target="_BLANK" href="/' + j.value + '">' + j.label + '</a></div><a href="#" class="delete_collaborator invite Button WhiteButton Button18" value="' + j.value + '">Remove</a></li>'
            }, r = function (u) {
                    var o = $(".email_collab_photo_alt", h).text();
                    o = '<li username="' + u + '" class="collaborator email invite"><a class="collaborator_image" href="#"><img src="' + P.EMAIL_INVITE_ICON + '" alt="' + o + '"></a><div class="name_container new"><a class="collaborator_name" href="#">' +
                        u + '</a></div><a href="#" class="delete_collaborator invite Button WhiteButton Button18" value="' + u + '">Remove</a></li>';
                    return /^[a-zA-Z0-9\+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(u) ? o : ""
                };
            $("#CreateBoard input.collaborator_name").defaultValue($("#CreateBoard input.collaborator_name").val());
            $(".submit_collaborator", f).click(function () {
                trackGAEvent("submit_board_collaborator", "clicked", "create_board_dialogue");
                var u = g.val(),
                    o = "";
                if (j) o = l(j);
                else if (u) o = r(u);
                if (o) {
                    $("#CurrentCollaborators", f).prepend(o);
                    $(".collaborator_name", f).val("");
                    j = null
                }
            });
            $(".delete_collaborator", f).live("click", function () {
                trackGAEvent("delete_collaborator", "clicked", "create_board_dialogue");
                $(this).parent().remove();
                return false
            });
            BoardPicker.setup("#CreateBoard .BoardPicker", function (u) {
                $("#id_category", f).val(u)
            });
            $("#BoardName", f).keyup(function () {
                $(".board_name.error", f).html() !== "" && $(".board_name.error", f).html("")
            });
            $(".Submit .Button", f).click(function () {
                trackGAEvent("create_board", "clicked", "create_board_dialogue");
                if ($("#BoardName", f).val() == "Board Name" || $("#BoardName", f).val() == "") {
                    $(".CreateBoardStatus", f).html("Please enter a board name").show();
                    return false
                }
                var u = $("#id_category", f).val(),
                    o = $(".Submit .Button", f),
                    m = $("#CreateBoard input[name='secret']").is(":checked"),
                    s = $("#source_indicator").val();
                button_text = o.html();
                o.attr("disabled", "disabled").addClass("disabled").html("Creating &hellip;");
                m = {
                    name: $("#BoardName", f).val(),
                    collaborator: $("input[name='change_BoardCollaborators']:checked", f).val(),
                    collaborators: c(),
                    email_collaborators: e(),
                    secret: m,
                    source_indicator: s
                };
                if (u) m.category = u;
                P.CONTEXT = P.CONTEXT || {};
                P.CONTEXT.component = getCookie("component");
                setCookie("component", "MODAL_CREATE_BOARD");
                $.post("/board/create/", m, function (v) {
                    if (v.status == "success") {
                        trackGAEvent("create_board", "success", "create_board_dialogue");
                        window.location = CreateBoardDialog.nextLocation || v.url
                    } else {
                        $(".CreateBoardStatus", f).html(v.message).show();
                        o.removeAttr("disabled").removeClass("disabled").html(button_text)
                    }
                }, "json");
                return false
            })
        },
        reset: function () {
            $("#BoardName").val("");
            $("input[value='me']").attr("checked", true);
            $("#CurrentCollaborators").empty()
        }
    }
}();
var Login = function () {
    return {
        setup: function () {
            $(".AuthForm").submit(function () {
                $(".Button", this).addClass("disabled")
            });
            $("#resetPassword").click(function () {
                $("#AuthForm").hide();
                $("#ResetForm").show();
                return false
            });
            $("#backToLogin").click(function () {
                $("#AuthForm").show();
                $("#ResetForm").hide();
                return false
            })
        }
    }
}();
var EditPin = function () {
    return {
        setup: function (b) {
            b = b || {};
            Tagging.initTextarea("#description_pin_edit", null, {
                pinId: b.pinId
            });
            Tagging.priceTag("#description_pin_edit", "#PinEditPreview");
            $("#PinEdit").submit(function () {
                Tagging.loadTags("#description_pin_edit", "#id_pin_replies", "#pin_tags", "#id_buyable")
            });
            $("#description_pin_edit").keyup(function () {
                $("#postDescription").html($(this).val())
            })
        },
        deletePin: function () {
            var b = $("#DeletePin .SubmitButton");
            b.addClass("disabled").text(b.data("text-deleting"));
            $.post("/pin/" + pinID + "/delete/", {}, function (c) {
                if (c.status == "success") {
                    trackGAEvent("delete_pin", "success");
                    window.location = c.url
                } else alert(c.message)
            }, "json")
        },
        savePin: function (b) {
            trackGAEvent("save_pin_settings", "clicked", "edit_board_dialogue");
            var c = $("#boardPickerContainer .BoardPicker .current .PrivateBoard").length > 0;
            b == "True" && !c ? Modal.show("PinPrivacyChanged") : EditPin.submitForm()
        },
        submitForm: function () {
            $("#PinEdit").submit()
        }
    }
}();

function get_username_from_email(b) {
    b = $.ajax({
        type: "POST",
        url: "/invite/email_existence/",
        dataType: "json",
        data: {
            email: b
        },
        async: false
    }).responseText;
    return $.parseJSON(b).status == "success"
}
var EditBoard = function () {
    return {
        setup: function () {
            var b = /^[a-zA-Z0-9\+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            $("#BoardEdit input.collaborator_name").defaultValue($("#BoardEdit input.collaborator_name").val());
            BoardPicker.setup("#BoardEdit .BoardPicker", function (f) {
                $("#BoardEdit #id_category").val(f)
            });
            var c = function () {
                var f = $("#BoardEdit .submit_collaborator");
                f.attr("board_id");
                var g = f.attr("requester"),
                    d = f.attr("board_user_id"),
                    h = f.attr("privacy") == "True";
                trackGAEvent("submit_collaborator", "clicked",
                    "edit_board_dialogue");
                b.test($("#BoardEdit input.collaborator_name").val());
                f = get_username_from_email($("#BoardEdit input.collaborator_name").val());
                if (b.test($("#BoardEdit input.collaborator_name").val()) && !f) {
                    invite_email = $("#BoardEdit input.collaborator_name").val();
                    $("#BoardEdit input.collaborator_name").val("");
                    e(invite_email)
                } else {
                    f = $("#BoardEdit .add_collaborators").find("input").serialize();
                    f += "&" + $.param({
                        email: $("#BoardEdit input.collaborator_name").val()
                    });
                    $.post(board_collaborator, f, function (j) {
                        if (j.status == "success") {
                            Tagging.ignore[j.profile_url] = 1;
                            var k = d != g && h;
                            if (k) var l = "in_suggestion_pane",
                            r = $("div.board_creator").attr("data-request-msg");
                            else {
                                l = "";
                                r = $("div.board_creator").attr("data-invite-msg")
                            }
                            trackGAEvent("submit_collaborator", "success", "edit_board_dialogue");
                            $("#BoardEdit input.collaborator_username").val("");
                            $("#BoardEdit input.collaborator_name").val("");
                            var u = $(".current-collabrator-hidden-text").html(),
                                o = $("<div/>").text(j.full_name).html(),
                                m = $("<div/>").text(j.username).html();
                            j = '<li class="collaborator individual_suggestion unaccepted"><a class="collaborator_image" target="_BLANK" href="' + j.profile_url + '"><img src="' + j.avatar_url + '" alt="Collaborator Photo" /></a><div class="name_container"><a class="collaborator_name" target="_BLANK" href="' + j.profile_url + '">' + o + '</a><div class="note">' + r + '</div></div><a href="#" class="Button Button18 WhiteButton delete_collaborator ' + l + '" value="' + m + '" tooltip="Remove ' + o + '">' + u + "</a></li>";
                            j = $(j);
                            if (k) {
                                $("#BoardEdit .add_collaborators_suggestions ul").prepend(j);
                                k = $(".suggestion_li");
                                k.removeClass("hidden");
                                k.attr("style", "")
                            } else $("#BoardEdit .add_collaborators_collabs ul#CurrentCollaborators").prepend(j)
                        } else ShowError(j.message)
                    })
                }
                return false
            };
            $("#BoardEdit .submit_collaborator").click(c);
            $("#BoardEdit .collaborator_name").bind("keydown", function (f) {
                if (f.which === 13) {
                    b.test($("#BoardEdit input.collaborator_name").val()) && c();
                    return false
                }
            });
            $("#BoardEdit .submit_collaborator_approval").click(function () {
                var f = $(this),
                    g = function (h) {
                        if (h.status == "success") {
                            h =
                                $(".suggestion_li");
                            var j = f.parents(".individual_suggestion"),
                                k = j.attr("id").replace("suggestion_invite_", "collabinvite_"),
                                l = $("#" + k);
                            h.find(".individual_suggestion").length <= 1 ? h.fadeOut(500, function () {
                                l.removeClass("hidden")
                            }) : j.fadeOut(500, function () {
                                $(this).remove();
                                l.removeClass("hidden")
                            })
                        } else alert(h.message)
                    }, d = function (h) {
                        if (h.status == "success") {
                            h = $(".suggestion_li");
                            h.find(".individual_suggestion").length <= 1 ? h.fadeOut(500, function () {
                                $(this).remove()
                            }) : f.parents(".individual_suggestion").fadeOut(500, function () {
                                $(this).remove()
                            })
                        } else alert(h.message)
                    };
                g = f.attr("action") == "approve" ? g : d;
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "/invite/owner_approval/",
                    data: {
                        board_id: f.attr("board_id"),
                        inviter_id: f.attr("inviter_id"),
                        collaborator_id: f.attr("collaborator_id"),
                        action: f.attr("action")
                    },
                    success: g,
                    error: function () {
                        alert("Your approval has problems. Try later!")
                    }
                });
                return false
            });
            $("body").on("click", "a.delete_collaborator", function () {
                trackGAEvent("delete_colaborator", "clicked", "edit_board_dialogue");
                var f = $(this),
                    g = f.hasClass("in_suggestion_pane"),
                    d = f.hasClass("invite") ? board_collaborator + "delete/" : board_collaborator,
                    h = f.attr("data-name") || f.parent().find(".collaborator_name").text(),
                    j = f.attr("added-already");
                if (h === "yourself") {
                    j = $("#BoardEdit .privacy-note").attr("data-original") === "secret" ? $("#DeleteCollaborator .delete-collabs-leave-secret").html() : $("#DeleteCollaborator .delete-collabs-leave").html();
                    var k = $("#DeleteCollaborator .delete-collabs-leave-button").html()
                } else {
                    if (!j && g) {
                        $("#DeleteCollaborator .delete-collabs-remove-request .username").text(h);
                        j = $("#DeleteCollaborator .delete-collabs-remove-request").html()
                    } else {
                        $("#DeleteCollaborator .delete-collabs-remove .username").text(h);
                        j = $("#DeleteCollaborator .delete-collabs-remove").html()
                    }
                    k = $("#DeleteCollaborator .delete-collabs-remove-button").html()
                }
                $("#DeleteCollaborator .message").html(j);
                $("#DeleteCollaborator .SubmitButton").text(k);
                Modal.show("DeleteCollaborator");
                EditBoard.deleteCollaborator = function () {
                    $.post(d, {
                        collaborator_username: f.attr("value"),
                        remove: true
                    }, function (l) {
                        if (l.status ==
                            "success") {
                            trackGAEvent("delete_collaborator", "success", "edit_board_dialogue");
                            l = f.parents(".suggestion_li");
                            if (g && l && l.find(".individual_suggestion").length <= 1) l.fadeOut(500, function () {
                                    f.parent().remove();
                                    if (h === "yourself") window.location.href = "/me/"
                                });
                            else {
                                f.parent().remove();
                                if (h === "yourself") window.location.href = "/me/"
                            }
                            l = ".individual_suggestion.userid_" + f.attr("user-id");
                            var r = $("li.suggestion_li").find(l);
                            l = $("li.suggestion_li").find(".individual_suggestion");
                            r.length == l.length ? $("li.suggestion_li").fadeOut(500, function () {
                                r.remove()
                            }) : r.remove();
                            Tagging.ignore && delete Tagging.ignore["/" + f.attr("value") + "/"]
                        } else ShowError(l.message);
                        Modal.close("DeleteCollaborator")
                    })
                };
                return false
            });
            var e = function (f) {
                trackGAEvent("invite_board", "submit", "edit_board_dialogue");
                var g = "/" + board_username + "/" + board_slug + "/collaborator/invite-by-email/",
                    d = _.template($("#InviteSuccessTemplate").html());
                $.post(g, {
                    email: f
                }, function (h) {
                    if (h && h.status == "success") {
                        trackGAEvent("invite_board", "success", "edit_board_dialogue");
                        $("#invite_name").val("");
                        $("#invite_email").val("");
                        h = d({
                            invite_id: invite_email
                        });
                        $("#invite_response").html(h).show().delay(2E3).fadeOut(500)
                    } else ShowError(h.message);
                    $("#BoardEdit input.collaborator_name").val("")
                });
                $("#InviteCollaborator").fadeOut(250);
                return false
            };
            $("#display_all_collabs").click(EditBoard.showAllCollabs);
            $("#display_all_pendings").click(EditBoard.showAllPendings)
        },
        init_ac: function (b) {
            if (!ac_init) {
                ac_init = true;
                b = b || {};
                var c = this,
                    e = $("#BoardEdit");
                Tagging.ignore = {};
                $(".add_collaborators a.collaborator_name",
                    e).each(function (f, g) {
                    Tagging.ignore[$(g).attr("href")] = 1
                });
                Tagging.initInput("#BoardEdit input.collaborator_name", function (f, g) {
                    if (g) if (f.filterType === P.SEARCH_FILTER_TYPES.TAG_FACEBOOK_NON_PINNER) {
                            $("input.collaborator_name", e).val("");
                            c.inviteFacebook(f, b)
                        } else {
                            $("input.collaborator_username", e).val(f ? f.value : "");
                            $("input.collaborator_name", e).val(f ? f.label : "");
                            $(".submit_collaborator", e).click()
                        }
                }, function () {})
            }
        },
        inviteFacebook: function (b, c) {
            var e = _.template($("#InviteSuccessTemplate").html()),
                f = _.template($("#FacebookSendingTemplate").html()),
                g = $("#invite_response");
            $.get("/invites/board-invite-link/" + c.boardId + "/", {
                invite_type: "facebook"
            }, function (d) {
                var h = f({
                    invite_id: b.label
                });
                g.html(h).show();
                FB.ui({
                    method: "send",
                    to: [b.id],
                    name: d.subject,
                    description: d.message,
                    link: d.link,
                    picture: c.userImageUrl
                }, function (j) {
                    if (j) {
                        j = "/" + c.boardUsername + "/" + c.boardSlug + "/collaborator/invite-by-code/";
                        successMessage = e({
                            invite_id: b.label
                        });
                        g.html(successMessage).show().delay(2E3).fadeOut(500);
                        $.post(j, {
                            invite_code: d.invite_code
                        }, function (k) {
                            k.status == "failure" && ShowError(k.message)
                        })
                    } else g.hide()
                })
            })
        },
        showAllCollabs: function () {
            $("#BoardEdit .hidden_collaborator").show();
            $("#BoardEdit .display_more").hide()
        },
        enableSecret: function () {
            $("#id_secret").attr("checked", "checked").trigger("change.switch")
        },
        showAllPendings: function () {
            $("#BoardEdit .hidden_pending").show();
            $("#BoardEdit .display_more_pending").hide()
        },
        deleteBoard: function () {
            trackGAEvent("delete_board", "clicked", "edit_board_dialogue");
            var b =
                $("#DeleteBoard .SubmitButton"),
                c = window.location.pathname.split("/")[1];
            b.addClass("disabled").text("Deleting...");
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: board_settings,
                success: function (e) {
                    trackGAEvent("delete_board", "success", "edit_board_dialogue");
                    if (e.status == "done") window.location = "/" + c;
                    else ShowError("Board delete failed - please refresh and try again. We are very sorry :-/")
                },
                error: function () {
                    ShowError("Board delete failed - please refresh and try again. We are very sorry :-/")
                }
            })
        },
        saveSettings: function () {
            trackGAEvent("save_board_settings",
                "clicked", "edit_board_dialogue");
            var b = $("#id_secret");
            if (b.length) if ($("#BoardEdit .privacy-note").attr("data-original") === "secret" && b.is(":checked") === false) {
                    Modal.show("BoardPrivacyChanged");
                    return
                }
            EditBoard.submitForm()
        },
        submitForm: function () {
            $("#BoardEdit").submit()
        }
    }
}();
(function (b) {
    b.fn.extend({
        switcher: function (c) {
            b.extend({}, c);
            if (!(b.browser.msie && b.browser.version < 9)) return this.each(function () {
                    function e() {
                        h.checkbox.bind("change.switch", d);
                        h.switcher.live("click.switch", g)
                    }
                    function f(l, r) {
                        return b('<div class="switch"><div class="shadow"></div><div class="border"><div class="knob"><div class="circle"><div class="inner circle"></div></div><div class="labels"><label class="on">' + l + '</label><label class="off">' + r + "</label></div></div></div></div>")
                    }
                    function g() {
                        h.checkbox.attr("checked") !==
                            "checked" ? h.checkbox.prop("checked", true) : h.checkbox.prop("checked", false);
                        d()
                    }
                    function d() {
                        h.x = h.switcher.find(".knob").offset().left;
                        var l = b(".shadow", h.switcher);
                        if (h.checkbox.attr("checked") == "checked") {
                            b(".knob", h.switcher).css("margin-left", "62%");
                            l.addClass("on");
                            console.log("moveKnob on")
                        } else {
                            b(".knob", h.switcher).css("margin-left", "0%");
                            l.removeClass("on");
                            console.log("moveKnob off")
                        }
                    }
                    var h = {
                        checkbox: b(),
                        switcher: b(),
                        clicked: false,
                        moved: false,
                        startX: 0,
                        x: 0
                    }, j = b(this).data("text-on"),
                        k = b(this).data("text-off");
                    h.switcher = f(j, k);
                    h.checkbox = b(this);
                    h.checkbox.hide();
                    h.checkbox.after(h.switcher);
                    h.startX = h.switcher.find(".knob").offset().left;
                    e();
                    d()
                })
        }
    })
})(jQuery);
(function (b) {
    function c(e) {
        e = b(e);
        var f = this;
        this.$el = e;
        this.$outerButton = b(".ConfirmOuterButton", e);
        this.$form = b(".ConfirmForm", e);
        this.$finalButton = b(".ConfirmFinalButton", e);
        this.$checkbox = b(".ConfirmCheckbox", e);
        this.$changeOfHeart = b(".ConfirmChangeOfHeart", e);
        this.finalButtonNormalText = this.$finalButton.text();
        this.finalButtonProgressText = this.$finalButton.attr("data-progress-text");
        this.$outerButton.click(function () {
            f.expand()
        });
        this.$checkbox.click(function () {
            f.$checkbox.is(":checked") ? f.$finalButton.removeAttr("disabled") :
                f.$finalButton.attr("disabled", "disabled")
        });
        this.$finalButton.click(function () {
            f.$el.trigger("confirmed")
        });
        this.$changeOfHeart.click(function () {
            f.abort();
            return false
        })
    }
    c.prototype.expand = function () {
        this.$outerButton.hide();
        this.$form.show()
    };
    c.prototype.abort = function () {
        this.$form.hide();
        this.$checkbox.removeAttr("checked");
        this.$finalButton.attr("disabled", "disabled");
        this.$outerButton.show()
    };
    c.prototype.startProgress = function () {
        this.$finalButton.text(this.finalButtonProgressText);
        this.$finalButton.attr("disabled",
            "disabled")
    };
    c.prototype.endProgress = function () {
        this.$finalButton.text(this.finalButtonNormalText);
        this.$finalButton.removeAttr("disabled")
    };
    b.fn.confirmForm = function (e) {
        return this.each(function () {
            var f = b(this),
                g = f.data("confirmForm");
            if (!g) {
                g = new c(this, e);
                f.data("confirmForm", g)
            }
            typeof e == "string" && g[e].call(g)
        })
    }
})(jQuery);
var SelectedFriendView = Backbone.View.extend({
    tagName: "li",
    className: "friend",
    events: {
        "click .close": "unselect"
    },
    initialize: function (b) {
        this.selector = b.selector;
        this.friend = b.friend;
        this.unselectedView = b.unselectedView;
        this.render()
    },
    render: function () {
        this.$el.html(FriendSelector.templates.selectedFriend(this.friend));
        this.$el.appendTo(this.selector.addedList);
        return this
    },
    unselect: function () {
        this.unselectedView.toggleSelectedMultiple();
        this.remove()
    }
}),
    UnselectedFriendView = Backbone.View.extend({
        tagName: "li",
        className: "friend",
        initialize: function (b) {
            this.ul = b.ul;
            this.friend = b.friend;
            this.selector = b.selector;
            this.isSelected = false;
            this.render()
        },
        events: {
            "click .Button": "toggleSelected"
        },
        toggleSelected: function () {
            this.selector.multiple ? this.toggleSelectedMultiple() : this.toggleSelectedSingle()
        },
        toggleSelectedMultiple: function () {
            if (this.isSelected) {
                this.selector.toggleSelected(this);
                this.$el.removeClass("added");
                this.isSelected = false;
                this.$el.show()
            } else if (this.selector.canAdd()) {
                new SelectedFriendView({
                    friend: this.friend,
                    selector: this.selector,
                    unselectedView: this
                });
                this.selector.toggleSelected(this);
                this.$el.addClass("added");
                this.isSelected = true;
                this.$el.hide()
            }
        },
        toggleSelectedSingle: function () {
            this.selector.toggleSelected(this);
            this.$el.find(".Button").toggleClass("disabled");
            (this.isSelected = !this.isSelected) && this.selector.selectionComplete()
        },
        applyFilter: function (b) {
            var c = this.$el,
                e = c.find(".name");
            if (this.friend.name.match(b)) {
                e.data("original", c.html() + "");
                b = (e.text() + "").replace(b, "<strong>$1</strong>");
                e.html(b);
                this.selector.unaddedList.append(c)
            } else {
                c.data("original") && c.html(c.data("original"));
                c.detach()
            }
            return c
        },
        render: function () {
            this.$el.html($(FriendSelector.templates.unselectedFriend(this.friend)));
            this.ul.append(this.$el);
            return this
        }
    }),
    Poller = function (b) {
        this.options = {
            maxRetries: 0
        };
        this.tries = 0;
        this.options = _.extend(this.options, b);
        this.start = function () {
            this.poll()
        };
        this.stop = function () {
            if (this.timeout) {
                window.clearTimeout(this.timeout);
                this.timeout = null
            }
        };
        this.poll = function () {
            var c = this;
            $.ajax({
                url: c.options.url,
                dataType: "json",
                cache: false,
                success: function (e) {
                    c.tries += 1;
                    if (e.success && _.isFunction(c.options.success)) c.options.success(e);
                    else if (c.options.maxRetries > 0 && c.tries > c.options.maxRetries) _.isFunction(c.options.retriesExceeded) && c.options.retriesExceeded();
                    else {
                        c.timeout = window.setTimeout(c.poll, c.options.timeout);
                        _.isFunction(c.options.error) && c.options.error(e)
                    }
                }
            })
        };
        _.bindAll(this);
        return this
    }, FriendSelector = Backbone.View.extend({
        events: {
            "click .ActionButton": "selectionComplete",
            "keyup .filter-term": "filterFriends"
        },
        initialize: function (b) {
            _.isUndefined(FriendSelector.templates) && FriendSelector.loadTemplates();
            this.multiple = _.isBoolean(b.multiple) ? b.multiple : true;
            this.url = this.$el.data("url");
            this.maxSelections = parseInt(this.$el.data("max-selections"));
            this.unaddedList = this.$el.find(".friend-list");
            this.loading = this.$el.find(".loading");
            this.confirm = this.$el.find(".invite-confirm");
            this.confirmRecipients = this.$el.find(".invite-recipients");
            this.unaddedList.hide();
            if (this.multiple) {
                this.addedList = this.$el.find(".added-friends ul");
                this.counter = this.$el.find(".current-selections")
            }
            this.maxRetries = b.maxRetries ? b.maxRetries : 8;
            _.isFunction(b.selectionMade) && this.$el.on("selection:made", b.selectionMade);
            _.isFunction(b.noAccess) && this.$el.on("selection:no-access", b.noAccess);
            this.filterFriends = _.debounce(this.filterFriends, 100);
            this.unselectedFriends = [];
            this.selectedFriends = [];
            this.friendList = b.friendList;
            var c = this;
            this.poller = new Poller({
                url: c.url,
                timeout: 1E3,
                maxRetries: c.maxRetries,
                retriesExceeded: b.retriesExceeded,
                error: function (e) {
                    if (!e.has_access) {
                        c.poller.stop();
                        c.loading.fadeOut(300, function () {
                            c.$el.trigger("selection:no-access", [e, c])
                        })
                    }
                },
                success: function (e) {
                    if (e.friends && e.friends.length > 0) window.location.reload();
                    else {
                        c.friendList = e.friends;
                        c.loading.fadeOut(350);
                        c.buildFriendViews()
                    }
                }
            });
            if (_.isArray(this.friendList)) this.buildFriendViews();
            else {
                this.friendList = null;
                this.findFriends()
            }
            this.updateCounter();
            this.$el.data("selector", this);
            this.$el.find(".filter-term").val("");
            this.setOffsets();
            $(window).resize(_.bind(this.setOffsets, this))
        },
        setOffsets: function () {
            var b =
                this.$el.find(".unadded-friends");
            this.$el.find(".added-friends").css("left", b.offset().left + b.width() + 20)
        },
        findFriends: function () {
            this.loading.removeClass("hidden");
            this.poller.start();
            return this
        },
        filterFriends: function (b) {
            b = $(b.currentTarget).val();
            var c = new RegExp("(" + b + ")", "i");
            _.each(this.unselectedFriends, function (e) {
                e.applyFilter(c)
            })
        },
        removeFriends: function (b) {
            this.friendList = _.reject(this.friendList, function (e) {
                return _.include(b, e.id)
            });
            _.each(this.unselectedFriends, function (e) {
                _.include(b,
                    e.friend.id) && e.$el.remove()
            });
            this.selectedFriends = [];
            if (this.addedList) {
                var c = this.addedList.find("li");
                c.fadeOut(350, function () {
                    c.remove()
                })
            }
        },
        canAdd: function () {
            return this.maxSelections ? this.selectedFriends.length < this.maxSelections : true
        },
        toggleSelected: function (b) {
            b.isSelected ? this.setUnselected(b) : this.setSelected(b);
            this.updateCounter()
        },
        updateCounter: function () {
            if (this.counter) {
                this.unaddedList.fadeTo(this.canAdd() ? 1 : 0.2);
                this.counter.html(this.maxSelections - this.selectedFriends.length)
            }
        },
        setSelectedState: function (b, c) {
            if (!this.multiple) this.selectedFriends = [];
            if (c) this.selectedFriends.push(b);
            else this.selectedFriends = _.without(this.selectedFriends, b)
        },
        setUnselected: function (b) {
            this.selectedFriends = this.multiple ? _.without(this.selectedFriends, b) : []
        },
        setSelected: function (b) {
            if (this.multiple) this.selectedFriends.push(b);
            else this.selectedFriends = [b]
        },
        buildFriendViews: function () {
            var b = this;
            _.each(this.friendList, function (c) {
                c = new UnselectedFriendView({
                    ul: b.unaddedList,
                    friend: c,
                    selector: b
                });
                b.unselectedFriends.push(c.render())
            });
            this.unaddedList.fadeIn(350)
        },
        afterSelection: function () {
            var b = _.pluck(this.selectedFriends, "friend");
            this.removeFriends(_.pluck(b, "id"));
            this.confirmRecipients.html(Arrays.conjunct(_.pluck(b, "name")));
            this.confirm.fadeIn(500).delay(3E3).fadeOut(500)
        },
        selectionCancelled: function () {
            _.each(this.selectedFriends, function (b) {
                b.toggleSelected()
            });
            this.selectedFriends = [];
            this.unaddedList.find(".disabled").toggleClass("disabled")
        },
        selectionComplete: function () {
            this.$el.trigger("selection:made", [_.pluck(this.selectedFriends, "friend"), this])
        }
    }, {
        initAll: function () {
            FriendSelector.loadTemplates();
            $(".friend-selector").each(function (b, c) {
                new FriendSelector({
                    el: c
                })
            })
        },
        loadTemplates: function () {
            FriendSelector.templates = {
                unselectedFriend: _.template($("#template-unselected-friend").html()),
                selectedFriend: _.template($("#template-selected-friend").html())
            }
        }
    });
$(window).ready(function () {
    "placeholder" in document.createElement("input") || $("[placeholder]").focus(function () {
        var b = $(this);
        if (b.val() == b.attr("placeholder")) {
            b.val("");
            b.removeClass("placeholder")
        }
    }).blur(function () {
        var b = $(this);
        if (b.val() == "" || b.val() == b.attr("placeholder")) {
            b.addClass("placeholder");
            b.val(b.attr("placeholder"))
        }
    }).blur().parents("form").submit(function () {
        $(this).find("[placeholder]").each(function () {
            var b = $(this);
            b.val() == b.attr("placeholder") && b.val("")
        })
    })
});
var RepinDialog2 = function () {
    function b(q) {
        var w = {};
        w[E + "transform"] = q;
        return w
    }
    function c(q, w) {
        return b("scale(" + q + "," + w + ")")
    }
    function e(q, w) {
        q = Math.floor(q);
        w = Math.floor(w);
        return A && !p ? {
            left: q + "px",
            top: w + "px"
        } : b("translate(" + q + "px," + w + "px)")
    }
    function f(q, w) {
        w = $.extend({
            url: "/pin/" + q + "/repindata/",
            dataType: "json",
            success: function () {},
            failure: function () {
                RepinDialog2.close()
            }
        }, w || {});
        $.ajax(w)
    }
    function g(q) {
        return $('div[data-id="' + q + '"]')
    }
    function d(q, w) {
        var y = Math.min(Math.floor(w / q * x), v);
        q = Math.floor(y /
            w * q);
        return {
            height: y,
            width: q
        }
    }
    function h(q, w, y) {
        q = o(q, w, y);
        $("body").append(q.css({
            visibility: "hidden",
            position: "absolute"
        }));
        w = {
            base: q,
            height: q.height(),
            width: q.width()
        };
        q.remove().css({
            visibility: "",
            position: ""
        });
        return w
    }
    function j() {
        if (M) {
            window.clearInterval(M);
            M = null
        }
    }
    function k(q, w) {
        function y() {
            M = window.setInterval(function () {
                var Q = H.val().length;
                !Q || Q > 500 || !N.val() ? G.addClass("disabled") : G.removeClass("disabled")
            }, 100)
        }
        var C = $("form", w),
            G = $(".Buttons .Button", w),
            H = $(".DescriptionTextarea",
                w),
            J = $(".CharacterCount", w),
            K = $(".mainerror", w),
            N = $("#repin_board", w);
        AddDialog.shareCheckboxes("Repin2");
        $("#Repin2 .CreateSecretBoard input[type=checkbox]").switcher();
        CharacterCount.setup(H, J);
        $("#publish_to_facebook", w).click(function () {
            $(this).data("publish-fb") || Facebook.startFacebookConnect("publish_stream", false, false)
        });
        G.click(function () {
            if (H.val() == "") {
                K.html(H.data("text-error-empty")).slideDown();
                return false
            }
            $("#repin_details", C).val(H.val());
            Tagging.loadTags(H, $("#repin_comment_replies",
                C), $("#repin_tags", C), $("#repin_currency_holder", C));
            C.submit();
            return false
        });
        y();
        C.submit(function () {
            if (G.hasClass("disabled")) return false;
            trackGAEvent("repin_submit", "clicked", "dialogue");
            j();
            G.addClass("disabled").html(G.data("text-pinning"));
            RepinDialog2.trigger(RepinDialog2.EVENTS.REPIN_DIALOG_SUBMIT);
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                dataType: "json",
                data: $(this).serialize(),
                success: function (Q) {
                    if (Q.status == "success") RepinDialog2.onSubmitSuccess(w, Q);
                    else {
                        y();
                        ShowError(Q.message, function () {
                            G.removeClass("disabled").html(G.data("text-pin-it"))
                        })
                    }
                },
                error: function () {
                    G.removeClass("disabled").html(G.data("text-pin-it"))
                }
            });
            return false
        });
        Tagging.initTextarea(H, null, {
            pinId: q
        });
        Tagging.priceTag(H, $(".PinImagePreview", w));
        CharacterCount.truncateData(H, 500);
        BoardPicker.setup($(".BoardPicker", w), function (Q) {
            N.val(Q)
        }, function (Q) {
            var R = $("#Repin"),
                V = $(".BoardPicker", R);
            R = $(".BoardList", R);
            R = $("ul", R);
            var W = $(".BoardList", w);
            W = $("ul", W);
            BoardPicker.removeNoBoardUi(V);
            R.empty();
            R.append(W.children().clone());
            N.val(Q)
        });
        $.browser.msie || window.setTimeout(function () {
            H.focus().select()
        }, 1)
    }
    function l() {
        var q, w, y, C;
        if (!n) {
            w = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
            q = $("div", w);
            y = $('<div style="width:50px;height:50px;overflow:hidden;overflow-y:scroll;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
            C = $("div", y);
            $("body").append(w, y);
            q = q.innerWidth() - C.innerWidth();
            w.remove();
            y.remove();
            $("head").append('<style type="text/css">.noscroll.extraScroll,.noscroll.extraScroll #CategoriesBar,.noscroll.extraScroll #Header {margin-right:' +
                q + "px;}</style>");
            $("body").addClass("extraScroll");
            I && $("body").addClass("hidefixed");
            n = true
        }
    }
    function r(q, w) {
        var y = new Image;
        if (typeof w === "function") y.onload = w;
        y.src = q
    }
    function u(q, w) {
        q && q.length && r(q.attr("src").replace(/_(b|c)\.jpg$/, "_f.jpg"), w)
    }
    function o(q, w, y) {
        var C = $("#Repin"),
            G = $('<div id="Repin2"></div>'),
            H = $(".PinForm", C).clone();
        y && H.prepend(y.clone());
        H.prepend($('<div class="PinImagePreview pin priceReveal"></div>').css({
            height: w.height + "px"
        }));
        G.append($('<button class="close" type="button">Close</button>'),
            H, $("#repinform", C).clone());
        $("#repin_pin_id", G).val(q);
        $("form", G).attr("action", "/pin/" + q + "/repin/");
        return G
    }
    function m(q, w, y) {
        y = '<div class="PinBorder"></div><img class="PinImagePreviewImg" src="' + w.imgurl + '" width="' + y.width + '" height="' + y.height + '" />';
        if (w.video) y += '<img src="' + media_url + 'images/VideoIndicator.png" alt="Video Icon" class="video" />';
        if (w.buyable) y += '<div class="price">$' + w.buyable + "</div>";
        $(".PinImagePreview", q).html(y);
        $(".DescriptionTextarea", q).val(w.details).parent("li").addClass("val");
        $("#repin_tags", q).val(w.tags.join(","));
        $("#repin_comment_replies", q).val(w.reply_usernames.join(","));
        return q
    }
    var s = "visible",
        v = 300,
        x = 370,
        A = $.browser.webkit,
        D = $.browser.mozilla,
        I = navigator.userAgent.match(/chrome/i),
        p = navigator.userAgent.match(/ipad/i),
        n = false,
        z = Modernizr.csstransforms3d && !navigator.userAgent.match(/ipod|iphone|android/i),
        B = !! window.Router,
        E = "",
        F = 0,
        M = null,
        O = {}, L = {}, S = window.MemoPlacement && window.memoManager ? MemoPlacement.createPopupPlacement(memoManager, memoManager.PLACEMENTS.REPIN_DIALOG,
            ".repinMask") : null;
    if (A) E = "-webkit-";
    else if (D) E = "-moz-";
    if (B) {
        Router.on("route:repin", function (q) {
            RepinDialog2.show(q, true)
        });
        Router.on("route:zoom", function () {
            RepinDialog2.close(true)
        });
        Router.on("route:other", function () {
            RepinDialog2.close(true)
        })
    }
    var X = {
        setup: function () {
            var q = this,
                w;
            $("#ColumnContainer").on("click", ".repin_link", function (y) {
                q.trigger(q.EVENTS.REPIN_BUTTON_CLICKED);
                trackGAEvent("repin_button", "clicked", "board_layout");
                w = $(this).closest(".pin").attr("data-id");
                q.show(w);
                y.preventDefault()
            })
        },
        show: function (q, w) {
            if (!this.currentPinID) {
                l();
                this.currentPinID = q;
                B && !w && Router.navigate("/pin/" + q + "/repin/");
                if (z) if ($("#zoom").length) this.flipFromCloseupModal(q);
                    else $(".CloseupRight").length ? this.flipFromCloseupPage(q) : this.flipFromGrid(q);
                    else if ($("#zoom").length) this.simpleShowFromCloseupModal(q);
                else $(".CloseupRight").length ? this.simpleShowFromCloseupPage(q) : this.simpleShowFromGrid(q)
            }
        },
        flip: function (q, w, y, C, G, H, J) {
            function K() {
                if (!T.isFlipping && T.backContent && W) {
                    var Y = $(".PinImagePreviewImg",
                        fa);
                    Y.attr("src", Y.attr("src").replace("_b.jpg", "_f.jpg"))
                }
            }
            function N() {
                var Y = $(window),
                    ea = Y.height();
                Y = Y.width();
                ca.css(e(Y < ba ? ba / 2 : Y / 2, ea < aa ? aa / 2 : ea / 2));
                S && S.refresh()
            }
            function Q() {
                N()
            }
            function R() {
                if (!T.isFlipping && T.backContent) {
                    fa.empty().append(T.backContent);
                    K();
                    k(q, T.backContent);
                    D && !ha.length && da.addClass(s);
                    $(window).on("resize", Q)
                }
            }
            var V = this,
                W = false,
                T = {
                    isFlipping: true,
                    frontSource: C
                }, U = d(w, y);
            w = C.outerWidth();
            y = C.outerHeight();
            var Z = C.offset();
            J = h(q, U, J);
            var ga = J.base,
                ba = J.width,
                aa = J.height,
                ia = w / ba,
                ja = y / aa,
                ha = $("#zoomScroll"),
                da, ca, ka, fa;
            u(G, function () {
                W = true;
                K()
            });
            da = $('<div id="flipScroll" class="repinMask"><div id="flip"><div class="front face"><div class="repinWrapper"></div></div><div class="back face"><div class="repinWrapper"></div></div></div></div>');
            T.startScale = [ia, ja];
            T.container = da;
            T.resizeFn = Q;
            ca = $("#flip", da);
            G = $(".front", ca);
            ka = $(".repinWrapper", G);
            J = $(".back", ca);
            fa = $(".repinWrapper", J);
            ca.css(e(Z.left + w / 2, Z.top - $(window).scrollTop() + y / 2));
            G.css({
                top: -Math.floor(y / 2) + "px",
                left: -Math.floor(w / 2) + "px"
            });
            ka.append(H, $('<div class="faceMask"></div>')).css({
                height: y + "px",
                width: w + "px"
            });
            J.css({
                top: -Math.floor(aa / 2) + "px",
                left: -Math.floor(ba / 2) + "px"
            });
            fa.html('<div id="BackLoader"></div>').css($.extend({
                height: aa + "px",
                width: ba + "px"
            }, c(ia, ja)));
            ha.addClass("notransition");
            $("body").addClass("noscroll").append(da);
            C.addClass("invisible");
            f(q, {
                success: function (Y) {
                    if (Y && Y.status === "failure") {
                        ShowError(Y.message);
                        RepinDialog2.close(true)
                    } else if (!T.isClosing) {
                        T.backContent =
                            m(ga, Y, U);
                        R()
                    }
                }
            });
            setTimeout(function () {
                var Y = $(window).height();
                N();
                Y < aa && da.scrollTop(aa - Y);
                ka.css(c(1 / ia, 1 / ja));
                fa.css(b(""));
                ca.addClass("flipping flipped");
                !D && !ha.length && da.addClass(s);
                setTimeout(function () {
                    var ea;
                    ca.removeClass("flipping");
                    if (!T.isClosing) {
                        T.isFlipping = false;
                        R();
                        if (S) {
                            ea = {};
                            ea[memoManager.PIN_ID_PARAMETER] = q;
                            S.requestMemo(ea)
                        }
                    }
                }, 401)
            }, 1);
            V.closeListeners(q);
            O[q] = T
        },
        flipFromCloseupModal: function (q) {
            var w = $("#zoom"),
                y = $(".PinImageImg", w),
                C = y.height(),
                G = y.width();
            if (y && !y.length) {
                y =
                    $(".PinImage", w);
                C = y.attr("data-height");
                G = y.attr("data-width");
                y = null
            }
            this.flip(q, G, C, w, y, $('<div id="zoom" class="pin"></div>').html(w.html()), $(".AttributionSource", w))
        },
        flipFromCloseupPage: function (q) {
            var w = $(".CloseupRight > .WhiteContainer"),
                y = $("#pinCloseupImage"),
                C = y.height(),
                G = y.width();
            if (y && !y.length) {
                y = $("#pinCloseupVideo");
                C = y.attr("data-height");
                G = y.attr("data-width");
                y = null
            }
            this.flip(q, G, C, w, y, w.clone(), $(".AttributionSource", w))
        },
        flipFromGrid: function (q) {
            var w = g(q);
            this.flip(q, w.attr("data-width"),
                w.attr("data-height"), w, $(".PinImageImg", w), $('<div class="pin"></div>').html(w.html()), $(".AttributionSource", w))
        },
        simpleShow: function (q, w, y, C) {
            function G() {
                var U = $(window),
                    Z = U.height();
                U = U.width();
                Z = Z < V ? 0 : Math.floor((Z - V) / 2);
                U = U < R ? 0 : Math.floor((U - R) / 2);
                (T || K).css({
                    top: Z + "px",
                    left: U + "px"
                })
            }
            function H() {
                G();
                S.refresh()
            }
            var J = $('<div class="repinMask simpleRepin"><div id="Repin2"><div id="BackLoader"></div></div></div>'),
                K = $("#Repin2", J),
                N = d(w, y);
            w = h(q, N, C);
            var Q = w.base,
                R = w.width,
                V = w.height,
                W = {};
            w =
                $("body");
            y = this;
            var T;
            w.addClass("noscroll");
            J.addClass(s);
            K.css({
                height: V + "px",
                width: R + "px"
            });
            G();
            w.append(J);
            W.resizeFn = H;
            W.container = J;
            f(q, {
                success: function (U) {
                    var Z = $(window).height();
                    if (U && U.status === "failure") {
                        ShowError(U.message);
                        RepinDialog2.close(true)
                    } else if (!W.isClosing) {
                        trackGAEvent("flip_grid_form", "success", "repin");
                        T = m(Q, U, N);
                        K.replaceWith(T);
                        G();
                        Z < V && J.scrollTop(V - Z);
                        k(q, T);
                        $(window).on("resize", H);
                        if (S) {
                            U = {};
                            U[memoManager.PIN_ID_PARAMETER] = q;
                            S.requestMemo(U)
                        }
                    }
                }
            });
            y.closeListeners(q);
            L[q] = W
        },
        simpleShowFromCloseupModal: function (q) {
            var w = $("#zoom"),
                y = $(".PinImageImg", w);
            this.simpleShow(q, y.width(), y.height(), $(".AttributionSource", w))
        },
        simpleShowFromCloseupPage: function (q) {
            var w = $(".CloseupRight > .WhiteContainer"),
                y = $("#pinCloseupImage");
            this.simpleShow(q, y.width(), y.height(), $(".AttributionSource", w))
        },
        simpleShowFromGrid: function (q) {
            var w = g(q);
            this.simpleShow(q, w.attr("data-width"), w.attr("data-height"), $(".AttributionSource", w))
        },
        onSubmitSuccess: function (q, w) {
            var y = $('<div class="PostSuccess">' +
                $("#Repin .PostSuccess").html() + "</div>"),
                C = $(".close", q).detach();
            trackGAEvent("repin_submit", "success", "dialogue");
            $(".BoardLink", y).attr("href", w.board_url).text(w.board_name);
            $(".PinLink", y).attr("href", w.repin_url);
            $("#repin_success_board_id", y).val(w.board_id);
            w["private"] == true ? $(".repin_share_with_followers_msg", y).hide() : $(".repin_lock_icon", y).hide();
            q.empty().append(C, y);
            q = 2500;
            y = $("#Repin2 .PostSuccess .suggestion");
            if (w.suggestion) {
                trackGAEvent("repin_submit", "viewed", "suggestion");
                y.find(".boardHolder").html(w.suggestion);
                y.fadeIn(500);
                q = 1E4;
                $(".pinBoard .followBoard a", y).click(function () {
                    clearTimeout(F);
                    trackGAEvent("repin_submit", "clicked", "suggestion");
                    F = setTimeout(function () {
                        RepinDialog2.close()
                    }, 1E3)
                })
            } else {
                y.hide();
                $("#Repin2").parent().css("height", "")
            }
            clearTimeout(F);
            F = setTimeout(function () {
                RepinDialog2.close()
            }, q)
        },
        closeListeners: function () {
            var q = this,
                w = $(".repinMask");
            w.click(function (y) {
                y = $(y.target);
                if (y.is(w) || y.hasClass("close")) q.close()
            });
            $(document).keydown(function (y) {
                if (y.keyCode == 27) {
                    q.close();
                    y.preventDefault()
                }
            })
        },
        close: function (q) {
            function w() {
                K.remove();
                y.length || $("body").removeClass("noscroll")
            }
            var y = $("#zoomScroll"),
                C, G, H, J, K, N, Q = this;
            if (N = this.currentPinID) {
                clearTimeout(F);
                j();
                (function () {
                    var R = $("#Repin"),
                        V = $("#Repin2"),
                        W = $("#Repin .CurrentBoard"),
                        T = $("#Repin2 .CurrentBoard");
                    V = $("#repin_board", V);
                    R = $("#repin_board", R);
                    if (!T.length) {
                        T = $("#Repin2 .BoardLink");
                        V = $("#Repin2 #repin_success_board_id")
                    }
                    if (T.length) {
                        W.text(T.text());
                        R.val(V.val());
                        BoardPicker.reorderListItems($(".BoardPicker",
                            "#Repin"))
                    }
                })();
                B && !q && window.history.back();
                this.currentPinID = null;
                if (O[N]) {
                    C = $("#flip", K).addClass("flipping");
                    q = O[N];
                    q.isClosing = true;
                    q.isFlipping = false;
                    G = q.startScale;
                    J = q.frontSource;
                    H = J.offset();
                    K = q.container;
                    K.removeClass(s);
                    C.removeClass("flipped").css(e(H.left + J.outerWidth() / 2, H.top - $(window).scrollTop() + J.outerHeight() / 2));
                    $(".back .repinWrapper", C).empty().css(c(G[0], G[1]));
                    $(".front .repinWrapper", C).css(b(""));
                    C.addClass("flipping");
                    setTimeout(function () {
                        J.removeClass("invisible");
                        window.setTimeout(function () {
                            y.removeClass("notransition")
                        },
                            1);
                        w();
                        O[N] = null
                    }, 401);
                    $(window).off("resize", q.resizeFn)
                } else if (L[N]) {
                    q = L[N];
                    q.isClosing = true;
                    K = q.container;
                    w();
                    L[N] = null;
                    $(window).off("resize", q.resizeFn)
                }
                Q.trigger(Q.EVENTS.REPIN_DIALOG_CLOSED)
            }
        },
        EVENTS: {
            REPIN_DIALOG_SUBMIT: "repin_dialog_submit",
            REPIN_DIALOG_CLOSED: "repin_dialog_closed",
            REPIN_BUTTON_CLICKED: "repin_button_clicked"
        }
    };
    _.extend(X, Backbone.Events);
    return X
}();
var MobileNagControl = function () {
    this.hideNagCookie = P.MobileNagConfig.HIDE_NAG_COOKIE;
    this.csrf = P.MobileNagConfig.CSRF_TOKEN;
    this.nagType = P.MobileNagConfig.nag_type;
    this.hasTopNag = P.MobileNagConfig.has_top_nag;
    this.enabledNags = P.MobileNagConfig.nag_support;
    this.body = $(document.body);
    this.currentLocation = window.location;
    this.userAgent = navigator ? navigator.userAgent : "";
    this.nagBar = $("#AppNag")
};
a = MobileNagControl.prototype;
a.init = function () {
    $(".Nag").length && this.body.addClass("hazYellowNag");
    document.URL.match(/\/pin\//) && this.body.addClass("hazCloseUp");
    this.hasTopNag && $(document.body).addClass("topNag");
    this.nagType && this.nagType != "unauth" && $(document.body).addClass("appNag");
    this.renderUnauthNags();
    this.attachHandlers()
};
a.getRequestPath = function () {
    return this.currentLocation.pathname
};
a.attachHandlers = function () {
    var b = this;
    $(".close", this.nagBar).click(function () {
        CookieManager.set_cookie(b.hideNagCookie, "1");
        b.closeNag();
        b.trackCloseNag();
        return false
    });
    $(".open", this.nagBar).click(function () {
        b.trackClickNag();
        window.setTimeout(function () {
            DeepLinking.redirectApp()
        }, 300);
        return false
    })
};
a.closeNag = function () {
    this.body.removeClass("appNag");
    this.nagBar.hide()
};
a.trackCloseNag = function () {
    $.post("/close_mobile_nag/", {
        nag_type: this.nagType,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.trackClickNag = function () {
    $.post("/click_mobile_nag/", {
        nag_type: this.nagType,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.trackViewNag = function (b) {
    $.post("/view_mobile_nag/", {
        nag_type: b,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.renderUnauthNags = function () {
    var b = "",
        c = navigator ? navigator.userAgent : "",
        e = CookieManager.get_cookie(this.hideNagCookie);
    if (this.nagType == "unauth" && !e) {
        if (c.match(/iphone/i)) b = "iphone";
        else if (c.match(/ipad/i)) b = "ipad";
        else if (c.match(/android/i)) b = "android";
        if (b && this.enabledNags && this.enabledNags.indexOf(b) >= 0) {
            $(document.body).addClass("topNag");
            $("." + b, this.appNag).show();
            $(".unauth", this.appNag).show();
            this.trackViewNag(b)
        }
    }
};
var DeepLinking = {
    android_app_dl_url: "https://play.google.com/store/apps/details?id=com.pinterest",
    apple_app_dl_url: "http://itunes.apple.com/us/app/pinterest/id429047995",
    app_url: "pinterest://",
    app_url2: "pinit12://",
    deep_link_cookie: "deep_linking_cookie",
    current_location: window.location,
    android_redirect_key: "p_android_return",
    init: function () {
        !CookieManager.get_cookie(this.deep_link_cookie) && this.handleDeepLink()
    },
    handleDeepLink: function () {
        return this.isValidSource() && this.isIOS()
    },
    isValidSource: function () {
        var b =
            this.current_location.search;
        return b && b.match(/utm_medium=email/g) != null
    },
    isIOS: function () {
        return navigator && navigator.userAgent.match(/iP/i) != null
    },
    isAndroid: function () {
        return navigator && navigator.userAgent.match(/android/i) != null
    },
    redirectApp: function () {
        var b = this,
            c = b.app_url + this.current_location.href,
            e = null,
            f = b.app_url2 + this.current_location.href.replace(/(http:\/\/)|(https:\/\/)/, "");
        CookieManager.delete_cookie(this.deep_link_cookie);
        if (this.isIOS()) {
            window.location = c;
            window.setTimeout(function () {
                CookieManager.set_cookie(b.deep_link_cookie,
                    "1");
                window.location = b.apple_app_dl_url
            }, 50)
        } else if (this.isAndroid()) {
            e = document.createElement("iframe");
            e.style.visibility = "hidden";
            e.src = f;
            e.onload = function () {
                window.location = b.android_app_dl_url
            };
            document.body.appendChild(e)
        }
    },
    getAndroidRedirectUrl: function (b) {
        b = b.indexOf("?") >= 0 ? b + "&" : b + "?";
        b += this.android_redirect_key + "=1";
        return b
    }
}, CookieManager = {
        set_cookie: function (b, c, e) {
            var f = new Date,
                g = "";
            if (e) {
                f.setTime(f.getTime() + e * 24 * 60 * 60 * 1E3);
                g = "; expires=" + f.toGMTString()
            }
            document.cookie = b + "=" +
                c + g + "; path=/"
        },
        delete_cookie: function (b) {
            this.set_cookie(b, "", -1)
        },
        get_cookie: function (b) {
            var c = null,
                e = null,
                f = null;
            if (document.cookie && document.cookie != "") {
                e = document.cookie.split(";");
                for (var g = 0; g < e.length; g++) {
                    f = jQuery.trim(e[g]);
                    if (f.substring(0, b.length + 1) == b + "=") c = decodeURIComponent(f.substring(b.length + 1))
                }
            }
            return c
        }
    };
DeepLinking.init();
$(document).bind("ready.deep_links", function () {
    window.P && window.P.MobileNagConfig && window.P.MobileNagConfig.nag_type && (new MobileNagControl).init()
});
var Repin = function () {
    return {
        setup: function (b) {
            b = b || {};
            var c = $(".StaticRepinForm"),
                e = $("textarea[name=details]", c),
                f = $(".RepinPreview"),
                g = $("#boardPickerContainer");
            b = b.pinId;
            $("#id_board", c).removeAttr("disabled");
            g.show();
            BoardPicker.setup(".StaticRepinForm .BoardPicker", function (d) {
                $("#id_board", c).val(d)
            }, function (d) {
                $("#id_board", c).val(d)
            });
            Tagging.initTextarea(e, null, {
                pinId: b
            });
            Tagging.priceTag(e, f);
            c.submit(function () {
                Tagging.loadTags(e, $("input[name=pin_replies]", c), $("input[name=tags]", c),
                    $("input[name=buyable]", c))
            });
            e.keyup(function () {
                $("p", f).html($(this).val())
            })
        }
    }
}();
var window_lib = window.jQuery ? jQuery : Zepto;
(function (b) {
    b.fn.passStrength = function (c, e, f, g) {
        return this.each(function () {
            var d = b(this);
            b(d).unbind().bind("keyup blur", function () {
                if (b(this).val() !== null) {
                    var h = b.fn.teststrength(b(this).val(), g, f);
                    if (h[2]) {
                        c.attr("disabled", "disabled");
                        c.addClass("disabled")
                    } else {
                        c.removeAttr("disabled");
                        c.removeClass("disabled")
                    }
                    e.html(h[0]);
                    e.removeClass(g.badPassStyle);
                    e.removeClass(g.goodPassStyle);
                    e.removeClass(g.strongPassStyle);
                    e.addClass(h[1])
                }
            })
        })
    };
    b.fn.teststrength = function (c, e, f) {
        var g = 0;
        if (c.length <
            6) return [e.shortPassStr, e.badPassStyle, 1];
        if (e.userid.length > 0 && c.toLowerCase() == e.userid.toLowerCase()) return [e.samePasswordStr, e.badPassStyle, 1];
        if (b.inArray(c.toLowerCase(), f) > -1) return [e.blackPassStr, e.badPassStyle, 1];
        g += c.length * 2;
        g += b.fn.uniqueCharacters(c) * 3;
        if (c.match(/(.*[0-9].*[0-9].*[0-9])/)) g += 15;
        if (c.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)) g += 15;
        if (c.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) g += 10;
        if (c.match(/([a-zA-Z])/) && c.match(/([0-9])/)) g += 15;
        if (c.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) &&
            c.match(/([0-9])/)) g += 15;
        if (c.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && c.match(/([a-zA-Z])/)) g += 15;
        if (c.match(/^[a-z]+$/) || c.match(/^[A-Z]+$/) || c.match(/^\d+$/)) g -= 10;
        if (g < 34) return [e.badPassStr, e.badPassStyle, 0];
        if (g < 68) return [e.goodPassStr, e.goodPassStyle, 0];
        return [e.strongPassStr, e.strongPassStyle, 0]
    }
})(window_lib);
$.fn.uniqueCharacters = function (b) {
    for (var c = {}, e = 0, f = 0; f < b.length; f++) if (!(b.charAt(f) in c)) {
            c[b.charAt(f)] = true;
            e++
        }
    return e
};

function ShowError(b, c) {
    var e = $("#ErrorDialog");
    if (e.length && b) {
        $(".message", e).html(b);
        $(".closeButton", e).click(function () {
            Modal.close("ErrorDialog");
            c && c();
            return false
        });
        Modal.show("ErrorDialog")
    }
}

function ShowConfirmation(b, c) {
    var e = $("#ConfirmationDialog"),
        f = function (g) {
            $(".confOkButton2").addClass("hidden");
            Modal.close(g)
        };
    if (e.length && b) {
        $(".message", e).html(b);
        c.header && $("h2", e).html(c.header);
        c.okText && $(".confOkButton", e).html(c.okText);
        if (c.okText2) {
            $(".confOkButton2").removeClass("hidden");
            $(".confOkButton2", e).html(c.okText2)
        }
        c.cancelText && $(".confCloseButton", e).html(c.cancelText);
        $(".closeButton", e).click(function () {
            f("ConfirmationDialog");
            return false
        });
        $(".okButton", e).click(function () {
            var g =
                $(this).hasClass("confOkButton");
            f("ConfirmationDialog");
            c.successFn && c.successFn(g);
            return false
        });
        Modal.show("ConfirmationDialog")
    }
};
var ReportBlockForm = function () {
    this.displayed = false;
    this.originalHeight = 200;
    this.openTrigger = null;
    this.openSpeed = 300
};
a = ReportBlockForm.prototype;
a.delayedOpen = function () {
    var b = this;
    if (!this.openTrigger) this.openTrigger = setTimeout(function () {
            b.open();
            b.openTrigger = null
        }, b.openSpeed)
};
a.cancelOpen = function () {
    if (this.openTrigger) {
        clearTimeout(this.openTrigger);
        this.openTrigger = null
    }
};
a.toggle = function () {
    var b = $(".ProfileHeader"),
        c = $(".report-user"),
        e = c.height(),
        f = $("body"),
        g = this;
    if (this.displayed) {
        b.css("height", this.originalHeight);
        b.css("margin-bottom", 0);
        c.hide();
        this.displayed = false;
        f.off("touchstart")
    } else {
        b.css("height", this.originalHeight + e);
        b.css("margin-bottom", -e);
        c.show();
        this.displayed = true;
        f.on("touchstart", function () {
            g.close()
        })
    }
};
a.open = function () {
    this.displayed || this.toggle()
};
a.close = function () {
    this.displayed && this.toggle()
};
var UserBlockReport = function () {
    return {
        reportBlockForm: new ReportBlockForm,
        userAgent: navigator ? navigator.userAgent : "",
        listeners: function () {
            var b = this;
            $(".blockuserbutton").click(function () {
                trackGAEvent("block_user", "clicked");
                b.blockUser($(this));
                return false
            });
            $(".unblockuserbutton").click(function () {
                trackGAEvent("unblock_user", "clicked");
                b.unblockUser($(this));
                return false
            });
            $(".report-user .report-type li").click(function () {
                b.reportUser($(this));
                return false
            });
            this.attachHovers();
            this.attachCloseListeners();
            this.handleDeepLink()
        },
        attachHovers: function () {
            var b = this,
                c = $(".report-block-action");
            if (this.userAgent.match(/ip/i) || this.userAgent.match(/android/i)) c.on("touchstart", function (e) {
                    b.reportBlockForm.open();
                    e.stopPropagation()
                });
            else {
                c.on("mouseenter.blocking", function (e) {
                    b.reportBlockForm.delayedOpen();
                    e.stopPropagation()
                });
                c.on("mouseleave.blocking", function (e) {
                    b.reportBlockForm.cancelOpen();
                    b.reportBlockForm.close();
                    e.stopPropagation()
                })
            }
        },
        attachCloseListeners: function () {
            var b = $(".report-user");
            b.click(function (c) {
                c.stopPropagation()
            });
            b.mouseover(function (c) {
                c.stopPropagation()
            })
        },
        handleDeepLink: function () {
            var b = $("#report_action_spam"),
                c = $(".report-block-action:first").attr("authed") === "True",
                e = window.location.search.substring(1).split("&"),
                f = {};
            if (e.length) {
                for (var g = 0; g < e.length; g++) {
                    var d = e[g].split("=");
                    f[unescape(d[0])] = unescape(d[1])
                }
                if (f.report_user_spam) c ? this.reportUser(b) : this.reportUser(b, f)
            }
        },
        reportUser: function (b, c) {
            var e = $(".report-block-action"),
                f = $("a", b),
                g = f.attr("report_type"),
                d = f.attr("user_id"),
                h = b.parents(".report-type", e),
                j = $(".unreported", e),
                k = $(".reported", e);
            b = $(".ReportConfirmationMessage:first", e).html();
            var l = $(".ReportHeader:first", e).html(),
                r = $(".ReportOk:first", e).html(),
                u = $(".ReportOk2:first", e).html();
            e = $(".ReportCancel:first", e).html();
            var o = {};
            o.header = l;
            o.okText = r;
            o.okText2 = u;
            o.cancelText = e;
            o.successFn = function (m) {
                var s = m ? f.attr("href") : f.attr("report_block_url"),
                    v = {
                        user_id: d,
                        report_type: g
                    };
                if (c) for (var x in c) if (_.has(c, x)) v[x] = c[x];
                $.ajax({
                    url: s,
                    type: "POST",
                    dataType: "json",
                    data: v,
                    error: function () {},
                    success: function (A) {
                        if (A.status === "failure") {
                            ShowError(A.message);
                            return false
                        }
                        A = A.next_url;
                        var D = window.location.protocol + "//" + window.location.host + window.location.pathname;
                        trackGAEvent("report_user", "success");
                        if (A) document.location = A;
                        else if (!m) document.location = D
                    }
                });
                j.hide();
                k.show();
                h.hide(100)
            };
            ShowConfirmation(b, o);
            return false
        },
        blockUser: function (b) {
            var c = $(".report-block-action"),
                e = $(".BlockConfirmationMessage:first", c).html(),
                f = $(".BlockHeader:first",
                    c).html(),
                g = $(".BlockOk:first", c).html();
            c = $(".BlockCancel:first", c).html();
            var d = {};
            d.header = f;
            d.okText = g;
            d.cancelText = c;
            d.successFn = function () {
                var h = b.attr("data-text-unblock");
                b.text(h).removeClass("clickable blockuserbutton").attr("disabled", "disabled");
                h = b.attr("user_id");
                $.ajax({
                    url: b.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        user_id: h
                    },
                    error: function () {},
                    success: function (j) {
                        if (j.status === "failure") {
                            ShowError(j.message);
                            return false
                        }
                        trackGAEvent("block_user", "success");
                        b.removeAttr("disabled").addClass("clickable");
                        document.location = window.location.protocol + "//" + window.location.host + window.location.pathname
                    }
                })
            };
            ShowConfirmation(e, d);
            return false
        },
        unblockUser: function (b) {
            var c = b.attr("data-text-unblocking");
            b.attr("type");
            b.text(c);
            c = b.attr("user_id");
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    user_id: c
                },
                error: function () {},
                success: function (e) {
                    if (e.status === "failure") {
                        ShowError(e.message);
                        return false
                    } else document.location = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    trackGAEvent("unblock_user", "success");
                    b.removeAttr("disabled").addClass("clickable")
                }
            })
        }
    }
}();
$("#collab_invitation_holder .Button").live("click", function () {
    var b = $(this),
        c = b.attr("href"),
        e = c.indexOf("collaborator/accept/") != -1,
        f = b.parents(".invite");
    $.ajax({
        url: c,
        dataType: "json",
        type: "post",
        success: function (g) {
            if (g && g.status == "success") if (e) {
                    var d = g.board_name,
                        h = g.board_id;
                    g = g.is_private ? '<li data="' + h + '"><span>' + d + '</span><span class="Icon First CollaborativeBoard"></span><span class="Icon Second PrivateBoard" id="private-' + h + '" private="1"></span></li>' : '<li data="' + h + '"><span>' + d + '</span><span class="Icon First CollaborativeBoard"></span></li>';
                    $(".BoardPicker .BoardListUl").prepend(g);
                    var j = f.attr("id").split("_boardid_")[1],
                        k = $("#collab_invited_boardid_" + j);
                    f.fadeOut(500, function () {
                        f.remove();
                        k.removeClass("hidden");
                        var u = $("#collab_invitation_holder");
                        if (u.find(".collab_individual_invitation").length > 1) k.delay(5E3).fadeOut(500, function () {
                                if (u.find(".collab_individual_invitation").length <= 1) {
                                    var m = $(".news_locator");
                                    m.find(".section").length > 1 ? u.remove() : m.remove()
                                } else $("#collab_individual_invitation_boardid_" + j).remove();
                                FindNextHiddenDivAndShow();
                                BoardLayout.flowFirstColumn()
                            });
                        else {
                            var o = $(".news_locator");
                            o.find(".section").length > 1 ? u.delay(5E3).fadeOut(500, function () {
                                $(this).remove();
                                BoardLayout.flowFirstColumn()
                            }) : o.delay(5E3).fadeOut(500, function () {
                                o.remove();
                                BoardLayout.flowFirstColumn()
                            })
                        }
                    })
                } else {
                    j = f.attr("id").split("_boardid_")[1];
                    var l = $("#collab_invitation_holder");
                    if (l.find(".collab_individual_invitation").length > 1) f.fadeOut(500, function () {
                            if (l.find(".collab_individual_invitation").length <= 1) {
                                var u = $(".news_locator");
                                u.find(".section").length >
                                    1 ? l.remove() : u.remove()
                            } else {
                                $("#collab_individual_invitation_boardid_" + j).fadeOut(500).remove();
                                FindNextHiddenDivAndShow()
                            }
                            BoardLayout.flowFirstColumn()
                        });
                    else {
                        var r = $(".news_locator");
                        r.find(".section").length > 1 ? l.fadeOut(500, function () {
                            $(this).remove();
                            BoardLayout.flowFirstColumn()
                        }) : r.fadeOut(500, function () {
                            r.remove();
                            BoardLayout.flowFirstColumn()
                        })
                    }
                } else g && g.status == "failure" ? alert(g.message) : alert("There was an error. Try again.")
        },
        error: function () {
            alert("There was an error. Try again.")
        }
    });
    return false
});

function FindNextHiddenDivAndShow() {
    var b = $("#collab_invitation_holder"),
        c = b.find(".collab_individual_invitation.hidden");
    if (c.length > 0) {
        first = b.find(c[0]);
        first.removeClass("hidden")
    }
};
$(".notification.boardInvite .buttons .Button").live("click", function () {
    var b = $(this),
        c = b.attr("href"),
        e = c.indexOf("collaborator/accept/") != -1,
        f = b.parents(".notification");
    $.ajax({
        url: c,
        dataType: "json",
        type: "post",
        success: function (g) {
            if (g && g.status == "success") if (e) {
                    f.addClass("inviteAccepted");
                    BoardLayout.allPins()
                } else f.fadeOut({
                        complete: function () {
                            f.remove();
                            BoardLayout.allPins()
                        }
                    });
                else g && g.status == "failure" ? ShowError(g.message) : ShowError("There was an error. Try again.")
        },
        error: function () {
            ShowError("There was an error. Try again.")
        }
    });
    return false
});
$(".notification .dismissButton").live("click", function () {
    var b = $(this),
        c = $(b).parents(".pinBoard"),
        e = b.attr("href"),
        f = c.attr("data-object-id"),
        g = c.attr("data-notification-type");
    b = $(".BoardDismissHeader").text();
    var d = $(".BoardDismissConfirmationMessage").text(),
        h = $(".BoardDismissOk").text(),
        j = $(".BoardDismissCancel").text();
    ShowConfirmation(d, {
        header: b,
        okText: h,
        cancelText: j,
        successFn: function () {
            $.ajax({
                url: e,
                dataType: "json",
                data: {
                    object_id: f,
                    notification_type: g
                },
                type: "POST",
                error: function () {
                    ShowError("There was an error. Try again.")
                },
                success: function (k) {
                    if (k.status ===
                        "failure") {
                        ShowError(k.message);
                        return false
                    }
                    trackGAEvent("block_user", "success");
                    c.fadeOut({
                        complete: function () {
                            c.remove();
                            BoardLayout.allPins()
                        }
                    })
                }
            })
        }
    });
    return false
});