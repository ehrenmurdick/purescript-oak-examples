(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };

  // node_modules/x-is-array/index.js
  var require_x_is_array = __commonJS({
    "node_modules/x-is-array/index.js"(exports, module) {
      var nativeIsArray = Array.isArray;
      var toString = Object.prototype.toString;
      module.exports = nativeIsArray || isArray;
      function isArray(obj) {
        return toString.call(obj) === "[object Array]";
      }
    }
  });

  // node_modules/virtual-dom/vnode/version.js
  var require_version = __commonJS({
    "node_modules/virtual-dom/vnode/version.js"(exports, module) {
      module.exports = "2";
    }
  });

  // node_modules/virtual-dom/vnode/is-vnode.js
  var require_is_vnode = __commonJS({
    "node_modules/virtual-dom/vnode/is-vnode.js"(exports, module) {
      var version = require_version();
      module.exports = isVirtualNode;
      function isVirtualNode(x) {
        return x && x.type === "VirtualNode" && x.version === version;
      }
    }
  });

  // node_modules/virtual-dom/vnode/is-widget.js
  var require_is_widget = __commonJS({
    "node_modules/virtual-dom/vnode/is-widget.js"(exports, module) {
      module.exports = isWidget;
      function isWidget(w) {
        return w && w.type === "Widget";
      }
    }
  });

  // node_modules/virtual-dom/vnode/is-thunk.js
  var require_is_thunk = __commonJS({
    "node_modules/virtual-dom/vnode/is-thunk.js"(exports, module) {
      module.exports = isThunk;
      function isThunk(t) {
        return t && t.type === "Thunk";
      }
    }
  });

  // node_modules/virtual-dom/vnode/is-vhook.js
  var require_is_vhook = __commonJS({
    "node_modules/virtual-dom/vnode/is-vhook.js"(exports, module) {
      module.exports = isHook;
      function isHook(hook) {
        return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
      }
    }
  });

  // node_modules/virtual-dom/vnode/vnode.js
  var require_vnode = __commonJS({
    "node_modules/virtual-dom/vnode/vnode.js"(exports, module) {
      var version = require_version();
      var isVNode = require_is_vnode();
      var isWidget = require_is_widget();
      var isThunk = require_is_thunk();
      var isVHook = require_is_vhook();
      module.exports = VirtualNode;
      var noProperties = {};
      var noChildren = [];
      function VirtualNode(tagName, properties, children, key, namespace) {
        this.tagName = tagName;
        this.properties = properties || noProperties;
        this.children = children || noChildren;
        this.key = key != null ? String(key) : void 0;
        this.namespace = typeof namespace === "string" ? namespace : null;
        var count = children && children.length || 0;
        var descendants = 0;
        var hasWidgets = false;
        var hasThunks = false;
        var descendantHooks = false;
        var hooks;
        for (var propName in properties) {
          if (properties.hasOwnProperty(propName)) {
            var property = properties[propName];
            if (isVHook(property) && property.unhook) {
              if (!hooks) {
                hooks = {};
              }
              hooks[propName] = property;
            }
          }
        }
        for (var i2 = 0; i2 < count; i2++) {
          var child = children[i2];
          if (isVNode(child)) {
            descendants += child.count || 0;
            if (!hasWidgets && child.hasWidgets) {
              hasWidgets = true;
            }
            if (!hasThunks && child.hasThunks) {
              hasThunks = true;
            }
            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
              descendantHooks = true;
            }
          } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
              hasWidgets = true;
            }
          } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
          }
        }
        this.count = count + descendants;
        this.hasWidgets = hasWidgets;
        this.hasThunks = hasThunks;
        this.hooks = hooks;
        this.descendantHooks = descendantHooks;
      }
      VirtualNode.prototype.version = version;
      VirtualNode.prototype.type = "VirtualNode";
    }
  });

  // node_modules/virtual-dom/vnode/vtext.js
  var require_vtext = __commonJS({
    "node_modules/virtual-dom/vnode/vtext.js"(exports, module) {
      var version = require_version();
      module.exports = VirtualText;
      function VirtualText(text3) {
        this.text = String(text3);
      }
      VirtualText.prototype.version = version;
      VirtualText.prototype.type = "VirtualText";
    }
  });

  // node_modules/virtual-dom/vnode/is-vtext.js
  var require_is_vtext = __commonJS({
    "node_modules/virtual-dom/vnode/is-vtext.js"(exports, module) {
      var version = require_version();
      module.exports = isVirtualText;
      function isVirtualText(x) {
        return x && x.type === "VirtualText" && x.version === version;
      }
    }
  });

  // node_modules/browser-split/index.js
  var require_browser_split = __commonJS({
    "node_modules/browser-split/index.js"(exports, module) {
      module.exports = function split(undef) {
        var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, self;
        self = function(str, separator, limit) {
          if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
            return nativeSplit.call(str, separator, limit);
          }
          var output2 = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
          (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
          str += "";
          if (!compliantExecNpcg) {
            separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
          }
          limit = limit === undef ? -1 >>> 0 : (
            // Math.pow(2, 32) - 1
            limit >>> 0
          );
          while (match = separator.exec(str)) {
            lastIndex = match.index + match[0].length;
            if (lastIndex > lastLastIndex) {
              output2.push(str.slice(lastLastIndex, match.index));
              if (!compliantExecNpcg && match.length > 1) {
                match[0].replace(separator2, function() {
                  for (var i2 = 1; i2 < arguments.length - 2; i2++) {
                    if (arguments[i2] === undef) {
                      match[i2] = undef;
                    }
                  }
                });
              }
              if (match.length > 1 && match.index < str.length) {
                Array.prototype.push.apply(output2, match.slice(1));
              }
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output2.length >= limit) {
                break;
              }
            }
            if (separator.lastIndex === match.index) {
              separator.lastIndex++;
            }
          }
          if (lastLastIndex === str.length) {
            if (lastLength || !separator.test("")) {
              output2.push("");
            }
          } else {
            output2.push(str.slice(lastLastIndex));
          }
          return output2.length > limit ? output2.slice(0, limit) : output2;
        };
        return self;
      }();
    }
  });

  // node_modules/virtual-dom/virtual-hyperscript/parse-tag.js
  var require_parse_tag = __commonJS({
    "node_modules/virtual-dom/virtual-hyperscript/parse-tag.js"(exports, module) {
      "use strict";
      var split = require_browser_split();
      var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
      var notClassId = /^\.|#/;
      module.exports = parseTag;
      function parseTag(tag, props) {
        if (!tag) {
          return "DIV";
        }
        var noId = !props.hasOwnProperty("id");
        var tagParts = split(tag, classIdSplit);
        var tagName = null;
        if (notClassId.test(tagParts[1])) {
          tagName = "DIV";
        }
        var classes, part, type, i2;
        for (i2 = 0; i2 < tagParts.length; i2++) {
          part = tagParts[i2];
          if (!part) {
            continue;
          }
          type = part.charAt(0);
          if (!tagName) {
            tagName = part;
          } else if (type === ".") {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
          } else if (type === "#" && noId) {
            props.id = part.substring(1, part.length);
          }
        }
        if (classes) {
          if (props.className) {
            classes.push(props.className);
          }
          props.className = classes.join(" ");
        }
        return props.namespace ? tagName : tagName.toUpperCase();
      }
    }
  });

  // node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js
  var require_soft_set_hook = __commonJS({
    "node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js"(exports, module) {
      "use strict";
      module.exports = SoftSetHook;
      function SoftSetHook(value) {
        if (!(this instanceof SoftSetHook)) {
          return new SoftSetHook(value);
        }
        this.value = value;
      }
      SoftSetHook.prototype.hook = function(node, propertyName) {
        if (node[propertyName] !== this.value) {
          node[propertyName] = this.value;
        }
      };
    }
  });

  // node_modules/individual/index.js
  var require_individual = __commonJS({
    "node_modules/individual/index.js"(exports, module) {
      "use strict";
      var root = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
      module.exports = Individual;
      function Individual(key, value) {
        if (key in root) {
          return root[key];
        }
        root[key] = value;
        return value;
      }
    }
  });

  // node_modules/individual/one-version.js
  var require_one_version = __commonJS({
    "node_modules/individual/one-version.js"(exports, module) {
      "use strict";
      var Individual = require_individual();
      module.exports = OneVersion;
      function OneVersion(moduleName, version, defaultValue) {
        var key = "__INDIVIDUAL_ONE_VERSION_" + moduleName;
        var enforceKey = key + "_ENFORCE_SINGLETON";
        var versionValue = Individual(enforceKey, version);
        if (versionValue !== version) {
          throw new Error("Can only have one copy of " + moduleName + ".\nYou already have version " + versionValue + " installed.\nThis means you cannot install version " + version);
        }
        return Individual(key, defaultValue);
      }
    }
  });

  // node_modules/ev-store/index.js
  var require_ev_store = __commonJS({
    "node_modules/ev-store/index.js"(exports, module) {
      "use strict";
      var OneVersionConstraint = require_one_version();
      var MY_VERSION = "7";
      OneVersionConstraint("ev-store", MY_VERSION);
      var hashKey = "__EV_STORE_KEY@" + MY_VERSION;
      module.exports = EvStore;
      function EvStore(elem2) {
        var hash = elem2[hashKey];
        if (!hash) {
          hash = elem2[hashKey] = {};
        }
        return hash;
      }
    }
  });

  // node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js
  var require_ev_hook = __commonJS({
    "node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js"(exports, module) {
      "use strict";
      var EvStore = require_ev_store();
      module.exports = EvHook;
      function EvHook(value) {
        if (!(this instanceof EvHook)) {
          return new EvHook(value);
        }
        this.value = value;
      }
      EvHook.prototype.hook = function(node, propertyName) {
        var es = EvStore(node);
        var propName = propertyName.substr(3);
        es[propName] = this.value;
      };
      EvHook.prototype.unhook = function(node, propertyName) {
        var es = EvStore(node);
        var propName = propertyName.substr(3);
        es[propName] = void 0;
      };
    }
  });

  // node_modules/virtual-dom/virtual-hyperscript/index.js
  var require_virtual_hyperscript = __commonJS({
    "node_modules/virtual-dom/virtual-hyperscript/index.js"(exports, module) {
      "use strict";
      var isArray = require_x_is_array();
      var VNode = require_vnode();
      var VText = require_vtext();
      var isVNode = require_is_vnode();
      var isVText = require_is_vtext();
      var isWidget = require_is_widget();
      var isHook = require_is_vhook();
      var isVThunk = require_is_thunk();
      var parseTag = require_parse_tag();
      var softSetHook = require_soft_set_hook();
      var evHook = require_ev_hook();
      module.exports = h7;
      function h7(tagName, properties, children) {
        var childNodes = [];
        var tag, props, key, namespace;
        if (!children && isChildren(properties)) {
          children = properties;
          props = {};
        }
        props = props || properties || {};
        tag = parseTag(tagName, props);
        if (props.hasOwnProperty("key")) {
          key = props.key;
          props.key = void 0;
        }
        if (props.hasOwnProperty("namespace")) {
          namespace = props.namespace;
          props.namespace = void 0;
        }
        if (tag === "INPUT" && !namespace && props.hasOwnProperty("value") && props.value !== void 0 && !isHook(props.value)) {
          props.value = softSetHook(props.value);
        }
        transformProperties(props);
        if (children !== void 0 && children !== null) {
          addChild(children, childNodes, tag, props);
        }
        return new VNode(tag, props, childNodes, key, namespace);
      }
      function addChild(c, childNodes, tag, props) {
        if (typeof c === "string") {
          childNodes.push(new VText(c));
        } else if (typeof c === "number") {
          childNodes.push(new VText(String(c)));
        } else if (isChild(c)) {
          childNodes.push(c);
        } else if (isArray(c)) {
          for (var i2 = 0; i2 < c.length; i2++) {
            addChild(c[i2], childNodes, tag, props);
          }
        } else if (c === null || c === void 0) {
          return;
        } else {
          throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
              tagName: tag,
              properties: props
            }
          });
        }
      }
      function transformProperties(props) {
        for (var propName in props) {
          if (props.hasOwnProperty(propName)) {
            var value = props[propName];
            if (isHook(value)) {
              continue;
            }
            if (propName.substr(0, 3) === "ev-") {
              props[propName] = evHook(value);
            }
          }
        }
      }
      function isChild(x) {
        return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
      }
      function isChildren(x) {
        return typeof x === "string" || isArray(x) || isChild(x);
      }
      function UnexpectedVirtualElement(data) {
        var err = new Error();
        err.type = "virtual-hyperscript.unexpected.virtual-element";
        err.message = "Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n" + errorString(data.foreignObject) + ".\nThe parent vnode is:\n" + errorString(data.parentVnode);
        err.foreignObject = data.foreignObject;
        err.parentVnode = data.parentVnode;
        return err;
      }
      function errorString(obj) {
        try {
          return JSON.stringify(obj, null, "    ");
        } catch (e) {
          return String(obj);
        }
      }
    }
  });

  // node_modules/virtual-dom/h.js
  var require_h = __commonJS({
    "node_modules/virtual-dom/h.js"(exports, module) {
      var h7 = require_virtual_hyperscript();
      module.exports = h7;
    }
  });

  // node_modules/virtual-dom/vnode/vpatch.js
  var require_vpatch = __commonJS({
    "node_modules/virtual-dom/vnode/vpatch.js"(exports, module) {
      var version = require_version();
      VirtualPatch.NONE = 0;
      VirtualPatch.VTEXT = 1;
      VirtualPatch.VNODE = 2;
      VirtualPatch.WIDGET = 3;
      VirtualPatch.PROPS = 4;
      VirtualPatch.ORDER = 5;
      VirtualPatch.INSERT = 6;
      VirtualPatch.REMOVE = 7;
      VirtualPatch.THUNK = 8;
      module.exports = VirtualPatch;
      function VirtualPatch(type, vNode, patch4) {
        this.type = Number(type);
        this.vNode = vNode;
        this.patch = patch4;
      }
      VirtualPatch.prototype.version = version;
      VirtualPatch.prototype.type = "VirtualPatch";
    }
  });

  // node_modules/virtual-dom/vnode/handle-thunk.js
  var require_handle_thunk = __commonJS({
    "node_modules/virtual-dom/vnode/handle-thunk.js"(exports, module) {
      var isVNode = require_is_vnode();
      var isVText = require_is_vtext();
      var isWidget = require_is_widget();
      var isThunk = require_is_thunk();
      module.exports = handleThunk;
      function handleThunk(a2, b2) {
        var renderedA = a2;
        var renderedB = b2;
        if (isThunk(b2)) {
          renderedB = renderThunk(b2, a2);
        }
        if (isThunk(a2)) {
          renderedA = renderThunk(a2, null);
        }
        return {
          a: renderedA,
          b: renderedB
        };
      }
      function renderThunk(thunk, previous) {
        var renderedThunk = thunk.vnode;
        if (!renderedThunk) {
          renderedThunk = thunk.vnode = thunk.render(previous);
        }
        if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
          throw new Error("thunk did not return a valid node");
        }
        return renderedThunk;
      }
    }
  });

  // node_modules/is-object/index.js
  var require_is_object = __commonJS({
    "node_modules/is-object/index.js"(exports, module) {
      "use strict";
      module.exports = function isObject(x) {
        return typeof x === "object" && x !== null;
      };
    }
  });

  // node_modules/virtual-dom/vtree/diff-props.js
  var require_diff_props = __commonJS({
    "node_modules/virtual-dom/vtree/diff-props.js"(exports, module) {
      var isObject = require_is_object();
      var isHook = require_is_vhook();
      module.exports = diffProps;
      function diffProps(a2, b2) {
        var diff2;
        for (var aKey in a2) {
          if (!(aKey in b2)) {
            diff2 = diff2 || {};
            diff2[aKey] = void 0;
          }
          var aValue = a2[aKey];
          var bValue = b2[aKey];
          if (aValue === bValue) {
            continue;
          } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
              diff2 = diff2 || {};
              diff2[aKey] = bValue;
            } else if (isHook(bValue)) {
              diff2 = diff2 || {};
              diff2[aKey] = bValue;
            } else {
              var objectDiff = diffProps(aValue, bValue);
              if (objectDiff) {
                diff2 = diff2 || {};
                diff2[aKey] = objectDiff;
              }
            }
          } else {
            diff2 = diff2 || {};
            diff2[aKey] = bValue;
          }
        }
        for (var bKey in b2) {
          if (!(bKey in a2)) {
            diff2 = diff2 || {};
            diff2[bKey] = b2[bKey];
          }
        }
        return diff2;
      }
      function getPrototype(value) {
        if (Object.getPrototypeOf) {
          return Object.getPrototypeOf(value);
        } else if (value.__proto__) {
          return value.__proto__;
        } else if (value.constructor) {
          return value.constructor.prototype;
        }
      }
    }
  });

  // node_modules/virtual-dom/vtree/diff.js
  var require_diff = __commonJS({
    "node_modules/virtual-dom/vtree/diff.js"(exports, module) {
      var isArray = require_x_is_array();
      var VPatch = require_vpatch();
      var isVNode = require_is_vnode();
      var isVText = require_is_vtext();
      var isWidget = require_is_widget();
      var isThunk = require_is_thunk();
      var handleThunk = require_handle_thunk();
      var diffProps = require_diff_props();
      module.exports = diff2;
      function diff2(a2, b2) {
        var patch4 = { a: a2 };
        walk(a2, b2, patch4, 0);
        return patch4;
      }
      function walk(a2, b2, patch4, index) {
        if (a2 === b2) {
          return;
        }
        var apply2 = patch4[index];
        var applyClear = false;
        if (isThunk(a2) || isThunk(b2)) {
          thunks(a2, b2, patch4, index);
        } else if (b2 == null) {
          if (!isWidget(a2)) {
            clearState(a2, patch4, index);
            apply2 = patch4[index];
          }
          apply2 = appendPatch(apply2, new VPatch(VPatch.REMOVE, a2, b2));
        } else if (isVNode(b2)) {
          if (isVNode(a2)) {
            if (a2.tagName === b2.tagName && a2.namespace === b2.namespace && a2.key === b2.key) {
              var propsPatch = diffProps(a2.properties, b2.properties);
              if (propsPatch) {
                apply2 = appendPatch(
                  apply2,
                  new VPatch(VPatch.PROPS, a2, propsPatch)
                );
              }
              apply2 = diffChildren(a2, b2, patch4, apply2, index);
            } else {
              apply2 = appendPatch(apply2, new VPatch(VPatch.VNODE, a2, b2));
              applyClear = true;
            }
          } else {
            apply2 = appendPatch(apply2, new VPatch(VPatch.VNODE, a2, b2));
            applyClear = true;
          }
        } else if (isVText(b2)) {
          if (!isVText(a2)) {
            apply2 = appendPatch(apply2, new VPatch(VPatch.VTEXT, a2, b2));
            applyClear = true;
          } else if (a2.text !== b2.text) {
            apply2 = appendPatch(apply2, new VPatch(VPatch.VTEXT, a2, b2));
          }
        } else if (isWidget(b2)) {
          if (!isWidget(a2)) {
            applyClear = true;
          }
          apply2 = appendPatch(apply2, new VPatch(VPatch.WIDGET, a2, b2));
        }
        if (apply2) {
          patch4[index] = apply2;
        }
        if (applyClear) {
          clearState(a2, patch4, index);
        }
      }
      function diffChildren(a2, b2, patch4, apply2, index) {
        var aChildren = a2.children;
        var orderedSet = reorder(aChildren, b2.children);
        var bChildren = orderedSet.children;
        var aLen = aChildren.length;
        var bLen = bChildren.length;
        var len = aLen > bLen ? aLen : bLen;
        for (var i2 = 0; i2 < len; i2++) {
          var leftNode = aChildren[i2];
          var rightNode = bChildren[i2];
          index += 1;
          if (!leftNode) {
            if (rightNode) {
              apply2 = appendPatch(
                apply2,
                new VPatch(VPatch.INSERT, null, rightNode)
              );
            }
          } else {
            walk(leftNode, rightNode, patch4, index);
          }
          if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count;
          }
        }
        if (orderedSet.moves) {
          apply2 = appendPatch(apply2, new VPatch(
            VPatch.ORDER,
            a2,
            orderedSet.moves
          ));
        }
        return apply2;
      }
      function clearState(vNode, patch4, index) {
        unhook(vNode, patch4, index);
        destroyWidgets(vNode, patch4, index);
      }
      function destroyWidgets(vNode, patch4, index) {
        if (isWidget(vNode)) {
          if (typeof vNode.destroy === "function") {
            patch4[index] = appendPatch(
              patch4[index],
              new VPatch(VPatch.REMOVE, vNode, null)
            );
          }
        } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
          var children = vNode.children;
          var len = children.length;
          for (var i2 = 0; i2 < len; i2++) {
            var child = children[i2];
            index += 1;
            destroyWidgets(child, patch4, index);
            if (isVNode(child) && child.count) {
              index += child.count;
            }
          }
        } else if (isThunk(vNode)) {
          thunks(vNode, null, patch4, index);
        }
      }
      function thunks(a2, b2, patch4, index) {
        var nodes = handleThunk(a2, b2);
        var thunkPatch = diff2(nodes.a, nodes.b);
        if (hasPatches(thunkPatch)) {
          patch4[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
        }
      }
      function hasPatches(patch4) {
        for (var index in patch4) {
          if (index !== "a") {
            return true;
          }
        }
        return false;
      }
      function unhook(vNode, patch4, index) {
        if (isVNode(vNode)) {
          if (vNode.hooks) {
            patch4[index] = appendPatch(
              patch4[index],
              new VPatch(
                VPatch.PROPS,
                vNode,
                undefinedKeys(vNode.hooks)
              )
            );
          }
          if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children;
            var len = children.length;
            for (var i2 = 0; i2 < len; i2++) {
              var child = children[i2];
              index += 1;
              unhook(child, patch4, index);
              if (isVNode(child) && child.count) {
                index += child.count;
              }
            }
          }
        } else if (isThunk(vNode)) {
          thunks(vNode, null, patch4, index);
        }
      }
      function undefinedKeys(obj) {
        var result = {};
        for (var key in obj) {
          result[key] = void 0;
        }
        return result;
      }
      function reorder(aChildren, bChildren) {
        var bChildIndex = keyIndex(bChildren);
        var bKeys = bChildIndex.keys;
        var bFree = bChildIndex.free;
        if (bFree.length === bChildren.length) {
          return {
            children: bChildren,
            moves: null
          };
        }
        var aChildIndex = keyIndex(aChildren);
        var aKeys = aChildIndex.keys;
        var aFree = aChildIndex.free;
        if (aFree.length === aChildren.length) {
          return {
            children: bChildren,
            moves: null
          };
        }
        var newChildren = [];
        var freeIndex = 0;
        var freeCount = bFree.length;
        var deletedItems = 0;
        for (var i2 = 0; i2 < aChildren.length; i2++) {
          var aItem = aChildren[i2];
          var itemIndex;
          if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
              itemIndex = bKeys[aItem.key];
              newChildren.push(bChildren[itemIndex]);
            } else {
              itemIndex = i2 - deletedItems++;
              newChildren.push(null);
            }
          } else {
            if (freeIndex < freeCount) {
              itemIndex = bFree[freeIndex++];
              newChildren.push(bChildren[itemIndex]);
            } else {
              itemIndex = i2 - deletedItems++;
              newChildren.push(null);
            }
          }
        }
        var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
        for (var j = 0; j < bChildren.length; j++) {
          var newItem = bChildren[j];
          if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
              newChildren.push(newItem);
            }
          } else if (j >= lastFreeIndex) {
            newChildren.push(newItem);
          }
        }
        var simulate = newChildren.slice();
        var simulateIndex = 0;
        var removes = [];
        var inserts = [];
        var simulateItem;
        for (var k = 0; k < bChildren.length; ) {
          var wantedItem = bChildren[k];
          simulateItem = simulate[simulateIndex];
          while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null));
            simulateItem = simulate[simulateIndex];
          }
          if (!simulateItem || simulateItem.key !== wantedItem.key) {
            if (wantedItem.key) {
              if (simulateItem && simulateItem.key) {
                if (bKeys[simulateItem.key] !== k + 1) {
                  removes.push(remove(simulate, simulateIndex, simulateItem.key));
                  simulateItem = simulate[simulateIndex];
                  if (!simulateItem || simulateItem.key !== wantedItem.key) {
                    inserts.push({ key: wantedItem.key, to: k });
                  } else {
                    simulateIndex++;
                  }
                } else {
                  inserts.push({ key: wantedItem.key, to: k });
                }
              } else {
                inserts.push({ key: wantedItem.key, to: k });
              }
              k++;
            } else if (simulateItem && simulateItem.key) {
              removes.push(remove(simulate, simulateIndex, simulateItem.key));
            }
          } else {
            simulateIndex++;
            k++;
          }
        }
        while (simulateIndex < simulate.length) {
          simulateItem = simulate[simulateIndex];
          removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
        }
        if (removes.length === deletedItems && !inserts.length) {
          return {
            children: newChildren,
            moves: null
          };
        }
        return {
          children: newChildren,
          moves: {
            removes,
            inserts
          }
        };
      }
      function remove(arr, index, key) {
        arr.splice(index, 1);
        return {
          from: index,
          key
        };
      }
      function keyIndex(children) {
        var keys = {};
        var free = [];
        var length = children.length;
        for (var i2 = 0; i2 < length; i2++) {
          var child = children[i2];
          if (child.key) {
            keys[child.key] = i2;
          } else {
            free.push(i2);
          }
        }
        return {
          keys,
          // A hash of key name to index
          free
          // An array of unkeyed item indices
        };
      }
      function appendPatch(apply2, patch4) {
        if (apply2) {
          if (isArray(apply2)) {
            apply2.push(patch4);
          } else {
            apply2 = [apply2, patch4];
          }
          return apply2;
        } else {
          return patch4;
        }
      }
    }
  });

  // node_modules/virtual-dom/diff.js
  var require_diff2 = __commonJS({
    "node_modules/virtual-dom/diff.js"(exports, module) {
      var diff2 = require_diff();
      module.exports = diff2;
    }
  });

  // (disabled):node_modules/min-document/index.js
  var require_min_document = __commonJS({
    "(disabled):node_modules/min-document/index.js"() {
    }
  });

  // node_modules/global/document.js
  var require_document = __commonJS({
    "node_modules/global/document.js"(exports, module) {
      var topLevel = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
      var minDoc = require_min_document();
      var doccy;
      if (typeof document !== "undefined") {
        doccy = document;
      } else {
        doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
        if (!doccy) {
          doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
        }
      }
      module.exports = doccy;
    }
  });

  // node_modules/virtual-dom/vdom/apply-properties.js
  var require_apply_properties = __commonJS({
    "node_modules/virtual-dom/vdom/apply-properties.js"(exports, module) {
      var isObject = require_is_object();
      var isHook = require_is_vhook();
      module.exports = applyProperties;
      function applyProperties(node, props, previous) {
        for (var propName in props) {
          var propValue = props[propName];
          if (propValue === void 0) {
            removeProperty(node, propName, propValue, previous);
          } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous);
            if (propValue.hook) {
              propValue.hook(
                node,
                propName,
                previous ? previous[propName] : void 0
              );
            }
          } else {
            if (isObject(propValue)) {
              patchObject(node, props, previous, propName, propValue);
            } else {
              node[propName] = propValue;
            }
          }
        }
      }
      function removeProperty(node, propName, propValue, previous) {
        if (previous) {
          var previousValue = previous[propName];
          if (!isHook(previousValue)) {
            if (propName === "attributes") {
              for (var attrName in previousValue) {
                node.removeAttribute(attrName);
              }
            } else if (propName === "style") {
              for (var i2 in previousValue) {
                node.style[i2] = "";
              }
            } else if (typeof previousValue === "string") {
              node[propName] = "";
            } else {
              node[propName] = null;
            }
          } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue);
          }
        }
      }
      function patchObject(node, props, previous, propName, propValue) {
        var previousValue = previous ? previous[propName] : void 0;
        if (propName === "attributes") {
          for (var attrName in propValue) {
            var attrValue = propValue[attrName];
            if (attrValue === void 0) {
              node.removeAttribute(attrName);
            } else {
              node.setAttribute(attrName, attrValue);
            }
          }
          return;
        }
        if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
          node[propName] = propValue;
          return;
        }
        if (!isObject(node[propName])) {
          node[propName] = {};
        }
        var replacer = propName === "style" ? "" : void 0;
        for (var k in propValue) {
          var value = propValue[k];
          node[propName][k] = value === void 0 ? replacer : value;
        }
      }
      function getPrototype(value) {
        if (Object.getPrototypeOf) {
          return Object.getPrototypeOf(value);
        } else if (value.__proto__) {
          return value.__proto__;
        } else if (value.constructor) {
          return value.constructor.prototype;
        }
      }
    }
  });

  // node_modules/virtual-dom/vdom/create-element.js
  var require_create_element = __commonJS({
    "node_modules/virtual-dom/vdom/create-element.js"(exports, module) {
      var document2 = require_document();
      var applyProperties = require_apply_properties();
      var isVNode = require_is_vnode();
      var isVText = require_is_vtext();
      var isWidget = require_is_widget();
      var handleThunk = require_handle_thunk();
      module.exports = createElement2;
      function createElement2(vnode, opts) {
        var doc = opts ? opts.document || document2 : document2;
        var warn = opts ? opts.warn : null;
        vnode = handleThunk(vnode).a;
        if (isWidget(vnode)) {
          return vnode.init();
        } else if (isVText(vnode)) {
          return doc.createTextNode(vnode.text);
        } else if (!isVNode(vnode)) {
          if (warn) {
            warn("Item is not a valid virtual dom node", vnode);
          }
          return null;
        }
        var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
        var props = vnode.properties;
        applyProperties(node, props);
        var children = vnode.children;
        for (var i2 = 0; i2 < children.length; i2++) {
          var childNode = createElement2(children[i2], opts);
          if (childNode) {
            node.appendChild(childNode);
          }
        }
        return node;
      }
    }
  });

  // node_modules/virtual-dom/vdom/dom-index.js
  var require_dom_index = __commonJS({
    "node_modules/virtual-dom/vdom/dom-index.js"(exports, module) {
      var noChild = {};
      module.exports = domIndex;
      function domIndex(rootNode, tree, indices, nodes) {
        if (!indices || indices.length === 0) {
          return {};
        } else {
          indices.sort(ascending);
          return recurse(rootNode, tree, indices, nodes, 0);
        }
      }
      function recurse(rootNode, tree, indices, nodes, rootIndex) {
        nodes = nodes || {};
        if (rootNode) {
          if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode;
          }
          var vChildren = tree.children;
          if (vChildren) {
            var childNodes = rootNode.childNodes;
            for (var i2 = 0; i2 < tree.children.length; i2++) {
              rootIndex += 1;
              var vChild = vChildren[i2] || noChild;
              var nextIndex = rootIndex + (vChild.count || 0);
              if (indexInRange(indices, rootIndex, nextIndex)) {
                recurse(childNodes[i2], vChild, indices, nodes, rootIndex);
              }
              rootIndex = nextIndex;
            }
          }
        }
        return nodes;
      }
      function indexInRange(indices, left, right) {
        if (indices.length === 0) {
          return false;
        }
        var minIndex = 0;
        var maxIndex = indices.length - 1;
        var currentIndex;
        var currentItem;
        while (minIndex <= maxIndex) {
          currentIndex = (maxIndex + minIndex) / 2 >> 0;
          currentItem = indices[currentIndex];
          if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right;
          } else if (currentItem < left) {
            minIndex = currentIndex + 1;
          } else if (currentItem > right) {
            maxIndex = currentIndex - 1;
          } else {
            return true;
          }
        }
        return false;
      }
      function ascending(a2, b2) {
        return a2 > b2 ? 1 : -1;
      }
    }
  });

  // node_modules/virtual-dom/vdom/update-widget.js
  var require_update_widget = __commonJS({
    "node_modules/virtual-dom/vdom/update-widget.js"(exports, module) {
      var isWidget = require_is_widget();
      module.exports = updateWidget;
      function updateWidget(a2, b2) {
        if (isWidget(a2) && isWidget(b2)) {
          if ("name" in a2 && "name" in b2) {
            return a2.id === b2.id;
          } else {
            return a2.init === b2.init;
          }
        }
        return false;
      }
    }
  });

  // node_modules/virtual-dom/vdom/patch-op.js
  var require_patch_op = __commonJS({
    "node_modules/virtual-dom/vdom/patch-op.js"(exports, module) {
      var applyProperties = require_apply_properties();
      var isWidget = require_is_widget();
      var VPatch = require_vpatch();
      var updateWidget = require_update_widget();
      module.exports = applyPatch;
      function applyPatch(vpatch, domNode, renderOptions) {
        var type = vpatch.type;
        var vNode = vpatch.vNode;
        var patch4 = vpatch.patch;
        switch (type) {
          case VPatch.REMOVE:
            return removeNode(domNode, vNode);
          case VPatch.INSERT:
            return insertNode(domNode, patch4, renderOptions);
          case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch4, renderOptions);
          case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch4, renderOptions);
          case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch4, renderOptions);
          case VPatch.ORDER:
            reorderChildren(domNode, patch4);
            return domNode;
          case VPatch.PROPS:
            applyProperties(domNode, patch4, vNode.properties);
            return domNode;
          case VPatch.THUNK:
            return replaceRoot(
              domNode,
              renderOptions.patch(domNode, patch4, renderOptions)
            );
          default:
            return domNode;
        }
      }
      function removeNode(domNode, vNode) {
        var parentNode = domNode.parentNode;
        if (parentNode) {
          parentNode.removeChild(domNode);
        }
        destroyWidget(domNode, vNode);
        return null;
      }
      function insertNode(parentNode, vNode, renderOptions) {
        var newNode = renderOptions.render(vNode, renderOptions);
        if (parentNode) {
          parentNode.appendChild(newNode);
        }
        return parentNode;
      }
      function stringPatch(domNode, leftVNode, vText, renderOptions) {
        var newNode;
        if (domNode.nodeType === 3) {
          domNode.replaceData(0, domNode.length, vText.text);
          newNode = domNode;
        } else {
          var parentNode = domNode.parentNode;
          newNode = renderOptions.render(vText, renderOptions);
          if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
          }
        }
        return newNode;
      }
      function widgetPatch(domNode, leftVNode, widget, renderOptions) {
        var updating = updateWidget(leftVNode, widget);
        var newNode;
        if (updating) {
          newNode = widget.update(leftVNode, domNode) || domNode;
        } else {
          newNode = renderOptions.render(widget, renderOptions);
        }
        var parentNode = domNode.parentNode;
        if (parentNode && newNode !== domNode) {
          parentNode.replaceChild(newNode, domNode);
        }
        if (!updating) {
          destroyWidget(domNode, leftVNode);
        }
        return newNode;
      }
      function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
        var parentNode = domNode.parentNode;
        var newNode = renderOptions.render(vNode, renderOptions);
        if (parentNode && newNode !== domNode) {
          parentNode.replaceChild(newNode, domNode);
        }
        return newNode;
      }
      function destroyWidget(domNode, w) {
        if (typeof w.destroy === "function" && isWidget(w)) {
          w.destroy(domNode);
        }
      }
      function reorderChildren(domNode, moves) {
        var childNodes = domNode.childNodes;
        var keyMap = {};
        var node;
        var remove;
        var insert;
        for (var i2 = 0; i2 < moves.removes.length; i2++) {
          remove = moves.removes[i2];
          node = childNodes[remove.from];
          if (remove.key) {
            keyMap[remove.key] = node;
          }
          domNode.removeChild(node);
        }
        var length = childNodes.length;
        for (var j = 0; j < moves.inserts.length; j++) {
          insert = moves.inserts[j];
          node = keyMap[insert.key];
          domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
        }
      }
      function replaceRoot(oldRoot, newRoot) {
        if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
          oldRoot.parentNode.replaceChild(newRoot, oldRoot);
        }
        return newRoot;
      }
    }
  });

  // node_modules/virtual-dom/vdom/patch.js
  var require_patch = __commonJS({
    "node_modules/virtual-dom/vdom/patch.js"(exports, module) {
      var document2 = require_document();
      var isArray = require_x_is_array();
      var render3 = require_create_element();
      var domIndex = require_dom_index();
      var patchOp = require_patch_op();
      module.exports = patch4;
      function patch4(rootNode, patches, renderOptions) {
        renderOptions = renderOptions || {};
        renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch4 ? renderOptions.patch : patchRecursive;
        renderOptions.render = renderOptions.render || render3;
        return renderOptions.patch(rootNode, patches, renderOptions);
      }
      function patchRecursive(rootNode, patches, renderOptions) {
        var indices = patchIndices(patches);
        if (indices.length === 0) {
          return rootNode;
        }
        var index = domIndex(rootNode, patches.a, indices);
        var ownerDocument = rootNode.ownerDocument;
        if (!renderOptions.document && ownerDocument !== document2) {
          renderOptions.document = ownerDocument;
        }
        for (var i2 = 0; i2 < indices.length; i2++) {
          var nodeIndex = indices[i2];
          rootNode = applyPatch(
            rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions
          );
        }
        return rootNode;
      }
      function applyPatch(rootNode, domNode, patchList, renderOptions) {
        if (!domNode) {
          return rootNode;
        }
        var newNode;
        if (isArray(patchList)) {
          for (var i2 = 0; i2 < patchList.length; i2++) {
            newNode = patchOp(patchList[i2], domNode, renderOptions);
            if (domNode === rootNode) {
              rootNode = newNode;
            }
          }
        } else {
          newNode = patchOp(patchList, domNode, renderOptions);
          if (domNode === rootNode) {
            rootNode = newNode;
          }
        }
        return rootNode;
      }
      function patchIndices(patches) {
        var indices = [];
        for (var key in patches) {
          if (key !== "a") {
            indices.push(Number(key));
          }
        }
        return indices;
      }
    }
  });

  // node_modules/virtual-dom/patch.js
  var require_patch2 = __commonJS({
    "node_modules/virtual-dom/patch.js"(exports, module) {
      var patch4 = require_patch();
      module.exports = patch4;
    }
  });

  // node_modules/virtual-dom/create-element.js
  var require_create_element2 = __commonJS({
    "node_modules/virtual-dom/create-element.js"(exports, module) {
      var createElement2 = require_create_element();
      module.exports = createElement2;
    }
  });

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupString = {
    append: concatString
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map3 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map3(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply2(pure1(f))(a2);
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind2 = bind(dictMonad.Bind1());
    var pure2 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind2(f)(function(f$prime) {
          return bind2(a2)(function(a$prime) {
            return pure2(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name, moduleName, init2) {
    var state = 0;
    var val;
    return function(lineNumber) {
      if (state === 2)
        return val;
      if (state === 1)
        throw new ReferenceError(name + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state = 1;
      val = init2();
      state = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Oak.Document/foreign.js
  function getElementByIdImpl(id) {
    return function() {
      var container = document.getElementById(id);
      if (container == null) {
        throw new Error("Unable to find element with ID: " + id);
      }
      return container;
    };
  }
  function appendChildNodeImpl(container) {
    return function(rootNode) {
      return function() {
        console.log("container", container);
        console.log("rootNode", rootNode);
        container.appendChild(rootNode);
      };
    };
  }

  // output/Data.Function.Uncurried/foreign.js
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };

  // output/Data.Function.Uncurried/index.js
  var runFn1 = function(f) {
    return f;
  };

  // output/Oak.Document/index.js
  var getElementById = /* @__PURE__ */ runFn1(getElementByIdImpl);
  var appendChildNode = function(element) {
    return function(rootNode) {
      return appendChildNodeImpl(element)(rootNode);
    };
  };

  // output/Oak.Html.Attribute/index.js
  var BooleanAttribute = /* @__PURE__ */ function() {
    function BooleanAttribute2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    BooleanAttribute2.create = function(value0) {
      return function(value1) {
        return new BooleanAttribute2(value0, value1);
      };
    };
    return BooleanAttribute2;
  }();
  var DataAttribute = /* @__PURE__ */ function() {
    function DataAttribute2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    DataAttribute2.create = function(value0) {
      return function(value1) {
        return new DataAttribute2(value0, value1);
      };
    };
    return DataAttribute2;
  }();
  var EventHandler = /* @__PURE__ */ function() {
    function EventHandler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    EventHandler2.create = function(value0) {
      return function(value1) {
        return new EventHandler2(value0, value1);
      };
    };
    return EventHandler2;
  }();
  var KeyPressEventHandler = /* @__PURE__ */ function() {
    function KeyPressEventHandler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    KeyPressEventHandler2.create = function(value0) {
      return function(value1) {
        return new KeyPressEventHandler2(value0, value1);
      };
    };
    return KeyPressEventHandler2;
  }();
  var SimpleAttribute = /* @__PURE__ */ function() {
    function SimpleAttribute2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SimpleAttribute2.create = function(value0) {
      return function(value1) {
        return new SimpleAttribute2(value0, value1);
      };
    };
    return SimpleAttribute2;
  }();
  var StringEventHandler = /* @__PURE__ */ function() {
    function StringEventHandler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    StringEventHandler2.create = function(value0) {
      return function(value1) {
        return new StringEventHandler2(value0, value1);
      };
    };
    return StringEventHandler2;
  }();
  var Style = /* @__PURE__ */ function() {
    function Style2(value0) {
      this.value0 = value0;
    }
    ;
    Style2.create = function(value0) {
      return new Style2(value0);
    };
    return Style2;
  }();

  // output/Oak.Html/index.js
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Tag = /* @__PURE__ */ function() {
    function Tag2(value0, value1, value2) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
    }
    ;
    Tag2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return new Tag2(value0, value1, value2);
        };
      };
    };
    return Tag2;
  }();
  var text = function(val) {
    return new Text(val);
  };
  var mkTagFn = function(n) {
    return function(attrs) {
      return function(m) {
        return new Tag(n, attrs, m);
      };
    };
  };
  var div2 = /* @__PURE__ */ mkTagFn("div");
  var button = /* @__PURE__ */ mkTagFn("button");

  // output/Oak.Html.Events/index.js
  var onClick = function(msg) {
    return new EventHandler("onclick", msg);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var intercalate = function(dictFoldable) {
    var foldl2 = foldl(dictFoldable);
    return function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(sep) {
        return function(xs) {
          var go = function(v) {
            return function(v1) {
              if (v.init) {
                return {
                  init: false,
                  acc: v1
                };
              }
              ;
              return {
                init: false,
                acc: append2(v.acc)(append2(sep)(v1))
              };
            };
          };
          return foldl2(go)({
            init: true,
            acc: mempty4
          })(xs).acc;
        };
      };
    };
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append2(f(x))(acc);
          };
        })(mempty4);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map3) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map3(array1)(f(array[bot]));
                  case 2:
                    return apply2(map3(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map3(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map3(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse2(dictApplicative)(identity2);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Oak.VirtualDom.Native/foreign.js
  var h = require_h();
  var diff = require_diff2();
  var patch = require_patch2();
  var createElement = require_create_element2();
  function createRootNodeImpl(tree) {
    console.log("tree", tree);
    const el = createElement(tree);
    console.log("el", el);
    return el;
  }
  function textImpl(str) {
    return function() {
      return str;
    };
  }
  function renderImpl(tagName, attrs, childrenEff) {
    return function() {
      var children = childrenEff();
      return h(tagName, attrs, children);
    };
  }
  function patchImpl(newTree, oldTree, rootNode) {
    return function() {
      var patches = diff(oldTree, newTree);
      return patch(rootNode, patches);
    };
  }
  function concatHandlerFunImpl(name, msgHandler, rest) {
    var result = Object.assign({}, rest);
    result[name] = function(event) {
      msgHandler(event)();
    };
    return result;
  }
  function concatEventTargetValueHandlerFunImpl(name, msgHandler, rest) {
    var result = Object.assign({}, rest);
    result[name] = function(event) {
      msgHandler(String(event.target.value))();
    };
    return result;
  }
  function concatSimpleAttrImpl(name, value, rest) {
    var result = Object.assign({}, rest);
    result[name] = value;
    return result;
  }
  function concatBooleanAttrImpl(name, b2, rest) {
    if (b2) {
      var result = Object.assign({}, rest);
      result[name] = name;
      return result;
    } else {
      return rest;
    }
  }
  function concatDataAttrImpl(name, val, rest) {
    var result = Object.assign({}, rest);
    var attributes = Object.assign({}, rest.attributes);
    attributes[name] = val;
    result.attributes = attributes;
    return result;
  }
  function emptyAttrs() {
    return {};
  }

  // output/Oak.VirtualDom.Native/index.js
  var text2 = /* @__PURE__ */ runFn1(textImpl);
  var render = /* @__PURE__ */ runFn3(renderImpl);
  var patch2 = /* @__PURE__ */ runFn3(patchImpl);
  var createRootNode = /* @__PURE__ */ runFn1(createRootNodeImpl);
  var concatSimpleAttr = /* @__PURE__ */ runFn3(concatSimpleAttrImpl);
  var concatHandlerFun = /* @__PURE__ */ runFn3(concatHandlerFunImpl);
  var concatEventTargetValueHandlerFun = /* @__PURE__ */ runFn3(concatEventTargetValueHandlerFunImpl);
  var concatDataAttr = /* @__PURE__ */ runFn3(concatDataAttrImpl);
  var concatBooleanAttr = /* @__PURE__ */ runFn3(concatBooleanAttrImpl);

  // output/Oak.VirtualDom/index.js
  var intercalate2 = /* @__PURE__ */ intercalate(foldableArray)(monoidString);
  var map2 = /* @__PURE__ */ map(functorArray);
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
  var sequence2 = /* @__PURE__ */ sequence(traversableArray)(applicativeEffect);
  var stringifyStyle = function(v) {
    return v.value0 + (":" + v.value1);
  };
  var stringifyStyles = function(attrs) {
    return intercalate2(";")(map2(stringifyStyle)(attrs));
  };
  var patch3 = function(oldTree) {
    return function(newTree) {
      return function(root) {
        return patch2(oldTree)(newTree)(root);
      };
    };
  };
  var concatAttr = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof EventHandler) {
          return concatHandlerFun(v1.value0)(function(v3) {
            return v(v1.value1);
          })(v2);
        }
        ;
        if (v1 instanceof StringEventHandler) {
          return concatEventTargetValueHandlerFun(v1.value0)(function(e) {
            return v(v1.value1(e));
          })(v2);
        }
        ;
        if (v1 instanceof SimpleAttribute) {
          return concatSimpleAttr(v1.value0)(v1.value1)(v2);
        }
        ;
        if (v1 instanceof Style) {
          return concatSimpleAttr("style")(stringifyStyles(v1.value0))(v2);
        }
        ;
        if (v1 instanceof BooleanAttribute) {
          return concatBooleanAttr(v1.value0)(v1.value1)(v2);
        }
        ;
        if (v1 instanceof DataAttribute) {
          return concatDataAttr(v1.value0)(v1.value1)(v2);
        }
        ;
        if (v1 instanceof KeyPressEventHandler) {
          return concatHandlerFun(v1.value0)(function(e) {
            return v(v1.value1(e));
          })(v2);
        }
        ;
        throw new Error("Failed pattern match at Oak.VirtualDom (line 23, column 1 - line 28, column 16): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var combineAttrs = function(attrs) {
    return function(handler2) {
      return foldr2(concatAttr(handler2))(emptyAttrs)(attrs);
    };
  };
  var renderTag = function(v) {
    return function(v1) {
      if (v1 instanceof Tag) {
        var rendered = sequence2(map2(renderTag(v))(v1.value2));
        return render(v1.value0)(combineAttrs(v1.value1)(v))(rendered);
      }
      ;
      if (v1 instanceof Text) {
        return text2(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Oak.VirtualDom (line 17, column 1 - line 17, column 74): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var render2 = function(h7) {
    return function(xs) {
      return renderTag(h7)(xs);
    };
  };

  // output/Oak/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit));
  var RunningApp = /* @__PURE__ */ function() {
    function RunningApp2(value0) {
      this.value0 = value0;
    }
    ;
    RunningApp2.create = function(value0) {
      return new RunningApp2(value0);
    };
    return RunningApp2;
  }();
  var App2 = /* @__PURE__ */ function() {
    function App3(value0) {
      this.value0 = value0;
    }
    ;
    App3.create = function(value0) {
      return new App3(value0);
    };
    return App3;
  }();
  var handler = function(ref) {
    return function(runningApp) {
      return function(msg) {
        return function __do2() {
          var env = read(ref)();
          var oldTree = fromJust2(env.tree);
          var oldRoot = fromJust2(env.root);
          var newModel = runningApp.value0.update(msg)(env.model);
          var newTree = render2(handler(ref)(runningApp))(runningApp.value0.view(newModel))();
          var newRoot = patch3(newTree)(oldTree)(oldRoot)();
          var newRuntime = {
            root: new Just(newRoot),
            tree: new Just(newTree),
            model: newModel
          };
          write(newRuntime)(ref)();
          runningApp.value0.next(msg)(newModel)(handler(ref)(runningApp))();
          return mempty2();
        };
      };
    };
  };
  var runApp_ = function(v) {
    return function(msg) {
      var runningApp = {
        view: v.value0.view,
        next: v.value0.next,
        update: v.value0.update
      };
      return function __do2() {
        var ref = $$new({
          tree: Nothing.value,
          root: Nothing.value,
          model: v.value0.init
        })();
        var tree = render2(handler(ref)(new RunningApp(runningApp)))(runningApp.view(v.value0.init))();
        var rootNode = createRootNode(tree);
        write({
          tree: new Just(tree),
          root: new Just(rootNode),
          model: v.value0.init
        })(ref)();
        (function() {
          if (msg instanceof Just) {
            return handler(ref)(new RunningApp(runningApp))(msg.value0)();
          }
          ;
          if (msg instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Oak (line 212, column 3 - line 214, column 25): " + [msg.constructor.name]);
        })();
        return rootNode;
      };
    };
  };
  var runApp = function(msg) {
    return function(app2) {
      return runApp_(msg)(app2);
    };
  };
  var createApp = function(opts) {
    return new App2({
      init: opts.init,
      view: opts.view,
      next: opts.next,
      update: opts.update
    });
  };

  // output/Counter/index.js
  var show2 = /* @__PURE__ */ show(showInt);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit));
  var Inc = /* @__PURE__ */ function() {
    function Inc2() {
    }
    ;
    Inc2.value = new Inc2();
    return Inc2;
  }();
  var Dec = /* @__PURE__ */ function() {
    function Dec2() {
    }
    ;
    Dec2.value = new Dec2();
    return Dec2;
  }();
  var view = function(model) {
    return div2([])([div2([])([button([onClick(Inc.value)])([text("+")]), text(show2(model.number))]), div2([])([button([onClick(Dec.value)])([text("-")]), text(show2(model.number))])]);
  };
  var update = function(msg) {
    return function(model) {
      if (msg instanceof Inc) {
        return {
          number: model.number + 1 | 0
        };
      }
      ;
      if (msg instanceof Dec) {
        return {
          number: model.number - 1 | 0
        };
      }
      ;
      throw new Error("Failed pattern match at Counter (line 30, column 20 - line 32, column 45): " + [msg.constructor.name]);
    };
  };
  var next = function(msg) {
    return function(mod2) {
      return function(h7) {
        return mempty3;
      };
    };
  };
  var init = {
    number: 0
  };
  var app = /* @__PURE__ */ createApp({
    init,
    view,
    update,
    next
  });

  // output/Main/index.js
  var main2 = function __do() {
    var rootNode = runApp(app)(Nothing.value)();
    var container = getElementById("app")();
    return appendChildNode(container)(rootNode)();
  };

  // <stdin>
  main2();
})();
/*! Bundled license information:

browser-split/index.js:
  (*!
   * Cross-Browser Split 1.1.1
   * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
   * Available under the MIT License
   * ECMAScript compliant, uniform cross-browser split method
   *)
*/
