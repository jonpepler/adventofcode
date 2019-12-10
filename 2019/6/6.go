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
	com, santa, you := getData()

	// part 1
	fmt.Printf("Total Orbits: %v\n", com.countOrbits())

	// part 2
	fmt.Printf("YOU -> SAN: %v\n", you.transfersTo(santa))
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

func (sObj spaceObject) transfersTo(target spaceObject) (count int) {
	// We want transfers to the same orbit, not transfers to orbit the target
	sObj = *sObj.orbits
	target = *target.orbits

	sObjParents := sObj.orbitHierarchy()
	targetParents := target.orbitHierarchy()

	// Check if on same path
	for i, ancestor := range sObjParents {
		if ancestor.name == target.name {
			return i
		}
	}
	for i, ancestor := range targetParents {
		if ancestor.name == sObj.name {
			return i
		}
	}

	// if not, find common object
	for i, ancestor := range sObjParents {
		// check if ancestor is on targetParents
		for _, targetAncestor := range targetParents {
			if ancestor.name == targetAncestor.name {
				// common ancestor
				return i + target.transfersTo(ancestor)
			}
		}
	}

	// no route??
	return -1
}

func (sObj spaceObject) orbitHierarchy() (hierarchy []spaceObject) {
	parentPointer := sObj
	for parentPointer.orbits != nil {
		hierarchy = append(hierarchy, parentPointer)
		parentPointer = *parentPointer.orbits
	}

	// Add COM
	hierarchy = append(hierarchy, parentPointer)

	return
}

func getData() (spaceObject, spaceObject, spaceObject) {
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

	santa := *seenObjects["SAN"]
	you := *seenObjects["YOU"]
	return *com, santa, you
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
