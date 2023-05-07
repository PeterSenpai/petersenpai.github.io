---
title: "LC234. Palindrome Linked List"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/palindrome-linked-list/description/"> LeetCode</a></u>'
categories:
    - "LinkedList"

keywords:
    - "LinkedList"
    - "Leetcode"
---

# LC234. Palindrome Linked List

https://leetcode.com/problems/palindrome-linked-list/description/

Nothing to talk about, try to use the most common technique for ll.

```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        def reverse(head):
            prev = None
            curr = head
            while curr:
                tmp = curr.next
                curr.next = prev
                prev = curr
                curr = tmp
            return prev

        def get_string(head):
            r = ""
            curr = head
            while curr:
                r += str(curr.val)
                curr = curr.next
            return r

        s1 = get_string(head)
        s2 = get_string(reverse(head))

        return s1 == s2
```
