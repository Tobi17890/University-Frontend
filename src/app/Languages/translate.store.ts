import { observable, action } from 'mobx';
import { Injectable } from '@angular/core';
import { JsonDataService } from './json-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageStore {
  @observable public strings: any = {};
  @observable language: string = 'en';

  subScribeLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('en');

  constructor(private json: JsonDataService) {
    json.getLanguage().then((doc) => {
      this.language = doc || 'en';
      if (this.language === 'kh') {
        json.englishJSON().subscribe((items) => {
          this.strings = items;
        });
      } else if (this.language === 'en') {
        json.khmerJSON().subscribe((items) => {
          this.strings = items;
        });
      } else if (this.language === 'cn') {
        json.chineseJSON().subscribe((items) => {
          this.strings = items;
        });
      }
    });
  }

  @action
  chooseLanguage(key: string) {
    this.json.setLanguage(key);
    this.language = key;
    this.subScribeLanguage.next(key);
    if (this.language === 'en') {
      this.json.englishJSON().subscribe((items) => {
        this.strings = items;
      });
    } else if (this.language === 'kh') {
      this.json.khmerJSON().subscribe((items) => {
        this.strings = items;
      });
    } else if (this.language === 'cn') {
      this.json.chineseJSON().subscribe((items) => {
        this.strings = items;
      });
    }
  }
}
