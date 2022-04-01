import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import environment from 'src/config/env.json';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

declare var TextDecoder : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deployment';
  testDisplay : any;
  constructor(private http:HttpClient){
    this.http.get(environment.serverUrl+'deploy').subscribe(data=>{
      this.testDisplay = data
    })
  }

  ngOnInit(){
    // const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
    // AWS.config.credentials = credentials;
    console.log(AWS)
    console.log( AWS.config)
    // AWS.config.update({region: 'ap-south-1'});
    const params = {
      Bucket: 'first-bcket',
      Key: 'bucket-1'
    };

    let s3 = new S3({region:'ap-south-1'});

    s3.getObject(params, function(err, data) {
      if (err) {
        console.error(err); // an error occurred
      } else {
        const string = new TextDecoder('utf-8').decode(data.Body);
        console.log(string);
      }
    });
  }
}
