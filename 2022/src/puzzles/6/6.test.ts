import { findStartOfPacketIndex, findStartOfMessageIndex } from './6'

describe('it finds start-of-packet markers in', () => {
  it('mjqjpqmgbljsphdztnvjfqwrcgsmlb', () => {
    expect(findStartOfPacketIndex('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
  })
  it('bvwbjplbgvbhsrlpgdmjqwftvncz', () => {
    expect(findStartOfPacketIndex('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
  })
  it('nppdvjthqldpwncqszvftbrmjlhg', () => {
    expect(findStartOfPacketIndex('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
  })
  it('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', () => {
    expect(findStartOfPacketIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(
      10
    )
  })
  it('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', () => {
    expect(findStartOfPacketIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(
      11
    )
  })
})

describe('it finds start-of-message markers in', () => {
  it('mjqjpqmgbljsphdztnvjfqwrcgsmlb', () => {
    expect(findStartOfMessageIndex('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(
      19
    )
  })
  it('bvwbjplbgvbhsrlpgdmjqwftvncz', () => {
    expect(findStartOfMessageIndex('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(23)
  })
  it('nppdvjthqldpwncqszvftbrmjlhg', () => {
    expect(findStartOfMessageIndex('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23)
  })
  it('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', () => {
    expect(
      findStartOfMessageIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
    ).toEqual(29)
  })
  it('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', () => {
    expect(findStartOfMessageIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(
      26
    )
  })
})
