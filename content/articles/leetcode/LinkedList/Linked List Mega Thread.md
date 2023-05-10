---
title: "Linked List Mega Thread"
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

## Common Problems

This a collection of arguably the most common LinkedList problems, should go through all the basics before starting these.

-   [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
-   [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)
-   [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
-   [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
-   [328. Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)
-   [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
-   [143. Reorder List](https://leetcode.com/problems/reorder-list/)
-   [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
-   [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)
-   [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)
-   [430. Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)
-   [146. LRU](https://leetcode.com/problems/lru-cache/)
-   [1472. Design Browser History](https://leetcode.com/problems/design-browser-history/)

For more linked list problem check out https://leetcode.com/tag/linked-list/.

## [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

We should be able to do it effortlessly.

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

## [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

There are many way to do it, I pick the way that uses the most common technique

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

## [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

Use slow and fast pointers. This is also a basic technique.

```python
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:

        if not head or not head.next:
            return head

        # Same starting point
        fast = slow = head

        # Since fast need to move 2 steps so extra check is needed
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow
```

## [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

The idea is to have 2 pointers.

1/ 2 pointers should have (n - 1) node between or n steps away (aka left should move n times to reach right)

2/ we want the right pointer to point to the last node of the list

This way, the left pointer is exactly one node ahead of the node that needs to be removed.

Since they are n steps away, we can first move the right pointer n times, then we move both till right at the last node

```python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:

        left = right = head

        while n:
            right = right.next
            n -= 1

        if not right:
            return head.next

        while right.next:
            left = left.next
            right = right.next

        left.next = left.next.next

        return head

```

## [328. Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)

Set up 2 pointers for odd and even indexes.
connect the node and move the pointers.

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

## [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

Don't merge one into the other, but create a dummy head and merge two given lists to the third list.

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

## [143. Reorder List](https://leetcode.com/problems/reorder-list/)

Such a lame name tbh, tells nothing about the problem we need to solve.

We need to convert:

`L0 → L1 → … → Ln - 1 → Ln`

to:

`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`

Example:

`1 → 2 → 3 → 4` to `1 → 4 → 2 → 3`

3 steps to do this.

1/ Find the middle node ([LC876](https://leetcode.com/problems/middle-of-the-linked-list/description/)), but also keep track of the node before mid node so that we can break the list into two.

2/ Reverse the second list

3/ Merge 2 lists

```python
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        if not head or not head.next:
            return head

        slow = fast = head
        before_slow = None

        while fast and fast.next:
            before_slow = slow
            slow = slow.next
            fast = fast.next.next

        before_slow.next = None
        curr = slow
        prev = None

        while curr:
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp

        curr2 = prev
        curr1 = head
        while curr2:
            tmp = curr1.next
            curr1.next = curr2
            curr1 = curr2
            curr2 = tmp
```

# [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

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

## [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)

We need to reverse a Linked List, but not from the beginning but from the m position.

In general, we need to move the curr to m to start reversing, mark the starting point.Then we start reversing till curr reach n + 1 position since m, n are not index.

To move to m position, need to move m - 1 steps (m - 1 times of `.next` from head). To move from m position to n position need n - m steps (n - m times of .next from m)

1/ prepare prev, curr like regular reverse Linked List.

2/ Goal is to move curr to m position (prev accordingly), meaning move prev and curr by m - 1 steps (use m > 1 for condition, and reduce both m, n by 1 evey iteration) to the "ready to reverse" position. after: m == 1 and n == n - m + 1

3/ Goal is to reverse till curr reach to n + 1 postition, meaning we need n steps for curr in totall and we moved m - 1 steps alread, n - m + 1 step is needed and n is exactly n - m + 1. thus can have n = 0 for while loop condition.

4/ Two break points now have 4 nodes 1/conn 2/tail 3/prev 4/curr, anything between (inclusive) tail and prev is reverse and now

### Mistakes

-   forgot `conn` can be None (this case, `prev` should be returned)

```python
class Solution:
    def reverseBetween(self, head, m, n):

        # m, n are postion not index

        if not head:
            return None

        prev = None
        curr = head

        # None    1  ->  2  ->  ...  ->  m  -> ...  ->  n  -> ...
        # prev  curr

        # steps for curr (and prev) to move: m - 1
        # value of m: m
        while m > 1:
            prev = curr
            curr = curr.next
            # None    1  ->  2  ->  ...  ->  mth  -> ...  ->  nth  -> ...
            #       prev   curr
            m -= 1
            n -= 1
        # None    1  ->  2  ->  ... (m-1)th ->  mth  -> ...  ->  nth  -> ...
        #                             prev      curr
        # value of m: 1
        # value of n: n - m + 1
        # moved: m - 1 steps
        tail = curr
        conn = prev
        #                            conn      tail
        # None    1  ->  2  ->  ... (m-1)th ->  mth  -> ...  ->  nth  -> ...
        #                            prev      curr
        # total steps needed for curr: n
        # steps already moved: m - 1
        # steps needed: n - m + 1
        # value of n: n - m + 1
        while n:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
            n -= 1
        #                            conn      tail
        # None    1  ->  2  ->  ... (m-1)th <-  mth  <- ...  <-  nth  |  (n+1)th -> ...
        #                                                        prev |  curr
        if conn: # m could be 1, then conn is None and prev need to be the new head
            conn.next = prev
        else:
            head = prev

        tail.next = curr
        return head
```

## [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)

1. create a helper that reverse the list except last one and return the new head and new tail (except last one)
2. create a dummy(point to head) and a left pointer points to dummy
3. create a right pointer points to head
4. while right pointer is not None, move right pointer k steps to position k + 1
5. reverse everything in (left pointer, right pointer) i.e. reverse_list_except_last(left.next, right)
6. get the new_head and new_tail from the function call
7. left.next = new_head, then left = new_tail, then new_tail.next = right
8. keep moving right pointer by k step
9. final step, check the counter again

### Mistakes

-   Forgot to make `dummy` node.
-   `reverse_list_except_last` should take `curr.next`/`left.next`
-   `count` and `right` pointer need to be update no matter what

```python
def reverseKGroup( head, k):

        def reverse_list_except_last(head, last):
            """
            make 1 -> 2 -> 3
            to   2 -> 1 -> 3

            return 2, 1
            """
            # prev = None
            # curr = head
            # while curr != last:
            #     temp = curr.next
            #     curr.next = prev
            #     prev = curr
            #     curr = temp
            # return prev, head
            prev = None
            new_tail = head

            # this will stop right before the last node got reverse
            while head != last:
                temp = head.next
                head.next = prev
                prev = head
                head = temp

            return prev, new_tail

        dummy = curr = ListNode(0, head)
        # dummy
        #   0   ->   1   ->   2   ->   3   ->   4
        # curr     head
        count = 0
        while head: # we move head forword for k step and execute if block
            if count == k:
                # dummy
                #   0   ->   1   ->   2   ->   3   ->   4
                # curr                        head
                new_head, new_tail = reverse_list_except_last(curr.next, head)
                # dummy
                #   0   ?     1     <-    2     ?     3    ->   4
                # curr     new_tail     new_head    head
                curr.next = new_head # connect the old starting position with new head
                # dummy
                #   0   ->     2     ->    1     ?     3    ->   4
                # curr     new_head     new_tail    head
                new_tail.next = head
                curr = new_tail # assign the next starting position
                count = 0

                # dummy                   curr
                #   0   ->     2     ->    1     ->     3    ->   4
                #          new_head     new_tail      head

            head = head.next # head always move 1 step ahead
            count += 1
        # since head always move 1 step ahead, it's possible that head is none but there
        # exactly k nodes need to be reversed
        if count == k:
            new_head, new_tail = reverse_list_except_last(curr.next, head)
            curr.next = new_head
            new_tail.next = head

        return dummy.next
```

## [430. Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)

Create a recursive helper function that flatterns the list

the helper flatterns the list by getting the flattern child list's tail and joint to the next node.

The base cases are the key, we should check if a node

1/ is None

2/ is last node (no child, no next)

if it's not the last node and has no child, we should call helper(head.next), note that we won't change the connection here since we only do something when there's child.

if it has a child, we should call the helper(head.child), and get the last node of the flattern child, then we do some connections

after the connection, we should continue helper(next_node) if next_node exist.

```python
class Solution:
    def flatten(self, head: 'Optional[Node]') -> 'Optional[Node]':

        def helper(head):
            if not head:
                return None
            if not head.child and not head.next:
                return head
            if not head.child:
                return helper(head.next)

            child_list_tail = helper(head.child)

            next_node = head.next
            if next_node:
                child_list_tail.next = next_node
                next_node.prev = child_list_tail

            head.next = head.child
            head.child.prev = head
            head.child = None

            return helper(next_node) if next_node else child_list_tail


        helper(head)
        return head
```

## [146. LRU](https://leetcode.com/problems/lru-cache/)

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

## [1472. Design Browser History](https://leetcode.com/problems/design-browser-history/)

Good for linked list practice, after understanding the problem, nothing really special.

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
