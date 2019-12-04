package main

import (
	"fmt"
	"sort"
	"strconv"
)

func main() {
	fmt.Println(neverDecreases(3345))
	fmt.Println(neverDecreases(5443))
}

func neverDecreases(num int) bool {
	runes := runeSlice(num)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	sortedNum, _ := strconv.Atoi(string(runes))
	return num == sortedNum
}

func hasTwoAdjacentNums(num int) bool {
	runes := runeSlice(num)
	previous := '-'

	for _, r := range runes {
		if r == previous {
			return true
		}
		previous = r
	}

	return false
}

func runeSlice(num int) []rune {
	return []rune(strconv.Itoa(num))
}
