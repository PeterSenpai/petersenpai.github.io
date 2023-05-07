---
title: "LC2. Add Two Numbers"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/add-two-numbers/"> LeetCode</a></u>'
categories:
    - "LinkedList"
    # - "LRU"
    # - "Application"
    # - "Double-LinkedList"
keywords:
    - "LinkedList"
    - "Leetcode"
---

# LC2. Add Two Numbers

https://leetcode.com/problems/add-two-numbers/

Nothing special

Set up 2 pointers that iterate at the same speed on 2 different lists
and only stop when we reach the end of the longer list.

some small mistakes can be made
1/ forgot to update carry for all cases
2/ lots of checking when 2 lists are not the same size
3/ after the iteration, need to check carry again

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        c1 = l1
        c2 = l2
        result = ListNode()
        r = result
        carry = 0
        while c1 != None or c2 != None:

            v1 = c1.val if c1 else 0
            v2 = c2.val if c2 else 0
            tmp_sum = v1 + v2 + carry

            if tmp_sum >= 10:
                tmp_sum -= 10
                carry = 1
            else:
                carry = 0

            r.next = ListNode(tmp_sum)
            r = r.next

            if c1 != None:
                c1 = c1.next
            if c2 != None:
                c2 = c2.next

        if carry == 1:
            r.next = ListNode(1)

        return result.next

```
