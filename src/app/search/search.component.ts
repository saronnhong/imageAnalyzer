import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  imageData: any = []
  searchOptions = {
    gender: '',
    emotion: '',
    smile: '',
    eye_glasses: '',
    sun_glasses: '',
    beard: '',
    mustache: '',
    eyes_open: '',
    mouth_open: ''
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  getData(url: string) {
    return this.http.get(url);
  }

  querySearch() {
    this.imageData = [];
    let queryString = ''
    for (let key in this.searchOptions) {
      if (this.searchOptions[key] !== '') {
        let temp = `${key}=${this.searchOptions[key]}`
        if (queryString != '') {
          queryString += "&" + temp
        } else {
          queryString += temp
        }
      }
    }

    this.getData(`https://y7r447ylr0.execute-api.us-east-1.amazonaws.com/test/fetchData?${queryString}`).subscribe(data => {
      let currDict = {}

      for (let i in data) {
        if (!currDict[data[i][1]]) {
          currDict[data[i][1]] = 1
          this.imageData.push(data[i])
        }
      }

    })
  }
}
