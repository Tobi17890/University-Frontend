import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss']
})
export class CategoryNavComponent implements OnInit{

  @Input() name!: string;

  catagoryArray: any[] = [];
  PhnomPenh: any[] = [];
  Provinces: any[] = [];

  IdTitle =
    {id: 1, category: "Phnom Penh"};
  
  

  constructor (private cateSev: CategoriesService, private route : ActivatedRoute, private ps: CategoriesService) {
    this.cateSev.loadPhnomPenh().subscribe(val => {
      this.PhnomPenh = val;
      console.log(this.PhnomPenh, "PhnomPenh");
      
    });

    this.cateSev.loadData().subscribe(val => {
      this.Provinces = val;
      console.log(this.Provinces, "Provinces");
    });
    this.ps.currentName.subscribe(name => this.name = name);
  }


  ngOnInit(): void {
     
  }

  nameClicked(data: any) {
    this.ps.changeName(data.data.name);
  }




}
