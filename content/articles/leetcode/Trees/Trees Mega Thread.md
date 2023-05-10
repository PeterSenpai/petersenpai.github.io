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
