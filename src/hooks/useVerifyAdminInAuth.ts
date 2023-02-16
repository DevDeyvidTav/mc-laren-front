import Router from "next/router"

export function useVerifyAdminInAuth (user:string[]) {
    if (user !== undefined && user !== null) {
        return Router.push('/dashboard')
    }
}