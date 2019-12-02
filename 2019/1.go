package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	nums, err := readFileToNums("input/1.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(calculateTotalFuel(nums))
}

func calculateFuelRequirement(moduleMass int) int {
	return (moduleMass / 3) - 2
}

func calculateFuelRequirements(moduleMasses []int) (acc int) {
	for _, value := range moduleMasses {
		acc += calculateFuelRequirement(value)
	}
	return acc
}

func calculateTotalFuel(moduleMasses []int) (total int) {
	for _, moduleMass := range moduleMasses {
		acc := calculateFuelRequirement(moduleMass)
		fuel := calculateFuelRequirement(acc)

		for fuel > 0 {
			acc += fuel
			fuel = calculateFuelRequirement(fuel)
		}

		total += acc
	}
	return
}

func readFileToNums(fname string) (nums []int, err error) {
	b, err := ioutil.ReadFile(fname)
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(b), "\n")
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
