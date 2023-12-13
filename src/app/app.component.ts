import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'imageAnalyzer';

  receivedData: any;

  passData(data: any) {
    this.receivedData = data;
  }
}
