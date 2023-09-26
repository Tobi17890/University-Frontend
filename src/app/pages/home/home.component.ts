import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { LanguageStore } from 'src/app/Languages/translate.store';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //  featuredPostArray: any[] = [];
  //  featuredPostArrayOne:any{} = {};
  featuredPostArrayOne: any[] = [];
  latestPost: any[] = [];
  search: any;
  searchValue: string = '';
  

  //====================

  public searchTerm: string = '';
  searchKey: string = '';

  public sear = new BehaviorSubject<string>("");

  form : any = null;
  constructor(private postSev: PostsService,
    private fb : FormBuilder,
    public lang: LanguageStore

    ) {
    // this.postSev.loadFeatured().subscribe(val => {
    //    console.log(val);
    //   this.featuredPostArray = val;
    //   // const detail = this.featuredPostArray;
    //   // console.log(detail);
    //   })
  }

  ngOnInit(): void {
    this.postSev.loadFeatured().subscribe((val) => {
      this.featuredPostArrayOne = val;
    });


    this.form = this.fb.group({
      search: [null]
    })

    this.form.get('search')?.valueChanges.pipe(
      debounceTime(200),
    ).subscribe((value:string) => {
      this.postSev.searchPost(value)?.subscribe((val) => {
        this.featuredPostArrayOne = val;
      })
    })

  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    console.log(this.searchValue);
    
  }

 //====================

 searchItem( event:  any) {
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.sear.next(this.searchTerm);
  
 }
  

 listAll(){
  this.postSev.loadLatest().subscribe(ref => {
    // console.log(ref);
    
    this.featuredPostArrayOne = ref;
    // console.log(this.latestPost);
    
  })
 }
  
}
