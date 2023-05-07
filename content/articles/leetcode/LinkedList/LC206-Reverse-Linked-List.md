---
title: "LC206. Reverse Linked List"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/reverse-linked-list/"> LeetCode</a></u>'
categories:
    - "LinkedList"

keywords:
    - "LinkedList"
    - "Leetcode"
---

# LC206. Reverse Linked List

https://leetcode.com/problems/reverse-linked-list/

Should do it within 1 min.

```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        prev = None
        curr = head

        while curr:
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp

        return prev
```
