package wire

import (
	"sort"
	"strconv"
	"strings"
)

// Wire stores the input string
type Wire struct {
	coordinateList []Coord
}

// Coord stores a simple x,y coordinate
type Coord struct {
	x            int
	y            int
	wireDistance int
}

// New creates a new wire object
func New(inputString string) Wire {
	return Wire{getCoordinates(inputString)}
}

// getCoordinates returns a list of all coordinates the wire uses, starting from (but not including) 0,0
func getCoordinates(wire string) (coordinates []Coord) {
	ops := strings.Split(wire, ",")
	current := Coord{0, 0, 0}
	for _, op := range ops {
		direction := op[:1]
		distance, _ := strconv.Atoi(op[1:])

		for i := 0; i < distance; i++ {
			switch direction {
			case "R":
				current.x++
			case "L":
				current.x--
			case "U":
				current.y++
			case "D":
				current.y--
			}
			current.wireDistance++
			coordinates = append(coordinates, current)
		}
	}
	return coordinates
}

// CoordsAreEqual confirms if two coordinates have the same X and Y values (NOT wire distance)
func CoordsAreEqual(a Coord, b Coord) bool {
	return a.x == b.x && a.y == b.y
}

// GetMatchingCoords returns a set of shared coords between two arrays
func GetMatchingCoords(aWire Wire, bWire Wire) []Coord {
	a := aWire.coordinateList
	b := bWire.coordinateList
	set := make([]Coord, 0)

	for _, coord := range b {

		if contains, mixedCoord := CoordListContains(a, coord); contains {
			set = append(set, mixedCoord)
		}
	}

	return set
}

// CoordListContains returns true if a coord is found in a list of coords
func CoordListContains(coords []Coord, coordX Coord) (bool, Coord) {
	for _, coord := range coords {
		if CoordsAreEqual(coord, coordX) {
			return true, Coord{coord.x, coord.y, coord.wireDistance + coordX.wireDistance}
		}
	}
	return false, Coord{0, 0, 0}
}

// LowestCoord returns the lowest coord from a list
func LowestCoord(coords []Coord) Coord {
	sort.Slice(coords, func(i, j int) bool {
		return ManhattanDistanceTo0(coords[i]) < ManhattanDistanceTo0(coords[j])
	})
	return coords[0]
}

// LowestCoordByDistance returns the lowest coord from a list, sorted by wireDistance
func LowestCoordByDistance(coords []Coord) Coord {
	sort.Slice(coords, func(i, j int) bool {
		return coords[i].wireDistance < coords[j].wireDistance
	})
	return coords[0]
}

// ManhattanDistanceTo0 returns the distance from (0,0) for the coord
func ManhattanDistanceTo0(coord Coord) int {
	return abs(coord.x) + abs(coord.y)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// WireDistance returns the wireDistance property of a Coord
func (c Coord) WireDistance() int {
	return c.wireDistance
}
