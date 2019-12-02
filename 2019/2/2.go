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

func processStrip(dataStrip []int) string {
	fmt.Println(dataStrip)
	return ""
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
