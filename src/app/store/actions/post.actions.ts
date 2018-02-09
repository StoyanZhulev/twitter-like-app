import { Action } from '@ngrx/store'

export const PostActions = {
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_SECCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAILED: 'CREATE_POST_FAILED'
}


export class CreatePostAction implements Action {
    type: string = PostActions.CREATE_POST

    constructor(public payload: any){

    }
}

export class CreatePostSuccess implements Action {
    type: string = PostActions.CREATE_POST_SECCESS

    constructor(public payload: any){

    }
}

export class CreatePostFailed  implements Action {
    type: string = PostActions.CREATE_POST_FAILED

    constructor(public payload: any){

    }
}


export type Actions = 
    CreatePostAction | 
    CreatePostSuccess |
    CreatePostFailed