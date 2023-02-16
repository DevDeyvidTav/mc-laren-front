import Router from "next/router"

export async function useVerifyAdmin (user:string[]) {
    if (!user) {
        return Router.push('/auth')
    }
}