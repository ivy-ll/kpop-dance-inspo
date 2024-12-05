class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.curr = null;
    }


  append(data) {
    const newNode = new Node(data);
    if (!this.tail) {
      this.head = this.tail = this.curr = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.curr = newNode;
    }
  }

  goNext() {
    if (this.curr && this.curr.next) {
      this.curr = this.curr.next;
      console.log("Current (forward):", this.curr.data);
    } else {
      console.log("No next node or reached the end.");
    }
  }

  goBack() {
    if (this.curr && this.curr.prev) {
      this.curr = this.curr.prev;
      console.log("Current (backward):", this.curr.data);
    } else {
      console.log("No previous node or reached the start.");
    }
  }

  insertAtCurr(data) {
    const newNode = new Node(data);
    if (!this.curr) {
      this.append(data);
    } else if (this.curr === this.tail) {
      this.append(data);
    } else {
      newNode.next = this.curr.next;
      newNode.prev = this.curr;
      if (this.curr.next) {
        this.curr.next.prev = newNode;
      }
      this.curr.next = newNode;
      this.curr = newNode;
    }

    console.log("Inserted at current position:", data);
  }

  printList() {
    let curr = this.head;
    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
}


export default DoublyLinkedList;