/*! Click With Me Now
 * @author Click With Me Now, Inc. <info@clickwithmenow.com>
 * @version 2.3.2
 * @license Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file cannot be copied and/or distributed without express written consent from @author.
 * @builddate 2014/09/25
 */
! function(window, document, undefined) {
    "use strict";

    function toPX(element, attribute, value) {
        var left, rsLeft = element.runtimeStyle && element.runtimeStyle[attribute],
            style = element.style;
        return !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(value) && /^-?\d/.test(value) && (left = style.left, rsLeft && (element.runtimeStyle.left = element.currentStyle.left), style.left = "fontSize" === attribute ? "1em" : value || 0, value = style.pixelLeft + "px", style.left = left, rsLeft && (element.runtimeStyle.left = rsLeft)), /^(thin|medium|thick)$/i.test(value) ? value : Math.round(parseFloat(value)) + "px"
    }

    function asInt(val) {
        return parseInt(val, 10)
    }

    function isPercentage(value) {
        return -1 !== value.toString().indexOf("%")
    }

    function parseBackgroundSizePosition(value, element, attribute, index) {
        if (value = (value || "").split(","), value = value[index || 0] || value[0] || "auto", value = _html2canvas.Util.trimText(value).split(" "), "backgroundSize" === attribute && value[0] && value[0].match(/^(cover|contain|auto)$/)) return value;
        if (value[0] = -1 === value[0].indexOf("%") ? toPX(element, attribute + "X", value[0]) : value[0], value[1] === undefined) {
            if ("backgroundSize" === attribute) return value[1] = "auto", value;
            value[1] = value[0]
        }
        return value[1] = -1 === value[1].indexOf("%") ? toPX(element, attribute + "Y", value[1]) : value[1], value
    }

    function h2cRenderContext(width, height) {
        var storage = [];
        return {
            storage: storage,
            width: width,
            height: height,
            clip: function() {
                storage.push({
                    type: "function",
                    name: "clip",
                    arguments: arguments
                })
            },
            translate: function() {
                storage.push({
                    type: "function",
                    name: "translate",
                    arguments: arguments
                })
            },
            fill: function() {
                storage.push({
                    type: "function",
                    name: "fill",
                    arguments: arguments
                })
            },
            save: function() {
                storage.push({
                    type: "function",
                    name: "save",
                    arguments: arguments
                })
            },
            restore: function() {
                storage.push({
                    type: "function",
                    name: "restore",
                    arguments: arguments
                })
            },
            fillRect: function() {
                storage.push({
                    type: "function",
                    name: "fillRect",
                    arguments: arguments
                })
            },
            createPattern: function() {
                storage.push({
                    type: "function",
                    name: "createPattern",
                    arguments: arguments
                })
            },
            drawShape: function() {
                var shape = [];
                return storage.push({
                    type: "function",
                    name: "drawShape",
                    arguments: shape
                }), {
                    moveTo: function() {
                        shape.push({
                            name: "moveTo",
                            arguments: arguments
                        })
                    },
                    lineTo: function() {
                        shape.push({
                            name: "lineTo",
                            arguments: arguments
                        })
                    },
                    arcTo: function() {
                        shape.push({
                            name: "arcTo",
                            arguments: arguments
                        })
                    },
                    bezierCurveTo: function() {
                        shape.push({
                            name: "bezierCurveTo",
                            arguments: arguments
                        })
                    },
                    quadraticCurveTo: function() {
                        shape.push({
                            name: "quadraticCurveTo",
                            arguments: arguments
                        })
                    }
                }
            },
            drawImage: function() {
                storage.push({
                    type: "function",
                    name: "drawImage",
                    arguments: arguments
                })
            },
            fillText: function() {
                storage.push({
                    type: "function",
                    name: "fillText",
                    arguments: arguments
                })
            },
            setVariable: function(variable, value) {
                return storage.push({
                    type: "variable",
                    name: variable,
                    arguments: value
                }), value
            }
        }
    }
    var previousElement, computedCSS, _html2canvas = {};
    _html2canvas.Util = {}, _html2canvas.Util.log = function(a) {
            _html2canvas.logging && window.console && window.console.log && window.console.log(a)
        }, _html2canvas.Util.trimText = function(isNative) {
            return function(input) {
                return isNative ? isNative.apply(input) : ((input || "") + "").replace(/^\s+|\s+$/g, "")
            }
        }(String.prototype.trim), _html2canvas.Util.asFloat = function(v) {
            return parseFloat(v)
        },
        function() {
            var TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,
                TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
            _html2canvas.Util.parseTextShadows = function(value) {
                if (!value || "none" === value) return [];
                for (var shadows = value.match(TEXT_SHADOW_PROPERTY), results = [], i = 0; shadows && i < shadows.length; i++) {
                    var s = shadows[i].match(TEXT_SHADOW_VALUES);
                    results.push({
                        color: s[0],
                        offsetX: s[1] ? s[1].replace("px", "") : 0,
                        offsetY: s[2] ? s[2].replace("px", "") : 0,
                        blur: s[3] ? s[3].replace("px", "") : 0
                    })
                }
                return results
            }
        }(), _html2canvas.Util.parseBackgroundImage = function(value) {
            var method, definition, prefix, prefix_i, block, c, quote, args, whitespace = " \r\n	",
                results = [],
                mode = 0,
                numParen = 0,
                appendResult = function() {
                    method && ('"' === definition.substr(0, 1) && (definition = definition.substr(1, definition.length - 2)), definition && args.push(definition), "-" === method.substr(0, 1) && (prefix_i = method.indexOf("-", 1) + 1) > 0 && (prefix = method.substr(0, prefix_i), method = method.substr(prefix_i)), results.push({
                        prefix: prefix,
                        method: method.toLowerCase(),
                        value: block,
                        args: args
                    })), args = [], method = prefix = definition = block = ""
                };
            appendResult();
            for (var i = 0, ii = value.length; ii > i; i++)
                if (c = value[i], !(0 === mode && whitespace.indexOf(c) > -1)) {
                    switch (c) {
                        case '"':
                            quote ? quote === c && (quote = null) : quote = c;
                            break;
                        case "(":
                            if (quote) break;
                            if (0 === mode) {
                                mode = 1, block += c;
                                continue
                            }
                            numParen++;
                            break;
                        case ")":
                            if (quote) break;
                            if (1 === mode) {
                                if (0 === numParen) {
                                    mode = 0, block += c, appendResult();
                                    continue
                                }
                                numParen--
                            }
                            break;
                        case ",":
                            if (quote) break;
                            if (0 === mode) {
                                appendResult();
                                continue
                            }
                            if (1 === mode && 0 === numParen && !method.match(/^url$/i)) {
                                args.push(definition), definition = "", block += c;
                                continue
                            }
                    }
                    block += c, 0 === mode ? method += c : definition += c
                }
            return appendResult(), results
        }, _html2canvas.Util.Bounds = function(element) {
            var clientRect, bounds = {};
            return element.getBoundingClientRect && (clientRect = element.getBoundingClientRect(), bounds.top = clientRect.top, bounds.bottom = clientRect.bottom || clientRect.top + clientRect.height, bounds.left = clientRect.left, bounds.width = element.offsetWidth, bounds.height = element.offsetHeight), bounds
        }, _html2canvas.Util.OffsetBounds = function(element) {
            var parent = element.offsetParent ? _html2canvas.Util.OffsetBounds(element.offsetParent) : {
                top: 0,
                left: 0
            };
            return {
                top: element.offsetTop + parent.top,
                bottom: element.offsetTop + element.offsetHeight + parent.top,
                left: element.offsetLeft + parent.left,
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }, _html2canvas.Util.getCSS = function(element, attribute, index) {
            previousElement !== element && (computedCSS = document.defaultView.getComputedStyle(element, null));
            var value = computedCSS[attribute];
            if (/^background(Size|Position)$/.test(attribute)) return parseBackgroundSizePosition(value, element, attribute, index);
            if (/border(Top|Bottom)(Left|Right)Radius/.test(attribute)) {
                var arr = value.split(" ");
                return arr.length <= 1 && (arr[1] = arr[0]), arr.map(asInt)
            }
            return value
        }, _html2canvas.Util.resizeBounds = function(current_width, current_height, target_width, target_height, stretch_mode) {
            var output_width, output_height, target_ratio = target_width / target_height,
                current_ratio = current_width / current_height;
            return stretch_mode && "auto" !== stretch_mode ? current_ratio > target_ratio ^ "contain" === stretch_mode ? (output_height = target_height, output_width = target_height * current_ratio) : (output_width = target_width, output_height = target_width / current_ratio) : (output_width = target_width, output_height = target_height), {
                width: output_width,
                height: output_height
            }
        }, _html2canvas.Util.BackgroundPosition = function(element, bounds, image, imageIndex, backgroundSize) {
            var leftPosition, topPosition, backgroundPosition = _html2canvas.Util.getCSS(element, "backgroundPosition", imageIndex);
            return 1 === backgroundPosition.length && (backgroundPosition = [backgroundPosition[0], backgroundPosition[0]]), leftPosition = isPercentage(backgroundPosition[0]) ? (bounds.width - (backgroundSize || image).width) * (parseFloat(backgroundPosition[0]) / 100) : parseInt(backgroundPosition[0], 10), topPosition = "auto" === backgroundPosition[1] ? leftPosition / image.width * image.height : isPercentage(backgroundPosition[1]) ? (bounds.height - (backgroundSize || image).height) * parseFloat(backgroundPosition[1]) / 100 : parseInt(backgroundPosition[1], 10), "auto" === backgroundPosition[0] && (leftPosition = topPosition / image.height * image.width), {
                left: leftPosition,
                top: topPosition
            }
        }, _html2canvas.Util.BackgroundSize = function(element, bounds, image, imageIndex) {
            var width, height, backgroundSize = _html2canvas.Util.getCSS(element, "backgroundSize", imageIndex);
            if (1 === backgroundSize.length && (backgroundSize = [backgroundSize[0], backgroundSize[0]]), isPercentage(backgroundSize[0])) width = bounds.width * parseFloat(backgroundSize[0]) / 100;
            else {
                if (/contain|cover/.test(backgroundSize[0])) return _html2canvas.Util.resizeBounds(image.width, image.height, bounds.width, bounds.height, backgroundSize[0]);
                width = parseInt(backgroundSize[0], 10)
            }
            return height = "auto" === backgroundSize[0] && "auto" === backgroundSize[1] ? image.height : "auto" === backgroundSize[1] ? width / image.width * image.height : isPercentage(backgroundSize[1]) ? bounds.height * parseFloat(backgroundSize[1]) / 100 : parseInt(backgroundSize[1], 10), "auto" === backgroundSize[0] && (width = height / image.height * image.width), {
                width: width,
                height: height
            }
        }, _html2canvas.Util.BackgroundRepeat = function(element, imageIndex) {
            var backgroundRepeat = _html2canvas.Util.getCSS(element, "backgroundRepeat").split(",").map(_html2canvas.Util.trimText);
            return backgroundRepeat[imageIndex] || backgroundRepeat[0]
        }, _html2canvas.Util.Extend = function(options, defaults) {
            for (var key in options) options.hasOwnProperty(key) && (defaults[key] = options[key]);
            return defaults
        }, _html2canvas.Util.Children = function(elem) {
            var children;
            try {
                children = elem.nodeName && "IFRAME" === elem.nodeName.toUpperCase() ? elem.contentDocument || elem.contentWindow.document : function(array) {
                    var ret = [];
                    return null !== array && ! function(first, second) {
                        var i = first.length,
                            j = 0;
                        if ("number" == typeof second.length)
                            for (var l = second.length; l > j; j++) first[i++] = second[j];
                        else
                            for (; second[j] !== undefined;) first[i++] = second[j++];
                        return first.length = i, first
                    }(ret, array), ret
                }(elem.childNodes)
            } catch (ex) {
                _html2canvas.Util.log("html2canvas.Util.Children failed with exception: " + ex.message), children = []
            }
            return children
        }, _html2canvas.Util.isTransparent = function(backgroundColor) {
            return !backgroundColor || "transparent" === backgroundColor || "rgba(0, 0, 0, 0)" === backgroundColor
        }, _html2canvas.Util.Font = function() {
            var fontData = {};
            return function(font, fontSize, doc) {
                if (fontData[font + "-" + fontSize] !== undefined) return fontData[font + "-" + fontSize];
                var baseline, middle, metricsObj, container = doc.createElement("div"),
                    img = doc.createElement("img"),
                    span = doc.createElement("span"),
                    sampleText = "Hidden Text";
                return container.style.visibility = "hidden", container.style.fontFamily = font, container.style.fontSize = fontSize, container.style.margin = 0, container.style.padding = 0, doc.body.appendChild(container), img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=", img.width = 1, img.height = 1, img.style.margin = 0, img.style.padding = 0, img.style.verticalAlign = "baseline", span.style.fontFamily = font, span.style.fontSize = fontSize, span.style.margin = 0, span.style.padding = 0, span.appendChild(doc.createTextNode(sampleText)), container.appendChild(span), container.appendChild(img), baseline = img.offsetTop - span.offsetTop + 1, container.removeChild(span), container.appendChild(doc.createTextNode(sampleText)), container.style.lineHeight = "normal", img.style.verticalAlign = "super", middle = img.offsetTop - container.offsetTop + 1, metricsObj = {
                    baseline: baseline,
                    lineWidth: 1,
                    middle: middle
                }, fontData[font + "-" + fontSize] = metricsObj, doc.body.removeChild(container), metricsObj
            }
        }(),
        function() {
            function addScrollStops(grad) {
                return function(colorStop) {
                    try {
                        grad.addColorStop(colorStop.stop, colorStop.color)
                    } catch (e) {
                        Util.log(["failed to add color stop: ", e, "; tried to add: ", colorStop])
                    }
                }
            }
            var Util = _html2canvas.Util,
                Generate = {};
            _html2canvas.Generate = Generate;
            var reGradients = [/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/, /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];
            Generate.parseGradient = function(css, bounds) {
                var gradient, i, m1, stop, m2, m2Len, step, m3, tl, tr, br, bl, len = reGradients.length;
                for (i = 0; len > i && !(m1 = css.match(reGradients[i])); i += 1);
                if (m1) switch (m1[1]) {
                    case "-webkit-linear-gradient":
                    case "-o-linear-gradient":
                        if (gradient = {
                            type: "linear",
                            x0: null,
                            y0: null,
                            x1: null,
                            y1: null,
                            colorStops: []
                        }, m2 = m1[2].match(/\w+/g))
                            for (m2Len = m2.length, i = 0; m2Len > i; i += 1) switch (m2[i]) {
                                case "top":
                                    gradient.y0 = 0, gradient.y1 = bounds.height;
                                    break;
                                case "right":
                                    gradient.x0 = bounds.width, gradient.x1 = 0;
                                    break;
                                case "bottom":
                                    gradient.y0 = bounds.height, gradient.y1 = 0;
                                    break;
                                case "left":
                                    gradient.x0 = 0, gradient.x1 = bounds.width
                            }
                        if (null === gradient.x0 && null === gradient.x1 && (gradient.x0 = gradient.x1 = bounds.width / 2), null === gradient.y0 && null === gradient.y1 && (gradient.y0 = gradient.y1 = bounds.height / 2), m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))
                            for (m2Len = m2.length, step = 1 / Math.max(m2Len - 1, 1), i = 0; m2Len > i; i += 1) m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/), m3[2] ? (stop = parseFloat(m3[2]), stop /= "%" === m3[3] ? 100 : bounds.width) : stop = i * step, gradient.colorStops.push({
                                color: m3[1],
                                stop: stop
                            });
                        break;
                    case "-webkit-gradient":
                        if (gradient = {
                            type: "radial" === m1[2] ? "circle" : m1[2],
                            x0: 0,
                            y0: 0,
                            x1: 0,
                            y1: 0,
                            colorStops: []
                        }, m2 = m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/), m2 && (gradient.x0 = m2[1] * bounds.width / 100, gradient.y0 = m2[2] * bounds.height / 100, gradient.x1 = m2[3] * bounds.width / 100, gradient.y1 = m2[4] * bounds.height / 100), m2 = m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g))
                            for (m2Len = m2.length, i = 0; m2Len > i; i += 1) m3 = m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/), stop = parseFloat(m3[2]), "from" === m3[1] && (stop = 0), "to" === m3[1] && (stop = 1), gradient.colorStops.push({
                                color: m3[3],
                                stop: stop
                            });
                        break;
                    case "-moz-linear-gradient":
                        if (gradient = {
                            type: "linear",
                            x0: 0,
                            y0: 0,
                            x1: 0,
                            y1: 0,
                            colorStops: []
                        }, m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/), m2 && (gradient.x0 = m2[1] * bounds.width / 100, gradient.y0 = m2[2] * bounds.height / 100, gradient.x1 = bounds.width - gradient.x0, gradient.y1 = bounds.height - gradient.y0), m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g))
                            for (m2Len = m2.length, step = 1 / Math.max(m2Len - 1, 1), i = 0; m2Len > i; i += 1) m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/), m3[2] ? (stop = parseFloat(m3[2]), m3[3] && (stop /= 100)) : stop = i * step, gradient.colorStops.push({
                                color: m3[1],
                                stop: stop
                            });
                        break;
                    case "-webkit-radial-gradient":
                    case "-moz-radial-gradient":
                    case "-o-radial-gradient":
                        if (gradient = {
                            type: "circle",
                            x0: 0,
                            y0: 0,
                            x1: bounds.width,
                            y1: bounds.height,
                            cx: 0,
                            cy: 0,
                            rx: 0,
                            ry: 0,
                            colorStops: []
                        }, m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/), m2 && (gradient.cx = m2[1] * bounds.width / 100, gradient.cy = m2[2] * bounds.height / 100), m2 = m1[3].match(/\w+/), m3 = m1[4].match(/[a-z\-]*/), m2 && m3) switch (m3[0]) {
                            case "farthest-corner":
                            case "cover":
                            case "":
                                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2)), tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2)), br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2)), bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2)), gradient.rx = gradient.ry = Math.max(tl, tr, br, bl);
                                break;
                            case "closest-corner":
                                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2)), tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2)), br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2)), bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2)), gradient.rx = gradient.ry = Math.min(tl, tr, br, bl);
                                break;
                            case "farthest-side":
                                "circle" === m2[0] ? gradient.rx = gradient.ry = Math.max(gradient.cx, gradient.cy, gradient.x1 - gradient.cx, gradient.y1 - gradient.cy) : (gradient.type = m2[0], gradient.rx = Math.max(gradient.cx, gradient.x1 - gradient.cx), gradient.ry = Math.max(gradient.cy, gradient.y1 - gradient.cy));
                                break;
                            case "closest-side":
                            case "contain":
                                "circle" === m2[0] ? gradient.rx = gradient.ry = Math.min(gradient.cx, gradient.cy, gradient.x1 - gradient.cx, gradient.y1 - gradient.cy) : (gradient.type = m2[0], gradient.rx = Math.min(gradient.cx, gradient.x1 - gradient.cx), gradient.ry = Math.min(gradient.cy, gradient.y1 - gradient.cy))
                        }
                        if (m2 = m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))
                            for (m2Len = m2.length, step = 1 / Math.max(m2Len - 1, 1), i = 0; m2Len > i; i += 1) m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/), m3[2] ? (stop = parseFloat(m3[2]), stop /= "%" === m3[3] ? 100 : bounds.width) : stop = i * step, gradient.colorStops.push({
                                color: m3[1],
                                stop: stop
                            })
                }
                return gradient
            }, Generate.Gradient = function(src, bounds) {
                if (0 !== bounds.width && 0 !== bounds.height) {
                    var gradient, grad, canvas = document.createElement("canvas"),
                        ctx = canvas.getContext("2d");
                    if (canvas.width = bounds.width, canvas.height = bounds.height, gradient = _html2canvas.Generate.parseGradient(src, bounds)) switch (gradient.type) {
                        case "linear":
                            grad = ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1), gradient.colorStops.forEach(addScrollStops(grad)), ctx.fillStyle = grad, ctx.fillRect(0, 0, bounds.width, bounds.height);
                            break;
                        case "circle":
                            grad = ctx.createRadialGradient(gradient.cx, gradient.cy, 0, gradient.cx, gradient.cy, gradient.rx), gradient.colorStops.forEach(addScrollStops(grad)), ctx.fillStyle = grad, ctx.fillRect(0, 0, bounds.width, bounds.height);
                            break;
                        case "ellipse":
                            var canvasRadial = document.createElement("canvas"),
                                ctxRadial = canvasRadial.getContext("2d"),
                                ri = Math.max(gradient.rx, gradient.ry),
                                di = 2 * ri;
                            canvasRadial.width = canvasRadial.height = di, grad = ctxRadial.createRadialGradient(gradient.rx, gradient.ry, 0, gradient.rx, gradient.ry, ri), gradient.colorStops.forEach(addScrollStops(grad)), ctxRadial.fillStyle = grad, ctxRadial.fillRect(0, 0, di, di), ctx.fillStyle = gradient.colorStops[gradient.colorStops.length - 1].color, ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.drawImage(canvasRadial, gradient.cx - gradient.rx, gradient.cy - gradient.ry, 2 * gradient.rx, 2 * gradient.ry)
                    }
                    return canvas
                }
            }, Generate.ListAlpha = function(number) {
                var modulus, tmp = "";
                do modulus = number % 26, tmp = String.fromCharCode(modulus + 64) + tmp, number /= 26; while (26 * number > 26);
                return tmp
            }, Generate.ListRoman = function(number) {
                var v, romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
                    decimal = [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
                    roman = "",
                    len = romanArray.length;
                if (0 >= number || number >= 4e3) return number;
                for (v = 0; len > v; v += 1)
                    for (; number >= decimal[v];) number -= decimal[v], roman += romanArray[v];
                return roman
            }
        }(), _html2canvas.Parse = function(images, options, cb) {
            function init() {
                var background = getCSS(document.documentElement, "backgroundColor"),
                    transparentBackground = Util.isTransparent(background) && element === document.body,
                    stack = renderElement(element, null, !1, transparentBackground);
                addPseudoElements(element), parseChildren(element, stack, function() {
                    transparentBackground && (background = stack.backgroundColor), removePseudoElements(), Util.log("Done parsing, moving to Render."), cb && cb({
                        backgroundColor: background,
                        stack: stack
                    })
                })
            }

            function addPseudoElements(el) {
                function getPseudoElementClasses() {
                    for (var findPsuedoEls = /:before|:after/, sheets = document.styleSheets, i = 0, j = sheets.length; j > i; i++) try {
                        for (var rules = sheets[i].cssRules, k = 0, l = rules.length; l > k; k++) findPsuedoEls.test(rules[k].selectorText) && classes.push(rules[k].selectorText)
                    } catch (e) {}
                    for (i = 0, j = classes.length; j > i; i++) {
                        var class_name = classes[i].match(/(^[^:]*)/)[1].replace(/(\s+[>]\s+$)|([,]\s+$)/, "");
                        "" !== class_name && (classes[i] = class_name)
                    }
                }

                function findPseudoElements() {
                    for (var els = document.querySelectorAll(classes.join(",")), i = 0, j = els.length; j > i; i++) createPseudoElements(els[i])
                }

                function createPseudoElements(el) {
                    var before = getPseudoElement(el, ":before"),
                        after = getPseudoElement(el, ":after");
                    before && jobs.push({
                        type: "before",
                        pseudo: before,
                        el: el
                    }), after && jobs.push({
                        type: "after",
                        pseudo: after,
                        el: el
                    })
                }

                function runJobs() {
                    jobs.forEach(function(job) {
                        addClass(job.el, pseudoHide + "-parent")
                    }), jobs.forEach(function(job) {
                        "before" === job.type ? job.el.insertBefore(job.pseudo, job.el.firstChild) : job.el.appendChild(job.pseudo)
                    })
                }
                var jobs = [],
                    classes = [];
                getPseudoElementClasses(), findPseudoElements(el), runJobs()
            }

            function removePseudoElements() {
                body.removeChild(hidePseudoElementsStyles);
                for (var pseudos = document.getElementsByClassName(pseudoHide + "-element"); pseudos.length;) pseudos[0].parentNode.removeChild(pseudos[0]);
                for (var parents = document.getElementsByClassName(pseudoHide + "-parent"); parents.length;) removeClass(parents[0], pseudoHide + "-parent")
            }

            function addClass(el, className) {
                el.classList ? el.classList.add(className) : el.className = el.className + " " + className
            }

            function removeClass(el, className) {
                el.classList ? el.classList.remove(className) : el.className = el.className.replace(className, "").trim()
            }

            function documentWidth() {
                return Math.max(Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth), Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth), Math.max(doc.body.clientWidth, doc.documentElement.clientWidth))
            }

            function documentHeight() {
                return Math.max(Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight), Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight), Math.max(doc.body.clientHeight, doc.documentElement.clientHeight))
            }

            function getCSSInt(element, attribute) {
                var val = parseInt(getCSS(element, attribute), 10);
                return isNaN(val) ? 0 : val
            }

            function renderRect(ctx, x, y, w, h, bgcolor) {
                "transparent" !== bgcolor && (ctx.setVariable("fillStyle", bgcolor), ctx.fillRect(x, y, w, h), numDraws += 1)
            }

            function capitalize(m, p1, p2) {
                return m.length > 0 ? p1 + p2.toUpperCase() : void 0
            }

            function textTransform(text, transform) {
                switch (transform) {
                    case "lowercase":
                        return text.toLowerCase();
                    case "capitalize":
                        return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
                    case "uppercase":
                        return text.toUpperCase();
                    default:
                        return text
                }
            }

            function noLetterSpacing(letter_spacing) {
                return /^(normal|none|0px)$/.test(letter_spacing)
            }

            function drawText(currentText, x, y, ctx) {
                null !== currentText && Util.trimText(currentText).length > 0 && (ctx.fillText(currentText, x, y), numDraws += 1)
            }

            function setTextVariables(ctx, el, text_decoration, color) {
                var align = !1,
                    bold = getCSS(el, "fontWeight"),
                    family = getCSS(el, "fontFamily"),
                    size = getCSS(el, "fontSize"),
                    shadows = Util.parseTextShadows(getCSS(el, "textShadow"));
                switch (parseInt(bold, 10)) {
                    case 401:
                        bold = "bold";
                        break;
                    case 400:
                        bold = "normal"
                }
                return ctx.setVariable("fillStyle", color), ctx.setVariable("font", [getCSS(el, "fontStyle"), getCSS(el, "fontVariant"), bold, size, family].join(" ")), ctx.setVariable("textAlign", align ? "right" : "left"), shadows.length && (ctx.setVariable("shadowColor", shadows[0].color), ctx.setVariable("shadowOffsetX", shadows[0].offsetX), ctx.setVariable("shadowOffsetY", shadows[0].offsetY), ctx.setVariable("shadowBlur", shadows[0].blur)), "none" !== text_decoration ? Util.Font(family, size, doc) : void 0
            }

            function renderTextDecoration(ctx, text_decoration, bounds, metrics, color) {
                switch (text_decoration) {
                    case "underline":
                        renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
                        break;
                    case "overline":
                        renderRect(ctx, bounds.left, Math.round(bounds.top), bounds.width, 1, color);
                        break;
                    case "line-through":
                        renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color)
                }
            }

            function getTextBounds(state, text, textDecoration, isLast, transform) {
                var bounds;
                if (support.rangeBounds && !transform)("none" !== textDecoration || 0 !== Util.trimText(text).length) && (bounds = textRangeBounds(text, state.node, state.textOffset)), state.textOffset += text.length;
                else if (state.node && "string" == typeof state.node.nodeValue) {
                    var newTextNode = isLast ? state.node.splitText(text.length) : null;
                    bounds = textWrapperBounds(state.node, transform), state.node = newTextNode
                }
                return bounds
            }

            function textRangeBounds(text, textNode, textOffset) {
                var range = doc.createRange();
                return range.setStart(textNode, textOffset), range.setEnd(textNode, textOffset + text.length), range.getBoundingClientRect()
            }

            function textWrapperBounds(oldTextNode, transform) {
                var parent = oldTextNode.parentNode,
                    wrapElement = doc.createElement("wrapper"),
                    backupText = oldTextNode.cloneNode(!0);
                wrapElement.appendChild(oldTextNode.cloneNode(!0)), parent.replaceChild(wrapElement, oldTextNode);
                var bounds = transform ? Util.OffsetBounds(wrapElement) : Util.Bounds(wrapElement);
                return parent.replaceChild(backupText, wrapElement), bounds
            }

            function renderText(el, textNode, stack) {
                var metrics, textList, ctx = stack.ctx,
                    color = getCSS(el, "color"),
                    textDecoration = getCSS(el, "textDecoration"),
                    textAlign = getCSS(el, "textAlign"),
                    state = {
                        node: textNode,
                        textOffset: 0
                    };
                Util.trimText(textNode.nodeValue).length > 0 && (textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform")), textAlign = textAlign.replace(["-webkit-auto"], ["auto"]), textList = textNode.nodeValue.split(!options.letterRendering && /^(left|right|justify|auto)$/.test(textAlign) && noLetterSpacing(getCSS(el, "letterSpacing")) ? /(\b| )/ : ""), metrics = setTextVariables(ctx, el, textDecoration, color), options.chinese && textList.forEach(function(word, index) {
                    /.*[\u4E00-\u9FA5].*$/.test(word) && (word = word.split(""), word.unshift(index, 1), textList.splice.apply(textList, word))
                }), textList.forEach(function(text, index) {
                    var bounds = getTextBounds(state, text, textDecoration, index < textList.length - 1, stack.transform.matrix);
                    bounds && (drawText(text, bounds.left, bounds.bottom, ctx), renderTextDecoration(ctx, textDecoration, bounds, metrics, color))
                }))
            }

            function listPosition(element, val) {
                var originalType, bounds, boundElement = doc.createElement("boundelement");
                return boundElement.style.display = "inline", originalType = element.style.listStyleType, element.style.listStyleType = "none", boundElement.appendChild(doc.createTextNode(val)), element.insertBefore(boundElement, element.firstChild), bounds = Util.Bounds(boundElement), element.removeChild(boundElement), element.style.listStyleType = originalType, bounds
            }

            function elementIndex(el) {
                var i = -1,
                    count = 1,
                    childs = el.parentNode.childNodes;
                if (el.parentNode) {
                    for (; childs[++i] !== el;) 1 === childs[i].nodeType && count++;
                    return count
                }
                return -1
            }

            function listItemText(element, type) {
                var text, currentIndex = elementIndex(element);
                switch (type) {
                    case "decimal":
                        text = currentIndex;
                        break;
                    case "decimal-leading-zero":
                        text = 1 === currentIndex.toString().length ? currentIndex = "0" + currentIndex.toString() : currentIndex.toString();
                        break;
                    case "upper-roman":
                        text = _html2canvas.Generate.ListRoman(currentIndex);
                        break;
                    case "lower-roman":
                        text = _html2canvas.Generate.ListRoman(currentIndex).toLowerCase();
                        break;
                    case "lower-alpha":
                        text = _html2canvas.Generate.ListAlpha(currentIndex).toLowerCase();
                        break;
                    case "upper-alpha":
                        text = _html2canvas.Generate.ListAlpha(currentIndex)
                }
                return text + ". "
            }

            function renderListItem(element, stack, elBounds) {
                var x, text, listBounds, ctx = stack.ctx,
                    type = getCSS(element, "listStyleType");
                if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {
                    if (text = listItemText(element, type), listBounds = listPosition(element, text), setTextVariables(ctx, element, "none", getCSS(element, "color")), "inside" !== getCSS(element, "listStylePosition")) return;
                    ctx.setVariable("textAlign", "left"), x = elBounds.left, drawText(text, x, listBounds.bottom, ctx)
                }
            }

            function loadImage(src) {
                var img = images[src];
                return img && img.succeeded === !0 ? img.img : !1
            }

            function clipBounds(src, dst) {
                var x = Math.max(src.left, dst.left),
                    y = Math.max(src.top, dst.top),
                    x2 = Math.min(src.left + src.width, dst.left + dst.width),
                    y2 = Math.min(src.top + src.height, dst.top + dst.height);
                return {
                    left: x,
                    top: y,
                    width: x2 - x,
                    height: y2 - y
                }
            }

            function setZ(element, stack, parentStack) {
                var newContext, isPositioned = "static" !== stack.cssPosition,
                    zIndex = isPositioned ? getCSS(element, "zIndex") : "auto",
                    opacity = getCSS(element, "opacity"),
                    isFloated = "none" !== getCSS(element, "cssFloat");
                stack.zIndex = newContext = h2czContext(zIndex), newContext.isPositioned = isPositioned, newContext.isFloated = isFloated, newContext.opacity = opacity, newContext.ownStacking = "auto" !== zIndex || 1 > opacity, newContext.depth = parentStack ? parentStack.zIndex.depth + 1 : 0, parentStack && parentStack.zIndex.children.push(stack)
            }

            function h2czContext(zindex) {
                return {
                    depth: 0,
                    zindex: zindex,
                    children: []
                }
            }

            function renderImage(ctx, element, image, bounds, borders) {
                var paddingLeft = getCSSInt(element, "paddingLeft"),
                    paddingTop = getCSSInt(element, "paddingTop"),
                    paddingRight = getCSSInt(element, "paddingRight"),
                    paddingBottom = getCSSInt(element, "paddingBottom");
                drawImage(ctx, image, 0, 0, image.width, image.height, bounds.left + paddingLeft + borders[3].width, bounds.top + paddingTop + borders[0].width, bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom))
            }

            function getBorderData(element) {
                return ["Top", "Right", "Bottom", "Left"].map(function(side) {
                    return {
                        width: getCSSInt(element, "border" + side + "Width"),
                        color: getCSS(element, "border" + side + "Color")
                    }
                })
            }

            function getBorderRadiusData(element) {
                return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
                    return getCSS(element, "border" + side + "Radius")
                })
            }

            function getCurvePoints(x, y, r1, r2) {
                var kappa = 4 * ((Math.sqrt(2) - 1) / 3),
                    ox = r1 * kappa,
                    oy = r2 * kappa,
                    xm = x + r1,
                    ym = y + r2;
                return {
                    topLeft: bezierCurve({
                        x: x,
                        y: ym
                    }, {
                        x: x,
                        y: ym - oy
                    }, {
                        x: xm - ox,
                        y: y
                    }, {
                        x: xm,
                        y: y
                    }),
                    topRight: bezierCurve({
                        x: x,
                        y: y
                    }, {
                        x: x + ox,
                        y: y
                    }, {
                        x: xm,
                        y: ym - oy
                    }, {
                        x: xm,
                        y: ym
                    }),
                    bottomRight: bezierCurve({
                        x: xm,
                        y: y
                    }, {
                        x: xm,
                        y: y + oy
                    }, {
                        x: x + ox,
                        y: ym
                    }, {
                        x: x,
                        y: ym
                    }),
                    bottomLeft: bezierCurve({
                        x: xm,
                        y: ym
                    }, {
                        x: xm - ox,
                        y: ym
                    }, {
                        x: x,
                        y: y + oy
                    }, {
                        x: x,
                        y: y
                    })
                }
            }

            function bezierCurve(start, startControl, endControl, end) {
                var lerp = function(a, b, t) {
                    return {
                        x: a.x + (b.x - a.x) * t,
                        y: a.y + (b.y - a.y) * t
                    }
                };
                return {
                    start: start,
                    startControl: startControl,
                    endControl: endControl,
                    end: end,
                    subdivide: function(t) {
                        var ab = lerp(start, startControl, t),
                            bc = lerp(startControl, endControl, t),
                            cd = lerp(endControl, end, t),
                            abbc = lerp(ab, bc, t),
                            bccd = lerp(bc, cd, t),
                            dest = lerp(abbc, bccd, t);
                        return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)]
                    },
                    curveTo: function(borderArgs) {
                        borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y])
                    },
                    curveToReversed: function(borderArgs) {
                        borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y])
                    }
                }
            }

            function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
                radius1[0] > 0 || radius1[1] > 0 ? (borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]), corner1[0].curveTo(borderArgs), corner1[1].curveTo(borderArgs)) : borderArgs.push(["line", x, y]), (radius2[0] > 0 || radius2[1] > 0) && borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y])
            }

            function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
                var borderArgs = [];
                return radius1[0] > 0 || radius1[1] > 0 ? (borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]), outer1[1].curveTo(borderArgs)) : borderArgs.push(["line", borderData.c1[0], borderData.c1[1]]), radius2[0] > 0 || radius2[1] > 0 ? (borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]), outer2[0].curveTo(borderArgs), borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]), inner2[0].curveToReversed(borderArgs)) : (borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]), borderArgs.push(["line", borderData.c3[0], borderData.c3[1]])), radius1[0] > 0 || radius1[1] > 0 ? (borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]), inner1[1].curveToReversed(borderArgs)) : borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]), borderArgs
            }

            function calculateCurvePoints(bounds, borderRadius, borders) {
                var x = bounds.left,
                    y = bounds.top,
                    width = bounds.width,
                    height = bounds.height,
                    tlh = borderRadius[0][0],
                    tlv = borderRadius[0][1],
                    trh = borderRadius[1][0],
                    trv = borderRadius[1][1],
                    brh = borderRadius[2][0],
                    brv = borderRadius[2][1],
                    blh = borderRadius[3][0],
                    blv = borderRadius[3][1],
                    halfHeight = Math.floor(height / 2);
                tlh = tlh > halfHeight ? halfHeight : tlh, tlv = tlv > halfHeight ? halfHeight : tlv, trh = trh > halfHeight ? halfHeight : trh, trv = trv > halfHeight ? halfHeight : trv, brh = brh > halfHeight ? halfHeight : brh, brv = brv > halfHeight ? halfHeight : brv, blh = blh > halfHeight ? halfHeight : blh, blv = blv > halfHeight ? halfHeight : blv;
                var topWidth = width - trh,
                    rightHeight = height - brv,
                    bottomWidth = width - brh,
                    leftHeight = height - blv;
                return {
                    topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(.5),
                    topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(.5),
                    topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(.5),
                    topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, topWidth > width + borders[3].width ? 0 : trh - borders[3].width, trv - borders[0].width).topRight.subdivide(.5),
                    bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(.5),
                    bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width + borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width), Math.max(0, brv - borders[2].width)).bottomRight.subdivide(.5),
                    bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(.5),
                    bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), Math.max(0, blv - borders[2].width)).bottomLeft.subdivide(.5)
                }
            }

            function getBorderClip(element, borderPoints, borders, radius, bounds) {
                var backgroundClip = getCSS(element, "backgroundClip"),
                    borderArgs = [];
                switch (backgroundClip) {
                    case "content-box":
                    case "padding-box":
                        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width), parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width), parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width), parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
                        break;
                    default:
                        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top), parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top), parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height), parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height)
                }
                return borderArgs
            }

            function parseBorders(element, bounds, borders) {
                var borderSide, bx, by, bw, bh, borderArgs, x = bounds.left,
                    y = bounds.top,
                    width = bounds.width,
                    height = bounds.height,
                    borderRadius = getBorderRadiusData(element),
                    borderPoints = calculateCurvePoints(bounds, borderRadius, borders),
                    borderData = {
                        clip: getBorderClip(element, borderPoints, borders, borderRadius, bounds),
                        borders: []
                    };
                for (borderSide = 0; 4 > borderSide; borderSide++)
                    if (borders[borderSide].width > 0) {
                        switch (bx = x, by = y, bw = width, bh = height - borders[2].width, borderSide) {
                            case 0:
                                bh = borders[0].width, borderArgs = drawSide({
                                    c1: [bx, by],
                                    c2: [bx + bw, by],
                                    c3: [bx + bw - borders[1].width, by + bh],
                                    c4: [bx + borders[3].width, by + bh]
                                }, borderRadius[0], borderRadius[1], borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                                break;
                            case 1:
                                bx = x + width - borders[1].width, bw = borders[1].width, borderArgs = drawSide({
                                    c1: [bx + bw, by],
                                    c2: [bx + bw, by + bh + borders[2].width],
                                    c3: [bx, by + bh],
                                    c4: [bx, by + borders[0].width]
                                }, borderRadius[1], borderRadius[2], borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                                break;
                            case 2:
                                by = by + height - borders[2].width, bh = borders[2].width, borderArgs = drawSide({
                                    c1: [bx + bw, by + bh],
                                    c2: [bx, by + bh],
                                    c3: [bx + borders[3].width, by],
                                    c4: [bx + bw - borders[3].width, by]
                                }, borderRadius[2], borderRadius[3], borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                                break;
                            case 3:
                                bw = borders[3].width, borderArgs = drawSide({
                                    c1: [bx, by + bh + borders[2].width],
                                    c2: [bx, by],
                                    c3: [bx + bw, by + borders[0].width],
                                    c4: [bx + bw, by + bh]
                                }, borderRadius[3], borderRadius[0], borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner)
                        }
                        borderData.borders.push({
                            args: borderArgs,
                            color: borders[borderSide].color
                        })
                    }
                return borderData
            }

            function createShape(ctx, args) {
                var shape = ctx.drawShape();
                return args.forEach(function(border, index) {
                    shape[0 === index ? "moveTo" : border[0] + "To"].apply(null, border.slice(1))
                }), shape
            }

            function renderBorders(ctx, borderArgs, color) {
                "transparent" !== color && (ctx.setVariable("fillStyle", color), createShape(ctx, borderArgs), ctx.fill(), numDraws += 1)
            }

            function renderFormValue(el, bounds, stack) {
                var textValue, textNode, valueWrap = doc.createElement("valuewrap"),
                    cssPropertyArray = ["lineHeight", "textAlign", "fontFamily", "color", "fontSize", "paddingLeft", "paddingTop", "width", "height", "border", "borderLeftWidth", "borderTopWidth"];
                cssPropertyArray.forEach(function(property) {
                    try {
                        valueWrap.style[property] = getCSS(el, property)
                    } catch (e) {
                        Util.log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message)
                    }
                }), valueWrap.style.borderColor = "black", valueWrap.style.borderStyle = "solid", valueWrap.style.display = "block", valueWrap.style.position = "absolute", (/^(submit|reset|button|text|password)$/.test(el.type) || "SELECT" === el.nodeName) && (valueWrap.style.lineHeight = getCSS(el, "height"), valueWrap.style.paddingTop = 0, valueWrap.style.paddingBottom = 0, valueWrap.style.margin = 0);
                var offset_x = window.pageXOffset || document.body.scrollLeft,
                    offset_y = window.pageYOffset || document.body.scrollTop;
                if (valueWrap.style.top = bounds.top + offset_y + "px", valueWrap.style.left = bounds.left + offset_x + "px", textValue = "SELECT" === el.nodeName ? (el.options[el.selectedIndex] || 0).text : el.value, "password" === el.type && "" != el.value) {
                    for (var passwordMask = "", i = 0; i < textValue.length; i++) passwordMask += "•";
                    textValue = passwordMask
                }
                textValue || (textValue = el.placeholder), textNode = doc.createTextNode(textValue), valueWrap.appendChild(textNode), body.appendChild(valueWrap), renderText(el, textNode, stack), body.removeChild(valueWrap)
            }

            function drawImage(ctx) {
                ctx.drawImage.apply(ctx, Array.prototype.slice.call(arguments, 1)), numDraws += 1
            }

            function getPseudoElement(el, which) {
                var elStyle = window.getComputedStyle(el, which),
                    parentStyle = window.getComputedStyle(el);
                if (elStyle && elStyle.content && "none" !== elStyle.content && "-moz-alt-content" !== elStyle.content && "none" !== elStyle.display && parentStyle.content !== elStyle.content) {
                    var content = elStyle.content + "";
                    ("'" === content[0] || '"' === content[0]) && (content = content.replace(/(^['"])|(['"]$)/g, ""));
                    var isImage = "url" === content.substr(0, 3),
                        elps = document.createElement(isImage ? "img" : "span");
                    return elps.className = pseudoHide + "-element ", Object.keys(elStyle).filter(indexedProperty).forEach(function(prop) {
                        try {
                            elps.style[prop] = elStyle[prop]
                        } catch (e) {
                            Util.log(["Tried to assign readonly property ", prop, "Error:", e])
                        }
                    }), isImage ? elps.src = Util.parseBackgroundImage(content)[0].args[0] : elps.innerHTML = content, elps
                }
            }

            function indexedProperty(property) {
                return isNaN(window.parseInt(property, 10))
            }

            function renderBackgroundRepeat(ctx, image, backgroundPosition, bounds) {
                var offsetX = Math.round(bounds.left + backgroundPosition.left),
                    offsetY = Math.round(bounds.top + backgroundPosition.top);
                ctx.createPattern(image), ctx.translate(offsetX, offsetY), ctx.fill(), ctx.translate(-offsetX, -offsetY)
            }

            function backgroundRepeatShape(ctx, image, backgroundPosition, bounds, left, top, width, height) {
                var args = [];
                args.push(["line", Math.round(left), Math.round(top)]), args.push(["line", Math.round(left + width), Math.round(top)]), args.push(["line", Math.round(left + width), Math.round(height + top)]), args.push(["line", Math.round(left), Math.round(height + top)]), createShape(ctx, args), ctx.save(), ctx.clip(), renderBackgroundRepeat(ctx, image, backgroundPosition, bounds), ctx.restore()
            }

            function renderBackgroundColor(ctx, backgroundBounds, bgcolor) {
                renderRect(ctx, backgroundBounds.left, backgroundBounds.top, backgroundBounds.width, backgroundBounds.height, bgcolor)
            }

            function renderBackgroundRepeating(el, bounds, ctx, image, imageIndex) {
                var backgroundSize = Util.BackgroundSize(el, bounds, image, imageIndex),
                    backgroundPosition = Util.BackgroundPosition(el, bounds, image, imageIndex, backgroundSize),
                    backgroundRepeat = Util.BackgroundRepeat(el, imageIndex);
                switch (image = resizeImage(image, backgroundSize), backgroundRepeat) {
                    case "repeat-x":
                    case "repeat no-repeat":
                        backgroundRepeatShape(ctx, image, backgroundPosition, bounds, bounds.left, bounds.top + backgroundPosition.top, 99999, image.height);
                        break;
                    case "repeat-y":
                    case "no-repeat repeat":
                        backgroundRepeatShape(ctx, image, backgroundPosition, bounds, bounds.left + backgroundPosition.left, bounds.top, image.width, 99999);
                        break;
                    case "no-repeat":
                        backgroundRepeatShape(ctx, image, backgroundPosition, bounds, bounds.left + backgroundPosition.left, bounds.top + backgroundPosition.top, image.width, image.height);
                        break;
                    default:
                        renderBackgroundRepeat(ctx, image, backgroundPosition, {
                            top: bounds.top,
                            left: bounds.left,
                            width: image.width,
                            height: image.height
                        })
                }
            }

            function renderBackgroundImage(element, bounds, ctx) {
                for (var image, backgroundImage = getCSS(element, "backgroundImage"), backgroundImages = Util.parseBackgroundImage(backgroundImage), imageIndex = backgroundImages.length; imageIndex--;)
                    if (backgroundImage = backgroundImages[imageIndex], backgroundImage.args && 0 !== backgroundImage.args.length) {
                        var key = "url" === backgroundImage.method ? backgroundImage.args[0] : backgroundImage.value;
                        image = loadImage(key), image ? renderBackgroundRepeating(element, bounds, ctx, image, imageIndex) : Util.log("html2canvas: Error loading background:", backgroundImage)
                    }
            }

            function resizeImage(image, bounds) {
                if (image.width === bounds.width && image.height === bounds.height) return image;
                var ctx, canvas = doc.createElement("canvas");
                return canvas.width = bounds.width, canvas.height = bounds.height, ctx = canvas.getContext("2d"), drawImage(ctx, image, 0, 0, image.width, image.height, 0, 0, bounds.width, bounds.height), canvas
            }

            function setOpacity(ctx, element, parentStack) {
                return ctx.setVariable("globalAlpha", getCSS(element, "opacity") * (parentStack ? parentStack.opacity : 1))
            }

            function removePx(str) {
                return str.replace("px", "")
            }

            function getTransform(element) {
                var transformRegExp = /(matrix)\((.+)\)/,
                    transform = getCSS(element, "transform") || getCSS(element, "-webkit-transform") || getCSS(element, "-moz-transform") || getCSS(element, "-ms-transform") || getCSS(element, "-o-transform"),
                    transformOrigin = getCSS(element, "transform-origin") || getCSS(element, "-webkit-transform-origin") || getCSS(element, "-moz-transform-origin") || getCSS(element, "-ms-transform-origin") || getCSS(element, "-o-transform-origin") || "0px 0px";
                transformOrigin = transformOrigin.split(" ").map(removePx).map(Util.asFloat);
                var matrix;
                if (transform && "none" !== transform) {
                    var match = transform.match(transformRegExp);
                    if (match) switch (match[1]) {
                        case "matrix":
                            matrix = match[2].split(",").map(Util.trimText).map(Util.asFloat)
                    }
                }
                return {
                    origin: transformOrigin,
                    matrix: matrix
                }
            }

            function createStack(element, parentStack, bounds, transform) {
                var ctx = h2cRenderContext(parentStack ? bounds.width : documentWidth(), parentStack ? bounds.height : documentHeight()),
                    stack = {
                        ctx: ctx,
                        opacity: setOpacity(ctx, element, parentStack),
                        cssPosition: getCSS(element, "position"),
                        borders: getBorderData(element),
                        transform: transform,
                        clip: parentStack && parentStack.clip ? Util.Extend({}, parentStack.clip) : null
                    };
                return setZ(element, stack, parentStack), options.useOverflow === !0 && /(hidden|scroll|auto)/.test(getCSS(element, "overflow")) === !0 && /(BODY)/i.test(element.nodeName) === !1 && (stack.clip = stack.clip ? clipBounds(stack.clip, bounds) : bounds), stack
            }

            function getBackgroundBounds(borders, bounds, clip) {
                var backgroundBounds = {
                    left: bounds.left + borders[3].width,
                    top: bounds.top + borders[0].width,
                    width: bounds.width - (borders[1].width + borders[3].width),
                    height: bounds.height - (borders[0].width + borders[2].width)
                };
                return clip && (backgroundBounds = clipBounds(backgroundBounds, clip)), backgroundBounds
            }

            function getBounds(element, transform) {
                var bounds = transform.matrix ? Util.OffsetBounds(element) : Util.Bounds(element);
                return transform.origin[0] += bounds.left, transform.origin[1] += bounds.top, bounds
            }

            function renderElement(element, parentStack, ignoreBackground) {
                var image, transform = getTransform(element, parentStack),
                    bounds = getBounds(element, transform),
                    stack = createStack(element, parentStack, bounds, transform),
                    borders = stack.borders,
                    ctx = stack.ctx,
                    backgroundBounds = getBackgroundBounds(borders, bounds, stack.clip),
                    borderData = parseBorders(element, bounds, borders),
                    backgroundColor = ignoreElementsRegExp.test(element.nodeName) ? "#efefef" : getCSS(element, "backgroundColor");
                switch (createShape(ctx, borderData.clip), ctx.save(), ctx.clip(), backgroundBounds.height > 0 && backgroundBounds.width > 0 && !ignoreBackground ? (renderBackgroundColor(ctx, bounds, backgroundColor), renderBackgroundImage(element, backgroundBounds, ctx)) : ignoreBackground && (stack.backgroundColor = backgroundColor), ctx.restore(), borderData.borders.forEach(function(border) {
                    renderBorders(ctx, border.args, border.color)
                }), element.nodeName) {
                    case "IMG":
                        (image = loadImage(element.getAttribute("src"))) ? renderImage(ctx, element, image, bounds, borders): Util.log("html2canvas: Error loading <img>:" + element.getAttribute("src"));
                        break;
                    case "INPUT":
                        switch (element.type) {
                            case "image":
                                var img = document.createElement("img");
                                img.width = element.width, img.height = element.height, img.src = element.src, bounds.width = element.width, bounds.height = element.height, renderImage(ctx, element, img, bounds, borders);
                                break;
                            case "checkbox":
                                var img_width = 14,
                                    img_height = 15,
                                    img = document.createElement("img");
                                img.width = img_width, img.height = img_height, img.src = element.checked ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4OTRDRjc2RkQyMzExMUUzQTEzQzlFMDhCNDA5MURBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4OTRDRjc3MEQyMzExMUUzQTEzQzlFMDhCNDA5MURBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5NENGNzZERDIzMTExRTNBMTNDOUUwOEI0MDkxREE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg5NENGNzZFRDIzMTExRTNBMTNDOUUwOEI0MDkxREE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QI1gzQAAAgtJREFUeNqUkk1oE0EYhp9NupFCYtNGbRspItSG2kMRSbGHWhvMRezBHtWDF0X0oII/oCIqaEVPSj3opRB/Di0tSA+iF0EFA625htZAaWxiyoqENE2y+dlxd1q3CL1k4Judn+f9vndmRxFCUE8bHDknXC6VhnpEZy7fE5+jMfZ0+FH+VZye+SGicxlSmfyWIr26zNT7F3Is0nOKrDj1bl7ML+cJn9hPZ8CH0wmKsi6w8q6uFjkcGpHzgb4B+ZXC6GySQ8cP4G3zkc2ZIocZG5UsP6OjY/zRNJp9LfR2HZHrDqv7mfqNp3UHuWKNbLFKtlCz48u3GBMTkxK+c/MGmlbYFCLK5EoGkcgrwkODjI9HyJchu1bh0cMHYBgcDYfo7gtJ1raqmJO1smCb2kBN14m8fI53l5+lxALp5BLupu1cuHSNTN6QrC0UokQipxA8dpLEQpxPHz8w9vg+RrUiobMXrxDXWyhWFcnaVoVRplF1kDWTnb9+l0BPD0ZZlxaD/f30Dg2jOhXJWOzmGdHxuTFDoeRUefLsKfsCXbTt9nP11m3py9qzGIu1rba3ujG0JN69HZjHNLN7mZx+i8P8J+kiNNagUoWVxaRk7YrBg52kYl8prSzS7BF4PVByQUGFJnNsrVl7FmOx6xe68eRev5kRs9/jpH9pWz45f/tOU9TN6VPDyn/CettfAQYAn/DWSSDRj2oAAAAASUVORK5CYII=" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4OTRDRjc3M0QyMzExMUUzQTEzQzlFMDhCNDA5MURBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4OTRDRjc3NEQyMzExMUUzQTEzQzlFMDhCNDA5MURBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5NENGNzcxRDIzMTExRTNBMTNDOUUwOEI0MDkxREE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg5NENGNzcyRDIzMTExRTNBMTNDOUUwOEI0MDkxREE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XEbJIAAAAONJREFUeNqcUrEKhTAMTLU4Kjg5qLOL7v7/4K6LOLjo4CCKjiL2cQWL71kLz4ODNrmjSRomhKA3sOgl+Hmoqkp0XUfLsmiFnudRFEWUpinDnaHUsizFNE2UJAkFQaA1DsNAdV2T7/uUZRmTpbZtazQByEEDrepxnmej6WqGVvV4HIeicZKWpTRqOPu+y+DT9zDGpPE21W3bJE1Gx3Hu/4gE+ITf/OsFkEbXdWkcR7JtWxK9XHnGoYFWGeM4pqZpCEvAOdcSOWigVZsDFEUh+r6ndV21peGlMAwpz3P2ZfwXHwEGAIkkaZUcv/2HAAAAAElFTkSuQmCC", bounds.width = img_width, bounds.height = img_height, renderImage(ctx, element, img, bounds, borders);
                                break;
                            case "radio":
                                var img_width = 14,
                                    img_height = 14,
                                    img = document.createElement("img");
                                img.width = img_width, img.height = img_height, img.src = element.checked ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRUEyMDYwMkQyMzIxMUUzQTEzQzlFMDhCNDA5MURBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRUEyMDYwM0QyMzIxMUUzQTEzQzlFMDhCNDA5MURBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJFQTIwNjAwRDIzMjExRTNBMTNDOUUwOEI0MDkxREE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJFQTIwNjAxRDIzMjExRTNBMTNDOUUwOEI0MDkxREE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+CdJMDQAAAidJREFUeNpUUk1vUkEUPfN4bdUEEI1I+bAPtLzXVBS1xNhEU+NSdyYaY/wNbrroP3Dlyn/hRhe6bCQssIhNq0ha2uDjsyBNRKglIn2Mc4c+Eic5yc2559x7Z+YyzjnsY5Y6fCPXwlahjUqtK7kLQRfmdA+uxbwIa25ma5ltXE2WeXq9gTPTTkSNcwhppyVfLf3CzvY+fjYOsHhjGveWZtjYuJos8WS2jviti9DnfeBDkTiuTGWZAhTyTWx+LGIpERBmjalmqc1TmTL0hVn4Ij50e8dy+wqMSjCZ0/tDpDK7iGhurq5vVqF6nPBG/Oj9IcNwpB0fPqoh2pLGLDZBHiW/VYUn5MOBqHY4sNCzgPTaJzx78ghPHz+UMXGUIw1pyaNUKi1Mes6iN+AiCYlXL1+gWS2jVa/J2OZJQ1ryqBwDmB0LU0cqFDEjE3A4HONBKS52mBx3KNA/tEAeJSie32qLrg6GExOKxPPlFfiCIQmKbZ40pCWPakTPI9sowmXMQBUJRTyMK34Tr9++kR3rv4HuX+rGcCTuui+0ceFRrscjmOzU0CsX4Jwawn0SUCaAZn8EiomjHGlISx7VMDR2O1HjH7JrcJ7iCF+eg0MZfbr8DLEMloD5rYAfGxncTVwCecYr9+59iqc/b8MV9CM8P4tAJDQa9XsVZn4X3doeFhcMPLh/h/23q3RyuQL/8nVHLHkJ9b2W5AJ+r1hyDVevRBGL6ePV+CfAACgH/3S9H1pzAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRUEyMDVGRUQyMzIxMUUzQTEzQzlFMDhCNDA5MURBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRUEyMDVGRkQyMzIxMUUzQTEzQzlFMDhCNDA5MURBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5NENGNzc1RDIzMTExRTNBMTNDOUUwOEI0MDkxREE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg5NENGNzc2RDIzMTExRTNBMTNDOUUwOEI0MDkxREE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HowNJQAAAURJREFUeNqMksuKwkAQRas7+YFEE8SYFxFcCC79/3WWeSwE8ZFgEEn8AaM93oIOI8yoBb1I1T1V3ZUrlFKk43K5qMPhQKfTia7XK+ds2ybP8yiKInJdV2it0GBZlmqz2bAwDEOaTCacP5/PdDweudFisaDlcikGUEOr1Yrm8zn9FdvtlrIsG2AT1/sEIXQNsOM4ytztdmRZFiVJQo/Hg94FNHVdExhZVRUFQUD3+536vn97oIEWjNm2LY3HYy58miilZC0YE+Lb7cbQNyCmQiexfnQQQvD5L3QdWjByNpvxg9HtU0ADLRgZxzF3QcIwDC7i6An6GzVooAVj+r4vnmtWeZ4TzICt4Q2/rw0QmyyKgn8JmMFyaZoquANbexZoNBpxvuu6YRJMsF6vxYtXEfv9nk3eNM2LyafTKZv8ecXhGj8CDACSmtbx0h3qPQAAAABJRU5ErkJggg==", bounds.width = img_width, bounds.height = img_height, renderImage(ctx, element, img, bounds, borders);
                                break;
                            case "file":
                                var img_width = 173,
                                    img_height = 18,
                                    img = document.createElement("img");
                                img.width = img_width, img.height = img_height, img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAASCAYAAAApM17jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRUEyMDYwNkQyMzIxMUUzQTEzQzlFMDhCNDA5MURBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRUEyMDYwN0QyMzIxMUUzQTEzQzlFMDhCNDA5MURBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJFQTIwNjA0RDIzMjExRTNBMTNDOUUwOEI0MDkxREE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJFQTIwNjA1RDIzMjExRTNBMTNDOUUwOEI0MDkxREE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5S4r1QAAC5FJREFUeNrsWgtUlNUW/n5ghlfKdEFEQkd5iDyFZKVgejEsX1dumspjlQq+8JGPREEpw9JcaaVwMYXIRwheLDOvISUghop5FQFFSAWVN/IwSGaAGfDc8//D8BxmBrBldy02a8PPOft8e59z9tlnn/P/DCEElZWVpLCwEOXl5RCJRBig7qSvr49hw4ZBKBTC2NiY6S5RT+7lFkDCewl2Vkad60WVJDu/GpZjbaEPML3XTrGzb6KwqhmWruMgzi+EkaUtjPXrkZtd1PrcF1wlJKkkuXnVMLKh2PxnjN1fevToEUlKSiJZWVnk8ePHZIAUEzs27BixY8WOGbvYO3H9LbLS15f4Uk6tJJ3qxbcPcuU59aR7OzU4//harj3LRzMyuL9f3BYTVuci+hzFPvcBVxmLbx/i9PwZ2P1lrYKCAhgaGmLs2LED4VQJvfjiixxnZmaCHTMabTsL8AAB/VNH+WBoHJz2+xKBPKryaHzlavsU8kje9Udotl2B+JApDBt1XTaHwEioy+kcIlP97IknQ9Xj8f5yc6FVWloKDw+PAa9Uk0aOHImUlBSlMpq1CdiXOAmhM4YrFhA9JPERB5F4sxhS6nImNn+H/xo/2Am6bsMl5HDgViSXa0JL/C1WBuaS97bPwsWYGFi/9xGMjSiUAtz/UFzWla09lmKj/6s9pyS1OeRwxGEk51Vw8maOM7FyzQKM7JBq3EqJwe7IVJJd3gItAyeseH813Ez1GHX6kZcYTQ7Fn0eZlKFtTfHaO2uxyHU4o8pWaVUqCQ7Nhc9ye3y/OwqFrKN20K3x5MkTLoIMkPoRlx0zRSSlbOr1AdZ66OHesQ9wuQqku1QJiVixlZssCw9PeHqMQUVeMnau+QQPJV3l+Rhmack9EbwEG6ER9Ek9ssuLcK+2uQtuJYnkcCvw6mxvzJjwN9xJOYDlkZk99KSE7KY6k/NqqLw//Gc7o+TmaQRvjkMt2u0ovpiMGssF8H97CvTrshC+M4FdKERVP2quR5Adx1LRMm4m/PwWYDRKcS4iGAllUqLK1uaqUlTUpmMvddiWST7ddGs9ffoULKtDjY21lAEdHR2OWar77TzSG+0ww2no/43j3fnpFMROM+Fsot2n9srGS9LwAsb7B0KY8hHCdyfAac8s0lFLTdoRXCEM3DeEY5mLIRd1PCccI0t3JuJISnGX6GzMTA/YhuZbPuQ0nby13uYMJDkEClKCmrQopFHcRXuO4A1TNtLNxt+FoSQ4Phq3395P7Loc1Fg7sqn86yEHsNhWl9Z5wEm4l7wbkYlSkS/MW+VMZ2/Dp97WXFs75JH3Ymm9ZD4Mf1XeD+/qe5yV09/ywlRTHjN1qiOJ3BIFnlSq0lZznnLdWtwqpsmtsolgGu8jZvUY+Md0TCy8kP34GDRTX8c/mm5A4mD0F3DHRny3ZDB8O9rpfhhPTtvgVcEEfFUnhZNOAy68NQ9/XKyH45CWXmvQ0NBQWi+Wshu2NbNxgytZuzcO+65MQIhQr62+qqwKTxk3/NPFsK1M1/ZNTOWfRXqNWOHNAZcCNEuV6mVxWYr9YgtSISVSmouKi4q4smuFDbCz1e0mTxg7uHcoN3TdwMS5yp4bWqOt07gRbfVGls5gyBVQv1PZDwuPmcBP3+DopsU4YiAkk1wnw4OmNKOH8PDbFeW2yp22J91a8sjBMuu83el37B8yBoE2nyCzfBXGCLS5iFt4pxDGvGZU8R1hRnhoaWn5CzhtC56yCdDuZPy+bFz7+uID8Zm/YSi1l7WTP4ZuvLyWXtvMMOrf/Bi6LMfCEZdwdP/nuLjKusN5TUS94QW68XcmPT3Sv3MT91sAW0shDOSFVuwVm5TOGVEoT+gxTq/rTiGRED6f39ZRqbRz+qNuP3im0xAb5YyMtBSkpKXh0k8xHLutCcd0VbaKlOvW6BhpFXFj3lkENgEJCesxejCPK+PzB8PKwQGDWRka5vniB0gK94auri50F36N+2I5Xg3O7GktpxwcfxNi+QJ5fAOfT5OV6+pPx/GsR61txEiLWtTWJi6vUSb/tAzfBtrLyidsQ+bjHmym/XE2Hk5t5LcxEZfixLroNru4tSm3Q11cpQtbEfGZaUFBEJBCHNx/jk6wzD34egJoknO4XNZhGqquIbFWA/r9OKnrG7C3EyJMeScAAQEBDMezrVFbzYepkZ4i+6BBLiCrqr3kj+tfED+/5bgtgspOqupHedpX2H6iBONm+DCbdx1gYqN2wpUhyCqo7mqrjJXa2mW3a11daGhoUMh3r58Exn6JsdpihfVNjDnuB3niG73VuF+QjnWn1uDbm7Vc3fktZliQ5I6MkhqU3j6LYv/x2JRchMaGB/h01ER875mEkupq5KbMgb/rSJx72ITGil8wbd0JnCqoQXVJCdyNn3JYKVsssFArDNVU/urqHLitPYXfFdgjobtVZvRxnDx5ErGxsciuYG2pw8+XfkWdXIZOibSpoVe4bfh0rNQmgTOzzc+mU9Fwj8UwZbfGTVtx9noeyctOIlvXR9NIIoDvNPM+O63J5PkUV4p99CCUnltOynPTye5N+5B+sw48fnd5i+nzuGh7ePMeXLtXTopyz5GP92aghf8Ge3ugklT1Q1yWg7vJn2PXv6+SwrIykpfxC64TRpGtoLZCma3drrxUixTTfVGn5+qmfGDdjzjo8zKXUzrY0iRfh71jeYiEL4FPk7wg1KFeovMKgsIcMP6bG/jYksF2qQPOe78MHbqodRzmIdpxPWIyijH5NSECqFVz3nwXkTvWYtZESw4rmWJhQgLCwq7ij5xEIGmaEpvpgZH+yLJcJdt9r3GVb9CsEwgGdx5Sk6nr4ZmyFKeL5CHRntn+yTKy48MoxO7dIbsZ4AmxOCQIrwgUX00JdDsHPv32a9T2ZxY3dBH5MPQo9u8MlOHy7fHubj8YK7ryEoxnwkLmkS07v8O+0CzZAdPACcHb53PXTs182T4v6BL8uR2DLeOr6Id3CHmnahdizoRj6xlZ20E2MxE8x5o1WqmtqnQz0dHRxMvLi4sgirY+yb0YmLodwtn8C3jFoHt9wfEpmCv5GtmLzDkXiX/NDPWRZVhqVYY1Q10w/lIZ3raSLZ+C790xPmYDCsI0YOFyCOlFP2A069C03Q9vmuHUwv/i6FyK01iH9LOxCFmxDbfe/xE160wQYuKCkr1n8JGLEZrYDmgPxegRg7sdxFicCIqTPNe8w0HyDjyFQfi48DQc6UGso43q4bbntGy6ER8fjyVLlvT71aZIJCKtr4if6WvS3uL21w7l7SVEJJLShaVPx6774umLbg1Vhwxtq0lYp3kLM+f8C3frmuR3X8i/fBkVjT3rIRgJ3wXA+vBULtqxjhO3Kgdzl7lAMMIBARoX8dn5fFmwLkrC0kvAfBczKleBwjoduM1dhejIGcC+YnqSHYlZq4AfUythYGUFK8ojjJXsI03qdZ70Erc3BzE1v2dgnrXD9gW3v3Yob8/n6vg9fL/QF91a8mscdkIUT8oofHj3Mkw2ToSbRWh7sWMobiROots+XSgS+YQyYBOJesiwJn52Gbu8JsKs9TbM5YPvcHqWGfe87dpxLHh5PIxag/fWE1cxW6gNSdFFjHNe2aYm7OcD0GWxgm7j6412sDBaIquYfBilpzyh02XD53qg09nB2MehDNr6qDO4g41q4bY7raorrwH684mJi4sj7u7u3OlZ/kFCzy8X6tBEo5i2tnbbywX1Xko0cp6kqEmj7G1FNydRWg70Sr/6NvaMK3d49jB24cIF+Pj4MAPu83xIy9TUFMXFxbCxseHuLdmJ6clxdXUFlHuvRFdJo57qelveX1KGK4/ampqa3FixYzZAz9Fp2Q9AcnJyuH/MzMwwaNCggVFRQOz3BiUlJaiqqoK9vf3AgDzP9ICNqg8ePCAPHz5ERUUFxGLxwKgoID09PZiYmHBfeY0aNWogNXiO9D8BBgCSgBhsn2kNQQAAAABJRU5ErkJggg==", bounds.width = img_width, bounds.height = img_height, renderImage(ctx, element, img, bounds, borders);
                                break;
                            case "reset":
                                "" == element.value && (element.value = "Reset"), renderFormValue(element, bounds, stack);
                                break;
                            case "submit":
                                "" == element.value && (element.value = "Submit"), renderFormValue(element, bounds, stack);
                                break;
                            case "button":
                            case "color":
                            case "date":
                            case "datetime":
                            case "datetime-local":
                            case "email":
                            case "month":
                            case "number":
                            case "password":
                            case "range":
                            case "search":
                            case "tel":
                            case "text":
                            case "time":
                            case "url":
                            case "week":
                                (element.value || element.placeholder) && renderFormValue(element, bounds, stack)
                        }
                        break;
                    case "TEXTAREA":
                        (element.value || element.placeholder || "").length > 0 && renderFormValue(element, bounds, stack);
                        break;
                    case "SELECT":
                        (element.options || element.placeholder || "").length > 0 && renderFormValue(element, bounds, stack);
                        break;
                    case "LI":
                        renderListItem(element, stack, backgroundBounds);
                        break;
                    case "CANVAS":
                        renderImage(ctx, element, element, bounds, borders)
                }
                return stack
            }

            function isElementVisible(element) {
                return "none" !== getCSS(element, "display") && "hidden" !== getCSS(element, "visibility") && !element.hasAttribute("data-html2canvas-ignore")
            }

            function parseElement(element, stack, cb) {
                return cb || (cb = function() {}), !isElementVisible(element) || skipElementsRegExp.test(element.className) || skipElementsRegExp.test(element.id) || ignoreElementsRegExp.test(element.nodeName) ? void cb() : (stack = renderElement(element, stack, !1) || stack, parseChildren(element, stack, cb))
            }

            function parseChildren(element, stack, cb) {
                function parseNode(node) {
                    node.nodeType === node.ELEMENT_NODE ? parseElement(node, stack, finished) : node.nodeType === node.TEXT_NODE ? (renderText(element, node, stack), finished()) : finished()
                }

                function finished() {
                    --jobs <= 0 && (Util.log("finished rendering " + children.length + " children."), cb())
                }
                var children = Util.Children(element),
                    jobs = children.length + 1;
                finished(), children.forEach(options.async ? function(node) {
                    setTimeout(function() {
                        parseNode(node)
                    }, 0)
                } : parseNode)
            }(options.scrollToTop === undefined || 1 == options.scrollToTop) && window.scroll(0, 0); {
                var element = options.elements === undefined ? document.body : options.elements[0],
                    numDraws = 0,
                    doc = element.ownerDocument,
                    Util = _html2canvas.Util,
                    support = Util.Support(options, doc),
                    ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
                    body = doc.body,
                    getCSS = Util.getCSS,
                    pseudoHide = "___html2canvas___pseudoelement",
                    hidePseudoElementsStyles = doc.createElement("style"),
                    skipElementsRegExp = new RegExp("(" + options.skipElements + ")");
                new RegExp("(" + options.redactedElements + ")")
            }
            hidePseudoElementsStyles.innerHTML = "." + pseudoHide + '-parent:before { content: "" !important; display: none !important; }.' + pseudoHide + '-parent:after { content: "" !important; display: none !important; }', body.appendChild(hidePseudoElementsStyles), images = images || {}, init()
        }, _html2canvas.Preload = function(options) {
            function isSameOrigin(url) {
                link.href = url, link.href = link.href;
                var origin = link.protocol + link.host;
                return origin === pageOrigin
            }

            function start() {
                Util.log("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")"), !images.firstRun && images.numLoaded >= images.numTotal && (Util.log("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")"), "function" == typeof options.complete && options.complete(images))
            }

            function proxyGetImage(url, img, imageObj) {
                if (images.list.indexOf(url) > -1) return !1;
                images.list.push(url);
                var callback_name, script, scriptUrl = options.proxy;
                link.href = url, url = link.href, callback_name = "html2canvas_" + count++, imageObj.callbackname = callback_name, scriptUrl += scriptUrl.indexOf("?") > -1 ? "&" : "?", scriptUrl += "url=" + encodeURIComponent(url) + "&callback=" + callback_name, script = doc.createElement("script"), window[callback_name] = function(a) {
                    "error:" === a.substring(0, 6) ? (imageObj.succeeded = !1, images.numLoaded++, images.numFailed++, start()) : (setImageLoadHandlers(img, imageObj), img.src = a), window[callback_name] = undefined;
                    try {
                        delete window[callback_name]
                    } catch (ex) {}
                    script.parentNode.removeChild(script), script = null, delete imageObj.script, delete imageObj.callbackname
                }, script.setAttribute("type", "text/javascript"), script.setAttribute("src", scriptUrl), imageObj.script = script, document.getElementsByTagName("head")[0].appendChild(script)
            }

            function loadPseudoElement(element, type) {
                var style = window.getComputedStyle(element, type),
                    content = style.content;
                "url" === content.substr(0, 3) && methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]), loadBackgroundImages(style.backgroundImage, element)
            }

            function loadPseudoElementImages(element) {
                loadPseudoElement(element, ":before"), loadPseudoElement(element, ":after")
            }

            function loadGradientImage(backgroundImage, bounds) {
                var img = _html2canvas.Generate.Gradient(backgroundImage, bounds);
                img !== undefined && (images[backgroundImage] = {
                    img: img,
                    succeeded: !0
                }, images.numTotal++, images.numLoaded++, start())
            }

            function invalidBackgrounds(background_image) {
                return background_image && background_image.method && background_image.args && background_image.args.length > 0
            }

            function loadBackgroundImages(background_image, el) {
                var bounds;
                _html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image) {
                    "url" === background_image.method ? methods.loadImage(background_image.args[0]) : background_image.method.match(/\-?gradient$/) && (bounds === undefined && (bounds = _html2canvas.Util.Bounds(el)), loadGradientImage(background_image.value, bounds))
                })
            }

            function getImages(el) {
                var elNodeType = !1;
                try {
                    Util.Children(el).forEach(getImages)
                } catch (e) {}
                try {
                    elNodeType = el.nodeType
                } catch (ex) {
                    elNodeType = !1, Util.log("html2canvas: failed to access some element's nodeType - Exception: " + ex.message)
                }
                if (1 === elNodeType || elNodeType === undefined) {
                    loadPseudoElementImages(el);
                    try {
                        loadBackgroundImages(Util.getCSS(el, "backgroundImage"), el)
                    } catch (e) {
                        Util.log("html2canvas: failed to get background-image - Exception: " + e.message)
                    }
                    loadBackgroundImages(el)
                }
            }

            function setImageLoadHandlers(img, imageObj) {
                img.onload = function() {
                    imageObj.timer !== undefined && window.clearTimeout(imageObj.timer), images.numLoaded++, imageObj.succeeded = !0, img.onerror = img.onload = null, start()
                }, img.onerror = function() {
                    if ("anonymous" === img.crossOrigin && (window.clearTimeout(imageObj.timer), options.proxy)) {
                        var src = img.src;
                        return img = new Image, imageObj.img = img, img.src = src, void proxyGetImage(img.src, img, imageObj)
                    }
                    images.numLoaded++, images.numFailed++, imageObj.succeeded = !1, img.onerror = img.onload = null, start()
                }
            }
            var pageOrigin, methods, i, timeoutTimer, images = {
                    numLoaded: 0,
                    numFailed: 0,
                    numTotal: 0,
                    cleanupDone: !1,
                    list: []
                },
                Util = _html2canvas.Util,
                count = 0,
                element = options.elements[0] || document.body,
                doc = element.ownerDocument,
                domImages = element.getElementsByTagName("img"),
                imgLen = domImages.length,
                link = doc.createElement("a"),
                supportCORS = function(img) {
                    return img.crossOrigin !== undefined
                }(new Image);
            for (link.href = window.location.href, pageOrigin = link.protocol + link.host, methods = {
                loadImage: function(src) {
                    var img, imageObj;
                    src && images[src] === undefined && (img = new Image, src.match(/data:image\/.*;base64,/i) ? (img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), imageObj = images[src] = {
                        img: img
                    }, images.numTotal++, setImageLoadHandlers(img, imageObj)) : isSameOrigin(src) || options.allowTaint === !0 ? (imageObj = images[src] = {
                        img: img
                    }, images.numTotal++, setImageLoadHandlers(img, imageObj), img.src = src) : supportCORS && !options.allowTaint && options.useCORS ? (img.crossOrigin = "anonymous", imageObj = images[src] = {
                        img: img
                    }, images.numTotal++, setImageLoadHandlers(img, imageObj), img.src = src) : options.proxy && (imageObj = images[src] = {
                        img: img
                    }, images.numTotal++, proxyGetImage(src, img, imageObj)))
                },
                cleanupDOM: function(cause) {
                    var img, src;
                    if (!images.cleanupDone) {
                        Util.log(cause && "string" == typeof cause ? "html2canvas: Cleanup because: " + cause : "html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
                        for (src in images)
                            if (images.hasOwnProperty(src) && (img = images[src], "object" == typeof img && img.callbackname && img.succeeded === undefined)) {
                                window[img.callbackname] = undefined;
                                try {
                                    delete window[img.callbackname]
                                } catch (ex) {}
                                img.script && img.script.parentNode && (img.script.setAttribute("src", "about:blank"), img.script.parentNode.removeChild(img.script)), images.numLoaded++, images.numFailed++, Util.log("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal)
                            }
                        window.stop !== undefined ? window.stop() : document.execCommand !== undefined && document.execCommand("Stop", !1), document.close !== undefined && document.close(), images.cleanupDone = !0, cause && "string" == typeof cause || start()
                    }
                },
                renderingDone: function() {
                    timeoutTimer && window.clearTimeout(timeoutTimer)
                }
            }, options.timeout > 0 && (clearTimeout(timeoutTimer), timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout)), Util.log("html2canvas: Preload starts: finding background-images"), images.firstRun = !0, getImages(element), Util.log("html2canvas: Preload: Finding images"), i = 0; imgLen > i; i += 1) methods.loadImage(domImages[i].getAttribute("src"));
            return images.firstRun = !1, Util.log("html2canvas: Preload: Done."), images.numTotal === images.numLoaded && start(), methods
        }, _html2canvas.Renderer = function(parseQueue, options) {
            function sortZindex(a, b) {
                return "children" === a ? -1 : "children" === b ? 1 : a - b
            }

            function createRenderQueue(parseQueue) {
                function sortZ(context) {
                    Object.keys(context).sort(sortZindex).forEach(function(zi) {
                        var nonPositioned = [],
                            floated = [],
                            positioned = [],
                            list = [];
                        context[zi].forEach(function(v) {
                                v.node.zIndex.isPositioned || v.node.zIndex.opacity < 1 ? positioned.push(v) : v.node.zIndex.isFloated ? floated.push(v) : nonPositioned.push(v)
                            }),
                            function walk(arr) {
                                arr.forEach(function(v) {
                                    list.push(v), v.children && walk(v.children)
                                })
                            }(nonPositioned.concat(floated, positioned)), list.forEach(function(v) {
                                v.context ? sortZ(v.context) : queue.push(v.node)
                            })
                    })
                }
                var rootContext, queue = [];
                return rootContext = function(rootNode) {
                    function insert(context, node, specialParent) {
                        var zi = "auto" === node.zIndex.zindex ? 0 : Number(node.zIndex.zindex),
                            contextForChildren = context,
                            isPositioned = node.zIndex.isPositioned,
                            isFloated = node.zIndex.isFloated,
                            stub = {
                                node: node
                            },
                            childrenDest = specialParent;
                        node.zIndex.ownStacking ? (contextForChildren = stub.context = {
                            children: [{
                                node: node,
                                children: []
                            }]
                        }, childrenDest = undefined) : (isPositioned || isFloated) && (childrenDest = stub.children = []), 0 === zi && specialParent ? specialParent.push(stub) : (context[zi] || (context[zi] = []), context[zi].push(stub)), node.zIndex.children.forEach(function(childNode) {
                            insert(contextForChildren, childNode, childrenDest)
                        })
                    }
                    var rootContext = {};
                    return insert(rootContext, rootNode), rootContext
                }(parseQueue), sortZ(rootContext), queue
            }

            function getRenderer(rendererName) {
                var renderer;
                if ("string" == typeof options.renderer && _html2canvas.Renderer[rendererName] !== undefined) renderer = _html2canvas.Renderer[rendererName](options);
                else {
                    if ("function" != typeof rendererName) throw new Error("Unknown renderer");
                    renderer = rendererName(options)
                } if ("function" != typeof renderer) throw new Error("Invalid renderer defined");
                return renderer
            }
            return getRenderer(options.renderer)(parseQueue, options, document, createRenderQueue(parseQueue.stack), _html2canvas)
        }, _html2canvas.Util.Support = function(options, doc) {
            function supportSVGRendering() {
                var img = new Image,
                    canvas = doc.createElement("canvas"),
                    ctx = canvas.getContext === undefined ? !1 : canvas.getContext("2d");
                if (ctx === !1) return !1;
                canvas.width = canvas.height = 10, img.src = ["data:image/svg+xml,", "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>", "<foreignObject width='10' height='10'>", "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>", "sup", "</div>", "</foreignObject>", "</svg>"].join("");
                try {
                    ctx.drawImage(img, 0, 0), canvas.toDataURL()
                } catch (e) {
                    return !1
                }
                return _html2canvas.Util.log("html2canvas: Parse: SVG powered rendering available"), !0
            }

            function supportRangeBounds() {
                var testElement, support = !1;
                return testElement = doc.createElement("boundtest"), doc.body.appendChild(testElement), testElement.getBoundingClientRect && (support = !0), doc.body.removeChild(testElement), support
            }
            return {
                rangeBounds: supportRangeBounds(),
                svgRendering: options.svgRendering && supportSVGRendering()
            }
        }, window.html2canvas = function(elements, opts) {
            elements = elements.length ? elements : [elements];
            var canvas, options = {
                logging: !1,
                elements: elements,
                background: "#fff",
                proxy: null,
                timeout: 0,
                useCORS: !1,
                allowTaint: !1,
                svgRendering: !1,
                ignoreElements: "IFRAME|OBJECT|PARAM|SCRIPT",
                useOverflow: !0,
                letterRendering: !1,
                chinese: !1,
                async: !1,
                width: null,
                height: null,
                taintTest: !0,
                renderer: "Canvas"
            };
            return options = _html2canvas.Util.Extend(opts, options), _html2canvas.logging = options.logging, options.complete = function(images) {
                window.html2canvas.images = images, ("function" != typeof options.onpreloaded || options.onpreloaded(images) !== !1) && _html2canvas.Parse(images, options, function(queue) {
                    ("function" != typeof options.onparsed || options.onparsed(queue) !== !1) && (canvas = _html2canvas.Renderer(queue, options), "function" == typeof options.onrendered && options.onrendered(canvas))
                })
            }, clearTimeout(window.h2cTimeout), window.h2cTimeout = window.setTimeout(function() {
                _html2canvas.Preload(options)
            }, 0), {
                render: function(queue, opts) {
                    return _html2canvas.Renderer(queue, _html2canvas.Util.Extend(opts, options))
                },
                parse: function(images, opts) {
                    return _html2canvas.Parse(window.html2canvas.images, _html2canvas.Util.Extend(opts, options), function(queue) {
                        ("function" != typeof options.onparsed || options.onparsed(queue) !== !1) && (canvas = _html2canvas.Renderer(queue, options), "function" == typeof options.onrendered && options.onrendered(canvas))
                    })
                },
                preload: function(opts) {
                    return _html2canvas.Preload(_html2canvas.Util.Extend(opts, options))
                },
                log: _html2canvas.Util.log
            }
        }, window.html2canvas.images = {}, window.html2canvas.log = _html2canvas.Util.log, window.html2canvas.Renderer = {
            Canvas: undefined
        }, _html2canvas.Renderer.Canvas = function(options) {
            function createShape(ctx, args) {
                ctx.beginPath(), args.forEach(function(arg) {
                    ctx[arg.name].apply(ctx, arg.arguments)
                }), ctx.closePath()
            }

            function safeImage(item) {
                if (-1 === safeImages.indexOf(item.arguments[0].src)) {
                    testctx.drawImage(item.arguments[0], 0, 0);
                    try {
                        testctx.getImageData(0, 0, 1, 1)
                    } catch (e) {
                        return testCanvas = doc.createElement("canvas"), testctx = testCanvas.getContext("2d"), !1
                    }
                    safeImages.push(item.arguments[0].src)
                }
                return !0
            }

            function renderItem(ctx, item) {
                switch (item.type) {
                    case "variable":
                        ctx[item.name] = item.arguments;
                        break;
                    case "function":
                        switch (item.name) {
                            case "createPattern":
                                if (item.arguments[0].width > 0 && item.arguments[0].height > 0) try {
                                    ctx.fillStyle = ctx.createPattern(item.arguments[0], "repeat")
                                } catch (e) {
                                    Util.log("html2canvas: Renderer: Error creating pattern", e.message)
                                }
                                break;
                            case "drawShape":
                                createShape(ctx, item.arguments);
                                break;
                            case "drawImage":
                                item.arguments[8] > 0 && item.arguments[7] > 0 && (!options.taintTest || options.taintTest && safeImage(item)) && ctx.drawImage.apply(ctx, item.arguments);
                                break;
                            default:
                                ctx[item.name].apply(ctx, item.arguments)
                        }
                }
            }
            options = options || {};
            var doc = document,
                safeImages = [],
                testCanvas = document.createElement("canvas"),
                testctx = testCanvas.getContext("2d"),
                Util = _html2canvas.Util,
                canvas = options.canvas || doc.createElement("canvas");
            return function(parsedData, options, document, queue, _html2canvas) {
                var newCanvas, bounds, fstyle, ctx = canvas.getContext("2d"),
                    zStack = parsedData.stack;
                if (canvas.width = canvas.style.width = options.width || zStack.ctx.width, canvas.height = canvas.style.height = options.height || zStack.ctx.height, fstyle = ctx.fillStyle, ctx.fillStyle = Util.isTransparent(parsedData.backgroundColor) && options.background !== undefined ? options.background : parsedData.backgroundColor, ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.fillStyle = fstyle, queue.forEach(function(storageContext) {
                    ctx.textBaseline = "bottom", ctx.save(), storageContext.transform.matrix && (ctx.translate(storageContext.transform.origin[0], storageContext.transform.origin[1]), ctx.transform.apply(ctx, storageContext.transform.matrix), ctx.translate(-storageContext.transform.origin[0], -storageContext.transform.origin[1])), storageContext.clip && (ctx.beginPath(), ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height), ctx.clip()), storageContext.ctx.storage && storageContext.ctx.storage.forEach(function(item) {
                        renderItem(ctx, item)
                    }), ctx.restore()
                }), Util.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj"), 1 === options.elements.length && "object" == typeof options.elements[0] && "BODY" !== options.elements[0].nodeName) {
                    bounds = _html2canvas.Util.Bounds(options.elements[0]), newCanvas = document.createElement("canvas"), newCanvas.width = Math.ceil(bounds.width), newCanvas.height = Math.ceil(bounds.height), ctx = newCanvas.getContext("2d");
                    var imgData = canvas.getContext("2d").getImageData(bounds.left, bounds.top, bounds.width, bounds.height);
                    return ctx.putImageData(imgData, 0, 0), canvas = null, newCanvas
                }
                return canvas
            }
        }
}(window, document);
var jsImageDiff = function(document, window) {
    var jsImageDiff = window.jsImageDiff || {},
        colorHelper = {};
    colorHelper.NAMED_COLORS = {}, colorHelper.parseRGB = function(arg) {
        var regex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
        arg.match(regex);
        var r = parseInt(RegExp.$1, 10),
            g = parseInt(RegExp.$2, 10),
            b = parseInt(RegExp.$3, 10);
        return isNaN(r) && (r = 0), isNaN(g) && (g = 0), isNaN(b) && (b = 0), r = r > 255 ? 255 : r, g = g > 255 ? 255 : g, b = b > 255 ? 255 : b, r = 0 > r ? 0 : r, g = 0 > g ? 0 : g, b = 0 > b ? 0 : b, {
            r: r,
            g: g,
            b: b,
            a: 1
        }
    }, colorHelper.parseHex = function(arg) {
        var hex3ToHex6 = function(hex3) {
                var hex6 = "";
                return hex6 += hex3[0], hex6 += hex3[0], hex6 += hex3[1], hex6 += hex3[1], hex6 += hex3[2], hex6 += hex3[2]
            },
            hex6ToRgba = function(hex6) {
                var r = hex6.substring(0, 2),
                    g = hex6.substring(2, 4),
                    b = hex6.substring(4);
                return r = parseInt(r, 16), g = parseInt(g, 16), b = parseInt(b, 16), {
                    r: r,
                    g: g,
                    b: b,
                    a: 1
                }
            },
            regex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (!regex.test(arg)) throw "Invalid syntax for hex color: " + arg + ".";
        arg.match(regex);
        var hex = RegExp.$1;
        return 3 === hex.length && (hex = hex3ToHex6(hex)), hex6ToRgba(hex)
    }, colorHelper.parseRGBA = function() {}, colorHelper.parseHSL = function() {}, colorHelper.parseHSLA = function() {}, colorHelper.parseNamedColor = function() {}, colorHelper.parseColor = function(color) {
        var regexRGB = /rgb\(/,
            regexRGBA = /rgba\(/,
            regexHex = /#/;
        if (regexRGB.test(color)) return colorHelper.parseRGB(color);
        if (regexRGBA.test(color)) return colorHelper.parseRGBA(color);
        if (regexHex.test(color)) return colorHelper.parseHex(color);
        throw "Could not parse color: " + color + "."
    };
    var ImgWrapper = function(source, callback) {
            var img, ctx, self = this,
                isImgTag = function(arg) {
                    var retVal = !1;
                    return arg === typeof Object && "IMG" === arg.nodeName && (retVal = !0), retVal
                },
                createCanvas = function() {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.naturalWidth, canvas.height = img.naturalHeight, ctx = canvas.getContext("2d"), ctx.drawImage(img, 0, 0)
                },
                createImgTag = function(source, callback) {
                    var newImg = new Image;
                    if (isImgTag(source)) newImg.onload = callback, newImg.src = source.src, img = newImg;
                    else {
                        if ("string" != typeof source) throw "Could not parse input image: " + source + ".";
                        newImg.onload = function() {
                            createCanvas(), callback()
                        }, newImg.src = source, img = newImg
                    }
                },
                getCtx = function() {
                    return ctx
                },
                getImgData = function() {
                    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
                    return imgData.data
                };
            createImgTag(source, callback), self.getCtx = getCtx, self.getImgData = getImgData
        },
        PixelAnalyizer = function(width, height, blockSize) {
            var blockSize = blockSize,
                w = width,
                qc = w / blockSize,
                affectedQuads = {},
                self = this,
                getRow = function(px) {
                    return Math.floor(px / w)
                },
                getCol = function(px) {
                    return px % w
                },
                rowInQuadrant = function(r) {
                    return Math.floor(r / blockSize)
                },
                colInQuadrant = function(c) {
                    return Math.floor(c / blockSize % qc)
                },
                getKey = function(col, row) {
                    return col + "-" + row
                };
            self.getPixelData = function(px) {
                var row = getRow(px),
                    col = getCol(px),
                    px_data = {
                        row: row,
                        col: col,
                        quadR: rowInQuadrant(row),
                        quadC: colInQuadrant(col)
                    };
                return px_data
            }, self.getAffectedQuads = function() {
                return affectedQuads
            }, self.checkQuad = function(pd) {
                var key = getKey(pd.quadC, pd.quadR);
                return affectedQuads[key] || !1
            }, self.nextBlock = function(i) {
                return i - i % blockSize + blockSize
            }, self.markBlockTainted = function(pd) {
                var key = getKey(pd.quadC, pd.quadR);
                affectedQuads[key] = "X"
            }
        };
    return jsImageDiff.diff = function(imgs, userCallback, userOptions, blockOptions) {
        var callback, imgsResolvedCount, totalImgs, diffColor, blockSize, pixelAnalyizer, ctxDiff, totalPixelCount, diffPixelCount, sourceImages = [],
            returnOutput = function() {
                var retVal = {};
                retVal.sourceCanvases = [], sourceImages.forEach(function(img) {
                    retVal.sourceCanvases.push(img.getCtx().canvas)
                }), retVal.diffCanvas = ctxDiff.canvas, retVal.totalPixels = totalPixelCount, retVal.numPixelsDifferent = diffPixelCount, retVal.percentageImageDifferent = diffPixelCount / totalPixelCount * 100, retVal.affectedQuads = pixelAnalyizer.getAffectedQuads(), callback(retVal)
            },
            diff2 = function() {
                var widths = [],
                    heights = [];
                sourceImages.forEach(function(x) {
                    widths.push(x.getCtx().canvas.width), heights.push(x.getCtx().canvas.height)
                });
                var newWidth = Math.max.apply(Math, widths),
                    newHeight = Math.max.apply(Math, heights),
                    canvasDiff = document.createElement("canvas");
                canvasDiff.width = newWidth, canvasDiff.height = newHeight, ctxDiff = canvasDiff.getContext("2d"), pixelAnalyizer = new PixelAnalyizer(newWidth, newHeight, blockSize);
                var imgPixels = [];
                sourceImages.forEach(function(img) {
                    imgPixels.push(img.getImgData())
                });
                var imgDiffData = ctxDiff.createImageData(ctxDiff.canvas.width, ctxDiff.canvas.height),
                    imgDiffPixels = imgDiffData.data;
                diffPixelCount = 0, totalPixelCount = imgDiffPixels.length / 4;
                var i;
                for (i = 0; i < imgDiffPixels.length; i += 4) {
                    var pixelData = pixelAnalyizer.getPixelData(i / 4);
                    if (pixelAnalyizer.checkQuad(pixelData)) i = 4 * pixelAnalyizer.nextBlock(i / 4);
                    else try {
                        var j, isEqual = !0,
                            imgR = imgPixels[0][i],
                            imgG = imgPixels[0][i + 1],
                            imgB = imgPixels[0][i + 2],
                            imgA = imgPixels[0][i + 3];
                        for (j = 1; j < imgPixels.length; j++) isEqual && imgR === imgPixels[j][i] && imgG === imgPixels[j][i + 1] && imgB === imgPixels[j][i + 2] && imgA === imgPixels[j][i + 3] || pixelAnalyizer.markBlockTainted(pixelData)
                    } catch (err) {}
                }
                returnOutput()
            },
            resolveImgs = function() {
                imgsResolvedCount += 1, imgsResolvedCount === totalImgs && diff2()
            },
            parseArgs = function(imgs, userCallback, userOptions, blockOptions) {
                callback = userCallback;
                var options = userOptions || {},
                    blockOpts = blockOptions || {};
                if (imgs.length < 2) throw "You must supply at least two images to compare.";
                imgsResolvedCount = 0, totalImgs = imgs.length;
                var i;
                for (i = 0; i < imgs.length; i++) sourceImages.push(new ImgWrapper(imgs[i], resolveImgs));
                var color = options.diffColor || "rgb(255,0,0)";
                diffColor = colorHelper.parseColor(color), blockSize = blockOpts.blockSize || 50
            };
        parseArgs(imgs, userCallback, userOptions, blockOptions)
    }, jsImageDiff
}(document, window);
URL = this.URL || this.webkitURL;