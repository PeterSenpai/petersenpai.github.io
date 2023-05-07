---
title: "LC21. Merge Two Sorted Lists"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/merge-two-sorted-lists/"> LeetCode</a></u>'
categories:
    - "LinkedList"

keywords:
    - "LinkedList"
    - "Leetcode"
---

# LC21. Merge Two Sorted Lists

https://leetcode.com/problems/merge-two-sorted-lists/

Don't merge one into the other, but create a dummy head and merge them
to the third list.

```python

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:

        dummy = ListNode(0)
        curr = dummy
        curr1 = list1
        curr2 = list2

        while curr1 and curr2:
            if curr1.val <= curr2.val:
                curr.next = curr1
                curr = curr.next
                curr1 = curr1.next
            else:
                curr.next = curr2
                curr = curr.next
                curr2 = curr2.next

        if curr1:
            curr.next = curr1

        if curr2:
            curr.next = curr2

        return dummy.next
```
