import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss']
})
export class SeeMoreComponent implements OnInit{

  searchValue: string = '';
  latestPost: any[] = [];

  constructor (private postSev: PostsService) {}
  ngOnInit(): void {
    this.postSev.loadLatest().subscribe(ref => {
      // console.log(ref);
      
      this.latestPost = ref;
      // console.log(this.latestPost);
      
    })
  }


  onSearchChange(searchValue: string) {
     this.searchValue = searchValue;
     console.log(this.searchValue);
     
  }
 

}
