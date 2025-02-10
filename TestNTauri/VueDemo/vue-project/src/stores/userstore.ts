import { defineStore } from 'pinia'
import type { UserType } from '@/types/usertype.ts'


interface UserStore {
    nowUser: UserType
}



export const useUserStore = defineStore('user', 
     {
    state: (): UserStore => ({
        nowUser: {

        }
    }),
        actions: {
        setNowUser(user: UserType) {
            this.nowUser = user;
        },
        
        getNowUserState():boolean | undefined {
            return this.nowUser.auth && this.nowUser.auth !== 'NL'
        }
    }
})
