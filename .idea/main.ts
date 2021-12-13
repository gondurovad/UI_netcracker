import {Tree} from "./tree";
import * as readlineSync from "readline-sync";
let k: string;

let tree = new Tree();

console.log("Tree output to the console: each line is one level of the tree, " +
    "the right and left child of EACH node-parent are displayed. if there is no child, prints __");

while (readlineSync.question("Do you want to continue? Enter 1 if yes, 0 if no ") == "1") {
    k = readlineSync.question("Enter 1 to add node, 2 to delete node by key, 3 to get value by key ");
    switch (k) {
        case "1": {
            let key = parseInt(readlineSync.question("Key: "));
            let value = readlineSync.question("Value: ");
            tree.insertNode(key, value);
            tree.printTree(tree.returnRoot());
            console.log("-------------");
            break;
        }
        case "2": {
            let key = parseInt(readlineSync.question("Key: "));
            let isDeleted: boolean;
            isDeleted = tree.deleteNode(key);
            if (isDeleted==false) console.log("The node has not been deleted");
            tree.printTree(tree.returnRoot());
            console.log("-------------");
            break;
        }
        case "3": {
            let key = parseInt(readlineSync.question("Key: "));
            let val = tree.findNodeByKey(key);
            if (val == null)  console.log("Key not found");
            else console.log("Value: "+val.value);
            console.log("-------------");
            break;
        }
        default: {
            console.log("Enter 1 or 2 or 3");
            console.log("-------------");
            break;
        }
    }
}
