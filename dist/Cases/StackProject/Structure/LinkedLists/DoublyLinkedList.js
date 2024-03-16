"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeM_1 = __importDefault(require("../Node/NodeM"));
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    addToHead(data) {
        const newHead = new NodeM_1.default(data);
        const currentHead = this.head;
        if (currentHead) {
            currentHead.setPreviousNode(newHead);
            newHead.setNextNode(currentHead);
        }
        this.head = newHead;
        if (!this.tail) {
            this.tail = newHead;
        }
    }
    addToTail(data) {
        const newTail = new NodeM_1.default(data);
        const currentTail = this.tail;
        if (currentTail) {
            currentTail.setNextNode(newTail);
            newTail.setPreviousNode(currentTail);
        }
        this.tail = newTail;
        if (!this.head) {
            this.head = newTail;
        }
    }
    removeHead() {
        const removedHead = this.head;
        if (!removedHead) {
            return;
        }
        this.head = removedHead.getNextNode();
        if (this.head) {
            this.head.setPreviousNode(null);
        }
        if (removedHead === this.tail) {
            this.removeTail();
        }
        return removedHead.data;
    }
    removeTail() {
        const removedTail = this.tail;
        if (!removedTail) {
            return;
        }
        this.tail = removedTail.getPreviousNode();
        if (this.tail) {
            this.tail.setNextNode(null);
        }
        if (removedTail === this.head) {
            this.removeHead();
        }
        return removedTail.data;
    }
    removeByData(data) {
        let nodeToRemove;
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.data === data) {
                nodeToRemove = currentNode;
                break;
            }
            currentNode = currentNode.getNextNode();
        }
        if (!nodeToRemove) {
            return null;
        }
        if (nodeToRemove === this.head) {
            this.removeHead();
        }
        else if (nodeToRemove === this.tail) {
            this.removeTail();
        }
        else {
            const nextNode = nodeToRemove.getNextNode();
            const previousNode = nodeToRemove.getPreviousNode();
            if (nextNode && previousNode) {
                nextNode.setPreviousNode(previousNode);
                previousNode.setNextNode(nextNode);
            }
        }
        return nodeToRemove;
    }
    printList() {
        let currentNode = this.head;
        let output = '<head> ';
        while (currentNode !== null) {
            output += currentNode.data + ' ';
            currentNode = currentNode.getNextNode();
        }
        output += '<tail>';
        console.log(output);
    }
}
exports.default = DoublyLinkedList;
function swapNodes(list, data1, data2) {
    console.log(`Swapping ${data1} and ${data2}:`);
    let node1Prev = null;
    let node2Prev = null;
    let node1 = list.head;
    let node2 = list.head;
    if (data1 === data2) {
        console.log('Elements are the same - no swap to be made');
        return;
    }
    while (node1 !== null) {
        if (node1.data === data1) {
            break;
        }
        node1Prev = node1;
        node1 = node1.getNextNode();
    }
    while (node2 !== null) {
        if (node2.data === data2) {
            break;
        }
        node2Prev = node2;
        node2 = node2.getNextNode();
    }
    if (node1 === null || node2 === null) {
        console.log('Swap not possible - one or more element is not in the list');
        return;
    }
    if (node1Prev === null) {
        list.head = node2;
    }
    else {
        node1Prev.setNextNode(node2);
    }
    if (node2Prev === null) {
        list.head = node1;
    }
    else {
        node2Prev.setNextNode(node1);
    }
}
module.exports = DoublyLinkedList;
