---
title: "LC146. LRU"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/lru-cache/"> LeetCode</a></u>'
categories:
    - "LinkedList"
    # - "LRU"
    # - "Application"
    # - "Double-LinkedList"
keywords:
    - "LinkedList"
    - "Leetcode"
    - "LinkedList"
    - "LRU"
    - "Application"
    - "Double-LinkedList"
---

# LC146. LRU

https://leetcode.com/problems/lru-cache

The reason why this problem falls into the Linkedlist category is that
Put and Get need to be constant time, which can be easily achieved by a dictionary.

However, it's an LRU, meaning that we need an easy way to track & modify the ordering of keys and all the operations need to be O(1).

The idea is that we have a double linked list, and the order of the node represents the history.

The LL has 2 padding nodes at the beginning and end of the LL, this way we can

1/Remove any node without worry about the edge case

2/Get the least recently used node by calling `tail.prev`

For each node, we need to have `key`, `val`, `prev`, `next`, noted that we do need `key` for getting the key to delete record in the dictionary.

We also have a dictionary of (key -> node), so that we can get the node given a key

```python
# https://leetcode.com/problems/lru-cache/
# The reason why this problem falls into the Linkedlist category is that
# Put and Get need to be constant time, which can be easily achieved by dictionary.

# However, it's an LRU, meaning that we need an easy way to track & modify the ordering of keys and all the operations need to be O(1).

# The idea is that we have a double linked list, and the order of the node represents the history.

# The LL has 2 padding nodes at the beginning and end of the LL, this way we can

# 1/Remove any node without worry about the edge case

# 2/Get the least recently used node by calling `tail.prev`

# For each node, we need to have `key`, `val`, `prev`, `next`, noted that we do need `key` for getting the key to delete record in the dictionary.

# We also have a dictionary of (key -> node), so that we can get the node given a key
class ListNode:
    """
    Double LL node with key and val attributes
    """
    def __init__(self, key=0, val=0, prev=None, next=None):
        self.key = key
        self.val = val
        self.prev = prev
        self.next = next

class LRUCache:

    def __init__(self, capacity: int):
        """
        Initialize 2 padding nodes that linked to each other w/o putting them in dictionary
        """
        head = ListNode()
        tail = ListNode()
        head.next = tail
        tail.prev = head
        self.head = head
        self.tail = tail
        self.capactity = capacity
        self.d = {}

    # now, we need a way to add and remove a node in the LL
    # Noted that we don't need to consider ordering and capacity now, just simple add and remove
    # We can use this wheel to complete the more complext logic
    def _add(self, node):
        """
        For adding, there's only 1 way to add - add behind the padding head.
        """
        old_top = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = old_top
        old_top.prev = node

    def _remove(self, node):
        """
        Since we have 2 padding nodes we can simply remove the give node by joining its prev and next
        """
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    # next we need an update logic - given a node, change it from the current position to top
    # this is now easy since we can just remove it and add
    # noted that we still don't care about capacity and other logics.
    def _update(self, node):
        """
        Delete first, then add.
        """
        self._remove(node)
        self._add(node)


    # Get is relatively easy
    # just get the value then update the position
    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        else:
            node = self.d[key]
            self._update(node)
            return node.val

    # for put if key exist, simply update the value of the node and reposition
    # if LRU is full, remove the key **and** the node and add the new node
    # if LRU isn't full, simply add node
    def put(self, key: int, value: int) -> None:
        if key in self.d:
            node = self.d[key]
            node.val = value
            self._update(node)

        elif self.capactity > len(self.d):
            new_top = ListNode(key, value)
            self._add(new_top)
            self.d[key] = new_top
        else:
            last_node = self.tail.prev
            self._remove(last_node)
            del self.d[last_node.key]
            new_top = ListNode(key, value)
            self._add(new_top)
            self.d[key] = new_top

```
