import { charsToStart } from './6'

describe('it finds start-of-packet markers in', () => {
  it('mjqjpqmgbljsphdztnvjfqwrcgsmlb', () => {
    expect(charsToStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
  })
  it('bvwbjplbgvbhsrlpgdmjqwftvncz', () => {
    expect(charsToStart('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
  })
  it('nppdvjthqldpwncqszvftbrmjlhg', () => {
    expect(charsToStart('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
  })
  it('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', () => {
    expect(charsToStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10)
  })
  it('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', () => {
    expect(charsToStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11)
  })
})
