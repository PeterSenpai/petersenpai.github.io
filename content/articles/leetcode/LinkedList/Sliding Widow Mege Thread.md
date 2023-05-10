---
title: "Sliding Window Mega Thread"
description: "Linked List Leetcode"
date: "2023-05-04"
banner:
    src: "../../../images/leetcode.png"
    alt: "First Markdown Post"
    caption: 'Linked List <u><a href="https://leetcode.com/tag/sliding-window/"> LeetCode</a></u>'
categories:
    - "Sliding Window"

keywords:
    - "Sliding Window"
    - "Leetcode"
---

## Sliding window fundamentals

#### Problem type and windows

Sliding windows problem usually combines with arrays or strings. Windows is usually defined by left and right pointers. In a lot of situations, we move the right pointer as we iterate the array, the left pointer usually moves on conditions.

#### Sub-array/strings

One of the key knowledge to know for these problems is to know how to calculate the number of sub-array using indexes.

**The basic:** the total number of sub-array that end with index `j` is `j + 1`.

```python
# j == 7
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
#                j
#   [1, 2, 3, 4, 5]
#      [2, 3, 4, 5]
#         [3, 4, 5]
#            [4, 5]
#               [5]
```

If we iterate `j` from `[0, len(a))` we can calculate all the sub-arrays of `a`.

**Next:** the total number of sub-arrays that are left-bounded by index `i` and end with index `j` is `j - i + 1`. (Note that, it doesn't have to start at index `i` only left-bounded.)

`j - i + 1` is quite common in solutions. It can be used to get all the sub-arrays that contain `a[j]` but not `a[i-1]`

```python
# i == 2 and j ==7
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
#          i              j
#         [3, 4, 5, 6, 7, 8]
#            [4, 5, 6, 7, 8]
#               [5, 6, 7, 8]
#                  [6, 7, 8]
#                     [7, 8]
#                        [8]
```

**Moreover:** the total number of sub-arrays that are left-bounded by index `x`, right-bounded by `y` and end with index `j` is `y - x`.
`j - x + 1` - `j - y + 1` = `y - x`

```python
# x == 2 and y == 4 and  j ==7
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
#          x     y        j
#         [3, 4, 5, 6, 7, 8]
#            [4, 5, 6, 7, 8]
#               [5, 6, 7, 8]
```

Sometimes, the window (`[y, j]`) is not enough to capture all sub-arrays, the sub-array can also be extended left to `x`.
In this case `y - x` is useful for getting all the sub-arrays that must have `a[y] - a[j]` but not `a[x-1]`

#### Window

We often define `i` and `j` as the left and right bounds of the window.

We often want the stuff in window has some thing we want.

We do that by expand the window on the right and every step we check if this is the window we want.

**For shortest window**

When the window satisfies our need, it usually already over shoot, meaning it contain more than we want. Which makes sense since we haven't update `i`. Then, to find the perfect window we need to start moving `i` and every move will do a check again to see if this is the window we want till we find the smallest window and `i` end up in a position that break the window.

**For largest window**

This case is relatively easier than the previous one. The check usually always pass as we expand the window and we keep update the result till the window isn't validate. Then we start moving `i` till it can't.

## Common Problems

-   [485. Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/description/)
-   [487. Max Consecutive Ones II](https://leetcode.com/problems/max-consecutive-ones-ii)
-   [1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/description/)
-   [340. Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)
-   [904. Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/description/)
-   [1234. Replace the Substring for Balanced String](https://leetcode.com/problems/replace-the-substring-for-balanced-string/description/)
-   [1248. Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/description/)
-   [930. Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/description/)
-   [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/description/)
-   [862. Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/)
-   []()

## [485. Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/description/)

This problem is not entirely a sliding window but gives you a sense of iterating, checking, updating, etc.

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        result = 0
        curr_length = 0

        for idx, value in enumerate(nums):
            if value == 1:
                curr_length += 1
                result = max(curr_length, result)
            else:
                curr_length = 0

        return result
```

## [487. Max Consecutive Ones II](https://leetcode.com/problems/max-consecutive-ones-ii)

This problem is a classic sliding window.

Description:
Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

We iteration the list using j as index, value as the value

We are not actually flipping/changing anything. We can create a zero counter when ever we see a zero we increase it and assume that element is an one. However, we can't infinitely increase it. When zeros is greater than 1 means that we have seen two 0s, we need to move the left pointer till the first 0 position (it's actually next of the first zero) and set zeros back to 1.

once we ensure zero <= 1, we can say that `array[i:j + 1]` is a valid sub-array and we can get the length of it (`j - i + 1`).

#### Mistakes:

-   Instead of using while, use if and set the i directly to j. This is not correct since i should be move to the closest 0 near it, and we don't know where it is.

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        zeros = 0
        i = 0
        result = 0

        for j, value in enumerate(nums):
            if value == 0:
                zeros += 1

            while zeros > 1:
                if nums[i] == 0:
                    zeros -= 1
                i += 1

            result = max(result, j - i + 1)

        return result
```

## [1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/description/)

This is a perfect extension of the previous problem, instead of flipping one 0, we have k flips. The only modification is the condition of the while loop

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        zeros = i = result = 0

        for j, value in enumerate(nums):
            if value == 0:
                zeros += 1

            while zeros > k:
                if nums[i] == 0:
                    zeros -= 1
                i += 1
            result = max(result, j - i + 1)
        return result

```

## [340. Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)

previously, we rely on `k` and `zeros` to update `i`. This question we are using a dictionary to store info, and compare `len(d)` and `k` to update `i`.

#### Mistakes

-   `d[c] = j` is important. We need to know exactly the key and value of the dictionary.

```python
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:

        i = 0
        d = {}
        result = 0

        for j, c in enumerate(s):
            d[c] = j
            while len(d) > k:
                min_index = min(d.values())
                del d[s[min_index]]
                i = min_index + 1
            result = max(result, j - i + 1)

        return result

```

## [904. Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/description/)

This question is almost identical as the previous one with k == 2.

The hardest part is to understand the question itself

```python
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:

        d = {}
        res = 0
        i = 0

        for j, fruite in enumerate(fruits):
            d[fruite] = j

            while len(d) > 2:
                smallest_idx = min(d.values())
                del d[fruits[smallest_idx]]
                i = smallest_idx + 1

            res = max(res, j - i + 1)

        return res
```

## [1234. Replace the Substring for Balanced String](https://leetcode.com/problems/replace-the-substring-for-balanced-string/description/)

#### Description:

You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', and 'R'.

A string is said to be **balanced** if each of its characters appears n / 4 times where n is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0.

#### Tips:

Since this is a sub-string replacement, we can use sliding window to solve.

Remember that we are trying to find the right window to update the result.

Right window would make the not balanced part.

#### Steps:

We create a counter/dictionary with (key, value) as (character in `s`, apperance time). The perfect case would be all values are equal (equal to `len(s) / 4` ) i.e. `{'Q': 5, 'W': 5, 'E': 5, 'R': 5}` but usually it doesn't happen.

We start to right-expanding the window (increase `j`) and as we go we decrease the counter for the currrent character i.e. `counter[s[j]] - 1`. The idea is to try to expanding the sub-string we need to get rid of till all the counters is smaller or equal to what it should be (`len(s) / 4`).

In the previous process, we might overshoot since we weren't touching `i`. We can now starting to increase `i` as long as all the counters is smaller or equal than it should be. While we are in this condition, update the result

```python
import collections
class Solution:
    def balancedString(self, s: str) -> int:

        counter = collections.Counter(s)
        res = size = len(s)
        balance_value = len(s) / 4
        i = 0

        for j, c in enumerate(s):
            counter[c] -= 1

            while i < size and all(counter[char] <= balance_value for char in 'QWER'):

                counter[s[i]] += 1
                res = min(res, j - i + 1)
                i += 1

        return res
```

A more intuitive way to do it is to find all the extra characters that need
to be removed. Then we can convert this problem to sub-string that need to contain some characters x times.

```python
import collections
class Solution:
    def balancedString(self, s: str) -> int:

        counter = collections.Counter(s)
        res = size = len(s)
        balance_value = size / 4
        char_need_to_be_removed = {}

        for char, times in counter.items():
            if times > balance_value:
                char_need_to_be_removed[char] = times - balance_value

        if not char_need_to_be_removed:
            return 0

        i = 0
        for j, char in enumerate(s):
            if char in char_need_to_be_removed:
                char_need_to_be_removed[char] -= 1

            while max(char_need_to_be_removed.values()) <= 0:
                res = min(res, j - i + 1)
                if s[i] in char_need_to_be_removed:
                    char_need_to_be_removed[s[i]] += 1
                i += 1
        return res
```

## [1248. Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/description/)

The question wants to find the number of sub array that contain exactly k odds.

We can use a technique to do it. We can find all the number of sub-array that has [0, k] odds, same for [0, k - 1]. we substract them and get exact number.

```python
class Solution:
    def numberOfSubarrays(self, nums: List[int], k: int) -> int:
        def subarray_has_at_most_k_odd(nums, k):
            res = 0
            i = 0
            odds = 0

            for j, val in enumerate(nums):
                if val % 2 == 1:
                    odds += 1

                while odds > k:
                    if nums[i] % 2 == 1:
                        odds -= 1
                    i += 1
                res += j - i + 1
            return res

        return subarray_has_at_most_k_odd(nums, k) - subarray_has_at_most_k_odd(nums, k - 1)

```

There's another way to do it. Although it's hard to come up with this method since we might need to understand the way that `i` move won't effect future window since it only move on zeros.

```python
class Solution:
    def numberOfSubarrays(self, nums: List[int], k: int) -> int:
        odds = 0
        res = 0
        current_valid_sub = 0
        i = 0

        for j, n in enumerate(nums):
            if n % 2 == 1:
                odds += 1
                current_valid_sub = 0
            else:
                current_valid_sub = current_valid_sub

            while odds == k:
                current_valid_sub += 1
                if nums[i] % 2 == 1:
                    odds -= 1
                i += 1

            res += current_valid_sub

        return res
```

## [930. Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/description/)

Very similar to the previous one, we need to find the number of subarray that sum up to exactly `goal`. We can find all the subarray that sum up at most `goal` and `goal - 1` then substract them.

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        def num_of_sub_array_with_sum_at_most_goal(nums, k):

            if k < 0:
                return 0
            res = 0
            curr_sum = 0
            i = 0
            for j, n in enumerate(nums):
                curr_sum += n

                while curr_sum > k:
                    curr_sum -= nums[i]
                    i += 1
                res += j - i + 1

            return res

        return num_of_sub_array_with_sum_at_most_goal(nums, goal) - num_of_sub_array_with_sum_at_most_goal(nums, goal - 1)
```

Another way to do it, but this method is not recommanded since it has to deal with a lot of edge cases

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:

        res = 0
        i = 0
        curr_sum = 0
        curr_valid_sub_array = 0

        for j, n in enumerate(nums):
            curr_sum += n

            if n == 1:
                curr_valid_sub_array = 0

            while curr_sum >= goal and i <= j:
                if curr_sum == goal:
                    curr_valid_sub_array += 1
                curr_sum -= nums[i]
                i += 1


            res += curr_valid_sub_array

        return res

```

## [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/description/)

Should not be too hard, classic stuff. The only reason is problem is medium and way easier than the next one is that all the number are positive. Which means that the while loop stop is valid.

#### Mistake:

-   `sum(nums) < target` is a thing.

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:

        if sum(nums) < target:
            return 0

        size = res = len(nums)
        curr_sum = i = 0

        for j, n in enumerate(nums):
            curr_sum += n

            while curr_sum >= target:
                curr_sum -= nums[i]
                res = min(res, j - i + 1)
                i += 1

        return res

```

## [862. Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/)

This is not a sliding window problem, it's a classic MQ problem https://1e9.medium.com/monotonic-queue-notes-980a019d5793.

Tried BF but timeout (correct tho).

```python

class Solution:
    def shortestSubarray(self, nums: List[int], k: int) -> int:

        # prefix_sum = [0]

        # for n in nums:
        #     curr_sum = prefix_sum[-1]
        #     prefix_sum.append(n + curr_sum)

        # print(prefix_sum)
        # res = float('inf')
        # for i, n in enumerate(prefix_sum):
        #     for j in range(i + 1, len(prefix_sum)):
        #         if prefix_sum[j] - prefix_sum[i] >= k:
        #             res = min(res, j - i)

        # if res > len(nums):
        #     return -1

        # return res

        d = collections.deque([[0, 0]])
        res, cur = float('inf'), 0
        for i, a in enumerate(nums):
            cur += a
            while d and cur - d[0][1] >= k:
                res = min(res, i + 1 - d.popleft()[0])
            while d and cur <= d[-1][1]:
                d.pop()
            d.append([i + 1, cur])
        return res if res < float('inf') else -1
```
