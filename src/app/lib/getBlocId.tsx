  import {cookies} from 'next/headers'

  async function getBlocId():Promise<string|undefined> {
  
    const blocId = await cookies().get("blocId")?.value

    return blocId
}

export default getBlocId