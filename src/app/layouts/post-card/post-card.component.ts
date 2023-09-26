import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
key: any;
post: any[]=[];
featuredPostArrayOne: any[] = [];
latestPost: any[] = [];


  
  
  constructor (
    private postSev: PostsService,
    private afs: AngularFirestore
    ) { }

  @Input()
  postDataOne: any;
  
  

  ngOnInit(): void {

    this.postSev.loadFeatured().subscribe(val => {
      this.featuredPostArrayOne = val;
      // this.postDataOne = val;
    })

    this.postSev.loadLatest().subscribe(val =>{
      this.latestPost = val;
    })
    

  }
}
