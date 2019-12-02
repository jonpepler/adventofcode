package main

func main() {

}

func calculateFuelRequirement(moduleMass int) int {
	return (moduleMass / 3) - 2
}

func calculateFuelRequirements(moduleMasses []int) int {
	acc := 0
	for _, value := range moduleMasses {
		acc += calculateFuelRequirement(value)
	}
	return acc
}
