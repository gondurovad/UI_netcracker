"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = exports.TreeNode = void 0;
var TreeNode = /** @class */ (function () {
    function TreeNode() {
        var _this = this;
        this.toString = function () {
            return "Node (key: " + _this.key + ", value: " + _this.value + ")";
        };
    }
    Object.defineProperty(TreeNode.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "leftChild", {
        get: function () {
            return this._leftChild;
        },
        set: function (value) {
            this._leftChild = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "rightChild", {
        get: function () {
            return this._rightChild;
        },
        set: function (value) {
            this._rightChild = value;
        },
        enumerable: false,
        configurable: true
    });
    return TreeNode;
}());
exports.TreeNode = TreeNode;
var Tree = /** @class */ (function () {
    function Tree() {
        this.rootNode = null;
    }
    Tree.prototype.returnRoot = function () {
        return this.rootNode;
    };
    Tree.prototype.findNodeByKey = function (key) {
        var currentNode = this.rootNode;
        if (currentNode == null)
            return null;
        while (currentNode.key != key) {
            if (key < currentNode.key) {
                currentNode = currentNode.leftChild;
            }
            else {
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null) {
                return null;
            }
        }
        return currentNode;
    };
    Tree.prototype.insertNode = function (key, value) {
        var newNode = new TreeNode();
        newNode.key = key;
        newNode.value = value;
        if (this.rootNode == null) {
            this.rootNode = newNode;
        }
        else {
            var currentNode = this.rootNode;
            var parentNode = void 0;
            while (true) {
                parentNode = currentNode;
                if (key == currentNode.key) {
                    currentNode.value = value;
                    return;
                }
                else if (key < currentNode.key) {
                    currentNode = currentNode.leftChild;
                    if (currentNode == null) {
                        parentNode.leftChild = (newNode);
                        return;
                    }
                }
                else {
                    currentNode = currentNode.rightChild;
                    if (currentNode == null) {
                        parentNode.rightChild = (newNode);
                        return;
                    }
                }
            }
        }
    };
    Tree.prototype.replacementNode = function (node) {
        var parentNode = node;
        var heirNode = node;
        var currentNode = node.rightChild;
        while (currentNode != null) {
            parentNode = heirNode;
            heirNode = currentNode;
            currentNode = currentNode.leftChild;
        }
        if (heirNode != node.rightChild) {
            parentNode.leftChild = (heirNode.rightChild);
            heirNode.rightChild = (node.rightChild);
        }
        return heirNode;
    };
    Tree.prototype.deleteNode = function (key) {
        var currentNode = this.rootNode;
        var parentNode = this.rootNode;
        var isLeftChild = true;
        if (currentNode == null)
            return false;
        while (currentNode.key != key) {
            parentNode = currentNode;
            if (key < currentNode.key) {
                isLeftChild = true;
                currentNode = currentNode.leftChild;
            }
            else {
                isLeftChild = false;
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null)
                return false;
        }
        if (currentNode.leftChild == null && currentNode.rightChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = null;
            else if (isLeftChild)
                parentNode.leftChild = (null);
            else
                parentNode.rightChild = (null);
        }
        else if (currentNode.rightChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = currentNode.leftChild;
            else if (isLeftChild)
                parentNode.leftChild = (currentNode.leftChild);
            else
                parentNode.rightChild = (currentNode.leftChild);
        }
        else if (currentNode.leftChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = currentNode.rightChild;
            else if (isLeftChild)
                parentNode.leftChild = (currentNode.rightChild);
            else
                parentNode.rightChild = (currentNode.rightChild);
        }
        else {
            var heir = this.replacementNode(currentNode);
            if (currentNode == this.rootNode)
                this.rootNode = heir;
            else if (isLeftChild) {
                parentNode.leftChild = (heir);
                heir.leftChild = currentNode.leftChild;
            }
            else {
                parentNode.rightChild = (heir);
                heir.leftChild = currentNode.leftChild;
            }
        }
        return true;
    };
    Tree.prototype.printTree = function (node) {
        var globalStack = [this.rootNode];
        var isRowEmpty = false;
        var space = 32;
        while (isRowEmpty == false) {
            var localStack = [];
            isRowEmpty = true;
            var rowString = "";
            var i = void 0;
            for (i = 0; i < space; i++)
                rowString += " ";
            while (globalStack.length != 0) {
                var temp = globalStack.pop();
                if (temp != null) {
                    rowString += temp.key + "(" + temp.value + ")" + "  |  ";
                    localStack.push(temp.leftChild);
                    localStack.push(temp.rightChild);
                    if (temp.leftChild != null ||
                        temp.rightChild != null)
                        isRowEmpty = false;
                }
                else {
                    rowString += "__" + "  |  ";
                    localStack.push(null);
                    localStack.push(null);
                }
                var i_1 = void 0;
                for (i_1 = 0; i_1 < space; i_1++)
                    rowString += " ";
            }
            console.log(rowString);
            space /= 2;
            while (localStack.length != 0)
                globalStack.push(localStack.pop());
        }
    };
    return Tree;
}());
exports.Tree = Tree;
