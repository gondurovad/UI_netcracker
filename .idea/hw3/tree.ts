export class TreeNode<T> {
    private _key: number | null;
    private _value: T | null;
    private _leftChild: TreeNode<T> | null;
    private _rightChild: TreeNode<T> | null;

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get key(): number {
        return this._key;
    }

    set key(value: number) {
        this._key = value;
    }

    get leftChild(): TreeNode<T> | null {
        return this._leftChild;
    }

    set leftChild(value: TreeNode<T> | null) {
        this._leftChild = value;
    }

    get rightChild(): TreeNode<T> | null {
        return this._rightChild;
    }

    set rightChild(value: TreeNode<T> | null) {
        this._rightChild = value;
    }

    public toString = () : string => {
        return `Node (key: ${this.key}, value: ${this.value})`;
    }
}

export class Tree<T> {
    private rootNode: TreeNode<T> | null;

    constructor() {
        this.rootNode = null;
    }

    returnRoot(): TreeNode<T> {
        return this.rootNode;
    }

    findNodeByKey(key: number): TreeNode<T> {
        let currentNode = this.rootNode;
        if (currentNode == null) return null;

        while (currentNode.key != key) {
            if (key < currentNode.key) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null) {
                return null;
            }
        }

        return currentNode;
    }

    insertNode(key: number, value: T): void {
        let newNode = new TreeNode<T>();
        newNode.key = key;
        newNode.value = value;

        if (this.rootNode == null) {
            this.rootNode = newNode;
        }
        else {
            let currentNode = this.rootNode;
            let parentNode;
            while (true)
            {
                parentNode = currentNode;
                if (key == currentNode.key) {
                    currentNode.value = value;
                    return;
                } else if (key < currentNode.key) {
                    currentNode = currentNode.leftChild;
                    if (currentNode == null) {
                        parentNode.leftChild = (newNode);
                        return;
                    }
                } else {
                    currentNode = currentNode.rightChild;
                    if (currentNode == null) {
                        parentNode.rightChild = (newNode);
                        return;
                    }
                }
            }
        }
    }

    replacementNode(node: TreeNode<T>): TreeNode<T> {
        let parentNode = node;
        let heirNode = node;
        let currentNode = node.rightChild;
        while (currentNode != null)
        {
            parentNode = heirNode;
            heirNode = currentNode;
            currentNode = currentNode.leftChild;
        }
        if (heirNode != node.rightChild)
        {
            parentNode.leftChild = (heirNode.rightChild);
            heirNode.rightChild = (node.rightChild);
        }
        return heirNode;
    }

    deleteNode(key: number): boolean {
        let currentNode = this.rootNode;
        let parentNode = this.rootNode;
        let isLeftChild = true;

        if (currentNode == null) return false;

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
            let heir = this.replacementNode(currentNode);
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
    }

    public printTree(node:TreeNode<T> ): void {
        let globalStack: Array<TreeNode<T>> = [this.rootNode];
        let isRowEmpty = false;
        let space = 32;

        while (isRowEmpty == false) {
            let localStack: Array<TreeNode<T>> = [];
            isRowEmpty = true;
            let rowString: String = "";

            let i:number;
            for (i = 0;i<space;i++) rowString+=" ";

            while (globalStack.length !=0) {
                let temp = globalStack.pop();
                if (temp != null) {
                    rowString+= temp.key+"("+temp.value+")"+"  |  ";
                    localStack.push(temp.leftChild);
                    localStack.push(temp.rightChild);
                    if (temp.leftChild != null ||
                        temp.rightChild != null)
                        isRowEmpty = false;
                }
                else {
                    rowString+="__"+"  |  ";
                    localStack.push(null);
                    localStack.push(null);
                }
                let i:number;
                for (i = 0;i<space;i++) rowString+=" ";
            }
            console.log(rowString);
            space/=2;
            while (localStack.length !=0)
                globalStack.push(localStack.pop());
        }
    }
}

