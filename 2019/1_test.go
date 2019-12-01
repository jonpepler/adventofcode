package main

import "testing"

type TestData struct {
	input          int
	expectedResult int
}

func TestCalculateFuelRequirement(t *testing.T) {
	tests := []TestData{
		{12, 2},
		{14, 2},
		{1969, 654},
		{100756, 33583},
	}

	for _, test := range tests {
		result := calculateFuelRequirement(test.input)
		if result != test.expectedResult {
			t.Errorf("calculateFuelRequirement(%v) failed. Expected %v, got %v", test.input, test.expectedResult, result)
		}
	}
}
