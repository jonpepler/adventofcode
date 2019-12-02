package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	data := getData()
	target := 19690720
	attempt := 0
	p1 := -1
	p2 := 0
	for target != attempt {
		p1++
		if p1 == 100 {
			p2++
			p1 = 0
		}
		data = processStrip(newData(p1, p2))
		attempt = data[0]
	}

	fmt.Printf("100 * %v + %v = %v\n", p1, p2, (100*p1 + p2))
}

func getData() []int {
	data, err := readFileToNums("input/2.txt")
	if err != nil {
		panic(err)
	}

	return data
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

func newData(p1 int, p2 int) []int {
	data := getData()
	data[1] = p1
	data[2] = p2
	return data
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
