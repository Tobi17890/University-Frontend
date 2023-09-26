import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {

  data: any;
  similar: any[] =[];
  
  constructor ( private route: ActivatedRoute, private postSev: PostsService) {

    this.route.params.subscribe(val => {
      console.log(val);
      
      this.postSev.countView(val['id']);
      this.postSev.loadOnePost(val['id']).subscribe(post =>{
        // console.log(post);
        this.data = post;
        console.log(this.data, "data");
        
        this.loadSimilarPost(this.data.category.categoryId);
      })
    })
  
  }

  loadSimilarPost(catId: any[] = []) {
    this.postSev.loadRelatedPost(catId).subscribe(val => {
     this.similar = val;
    })
  }
  
}
