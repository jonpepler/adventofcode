import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { get } from 'https'
import { config } from 'dotenv'
config({ path: path.resolve(__dirname, '../../.env') })

export const getInput = async (
  inputNum: number,
  test = false
): Promise<string> => {
  const dir = path.resolve(
    __dirname,
    '../input/' + inputNum + (test ? '.test' : '') + '.txt'
  )

  return new Promise((resolve, reject) => {
    if (existsSync(dir)) {
      resolve(readFileSync(dir).toString())
    } else {
      if (test)
        reject(new Error('Test input must be added manually, as x.test.txt.'))
      get(
        `https://adventofcode.com/2022/day/${inputNum}/input`,
        {
          headers: {
            'User-Agent':
              'https://github.com/jonpepler/adventofcode/blob/main/2022/src/util/getInput.ts by jonathan.pepler @gmail.com',
            Cookie: 'session=' + process.env.AOC_SESSION,
          },
        },
        (res) => {
          const data: string[] = []

          res.on('data', (d) => data.push(d))
          res.on('end', () => {
            const input = data.join().trimEnd()
            writeFileSync(dir, input)
            resolve(input)
          })
        }
      )
    }
  })
}
