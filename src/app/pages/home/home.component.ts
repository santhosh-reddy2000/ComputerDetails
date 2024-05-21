import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public data: any[] = [];
  public dataOriginal: any;
  public statusIndex: number;
  public headers: Array<any> = new Array<any>();
  public jsonData: any[] = [];
  public resetButtonDisabled: boolean[] = [];
  public searchQuery: string = '';


  onFileChange(evt: any) {  
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {     
      this.headers = this.data[0]
      console.log(this.headers)
      this.data.splice(0, 1)
      this.dataOriginal = JSON.stringify(this.data)
      this.statusIndex = this.headers.findIndex(x => x == 'Status')   
    };
  }
  restart() {
    this.getComputerDetails (); 
  }

 onChangeStatus(value, index) {
  this.jsonData[index]['Status'] = value ? 'On' : 'Off';
  this.resetButtonDisabled[index] = !value; 
}

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.getComputerDetails();
  }
  getComputerDetails() {
    this.communicationService.computerDetailsData().subscribe((data: any) => {
      this.jsonData = data;
      this.dataOriginal = JSON.parse(JSON.stringify(this.jsonData)); 
    });
  }
  resetRow(index: number) {
    this.jsonData[index] = JSON.parse(JSON.stringify(this.dataOriginal[index])); 
  }

  applyFilter() {
    if (!this.searchQuery) {
      this.jsonData = this.dataOriginal;
      return;
    }
    this.jsonData = this.dataOriginal.filter(item => {
      return Object.values(item).some(val => val.toString().toLowerCase().includes(this.searchQuery.toLowerCase()));
    });
  }
  
}
