package main

import "testing"

func TestCalculateFuelRequirement(t *testing.T) {
	result := calculateFuelRequirement(12)
	if result != 2 {
		t.Errorf("calculateFuelRequirement(12) failed. Expected %v, got %v", 2, result)
	}
}
