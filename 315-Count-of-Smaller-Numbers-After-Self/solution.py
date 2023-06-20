class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        def merge_sort(arr, count):
            if len(arr) <= 1:
                return arr

            mid = len(arr) // 2
            left = merge_sort(arr[:mid], count)
            right = merge_sort(arr[mid:], count)
            merged = []
            i, j = 0, 0
            inversions = 0

            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    merged.append(left[i])
                    count[left[i][1]] += inversions
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1
                    inversions += 1

            while i < len(left):
                merged.append(left[i])
                count[left[i][1]] += inversions
                i += 1

            while j < len(right):
                merged.append(right[j])
                j += 1

            return merged

        count = [0] * len(nums)
        indexed_nums = [(nums[i], i) for i in range(len(nums))]
        merge_sort(indexed_nums, count)
        return count
