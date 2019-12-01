package main

import "testing"

func TestCalculateFuelRequirement(t *testing.T) {
	result := calculateFuelRequirement(12)
	if result != 2 {
		t.Errorf("calculateFuelRequirement(12) failed. Expected %v, got %v", 2, result)
	}

	result = calculateFuelRequirement(14)
	if result != 2 {
		t.Errorf("calculateFuelRequirement(14) failed. Expected %v, got %v", 2, result)
	}
}
