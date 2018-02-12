import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthState } from '../../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { PostService } from '../../../services/post.service';
import { selectAuth } from '../../../store/reducers/index';
import { PostModel } from '../../../models/post/post.model';
import { AppState } from '../../../store/state/app-state';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public title = new FormControl('');
  public content = new FormControl('', [Validators.required]);  
  public imageUrl = new FormControl('');
  private user: AuthState
    constructor(
      private store: Store<AppState>,
      private postService: PostService,
      private toastr: ToastrService
    ) { 
      this.store.select(selectAuth).subscribe(user => {
        this.user = user
      })
    }


    getContentError() {
      return this.content.hasError('required') ? 'You must enter a value' : '';
    }

    ngOnInit() {

    }

    create(){
      
  

      let post: PostModel = {
        authorId: this.user.uid,
        authorName: this.user.firstName +' ' + this.user.lastName,
        content: this.content.value,
        dislikes: 0,
        likes: 0,
        imageUrl: this.imageUrl.value,
        title: this.title.value,
        usersLiked: {},
        usersDisliked: {}
      }

      this.title.reset();
      this.content.reset();
      this.imageUrl.reset();
      this.postService.createPost(post).subscribe(data => {
        this.toastr.showSuccess('Success!', 'Successfully created post');
      })
    }

}
