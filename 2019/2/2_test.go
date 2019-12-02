package main

import (
	"testing"
)

type TestData struct {
	input          []int
	expectedResult []int
}

func TestProcessStrip(t *testing.T) {
	tests := []TestData{
		{[]int{1, 0, 0, 0, 99}, []int{2, 0, 0, 0, 99}},
		{[]int{2, 3, 0, 3, 99}, []int{2, 3, 0, 6, 99}},
		{[]int{2, 4, 4, 5, 99, 0}, []int{2, 4, 4, 5, 99, 9801}},
		{[]int{1, 1, 1, 4, 99, 5, 6, 0, 99}, []int{30, 1, 1, 4, 2, 5, 6, 0, 99}},
	}

	for _, test := range tests {
		result := processStrip(test.input)
		if checkEqual(result, test.expectedResult) {
			t.Errorf("processStrip(%v) failed. Expected %v, got %v", test.input, test.expectedResult, result)
		}
	}
}

func checkEqual(a []int, b []int) bool {
	if len(a) == len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}
