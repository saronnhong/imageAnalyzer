import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})

export class ImageDetailsComponent implements OnInit {
  @Input() receivedData: any;

  file_name = '';
  showTable = false;
  displayedColumns: string[] = ['file_name', 'gender', 'age', 'emotion', 'smile', 'eye_glasses', 'sun_glasses', 'beard', 'mustache', 'eyes_open', 'mouth_open'];
  dataSource = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  getData(url: string) {
    return this.http.get(url);
  }

  requestImageDetails(){
    this.dataSource = [];
    this.file_name = this.receivedData['name'];
    this.getData(`https://y7r447ylr0.execute-api.us-east-1.amazonaws.com/test/fetchData?file_name=${this.file_name}`).subscribe(data => {
      for (let i in data){
        this.dataSource[i] = {
          "file_name": data[i][1],
          "gender": data[i][2],
          "age": data[i][3] + " - " + data[i][4],
          "emotion": data[i][5],
          "smile": data[i][6],
          "eye_glasses": data[i][7],
          "sun_glasses": data[i][8],
          "beard": data[i][9],
          "mustache": data[i][10],
          "eyes_open": data[i][11],
          "mouth_open": data[i][12]
        }
      }
      this.showTable = true
    })
  }

}
