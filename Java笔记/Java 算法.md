## 冒泡排序
> 冒泡排序是一种简单的排序算法，它重复地遍历要排序的列表，比较相邻的两个元素，并按照大小顺序交换它们，直到整个列表排序完成。
>

```java
import java.util.Arrays;

public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换arr[j]和arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.println("排序后的数组：" + Arrays.toString(arr)); // 排序后的数组：[11, 12, 22, 25, 34, 64, 90]
    }
}
```

## 选择排序
> 每次从未排序的部分选择最小的元素，将其与未排序部分的第一个元素交换位置。重复这个过程，直到整个数组排序完成。在每次迭代中，通过比较找到未排序部分的最小元素的索引，然后将其与未排序部分的第一个元素交换位置。
>

```java
import java.util.Arrays;

public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            int minIndex = i;
            for (int j = i+1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.println("排序后的数组：" + Arrays.toString(arr)); // 排序后的数组：[11, 12, 22, 25, 64]
    }
}
```

## 二分查找法
> 该方法使用了一个`**while**`循环来不断缩小搜索范围，直到找到目标元素或搜索范围为空。在每一次循环中，通过计算中间元素的索引来确定搜索范围的中点，并根据中点元素与目标元素的大小关系来更新搜索范围的左右边界。
>

```java
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1; // 如果找不到目标元素，则返回-1
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9};
        int target = 5;
        int result = binarySearch(arr, target);

        if (result == -1) {
            System.out.println("目标元素不存在");
        } else {
            System.out.println("目标元素在数组中的索引为：" + result); // 2
        }
    }
}
```

