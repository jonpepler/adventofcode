package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	data, err := readFileToNums("input/2.txt")
	if err != nil {
		panic(err)
	}

	out := processStrip(data)
	fmt.Println(out[0])
}

func processStrip(dataStrip []int) []int {
	idx := 0
	for cap(dataStrip) > idx {
		op := dataStrip[idx]

		switch op {
		case 1:
			op1 := dataStrip[idx+1]
			op2 := dataStrip[idx+2]
			pos := dataStrip[idx+3]
			dataStrip[pos] = dataStrip[op1] + dataStrip[op2]
			idx += 3
		case 2:
			op1 := dataStrip[idx+1]
			op2 := dataStrip[idx+2]
			pos := dataStrip[idx+3]
			dataStrip[pos] = dataStrip[op1] * dataStrip[op2]
			idx += 3
		case 99:
			idx = cap(dataStrip)
		default:
			fmt.Println(op)
			panic("bad op")
		}

		idx++
	}
	return dataStrip
}

func readFileToNums(fname string) (nums []int, err error) {
	b, err := ioutil.ReadFile(fname)
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(b), ",")
	nums = make([]int, 0, len(lines))

	for _, line := range lines {
		if len(line) == 0 {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			return nil, err
		}
		nums = append(nums, n)
	}

	return nums, nil
}
