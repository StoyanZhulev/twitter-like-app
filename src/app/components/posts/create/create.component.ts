import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from '../../../typescripts/free/index';
import { FormControl, Validators } from '@angular/forms';
import { AuthState } from '../../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { selectAuth } from '../../../store/reducers/index';
import { PostModel } from '../../../models/post/post.model';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('createForm') createForm: ModalDirective;
    
  public title = new FormControl('');
  public content = new FormControl('', [Validators.required]);  
  public imageUrl = new FormControl('');
  private user: AuthState
    constructor(
      private store: Store<AppState>,
      private postService: PostService
    ) { 
      this.store.select(selectAuth).subscribe(user => {
        this.user = user
      })
    }

    open() {
        this.createForm.show();
    }

    getContentError() {
      return this.content.hasError('required') ? 'You must enter a value' : '';
    }

    ngOnInit() {

    }

    create(){
 

      let post: PostModel = {
        authorId: this.user.uid,
        authorName: this.user.firstname + this.user.lastname,
        content: this.content.value,
        dislikes: 0,
        likes: 0,
        imageUrl: this.imageUrl.value,
        title: this.title.value
      }

      this.title.reset();
      this.content.reset();
      this.imageUrl.reset();
      this.postService.createPost(post).subscribe(data => {
        console.log(data)
      })
    }
}
