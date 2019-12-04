package main

import (
	"fmt"
	"io/ioutil"
	"strings"

	"./wire"
)

func main() {
	data := getData()
	matching := wire.GetMatchingCoords(data[0], data[1])
	lowest := wire.LowestCoord(matching)
	fmt.Println(wire.ManhattanDistanceTo0(lowest))
}

func getData() []wire.Wire {
	data, err := readFileToWires("input/3.txt")
	if err != nil {
		panic(err)
	}

	return data
}

func readFileToWires(fname string) (wires []wire.Wire, err error) {
	b, err := ioutil.ReadFile(fname)
	if err != nil {
		return
	}

	lines := strings.Split(string(b), "\n")
	for _, line := range lines {
		wires = append(wires, wire.New(line))
	}

	return
}
