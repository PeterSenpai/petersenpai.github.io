---
title: "Trees Mega Thread"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/tag/tree/"> LeetCode</a></u>'
categories:
    - "Trees"

keywords:
    - "Trees"
    - "Leetcode"
---

## Trees fundamentals

Basics of traversing trees.

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#
#        _______1_____
#       /             \
#      4__          ___3
#     /   \        /    \
#    0     9      13     14
#         / \       \
#        7   10      2

def initTree():
    seven = TreeNode(7)
    ten = TreeNode(10)
    two = TreeNode(2)
    zero = TreeNode(0)
    fourteen = TreeNode(14)
    nine = TreeNode(9, seven, ten)
    thirteen = TreeNode(13, None, two)
    four = TreeNode(4, zero, nine)
    three = TreeNode(3, thirteen, fourteen)
    root = TreeNode(1, four, three)
    return root


def preorder(root):
    """
    Pre Order
    >>> print(preorder(initTree()))
    [1, 4, 0, 9, 7, 10, 3, 13, 2, 14]
    """
    if not root:
        return []

    return [root.val] + preorder(root.left) + preorder(root.right)

def inorder(root):
    """
    In Order
    >>> print(inorder(initTree()))
    [0, 4, 7, 9, 10, 1, 13, 2, 3, 14]
    """
    if not root:
        return []

    return inorder(root.left) + [root.val] + inorder(root.right)

def postorder(root):
    """
    post order
    >>> print(postorder(initTree()))
    [0, 7, 10, 9, 4, 2, 13, 14, 3, 1]
    """
    if not root:
        return []

    return postorder(root.left) + postorder(root.right)  + [root.val]

def level_traverse(root):
    """
    >>> print(level_traverse(initTree()))
    [[1], [4, 3], [0, 9, 13, 14], [7, 10, 2]]
    """
    if not root:
        return []

    result = [[root.val]]
    queue = [[root]]
    # if don't use any then the loop won't stop since we always has an empty array in queue
    while any(queue):
        new_level = []
        old_level = queue.pop(0)
        for node in old_level:
            for child in [node.left, node.right]:
                if child:
                    new_level.append(child)
        new_val = [node.val for node in new_level]
        if new_val:
            result.append(new_val)
        queue.append(new_level)
    return result
```

## Common problems

-   [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/description/)
-   [1302. Deepest Leaves Sum](https://leetcode.com/problems/deepest-leaves-sum/description/)
-   [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/)
-   [513. Find Bottom Left Tree Value](https://leetcode.com/problems/find-bottom-left-tree-value/description/)
-   [701. Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/description/)
-   [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)
-   [669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/description/)
-   [450. Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/description/)
-   [1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/)
-   [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/)
-   [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/)
-   [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/)
-   [96. Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/description/)
-   [894. All Possible Full Binary Trees](https://leetcode.com/problems/all-possible-full-binary-trees/description/)
-   [129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/description/)
-   [337. House Robber III](https://leetcode.com/problems/house-robber-iii/description/)
-   [951. Flip Equivalent Binary Trees](https://leetcode.com/problems/flip-equivalent-binary-trees/description/)
-   [538. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree/description/)
-   [124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)
-   [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/)
-   []()
-   []()

## [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/description/)

Use level traverse to get the last node of a each level

```python
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        levels = [[root]]
        result = []

        while levels:
            curr_level = levels.pop()
            result.append(curr_level[-1].val)
            next_level = []
            for node in curr_level:
                for child in (node.left, node.right):
                    if child:
                        next_level.append(child)
            if next_level:
                levels.append(next_level)
        return result


```

## [1302. Deepest Leaves Sum](https://leetcode.com/problems/deepest-leaves-sum/description/)

Another level traverse, if `next_level` is null, we are sure that `curr_level` is the deepest level, then do a sum of that.

```python
class Solution:
    def deepestLeavesSum(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        levels = [[root]]

        while levels:
            curr_level = levels.pop()
            next_level = []
            for node in curr_level:
                for child in (node.left, node.right):
                    if child:
                        next_level.append(child)

            if not next_level:
                s = 0
                for n in curr_level:
                    s += n.val

                return s
            else:
                levels.append(next_level)
```

## [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/)

Another level traversal.

#### Mistake:

-   should return `val` not `node`

```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []

        levels = [[root]]

        result = [[root.val]]

        while levels:
            curr_level = levels.pop()
            next_level = []
            for node in curr_level:
                for child in (node.left, node.right):
                    if child:
                        next_level.append(child)
            if next_level:
                result.append(n.val for n in next_level)
                levels.append(next_level)

        return result
```

## [513. Find Bottom Left Tree Value](https://leetcode.com/problems/find-bottom-left-tree-value/description/)

Another level traversal

```python
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:

        def helper(root):
            if not root:
                return None

            if not root.right and not root.left:
                return root.val

            levels = [[root]]

            while levels:
                curr_row = levels.pop()
                next_row = []
                for node in curr_row:
                    for child in (node.left, node.right):
                        if child:
                            next_row.append(child)

                if next_row:
                    levels.append(next_row)
                else:
                    # means that we already reach the last row
                    return curr_row[0].val

        return helper(root)
```

## [701. Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/description/)

Did it intuitively, need to redo/revisit.

```python
class Solution:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:

        def helper(root, val):
            if not root:
                return TreeNode(val)
            if not root.left and val < root.val:
                root.left = TreeNode(val)
                return
            if not root.right and val > root.val:
                root.right = TreeNode(val)
                return

            if root.val > val:
                helper(root.left, val)

            if root.val < val:
                helper(root.right, val)

        res = helper(root, val)

        return res if res else root
```

## [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

Very classic problem. Base cases:

1/ if the node is `p` or `q` or `None`, return itself

Resursive call:

calling the both children with the resursive function, if both child return, it means that the current root is the result we need and we return it

If only one of the child has return, meaning that we found one but current node is not the LCA so we need to return the one we found

If no returns for either of the child, means we can just return None.

```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':

        def helper(root):
            if not root or root == p or root == q:
                return root

            r = helper(root.right)
            l = helper(root.left)

            if r and l:
                return root
            elif r:
                return r
            elif l:
                return l
            else:
                return None

        return helper(root)
```

## [669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/description/)

Class resursion, just need to be clear about the base case to avoid complex logic

```python
class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:

        def helper(root):

            if not root:
                return None
            if root.val < low:
                return helper(root.right)
            if root.val > high:
                return helper(root.left)

            root.left = helper(root.left)
            root.right = helper(root.right)

            return root

        return helper(root)

```

## [450. Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/description/)

```python
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:

        def helper(root, key):

            if not root:
                return root

            # passing down
            if key < root.val:
                root.left = helper(root.left, key)
            elif key > root.val:
                root.right = helper(root.right, key)
            else:
                # case that we need do the deletion

                # easy cases
                if not root.left:
                    return root.right
                if not root.right:
                    return root.left

                # hard case we need to find the smallest node on the right tree
                curr = root.right
                while curr.left:
                    curr = curr.left

                root.val = curr.val

                root.right = helper(root.right, root.val)

            return root
        return helper(root, key)
```

## [1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/)

#### Description

Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.

#### Tips

Traverse every node from top down, if every node knows about the maximum value from root till itself, we can easily decide if this node is good or not.

```python
class Solution:
    def goodNodes(self, root: TreeNode) -> int:

        if not root:
            return []

        # root count
        result = 0

        def helper(root, curr_max):
            nonlocal result
            if not root:
                return

            if curr_max <= root.val:
                result += 1

            for child in (root.left, root.right):
                helper(child, max(curr_max, root.val))

        helper(root, root.val)

        return result
```

## [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/)

Solve it at second try.
First try did not realize each node has 2 bounds
also, the bound for root node is min int and max int

```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:

        if not root:
            return True

        def helper(root, min_val, max_val):
            if not root:
                return True

            if min_val < root.val < max_val:
                left_result = helper(root.left, min_val, root.val)
                right_result = helper(root.right, root.val, max_val)
                if left_result and right_result:
                    return True
                else:
                    return False
            else:
                return False


        return helper(root, float('-inf'), float('inf'))
```

## [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/)

In order traveral and returen k - 1 index item

```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:

        in_order = []

        def traverse(root):

            nonlocal in_order

            if not root:
                return

            if not root.left and not root.right:
                in_order.append(root.val)
                return
            else:
                traverse(root.left)
                in_order.append(root.val)
                traverse(root.right)
                return
        traverse(root)

        return in_order[k - 1]
```

## [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/)

Finding the right index to separate the left and right tree and making sure the index is valid for array/list

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:

        def helper(preorder, inorder):
            if not preorder:
                return None
            if len(preorder) == 1:
                return TreeNode(preorder[0])

            left_and_right_pre_order = preorder[1:]

            # say root index is 7, means that left tree has 7 nodes
            # means that the first 7 node in left_and_right should be left tree node
            # left_and_right[:7]
            root_index = inorder.index(preorder[0])

            left_pre_order = left_and_right_pre_order[:root_index]
            right_pre_order = left_and_right_pre_order[root_index:]

            left_in_order = inorder[:root_index]
            right_in_order = inorder[root_index + 1:]

            curr_root = TreeNode(preorder[0])
            curr_root.left = helper(left_pre_order, left_in_order)
            curr_root.right = helper(right_pre_order, right_in_order)

            return curr_root

        return helper(preorder, inorder)
```

## [96. Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/description/)

Need to understand that `n` can translate to `n` unique nodes instead of just `1..n`

so the number of unique binary search trees of [1, 2, 3] is the same as [45, 34, 97]

Given a root node, the number of unique binary search trees is the number of unique left subtree \* the number of unique right subtree.

The intuitive solution can cause time out since there are so many recursive steps

adding a memo with a dictionary solve this problem.

```python
class Solution:

    def numTrees(self, n: int) -> int:
        # if n <= 1: return 1
        # return sum(self.numTrees(i-1) * self.numTrees(n-i) for i in range(1, n+1))
        d = {}

        def helper(n):

            nonlocal d

            if n <= 1:
                return 1

            curr_sum = 0

            for i in range(1, n + 1):

                # say n = 5 and i = 4
                # we need to find 1..3 and 5
                # i.e. 3 and 3
                # i.e. i - 1 and n - i
                if (i - 1) in d:
                    left_combo = d[i - 1]
                else:
                    left_combo = helper(i - 1)
                    d[i - 1] = left_combo

                if (n - i) in d:
                    right_combo = d[n - i]
                else:
                    right_combo = helper(n - i)
                    d[n - i] = right_combo

                curr_sum += left_combo * right_combo

            return curr_sum

        return helper(n)
```

Or we can utilize `@functools.cache` for memoization.

```python
import functools

class Solution:

    @functools.cache
    def numTrees(self, n: int) -> int:
        if n <= 1: return 1
        return sum(self.numTrees(i-1) * self.numTrees(n-i) for i in range(1, n+1))
```

## [894. All Possible Full Binary Trees](https://leetcode.com/problems/all-possible-full-binary-trees/description/)

similar to previous one but this time we are returning all the trees (with dummy nodes tho) instead of the number of trees.

```python
class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:

        d = {0: [], 1: [TreeNode()]}

        def recursive_helper(n):
            nonlocal d

            if n == 0:
                return []
            if n == 1:
                return [TreeNode()]
            if n in d:
                return d[n]
            res = []

            # 0 ... n - 1
            for i in range(n):
                # 0 ... i ... n - 1

                l = i
                r = n - 1 - i
                left_tree_list = recursive_helper(l)
                right_tree_list = recursive_helper(r)
                # these checks are not neccessary since it's covered by the double for loop
                # but good to have it to understand we are actually checking if it's full tree.
                if not left_tree_list and right_tree_list:
                    continue
                if not right_tree_list and left_tree_list:
                    continue

                for left_sub_tree in left_tree_list:
                    for right_sub_tree in right_tree_list:
                        res.append(TreeNode(0, left_sub_tree, right_sub_tree))
            d[n] = res
            return res

        return recursive_helper(n)

```

## [129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/description/)

No for fancy stuff, but need to create a helper and pass down the current from the top

```python
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:

        def helper(root, curr_sum_from_parent):
            if not root:
                return 0

            new_curr_sum = curr_sum_from_parent * 10 + root.val
            # this is a leave, we should
            if not root.left and not root.right:
                return new_curr_sum
            else:
                return helper(root.left, new_curr_sum) + helper(root.right, new_curr_sum)

        return helper(root, 0)
```

## [337. House Robber III](https://leetcode.com/problems/house-robber-iii/description/)

Simple DP

```python
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:

        # return [max_value_if_rob_root, max_value_withtout_root]

        def helper(root):
            if not root:
                return [0, 0]

            max_with_left, max_without_left = helper(root.left)
            max_with_right, max_without_right = helper(root.right)

            # max_with_curr can't pick left or right
            max_with_curr = root.val +  max_without_left + max_without_right

            # max_without_curr has no rules of picking
            max_without_curr = max([max_with_left, max_without_left]) + max([max_with_right, max_without_right])

            return [max_with_curr, max_without_curr]

        return max(helper(root))
```

## [951. Flip Equivalent Binary Trees](https://leetcode.com/problems/flip-equivalent-binary-trees/description/)

First tried I thought it was exact mirror but after reading the problem again, I modified the answer to the current one.

```python
class Solution:
    def flipEquiv(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:

        # return True/False
        def helper(r1, r2):

            # both are None
            if not r1 and not r2:
                return True
            # only one of them is None
            if not r1 or not r2:
                return False
            # both are not None but diff val
            if r1.val != r2.val:
                return False

            # flip case
            res1 = helper(r1.left, r2.right)
            res2 = helper(r1.right, r2.left)

            if res1 and res2:
                return True
            else:
                # flip failed, let's try non-flip case
                res3 = helper(r1.left, r2.left)
                res4 = helper(r1.right, r2.right)

                if res3 and res4:
                    return True
                else:
                    return False

        return helper(root1, root2)
```

## [538. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree/description/)

In-order traverse and put it in a stack. Pop one by one then update.

```python
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:

        in_order_list = []

        def helper(root):
            nonlocal in_order_list

            if not root:
                return

            helper(root.left)
            in_order_list.append(root)
            helper(root.right)

        helper(root)

        curr_sum = 0

        while in_order_list:
            curr_node = in_order_list.pop()
            curr_node.val += curr_sum
            curr_sum = curr_node.val

        return root
```

## [124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)

Did it without any help kinda ugly.

The idea is find the max path sum that include the current root, meaning that need to find the max of (root.left.val + root.val, root.val, root.right.val + root.val)

```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:

        if not root:
            return 0
        if not root.left and not root.right:
            return root.val

        curr_max = float('-inf')

        # get the path sum of leaf to root
        def helper(root):
            nonlocal curr_max

            if not root:
                return 0
            if not root.left and not root.right:
                curr_max = max(curr_max, root.val)
                return root.val


            l = helper(root.left)
            r = helper(root.right)

            if root.left and root.right:
                curr_max = max(curr_max, r + l + root.val, l + root.val, r + root.val, root.val)
            elif root.left:
                curr_max = max(curr_max, l + root.val, l + root.val, root.val)
            else:
                curr_max = max(curr_max, r + root.val, r + root.val, root.val)

            return max(l + root.val, r + root.val, root.val)

        helper(root)

        return curr_max

```

More elegant way to do it, but same idea.

```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:

        curr_max = float('-inf')

        def helper(root):
            nonlocal curr_max

            if not root:
                return 0

            # we can take the left part or not (when left part it's negative, we should give up)
            left_max_path = max(0, helper(root.left))
            right_max_path = max(0, helper(root.right))

            max_include_root = left_max_path + right_max_path + root.val

            curr_max = max(curr_max, max_include_root)

            return root.val + max(left_max_path, right_max_path)
        helper(root)

        return curr_max
```

## [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/)

Took couple of tries. The idea is to serialize in a in-order or post-order maner with None nodes.

#### Mistake

-   Initially, I tried to store the tree like `##2##4##531` but this way a double digit or nagetive number will be messed up. Thus, try to store in a array first and do `" ".join(array)` + `str.split()`

```python
class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.

        :type root: TreeNode
        :rtype: str
        """
        res_list = []
        # post order traverse and append to res
        # #,#,2,#,#,4,#,#,5,3,1
        def helper(root):

            nonlocal res
            if not root:
                res_list.append('#')
                return
            helper(root.left)
            helper(root.right)
            res_list.append(str(root.val))

            return

        helper(root)
        res = " ".join(res_list)
        return res


    def deserialize(self, data):
        """Decodes your encoded data to tree.

        :type data: str
        :rtype: TreeNode
        """
        data_list = data.split()

        def helper():

            if not data_list:
                return
            root_val = data_list.pop()
            if root_val == "#":
                return None

            root = TreeNode(int(root_val))
            root.right = helper()
            root.left = helper()

            return root

        return helper()
```
