package main

import "testing"

type TestData struct {
	input          int
	expectedResult bool
}

func TestNeverDecreases(t *testing.T) {
	tests := []TestData{
		{345, true},
		{543, false},
	}

	for _, test := range tests {
		result := neverDecreases(test.input)
		if result != test.expectedResult {
			t.Errorf("neverDecreases(%v) failed. Expected %v, got %v", test.input, test.expectedResult, result)
		}
	}
}

func TestHasTwoAdjacentNums(t *testing.T) {
	tests := []TestData{
		{345, false},
		{543, false},
		{3445, true},
		{3345, true},
		{33445, true},
		{3455, true},
	}

	for _, test := range tests {
		result := hasTwoAdjacentNums(test.input)
		if result != test.expectedResult {
			t.Errorf("hasTwoAdjacentNums(%v) failed. Expected %v, got %v", test.input, test.expectedResult, result)
		}
	}
}
