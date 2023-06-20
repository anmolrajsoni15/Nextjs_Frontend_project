import { cookies } from "next/headers"



export const getBloc = async () => {
    const blocId = cookies().get("blocId")?.value
    const token = cookies().get("jwt")?.value
    try {
        if (typeof blocId == 'string') {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'BLOC-ID': blocId
                }
            })
            if (!res.ok) {
                console.log("Network response for bloc Initial msg was not ok!")
            }
            if (res.ok) {
                const data = await res.json()
                return data
            }

        }
    }
    catch (err) {
        console.log('')
        return err
    }
}