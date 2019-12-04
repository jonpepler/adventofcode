package main

import (
	"fmt"
	"sort"
	"strconv"
)

func main() {
	min := 240298
	max := 784956
	matches := 0

	for i := min + 1; i < max; i++ {
		if neverDecreases(i) && hasTwoAdjacentNums(i) {
			fmt.Print(".")
			matches++
		}
	}
	fmt.Printf("\nMatches: %v", matches)
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
	idx := 0

	matchCount := 0
	for idx < len(runes) {
		if idx == 0 {
			idx++
			continue
		}

		if runes[idx] == runes[idx-1] {
			matchCount++
		} else {
			if matchCount == 1 {
				return true
			}
			matchCount = 0
		}

		if idx == len(runes)-1 && matchCount == 1 {
			return true
		}

		idx++
	}

	return false
}

func runeSlice(num int) []rune {
	return []rune(strconv.Itoa(num))
}
