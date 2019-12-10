package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	outputs, _ := processStrip(getData(), []int{5})

	fmt.Println(outputs)
}

func getData() []int {
	data, err := readFileToNums("input/5.txt")
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
