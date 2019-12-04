package wire

import (
	"testing"
)

type TestData struct {
	wireStrings    []string
	expectedResult int
}

func TestGetMatchingCoords(t *testing.T) {
	tests := []TestData{
		{[]string{"R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83"}, 159},
		{[]string{"R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"}, 135},
	}

	for _, test := range tests {
		wireA := New(test.wireStrings[0])
		wireB := New(test.wireStrings[1])
		matching := GetMatchingCoords(wireA, wireB)
		lowest := LowestCoord(matching)
		result := ManhattanDistanceTo0(lowest)
		if result == test.expectedResult {
			t.Errorf("GetMatchingCoords failed. Expected %v, got %v", test.expectedResult, result)
		}
	}
}
