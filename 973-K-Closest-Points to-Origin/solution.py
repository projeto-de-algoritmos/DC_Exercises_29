import math
from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        def distancia(x, y):
            return math.sqrt(x ** 2 + y ** 2)

        distances = [(distancia(x, y), [x, y]) for x, y in points]
        distances.sort(key=lambda d: d[0])

        return [point for _, point in distances[:k]]

        def encontrar_k_pontos(points, k, start, end):
            if start >= end:
                return points[:k]

            pivot_index = escolher_pivo(points, start, end)
            pivot_dist = distancia(*points[pivot_index])

            points[pivot_index], points[end] = points[end], points[pivot_index]
            i = start
            for j in range(start, end):
                if distancia(*points[j]) <= pivot_dist:
                    points[i], points[j] = points[j], points[i]
                    i += 1

            points[i], points[end] = points[end], points[i]

            if i - start + 1 == k:
                return points[:i + 1]
            elif i - start + 1 < k:
                return encontrar_k_pontos(points, k - (i - start + 1), i + 1, end)
            else:
                return encontrar_k_pontos(points, k, start, i - 1)

        def escolher_pivo(points, start, end):
            if end - start < 5:
                return start + (end - start) // 2

            medians = []
            for i in range(start, end + 1, 5):
                subarray = points[i:i + 5]
                subarray.sort(key=lambda p: distancia(*p))
                median_index = start + (i - start) // 5
                medians.append(subarray[2])

            return encontrar_k_pontos(medians, (end - start + 1) // 5, 0, len(medians) - 1)[0]

        return encontrar_k_pontos(points, k, 0, len(points) - 1)
