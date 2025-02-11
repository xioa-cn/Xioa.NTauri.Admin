
export function useRouteToTitle(){
    const toTitleString = (key:string)=>{
        switch(key){
            case 'like':
                return '喜欢❤️'
            case 'record':
                return '记录📸'
        }
        return '博客列表'
    }


    return {
        toTitleString
    }
}