import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const filePath = path.resolve('.', 'embed.js')
  const fileBuffer = fs.readFileSync(filePath)
  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/javascript'
    }
  })
}
