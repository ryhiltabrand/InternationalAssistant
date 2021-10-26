class Node {
  constructor(data) {
      this.data = data
      this.next = null 
      
  }
}

class LinkedList {

  constructor(head = null) {
      this.head = head
      this.size = 0
  }
  
  addNode(data)
  {
   
    var newNode = new Node(data);
    var currentNode;
    
     // if list is Empty add the
    // element and make it head
    if (this.head == null)
        this.head = newNode;
    else {
        currentNode = this.head;
        // iterate the list
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        // add node
        currentNode.next = newNode;
    }
    this.size++;
  }

  Size() 
  {
    return(this.size);
  }

  isEmpty()
  {
    return(this.size == 0);
  }
  
  removeNode(data)
  {
    var currNode = this.head;
    var prevNode = null;

    if (currNode && currNode.data === data) {
        return currNode.next;
    }

    while (currNode && currNode.data !== data) {
        prevNode = currNode,
        currNode = currNode.next;
    }
    if (prevNode && currNode.data === data) {
        prevNode.next = currNode.next;
    }
   this.size--;
  }
  
  search(data)
  {
    var currNode = this.head;
    while (currNode != null)
    {
        if (currNode.data == data)
            return true;    
        currNode = currNode.next;
    }
    return false; 
  }
  
  print()
  {
  var currNode = this.head;
  var str = "";
  
   while (currNode) {
          str += currNode.data + " ";
          currNode = currNode.next;
    }
    console.log(str);
  }  

}

//Doesn't work: clear
class Test_linklist
{
  Test()
  {
    console.log("Testing linkedlist!");

    let list = new LinkedList;
    
    console.log("Add three numbers to the linkedlist");
    list.addNode(1);
    list.addNode(2);
    list.addNode(3);
    
    console.log("Size: " + list.Size() + " of the linkedlist"); //Size works

    console.log("Print the linkedlist");
    list.print();
    
    console.log("Remove 3 from the linkedlist");
    list.removeNode(3);
    list.print();
    console.log("Size: " + list.Size() + " of the linkedist"); //Size works
    
    console.log("Count the list again");
    list.print();
    
    if(list.isEmpty == 0){
      console.log("The list is empty");
    }else{
      console.log("The list isn't empty");
    }
  }
}


