---
title: "LC328. Odd Even Linked List"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/odd-even-linked-list/"> LeetCode</a></u>'
categories:
    - "LinkedList"

keywords:
    - "LinkedList"
    - "Leetcode"
---

Two pointers for odd and even index of the node and join them

https://leetcode.com/problems/odd-even-linked-list/

```python
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        odd_curr = head
        even_curr = even_head = head.next

        while odd_curr and even_curr and odd_curr.next and even_curr.next:
            odd_curr.next, even_curr.next = odd_curr.next.next, even_curr.next.next
            odd_curr, even_curr = odd_curr.next, even_curr.next

        odd_curr.next = even_head

        return head

```
