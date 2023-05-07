---
title: "LC1472. Design Browser History"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/problems/design-browser-history/"> LeetCode</a></u>'
categories:
    - "LinkedList"
    - "Application"

keywords:
    - "LinkedList"
    - "Leetcode"
---

# LC1472. Design Browser History

https://leetcode.com/problems/design-browser-history/

Good for linked list practice, nothing really special.

```python
class ListNode:
    def __init__(self, val='', back=None, next=None):
        self.val = val
        self.back = back
        self.next = next
class BrowserHistory:

    def __init__(self, homepage: str):
        self.curr = ListNode(homepage)

    def visit(self, url: str) -> None:
        new_head = ListNode(url, self.curr)
        self.curr.next = new_head
        self.curr = new_head

    def back(self, steps: int) -> str:
        while self.curr.back and steps > 0:
            self.curr = self.curr.back
            steps -= 1
        result = self.curr.val
        return result

    def forward(self, steps: int) -> str:
        while self.curr.next and steps > 0:
            self.curr = self.curr.next
            steps -=1
        result = self.curr.val
        return result
```
