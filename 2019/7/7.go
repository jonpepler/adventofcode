package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	bestResult := 0
	bestInput := []int{}

	permutations := makePermutations()

	for _, permutation := range permutations {
		result := thrusterTest(permutation)
		if result > bestResult {
			bestResult = result
			bestInput = permutation
		}
	}
	fmt.Printf("Best Output: %v\n\n", bestResult)
	fmt.Println(bestInput)
}

func makePermutations() (permutations [][]int) {
	inputs := []int{0, 1, 2, 3, 4}
	heapPermutation(inputs, len(inputs), &permutations)
	return permutations
}

// Using https://gist.github.com/manorie/20874a3c59e9fdfb4e184cac4130944d
func heapPermutation(a []int, size int, result *[][]int) {
	if size == 1 {
		out := make([]int, len(a))
		copy(out, a)
		*result = append(*result, out)
	}

	for i := 0; i < size; i++ {
		heapPermutation(a, size-1, result)

		if size%2 == 1 {
			a[0], a[size-1] = a[size-1], a[0]
		} else {
			a[i], a[size-1] = a[size-1], a[i]
		}
	}
}

func thrusterTest(codes []int) int {
	aOutputs, _ := processStrip(getData(), []int{codes[0], 0})
	bOutputs, _ := processStrip(getData(), []int{codes[1], aOutputs[0]})
	cOutputs, _ := processStrip(getData(), []int{codes[2], bOutputs[0]})
	dOutputs, _ := processStrip(getData(), []int{codes[3], cOutputs[0]})
	eOutputs, _ := processStrip(getData(), []int{codes[4], dOutputs[0]})
	return eOutputs[0]
}

func getData() []int {
	data, err := readFileToNums("input/7.txt")
	if err != nil {
		panic(err)
	}

	return data
}

func reverse(slice []int) {
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		slice[i], slice[j] = slice[j], slice[i]
	}
}

func processStrip(dataStrip []int, input []int) ([]int, []int) {
	idx := 0
	outputs := []int{}

	for cap(dataStrip) > idx {
		op := dataStrip[idx]

		stringOp := strconv.Itoa(op)

		positionModes := []int{}
		if len(stringOp) > 2 {
			op, _ = strconv.Atoi(stringOp[len(stringOp)-2:])
			positionModeStrings := strings.Split(stringOp[:len(stringOp)-2], "")

			for _, positionModeString := range positionModeStrings {
				num, _ := strconv.Atoi(positionModeString)
				positionModes = append(positionModes, num)
			}
			reverse(positionModes)

		}
		for i := len(positionModes); i < 4; i++ {
			positionModes = append(positionModes, 0)
		}

		switch op {
		case 1:
			op1 := getParam(idx+1, positionModes[0], dataStrip)
			op2 := getParam(idx+2, positionModes[1], dataStrip)
			pos := getParam(idx+3, 1, dataStrip)
			dataStrip[pos] = op1 + op2
			idx += 4
		case 2:
			op1 := getParam(idx+1, positionModes[0], dataStrip)
			op2 := getParam(idx+2, positionModes[1], dataStrip)
			pos := getParam(idx+3, 1, dataStrip)
			dataStrip[pos] = op1 * op2
			idx += 4
		case 3:
			adr := getParam(idx+1, 1, dataStrip)
			dataStrip[adr] = input[0]
			input = input[1:]
			idx += 2
		case 4:
			adr := getParam(idx+1, positionModes[0], dataStrip)
			outputs = append(outputs, adr)
			idx += 2
		case 5:
			op1 := getParam(idx+1, positionModes[0], dataStrip)
			if op1 != 0 {
				idx = getParam(idx+2, positionModes[1], dataStrip)
			} else {
				idx += 3
			}
		case 6:
			op1 := getParam(idx+1, positionModes[0], dataStrip)
			if op1 == 0 {
				idx = getParam(idx+2, positionModes[1], dataStrip)
			} else {
				idx += 3
			}
		case 7:
			op1 := getParam(idx+1, positionModes[0], dataStrip)
			op2 := getParam(idx+2, positionModes[1], dataStrip)
			op3 := dataStrip[idx+3]
			val := 0
			if op1 < op2 {
				val = 1
			}
			dataStrip[op3] = val
			idx += 4
		case 8:
			op1 := getParam(idx+1, positionModes[0], dataStrip)
			op2 := getParam(idx+2, positionModes[1], dataStrip)
			op3 := dataStrip[idx+3]
			val := 0
			if op1 == op2 {
				val = 1
			}
			dataStrip[op3] = val
			idx += 4
		case 99:
			idx = cap(dataStrip)
		default:
			fmt.Println(op)
			panic("bad op")
		}

		positionModes = []int{}
	}
	return outputs, dataStrip
}

func getParam(parameterIndex int, positionMode int, dataStrip []int) int {
	parameter := dataStrip[parameterIndex]
	if positionMode == 1 {
		return parameter
	}
	return dataStrip[parameter]
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
