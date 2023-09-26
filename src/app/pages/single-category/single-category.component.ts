import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  data: any;
  id: any;
  postDataOne: any[] = [];

  constructor(private route: ActivatedRoute, private postSev: PostsService) {
    // this.route.params.subscribe(val => {
    //   // this.id = val;

    //   this.postSev.loadOnePost(val['id']).subscribe(post => {
    //     this.data = post;
    //     console.log(this.data);

    //     this.loadSimilarPost(this.data?.data.category.categoryId);
    //     console.log(this.postDataOne);

    //     // this.loadpost
    //   });
    // });

    // New Code

    this.route.params.subscribe(val => {
      console.log(val);
      this.postSev.loadRelatedPost(val['id']).subscribe(post => {
        console.log(post);
        this.postDataOne = post;
        
      })
      
    })

    // Category Id
    this.route.params.subscribe(val => {
      this.id = val;
    });
  }

  ngOnInit(): void {}

  loadSimilarPost(catId: any[] = []) {
    this.postSev.loadRelatedPost(catId).subscribe(val => {
      console.log(val);

      this.postDataOne = val;
      console.log(val);
    });
  }
}
