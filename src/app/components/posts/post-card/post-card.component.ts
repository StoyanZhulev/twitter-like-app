import { Component, OnInit, Input } from '@angular/core';
import { PostViewModel } from '../../../models/post/post-view.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
  }


  like(post: PostViewModel){
    post.likes = post.likes + 1;
    this.postService.likePost(post).subscribe(data => {
      console.log(data);
    })
  }

  dislike(post: PostViewModel){
    post.dislikes = post.dislikes + 1
    this.postService.dislikePost(post).subscribe(data => {
      console.log(data);
    })
  }
}
