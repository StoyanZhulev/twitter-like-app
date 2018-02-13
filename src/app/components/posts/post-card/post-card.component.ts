import { Component, OnInit, Input } from '@angular/core';
import { PostViewModel } from '../../../models/post/post-view.model';
import { PostService } from '../../../services/post.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { selectAuth } from '../../../store/reducers/index';
import { ToastrService } from '../../../services/toastr.service';
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post;

  private user;
  constructor(
    private postService: PostService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {
    this.store.select(selectAuth).subscribe(data => {
      this.user = data
    })
  }

  ngOnInit() {
  }


  like(post: PostViewModel) {
    if (post.usersLiked) {
      if (!post.usersLiked.hasOwnProperty(this.user.uid)) {
        post.likes = post.likes + 1;
        post.usersLiked[this.user.uid] = {name: this.user.firstName + ' ' + this.user.lastName};
        if(post.usersDisliked){
          if (post.usersDisliked.hasOwnProperty(this.user.uid)) {
            post.dislikes = post.dislikes - 1;
            delete post.usersDisliked[this.user.uid];
          }
        }
        this.postService.likePost(post).subscribe(data => {
          this.toastr.showSuccess('Post liked!', 'You have successfully liked a post!');
        })
      }else {
        this.toastr.showError('Post liked!', 'You have already liked this post!');
        
      }
    }else{
      post.likes = post.likes + 1;
      post.usersLiked = {}
      post.usersLiked[this.user.uid] = {name: this.user.firstName + ' ' + this.user.lastName};
      if(post.usersDisliked){
        if (post.usersDisliked.hasOwnProperty(this.user.uid)) {
          post.dislikes = post.dislikes - 1;
          delete post.usersDisliked[this.user.uid];
        }
      }
      this.postService.likePost(post).subscribe(data => {
        this.toastr.showSuccess('Post liked!', 'You have successfully liked a post!');
      })
    }

  }

  dislike(post: PostViewModel) {
    console.log(post)
    if(post.usersDisliked){
      if(!post.usersDisliked.hasOwnProperty(this.user.uid)){
        post.dislikes = post.dislikes + 1;
        post.usersDisliked[this.user.uid] = {name: this.user.firstName + ' ' + this.user.lastName};
        if(post.usersLiked){
          if(post.usersLiked.hasOwnProperty(this.user.uid)){
            post.likes = post.likes - 1;
            delete post.usersLiked[this.user.uid];
          }
        }

        this.postService.dislikePost(post).subscribe(data => {
          this.toastr.showSuccess('Post disliked!', 'You have successfully disliked a post!');          
        })
      }
      else {
        this.toastr.showError('Post disliked!', 'You have already disliked this post!');      
      }
    } else {
      post.dislikes = post.dislikes + 1;
      post.usersDisliked = {};
      post.usersDisliked[this.user.uid] = {name: this.user.firstName + ' ' + this.user.lastName};
      if(post.usersLiked){
        if(post.usersLiked.hasOwnProperty(this.user.uid)){
          post.likes = post.likes - 1;
          delete post.usersLiked[this.user.uid];
        }
      }
      this.postService.dislikePost(post).subscribe(data => {
        this.toastr.showSuccess('Post disliked!', 'You have successfully disliked a post!');          
      })
    }
  }
}
