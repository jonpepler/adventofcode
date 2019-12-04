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
	s := strconv.Itoa(num)
	runes := []rune(s)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	sortedNum, _ := strconv.Atoi(string(runes))
	return num == sortedNum
}

func hasTwoAdjacentNums(num int) bool {
	return false
}
