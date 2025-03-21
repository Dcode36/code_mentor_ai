export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  testCases: Array<{
    input: string;
    output: string;
  }>;
  companies: string[];
  hints?: string[]; // Optional hints array
}

export const dsaQuestions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "easy",
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    companies: ["Amazon", "Google", "Microsoft"],
    hints: ["Use a hash map for quick lookups", "Check for complements while iterating"]
  },
  {
    id: 2,
    title: "Reverse Linked List",
    description: "Reverse a singly linked list.",
    difficulty: "medium",
    testCases: [{ input: "1->2->3->4->5->NULL", output: "5->4->3->2->1->NULL" }],
    companies: ["Facebook", "Apple", "Adobe"],
    hints: ["Use recursion or an iterative approach with two pointers"]
  },
  {
    id: 3,
    title: "Merge Intervals",
    description: "Given an array of intervals, merge all overlapping intervals.",
    difficulty: "medium",
    testCases: [{ input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    companies: ["Google", "Microsoft", "Uber"],
  },
  {
    id: 4,
    title: "Valid Parentheses",
    description: "Given a string containing just the characters (), {}, and [], determine if the input string is valid.",
    difficulty: "easy",
    testCases: [
      { input: '"()"', output: "true" },
      { input: '"(]"', output: "false" },
    ],
    companies: ["Amazon", "Google"],
    hints: ["Use a stack to track open brackets"]
  },
  {
    id: 5,
    title: "Best Time to Buy and Sell Stock",
    description: "Find the maximum profit given an array of stock prices.",
    difficulty: "easy",
    testCases: [{ input: "[7,1,5,3,6,4]", output: "5" }],
    companies: ["Amazon", "Bloomberg"],
  },
  {
    id: 6,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    testCases: [{ input: '"abcabcbb"', output: "3" }],
    companies: ["Google", "Facebook"],
  },
  {
    id: 7,
    title: "Container With Most Water",
    description: "Find two lines that form a container that holds the most water.",
    difficulty: "medium",
    testCases: [{ input: "[1,8,6,2,5,4,8,3,7]", output: "49" }],
    companies: ["Facebook", "Microsoft"],
  },
  {
    id: 8,
    title: "Product of Array Except Self",
    description: "Return an array answer such that answer[i] is the product of all elements except nums[i].",
    difficulty: "medium",
    testCases: [{ input: "[1,2,3,4]", output: "[24,12,8,6]" }],
    companies: ["Microsoft", "Google"],
  },
  {
    id: 9,
    title: "Trapping Rain Water",
    description: "Compute how much water can be trapped after raining.",
    difficulty: "hard",
    testCases: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    companies: ["Adobe", "Apple"],
  },
  {
    id: 10,
    title: "Binary Search",
    description: "Search for a target value in a sorted array using binary search.",
    difficulty: "easy",
    testCases: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }],
    companies: ["Amazon", "Google"],
    hints: ["Use the divide and conquer approach"]
  },
  {
    id: 11,
    title: "Climbing Stairs",
    description: "Given n steps, count the number of ways to climb to the top.",
    difficulty: "easy",
    testCases: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" },
    ],
    companies: ["Facebook", "Microsoft"],
  },
  {
    id: 12,
    title: "Maximum Depth of Binary Tree",
    description: "Return the maximum depth of a binary tree.",
    difficulty: "easy",
    testCases: [{ input: "[3,9,20,null,null,15,7]", output: "3" }],
    companies: ["Microsoft", "Amazon"],
  },
  {
    id: 13,
    title: "Kth Largest Element in an Array",
    description: "Find the kth largest element in an unsorted array.",
    difficulty: "medium",
    testCases: [{ input: "[3,2,1,5,6,4], k = 2", output: "5" }],
    companies: ["Google", "Amazon"],
  }
];
