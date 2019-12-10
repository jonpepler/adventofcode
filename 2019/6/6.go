package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

type initialSpaceObject struct {
	name      string
	orbitedBy string
}

type spaceObject struct {
	name      string
	orbits    *spaceObject
	orbitedBy []*spaceObject
}

func main() {
	com := *getData()

	// part 1
	fmt.Println(com.countOrbits())
}

func (sObj spaceObject) countOrbits() (count int) {
	parentPointer := sObj
	for parentPointer.orbits != nil {
		count++
		parentPointer = *parentPointer.orbits
	}

	for _, orbiter := range sObj.orbitedBy {
		count += orbiter.countOrbits()
	}

	return
}

func getData() *spaceObject {
	data, err := readFileToObjects("input/6.txt")
	if err != nil {
		panic(err)
	}

	seenObjects := make(map[string]*spaceObject)
	com := &spaceObject{name: "COM"}
	seenObjects[com.name] = com

	for _, sObj := range data {
		var newObj, newOrbiter *spaceObject

		// Check we haven't seen this object before
		if obj, seen := seenObjects[sObj.name]; seen {
			newObj = obj
		}
		if obj, seen := seenObjects[sObj.orbitedBy]; seen {
			newOrbiter = obj
		}

		// If an object is new, create and assign it
		if newObj == nil {
			newObj = &spaceObject{name: sObj.name}
			seenObjects[sObj.name] = newObj
		}
		if newOrbiter == nil {
			newOrbiter = &spaceObject{name: sObj.orbitedBy}
			seenObjects[sObj.orbitedBy] = newOrbiter
		}
		newObj.orbitedBy = append(newObj.orbitedBy, newOrbiter)
		newOrbiter.orbits = newObj
	}

	return com
}

func readFileToObjects(fname string) ([]initialSpaceObject, error) {
	b, err := ioutil.ReadFile(fname)
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(b), "\n")
	objects := make([]initialSpaceObject, 0, len(lines))

	for _, line := range lines {
		if len(line) == 0 {
			continue
		}

		object := strings.Split(line, ")")
		if err != nil {
			return nil, err
		}
		objects = append(objects, initialSpaceObject{object[0], object[1]})
	}

	return objects, nil
}
