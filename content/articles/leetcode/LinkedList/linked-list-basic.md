---
title: "Linked List Basic"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/tag/linked-list/"> LeetCode</a></u>'
categories:
    - "LinkedList"
keywords:
    - "LinkedList"
    - "Leetcode"
---

# Linked List Basics

Linked List Basic tricks we should be able to recite flawlessly.

Define some util class/functions, these are just utility functions.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

a = ListNode(8, None)
b = ListNode(7, a)
c = ListNode(6, b)
d = ListNode(5, c)
e = ListNode(4, d)
f = ListNode(3, e)
g = ListNode(2, f)
head = ListNode(1, g)

def initList():
    a = ListNode(8, None)
    b = ListNode(7, a)
    c = ListNode(6, b)
    d = ListNode(5, c)
    e = ListNode(4, d)
    f = ListNode(3, e)
    g = ListNode(2, f)
    head = ListNode(1, g)
    return head


def printList(head):
    """
    Simply traverse the list
    >>> printList(head)
    '1, 2, 3, 4, 5, 6, 7, 8'
    """
    result = ""
    if not head:
        return result
    curr = head

    while curr:
        result += str(curr.val) + ", "
        curr = curr.next

    return result.strip(', ')
```

Find Node by index, pretty much the same as traverse with different terminating conditions for the while loop

```python
def findByIndex(head, index):
    """
    Find value by index
    >>> findByIndex(head, 0)
    1
    >>> findByIndex(head, 7)
    8
    """
    if not head:
        return
    pos = 0
    curr = head
    while pos != index:
        curr = curr.next
        pos += 1

    return curr.val
```

Delete all nodes that have the given value, another variation of traversal.

```python
def deleteAllValue(head, val):
    """
    Delete all the nodes whose value eq val
    >>> printList(deleteAllValue(initList(), 1))
    '2, 3, 4, 5, 6, 7, 8'
    >>> printList(deleteAllValue(initList(), 8))
    '1, 2, 3, 4, 5, 6, 7'
    >>> printList(deleteAllValue(initList(), 3))
    '1, 2, 4, 5, 6, 7, 8'
    """
    if not head:
        return None
    dummy = ListNode(0, head)
    prev, curr = dummy, head

    while curr:
        if curr.val == val:
            prev.next = curr.next
            curr = curr.next
        else:
            prev = curr
            curr = curr.next

    return dummy.next
```

Dual pointers - fast and slow pointers + traversal

```python
def findMid(head):
    """
    Find the middle of a LinkedList
    >>> half = findMid(head)
    >>> printList(half)
    '5, 6, 7, 8'
    """
    if not head:
        return
    fast = slow = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow
```

Reverse a linked list.

```python
def reverse(head):
    """
    Reverse the linkedlist using 2/3 pointers
    >>> new_list = reverse(head)
    >>> printList(new_list)
    '8, 7, 6, 5, 4, 3, 2, 1'
    >>> head = reverse(new_list)
    >>> printList(head)
    '1, 2, 3, 4, 5, 6, 7, 8'
    """

    if not head:
        return None

    prev, curr = None, head

    while curr:
        temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp

    return prev
```

Reverse till k position

```python
def reverse_till_k(head, k):
    """
    k is not index but postion, i.e. 1 <= k <= len(list)

    >>> printList(reverse_till_k(head, 1))
    '1, 2, 3, 4, 5, 6, 7, 8'
    >>> printList(reverse_till_k(head, 8))
    '8, 7, 6, 5, 4, 3, 2, 1'
    >>> new = initList()
    >>> printList(reverse_till_k(new, 2))
    '2, 1, 3, 4, 5, 6, 7, 8'
    """
    if not head:
        return

    prev, curr = None, head

    pos = 0

    while pos != k:
        temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
        pos += 1

    head.next = curr
    return prev
```

Given a head and last node, reverse everything [head, last) and return a new head and a new tail. This function stand-alone does not do anything but it's useful for group or partial reverse

```python
def reverse_except_last(head, last):
    """
    return new head(node before last) and new tail(the current head)
    >>> a = ListNode(8, None)
    >>> b = ListNode(7, a)
    >>> c = ListNode(6, b)
    >>> new_head, new_tail = reverse_except_last(c, a)
    >>> printList(new_head)
    '7, 6'
    >>> printList(new_tail)
    '6'
    """
    new_tail = head
    curr = head
    prev= None
    while curr != last:
        tmp = curr.next
        curr.next = prev
        prev = curr
        curr = tmp

    new_head = prev
    return new_head, new_tail

```

This needs an update.

```python
def reverseKGroup(head, k):
    """
    m, n are position not index, i.e. 1 <= m,n <= len(head)
    >>> printList(reverseKGroup(initList(), 2))
    '2, 1, 4, 3, 6, 5, 8, 7'
    >>> printList(reverseKGroup(initList(), 4))
    '4, 3, 2, 1, 8, 7, 6, 5'
    """

    dummy = jump = ListNode(0)
    dummy.next = l = r = head

    while True:
        count = 0
        while r and count < k:   # use r to locate the range
            r = r.next
            count += 1
        if count == k:  # if size k satisfied, reverse the inner linked list
            pre, cur = r, l
            for _ in range(k):
                # standard reversing with pre being the beginning of next group.
                cur.next = pre
                cur = cur.next
                pre = cur
            jump.next, jump, l = pre, l, r  # connect two k-groups
        else:
            return dummy.next


if __name__ == "__main__":
    import doctest
    doctest.testmod()
```
